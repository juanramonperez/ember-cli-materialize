import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-tab-link', 'Integration | Component | md tab link', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{md-tab-link "Index" "index"}}`);

  assert.equal(this.$().text().trim(), 'Index');

  // Template block usage:
  this.render(hbs`
    {{#md-tab-link "index"}}
      template block text
    {{/md-tab-link}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
