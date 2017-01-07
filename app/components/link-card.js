import Ember from 'ember';

const LinkCardComponent = Ember.Component.extend({
  classNames: ['link-card-wrap u-letter-box--medium'],
  classNameBindings: ['isHover:hovered'],
  isHover: false,
  click: function(event) {
    //
  },
  mouseEnter: function() {
    this.set('isHover', true);
  },
  mouseLeave: function() {
    this.set('isHover', false);
  },
  actions: {
    linkOut: function(link){
      window.open(link.get('url'));
      //console.log('click');
      event.preventDefault();
    },
    destroy: function(model) {
      model.destroyRecord();
      return false;
    }
  }
});

export default LinkCardComponent;
