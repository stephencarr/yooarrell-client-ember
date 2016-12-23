import Ember from 'ember';

const LinkCardComponent = Ember.Component.extend({
  classNames: ['u-letter-box--medium'],
  isHover: false,
  click: function() {
    window.open(this.get('url'));
    return true;
  },
  mouseEnter: function() {
    this.set('isHover', true);
  },
  mouseLeave: function() {
    this.set('isHover', false);
  }
});

LinkCardComponent.reopenClass({
  positionalParams: ['title', 'url', 'description', 'image_og', 'image_fav']
});

export default LinkCardComponent;
