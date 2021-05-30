**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository-Frontend

GROUP: 
## project-t03-keepsimple

## Customer Account
username: keepitsimple@h1.com
password: info30005

## Vendor Account
Vendor 1
  username: Spider-Man
  password: 666

Vendor 2
  username: KeepItSimple
  password: 666

Vendor 3
  username: Black Pearl
  password: 666

Vendor 4
  username: Happy Lemon
  password: 666

Vendor 5
  username: Moonbucks
  password: 666

Vendor 6
  username: Sunbucks
  password: 666

## Before running the code
Before run the code, please "npm install node" under the project-frontend-t03-keepsimple and project-frontend-t03-keepsimple\customer, then run the whole system by "npm run dev" under project-frontend-t03-keepsimple.


**frontend and backend**
Frontend code are written in the project-frontend-t03-keepsimple/customer folder. 
Backend code are written in the project-frontend-t03-keepsimple folder.


## Heroku URL Link
-Live URL : https://frontend-keepitsimple.herokuapp.com/

## MongoDB connection, below is the access link
"mongodb+srv://Project-Connection:666@keepitsimple-project.zvwkr.mongodb.net/KeepItSimple-Project?retryWrites=true&w=majority"
- project: keepitsimple-project
- account name: Project-Connection
- password: 666

## unit and integration tests 
- npm install --save-dev mocha chai request
- you can run the integration tests and unit test for vendor parking at the same time by "npm test"
- the two test files are under the "test" folder. These test whether the four status for vendor are successfully updated:
    1. currentAddress : a string which vendor can type in by themselves 
    2. parked : true or false, represent the status of parking
    3. location : Point type, the lat and lng of vendor location
    4. readyForOrder: true or false, represent whehter it is open for business  
- in our design, when a vendor is parked, the status of "parked" and "readyForOrder" will be marked as 'true' at the same time. Within the five nearest vans, the vans that have "readyForOrder" as 'true' will be considered as valid vans that customer can order from.

## Instruction Notes
- Locating current location on the map may be effected by internet connection speed.
- Some of the vans are located near Melbourne University. 
  You can manually set your location as '-37.7963，144.9614' to locate closer to the parked vendors. 
  This can be done by right click in the browser --> Inspect --> Sensors --> Manage location.
- You can zoom out on the map to see the five nearest vans, as some vans may locate further away from the current location.
- To order from a vendor, please zoom out on the map to find coffee icons. 
  Choose a vendor by clicking on one of the icons.
- On the customer side, if a van is not selected, clicking on 'Menu' in the header will direct users to the main page to select a van from the map.
- To view a newly placed order, click on the 'basket' icon in the header.
- Vendor does not have a sign up feature and they can only use the account provided by the company. This is to ensure the system is safe, clean and accounts would not be registered by random users.

