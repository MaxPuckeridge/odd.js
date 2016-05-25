goog.provide('odd.data.Equation');

goog.require('goog.structs.Set');

goog.require('odd.compiler');

/**
 * @param {string} equation
 * @constructor
 */
odd.data.Equation = function(equation) {
  this.setValue(equation);
};

odd.data.Equation.prototype.setValue = function(value) {
  this.value_ = value;

  if (value) {
    try {
      this.data_ = odd.compiler.compile(value);
      this.isInvalid_ = false;
    } catch(e) {
      this.data_ = null;
      this.isInvalid_ = true;
    }
  } else {
      this.data_ = null;
      this.isInvalid_ = false;
  }
};

odd.data.Equation.createEmpty = function() {
  return new odd.data.Equation("");
};

odd.data.Equation.prototype.toString = function() {
  return this.value_;
};

odd.data.Equation.prototype.isInvalid = function() {
  return this.isInvalid_;
};

odd.data.Equation.prototype.getDependencies = function() {
  return this.data_ ? this.data_.dependencies : new goog.structs.Set();
};

odd.data.Equation.prototype.getDependentVariables = function() {
  var variables = new goog.structs.Set();

  if (!this.data_) {
    return variables;
  }

  var name = this.data_.param_name;
  variables.add(name);

  if (this.data_.type === "VariableExpression") {
    return variables;
  }

  for (var i = 1; i < this.data_.degree - 1 ; i++) {
    variables.add(name + (i === 1 ? "'" : "'{" + i + "}"));
  }

  return variables;
};