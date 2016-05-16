goog.provide('odd.uri.Uri');

goog.require('goog.Uri');

/**
 * @param {string} uri
 * @constructor
 */
odd.uri.Uri = function(uri) {
  this.uri = new goog.Uri(uri);
  this.data_ = this.extractData(this.uri);
};

odd.uri.Uri.prototype.extractData = function(uri) {
  var encoded = uri.getQueryData().get('data');

  var data;
  try {
    data = JSON.parse(atob(encoded))
  } catch (e) {
    data = {};
  }

  return data;
};

odd.uri.Uri.prototype.setData = function(data) {
  this.data_ = data;

  var encoded = btoa(JSON.stringify(obj));
  uri.getQueryParams().set('data', encoded);
};

odd.uri.Uri.prototype.getData = function() {
  return this.data_;
};

odd.uri.Uri.prototype.getEquations = function() {
  return this.data_["equations"] || [];
};