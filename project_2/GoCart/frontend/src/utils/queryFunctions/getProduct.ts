// File containing gql strings used to query data from the database

import { gql } from '@apollo/client'

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($page: Int!, $perPage: Int!, $category: String, $name: String, $sortDirection: String) {
    searchProducts(page: $page, perPage: $perPage, category: $category, name: $name, sortDirection: $sortDirection) {
      name
      _id
      image
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($_id: ID!) {
    getProduct(_id: $_id) {
      name
      nutrition {
        display_name
        amount
        unit
      }
      store {
        name
      }
      vendor
      weight
      weight_unit
      category {
        name
      }
      allergens {
        display_name
        contains
      }
      description
      image
    }
  }
`
