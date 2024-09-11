/**
 * delay tool
 * @param {number} delay
 * @return {Promise}
 */
export function sleep(delay = 3000)
{
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * clone object
 * @param {object|array} src
 * @return {object|array}
 */
export function cloneObject(src)
{
  try
  {
    if (!src) throw new Error('no src')
    try
    {
      return structuredClone(src)
    }
    catch (e)
    {
      return JSON.parse(JSON.stringify(src))
    }
  }
  catch(_)
  {
    return null
  }
}

/**
 * deep merge
 * @param {object} object1
 * @param {object} object2
 * @return {object}
 */
export function deepMerge(object1, object2)
{
  let result = { ...object1 }
  for (let key in object2)
  {
    if (object2.hasOwnProperty(key))
    {
      if (typeof object2[key] === 'object' && object2[key] !== null && object1[key])
      {
        result[key] = deepMerge(object1[key], object2[key])
      }
      else
      {
        result[key] = object2[key]
      }
    }
  }
  return result
}
