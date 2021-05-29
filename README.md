**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository-Frontend

GROUP: 
## project-t03-keepsimple

before run the code, please "npm install node" under the project-frontend-t03-keepsimple and project-frontend-t03-keepsimple\customer, then run the whole system by "npm run dev" under project-frontend-t03-keepsimple

**frontend and backend**


all frontend code are written in the project-frontend-t03-keepsimple\customer folder, and all backend code are writtten in the project-frontend-t03-keepsimple folder

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
- you can run the integration tests and unit test for vendor parking at the same time by "npm test"
- two test file under the "test" folder, 4 status of vendor we want to test whether they are successfully updated:
- 1. currentAddress : a tring which vendor can type in by themselves 
- 2. parked : true or false, represent the status of parking
- 3. location : Point type, the lat and lng of vendor location
- 4. readyForOrder: true or false, represent whehter it is open for business  