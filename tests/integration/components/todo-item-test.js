import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('todo-item', 'Integration | Component | todo item', {
  integration: true
});

test('it works', function(assert) {

  this.render(hbs`{{todo-item}}`);

  assert.equal(this.$('.todo-item').length, 1, "component is created");
});