/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'

import MoviesList from '../MoviesList'
// import MovieService from '../../API/MoviesService'

export default class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  // componentDidMount() {
  //   const MovieService1 = new MovieService()
  //   MovieService1.searchMovies('return').then((res) => {
  //     console.log(res)
  //   })
  // }

  render() {
    return (
      <Layout>
        <MoviesList />
      </Layout>
    )
  }
}
