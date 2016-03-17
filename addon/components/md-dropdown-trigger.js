import Ember from 'ember';
import layout from '../templates/components/md-dropdown-trigger';

export default Ember.Component.extend({
  _dropdownRoot: null,
  classNames: ['md-dropdown-trigger'],
  layout,
  tagName: 'li'
});
