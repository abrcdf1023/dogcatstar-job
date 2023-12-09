import * as  React from 'react'

import { Cast } from '@/interfaces/entities'

export interface MovieCreditsProps {
  casts?: Cast[]   
}

const MovieCasts = (props: MovieCreditsProps) => {
  const { casts } = props
  console.log(casts)
  return (
    <div>MovieCasts</div>
  )
}

export default MovieCasts