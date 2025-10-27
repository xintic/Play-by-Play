'use client';

import { useState } from 'react';
import { Player } from '@/types/game';
import PlayerCard from './PlayerCard';
import styles from './PlayerSelection.module.css';

interface PlayerSelectionProps {
  availablePlayers: Player[];
  selectedPlayers: Player[];
  selectedGoalie: Player | null;
  onPlayerSelect: (player: Player) => void;
  onGoalieSelect: (player: Player) => void;
}

export default function PlayerSelection({
  availablePlayers,
  selectedPlayers,
  selectedGoalie,
  onPlayerSelect,
  onGoalieSelect,
}: PlayerSelectionProps) {
  const [filterPosition, setFilterPosition] = useState<'all' | 'forward' | 'defense' | 'goalie'>('all');

  const filteredPlayers = availablePlayers.filter((player) => {
    if (filterPosition !== 'all' && player.position !== filterPosition) return false;
    return true;
  });

  const forwards = filteredPlayers.filter(p => p.position === 'forward');
  const defensemen = filteredPlayers.filter(p => p.position === 'defense');
  const goalies = filteredPlayers.filter(p => p.position === 'goalie');

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
          <button
            className={filterPosition === 'all' ? styles.active : ''}
            onClick={() => setFilterPosition('all')}
          >
            All
          </button>
          <button
            className={filterPosition === 'forward' ? styles.active : ''}
            onClick={() => setFilterPosition('forward')}
          >
            Forwards
          </button>
          <button
            className={filterPosition === 'defense' ? styles.active : ''}
            onClick={() => setFilterPosition('defense')}
          >
            Defense
          </button>
          <button
            className={filterPosition === 'goalie' ? styles.active : ''}
            onClick={() => setFilterPosition('goalie')}
          >
            Goalies
          </button>
        </div>
      </div>

      <div className={styles.playersContainer}>
        {filterPosition === 'all' || filterPosition === 'goalie' ? (
          <div className={styles.positionGroup}>
            <h3 className={styles.positionTitle}>Goalies {needsGoalie && <span className={styles.required}>*</span>}</h3>
            <div className={styles.playerGrid}>
              {goalies.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelected={isPlayerSelected(player)}
                  onClick={() => handlePlayerClick(player)}
                  draggable={isPlayerSelected(player)}
                />
              ))}
            </div>
          </div>
        ) : null}

        {filterPosition === 'all' || filterPosition === 'forward' ? (
          <div className={styles.positionGroup}>
            <h3 className={styles.positionTitle}>Forwards</h3>
            <div className={styles.playerGrid}>
              {forwards.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelected={isPlayerSelected(player)}
                  onClick={() => canSelectMore || isPlayerSelected(player) ? handlePlayerClick(player) : undefined}
                  draggable={isPlayerSelected(player)}
                />
              ))}
            </div>
          </div>
        ) : null}

        {filterPosition === 'all' || filterPosition === 'defense' ? (
          <div className={styles.positionGroup}>
            <h3 className={styles.positionTitle}>Defense</h3>
            <div className={styles.playerGrid}>
              {defensemen.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelected={isPlayerSelected(player)}
                  onClick={() => canSelectMore || isPlayerSelected(player) ? handlePlayerClick(player) : undefined}
                  draggable={isPlayerSelected(player)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

