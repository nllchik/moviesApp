import React from 'react'
import { Layout, Tabs } from 'antd'

import './Header.css'

const { Header } = Layout

function MyComponent({ toggleIsRated, getRatedMovies }) {
  const onChange = (key) => {
    if (key === '1') {
      toggleIsRated(false)
    }
    if (key === '2') {
      toggleIsRated(true)
      getRatedMovies()
    }
  }

  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]

  return (
    <Header>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Header>
  )
}

export default MyComponent
