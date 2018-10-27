'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _relayer = require('../relayer');

var _relayer2 = _interopRequireDefault(_relayer);

var _ethereumWaffle = require('ethereum-waffle');

var _ensBuilder = require('ens-builder');

var _ensBuilder2 = _interopRequireDefault(_ensBuilder);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelayerUnderTest = function (_Relayer) {
  (0, _inherits3.default)(RelayerUnderTest, _Relayer);

  function RelayerUnderTest() {
    (0, _classCallCheck3.default)(this, RelayerUnderTest);
    return (0, _possibleConstructorReturn3.default)(this, (RelayerUnderTest.__proto__ || Object.getPrototypeOf(RelayerUnderTest)).apply(this, arguments));
  }

  (0, _createClass3.default)(RelayerUnderTest, [{
    key: 'url',
    value: function url() {
      return 'http://127.0.0.1:' + this.port;
    }
  }], [{
    key: 'createPreconfigured',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(provider) {
        var port, _slice, _slice2, deployerWallet, privateKey, defaultDomain, ensBuilder, _defaultDomain$split, _defaultDomain$split2, label, tld, ensAddress, providerWithENS, config, relayer;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                port = 33111;
                _context.next = 3;
                return (0, _ethereumWaffle.getWallets)(provider);

              case 3:
                _context.t0 = -2;
                _slice = _context.sent.slice(_context.t0);
                _slice2 = (0, _slicedToArray3.default)(_slice, 1);
                deployerWallet = _slice2[0];
                privateKey = _ethereumWaffle.defaultAccounts.slice(-1)[0].secretKey;
                defaultDomain = 'mylogin.eth';
                ensBuilder = new _ensBuilder2.default(deployerWallet);
                _defaultDomain$split = defaultDomain.split('.'), _defaultDomain$split2 = (0, _slicedToArray3.default)(_defaultDomain$split, 2), label = _defaultDomain$split2[0], tld = _defaultDomain$split2[1];
                _context.next = 13;
                return ensBuilder.bootstrapWith(label, tld);

              case 13:
                ensAddress = _context.sent;
                providerWithENS = (0, _utils.withENS)(provider, ensAddress);
                config = (0, _extends3.default)({}, this.config, {
                  port: port,
                  privateKey: privateKey,
                  chainSpec: {
                    ensAddress: ensBuilder.ens.address,
                    chainId: 0
                  },
                  ensRegistrars: (0, _defineProperty3.default)({}, defaultDomain, {
                    registrarAddress: ensBuilder.registrars[defaultDomain].address,
                    resolverAddress: ensBuilder.resolver.address
                  })
                });
                relayer = new RelayerUnderTest(config, providerWithENS);

                relayer.provider = providerWithENS;
                return _context.abrupt('return', relayer);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createPreconfigured(_x) {
        return _ref.apply(this, arguments);
      }

      return createPreconfigured;
    }()
  }]);
  return RelayerUnderTest;
}(_relayer2.default);

exports.default = RelayerUnderTest;