import { GraphQLError } from 'graphql';

const plans = [
    { _id: 1, name: 'FaleMais 30', freeMinutes: 30 },
    { _id: 2, name: 'FaleMais 60', freeMinutes: 60 },
    { _id: 3, name: 'FaleMais 120', freeMinutes: 120 },
];

export default {
    Query: {
        getPlans: () => plans,
        getPlanById: (_id: number) => {
            const plan = plans.find(planToFilter => planToFilter._id === _id);
            if (!plan) {
                throw new GraphQLError('Plano não encontrado, tente novamente.');
            }
            return plan;
        },
    },
};
