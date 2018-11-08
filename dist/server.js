'use strict';

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('apollo-server-express'),
    graphqlExpress = _require.graphqlExpress,
    graphiqlExpress = _require.graphiqlExpress;

var _require2 = require('graphql-tools'),
    makeExecutableSchema = _require2.makeExecutableSchema;

require('node-hot') // Globally configure node-hot (optional)
.configure({
  // Disable logging (default: false)
  silent: true,
  // Automatically patch all exported classes (default: false)
  patchExports: true,
  // Exclude patterns (default: node_modules)
  exclude: [/[\/\\]node_modules[\/\\]/, /[\/\\]bower_components[\/\\]/, /[\/\\]jspm_packages[\/\\]/]
});

var _require3 = require('./movies-hystrix'),
    MoviesAPI = _require3.MoviesAPI;

var moviesAPI = new MoviesAPI(); // The GraphQL schema in string form

var typeDefs = "\n  type Query { movies: [Movie] }\n  type Movie { title: String, description: String }\n"; // The resolvers

var resolvers = {
  Query: {
    movies: function movies() {
      return moviesAPI.fetchAll();
    }
  }
}; // Put together a schema

var schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
}); // Initialize the app

var app = express(); // The GraphQL endpoint

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  debug: false
})); // GraphiQL, a visual editor for queries

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
})); // Start the server

app.listen(3000, function () {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});