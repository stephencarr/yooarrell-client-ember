import Ember from 'ember';

export default Ember.Component.extend({
  sortedLinks: Ember.computed.sort('links', 'sortDefinition'),
  sortDefinition: ['created_at:desc'],
});
