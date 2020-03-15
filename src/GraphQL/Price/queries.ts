import { GraphQLError } from 'graphql';

const prices = [
    { _id: 1, origin: '011', destiny: '016', pricePerMinute: 1.9 },
    { _id: 2, origin: '016', destiny: '011', pricePerMinute: 2.9 },
    { _id: 3, origin: '011', destiny: '017', pricePerMinute: 1.7 },
    { _id: 4, origin: '017', destiny: '011', pricePerMinute: 2.7 },
    { _id: 5, origin: '011', destiny: '018', pricePerMinute: 0.9 },
    { _id: 6, origin: '018', destiny: '011', pricePerMinute: 1.9 },
];

export default {
    Query: {
        getPrices: () => prices,
        getPriceByOriginAndDestiny: (_parent: any, { origin, destiny }: { origin: String; destiny: String }) => {
            const price = prices.find(priceToFilter => priceToFilter.origin === origin && priceToFilter.destiny === destiny);
            if (!price) {
                throw new GraphQLError('Preço não encontrado, tente novamente.');
            }
            return price;
        },
    },
};
