import express, { Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = { Query: { hello: () => 'Hello world!' } };

const app = express();
app.set('port', process.env.PORT || 3000);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(7)],
});

app.use(cors());
app.use(compression());
apolloServer.applyMiddleware({ app });

app.use('*', (req: Request, res: Response) => {
    res.status(404).send('404');
});

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
