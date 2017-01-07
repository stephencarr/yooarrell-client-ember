import Ember from 'ember';
import config from '../config/environment';
import fetch from 'ember-network/fetch';
const { assign: emberAssign, merge, RSVP, run } = Ember;
const assign = emberAssign || merge;
const JSON_CONTENT_TYPE = 'application/json';
const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  signupSuccess: false,
  serverEndpoint: `${config.apiHost}/${config.apiNamespace}/auth`,
  makeRequest(data) {
    let body = {};
    const url = this.get('serverEndpoint');
    let requestOptions = {};
    data.confirm_success_url = config.clientUrl;
    body = data;
    body = JSON.stringify(body);
    assign(requestOptions, {
    body,
    method: 'POST',
    headers:  {
        'accept': JSON_CONTENT_TYPE,
        'content-type': JSON_CONTENT_TYPE
      }
    });
    return fetch(url, requestOptions);
  },
  actions: {
    signup() {
      return new RSVP.Promise((resolve, reject) => {
        const User = this.get('model');
        const useResponse = this.get('rejectWithResponse');
        let data = User.serialize();
        this.makeRequest(data).then((response) => {
          if (response.ok) {
            this.set('signupSuccess', true);
          } else {
            if (useResponse) {
              run(null, reject, response);
            } else {
              response.json().then((json) => {
                this.set('errorMessage', json ? ((json.errors.full_messages ? json.errors.full_messages : json.errors) || json) : 'Please check the sign up form is filled correctly');
              });
            }
          }
        }).catch((error) => run(null, reject, error));
      });
    }
  }
});
