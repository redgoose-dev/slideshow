import * as object from '~/libs/object';
import defaults from './defaults';

/**
 * change mode
 *
 * @param {object} state
 * @param {string} value
 */
export function changeMode(state, value)
{
  switch (value)
  {
    case 'thumbnail':
    case 'preference':
      state.mode = value;
      break;
    default:
      state.mode = null;
      break;
  }
}

/**
 * update preference
 */
export function updatePreference(state, value)
{
  state.preference = object.convertPureObject(value);
}

/**
 * update slides
 */
export function updateSlides(state, value)
{
  state.slides = object.convertPureObject(value);
}

/**
 * reset slideshow
 *
 * @param {object} state
 */
export function reset(state)
{
  state.preference = defaults.preference;
  state.slides = defaults.slides;
  state.mode = defaults.mode;
  state.activeSlide = defaults.activeSlide;
  state.keyboardEvent = defaults.keyboardEvent;
}

/**
 * toggle autoplay
 *
 * @param {object} state
 * @param {boolean} sw
 */
export function toggleAutoplay(state, sw = undefined)
{
  sw = (typeof sw === 'boolean') ? sw : !state.preference.slides.autoplay;
  state.preference.slides.autoplay = sw;
}

/**
 * toggle HUD
 *
 * @param {object} state
 * @param {boolean} sw
 */
export function toggleHud(state, sw = undefined)
{
  sw = (typeof sw === 'boolean') ? sw : !state.preference.general.hud;
  state.preference.general.hud = sw;
}

/**
 * change active slide
 *
 * @param {object} state
 * @param {number} n
 */
export function changeActiveSlide(state, n)
{
  state.activeSlide = n;
}

/**
 * use keyboard event
 *
 * @param {object} state
 * @param {boolean} sw
 */
export function useKeyboardEvent(state, sw)
{
  state.keyboardEvent = sw;
}
