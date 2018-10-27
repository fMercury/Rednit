'use strict';

var _relayer = require('./relayer');

var _relayer2 = _interopRequireDefault(_relayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var config = require('./config/relayer');

var relayer = new _relayer2.default(config);
relayer.start();