'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ethers = require('ethers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENSService = function () {
  function ENSService(ensAddress, ensRegistrars) {
    (0, _classCallCheck3.default)(this, ENSService);

    this.ensRegistrars = ensRegistrars;
    this.ensAddress = ensAddress;
  }

  (0, _createClass3.default)(ENSService, [{
    key: 'findRegistrar',
    value: function findRegistrar(ensName) {
      var _get2ndLevelDomainFor = this.get2ndLevelDomainForm(ensName),
          _get2ndLevelDomainFor2 = (0, _slicedToArray3.default)(_get2ndLevelDomainFor, 2),
          domain = _get2ndLevelDomainFor2[1];

      return this.ensRegistrars[domain];
    }
  }, {
    key: 'get2ndLevelDomainForm',
    value: function get2ndLevelDomainForm(ensName) {
      var labels = ensName.split('.');
      var length = labels.length;

      var label = labels.slice(0, length - 2).join('.');
      var domain = labels.slice(length - 2, length).join('.');
      return [label, domain];
    }
  }, {
    key: 'argsFor',
    value: function argsFor(ensName) {
      var _get2ndLevelDomainFor3 = this.get2ndLevelDomainForm(ensName),
          _get2ndLevelDomainFor4 = (0, _slicedToArray3.default)(_get2ndLevelDomainFor3, 2),
          label = _get2ndLevelDomainFor4[0],
          domain = _get2ndLevelDomainFor4[1];

      var hashLabel = _ethers.utils.keccak256(_ethers.utils.toUtf8Bytes(label));
      var node = _ethers.utils.namehash(label + '.' + domain);
      var registrarConfig = this.findRegistrar(ensName);
      var resolverAddress = registrarConfig.resolverAddress;
      var registrarAddress = registrarConfig.registrarAddress;

      return [hashLabel, ensName, node, this.ensAddress, registrarAddress, resolverAddress];
    }
  }]);
  return ENSService;
}();

exports.default = ENSService;