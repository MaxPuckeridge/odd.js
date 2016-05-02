goog.provide('odd.examples.oscillator');

goog.require('goog.math.Range');
goog.require('odd.config.AppConfig');
goog.require('odd.controls.ControlData');
goog.require('odd.data.Vector');
goog.require('odd.labels.VariableLabel');
goog.require('odd.problem.ProblemGenerator');

odd.examples.oscillator = {};

/* @type {odd.problem.ProblemGenerator} */
odd.examples.oscillator.problemGenerator_ = (function() {
  var generalizedOscillator = function(params) {
    return function(t, variables) {
      var x = variables.get(0);
      var v = variables.get(1);
      var w = params.get(2)
      var zeta = params.get(3);

      var dx = v;
      var dv = - w * w *x - 2 * zeta * w * v;

      return new odd.data.Vector([dx, dv]);
    };
  };

  var initialStateGenerator = function(params) {
    return new odd.data.Vector([params.get(0), params.get(1)]);
  };

  return new odd.problem.ProblemGenerator(generalizedOscillator,
      initialStateGenerator, 0, 0.1);
}());

/* @type {goog.math.Range} */
odd.examples.oscillator.tRange_ = new goog.math.Range(-100, 100);

/* @type {goog.math.Range} */
odd.examples.oscillator.fixedVRange_ = new goog.math.Range(-13, 13);

/* @type {odd.labels.VariableLabel} */
odd.examples.oscillator.independentVariableLabel_ = new odd.labels.VariableLabel("t", "s");

/* @type {Array<odd.labels.VariableLabel>} */
odd.examples.oscillator.variablesLabels_ = odd.labels.VariableLabel.fromArray(["x", "m"],
    ["v", "m/s"]);

/* @type {Array<odd.labels.VariableLabel>} */
odd.examples.oscillator.parameterLabels_ = odd.labels.VariableLabel.fromArray(["x[0]", "m"],
    ["v[0]", "m/s"], ["w"], ["zeta"]);


/* @type {Array<odd.controls.ControlData>} */
odd.examples.oscillator.controlData_ = (function() {
  var data = [];

  data.push(new odd.controls.ControlData(3, new odd.labels.VariableLabel("x[0]", "m"),
    new goog.math.Range(-20, 20), 1));

  data.push(new odd.controls.ControlData(0, new odd.labels.VariableLabel("v[0]", "m/s"),
    new goog.math.Range(-20, 20), 1));

  data.push(new odd.controls.ControlData(0.15, new odd.labels.VariableLabel("w"),
    new goog.math.Range(0, 0.5), 0.005));

  data.push(new odd.controls.ControlData(-0.1, new odd.labels.VariableLabel("zeta"),
    new goog.math.Range(-0.3, 0.3), 0.05));

  return data;
}());

/* @type {odd.config.AppConfig} */
odd.examples.oscillator = (function() {
  var config = new odd.config.AppConfig();

  /* @type {odd.config.OdeSystemConfig} */
  var odeSystemConfig = config.getOdeSystemConfig();
  odeSystemConfig.setProblemGenerator(odd.examples.oscillator.problemGenerator_);
  odeSystemConfig.setTRange(odd.examples.oscillator.tRange_);

  /* @type {odd.config.GraphConfig} */
  var graphConfig = config.getGraphConfig();
  graphConfig.setFixedVRange(odd.examples.oscillator.fixedVRange_);
  graphConfig.setIndependentVariableLabel(odd.examples.oscillator.independentVariableLabel_);
  graphConfig.setVariableLabels(odd.examples.oscillator.variablesLabels_);

  /* @type {odd.config.ControlsConfig} */
  var controlsConfig = config.getControlsConfig();
  controlsConfig.setData(odd.examples.oscillator.controlData_);

  return config;
}());