class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this.about = config.about;
    this.name = config.name;
    this.avatar = config.avatar;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }
}

const api = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
