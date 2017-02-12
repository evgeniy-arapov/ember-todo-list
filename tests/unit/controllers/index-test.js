import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:index', 'Unit | Controller | index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('has actions', function(assert) {
  let controller = this.subject();
  assert.ok(controller, "controller is set");

  // This actions calls the methods of Store and return a Promise. They not have other logic.
  assert.equal(typeof controller.get('actions.addTask'), 'function', "has addTask action");
  assert.equal(typeof controller.get('actions.removeTask'), 'function', "has removeTask action");

});
