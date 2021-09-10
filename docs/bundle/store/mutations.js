"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMode = updateMode;
exports.updateActiveSlide = updateActiveSlide;
exports.updateUseKeyboardEvent = updateUseKeyboardEvent;
exports.updatePreference = updatePreference;
exports.updateValueInPreference = updateValueInPreference;
exports.updateTree = updateTree;
exports.updateSlides = updateSlides;
exports.updateGroup = updateGroup;
exports.updateAutoplay = updateAutoplay;
exports.updateUsePreference = updateUsePreference;

/**
 * change mode
 */
function updateMode(state, value) {
  state.mode = value;
}
/**
 * update active slide
 */


function updateActiveSlide(state, n) {
  state.activeSlide = n;
}
/**
 * use keyboard event
 */


function updateUseKeyboardEvent(state, sw) {
  state.keyboardEvent = sw;
}
/**
 * update preference
 */


function updatePreference(state, value) {
  state.preference = value;
}
/**
 * update value in preference
 */


function updateValueInPreference(state, src) {
  var value = src.value,
      map = src.map;
  if (!(map && Array.isArray(map))) return;

  switch (map.length) {
    case 1:
      state.preference[map[0]] = value;
      break;

    case 2:
      state.preference[map[0]][map[1]] = value;
      break;

    case 3:
      state.preference[map[0]][map[1]][map[2]] = value;
      break;
  }
}

function updateTree(state, value) {
  state.tree = value;
}
/**
 * update slides
 */


function updateSlides(state, value) {
  state.slides = value;
}
/**
 * update group
 */


function updateGroup(state, value) {
  state.group = value;
}

function updateAutoplay(state, value) {
  state.autoplay = value;
}
/**
 * update use preference
 * ex) `store.commit('updateUsePreference', [ 'data', false ]);`
 *
 * @param state
 * @param {array} value
 */


function updateUsePreference(state, value) {
  switch (value[0]) {
    case 'slides':
    case 'style':
    case 'data':
    case 'keyboard':
    case 'information':
      state.usePreference[value[0]] = Boolean(value[1]);
      break;
  }
}