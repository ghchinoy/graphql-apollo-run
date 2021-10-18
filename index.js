const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// data
const countries = [
	{ code: 'CA', name: 'Canada'},
	{ code: 'US', name: 'United States'},
];

// types
const typeDefs = gql`
	type Country {
		code: String!
		name: String!
	}

	type Query {
		countries: [Country!]!
	}
`;


// resolvers
const resolvers ={
	Query: {
		countries: () => countries,
	},
};

async function graphQLserver() {
	const server = new ApolloServer({ typeDefs, resolvers });
	await server.start();

	const app = express();
	server.applyMiddleware({ app });
	const port = process.env.PORT || 4000;
	await new Promise((resolve) => app.listen({ port }, resolve));
	console.log(`Apollo GraphQL Server v3 listening on port ${port}`);
}

graphQLserver();
