goog.provide('odd.ui.Graph');

goog.require('goog.graphics');

/**
 *
 * Renders the solution to odes
 *
 * @param ode
 * @param width
 * @param height
 *
 * @constructor
 */
odd.ui.Graph = function(ode, width, height){
    this.ode = ode;
    this.graphics = goog.graphics.createGraphics(width, height);
};