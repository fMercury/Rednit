'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeEqual = exports.resolveName = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveName = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(provider, ensAddress, ensName) {
    var node, ensContract, resolverAddress, resolverContract;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            node = _ethers.utils.namehash(ensName);
            ensContract = new _ethers2.default.Contract(ensAddress, _ENS2.default.interface, provider);
            _context.next = 4;
            return ensContract.resolver(node);

          case 4:
            resolverAddress = _context.sent;

            if (!(resolverAddress !== '0x0000000000000000000000000000000000000000')) {
              _context.next = 10;
              break;
            }

            resolverContract = new _ethers2.default.Contract(resolverAddress, _PublicResolver2.default.interface, provider);
            _context.next = 9;
            return resolverContract.addr(node);

          case 9:
            return _context.abrupt('return', _context.sent);

          case 10:
            return _context.abrupt('return', false);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function resolveName(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var codeEqual = function codeEqual(runtimeBytecode, liveBytecode) {
  // TODO: verify if it is working
  var compareLength = runtimeBytecode.length - 68;
  return runtimeBytecode.slice(0, compareLength) === liveBytecode.slice(2, compareLength + 2);
};

exports.resolveName = resolveName;
exports.codeEqual = codeEqual;