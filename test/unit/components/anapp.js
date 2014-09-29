"use strict";

var Lab = require("lab");
var lab = exports.lab = Lab.script();

require("node-jsx").install();
var AnApp = require("../../../src/js/components/anapp.jsx");

lab.experiment("AnApp", function() {
  lab.test("has a functional helper function", function (done) {
    Lab.expect(AnApp.type.prototype.someHelper()).to.equal("help!");
    done();
  });
});
