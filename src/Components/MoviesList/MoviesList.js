import React, { Component } from 'react'
import { Layout } from 'antd'
import './MoviesList.css'

import MoviesItem from '../MoviesItem'
import MovieService from '../../API/MoviesService'

const { Content } = Layout

export default class MoviesList extends Component {
  constructor() {
    super()

    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    const movieService = new MovieService()
    movieService.searchMovies('return').then((res) => {
      this.setState({
        items: res,
      })
    })
  }

  render() {
    const { items } = this.state
    return (
      <Layout>
        <Content className="main__content">
          {items.map((item) => (
            <MoviesItem
              key={item.id}
              description={item.overview}
              date={item.release_date}
              title={item.title}
              poster={item.poster_path}
            />
          ))}
        </Content>
      </Layout>
    )
  }
}
