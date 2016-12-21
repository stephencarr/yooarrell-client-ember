import DS from 'ember-data';

export default DS.Model.extend({
  created_at: DS.attr('date'),
  description: DS.attr('string'),
  image_fav: DS.attr('string'),
  image_og: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string')
});
