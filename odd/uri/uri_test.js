goog.provide('odd.uri.uriTest');
goog.setTestOnly('odd.uri.uriTest');

goog.require('goog.testing.jsunit');

goog.require('odd.uri.Uri');
goog.require('odd.data.Equation');
goog.require('odd.data.EquationCollection');
goog.require('odd.data.GraphOptions');
goog.require('odd.data.Variable');
goog.require('odd.data.VariableCollection');

var BASE_EQUATIONS = 'eyJlcXVhdGlvbnMiOlsiZXF1YXRpb25BIiwiZXF1YXRpb25CIiwiZXF1YXRpb25DIl19';
var BASE_VARIABLES = 'eyJlcXVhdGlvbnMiOlsiZXF1YXRpb25BIiwiZXF1YXRpb25CIiwiZXF1YXRpb25DIl0sInZhcmlhYmxlcyI6eyJpbml0aWFsIjpbeyJuYW1lIjoiaWMxIiwidHlwZSI6ImZpeGVkIn0seyJuYW1lIjoiaWMyIiwidHlwZSI6ImZpeGVkIn1dLCJwYXJhbWV0ZXJzIjpbeyJuYW1lIjoicGFyYW0xIiwidHlwZSI6ImZpeGVkIn0seyJuYW1lIjoicGFyYW0yIiwidHlwZSI6ImZpeGVkIn1dfX0=';
var BASE_ALL = 'eyJlcXVhdGlvbnMiOlsiZXF1YXRpb25BIiwiZXF1YXRpb25CIiwiZXF1YXRpb25DIl0sInZhcmlhYmxlcyI6eyJpbml0aWFsIjpbeyJuYW1lIjoiaWMxIiwidHlwZSI6ImZpeGVkIn0seyJuYW1lIjoiaWMyIiwidHlwZSI6ImZpeGVkIn1dLCJwYXJhbWV0ZXJzIjpbeyJuYW1lIjoicGFyYW0xIiwidHlwZSI6ImZpeGVkIn0seyJuYW1lIjoicGFyYW0yIiwidHlwZSI6ImZpeGVkIn1dfSwiZ3JhcGgtb3B0aW9ucyI6eyJsZWZ0IjotMTAsInJpZ2h0IjoxMSwidG9wIjoxMiwiYm90dG9tIjotMTN9fQ==';

function testEncoding() {
  var uri = new odd.uri.Uri();

  assertEquals(undefined, uri.getQueryData().get('data'));

  var equations = new odd.data.EquationCollection();
  equations.add(new odd.data.Equation('equationA'));
  equations.add(new odd.data.Equation('equationB'));
  equations.add(new odd.data.Equation('equationC'));

  uri.setEquations(equations);

  assertEquals(BASE_EQUATIONS, uri.getQueryData().get('data'));

  var variables = new odd.data.VariableCollection();
  variables.addInitialCondition(new odd.data.Variable('ic1'));
  variables.addInitialCondition(new odd.data.Variable('ic2'));
  variables.addParameter(new odd.data.Variable('param1'));
  variables.addParameter(new odd.data.Variable('param2'));

  uri.setVariables(variables);

  assertEquals(BASE_VARIABLES, uri.getQueryData().get('data'));

  var graphOptions = new odd.data.GraphOptions(-10, 11, 12, -13);

  uri.setGraphOptions(graphOptions);

  assertEquals(BASE_ALL, uri.getQueryData().get('data'));
}

function testDecoding() {
  var uri = new odd.uri.Uri('?data=' + BASE_ALL);

  var equations = uri.getEquations();
  assertEquals(3, equations.size());
  assertEquals('equationA', equations.getByIndex(0).toString());
  assertEquals('equationB', equations.getByIndex(1).toString());
  assertEquals('equationC', equations.getByIndex(2).toString());

  var variables = uri.getVariables();
  assertEquals(4, variables.size());
  assertEquals('ic1', variables.getInitialByIndex(0).name);
  assertEquals('ic2', variables.getInitialByIndex(1).name);
  assertEquals('param1', variables.getParameterByIndex(0).name);
  assertEquals('param2', variables.getParameterByIndex(1).name);

  var graphOptions = uri.getGraphOptions();
  assertEquals(-10, graphOptions.left);
  assertEquals(11, graphOptions.right);
  assertEquals(12, graphOptions.top);
  assertEquals(-13, graphOptions.bottom);
}