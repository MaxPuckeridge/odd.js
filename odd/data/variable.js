goog.provide('odd.data.Variable');
goog.provide('odd.data.Variable.Type');

/**
 * @param {string} name
 * @constructor
 */
odd.data.Variable = function(name, opt_value, opt_unit, opt_type, opt_min, opt_max, opt_step) {
  this.name = name;
  this.value = opt_value;
  this.unit = opt_unit;
  this.type = opt_type || odd.data.Variable.Type.FIXED;
  this.min = opt_min;
  this.max = opt_max;
  this.step = opt_step;
};

odd.data.Variable.Type = {
  FIXED: 'fixed',
  SLIDER: 'slider'
};

odd.data.Variable.prototype.isSlider = function() {
  return this.type === odd.data.Variable.Type.SLIDER;
};

odd.data.Variable.prototype.enableAsSlider = function(enable) {
  this.type = enable ? odd.data.Variable.Type.SLIDER: odd.data.Variable.Type.FIXED;
};

odd.data.Variable.prototype.toJson = function() {
  return {
    'name': this.name,
    'value': this.value,
    'unit': this.unit,
    'type': this.type,
    'min': this.min,
    'max': this.max,
    'step': this.step,
  };
};

odd.data.Variable.fromJson = function(jsonData) {
  return new odd.data.Variable(jsonData["name"], jsonData["value"], jsonData["unit"],
      jsonData["type"], jsonData["min"], jsonData["max"], jsonData["step"]);
};