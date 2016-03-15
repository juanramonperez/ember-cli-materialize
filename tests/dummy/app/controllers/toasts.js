import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    basicToast() {
      this.get('flashMessages').add({
        type: 'success',
        icon: 'person',
        color: 'purple',
        message: 'Wonderful!!!',
        sticky: true
      });
    }
  }
});
