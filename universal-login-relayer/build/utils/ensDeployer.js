'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _ethereumWaffle = require('ethereum-waffle');

var _ensBuilder = require('ens-builder');

var _ensBuilder2 = _interopRequireDefault(_ensBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENSDeployer = function () {
  function ENSDeployer(provider, deployerPrivateKey) {
    (0, _classCallCheck3.default)(this, ENSDeployer);

    this.provider = provider;
    this.deployerPrivateKey = deployerPrivateKey;
    this.deployer = new _ethers2.default.Wallet(deployerPrivateKey, provider);
    this.variables = {};
    this.count = 1;
  }

  /* eslint-disable no-console */


  (0, _createClass3.default)(ENSDeployer, [{
    key: 'save',
    value: function save(filename) {
      var content = Object.entries(this.variables).map(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return key + '=' + value;
      }).join('\n');
      _fs2.default.writeFile(filename, content, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log(filename + ' file updated.');
      });
    }
  }, {
    key: 'deployRegistrars',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(registrars) {
        var tld = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'eth';

        var builder, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, domain, _domain$split, _domain$split2, label, _tld;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                builder = new _ensBuilder2.default(this.deployer);
                _context.next = 3;
                return builder.bootstrap();

              case 3:
                this.variables.ENS_ADDRESS = builder.ens.address;
                _context.next = 6;
                return builder.registerTLD(tld);

              case 6:
                _context.next = 8;
                return builder.registerReverseRegistrar();

              case 8:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 11;
                _iterator = Object.keys(registrars)[Symbol.iterator]();

              case 13:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 25;
                  break;
                }

                domain = _step.value;
                _domain$split = domain.split('.'), _domain$split2 = (0, _slicedToArray3.default)(_domain$split, 2), label = _domain$split2[0], _tld = _domain$split2[1];
                _context.next = 18;
                return builder.registerDomain(label, _tld);

              case 18:
                this.variables['ENS_REGISTRAR' + this.count + '_ADDRESS'] = builder.registrars[domain].address;
                this.variables['ENS_REGISTRAR' + this.count + '_PRIVATE_KEY'] = this.deployerPrivateKey;
                this.variables['ENS_RESOLVER' + this.count + '_ADDRESS'] = builder.resolver.address;
                this.count += 1;

              case 22:
                _iteratorNormalCompletion = true;
                _context.next = 13;
                break;

              case 25:
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context['catch'](11);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 31:
                _context.prev = 31;
                _context.prev = 32;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 34:
                _context.prev = 34;

                if (!_didIteratorError) {
                  _context.next = 37;
                  break;
                }

                throw _iteratorError;

              case 37:
                return _context.finish(34);

              case 38:
                return _context.finish(31);

              case 39:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[11, 27, 31, 39], [32,, 34, 38]]);
      }));

      function deployRegistrars(_x) {
        return _ref3.apply(this, arguments);
      }

      return deployRegistrars;
    }()
  }], [{
    key: 'deploy',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(jsonRpcUrl, registrars) {
        var tld = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'eth';
        var provider, deployerPrivateKey, deployer;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                provider = new _ethers2.default.providers.JsonRpcProvider(jsonRpcUrl);
                deployerPrivateKey = _ethereumWaffle.defaultAccounts[_ethereumWaffle.defaultAccounts.length - 1].secretKey;
                deployer = new ENSDeployer(provider, deployerPrivateKey);
                _context2.next = 5;
                return deployer.deployRegistrars(registrars, tld);

              case 5:
                deployer.save('.env');

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deploy(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return deploy;
    }()
  }]);
  return ENSDeployer;
}();

exports.default = ENSDeployer;