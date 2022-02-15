export interface GetFilmsResponse {
  results: Film[];
}

export interface Film {
  title: string;
  episode_id: number;
  release_date: string;
  characters: string[];
}
