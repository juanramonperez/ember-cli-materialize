import Ember from 'ember';
import layout from '../templates/components/md-sidenav';

export default Ember.Component.extend({
  layout,
  classNames: ['side-nav'],
  tagName: 'ul',
  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', () => {
      if (this.get('_parentNav')) {
        this.set('_parentNav._sidenavId', this.get('elementId'));
      }
    });
  }
});
