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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _identity = require('./routes/identity');

var _identity2 = _interopRequireDefault(_identity);

var _config = require('./routes/config');

var _config2 = _interopRequireDefault(_config);

var _authorisation = require('./routes/authorisation');

var _authorisation2 = _interopRequireDefault(_authorisation);

var _IdentityService = require('./services/IdentityService');

var _IdentityService2 = _interopRequireDefault(_IdentityService);

var _ensService = require('./services/ensService');

var _ensService2 = _interopRequireDefault(_ensService);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _authorisationService = require('./services/authorisationService');

var _authorisationService2 = _interopRequireDefault(_authorisationService);

var _fbemitter = require('fbemitter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPort = 3311;

var Relayer = function () {
  function Relayer(config, provider) {
    (0, _classCallCheck3.default)(this, Relayer);

    this.port = config.port || defaultPort;
    this.config = config;
    this.hooks = new _fbemitter.EventEmitter();
    this.provider = provider || new _ethers2.default.providers.JsonRpcProvider(config.jsonRpcUrl, config.chainSpec);
    this.wallet = new _ethers2.default.Wallet(config.privateKey, this.provider);
  }

  (0, _createClass3.default)(Relayer, [{
    key: 'start',
    value: function start() {
      this.app = (0, _express2.default)();
      this.app.use((0, _cors2.default)({
        origin: '*',
        credentials: true
      }));
      this.ensService = new _ensService2.default(this.config.chainSpec.ensAddress, this.config.ensRegistrars);
      this.authorisationService = new _authorisationService2.default();
      this.identityService = new _IdentityService2.default(this.wallet, this.ensService, this.authorisationService, this.hooks, this.provider);
      this.app.use(_bodyParser2.default.json());
      this.app.use('/identity', (0, _identity2.default)(this.identityService));
      this.app.use('/config', (0, _config2.default)(this.config.chainSpec));
      this.app.use('/authorisation', (0, _authorisation2.default)(this.authorisationService));
      this.server = this.app.listen(this.port);
    }
  }, {
    key: 'stop',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.server.close();

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function stop() {
        return _ref.apply(this, arguments);
      }

      return stop;
    }()
  }]);
  return Relayer;
}();

exports.default = Relayer;