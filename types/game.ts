// Player types
export type PlayerPosition = 'forward' | 'defense' | 'goalie';

export interface Player {
  id: string;
  name: string;
  number: number;
  team: 'Frölunda' | 'Leksand';
  position: PlayerPosition;
  imageUrl: string;
}

// Board sections - Hockey rink layout
// Goalie zones at each end, then defensive/neutral/offensive zones with home/away sides
export type BoardSection =
  | 'goalie-home' // Home team's goalie zone (top)
  | 'defensive-home' // Home defensive zone
  | 'defensive-away' // Away defensive zone
  | 'neutral-left-home' // Neutral zone left side (home)
  | 'neutral-left-away' // Neutral zone left side (away)
  | 'neutral-right-home' // Neutral zone right side (home)
  | 'neutral-right-away' // Neutral zone right side (away)
  | 'offensive-home' // Home offensive zone
  | 'offensive-away' // Away offensive zone
  | 'goalie-away'; // Away team's goalie zone (bottom)

export interface PlacedPlayer {
  player: Player;
  section: BoardSection;
  position: { x: number; y: number }; // Position within the section
}

export interface GameState {
  selectedPlayers: Player[]; // 5 players
  selectedGoalie: Player | null;
  placedPlayers: PlacedPlayer[];
  currentTurn: 'home' | 'away';
}
