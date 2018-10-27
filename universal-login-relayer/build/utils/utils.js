'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAddKeysCall = exports.getKeyFromData = exports.isAddKeyCall = exports.hasEnoughToken = exports.lookupAddress = exports.withENS = exports.messageSignatureForApprovals = exports.messageSignature = exports.waitForContractDeploy = exports.addressToBytes32 = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _ENS = require('universal-login-contracts/build/ENS');

var _ENS2 = _interopRequireDefault(_ENS);

var _PublicResolver = require('universal-login-contracts/build/PublicResolver');

var _PublicResolver2 = _interopRequireDefault(_PublicResolver);

var _ERC = require('universal-login-contracts/build/ERC20');

var _ERC2 = _interopRequireDefault(_ERC);

var _Identity = require('universal-login-contracts/build/Identity');

var _Identity2 = _interopRequireDefault(_Identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namehash = _ethers.utils.namehash;


var ether = '0x0000000000000000000000000000000000000000';

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
    var tick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
    var provider, abi, receipt;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            provider = providerOrWallet.provider ? providerOrWallet.provider : providerOrWallet;
            abi = contractJSON.interface;
            _context.next = 4;
            return provider.getTransactionReceipt(transactionHash);

          case 4:
            receipt = _context.sent;

          case 5:
            if (receipt) {
              _context.next = 12;
              break;
            }

            sleep(tick);
            _context.next = 9;
            return provider.getTransactionReceipt(transactionHash);

          case 9:
            receipt = _context.sent;
            _context.next = 5;
            break;

          case 12:
            return _context.abrupt('return', new _ethers2.default.Contract(receipt.contractAddress, abi, providerOrWallet));

          case 13:
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

var messageSignature = function messageSignature(wallet, to, from, value, data, nonce, gasToken, gasPrice, gasLimit) {
  return wallet.signMessage(_ethers.utils.arrayify(_ethers.utils.solidityKeccak256(['address', 'address', 'uint256', 'bytes', 'uint256', 'address', 'uint', 'uint'], [to, from, value, data, nonce, gasToken, gasPrice, gasLimit])));
};

var messageSignatureForApprovals = function messageSignatureForApprovals(wallet, id) {
  return wallet.signMessage(_ethers.utils.arrayify(_ethers.utils.solidityKeccak256(['uint256'], [id])));
};

var withENS = function withENS(provider, ensAddress) {
  var chainOptions = { ensAddress: ensAddress, chainId: 0 };
  // eslint-disable-next-line no-underscore-dangle
  return new _ethers.providers.Web3Provider(provider._web3Provider, chainOptions);
};

var hasEnoughToken = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(gasToken, identityAddress, gasLimit, provider) {
    var erc20Bytecode, token, identityTokenBalance;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // TODO what if passed address is not a for a token address
            erc20Bytecode = '0x6080604052600436106100b95763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630';

            if (!(gasToken === ether)) {
              _context2.next = 5;
              break;
            }

            throw new Error('Ether refunds are not yet supported');

          case 5:
            _context2.next = 7;
            return provider.getCode(gasToken);

          case 7:
            _context2.t0 = _context2.sent.slice(2, 111);
            _context2.t1 = erc20Bytecode.slice(2, 111);

            if (!(_context2.t0 !== _context2.t1)) {
              _context2.next = 13;
              break;
            }

            throw new Error('Address isn`t token');

          case 13:
            token = new _ethers2.default.Contract(gasToken, _ERC2.default.interface, provider);
            _context2.next = 16;
            return token.balanceOf(identityAddress);

          case 16:
            identityTokenBalance = _context2.sent;
            return _context2.abrupt('return', identityTokenBalance.gte(_ethers.utils.bigNumberify(gasLimit)));

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function hasEnoughToken(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var lookupAddress = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(provider, address) {
    var node, ens, resolver, contract;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            node = namehash((address.slice(2) + '.addr.reverse').toLowerCase());
            ens = new _ethers2.default.Contract(provider.ensAddress, _ENS2.default.interface, provider);
            _context3.next = 4;
            return ens.resolver(node);

          case 4:
            resolver = _context3.sent;
            contract = new _ethers2.default.Contract(resolver, _PublicResolver2.default.interface, provider);
            _context3.next = 8;
            return contract.name(node);

          case 8:
            return _context3.abrupt('return', _context3.sent);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function lookupAddress(_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var isAddKeyCall = function isAddKeyCall(data) {
  var addKeySighash = new _ethers.Interface(_Identity2.default.interface).functions.addKey.sighash;
  return addKeySighash === data.slice(0, addKeySighash.length);
};

var getKeyFromData = function getKeyFromData(data) {
  var codec = new _ethers.utils.AbiCoder();
  var addKeySighash = new _ethers.Interface(_Identity2.default.interface).functions.addKey.sighash;

  var _codec$decode = codec.decode(['bytes32', 'uint256', 'uint256'], data.replace(addKeySighash.slice(2), '')),
      _codec$decode2 = (0, _slicedToArray3.default)(_codec$decode, 1),
      address = _codec$decode2[0];

  return _ethers.utils.hexlify(_ethers.utils.stripZeros(address));
};

var isAddKeysCall = function isAddKeysCall(data) {
  var addKeysSighash = new _ethers.Interface(_Identity2.default.interface).functions.addKeys.sighash;
  return addKeysSighash === data.slice(0, addKeysSighash.length);
};

exports.addressToBytes32 = addressToBytes32;
exports.waitForContractDeploy = waitForContractDeploy;
exports.messageSignature = messageSignature;
exports.messageSignatureForApprovals = messageSignatureForApprovals;
exports.withENS = withENS;
exports.lookupAddress = lookupAddress;
exports.hasEnoughToken = hasEnoughToken;
exports.isAddKeyCall = isAddKeyCall;
exports.getKeyFromData = getKeyFromData;
exports.isAddKeysCall = isAddKeysCall;