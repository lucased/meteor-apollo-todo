import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';

const testSchema = `
  type Query {
    hi: String
    resolutions: [Resolution]
  }
`;

// Hotasdas
// l

const typeDefs = [ResolutionSchema, testSchema];

const testResolver = {
  Query: {
    hi() {
      return 'Hello.';
    },
  },
};

const resolvers = merge(testResolver, ResolutionResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
