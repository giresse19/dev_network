# Profile-Portfolio

This program is built as a side-project.

## Running on Live

This application will be  hosted on Heroku in free plan and auto-deployed with every change.

**Note**: Due to Heroku/free, the app closes itself after 30 minutes of reactivitiy and reopens when called again, which takes ~5 more seconds.

| Purpose | URL
| - | -
| 404 page | 


## Building and running locally

To run this locally, you need Node.js > 8 and a MongoDB.

Clone the repository, install required packages via `npm install` or `yarn install` then run `npm start`. Example commands are below:

```sh
git clone https://github.com/giresse19/dev_network
npm install
npm run server
```

| Purpose(type) | URL
| - | -
| 404 page(GET) | http://localhost:5000/anypage
| register(POST)| http://localhost:5000/api/v1/users/register
| login(POST)   | http://localhost:5000/api/v1/users/login
| current(GET)  | http://localhost:5000/api/v1/users/current


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
* It has a public and private API which uses `users` service
* It has an Error route to catch uncaught errors

### src/models.js
* Mongoose connection starts here
* Mongoose models and their schemas are defined and exported here 

### config/key.js
* contains application `keys` and important `secrets` 

### config/passport.js
* Uses `src/models` to get Mongoose Model for User
* It has only one custom middleware that
 * finds user from model by Id 
 * returns `done` method upon finding with either a `success` for user found or `failure` for user not found

### src/users.js
* Handling of Users logic is here
* Uses `src/models` to get Mongoose Model for User
* contains POST request for `/register`, `/login` and GET for `/current`, User
* Uses the `config/passport` to assist in authentication `loged In` User.
* Uses `sign` middleware from passport module to return token and payload to authenticated users

### src/post.js
* Handling of Post logic is here
* Contains only one exported service (see `module.exports = `)
* All subroutines are seperated as functions 

### src/profile.js
* Handling Profiles logic is here
* Contains only one exported service (see `module.exports = `)
* All subroutines are seperated as functions 
