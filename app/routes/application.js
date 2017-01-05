import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import nprogress from 'ember-cli-nprogress';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),
  actions: {
    loading(transition) {
      nprogress.start();
      transition. finally(() => {
        nprogress.done();
      });
      return true;
    },
    error(resp, transition) {
      if (!resp || resp && !resp.errors) {
        Ember.Logger.error(resp);
        return;
      }
      this.onResourceError(resp);
      let codes = resp.errors.reduce(function (errorCodes, error) {
        if (errorCodes.indexOf(error.code) === -1) {
          errorCodes.push(error.code);
        }
        return errorCodes;
      }, []);
      if(!codes.length || typeof codes[0] === 'undefined'){
        Ember.Logger.error('B0RKED: ' + transition.intent.url);
        this.transitionTo('/borked');
      } else if (codes.indexOf(404) !== -1) {
        Ember.Logger.error('404: ' + transition.intent.url);
        this.transitionTo('/not-found');
      }
    }
  },
  onResourceError(resp) {
    this.controllerFor('application').setProperties({
      'errors': resp.errors,
      'errorMessage': resp.message
    });
  },
  afterModel() {
    if (!this.get('session').get('isAuthenticated')) {
      this.transitionTo('login');
    }
  },
  beforeModel() {
    //return this._loadCurrentUser();
  },
  sessionAuthenticated() {
    this._super(...arguments);
    //this._loadCurrentUser().then().catch(() => this.get('session').invalidate());
  },
  _loadCurrentUser() {
    return this.get('currentUser').load();
  }
});
