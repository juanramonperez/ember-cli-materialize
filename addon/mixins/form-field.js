import Ember from 'ember';

const { computed, computed: { oneWay }, Mixin } = Ember;

export default Mixin.create({
  errorMessages: null,
  validate: computed('errorMessages', function() {
    return this.get('errorMessages') !== null;
  }),
  valid: computed.empty('errorMessages'),
  error: computed('errorMessages.[]', function() {
    return this.get('errorMessages.firstObject');
  })
});
