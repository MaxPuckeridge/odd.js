goog.provide('odd.solver.base_solver');
goog.provide('odd.solver.runge_kutta');
goog.provide('odd.solver.euler');

goog.require('goog.array');

odd.solver.base_solver = function(nextFn) {
  return function(fn, y0, x0, x1, dx){
    var xs = goog.array.range(x0, x1, dx);
    x0 = xs.shift();
    return xs.reduce(function(p, v) {
      var last = p[p.length-1];
      var nextY = nextFn(last.x, last.y, fn, dx);
      var next = {x: v, y: nextY};
      p.push(next);
      return p;
    }, [{x: x0, y: y0}]);
  };
}

odd.solver.runge_kutta = odd.solver.base_solver(function(lastX, lastY, fn, dx) {
    var k1 = fn(lastX, lastY);
    var k2 = fn(lastX + dx/2, lastY + dx/2*k1);
    var k3 = fn(lastX + dx/2, lastY + dx/2*k2);
    var k4 = fn(lastX + dx, lastY + dx*k3);
    var nextY = lastY + dx/6*(k1 + 2*k2 + 2*k3 + k4);
    return nextY;
});

odd.solver.euler = odd.solver.base_solver(function(lastX, lastY, fn, dx) {
    return lastY + fn(lastX, lastY) * dx;
});