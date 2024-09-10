import { writable } from 'svelte/store'
import { preference as defaultPreference, tree as defaultTree } from '../res/defaults.js'
import { checkPreference, checkTree } from '../libs/data.js'
import { cloneObject, deepMerge } from '../libs/util.js'

// preference store
function preferenceStore()
{
  const { subscribe, set, update } = writable({})
  return {
    subscribe,
    // set: (newValue) => {
    //   console.log('call set()')
    //   set(newValue)
    // },
    // update: (newValue => update((oldValue) => {
    //   if (newValue === oldValue) return oldValue
    //   return newValue
    // })),
    setup(src)
    {
      const clonedPreference = cloneObject(defaultPreference)
      const preference = deepMerge(clonedPreference, src)
      checkPreference(preference)
      set(preference)
    },
  }
}

// tree store
function treeStore()
{
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    // set: (newValue) => {
    //   set(newValue)
    // },
    // update: (newValue => update((oldValue) => {
    //   if (newValue === oldValue) return oldValue
    //   return newValue
    // })),
    setup(src)
    {
      const tree = cloneObject((src?.length > 0) ? src : defaultTree)
      checkTree(tree)
      set(tree)
    }
  }
}

// exports
export const preference = preferenceStore()
export const tree = treeStore()
