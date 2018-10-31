import fetch from 'node-fetch';
import {CommandsBuilder} from './CommandsBuilder';

export class Movies {
    fetchMovies () {
      console.log('Trying to grab some sweet movie metadata!');
      return fetch('http://localhost:4545/movies')
    }

    fetchAll () {
        return CommandsBuilder.createMyCommand({
            runFn: () => {
                return this.fetchMovies().then((res) => res.json())
            },
            fallbackFn: () => {
                console.log('Request has failed')
                return Promise.resolve([]);
            }
        }).execute();
    }
}