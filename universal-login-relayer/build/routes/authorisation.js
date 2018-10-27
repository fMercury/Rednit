'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.denyRequest = exports.getPending = exports.request = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _async_middleware = require('../middlewares/async_middleware');

var _async_middleware2 = _interopRequireDefault(_async_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = exports.request = function request(authorisationService) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var requestAuthorisation;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              requestAuthorisation = req.body;
              _context.next = 3;
              return authorisationService.addRequest(requestAuthorisation);

            case 3:
              res.status(201).type('json').send(JSON.stringify());

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var getPending = exports.getPending = function getPending(authorisationService) {
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var identityAddress, response;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              identityAddress = req.params.identityAddress;
              _context2.next = 3;
              return authorisationService.getPendingAuthorisations(identityAddress);

            case 3:
              response = _context2.sent;

              res.status(200).type('json').send(JSON.stringify({ response: response }));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var denyRequest = exports.denyRequest = function denyRequest(authorisationService) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var identityAddress, key, response;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              identityAddress = req.params.identityAddress;
              key = req.body.key;
              _context3.next = 4;
              return authorisationService.removeRequest(identityAddress, key);

            case 4:
              response = _context3.sent;

              res.status(201).type('json').send(JSON.stringify({ response: response }));

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
};

exports.default = function (authorisationService) {
  var router = new _express2.default.Router();

  router.post('/', (0, _async_middleware2.default)(request(authorisationService)));

  router.get('/:identityAddress', (0, _async_middleware2.default)(getPending(authorisationService)));

  router.post('/:identityAddress', (0, _async_middleware2.default)(denyRequest(authorisationService)));

  return router;
};