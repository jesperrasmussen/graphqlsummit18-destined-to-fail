import fetch from 'node-fetch';
import {CommandsBuilder} from './CommandsBuilder';

export class MoviesAPI {
    fetchMovies () {
      console.log('Trying to grab some sweet movie metadata!');
      return fetch('http://localhost:4545/movies')
    }

    fetchAll () {
        return CommandsBuilder.createMyCommand({
            runFn: () => {
                return this.fetchMovies().then((res) => res.json())
            },
            fallbackFn: (error) => {
                switch (error.message) {
                    case "CommandTimeOut":
                        console.log('⚠️ Service timed out');
                        break;
                    case "OpenCircuitError":
                        console.log('❌ Circuit Breaker in OPEN state - halting requests to service to back off.');
                        break;
                    default:
                        console.log('I dont know - ' + error.message);
                }
                throw new Error('Movie API not responding');
                Promise.reject();
            }
        }).execute();
    }
}