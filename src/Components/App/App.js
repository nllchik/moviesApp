import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'

import Header from '../Header'
import MoviesList from '../MoviesList'
import SearchBar from '../SearchBar'
import MovieService from '../../API/MoviesService'
import NoResultMsg from '../NoResultMsg'
import { GenreProvider } from '../GenreContext/GenreContext'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      items: [],
      ratedItems: [],
      isLoading: true,
      error: false,
      errorMessage: '',
      searchText: 'return',
      isRated: false,
      currentPage: 1,
      currentRatePage: 1,
      guestSessionId: null,
      genreList: [],
    }

    this.movieService = new MovieService()
  }

  componentDidMount() {
    this.searchMovies()
    this.createGuestSession()
    this.getGenreList()
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchText, currentPage, isRated, currentRatePage } = this.state

    if (prevState.searchText !== searchText || prevState.currentPage !== currentPage) {
      this.searchMovies()
    }

    if (isRated && prevState.currentRatePage !== currentRatePage) {
      this.getRatedMovies()
    }
  }

  searchMovies = () => {
    const { searchText, currentPage } = this.state
    this.setState({ isLoading: true })

    this.movieService
      .searchMovies(searchText, currentPage)
      .then(({ results, totalResults }) => {
        this.setState({
          items: results,
          isLoading: false,
          error: false,
          totalResults,
        })
      })
      .catch((error) => {
        this.setState({
          error: true,
          isLoading: false,
          errorMessage: error.message,
        })
      })
  }

  createGuestSession = () => {
    const GuestFromLocal = localStorage.getItem('guest')
    if (GuestFromLocal) {
      this.setState({
        guestSessionId: GuestFromLocal,
      })
      return
    }

    this.movieService
      .createGuestSession()
      .then((guestSessionId) => {
        localStorage.setItem('guest', guestSessionId)
        this.setState({
          guestSessionId,
        })
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMessage: error.message,
        })
      })
  }

  onPaginationChange = (page) => {
    const { isRated } = this.state
    if (isRated) {
      this.setState({ currentRatePage: page })
    } else {
      this.setState({ currentPage: page })
    }
  }

  searchMovie = (movie) => {
    this.setState({
      searchText: movie,
      currentPage: 1,
    })
  }

  toggleIsRated = (bool) => {
    this.setState({
      isRated: bool,
    })
  }

  getRatedMovies = () => {
    this.setState({
      isLoading: true,
    })
    const { guestSessionId, currentRatePage } = this.state

    this.movieService
      .getRatedMovies(guestSessionId, currentRatePage)
      .then(({ results, totalRatedResults }) => {
        this.setState({
          ratedItems: results,
          totalRatedResults,
          isLoading: false,
        })
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMessage: error.message,
        })
      })
  }

  getGenreList = () => {
    this.movieService.getGenreList().then((res) => {
      const genreArray = {}
      res.forEach((el) => {
        genreArray[el.id] = el.name
      })
      this.setState({
        genreList: { ...genreArray },
      })
    })
  }

  render() {
    const {
      items,
      isLoading,
      error,
      errorMessage,
      searchText,
      totalResults,
      currentPage,
      isRated,
      ratedItems,
      guestSessionId,
      currentRatePage,
      totalRatedResults,
      genreList,
    } = this.state
    const { searchMovie, onPaginationChange, toggleIsRated, rateMovie, getRatedMovies } = this

    const moviesToDisplay = isRated ? ratedItems : items

    const searchBar = isRated ? null : <SearchBar searchText={searchText} searchMovie={searchMovie} />

    return (
      <Layout>
        <Header toggleIsRated={toggleIsRated} getRatedMovies={getRatedMovies} />
        {searchBar}
        <NoResultMsg isLoading={isLoading} isRated={isRated} movies={moviesToDisplay} error={error} />
        <GenreProvider value={genreList}>
          <MoviesList
            rateMovie={rateMovie}
            items={moviesToDisplay}
            isLoading={isLoading}
            error={error}
            errorMessage={errorMessage}
            totalResults={totalResults}
            currentPage={currentPage}
            onPaginationChange={onPaginationChange}
            isRated={isRated}
            guestSessionId={guestSessionId}
            currentRatePage={currentRatePage}
            totalRatedResults={totalRatedResults}
          />
        </GenreProvider>
      </Layout>
    )
  }
}
