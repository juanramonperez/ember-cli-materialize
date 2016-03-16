import Ember from 'ember';
import layout from '../templates/components/md-pushpin';

const { run: {scheduleOnce}, inject, computed, computed: { readOnly }, Component } = Ember;

export default Component.extend({
  classNameBindings: ['pinClass'],
  attributeBindings: ['style'],
  top: 0,
  offset: 0,
  bottom: Math.Infinity,
  _lastPinClass: null,
  pinClass: computed('docHeight', 'originalOffset', 'scrollTop', function() {
    const st = this.get('scrollTop');
    const t = this.get('top') ;
    const b = this.get('bottom');
    const lpc = this.get('_lastPinClass');
    if (st < t) {
      this.set('_cssTop', null);
      if (lpc !== null && lpc !== 'pin-top') {
        this.sendAction('on-unpin');
      }
      this.set('_lastPinClass', 'pin-top');
      return 'pin-top';
    } else {
      if (st > b) {
        this.set('_cssTop', b - this.get('originalOffset'));
        this.set('_lastPinClass', 'pin-bottom');
        if (lpc !== null && lpc !== 'pin-bottom') {
          this.sendAction('on-unpin');
        }
        return 'pin-bottom';
      } else {
        this.set('_cssTop', this.get('offset'));
        this.set('_lastPinClass', 'pinned');
        if (lpc !== null && lpc !== 'pinned') {
          this.sendAction('on-pin');
        }
        return 'pinned';
      }
    }
  }),
  _cssTop: null,
  _cssBottom: null,
  scrollTop: readOnly('md-utils.scrollTop'),
  scrollRemaining: readOnly('md-utils.scrollRemaining'),
  docHeight: readOnly('md-utils.docHeight'),
  style: computed('originalOffset', '_cssBottom', '_cssTop', function() {
    const t = this.get('_cssTop');
    const b = this.get('_cssBottom');
    let props = [];
    if (t !== null) {
      props.push(['top', `${t}px`]);
    }
    if (b !== null) {
      props.push(['top', `${b}px`]);
    }
    return new Ember.Handlebars.SafeString(props.map((p) => `${p[0]}: ${p[1]}`).join('; '));
  }),

  'md-utils': inject.service(),
  layout,
  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', () => {
      this.set('originalOffset', this.$().offset().top);
    });
  },

});
