/* The home page of the application. */

import ShoppingList from '../components/ShoppingList'

function Home() {
  return (
    <div className="h-full contentCenter pt-8" data-testid="cypress-ShoppingList">
      <ShoppingList title={'Min handleliste'} />
    </div>
  )
}

export default Home
