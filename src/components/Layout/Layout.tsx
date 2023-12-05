'use client'

import * as React from 'react'

import useDebounce from '@/hooks/useDebounce'
import useMovieSearch from '@/hooks/useMovieSearch'
import { ListResponse, Movie } from '@/interfaces/entities'

import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import MoveCard from '@/components/MoveCard'
import Grid from '@/components/Grid'

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
    if (isLoading || isValidating) return <p>Loading...</p>
    if (data) {
      return (
        data.results.map((el) => (
          <Grid key={el.id}>
            <MoveCard
              title={el.title}
              posterPath={el.poster_path}
              releaseDate={el.release_date}
            />
          </Grid>
        ))
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
        <Grid container>
          {renderList()}
        </Grid>
      </main>
    </Container>
  )
}

export default Layout