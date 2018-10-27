"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthorisationService = function () {
  function AuthorisationService() {
    (0, _classCallCheck3.default)(this, AuthorisationService);

    this.pendingAuthorisations = {};
    this.index = 0;
  }

  (0, _createClass3.default)(AuthorisationService, [{
    key: "addRequest",
    value: function addRequest(request) {
      var identityAddress = request.identityAddress,
          key = request.key,
          label = request.label;
      var index = this.index;

      var pendingAuthorisation = { key: key, label: label, index: index };
      this.pendingAuthorisations[identityAddress] = this.pendingAuthorisations[identityAddress] || [];
      this.pendingAuthorisations[identityAddress].push(pendingAuthorisation);
      this.index++;
    }
  }, {
    key: "getPendingAuthorisations",
    value: function getPendingAuthorisations(identityAddress) {
      return this.pendingAuthorisations[identityAddress] || [];
    }
  }, {
    key: "removeRequest",
    value: function removeRequest(identityAddress, key) {
      var lowKey = key.toLowerCase();
      this.pendingAuthorisations[identityAddress] = this.pendingAuthorisations[identityAddress] || [];
      this.pendingAuthorisations[identityAddress] = this.pendingAuthorisations[identityAddress].filter(function (element) {
        return element.key.toLowerCase() !== lowKey;
      });
    }
  }]);
  return AuthorisationService;
}();

exports.default = AuthorisationService;