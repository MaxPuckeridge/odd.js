goog.provide('odd.graph.coordinatemapperTest');
goog.setTestOnly('odd.graph.coordinatemapperTest');

goog.require('goog.testing.jsunit');
goog.require('goog.math.Range');
goog.require('goog.math.Box');

goog.require('odd.graph.CoordinateMapper');

function makeTestMapper() {
  var tRange = new goog.math.Range(-120, 60);
  var vRange = new goog.math.Range(0, 16);

  // 100 x 100 box positioned at (10, 10)
  var box = new goog.math.Box(10, 110, 110, 10);

  return new odd.graph.CoordinateMapper(tRange, vRange, box);
}

function testMapLeft() {
  var coordinateMapper = makeTestMapper();

  assertEquals(10, coordinateMapper.mapLeft(-120));
  assertRoughlyEquals(44.83, coordinateMapper.mapLeft(-57.3), 0.01);
  assertRoughlyEquals(76.66, coordinateMapper.mapLeft(0), 0.01);
  assertEquals(110, coordinateMapper.mapLeft(60));
}

function testMapTop() {
  var coordinateMapper = makeTestMapper();

  assertEquals(110, coordinateMapper.mapTop(0));
  assertEquals(96.75, coordinateMapper.mapTop(2.12));
  assertEquals(35, coordinateMapper.mapTop(12));
  assertEquals(10, coordinateMapper.mapTop(16));
}

function testMap() {
  var coordinateMapper = makeTestMapper();

  assertArrayEquals([10, 110], coordinateMapper.map(-120, 0));
  assertArrayEquals([10, 10], coordinateMapper.map(-120, 16));
  assertArrayEquals([110, 110], coordinateMapper.map(60, 0));
  assertArrayEquals([110, 10], coordinateMapper.map(60, 16));
}