Getting Started with Create React App

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
# react-app

# Start resource-server and keycloak

### Clone resource-server
`git clone git@github.com:rjtch/secure-oauth2-oidc-workshop.git`

#### Replace the existing WORKSHOP_HOME directory in the setup directory
`[secure-oauth2-oidc-workshop/setup/run_keycloak_docker.sh]`

#### Run keycloak in Docker
`./run_keycloak_docker.sh`

#### Start the resource-server in [lab1/library-server-initial]
Swagger-UI: `http://localhost:9091/library-server/swagger-ui/index.html#/`

### `npm run cp-opanapi-spec & npm run generate-api`

Copy the swagger.json from swagger and generate the DTOs and services using OpenApi.


**Note: You can use one of the following users to login:**

```angular2html
Username |  Email                       |   Password   |  Role
         |                              |              | 
bwayne   |  bruce.wayne@example.com     |   wayne      |  LIBRARY_USER
         |                              |              |     
bbanner  |  bruce.banner@example.com    |   banner     |  LIBRARY_USER
         |                              |              | 
ckent    |  clark.kent@example.com      |   kent       |  LIBRARY_ADMIN

```
To add more users and roles you can edit this file and restart keycloak:

`secure-oauth2-oidc-workshop/setup/keycloak_realm_workshop.json`
