goog.provide('odd.odesolver.OdeSolver');
goog.provide('odd.odesolver.RungeKuttaMethod');

goog.require('goog.math.Range');

goog.require('odd.solution.Solution');
goog.require('odd.problem.Problem');

/**
 * @param {odd.problem.Problem} problem The representation of the ODE problem
 * @param {odd.solution.Solution} solution The representation of the ODE solution
 * @param {Function=} opt_method
 * @constructor
 */
odd.odesolver.OdeSolver = function(problem, solution, opt_method) {
  this.problem = problem;
  this.solution = solution;

  this.method = opt_method || odd.odesolver.RungeKuttaMethod;
};

/**
 * Solves the ode for the given range
 * @param {number} start
 * @param {number} finish
 */
odd.odesolver.OdeSolver.prototype.solve = function(start, finish) {
  var range = new goog.math.Range(start, finish);
  var existingRange = this.solution.getTRange();
  if (!existingRange) {
    var initialPoint = this.problem.getInitialPoint();
    var postOperationRange = range.clone();
    postOperationRange.includePoint(initialPoint.t);

    this.solution.addPoint(initialPoint);
    this.solveRaw(initialPoint, postOperationRange);
  } else {
    var postOperationRange = existingRange.clone();
    postOperationRange.includeRange(range);

    if (postOperationRange.start < existingRange.start) {
      // then there is a new range to the left of the current solution
      var leftRangeBlock = new goog.math.Range(postOperationRange.start, existingRange.start);
      this.solveRaw(this.solution.getLeftEdgePoint(), leftRangeBlock);
    }
    if (postOperationRange.end > existingRange.end) {
      // then there is a new range to the right of the current solution
      var rightRangeBlock = new goog.math.Range(postOperationRange.end, existingRange.end);
      this.solveRaw(this.solution.getRightEdgePoint(), rightRangeBlock);
    }
  }
};

/**
 * Solves the ode for the given range and initial point
 * @param {odd.solution.Point} point
 * @param {goog.math.Range} range
 */
odd.odesolver.OdeSolver.prototype.solveRaw = function(point, range) {
  var rightPoint = point;
  while (rightPoint.t < range.end) {
    rightPoint = this.method(this.problem.func, rightPoint, this.problem.dt);
    this.solution.addPoint(rightPoint);
  }

  var leftPoint = point;
  while (leftPoint.t > range.start) {
    leftPoint = this.method(this.problem.func, leftPoint, -this.problem.dt);
    this.solution.addPoint(leftPoint);
  }
};

/**
 * Calculates the next value of Y from the last point for a finite change in t
 * of size dt using the derivative function
 * @param {Function} func
 * @param {odd.solution.Point} point
 * @param {number} dt
 */
odd.odesolver.RungeKuttaMethod = function(func, point, dt) {
  var k1 = func(point.t, point.y);
  var k2 = func(point.t + dt/2, point.y + dt/2*k1);
  var k3 = func(point.t + dt/2, point.y + dt/2*k2);
  var k4 = func(point.t + dt, point.y + dt*k3);
  return new odd.solution.Point(point.t + dt, point.y + dt/6*(k1 + 2*k2 + 2*k3 + k4));
};