goog.provide('odd.uri.Uri');

goog.require('goog.Uri');

goog.require('odd.data.EquationCollection');
goog.require('odd.data.GraphOptions');
goog.require('odd.data.VariableCollection');

/**
 * Extends the google version of a Uri, adding additional helpers to get and
 * set query data containing state for a complete or partially setup of an
 * ode system.
 * @param {string} uri
 * @constructor
 * @extends {goog.Uri}
 */
odd.uri.Uri = function(uri) {
  goog.Uri.call(this, uri);

  /**
   * The data stored in the query data in the uri.
   * @type {object=}
   */
  this.data_ = this.extractData();

  /**
   * The set of equations that may be stored in the uri data.
   * @type {odd.data.EquationCollection=}
   */
  this.equations_ = this.createEquations();

  /**
   * The set of variables and their setup may be stored in the uri data,
   * otherwise, it may also be determined from _equations if it exists.
   * @type {odd.data.VariableCollection=}
   */
  this.variables_ = this.createVariables();

  /**
   * The graph options that may be stored in the uri data.
   * @type {odd.data.GraphOptions=}
   */
  this.graphOptions_ = this.createGraphOptions();
};
goog.inherits(odd.uri.Uri, goog.Uri);

/**
 * Extracts the data stored in the uri query data.
 * @return {object=}
 */
odd.uri.Uri.prototype.extractData = function(uri) {
  var encoded = this.getQueryData().get('data');

  var data;
  try {
    data = JSON.parse(atob(encoded))
  } catch (e) {
    // if not a valid base64 encoded blob, assume the
    // data is garbage, and assume the state is empty.
    data = {};
  }

  return data;
};

/**
 * Extracts the equation data stored in data_ if present.
 * @return {odd.data.EquationCollection=}
 */
odd.uri.Uri.prototype.createEquations = function() {
  if (this.data_["equations"]) {
    return odd.data.EquationCollection.fromStringArray(this.data_["equations"]);
  }

  return null;
};

/**
 * Extracts the variable data stored in data_ if present.
 * In addition, if data_ is missing variables but has equations,
 * then it will construct the base variables from them.
 * @return {odd.data.VariableCollection=}
 */
odd.uri.Uri.prototype.createVariables = function() {
  if (this.data_["variables"]) {
    return odd.data.VariableCollection.fromJson(this.data_["variables"]);
  }

  // fallback for when the equations are made but not the variables.
  if (this.equations_) {
    return this.equations_.createBaseVariables();
  }

  return null;
};

/**
 * Extracts the graph option data stored in data_ if present.
 * @return {odd.data.GraphOptions=}
 */
odd.uri.Uri.prototype.createGraphOptions = function() {
  if (this.data_["graph-options"]) {
    return odd.data.GraphOptions.fromJson(this.data_["graph-options"]);
  }
  return null;
};

/**
 * @returns {odd.data.EquationCollection=} Set of equations stored in data in the uri.
 */
odd.uri.Uri.prototype.getEquations = function() {
  return this.equations_;
};

/**
 * @returns {odd.data.VariableCollection=} Set of variables stored in data in the uri.
 */
odd.uri.Uri.prototype.getVariables = function() {
  return this.variables_;
};

/**
 * @returns {odd.data.GraphOptions=} Set of graph options stored in data in the uri.
 */
odd.uri.Uri.prototype.getGraphOptions = function() {
  return this.graphOptions_;
};

/**
 * Encodes the data_ into a base64 blob, and sets it as query data "data" in the uri.
 */
odd.uri.Uri.prototype.updateQueryParams = function() {
  var encoded = btoa(JSON.stringify(this.data_));
  this.getQueryData().set('data', encoded);
};

/**
 * Updates the equations value in the data, and the uri. Will remove the equations,
 * when provided with null.
 * @param {odd.data.EquationCollection=} equations
 */
odd.uri.Uri.prototype.setEquations = function(equations) {
  if (equations) {
    this.data_["equations"] = equations.toStringArray();
  } else {
    delete this.data_["equations"];
  }

  this.updateQueryParams();
};

/**
 * Updates the variables value in the data, and the uri. Will remove the variables,
 * when provided with null.
 * @param {odd.data.VariableCollection=} variables
 */
odd.uri.Uri.prototype.setVariables = function(variables) {
  if (variables) {
    this.data_["variables"] = variables.toJson();
  } else {
    delete this.data_["variables"];
  }
  this.updateQueryParams();
};

/**
 * Updates the graph options value in the data, and the uri. Will remove the graph options,
 * when provided with null.
 * @param {odd.data.GraphOptions=} graphOptions
 */
odd.uri.Uri.prototype.setGraphOptions = function(graphOptions) {
  if (graphOptions) {
    this.data_["graph-options"] = graphOptions.toJson();
  } else {
    delete this.data_["graph-options"];
  }
  this.updateQueryParams();
};