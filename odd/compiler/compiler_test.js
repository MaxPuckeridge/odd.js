goog.provide('odd.compilerTest');
goog.setTestOnly('odd.compilerTest');

goog.require('goog.testing.jsunit');

goog.require('odd.compiler');

var testExpressionA = "x'{2} = 5.1 * v1 * y - (x - y) * 0.314 / y";
var testExpressionB = "v1 = mu + mu * mu - 2 * mu";

function testCompile_expressionA() {
  var output = odd.compiler.compile(testExpressionA);

  assertEquals('OdeExpression', output.type);
  assertEquals(2, output.degree);
  assertEquals('x', output.param_name);

  assertArrayEquals([
      {type: 'number', value: 5.1},
      {type: 'expression', value: "v1"},
      {type: 'operator', value: "*"},
      {type: 'expression', value: "y"},
      {type: 'operator', value: "*"},
      {type: 'expression', value: "x"},
      {type: 'expression', value: "y"},
      {type: 'operator', value: "-"},
      {type: 'number', value: 0.314},
      {type: 'operator', value: "*"},
      {type: 'expression', value: "y"},
      {type: 'operator', value: "/"},
      {type: 'operator', value: "-"}
  ], output.ops);

  assertEquals(3, output.dependencies.getCount());
  assertTrue(output.dependencies.containsAll('x', 'y', 'v1'));
}

function testCompile_expressionB() {
  var output = odd.compiler.compile(testExpressionB);

  assertEquals('VariableExpression', output.type);
  assertEquals('v1', output.param_name);

  assertArrayEquals([
      {type: 'expression', value: "mu"},
      {type: 'expression', value: "mu"},
      {type: 'expression', value: "mu"},
      {type: 'operator', value: "*"},
      {type: 'operator', value: "+"},
      {type: 'number', value: 2},
      {type: 'expression', value: "mu"},
      {type: 'operator', value: "*"},
      {type: 'operator', value: "-"}
  ], output.ops);

  assertEquals(1, output.dependencies.getCount());
  assertTrue(output.dependencies.contains('mu'));
}