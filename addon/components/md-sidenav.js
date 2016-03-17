import Ember from 'ember';
import layout from '../templates/components/md-sidenav';

export default Ember.Component.extend({
  layout,
  classNames: ['side-nav'],
  tagName: 'ul',
  init() {
    this._super(...arguments);
    if (this.get('_parentNav')) {
      this.set('_parentNav._sidenavId', this.get('elementId'));
    }
  }
});
