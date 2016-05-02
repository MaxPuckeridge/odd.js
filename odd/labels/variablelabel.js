goog.provide('odd.labels.VariableLabel');

goog.require('goog.array');

/**
 * @param {string} name
 * @param {string=} opt_unit
 * @constructor
 */
odd.labels.VariableLabel = function(name, opt_unit) {
  this.name_ = name;
  this.unit_ = opt_unit || "";
};

odd.labels.VariableLabel.prototype.getName = function() {
  return this.name_;
};

odd.labels.VariableLabel.prototype.getUnit = function() {
  return this.unit_;
};

/**
 * @param{Array<Array<string>>} arr
 * @return {Array<ode.labels.VariableLabel>}
 */
odd.labels.VariableLabel.fromArray = function(arr) {
  return goog.array.map(arr, function(value) {
    return new odd.labels.VariableLabel(value[0], value[1]);
  });
};