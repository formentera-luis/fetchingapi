
// define the API endpoint as a constant for easy navigation and maintenance
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * main function to fetch and render user data.
 * declared as 'async' to allow the use of 'await' for non-blocking API calls.
 */
async function fetchAndDisplayUsers() {
    // reference the container where user cards will be injected
    const userContainer = document.getElementById('user-container');

    try {
        /**
         * STEP 1: fetch data from the API.
         * the 'await' keyword pauses execution until the Promise resolves.
         */
        const response = await fetch(API_URL);

        /**
         * STEP 2: check for HTTP errors.
         * fetch() only throws an error on network failure, not on 404/500 errors.
         * I manually check 'response.ok' to handle these cases.
         */
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        /**
         * STEP 3: parse the response body as JSON.
         */
        const users = await response.json();

        // clear the initial "loading..." message
        userContainer.innerHTML = '';

        /**
         * STEP 4: iterate through the user array and build the UI.
         */
        users.forEach(user => {
            // create a wrapper element for each user
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            // destructure the user object for cleaner variable access
            const { name, email, address: { city } } = user;

            // define the inner HTML structure for the card
            userCard.innerHTML = `
                <h3>${name}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>City:</strong> ${city}</p>
            `;

            // append the finished card to the container in the DOM
            userContainer.appendChild(userCard);
        });

    } catch (error) {
        /**
         * STEP 5: error Handling.
         * catches network failures, JSON parsing errors, or thrown HTTP errors.
         */
        console.error("Application Error:", error);
        
        userContainer.innerHTML = `
            <div class="error">
                <p><strong>Something went wrong:</strong></p>
                <p>${error.message}</p>
            </div>
        `;
    }
}

/**
 * event listener: run the function once the DOM is fully loaded.
 * this is safer than calling the function immediately at the bottom of the script.
 */
document.addEventListener('DOMContentLoaded', fetchAndDisplayUsers);