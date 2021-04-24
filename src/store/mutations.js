/**
 * change mode
 */
export function changeMode(state, value)
{
  state.mode = value;
}

/**
 * change slide
 */
export function changeSlide(state, value)
{
  let loop = state.preference.slides.loop;
  if (state.slides.length - 1 < value)
  {
    if (!loop) return;
    state.activeSlide = 0;
  }
  else if (value < 0)
  {
    if (!loop) return;
    state.activeSlide = state.slides.length - 1;
  }
  else
  {
    state.activeSlide = Number(value);
  }
}

/**
 * animation control from slides
 */
export function animationControlSlides(state, sw)
{
  state.animatedSlides = sw;
}

/**
 * update preference
 */
export function updatePreference(state, value)
{
  // TODO
  console.log('call preference');
}
