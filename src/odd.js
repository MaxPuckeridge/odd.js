goog.provide('odd');

goog.require('odd.solver.runge_kutta');
goog.require('odd.data.Ode');

goog.require('odd.ui.Graph');

exp_decay = function(x, y) {
  return -y;
}

ode = new odd.data.Ode(odd.solver.runge_kutta, exp_decay);
graph = new odd.ui.Graph(ode, 1000, 1000);

ode.solve(100, 0, 100, 0.1);
