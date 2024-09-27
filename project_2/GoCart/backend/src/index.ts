import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolvers.js'
import typeDefs from './models/typeDef.js'
import mongoose from 'mongoose'

// Connecting to the MongoDB database
const MONGO_URI = 'mongodb://localhost:27017/GoCart'

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to Database')

    // Pass the 'db' variable to your resolvers
    const db = mongoose.connection

    const server = new ApolloServer({
      typeDefs,
      resolvers: resolvers(db), // Pass the 'db' to your resolvers
    })

    startStandaloneServer(server, {
      listen: { port: 4000 },
    }).then(({ url }) => {
      console.log(`Server is ready at ${url}`)
    })
  })
  .catch((error) => {
    console.log(error.message)
  })
