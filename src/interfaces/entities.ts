export interface ListResponse<T> {
  page: number;
  results: T[];
}

export interface Movie {
  id: number;
  adult?: boolean;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  title?: string;
  vote_average?: number;
  vote_count?: number;
}
