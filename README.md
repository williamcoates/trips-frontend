# Trips project front-end

Simple travel planner HTML5 web application front-end built with Brunch + ES6 + React + React Router.

Demo at https://williamcoates.github.io/trips-frontend/.

Rails powered simple backend over at https://github.com/williamcoates/trips-backend.

Tested on the following:

  * Chrome desktop
  * Safari desktop
  * FF desktop
  * Safari iOS
  * Mobile Chrome

## Setup

You will need to have node.js and npm installed, as well as brunch and bower.

To install brunch and bower globally run:

    npm install -g brunch && npm install bower

Now in the root of this project run:

    npm install && bower install

This will install all the npm and bower dependencies.

## Development

Running the front-end dev server:

    brunch watch --server

## Production build

This will build with backend set to heroku instance, and using production setup, for the github pages deployment

     ROOT_PATH=/trips-frontend/ BACKEND=https://afternoon-harbor-1379.herokuapp.com brunch build --production

## Pushing to github pages

Don't love this approach as it means polluting our commit history with build files. We always need push to master before we can push the subtree.

    git subtree push --prefix=public git@github.com:williamcoates/trips-frontend.git gh-pages


## Low priority fixes

* Make filters align horizontally in desktop
