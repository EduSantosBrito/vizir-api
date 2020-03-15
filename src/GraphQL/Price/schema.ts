import { gql } from 'apollo-server-express';

export default gql`
    type Price {
        _id: Int
        origin: String
        destiny: String
        pricePerMinute: Float
    }

    type Query {
        getPrices: [Price]
        getPriceByOriginAndDestiny(origin: String, destiny: String): Price
    }
`;
