'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlacedPlayer, BoardSection, Player } from '@/types/game';
import PlayerCard from './PlayerCard';
import styles from './GameBoard.module.css';

interface GameBoardProps {
  placedPlayers: PlacedPlayer[];
  onPlayerPlace?: (player: Player, section: BoardSection) => void;
  boardImage?: string;
}

export default function GameBoard({ 
  placedPlayers, 
  onPlayerPlace,
  boardImage = '/game-boards/board.png'
}: GameBoardProps) {
  const [dragOverSection, setDragOverSection] = useState<BoardSection | null>(null);

  const handleDragOver = (e: React.DragEvent, section: BoardSection) => {
    e.preventDefault();
    setDragOverSection(section);
  };

  const handleDragLeave = () => {
    setDragOverSection(null);
  };

  const handleDrop = (e: React.DragEvent, section: BoardSection) => {
    e.preventDefault();
    setDragOverSection(null);

    try {
      const playerData = e.dataTransfer.getData('player');
      if (playerData && onPlayerPlace) {
        const player = JSON.parse(playerData) as Player;
        
        // Check if trying to place a non-goalie in goalie zone
        if ((section === 'goalie-home' || section === 'goalie-away') && player.position !== 'goalie') {
          alert('Only goalies can be placed in the goalie zone!');
          return;
        }
        
        // Check if trying to place a goalie outside goalie zone
        if (player.position === 'goalie' && section !== 'goalie-home' && section !== 'goalie-away') {
          alert('Goalies must be placed in the goalie zone!');
          return;
        }
        
        onPlayerPlace(player, section);
      }
    } catch (error) {
      console.error('Error dropping player:', error);
    }
  };

  const getPlayersInSection = (section: BoardSection) => {
    return placedPlayers.filter(p => p.section === section);
  };

  const isGoalieZone = (section: BoardSection) => {
    return section === 'goalie-home' || section === 'goalie-away';
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardWrapper}>
        <div className={styles.boardImage}>
          <Image
            src={boardImage}
            alt="Hockey Rink"
            fill
            sizes="100vw"
            className={styles.rinkImage}
            priority
          />
        </div>

        <div className={styles.sectionsGrid}>
          {/* Row 1: Home Goalie Zone */}
          <div className={styles.goalieRow}>
            <div
              className={`${styles.section} ${styles.goalieZone} ${
                dragOverSection === 'goalie-home' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'goalie-home')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'goalie-home')}
            >
              <span className={styles.sectionLabel}>🥅 Home Goalie</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('goalie-home').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Defensive zones */}
          <div className={styles.row}>
            <div
              className={`${styles.section} ${styles.defensive} ${
                dragOverSection === 'defensive-home' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'defensive-home')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'defensive-home')}
            >
              <span className={styles.sectionLabel}>Defensive (Home)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('defensive-home').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.section} ${styles.defensive} ${
                dragOverSection === 'defensive-away' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'defensive-away')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'defensive-away')}
            >
              <span className={styles.sectionLabel}>Defensive (Away)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('defensive-away').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Neutral Left zones */}
          <div className={styles.row}>
            <div
              className={`${styles.section} ${styles.neutral} ${
                dragOverSection === 'neutral-left-home' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'neutral-left-home')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'neutral-left-home')}
            >
              <span className={styles.sectionLabel}>Neutral L (Home)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('neutral-left-home').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.section} ${styles.neutral} ${
                dragOverSection === 'neutral-left-away' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'neutral-left-away')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'neutral-left-away')}
            >
              <span className={styles.sectionLabel}>Neutral L (Away)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('neutral-left-away').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Neutral Right zones */}
          <div className={styles.row}>
            <div
              className={`${styles.section} ${styles.neutral} ${
                dragOverSection === 'neutral-right-home' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'neutral-right-home')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'neutral-right-home')}
            >
              <span className={styles.sectionLabel}>Neutral R (Home)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('neutral-right-home').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.section} ${styles.neutral} ${
                dragOverSection === 'neutral-right-away' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'neutral-right-away')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'neutral-right-away')}
            >
              <span className={styles.sectionLabel}>Neutral R (Away)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('neutral-right-away').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 5: Offensive zones */}
          <div className={styles.row}>
            <div
              className={`${styles.section} ${styles.offensive} ${
                dragOverSection === 'offensive-home' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'offensive-home')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'offensive-home')}
            >
              <span className={styles.sectionLabel}>Offensive (Home)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('offensive-home').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.section} ${styles.offensive} ${
                dragOverSection === 'offensive-away' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'offensive-away')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'offensive-away')}
            >
              <span className={styles.sectionLabel}>Offensive (Away)</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('offensive-away').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 6: Away Goalie Zone */}
          <div className={styles.goalieRow}>
            <div
              className={`${styles.section} ${styles.goalieZone} ${
                dragOverSection === 'goalie-away' ? styles.dragOver : ''
              }`}
              onDragOver={(e) => handleDragOver(e, 'goalie-away')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'goalie-away')}
            >
              <span className={styles.sectionLabel}>🥅 Away Goalie</span>
              <div className={styles.playersInSection}>
                {getPlayersInSection('goalie-away').map((pp, idx) => (
                  <div key={idx} className={styles.placedPlayer}>
                    <PlayerCard player={pp.player} size="small" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
