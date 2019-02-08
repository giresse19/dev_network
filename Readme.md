# MINI-LINKEDIN

This program is built for Adcash application challenge.

## Running on Live
s
This application will be  hosted on Heroku in free plan and auto-deployed with every change.

**Note**: Due to Heroku/free, the app closes itself after 30 minutes of reactivitiy and reopens when called again, which takes ~5 more seconds.

| Purpose | URL
| - | -
| 404 page | https://adcash-stock.herokuapp.com/anypage


## Building and running locally

To run this locally, you need Node.js > 8 and a MongoDB.

Clone the repository, install required packages via `npm install` or `yarn install` then run `npm start`. Example commands are below:

```sh
git clone https://github.com/giresse19/dev_network
npm install
npm run server
```

| Purpose | URL
| - | -
| 404 page | http://localhost:8000/anypage

## Folder structure

### Root files

| File | Comment
| - | -
| `.editorconfig` | IDE styler (see http://editorconfig.org/)
| `.eslintrc.js` | ESLint Rules, including ES6 and some best practices
| `.gitignore` | Ignoring node_modules and lock files (for heroku support)
| `Procfile` | Heroku worker file
| `Readme.md` | This file
| `package.json` | NPM data including node and npm engine versions

### src/server.js
* Main entrance point, also defined as this on `package.json`
* Catches all exceptions and logs, preventing errors to crash process
* Uses `process.env.PORT` (heroku standard) to define listen port, fallbacks to `8000`
* Calls and listens to `src/app.js`

### src/app.js
* Isolated Express App (without the server)
* It has only one custom middleware that
  * Sets response header for JSON
  * Creates a function to return APIs in `{status:200, data: ...}` format
* It has a public API which uses `users` service
* It has a fallback route for 404
* It has an Error route to catch uncaught errors

### src/models.js
* Mongoose connection starts here
* Mongoose models and their schemas are defined and exported here (to be only used by `src/db.js`)

### src/db.js
* Uses `src/models` to get Mongoose Models
* Behaves like ORM layer

### src/users.js
* Handling ofUsers logic is here
* Contains only one exported service (see `module.exports = `)
* All subroutines are seperated as functions 

### src/post.js
* Handling of Post logic is here
* Contains only one exported service (see `module.exports = `)
* All subroutines are seperated as functions 

### src/profile.js
* Handling Profiles logic is here
* Contains only one exported service (see `module.exports = `)
* All subroutines are seperated as functions 
