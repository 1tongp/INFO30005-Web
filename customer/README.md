# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository-Frontend

GROUP: 
## project-t03-keepsimple

before run the code, please "npm install" under the project-frontend-t03-keepsimple and project-frontend-t03-keepsimple\customer, then run the whole system by "npm run dev" under project-frontend-t03-keepsimple

**frontend and backend**
all frontend code are written in the project-frontend-t03-keepsimple\customer folder, and all backend code are writtten in the project-frontend-t03-keepsimple folder


## Features: 
- Customer login via log in form
- View menu of snacks
- Order three different snacks
- View order details of all past orders

## Customer Home page：
(there should be a enter page which people can choose login as vendor or customer, and when customer enter current customer home page they should be logged in, as the vendor side not finished yet, we move the log in pop up window to that page in order to show the log in process)
When a user arrives at the home page, they can either login and place an order, or view menu without login. This can be done via the two buttons displayed on the page or through the user icon in the header, where a dropdown menu will occur, containing ‘log in’ and ‘sign up’. If the user has logged in, this dropdown will change to ‘Hi ''user first name''’, ‘My Order’ and ‘Log out’.

Click ‘Log in and order’: pop up window will appear as a login form.
Click ‘View menu without logging in’: users get directed to the menu page


## Feature 1: Customer login via log in form
- Username: yp@test0504.com
- Password: 3011

The login form is implemented as a pop up window, which can be accessed through the header dropdown or the ‘login and order’ button on the homepage. After a user submits the correct username and password (that is already stored in the database from sign up form), they will get redirected to the menu page, where they can view and order snacks.

NOTE: the signup form is not yet implemented for the current site

## Feature 2: View menu of snacks
(for the design order in our due1, the order we will implement at the end is log in -> main page -> select vendor -> menu and place order, since the map not finished yet the order changed to log in -> menu and place order, we will change to correct order next time)
The menu page shows all the available snacks that users can choose from; prices and images are also listed. Users will only be able to place an order if they have logged in. Therefore, the menu has two status:
- Logged in status: the bottom button will display ‘Place Order’

(since we put the login pop up window on the customer home page at current stage, if the customer go back to home page from menu they need to login again, but we will fix this problem in next due so that when customer enter the customer main page they are logged in, and they can go back to choose vendor again from the menu page)

- Not logged in status: the page title will show ‘view only’, no quantity input box is provided and button at the bottom will display ‘Back to main’

## Feature 3: Order three different snacks
(as we not finished the choosing between 5 nearest vendor on the map at current stage, we will give a vendor id as a selected vendor)

The current implementation assumes the user has already selected a vendor (ID: 6082092adf7e59001590d377) and all orders will be sent to this particular vendor. 

To order snacks from the menu, users will need to:
Change the quantity of all desired foods via the up and down arrows, or directly type in the wished quantity
Once all quantities are put in for the wanted foods, click ‘place order’ button at the bottom of the page

The ordering process is implemented this way to allow users to check the quantity for specific food before ordering. 

After clicking the ‘place order’ button, a pop up window will appear, informing the user that the order has been placed successfully. These data will be sent to the backend server with an unique order ID, which will then be sent to the vendor.

## Feature 4: View order details of all past orders


To access all the ongoing and completed orders, users need to click the user icon in the header and click on ‘My Orders’. This will take them to the My Order page, which lists all the information about every order. These include the order time, ID, van name, order status, ordered products, quantity, prices and finally rating/comments.
