'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Player, PlacedPlayer, BoardSection, GameState } from '@/types/game';
import { frolundaPlayers, leksandPlayers } from '@/data/players';
import TeamSelection from '@/components/TeamSelection';
import PlayerSelection from '@/components/PlayerSelection';
import PlayerCard from '@/components/PlayerCard';
import GameBoard from '@/components/GameBoard';
import styles from './page.module.css';

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<
    'Frölunda' | 'Leksand' | null
  >(null);
  const [gameState, setGameState] = useState<GameState>({
    selectedPlayers: [],
    selectedGoalie: null,
    placedPlayers: [],
    currentTurn: 'home'
  });

  const [gamePhase, setGamePhase] = useState<
    'team' | 'selection' | 'placement' | 'playing'
  >('team');

  // Get available players based on selected team
  const availablePlayers =
    selectedTeam === 'Frölunda'
      ? frolundaPlayers
      : selectedTeam === 'Leksand'
      ? leksandPlayers
      : [];

  const handleTeamSelect = (team: 'Frölunda' | 'Leksand') => {
    setSelectedTeam(team);
    // Reset game state when changing teams
    setGameState({
      selectedPlayers: [],
      selectedGoalie: null,
      placedPlayers: [],
      currentTurn: 'home'
    });
  };

  const handlePlayerSelect = (player: Player) => {
    // Toggle player selection
    if (gameState.selectedPlayers.some((p) => p.id === player.id)) {
      setGameState({
        ...gameState,
        selectedPlayers: gameState.selectedPlayers.filter(
          (p) => p.id !== player.id
        )
      });
    } else if (gameState.selectedPlayers.length < 5) {
      setGameState({
        ...gameState,
        selectedPlayers: [...gameState.selectedPlayers, player]
      });
    }
  };

  const handleGoalieSelect = (player: Player) => {
    // Toggle goalie selection
    if (gameState.selectedGoalie?.id === player.id) {
      setGameState({
        ...gameState,
        selectedGoalie: null
      });
    } else {
      setGameState({
        ...gameState,
        selectedGoalie: player
      });
    }
  };

  const handlePlayerPlace = (player: Player, section: BoardSection) => {
    // Check if player is already placed
    const existingIndex = gameState.placedPlayers.findIndex(
      (pp) => pp.player.id === player.id
    );

    if (existingIndex !== -1) {
      // Update position
      const newPlacedPlayers = [...gameState.placedPlayers];
      newPlacedPlayers[existingIndex] = {
        player,
        section,
        position: { x: 0, y: 0 }
      };
      setGameState({
        ...gameState,
        placedPlayers: newPlacedPlayers
      });
    } else {
      // Add new placement
      setGameState({
        ...gameState,
        placedPlayers: [
          ...gameState.placedPlayers,
          {
            player,
            section,
            position: { x: 0, y: 0 }
          }
        ]
      });
    }
  };

  const canProceedToSelection = selectedTeam !== null;
  const canProceedToPlacement =
    gameState.selectedPlayers.length === 5 && gameState.selectedGoalie !== null;
  const allPlayersPlaced = gameState.placedPlayers.length === 6; // 5 players + 1 goalie

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Image
            src="/favicon.ico"
            alt="Play-by-Play logo"
            width={56}
            height={56}
            className={styles.titleIcon}
            priority
          />
          <span className={styles.titleText}>Play-by-Play</span>
        </h1>
        <p className={styles.subtitle}>Strategy Card Game</p>
      </header>

      <div className={styles.phaseIndicator}>
        <button
          className={`${styles.phaseButton} ${
            gamePhase === 'team' ? styles.active : ''
          }`}
          onClick={() => setGamePhase('team')}
        >
          1. Choose Team
        </button>
        <button
          className={`${styles.phaseButton} ${
            gamePhase === 'selection' ? styles.active : ''
          } ${!canProceedToSelection ? styles.disabled : ''}`}
          onClick={() => canProceedToSelection && setGamePhase('selection')}
          disabled={!canProceedToSelection}
        >
          2. Select Players
        </button>
        <button
          className={`${styles.phaseButton} ${
            gamePhase === 'placement' ? styles.active : ''
          } ${!canProceedToPlacement ? styles.disabled : ''}`}
          onClick={() => canProceedToPlacement && setGamePhase('placement')}
          disabled={!canProceedToPlacement}
        >
          3. Place Players
        </button>
        <button
          className={`${styles.phaseButton} ${
            gamePhase === 'playing' ? styles.active : ''
          } ${!allPlayersPlaced ? styles.disabled : ''}`}
          onClick={() => allPlayersPlaced && setGamePhase('playing')}
          disabled={!allPlayersPlaced}
        >
          4. Play Game
        </button>
      </div>

      {gamePhase === 'team' && (
        <div className={styles.teamPhase}>
          <TeamSelection
            onTeamSelect={handleTeamSelect}
            selectedTeam={selectedTeam}
          />

          {canProceedToSelection && (
            <div className={styles.proceedButton}>
              <button onClick={() => setGamePhase('selection')}>
                Proceed to Player Selection →
              </button>
            </div>
          )}
        </div>
      )}

      {gamePhase === 'selection' && selectedTeam && (
        <div className={styles.selectionPhase}>
          <div className={styles.teamBadge}>
            <span className={styles.teamLabel}>Playing as:</span>
            <span className={styles.teamNameBadge}>{selectedTeam}</span>
          </div>

          <PlayerSelection
            availablePlayers={availablePlayers}
            selectedPlayers={gameState.selectedPlayers}
            selectedGoalie={gameState.selectedGoalie}
            onPlayerSelect={handlePlayerSelect}
            onGoalieSelect={handleGoalieSelect}
          />

          {canProceedToPlacement && (
            <div className={styles.proceedButton}>
              <button onClick={() => setGamePhase('placement')}>
                Proceed to Player Placement →
              </button>
            </div>
          )}
        </div>
      )}

      {gamePhase === 'placement' && (
        <div className={styles.placementPhase}>
          <div className={styles.instructions}>
            <h3>Drag and drop your players onto the board</h3>
            <p>
              Place your <strong>goalie in the goalie zone</strong> and your{' '}
              <strong>5 players in other zones</strong>
            </p>
          </div>

          <div className={styles.placementContainer}>
            <div className={styles.draggableRoster}>
              <h4>Your Team ({selectedTeam})</h4>
              <p className={styles.dragHint}>
                Drag these players to the board below ↓
              </p>
              <div className={styles.draggableCards}>
                {gameState.selectedGoalie && (
                  <PlayerCard
                    player={gameState.selectedGoalie}
                    draggable={true}
                    size="medium"
                  />
                )}
                {gameState.selectedPlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    draggable={true}
                    size="medium"
                  />
                ))}
              </div>
            </div>

            <div className={styles.boardSection}>
              <GameBoard
                placedPlayers={gameState.placedPlayers}
                onPlayerPlace={handlePlayerPlace}
              />
            </div>
          </div>

          {allPlayersPlaced && (
            <div className={styles.proceedButton}>
              <button onClick={() => setGamePhase('playing')}>
                Start Game! →
              </button>
            </div>
          )}
        </div>
      )}

      {gamePhase === 'playing' && (
        <div className={styles.playingPhase}>
          <div className={styles.gameInfo}>
            <h3>Game In Progress</h3>
            <p className={styles.teamPlaying}>
              Playing as: <strong>{selectedTeam}</strong>
            </p>
            <p>
              Current Turn: {gameState.currentTurn === 'home' ? 'Home' : 'Away'}
            </p>
          </div>

          <GameBoard
            placedPlayers={gameState.placedPlayers}
            onPlayerPlace={handlePlayerPlace}
          />

          <div className={styles.gameControls}>
            <button className={styles.actionButton}>Pass</button>
            <button className={styles.actionButton}>Shoot</button>
            <button className={styles.actionButton}>Check</button>
            <button className={styles.actionButton}>Use Tactic Card</button>
          </div>
        </div>
      )}
    </main>
  );
}
