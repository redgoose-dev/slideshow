/**
 * check nested keys in object
 *
 * @param {object} src
 * @param {string} type
 * @param {array} keys
 * @return {boolean}
 */
function checkNestedKeys(src, type, keys)
{
  for (let i = 0; i < keys.length; i++)
  {
    if (!src || !src.hasOwnProperty(keys[i])) return false;
    src = src[keys[i]];
  }
  switch (type)
  {
    case 'array':
      if (!Array.isArray(src)) return false;
      break;
    case 'string':
      if (typeof src !== 'string') return false;
      break;
    case 'number':
      if (typeof src !== 'number') return false;
      break;
    case 'boolean':
      if (typeof src !== 'boolean') return false;
      break;
    case 'object':
      if (typeof src !== 'object') return false;
      break;
  }
  return true;
}

/**
 * convert pure object
 * `proxy`, `observable`객체를 순수한 객체로 변환해준다.
 *
 * @param {Object|Array} src
 * @return
 */
export function convertPureObject(src)
{
  if (!src) return null;
  return JSON.parse(JSON.stringify(src));
}

/**
 * check slide items
 *
 * @param {array} items
 * @return {boolean}
 */
export function checkSlideItems(items)
{
  try
  {
    if (!(items && Array.isArray(items) && items.length > 0))
    {
      throw new Error('Invalid file');
    }
    items.forEach(item => {
      if (typeof item !== 'object') throw 'not object item';
      const checklist = [
        checkNestedKeys(item, 'string', ['src']),
        checkNestedKeys(item, 'string', ['title']),
        checkNestedKeys(item, 'string', ['description']),
      ];
      if (checklist.indexOf(false) > -1) throw 'not property in item';
    });
    return true;
  }
  catch(e)
  {
    return false;
  }
}

/**
 * check preference data
 */
export function checkPreference(item)
{
  if (!item) return false;
  if (!(item.general && item.slides && item.style && item.keyboard)) return false;
  const checklist = [
    // general
    checkNestedKeys(item, 'string', ['general', 'name']),
    checkNestedKeys(item, 'string', ['general', 'description']),
    checkNestedKeys(item, 'string', ['general', 'language']),
    checkNestedKeys(item, 'boolean', ['general', 'hud']),
    checkNestedKeys(item, 'boolean', ['general', 'hoverVisibleHud']),
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'menu']),
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'thumbnail']),
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'caption']),
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'controller']),
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'paginate']),
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'autoplay']),
    // slides
    checkNestedKeys(item, 'number', ['slides', 'initialNumber']),
    checkNestedKeys(item, 'string', ['slides', 'animationType']),
    checkNestedKeys(item, 'number', ['slides', 'animationSpeed']),
    checkNestedKeys(item, 'string', ['slides', 'captionAnimationType']),
    checkNestedKeys(item, 'number', ['slides', 'captionAnimationSpeed']),
    checkNestedKeys(item, 'boolean', ['slides', 'autoplay']),
    checkNestedKeys(item, 'number', ['slides', 'autoplayDelay']),
    checkNestedKeys(item, 'boolean', ['slides', 'autoplayDirection']),
    checkNestedKeys(item, 'boolean', ['slides', 'autoplayPauseOnHover']),
    checkNestedKeys(item, 'boolean', ['slides', 'loop']),
    checkNestedKeys(item, 'boolean', ['slides', 'swipe']),
    // style
    checkNestedKeys(item, 'string', ['style', 'screenColor']),
    checkNestedKeys(item, 'string', ['style', 'imageType']),
    checkNestedKeys(item, 'array', ['style', 'imageScale']),
    checkNestedKeys(item, 'number', ['style', 'captionScale']),
    checkNestedKeys(item, 'array', ['style', 'captionPosition']),
    // keyboard
    checkNestedKeys(item, 'boolean', ['keyboard', 'enabled']),
  ];
  return !(checklist.indexOf(false) > -1);
}
