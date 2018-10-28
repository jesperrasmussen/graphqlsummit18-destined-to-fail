import fetch from 'node-fetch';
const { createHystrixCommands, createHystrixStream, getPrometheusStream } = require('simplified-hystrixjs');

export class Movies {

    constructor() {
        this.serviceCommand = createHystrixCommands(this.fetchMovies, { name : 'MovieService', timeout: 2000});
    }

    fetchMovies () {
      console.log('fetching!');
      return fetch('http://localhost:4545/movies', { timeout: 4000 })
    }

    fallback () {
      return Promise.resolve({}.json());
    }

    getSomething () {
        try {
            const response = this.serviceCommand.fetchMovies()
                .then((res) => { return res.json(); })
                .catch((e) => {console.log('no', e); });
            return response
        } catch (e) {
            return Promise.resolve('fallback');
        }
    }
}