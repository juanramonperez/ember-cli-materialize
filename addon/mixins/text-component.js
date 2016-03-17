import Ember from 'ember';
import FormField from './form-field';

const { computed, Mixin } = Ember;

export default Mixin.create(FormField, {
  disabled: false,
  inputClassNames: [],
  labelClassNames: [],
  active: false,
  concatenatedProperties: ['inputClassNames', 'labelClassNames'],
  _classesForInput: computed('inputClassNames', function() {
    let classes = this.get('inputClassNames');
    return classes.join(' ');
  }),
  _classesForLabel: computed('labelClassNames', function() {
    return this.get('labelClassNames').join(' ');
  }),
  _inputId: computed('elementId', function() {
    return `${this.get('elementId')}-${this._debugContainerKey.split(':')[1]}`;
  }),
  _validateClass: computed('validate', 'valid', function() {
    if (this.get('validate')) {
      return this.get('valid') ? 'valid' : 'invalid';
    }
    else {
      return '';
    }
  }),
  init() {
    this._super(...arguments);
    this.set('active', this.get('value') || this.get('placeholder'));
  },
  actions: {
    onChange() {
      this.sendAction('on-change');
    },
    onKeyDown() {
      this.sendAction('on-key-down');
    },
    onKeyUp() {
      this.sendAction('on-key-up');
    },
    onBlur() {
      this.sendAction('on-blur');
    },
  }
});
