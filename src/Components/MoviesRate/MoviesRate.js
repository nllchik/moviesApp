import React from 'react'
import { Rate } from 'antd'

import MovieService from '../../API/MoviesService'

import './MoviesRate.css'

function MoviesRate({ id, guestSessionId }) {
  const onRateChange = async (value) => {
    const movieService = new MovieService()
    movieService.addRating(id, value, guestSessionId)
    localStorage.setItem(id, value)
  }
  const getRateFromLocal = localStorage.getItem(id)
  const defaultValue = getRateFromLocal ? parseFloat(getRateFromLocal) : 0

  return (
    <div className="movie__rating">
      <Rate allowHalf defaultValue={defaultValue} count={10} onChange={onRateChange} />
    </div>
  )
}

export default MoviesRate
