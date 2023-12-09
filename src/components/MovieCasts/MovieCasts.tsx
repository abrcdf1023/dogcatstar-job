import * as  React from 'react'

import { Cast } from '@/interfaces/entities'

import Image from '../Image'
import Typography from '../Typography'

import classNames from 'classnames/bind'
import styles from './MovieCasts.module.css'
const cx = classNames.bind(styles)

export interface MovieCreditsProps {
  casts?: Cast[]   
}

const MovieCasts = (props: MovieCreditsProps) => {
  const { casts } = props
  
  return (
    <>
      <Typography component="h1" fontSize={24} fontWeight={700} style={{ paddingLeft: 8 }}>Top Billed Cast</Typography>
      <div className={cx('list')}>
        {casts?.map(el => (
          <div key={el.id} className={cx('list-item')}>
            <Image path={el.profile_path} width={138} height={175} alt={el.name || ''} />
            <div className={cx('list-item-info')}>
              <Typography component="h2" fontSize={12} fontWeight={700}>{el.name}</Typography>
              <Typography component="p" fontSize={12} fontWeight={400}>{el.character}</Typography>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MovieCasts