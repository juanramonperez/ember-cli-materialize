import Ember from 'ember';
import layout from '../templates/components/md-nav';

const { run: { scheduleOnce }, Component } = Ember;

export default Component.extend({
  classNames: ['md-nav'],
  layout,
  tagName: 'nav',
  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', () => {
      this.$('.button-collapse').sideNav();
    })
  }
});
