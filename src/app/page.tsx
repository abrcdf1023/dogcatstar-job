import * as React from 'react'

import fetchPopularList from '@/apis/fetchPopularList'
import MoveCard from '@/components/MoveCard'

export default async function Home() {
  const data = await fetchPopularList()

  return data.results.map(el => (
    <MoveCard
      key={el.id}
      title={el.title}
      posterPath={el.poster_path}
      releaseDate={el.release_date}
    />
  ))
}
