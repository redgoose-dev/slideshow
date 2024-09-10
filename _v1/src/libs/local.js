import { convertPureObject } from './object';

export let baseOptions = {
  preference: undefined,
  tree: [],
};
export let main = null;
export let slides = null;
export let useProps = null;

/**
 * check elements
 */
function checkElements()
{
  if (!document.getElementById('slideshow'))
  {
    const slideshow = document.createElement('div');
    slideshow.setAttribute('id', 'slideshow');
    slideshow.classList.add('slideshow-wrap');
    document.body.append(slideshow);
  }
  if (!document.getElementById('slideshowModal'))
  {
    let modal = document.createElement('div');
    modal.setAttribute('id', 'slideshowModal');
    modal.classList.add('slideshow-wrap');
    document.body.append(modal);
  }
}

/**
 * initialize app
 *
 * @param {object} options
 */
export function initialize(options)
{
  // set base options
  if (options)
  {
    const { tree, preference } = options;
    if (preference) baseOptions.preference = preference;
    if (tree) baseOptions.tree = convertPureObject(tree);
  }
  // set elements
  checkElements();
}

/**
 * setup app
 *
 * @param {any} o
 * @param {object} use
 */
export function setup(o, use)
{
  main = o;
  useProps = use;
}

/**
 * setup slides
 *
 * @param {any} o
 */
export function setupSlides(o)
{
  slides = o;
}
