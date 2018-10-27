'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ethers = require('ethers');

var _ObserverBase2 = require('./ObserverBase');

var _ObserverBase3 = _interopRequireDefault(_ObserverBase2);

var _Identity = require('universal-login-contracts/build/Identity');

var _Identity2 = _interopRequireDefault(_Identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockchainObserver = function (_ObserverBase) {
  (0, _inherits3.default)(BlockchainObserver, _ObserverBase);

  function BlockchainObserver(provider) {
    (0, _classCallCheck3.default)(this, BlockchainObserver);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BlockchainObserver.__proto__ || Object.getPrototypeOf(BlockchainObserver)).call(this));

    _this.provider = provider;
    _this.eventInterface = new _ethers.Interface(_Identity2.default.interface).events;
    _this.codec = new _ethers.utils.AbiCoder();
    return _this;
  }

  (0, _createClass3.default)(BlockchainObserver, [{
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.provider.getBlockNumber();

              case 2:
                this.lastBlock = _context.sent;
                _context.next = 5;
                return (0, _get3.default)(BlockchainObserver.prototype.__proto__ || Object.getPrototypeOf(BlockchainObserver.prototype), 'start', this).call(this);

              case 5:
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
    key: 'tick',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, identityAddress;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 3;
                _iterator = Object.keys(this.emitters)[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 12;
                  break;
                }

                identityAddress = _step.value;
                _context2.next = 9;
                return this.fetchEvents(identityAddress);

              case 9:
                _iteratorNormalCompletion = true;
                _context2.next = 5;
                break;

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 18:
                _context2.prev = 18;
                _context2.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 21:
                _context2.prev = 21;

                if (!_didIteratorError) {
                  _context2.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context2.finish(21);

              case 25:
                return _context2.finish(18);

              case 26:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      }));

      function tick() {
        return _ref2.apply(this, arguments);
      }

      return tick;
    }()
  }, {
    key: 'fetchEvents',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(identityAddress) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.fetchEventsOfType('KeyAdded', identityAddress);

              case 2:
                _context3.next = 4;
                return this.fetchEventsOfType('KeyRemoved', identityAddress);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchEvents(_x) {
        return _ref3.apply(this, arguments);
      }

      return fetchEvents;
    }()
  }, {
    key: 'fetchEventsOfType',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(type, identityAddress) {
        var topics, filter, events, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, event;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                topics = [this.eventInterface[type].topics];
                filter = { fromBlock: this.lastBlock, address: identityAddress, topics: topics };
                _context4.next = 4;
                return this.provider.getLogs(filter);

              case 4:
                events = _context4.sent;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 8;

                for (_iterator2 = events[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  event = _step2.value;

                  this.emitters[identityAddress].emit(type, this.parseArgs(type, event));
                }
                _context4.next = 16;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4['catch'](8);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t0;

              case 16:
                _context4.prev = 16;
                _context4.prev = 17;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 19:
                _context4.prev = 19;

                if (!_didIteratorError2) {
                  _context4.next = 22;
                  break;
                }

                throw _iteratorError2;

              case 22:
                return _context4.finish(19);

              case 23:
                return _context4.finish(16);

              case 24:
                _context4.next = 26;
                return this.provider.getBlockNumber();

              case 26:
                this.lastBlock = _context4.sent;

              case 27:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[8, 12, 16, 24], [17,, 19, 23]]);
      }));

      function fetchEventsOfType(_x2, _x3) {
        return _ref4.apply(this, arguments);
      }

      return fetchEventsOfType;
    }()
  }, {
    key: 'parseArgs',
    value: function parseArgs(type, event) {
      if (event.topics[0] === this.eventInterface[type].topics[0]) {
        var args = this.eventInterface[type].parse(event.topics, event.data);

        var _codec$decode = this.codec.decode(['address'], args.key),
            _codec$decode2 = (0, _slicedToArray3.default)(_codec$decode, 1),
            address = _codec$decode2[0];

        var purpose = args.purpose.toNumber();
        var keyType = args.keyType.toNumber();
        return { address: address, purpose: purpose, keyType: keyType };
      }
      throw 'Not supported event with topic: ' + event.topics[0];
    }
  }]);
  return BlockchainObserver;
}(_ObserverBase3.default);

exports.default = BlockchainObserver;