goog.provide('odd.labels.Labels');

goog.require('goog.array');
goog.require('odd.labels.VariableLabel');

/**
 * @param {odd.labels.VariableLabel} independentVariableLabel
 * @param {Array<odd.labels.VariableLabel>} variableLabels
 * @param {Array<odd.labels.VariableLabel>} parameterLabels
 * @constructor
 */
odd.labels.Labels = function(independentVariableLabel, variableLabels, parameterLabels) {
  this.independentVariableLabel = independentVariableLabel;
  this.variableLabels = variableLabels;
  this.parameterLabels = parameterLabels;
};

/**
 * @param{Array<Array<string>>} arr
 * @return {Array<ode.ode.labels.VariableLabel>}
 */
odd.labels.Labels.fromArray = function(arr) {
  return goog.array.map(arr, function(value) {
    return new odd.labels.VariableLabel(value[0], value[1]);
  });
};