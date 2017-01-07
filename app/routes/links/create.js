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
      link.save().then(function(){
        link.store.findAll('link');
        this.transitionTo('links');
      }).catch(function() {
        link.rollbackAttributes();
        // TODO transition to `/links`
      });
    }
  },
  // willTransition(transition) {
  //   transition.abort();
  //   this.get('store').reload();
  // },
  cancel() {
    this.transitionTo('links');
  }
});
