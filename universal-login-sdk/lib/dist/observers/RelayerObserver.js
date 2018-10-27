'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ObserverBase2 = require('./ObserverBase');

var _ObserverBase3 = _interopRequireDefault(_ObserverBase2);

var _http = require('../utils/http');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelayerObserver = function (_ObserverBase) {
  (0, _inherits3.default)(RelayerObserver, _ObserverBase);

  function RelayerObserver(relayerUrl) {
    (0, _classCallCheck3.default)(this, RelayerObserver);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RelayerObserver.__proto__ || Object.getPrototypeOf(RelayerObserver)).call(this));

    _this.relayerUrl = relayerUrl;
    _this.lastAuthorisations = {};
    return _this;
  }

  (0, _createClass3.default)(RelayerObserver, [{
    key: 'tick',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.checkAuthorisationRequests());

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function tick() {
        return _ref.apply(this, arguments);
      }

      return tick;
    }()
  }, {
    key: 'checkAuthorisationsChangedFor',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(identityAddress) {
        var emitter, authorisations;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                emitter = this.emitters[identityAddress];
                _context2.next = 3;
                return this.fetchPendingAuthorisations(identityAddress);

              case 3:
                authorisations = _context2.sent;

                if (!(0, _deepEqual2.default)(authorisations, this.lastAuthorisations)) {
                  this.lastAuthorisations = authorisations;
                  emitter.emit('AuthorisationsChanged', authorisations);
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkAuthorisationsChangedFor(_x) {
        return _ref2.apply(this, arguments);
      }

      return checkAuthorisationsChangedFor;
    }()
  }, {
    key: 'checkAuthorisationRequests',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, identityAddress;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 3;
                _iterator = Object.keys(this.emitters)[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 12;
                  break;
                }

                identityAddress = _step.value;
                _context3.next = 9;
                return this.checkAuthorisationsChangedFor(identityAddress);

              case 9:
                _iteratorNormalCompletion = true;
                _context3.next = 5;
                break;

              case 12:
                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 18:
                _context3.prev = 18;
                _context3.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 21:
                _context3.prev = 21;

                if (!_didIteratorError) {
                  _context3.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context3.finish(21);

              case 25:
                return _context3.finish(18);

              case 26:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      }));

      function checkAuthorisationRequests() {
        return _ref3.apply(this, arguments);
      }

      return checkAuthorisationRequests;
    }()
  }, {
    key: 'authorisationUrl',
    value: function authorisationUrl(identityAddress) {
      return this.relayerUrl + '/authorisation/' + identityAddress;
    }
  }, {
    key: 'fetchPendingAuthorisations',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(identityAddress) {
        var url, method, response, responseJson;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = this.authorisationUrl(identityAddress);
                method = 'GET';
                _context4.next = 4;
                return (0, _http.fetch)(url, { headers: _http.headers, method: method });

              case 4:
                response = _context4.sent;
                _context4.next = 7;
                return response.json();

              case 7:
                responseJson = _context4.sent;

                if (!(response.status === 200)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt('return', responseJson.response);

              case 10:
                throw new Error('' + response.status);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchPendingAuthorisations(_x2) {
        return _ref4.apply(this, arguments);
      }

      return fetchPendingAuthorisations;
    }()
  }]);
  return RelayerObserver;
}(_ObserverBase3.default);

exports.default = RelayerObserver;