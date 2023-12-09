import * as React from 'react'

import Image from '@/components/Image'
import { Movie } from '@/interfaces/entities'

import Typography from '../Typography'
import Card from '../Card'

import className from 'classnames/bind'
import styles from './MovieCard.module.css'
import ButtonBase from '../ButtonBase'
const cx = className.bind(styles)

export interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement>{
  movie?: Movie
}

const MovieCard = (props: MovieCardProps) => {
  const { className, movie, ...other } = props
  return (
    <Card className={cx('root', className)} {...other}>
      <Image width={150} height={225} path={movie?.poster_path} alt={movie?.title || ''} />
      <div className={cx('card-body')}>
        <Typography component="h3" fontSize={24} fontWeight={700}>{movie?.title}</Typography>
        <Typography fontSize={12} color="text-secondary">{movie?.release_date}</Typography>
        <div className={cx('overview')}>
          <Typography>{movie?.overview}</Typography>
        </div>
        <ButtonBase className={cx('btn')}>Remove</ButtonBase>
      </div>
    </Card>
  )
}

export default MovieCard