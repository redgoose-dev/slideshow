/**
 * 2 digit
 *
 * @param {Number|String} day
 * @return {String}
 */
export function twoDigit(day)
{
  return `0${day}`.slice(-2);
}

/**
 * valid url
 *
 * @param {string} str
 * @return {boolean}
 */
export function validUrl(str)
{
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

/**
 * object to string
 *
 * @param {object|array} src
 * @return {string}
 */
export function objectToString(src)
{
  return JSON.stringify(src, null, 2);
}
