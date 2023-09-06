export default class MovieService {
  #apiBase = 'https://api.themoviedb.org/3/'

  #apiKey = '33240de3655f24679e1d96684ada1349'

  #getOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzI0MGRlMzY1NWYyNDY3OWUxZDk2Njg0YWRhMTM0OSIsInN1YiI6IjY0ZTY3ZWYzNTI1OGFlMDEyY2E0MjAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SVd_9xLU3FdPyfCuM0O5gOivdCwIoXUf3Tjxw5JA380',
    },
  }

  async getResource(path) {
    const url = new URL(path, this.#apiBase)
    const response = await fetch(url, this.#getOptions)
    if (!response.ok) {
      throw new Error(`Ошибка при запросе. Статус ответа: ${response.status}`)
    }
    const body = await response.json()
    return {
      all: body,
      results: body.results,
      totalResults: body.total_results,
    }
  }

  async searchMovies(keyword, pageNumber = 1) {
    const path = 'search/movie'
    const url = new URL(path, this.#apiBase)
    url.searchParams.set('query', keyword)
    url.searchParams.set('page', pageNumber)
    return this.getResource(url)
  }

  async createGuestSession() {
    const path = 'authentication/guest_session/new'
    const url = new URL(path, this.#apiBase)
    const response = await fetch(url, this.#getOptions)
    if (!response.ok) {
      throw new Error(`Ошибка при создании гостевой сессии. Статус ответа: ${response.status}`)
    }
    const body = await response.json()
    return body.guest_session_id
  }

  async addRating(movieId, rating, guestSessionId) {
    const path = `movie/${movieId}/rating`
    const url = new URL(path, this.#apiBase)
    url.searchParams.set('guest_session_id', guestSessionId)
    url.searchParams.set('api_key', this.#apiKey)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rating }),
    })
    if (!response.ok) {
      throw new Error(`Ошибка при добавлении рейтинга. Статус ответа: ${response.status}`)
    }
    const body = await response.json()
    return body
  }

  async getRatedMovies(guestSessionId, page = 1) {
    const path = `guest_session/${guestSessionId}/rated/movies`
    const url = new URL(path, this.#apiBase)
    url.searchParams.set('language', 'en-US')
    url.searchParams.set('page', page)
    url.searchParams.set('api_key', this.#apiKey)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Ошибка при получении оцененных фильмов. Статус ответа: ${response.status}`)
    }
    const body = await response.json()
    return {
      all: body,
      results: body.results,
      totalRatedResults: body.total_results,
    }
  }

  async getGenreList() {
    const path = 'genre/movie/list'
    const url = new URL(path, this.#apiBase)
    url.searchParams.set('language', 'en')
    const response = await fetch(url, this.#getOptions)
    if (!response.ok) {
      throw new Error(`Ошибка при получении списка жанров. Статус ответа: ${response.status}`)
    }
    const body = await response.json()
    return body.genres
  }
}
