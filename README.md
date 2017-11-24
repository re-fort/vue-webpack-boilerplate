[![CircleCI](https://circleci.com/gh/re-fort/vue-webpack-boilerplate.svg?style=shield)](https://circleci.com/gh/re-fort/vue-webpack-boilerplate)

vue-webpack-boilerplate
======================

A Webpack boilerplate with Vue.js, vue-loader, axios, vue-router and Vuex.  
The aim of this project is:
- remove the need of manually setting up above libraries
- provide useful features are necessary when building SPA

## Demo
https://re-fort.net/vue-webpack-boilerplate/

## What's included
### develop
- Vue(2.x.x)
- webpack(3.x.x)
- vue-loader
- axios
- vue-router
- Vuex
- Bulma
- Font Awesome

### test
- vue-test-utils
- Mocha
- Karma
- power-assert

## Features
- Practical demo (authentication, pagination, notification, loading spinner and tracking with GA)
- Ready to use Vue plugins (vue-router, Vuex)
- Use of webpack and vue-loader with Hot Module Replacement
- Unit Testing (with Karma + Mocha + vue-test-utils)
- Add hash to filename when production build (avoiding cache problems)
- Inject built files (with html-webpack-plugin)
- Handy NPM scripts
- CI (with Circle CI)

## Setup
```
git clone https://github.com/re-fort/vue-webpack-boilerplate
cd vue-webpack-boilerplate
npm i # or yarn install
npm run dev # or yarn run dev

# You also need to set up vue-webpack-boilerplate-api, if you run this boilerplate at local
# See: https://github.com/re-fort/vue-webpack-boilerplate-api
```

## Usage
- `npm run dev`
- `npm run build`
- `npm test`
