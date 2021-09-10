"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("vue-i18n/index");

var _en = _interopRequireDefault(require("./en.json"));

var _ko = _interopRequireDefault(require("./ko.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _index.createI18n)({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: _en.default,
    ko: _ko.default
  }
});

exports.default = _default;