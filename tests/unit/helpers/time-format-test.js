import { timeFormat } from 'todo-list/helpers/time-format';
import { module, test } from 'qunit';

module('Unit | Helper | time format');

// helper uses a utility, and utility is tested
test('it works', function(assert) {
  assert.expect(2);

  let result = timeFormat([4234567890], {});
  assert.ok(result, 'it works');
  try {
    result = timeFormat([4234567890], {timeIn: "unknown"});
  }
  catch (err) {
    assert.equal(err.message, "unknown timeIn format, use 's' or 'ms'", "it throw Error");
  }

});

