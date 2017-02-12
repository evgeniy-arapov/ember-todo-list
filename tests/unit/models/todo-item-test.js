import { moduleForModel, test } from 'ember-qunit';

moduleForModel('todo-item', 'Unit | Model | todo item', {
  // Specify the other units that are required for this test.
  needs: []
});

test('Model created with default values', function(assert) {

  const defaultValues = {
    status: "none",
    timeInProgress: 0,
    startInProgress: null
  };

  let model = this.subject({ title: "foo"});
  // let store = this.store();
  assert.ok(!!model, "model is set");

  assert.equal(model.get('title'), 'foo', "Title value ok");

  // test defaultValues
  assert.equal(model.get('status'), defaultValues.status, "default status value - ok");
  assert.equal(model.get('timeInProgress'), defaultValues.timeInProgress, "default timeInProgress value - ok");
  assert.equal(model.get('startInProgress'), defaultValues.startInProgress, "default startInProgress value - ok");
});
