import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'

import MoviesList from '../MoviesList'
import SearchBar from '../SearchBar'
import MovieService from '../../API/MoviesService'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      items: [],
      isLoading: true,
      error: false,
      errorMessage: '',
      searchText: 'return',
      noResults: false,
      currentPage: 1,
      totalPages: 0,
    }

    this.movieService = new MovieService()
  }

  componentDidMount() {
    const { currentPage } = this.state
    this.fetchLists(currentPage)
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchText, currentPage } = this.state

    if (prevState.searchText !== searchText) {
      this.fetchLists(1)
    }

    if (prevState.currentPage !== currentPage) {
      this.fetchLists(currentPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  onError = (error) => {
    this.setState({
      error: true,
      isLoading: false,
      errorMessage: error.message,
    })
  }

  fetchLists = (pageNumber = 1) => {
    const { searchText } = this.state
    this.setState({ isLoading: true })

    this.movieService
      .searchMovies(searchText, pageNumber)
      .then(({ results, totalPages }) => {
        this.setState({
          items: results,
          isLoading: false,
          error: false,
          noResults: results.length === 0,
          currentPage: pageNumber,
          totalPages,
        })
      })
      .catch(this.onError)
  }

  onPaginationChange = (page) => {
    this.setState({ currentPage: page })
  }

  searchMovie = (movie) => {
    this.setState({
      searchText: movie,
    })
  }

  render() {
    const { items, isLoading, error, errorMessage, searchText, noResults, totalPages, currentPage } = this.state
    const { searchMovie, onPaginationChange } = this

    return (
      <Layout>
        <SearchBar searchText={searchText} searchMovie={searchMovie} />
        <MoviesList
          items={items}
          isLoading={isLoading}
          error={error}
          errorMessage={errorMessage}
          noResults={noResults}
          totalPages={totalPages}
          currentPage={currentPage}
          onPaginationChange={onPaginationChange}
        />
      </Layout>
    )
  }
}
