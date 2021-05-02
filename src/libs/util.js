/**
 * sleep (delay tool)
 *
 * @param {Number} ms
 * @return {Promise}
 */
export function sleep(ms = 1000)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * convert pure object
 * `proxy`, `observable`객체를 순수한 객체로 변환해준다.
 *
 * @param {object|Array} src
 * @return {object|Array}
 */
export function convertPureObject(src)
{
  if (!src) return null;
  return JSON.parse(JSON.stringify(src));
}

/**
 * initial custom event
 * 중복되는 `dom`에다 여러 이벤트를 넣고 싶을때(특히 window) 유니크한 이름으로 이벤트를 만들 수 있도록 커스텀 이벤트를 만들어서 사용할때 사용한다.
 */
export function initCustomEvent()
{
  const events = {
    on(event, cb, opts)
    {
      if (!this.namespaces) this.namespaces = {};
      this.namespaces[event] = cb;
      const options = opts || false;
      this.addEventListener(event.split('.')[0], cb, options);
      return this;
    },
    off(event)
    {
      if (!(this.namespaces && this.namespaces[event])) return;
      this.removeEventListener(event.split('.')[0], this.namespaces[event]);
      delete this.namespaces[event];
      return this;
    },
  };
  window.on = document.on = Element.prototype.on = events.on;
  window.off = document.off = Element.prototype.off = events.off;
}

/**
 * set area true
 *
 * @param {Array} src
 * @param {number} total
 * @param {number} current
 * @param {boolean} loop
 * @return {Array}
 */
export function setAreaTrue(src, total, current, loop)
{
  function setTrue(sw)
  {
    if (sw)
    {
      if (src[current + 1] !== undefined) src[current + 1] = true;
    }
    else
    {
      if (src[current - 1] !== undefined) src[current - 1] = true;
    }
  }
  src = convertPureObject(src);
  if (loop)
  {
    if (current === 0)
    {
      src[total - 1] = true;
      setTrue(true);
    }
    else if (current === total - 1)
    {
      src[0] = true;
      setTrue(false);
    }
    else
    {
      setTrue(true);
      setTrue(false);
    }
  }
  else
  {
    setTrue(true);
    setTrue(false);
  }
  return src;
}