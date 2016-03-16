import Ember from 'ember';

const { computed, Service, Evented } = Ember;

export default Service.extend(Evented, {
  init() {
    this._super(...arguments);
    Ember.$(window).on('scroll', (e) => {
      this.notifyPropertyChange('scrollTop');
      this.notifyPropertyChange('windowHeight');
      this.notifyPropertyChange('docHeight');
      this.trigger('scroll', e);
    });
  },
  scrollTop: computed(function() {
    return Ember.$(window).scrollTop();
  }),
  windowHeight: computed(function() {
    return Ember.$(window).outerHeight();
  }),
  docHeight: computed(function() {
    return Ember.$(document).outerHeight();
  }),
  scrollRemaining: computed('docHeight', 'windowHeight', 'scrollTop', function() {
    return this.get('docHeight') - this.get('scrollTop') - this.get('windowHeight');
  })
});
