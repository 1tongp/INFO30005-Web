**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository-Frontend

GROUP: 
## project-t03-keepsimple

before run the code, please "npm install node" under the project-frontend-t03-keepsimple and project-frontend-t03-keepsimple\customer, then run the whole system by "npm run dev" under project-frontend-t03-keepsimple

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
- Username: keepsimple@h1.com
- Password: 666

The login form is implemented as a pop up window, which can be accessed through the header dropdown or the ‘login and order’ button on the homepage. After a user submits the correct username and password (that is already stored in the database from sign up form), they will get redirected to the menu page, where they can view and order snacks.
if you enter a wrong email address or password there will be a warning to alert you and you cannot login successfully.

NOTE: the signup form is not yet implemented for the current site

## Feature 2: View menu of snacks
(for the design order in our due1, the order we will implement at the end is log in -> main page -> select vendor -> menu and place order, since the map not finished yet the order changed to log in -> menu and place order, we will change to correct order next time)
The menu page shows all the available snacks that users can choose from; prices and images are also listed. Users will only be able to place an order if they have logged in. Therefore, the menu has two status:
- Logged in status: the bottom button will display ‘Place Order’

(since we put the login pop up window on the customer home page at current stage, if the customer go back to home page from menu they need to login again, but we will fix this problem in next due so that when customer enter the customer main page they are logged in, and they can go back to choose vendor again from the menu page)

- Not logged in status: the page title will show ‘view only’, no quantity input box is provided and button at the bottom will display ‘Back to main’

## Feature 3: Order three different snacks
(as we not finished the choosing between 5 nearest vendor on the map at current stage, we will give a vendor id as a selected vendor)

The current implementation assumes the user has already selected a vendor (ID: 6094951d171c4dcfb88a596f) and all orders will be sent to this particular vendor. 

To order snacks from the menu, users will need to:
Change the quantity of all desired foods via the up and down arrows, or directly type in the wished quantity
Once all quantities are put in for the wanted foods, click ‘place order’ button at the bottom of the page

The ordering process is implemented this way to allow users to check the quantity for specific food before ordering. 

After clicking the ‘place order’ button, a pop up window will appear, informing the user that the order has been placed successfully. These data will be sent to the backend server with an unique order ID, which will then be sent to the vendor.

## Feature 4: View order details of all past orders

To access all the ongoing and completed orders, users need to click the user icon in the header and click on ‘My Orders’ (on the top right corner there is a icon looks like a person). This will take them to the My Order page, which lists all the information about every order. These include the order time, ID, van name, order status, ordered products, quantity, prices and finally rating/comments.
