"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeMode = changeMode;
exports.changePreference = changePreference;
exports.changeAutoplay = changeAutoplay;
exports.changeHud = changeHud;
exports.changeTree = changeTree;
exports.changeSlides = changeSlides;
exports.changeActiveSlide = changeActiveSlide;
exports.reset = reset;
exports.changeGroup = changeGroup;

var _defaults = _interopRequireDefault(require("~/store/defaults"));

var object = _interopRequireWildcard(require("~/libs/object"));

var storage = _interopRequireWildcard(require("~/libs/storage"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * change mode
 * 'null,thumbnail,preference,guide'
 *
 * @param {object} context
 * @param {string} value
 */
function changeMode(context, value) {
  if (context.state.mode === value) return;

  switch (value) {
    case 'preference':
    case 'group':
    case 'thumbnail':
      context.commit('updateMode', value);
      break;

    default:
      context.commit('updateMode', null);
      break;
  }
}
/**
 * change preference
 */


function changePreference(context, value) {
  var pref = object.convertPureObject(value);
  context.commit('updatePreference', pref);
  storage.set('preference', pref);
}
/**
 * change autoplay
 * @param {object} context
 * @param {boolean} sw
 */


function changeAutoplay(context) {
  var sw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (!context.state.preference.slides.autoplay) return;
  sw = sw === undefined ? !context.state.autoplay : sw;
  context.commit('updateAutoplay', sw);
}
/**
 * change hud
 *
 * @param {object} context
 * @param {boolean} sw
 */


function changeHud(context) {
  var sw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  sw = sw === undefined ? !context.state.preference.general.hud : sw;
  context.commit('updateValueInPreference', {
    map: ['general', 'hud'],
    value: sw
  });
}
/**
 * change tree
 *
 * @param {object} context
 * @param {object} tree
 */


function changeTree(context, tree) {
  try {
    object.checkSlideItems(tree);
    context.commit('updateTree', tree);
    storage.set('tree', tree);
  } catch (e) {
    if (window.dev) console.error(e.message);
    throw new Error(e.message);
  }
}
/**
 * change slides
 *
 * @param {object} context
 * @param {object[]} newSlides
 */


function changeSlides(context, newSlides) {
  context.commit('updateSlides', newSlides);
}
/**
 * change active slide
 *
 * @param {object} context
 * @param {number} active
 */


function changeActiveSlide(context, active) {
  if (typeof active !== 'number') return;
  context.commit('updateActiveSlide', active);
}
/**
 * reset
 *
 * @param {object} context
 */


function reset(_x) {
  return _reset.apply(this, arguments);
}
/**
 * change group
 *
 * @param context
 * @param {string} key
 */


function _reset() {
  _reset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(context) {
    var preference, tree, slides;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            preference = object.convertPureObject(_defaults.default.preference);
            tree = object.convertPureObject(_defaults.default.tree);
            slides = object.convertPureObject(_defaults.default.slides);
            _context.next = 5;
            return context.dispatch('changePreference', preference);

          case 5:
            _context.next = 7;
            return context.dispatch('changeTree', tree);

          case 7:
            _context.next = 9;
            return context.dispatch('changeSlides', slides);

          case 9:
            context.commit('updateActiveSlide', preference.slides.initialNumber);
            context.commit('updateUseKeyboardEvent', true);
            context.commit('updateMode', null);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _reset.apply(this, arguments);
}

function changeGroup(context, key) {
  context.commit('updateGroup', key);
  storage.set('group', key);
}