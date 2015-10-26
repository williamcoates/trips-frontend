# Trips project front-end

Simple travel planner HTML5 web application front-end built with Brunch + ES6 + React + React Router.

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

This will build with backend set to heroku instance, and using production setup

    BACKEND=https://afternoon-harbor-1379.herokuapp.com brunch build --production


## Low priority fixes

* Make filters align horizontally in desktop
