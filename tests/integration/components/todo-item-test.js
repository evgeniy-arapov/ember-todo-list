import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('todo-item', 'Integration | Component | todo item', {
  integration: true
});

test('Component created', function (assert) {

  const promiseStub = {
    then: () => {
      return {
        catch: () => {
        }
      };
    },
    catch: () => {
    }
  };

  let isCalled = false;

  this.set('removeTaskStub', () => {
    isCalled = true;
    return promiseStub;
  });

  let extendedTask = Ember.Object.create({
    title: "Test title",
    status: "none",
    timeInProgress: 0,
    startInProgress: null
  });

  this.set('task', extendedTask);

  this.render(hbs`{{todo-item task=task removeTask=(action removeTaskStub)}}`);

  assert.equal(this.$('.todo-item').length, 1, "component is created");
  assert.equal(this.$('td').length, 4, "component contain 4 td");
  assert.equal(this.$('td:nth-child(1) select').length, 1, "component contain select");
  assert.equal(this.$('td:nth-child(2)').text().trim(), '00:00:00', "component contain time");
  assert.equal(this.$('td:nth-child(3)').text().trim(), 'Test title', "component contain title");
  assert.equal(this.$('td:nth-child(4) button').length, 1, "component contain button");


  this.$('td:nth-child(4) button').click();
  assert.ok(isCalled, "external removeTask called");

  this.set('task.title', "New task title");
  assert.equal(this.$('td:nth-child(3)').text().trim(), 'New task title', "change title");

});