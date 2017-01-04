import DS from 'ember-data';

export default DS.Model.extend({
  locale: DS.attr('string'),
  email: DS.attr('string'),
  username: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  password: DS.attr('string'),
  password_confirmation: DS.attr('string'),
  birthday: DS.attr('date'),
  device_attributes: {
    os: DS.attr('string'),
    uid: DS.attr('string')
  }
});
