goog.provide('odd.compilerTest');
goog.setTestOnly('odd.compilerTest');

goog.require('goog.testing.jsunit');

goog.require('odd.compiler');
goog.require('odd.compiler.Operator');
goog.require('odd.compiler.Token.Type');

var testExpressionA = "x'{2} = 5.1 * v1 * y - (x - y) * 0.314 / y";
var testExpressionB = "v1 = mu + mu * mu - 2 * mu";

function assertToken(type, value, token) {
  assertEquals(type, token.type);
  assertEquals(value, token.value);
}

function testCompile_expressionA() {
  var output = odd.compiler.compile(testExpressionA);

  assertEquals(odd.compiler.Expression.Type.ODE, output.type);
  assertEquals(2, output.data.degree);
  assertEquals('x', output.name);

  assertEquals(13, output.tokens.length);

  assertToken(odd.compiler.Token.Type.NUMBER, 5.1, output.tokens[0]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'v1', output.tokens[1]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.MULTIPLY, output.tokens[2]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'y', output.tokens[3]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.MULTIPLY, output.tokens[4]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'x', output.tokens[5]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'y', output.tokens[6]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.SUBTRACT, output.tokens[7]);
  assertToken(odd.compiler.Token.Type.NUMBER, 0.314, output.tokens[8]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.MULTIPLY, output.tokens[9]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'y', output.tokens[10]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.DIVIDE, output.tokens[11]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.SUBTRACT, output.tokens[12]);
}

function testCompile_expressionB() {
  var output = odd.compiler.compile(testExpressionB);

  assertEquals(odd.compiler.Expression.Type.PARAMETER, output.type);
  assertEquals('v1', output.name);

  assertEquals(9, output.tokens.length);

  assertToken(odd.compiler.Token.Type.EXPRESSION, 'mu', output.tokens[0]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'mu', output.tokens[1]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'mu', output.tokens[2]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.MULTIPLY, output.tokens[3]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.ADD, output.tokens[4]);
  assertToken(odd.compiler.Token.Type.NUMBER, 2, output.tokens[5]);
  assertToken(odd.compiler.Token.Type.EXPRESSION, 'mu', output.tokens[6]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.MULTIPLY, output.tokens[7]);
  assertToken(odd.compiler.Token.Type.OPERATOR, odd.compiler.Operator.SUBTRACT, output.tokens[8]);
}