goog.provide('odd.config.GraphConfig');

goog.require('odd.graph.Graph');

/**
 * Configuration for a Graph.
 * @constructor
 */
odd.config.GraphConfig = function(){
  /**
   * The config's independent variable label.
   * @type {odd.labels.VariableLabel}
   * @private
   */
  this.independentVariableLabel_ = null;

  /**
   * The config's variable labels.
   * @type {Array<odd.labels.VariableLabel>}
   * @private
   */
  this.variableLabels_ = null;

  /**
   * The config's fixed V range.
   * @type {goog.math.Range}
   * @private
   */
  this.fixedVRange_ = null;
};

/**
 * Sets the config's independent variable label.
 * @param {odd.labels.VariableLabel} independentVariableLabel
 */
odd.config.GraphConfig.prototype.setIndependentVariableLabel = function(independentVariableLabel) {
  this.independentVariableLabel_ = independentVariableLabel;
};

/**
 * Sets the config's variable labels.
 * @param {odd.labels.VariableLabel} variableLabels
 */
odd.config.GraphConfig.prototype.setVariableLabels = function(variableLabels) {
  this.variableLabels_ = variableLabels;
};

/**
 * Sets the config's fixed V range.
 * @param {goog.math.Range} fixedVRange
 */
odd.config.GraphConfig.prototype.setFixedVRange = function(fixedVRange) {
  this.fixedVRange_ = fixedVRange;
};

/**
 * Creates a new graph from this config.
 * @return {odd.graph.Graph}
 */
odd.config.GraphConfig.prototype.toGraph = function() {
  return new odd.graph.Graph(this.independentVariableLabel_, this.variableLabels_, this.fixedVRange_);
};