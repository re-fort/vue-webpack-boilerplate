// Setting
const apiBaseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:7070' : 'https://vue-webpack-boilerplate-api.herokuapp.com'

export default {
  Api: {
    baseUrl: apiBaseUrl,
    authUrl: `${apiBaseUrl}/auth`,
  },
  GA: {
    trackingId: process.env.NODE_ENV !== 'production' ? 'UA-XXX-X' : 'UA-XXX-X',
  },
  Sentry: {
    // change this Sentry DSN to yours when using in Production
    url: process.env.NODE_ENV !== 'production' ? 'https://77fb2984d58441e0acd9ce787e89fc41@sentry.io/254333' : '',
  },
}
