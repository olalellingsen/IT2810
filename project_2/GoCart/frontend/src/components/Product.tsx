// This component renders a product card with the product name and the ability to increment or decrement the quantity of the product
// If the increment or decrement props are false, then the buttons to increment or decrement the quantity are not displayed

import { useState, useEffect } from 'react'

import { useReactiveVar } from '@apollo/client'
import { shoppingListProductsVar } from '../utils/reactiveVariables/reactiveVariables'
import ProductDetails from './ProductDetails'
import ProductImage from './ProductImage'
import { X } from 'lucide-react'

export interface ProductProps {
  productName: string // The name or description of the product
  productID: string // The id of the product
  productImage: string // The image of the product
  productQuantity?: number
  increment?: boolean // Whether to display the increment button
  decrement?: boolean // Whether to display the decrement button
  quantity?: boolean // Whether to display the quantity field
  listView?: boolean
}

function Product({ productName, productID, productImage, increment, decrement, quantity, listView }: ProductProps) {
  const [newProductQuantity, setProductQuantity] = useState<number>(0)
  const shoppingListProducts: ProductProps[] = useReactiveVar(shoppingListProductsVar)
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    // Retrieve the stored shopping list from local storage
    const storedShoppingList = localStorage.getItem('shoppingList')

    if (storedShoppingList) {
      const parsedList: ProductProps[] = JSON.parse(storedShoppingList)

      // Update the reactive variable with the stored shopping list
      shoppingListProductsVar(parsedList)

      // Find the product in the updated list
      const productInList = parsedList.find((p) => p.productID === productID)
      setProductQuantity(productInList?.productQuantity ?? 0)
    }
  }, [productID])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setShow(true)
    }
  }

  useEffect(() => {
    if (isShow) {
      const dialogElement = document.querySelector('dialog')
      if (dialogElement) {
        dialogElement.focus()
      }
    }
  }, [isShow])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShow(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Add product to the shopping list
  function incrementProduct(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation() // Stop the event from propagating to the card

    setProductQuantity((prevQuantity) => prevQuantity + 1) // Use the state updater function

    const existingProductIndex = shoppingListProducts.findIndex((p) => p.productID === productID)

    if (existingProductIndex !== -1) {
      // Product already exists, increment quantity
      const updatedList = shoppingListProducts.map((p, index) =>
        index === existingProductIndex ? { ...p, productQuantity: (p.productQuantity ?? 0) + 1 } : p,
      )
      shoppingListProductsVar(updatedList)
    } else {
      // Product doesn't exist, add to the list with quantity 1
      shoppingListProductsVar([
        ...shoppingListProducts,
        { productID, productName, productImage, productQuantity: newProductQuantity + 1 },
      ])
    }

    // Save the updated list to local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListProductsVar()))
  }

  function decrementProduct(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation() // Stop the event from propagating to the card

    setProductQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0)) // Use the state updater function

    const existingProductIndex = shoppingListProducts.findIndex((p) => p.productID === productID)

    if (existingProductIndex !== -1) {
      // Product exists, decrement quantity
      const updatedList = shoppingListProducts.map((p, index) =>
        index === existingProductIndex ? { ...p, productQuantity: Math.max((p.productQuantity ?? 0) - 1, 0) } : p,
      )

      // Filter out products with quantity <= 0
      const filteredList = updatedList.filter((p) => p.productQuantity !== undefined && p.productQuantity > 0)

      shoppingListProductsVar(filteredList)
    }

    // Save the updated list to local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListProductsVar()))
  }

  return (
    <>
      <div
        className={`card grid ${listView ? '' : 'grid-cols-2'}`}
        onClick={() => setShow(true)}
        data-testid={`product-${productID}`}
        onKeyPress={handleKeyPress}
        tabIndex={0}
      >
        {/* Display the product image */}
        <div>{!listView && <ProductImage src={productImage} alt={productName} />}</div>

        <div className={`flex justify-between h-full ${listView ? '' : 'flex-col justify-end'}`}>
          {/* Display the product name */}
          <div className="text-lg font-semibold col-span-2 overflow-hidden">{productName}</div>

          {/* Display the product quantity */}
          {((increment && decrement && quantity) || listView) && (
            <div className="flex h-max justify-end">
              <button
                className="btn w-10"
                data-testid={`decrement-button-${productID}`}
                onClick={(e) => {
                  decrementProduct(e)
                }}
              >
                -
              </button>
              <span className="text-xl p-2" data-testid={`quantity-${productID}`}>
                {newProductQuantity}
              </span>
              <button
                className="btn w-10"
                data-testid={`increment-button-${productID}`}
                onClick={(e) => {
                  incrementProduct(e)
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      <dialog
        open={isShow}
        className="h-full w-full fixed top-0 py-20 bg-transparent/50"
        onClick={() => setShow(false)}
      >
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <div className="relative h-8">
            <button className="btn absolute right-0" onClick={() => setShow(false)}>
              <X size={24} />
            </button>
          </div>
          <ProductDetails productID={productID} />
        </div>
      </dialog>
    </>
  )
}

export default Product
