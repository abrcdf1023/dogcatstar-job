import 'server-only'

import { Author } from '@/interfaces/entities'
import client from './client'

const fetchMovieReviews = (movieId: string) => client<{
  id: number;
  page: number;
  results: Author[];
  total_pages: number;
  total_results: number;

}>(`https://api.themoviedb.org/3/movie/${movieId}/reviews`)

export default fetchMovieReviews