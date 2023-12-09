'use client'

import * as React from 'react'

import useDebounce from '@/hooks/useDebounce'
import useMovieSearch from '@/hooks/useMovieSearch'
import { ListResponse, Movie } from '@/interfaces/entities'

import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import MovieSimpleCard from '@/components/MovieSimpleCard'
import Grid from '@/components/Grid'
import Skeleton from '@/components/Skeleton'

import classNames from 'classnames/bind'
import styles from './HomeLayout.module.css'

const cx = classNames.bind(styles)

export interface LayoutProps {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: LayoutProps) => {
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
              <MovieSimpleCard
                href={`/movie/${el.id}`}
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
    <div className={cx('root')}>
      <Container className={cx('container')}>
        <div className={styles.search}>
          <SearchBar onChange={handleSearchChange} />
        </div>
        {renderList()}
      </Container>
    </div>
  )
}

export default HomeLayout