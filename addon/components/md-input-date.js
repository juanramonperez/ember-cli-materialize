import Ember from 'ember';
import Input from './md-input';
import layout from '../templates/components/md-input-date';

export default Ember.Component.extend({
  type: 'date',
  classNames: ['input-field'],
  layout,
  didInsertElement() {
    this._super(...arguments);

  },
  actions: {
    inputClicked() {
      this.$('.picker').addClass('picker--opened')
        .addClass('picker--focused');
    }
  }
});
