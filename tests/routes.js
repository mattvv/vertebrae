// Set up mock api routes
$.mock({
  '/route/:id': {
    timeout: 0,
    data: function(id) {
      if (+id === 4) {
        return '{ "id": 4, "test": "My Four" }';
      }

      return '{ "id": 0, "test": "None" }';
    }
  }
});

module('routes');

asyncTest('matched id', function() {
  $.getJSON('/route/4', function(data) {
    equals(data.id, 4);
    equals(data.test, 'My Four')
    start();
  }).error(function() {
    console.log(this, arguments);
    ok(false, 'Should not error here');
    start();
  });
});

asyncTest('invalid id', function() {
  $.getJSON('/route/5', function(data) {
    equals(data.id, 0);
    equals(data.test, 'None')
    start();
  }).error(function() {
    ok(false, 'Should not error here');
    start();
  });
});