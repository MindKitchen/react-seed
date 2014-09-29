/** @jsx React.DOM */
/*jshint unused:false*/
"use strict";
var React = require("react");
var Router = require("react-router-component");
var Link = Router.Link;

module.exports = React.createClass({
  render: function () {
    /*jshint ignore:start*/
    return (
      <div>
        <h1>Hello {this.props.foo}!</h1>
        <ul>
          <li><Link href="/hello/world">Test: world</Link></li>
          <li><Link href="/hello/universe">Test: universe</Link></li>
          <li><Link href="/hello/Bob">Test: Bob</Link></li>
        </ul>
      </div>
    );
    /*jshint ignore:end*/
  }
});
