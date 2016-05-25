goog.provide('odd.data.Variable');
goog.provide('odd.data.Variable.Types');

/**
 * @param {string} name
 * @constructor
 */
odd.data.Variable = function(name, opt_unit, opt_type, opt_min, opt_max, opt_step) {
  this.name_ = name;
  this.unit_ = opt_unit || null;
  this.type = opt_type || odd.data.Variable.Types.FIXED;
  this.min = opt_min || null;
  this.max = opt_max || null;
  this.step = opt_step || null;
};

odd.data.Variable.Types = {
  FIXED: 'fixed',
  SLIDER: 'slider'
};

odd.data.Variable.prototype.toJson = function() {
  return {
    'name': this.name_,
    'unit': this.unit_,
    'type': this.type_,
    'min': this.min_,
    'max': this.max_,
    'step': this.step_,
  };
};

odd.data.Variable.fromJson = function(jsonData) {
  return new odd.data.Variable(jsonData["name"], jsonData["unit"], jsonData["type"],
    jsonData["min"], jsonData["max"], jsonData["step"]);
};