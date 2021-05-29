export let main = null;
export let slides = null;
export let useProps = null;

/**
 * setup app
 */
export function setup(o, use)
{
  main = o;
  useProps = use;
}

/**
 * setup slides
 */
export function setupSlides(o)
{
  slides = o;
}
