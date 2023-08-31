import React from 'react'
import './NoResultMsg.css'

function NoResultMsg({ isLoading, isRated, movies, error }) {
  let message

  if (isLoading || error) {
    return null
  }

  if (movies.length === 0) {
    if (isRated) {
      message = 'Вы еще не оценивали фильмы.'
    } else {
      message = 'Результатов по вашему поиску нет.'
    }
  }

  return message ? <h1 className="message">{message}</h1> : null
}

export default NoResultMsg
