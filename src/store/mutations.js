/**
 * change mode
 */
export function changeMode(state, value)
{
  state.mode = value;
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
