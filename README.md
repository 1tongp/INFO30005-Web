**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository-Frontend

GROUP: 
## project-t03-keepsimple

## Before running the code
Before run the code, please "npm install node" under the project-frontend-t03-keepsimple and project-frontend-t03-keepsimple\customer, then run the whole system by "npm run dev" under project-frontend-t03-keepsimple


**frontend and backend**
Frontend code are written in the project-frontend-t03-keepsimple/customer folder. 
Backend code are written in the project-frontend-t03-keepsimple folder.

## commit id in main branch which used for marking 
-


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
- Locating current location on the map may be effected by internet connection speed
- To order from a vendor, please zoom out on the map to find coffee icons. 
  Choose a vendor by clicking on one of the icons.