goog.provide('odd');

goog.require('goog.math.Range');

goog.require('odd.data.Vector');
goog.require('odd.labels.VariableLabel');
goog.require('odd.labels.Labels');
goog.require('odd.problem.ProblemGenerator');
goog.require('odd.problem.Problem');
goog.require('odd.solution.Solution');
goog.require('odd.graph.Graph');
goog.require('odd.system.OdeSystem');

generalizedOscillator = function(params) {
  return function(t, variables) {
    var x = variables.get(0);
    var v = variables.get(1);

    var w = params.get(2)
    var zeta = params.get(3);

    var dx = v;
    var dv = - w * w *x - 2 * zeta * w * v;

    return new odd.data.Vector([dx, dv]);
  };
}

initialState = function(params) {
  return new odd.data.Vector([params.get(0), params.get(1)]);
}

independentVariableLabel = new odd.labels.VariableLabel("t", "s");
variablesLabels = odd.labels.Labels.fromArray(["x", "m"], ["v", "m/s"]);
parameterLabels = odd.labels.Labels.fromArray(["x[0]", "m"], ["v[0]", "m/s"], ["w"], ["zeta"]);

labels = new odd.labels.Labels(independentVariableLabel, variablesLabels, parameterLabels);

t0 = 0;
dt = 0.1;
tRange = new goog.math.Range(-100, 100);

x0 = document.getElementById('x0');
v0 = document.getElementById('v0');
w = document.getElementById('w');
zeta = document.getElementById('zeta');

x0Value = document.getElementById('x0Value');
v0Value = document.getElementById('v0Value');
wValue = document.getElementById('wValue');
zetaValue = document.getElementById('zetaValue');

getParams = function() {
  return new odd.data.Vector([
    parseFloat(x0.value),
    parseFloat(v0.value),
    parseFloat(w.value),
    parseFloat(zeta.value)
  ]);
};

initialParamState = getParams();

problemGenerator = new odd.problem.ProblemGenerator(generalizedOscillator, initialState,  t0, dt);
odeSystem = new odd.system.OdeSystem(problemGenerator, tRange, initialParamState, labels);

graph = new odd.graph.Graph(1000, 600, odeSystem);
graph.render(document.getElementById('graph'));
graph.setFixedVRange(new goog.math.Range(-13, 13));
odeSystem.solveCurrent();

updateText = function() {
  x0Value.innerText = x0.value;
  v0Value.innerText = v0.value;
  wValue.innerText = w.value;
  zetaValue.innerText = zeta.value;
};

updateText();

onParamValueChange = function() {
  updateText();

  var params = getParams();
  var system = odeSystem.setParamState(params);
  odeSystem.solveCurrent();
};

x0.onchange = onParamValueChange;
v0.onchange = onParamValueChange;
w.onchange = onParamValueChange;
zeta.onchange = onParamValueChange;