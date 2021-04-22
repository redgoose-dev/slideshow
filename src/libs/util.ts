/**
 * sleep (delay tool)
 */
export function sleep(ms: number = 1000)
{
  return new Promise(resolve => setTimeout(resolve, ms));
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
