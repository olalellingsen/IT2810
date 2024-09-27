// ProductDetails Component: Displays details of a product (aka Product)

import { GET_PRODUCT_BY_ID } from '../utils/queryFunctions/getProduct'
import { useQuery } from '@apollo/client'
import ProductImage from './ProductImage'

interface ProductDetailsProps {
  productID: string // The name of the food product to display
}

// The expected format of the query response
interface Product {
  name: string
  nutrition: {
    display_name: string
    amount: number
    unit: string
  }[]
  store: {
    name: string
  }
  vendor: string
  weight: number
  weight_unit: string
  category: {
    name: string
  }[]
  allergens: {
    display_name: string
    contains: string
  }[]
  description: string
  image: string
}

function ProductDetails({ productID }: ProductDetailsProps) {
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { _id: productID },
  })

  if (loading) {
    return <div>Laster...</div>
  }

  if (error) {
    return <div>Feilmelding: {error.message}</div>
  }

  const product: Product | undefined = data.getProduct || undefined

  if (!product) {
    return <div>Kan ikke finne produktet.</div>
  }

  return (
    <div className="h-full">
      <h2 className="text-2xl mr-14">{product.name}</h2>
      <div className="grid sm:grid-cols-2 gap-4 overflow-y-scroll h-5/6" tabIndex={0}>
        <div className="sm:col-span-2 w-full shadow-md dark:shadow-none p-4">
          <ProductImage src={product.image} alt={product.name} />
        </div>
        <div className="p-4 shadow-md">
          <ul>
            <p className="text-xl">Næringsinnhold</p>
            {product.nutrition && product.nutrition.length > 0 ? (
              <ul>
                {product.nutrition.map((nutritionproduct, index) => (
                  <li key={index}>
                    <strong>{nutritionproduct.display_name}: </strong>
                    {nutritionproduct.amount ? (
                      <>
                        {nutritionproduct.amount} {nutritionproduct.unit}
                      </>
                    ) : (
                      'Ikke tilgjengelig'
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              'Ikke tilgjengelig'
            )}
          </ul>
        </div>

        <div className="p-2 shadow-md">
          <p className="text-xl">Info</p>
          <ul>
            <strong>Butikk: </strong>
            {product.store && product.store.name.length > 0 ? product.store.name : 'Ikke tilgjengelig'}
          </ul>
          <ul>
            <strong>Forhandler: </strong>
            {product.vendor && product.vendor.length > 0 ? product.vendor : 'Ikke tilgjengelig'}
          </ul>
          <ul>
            <strong>Vekt: </strong>
            {product.weight || 'Ikke tilgjengelig'} {product.weight_unit || ''}
          </ul>

          {/* Categories */}
          <div className="">
            <strong>Kategorier:</strong>
            <ul>
              {product.category && product.category.length > 0 ? (
                <>
                  {product.category.every((categoryproduct) => categoryproduct.name.trim() === '') ? (
                    <li>Ikke tilgjengelig</li>
                  ) : (
                    product.category.map((categoryproduct, index) => <li key={index}>{categoryproduct.name}</li>)
                  )}
                </>
              ) : (
                <li>Ikke tilgjengelig</li>
              )}
            </ul>
          </div>
          {/* Allergens */}
          <div>
            <strong>Allergener:</strong>
            <ul>
              {product.allergens ? (
                product.allergens.every((allergenproduct) => allergenproduct.contains === 'NO') ? (
                  'Ikke tilgjengelig'
                ) : (
                  <ul>
                    {product.allergens.map((allergenproduct, index) =>
                      allergenproduct.contains === 'YES' || allergenproduct.contains === 'CAN_CONTAIN_TRACES' ? (
                        <li key={index}>
                          {allergenproduct.display_name}
                          {allergenproduct.contains === 'CAN_CONTAIN_TRACES' ? ' (kan inneholde spor)' : null}
                        </li>
                      ) : null,
                    )}
                  </ul>
                )
              ) : (
                <li>Ikke tilgjengelig</li>
              )}
            </ul>
          </div>
          {/* Description */}
        </div>
        <div className="p-2 sm:col-span-2 shadow-md mb-4">
          <p className="text-xl">Beskrivelse</p>
          <p>{product.description || 'Ikke tilgjengelig'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
