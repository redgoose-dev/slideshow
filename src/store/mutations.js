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
  // TODO
  console.log('call updatePreference in mutations', value);
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
