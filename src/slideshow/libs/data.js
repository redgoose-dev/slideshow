import { TRANSITION_TYPE, CAPTION_ANIMATION_TYPE, IMAGE_TYPE } from './keywords.js'

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
  if (!Object.values(IMAGE_TYPE).includes(src.style.imageType))
  {
    src.style.imageType = IMAGE_TYPE.NONE
  }
  return src
}

/**
 * slides 데이터 검사
 * @param {object[]} arr
 * @throws {Error}
 */
export function checkSlides(arr)
{
  if (!Array.isArray(arr)) throw new Error('slides data is not array')
  if (!arr.length) throw new Error('EMPTY_SLIDES')
  arr.forEach((o) => {
    if (!o.src) throw new Error('slide data is not valid')
  })
}
