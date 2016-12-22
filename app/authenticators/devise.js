import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';
import config from '../config/environment';

const { RSVP, isEmpty, run } = Ember;

export default DeviseAuthenticator.extend({
  session: Ember.inject.service('session'),
  serverTokenEndpoint: `${config.apiHost}/${config.apiNamespace}/auth/sign_in`,

  restore(data){
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) &&
          !isEmpty(data.tokenType) && !isEmpty(data.uid) && !isEmpty(data.client)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(identification, password) {
    return new RSVP.Promise((resolve, reject) => {
      const { identificationAttributeName } = this.getProperties('identificationAttributeName');
      const data = { password };
      data[identificationAttributeName] = identification;
      this.makeRequest(data).then(function(response) {
        if(response.status != 401) {
          var result = {
            accessToken: response.headers.map['access-token'],
            expiry: response.headers.map['expiry'],
            tokenType: response.headers.map['token-type'],
            uid: response.headers.map['uid'],
            client: response.headers.map['client']
          };
          run(null, resolve, result);
        } else {
          run(null, reject, result);
        }
      }, function(xhr) {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  }
});
