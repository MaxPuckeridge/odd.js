goog.provide('odd.data.EquationCollection');

goog.require('goog.array');
goog.require('goog.structs.Set');

goog.require('odd.data.Equation');
goog.require('odd.data.Variable');
goog.require('odd.data.VariableCollection');

/**
 * @param {Array<odd.data.Equation>} equations
 * @constructor
 */
odd.data.EquationCollection = function(equations) {
  this.equations_ = equations || [ odd.data.Equation.createEmpty() ];
};

odd.data.EquationCollection.prototype.getEquations = function() {
  return this.equations_;
};

odd.data.EquationCollection.fromStringArray = function(array) {
  var equations = goog.array.map(array, odd.data.Equation.fromString);
  return new odd.data.EquationCollection(equations);
};

odd.data.EquationCollection.prototype.toStringArray = function() {
  return goog.array.map(this.equations_, function(equation) {
    return equation.toString();
  });
};

odd.data.EquationCollection.prototype.reduceToSet = function(fn) {
  return goog.array.reduce(this.equations_, function(cumulative, equation) {
    cumulative.addAll(fn(equation));
    return cumulative;
  }, new goog.structs.Set());
};

odd.data.EquationCollection.prototype.createBaseVariables = function() {
  var definedExpressionNames = this.reduceToSet(function(equation) {
    return equation.getDefinedExpressions();
  });

  var allDependencyNames = this.reduceToSet(function(equation) {
    return equation.getDependencies();
  });

  var initialConditionNames = this.reduceToSet(function(equation) {
    return equation.getInitialConditions();
  });

  var parameterNames = allDependencyNames.difference(definedExpressionNames);

  var initialConditions = goog.array.map(initialConditionNames.getValues(), function(name) {
    return new odd.data.Variable(name);
  });

  var parameters = goog.array.map(parameterNames.getValues(), function(name) {
    return new odd.data.Variable(name);
  });

  return new odd.data.VariableCollection(initialConditions, parameters);
};