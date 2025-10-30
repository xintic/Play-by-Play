'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { PlacedPlayer, BoardSection, Player } from '@/types/game';
import PlayerCard from './PlayerCard';
import styles from './GameBoard.module.css';

interface GameBoardProps {
  placedPlayers: PlacedPlayer[];
  onPlayerPlace?: (player: Player, section: BoardSection) => void;
  onPlayerRemove?: (player: Player) => void;
  boardImage?: string;
}

type ZoneConfig = {
  id: BoardSection;
  label: string;
  type: 'goalie' | 'skater';
  classes: Array<keyof typeof styles>;
};

const zoneLayout: ZoneConfig[] = [
  {
    id: 'goalie-home',
    label: 'Home Goalie',
    type: 'goalie',
    classes: ['goalZone', 'zoneHomeGoalie']
  },
  {
    id: 'zone-7',
    label: 'Zone 7',
    type: 'skater',
    classes: ['zoneLeft', 'zone7']
  },
  {
    id: 'zone-8',
    label: 'Zone 8',
    type: 'skater',
    classes: ['zoneRight', 'zone8']
  },
  {
    id: 'zone-5',
    label: 'Zone 5',
    type: 'skater',
    classes: ['zoneLeft', 'zone5']
  },
  {
    id: 'zone-6',
    label: 'Zone 6',
    type: 'skater',
    classes: ['zoneRight', 'zone6']
  },
  {
    id: 'zone-3',
    label: 'Zone 3',
    type: 'skater',
    classes: ['zoneLeft', 'zone3']
  },
  {
    id: 'zone-4',
    label: 'Zone 4',
    type: 'skater',
    classes: ['zoneRight', 'zone4']
  },
  {
    id: 'zone-1',
    label: 'Zone 1',
    type: 'skater',
    classes: ['zoneLeft', 'zone1']
  },
  {
    id: 'zone-2',
    label: 'Zone 2',
    type: 'skater',
    classes: ['zoneRight', 'zone2']
  },
  {
    id: 'goalie-away',
    label: 'Away Goalie',
    type: 'goalie',
    classes: ['goalZone', 'zoneAwayGoalie']
  }
];

export default function GameBoard({
  placedPlayers,
  onPlayerPlace,
  onPlayerRemove,
  boardImage = '/game-boards/numbered-board.svg'
}: GameBoardProps) {
  const [dragOverSection, setDragOverSection] = useState<BoardSection | null>(
    null
  );

  const handleDragOver = (event: React.DragEvent, section: BoardSection) => {
    event.preventDefault();
    setDragOverSection(section);
  };

  const handleDragLeave = () => {
    setDragOverSection(null);
  };

  const handleDrop = (event: React.DragEvent, section: BoardSection) => {
    event.preventDefault();
    setDragOverSection(null);

    try {
      const playerData = event.dataTransfer.getData('player');
      if (!playerData || !onPlayerPlace) return;

      const player = JSON.parse(playerData) as Player;

      const isGoalieSection =
        section === 'goalie-home' || section === 'goalie-away';
      if (isGoalieSection && player.position !== 'goalie') {
        alert('Only goalies can be placed in the goalie crease.');
        return;
      }

      if (!isGoalieSection && player.position === 'goalie') {
        alert('Goalies must be placed in the goalie crease.');
        return;
      }

      onPlayerPlace(player, section);
    } catch (error) {
      console.error('Error dropping player:', error);
    }
  };

  const getPlayersInSection = (section: BoardSection) =>
    placedPlayers.filter((p) => p.section === section);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardWrapper}>
        <div className={styles.boardImage}>
          <Image
            src={boardImage}
            alt="Play-by-Play Rink"
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className={styles.rinkImage}
            priority
          />
        </div>

        <div className={styles.zonesOverlay}>
          {zoneLayout.map(({ id, label, classes }) => {
            const zoneClasses = [
              styles.zone,
              ...classes.map((className) => styles[className]),
              dragOverSection === id ? styles.dragOver : ''
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={id}
                className={zoneClasses}
                onDragOver={(event) => handleDragOver(event, id)}
                onDragLeave={handleDragLeave}
                onDrop={(event) => handleDrop(event, id)}
                aria-label={label}
              >
                <span className={styles.srOnly}>{label}</span>
                <div className={styles.playersInSection}>
                  {getPlayersInSection(id).map((pp, index) => (
                    <div
                      key={`${pp.player.id}-${index}`}
                      className={styles.placedPlayer}
                    >
                      <PlayerCard player={pp.player} size="small" draggable />
                      {onPlayerRemove && (
                        <button
                          type="button"
                          className={styles.removePlayerButton}
                          onClick={() => onPlayerRemove(pp.player)}
                          aria-label={`Remove ${pp.player.name} from ${label}`}
                          title="Remove from board"
                        >
                          <IoCloseCircleOutline aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
