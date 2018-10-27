'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ECDSA_TYPE = exports.ACTION_KEY = exports.MANAGEMENT_KEY = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _Identity = require('universal-login-contracts/build/Identity');

var _Identity2 = _interopRequireDefault(_Identity);

var _universalLoginContracts = require('universal-login-contracts');

var _utils = require('./utils/utils');

var _ethereum = require('./utils/ethereum');

var _RelayerObserver = require('./observers/RelayerObserver');

var _RelayerObserver2 = _interopRequireDefault(_RelayerObserver);

var _BlockchainObserver = require('./observers/BlockchainObserver');

var _BlockchainObserver2 = _interopRequireDefault(_BlockchainObserver);

var _http = require('./utils/http');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EthereumIdentitySDK = function () {
  function EthereumIdentitySDK(relayerUrl, provider, paymentOptions) {
    (0, _classCallCheck3.default)(this, EthereumIdentitySDK);

    this.provider = provider;
    this.relayerUrl = relayerUrl;
    this.relayerObserver = new _RelayerObserver2.default(relayerUrl);
    this.blockchainObserver = new _BlockchainObserver2.default(provider);
    this.defaultPaymentOptions = (0, _extends3.default)({}, _config2.default, paymentOptions);
  }

  (0, _createClass3.default)(EthereumIdentitySDK, [{
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ensName) {
        var privateKey, wallet, managementKey, url, method, body, response, responseJson, contract;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                privateKey = this.generatePrivateKey();
                wallet = new _ethers2.default.Wallet(privateKey, this.provider);
                managementKey = wallet.address;
                url = this.relayerUrl + '/identity';
                method = 'POST';
                body = JSON.stringify({ managementKey: managementKey, ensName: ensName });
                _context.next = 8;
                return (0, _http.fetch)(url, { headers: _http.headers, method: method, body: body });

              case 8:
                response = _context.sent;
                _context.next = 11;
                return response.json();

              case 11:
                responseJson = _context.sent;

                if (!(response.status === 201)) {
                  _context.next = 17;
                  break;
                }

                _context.next = 15;
                return (0, _utils.waitForContractDeploy)(this.provider, _Identity2.default, responseJson.transaction.hash);

              case 15:
                contract = _context.sent;
                return _context.abrupt('return', [privateKey, contract.address]);

              case 17:
                throw new Error('' + response.status);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'addKey',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(to, publicKey, privateKey, transactionDetails) {
        var key, _functions$addKey, data, message;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                key = (0, _utils.addressToBytes32)(publicKey);
                _functions$addKey = new _ethers.Interface(_Identity2.default.interface).functions.addKey(key, _universalLoginContracts.MANAGEMENT_KEY, _universalLoginContracts.ECDSA_TYPE), data = _functions$addKey.data;
                message = {
                  to: to,
                  from: to,
                  value: 0,
                  data: data,
                  gasToken: transactionDetails.gasToken,
                  gasPrice: transactionDetails.gasPrice,
                  gasLimit: transactionDetails.gasLimit
                };
                _context2.next = 5;
                return this.execute(to, message, privateKey);

              case 5:
                return _context2.abrupt('return', _context2.sent);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addKey(_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return addKey;
    }()
  }, {
    key: 'addKeys',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(to, publicKeys, privateKey, transactionDetails) {
        var keys, keyRoles, keyTypes, _functions$addKeys, data, message;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                keys = publicKeys.map(function (publicKey) {
                  return (0, _utils.addressToBytes32)(publicKey);
                });
                keyRoles = new Array(publicKeys.length).fill(_universalLoginContracts.MANAGEMENT_KEY);
                keyTypes = new Array(publicKeys.length).fill(_universalLoginContracts.ECDSA_TYPE);
                _functions$addKeys = new _ethers.Interface(_Identity2.default.interface).functions.addKeys(keys, keyRoles, keyTypes), data = _functions$addKeys.data;
                message = (0, _extends3.default)({}, transactionDetails, {
                  to: to,
                  from: to,
                  value: 0,
                  data: data
                });
                _context3.next = 7;
                return this.execute(to, message, privateKey);

              case 7:
                return _context3.abrupt('return', _context3.sent);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addKeys(_x6, _x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return addKeys;
    }()
  }, {
    key: 'removeKey',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(to, address, privateKey, transactionDetails) {
        var key, _functions$removeKey, data, message;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                key = (0, _utils.addressToBytes32)(address);
                _functions$removeKey = new _ethers.Interface(_Identity2.default.interface).functions.removeKey(key, _universalLoginContracts.MANAGEMENT_KEY), data = _functions$removeKey.data;
                message = {
                  to: to,
                  from: to,
                  value: 0,
                  data: data,
                  gasToken: transactionDetails.gasToken,
                  gasPrice: transactionDetails.gasPrice,
                  gasLimit: transactionDetails.gasLimit
                };
                _context4.next = 5;
                return this.execute(to, message, privateKey);

              case 5:
                return _context4.abrupt('return', _context4.sent);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeKey(_x10, _x11, _x12, _x13) {
        return _ref4.apply(this, arguments);
      }

      return removeKey;
    }()
  }, {
    key: 'editProfile',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(to, profileHash, privateKey, transactionDetails) {
        var _functions$editProfil, data, message;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _functions$editProfil = new _ethers.Interface(_Identity2.default.interface).functions.editProfile(profileHash), data = _functions$editProfil.data;
                message = {
                  to: to,
                  from: to,
                  value: 0,
                  data: data,
                  gasToken: transactionDetails.gasToken,
                  gasPrice: transactionDetails.gasPrice,
                  gasLimit: transactionDetails.gasLimit
                };
                _context5.next = 4;
                return this.execute(to, message, privateKey);

              case 4:
                return _context5.abrupt('return', _context5.sent);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function editProfile(_x14, _x15, _x16, _x17) {
        return _ref5.apply(this, arguments);
      }

      return editProfile;
    }()
  }, {
    key: 'generatePrivateKey',
    value: function generatePrivateKey() {
      return _ethers2.default.Wallet.createRandom().privateKey;
    }
  }, {
    key: 'getRelayerConfig',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var url, method, response, responseJson;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = this.relayerUrl + '/config';
                method = 'GET';
                _context6.next = 4;
                return (0, _http.fetch)(url, { headers: _http.headers, method: method });

              case 4:
                response = _context6.sent;
                _context6.next = 7;
                return response.json();

              case 7:
                responseJson = _context6.sent;

                if (!(response.status === 200)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt('return', responseJson);

              case 10:
                throw new Error('' + response.status);

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getRelayerConfig() {
        return _ref6.apply(this, arguments);
      }

      return getRelayerConfig;
    }()
  }, {
    key: 'execute',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(contractAddress, message, privateKey) {
        var url, method, wallet, nonce, signature, body, response, responseJson, receipt;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                url = this.relayerUrl + '/identity/execution';
                method = 'POST';
                wallet = new _ethers2.default.Wallet(privateKey, this.provider);
                _context7.t0 = parseInt;
                _context7.next = 6;
                return this.getLastExecutionNonce(contractAddress, wallet);

              case 6:
                _context7.t1 = _context7.sent;
                nonce = (0, _context7.t0)(_context7.t1, 10);

                message.nonce = nonce;
                signature = (0, _utils.messageSignature)(wallet, message.to, contractAddress, message.value, message.data, message.nonce, message.gasToken, message.gasPrice, message.gasLimit);
                body = JSON.stringify((0, _extends3.default)({}, this.defaultPaymentOptions, message, { contractAddress: contractAddress, signature: signature }));
                _context7.next = 13;
                return (0, _http.fetch)(url, { headers: _http.headers, method: method, body: body });

              case 13:
                response = _context7.sent;
                _context7.next = 16;
                return response.json();

              case 16:
                responseJson = _context7.sent;

                if (!(response.status === 201)) {
                  _context7.next = 22;
                  break;
                }

                _context7.next = 20;
                return (0, _utils.waitForTransactionReceipt)(this.provider, responseJson.transaction.hash);

              case 20:
                receipt = _context7.sent;
                return _context7.abrupt('return', this.getExecutionNonce(receipt.logs));

              case 22:
                throw new Error('' + response.status);

              case 23:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function execute(_x18, _x19, _x20) {
        return _ref7.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: 'getLastExecutionNonce',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(identityAddress, wallet) {
        var contract;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                contract = new _ethers2.default.Contract(identityAddress, _Identity2.default.interface, wallet);
                _context8.next = 3;
                return contract.executionNonce();

              case 3:
                return _context8.abrupt('return', _context8.sent);

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getLastExecutionNonce(_x21, _x22) {
        return _ref8.apply(this, arguments);
      }

      return getLastExecutionNonce;
    }()
  }, {
    key: 'getExecutionNonce',
    value: function getExecutionNonce(emittedEvents) {
      var _events$ExecutionRequ = (0, _slicedToArray3.default)(new _ethers.Interface(_Identity2.default.interface).events.ExecutionRequested.topics, 1),
          eventTopic = _events$ExecutionRequ[0];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = emittedEvents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var event = _step.value;

          if (event.topics[0] === eventTopic) {
            return _ethers.utils.bigNumberify(event.topics[1]);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      throw 'Event ExecutionRequested not emitted';
    }
  }, {
    key: 'identityExist',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(identity) {
        var identityAddress;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.resolveName(identity);

              case 2:
                identityAddress = _context9.sent;
                _context9.t0 = identityAddress;

                if (!_context9.t0) {
                  _context9.next = 11;
                  break;
                }

                _context9.t1 = _ethereum.codeEqual;
                _context9.t2 = _Identity2.default.runtimeBytecode;
                _context9.next = 9;
                return this.provider.getCode(identityAddress);

              case 9:
                _context9.t3 = _context9.sent;
                _context9.t0 = (0, _context9.t1)(_context9.t2, _context9.t3);

              case 11:
                if (!_context9.t0) {
                  _context9.next = 13;
                  break;
                }

                return _context9.abrupt('return', identityAddress);

              case 13:
                return _context9.abrupt('return', false);

              case 14:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function identityExist(_x23) {
        return _ref9.apply(this, arguments);
      }

      return identityExist;
    }()
  }, {
    key: 'resolveName',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(identity) {
        var ensAddress;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = this.config;

                if (_context10.t0) {
                  _context10.next = 5;
                  break;
                }

                _context10.next = 4;
                return this.getRelayerConfig();

              case 4:
                _context10.t0 = _context10.sent.config;

              case 5:
                this.config = _context10.t0;
                ensAddress = this.config.ensAddress;
                return _context10.abrupt('return', (0, _ethereum.resolveName)(this.provider, ensAddress, identity));

              case 8:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function resolveName(_x24) {
        return _ref10.apply(this, arguments);
      }

      return resolveName;
    }()
  }, {
    key: 'connect',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(identityAddress) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var privateKey, wallet, key, url, method, body, response;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                privateKey = this.generatePrivateKey();
                wallet = new _ethers2.default.Wallet(privateKey, this.provider);
                key = wallet.address;
                url = this.relayerUrl + '/authorisation';
                method = 'POST';
                body = JSON.stringify({ identityAddress: identityAddress, key: key, label: label });
                _context11.next = 8;
                return (0, _http.fetch)(url, { headers: _http.headers, method: method, body: body });

              case 8:
                response = _context11.sent;

                if (!(response.status === 201)) {
                  _context11.next = 11;
                  break;
                }

                return _context11.abrupt('return', privateKey);

              case 11:
                throw new Error('' + response.status);

              case 12:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function connect(_x25) {
        return _ref11.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'denyRequest',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(identityAddress, publicKey) {
        var url, method, body, response;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                url = this.relayerUrl + '/authorisation/' + identityAddress;
                method = 'POST';
                body = JSON.stringify({ identityAddress: identityAddress, key: publicKey });
                _context12.next = 5;
                return (0, _http.fetch)(url, { headers: _http.headers, method: method, body: body });

              case 5:
                response = _context12.sent;

                if (!(response.status === 201)) {
                  _context12.next = 8;
                  break;
                }

                return _context12.abrupt('return', publicKey);

              case 8:
                throw new Error('' + response.status);

              case 9:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function denyRequest(_x27, _x28) {
        return _ref12.apply(this, arguments);
      }

      return denyRequest;
    }()
  }, {
    key: 'fetchPendingAuthorisations',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(identityAddress) {
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt('return', this.relayerObserver.fetchPendingAuthorisations(identityAddress));

              case 1:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function fetchPendingAuthorisations(_x29) {
        return _ref13.apply(this, arguments);
      }

      return fetchPendingAuthorisations;
    }()
  }, {
    key: 'getProfileEdit',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(userAddress) {
        var profileEditEvent, profileEdit, filter, events, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, event, eventArguments;

        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                profileEditEvent = new _ethers.Interface(_Identity2.default.interface).events.ProfileEdit;
                filter = {
                  fromBlock: 0,
                  address: userAddress,
                  topics: [profileEditEvent.topics]
                };
                _context14.next = 4;
                return this.provider.getLogs(filter);

              case 4:
                events = _context14.sent;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context14.prev = 8;

                for (_iterator2 = events[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  event = _step2.value;
                  eventArguments = profileEditEvent.parse(profileEditEvent.topics, event.data);

                  if (eventArguments.customer === userAddress) {
                    profileEdit = eventArguments.profileHash;
                  }
                }
                _context14.next = 16;
                break;

              case 12:
                _context14.prev = 12;
                _context14.t0 = _context14['catch'](8);
                _didIteratorError2 = true;
                _iteratorError2 = _context14.t0;

              case 16:
                _context14.prev = 16;
                _context14.prev = 17;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 19:
                _context14.prev = 19;

                if (!_didIteratorError2) {
                  _context14.next = 22;
                  break;
                }

                throw _iteratorError2;

              case 22:
                return _context14.finish(19);

              case 23:
                return _context14.finish(16);

              case 24:
                return _context14.abrupt('return', profileEdit);

              case 25:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[8, 12, 16, 24], [17,, 19, 23]]);
      }));

      function getProfileEdit(_x30) {
        return _ref14.apply(this, arguments);
      }

      return getProfileEdit;
    }()
  }, {
    key: 'subscribe',
    value: function subscribe(eventType, identityAddress, callback) {
      if (['AuthorisationsChanged'].includes(eventType)) {
        return this.relayerObserver.subscribe(eventType, identityAddress, callback);
      } else if (['KeyAdded', 'KeyRemoved'].includes(eventType)) {
        return this.blockchainObserver.subscribe(eventType, identityAddress, callback);
      }
      throw 'Unknown event type: ' + eventType;
    }
  }, {
    key: 'start',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this.relayerObserver.start();

              case 2:
                _context15.next = 4;
                return this.blockchainObserver.start();

              case 4:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function start() {
        return _ref15.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'stop',
    value: function stop() {
      this.relayerObserver.stop();
      this.blockchainObserver.stop();
    }
  }, {
    key: 'finalizeAndStop',
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this.relayerObserver.finalizeAndStop();

              case 2:
                _context16.next = 4;
                return this.blockchainObserver.finalizeAndStop();

              case 4:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function finalizeAndStop() {
        return _ref16.apply(this, arguments);
      }

      return finalizeAndStop;
    }()
  }]);
  return EthereumIdentitySDK;
}();

exports.default = EthereumIdentitySDK;
exports.MANAGEMENT_KEY = _universalLoginContracts.MANAGEMENT_KEY;
exports.ACTION_KEY = _universalLoginContracts.ACTION_KEY;
exports.ECDSA_TYPE = _universalLoginContracts.ECDSA_TYPE;