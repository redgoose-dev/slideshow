import * as object from '~/libs/object';
import { defaults } from './resource';
import * as storage from '~/libs/storage';

/**
 * change mode
 * 'null,thumbnail,preference,guide'
 *
 * @param {object} context
 * @param {string} value
 */
export function changeMode(context, value)
{
  if (context.state.mode === value) return;
  switch (value)
  {
    case 'thumbnail':
    case 'preference':
    case 'guide':
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
export function changePreference(context, value)
{
  const pref = object.convertPureObject(value);
  storage.set('preference', pref);
  context.commit('updatePreference', pref);
}

/**
 * change autoplay
 * @param {object} context
 * @param {boolean} sw
 */
export function changeAutoplay(context, sw = undefined)
{
  sw = sw === undefined ? !context.state.preference.slides.autoplay : sw;
  context.commit('updateValueInPreference', {
    map: [ 'slides', 'autoplay' ],
    value: sw,
  });
}

/**
 * change hud
 *
 * @param {object} context
 * @param {boolean} sw
 */
export function changeHud(context, sw = undefined)
{
  sw = sw === undefined ? !context.state.preference.general.hud : sw;
  context.commit('updateValueInPreference', {
    map: [ 'general', 'hud' ],
    value: sw,
  });
}

/**
 * change slides
 *
 * @param {object} context
 * @param {object[]} newSlides
 */
export function changeSlides(context, newSlides)
{
  const slides = object.convertPureObject(newSlides);
  storage.set('slides', slides);
  context.commit('updateSlides', slides);
}

/**
 * change active slide
 *
 * @param {object} context
 * @param {number} active
 */
export function changeActiveSlide(context, active)
{
  if (typeof active !== 'number') return;
  context.commit('updateActiveSlide', active);
}

/**
 * reset
 *
 * @param {object} context
 */
export function reset(context)
{
  const preference = object.convertPureObject(defaults.preference);
  const slides = object.convertPureObject(defaults.slides);

  // update storage
  storage.set('preference', preference);
  storage.set('slides', slides);
  // update store
  context.commit('updatePreference', preference);
  context.commit('updateSlides', slides);
  context.commit('updateActiveSlide', preference.slides.initialNumber);
  context.commit('updateUseKeyboardEvent', true);
  context.commit('updateMode', null);
}
