'use client'

import * as React from 'react'

import useDebounce from '@/hooks/useDebounce'
import useMovieSearch from '@/hooks/useMovieSearch'
import { ListResponse, Movie } from '@/interfaces/entities'

import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import MoveCard from '@/components/MoveCard'
import Grid from '@/components/Grid'
import Skeleton from '@/components/Skeleton'

import styles from './Layout.module.css'

export interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [query, setQuery] = React.useState('')
  const [page, setPage] = React.useState(1)
  const debounceQuery = useDebounce(query, 500)
  const { data, isLoading, isValidating } = useMovieSearch<ListResponse<Movie>>(debounceQuery, page)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const renderList = () => {
    if (isLoading || isValidating) {
      return (
        <Grid container>
          {Array.from({ length: 20 }, (_, i) => (
            <Grid key={i}>
              <Skeleton width={220} height={330} />
            </Grid>
          ))}
        </Grid>
      )
    }
    if (data) {
      return (
        <Grid container>
          {data.results.map((el) => (
            <Grid key={el.id}>
              <MoveCard
                title={el.title}
                posterPath={el.poster_path}
                releaseDate={el.release_date}
              />
            </Grid>
          ))}
        </Grid>
      )
    } 
    return children
  }

  return (
    <Container>
      <main className={styles.main}>
        <div className={styles.search}>
          <SearchBar onChange={handleSearchChange} />
        </div>
        {renderList()}
      </main>
    </Container>
  )
}

export default Layout