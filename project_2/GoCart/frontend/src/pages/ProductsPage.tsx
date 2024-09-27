// The register for every product in the database, where you get the opportunity to go to a site for adding products to the database

import { useEffect, useState } from 'react'

import Searchbar from '../components/Searchbar'
import ProductList from '../components/ProductList'
import FilterDropdown from '../components/FilterDropdown'
import { useQuery } from '@apollo/client'
import { SEARCH_PRODUCTS } from '../utils/queryFunctions/getProduct'
import SortButtons from '../components/SortButtons'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'

interface ProductsPageProps {
  editable: boolean
}

interface Product {
  name: string
  _id: string
  image: string
  quantity: number
}

function ProductsPage({ editable }: ProductsPageProps) {
  const default_perPage = 20
  const [filter, setFilter] = useState('') // Filter for product names
  const [selectedCategory, setSelectedCategory] = useState('') // Selected category for filtering
  const [sortDirection, setSortDirection] = useState('asc') // Sort direction for product list
  const [page, setPage] = useState(1) // Used for pagination functionality to control what page we are on
  const [perPage, setPerPage] = useState(default_perPage) // Used for pagination to allow for more Products to be displayed on a page
  const [showMoreBtn, setShowMoreBtn] = useState(true) // Control visibility of showMoreBtn
  const [products, setProducts] = useState<Product[]>([])
  const [searchResultsFound, setSearchResultsFound] = useState<boolean>(true)

  // Hande search
  const handleSearch = (input: string) => {
    const name = input !== '' ? input : ''

    // Use refetch for the initial search and fetchMore for subsequent searches
    if (page === 1) {
      setProducts([])
      refetch({
        page: 1,
        perPage: default_perPage,
        category: selectedCategory,
        name: name,
        sortDirection: sortDirection,
      }).then(({ data }) => {
        if (!data.searchProducts || data.searchProducts.length === 0) {
          setSearchResultsFound(false)
        } else {
          setSearchResultsFound(true)
          setProducts(data.searchProducts)
          setFilter(input)
          setShowMoreBtn(true)
        }
      })
    } else {
      fetchMore({
        variables: {
          page: 1,
          perPage: default_perPage,
          category: selectedCategory,
          name: name,
          sortDirection: sortDirection,
        },
      }).then(({ data }) => {
        if (!data.searchProducts || data.searchProducts.length === 0) {
          setSearchResultsFound(false)
        } else {
          setSearchResultsFound(true)
          setProducts(data.searchProducts)
          setFilter(input)
          setPage(1)
          setShowMoreBtn(true)
        }
      })
    }
  }

  // Debounce search
  const debouncedrequest = debounce((searchterm: string) => handleSearch(searchterm), 500)

  // Handle category change
  const handleCategoryChange = (category: string) => {
    fetchMore({
      variables: {
        page: 1,
        perPage: default_perPage,
        category: category,
        name: filter,
        sortDirection: sortDirection,
      },
    }).then(({ data }) => {
      // Check whether there is more data to load
      const newProducts: Product[] = data.searchProducts
      setSelectedCategory(category)
      setPage(1)
      setPerPage(default_perPage)
      setProducts(newProducts)
      setShowMoreBtn(true)
      if (newProducts.length === 0) {
        setShowMoreBtn(false)
      }
    })
  }

  // Handle ascending sort
  const handleSortAsc = () => {
    const variables = {
      page: 1,
      perPage: perPage,
      category: selectedCategory,
      name: filter,
      sortDirection: 'asc',
    }

    fetchMore({ variables })
      .then(({ data }) => {
        setSortDirection('asc')
        setProducts(data.searchProducts)
        setPage(1)
        setShowMoreBtn(true)
      })
      .catch((error) => {
        console.log('Error sorting:', error)
      })
  }

  // Handle descending sort
  const handleSortDesc = () => {
    const variables = {
      page: 1,
      perPage: perPage,
      category: selectedCategory,
      name: filter,
      sortDirection: 'desc',
    }

    fetchMore({ variables })
      .then(({ data }) => {
        setSortDirection('desc')
        setProducts(data.searchProducts)
        setPage(1)
        setShowMoreBtn(true)
      })
      .catch((error) => {
        console.log('Error sorting:', error)
      })
  }

  // Fetch product data from GraphQL using Apollo Client
  const { loading, error, data, fetchMore, refetch } = useQuery(SEARCH_PRODUCTS, {
    variables: { page: 1, perPage: default_perPage, category: '', name: '', sortDirection: 'asc' },
    fetchPolicy: 'network-only', // Set fetchPolicy to 'network-only' to bypass the cache
  })

  useEffect(() => {
    // To ensure that the ProductsPage is in its initial state when one navigates to it
    // Trigger refetch when the component mounts
    refetch({
      page: 1,
      perPage: default_perPage,
      category: selectedCategory,
      name: filter,
      sortDirection: sortDirection,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) {
    return <div>Data er udefinert</div>
  }

  const loadMoreProduct = () => {
    const nextPage = page + 1
    if (data) {
      fetchMore({
        variables: {
          page: nextPage,
          perPage: default_perPage,
          category: selectedCategory,
          name: filter,
          sortDirection: sortDirection,
        },
      })
        .then(({ data }) => {
          // Check whether there is more data to load
          const newProducts: Product[] = data.searchProducts

          // If there is no more data to load, disable showMore button
          if (newProducts.length === 0) {
            setShowMoreBtn(false)
          } else {
            setProducts((previousProducts: Product[]) => [...previousProducts, ...newProducts])
          }
        })
        .catch((error) => {
          console.log('Error loading more data:', error)
        })
      setPage(nextPage)
    }
  }

  /**
   * Functionality of the showLess button
   */
  const showLess = () => {
    setPage(1)
    setPerPage(default_perPage)

    // Use refetch instead of fetchMore
    refetch({
      page: 1,
      perPage: default_perPage,
      category: selectedCategory,
      name: filter,
      sortDirection: sortDirection,
    })
      .then(({ data }) => {
        const newProducts: Product[] = data.searchProducts

        if (newProducts.length === 0) {
          setShowMoreBtn(false)
        } else {
          setProducts([...newProducts])
        }
      })
      .catch((error) => {
        console.log('Error resetting data:', error)
      })
  }

  // Map filtered products to objects that include all props
  // Define the productPropsList based on the "editable" prop
  const productPropsList = editable
    ? products.map((product: Product) => ({
        productName: product.name,
        productID: product._id,
        productImage: product.image,
        productQuantity: product.quantity,
        increment: true,
        decrement: true,
        quantity: true,
      }))
    : products.map((product: Product) => ({
        productName: product.name,
        productID: product._id,
        productImage: product.image,
        increment: false,
        decrement: false,
        quantity: false,
      }))

  return (
    <div className="h-full flex flex-col justify-center lg:pl-8 lg:pr-8 pt-8" data-testid="products-page">
      {/* Render the Searchbar component with the filter callback */}
      <div className="grid sm:flex gap-2 mb-2">
        <Searchbar onFilter={(value: string) => debouncedrequest(value)} />
        <div className="flex justify-between gap-2">
          <FilterDropdown onCategoryChange={handleCategoryChange} />
          <SortButtons onSortAsc={handleSortAsc} onSortDesc={handleSortDesc} />
        </div>
      </div>
      {/* Render the productList component with the extracted product names */}
      {error ? (
        <div className="h-full mt-4 mb-4">Ugyldig søk</div> // In case of error display this message
      ) : searchResultsFound ? (
        <div className="h-full overflow-y-scroll mt-4 mb-4">
          {loading ? <div>Laster...</div> : <ProductList listView={false} products={productPropsList} />}
        </div>
      ) : (
        <p className="h-full mt-4 mb-4">Ingen resultater funnet for søket</p>
      )}

      <div className="flex justify-between mb-5 gap-2">
        {!editable && (
          <Link to={'/AddCustomProduct'}>
            <button className="btn" data-testid="add-product-to-register">
              Legg til produkt i databasen
            </button>
          </Link>
        )}
        {editable && (
          <Link to={'/'}>
            <button className="btn flex" data-testid="back-to-shopping-list-button">
              <ArrowLeft />
              <p className="hidden sm:block">Tilbake til handlelisten</p>
            </button>
          </Link>
        )}
        <div className="flex gap-2">
          <button
            className={`btn flex ${productPropsList.length === default_perPage && 'hidden'}`}
            onClick={() => showLess()}
          >
            <p className="hidden sm:block">Vis mindre</p>
            <ChevronUp />
          </button>
          <button className={`btn flex ${!showMoreBtn && 'hidden'}`} onClick={() => loadMoreProduct()}>
            <ChevronDown />
            <p className="hidden sm:block">Vis mer</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
