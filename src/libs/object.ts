/**
 * convert pure object
 * `proxy`, `observable`객체를 순수한 객체로 변환해준다.
 */
export function convertPureObject(src: object|Array<unknown>): unknown
{
  if (!src) return null;
  return JSON.parse(JSON.stringify(src));
}
