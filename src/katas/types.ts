export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface KataMetadata {
  readonly id: string;
  readonly title: string;
  readonly difficulty: Difficulty;
  readonly topics: string[];
  readonly summary: string;
  readonly entry: string;
  readonly estimatedTime: string;
}

export interface Kata extends KataMetadata {
  readonly objectives: readonly string[];
  readonly tips: readonly string[];
}
