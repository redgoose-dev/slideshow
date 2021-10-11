var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { reactive, computed, defineAsyncComponent, openBlock, createElementBlock, createBlock, resolveDynamicComponent, unref, ref, normalizeClass, normalizeStyle, createElementVNode, createCommentVNode, Fragment, renderList, createVNode, pushScopeId, popScopeId, onMounted, watch, toDisplayString, onUnmounted, Teleport, getCurrentInstance } from "vue";
import { createStore } from "vuex";
import * as vueI18n from "vue-i18n/index";
function checkNestedKeys(src, type, keys) {
  const address = keys.join(".");
  const message_errorType = `The type(${address}) is wrong.`;
  for (let i = 0; i < keys.length; i++) {
    if (!src || !src.hasOwnProperty(keys[i])) {
      throw new Error(`The item(${address}) is missing or invalid.`);
    }
    src = src[keys[i]];
  }
  switch (type) {
    case "array":
      if (!Array.isArray(src))
        throw new Error(message_errorType);
      break;
    case "string":
      if (typeof src !== "string")
        throw new Error(message_errorType);
      break;
    case "number":
      if (typeof src !== "number")
        throw new Error(message_errorType);
      break;
    case "boolean":
      if (typeof src !== "boolean")
        throw new Error(message_errorType);
      break;
    case "object":
      if (typeof src !== "object")
        throw new Error(message_errorType);
      break;
  }
}
function convertPureObject$1(src) {
  if (!src)
    return null;
  try {
    return JSON.parse(JSON.stringify(src));
  } catch (_) {
    return null;
  }
}
function checkSlideItems(items) {
  if (!(items && typeof items === "object"))
    throw new Error("Invalid slides data");
  for (let i = 0; i < items.length; i++) {
    if (!(items[i] && items[i].src)) {
      throw new Error(`The item[${i}] of this item is invalid.`);
    }
  }
}
function checkTree(src) {
  if (!src)
    throw new Error("No value");
  if (typeof src !== "object")
    throw new Error("This value is not an object.");
  let keys = Object.keys(src);
  for (let i = 0; i < keys.length; i++) {
    if (typeof src[keys[i]].slides === "string")
      continue;
    if (!Array.isArray(src[keys[i]].slides)) {
      throw new Error(`not array item: item.${keys[i]}`);
    }
    if (src[keys[i]].length <= 0)
      continue;
    checkSlideItems(src[keys[i]]);
  }
  return true;
}
function checkPreference(item) {
  try {
    if (!item)
      throw new Error("no item");
    if (!(item.general && item.slides && item.style && item.keyboard))
      throw new Error("no item property");
    checkNestedKeys(item, "string", ["general", "language"]);
    checkNestedKeys(item, "boolean", ["general", "hud"]);
    checkNestedKeys(item, "boolean", ["general", "hoverVisibleHud"]);
    checkNestedKeys(item, "boolean", ["general", "visibleHudContents", "menu"]);
    checkNestedKeys(item, "boolean", ["general", "visibleHudContents", "caption"]);
    checkNestedKeys(item, "boolean", ["general", "visibleHudContents", "controller"]);
    checkNestedKeys(item, "boolean", ["general", "visibleHudContents", "paginate"]);
    checkNestedKeys(item, "boolean", ["general", "visibleHudContents", "autoplay"]);
    checkNestedKeys(item, "boolean", ["general", "visibleHudContents", "group"]);
    checkNestedKeys(item, "number", ["slides", "initialNumber"]);
    checkNestedKeys(item, "string", ["slides", "animationType"]);
    checkNestedKeys(item, "number", ["slides", "animationSpeed"]);
    checkNestedKeys(item, "string", ["slides", "captionAnimationType"]);
    checkNestedKeys(item, "number", ["slides", "captionAnimationSpeed"]);
    checkNestedKeys(item, "boolean", ["slides", "autoplay"]);
    checkNestedKeys(item, "number", ["slides", "autoplayDelay"]);
    checkNestedKeys(item, "boolean", ["slides", "autoplayDirection"]);
    checkNestedKeys(item, "boolean", ["slides", "autoplayPauseOnHover"]);
    checkNestedKeys(item, "boolean", ["slides", "loop"]);
    checkNestedKeys(item, "boolean", ["slides", "swipe"]);
    checkNestedKeys(item, "string", ["style", "screenColor"]);
    checkNestedKeys(item, "string", ["style", "imageType"]);
    checkNestedKeys(item, "array", ["style", "imageScale"]);
    checkNestedKeys(item, "number", ["style", "captionScale"]);
    checkNestedKeys(item, "array", ["style", "captionPosition"]);
    checkNestedKeys(item, "boolean", ["keyboard", "enabled"]);
    return true;
  } catch (e) {
    if (window.dev)
      console.error(e.message);
    return false;
  }
}
var defaults = {
  preference: {
    general: {
      language: "en",
      hud: true,
      hoverVisibleHud: false,
      clickVisibleHud: false,
      visibleHudContents: {
        menu: true,
        thumbnail: false,
        caption: true,
        controller: true,
        paginate: true,
        autoplay: true,
        group: true
      }
    },
    slides: {
      initialNumber: 0,
      animationType: "horizontal",
      animationSpeed: 500,
      captionAnimationType: "none",
      captionAnimationSpeed: 40,
      autoplay: false,
      autoplayDelay: 7e3,
      autoplayDirection: true,
      autoplayPauseOnHover: false,
      loop: true,
      swipe: true
    },
    style: {
      screenColor: "system",
      imageType: "none",
      imageScale: ["75%", "75%"],
      captionScale: 100,
      captionPosition: ["32px", "30px"]
    },
    keyboard: {
      enabled: true
    }
  },
  usePreference: {
    slides: true,
    style: true,
    data: true,
    keyboard: true,
    information: true
  },
  tree: {
    default: {
      slides: []
    }
  },
  slides: [],
  group: "default",
  mode: null,
  activeSlide: void 0,
  keyboardEvent: true,
  autoplay: false
};
let state = convertPureObject$1(defaults);
const prefix = "slideshow";
let disableStorage = {
  preference: false,
  tree: false
};
function checkObject() {
  return !!window.localStorage;
}
function get(key) {
  if (disableStorage[key])
    return;
  if (!(checkObject() && key))
    return void 0;
  try {
    return JSON.parse(window.localStorage.getItem(`${prefix}_${key}`));
  } catch (e) {
    return void 0;
  }
}
function set(key, value) {
  if (disableStorage[key])
    return;
  if (!(checkObject() && key && value))
    return;
  window.localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
}
function disabled(key) {
  switch (key) {
    case "preference":
    case "tree":
    case "group":
      disableStorage[key] = true;
      break;
  }
}
function changeMode(context2, value) {
  if (context2.state.mode === value)
    return;
  switch (value) {
    case "preference":
    case "group":
    case "thumbnail":
      context2.commit("updateMode", value);
      break;
    default:
      context2.commit("updateMode", null);
      break;
  }
}
function changePreference(context2, value) {
  const pref = convertPureObject$1(value);
  context2.commit("updatePreference", pref);
  set("preference", pref);
}
function changeAutoplay(context2, sw = void 0) {
  if (!context2.state.preference.slides.autoplay)
    return;
  sw = sw === void 0 ? !context2.state.autoplay : sw;
  context2.commit("updateAutoplay", sw);
}
function changeHud(context2, sw = void 0) {
  sw = sw === void 0 ? !context2.state.preference.general.hud : sw;
  context2.commit("updateValueInPreference", {
    map: ["general", "hud"],
    value: sw
  });
}
function changeTree(context2, tree) {
  try {
    checkSlideItems(tree);
    context2.commit("updateTree", tree);
    set("tree", tree);
  } catch (e) {
    if (window.dev)
      console.error(e.message);
    throw new Error(e.message);
  }
}
function changeSlides(context2, newSlides) {
  context2.commit("updateSlides", newSlides);
}
function changeActiveSlide(context2, active) {
  if (typeof active !== "number")
    return;
  context2.commit("updateActiveSlide", active);
}
async function reset(context2) {
  const preference2 = convertPureObject$1(defaults.preference);
  const tree = convertPureObject$1(defaults.tree);
  const slides2 = convertPureObject$1(defaults.slides);
  await context2.dispatch("changePreference", preference2);
  await context2.dispatch("changeTree", tree);
  await context2.dispatch("changeSlides", slides2);
  context2.commit("updateActiveSlide", preference2.slides.initialNumber);
  context2.commit("updateUseKeyboardEvent", true);
  context2.commit("updateMode", null);
}
function changeGroup(context2, key) {
  context2.commit("updateGroup", key);
  set("group", key);
}
var actions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  changeMode,
  changePreference,
  changeAutoplay,
  changeHud,
  changeTree,
  changeSlides,
  changeActiveSlide,
  reset,
  changeGroup
});
function updateMode(state2, value) {
  state2.mode = value;
}
function updateActiveSlide(state2, n) {
  state2.activeSlide = n;
}
function updateUseKeyboardEvent(state2, sw) {
  state2.keyboardEvent = sw;
}
function updatePreference(state2, value) {
  state2.preference = value;
}
function updateValueInPreference(state2, src) {
  const { value, map } = src;
  if (!(map && Array.isArray(map)))
    return;
  switch (map.length) {
    case 1:
      state2.preference[map[0]] = value;
      break;
    case 2:
      state2.preference[map[0]][map[1]] = value;
      break;
    case 3:
      state2.preference[map[0]][map[1]][map[2]] = value;
      break;
  }
}
function updateTree(state2, value) {
  state2.tree = value;
}
function updateSlides(state2, value) {
  state2.slides = value;
}
function updateGroup(state2, value) {
  state2.group = value;
}
function updateAutoplay(state2, value) {
  state2.autoplay = value;
}
function updateUsePreference(state2, value) {
  switch (value[0]) {
    case "slides":
    case "style":
    case "data":
    case "keyboard":
    case "information":
      state2.usePreference[value[0]] = Boolean(value[1]);
      break;
  }
}
var mutations = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  updateMode,
  updateActiveSlide,
  updateUseKeyboardEvent,
  updatePreference,
  updateValueInPreference,
  updateTree,
  updateSlides,
  updateGroup,
  updateAutoplay,
  updateUsePreference
});
var store = createStore({
  state,
  mutations,
  actions
});
const alert$2 = {
  completeRestore: "Restore complete.",
  errorSubmit: "There was a problem with processing.",
  failedApply: "Failed to apply due to an error.",
  failedGetData: "Failed get data.",
  failedRestore: "Restore failed.",
  invalidAddress: "The address is invalid. ",
  invalidData: "The data is invalid.",
  noSelectedFile: "There is no file selected."
};
const base$1 = {
  ShortcutKey: "Shortcut key",
  add: "Add",
  address: "Address",
  advanced: "Advanced",
  apply: "Apply",
  array: "Array",
  author: "Author",
  autoplay: "Autoplay",
  backup: "Backup",
  basic: "Basic",
  caption: "Caption",
  close: "Close",
  contain: "Contain",
  controller: "Controller",
  cover: "Cover",
  darkMode: "Dark mode",
  data: "Data",
  description: "Description",
  edit: "Edit",
  file: "File",
  fullscreen: "Fullscreen",
  general: "General",
  group: "Group",
  groupKey: "Group key",
  guide: "Guide",
  hud: "HUD",
  image: "Image",
  imageUrl: "Image URL",
  information: "Information",
  inputAddress: "Please input address.",
  inputKey: "Please enter the key.",
  inputText: "Please input text.",
  inputUrl: "Please input URL.",
  keyboard: "Keyboard",
  language: "Language",
  leftKey: "Left key",
  lightMode: "Light mode",
  menu: "Menu",
  name: "Name",
  next: "Next",
  none: "None",
  openUrl: "Open URL",
  paginate: "Slide number",
  preference: "Preference",
  previous: "Previous",
  processing: "Processing..",
  remove: "Remove",
  repeat: "Repeat",
  reset: "Reset",
  resetSlideshow: "Reset slideshow",
  restore: "Restore",
  rightKey: "Right key",
  shuffleText: "Shuffle text",
  slides: "Slides",
  style: "Style",
  subject: "Subject",
  submitEdit: "Edit",
  swipe: "Swipe",
  system: "System",
  thumbnail: "Thumbnail",
  urlThumbnailUrl: "Thumbnail image URL",
  version: "Version"
};
const confirm$2 = {
  applyRestart: "The slideshow restarts.\nWould you like to apply?",
  backup: "Do you really want to back up all your data?\nThe backed up content is saved as a `JSON` file.",
  remove: "Do you really want to delete it?",
  reset: "Do you really want to reset all settings and slide data?\nOnce initialized, it cannot be recovered.",
  restart: "Do you really want to restart?",
  restore: "Would you really want to restore all your data?\nThis operation will delete all current data.",
  selectGroup: "Would you like to use it as the slide of your choice?\nIf you change the slide, it starts over."
};
const description$1 = {
  addSlides: "Please add slides in preferences.",
  autoplay: "Autoplay the slide.",
  autoplayDelay: "The amount of time to wait before the slide automatically transitions.",
  autoplayDirection: "Set the direction in which the slide automatically transitions.",
  autoplayPauseOnHover: "If you place the mouse over the slide area, autoplay is paused.",
  backup: "Import or export all data in the slideshow.",
  captionAnimationSpeed: "The higher the value, the faster the animation.",
  captionAnimationType: "Select the caption transition when the slide changes.",
  captionPosition: "Set position of the caption. ex) left,top",
  captionScale: "Set size of the caption.",
  empty: "Empty",
  emptySlides: "No slides.",
  getDataByRestAPI: "Get data by RestAPI address.",
  getJsonFile: "Upload the JSON file to get the data.",
  group: "Opens the slide group selection window.",
  hoverVisibleHud: "If you overlay mouse, HUD will be hidden.",
  hud: "It shows controller and status.",
  imageScale: "Set the size of the slide image. ex) horizontal,vertical",
  imageType: "Choose slide image type",
  importDataMethod: "Select how to import your data.",
  information: "If you have any comments on problems or improvements, please use the %{link} page.",
  initialNumber: "This is the slide number displayed at the start. (Numbers from 0)",
  inputDescriptionSlide: "Input description of the slide.",
  inputImageUrl: "Input image address.",
  inputKeyOnGroup: "Enter the key value for the slide group.",
  inputSlideDataCode: "Please input slides data code.",
  inputSlideTitle: "Input title for the slide.",
  inputSlidesUrl: "Please enter the slide URL address.",
  inputThumbnailUrl: "Input thumbnail image address.",
  keyboardGuide: "Pressing a keyboard shortcut as follows executes the function.",
  language: "Set the language.",
  openPreference: "Open preference",
  repeat: "Moves the slide from last to first.",
  reset: "Reset all settings and slide data.",
  restart: "Restart the slideshow",
  screenMode: "Select a screen mode.",
  selectGroup: "Select the slide you want to use.",
  selectJsonFile: "Please select a JSON file.",
  selectSlidesType: "Select the slide data type.",
  selectSlidesType2: "If you change and apply the URL address method, the slide data will be lost.",
  setCategoryDescription: "Set the description of the category.",
  setCategoryName: "Set the name of the category.",
  swipe: "Use swipe operations on touch devices",
  thumbnail: "Open the thumbnail image list screen",
  touchHud: "Toggles the HUD when clicking the mouse or touching the screen.",
  transitionSpeed: "Change transition animation speed.",
  transitionType: "Select the transition type when the slide changes.",
  usingKeyboard: "Use keyboard shortcuts.",
  visibleContents: "Set the display of each controller and status."
};
const label$1 = {
  addGroup: "Add group",
  addSlide: "Add slide",
  editGroup: "Edit group",
  editSlide: "Edit slide",
  fadeInOut: "Fade in/out",
  getData: "Import data",
  imageType: "Image type",
  moveHorizontal: "Move horizontally",
  nextSlide: "Go to next slide",
  prevSlide: "Go to previous slide",
  removeGroup: "Remove group"
};
const language$1 = {
  en: "English",
  ko: "Korean"
};
const preference$1 = {
  header: {
    data: "Manage slide data.",
    general: "Set the basic items.",
    information: "You can check information about the slideshow.",
    keyboard: "Settings related to keyboard shortcuts.",
    slides: "Set the parts related to the slide.",
    style: "Set the parts displayed on the screen."
  }
};
const title$1 = {
  autoplayDelay: "Autoplay delay",
  autoplayDirection: "Autoplay direction",
  autoplayPauseOnHover: "Autoplay pause on hover",
  backupOrRestore: "Backup & Restore",
  captionAnimationSpeed: "Caption animation speed",
  captionAnimationType: "Caption animation type",
  captionPosition: "Caption position",
  captionScale: "Caption scale",
  changeMode: "Change the editing mode.",
  emptySlide: "Empty slide",
  fold: "Fold and unfold",
  getSlideItems: "Get slide items",
  hoverVisibleHud: "Visible Hover HUD",
  imageScale: "Image scale",
  importDataByAddress: "Import by address",
  importDataByFile: "Import to file",
  importSlideData: "Import slide data.",
  initialNumber: "Initial slide number",
  loading: "Ready Slideshow..",
  manageSlideData: "Manage slides data",
  screenMode: "Screen mode",
  selectGroup: "Select group",
  selectSlidesType: "Select slide type",
  slidesUrlAddress: "Slide URL address",
  thumbnailView: "Thumbnail view",
  touchHud: "Toggle HUD on click or touch",
  transitionSpeed: "Transition speed",
  transitionType: "Transition type",
  usingKeyboard: "Using keyboard shortcut",
  visibleContents: "Visible contents"
};
var en = {
  alert: alert$2,
  base: base$1,
  confirm: confirm$2,
  description: description$1,
  label: label$1,
  language: language$1,
  preference: preference$1,
  title: title$1
};
const alert$1 = {
  completeRestore: "\uBCF5\uC6D0\uC744 \uC644\uB8CC\uD588\uC2B5\uB2C8\uB2E4.",
  errorSubmit: "\uCC98\uB9AC\uC5D0 \uBB38\uC81C\uAC00 \uC0DD\uACBC\uC2B5\uB2C8\uB2E4.",
  failedApply: "\uC624\uB958\uAC00 \uBC1C\uC0DD\uD558\uC5EC \uC801\uC6A9\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",
  failedGetData: "\uB370\uC774\uD130\uB97C \uAC00\uC838\uC624\uB294\uB370 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",
  failedRestore: "\uBCF5\uC6D0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",
  invalidAddress: "\uC8FC\uC18C\uAC00 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
  invalidData: "\uB370\uC774\uD130\uAC00 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
  noSelectedFile: "\uC120\uD0DD\uD55C \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
};
const base = {
  ShortcutKey: "\uB2E8\uCD95\uD0A4",
  add: "\uCD94\uAC00\uD558\uAE30",
  address: "\uC8FC\uC18C",
  advanced: "\uC804\uBB38\uAC00",
  apply: "\uC801\uC6A9\uD558\uAE30",
  array: "\uBC30\uC5F4",
  author: "\uC81C\uC791\uC790",
  autoplay: "\uC790\uB3D9\uC7AC\uC0DD",
  backup: "\uBC31\uC5C5",
  basic: "\uAE30\uBCF8",
  caption: "\uCEA1\uC158",
  close: "\uB2EB\uAE30",
  contain: "\uC804\uBD80 \uBCF4\uC774\uAE30",
  controller: "\uCEE8\uD2B8\uB864\uB7EC",
  cover: "\uAF49\uCC44\uC6B0\uAE30",
  darkMode: "\uB2E4\uD06C \uBAA8\uB4DC",
  data: "\uB370\uC774\uD130",
  description: "\uC124\uBA85",
  edit: "\uC218\uC815",
  file: "\uD30C\uC77C",
  fullscreen: "\uC804\uCCB4\uD654\uBA74",
  general: "\uAE30\uBCF8",
  group: "\uADF8\uB8F9",
  groupKey: "\uADF8\uB8F9 \uD0A4",
  guide: "\uAC00\uC774\uB4DC",
  hud: "HUD",
  image: "\uC774\uBBF8\uC9C0",
  imageUrl: "\uC774\uBBF8\uC9C0 URL",
  information: "\uC815\uBCF4",
  inputAddress: "\uC8FC\uC18C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  inputKey: "\uD0A4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  inputText: "\uAE00\uC790\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  inputUrl: "URL\uC744 \uC785\uB825\uD558\uC138\uC694.",
  keyboard: "\uD0A4\uBCF4\uB4DC",
  language: "\uC5B8\uC5B4",
  leftKey: "\uC67C\uCABD \uBC29\uD5A5\uD0A4",
  lightMode: "\uB77C\uC774\uD2B8 \uBAA8\uB4DC",
  menu: "\uBA54\uB274",
  name: "\uC774\uB984",
  next: "\uB2E4\uC74C",
  none: "\uC5C6\uC74C",
  openUrl: "URL \uC5F4\uAE30",
  paginate: "\uC2AC\uB77C\uC774\uB4DC \uBC88\uD638",
  preference: "\uD658\uACBD\uC124\uC815",
  previous: "\uC774\uC804",
  processing: "\uCC98\uB9AC\uC911..",
  remove: "\uC0AD\uC81C",
  repeat: "\uBC18\uBCF5",
  reset: "\uC7AC\uC124\uC815",
  resetSlideshow: "\uC2AC\uB77C\uC774\uB4DC\uC1FC \uC7AC\uC124\uC815",
  restore: "\uBCF5\uC6D0",
  rightKey: "\uC624\uB978\uCABD \uBC29\uD5A5\uD0A4",
  shuffleText: "\uBB34\uC791\uC704\uB85C \uBCC0\uD558\uB294 \uAE00\uC790",
  slides: "\uC2AC\uB77C\uC774\uB4DC",
  style: "\uC2A4\uD0C0\uC77C",
  subject: "\uC81C\uBAA9",
  submitEdit: "\uC218\uC815\uD558\uAE30",
  swipe: "\uBC00\uC5B4 \uB118\uAE30\uAE30",
  system: "\uC2DC\uC2A4\uD15C",
  thumbnail: "\uC378\uB124\uC77C",
  urlThumbnailUrl: "\uC378\uB124\uC77C \uC774\uBBF8\uC9C0 URL",
  version: "\uBC84\uC804"
};
const confirm$1 = {
  applyRestart: "\uC2AC\uB77C\uC774\uB4DC\uC1FC\uAC00 \uC7AC\uC2DC\uC791\uB429\uB2C8\uB2E4.\n\uC801\uC6A9\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
  backup: "\uC815\uB9D0 \uBAA8\uB4E0 \uB370\uC774\uD130\uB97C \uBC31\uC5C5\uD560\uAE4C\uC694?\n\uBC31\uC5C5\uD55C \uB0B4\uC6A9\uC740 `JSON` \uD30C\uC77C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4.",
  remove: "\uC815\uB9D0 \uC0AD\uC81C\uD560\uAE4C\uC694?",
  reset: "\uC815\uB9D0\uB85C \uBAA8\uB4E0 \uC124\uC815\uACFC \uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130\uB97C \uCD08\uAE30\uD654 \uD558\uACA0\uC2B5\uB2C8\uAE4C?\n\uCD08\uAE30\uD654\uD558\uBA74 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  restart: "\uC815\uB9D0\uB85C \uC7AC\uC2DC\uC791 \uD558\uACA0\uC2B5\uB2C8\uAE4C?",
  restore: "\uC815\uB9D0 \uBAA8\uB4E0 \uB370\uC774\uD130\uB97C \uBCF5\uC6D0\uD560\uAE4C\uC694?\n\uC774 \uC791\uC5C5\uC740 \uD604\uC7AC \uB370\uC774\uD130\uAC00 \uBAA8\uB450 \uC0AD\uC81C\uB429\uB2C8\uB2E4.",
  selectGroup: "\uC120\uD0DD\uD55C \uC2AC\uB77C\uC774\uB4DC\uB85C \uC0AC\uC6A9\uD560\uAE4C\uC694?\n\uC2AC\uB77C\uC774\uB4DC\uB97C \uBCC0\uACBD\uD558\uBA74 \uB2E4\uC2DC \uC2DC\uC791\uD569\uB2C8\uB2E4."
};
const description = {
  addSlides: "\uD658\uACBD\uC124\uC815\uC5D0\uC11C \uC2AC\uB77C\uC774\uB4DC\uB97C \uCD94\uAC00\uD574\uC8FC\uC138\uC694.",
  autoplay: "\uC2AC\uB77C\uC774\uB4DC\uB97C \uC790\uB3D9\uC7AC\uC0DD \uD569\uB2C8\uB2E4.",
  autoplayDelay: "\uC2AC\uB77C\uC774\uB4DC\uAC00 \uC790\uB3D9\uC73C\uB85C \uC804\uD658\uD558\uAE30 \uC804\uC5D0 \uB300\uAE30\uD558\uB294 \uC2DC\uAC04\uC785\uB2C8\uB2E4.",
  autoplayDirection: "\uC2AC\uB77C\uC774\uB4DC\uAC00 \uC790\uB3D9\uC73C\uB85C \uC804\uD658\uD558\uB294 \uBC29\uD5A5\uC744 \uC124\uC815\uD569\uB2C8\uB2E4.",
  autoplayPauseOnHover: "\uC2AC\uB77C\uC774\uB4DC \uC601\uC5ED\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uAC16\uB2E4\uB300\uBA74 \uC790\uB3D9\uC7AC\uC0DD\uC744 \uC77C\uC2DC\uC815\uC9C0 \uD569\uB2C8\uB2E4.",
  backup: "\uC2AC\uB77C\uC774\uB4DC\uC1FC\uC758 \uBAA8\uB4E0 \uB370\uC774\uD130\uB97C \uAC00\uC838\uC624\uAC70\uB098 \uB0B4\uBCF4\uB0C5\uB2C8\uB2E4.",
  captionAnimationSpeed: "\uAC12\uC774 \uB192\uC744\uC218\uB85D \uC560\uB2C8\uBA54\uC774\uC158 \uC18D\uB3C4\uAC00 \uBE68\uB77C\uC9D1\uB2C8\uB2E4.",
  captionAnimationType: "\uC2AC\uB77C\uC774\uB4DC\uAC00 \uBC14\uB014\uB54C\uC758 \uCEA1\uC158 \uD2B8\uB79C\uC9C0\uC158\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  captionPosition: "\uCEA1\uC158\uC758 \uC704\uCE58\uB97C \uC124\uC815\uD569\uB2C8\uB2E4. \uC608)\uC67C\uCABD,\uC0C1\uB2E8",
  captionScale: "\uCEA1\uC158\uC758 \uD06C\uAE30\uB97C \uC124\uC815\uD569\uB2C8\uB2E4.",
  empty: "\uBE44\uC5C8\uC2B5\uB2C8\uB2E4.",
  emptySlides: "\uC2AC\uB77C\uC774\uB4DC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
  getDataByRestAPI: "RestAPI \uC8FC\uC18C\uB85C \uB370\uC774\uD130\uB97C \uAC00\uC838\uC635\uB2C8\uB2E4.",
  getJsonFile: "JSON \uD30C\uC77C\uC744 \uC5C5\uB85C\uB4DC\uD558\uC5EC \uB370\uC774\uD130\uB97C \uAC00\uC838\uC635\uB2C8\uB2E4.",
  group: "\uC2AC\uB77C\uC774\uB4DC \uADF8\uB8F9 \uC120\uD0DD\uCC3D\uC744 \uC5FD\uB2C8\uB2E4.",
  hoverVisibleHud: "\uC2AC\uB77C\uC774\uB4DC \uC601\uC5ED\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uAC16\uB2E4\uB300\uBA74 \uC870\uC791\uACFC \uC0C1\uD0DC\uC694\uC18C\uB97C \uC228\uAE41\uB2C8\uB2E4.",
  hud: "\uC870\uC791\uACFC \uC0C1\uD0DC\uC694\uC18C\uB4E4\uC744 \uBCF4\uC5EC\uC90D\uB2C8\uB2E4.",
  imageScale: "\uC2AC\uB77C\uC774\uB4DC \uC774\uBBF8\uC9C0 \uD06C\uAE30\uB97C \uC815\uD569\uB2C8\uB2E4. \uC608) \uAC00\uB85C,\uC138\uB85C",
  imageType: "\uC2AC\uB77C\uC774\uB4DC \uC774\uBBF8\uC9C0 \uD45C\uC2DC\uBC29\uC2DD\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  importDataMethod: "\uB370\uC774\uD130\uB97C \uAC00\uC838\uC624\uB294 \uBC29\uBC95\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  information: "\uBB38\uC81C\uC810\uC774\uB098 \uAC1C\uC120\uC5D0 \uAD00\uD55C \uC758\uACAC\uC774 \uC788\uC73C\uBA74 %{link} \uD398\uC774\uC9C0\uB97C \uC774\uC6A9\uD574\uC8FC\uC138\uC694.",
  initialNumber: "\uC2DC\uC791\uD560\uB54C \uD45C\uC2DC\uB418\uB294 \uC2AC\uB77C\uC774\uB4DC \uBC88\uD638\uC785\uB2C8\uB2E4. (\uBC88\uD638\uB294 0\uBD80\uD130)",
  inputDescriptionSlide: "\uC2AC\uB77C\uC774\uB4DC \uC124\uBA85\uC744 \uC785\uB825\uD569\uB2C8\uB2E4.",
  inputImageUrl: "\uC774\uBBF8\uC9C0 \uC8FC\uC18C\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
  inputKeyOnGroup: "\uC2AC\uB77C\uC774\uB4DC \uADF8\uB8F9\uC758 \uD0A4\uAC12\uC744 \uC785\uB825\uD569\uB2C8\uB2E4.",
  inputSlideDataCode: "\uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130 \uCF54\uB4DC\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  inputSlideTitle: "\uC2AC\uB77C\uC774\uB4DC \uC81C\uBAA9\uC744 \uC785\uB825\uD569\uB2C8\uB2E4.",
  inputSlidesUrl: "\uC2AC\uB77C\uC774\uB4DC URL \uC8FC\uC18C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.",
  inputThumbnailUrl: "\uC378\uB124\uC77C \uC774\uBBF8\uC9C0 \uC8FC\uC18C\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
  keyboardGuide: "\uB2E4\uC74C\uACFC \uAC19\uC774 \uD0A4\uBCF4\uB4DC \uB2E8\uCD95\uD0A4\uB97C \uB204\uB974\uBA74 \uD574\uB2F9 \uAE30\uB2A5\uC744 \uC2E4\uD589\uD569\uB2C8\uB2E4.",
  language: "\uC5B8\uC5B4\uB97C \uC124\uC815\uD569\uB2C8\uB2E4.",
  openPreference: "\uD658\uACBD\uC124\uC815 \uC5F4\uAE30",
  repeat: "\uC2AC\uB77C\uC774\uB4DC\uB97C \uB9C8\uC9C0\uB9C9\uC5D0\uC11C \uCC98\uC74C\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.",
  reset: "\uBAA8\uB4E0 \uC124\uC815\uACFC \uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130\uB97C \uC7AC\uC124\uC815\uD569\uB2C8\uB2E4.",
  restart: "\uC2AC\uB77C\uC774\uB4DC\uC1FC \uC7AC\uC2E4\uD589",
  screenMode: "\uD654\uBA74\uBAA8\uB4DC\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  selectGroup: "\uC0AC\uC6A9\uD560 \uC2AC\uB77C\uC774\uB4DC\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  selectJsonFile: "JSON \uD30C\uC77C\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.",
  selectSlidesType: "\uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130\uC758 \uD0C0\uC785\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  selectSlidesType2: "URL \uC8FC\uC18C\uBC29\uC2DD\uC73C\uB85C \uBCC0\uACBD\uD558\uACE0 \uC801\uC6A9\uD558\uBA74 \uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130\uAC00 \uC5C6\uC5B4\uC9D1\uB2C8\uB2E4.",
  setCategoryDescription: "\uCE74\uD14C\uACE0\uB9AC\uC5D0 \uB300\uD55C \uC124\uBA85\uC744 \uC785\uB825\uD569\uB2C8\uB2E4.",
  setCategoryName: "\uCE74\uD14C\uACE0\uB9AC\uC758 \uC774\uB984\uC744 \uC124\uC815\uD569\uB2C8\uB2E4.",
  swipe: "\uD130\uCE58 \uB514\uBC14\uC774\uC2A4\uC5D0\uC11C \uBC00\uC5B4 \uB118\uAE30\uB294 \uC870\uC791\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
  thumbnail: "\uC378\uB124\uC77C \uC774\uBBF8\uC9C0 \uBAA9\uB85D\uD654\uBA74\uC744 \uC5FD\uB2C8\uB2E4.",
  touchHud: "\uB9C8\uC6B0\uC2A4\uB97C \uD074\uB9AD\uD558\uAC70\uB098 \uD654\uBA74\uC744 \uD130\uCE58\uD560\uB54C HUD\uB97C \uD1A0\uAE00\uB9C1\uD569\uB2C8\uB2E4.",
  transitionSpeed: "\uD2B8\uB79C\uC9C0\uC158 \uC560\uB2C8\uBA54\uC774\uC158 \uC18D\uB3C4\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4.",
  transitionType: "\uC2AC\uB77C\uC774\uB4DC\uAC00 \uBC14\uB014\uB54C\uC758 \uD2B8\uB79C\uC9C0\uC158\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  usingKeyboard: "\uD0A4\uBCF4\uB4DC \uB2E8\uCD95\uD0A4\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
  visibleContents: "\uAC01 \uC870\uC791\uACFC \uC0C1\uD0DC\uC694\uC18C\uB4E4 \uD45C\uC2DC\uB97C \uC124\uC815\uD569\uB2C8\uB2E4."
};
const label = {
  addGroup: "\uADF8\uB8F9 \uCD94\uAC00",
  addSlide: "\uC2AC\uB77C\uC774\uB4DC \uCD94\uAC00",
  editGroup: "\uADF8\uB8F9 \uC218\uC815",
  editSlide: "\uC2AC\uB77C\uC774\uB4DC \uC218\uC815",
  fadeInOut: "\uD22C\uBA85\uB3C4 \uC804\uD658",
  getData: "\uB370\uC774\uD130 \uAC00\uC838\uC624\uAE30",
  imageType: "\uC774\uBBF8\uC9C0 \uD45C\uC2DC\uBC29\uC2DD",
  moveHorizontal: "\uAC00\uB85C\uBC29\uD5A5\uC73C\uB85C \uC774\uB3D9",
  nextSlide: "\uB2E4\uC74C \uC2AC\uB77C\uC774\uB4DC\uB85C \uC774\uB3D9\uD558\uAE30",
  prevSlide: "\uC774\uC804 \uC2AC\uB77C\uC774\uB4DC\uB85C \uC774\uB3D9\uD558\uAE30",
  removeGroup: "\uADF8\uB8F9 \uC0AD\uC81C"
};
const language = {
  en: "\uC601\uC5B4",
  ko: "\uD55C\uAD6D\uC5B4"
};
const preference = {
  header: {
    data: "\uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130\uB97C \uAD00\uB9AC\uD569\uB2C8\uB2E4.",
    general: "\uAE30\uCD08\uC801\uC778 \uD56D\uBAA9\uB4E4\uC744 \uC124\uC815\uD569\uB2C8\uB2E4.",
    information: "\uC2AC\uB77C\uC774\uB4DC\uC1FC\uC5D0 \uAD00\uD55C \uC815\uBCF4\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    keyboard: "\uD0A4\uBCF4\uB4DC \uB2E8\uCD95\uD0A4\uC5D0 \uAD00\uD55C \uC124\uC815\uC785\uB2C8\uB2E4.",
    slides: "\uC2AC\uB77C\uC774\uB4DC\uC640 \uAD00\uB828\uB41C \uBD80\uBD84\uB4E4\uC744 \uC124\uC815\uD569\uB2C8\uB2E4.",
    style: "\uD654\uBA74\uC5D0 \uD45C\uC2DC\uB418\uB294 \uBD80\uBD84\uB4E4\uC744 \uC124\uC815\uD569\uB2C8\uB2E4."
  }
};
const title = {
  autoplayDelay: "\uC790\uB3D9\uC7AC\uC0DD \uB51C\uB808\uC774",
  autoplayDirection: "\uC790\uB3D9\uC7AC\uC0DD \uBC29\uD5A5",
  autoplayPauseOnHover: "\uB9C8\uC6B0\uC2A4 \uC624\uBC84\uC2DC \uC790\uB3D9\uC7AC\uC0DD \uC77C\uC2DC\uC815\uC9C0",
  backupOrRestore: "\uBC31\uC5C5 \uBC0F \uBCF5\uC6D0",
  captionAnimationSpeed: "\uCEA1\uC158 \uC560\uB2C8\uBA54\uC774\uC158 \uC18D\uB3C4",
  captionAnimationType: "\uCEA1\uC158 \uC560\uB2C8\uBA54\uC774\uC158 \uC885\uB958",
  captionPosition: "\uCEA1\uC158 \uC704\uCE58",
  captionScale: "\uCEA1\uC158 \uD06C\uAE30",
  changeMode: "\uD3B8\uC9D1\uBAA8\uB4DC\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4.",
  emptySlide: "\uBE48 \uC2AC\uB77C\uC774\uB4DC",
  fold: "\uC811\uACE0 \uD3BC\uCE58\uAE30",
  getSlideItems: "\uC2AC\uB77C\uC774\uB4DC \uC544\uC774\uD15C \uAC00\uC838\uC624\uAE30",
  hoverVisibleHud: "\uB9C8\uC6B0\uC2A4 \uC624\uBC84\uC2DC HUD \uBCF4\uC774\uAE30",
  imageScale: "\uC774\uBBF8\uC9C0 \uD06C\uAE30",
  importDataByAddress: "\uC8FC\uC18C\uB85C \uAC00\uC838\uC624\uAE30",
  importDataByFile: "\uD30C\uC77C\uB85C \uAC00\uC838\uC624\uAE30",
  importSlideData: "\uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130\uB97C \uAC00\uC838\uC635\uB2C8\uB2E4.",
  initialNumber: "\uAE30\uBCF8 \uC2AC\uB77C\uC774\uB4DC \uBC88\uD638",
  loading: "\uC2AC\uB77C\uC774\uB4DC\uC1FC \uC900\uBE44\uC911..",
  manageSlideData: "\uC2AC\uB77C\uC774\uB4DC \uB370\uC774\uD130 \uAD00\uB9AC",
  screenMode: "\uD654\uBA74\uBAA8\uB4DC",
  selectGroup: "\uADF8\uB8F9 \uC120\uD0DD\uD558\uAE30",
  selectSlidesType: "\uC2AC\uB77C\uC774\uB4DC \uD0C0\uC785 \uC120\uD0DD",
  slidesUrlAddress: "\uC2AC\uB77C\uC774\uB4DC URL \uC8FC\uC18C",
  thumbnailView: "\uC378\uB124\uC77C \uBCF4\uAE30",
  touchHud: "\uD074\uB9AD, \uD130\uCE58\uC2DC HUD \uD1A0\uAE00",
  transitionSpeed: "\uD2B8\uB79C\uC9C0\uC158 \uC18D\uB3C4",
  transitionType: "\uD2B8\uB79C\uC9C0\uC158 \uC885\uB958",
  usingKeyboard: "\uD0A4\uBCF4\uB4DC \uB2E8\uCD95\uD0A4 \uC0AC\uC6A9",
  visibleContents: "\uC694\uC18C\uB4E4 \uD45C\uC2DC"
};
var ko = {
  alert: alert$1,
  base,
  confirm: confirm$1,
  description,
  label,
  language,
  preference,
  title
};
var i18n = vueI18n.createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ko
  }
});
let baseOptions = {
  preference: void 0,
  tree: []
};
let main = null;
let slides = null;
let useProps = null;
function setup(o, use) {
  main = o;
  useProps = use;
}
function setupSlides(o) {
  slides = o;
}
function sleep(ms = 1e3) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function convertPureObject(src) {
  if (!src)
    return null;
  return JSON.parse(JSON.stringify(src));
}
function initCustomEvent() {
  const events = {
    on(event, cb, opts) {
      if (!this.namespaces)
        this.namespaces = {};
      this.namespaces[event] = cb;
      const options = opts || false;
      this.addEventListener(event.split(".")[0], cb, options);
      return this;
    },
    off(event) {
      if (!(this.namespaces && this.namespaces[event]))
        return;
      this.removeEventListener(event.split(".")[0], this.namespaces[event]);
      delete this.namespaces[event];
      return this;
    }
  };
  window.on = document.on = Element.prototype.on = events.on;
  window.off = document.off = Element.prototype.off = events.off;
}
function setAreaTrue(src, total, current, loop) {
  function setTrue(sw) {
    if (sw) {
      if (src[current + 1] !== void 0)
        src[current + 1] = true;
    } else {
      if (src[current - 1] !== void 0)
        src[current - 1] = true;
    }
  }
  src = convertPureObject(src);
  if (loop) {
    if (current === 0) {
      src[total - 1] = true;
      setTrue(true);
    } else if (current === total - 1) {
      src[0] = true;
      setTrue(false);
    } else {
      setTrue(true);
      setTrue(false);
    }
  } else {
    setTrue(true);
    setTrue(false);
  }
  return src;
}
function fullscreen(sw) {
  const doc = window.document;
  const docEl = doc.documentElement;
  if (sw) {
    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    requestFullScreen.call(docEl);
  } else {
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    cancelFullScreen.call(doc);
  }
}
function getValueFromType(type, value) {
  switch (type) {
    case "boolean":
      return value === "true";
    case "number":
      return Number(value);
    default:
      return value;
  }
}
function getApiData(url, parse = true) {
  return new Promise((resolve, reject) => {
    try {
      const httpRequest = new XMLHttpRequest();
      if (!httpRequest)
        throw new Error("no XMLHttpRequest");
      httpRequest.onreadystatechange = () => {
        try {
          if (httpRequest.readyState !== XMLHttpRequest.DONE)
            return;
          if (httpRequest.status === 200) {
            resolve(parse ? JSON.parse(httpRequest.responseText) : httpRequest.responseText);
          } else {
            throw new Error("failed request url");
          }
        } catch (e) {
          reject(new Error(e.message));
        }
      };
      httpRequest.open("get", url);
      httpRequest.send();
    } catch (e) {
      reject(new Error(e.message || "failed request url"));
    }
  });
}
function getFileData(file, parse = true) {
  return new Promise((resolve, reject) => {
    try {
      if (!file)
        throw new Error("no file");
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(parse ? JSON.parse(e.target.result) : e.target.result);
        } catch (e2) {
          reject(new Error(e2.message || "failed get file data"));
        }
      };
      reader.readAsText(file);
    } catch (e) {
      reject(new Error(e.message || "failed get file data"));
    }
  });
}
function move(total = 0, value = 0, loop = true) {
  if (total - 1 < value) {
    if (!loop)
      return total - 1;
    return 0;
  } else if (value < 0) {
    if (!loop)
      return 0;
    return total - 1;
  } else {
    return Number(value);
  }
}
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _hoisted_1$e = ["aria-labelledby"];
const _sfc_main$h = {
  props: {
    iconName: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    let state2 = reactive({
      computedIconComponent: computed(() => {
        switch (props.iconName) {
          case "menu":
            return defineAsyncComponent(() => import("./icon-menu.js"));
          case "menu-flat":
            return defineAsyncComponent(() => import("./icon-menu-flat.js"));
          case "arrow-left":
            return defineAsyncComponent(() => import("./icon-arrow-left.js"));
          case "arrow-right":
            return defineAsyncComponent(() => import("./icon-arrow-right.js"));
          case "arrow-up":
            return defineAsyncComponent(() => import("./icon-arrow-up.js"));
          case "arrow-down":
            return defineAsyncComponent(() => import("./icon-arrow-down.js"));
          case "frown":
            return defineAsyncComponent(() => import("./icon-frown.js"));
          case "tool":
            return defineAsyncComponent(() => import("./icon-tool.js"));
          case "droplet":
            return defineAsyncComponent(() => import("./icon-droplet.js"));
          case "copy":
            return defineAsyncComponent(() => import("./icon-copy.js"));
          case "database":
            return defineAsyncComponent(() => import("./icon-database.js"));
          case "command":
            return defineAsyncComponent(() => import("./icon-command.js"));
          case "check":
            return defineAsyncComponent(() => import("./icon-check.js"));
          case "x":
            return defineAsyncComponent(() => import("./icon-x.js"));
          case "upload":
            return defineAsyncComponent(() => import("./icon-upload.js"));
          case "file":
            return defineAsyncComponent(() => import("./icon-file.js"));
          case "info":
            return defineAsyncComponent(() => import("./icon-info.js"));
          case "play-circle":
            return defineAsyncComponent(() => import("./icon-play-circle.js"));
          case "download":
            return defineAsyncComponent(() => import("./icon-download.js"));
          case "edit":
            return defineAsyncComponent(() => import("./icon-edit.js"));
          case "plus":
            return defineAsyncComponent(() => import("./icon-plus.js"));
          case "folder":
            return defineAsyncComponent(() => import("./icon-folder.js"));
          case "minus":
            return defineAsyncComponent(() => import("./icon-minus.js"));
          default:
            return null;
        }
      })
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        "aria-labelledby": props.iconName,
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        class: "slideshow-icon"
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(state2).computedIconComponent)))
      ], 8, _hoisted_1$e);
    };
  }
};
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-1921454f"]]);
var Images_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-c0b46bbc"), n = n(), popScopeId(), n);
const _hoisted_1$d = {
  key: 0,
  class: "first"
};
const _hoisted_2$a = ["src", "alt"];
const _hoisted_3$9 = {
  key: 0,
  class: "empty-image"
};
const _hoisted_4$7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("strong", null, "no image", -1));
const _hoisted_5$5 = ["src", "alt", "onError"];
const _hoisted_6$4 = {
  key: 1,
  class: "last"
};
const _hoisted_7$3 = ["src", "alt"];
const _hoisted_8 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("i", { class: "overlay" }, null, -1));
const _sfc_main$g = {
  props: {
    items: { type: Array, required: true },
    initialActive: { type: Number, default: 0 },
    animationType: { type: String, default: "none" },
    imageType: { type: String, default: null },
    duration: { type: Number, default: 800 },
    imageSize: { type: Array, default: [100, 100] },
    loop: { type: Boolean },
    movePos: { type: Number, default: void 0 }
  },
  emits: {
    "animation-control": null,
    "change-active": null
  },
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    let state2 = reactive({
      loaded: new Array(props.items.length).fill(false),
      error: new Array(props.items.length).fill(false),
      active: props.initialActive,
      activeClassName: "current",
      nextKey: void 0,
      nextClassName: void 0,
      playAnimation: false,
      cancelAnimation: false,
      computedContainerStyle: computed(() => {
        let result = {
          "--speed-slide-animation": `${props.duration}ms`,
          "--image-size-width": props.imageSize[0],
          "--image-size-height": props.imageSize[1]
        };
        if (props.animationType === "horizontal") {
          result[`--active-column`] = state2.nextKey !== void 0 ? state2.nextKey : state2.active;
          if (props.movePos !== void 0) {
            result["--move-pos"] = `${props.movePos}vw`;
          }
        }
        return result;
      }),
      computedShowFirstItem: computed(() => {
        if (!props.loop)
          return false;
        if (props.items.length <= 1)
          return false;
        return props.items[props.items.length - 1] && props.animationType === "horizontal";
      }),
      computedShowLastItem: computed(() => {
        if (!props.loop)
          return false;
        if (props.items.length <= 1)
          return false;
        return props.items[0] && props.animationType === "horizontal";
      })
    });
    let _active = props.initialActive;
    const figures = ref([]);
    const wrap = ref(null);
    let targetElement = null;
    state2.loaded[props.initialActive] = true;
    state2.loaded = setAreaTrue(state2.loaded, props.items.length, props.initialActive, props.loop);
    async function play(n = null, userAnimationType = void 0) {
      if (typeof n !== "number")
        return;
      _active = Number(n);
      const type = userAnimationType !== void 0 ? userAnimationType : props.animationType;
      if (!state2.loaded[_active]) {
        try {
          await checkLoadImage(props.items[_active].src);
          state2.loaded[_active] = true;
        } catch (e) {
          state2.error[_active] = true;
        }
      }
      switch (type) {
        case "fade":
          if (targetElement) {
            targetElement.removeEventListener("transitionend", onTransitionEnd);
            targetElement = null;
          }
          emits("animation-control", true);
          state2.playAnimation = true;
          state2.activeClassName = "fadeout ready";
          state2.nextKey = _active;
          state2.nextClassName = "fadein ready";
          await sleep(20);
          state2.nextClassName = "fadein";
          targetElement = figures.value[_active];
          targetElement.addEventListener("transitionend", onTransitionEnd);
          break;
        case "horizontal":
          emits("animation-control", true);
          state2.playAnimation = true;
          if (props.loop) {
            if (state2.active === 0 && _active >= props.items.length - 1) {
              state2.nextKey = -1;
            } else if (state2.active >= props.items.length - 1 && _active === 0) {
              state2.nextKey = props.items.length;
            }
            state2.active = _active;
          } else {
            state2.active = _active;
          }
          wrap.value.addEventListener("transitionend", onTransitionEnd);
          break;
        case "none":
        default:
          state2.active = _active;
          state2.loaded = setAreaTrue(state2.loaded, props.items.length, props.initialActive, props.loop);
          break;
      }
    }
    function onTransitionEnd() {
      switch (props.animationType) {
        case "fade":
          state2.playAnimation = false;
          state2.nextKey = void 0;
          state2.nextClassName = void 0;
          state2.active = _active;
          state2.activeClassName = "current";
          state2.loaded = setAreaTrue(state2.loaded, props.items.length, props.initialActive, props.loop);
          if (targetElement) {
            targetElement.removeEventListener("transitionend", onTransitionEnd);
            targetElement = null;
          }
          emits("animation-control", false);
          break;
        case "horizontal":
          state2.playAnimation = false;
          state2.nextKey = void 0;
          state2.loaded = setAreaTrue(state2.loaded, props.items.length, props.initialActive, props.loop);
          wrap.value.removeEventListener("transitionend", onTransitionEnd);
          emits("animation-control", false);
          break;
      }
    }
    async function cancel() {
      if (state2.playAnimation)
        return;
      emits("animation-control", true);
      state2.cancelAnimation = true;
      wrap.value.addEventListener("transitionend", onCancelTransitionEnd);
    }
    function onCancelTransitionEnd() {
      state2.cancelAnimation = false;
      wrap.value.removeEventListener("transitionend", onCancelTransitionEnd);
      emits("animation-control", false);
    }
    function onErrorImage(key) {
      state2.error[key] = true;
    }
    function checkLoadImage(src) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject();
        image.src = src;
      });
    }
    expose({
      play,
      cancel
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "slideshow-images",
          `animation--${__props.animationType}`,
          __props.imageType && `type--${__props.imageType}`,
          unref(state2).playAnimation && "play-animation",
          unref(state2).cancelAnimation && "cancel-animation"
        ]),
        style: normalizeStyle(unref(state2).computedContainerStyle)
      }, [
        createElementVNode("div", {
          ref: (_value, _refs) => {
            _refs["wrap"] = _value;
            wrap.value = _value;
          },
          class: "wrap"
        }, [
          unref(state2).computedShowFirstItem ? (openBlock(), createElementBlock("figure", _hoisted_1$d, [
            unref(state2).loaded[__props.items.length - 1] ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: __props.items[__props.items.length - 1].src,
              alt: __props.items[__props.items.length - 1].title
            }, null, 8, _hoisted_2$a)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, key) => {
            return openBlock(), createElementBlock("figure", {
              ref: (el) => {
                figures.value[key] = el;
              },
              class: normalizeClass([
                unref(state2).active === key && !!unref(state2).activeClassName && unref(state2).activeClassName,
                unref(state2).nextKey === key && !!unref(state2).nextClassName && unref(state2).nextClassName
              ])
            }, [
              unref(state2).error[key] ? (openBlock(), createElementBlock("div", _hoisted_3$9, [
                createVNode(Icon, { "icon-name": "x" }),
                _hoisted_4$7
              ])) : unref(state2).loaded[key] ? (openBlock(), createElementBlock("img", {
                key: 1,
                src: item.src,
                alt: item.title,
                onError: ($event) => onErrorImage(key)
              }, null, 40, _hoisted_5$5)) : createCommentVNode("", true)
            ], 2);
          }), 256)),
          unref(state2).computedShowLastItem ? (openBlock(), createElementBlock("figure", _hoisted_6$4, [
            unref(state2).loaded[0] ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: __props.items[0].src,
              alt: __props.items[0].title
            }, null, 8, _hoisted_7$3)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 512),
        _hoisted_8
      ], 6);
    };
  }
};
var Images = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-c0b46bbc"]]);
function shuffle($el, options) {
  options = Object.assign({}, {
    text: "",
    waitChar: "-",
    charSpeed: 1,
    moveFix: 25,
    moveRange: 10,
    moveTrigger: 25,
    fps: 60,
    pattern: "abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>",
    randomTextType: null,
    retry: true,
    callback: null
  }, options);
  options.text = options.text.trim();
  let textKeys = [];
  let frame;
  let position;
  let currentText;
  let checkLast;
  let checkPlay = false;
  function stack() {
    let str = currentText;
    checkLast = true;
    for (let tick = position; tick <= frame; tick++) {
      if (textKeys[tick] !== 0 && textKeys[tick] != null) {
        checkLast = false;
        const selectKey = textKeys[tick];
        if (Math.abs(selectKey) <= options.moveTrigger) {
          let txt = "";
          switch (options.randomTextType) {
            case "pattern":
              txt = randomWord(options.pattern);
              break;
            case "unicode":
            default:
              const unicode = Math.min(Math.max(options.text.charCodeAt(tick) + selectKey, 33), 126);
              txt = String.fromCharCode(unicode);
              break;
          }
          str += txt;
        } else {
          str += options.waitChar;
        }
        selectKey > 0 ? textKeys[tick] -= 1 : textKeys[tick] += 1;
      } else {
        if (position === tick - 1) {
          position = tick;
          currentText = options.text.substring(0, position);
        }
        str += options.text.charAt(tick);
      }
      $el.textContent = str;
    }
    if (frame <= options.text.length) {
      frame += options.charSpeed;
    } else {
      checkPlay = true;
    }
    if (checkLast && checkPlay) {
      if ($el.dataset.id)
        clearInterval(parseInt($el.dataset.id));
      $el.textContent = currentText;
      $el.dataset.run = "false";
      if (options.callback)
        options.callback();
    }
  }
  function randomWord(pattern) {
    const n = Math.floor(Math.random() * pattern.length);
    return pattern.substring(n, n + 1);
  }
  if (options.text || options.text && !options.retry && $el.dataset.run !== "true") {
    $el.dataset.run = "true";
    $el.textContent = options.waitChar;
    for (let i = 0; i <= options.text.length - 1; i++) {
      if (options.text.charAt(0) !== " ") {
        textKeys[i] = (options.moveFix + Math.round(Math.random() * options.moveRange)) * (Math.round(Math.random()) - 0.5) * 2;
      } else {
        textKeys[i] = 0;
      }
    }
    frame = 0;
    position = 0;
    currentText = "";
    if ($el.dataset.id)
      clearInterval(parseInt($el.dataset.id));
    const intervalId = setInterval(stack, 1e3 / options.fps);
    $el.dataset.id = intervalId.toString();
  }
}
var Caption_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$c = { key: 0 };
const _hoisted_2$9 = { key: 1 };
const _sfc_main$f = {
  props: {
    active: { type: Number, required: true },
    title: { type: String, default: "Untitled" },
    description: { type: String, default: null },
    animationType: { type: String, default: null },
    animationSpeed: { type: Number, default: 40 },
    position: { type: Array, default: [] },
    scale: { type: Number, default: 100 }
  },
  setup(__props) {
    const props = __props;
    const elementTitle = ref(null);
    const elementDescription = ref(null);
    reactive({
      computedRealText: computed(() => {
        switch (props.animationType) {
          case "shuffle":
            return false;
          default:
            return true;
        }
      })
    });
    let interval = void 0;
    function playTransition(type) {
      switch (type) {
        case "shuffle":
          clearTimer();
          if (elementDescription.value.dataset.id) {
            clearInterval(Number(elementDescription.value.dataset.id));
            elementDescription.value.innerText = "";
          }
          if (props.title) {
            shuffle(elementTitle.value, {
              text: props.title,
              fps: props.animationSpeed,
              randomTextType: "pattern"
            });
          }
          if (props.description) {
            interval = setTimeout(() => {
              clearTimer();
              shuffle(elementDescription.value, {
                text: props.description,
                fps: props.animationSpeed
              });
            }, 300);
          }
          break;
      }
    }
    function clearTimer() {
      if (!interval)
        return;
      clearTimeout(interval);
      interval = void 0;
    }
    switch (props.animationType) {
      case "shuffle":
        onMounted(() => setTimeout(() => playTransition("shuffle"), 100));
        watch(() => props.active, () => playTransition("shuffle"));
        break;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", {
        class: "slideshow-caption",
        style: normalizeStyle({
          "--caption-position-left": __props.position[0],
          "--caption-position-top": __props.position[1],
          "--caption-scale": __props.scale
        })
      }, [
        __props.animationType === "shuffle" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          __props.title ? (openBlock(), createElementBlock("h1", {
            key: 0,
            ref: (_value, _refs) => {
              _refs["elementTitle"] = _value;
              elementTitle.value = _value;
            }
          }, null, 512)) : createCommentVNode("", true),
          __props.description ? (openBlock(), createElementBlock("pre", {
            key: 1,
            ref: (_value, _refs) => {
              _refs["elementDescription"] = _value;
              elementDescription.value = _value;
            }
          }, null, 512)) : createCommentVNode("", true)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          __props.title ? (openBlock(), createElementBlock("h1", _hoisted_1$c, toDisplayString(__props.title), 1)) : createCommentVNode("", true),
          __props.description ? (openBlock(), createElementBlock("pre", _hoisted_2$9, toDisplayString(__props.description), 1)) : createCommentVNode("", true)
        ], 64))
      ], 4);
    };
  }
};
var Caption = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-261402b8"]]);
var Paginate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$b = { class: "slideshow-paginate" };
const _sfc_main$e = {
  props: {
    total: { type: Number, default: 0 },
    current: { type: Number, default: 0 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("em", _hoisted_1$b, toDisplayString(__props.current + 1) + " / " + toDisplayString(__props.total), 1);
    };
  }
};
var Paginate = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-cd3bfaec"]]);
var Controller_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$a = { class: "controller" };
const _hoisted_2$8 = ["disabled", "title"];
const _hoisted_3$8 = ["disabled", "title"];
const _sfc_main$d = {
  props: {
    showPrev: { type: Boolean, default: true },
    showNext: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false }
  },
  emits: {
    "click-prev": null,
    "click-next": null
  },
  setup(__props, { emit: emits }) {
    const { t } = i18n.global;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", _hoisted_1$a, [
        __props.showPrev ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          disabled: __props.disabled,
          title: unref(t)("label.prevSlide"),
          class: "prev",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click-prev"))
        }, [
          createVNode(Icon, { "icon-name": "arrow-left" })
        ], 8, _hoisted_2$8)) : createCommentVNode("", true),
        __props.showNext ? (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          disabled: __props.disabled,
          title: unref(t)("label.nextSlide"),
          class: "next",
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("click-next"))
        }, [
          createVNode(Icon, { "icon-name": "arrow-right" })
        ], 8, _hoisted_3$8)) : createCommentVNode("", true)
      ]);
    };
  }
};
var Controller = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-77ab6fe5"]]);
var index_scss_vue_type_style_index_0_src_lang = "";
const _sfc_main$c = {
  setup(__props, { expose }) {
    const images = ref(null);
    let state2 = reactive({
      animated: false,
      swipePos: void 0,
      swipeMove: false,
      computedImages: computed(() => {
        return store.state.slides.map((item) => item);
      }),
      computedShowPrevButton: computed(() => {
        if (store.state.preference.slides.loop)
          return true;
        return 0 < store.state.activeSlide;
      }),
      computedShowNextButton: computed(() => {
        if (store.state.preference.slides.loop)
          return true;
        return state2.computedImages.length - 1 > store.state.activeSlide;
      }),
      computedCaption: computed(() => {
        const item = state2.computedImages[store.state.activeSlide];
        return {
          title: item.title,
          description: item.description
        };
      }),
      computedVisibleCaption: computed(() => {
        const { hud, visibleHudContents } = store.state.preference.general;
        return hud && visibleHudContents.caption;
      }),
      computedVisibleController: computed(() => {
        const { hud, visibleHudContents } = store.state.preference.general;
        if (state2.computedImages.length <= 1)
          return false;
        return hud && visibleHudContents.controller;
      }),
      computedVisiblePaginate: computed(() => {
        const { hud, visibleHudContents } = store.state.preference.general;
        return hud && visibleHudContents.paginate;
      })
    });
    let computes = reactive({
      transitionType: computed(() => {
        switch (store.state.preference.slides.animationType) {
          case "fade":
          case "horizontal":
            return store.state.preference.slides.animationType;
          default:
            return "none";
        }
      })
    });
    let swipeMeta = null;
    let autoplayTimer = void 0;
    let autoplayPause = false;
    let mounted = false;
    let touched = false;
    let active = store.state.preference.slides.initialNumber;
    onChangeActive(!!checkActive(active) ? active : 0);
    function onAnimationControl(sw) {
      state2.animated = sw;
      if (!sw) {
        let autoplay2 = store.state.autoplay && !autoplayPause;
        if (autoplay2)
          runAutoplay(true);
      }
    }
    function onChangeActive(n) {
      store.dispatch("changeActiveSlide", n);
    }
    function checkActive(n) {
      return !!state2.computedImages[n];
    }
    function onStart(e) {
      e.stopPropagation();
      if (e.touches)
        touched = true;
      if (!e.touches && touched)
        return;
      if (e.touches && e.touches.length > 1)
        e.preventDefault();
      if (state2.animated)
        return;
      if (!store.state.preference.slides.swipe)
        return;
      if (store.state.preference.slides.animationType !== "horizontal")
        return;
      if (state2.computedImages.length <= 2)
        return;
      runAutoplay(false);
      swipeMeta = {
        dist: 0,
        startX: e.touches && e.touches[0] ? Math.floor(e.touches[0].clientX) : e.clientX || e.pageX,
        startTime: new Date().getTime()
      };
      state2.swipeMove = true;
    }
    function onMove(e) {
      e.stopPropagation();
      if (!e.touches && touched)
        return;
      if (state2.animated || !state2.swipeMove)
        return;
      if (state2.computedImages.length <= 2)
        return;
      swipeMeta.moveX = e.touches && e.touches[0] ? Math.floor(e.touches[0].clientX) : e.clientX || e.pageX;
      const screenWidth = window.innerWidth;
      const dist = swipeMeta.moveX - swipeMeta.startX;
      state2.swipePos = dist / screenWidth * 100 + (0 - 100 * store.state.activeSlide);
    }
    function onEnd(e) {
      e.stopPropagation();
      function action(dir2) {
        if (dir2)
          next();
        else
          prev();
      }
      function cancel() {
        images.value.cancel();
      }
      if (!e.touches && touched)
        return;
      if (state2.animated || !state2.swipeMove)
        return;
      if (e.touches && e.touches.length > 0)
        return;
      if (state2.computedImages.length <= 2)
        return;
      const screenWidth = window.innerWidth;
      swipeMeta.endX = e.changedTouches && e.changedTouches[0] ? Math.floor(e.changedTouches[0].clientX) : e.clientX || e.pageX;
      let dir = swipeMeta.startX > swipeMeta.endX;
      let elapsedTime = new Date().getTime() - swipeMeta.startTime;
      let distPos = swipeMeta.endX - swipeMeta.startX;
      let percent = Math.abs(distPos) / screenWidth * 100;
      state2.swipePos = void 0;
      state2.swipeMove = false;
      swipeMeta = void 0;
      if (elapsedTime < 60 || percent < 1) {
        if (!autoplayPause)
          runAutoplay(true);
        if (store.state.preference.general.clickVisibleHud && !e.target.closest(".controller")) {
          store.dispatch("changeHud");
        }
        return;
      }
      if (elapsedTime > 300) {
        if (percent > 30)
          action(dir);
        else
          cancel();
      } else {
        if (percent > 5)
          action(dir);
        else
          cancel();
      }
    }
    function onTouchCancel(e) {
      if (store.state.mode)
        return;
      e.stopPropagation();
      if (state2.swipeMove)
        images.value.cancel();
      state2.swipePos = void 0;
      state2.swipeMove = false;
      if (store.state.preference.slides.autoplayPauseOnHover) {
        autoplayPause = false;
        if (store.state.autoplay)
          pause(false, true);
      }
    }
    function onMouseEnter() {
      if (store.state.preference.slides.autoplayPauseOnHover) {
        autoplayPause = true;
        if (store.state.autoplay)
          pause(true, true);
      }
    }
    function onContextMenu() {
      state2.swipePos = void 0;
      state2.swipeMove = false;
    }
    function runAutoplay(sw) {
      if (!mounted)
        return;
      if (sw && !store.state.autoplay)
        return;
      if (sw && !autoplayTimer) {
        if (!store.state.autoplay)
          return;
        const delay = store.state.preference.slides.autoplayDelay;
        const dir = store.state.preference.slides.autoplayDirection;
        const loop = store.state.preference.slides.loop;
        const side = isActiveSide(dir);
        if (!loop && (!loop && side))
          return;
        autoplayTimer = setTimeout(() => {
          if (!dir)
            prev();
          else
            next();
        }, delay);
      } else if (autoplayTimer) {
        clearTimeout(autoplayTimer);
        autoplayTimer = void 0;
      }
    }
    function isActiveSide(dir) {
      if (!(state2.computedImages && state2.computedImages.length > 0))
        return;
      return !dir && store.state.activeSlide === 0 || dir && store.state.activeSlide >= state2.computedImages.length - 1;
    }
    function change(n, userAnimationType = void 0) {
      if (state2.animated || !checkActive(n) || !images.value)
        return;
      onChangeActive(n);
      runAutoplay(false);
      images.value.play(n, userAnimationType);
    }
    function prev() {
      if (!(state2.computedImages && state2.computedImages.length > 0))
        return;
      let n = move(state2.computedImages.length, store.state.activeSlide - 1, store.state.preference.slides.loop);
      change(n);
    }
    function next() {
      if (!(state2.computedImages && state2.computedImages.length > 0))
        return;
      let n = move(state2.computedImages.length, store.state.activeSlide + 1, store.state.preference.slides.loop);
      change(n);
    }
    function autoplay(sw = void 0) {
      store.dispatch("changeAutoplay", sw);
    }
    function pause(sw = void 0, inside = false) {
      if (sw === void 0)
        return;
      if (!store.state.autoplay)
        return;
      if (!inside)
        autoplayPause = sw;
      if (!sw || sw && !state2.animated)
        runAutoplay(!sw);
    }
    onMounted(() => {
      mounted = true;
      if (store.state.autoplay)
        runAutoplay(true);
    });
    onUnmounted(() => {
      mounted = false;
      if (autoplayTimer) {
        clearTimeout(autoplayTimer);
        autoplayTimer = void 0;
      }
    });
    watch(() => store.state.autoplay, (sw) => {
      if (sw) {
        if (!autoplayPause)
          runAutoplay(sw);
      } else {
        runAutoplay(sw);
      }
    });
    expose({
      change,
      prev,
      next,
      autoplay,
      pause
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", {
        class: normalizeClass([
          "slideshow-slides",
          unref(state2).swipeMove && "swipe-move",
          `slideshow-slides--${unref(computes).transitionType}`
        ]),
        onTouchstart: onStart,
        onTouchmove: onMove,
        onTouchend: onEnd,
        onMousedown: onStart,
        onMousemove: onMove,
        onMouseup: onEnd,
        onMouseleave: onTouchCancel,
        onMouseenter: onMouseEnter,
        onContextmenu: onContextMenu
      }, [
        createVNode(Images, {
          ref: (_value, _refs) => {
            _refs["images"] = _value;
            images.value = _value;
          },
          "initial-active": unref(store).state.activeSlide,
          items: unref(state2).computedImages,
          "animation-type": unref(computes).transitionType,
          duration: unref(store).state.preference.slides.animationSpeed,
          "image-type": unref(store).state.preference.style.imageType,
          "image-size": unref(store).state.preference.style.imageScale,
          loop: unref(store).state.preference.slides.loop,
          "move-pos": unref(state2).swipePos,
          onAnimationControl,
          onChangeActive
        }, null, 8, ["initial-active", "items", "animation-type", "duration", "image-type", "image-size", "loop", "move-pos"]),
        unref(state2).computedVisibleCaption ? (openBlock(), createBlock(Caption, {
          key: 0,
          active: unref(store).state.activeSlide,
          title: unref(state2).computedCaption.title,
          description: unref(state2).computedCaption.description,
          "animation-type": unref(store).state.preference.slides.captionAnimationType,
          "animation-speed": unref(store).state.preference.slides.captionAnimationSpeed,
          position: unref(store).state.preference.style.captionPosition,
          scale: unref(store).state.preference.style.captionScale
        }, null, 8, ["active", "title", "description", "animation-type", "animation-speed", "position", "scale"])) : createCommentVNode("", true),
        unref(state2).computedVisibleController ? (openBlock(), createBlock(Controller, {
          key: 1,
          disabled: unref(state2).animated,
          "show-prev": unref(state2).computedShowPrevButton,
          "show-next": unref(state2).computedShowNextButton,
          class: "slideshow-slides__controller",
          onClickPrev: prev,
          onClickNext: next
        }, null, 8, ["disabled", "show-prev", "show-next"])) : createCommentVNode("", true),
        unref(state2).computedVisiblePaginate ? (openBlock(), createBlock(Paginate, {
          key: 2,
          total: unref(state2).computedImages.length,
          current: unref(store).state.activeSlide,
          class: "slideshow-slides__paginate"
        }, null, 8, ["total", "current"])) : createCommentVNode("", true)
      ], 34);
    };
  }
};
var Empty_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$9 = { class: "empty__wrap" };
const _hoisted_2$7 = { class: "empty__title" };
const _hoisted_3$7 = { class: "empty__description" };
const _sfc_main$b = {
  props: {
    title: String,
    description: String
  },
  setup(__props) {
    const { t } = i18n.global;
    function onClickWrapper() {
      if (store.state.preference.general.clickVisibleHud) {
        store.dispatch("changeHud");
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", {
        class: "empty",
        onClick: onClickWrapper
      }, [
        createElementVNode("div", _hoisted_1$9, [
          createVNode(Icon, {
            "icon-name": "frown",
            class: "empty__icon"
          }),
          createElementVNode("h2", _hoisted_2$7, toDisplayString(__props.title || unref(t)("title.emptySlide")), 1),
          createElementVNode("p", _hoisted_3$7, toDisplayString(__props.description || unref(t)("description.addSlides")), 1)
        ])
      ]);
    };
  }
};
var SlidesEmpty = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-15a3e44a"]]);
var index_scss_vue_type_style_index_0_src_scoped_true_lang$3 = "";
const _hoisted_1$8 = {
  key: 0,
  class: "slideshow-navigation__item"
};
const _hoisted_2$6 = ["title"];
const _hoisted_3$6 = {
  key: 1,
  class: "slideshow-navigation__item"
};
const _hoisted_4$6 = ["title"];
const _hoisted_5$4 = {
  key: 2,
  class: "slideshow-navigation__item"
};
const _hoisted_6$3 = ["title"];
const _hoisted_7$2 = { key: 0 };
const _sfc_main$a = {
  setup(__props, { expose }) {
    const { t } = i18n.global;
    let state2 = reactive({
      activeMenu: false,
      activeFullscreen: false
    });
    let computes = reactive({
      visibleThumbnail: computed(() => {
        return store.state.slides && store.state.slides.length > 1;
      }),
      visibleAutoplay: computed(() => {
        const { slides: slides2, preference: preference2 } = store.state;
        if (!preference2.slides.autoplay)
          return false;
        return slides2 && slides2.length > 0;
      }),
      visibleGroup: computed(() => {
        if (!store.state.preference.general.visibleHudContents.group)
          return false;
        return store.state.tree && Object.keys(store.state.tree).length > 1;
      })
    });
    function onClickAutoplayButton() {
      if (slides)
        slides.autoplay();
    }
    function onClickMenuButton(e) {
      if (e)
        e.stopPropagation();
      if (state2.activeMenu) {
        switchActiveMenu(false);
      } else {
        window.on("click.navigationMenu", () => switchActiveMenu(false));
        switchActiveMenu(true);
      }
    }
    function switchActiveMenu(sw) {
      state2.activeMenu = sw;
      if (!sw)
        window.off("click.navigationMenu");
    }
    function onClickContextItem(key) {
      switchActiveMenu(false);
      switch (key) {
        case "preference":
          store.dispatch("changeMode", "preference");
          break;
        case "thumbnail":
          store.dispatch("changeMode", "thumbnail");
          break;
        case "fullscreen":
          fullscreen(!state2.activeFullscreen);
          state2.activeFullscreen = !state2.activeFullscreen;
          break;
      }
    }
    function onTouchStart(e) {
      if (e.touches && e.touches.length > 1)
        e.preventDefault();
    }
    function onClickWrapper(e) {
      e.stopPropagation();
    }
    function onClickGroup() {
      store.dispatch("changeMode", "group");
    }
    function blur() {
      switchActiveMenu(false);
    }
    onMounted(() => {
      document.on("fullscreenchange.slideshow", () => {
        state2.activeFullscreen = !!document.fullscreenElement;
      });
    });
    onUnmounted(() => {
      document.off("fullscreenchange.slideshow");
    });
    expose({
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", {
        class: "slideshow-navigation",
        onTouchstart: onTouchStart,
        onClick: onClickWrapper
      }, [
        unref(computes).visibleAutoplay ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
          createElementVNode("button", {
            type: "button",
            title: unref(t)("base.autoplay"),
            class: normalizeClass(unref(store).state.autoplay ? "active" : ""),
            onClick: onClickAutoplayButton
          }, [
            createVNode(Icon, { "icon-name": "play-circle" })
          ], 10, _hoisted_2$6)
        ])) : createCommentVNode("", true),
        unref(computes).visibleGroup ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
          createElementVNode("button", {
            type: "button",
            title: unref(t)("base.group"),
            onClick: onClickGroup
          }, [
            createVNode(Icon, {
              "icon-name": "folder",
              class: "folder"
            })
          ], 8, _hoisted_4$6)
        ])) : createCommentVNode("", true),
        unref(store).state.preference.general.visibleHudContents.menu ? (openBlock(), createElementBlock("div", _hoisted_5$4, [
          createElementVNode("button", {
            type: "button",
            title: unref(t)("base.menu"),
            class: normalizeClass(unref(state2).activeMenu ? "on" : ""),
            onClick: onClickMenuButton
          }, [
            createVNode(Icon, { "icon-name": "menu" })
          ], 10, _hoisted_6$3),
          createElementVNode("div", {
            class: normalizeClass([
              "slideshow-navigation-context",
              unref(state2).activeMenu && "slideshow-navigation-context--on"
            ])
          }, [
            createElementVNode("ul", null, [
              createElementVNode("li", null, [
                createElementVNode("button", {
                  type: "button",
                  onClick: _cache[0] || (_cache[0] = ($event) => onClickContextItem("preference"))
                }, toDisplayString(unref(t)("base.preference")), 1)
              ]),
              unref(computes).visibleThumbnail ? (openBlock(), createElementBlock("li", _hoisted_7$2, [
                createElementVNode("button", {
                  type: "button",
                  onClick: _cache[1] || (_cache[1] = ($event) => onClickContextItem("thumbnail"))
                }, toDisplayString(unref(t)("title.thumbnailView")), 1)
              ])) : createCommentVNode("", true),
              createElementVNode("li", null, [
                createElementVNode("button", {
                  type: "button",
                  class: normalizeClass([unref(state2).activeFullscreen && "on"]),
                  onClick: _cache[2] || (_cache[2] = ($event) => onClickContextItem("fullscreen"))
                }, toDisplayString(unref(t)("base.fullscreen")), 3)
              ])
            ])
          ], 2)
        ])) : createCommentVNode("", true)
      ], 32);
    };
  }
};
var Navigation = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-45880376"]]);
var Side_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$7 = { class: "preference-side" };
const _hoisted_2$5 = ["title", "disabled"];
const _hoisted_3$5 = ["title", "disabled"];
const _hoisted_4$5 = ["title", "disabled"];
const _hoisted_5$3 = ["title", "disabled"];
const _hoisted_6$2 = ["title", "disabled"];
const _hoisted_7$1 = ["title", "disabled"];
const _sfc_main$9 = {
  props: {
    mode: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { t } = i18n.global;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", _hoisted_1$7, [
        createElementVNode("nav", null, [
          createElementVNode("button", {
            type: "button",
            title: unref(t)("base.general"),
            disabled: props.mode === "general",
            class: "preference-side__button",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click-menu", "general"))
          }, [
            createElementVNode("span", null, [
              createVNode(Icon, { "icon-name": "tool" }),
              createElementVNode("em", null, toDisplayString(unref(t)("base.general")), 1)
            ])
          ], 8, _hoisted_2$5),
          unref(store).state.usePreference.slides ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            title: unref(t)("base.slides"),
            disabled: props.mode === "slides",
            class: "preference-side__button",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("click-menu", "slides"))
          }, [
            createElementVNode("span", null, [
              createVNode(Icon, { "icon-name": "copy" }),
              createElementVNode("em", null, toDisplayString(unref(t)("base.slides")), 1)
            ])
          ], 8, _hoisted_3$5)) : createCommentVNode("", true),
          unref(store).state.usePreference.style ? (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            title: unref(t)("base.style"),
            disabled: props.mode === "style",
            class: "preference-side__button",
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("click-menu", "style"))
          }, [
            createElementVNode("span", null, [
              createVNode(Icon, { "icon-name": "droplet" }),
              createElementVNode("em", null, toDisplayString(unref(t)("base.style")), 1)
            ])
          ], 8, _hoisted_4$5)) : createCommentVNode("", true),
          unref(store).state.usePreference.data ? (openBlock(), createElementBlock("button", {
            key: 2,
            type: "button",
            title: unref(t)("base.data"),
            disabled: props.mode === "data",
            class: "preference-side__button",
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("click-menu", "data"))
          }, [
            createElementVNode("span", null, [
              createVNode(Icon, { "icon-name": "database" }),
              createElementVNode("em", null, toDisplayString(unref(t)("base.data")), 1)
            ])
          ], 8, _hoisted_5$3)) : createCommentVNode("", true),
          unref(store).state.usePreference.keyboard ? (openBlock(), createElementBlock("button", {
            key: 3,
            type: "button",
            title: unref(t)("base.keyboard"),
            disabled: props.mode === "keyboard",
            class: "preference-side__button",
            onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("click-menu", "keyboard"))
          }, [
            createElementVNode("span", null, [
              createVNode(Icon, { "icon-name": "command" }),
              createElementVNode("em", null, toDisplayString(unref(t)("base.keyboard")), 1)
            ])
          ], 8, _hoisted_6$2)) : createCommentVNode("", true),
          unref(store).state.usePreference.information ? (openBlock(), createElementBlock("button", {
            key: 4,
            type: "button",
            title: unref(t)("base.information"),
            disabled: props.mode === "information",
            class: "preference-side__button",
            onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("click-menu", "information"))
          }, [
            createElementVNode("span", null, [
              createVNode(Icon, { "icon-name": "info" }),
              createElementVNode("em", null, toDisplayString(unref(t)("base.information")), 1)
            ])
          ], 8, _hoisted_7$1)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
var Side = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-2010a872"]]);
var index_scss_vue_type_style_index_0_src_scoped_true_lang$2 = "";
const _hoisted_1$6 = { class: "preference-header" };
const _hoisted_2$4 = { class: "preference-header__body" };
const _hoisted_3$4 = { class: "preference-header__nav" };
const _hoisted_4$4 = ["title"];
const _hoisted_5$2 = ["title"];
const _sfc_main$8 = {
  setup(__props) {
    const { t } = i18n.global;
    const preference2 = convertPureObject$1(store.state.preference);
    const tree = convertPureObject$1(store.state.tree);
    let state2 = reactive({
      tab: "general",
      structure: {
        general: preference2.general,
        slides: preference2.slides,
        style: preference2.style,
        data: { tree },
        keyboard: preference2.keyboard
      },
      computedContentComponent: computed(() => {
        switch (state2.tab) {
          case "general":
          default:
            return defineAsyncComponent(() => import("./General.js"));
          case "slides":
            if (!store.state.usePreference.slides)
              return;
            return defineAsyncComponent(() => import("./Slides.js"));
          case "style":
            if (!store.state.usePreference.style)
              return;
            return defineAsyncComponent(() => import("./Style.js"));
          case "data":
            if (!store.state.usePreference.data)
              return;
            return defineAsyncComponent(() => import("./index.js"));
          case "keyboard":
            if (!store.state.usePreference.keyboard)
              return;
            return defineAsyncComponent(() => import("./Keyboard.js"));
          case "information":
            if (!store.state.usePreference.information)
              return;
            return defineAsyncComponent(() => import("./Information.js"));
        }
      }),
      computedHeaderContent: computed(() => {
        switch (state2.tab) {
          case "general":
          default:
            return {
              title: t("base.general"),
              description: t("preference.header.general")
            };
          case "slides":
            return {
              title: t("base.slides"),
              description: t("preference.header.slides")
            };
          case "style":
            return {
              title: t("base.style"),
              description: t("preference.header.style")
            };
          case "data":
            return {
              title: t("base.data"),
              description: t("preference.header.data")
            };
          case "keyboard":
            return {
              title: t("base.keyboard"),
              description: t("preference.header.keyboard")
            };
          case "information":
            return {
              title: t("base.information"),
              description: t("preference.header.information")
            };
        }
      })
    });
    const content = ref(null);
    function onTouchStart(e) {
      if (e.touches && e.touches.length > 1)
        e.preventDefault();
    }
    function onClose() {
      store.dispatch("changeMode", null);
    }
    function onChangeTab(name) {
      state2.tab = name;
    }
    function onUpdateFields(structure) {
      state2.structure[state2.tab] = structure;
    }
    function onSubmit(e) {
      e.preventDefault();
      if (!confirm(t("confirm.applyRestart")))
        return;
      try {
        let tree2 = convertPureObject$1(state2.structure.data.tree);
        checkTree(tree2);
        let preference3 = {
          general: convertPureObject$1(state2.structure.general),
          slides: convertPureObject$1(state2.structure.slides),
          style: convertPureObject$1(state2.structure.style),
          keyboard: convertPureObject$1(state2.structure.keyboard)
        };
        if (!checkPreference(preference3))
          throw new Error("Bad preference data.");
        store.dispatch("changePreference", preference3);
        store.dispatch("changeMode", null);
        store.dispatch("changeActiveSlide", store.state.preference.slides.initialNumber);
        store.dispatch("changeAutoplay", false);
        store.commit("updateUseKeyboardEvent", true);
        store.dispatch("changeTree", tree2);
        if (!Object.keys(tree2).filter((key) => key === store.state.group).length) {
          store.dispatch("changeGroup", Object.keys(tree2)[0]);
        }
        if (useProps.preference || useProps.tree) {
          main.update("preference");
          main.update("tree");
        } else {
          main.restart().then();
        }
      } catch (e2) {
        if (window.dev)
          console.error(e2.message);
        alert(t("alert.failedApply"));
      }
    }
    onMounted(() => {
      if (slides)
        slides.pause(true);
    });
    onUnmounted(() => {
      if (slides)
        slides.pause(false);
    });
    watch(() => state2.tab, () => content.value.scrollTo(0, 0));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", {
        class: "preference",
        onClick: onClose,
        onTouchstart: onTouchStart
      }, [
        createElementVNode("div", {
          class: "preference__wrap",
          onClick: _cache[0] || (_cache[0] = (e) => {
            e.stopPropagation();
          })
        }, [
          createVNode(Side, {
            mode: unref(state2).tab,
            onClickMenu: onChangeTab
          }, null, 8, ["mode"]),
          createElementVNode("form", {
            class: "preference__body",
            onSubmit
          }, [
            createElementVNode("header", _hoisted_1$6, [
              createElementVNode("div", _hoisted_2$4, [
                createElementVNode("h2", null, toDisplayString(unref(state2).computedHeaderContent.title), 1),
                createElementVNode("p", null, toDisplayString(unref(state2).computedHeaderContent.description), 1)
              ]),
              createElementVNode("nav", _hoisted_3$4, [
                createElementVNode("button", {
                  type: "submit",
                  title: unref(t)("base.apply"),
                  onClick: onSubmit
                }, [
                  createVNode(Icon, { "icon-name": "check" })
                ], 8, _hoisted_4$4),
                createElementVNode("button", {
                  type: "button",
                  title: unref(t)("base.close"),
                  onClick: onClose
                }, [
                  createVNode(Icon, { "icon-name": "x" })
                ], 8, _hoisted_5$2)
              ])
            ]),
            createElementVNode("div", {
              ref: (_value, _refs) => {
                _refs["content"] = _value;
                content.value = _value;
              },
              class: "preference__content"
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(unref(state2).computedContentComponent), {
                structure: unref(state2).structure[unref(state2).tab],
                onUpdate: onUpdateFields
              }, null, 8, ["structure"]))
            ], 512)
          ], 32)
        ])
      ], 32);
    };
  }
};
var Preference = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-4a2377e7"]]);
var Item_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$5 = { class: "group-item__image" };
const _hoisted_2$3 = ["src"];
const _hoisted_3$3 = { class: "group-item__body" };
const _hoisted_4$3 = {
  key: 0,
  class: "group-item__meta"
};
const _sfc_main$7 = {
  props: {
    src: String,
    name: String,
    description: String,
    count: Number,
    selected: Boolean
  },
  emits: ["select"],
  setup(__props, { emit: emits }) {
    const name = "GroupItem";
    function onSelectItem(e) {
      e.preventDefault();
      emits("select");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "group-item",
          __props.selected && "group-item--selected"
        ])
      }, [
        createElementVNode("a", {
          class: normalizeClass([
            "group-item-wrap",
            __props.selected && "group-item-wrap--selected"
          ]),
          onClick: onSelectItem
        }, [
          createElementVNode("figure", _hoisted_1$5, [
            __props.src ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: __props.src,
              alt: name
            }, null, 8, _hoisted_2$3)) : (openBlock(), createBlock(Icon, {
              key: 1,
              "icon-name": "x"
            }))
          ]),
          createElementVNode("div", _hoisted_3$3, [
            createElementVNode("h3", {
              class: normalizeClass([!name])
            }, toDisplayString(name), 3),
            createElementVNode("p", null, toDisplayString(__props.description), 1),
            __props.count !== void 0 ? (openBlock(), createElementBlock("ul", _hoisted_4$3, [
              createElementVNode("li", null, [
                createElementVNode("b", null, "Count: " + toDisplayString(__props.count), 1)
              ])
            ])) : createCommentVNode("", true)
          ])
        ], 2)
      ], 2);
    };
  }
};
var Item = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-6e770526"]]);
var index_scss_vue_type_style_index_0_src_scoped_true_lang$1 = "";
const _hoisted_1$4 = { class: "groups-header" };
const _hoisted_2$2 = { class: "groups-header__body" };
const _hoisted_3$2 = { class: "groups-header__nav" };
const _hoisted_4$2 = ["title"];
const _hoisted_5$1 = { class: "groups__body" };
const _hoisted_6$1 = { class: "groups-index" };
const _sfc_main$6 = {
  setup(__props) {
    const { t } = i18n.global;
    let computes = reactive({
      index: computed(() => {
        const { tree, group } = store.state;
        return Object.keys(tree).map((key) => {
          switch (typeof tree[key]) {
            case "object":
              const slide = tree[key].slides;
              if (!slide)
                return false;
              const firstSlide = slide && slide.length > 0 ? slide[0] : null;
              let src = firstSlide ? firstSlide.thumbnail || firstSlide.src : null;
              return {
                key,
                name: tree[key].name,
                description: tree[key].description,
                count: Array.isArray(tree[key].slides) ? tree[key].slides.length : void 0,
                src,
                selected: key === group
              };
            default:
              return false;
          }
        }).filter(Boolean);
      })
    });
    function onTouchStart(e) {
      if (e.touches && e.touches.length > 1)
        e.preventDefault();
    }
    function onClose() {
      store.dispatch("changeMode", null);
    }
    function onSelectSlide(key) {
      if (!confirm(t("confirm.selectGroup")))
        return;
      store.dispatch("changeGroup", key);
      store.dispatch("changeMode", null);
      main.update("group");
      main.restart();
    }
    onMounted(() => {
      if (slides)
        slides.pause(true);
    });
    onUnmounted(() => {
      if (slides)
        slides.pause(false);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", {
        class: "groups",
        onTouchstart: onTouchStart,
        onClick: onClose
      }, [
        createElementVNode("div", {
          class: "groups__wrap",
          onClick: _cache[0] || (_cache[0] = (e) => {
            e.stopPropagation();
          })
        }, [
          createElementVNode("header", _hoisted_1$4, [
            createElementVNode("div", _hoisted_2$2, [
              createElementVNode("h2", null, toDisplayString(unref(t)("title.selectGroup")), 1),
              createElementVNode("p", null, toDisplayString(unref(t)("description.selectGroup")), 1)
            ]),
            createElementVNode("nav", _hoisted_3$2, [
              createElementVNode("button", {
                type: "button",
                title: unref(t)("base.close"),
                onClick: onClose
              }, [
                createVNode(Icon, { "icon-name": "x" })
              ], 8, _hoisted_4$2)
            ])
          ]),
          createElementVNode("div", _hoisted_5$1, [
            createElementVNode("ul", _hoisted_6$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(computes).index, (item) => {
                return openBlock(), createElementBlock("li", null, [
                  createVNode(Item, {
                    key: item.key,
                    src: item.src,
                    name: item.name,
                    description: item.description,
                    count: item.count,
                    selected: item.selected,
                    onSelect: ($event) => onSelectSlide(item.key)
                  }, null, 8, ["src", "name", "description", "count", "selected", "onSelect"])
                ]);
              }), 256))
            ])
          ])
        ])
      ], 32);
    };
  }
};
var Group = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-27f62267"]]);
var Close_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$3 = ["title"];
const _sfc_main$5 = {
  props: { title: String },
  emits: { "close": null },
  setup(__props, { emit: emits }) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        title: __props.title,
        class: "button-close",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
      }, [
        createVNode(Icon, { "icon-name": "x" })
      ], 8, _hoisted_1$3);
    };
  }
};
var ButtonClose = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-1368de1f"]]);
var index_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$2 = {
  key: 0,
  class: "thumbnail__header"
};
const _hoisted_2$1 = { key: 0 };
const _hoisted_3$1 = { class: "thumbnail__body" };
const _hoisted_4$1 = {
  key: 0,
  class: "thumbnail__index"
};
const _hoisted_5 = ["disabled", "onClick"];
const _hoisted_6 = ["src", "alt"];
const _hoisted_7 = {
  key: 1,
  class: "thumbnail__empty"
};
const _sfc_main$4 = {
  setup(__props) {
    const { t } = i18n.global;
    let computes = reactive({
      index: computed(() => {
        return store.state.slides.map((o) => __spreadProps(__spreadValues({}, o), {
          thumbnail: o.thumbnail || o.src
        }));
      }),
      title: computed(() => {
        return store.state.tree[store.state.group].name;
      }),
      description: computed(() => {
        return store.state.tree[store.state.group].description;
      })
    });
    function onSelect(n) {
      if (slides)
        slides.change(n, "none");
      store.dispatch("changeMode", null);
    }
    function onClose() {
      store.dispatch("changeMode", null);
    }
    function onTouchStart(e) {
      if (e.touches && e.touches.length > 1)
        e.preventDefault();
    }
    onMounted(() => {
      if (slides)
        slides.pause(true);
    });
    onUnmounted(() => {
      if (slides)
        slides.pause(false);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", {
        class: "thumbnail",
        onTouchstart: onTouchStart
      }, [
        unref(computes).title ? (openBlock(), createElementBlock("header", _hoisted_1$2, [
          createElementVNode("h2", null, toDisplayString(unref(computes).title), 1),
          unref(computes).description ? (openBlock(), createElementBlock("p", _hoisted_2$1, toDisplayString(unref(computes).description), 1)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_3$1, [
          unref(computes).index && unref(computes).index.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_4$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(computes).index, (o, k) => {
              return openBlock(), createElementBlock("li", null, [
                createElementVNode("button", {
                  type: "button",
                  disabled: k === unref(store).state.activeSlide,
                  onClick: ($event) => onSelect(k)
                }, [
                  createElementVNode("img", {
                    src: o.thumbnail,
                    alt: o.title
                  }, null, 8, _hoisted_6)
                ], 8, _hoisted_5)
              ]);
            }), 256))
          ])) : (openBlock(), createElementBlock("div", _hoisted_7, [
            createVNode(Icon, { "icon-name": "frown" }),
            createElementVNode("p", null, toDisplayString(unref(t)("thumbnail.empty")), 1)
          ]))
        ]),
        createVNode(ButtonClose, {
          title: unref(t)("base.close"),
          class: "thumbnail__close",
          onClick: onClose
        }, null, 8, ["title"])
      ], 32);
    };
  }
};
var Thumbnail = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-02571ce2"]]);
var Container_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _sfc_main$3 = {
  props: { error: Object },
  setup(__props) {
    const props = __props;
    const { t } = i18n.global;
    const slides$1 = ref(null);
    const navigation = ref(null);
    let computes = reactive({
      mode: computed(() => {
        switch (store.state.mode) {
          case "preference":
          case "group":
          case "thumbnail":
            return store.state.mode;
          default:
            return null;
        }
      }),
      existSlides: computed(() => {
        return store.state.slides && store.state.slides.length > 0;
      }),
      showThumbnail: computed(() => computes.mode === "thumbnail"),
      showPreference: computed(() => computes.mode === "preference"),
      showGroup: computed(() => computes.mode === "group"),
      emptyTitle: computed(() => {
        return props.error ? props.error.title : void 0;
      }),
      emptyDescription: computed(() => {
        return props.error ? props.error.description : void 0;
      })
    });
    let keys = [];
    function onKeyup(e) {
      if (!store.state.keyboardEvent)
        return;
      if (keys.length > 1) {
        const idx = keys.indexOf(e.keyCode);
        if (idx > -1)
          keys.splice(idx);
        return;
      }
      if (navigation.value)
        navigation.value.blur();
      if (computes.mode) {
        switch (e.keyCode) {
          case 27:
            store.dispatch("changeMode", null);
            break;
        }
      } else {
        switch (e.keyCode) {
          case 37:
            if (slides)
              slides.prev();
            break;
          case 39:
            if (slides)
              slides.next();
            break;
          case 65:
            if (slides && store.state.preference.slides.autoplay) {
              slides.autoplay();
            }
            break;
          case 83:
            store.dispatch("changeMode", "preference");
            break;
          case 84:
            store.dispatch("changeMode", "thumbnail");
            break;
          case 82:
            if (confirm(t("confirm.restart")) && main) {
              main.restart().then();
            }
            break;
          case 71:
            if (store.state.tree && Object.keys(store.state.tree).length > 1) {
              store.dispatch("changeMode", "group");
            }
            break;
          case 72:
            store.dispatch("changeHud");
            break;
        }
      }
      keys = [];
    }
    function onKeydown(e) {
      if (!store.state.keyboardEvent)
        return;
      if (keys.indexOf(e.keyCode) > -1)
        return;
      keys.push(e.keyCode);
    }
    onMounted(() => {
      setupSlides(slides$1.value);
      if (store.state.preference.keyboard.enabled) {
        window.on("keyup.slideshow-keyboard", onKeyup);
        window.on("keydown.slideshow-keyboard", onKeydown);
      } else {
        window.off("keyup.slideshow-keyboard");
        window.off("keydown.slideshow-keyboard");
      }
    });
    onUnmounted(() => {
      if (store.state.preference.keyboard.enabled) {
        window.off("keyup.slideshow-keyboard");
        window.off("keydown.slideshow-keyboard");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "slideshow",
          unref(store).state.preference.general.hoverVisibleHud && "slideshow--hover"
        ])
      }, [
        unref(computes).existSlides ? (openBlock(), createBlock(_sfc_main$c, {
          key: 0,
          ref: (_value, _refs) => {
            _refs["slides"] = _value;
            slides$1.value = _value;
          },
          class: "slideshow__slides"
        }, null, 512)) : (openBlock(), createBlock(SlidesEmpty, {
          key: 1,
          title: unref(computes).emptyTitle,
          description: unref(computes).emptyDescription
        }, null, 8, ["title", "description"])),
        unref(store).state.preference.general.hud ? (openBlock(), createBlock(Navigation, {
          key: 2,
          ref: (_value, _refs) => {
            _refs["navigation"] = _value;
            navigation.value = _value;
          },
          class: "slideshow__navigation"
        }, null, 512)) : createCommentVNode("", true),
        (openBlock(), createBlock(Teleport, { to: "#slideshowModal" }, [
          unref(computes).showGroup ? (openBlock(), createBlock(Group, { key: 0 })) : createCommentVNode("", true),
          unref(computes).showThumbnail ? (openBlock(), createBlock(Thumbnail, { key: 1 })) : createCommentVNode("", true),
          unref(computes).showPreference ? (openBlock(), createBlock(Preference, { key: 2 })) : createCommentVNode("", true)
        ]))
      ], 2);
    };
  }
};
var Container = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-58ec9866"]]);
var Unit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {};
const _withScopeId = (n) => (pushScopeId("data-v-d79fe816"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "loading-unit" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, null, -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("em", null, null, -1));
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("p", _hoisted_1$1, _hoisted_4);
}
var LoadingUnit = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__scopeId", "data-v-d79fe816"]]);
var Intro_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "loading-intro loading-intro--move" };
const _sfc_main$1 = {
  setup(__props) {
    const { t } = i18n.global;
    let state2 = reactive({ show: false });
    let mounted = false;
    onMounted(() => {
      mounted = true;
      sleep(50).then(() => {
        if (mounted)
          state2.show = true;
      });
    });
    onUnmounted(() => {
      mounted = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        unref(state2).show ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createVNode(LoadingUnit, { class: "unit" }),
          createElementVNode("strong", null, toDisplayString(unref(t)("title.loading")), 1)
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
var LoadingIntro = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-56095c8e"]]);
const _sfc_main = {
  props: {
    preference: Object,
    group: String,
    tree: [Object, Array]
  },
  emits: ["update-preference", "update-tree", "update-group"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    if (window)
      window.dev = false;
    const { locale } = i18n.global;
    let state2 = reactive({
      dev: false,
      loading: true,
      error: void 0
    });
    let restarting = false;
    function updateTheme(color) {
      let theme;
      switch (color) {
        case "light":
        case "dark":
          theme = color;
          break;
        default:
          theme = "system";
          break;
      }
      const $html = document.querySelector("html");
      $html.dataset["color"] = theme;
    }
    function error(sw) {
      if (sw) {
        state2.error = {
          title: "Error slides",
          description: "\uC2AC\uB77C\uC774\uB4DC\uB97C \uAC00\uC838\uC624\uB294\uB370 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4."
        };
      } else {
        state2.error = void 0;
      }
    }
    function fetchPreference() {
      if (props.preference) {
        disabled("preference");
        if (checkPreference(props.preference)) {
          let preference2 = convertPureObject$1(props.preference);
          store.dispatch("changePreference", preference2);
          store.dispatch("changeActiveSlide", preference2.slides.initialNumber);
        }
      } else {
        const storagePreference = get("preference") || baseOptions.preference;
        if (storagePreference && checkPreference(storagePreference)) {
          store.dispatch("changePreference", storagePreference);
          store.dispatch("changeActiveSlide", storagePreference.slides.initialNumber);
        } else {
          set("preference", convertPureObject$1(store.state.preference));
        }
      }
    }
    function fetchGroup() {
      let group;
      if (props.group) {
        disabled("group");
        group = props.group;
      } else {
        let storageGroup = get("group");
        group = storageGroup || "default";
      }
      store.dispatch("changeGroup", group);
    }
    function fetchTree() {
      try {
        let tree;
        if (props.tree) {
          disabled("tree");
          tree = props.tree;
        } else {
          const storageSlides = get("tree");
          tree = !!storageSlides ? storageSlides : baseOptions.tree;
        }
        if (Array.isArray(tree)) {
          tree = {
            default: { slides: tree }
          };
        }
        store.dispatch("changeTree", tree);
        error(false);
      } catch (e) {
        if (window.dev)
          console.error(e.message);
        error(true);
      }
    }
    async function fetchSlides() {
      try {
        const { group, tree } = store.state;
        let slides2 = tree[group] ? tree[group].slides : [];
        if (slides2 && typeof slides2 === "string") {
          let getSlides = await getApiData(slides2);
          checkSlideItems(getSlides);
          slides2 = getSlides;
        } else if (!(slides2 && Array.isArray(slides2))) {
          slides2 = null;
        }
        store.dispatch("changeSlides", slides2);
        error(false);
      } catch (e) {
        if (window.dev)
          console.error(e.message);
        store.dispatch("changeSlides", null);
        error(true);
      }
    }
    function start() {
      sleep(60).then(() => {
        state2.loading = false;
      });
    }
    function stop() {
      state2.loading = true;
    }
    async function restart() {
      if (restarting)
        return;
      restarting = true;
      stop();
      updateTheme(store.state.preference.style.screenColor);
      locale.value = store.state.preference.general.language;
      await fetchSlides();
      await sleep(800);
      start();
      restarting = false;
    }
    function update(type) {
      switch (type) {
        case "preference":
          context.emit("update-preference", convertPureObject$1(store.state.preference));
          break;
        case "tree":
          context.emit("update-tree", convertPureObject$1(store.state.tree));
          break;
        case "group":
          context.emit("update-group", store.state.group);
          break;
      }
    }
    onMounted(() => {
      const app2 = getCurrentInstance();
      setup(app2.exposed, {
        preference: !!props.preference,
        tree: !!props.tree,
        group: !!props.group
      });
      fetchTree();
      fetchGroup();
      fetchSlides().then(() => start());
    });
    watch(() => props.preference, () => {
      fetchPreference();
      restart().then();
    });
    watch(() => props.tree, () => {
      fetchTree();
      restart().then();
    });
    watch(() => props.group, () => {
      fetchGroup();
      restart().then();
    });
    initCustomEvent();
    fetchPreference();
    updateTheme(store.state.preference.style.screenColor);
    locale.value = store.state.preference.general.language;
    expose({
      start,
      stop,
      restart,
      update
    });
    return (_ctx, _cache) => {
      return unref(state2).loading ? (openBlock(), createBlock(LoadingIntro, { key: 0 })) : (openBlock(), createBlock(Container, {
        key: 1,
        error: unref(state2).error
      }, null, 8, ["error"]));
    };
  }
};
var app = "";
export { Icon as I, _export_sfc as _, getFileData as a, getApiData as b, convertPureObject$1 as c, checkTree as d, _sfc_main as e, getValueFromType as g, i18n as i, main as m, store as s };
//# sourceMappingURL=exports.js.map
