import Ember from 'ember';
import layout from '../templates/components/md-toast';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

const { Component, run: { next, cancel, later }, computed, computed: { readOnly }, getWithDefault } = Ember;

export default Component.extend(RecognizerMixin, {
  recognizers: 'pan',
  classNames: ['md-toast', 'toast'],
  classNameBindings: ['active', '_color', 'exiting', 'panning', '_clicked:exiting'],
  active: false,
  showProgressBar: readOnly('content.showProgress'),
  exiting: readOnly('content.exiting'),
  attributeBindings: ['style'],
  _clicked: false,
  panning: false,
  layout,
  _inlineStyle: null,
  init() {
    this._super(...arguments);
    this.set('_inlineStyle', {});
  },
  style: computed('_inlineStyle', '_inlineStyle.left', '_inlineStyle.opacity', function() {
    let props = [];
    if (this.get('_inlineStyle.left')) {
      props.push(`left: ${this.get('_inlineStyle.left')}px`);
    }
    if (this.get('_inlineStyle.opacity')) {
      props.push(`opacity: ${this.get('_inlineStyle.opacity')}`);
    }
    return new Ember.Handlebars.SafeString(props.join('; '));
  }),
  _alertIcon: computed('content.icon', 'content.type', function() {
    const icon = this.get('content.icon');
    if (icon) {
      return icon;
    }
    switch (this.get('content.type')) {
      case 'success': return 'check';
      case 'warning': return 'warning';
      case 'danger':  return 'error';
      case 'info':    return 'info';
      default:        return null;
    }
  }),
  _color: computed('content.color', 'content.type', function() {
    const color = this.get('content.color');
    if (color) {
      return color;
    }
    switch (this.get('content.type')) {
      case 'success':
        return 'green';
      case 'warning':
        return 'yellow black-text';
      case 'danger':
        return 'red';
      default:
        return '';
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    const applyActiveClass = next(() => {
      this.set('active', true);
    });
    this.set('_applyActiveClass', applyActiveClass);
  },

  click() {
    this.set('_clicked', true);
    later(() => {
      this._destroyFlashMessage();
    }, 375);
  },

  pan(e) {
    const dx = Ember.get(e, 'gesture.deltaX') || Ember.get(e, 'originalEvent.gesture.deltaX');
    const activationDistance = 80;
    this.set('panning', true);
    var opacityPercent = 1-Math.abs(dx / activationDistance);
    if (opacityPercent < 0) {
      opacityPercent = 0;
    }
    this.set('_inlineStyle.left', dx);
    this.set('_inlineStyle.opacity', opacityPercent);
  },

  panEnd(e) {
    const dx = Ember.get(e, 'gesture.deltaX') || Ember.get(e, 'originalEvent.gesture.deltaX');
    const activationDistance = 80;
    if (Math.abs(dx) > activationDistance) {
      this.click();
    } else {
      this.set('panning', false);
      this.set('_inlineStyle', {});
    }
  },

  willDestroy() {
    this._super();
    this._destroyFlashMessage();
    const _applyActiveClass = this.get('_applyActiveClass');
    if (_applyActiveClass) {
      cancel(_applyActiveClass);
    }
  },

  // private
  _destroyFlashMessage() {
    const flash = getWithDefault(this, 'content', false);
    if (flash) {
      flash.destroyMessage();
    }
  }
});
