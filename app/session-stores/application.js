import Cookie from 'ember-simple-auth/session-stores/cookie';
import config from '../config/environment';

export default Cookie.extend({
  cookieDomain: config.cookieDomain
});
