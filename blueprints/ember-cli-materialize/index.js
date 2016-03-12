/*jshint node:true*/
module.exports = {
  description: 'Installation blueprint for ember-cli-materialize v1.x',

  afterInstall: function(options) {
    return this.addAddonToProject('ember-materialize-shim', '~0.0.1');
  }
};
