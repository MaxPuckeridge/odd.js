goog.provide('odd.odesolver.OdeSolver');
goog.provide('odd.odesolver.Euler');
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
    var initialPoint = this.problem.initialPoint;
    var postOperationRange = range.clone();
    postOperationRange.includePoint(initialPoint.t);

    this.solution.addPoint(initialPoint);
    this.solveRaw(initialPoint, postOperationRange);
    this.solution.triggerNewDataEvent();
  } else {
    var postOperationRange = existingRange.clone();
    postOperationRange.includeRange(range);

    var addedData = false;
    if (postOperationRange.start < existingRange.start) {
      // then there is a new range to the left of the current solution
      var leftRangeBlock = new goog.math.Range(postOperationRange.start, existingRange.start);
      this.solveRaw(this.solution.getLeftEdgePoint(), leftRangeBlock);
      addedData = true;
    }
    if (postOperationRange.end > existingRange.end) {
      // then there is a new range to the right of the current solution
      var rightRangeBlock = new goog.math.Range(postOperationRange.end, existingRange.end);
      this.solveRaw(this.solution.getRightEdgePoint(), rightRangeBlock);
      addedData = true;
    }

    if(addedData) {
      this.solution.triggerNewDataEvent();
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
 * of size dt using the derivative function, implemented with Runge-Kutta's algorithm
 * @param {function(number, odd.solution.Vector):odd.solution.Vector} func
 * @param {odd.solution.Point} point
 * @param {number} dt
 */
odd.odesolver.RungeKuttaMethod = function(func, point, dt) {
  var t = point.t, v = point.vector;
  var k1 = func(t, v);
  var k2 = func(t + dt/2, v.addVector(k1.multiplyScalar(dt/2)));
  var k3 = func(t + dt/2, v.addVector(k2.multiplyScalar(dt/2)));
  var k4 = func(t + dt, v.addVector(k3.multiplyScalar(dt)));
  return new odd.solution.Point(t + dt, v.addVector(
      k1
      .addVector(k2.multiplyScalar(2))
      .addVector(k3.multiplyScalar(2))
      .addVector(k4)
      .multiplyScalar(dt/6))
  );
};

/**
 * Calculates the next value of Y from the last point for a finite change in t
 * of size dt using the derivative function, implemented with Euler's algorithm
 * (quickly deviates from the true solution. recommended only for testing purposes)
 * @param {function(number, odd.solution.Vector):odd.solution.Vector} func
 * @param {odd.solution.Point} point
 * @param {number} dt
 */
odd.odesolver.Euler = function(func, point, dt) {
  var t = point.t, v = point.vector;
  return new odd.solution.Point(t + dt, v.addVector(func(t, v).multiplyScalar(dt)));
};