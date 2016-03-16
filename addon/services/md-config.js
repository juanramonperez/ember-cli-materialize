import Ember from 'ember';

const { getWithDefault, computed: { alias }, Service } = Ember;

export default Service.extend({
  options: alias('materializeDefaults')
});
