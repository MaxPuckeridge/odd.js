goog.provide('odd.data.VariableCollection');

goog.require('odd.data.Variable');

/**
 * @constructor
 */
odd.data.VariableCollection = function(initialConditions, parameters) {
  this.initialConditions_ = initialConditions;
  this.parameters_ = parameters;
};

odd.data.VariableCollection.prototype.getInitialConditions = function() {
  return this.initialConditions_;
};

odd.data.VariableCollection.prototype.getParameters = function() {
 return this.parameters_;
};

odd.data.VariableCollection.fromJson = function(jsonData) {
  var initialConditions = goog.array.map(jsonData["initial"], odd.data.Variable.fromJson);

  var parameters = goog.array.map(jsonData["parameters"], odd.data.Variable.fromJson);

  return new odd.data.VariableCollection(initialConditions, parameters);
};

odd.data.VariableCollection.prototype.toJson = function() {
  var initial = goog.array.map(this.initialConditions_, function(variable) {
    return variable.toJson();
  });

  var parameters = goog.array.map(this.parameters_, function(variable) {
    return variable.toJson();
  });

  return {
    initial: initial,
    parameters: parameters
  };
};