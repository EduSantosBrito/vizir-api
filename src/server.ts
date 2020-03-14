import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import { typeDefs, resolvers } from './GraphQL';

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

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('Ok');
});

export default app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
