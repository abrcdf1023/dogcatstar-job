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

export interface Cast {
  adult?: boolean;
  gender?: number;
  id: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

export interface Crew {
  adult?: boolean;
  gender?: number;
  id: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: null;
  credit_id?: string;
  department?: string;
  job?: string;
}

export interface Author {
  author?: string;
  author_details?: AuthorDetails;
  content?: string;
  created_at?: string;
  id: string;
  updated_at?: string;
  url?: string;
}

export interface AuthorDetails {
  name?: string;
  username?: string;
  avatar_path?: null;
  rating?: number;
}
