import Ember from 'ember';
import layout from '../templates/components/md-tabs';

const { computed, Component } = Ember;

export default Component.extend({
  classNames: ['md-tabs', 'tabs'],
  tagName: 'ul',
  layout
});
