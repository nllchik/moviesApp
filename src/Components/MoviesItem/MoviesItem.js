import React from 'react'
import PropTypes from 'prop-types'
import { Card, Space, Tag } from 'antd'
import { parse, format } from 'date-fns'
import classNames from 'classnames'

import './MoviesItem.css'
import MoviesRate from '../MoviesRate/MoviesRate'
import { GenreConsumer } from '../GenreContext/GenreContext'

import defaultImage from './image-film.png'

const urlBase = 'https://image.tmdb.org/t/p/original'

function MoviesItem({ title, id, description, date, poster, average, guestSessionId, genreIds }) {
  const defaultPoster = (e) => {
    e.target.src = defaultImage
  }

  function truncateDescription(desc) {
    const maxLength = 180

    if (desc.length <= maxLength) {
      return desc
    }

    const lastSpaceIndex = desc.lastIndexOf(' ', maxLength)
    const truncate = `${desc.slice(0, lastSpaceIndex)}...`
    return truncate
  }

  const formattedDate = date ? format(parse(date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy') : 'Date unknown'

  const avgFixed = average.toFixed(1)

  const styleClass = classNames('movie__title', {
    averageStyle1: avgFixed <= 3,
    averageStyle2: avgFixed > 3 && avgFixed <= 5,
    averageStyle3: avgFixed > 5 && avgFixed <= 7,
    averageStyle4: avgFixed > 7,
  })

  const tagsList = (
    <div className="movie__tags">
      <Space size={[0, 8]} wrap>
        <GenreConsumer>
          {(genreList) =>
            genreIds.length > 0 ? (
              genreIds.slice(0, 3).map((genreId) => <Tag key={genreId}>{genreList[genreId]}</Tag>)
            ) : (
              <Tag>No tag</Tag>
            )
          }
        </GenreConsumer>
      </Space>
    </div>
  )

  return (
    <Card className="movie__item">
      <img
        className="movie__poster"
        src={poster ? urlBase + poster : defaultImage}
        alt="Film Poster"
        onError={defaultPoster}
      />
      <div className="movie__info">
        <div className="movie__info-content">
          <h2 className={styleClass} data-average={avgFixed}>
            {title}
          </h2>
          <span className="movie__release-date">{formattedDate}</span>
          {tagsList}
          <p className="movie__description">{truncateDescription(description) || 'No description'}</p>
        </div>
        <MoviesRate id={id} guestSessionId={guestSessionId} />
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
