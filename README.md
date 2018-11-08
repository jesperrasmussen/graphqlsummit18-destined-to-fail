# Destined to Fail HystrixJS demo

This allows you to run (and inspect) the HystrixJS solution I presented at GraphQL Summit 2018.

## Running

### Starting the mock service

Run `docker-compose up` within the docker directory. This will start Mountebank and setup a single endpoint for mocking the movies data.

## Running the Apollo Server example

Install the dependencies

`npm install`

Use Babel to translate the source

`npx babel src --out-dir dist`

And run the Apollo Server

`node dist/server.js`