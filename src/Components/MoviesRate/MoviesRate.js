import React from 'react'
import { Rate } from 'antd'

import './MoviesRate.css'

function MoviesRate({ id, addRating }) {
  const onRateChange = async (value) => {
    addRating(id, value)
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
