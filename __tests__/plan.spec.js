const request = require('supertest');
const { gql } = require('apollo-server-express');
const { print } = require('graphql');

const host = 'localhost';
const port = 3000;

describe('Plan tests', () => {
    it('can get all plans', async done => {
        const query = gql`
            query {
                getPlans {
                    _id
                    name
                    freeMinutes
                }
            }
        `;
        const response = await request(`${host}:${port}`)
            .post('/graphql')
            .send({ query: print(query) });
        const parsedResponse = JSON.parse(response.text);

        expect(parsedResponse.data.getPlans && !(parsedResponse.errors || []).length);
        done();
    });

    it('can get plan by _id', async done => {
        const query = gql`
            query getPlanById($_id: Int) {
                getPlanById(_id: $_id) {
                    _id
                    name
                    freeMinutes
                }
            }
        `;
        const response = await request(`${host}:${port}`)
            .post('/graphql')
            .send({
                query: print(query),
                variables: { _id: 1 },
            });
        const parsedResponse = JSON.parse(response.text);

        expect(parsedResponse.data.getPlanById && !(parsedResponse.errors || []).length);
        done();
    });

    it("can't get plan with invalid _id", async done => {
        const query = gql`
            query getPlanById($_id: Int) {
                getPlanById(_id: $_id) {
                    _id
                    name
                    freeMinutes
                }
            }
        `;
        const response = await request(`${host}:${port}`)
            .post('/graphql')
            .send({
                query: print(query),
                variables: { _id: -1 },
            });
        const parsedResponse = JSON.parse(response.text);

        expect(parsedResponse.errors[0].message).toEqual('Plano não encontrado, tente novamente.');
        done();
    });
});
