goog.provide('odd.data.Equation');

goog.require('goog.structs.Set');

goog.require('odd.compiler');

/**
 * @param {string} equation
 * @param {odd.compiler.Expression=} opt_expression
 * @constructor
 */
odd.data.Equation = function(equation, opt_expression) {
  this.equation_ = equation;
  this.expression_ = opt_expression || null;
};

odd.data.Equation.createEmpty = function() {
  return new odd.data.Equation("");
};

odd.data.Equation.fromString = function(equation) {
  try {
    var expression = odd.compiler.compile(equation);
    return new odd.data.Equation(equation, expression);
  } catch (e) {
    return new odd.data.Equation(equation);
  }
};

odd.data.Equation.prototype.toString = function() {
  return this.equation_;
};

odd.data.Equation.prototype.isInvalid = function() {
  return !this.expression_ && this.equation_ !== "";
};

odd.data.Equation.prototype.getDependencies = function() {
  if (!this.expression_) {
    return new goog.structs.Set();
  }
  return this.expression_.getDependencies();
};

odd.data.Equation.prototype.isOde = function() {
  return this.expression_ && this.expression_.isOde();
};

odd.data.Equation.prototype.isParameter = function() {
  return this.expression_ && this.expression_.isParameter();
};

odd.data.Equation.prototype.getInitialConditions = function() {
  if (!this.isOde()) {
    return new goog.structs.Set();
  }
  return this.expression_.getInitialConditions();
};

odd.data.Equation.prototype.getDefinedExpressions = function() {
  if (!this.expression_) {
    return new goog.structs.Set();
  }
  return this.expression_.getDefinedExpressions();
};

odd.data.Equation.prototype.getOdeToTokensMap = function() {
  if (!this.isOde()) {
    return {};
  }
  return this.expression_.getOdeToTokensMap();
};

odd.data.Equation.prototype.getParameterToTokensMap = function() {
  if (!this.isParameter()) {
    return {};
  }
  return this.expression_.getParameterToTokensMap();
};
