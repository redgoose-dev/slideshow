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
 * change tree
 *
 * @param {object} context
 * @param {object} tree
 */
export function changeTree(context, tree)
{
  try
  {
    let keys = Object.keys(tree);
    for (let i=0; i<keys.length; i++)
    {
      if (typeof tree[keys[i]] === 'string') continue;
      if (!object.checkSlideItems(tree[keys[i]]))
      {
        throw new Error(`error item.${keys[i]}`);
      }
    }
    context.commit('updateTree', tree);
    storage.set('tree', tree);
  }
  catch(e)
  {
    if (window.dev) console.warn(e.message);
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
