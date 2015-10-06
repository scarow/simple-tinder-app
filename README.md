# simple-tinder-app


Notes:

Basic webpack & react setup from here: http://jslog.com/2014/10/02/react-with-webpack-part-1/

What do my package scripts do?
serve: npm run serve - just starts an http-server serving files from our local dir, running on port 8080 (it serves index.html).
dev: npm run dev - starts webpack-dev-server on port 8090 which serves both the webpack-dev-server.js runtime and our bundle.js file.
start: npm run start - command simply executes serve first and then starts the dev server.