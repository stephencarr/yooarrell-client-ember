import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP, run } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  load() {
    // TODO fix this mess. Peeking only works by ID. UID here is email address
    let uid = this.get('session.data.authenticated.uid');
    let user = this.get('store').peekRecord('user', uid);
    if (!isEmpty(user)) {
      this.get('store').pushPayload({ users: [ user ] });
      this.set('user', user);
      return new RSVP.Promise((resolve) => { run(null, resolve); });
    } else if(this.get('session.isAuthenticated')) {
      return this.get('store').find('user', 'me').then((user) => {
        user = user.get('data');
        this.get('store').pushPayload({ users: [ user ] });
        this.set('user', user);
      });
    }
  }
});
