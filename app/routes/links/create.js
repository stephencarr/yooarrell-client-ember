import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.url) {
      let store = this.get('store');
      let link = store.createRecord('link', {
        url: params.url,
        title: 'Fetching...',
        description: 'Hang on a minute, we\'re figuring this out'
      });
      link.save().then(() => {
        link.store.findAll('link');
        this.get('router').transitionTo('links');
      }).catch(function() {
        link.rollbackAttributes();
        this.get('router').transitionTo('links');
      });
    }
  },
  cancel() {
    this.get('router').transitionTo('links');
  }
});
