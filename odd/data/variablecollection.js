goog.provide('odd.data.VariableCollection');

goog.require('odd.data.Variable');

/**
 * @param {Array<odd.data.Variable>=} opt_initialConditions
 * @param {Array<odd.data.Variable>=} opt_parameters
 * @constructor
 */
odd.data.VariableCollection = function(opt_initialConditions, opt_parameters) {
  this.initialConditions_ = opt_initialConditions || [];
  this.parameters_ = opt_parameters || [];
};

/**
 * Add a new initial condition into the collection.
 * @param {odd.data.Variable} variable
 */
odd.data.VariableCollection.prototype.addInitialCondition = function(variable) {
  this.initialConditions_.push(variable);
};

odd.data.VariableCollection.prototype.size = function() {
  return this.initialConditions_.length + this.parameters_.length;
};

odd.data.VariableCollection.prototype.getInitialByIndex = function(index) {
  return this.initialConditions_[index];
};

odd.data.VariableCollection.prototype.getParameterByIndex = function(index) {
  return this.parameters_[index];
};

/**
 * Add a new parameter into the collection.
 * @param {odd.data.Variable} variable
 */
odd.data.VariableCollection.prototype.addParameter = function(variable) {
  this.parameters_.push(variable);
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
    "initial": initial,
    "parameters": parameters
  };
};

odd.data.VariableCollection.prototype.toEquationData = function() {
  var data = [];

  goog.array.forEach(this.initialConditions_, function(variable) {
    data.push(variable.toEquationData());
  });

  goog.array.forEach(this.parameters_, function(variable) {
    data.push(variable.toEquationData());
  });

  return data;
};