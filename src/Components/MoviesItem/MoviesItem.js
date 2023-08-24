import React from 'react'
import PropTypes from 'prop-types'
import { Card, Space, Tag } from 'antd'
import { parse, format } from 'date-fns'

import './MoviesItem.css'
import imageFilm from './image-film.png'

const urlBase = 'https://image.tmdb.org/t/p/original'

function MoviesItem({ title, description, date, poster }) {
  function truncateDescription(desc) {
    if (description.length <= 200) {
      return desc
    }
    const truncate = `${description.slice(0, 345)}...`
    return truncate
  }
  const formattedDate = date ? format(parse(date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy') : 'Date unknown'

  return (
    <Card className="movie__item">
      <img className="movie__poster" src={poster ? urlBase + poster : imageFilm} alt="Film Poster" />
      <div className="movie__info">
        <h2 className="movie__title">{title}</h2>
        <p className="movie__release-date">{formattedDate}</p>
        <div className="movie__tags">
          <Space size={[0, 8]} wrap>
            <Tag>Action</Tag>
            <Tag>Drama</Tag>
          </Space>
        </div>
        <p className="movie__description">{truncateDescription(description) || 'No description'}</p>
      </div>
    </Card>
  )
}

MoviesItem.defaultProps = {
  title: 'Название неизвестно',
  description: 'Описание недоступно',
  date: 'Дата неизвестна',
  poster: null,
}

MoviesItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  poster: PropTypes.string,
}

export default MoviesItem
