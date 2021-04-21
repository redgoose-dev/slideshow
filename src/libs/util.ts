/**
 * sleep (delay tool)
 */
export function sleep(ms: number = 1000)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * initial custom event
 * 중복되는 `dom`에다 여러 이벤트를 넣고 싶을때(특히 window) 유니크한 이름으로 이벤트를 만들 수 있도록 커스텀 이벤트를 만들어서 사용할때 사용한다.
 */
export function initCustomEvent(): void
{
  const events: any = {
    on(event: string, cb: Function, opts: object)
    {
      if (!this.namespaces) this.namespaces = {};
      this.namespaces[event] = cb;
      const options = opts || false;
      this.addEventListener(event.split('.')[0], cb, options);
      return this;
    },
    off(event: string)
    {
      if (!(this.namespaces && this.namespaces[event])) return;
      this.removeEventListener(event.split('.')[0], this.namespaces[event]);
      delete this.namespaces[event];
      return this;
    },
  };
  (window as any).on = (document as any).on = (Element.prototype as any).on = events.on;
  (window as any).off = (document as any).off = (Element.prototype as any).off = events.off;
}

/**
 * change screen mode
 */
export function changeScreenMode(theme: string): void
{
  if (!theme) return;
  const $html = document.querySelector('html') as HTMLElement;
  $html.dataset['color-mode'] = theme;
}
