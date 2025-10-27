'use client';

import Image from 'next/image';
import { Player } from '@/types/game';
import styles from './PlayerCard.module.css';

interface PlayerCardProps {
  player: Player;
  isSelected?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function PlayerCard({ 
  player, 
  isSelected = false, 
  onClick, 
  draggable = false,
  size = 'medium' 
}: PlayerCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (draggable) {
      e.dataTransfer.setData('player', JSON.stringify(player));
    }
  };

  return (
    <div
      className={`${styles.card} ${styles[size]} ${isSelected ? styles.selected : ''} ${
        onClick ? styles.clickable : ''
      }`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={player.imageUrl}
          alt={player.name}
          fill
          sizes="(max-width: 768px) 100px, 150px"
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.number}>#{player.number}</span>
        <span className={styles.name}>{player.name}</span>
        <span className={styles.position}>{player.position}</span>
      </div>
      {isSelected && <div className={styles.checkmark}>✓</div>}
    </div>
  );
}

