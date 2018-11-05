import fetch from 'node-fetch';

export class MoviesAPI {
    fetchAll () {
        return fetch('http://localhost:4545/movies', { timeout: 2000 })
            .then(res => { return res.json(); });
    }
}