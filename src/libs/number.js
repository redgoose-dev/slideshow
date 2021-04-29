/**
 * move number
 *
 * @param {number} total
 * @param {number} value
 * @param {boolean} loop
 * @return {number}
 */
export function move(total = 0, value = 0, loop = true)
{
  if (total - 1 < value)
  {
    if (!loop) return total - 1;
    return 0;
  }
  else if (value < 0)
  {
    if (!loop) return 0;
    return total - 1;
  }
  else
  {
    return Number(value);
  }
}
