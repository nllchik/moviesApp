import React, { Component } from 'react'
import { Input } from 'antd'
import debounce from 'lodash.debounce'

import './SearchBar.css'

export default class SearchBar extends Component {
  debouncedSearch = debounce(() => this.executeSearch(), 1000)

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
    }
  }

  executeSearch = () => {
    const { searchMovie } = this.props
    const { inputValue } = this.state
    searchMovie(inputValue)
  }

  onInputChange = (e) => {
    const currentValue = e.target.value

    this.setState({
      inputValue: currentValue,
    })
    if (currentValue.trim().length > 0) {
      this.debouncedSearch()
    } else {
      this.debouncedSearch.cancel()
    }
  }

  render() {
    const { inputValue } = this.state
    return <Input placeholder="Type to search..." value={inputValue} onChange={this.onInputChange} />
  }
}
