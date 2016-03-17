import Ember from 'ember';

const { computed, Mixin } = Ember;

export default Mixin.create({
  value: '',
  label: '',
  disabled: false,
  placeholder: null,
  icon: null,
  inputClassNames: [],
  labelClassNames: [],
  concatenatedProperties: ['inputClassNames', 'labelClassNames'],
  _classesForInput: computed('inputClassNames', 'validate', function() {
    let classes = this.get('inputClassNames');
    if (this.get('validate')) {
      classes.push('validate');
    }
    return classes.join(' ');
  }),
  _classesForLabel: computed('labelClassNames', function() {
    return this.get('labelClassNames').join(' ');
  }),
  _inputId: computed('elementId', function() {
    return `${this.get('elementId')}-${this._debugContainerKey.split(':')[1]}`;
  })
});
