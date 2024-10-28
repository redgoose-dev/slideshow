const prefix = 'slideshow-demo'

export const STORAGE_KEYS = {
  PREFERENCE: 'preference',
  SLIDES: 'slides',
  LANGUAGE: 'language',
  STATES: 'states',
}

/**
 * set storage data
 * @param {string} key
 * @param {object|array} value
 */
export function setStorage(key, value)
{
  window.localStorage.setItem(`${prefix}.${key}`, JSON.stringify(value))
}

/**
 * get storage data
 * @param {string} key
 * @return {object|array}
 */
export function getStorage(key)
{
  try
  {
    const text = window.localStorage.getItem(`${prefix}.${key}`)
    return JSON.parse(text)
  }
  catch (e)
  {
    return undefined
  }
}
