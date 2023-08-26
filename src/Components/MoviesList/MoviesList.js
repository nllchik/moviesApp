import React from 'react'
import { Layout, Spin, Pagination } from 'antd'
import { Online, Offline } from 'react-detect-offline'
import './MoviesList.css'

import MoviesItem from '../MoviesItem'
import ErrorHandling from '../ErrorHandling'
import NetworkError from '../NetworkError'

const { Content } = Layout

function MoviesList({ items, isLoading, error, errorMessage, noResults, currentPage, onPaginationChange, totalPages }) {
  const errorComponent = error ? <ErrorHandling errorMessage={errorMessage} /> : null

  const noResultsMessage = !isLoading && noResults ? <h1>Результатов по вашему поиску нет</h1> : null

  const hasData = !isLoading && !error
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

  const pagination =
    !isLoading && !noResults ? (
      <Pagination current={currentPage} showSizeChanger={false} onChange={onPaginationChange} total={totalPages * 10} />
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
        <Content className="main__content">
          {errorComponent}
          {content}
          {noResultsMessage}
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
