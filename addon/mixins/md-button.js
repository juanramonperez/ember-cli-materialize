import Ember from 'ember';
import ClickAction from '../mixins/click-action';

const { computed, Mixin } = Ember;

export default Mixin.create(ClickAction, {
  baseButtonClass: 'btn',
  classNameBindings: ['baseButtonClass', '_isWaves:waves-effect', '_waveType'],
  attributeBindings: ['disabled'],
  waves: 'light',
  iconClass: computed('baseButtonClass', function() {
    if (this.get('baseButtonClass').indexOf('floating') >= 0) {
      return '';
    } else {
      return 'left';
    }
  }),
  _isWaves: computed('waves', function() {
    return !!this.get('waves');
  }),
  _waveType: computed('waves', function() {
    return `waves-${this.get('waves')}`;
  })
});
