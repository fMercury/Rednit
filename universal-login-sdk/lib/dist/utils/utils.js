'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForTransactionReceipt = exports.sleep = exports.addressToBytes32 = exports.messageSignature = exports.waitForContractDeploy = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addressToBytes32 = function addressToBytes32(address) {
  return _ethers.utils.padZeros(_ethers.utils.arrayify(address), 32);
};

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var waitForContractDeploy = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(providerOrWallet, contractJSON, transactionHash) {
    var abi, receipt;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            abi = contractJSON.interface;
            _context.next = 3;
            return waitForTransactionReceipt(providerOrWallet, transactionHash);

          case 3:
            receipt = _context.sent;
            return _context.abrupt('return', new _ethers2.default.Contract(receipt.contractAddress, abi, providerOrWallet));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function waitForContractDeploy(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var waitForTransactionReceipt = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(providerOrWallet, transactionHash) {
    var tick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
    var provider, receipt;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            provider = providerOrWallet.provider ? providerOrWallet.provider : providerOrWallet;
            _context2.next = 3;
            return provider.getTransactionReceipt(transactionHash);

          case 3:
            receipt = _context2.sent;

          case 4:
            if (receipt) {
              _context2.next = 11;
              break;
            }

            sleep(tick);
            _context2.next = 8;
            return provider.getTransactionReceipt(transactionHash);

          case 8:
            receipt = _context2.sent;
            _context2.next = 4;
            break;

          case 11:
            return _context2.abrupt('return', receipt);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function waitForTransactionReceipt(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var messageSignature = function messageSignature(wallet, to, from, value, data, nonce, gasToken, gasPrice, gasLimit) {
  return wallet.signMessage(_ethers.utils.arrayify(_ethers.utils.solidityKeccak256(['address', 'address', 'uint256', 'bytes', 'uint256', 'address', 'uint', 'uint'], [to, from, value, data, nonce, gasToken, gasPrice, gasLimit])));
};

exports.waitForContractDeploy = waitForContractDeploy;
exports.messageSignature = messageSignature;
exports.addressToBytes32 = addressToBytes32;
exports.sleep = sleep;
exports.waitForTransactionReceipt = waitForTransactionReceipt;