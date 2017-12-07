// Setting
export default {
  Api: {
    baseUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:7070' : 'https://vue-webpack-boilerplate-api.herokuapp.com',
  },
  GA: {
    trackingId: process.env.NODE_ENV !== 'production' ? 'UA-XXX-X' : 'UA-XXX-X',
  },
  Sentry: {
    url: process.env.NODE_ENV !== 'production' ? 'https://77fb2984d58441e0acd9ce787e89fc41@sentry.io/254333' : 'https://fc306969c6e04e8aa33951b5262634b0@sentry.io/255587',
  },
}
