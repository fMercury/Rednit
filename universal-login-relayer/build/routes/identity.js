'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execution = exports.create = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _async_middleware = require('../middlewares/async_middleware');

var _async_middleware2 = _interopRequireDefault(_async_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(identityService) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var _req$body, managementKey, ensName, transaction;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, managementKey = _req$body.managementKey, ensName = _req$body.ensName;
              _context.next = 3;
              return identityService.create(managementKey, ensName);

            case 3:
              transaction = _context.sent;

              res.status(201).type('json').send(JSON.stringify({ transaction: transaction }));

            case 5:
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

var execution = function execution(identityService) {
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var _req$body2, contractAddress, message, transaction;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, contractAddress = _req$body2.contractAddress, message = (0, _objectWithoutProperties3.default)(_req$body2, ['contractAddress']);
              _context2.next = 3;
              return identityService.executeSigned(contractAddress, message);

            case 3:
              transaction = _context2.sent;

              res.status(201).type('json').send(JSON.stringify({ transaction: transaction }));

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

exports.execution = execution;

exports.default = function (identityService) {
  var router = new _express2.default.Router();

  router.post('/', (0, _async_middleware2.default)(create(identityService)));

  router.post('/execution', (0, _async_middleware2.default)(execution(identityService)));

  return router;
};