goog.provide('odd.uri.Uri');

goog.require('goog.Uri');

goog.require('odd.data.EquationCollection');
goog.require('odd.data.VariableCollection');

/**
 * @param {string} uri
 * @constructor
 * @extends {goog.Uri}
 */
odd.uri.Uri = function(uri) {
  goog.Uri.call(this, uri);

  this.data_ = this.extractData();

  this.equations_ = this.createEquations();
  this.variables_ = this.createVariables();
  this.graphOptions_ = this.createGraphOptions();
};
goog.inherits(odd.uri.Uri, goog.Uri);

odd.uri.Uri.prototype.extractData = function(uri) {
  var encoded = this.getQueryData().get('data');

  var data;
  try {
    data = JSON.parse(atob(encoded))
  } catch (e) {
    data = {};
  }

  return data;
};

odd.uri.Uri.prototype.createEquations = function() {
  if (this.data_["equations"]) {
    return odd.data.EquationCollection.fromStringArray(this.data_["equations"]);
  }
  return null;
};

odd.uri.Uri.prototype.createVariables = function() {
  if (this.data_["variables"]) {
    return odd.data.VariableCollection.fromJson(this.data_["variables"]);
  }

  // fallback for when the equations are made but not the variables
  if (this.equations_) {
    return this.equations_.createBaseVariables();
  }
  return null;
};

odd.uri.Uri.prototype.createGraphOptions = function() {
  if (this.data_["graph-options"]) {
    return odd.data.GraphOptions.fromJson(this.data_["graph-options"]);
  }
  return null;
};

odd.uri.Uri.prototype.getEquations = function() {
  return this.equations_;
};

odd.uri.Uri.prototype.getVariables = function() {
  return this.variables_;
};

odd.uri.Uri.prototype.getGraphOptions = function() {
  return this.graphOptions_;
};

odd.uri.Uri.prototype.updateQueryParams = function() {
  var encoded = btoa(JSON.stringify(this.data_));
  this.getQueryData().set('data', encoded);
};

odd.uri.Uri.prototype.setEquations = function(equations) {
  if (equations) {
    this.data_["equations"] = equations.toStringArray();
  } else {
    delete this.data_["equations"];
  }
  this.updateQueryParams();
};

odd.uri.Uri.prototype.setVariables = function(variables) {
  if (variables) {
    this.data_["variables"] = variables.toJson();
  } else {
    delete this.data_["variables"];
  }
  this.updateQueryParams();
};

odd.uri.Uri.prototype.setGraphOptions = function(graphOptions) {
  if (graphOptions) {
    this.data_["graph-options"] = graphOptions.toJson();
  } else {
    delete this.data_["graph-options"];
  }
  this.updateQueryParams();
};