export interface Game {
  stages: string[];
  players: string[];
  numberOfPlayers: number;
  locked: boolean;
  finished?: boolean;
  finalImage?: string;
}

export interface Player {
  name: string;
}
