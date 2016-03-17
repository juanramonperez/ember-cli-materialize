import Ember from 'ember';
import layout from '../templates/components/md-nav';

const { run: { scheduleOnce }, Component } = Ember;

export default Component.extend({
  classNames: ['md-nav'],
  layout,
  tagName: 'nav',
  _setupSidenav(id) {
    this.set('_sidenavId', id);
    scheduleOnce('afterRender', () => {
      this.$('.button-collapse').sideNav();
    })
  }
});
