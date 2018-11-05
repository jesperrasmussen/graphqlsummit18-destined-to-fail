'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { MoviesAPI } = require('./movies-hystrix.js');
const moviesAPI = new MoviesAPI();

// The GraphQL schema in string form
const typeDefs = `
  type Query { movies: [Movie] }
  type Movie { title: String, description: String }
`;

// The resolvers
const resolvers = {
  Query: { 
      movies: () => {
        return moviesAPI.fetchAll();
      }
   },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});