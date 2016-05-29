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

odd.data.EquationCollection.prototype.reduceToSet_ = function(fn) {
  return goog.array.reduce(this.equations_, function(cumulative, equation) {
    cumulative.addAll(fn(equation));
    return cumulative;
  }, new goog.structs.Set());
};

odd.data.EquationCollection.prototype.reduceToObject_ = function(fn) {
  return goog.array.reduce(this.equations_, function(cumulative, equation) {
    goog.object.extend(cumulative, fn(equation));
    return cumulative;
  }, {});
};

odd.data.EquationCollection.prototype.getDefinedExpressions = function() {
  return this.reduceToSet_(function(equation) {
     return equation.getDefinedExpressions();
   });
};

odd.data.EquationCollection.prototype.getDependencies = function() {
  return this.reduceToSet_(function(equation) {
     return equation.getDependencies();
   });
};

odd.data.EquationCollection.prototype.getInitialConditions = function() {
  return this.reduceToSet_(function(equation) {
     return equation.getInitialConditions();
   });
};

odd.data.EquationCollection.prototype.getParameters = function() {
  return this.getDependencies().difference(this.getDefinedExpressions());
};

odd.data.EquationCollection.prototype.createBaseVariables = function() {
  var initialConditions = goog.array.map(this.getInitialConditions().getValues(), function(name) {
    return new odd.data.Variable(name);
  });

  var parameters = goog.array.map(this.getParameters().getValues(), function(name) {
    return new odd.data.Variable(name);
  });

  return new odd.data.VariableCollection(initialConditions, parameters);
};

odd.data.EquationCollection.prototype.getParameterToTokensMap = function() {
  return this.reduceToObject_(function(equation) {
    return equation.getParameterToTokensMap();
  });
};

odd.data.EquationCollection.prototype.getOdeToTokensMap = function() {
  return this.reduceToObject_(function(equation) {
    return equation.getOdeToTokensMap();
  });
};