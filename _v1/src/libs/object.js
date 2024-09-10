/**
 * check nested keys in object
 *
 * @param {object} src
 * @param {string} type
 * @param {array} keys
 * @throws {Error}
 */
function checkNestedKeys(src, type, keys)
{
  const address = keys.join('.');
  const message_errorType = `The type(${address}) is wrong.`;
  for (let i = 0; i < keys.length; i++)
  {
    if (!src || !src.hasOwnProperty(keys[i]))
    {
      throw new Error(`The item(${address}) is missing or invalid.`);
    }
    src = src[keys[i]];
  }
  switch (type)
  {
    case 'array':
      if (!Array.isArray(src)) throw new Error(message_errorType);
      break;
    case 'string':
      if (typeof src !== 'string') throw new Error(message_errorType);
      break;
    case 'number':
      if (typeof src !== 'number') throw new Error(message_errorType);
      break;
    case 'boolean':
      if (typeof src !== 'boolean') throw new Error(message_errorType);
      break;
    case 'object':
      if (typeof src !== 'object') throw new Error(message_errorType);
      break;
  }
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
  try
  {
    return JSON.parse(JSON.stringify(src));
  }
  catch(_)
  {
    return null;
  }
}

/**
 * check slide items
 *
 * @param {object[]} items
 * @return {boolean}
 * @throws {Error}
 */
export function checkSlideItems(items)
{
  if (!(items && typeof items === 'object')) throw new Error('Invalid slides data');
  for (let i=0; i<items.length; i++)
  {
    if (!(items[i] && items[i].src))
    {
      throw new Error(`The item[${i}] of this item is invalid.`);
    }
  }
}

/**
 * check tree
 *
 * @param {object} src
 * @return {boolean}
 * @throws {Error}
 */
export function checkTree(src)
{
  if (!src) throw new Error('No value');
  if (typeof src !== 'object') throw new Error('This value is not an object.');
  let keys = Object.keys(src);
  for (let i=0; i<keys.length; i++)
  {
    // for address
    if (typeof src[keys[i]].slides === 'string') continue;
    if (!Array.isArray(src[keys[i]].slides))
    {
      throw new Error(`not array item: item.${keys[i]}`);
    }
    if (src[keys[i]].length <= 0) continue;
    checkSlideItems(src[keys[i]]);
  }
  return true;
}

/**
 * check preference data
 */
export function checkPreference(item)
{
  try
  {
    if (!item) throw new Error('no item');
    if (!(item.general && item.slides && item.style && item.keyboard)) throw new Error('no item property');
    // general
    checkNestedKeys(item, 'string', ['general', 'language']);
    checkNestedKeys(item, 'boolean', ['general', 'hud']);
    checkNestedKeys(item, 'boolean', ['general', 'hoverVisibleHud']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'menu']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'caption']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'controller']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'paginate']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'autoplay']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'group']);
    // slides
    checkNestedKeys(item, 'number', ['slides', 'initialNumber']);
    checkNestedKeys(item, 'string', ['slides', 'animationType']);
    checkNestedKeys(item, 'number', ['slides', 'animationSpeed']);
    checkNestedKeys(item, 'string', ['slides', 'captionAnimationType']);
    checkNestedKeys(item, 'number', ['slides', 'captionAnimationSpeed']);
    checkNestedKeys(item, 'boolean', ['slides', 'autoplay']);
    checkNestedKeys(item, 'number', ['slides', 'autoplayDelay']);
    checkNestedKeys(item, 'boolean', ['slides', 'autoplayDirection']);
    checkNestedKeys(item, 'boolean', ['slides', 'autoplayPauseOnHover']);
    checkNestedKeys(item, 'boolean', ['slides', 'loop']);
    checkNestedKeys(item, 'boolean', ['slides', 'swipe']);
    // style
    checkNestedKeys(item, 'string', ['style', 'screenColor']);
    checkNestedKeys(item, 'string', ['style', 'imageType']);
    checkNestedKeys(item, 'array', ['style', 'imageScale']);
    checkNestedKeys(item, 'number', ['style', 'captionScale']);
    checkNestedKeys(item, 'array', ['style', 'captionPosition']);
    // keyboard
    checkNestedKeys(item, 'boolean', ['keyboard', 'enabled']);
    return true;
  }
  catch(e)
  {
    if (window.dev) console.error(e.message);
    return false;
  }
}
