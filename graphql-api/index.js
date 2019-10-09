const {graphql, buildSchema } = require('graphql');
const axios  = require('axios')

const schema = buildSchema(`
    type Team {
      id: ID
      points: Int
      name: String
    }

    type Query {
      teams:[Team]
    }
`);

const resolvers = {
  teams: () => {
    return axios.get('https://graphqlvoting.azurewebsites.net/api/score').then( res => res.data );
  }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const teams = await graphql(schema, "{ teams { id points name }} ", resolvers);

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: teams
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};