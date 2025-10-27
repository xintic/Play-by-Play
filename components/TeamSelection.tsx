'use client';

import Image from 'next/image';
import styles from './TeamSelection.module.css';

interface TeamSelectionProps {
  onTeamSelect: (team: 'Frölunda' | 'Leksand') => void;
  selectedTeam?: 'Frölunda' | 'Leksand' | null;
}

export default function TeamSelection({ onTeamSelect, selectedTeam }: TeamSelectionProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Your Team</h2>
      <p className={styles.subtitle}>Select which team you want to play with</p>

      <div className={styles.teamsGrid}>
        <div
          className={`${styles.teamCard} ${selectedTeam === 'Frölunda' ? styles.selected : ''}`}
          onClick={() => onTeamSelect('Frölunda')}
        >
          <div className={styles.logoWrapper}>
            <Image
              src="/PlayerCards/Frölunda/Frölunda-logo.png"
              alt="Frölunda HC"
              fill
              sizes="(max-width: 768px) 200px, 300px"
              className={styles.logo}
            />
          </div>
          <h3 className={styles.teamName}>Frölunda HC</h3>
          {selectedTeam === 'Frölunda' && (
            <div className={styles.selectedBadge}>✓ Selected</div>
          )}
        </div>

        <div
          className={`${styles.teamCard} ${selectedTeam === 'Leksand' ? styles.selected : ''}`}
          onClick={() => onTeamSelect('Leksand')}
        >
          <div className={styles.logoWrapper}>
            <Image
              src="/PlayerCards/Leksand/Leksand-logo.png"
              alt="Leksands IF"
              fill
              sizes="(max-width: 768px) 200px, 300px"
              className={styles.logo}
            />
          </div>
          <h3 className={styles.teamName}>Leksands IF</h3>
          {selectedTeam === 'Leksand' && (
            <div className={styles.selectedBadge}>✓ Selected</div>
          )}
        </div>
      </div>
    </div>
  );
}

