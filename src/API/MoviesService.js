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

  async getResource(url) {
    const response = await fetch(this.#apiBase + url, this.#getOptions)
    const body = await response.json()
    if (body.success === false) {
      throw new Error(body.status.message)
    } else {
      return {
        all: body,
        results: body.results,
        totalResults: body.total_results,
      }
    }
  }

  async searchMovies(keyword, pageNumber = 1) {
    return this.getResource(`search/movie?query=${encodeURIComponent(keyword)}&page=${pageNumber}`)
  }

  async createGuestSession() {
    const response = await fetch(`${this.#apiBase}authentication/guest_session/new`, this.#getOptions)
    const body = await response.json()
    if (body.success === false) {
      throw new Error(body.status.message)
    } else {
      return body.guest_session_id
    }
  }

  async addRating(movieId, rating, guestSessionId) {
    const response = await fetch(
      `${this.#apiBase}movie/${movieId}/rating?guest_session_id=${guestSessionId}&api_key=${this.#apiKey}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rating }),
      }
    )
    const body = await response.json()

    if (body.error) {
      throw new Error(body.status.message)
    } else {
      return body
    }
  }

  async getRatedMovies(guestSessionId, page = 1) {
    const response = await fetch(
      `${this.#apiBase}guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&api_key=${
        this.#apiKey
      }`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    )
    const body = await response.json()

    if (body.error) {
      throw new Error(body.status.message)
    } else {
      return {
        all: body,
        results: body.results,
        totalRatedResults: body.total_results,
      }
    }
  }

  async getGenreList() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.#getOptions)
    const body = await response.json()
    if (body.error) {
      throw new Error(body.status.message)
    } else {
      return body.genres
    }
  }
}
