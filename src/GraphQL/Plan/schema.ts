import { gql } from 'apollo-server-express';

export default gql`
    type Plan {
        _id: Int
        name: String
        freeMinutes: Int
    }

    type Query {
        getPlans: [Plan]
        getPlanById(_id: Int): Plan
    }
`;
