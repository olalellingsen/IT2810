import { ObjectId } from 'mongodb'

const resolvers = (db) => ({
  Query: {
    // Resolver to retrieve a product by its ID
    getProduct: async (_, { _id }) => {
      try {
        // Find and return the product with the specified ID from the database
        const product = await db.collection('Products').findOne({ _id: new ObjectId(_id) })
        return product
      } catch (error) {
        throw new Error(`Error retrieving product: ${error.message}`)
      }
    },

    // Resolver to retrieve a list of products with pagination
    getProducts: async (_, { page, perPage }) => {
      const skip = (page - 1) * perPage
      const limit = perPage
      try {
        // Find and return a list of products with pagination from the database
        const allProducts = await db.collection('Products').find().skip(skip).limit(limit).toArray()
        return allProducts
      } catch (error) {
        throw new Error(`Error retrieving products: ${error.message}`)
      }
    },
    // Resolver to retrieve a list of products by category
    getProductsByCategory: async (_, { category, page, perPage }) => {
      const skip = (page - 1) * perPage
      const limit = perPage
      try {
        // Find and return a list of products by the specified category from the database
        const products = await db
          .collection('Products')
          .find({
            'category.name': category,
          })
          .skip(skip)
          .limit(limit)
          .toArray()
        return products
      } catch (error) {
        throw new Error(`Error retrieving products by category: ${error.message}`)
      }
    },
    getProductsByName: async (_, { name, page, perPage }) => {
      const skip = (page - 1) * perPage
      const limit = perPage
      try {
        // Find and return a list of products by the specified name from the database
        const products = await db
          .collection('Products')
          .find({
            name: { $regex: new RegExp(name, 'i') }, // Case-insensitive search
          })
          .skip(skip)
          .limit(limit)
          .toArray()
        return products
      } catch (error) {
        throw new Error(`Error retrieving products by name: ${error.message}`)
      }
    },

    searchProducts: async (_, { name, category, page, perPage, sortDirection }) => {
      const skip = (page - 1) * perPage
      const limit = perPage
      let sortDir
      try {
        // Initialize the query object with name and category set to null
        const query = {} as any

        if (name) {
          query.name = { $regex: new RegExp(name, 'i') } // Case-insensitive name search
        }

        if (category) {
          query['category.name'] = category
        }

        // Apply sorting based on the sortDirection parameter
        if (sortDirection === 'asc') {
          sortDir = { name: 1 }
        } else {
          sortDir = { name: -1 }
        }

        const products = await db.collection('Products').find(query).sort(sortDir)

        // Find and return products that match the search criteria
        const result = await products.skip(skip).limit(limit).toArray()

        return result
      } catch (error) {
        throw new Error(`Error searching for products: ${error.message}`)
      }
    },
  },
  // Things that can change the content of the database
  Mutation: {
    addCustomProduct: async (_, { input }) => {
      try {
        // Add user_generated field to the input
        const productWithUserGenerated = { ...input }

        // Insert the new product into the database
        const result = await db.collection('Products').insertOne(productWithUserGenerated)

        // Check if the insertion was successful
        if (result.acknowledged === true) {
          return true // Return true if the product was successfully added
        } else {
          return false // Return false if the product was not added
        }
      } catch (error) {
        console.error(`Error adding custom product: ${error.message}`)
        throw new Error('Failed to add custom product.') // Throw an error for better handling
      }
    },
  },
})

export { resolvers }
