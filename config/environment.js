/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'yooarrell',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    apiUrl: 'https://api.yooarrell.com/v1/',
    apiHost: 'https://api.yooarrell.com',
    apiNamespace: 'v1',
    'ember-simple-auth': {
      authorizer: 'authorizer:devise',
      authenticationRoute: 'login'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiUrl = 'http://api.yooarrell.dev/v1/';
    ENV.apiHost = 'http://api.yooarrell.dev';
    ENV.apiNamespace = 'v1';
    ENV.cookieDomain = "localhost";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.cookieDomain = ".yooarrell.com";
  }

  return ENV;
};
