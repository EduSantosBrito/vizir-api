import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import Plan from './Plan';

export const resolvers = mergeResolvers([Plan.queries]);
export const typeDefs = mergeTypes([Plan.schema], { all: true });
