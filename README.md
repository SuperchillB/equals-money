# Equals Money

Take-home assignment for a Frontend Developer position at Equals Money

## Context

Given the below API

GET - [https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts](https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts) - returns a list of contacts
POST - [https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts](https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts) - creates a contact
PUT - [https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/:id](https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/:id) - edits a contact
DELETE - [https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/:id](https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts/:id) - deletes a contact

Example data

```
[
  {
    "createdAt": "2021-12-22T07:11:08.136Z",
    "name": "Olive Sawayn",
    "avatar": "<https://i.pravatar.cc/300>",
    "email": "Chadd_MacGyver0@hotmail.com",
    "phone": "(264) 221-8092 x4383",
    "birthday": "2021-01-14T01:43:04.943Z",
    "id": "5"
  },
  {
    "createdAt": "2021-12-21T16:57:41.550Z",
    "name": "Melody Jacobi",
    "avatar": "<https://i.pravatar.cc/300>",
    "email": "Gretchen73@hotmail.com",
    "phone": "1-811-658-9113",
    "birthday": "2021-05-24T06:54:15.513Z",
    "id": "6"
  }
]
```

Build a contact viewer which will display a list of contact cards with minimal details (Name & Avatar). When clicking on the card a more detailed view should be shown with the ability to edit or delete a contact. If you are going to need state management I would prefer you use hooks and the context API directly. Extra marks for adding an avatar editor. Most importantly, keep it simple.

## Features

- [x] Fetching all contacts
- [x] Fetching individual contacts
- [x] Updating individual contacts
- [x] Deleting individual contacts
- [x] Creating individual contacts
- [x] Uploading your own avatar from your computer file system
- [x] Write tests

## Technical aspects

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with [TypeScript](https://www.typescriptlang.org/)
- The package manager used in this project is [pnpm](https://pnpm.io/)
- [React Router's new v6.4](https://reactrouter.com/en/main) is used in this project for better client-side routing but also improved data fetching and overall UI performance
- External data fetching is partly handled by [React Query](https://tanstack.com/query/v3/docs/react/overview), especially when it comes to caching
- Styling was done with the help of [React Bootstrap 5.2](https://react-bootstrap.github.io/), covering both responsiveness and basic accessibility
- Project uses also CSS modules with Sass for styling
- [Cypress](https://docs.cypress.io/) is used for both E2E and component testing

## Getting started

_Quick note: This project uses `pnpm` as the dependency package management tool. To install this tool, make sure you follow the instructions [here](https://pnpm.io/installation)._

Please run the following to install all the packages needed in this app:

### `pnpm install`

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm cy:e2e`

Runs E2E Cypress tests to completion. By default, cypress run will run all tests headlessly.

### `pnpm cy:component`

Runs E2E Cypress tests to completion. By default, cypress run will run all tests headlessly.

### `pnpm cy:open`

Opens a Cypress browser window (Cypress Launchpad) and runs tests in the test runner.

### `pnpm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
