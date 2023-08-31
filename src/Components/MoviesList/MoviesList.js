import React from 'react'
import { Layout, Spin, Pagination } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import './MoviesList.css'

import MoviesItem from '../MoviesItem'
import ErrorHandling from '../ErrorHandling'
import NetworkError from '../NetworkError'

const { Content } = Layout

function MoviesList({
  items,
  isLoading,
  isRated,
  error,
  errorMessage,
  currentPage,
  currentRatePage,
  totalRatedResults,
  totalResults,
  onPaginationChange,
  guestSessionId,
}) {
  const errorComponent = error ? <ErrorHandling errorMessage={errorMessage} /> : null

  const hasData = !isLoading && !error
  const content = hasData
    ? items.map((item) => (
        <MoviesItem
          key={item.id}
          description={item.overview}
          date={item.release_date}
          title={item.title}
          poster={item.poster_path}
          average={item.vote_average}
          id={item.id}
          guestSessionId={guestSessionId}
          genreIds={item.genre_ids}
        />
      ))
    : null

  const spinner = isLoading ? <Spin className="main__spinner" size="large" /> : null

  const currentPaginationPage = isRated ? currentRatePage : currentPage
  const totalPaginationPage = isRated ? totalRatedResults : totalResults

  const pagination =
    !isLoading && !error && items.length > 0 ? (
      <Pagination
        current={currentPaginationPage}
        showSizeChanger={false}
        onChange={onPaginationChange}
        total={totalPaginationPage}
        defaultPageSize={20}
      />
    ) : null

  const polling = {
    enabled: true,
    interval: 5000,
    timeout: 3000,
    url: '8.8.8.8',
  }

  return (
    <Layout>
      <Online polling={polling}>
        {errorComponent}
        <Content className="main__content">
          {content}
          {spinner}
        </Content>
        {pagination}
      </Online>
      <Offline polling={polling}>
        <NetworkError />
      </Offline>
    </Layout>
  )
}
export default MoviesList
