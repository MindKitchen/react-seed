/** @jsx React.DOM */
/*jshint unused:false*/
"use strict";
var React = require("react");
var Router = require("react-router-component");
var Locations = Router.Locations;
var Location = Router.Location;

var MainPage = require("./mainpage.jsx");
var HelloPage = require("./hellopage.jsx");
var Header = require("./header.jsx");
var Footer = require("./footer.jsx");

module.exports = React.createClass({
  someHelper: function () { return "help!"; },
  render: function () {
    /*jshint ignore:start*/
    return (
      <div>
        <Header/>
        <Locations>
          <Location path="/" handler={MainPage} />
          <Location path="/hello/:foo" handler={HelloPage} />
        </Locations>
        <Footer/>
      </div>
    );
    /*jshint ignore:end*/
  }
});
