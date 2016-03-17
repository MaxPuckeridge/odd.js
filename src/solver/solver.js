goog.provide('odd.solver.base_solver');
goog.provide('odd.solver.runge_kutta');
goog.provide('odd.solver.euler');

goog.require('goog.array');

odd.solver.base_solver = function(nextFn) {
  return function(fn, y0, t0, t1, dt){
    var ts = goog.array.range(t0, t1, dt);
    t0 = ts.shift();
    return ts.reduce(function(p, v) {
      var last = p[p.length-1];
      var nextY = nextFn(last["t"], last["y"], fn, dt);
      p.push({
        "t": v,
        "y": nextY
      });
      return p;
    }, [{"t": t0, "y": y0}]);
  };
};

odd.solver.runge_kutta = odd.solver.base_solver(function(lastT, lastY, fn, dt) {
    var k1 = fn(lastT, lastY);
    var k2 = fn(lastT + dt/2, lastY + dt/2*k1);
    var k3 = fn(lastT + dt/2, lastY + dt/2*k2);
    var k4 = fn(lastT + dt, lastY + dt*k3);
    return lastY + dt/6*(k1 + 2*k2 + 2*k3 + k4);
});

odd.solver.euler = odd.solver.base_solver(function(lastT, lastY, fn, dt) {
    return lastY + fn(lastT, lastY) * dt;
});