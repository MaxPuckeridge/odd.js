goog.provide('odd.compiler.Expression');
goog.provide('odd.compiler.Expression.Type');

goog.require('goog.array');
goog.require('goog.structs.Set');

goog.require('odd.compiler.Token');

/**
 * Describes a mathematical equation.
 * @param {odd.compiler.Expression.Type} type
 * @param {string} name
 * @param {Array<odd.compiler.Token} tokens
 * @param {object=} opt_data
 * @constructor
 */
odd.compiler.Expression = function(type, name, tokens, opt_data) {
  // @type {odd.compiler.Expression.Type}
  this.type = type;

  // @type {string}
  this.name = name;

  /**
   * A list of tokens, that represent
   * the operators and operands of the expression
   * in Reverse Polish Notation
   * https://en.wikipedia.org/wiki/Reverse_Polish_notation
   * @type {Array<odd.compiler.Token>}
   */
  this.tokens = tokens;

  // @type {object}
  this.data = opt_data || {};
};

// @enum {string}
odd.compiler.Expression.Type = {
  ODE: 'ode',
  PARAMETER: 'parameter'
};

// @return {boolean}
odd.compiler.Expression.prototype.isOde = function() {
  return this.type === odd.compiler.Expression.Type.ODE;
};

// @return {boolean}
odd.compiler.Expression.prototype.isParameter = function() {
  return this.type === odd.compiler.Expression.Type.PARAMETER;
};

/**
 * Returns the set of the expression name that make the
 * dependencies for this expression.
 * @return {goog.structs.Set<string>}
 */
odd.compiler.Expression.prototype.getDependencies = function() {
  return goog.array.reduce(this.tokens, function(cumulative, token) {
    if (token.isExpression()) {
      cumulative.add(token.value);
    }
    return cumulative;
  }, new goog.structs.Set());
};

/**
 * Only meant for ode expressions.
 * This method will generate the string representation
 * of the described variable to the derivative of the
 * degree provided.
 *     e.g., for x:
 *         0 -> x
 *         1 -> x'
 *         2 -> x'{2}
 *         3 -> x'{3}
 * @param {number} degree
 * @private
 * @return {string}
 */
odd.compiler.Expression.prototype.getNameOfDegree_ = function(degree) {
  return degree > 2 ? this.name + "'{" + degree + "}" :
      degree === 0 ? this.name : this.name + "'";
};

/**
 * Only meant for ode expressions.
 * Returns the degree of the ode described.
 * @private
 * @return {string}
 */
odd.compiler.Expression.prototype.getOdeDegree_ = function() {
  return this.data["degree"];
};

/**
 * Returns the set of defined expression names for the ode.
 * For example, a degree 2 ode of x, e.g., x'{2} = ...,
 * defines x and x'.
 * @return {goog.structs.Set<string>}
 */
odd.compiler.Expression.prototype.getDefinedOdeExpressions_ = function() {
  var names = [];
  for (var i = 0; i < this.getOdeDegree_(); i++) {
    names.push(this.getNameOfDegree_(i));
  }
  return names;
};

/**
 * Returns the set of defined expression names for this expression.
 * @return {goog.structs.Set<string>}
 */
odd.compiler.Expression.prototype.getDefinedExpressions = function() {
  if (!this.isOde()) {
    return new goog.structs.Set([this.name]);
  }
  return new goog.structs.Set(this.getDefinedOdeExpressions_());
};

/**
 * Returns the set of defined initial condition names for an ode.
 * TODO: Assumed to always be 0, it should be user defined instead
 * @return {goog.structs.Set<string>}
 */
odd.compiler.Expression.prototype.getInitialConditions = function() {
  var initialConditions = goog.array.map(this.getDefinedOdeExpressions_(), function(name) {
    return name + "(0)";
  });

  return new goog.structs.Set(initialConditions);
};

/**
 * Returns a map that contains a single entry,
 * the name of the parameter to its tokens.
 * @return {Object<string, Array<odd.compiler.Token>>}
 */
odd.compiler.Expression.prototype.getParameterToTokensMap = function() {
  var map = {};
  map[this.name] = this.tokens;
  return map;
};

/**
 * Returns a map that contains an entry for each,
 * expression name defined by the ode. The key is the
 * the name of the parameter, and the value its tokens.
 * @return {Object<string, Array<odd.compiler.Token>>}
 */
odd.compiler.Expression.prototype.getOdeToTokensMap = function() {
  var highestDegreeDescribed = this.getOdeDegree_() - 1;

  var map = {};
  map[this.getNameOfDegree_(highestDegreeDescribed)] = this.tokens;
  for (var i = 0; i < highestDegreeDescribed; i++) {
    map[this.getNameOfDegree_(i)] = [
      odd.compiler.Token.createExpression(this.getNameOfDegree_(i + 1))
    ];
  };
  return  map;
};
