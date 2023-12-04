import * as React from 'react'

import client from '@/apis/client'

export default function useMovieSearch<D>(searchParams: Record<string, string>): { data?: D, isFetching: boolean } {
  const [data, setDate] = React.useState<D>()
  const [isFetching, setIsFetching] = React.useState(false)

  React.useEffect(() => {
    setIsFetching(true)
    // Better to use [query-string](https://www.npmjs.com/package/query-string) instead of URLSearchParams.
    client<D>(`https://api.themoviedb.org/3/search/movie?${new URLSearchParams(searchParams).toString()}`).then((res) => {
      setDate(res)
    }).finally(() => {
      setIsFetching(false)
    })
  }, [searchParams])

  return { data, isFetching }
}