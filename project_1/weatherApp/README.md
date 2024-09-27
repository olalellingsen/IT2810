## Functional Requirements
The user should be presented with one resource at a time, with easy navigation options to move forward and backward, and the ability to jump to a specific resource (for example by selecting from a list).
* We have chosen to allow the user to navigate between different resources (weather forecasts for cities) through a comprehensive list on the application's homepage, where the user can click on each resource for more information.

A user should be able to make a choice (e.g., filtering or sorting) that affects the selection and presentation of content. These choices should be remembered even if the page is reloaded.
* We have chosen to give the user the ability to filter which cities' weather forecasts they can view based on the country they are in. This filtering is done by clicking on each country below the search bar on the "Home" page. The choices are stored using sessionStorage. The user also has the option to search for cities they want to see the weather forecast for, and the search updates as the user types input into the search bar.

A user should be able to select favorites by, for example, clicking on a star or heart icon. These choices should be remembered even if the browser is closed and restarted.
* We have chosen to allow the user to mark cities as favorites. These favorites are stored in "Favorites," making it easy for the user to access the marked cities. The storage is done using localStorage, so the user can find the information even if they close and restart the browser.

The page should have a responsive design and be designed for both regular desktop screens and mobile devices (adapting to smaller screens in both portrait and landscape orientations).
* We have made various design choices for responsiveness. When using a PC, the user will directly click into "Home" and "Favorites" in a responsive navbar based on screen size. Filtering by country will be displayed as a line of countries below the search bar.
* On current mobile devices, the user will have the option to click on a dropdown menu displaying the options "Home" and "Favorites." Filtering by country will now appear on two lines below the search bar, making the application more user-friendly on mobile.

The list of cities will function as a scrollbar on all devices. The page should have an aesthetic and organized layout (this is subjective, but we expect that you have put some effort into styling the page).
* We have made several styling choices to make the application as readable and organized as possible. Various elements have a consistent style on all pages the user can navigate between, ensuring a clean and simple design.

## Technical Requirements
Demonstrates the use of React state and props.
* We actively use props in components to pass data between them, and React state to store necessary information in the components.

The solution fetches data/information from a REST API and uses the TanStack Query.
* We have chosen to fetch data from https://open-meteo.com/.

Uses HTML Web Storage API (both localstorage and sessionstorage), or optionally, the IndexedDB API.
* We have opted to store country filtering choices using sessionstorage so that the user can maintain their selections even if the page refreshes. 
* Favorite markings are stored in localstorage and presented in "Favorites," allowing the user to easily find their chosen cities on the same device.

Utilizes React Router
* We use React Router to navigate the user between different pages in the application, such as "Home" and "Favorites" in the navbar, and to send the user to a page displaying more details and a long-term forecast for a city by clicking on the city's name in "Home."

The solution has a responsive design. It specifies the types of screens the solution is tailored for and the use of media queries.
* We use media queries to adapt the appearance of the page to different screen sizes. For a regular desktop-sized screen, the navigation bar will have the title on the left and links to navigate to the Home screen and favorites on the right. For mobile screens, Home and Favorites will be moved into a hamburger menu, while the website's title is centered.


## Testing
We use some simple tests to ensure that the correct weather icons are displayed depending on the weather forecast. Additionally, we have prepared tests with mocked data. The application was tested in several different browsers (Safari, Firefox, and Chrome), and we used browser tools to check how the application performs on mobile screens.

## Future Work
- Develop additional tests.
- For further design development, we are considering giving different data points (e.g., min/max temperatures) different colors. We are also considering making the background color of the page dynamic, reflecting the weather of the selected city.
- Add a tab icon.
- Regulate when which weather icons are shown, and the thresholds for these. Also fix the maths for calculating different aspects, such as average rain and cloud coverage, and min / max temp.

Fix bugs:
* Currently, there is a visual bug with favorite markings that causes them to disappear or shift when using the search function. However, this is only a visual issue and does not significantly affect the functionality of the application.