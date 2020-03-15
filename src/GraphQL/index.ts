import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import Plan from './Plan';
import Price from './Price';

export const resolvers = mergeResolvers([Plan.queries, Price.queries]);
export const typeDefs = mergeTypes([Plan.schema, Price.schema], { all: true });
