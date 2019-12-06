const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Char {
    name: String,
    id: Int 
  },
  type Argument {
    text: String,
    number: Int
  },
  enum Round{
    wait,
    stop,
    start
  },
  type Query {
    getId(id: Int!): Char,
    getArgs(text: String, number: Int): Argument,
    getRound: Round,
  }
`);

const root = {
    getId: (parent, { id }, context, info) => {
        return {
            name: "yam",
            id: id
        };
    },
    getArgs: (parent, { text, number }, context, info) => {
        return {
            text,
            number
        }
    },
    getRound: () => {
        return "start"
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
});
