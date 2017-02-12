import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import jQuery from 'jquery';

moduleForComponent('todo-list', 'Integration | Component | todo list', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{todo-list}}`);

  assert.equal(this.$('.todo-list').length, 1, "component rendered and has class '.todo-list'");
  assert.equal(this.$('input').length, 1, "component rendered and has input in content");
  assert.equal(this.$('table').length, 1, "component rendered and has table in content");

});

test('should trigger external action on input enter key press', function(assert) {

  const promiseStub = {
    then: () => {
      return {
        catch: () => {}
      };
    }
  };

  this.set('externalFunction', (actual) => {

    let expected = 'New task!';
    assert.equal(actual, expected, 'submitted value is passed to external action');

    return promiseStub;
  });

  this.render(hbs`{{todo-list addTask=(action externalFunction)}}`);

  // fill out the form and force an onchange
  this.$('input').val('New task!');

  let e = jQuery.Event("keyup");
  e.keyCode = 13;

  // enter keyup
  this.$('input').trigger(e);
});
