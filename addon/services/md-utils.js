import Ember from 'ember';

const { Service, Evented } = Ember;

export default Service.extend(Evented, {
  init() {
    this._super(...arguments);
    Ember.$(window).on('scroll', (e) => {
      this.trigger('scroll', e);
    });
  }
});
