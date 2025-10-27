'use client';

import { useState } from 'react';
import { Player, PlayerPosition } from '@/types/game';
import PlayerCard from './PlayerCard';
import styles from './PlayerSelection.module.css';

interface PlayerSelectionProps {
  availablePlayers: Player[];
  selectedPlayers: Player[];
  selectedGoalie: Player | null;
  onPlayerSelect: (player: Player) => void;
  onGoalieSelect: (player: Player) => void;
}

const positionOrder: PlayerPosition[] = [
  'goalie',
  'left-defense',
  'right-defense',
  'left-wing',
  'center',
  'right-wing'
];

const positionLabels: Record<PlayerPosition, string> = {
  goalie: 'Goalies',
  'left-defense': 'Left Defense',
  'right-defense': 'Right Defense',
  'left-wing': 'Left Wing',
  center: 'Center',
  'right-wing': 'Right Wing'
};

const filterOptions: Array<{ label: string; value: 'all' | PlayerPosition }> = [
  { label: 'All', value: 'all' },
  { label: 'Goalies', value: 'goalie' },
  { label: 'Left Defense', value: 'left-defense' },
  { label: 'Right Defense', value: 'right-defense' },
  { label: 'Left Wing', value: 'left-wing' },
  { label: 'Center', value: 'center' },
  { label: 'Right Wing', value: 'right-wing' }
];

export default function PlayerSelection({
  availablePlayers,
  selectedPlayers,
  selectedGoalie,
  onPlayerSelect,
  onGoalieSelect,
}: PlayerSelectionProps) {
  const [filterPosition, setFilterPosition] = useState<'all' | PlayerPosition>('all');

  const filteredPlayers = availablePlayers
    .filter((player) => filterPosition === 'all' || player.position === filterPosition)
    .sort((a, b) => a.number - b.number);

  const groupedPlayers = positionOrder
    .filter((position) => filterPosition === 'all' || filterPosition === position)
    .map((position) => ({
      position,
      players: filteredPlayers.filter((player) => player.position === position)
    }))
    .filter((group) => group.players.length > 0);

  const isPlayerSelected = (player: Player) => {
    return selectedPlayers.some(p => p.id === player.id) || selectedGoalie?.id === player.id;
  };

  const handlePlayerClick = (player: Player) => {
    if (player.position === 'goalie') {
      onGoalieSelect(player);
    } else {
      onPlayerSelect(player);
    }
  };

  const canSelectMore = selectedPlayers.length < 5;
  const needsGoalie = !selectedGoalie;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Select Your Team</h2>
        <div className={styles.progress}>
          <span className={styles.progressItem}>
            Players: {selectedPlayers.length}/5
          </span>
          <span className={styles.progressItem}>
            Goalie: {selectedGoalie ? '1/1' : '0/1'}
          </span>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Filter by Position:</label>
          {filterOptions.map(({ label, value }) => (
            <button
              key={value}
              className={filterPosition === value ? styles.active : ''}
              onClick={() => setFilterPosition(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.playersContainer}>
        {groupedPlayers.map(({ position, players }) => (
          <div key={position} className={styles.positionGroup}>
            <h3 className={styles.positionTitle}>
              {positionLabels[position]}
              {position === 'goalie' && needsGoalie && (
                <span className={styles.required}>*</span>
              )}
            </h3>
            <div className={styles.playerGrid}>
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelected={isPlayerSelected(player)}
                  onClick={() =>
                    player.position === 'goalie' ||
                    canSelectMore ||
                    isPlayerSelected(player)
                      ? handlePlayerClick(player)
                      : undefined
                  }
                  draggable={isPlayerSelected(player)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
