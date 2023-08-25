import React, { Component } from 'react'
import { Layout, Spin } from 'antd'
import { Online, Offline } from 'react-detect-offline'
import './MoviesList.css'

import MoviesItem from '../MoviesItem'
import MovieService from '../../API/MoviesService'
import ErrorHandling from '../ErrorHandling'
import NetworkError from '../NetworkError'

const { Content } = Layout

export default class MoviesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isLoading: true,
      error: false,
      errorMessage: '',
    }
  }

  componentDidMount() {
    const movieService = new MovieService()
    movieService
      .searchMovies('return')
      .then((res) => {
        this.setState({
          items: res,
          isLoading: false,
          error: false,
        })
      })
      .catch(this.onError)
  }

  onError = (error) => {
    this.setState({
      error: true,
      isLoading: false,
      errorMessage: error.message,
    })
  }

  render() {
    const { items, isLoading, error, errorMessage } = this.state

    const hasData = !(isLoading, error)

    const errorComponent = error ? <ErrorHandling errorMessage={errorMessage} /> : null

    const content = hasData
      ? items.map((item) => (
          <MoviesItem
            key={item.id}
            description={item.overview}
            date={item.release_date}
            title={item.title}
            poster={item.poster_path}
          />
        ))
      : null

    const spinner = isLoading ? <Spin className="main__spinner" size="large" /> : null

    const polling = {
      enabled: true,
      interval: 5000,
      timeout: 3000,
      url: '8.8.8.8',
    }

    return (
      <Layout>
        <Online polling={polling}>
          <Content className="main__content">
            {errorComponent}
            {content}
            {spinner}
          </Content>
        </Online>
        <Offline polling={polling}>
          <NetworkError />
        </Offline>
      </Layout>
    )
  }
}
