import { createServer } from "@graphql-yoga/node";

import { images } from "@/mocks/images";

const typeDefs = /* GraphQL */ `
	type Query {
		images: [Image!]!
	}
	type Image {
		id: String!
		label: String!
		text: String!
		src: String!
		height: Int!
		width: Int!
		base64: String!
	}
`;

const resolvers = {
	Query: {
		images,
	},
};

const server = createServer({
	schema: {
		typeDefs,
		resolvers,
	},
	endpoint: "/api/graphql",
	// graphiql: false // uncomment to disable GraphiQL
});

export default server;
