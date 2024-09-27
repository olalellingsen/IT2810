// File containing gql strings to add Products to the database

import { gql } from '@apollo/client'

export const ADD_CUSTOM_PRODUCT = gql`
  mutation AddCustomProduct($input: ProductInput) {
    addCustomProduct(input: $input)
  }
`
