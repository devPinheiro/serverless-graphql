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

graphql(schema, "{ teams { id points name }} ", resolvers).then( res => console.log(JSON.stringify(res)))