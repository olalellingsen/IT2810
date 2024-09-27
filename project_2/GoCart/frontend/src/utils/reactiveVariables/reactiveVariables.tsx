import { ProductProps } from '../../components/Product.tsx'
import { makeVar, ReactiveVar } from '@apollo/client'

export const shoppingListProductsVar: ReactiveVar<ProductProps[]> = makeVar<ProductProps[]>(
  // Read the initial state from local storage or default to an empty array
  JSON.parse(localStorage.getItem('shoppingList') || '[]'),
)
