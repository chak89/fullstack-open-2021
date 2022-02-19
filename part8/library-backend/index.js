const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

//Subscriptions
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const config = require('./utils/config')
const User = require('./models/User')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const jwt = require('jsonwebtoken')
const JWT_SECRET = '123456Password'
//const { saveToDB } = require('./utils/initList')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
		console.log('Initialised authors:')
		console.log('Initialised books:')
		//saveToDB()
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})



const start = async () => {
	//express server
	const app = express();
	const httpServer = http.createServer(app)

	// Pass this schema object to both the SubscriptionServer and ApolloServer
	const schema = makeExecutableSchema({ typeDefs, resolvers })

	const subscriptionServer = SubscriptionServer.create(
		{ schema, execute, subscribe },
		{ server: httpServer, path: '', }
	)

	const context = async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			console.log('context() -> decoding token.....')
			//		try {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			console.log('context() -> fetching currentUser:')
			const currentUser = await User.findById(decodedToken.id)
			console.log('context() -> currently logged-in/authorized user is currentUser:', currentUser)
			return { currentUser }
			//		} catch (error) {
			//			console.error('error:', error)
			//		return error
			//		}
		}
	}


	// Constructor
	const server = new ApolloServer({
		schema,
		context,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
		{
			async serverWillStart() {
				return {
					async drainServer() {
						subscriptionServer.close()
					},
				}
			},
		},
		]
	})


	await server.start()

	server.applyMiddleware({
		app,
		path: '/'
	})

	/* 	app.get("/rest", (req, res) => {
			res.json({
				data: "API is working...",
			});
		}); */

	/* 	app.listen().then(({ url }) => {
			console.log(`Server ready at ${url}`)
		}) */

	const PORT = 4000
	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`)
	)
}

// call the function that does the setup and starts the server
start()