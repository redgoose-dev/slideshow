import { TRANSITION_TYPE, CAPTION_ANIMATION_TYPE, DISPLAY_THEME, IMAGE_TYPE } from './keywords.js'

/**
 * preference 데이터 검사하거나 조정하기
 * @param {object} src
 * @throws {Error}
 */
export function checkPreference(src)
{
  if (!Object.values(TRANSITION_TYPE).includes(src.slides.transitionType))
  {
    src.slides.transitionType = TRANSITION_TYPE.NONE
  }
  if (!Object.values(CAPTION_ANIMATION_TYPE).includes(src.slides.captionAnimationType))
  {
    src.slides.captionAnimationType = CAPTION_ANIMATION_TYPE.NONE
  }
  if (!Object.values(DISPLAY_THEME).includes(src.style.displayTheme))
  {
    src.style.displayTheme = DISPLAY_THEME.SYSTEM
  }
  if (!Object.values(IMAGE_TYPE).includes(src.style.imageType))
  {
    src.style.imageType = IMAGE_TYPE.NONE
  }
  return src
}

/**
 * slides 데이터 검사
 * @param {object[]} src
 * @throws {Error}
 */
export function checkSlides(src)
{
  // TODO: 데이터가 올바른지 검사하기
  try
  {
    //
  }
  catch (e)
  {
    //
  }
}
