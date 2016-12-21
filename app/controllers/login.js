import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      const { identification, password } = this.getProperties('identification', 'password');
      const authenticator = 'authenticator:devise';
      this.get('session').authenticate(authenticator, identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
