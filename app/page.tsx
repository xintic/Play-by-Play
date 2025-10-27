'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className={styles.main}>
      <div className={styles.logoContainer}>
        <Image
          src="/game-boards/board.png"
          alt="Hockey Game Board"
          width={300}
          height={200}
          className={styles.logo}
          priority
        />
      </div>
      <h1>Play-by-Play Hockey Game</h1>
      <div className={styles.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>app/page.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.description}>
        A hockey strategy card game - ready for multiplayer!
      </p>
    </main>
  );
}
