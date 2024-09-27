# Functionality for components, pages & utils

## Apollo client

- We use apollo client to send queries from frontend to backend.

## Components

- Product: Represents an product in an productList, with the props productName (string, name of the Product), increment (boolean, whether to display the increment button), decrement (boolean, whether to display the decrement button) and quantity (boolean, whether to display the quantity field of the Product).

- ProductDetails: Displays details of a food product and allows for editing if specified (although the editable version is not fully implemented yet), with the props productName (string, name of the Product) and editable (boolean, whether the component should be editable).

- ProductList: Renders a list of "products". Props: products (array), an array of objects representing products to display.

- ProductImage: Component designed to display product images with responsive width based on their aspect ratio. This component dynamically adjusts the width of the displayed image, ensuring optimal presentation for both landscape and portrait-oriented images. Props: src (required): A string representing the URL or path to the image file. alt (required): A string providing alternative text for the image for accessibility purposes.

- Navbar: A navigation bar component, that makes it possible to navigate between different pages in the app. Props: title (string).

- Searchbar: A reusable input field for filtering products. We decided to use the some of the same features from the searchbar component as in project_1. Props: onFilter, a callback function that will be called when the filter value changes.

- ShoppingList: Shows details about your shoppinglist and the items you have added to the reactive variable. Props: title (String, the title of the shopping list).

- FilterDropDown: The FilterDropdown component is used to create a filter for products based on categories. It displays a dropdown menu with radio buttons for selecting different categories. When a category is selected, the component triggers a callback function to notify the parent component of the selected category. Props: onCategoryChange (Function, a callback function that will be called when the filter category changes. It should accept a single argument, the selected category).

- SortButtons: The SortButtons component provides buttons for sorting products in ascending and descending order. It allows users to toggle between sorting options. When a sorting option is selected, the component triggers callback functions to notify the parent component about the chosen sorting order. Props: onSortAsc (function, a callback function that is called when the ascending sort button is clicked) and onSortDesc (function, a callback function that is called when the descending sort button is clicked).

- Modal: Takes a text string as a prop and displays a simple modal containing this text.

- ModeToggleBtn: Toggle button between light and dark mode.

- ConfirmationModal: Functional component designed to display a confirmation message within a modal window. It serves the purpose of confirming the addition of a product to a database or any other similar action. This component takes in a single prop: productName - A string representing the name of the product that has been added to the database.

## Pages

- Home: The home page of the application, displaying your shopping list.

- ProductPage: Either editable or none-editable. The none-editable represents a register for every product in the database, where you get the opportunity to go to a site for adding products to the database. The editable page represents the page where you add products from the register to your shopping list.

- ProductDetailsPage: The details about products in the given ShoppingList as well as in the register, where we either want functionality for going to the next/previous product (in your shopping list), or just display general information about the chosen product in the register.

- AddCustomProduct: The site where you get the opportunity to add products to the register, containing the product info you wish.

## Utils

- mutationFunctions

  - addCustomProduct.ts: Mutation for adding products to the database

- queryFunctions

  - getProduct.ts: Query for getting and searching for products.

- reactiveVariables

  - reactiveVariables: The reactive variable for saving products to the shopping list is defined and the initial state from local storage is read if it exist.
