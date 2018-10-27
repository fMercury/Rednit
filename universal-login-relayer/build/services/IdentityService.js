'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Identity = require('universal-login-contracts/build/Identity');

var _Identity2 = _interopRequireDefault(_Identity);

var _utils = require('../utils/utils');

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _defaultDeployOptions = require('../config/defaultDeployOptions');

var _defaultDeployOptions2 = _interopRequireDefault(_defaultDeployOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IdentityService = function () {
  function IdentityService(wallet, ensService, authorisationService, hooks, provider) {
    (0, _classCallCheck3.default)(this, IdentityService);

    this.wallet = wallet;
    this.abi = _Identity2.default.interface;
    this.ensService = ensService;
    this.authorisationService = authorisationService;
    this.codec = new _ethers.utils.AbiCoder();
    this.hooks = hooks;
    this.provider = provider;
  }

  (0, _createClass3.default)(IdentityService, [{
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(managementKey, ensName) {
        var _ethers$Contract;

        var overrideOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var key, bytecode, ensArgs, args, deployTransaction, transaction;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                key = (0, _utils.addressToBytes32)(managementKey);
                bytecode = '0x' + _Identity2.default.bytecode;
                ensArgs = this.ensService.argsFor(ensName);
                args = [key].concat((0, _toConsumableArray3.default)(ensArgs));
                deployTransaction = (0, _extends3.default)({
                  value: _ethers.utils.parseEther('0.1')
                }, _defaultDeployOptions2.default, overrideOptions, (_ethers$Contract = _ethers2.default.Contract).getDeployTransaction.apply(_ethers$Contract, [bytecode, this.abi].concat((0, _toConsumableArray3.default)(args))));
                _context.next = 7;
                return this.wallet.sendTransaction(deployTransaction);

              case 7:
                transaction = _context.sent;

                this.hooks.emit('created', transaction);
                return _context.abrupt('return', transaction);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'executeSigned',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(contractAddress, message) {
        var _functions$executeSig, data, transaction, estimateGas, key, sentTransaction, _sentTransaction;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _utils.hasEnoughToken)(message.gasToken, contractAddress, message.gasLimit, this.provider);

              case 2:
                if (!_context2.sent) {
                  _context2.next = 29;
                  break;
                }

                _functions$executeSig = new _ethers.Interface(_Identity2.default.interface).functions.executeSigned(message.to, message.value, message.data, message.nonce, message.gasToken, message.gasPrice, message.gasLimit, message.signature), data = _functions$executeSig.data;
                transaction = (0, _extends3.default)({
                  value: 0,
                  to: contractAddress,
                  data: data
                }, _defaultDeployOptions2.default);
                _context2.next = 7;
                return this.wallet.estimateGas(transaction);

              case 7:
                estimateGas = _context2.sent;

                if (!(message.gasLimit >= estimateGas)) {
                  _context2.next = 29;
                  break;
                }

                if (!(message.to === contractAddress && (0, _utils.isAddKeyCall)(message.data))) {
                  _context2.next = 20;
                  break;
                }

                key = (0, _utils.getKeyFromData)(message.data);
                _context2.next = 13;
                return this.authorisationService.removeRequest(contractAddress, key);

              case 13:
                _context2.next = 15;
                return this.wallet.sendTransaction(transaction);

              case 15:
                sentTransaction = _context2.sent;

                this.hooks.emit('added', key);
                return _context2.abrupt('return', sentTransaction);

              case 20:
                if (!(message.to === contractAddress && (0, _utils.isAddKeysCall)(message.data))) {
                  _context2.next = 26;
                  break;
                }

                _context2.next = 23;
                return this.wallet.sendTransaction(transaction);

              case 23:
                _sentTransaction = _context2.sent;

                this.hooks.emit('keysAdded');
                return _context2.abrupt('return', _sentTransaction);

              case 26:
                _context2.next = 28;
                return this.wallet.sendTransaction(transaction);

              case 28:
                return _context2.abrupt('return', _context2.sent);

              case 29:
                throw new Error('Not enough tokens');

              case 30:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function executeSigned(_x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return executeSigned;
    }()
  }]);
  return IdentityService;
}();

exports.default = IdentityService;