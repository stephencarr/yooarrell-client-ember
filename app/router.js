import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('links', function() {
    this.route('show', { path: '/:links_id' });
    this.route('create');
  });
  this.route('not-found');
  this.route('borked');
});

export default Router;
