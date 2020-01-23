# yams

Yet Another Movie Search

## Overview

YAMS was created as a toy project to demonstrate my abilities, however, I like
to share with the world when I am creating. The process for creating this took
just over 12 hours. I stumbled on a few of the API requests for the movie
database being queried. I am happy with the results and would release this as
an MVP.

The system consists of a client web application (`client`) and a Node.js
API (`api`). The client uses the [React Framework](https://reactjs.org) with
[MobX](https://mobx.js.org/README.html) for data management. The API is written
to be deployed as an AWS Lambda function using [Express](https://expressjs.com/)
for route management and [Serverless Framework](https://serverless.com) for
development and deployment.

## Development

### Requirements

Please make sure your development machine has the following:

- Node.js (1.12+)

### Runtime

The application is written with local development in mind. There are no database
requirements at the moment. The API is a separate process than the development
service for the client app.

Read the documentation for the [client](client/README.md) and the
[api](api/README.md) separately for more detail.

In your terminal:

- change directory to `api`
- run `npm install`
- run `npm start`

In a new terminal window:

- change directory to `client`
- run `npm install`
- run `npm start`

Both applications are already wired up to "speak" with each other locally. The
client run should open your default browser to `http://localhost:3000`, if it
doesn't you should be able to once the process says you can.

## Deployment
