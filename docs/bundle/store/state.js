"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _object = require("~/libs/object");

var _defaults = _interopRequireDefault(require("~/store/defaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set state
var state = (0, _object.convertPureObject)(_defaults.default);
var _default = state;
exports.default = _default;