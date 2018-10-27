'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var headers = { 'Content-Type': 'application/json; charset=utf-8' };

var fetchFunction = void 0;

// eslint-disable-next-line no-undef
if (typeof window === 'undefined') {
  fetchFunction = require('node-fetch');
} else {
  // eslint-disable-next-line no-undef
  fetchFunction = window.fetch;
}

var fetch = fetchFunction;

exports.headers = headers;
exports.fetch = fetch;