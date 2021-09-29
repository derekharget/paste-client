# Pastebin Clone Front End

A simple pastebin clone that is built using React/Laravel. 


## Setup Development

- To start the cycle, you need to have the backend running, https://github.com/derekharget/paste-backend

- npm install

- Setup the env file to match your environment and were your running the backend

- npm start

## Production

- You need to setup the backend first, make sure the cors settings are correct for the domain, see https://github.com/derekharget/paste-backend

- Put your api url to where your running the backend

- npm run prod

- Setup nginx or your preferred webserver to redirect all requests for the domain to index.html in the build directory.
