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
