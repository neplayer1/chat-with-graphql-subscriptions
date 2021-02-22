const express = require('express');
const http = require('http');
const { ApolloServer, PubSub } = require('apollo-server-express');

//TYPES

const typeDefs = `
  type Message {
    id: ID!
    user: String!
    message: String!
  }
  type Query {
    messages: [Message!]
  }
  type Mutation {
    addMessage(user: String!, message: String!): ID!
    deleteMessage(id: ID!): ID!
  }
  type Subscription {
    messages: [Message!]
  }
`;

//RESOLVERS

let messages = [];
const UPDATE = 'UPDATE'

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    addMessage: (parent, { user, message }, { pubsub }) => {
      const id = Date.now();
      messages.push({
        id,
        user,
        message,
      });
      pubsub.publish(UPDATE, { messages })
      return id;
    },
    deleteMessage: (parent, { id }, { pubsub }) => {
      const currentId = id;
      messages = messages.filter(msg => +msg.id !== +currentId);
      pubsub.publish(UPDATE, { messages })
      return currentId;
    },
  },
  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        setTimeout(() => pubsub.publish(UPDATE, { messages }), 0)
        return pubsub.asyncIterator(UPDATE);
      },
    },
  },
};

//CONNECT

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res}) => ({ req, res, pubsub })
});

const app = express();
const PORT = process.env.PORT || 5000;

server.applyMiddleware({ app, cors: false });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})