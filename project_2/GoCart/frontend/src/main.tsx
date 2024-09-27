import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

const client = new ApolloClient({
  uri: import.meta.env.DEV ? 'http://localhost:4000' : 'http://it2810-22.idi.ntnu.no:4000', // GraphQL server endpoint (the uri of the apollo server)

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchProducts: concatPagination(['page', 'perPage', 'category', 'name', 'sortDirection']),
        },
      },
    },
  }),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/project2">
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
