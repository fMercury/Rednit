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

var _utils = require('../utils/utils');

var _fbemitter = require('fbemitter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObserverBase = function () {
  function ObserverBase() {
    (0, _classCallCheck3.default)(this, ObserverBase);

    this.state = 'stop';
    this.step = 1000;
    this.emitters = {};
  }

  (0, _createClass3.default)(ObserverBase, [{
    key: 'subscribe',
    value: function subscribe(eventType, identityAddress, callback) {
      var emitter = this.emitters[identityAddress] || new _fbemitter.EventEmitter();
      this.emitters[identityAddress] = emitter;
      return emitter.addListener(eventType, callback);
    }
  }, {
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.state === 'stop') {
                  this.state = 'running';
                  this.loop();
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'loop',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.state === 'stop')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                _context2.next = 4;
                return this.tick();

              case 4:
                if (this.state === 'stopping') {
                  this.state = 'stop';
                } else {
                  setTimeout(this.loop.bind(this), this.step);
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loop() {
        return _ref2.apply(this, arguments);
      }

      return loop;
    }()
  }, {
    key: 'stop',
    value: function stop() {
      this.state = 'stop';
    }
  }, {
    key: 'finalizeAndStop',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.state = 'stopping';

              case 1:
                _context3.next = 3;
                return (0, _utils.sleep)(this.step);

              case 3:
                if (this.state !== 'stop') {
                  _context3.next = 1;
                  break;
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function finalizeAndStop() {
        return _ref3.apply(this, arguments);
      }

      return finalizeAndStop;
    }()
  }]);
  return ObserverBase;
}();

exports.default = ObserverBase;