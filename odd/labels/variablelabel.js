goog.provide('odd.labels.VariableLabel');

/**
 * @param {string} key
 * @param {string=} opt_unit
 * @constructor
 */
odd.labels.VariableLabel = function(key, opt_unit) {
  this.key_ = key;
  this.unit_ = opt_unit;
};

/**
 * @param {number} magnitude
 * @return {string}
 */
odd.labels.VariableLabel.prototype.toLabel = function(magnitude) {
  if (this.unit) {
    if (!magnitude) {
      return this.key + ' (' + this.unit + ')';
    } else {
      return this.key + ' (10^' + magnitude + ' ' + this.unit + ')';
    }
  } else {
    if (!magnitude) {
      return this.key;
    } else {
      return '10^' + magnitude + ' ' + this.key;
    }
  }
};