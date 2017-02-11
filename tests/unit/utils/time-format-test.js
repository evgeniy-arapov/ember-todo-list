import TimeFormat from 'todo-list/utils/time-format';
import { module, test } from 'qunit';

module('Unit | Utility | time format');

// Replace this with your real tests.
test('TimeFormat fabric and create object with 2 method', function(assert) {
  assert.ok((typeof TimeFormat === "function" && typeof TimeFormat.create === "function"), "import fabric");
  let result = TimeFormat.create();
  assert.ok(typeof result === 'object', "time format create object");
  assert.ok(typeof result.fromSeconds === 'function', "object have method fromSeconds");
  assert.ok(typeof result.fromMs === 'function', "object have method fromMs");
});


test("TimeFormat.fromMs works", assert => {
  let result = TimeFormat.create();
  let time = (3600 + 60 + 1) * 1000; // 1hr 1min 1sec in ms

  assert.equal(result.fromMs(time), "01:01:01", "3661000ms transformed in '01:01:01'");
});

test("TimeFormat.fromSeconds works", assert => {
  let result = TimeFormat.create();
  let time = 3600 + 60 + 1; // 1hr 1min 1sec in seconds

  assert.equal(result.fromSeconds(time), "01:01:01", "3661s transformed in '01:01:01'");
});

test("TimeFormat.fromSeconds get Error whith unknown format", assert => {
  let result = TimeFormat.create();
  let time = 3600601; // 1hr 1min 1sec in seconds

  try {
    result.fromSeconds(time, "unknown");
  }
  catch (err) {
    assert.equal(err.message, "the second argument can have the values: 'HH:MM:SS', 'HH:MM', 'seconds'", "get Error");
  }
});