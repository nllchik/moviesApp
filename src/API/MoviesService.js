export default class MovieService {
  #apiBase = 'https://api.themoviedb.org/3/'

  #options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzI0MGRlMzY1NWYyNDY3OWUxZDk2Njg0YWRhMTM0OSIsInN1YiI6IjY0ZTY3ZWYzNTI1OGFlMDEyY2E0MjAyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SVd_9xLU3FdPyfCuM0O5gOivdCwIoXUf3Tjxw5JA380',
    },
  }

  async getResource(url) {
    const response = await fetch(this.#apiBase + url, this.#options)
    const body = await response.json()
    if (body.success === false) {
      throw new Error(body.status.message)
    } else {
      return body.results
    }
  }

  async searchMovies(keyword) {
    return this.getResource(`search/movie?query=${encodeURIComponent(keyword)}`)
  }
}
