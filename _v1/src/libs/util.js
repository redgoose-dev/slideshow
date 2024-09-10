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

/**
 * control fullscreen
 *
 * @param {boolean} sw
 */
export function fullscreen(sw)
{
  const doc = window.document;
  const docEl = doc.documentElement;
  if (sw)
  {
    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    requestFullScreen.call(docEl);
  }
  else
  {
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    cancelFullScreen.call(doc);
  }
}

/**
 * get value from type
 * 타입으로 값 가져오기
 *
 * @param {string} type
 * @param {string} value
 * @return {any}
 */
export function getValueFromType(type, value)
{
  switch (type)
  {
    case 'boolean':
      return (value === 'true');
    case 'number':
      return Number(value);
    default:
      return value;
  }
}

/**
 * get api data
 *
 * @param {string} url
 * @param {boolean} parse
 * @return {Promise}
 * @throws {Error}
 */
export function getApiData(url, parse = true)
{
  return new Promise((resolve, reject) => {
    try
    {
      const httpRequest = new XMLHttpRequest();
      if (!httpRequest) throw new Error('no XMLHttpRequest');
      httpRequest.onreadystatechange = () => {
        try
        {
          if (httpRequest.readyState !== XMLHttpRequest.DONE) return;
          if (httpRequest.status === 200)
          {
            resolve(parse ? JSON.parse(httpRequest.responseText) : httpRequest.responseText);
          }
          else
          {
            throw new Error('failed request url');
          }
        }
        catch(e)
        {
          reject(new Error(e.message));
        }
      };
      httpRequest.open('get', url);
      httpRequest.send();
    }
    catch(e)
    {
      reject(new Error(e.message || 'failed request url'));
    }
  });
}

/**
 * get file data
 *
 * @param {File} file
 * @param {boolean} parse
 * @return {Promise}
 * @throws {Error}
 */
export function getFileData(file, parse = true)
{
  return new Promise((resolve, reject) => {
    try
    {
      if (!(file)) throw new Error('no file');
      const reader = new FileReader();
      reader.onload = e => {
        try
        {
          resolve(parse ? JSON.parse(e.target.result) : e.target.result);
        }
        catch(e)
        {
          reject(new Error(e.message || 'failed get file data'));
        }
      };
      reader.readAsText(file);
    }
    catch(e)
    {
      reject(new Error(e.message || 'failed get file data'));
    }
  });
}
