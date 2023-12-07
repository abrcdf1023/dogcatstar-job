import 'server-only'

import { Cast, Crew } from '@/interfaces/entities'
import client from './client'

const fetchMovieCredits = (movieId: string) => client<{
  id: number;
  cast: Cast[];
  crew: Crew[];
}>(`https://api.themoviedb.org/3/movie/${movieId}/credits`)

export default fetchMovieCredits