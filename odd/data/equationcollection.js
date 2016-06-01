goog.provide('odd.data.EquationCollection');

goog.require('goog.array');
goog.require('goog.structs.Set');

goog.require('odd.data.Equation');
goog.require('odd.data.Variable');
goog.require('odd.data.VariableCollection');

/**
 * A collection of odd equations.
 * @param {Array<odd.data.Equation>=} opt_equations
 * @constructor
 */
odd.data.EquationCollection = function(opt_equations) {
  /**
   * @type{Array<odd.data.Equation>}
   * @private
   */
  this.equations_ = opt_equations || [];
};

/**
 * Adds an equation to the collection.
 * @param {odd.data.Equation} equation
 */
odd.data.EquationCollection.prototype.add = function(equation) {
  this.equations_.push(equation);
};

/**
 * Get by index.
 * @param {number}
 * @return {odd.data.Equation}
 */
odd.data.EquationCollection.prototype.getByIndex = function(index) {
  return this.equations_[index];
};

/**
 * Returns the number of equations in collection.
 * @return {number}
 */
odd.data.EquationCollection.prototype.size = function() {
  return this.equations_.length;
};

/**
 * Returns true if the collection is empty.
 * @return {boolean}
 */
odd.data.EquationCollection.prototype.isEmpty = function() {
  return this.size() === 0;
};

/**
 * Returns the collection as an array.
 * @return {Array<odd.data.Equation>}
 */
odd.data.EquationCollection.prototype.getEquations = function() {
  return this.equations_;
};

/**
 * Convenience method to transform an array of strings
 * into a EquationCollection.
 * @param {Array<string>} array
 * @return {odd.data.EquationCollection}
 */
odd.data.EquationCollection.fromStringArray = function(array) {
  var equations = goog.array.map(array, odd.data.Equation.fromString);
  return new odd.data.EquationCollection(equations);
};

/**
 * Transforms the EquationCollection into a string array,
 * such that it may be stored in URI query data.
 * @return {Array<string>} array
 */
odd.data.EquationCollection.prototype.toStringArray = function() {
  return goog.array.map(this.equations_, function(equation) {
    return equation.toString();
  });
};

/**
 * Creates a set by iterating over the collection and adding
 * the output from applying the provided method on each equation.
 * @param {Function} fn
 * @return {goog.structs.Set}
 * @private
 */
odd.data.EquationCollection.prototype.reduceToSet_ = function(fn) {
  return goog.array.reduce(this.equations_, function(cumulative, equation) {
    cumulative.addAll(fn(equation));
    return cumulative;
  }, new goog.structs.Set());
};

/**
 * Creates an object by iterating over the collection and adding
 * the output from applying the provided method on each equation.
 * @param {Function} fn
 * @return {object}
 * @private
 */
odd.data.EquationCollection.prototype.reduceToObject_ = function(fn) {
  return goog.array.reduce(this.equations_, function(cumulative, equation) {
    goog.object.extend(cumulative, fn(equation));
    return cumulative;
  }, {});
};

/**
 * Returns a set of expression names which are defined by the equation collection.
 * @return {goog.structs.Set<string>}
 */
odd.data.EquationCollection.prototype.getDefinedExpressions = function() {
  return this.reduceToSet_(function(equation) {
     return equation.getDefinedExpressions();
   });
};

/**
 * Returns a set of dependency names which are required by the equation collection.
 * @return {goog.structs.Set<string>}
 */
odd.data.EquationCollection.prototype.getDependencies = function() {
  return this.reduceToSet_(function(equation) {
     return equation.getDependencies();
   });
};

/**
 * Returns a set of initial condition names which are defined by the equation collection.
 * @return {goog.structs.Set<string>}
 */
odd.data.EquationCollection.prototype.getInitialConditions = function() {
  return this.reduceToSet_(function(equation) {
     return equation.getInitialConditions();
   });
};

/**
 * Returns a set of parameter names which are defined by the equation collection.
 * @return {goog.structs.Set<string>}
 */
odd.data.EquationCollection.prototype.getParameters = function() {
  return this.getDependencies().difference(this.getDefinedExpressions());
};

/**
 * Creates a variable collection from the initial conditions and
 * parameters found in the equation collection. Used to populate
 * the variables editor.
 * @return {odd.data.VariableCollection}
 */
odd.data.EquationCollection.prototype.createBaseVariables = function() {
  var initialConditions = goog.array.map(this.getInitialConditions().getValues(), function(name) {
    return new odd.data.Variable(name);
  });

  var parameters = goog.array.map(this.getParameters().getValues(), function(name) {
    return new odd.data.Variable(name);
  });

  return new odd.data.VariableCollection(initialConditions, parameters);
};

/**
 * Returns a map of expression name to tokens, for parameter expressions
 * in the equation collection.
 * @return {Object<string, Array<odd.compiler.Token>>}
 */
odd.data.EquationCollection.prototype.getParameterToTokensMap = function() {
  return this.reduceToObject_(function(equation) {
    return equation.getParameterToTokensMap();
  });
};

/**
 * Returns a map of expression name to tokens, for ode expressions
 * in the equation collection.
 * @return {Object<string, Array<odd.compiler.Token>>}
 */
odd.data.EquationCollection.prototype.getOdeToTokensMap = function() {
  return this.reduceToObject_(function(equation) {
    return equation.getOdeToTokensMap();
  });
};