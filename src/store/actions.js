import defaults from '~/store/defaults';
import * as object from '~/libs/object';
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
  context.commit('updatePreference', pref);
  storage.set('preference', pref);
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
 * change tree
 *
 * @param {object} context
 * @param {object} tree
 */
export function changeTree(context, tree)
{
  try
  {
    object.checkSlideItems(tree);
    context.commit('updateTree', tree);
    storage.set('tree', tree);
  }
  catch(e)
  {
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
export function changeSlides(context, newSlides)
{
  context.commit('updateSlides', newSlides);
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
export async function reset(context)
{
  const preference = object.convertPureObject(defaults.preference);
  const tree = object.convertPureObject(defaults.tree);
  const slides = object.convertPureObject(defaults.slides);
  await context.dispatch('changePreference', preference);
  await context.dispatch('changeTree', tree);
  await context.dispatch('changeSlides', slides);
  context.commit('updateActiveSlide', preference.slides.initialNumber);
  context.commit('updateUseKeyboardEvent', true);
  context.commit('updateMode', null);
}
