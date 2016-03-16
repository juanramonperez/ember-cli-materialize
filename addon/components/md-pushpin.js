import Ember from 'ember';
import layout from '../templates/components/md-pushpin';

const { inject, computed, Component } = Ember;

export default Component.extend({
  classNameBindings: ['pinned', 'pin-top', 'pin-bottom'],
  attributeBindings: ['style'],
  top: 0,
  bottom: Math.Infinity,
  offset: 0,
  pinned: false,
  'pin-top': false,
  'pin-bottom': false,
  _cssTop: null,
  style: computed('_cssTop', function() {
    const t = this.get('_cssTop');
    if (t !== null) {
      return `top: ${t}px`;
    }
  }),

  'md-utils': inject.service(),
  layout,
  didInsertElement() {
    this._super(...arguments);
    this.get('md-utils').on('scroll', (e) => {
      var scrolled = Ember.$(window).scrollTop() + this.get('offset');
      this.onScroll(scrolled);
    })
    this.set('originalOffset', this.$().offset().top);
    this.onScroll(Ember.$(window).scrollTop());
  },

  onScroll(scrolled) {
    if (this.get('top') <= scrolled && this.get('bottom') >= scrolled && !this.get('pinned')) {
      this.setProperties({
        pinned: true,
        'pin-top': false,
        'pin-bottom': false
      });
      this.set('_cssTop', this.get('offset'));
    }

    // Add pin-top (when scrolled position is above top)
    if (scrolled < this.get('top') && !this.get('pin-top')) {
      debugger;
      this.setProperties({
        pinned: false,
        'pin-top': true,
        'pin-bottom': false
      });
      this.set('_cssTop', 0);
    }

    // Add pin-bottom (when scrolled position is below bottom)
    if (scrolled > this.get('bottom') && !this.get('pin-bottom')) {
      debugger;
      this.setProperties({
        pinned: false,
        'pin-top': false,
        'pin-bottom': true
      });
      this.set('_cssTop', this.get('bottom') - this.get('originalOffset'));
    }
  }
});
