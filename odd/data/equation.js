goog.provide('odd.data.Equation');

goog.require('goog.structs.Set');

goog.require('odd.compiler');

/**
 * @param {string} equation
 * @param {odd.compiler.Expression=} opt_expression
 * @constructor
 */
odd.data.Equation = function(equation, opt_expression) {
  /**
   * The pre-compiled string version of the equation.
   * @type {string}
   * @private
   */
  this.equation_ = equation;

  /**
   * The post-compiled expression version of the equation.
   * May be null when the string form is an invalid equation.
   * @type {odd.compiler.Expression=}
   * @private
   */
  this.expression_ = opt_expression || null;
};

/**
 * Convenience method to create an empty string
 * equation.
 * @return {odd.data.Equation}
 */
odd.data.Equation.createEmpty = function() {
  return new odd.data.Equation("");
};

/**
 * Attempts to compile the string provided to form
 * an equation with a valid odd.compiler.Expression.
 * @return {odd.data.Equation}
 */
odd.data.Equation.fromString = function(equation) {
  try {
    var expression = odd.compiler.compile(equation);
    return new odd.data.Equation(equation, expression);
  } catch (e) {
    return new odd.data.Equation(equation);
  }
};

/**
 * Returns the string form of the equation.
 * @return {string}
 */
odd.data.Equation.prototype.toString = function() {
  return this.equation_;
};

/**
 * Returns true if the equation is invalid.
 * Empty strings are considered valid, even though the
 * compiler throws.
 * @return {boolean}
 */
odd.data.Equation.prototype.isInvalid = function() {
  return !this.expression_ && this.equation_ !== "";
};

/**
 * Returns the set of named dependencies for the equation.
 * @return {goog.structs.Set<string>}
 */
odd.data.Equation.prototype.getDependencies = function() {
  if (!this.expression_) {
    return new goog.structs.Set();
  }
  return this.expression_.getDependencies();
};

/**
 * Returns true if the equation defines an ode.
 * @return {boolean}
 */
odd.data.Equation.prototype.isOde = function() {
  return this.expression_ && this.expression_.isOde();
};

/**
 * Returns true if the equation defines a parameter.
 * @return {boolean}
 */
odd.data.Equation.prototype.isParameter = function() {
  return this.expression_ && this.expression_.isParameter();
};

/**
 * Returns the set of named initial conditions for the equation.
 * @return {goog.structs.Set<string>}
 */
odd.data.Equation.prototype.getInitialConditions = function() {
  if (!this.isOde()) {
    return new goog.structs.Set();
  }
  return this.expression_.getInitialConditions();
};

/**
 * Returns the set of named defined expressions for the equation.
 * @return {goog.structs.Set<string>}
 */
odd.data.Equation.prototype.getDefinedExpressions = function() {
  if (!this.expression_) {
    return new goog.structs.Set();
  }
  return this.expression_.getDefinedExpressions();
};

/**
 * Returns an object of expression names to tokens,
 * that map all the name of defined expressions to
 * tokens that produce their derivatives.
 * Only non-empty for odes.
 * @return {Object<string, Array<odd.compiler.Token>>}
 */
odd.data.Equation.prototype.getOdeToTokensMap = function() {
  if (!this.isOde()) {
    return {};
  }
  return this.expression_.getOdeToTokensMap();
};

/**
 * Returns an object of expression names to tokens,
 * that map all the name of defined expressions to
 * tokens that produce their value.
 * Only non-empty for parameters.
 * @return {Object<string, Array<odd.compiler.Token>>}
 */
odd.data.Equation.prototype.getParameterToTokensMap = function() {
  if (!this.isParameter()) {
    return {};
  }
  return this.expression_.getParameterToTokensMap();
};
