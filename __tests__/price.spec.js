const request = require('supertest');
const { gql } = require('apollo-server-express');
const { print } = require('graphql');

const host = 'localhost';
const port = 3000;

describe('Price tests', () => {
    it('can get all prices', async done => {
        const query = gql`
            query {
                getPrices {
                    _id
                    origin
                    destiny
                    pricePerMinute
                }
            }
        `;
        const response = await request(`${host}:${port}`)
            .post('/graphql')
            .send({ query: print(query) });
        const parsedResponse = JSON.parse(response.text);

        expect(parsedResponse.data.getPrices && !(parsedResponse.errors || []).length);
        done();
    });

    it('can get price by origin and destiny', async done => {
        const query = gql`
            query getPriceByOriginAndDestiny($origin: String, $destiny: String) {
                getPriceByOriginAndDestiny(origin: $origin, destiny: $destiny) {
                    _id
                    origin
                    destiny
                    pricePerMinute
                }
            }
        `;
        const response = await request(`${host}:${port}`)
            .post('/graphql')
            .send({
                query: print(query),
                variables: { origin: '011', destiny: '016' },
            });
        const parsedResponse = JSON.parse(response.text);

        expect(parsedResponse.data.getPriceByOriginAndDestiny && !(parsedResponse.errors || []).length);
        done();
    });

    it("can't get price with invalid data", async done => {
        const query = gql`
            query getPriceByOriginAndDestiny($origin: String, $destiny: String) {
                getPriceByOriginAndDestiny(origin: $origin, destiny: $destiny) {
                    _id
                    origin
                    destiny
                    pricePerMinute
                }
            }
        `;
        const response = await request(`${host}:${port}`)
            .post('/graphql')
            .send({
                query: print(query),
                variables: { origin: 'INVALID_ORIGIN', destiny: 'INVALID_DESTINY' },
            });
        const parsedResponse = JSON.parse(response.text);

        expect(parsedResponse.errors[0].message).toEqual('Preço não encontrado, tente novamente.');
        done();
    });
});
