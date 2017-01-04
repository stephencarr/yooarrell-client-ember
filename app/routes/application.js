import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),
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
