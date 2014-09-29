"use strict";
/** @jsx React.DOM */

var React = require("react");
var AnApp = require("./components/anapp.jsx");

React.renderComponent(
  /*exported AnApp*/
  /*jshint ignore:start*/
  <AnApp />,
  /*jshint ignore:end*/
  document.body
);
