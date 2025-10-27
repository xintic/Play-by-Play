// Player types
export type PlayerPosition =
  | 'goalie'
  | 'left-defense'
  | 'right-defense'
  | 'left-wing'
  | 'center'
  | 'right-wing';

export interface Player {
  id: string;
  name: string;
  number: number;
  team: 'Frölunda' | 'Leksand';
  position: PlayerPosition;
  imageUrl: string;
}

// Board sections - Numbered rink layout with goalie creases
export type BoardSection =
  | 'goalie-home' // Home team's goalie crease (top)
  | 'zone-7'
  | 'zone-8'
  | 'zone-5'
  | 'zone-6'
  | 'zone-3'
  | 'zone-4'
  | 'zone-1'
  | 'zone-2'
  | 'goalie-away'; // Away team's goalie crease (bottom)

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
