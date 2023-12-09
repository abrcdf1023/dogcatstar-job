import 'server-only'

import { Reviews } from '@/interfaces/entities'
import client from './client'

const fetchMovieReviews = (movieId: string) => client<Reviews>(`https://api.themoviedb.org/3/movie/${movieId}/reviews`)

export default fetchMovieReviews