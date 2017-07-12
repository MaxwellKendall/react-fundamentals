var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App.js'); // value is whatever is expored from app.js, refered to as "common js"

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
