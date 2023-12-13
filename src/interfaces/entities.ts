export interface ListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Movie {
  id: number;
  adult?: boolean;
  popularity?: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  title?: string;
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
  genres?: Genre[];
  overview?: string;
  tagline?: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  homepage?: string;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  revenue?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  video?: boolean;
}

export interface PendingWatchMovie extends Movie {
  timeAddedToWatch: number;
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

export interface Reviews {
  id: number;
  page: number;
  results: Author[];
  total_pages: number;
  total_results: number;
}
