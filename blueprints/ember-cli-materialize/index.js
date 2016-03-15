/*jshint node:true*/

var RSVP = require('rsvp');

module.exports = {
  description: 'Installation blueprint for ember-cli-materialize v1.x',

  afterInstall: function(options) {
    return RSVP.all([
      ['ember-materialize-shim', '~0.0.1'],
      ['ember-truth-helpers', '^1.2.0'],
      ['ember-cli-flash', '^1.3.14'],
      ['ember-gestures', '~0.4.1'],
      ['ember-wormhole', '~0.3.5']
    ].map(function(d) {
      return this.addAddonToProject(d[0], d[1]);
    }.bind(this)));
  }
};
