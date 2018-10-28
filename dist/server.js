'use strict';

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('apollo-server-express'),
    graphqlExpress = _require.graphqlExpress,
    graphiqlExpress = _require.graphiqlExpress;

var _require2 = require('graphql-tools'),
    makeExecutableSchema = _require2.makeExecutableSchema;

var _require3 = require('./movies.js'),
    Movies = _require3.Movies; // The GraphQL schema in string form


var typeDefs = "\n  type Query { movies: [Movie] }\n  type Movie { title: String, description: String }\n"; // The resolvers

var resolvers = {
  Query: {
    movies: function movies() {
      var movies = new Movies();
      return movies.fetchAll();
    }
  }
}; // Put together a schema

var schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
}); // Initialize the app

var app = express(); // The GraphQL endpoint

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema
})); // GraphiQL, a visual editor for queries

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
})); // Start the server

app.listen(3000, function () {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});