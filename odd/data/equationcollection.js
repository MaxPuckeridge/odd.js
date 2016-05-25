goog.provide('odd.data.EquationCollection');

goog.require('goog.array');
goog.require('goog.structs.Set');

goog.require('odd.data.Equation');
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
  var equations = goog.array.map(array, function(equation) {
     return new odd.data.Equation(equation);
   });
  return new odd.data.EquationCollection(equations);
};

odd.data.EquationCollection.prototype.toStringArray = function() {
  return goog.array.map(this.equations_, function(equation) {
    return equation.toString();
  });
};

odd.data.EquationCollection.prototype.createBaseVariables = function() {
  var dependentVariables =  goog.array.reduce(this.equations_, function(runningSet, equation) {
      runningSet.addAll(equation.getDependentVariables());
      return runningSet;
  }, new goog.structs.Set());

  var allDependencies =  goog.array.reduce(this.equations_, function(runningSet, equation) {
      runningSet.addAll(equation.getDependencies());
      return runningSet;
  }, new goog.structs.Set());

  var independentVariables = allDependencies.difference(dependentVariables);

  var initialConditions = goog.array.map(dependentVariables.getValues(), function(name) {
    return name + "(0)";
  });

  return new odd.data.VariableCollection(initialConditions, independentVariables.getValues());
};