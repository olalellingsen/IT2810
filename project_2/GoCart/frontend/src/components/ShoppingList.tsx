// "ListeDetaljer" -> The site that shows details about the shoppinglist with the specific title you choose

import { useReactiveVar } from '@apollo/client'
import { shoppingListProductsVar } from '../utils/reactiveVariables/reactiveVariables.tsx'

import ProductList from './ProductList'
import { Link } from 'react-router-dom'
import { ProductProps } from './Product.tsx'
import { useState } from 'react'

interface ShoppingListProps {
  title: string
}

function ShoppingList({ title }: ShoppingListProps) {
  const shoppingListProducts: ProductProps[] = useReactiveVar(shoppingListProductsVar)
  const isShoppingListEmpty = shoppingListProducts.length === 0
  const [showConfirmation, setShowConfirmation] = useState(false) // State for visning av bekreftelsespopup

  // Function to delete all products in the shopping list
  const deleteAllProducts = () => {
    // Show the confirmation dialog before clearing the list
    setShowConfirmation(true)
  }

  // Function to handle confirmation and clear the shopping list
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      shoppingListProductsVar([]) // Clear the shopping list
      localStorage.setItem('shoppingList', JSON.stringify([]))
    }
    setShowConfirmation(false) // Hide the confirmation dialog
  }

  return (
    <div className="h-full flex-col">
      <h1 className="mb-2 text-2xl font-bold uppercase text-center">{title}</h1>
      <div className="h-3/4 overflow-auto mb-4 sm:mb-8 relative">
        {isShoppingListEmpty ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <p>Handlelisten er for øyeblikket tom.</p>
              <p>Trykk på "Legg til produkter" for å begynne på handlelisten din!</p>
            </div>
          </div>
        ) : (
          <ProductList listView={true} products={shoppingListProducts} />
        )}
      </div>
      <div className="flex justify-center">
        <Link to={'/Addproduct'}>
          <button className="btn" data-testid="add-products-button">
            Legg til produkter
          </button>
        </Link>
        <button className="btn ml-4" onClick={deleteAllProducts}>
          Fjern alle produkter
        </button>
      </div>
      {/* Confirmation dialog */}
      {!isShoppingListEmpty && showConfirmation && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl m-2 border lightMode darkMode border-gray-300 dark:bg-slate-700 dark:border-gray-500">
            <p className="text-center mb-4">Er du sikker på at du vil fjerne alle produktene i handlelisten din?</p>
            <div className="flex justify-center">
              <button className="btn w-20 mr-2" onClick={() => handleConfirmation(true)}>
                Ja
              </button>
              <button className="btn w-20" onClick={() => handleConfirmation(false)}>
                Nei
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingList
