/**
 * change mode
 */
export function updateMode(state, value)
{
  state.mode = value;
}

/**
 * update active slide
 */
export function updateActiveSlide(state, n)
{
  state.activeSlide = n;
}

/**
 * use keyboard event
 */
export function updateUseKeyboardEvent(state, sw)
{
  state.keyboardEvent = sw;
}

/**
 * update preference
 */
export function updatePreference(state, value)
{
  state.preference = value;
}

/**
 * update value in preference
 */
export function updateValueInPreference(state, src)
{
  const { value, map } = src;
  if (!(map && Array.isArray(map))) return;
  switch (map.length)
  {
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

/**
 * update slides
 */
export function updateSlides(state, value)
{
  state.slides = value;
}
