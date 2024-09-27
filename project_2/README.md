# Table of Contents

1. [Project 2](#project-2)
2. [Building and Running the Project](#building-and-running-the-project)
3. [Prettier](#prettier)
4. [Development](#development)
   1. [Built With](#built-with)
   2. [Dependencies](#dependencies)
5. [Structure](#structure)
6. [Functional Requirements](#functional-requirements)
7. [Technical Requirements](#technical-requirements)
8. [Testing](#testing)
9. [Future Work](#future-work)

# Project 2
**KurvKompis** is an application developed as part of the group project in *IT2810 Webutvikling* at NTNU fall 2023. The main task in this project was to represent a large amount of data.

We have made a shopping list app, where the user can make their own shopping list based on a product register, where products represent groceries. The main functionality of this app is making a customized shopping list, to make the everyday shopping easier. The user will have a register of products to choose from, and may also add products to this register as they wish. The user will also have the opportunity to read details about each product.

## Building and Running the Project

To get started, run the following commands in the following order:

| Command                                                                       | Description                                  |
| ----------------------------------------------------------------------------- | -------------------------------------------- |
| `git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-22/project_2.git ` | clone project                                |
| `cd GoCart`                                                                   | navigate into root folder                    |
| `npm run back`                                                                | install dependencies and run backend server  |
| `npm run front`                                                               | install dependencies and run frontend server |

Or manually:

### Cloning the repository

1. Create a folder on your machine in which you want the project to live, for example the folder "project_2"
2. Go to the GitLab repository https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-22/project_2 and select "Clone" and copy the URL pertaining to "Clone with HTTPS".
3. Open the folder created in step 1 in a terminal and enter "git clone the-url-from-clone-with-https"
4. Wait until the cloning process is finished
5. Run "git pull" in the terminal just to be sure that you got everything from the repository
6. Run "git branch -a" to see all branches
7. Run "git checkout name-of-branch" to switch to another branch
8. Once you are in the desired branch make sure that you are in the "GoCart" folder. For example, if you created the folder "project_2" folder in step 1, you may want to run "cd GoCart" to enter the correct folder.

### Installing mongodb community edition (locally)
This is only for running the backend locally:

1. Install mongodb community edition on your computer by following the instructions at https://www.mongodb.com/docs/manual/administration/install-community/
2. During installation of mongodb or thereafter install mongodb compass
3. Run mongodb using the terminal by following the instructions given at the link above for your platform
4. After all installation is complete, start mongodb compass
5. Connect to the database with mongodb compass
6. Create a database called GoCart with a collection called Products
7. Upload the json file you find at GoCart/frontend/src/utils/dbData/GoCart.Products.json to the Products collection

### Running the project

1. Going back to the project. From the GoCart folder you can run npm run back to run the backend server and connect the project to the database. Thereafter, you can run npm run front in a new terminal (remember to cd into GoCart if you are not already there). This will start the website.
2. Interact with our website.

## Prettier and linting

### Prettier
Prettier is recomended to format on save. To activate follow these steps:

```
- Install Prettier extension
- Open settings for your VS Code
- Click on the formatting section of the Text Editor tab and enable Format on Save Mode.
- Highlight your code and right-click. Select Format Document. Once you click on Format Document, a dialog box will tell you to configure your code formatter. This is to set your default code formatter. Click on the configure button.
- After you click on configure, select Prettier as the default formatter.
```

Source for guided step by step tutorial: https://www.educative.io/answers/how-to-set-up-prettier-and-automatic-formatting-on-vs-code

Or use shift + alt + F to format

### Linting
- Navigate to the right folder, either backend or frontend.
- Open your terminal and run `npm run lint` 

## Development

### Technology

- [Typescript](https://www.typescriptlang.org/)
  - JavaScript with syntax for types
- [React](https://reactjs.org/)
  - Component based JavaScript library used for creating user interfaces
- [Vite](https://vitejs.dev/)
  - Build tool
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
  - A GraphQL server for your API
- [Apollo Client](https://www.apollographql.com/docs/react/)
  - A GraphQL client for your frontend
- [GraphQL](https://graphql.org/)
  - A query language for your API

### Dependencies

This project uses the [npm](https://www.npmjs.com/) package manager.

- [React-router](https://reactrouter.com/en/main)
- [Tailwind CSS](https://tailwindcss.com/)

## Structure

The app is structured in such a way that the various parts of the website are organized into their own folders within common directories with similar elements, as follows:

- "backend", including every element of the backend:

  - The "models" directory contains type definitions (typeDefs) using GraphQL schema syntax that define the structure of the data models used in the application. These models include types such as Product, Category, Store, PriceHistory, Allergen, Nutrition, Label, and corresponding input types used for mutations.
  - The "resolvers.js" file contains resolver functions that define how the GraphQL queries and mutations defined in the type definitions (typeDefs) are resolved. Resolvers interact with the database (MongoDB) to retrieve, manipulate, or modify data based on the incoming GraphQL operations.
  - The "index.js" file is the entry point for the backend application. It sets up the Apollo Server using the provided typeDefs, resolvers, and connects to a MongoDB database using Mongoose. It also starts the server to listen for incoming requests.

- "frontend", including every element of the frontend:
  - The different pages are grouped under *pages*.
  - The various components that are used in different pages are located under *components*.
  - The different tools used to assist in various parts are located under *utils*.
  - Icons are located under *assets*.
  - Component tests are to be found under *tests*, while the e2e tests are to be found under *cypress*

The actual app is under "project_2/frontend/src/App.tsx."

## Functional Requirements

Search functionality, e.g., through a dialog/form/search field for search input

- We have implemented a "Searchbar" component, which updates the displayed products by doing a query 500ms after the user stops writing, so that the products matches the search input consequently. We have chosen to implement this functionality in a way that the search is made based on whether or not the product contains the sequence of letters that are searched for. This makes it easier for users to search for products even though they might not remember the full name.

List-based presentation of searches with provisions for handling large result sets, either by paging through them or dynamically loading more results through scrolling.

- The ProductRegister page shows a list-based presentation of possible shopping products depending on the input of the search field. Large result sets are handled by dynamically loading more products if the user choose to, by clicking "show more" or "show less".

The ability to view more details about each object.

- By clicking on a product in the list one will be sent to a page showing more information about the selected product, gathered from the database.

Sorting and filtering options for the result set (note that sorting and filtering should be applied to the entire result set, not just what happens to be loaded on the client).

- We have implemented filtering based on the categories of the products in the database, where the filtering is applied to the entire result set, and shown on the page as the category changes. We have chosen to only allow selecting one category, this is due to the users ability to sort and search as well as filter, and we did not see the need to be able to filter for several categories on the same time.
- We have implemented sorting options in an alphabetic order or reversed alphabetic order, where the alphabetic order is default. This is also applied to the entire result set, and displayed on the screen in the chosen order.

Inclusion of some form of user-generated data that should be stored persistently on the database server and presented (either user-added information, reviews, ratings, search history, or other data like a shopping list).

- The user is able to add custom products to the product register. Our system handles user-generated data by integrating GraphQL mutations and MongoDB database operations to ensure the persistent storage of user inputs. Inside our resolvers we utilize the addCustomProduct mutation, which receives user input (ProductInput) and inserts new products into the database. The resolver validates the input and performs the insertion operation, ensuring that user-generated product data is stored persistently. The AddCustomProduct component in the frontend facilitates user interaction by providing input fields for various product details. It interacts with the Apollo Client to execute the ADD_CUSTOM_PRODUCT mutation, passing the user-entered data to the backend.

The solution should demonstrate aspects of universal design and web accessibility.

- The website is designed to change the layout of the page based on the size of the user device.
- The webpage has been anlysed with the axe DevTools (chrome extention) and these changes was made to solve issues:
  - Main color on pages was changed to get better contrast between text and background making tekst more readable
  - Elements without spesific tags or text got aria labels to enchant screenreading ability
  - Scrollable element was done accessable through keyboard navigation

The solution should demonstrate aspects of sustainable web development through design choices.

- We have opted to implement dark mode and set it as the default, as darker colors often require less power for screen lighting, making the page more energy-efficient.
- By displaying a significant amount of information (e.g., product details when clicked) in a pop-up rather than on a separate page, we reduce the number of page switches and minimize reloads, as product pages don't need to be reloaded when navigating back.
- We've removed the "show more" button on product pages when there are no additional products to display. This not only streamlines the user experience but also prevents unnecessary database queries.

- We've contemplated adding pictures to the products. However, this could potentially make the page less sustainable, considering that images generally consume more power to load. The impact on sustainability depends on the picture format. Despite this, we've evaluated its effect on user experience and concluded that it's worth the extra cost, as long as we ensure that only essential pictures are loaded.
- We've also chosen to maintain a somewhat minimal page design, reducing the number of elements that need to be rendered on the page.

Good design, sensible choices, and solutions that align with the type of data you choose.

- The website follows a lot of the standards of web pages making it easy to navigate giving it a good design.

## Technical Requirements

The user interface should be based on React and programmed in TypeScript. The project should be set up using Vite.

- We have build the project using React and typecript, set up by Vite.

Use of state management, for example, redux, mobx, recoil, apollo local state management, etc.

- Our application incorporates Apollo Client's reactive variables (ReactiveVar) to manage local state, specifically focusing on maintaining a shopping list's state within the client-side environment. We initiate a reactive variable named shoppingListProductsVar using makeVar() from @apollo/client. This variable encapsulates an array representing the shopping list, retrieving the initial state either from local storage or defaulting to an empty array if no prior state exists (happens within the reactiveVariables under utils in the frontend). The Product component utilizes useState to manage the local state of newProductQuantity, representing the quantity of a specific product within the component and retrieves the shopping list from the reactive variable using useReactiveVar hook to reflect any changes in the shopping list. When a user increments or decrements the product quantity, the component updates the newProductQuantity state and interacts with the reactive variable (shoppingListProductsVar) accordingly. Upon modifying the shopping list in the reactive variable, the component updates the local storage to persist the changes, ensuring that the shopping list state persists across sessions.

A custom/developer GraphQL backend, with the freedom to choose the type of database server on the backend, but the project should use a backend database set up by the group.

- Our custom GraphQL backend is built using Apollo Server, a powerful GraphQL server implementation. Apollo Server provides an efficient and flexible means to interact with our backend data.

Use of good and relevant components and libraries (freedom to choose, and we encourage maximum reuse of third-party solutions).

- We have used Tailwind for making the styling process smoother.

## Testing

The tests are set up using vitest and should be covering both frontend and backend.

The component tests are located under **tests** in the frontend folder. You can run the component tests by running: `npm run test` from GoCart/frontend/

- Component tests: The component tests utilize vitest, a testing framework for React components. These tests focus on the functionalities of individual components, ensuring they perform as expected.
- To check test coverage run `npm run coverage` from GoCart/frontend/

The E2E tests are located under **e2e** in the frontend/cypress folder. You can run the E2E tests by running: `npx cypress open` from GoCart/frontend/

- E2E testing: The E2E tests employ Cypress, a testing framework for end-to-end testing of web applications. These tests cover the functionality of the application from a user's perspective, interacting with the UI elements as a real user would. The tests in the end-to-end testing cover the requirements we've set through the user stories for the website's functionality. Also the tests are made covering a page.

## Future Work

If we were to continue working on this project, these are some parts we would considering implementing:

- Implementing functionality for deleting products you have added to the database. This could be a good implementation, although we have chosen to let the managing of the data be done by the developers for now.
- Enable multiple categories in filtering function. This could be done so that people can narrow the searchf or a product down even more, although we do not see the need for this as we already have plenty of options for finding your desired product.
- Extend test to cover more of the components and the apps functionallity. Currently the coverage ain't as high as we would like, due to last minute changes in some of the components.
