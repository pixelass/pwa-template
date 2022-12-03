import { createSchema, createYoga } from "graphql-yoga";

import { images } from "@/mocks/images";

function gql([query]: TemplateStringsArray) {
	return query;
}

const typeDefs = gql`
	type Query {
		images: [Image!]!
	}
	type ImageUrls {
		raw: String!
		full: String!
		regular: String!
		small: String!
		thumb: String!
		small_s3: String!
	}
	type imageLinks {
		self: String!
		html: String!
		download: String!
		download_location: String!
	}
	type Social {
		instagram_username: String
		portfolio_url: String
		twitter_username: String
		paypal_email: String
	}
	type Links {
		self: String!
		html: String!
		photos: String!
		likes: String!
		portfolio: String!
		following: String!
		followers: String!
	}
	type ProfileImage {
		small: String!
		medium: String!
		large: String!
	}
	type User {
		id: String!
		updated_at: String!
		username: String!
		name: String
		first_name: String
		last_name: String
		twitter_username: String
		portfolio_url: String
		bio: String
		location: String
		instagram_username: String!
		total_collections: Int!
		total_likes: Int!
		total_photos: Int!
		accepted_tos: Boolean!
		for_hire: Boolean
		social: Social!
		links: Links!
		profile_image: ProfileImage!
	}
	type Image {
		id: String!
		created_at: String!
		updated_at: String!
		promoted_at: String
		width: Int!
		height: Int!
		color: String!
		blur_hash: String!
		description: String
		alt_description: String
		urls: ImageUrls!
		links: imageLinks!
		likes: Int!
		liked_by_user: Boolean!
		current_user_collections: [String!]!
		sponsorship: Boolean
		user: User!
	}
`;

const resolvers = {
	Query: {
		images,
	},
};

const server = createYoga({
	schema: createSchema({
		typeDefs,
		resolvers,
	}),
	graphqlEndpoint: "/api/graphql",
	// graphiql: false // uncomment to disable GraphiQL
});

export default server;
