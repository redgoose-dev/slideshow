// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"kAaS7":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "e80cae8e147655b4";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"i87aF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _vue = require("vue");
var _store = require("./store");
var _storeDefault = parcelHelpers.interopDefault(_store);
var _i18N = require("./i18n");
var _i18NDefault = parcelHelpers.interopDefault(_i18N);
// components
// import App from './screen/App.vue';
var _fooVue = require("./Foo.vue");
var _fooVueDefault = parcelHelpers.interopDefault(_fooVue);
// style
var _mainScss = require("./scss/main.scss");
// check app element
if (!document.getElementById('app')) {
    let element = document.createElement('main');
    element.setAttribute('id', 'app');
    document.body.append(element);
}
// check modal element
if (!document.getElementById('modal')) {
    let element = document.createElement('div');
    element.setAttribute('id', 'modal');
    document.body.append(element);
}
// initial app and mount
_vue.createApp(_fooVueDefault.default).use(_storeDefault.default).use(_i18NDefault.default).mount('#app');

},{"vue":"eg0LR","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc","./scss/main.scss":"bKzMy","./store":"lssnV","./i18n":"FBreR","./Foo.vue":"6yot6"}],"eg0LR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "compile", ()=>compile
);
var _runtimeDom = require("@vue/runtime-dom");
parcelHelpers.exportAll(_runtimeDom, exports);
function initDev() {
    _runtimeDom.initCustomFormatter();
}
initDev();
const compile = ()=>{
    _runtimeDom.warn(`Runtime compilation is not supported in this build of Vue.` + ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
};

},{"@vue/runtime-dom":"i9SjY","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"i9SjY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Transition", ()=>Transition
);
parcelHelpers.export(exports, "TransitionGroup", ()=>TransitionGroup
);
parcelHelpers.export(exports, "VueElement", ()=>VueElement
);
parcelHelpers.export(exports, "createApp", ()=>createApp
);
parcelHelpers.export(exports, "createSSRApp", ()=>createSSRApp
);
parcelHelpers.export(exports, "defineCustomElement", ()=>defineCustomElement
);
parcelHelpers.export(exports, "defineSSRCustomElement", ()=>defineSSRCustomElement
);
parcelHelpers.export(exports, "hydrate", ()=>hydrate1
);
parcelHelpers.export(exports, "render", ()=>render
);
parcelHelpers.export(exports, "useCssModule", ()=>useCssModule
);
parcelHelpers.export(exports, "useCssVars", ()=>useCssVars
);
parcelHelpers.export(exports, "vModelCheckbox", ()=>vModelCheckbox
);
parcelHelpers.export(exports, "vModelDynamic", ()=>vModelDynamic
);
parcelHelpers.export(exports, "vModelRadio", ()=>vModelRadio
);
parcelHelpers.export(exports, "vModelSelect", ()=>vModelSelect
);
parcelHelpers.export(exports, "vModelText", ()=>vModelText
);
parcelHelpers.export(exports, "vShow", ()=>vShow
);
parcelHelpers.export(exports, "withKeys", ()=>withKeys
);
parcelHelpers.export(exports, "withModifiers", ()=>withModifiers
);
var _runtimeCore = require("@vue/runtime-core");
var _shared = require("@vue/shared");
parcelHelpers.exportAll(_runtimeCore, exports);
const svgNS = 'http://www.w3.org/2000/svg';
const doc = typeof document !== 'undefined' ? document : null;
const staticTemplateCache = new Map();
const nodeOps = {
    insert: (child, parent, anchor)=>{
        parent.insertBefore(child, anchor || null);
    },
    remove: (child)=>{
        const parent = child.parentNode;
        if (parent) parent.removeChild(child);
    },
    createElement: (tag, isSVG, is, props)=>{
        const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? {
            is
        } : undefined);
        if (tag === 'select' && props && props.multiple != null) el.setAttribute('multiple', props.multiple);
        return el;
    },
    createText: (text)=>doc.createTextNode(text)
    ,
    createComment: (text)=>doc.createComment(text)
    ,
    setText: (node, text)=>{
        node.nodeValue = text;
    },
    setElementText: (el, text)=>{
        el.textContent = text;
    },
    parentNode: (node)=>node.parentNode
    ,
    nextSibling: (node)=>node.nextSibling
    ,
    querySelector: (selector)=>doc.querySelector(selector)
    ,
    setScopeId (el, id) {
        el.setAttribute(id, '');
    },
    cloneNode (el) {
        const cloned = el.cloneNode(true);
        // #3072
        // - in `patchDOMProp`, we store the actual value in the `el._value` property.
        // - normally, elements using `:value` bindings will not be hoisted, but if
        //   the bound value is a constant, e.g. `:value="true"` - they do get
        //   hoisted.
        // - in production, hoisted nodes are cloned when subsequent inserts, but
        //   cloneNode() does not copy the custom property we attached.
        // - This may need to account for other custom DOM properties we attach to
        //   elements in addition to `_value` in the future.
        if (`_value` in el) cloned._value = el._value;
        return cloned;
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent (content, parent, anchor, isSVG) {
        // <parent> before | first ... last | anchor </parent>
        const before = anchor ? anchor.previousSibling : parent.lastChild;
        let template = staticTemplateCache.get(content);
        if (!template) {
            const t = doc.createElement('template');
            t.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
            template = t.content;
            if (isSVG) {
                // remove outer svg wrapper
                const wrapper = template.firstChild;
                while(wrapper.firstChild)template.appendChild(wrapper.firstChild);
                template.removeChild(wrapper);
            }
            staticTemplateCache.set(content, template);
        }
        parent.insertBefore(template.cloneNode(true), anchor);
        return [
            // first
            before ? before.nextSibling : parent.firstChild,
            // last
            anchor ? anchor.previousSibling : parent.lastChild
        ];
    }
};
// compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]
function patchClass(el, value, isSVG) {
    // directly setting className should be faster than setAttribute in theory
    // if this is an element during a transition, take the temporary transition
    // classes into account.
    const transitionClasses = el._vtc;
    if (transitionClasses) value = (value ? [
        value,
        ...transitionClasses
    ] : [
        ...transitionClasses
    ]).join(' ');
    if (value == null) el.removeAttribute('class');
    else if (isSVG) el.setAttribute('class', value);
    else el.className = value;
}
function patchStyle(el, prev, next) {
    const style = el.style;
    const currentDisplay = style.display;
    if (!next) el.removeAttribute('style');
    else if (_shared.isString(next)) {
        if (prev !== next) style.cssText = next;
    } else {
        for(const key in next)setStyle(style, key, next[key]);
        if (prev && !_shared.isString(prev)) {
            for(const key1 in prev)if (next[key1] == null) setStyle(style, key1, '');
        }
    }
    // indicates that the `display` of the element is controlled by `v-show`,
    // so we always keep the current `display` value regardless of the `style` value,
    // thus handing over control to `v-show`.
    if ('_vod' in el) style.display = currentDisplay;
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
    if (_shared.isArray(val)) val.forEach((v)=>setStyle(style, name, v)
    );
    else if (name.startsWith('--')) // custom property definition
    style.setProperty(name, val);
    else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) // !important
        style.setProperty(_shared.hyphenate(prefixed), val.replace(importantRE, ''), 'important');
        else style[prefixed] = val;
    }
}
const prefixes = [
    'Webkit',
    'Moz',
    'ms'
];
const prefixCache = {
};
function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) return cached;
    let name = _runtimeCore.camelize(rawName);
    if (name !== 'filter' && name in style) return prefixCache[rawName] = name;
    name = _shared.capitalize(name);
    for(let i = 0; i < prefixes.length; i++){
        const prefixed = prefixes[i] + name;
        if (prefixed in style) return prefixCache[rawName] = prefixed;
    }
    return rawName;
}
const xlinkNS = 'http://www.w3.org/1999/xlink';
function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith('xlink:')) {
        if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
        else el.setAttributeNS(xlinkNS, key, value);
    } else {
        // note we are only checking boolean attributes that don't have a
        // corresponding dom prop of the same name here.
        const isBoolean = _shared.isSpecialBooleanAttr(key);
        if (value == null || isBoolean && !_shared.includeBooleanAttr(value)) el.removeAttribute(key);
        else el.setAttribute(key, isBoolean ? '' : value);
    }
}
// __UNSAFE__
// functions. The user is responsible for using them with only trusted content.
function patchDOMProp(el, key, value, // the following args are passed only due to potential innerHTML/textContent
// overriding existing VNodes, in which case the old tree must be properly
// unmounted.
prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === 'innerHTML' || key === 'textContent') {
        if (prevChildren) unmountChildren(prevChildren, parentComponent, parentSuspense);
        el[key] = value == null ? '' : value;
        return;
    }
    if (key === 'value' && el.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified.
        el._value = value;
        const newValue = value == null ? '' : value;
        if (el.value !== newValue) el.value = newValue;
        if (value == null) el.removeAttribute(key);
        return;
    }
    if (value === '' || value == null) {
        const type = typeof el[key];
        if (type === 'boolean') {
            // e.g. <select multiple> compiles to { multiple: '' }
            el[key] = _shared.includeBooleanAttr(value);
            return;
        } else if (value == null && type === 'string') {
            // e.g. <div :id="null">
            el[key] = '';
            el.removeAttribute(key);
            return;
        } else if (type === 'number') {
            // e.g. <img :width="null">
            // the value of some IDL attr must be greater than 0, e.g. input.size = 0 -> error
            try {
                el[key] = 0;
            } catch (_a) {
            }
            el.removeAttribute(key);
            return;
        }
    }
    // some properties perform value validation and throw
    try {
        el[key] = value;
    } catch (e) {
        _runtimeCore.warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: ` + `value ${value} is invalid.`, e);
    }
}
// Async edge case fix requires storing an event listener's attach timestamp.
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== 'undefined') {
    // Determine what event timestamp the browser is using. Annoyingly, the
    // timestamp can either be hi-res (relative to page load) or low-res
    // (relative to UNIX epoch), so in order to compare time we have to use the
    // same timestamp type when saving the flush timestamp.
    if (_getNow() > document.createEvent('Event').timeStamp) // if the low-res timestamp which is bigger than the event timestamp
    // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listeners as well.
    _getNow = ()=>performance.now()
    ;
    // #3485: Firefox <= 53 has incorrect Event.timeStamp implementation
    // and does not fire microtasks in between event propagation, so safe to exclude.
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
// To avoid the overhead of repeatedly calling performance.now(), we cache
// and use the same timestamp for all event listeners attached in the same tick.
let cachedNow = 0;
const p = Promise.resolve();
const reset = ()=>{
    cachedNow = 0;
};
const getNow = ()=>cachedNow || (p.then(reset), cachedNow = _getNow())
;
function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    // vei = vue event invokers
    const invokers = el._vei || (el._vei = {
    });
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) // patch
    existingInvoker.value = nextValue;
    else {
        const [name, options] = parseName(rawName);
        if (nextValue) {
            // add
            const invoker = invokers[rawName] = createInvoker(nextValue, instance);
            addEventListener(el, name, invoker, options);
        } else if (existingInvoker) {
            // remove
            removeEventListener(el, name, existingInvoker, options);
            invokers[rawName] = undefined;
        }
    }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
        options = {
        };
        let m;
        while(m = name.match(optionsModifierRE)){
            name = name.slice(0, name.length - m[0].length);
            options[m[0].toLowerCase()] = true;
        }
    }
    return [
        _shared.hyphenate(name.slice(2)),
        options
    ];
}
function createInvoker(initialValue, instance) {
    const invoker = (e)=>{
        // async edge case #6566: inner click event triggers patch, event handler
        // attached to outer element during patch, and triggered again. This
        // happens because browsers fire microtask ticks between event propagation.
        // the solution is simple: we save the timestamp when a handler is attached,
        // and the handler would only fire if the event passed to it was fired
        // AFTER it was attached.
        const timeStamp = e.timeStamp || _getNow();
        if (skipTimestampCheck || timeStamp >= invoker.attached - 1) _runtimeCore.callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5 /* NATIVE_EVENT_HANDLER */ , [
            e
        ]);
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
}
function patchStopImmediatePropagation(e, value) {
    if (_shared.isArray(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = ()=>{
            originalStop.call(e);
            e._stopped = true;
        };
        return value.map((fn)=>(e1)=>!e1._stopped && fn(e1)
        );
    } else return value;
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren)=>{
    if (key === 'class') patchClass(el, nextValue, isSVG);
    else if (key === 'style') patchStyle(el, prevValue, nextValue);
    else if (_shared.isOn(key)) // ignore v-model listeners
    {
        if (!_shared.isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
    } else if (key[0] === '.' ? (key = key.slice(1), true) : key[0] === '^' ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    else {
        // special case for <input v-model type="checkbox"> with
        // :true-value & :false-value
        // store value as dom properties since non-string values will be
        // stringified.
        if (key === 'true-value') el._trueValue = nextValue;
        else if (key === 'false-value') el._falseValue = nextValue;
        patchAttr(el, key, nextValue, isSVG);
    }
};
function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
        // most keys must be set as attribute on svg elements to work
        // ...except innerHTML & textContent
        if (key === 'innerHTML' || key === 'textContent') return true;
        // or native onclick with function values
        if (key in el && nativeOnRE.test(key) && _shared.isFunction(value)) return true;
        return false;
    }
    // spellcheck and draggable are numerated attrs, however their
    // corresponding DOM properties are actually booleans - this leads to
    // setting it with a string "false" value leading it to be coerced to
    // `true`, so we need to always treat them as attributes.
    // Note that `contentEditable` doesn't have this problem: its DOM
    // property is also enumerated string values.
    if (key === 'spellcheck' || key === 'draggable') return false;
    // #1787, #2840 form property on form elements is readonly and must be set as
    // attribute.
    if (key === 'form') return false;
    // #1526 <input list> must be set as attribute
    if (key === 'list' && el.tagName === 'INPUT') return false;
    // #2766 <textarea type> must be set as attribute
    if (key === 'type' && el.tagName === 'TEXTAREA') return false;
    // native onclick with string value, must be set as attribute
    if (nativeOnRE.test(key) && _shared.isString(value)) return false;
    return key in el;
}
function defineCustomElement(options, hydate) {
    const Comp = _runtimeCore.defineComponent(options);
    class VueCustomElement extends VueElement {
        constructor(initialProps){
            super(Comp, initialProps, hydate);
        }
    }
    VueCustomElement.def = Comp;
    return VueCustomElement;
}
const defineSSRCustomElement = (options)=>{
    // @ts-ignore
    return defineCustomElement(options, hydrate1);
};
const BaseClass = typeof HTMLElement !== 'undefined' ? HTMLElement : class {
};
class VueElement extends BaseClass {
    constructor(_def, _props = {
    }, hydrate){
        super();
        this._def = _def;
        this._props = _props;
        /**
         * @internal
         */ this._instance = null;
        this._connected = false;
        this._resolved = false;
        if (this.shadowRoot && hydrate) hydrate(this._createVNode(), this.shadowRoot);
        else {
            if (this.shadowRoot) _runtimeCore.warn(`Custom element has pre-rendered declarative shadow root but is not ` + `defined as hydratable. Use \`defineSSRCustomElement\`.`);
            this.attachShadow({
                mode: 'open'
            });
        }
        // set initial attrs
        for(let i = 0; i < this.attributes.length; i++)this._setAttr(this.attributes[i].name);
        // watch future attr changes
        const observer = new MutationObserver((mutations)=>{
            for (const m of mutations)this._setAttr(m.attributeName);
        });
        observer.observe(this, {
            attributes: true
        });
    }
    connectedCallback() {
        this._connected = true;
        if (!this._instance) {
            this._resolveDef();
            render(this._createVNode(), this.shadowRoot);
        }
    }
    disconnectedCallback() {
        this._connected = false;
        _runtimeCore.nextTick(()=>{
            if (!this._connected) {
                render(null, this.shadowRoot);
                this._instance = null;
            }
        });
    }
    /**
     * resolve inner component definition (handle possible async component)
     */ _resolveDef() {
        if (this._resolved) return;
        const resolve = (def)=>{
            this._resolved = true;
            // check if there are props set pre-upgrade or connect
            for (const key of Object.keys(this))if (key[0] !== '_') this._setProp(key, this[key]);
            const { props , styles  } = def;
            // defining getter/setters on prototype
            const rawKeys = props ? _shared.isArray(props) ? props : Object.keys(props) : [];
            for (const key1 of rawKeys.map(_shared.camelize))Object.defineProperty(this, key1, {
                get () {
                    return this._getProp(key1);
                },
                set (val) {
                    this._setProp(key1, val);
                }
            });
            this._applyStyles(styles);
        };
        const asyncDef = this._def.__asyncLoader;
        if (asyncDef) asyncDef().then(resolve);
        else resolve(this._def);
    }
    _setAttr(key) {
        this._setProp(_shared.camelize(key), _shared.toNumber(this.getAttribute(key)), false);
    }
    /**
     * @internal
     */ _getProp(key) {
        return this._props[key];
    }
    /**
     * @internal
     */ _setProp(key, val, shouldReflect = true) {
        if (val !== this._props[key]) {
            this._props[key] = val;
            if (this._instance) render(this._createVNode(), this.shadowRoot);
            // reflect
            if (shouldReflect) {
                if (val === true) this.setAttribute(_shared.hyphenate(key), '');
                else if (typeof val === 'string' || typeof val === 'number') this.setAttribute(_shared.hyphenate(key), val + '');
                else if (!val) this.removeAttribute(_shared.hyphenate(key));
            }
        }
    }
    _createVNode() {
        const vnode = _runtimeCore.createVNode(this._def, _shared.extend({
        }, this._props));
        if (!this._instance) vnode.ce = (instance)=>{
            this._instance = instance;
            instance.isCE = true;
            instance.ceReload = (newStyles)=>{
                // alawys reset styles
                if (this._styles) {
                    this._styles.forEach((s)=>this.shadowRoot.removeChild(s)
                    );
                    this._styles.length = 0;
                }
                this._applyStyles(newStyles);
                // if this is an async component, ceReload is called from the inner
                // component so no need to reload the async wrapper
                if (!this._def.__asyncLoader) {
                    // reload
                    this._instance = null;
                    render(this._createVNode(), this.shadowRoot);
                }
            };
            // intercept emit
            instance.emit = (event, ...args)=>{
                this.dispatchEvent(new CustomEvent(event, {
                    detail: args
                }));
            };
            // locate nearest Vue custom element parent for provide/inject
            let parent = this;
            while(parent = parent && (parent.parentNode || parent.host))if (parent instanceof VueElement) {
                instance.parent = parent._instance;
                break;
            }
        };
        return vnode;
    }
    _applyStyles(styles) {
        if (styles) styles.forEach((css)=>{
            const s = document.createElement('style');
            s.textContent = css;
            this.shadowRoot.appendChild(s);
            (this._styles || (this._styles = [])).push(s);
        });
    }
}
function useCssModule(name = '$style') {
    /* istanbul ignore else */ {
        const instance = _runtimeCore.getCurrentInstance();
        if (!instance) {
            _runtimeCore.warn(`useCssModule must be called inside setup()`);
            return _shared.EMPTY_OBJ;
        }
        const modules = instance.type.__cssModules;
        if (!modules) {
            _runtimeCore.warn(`Current instance does not have CSS modules injected.`);
            return _shared.EMPTY_OBJ;
        }
        const mod = modules[name];
        if (!mod) {
            _runtimeCore.warn(`Current instance does not have CSS module named "${name}".`);
            return _shared.EMPTY_OBJ;
        }
        return mod;
    }
}
/**
 * Runtime helper for SFC's CSS variable injection feature.
 * @private
 */ function useCssVars(getter) {
    const instance = _runtimeCore.getCurrentInstance();
    /* istanbul ignore next */ if (!instance) {
        _runtimeCore.warn(`useCssVars is called without current active component instance.`);
        return;
    }
    const setVars = ()=>setVarsOnVNode(instance.subTree, getter(instance.proxy))
    ;
    _runtimeCore.watchPostEffect(setVars);
    _runtimeCore.onMounted(()=>{
        const ob = new MutationObserver(setVars);
        ob.observe(instance.subTree.el.parentNode, {
            childList: true
        });
        _runtimeCore.onUnmounted(()=>ob.disconnect()
        );
    });
}
function setVarsOnVNode(vnode, vars) {
    if (vnode.shapeFlag & 128 /* SUSPENSE */ ) {
        const suspense = vnode.suspense;
        vnode = suspense.activeBranch;
        if (suspense.pendingBranch && !suspense.isHydrating) suspense.effects.push(()=>{
            setVarsOnVNode(suspense.activeBranch, vars);
        });
    }
    // drill down HOCs until it's a non-component vnode
    while(vnode.component)vnode = vnode.component.subTree;
    if (vnode.shapeFlag & 1 /* ELEMENT */  && vnode.el) setVarsOnNode(vnode.el, vars);
    else if (vnode.type === _runtimeCore.Fragment) vnode.children.forEach((c)=>setVarsOnVNode(c, vars)
    );
    else if (vnode.type === _runtimeCore.Static) {
        let { el , anchor  } = vnode;
        while(el){
            setVarsOnNode(el, vars);
            if (el === anchor) break;
            el = el.nextSibling;
        }
    }
}
function setVarsOnNode(el, vars) {
    if (el.nodeType === 1) {
        const style = el.style;
        for(const key in vars)style.setProperty(`--${key}`, vars[key]);
    }
}
const TRANSITION = 'transition';
const ANIMATION = 'animation';
// DOM Transition is a higher-order-component based on the platform-agnostic
// base Transition component, with DOM-specific logic.
const Transition = (props, { slots  })=>_runtimeCore.h(_runtimeCore.BaseTransition, resolveTransitionProps(props), slots)
;
Transition.displayName = 'Transition';
const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: true
    },
    duration: [
        String,
        Number,
        Object
    ],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /*#__PURE__*/ _shared.extend({
}, _runtimeCore.BaseTransition.props, DOMTransitionPropsValidators);
/**
 * #3227 Incoming hooks may be merged into arrays when wrapping Transition
 * with custom HOCs.
 */ const callHook = (hook, args = [])=>{
    if (_shared.isArray(hook)) hook.forEach((h)=>h(...args)
    );
    else if (hook) hook(...args);
};
/**
 * Check if a hook expects a callback (2nd arg), which means the user
 * intends to explicitly control the end of the transition.
 */ const hasExplicitCallback = (hook)=>{
    return hook ? _shared.isArray(hook) ? hook.some((h)=>h.length > 1
    ) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
    const baseProps = {
    };
    for(const key in rawProps)if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
    if (rawProps.css === false) return baseProps;
    const { name ='v' , type , duration , enterFromClass =`${name}-enter-from` , enterActiveClass =`${name}-enter-active` , enterToClass =`${name}-enter-to` , appearFromClass =enterFromClass , appearActiveClass =enterActiveClass , appearToClass =enterToClass , leaveFromClass =`${name}-leave-from` , leaveActiveClass =`${name}-leave-active` , leaveToClass =`${name}-leave-to`  } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const { onBeforeEnter , onEnter , onEnterCancelled , onLeave , onLeaveCancelled , onBeforeAppear =onBeforeEnter , onAppear =onEnter , onAppearCancelled =onEnterCancelled  } = baseProps;
    const finishEnter = (el, isAppear, done)=>{
        removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
        removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
        done && done();
    };
    const finishLeave = (el, done)=>{
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
        done && done();
    };
    const makeEnterHook = (isAppear)=>{
        return (el, done)=>{
            const hook = isAppear ? onAppear : onEnter;
            const resolve = ()=>finishEnter(el, isAppear, done)
            ;
            callHook(hook, [
                el,
                resolve
            ]);
            nextFrame(()=>{
                removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
                addTransitionClass(el, isAppear ? appearToClass : enterToClass);
                if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
            });
        };
    };
    return _shared.extend(baseProps, {
        onBeforeEnter (el) {
            callHook(onBeforeEnter, [
                el
            ]);
            addTransitionClass(el, enterFromClass);
            addTransitionClass(el, enterActiveClass);
        },
        onBeforeAppear (el) {
            callHook(onBeforeAppear, [
                el
            ]);
            addTransitionClass(el, appearFromClass);
            addTransitionClass(el, appearActiveClass);
        },
        onEnter: makeEnterHook(false),
        onAppear: makeEnterHook(true),
        onLeave (el, done) {
            const resolve = ()=>finishLeave(el, done)
            ;
            addTransitionClass(el, leaveFromClass);
            // force reflow so *-leave-from classes immediately take effect (#2593)
            forceReflow();
            addTransitionClass(el, leaveActiveClass);
            nextFrame(()=>{
                removeTransitionClass(el, leaveFromClass);
                addTransitionClass(el, leaveToClass);
                if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
            });
            callHook(onLeave, [
                el,
                resolve
            ]);
        },
        onEnterCancelled (el) {
            finishEnter(el, false);
            callHook(onEnterCancelled, [
                el
            ]);
        },
        onAppearCancelled (el) {
            finishEnter(el, true);
            callHook(onAppearCancelled, [
                el
            ]);
        },
        onLeaveCancelled (el) {
            finishLeave(el);
            callHook(onLeaveCancelled, [
                el
            ]);
        }
    });
}
function normalizeDuration(duration) {
    if (duration == null) return null;
    else if (_shared.isObject(duration)) return [
        NumberOf(duration.enter),
        NumberOf(duration.leave)
    ];
    else {
        const n = NumberOf(duration);
        return [
            n,
            n
        ];
    }
}
function NumberOf(val) {
    const res = _shared.toNumber(val);
    validateDuration(res);
    return res;
}
function validateDuration(val) {
    if (typeof val !== 'number') _runtimeCore.warn(`<transition> explicit duration is not a valid number - ` + `got ${JSON.stringify(val)}.`);
    else if (isNaN(val)) _runtimeCore.warn(`<transition> explicit duration is NaN - ` + 'the duration expression might be incorrect.');
}
function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c)=>c && el.classList.add(c)
    );
    (el._vtc || (el._vtc = new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c)=>c && el.classList.remove(c)
    );
    const { _vtc  } = el;
    if (_vtc) {
        _vtc.delete(cls);
        if (!_vtc.size) el._vtc = undefined;
    }
}
function nextFrame(cb) {
    requestAnimationFrame(()=>{
        requestAnimationFrame(cb);
    });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = ()=>{
        if (id === el._endId) resolve();
    };
    if (explicitTimeout) return setTimeout(resolveIfNotStale, explicitTimeout);
    const { type , timeout , propCount  } = getTransitionInfo(el, expectedType);
    if (!type) return resolve();
    const endEvent = type + 'end';
    let ended = 0;
    const end = ()=>{
        el.removeEventListener(endEvent, onEnd);
        resolveIfNotStale();
    };
    const onEnd = (e)=>{
        if (e.target === el && (++ended) >= propCount) end();
    };
    setTimeout(()=>{
        if (ended < propCount) end();
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    const getStyleProperties = (key)=>(styles[key] || '').split(', ')
    ;
    const transitionDelays = getStyleProperties(TRANSITION + 'Delay');
    const transitionDurations = getStyleProperties(TRANSITION + 'Duration');
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(ANIMATION + 'Delay');
    const animationDurations = getStyleProperties(ANIMATION + 'Duration');
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    /* istanbul ignore if */ if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
            type = TRANSITION;
            timeout = transitionTimeout;
            propCount = transitionDurations.length;
        }
    } else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
            type = ANIMATION;
            timeout = animationTimeout;
            propCount = animationDurations.length;
        }
    } else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
        propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + 'Property']);
    return {
        type,
        timeout,
        propCount,
        hasTransform
    };
}
function getTimeout(delays, durations) {
    while(delays.length < durations.length)delays = delays.concat(delays);
    return Math.max(...durations.map((d, i1)=>toMs(d) + toMs(delays[i1])
    ));
}
// Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors
function toMs(s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
// synchronously force layout to put elements into a certain state
function forceReflow() {
    return document.body.offsetHeight;
}
const positionMap = new WeakMap();
const newPositionMap = new WeakMap();
const TransitionGroupImpl = {
    name: 'TransitionGroup',
    props: /*#__PURE__*/ _shared.extend({
    }, TransitionPropsValidators, {
        tag: String,
        moveClass: String
    }),
    setup (props, { slots  }) {
        const instance = _runtimeCore.getCurrentInstance();
        const state = _runtimeCore.useTransitionState();
        let prevChildren;
        let children;
        _runtimeCore.onUpdated(()=>{
            // children is guaranteed to exist after initial render
            if (!prevChildren.length) return;
            const moveClass = props.moveClass || `${props.name || 'v'}-move`;
            if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) return;
            // we divide the work into three loops to avoid mixing DOM reads and writes
            // in each iteration - which helps prevent layout thrashing.
            prevChildren.forEach(callPendingCbs);
            prevChildren.forEach(recordPosition);
            const movedChildren = prevChildren.filter(applyTranslation);
            // force reflow to put everything in position
            forceReflow();
            movedChildren.forEach((c)=>{
                const el = c.el;
                const style = el.style;
                addTransitionClass(el, moveClass);
                style.transform = style.webkitTransform = style.transitionDuration = '';
                const cb = el._moveCb = (e)=>{
                    if (e && e.target !== el) return;
                    if (!e || /transform$/.test(e.propertyName)) {
                        el.removeEventListener('transitionend', cb);
                        el._moveCb = null;
                        removeTransitionClass(el, moveClass);
                    }
                };
                el.addEventListener('transitionend', cb);
            });
        });
        return ()=>{
            const rawProps = _runtimeCore.toRaw(props);
            const cssTransitionProps = resolveTransitionProps(rawProps);
            let tag = rawProps.tag || _runtimeCore.Fragment;
            prevChildren = children;
            children = slots.default ? _runtimeCore.getTransitionRawChildren(slots.default()) : [];
            for(let i1 = 0; i1 < children.length; i1++){
                const child = children[i1];
                if (child.key != null) _runtimeCore.setTransitionHooks(child, _runtimeCore.resolveTransitionHooks(child, cssTransitionProps, state, instance));
                else _runtimeCore.warn(`<TransitionGroup> children must be keyed.`);
            }
            if (prevChildren) for(let i2 = 0; i2 < prevChildren.length; i2++){
                const child = prevChildren[i2];
                _runtimeCore.setTransitionHooks(child, _runtimeCore.resolveTransitionHooks(child, cssTransitionProps, state, instance));
                positionMap.set(child, child.el.getBoundingClientRect());
            }
            return _runtimeCore.createVNode(tag, null, children);
        };
    }
};
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
    const el = c.el;
    if (el._moveCb) el._moveCb();
    if (el._enterCb) el._enterCb();
}
function recordPosition(c) {
    newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
    const oldPos = positionMap.get(c);
    const newPos = newPositionMap.get(c);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
        const s = c.el.style;
        s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
        s.transitionDuration = '0s';
        return c;
    }
}
function hasCSSTransform(el, root, moveClass) {
    // Detect whether an element with the move class applied has
    // CSS transitions. Since the element may be inside an entering
    // transition at this very moment, we make a clone of it and remove
    // all other transition classes applied to ensure only the move class
    // is applied.
    const clone = el.cloneNode();
    if (el._vtc) el._vtc.forEach((cls)=>{
        cls.split(/\s+/).forEach((c)=>c && clone.classList.remove(c)
        );
    });
    moveClass.split(/\s+/).forEach((c)=>c && clone.classList.add(c)
    );
    clone.style.display = 'none';
    const container = root.nodeType === 1 ? root : root.parentNode;
    container.appendChild(clone);
    const { hasTransform  } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
}
const getModelAssigner = (vnode)=>{
    const fn = vnode.props['onUpdate:modelValue'];
    return _shared.isArray(fn) ? (value)=>_shared.invokeArrayFns(fn, value)
     : fn;
};
function onCompositionStart(e) {
    e.target.composing = true;
}
function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
        target.composing = false;
        trigger(target, 'input');
    }
}
function trigger(el, type) {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
}
// We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.
const vModelText = {
    created (el, { modifiers: { lazy , trim , number  }  }, vnode) {
        el._assign = getModelAssigner(vnode);
        const castToNumber = number || vnode.props && vnode.props.type === 'number';
        addEventListener(el, lazy ? 'change' : 'input', (e)=>{
            if (e.target.composing) return;
            let domValue = el.value;
            if (trim) domValue = domValue.trim();
            else if (castToNumber) domValue = _shared.toNumber(domValue);
            el._assign(domValue);
        });
        if (trim) addEventListener(el, 'change', ()=>{
            el.value = el.value.trim();
        });
        if (!lazy) {
            addEventListener(el, 'compositionstart', onCompositionStart);
            addEventListener(el, 'compositionend', onCompositionEnd);
            // Safari < 10.2 & UIWebView doesn't fire compositionend when
            // switching focus before confirming composition choice
            // this also fixes the issue where some browsers e.g. iOS Chrome
            // fires "change" instead of "input" on autocomplete.
            addEventListener(el, 'change', onCompositionEnd);
        }
    },
    // set value on mounted so it's after min/max for type="range"
    mounted (el, { value  }) {
        el.value = value == null ? '' : value;
    },
    beforeUpdate (el, { value , modifiers: { lazy , trim , number  }  }, vnode) {
        el._assign = getModelAssigner(vnode);
        // avoid clearing unresolved text. #2302
        if (el.composing) return;
        if (document.activeElement === el) {
            if (lazy) return;
            if (trim && el.value.trim() === value) return;
            if ((number || el.type === 'number') && _shared.toNumber(el.value) === value) return;
        }
        const newValue = value == null ? '' : value;
        if (el.value !== newValue) el.value = newValue;
    }
};
const vModelCheckbox = {
    // #4096 array checkboxes need to be deep traversed
    deep: true,
    created (el, _, vnode) {
        el._assign = getModelAssigner(vnode);
        addEventListener(el, 'change', ()=>{
            const modelValue = el._modelValue;
            const elementValue = getValue(el);
            const checked = el.checked;
            const assign = el._assign;
            if (_shared.isArray(modelValue)) {
                const index = _shared.looseIndexOf(modelValue, elementValue);
                const found = index !== -1;
                if (checked && !found) assign(modelValue.concat(elementValue));
                else if (!checked && found) {
                    const filtered = [
                        ...modelValue
                    ];
                    filtered.splice(index, 1);
                    assign(filtered);
                }
            } else if (_shared.isSet(modelValue)) {
                const cloned = new Set(modelValue);
                if (checked) cloned.add(elementValue);
                else cloned.delete(elementValue);
                assign(cloned);
            } else assign(getCheckboxValue(el, checked));
        });
    },
    // set initial checked on mount to wait for true-value/false-value
    mounted: setChecked,
    beforeUpdate (el, binding, vnode) {
        el._assign = getModelAssigner(vnode);
        setChecked(el, binding, vnode);
    }
};
function setChecked(el, { value , oldValue  }, vnode) {
    el._modelValue = value;
    if (_shared.isArray(value)) el.checked = _shared.looseIndexOf(value, vnode.props.value) > -1;
    else if (_shared.isSet(value)) el.checked = value.has(vnode.props.value);
    else if (value !== oldValue) el.checked = _shared.looseEqual(value, getCheckboxValue(el, true));
}
const vModelRadio = {
    created (el, { value  }, vnode) {
        el.checked = _shared.looseEqual(value, vnode.props.value);
        el._assign = getModelAssigner(vnode);
        addEventListener(el, 'change', ()=>{
            el._assign(getValue(el));
        });
    },
    beforeUpdate (el, { value , oldValue  }, vnode) {
        el._assign = getModelAssigner(vnode);
        if (value !== oldValue) el.checked = _shared.looseEqual(value, vnode.props.value);
    }
};
const vModelSelect = {
    // <select multiple> value need to be deep traversed
    deep: true,
    created (el, { value , modifiers: { number  }  }, vnode) {
        const isSetModel = _shared.isSet(value);
        addEventListener(el, 'change', ()=>{
            const selectedVal = Array.prototype.filter.call(el.options, (o)=>o.selected
            ).map((o)=>number ? _shared.toNumber(getValue(o)) : getValue(o)
            );
            el._assign(el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
        });
        el._assign = getModelAssigner(vnode);
    },
    // set value in mounted & updated because <select> relies on its children
    // <option>s.
    mounted (el, { value  }) {
        setSelected(el, value);
    },
    beforeUpdate (el, _binding, vnode) {
        el._assign = getModelAssigner(vnode);
    },
    updated (el, { value  }) {
        setSelected(el, value);
    }
};
function setSelected(el, value) {
    const isMultiple = el.multiple;
    if (isMultiple && !_shared.isArray(value) && !_shared.isSet(value)) {
        _runtimeCore.warn(`<select multiple v-model> expects an Array or Set value for its binding, ` + `but got ${Object.prototype.toString.call(value).slice(8, -1)}.`);
        return;
    }
    for(let i1 = 0, l = el.options.length; i1 < l; i1++){
        const option = el.options[i1];
        const optionValue = getValue(option);
        if (isMultiple) {
            if (_shared.isArray(value)) option.selected = _shared.looseIndexOf(value, optionValue) > -1;
            else option.selected = value.has(optionValue);
        } else if (_shared.looseEqual(getValue(option), value)) {
            if (el.selectedIndex !== i1) el.selectedIndex = i1;
            return;
        }
    }
    if (!isMultiple && el.selectedIndex !== -1) el.selectedIndex = -1;
}
// retrieve raw value set via :value bindings
function getValue(el) {
    return '_value' in el ? el._value : el.value;
}
// retrieve raw value for true-value and false-value set via :true-value or :false-value bindings
function getCheckboxValue(el, checked) {
    const key = checked ? '_trueValue' : '_falseValue';
    return key in el ? el[key] : checked;
}
const vModelDynamic = {
    created (el, binding, vnode) {
        callModelHook(el, binding, vnode, null, 'created');
    },
    mounted (el, binding, vnode) {
        callModelHook(el, binding, vnode, null, 'mounted');
    },
    beforeUpdate (el, binding, vnode, prevVNode) {
        callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate');
    },
    updated (el, binding, vnode, prevVNode) {
        callModelHook(el, binding, vnode, prevVNode, 'updated');
    }
};
function callModelHook(el, binding, vnode, prevVNode, hook) {
    let modelToUse;
    switch(el.tagName){
        case 'SELECT':
            modelToUse = vModelSelect;
            break;
        case 'TEXTAREA':
            modelToUse = vModelText;
            break;
        default:
            switch(vnode.props && vnode.props.type){
                case 'checkbox':
                    modelToUse = vModelCheckbox;
                    break;
                case 'radio':
                    modelToUse = vModelRadio;
                    break;
                default:
                    modelToUse = vModelText;
            }
    }
    const fn = modelToUse[hook];
    fn && fn(el, binding, vnode, prevVNode);
}
const systemModifiers = [
    'ctrl',
    'shift',
    'alt',
    'meta'
];
const modifierGuards = {
    stop: (e)=>e.stopPropagation()
    ,
    prevent: (e)=>e.preventDefault()
    ,
    self: (e)=>e.target !== e.currentTarget
    ,
    ctrl: (e)=>!e.ctrlKey
    ,
    shift: (e)=>!e.shiftKey
    ,
    alt: (e)=>!e.altKey
    ,
    meta: (e)=>!e.metaKey
    ,
    left: (e)=>'button' in e && e.button !== 0
    ,
    middle: (e)=>'button' in e && e.button !== 1
    ,
    right: (e)=>'button' in e && e.button !== 2
    ,
    exact: (e, modifiers)=>systemModifiers.some((m)=>e[`${m}Key`] && !modifiers.includes(m)
        )
};
/**
 * @private
 */ const withModifiers = (fn, modifiers)=>{
    return (event, ...args)=>{
        for(let i1 = 0; i1 < modifiers.length; i1++){
            const guard = modifierGuards[modifiers[i1]];
            if (guard && guard(event, modifiers)) return;
        }
        return fn(event, ...args);
    };
};
// Kept for 2.x compat.
// Note: IE11 compat for `spacebar` and `del` is removed for now.
const keyNames = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace'
};
/**
 * @private
 */ const withKeys = (fn, modifiers)=>{
    return (event)=>{
        if (!('key' in event)) return;
        const eventKey = _shared.hyphenate(event.key);
        if (modifiers.some((k)=>k === eventKey || keyNames[k] === eventKey
        )) return fn(event);
    };
};
const vShow = {
    beforeMount (el, { value  }, { transition  }) {
        el._vod = el.style.display === 'none' ? '' : el.style.display;
        if (transition && value) transition.beforeEnter(el);
        else setDisplay(el, value);
    },
    mounted (el, { value  }, { transition  }) {
        if (transition && value) transition.enter(el);
    },
    updated (el, { value , oldValue  }, { transition  }) {
        if (!value === !oldValue) return;
        if (transition) {
            if (value) {
                transition.beforeEnter(el);
                setDisplay(el, true);
                transition.enter(el);
            } else transition.leave(el, ()=>{
                setDisplay(el, false);
            });
        } else setDisplay(el, value);
    },
    beforeUnmount (el, { value  }) {
        setDisplay(el, value);
    }
};
function setDisplay(el, value) {
    el.style.display = value ? el._vod : 'none';
}
const rendererOptions = _shared.extend({
    patchProp
}, nodeOps);
// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer;
let enabledHydration = false;
function ensureRenderer() {
    return renderer || (renderer = _runtimeCore.createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
    renderer = enabledHydration ? renderer : _runtimeCore.createHydrationRenderer(rendererOptions);
    enabledHydration = true;
    return renderer;
}
// use explicit type casts here to avoid import() calls in rolled-up d.ts
const render = (...args)=>{
    ensureRenderer().render(...args);
};
const hydrate1 = (...args)=>{
    ensureHydrationRenderer().hydrate(...args);
};
const createApp = (...args)=>{
    const app = ensureRenderer().createApp(...args);
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
    const { mount  } = app;
    app.mount = (containerOrSelector)=>{
        const container = normalizeContainer(containerOrSelector);
        if (!container) return;
        const component = app._component;
        if (!_shared.isFunction(component) && !component.render && !component.template) // __UNSAFE__
        // Reason: potential execution of JS expressions in in-DOM template.
        // The user must make sure the in-DOM template is trusted. If it's
        // rendered by the server, the template should not contain any user data.
        component.template = container.innerHTML;
        // clear content before mounting
        container.innerHTML = '';
        const proxy = mount(container, false, container instanceof SVGElement);
        if (container instanceof Element) {
            container.removeAttribute('v-cloak');
            container.setAttribute('data-v-app', '');
        }
        return proxy;
    };
    return app;
};
const createSSRApp = (...args)=>{
    const app = ensureHydrationRenderer().createApp(...args);
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
    const { mount  } = app;
    app.mount = (containerOrSelector)=>{
        const container = normalizeContainer(containerOrSelector);
        if (container) return mount(container, true, container instanceof SVGElement);
    };
    return app;
};
function injectNativeTagCheck(app) {
    // Inject `isNativeTag`
    // this is used for component name validation (dev only)
    Object.defineProperty(app.config, 'isNativeTag', {
        value: (tag)=>_shared.isHTMLTag(tag) || _shared.isSVGTag(tag)
        ,
        writable: false
    });
}
// dev only
function injectCompilerOptionsCheck(app) {
    if (_runtimeCore.isRuntimeOnly()) {
        const isCustomElement = app.config.isCustomElement;
        Object.defineProperty(app.config, 'isCustomElement', {
            get () {
                return isCustomElement;
            },
            set () {
                _runtimeCore.warn(`The \`isCustomElement\` config option is deprecated. Use ` + `\`compilerOptions.isCustomElement\` instead.`);
            }
        });
        const compilerOptions = app.config.compilerOptions;
        const msg = `The \`compilerOptions\` config option is only respected when using ` + `a build of Vue.js that includes the runtime compiler (aka "full build"). ` + `Since you are using the runtime-only build, \`compilerOptions\` ` + `must be passed to \`@vue/compiler-dom\` in the build setup instead.\n` + `- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.\n` + `- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n` + `- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
        Object.defineProperty(app.config, 'compilerOptions', {
            get () {
                _runtimeCore.warn(msg);
                return compilerOptions;
            },
            set () {
                _runtimeCore.warn(msg);
            }
        });
    }
}
function normalizeContainer(container) {
    if (_shared.isString(container)) {
        const res = document.querySelector(container);
        if (!res) _runtimeCore.warn(`Failed to mount app: mount target selector "${container}" returned null.`);
        return res;
    }
    if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === 'closed') _runtimeCore.warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
    return container;
}

},{"@vue/runtime-core":"6wrge","@vue/shared":"8bcX0","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"6wrge":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EffectScope", ()=>_reactivity.EffectScope
);
parcelHelpers.export(exports, "ReactiveEffect", ()=>_reactivity.ReactiveEffect
);
parcelHelpers.export(exports, "computed", ()=>_reactivity.computed
);
parcelHelpers.export(exports, "customRef", ()=>_reactivity.customRef
);
parcelHelpers.export(exports, "effect", ()=>_reactivity.effect
);
parcelHelpers.export(exports, "effectScope", ()=>_reactivity.effectScope
);
parcelHelpers.export(exports, "getCurrentScope", ()=>_reactivity.getCurrentScope
);
parcelHelpers.export(exports, "isProxy", ()=>_reactivity.isProxy
);
parcelHelpers.export(exports, "isReactive", ()=>_reactivity.isReactive
);
parcelHelpers.export(exports, "isReadonly", ()=>_reactivity.isReadonly
);
parcelHelpers.export(exports, "isRef", ()=>_reactivity.isRef
);
parcelHelpers.export(exports, "markRaw", ()=>_reactivity.markRaw
);
parcelHelpers.export(exports, "onScopeDispose", ()=>_reactivity.onScopeDispose
);
parcelHelpers.export(exports, "proxyRefs", ()=>_reactivity.proxyRefs
);
parcelHelpers.export(exports, "reactive", ()=>_reactivity.reactive
);
parcelHelpers.export(exports, "readonly", ()=>_reactivity.readonly
);
parcelHelpers.export(exports, "ref", ()=>_reactivity.ref
);
parcelHelpers.export(exports, "shallowReactive", ()=>_reactivity.shallowReactive
);
parcelHelpers.export(exports, "shallowReadonly", ()=>_reactivity.shallowReadonly
);
parcelHelpers.export(exports, "shallowRef", ()=>_reactivity.shallowRef
);
parcelHelpers.export(exports, "stop", ()=>_reactivity.stop
);
parcelHelpers.export(exports, "toRaw", ()=>_reactivity.toRaw
);
parcelHelpers.export(exports, "toRef", ()=>_reactivity.toRef
);
parcelHelpers.export(exports, "toRefs", ()=>_reactivity.toRefs
);
parcelHelpers.export(exports, "triggerRef", ()=>_reactivity.triggerRef
);
parcelHelpers.export(exports, "unref", ()=>_reactivity.unref
);
parcelHelpers.export(exports, "camelize", ()=>_shared.camelize
);
parcelHelpers.export(exports, "capitalize", ()=>_shared.capitalize
);
parcelHelpers.export(exports, "normalizeClass", ()=>_shared.normalizeClass
);
parcelHelpers.export(exports, "normalizeProps", ()=>_shared.normalizeProps
);
parcelHelpers.export(exports, "normalizeStyle", ()=>_shared.normalizeStyle
);
parcelHelpers.export(exports, "toDisplayString", ()=>_shared.toDisplayString
);
parcelHelpers.export(exports, "toHandlerKey", ()=>_shared.toHandlerKey
);
parcelHelpers.export(exports, "BaseTransition", ()=>BaseTransition
);
parcelHelpers.export(exports, "Comment", ()=>Comment1
);
parcelHelpers.export(exports, "Fragment", ()=>Fragment
);
parcelHelpers.export(exports, "KeepAlive", ()=>KeepAlive
);
parcelHelpers.export(exports, "Static", ()=>Static
);
parcelHelpers.export(exports, "Suspense", ()=>Suspense
);
parcelHelpers.export(exports, "Teleport", ()=>Teleport
);
parcelHelpers.export(exports, "Text", ()=>Text1
);
parcelHelpers.export(exports, "callWithAsyncErrorHandling", ()=>callWithAsyncErrorHandling
);
parcelHelpers.export(exports, "callWithErrorHandling", ()=>callWithErrorHandling
);
parcelHelpers.export(exports, "cloneVNode", ()=>cloneVNode
);
parcelHelpers.export(exports, "compatUtils", ()=>compatUtils
);
parcelHelpers.export(exports, "createBlock", ()=>createBlock
);
parcelHelpers.export(exports, "createCommentVNode", ()=>createCommentVNode
);
parcelHelpers.export(exports, "createElementBlock", ()=>createElementBlock
);
parcelHelpers.export(exports, "createElementVNode", ()=>createBaseVNode
);
parcelHelpers.export(exports, "createHydrationRenderer", ()=>createHydrationRenderer
);
parcelHelpers.export(exports, "createRenderer", ()=>createRenderer
);
parcelHelpers.export(exports, "createSlots", ()=>createSlots
);
parcelHelpers.export(exports, "createStaticVNode", ()=>createStaticVNode
);
parcelHelpers.export(exports, "createTextVNode", ()=>createTextVNode
);
parcelHelpers.export(exports, "createVNode", ()=>createVNode
);
parcelHelpers.export(exports, "defineAsyncComponent", ()=>defineAsyncComponent
);
parcelHelpers.export(exports, "defineComponent", ()=>defineComponent
);
parcelHelpers.export(exports, "defineEmits", ()=>defineEmits
);
parcelHelpers.export(exports, "defineExpose", ()=>defineExpose
);
parcelHelpers.export(exports, "defineProps", ()=>defineProps
);
parcelHelpers.export(exports, "devtools", ()=>devtools
);
parcelHelpers.export(exports, "getCurrentInstance", ()=>getCurrentInstance
);
parcelHelpers.export(exports, "getTransitionRawChildren", ()=>getTransitionRawChildren
);
parcelHelpers.export(exports, "guardReactiveProps", ()=>guardReactiveProps
);
parcelHelpers.export(exports, "h", ()=>h
);
parcelHelpers.export(exports, "handleError", ()=>handleError
);
parcelHelpers.export(exports, "initCustomFormatter", ()=>initCustomFormatter
);
parcelHelpers.export(exports, "inject", ()=>inject
);
parcelHelpers.export(exports, "isMemoSame", ()=>isMemoSame
);
parcelHelpers.export(exports, "isRuntimeOnly", ()=>isRuntimeOnly
);
parcelHelpers.export(exports, "isVNode", ()=>isVNode
);
parcelHelpers.export(exports, "mergeDefaults", ()=>mergeDefaults
);
parcelHelpers.export(exports, "mergeProps", ()=>mergeProps
);
parcelHelpers.export(exports, "nextTick", ()=>nextTick
);
parcelHelpers.export(exports, "onActivated", ()=>onActivated
);
parcelHelpers.export(exports, "onBeforeMount", ()=>onBeforeMount
);
parcelHelpers.export(exports, "onBeforeUnmount", ()=>onBeforeUnmount
);
parcelHelpers.export(exports, "onBeforeUpdate", ()=>onBeforeUpdate
);
parcelHelpers.export(exports, "onDeactivated", ()=>onDeactivated
);
parcelHelpers.export(exports, "onErrorCaptured", ()=>onErrorCaptured
);
parcelHelpers.export(exports, "onMounted", ()=>onMounted
);
parcelHelpers.export(exports, "onRenderTracked", ()=>onRenderTracked
);
parcelHelpers.export(exports, "onRenderTriggered", ()=>onRenderTriggered
);
parcelHelpers.export(exports, "onServerPrefetch", ()=>onServerPrefetch
);
parcelHelpers.export(exports, "onUnmounted", ()=>onUnmounted
);
parcelHelpers.export(exports, "onUpdated", ()=>onUpdated
);
parcelHelpers.export(exports, "openBlock", ()=>openBlock
);
parcelHelpers.export(exports, "popScopeId", ()=>popScopeId
);
parcelHelpers.export(exports, "provide", ()=>provide
);
parcelHelpers.export(exports, "pushScopeId", ()=>pushScopeId
);
parcelHelpers.export(exports, "queuePostFlushCb", ()=>queuePostFlushCb
);
parcelHelpers.export(exports, "registerRuntimeCompiler", ()=>registerRuntimeCompiler
);
parcelHelpers.export(exports, "renderList", ()=>renderList
);
parcelHelpers.export(exports, "renderSlot", ()=>renderSlot
);
parcelHelpers.export(exports, "resolveComponent", ()=>resolveComponent
);
parcelHelpers.export(exports, "resolveDirective", ()=>resolveDirective
);
parcelHelpers.export(exports, "resolveDynamicComponent", ()=>resolveDynamicComponent
);
parcelHelpers.export(exports, "resolveFilter", ()=>resolveFilter
);
parcelHelpers.export(exports, "resolveTransitionHooks", ()=>resolveTransitionHooks
);
parcelHelpers.export(exports, "setBlockTracking", ()=>setBlockTracking
);
parcelHelpers.export(exports, "setDevtoolsHook", ()=>setDevtoolsHook
);
parcelHelpers.export(exports, "setTransitionHooks", ()=>setTransitionHooks
);
parcelHelpers.export(exports, "ssrContextKey", ()=>ssrContextKey
);
parcelHelpers.export(exports, "ssrUtils", ()=>ssrUtils
);
parcelHelpers.export(exports, "toHandlers", ()=>toHandlers
);
parcelHelpers.export(exports, "transformVNodeArgs", ()=>transformVNodeArgs
);
parcelHelpers.export(exports, "useAttrs", ()=>useAttrs
);
parcelHelpers.export(exports, "useSSRContext", ()=>useSSRContext
);
parcelHelpers.export(exports, "useSlots", ()=>useSlots
);
parcelHelpers.export(exports, "useTransitionState", ()=>useTransitionState
);
parcelHelpers.export(exports, "version", ()=>version
);
parcelHelpers.export(exports, "warn", ()=>warn
);
parcelHelpers.export(exports, "watch", ()=>watch
);
parcelHelpers.export(exports, "watchEffect", ()=>watchEffect
);
parcelHelpers.export(exports, "watchPostEffect", ()=>watchPostEffect
);
parcelHelpers.export(exports, "watchSyncEffect", ()=>watchSyncEffect
);
parcelHelpers.export(exports, "withAsyncContext", ()=>withAsyncContext
);
parcelHelpers.export(exports, "withCtx", ()=>withCtx
);
parcelHelpers.export(exports, "withDefaults", ()=>withDefaults
);
parcelHelpers.export(exports, "withDirectives", ()=>withDirectives
);
parcelHelpers.export(exports, "withMemo", ()=>withMemo
);
parcelHelpers.export(exports, "withScopeId", ()=>withScopeId
);
var _reactivity = require("@vue/reactivity");
var _shared = require("@vue/shared");
var global = arguments[3];
/* eslint-disable no-restricted-globals */ let isHmrUpdating = false;
const hmrDirtyComponents = new Set();
{
    const globalObject = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {
    };
    globalObject.__VUE_HMR_RUNTIME__ = {
        createRecord: tryWrap(createRecord),
        rerender: tryWrap(rerender),
        reload: tryWrap(reload)
    };
}const map = new Map();
function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
        createRecord(id);
        record = map.get(id);
    }
    record.add(instance);
}
function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).delete(instance);
}
function createRecord(id) {
    if (map.has(id)) return false;
    map.set(id, new Set());
    return true;
}
function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) return;
    [
        ...record
    ].forEach((instance)=>{
        if (newRender) {
            instance.render = newRender;
            normalizeClassComponent(instance.type).render = newRender;
        }
        instance.renderCache = [];
        // this flag forces child components with slot content to update
        isHmrUpdating = true;
        instance.update();
        isHmrUpdating = false;
    });
}
function reload(id, newComp) {
    const record = map.get(id);
    if (!record) return;
    newComp = normalizeClassComponent(newComp);
    // create a snapshot which avoids the set being mutated during updates
    const instances = [
        ...record
    ];
    for (const instance of instances){
        const oldComp = normalizeClassComponent(instance.type);
        if (!hmrDirtyComponents.has(oldComp)) {
            // 1. Update existing comp definition to match new one
            _shared.extend(oldComp, newComp);
            for(const key in oldComp)if (key !== '__file' && !(key in newComp)) delete oldComp[key];
            // 2. mark definition dirty. This forces the renderer to replace the
            // component on patch.
            hmrDirtyComponents.add(oldComp);
        }
        // 3. invalidate options resolution cache
        instance.appContext.optionsCache.delete(instance.type);
        // 4. actually update
        if (instance.ceReload) {
            // custom element
            hmrDirtyComponents.add(oldComp);
            instance.ceReload(newComp.styles);
            hmrDirtyComponents.delete(oldComp);
        } else if (instance.parent) {
            // 4. Force the parent instance to re-render. This will cause all updated
            // components to be unmounted and re-mounted. Queue the update so that we
            // don't end up forcing the same parent to re-render multiple times.
            queueJob(instance.parent.update);
            // instance is the inner component of an async custom element
            // invoke to reset styles
            if (instance.parent.type.__asyncLoader && instance.parent.ceReload) instance.parent.ceReload(newComp.styles);
        } else if (instance.appContext.reload) // root instance mounted via createApp() has a reload method
        instance.appContext.reload();
        else if (typeof window !== 'undefined') // root instance inside tree created via raw render(). Force reload.
        window.location.reload();
        else console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
    }
    // 5. make sure to cleanup dirty hmr components after update
    queuePostFlushCb(()=>{
        for (const instance1 of instances)hmrDirtyComponents.delete(normalizeClassComponent(instance1.type));
    });
}
function tryWrap(fn) {
    return (id, arg)=>{
        try {
            return fn(id, arg);
        } catch (e) {
            console.error(e);
            console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` + `Full reload required.`);
        }
    };
}
let devtools;
function setDevtoolsHook(hook) {
    devtools = hook;
}
function devtoolsInitApp(app, version) {
    // TODO queue if devtools is undefined
    if (!devtools) return;
    devtools.emit("app:init" /* APP_INIT */ , app, version, {
        Fragment,
        Text: Text1,
        Comment: Comment1,
        Static
    });
}
function devtoolsUnmountApp(app) {
    if (!devtools) return;
    devtools.emit("app:unmount" /* APP_UNMOUNT */ , app);
}
const devtoolsComponentAdded = /*#__PURE__*/ createDevtoolsComponentHook("component:added" /* COMPONENT_ADDED */ );
const devtoolsComponentUpdated = /*#__PURE__*/ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */ );
const devtoolsComponentRemoved = /*#__PURE__*/ createDevtoolsComponentHook("component:removed" /* COMPONENT_REMOVED */ );
function createDevtoolsComponentHook(hook) {
    return (component)=>{
        if (!devtools) return;
        devtools.emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
    };
}
const devtoolsPerfStart = /*#__PURE__*/ createDevtoolsPerformanceHook("perf:start" /* PERFORMANCE_START */ );
const devtoolsPerfEnd = /*#__PURE__*/ createDevtoolsPerformanceHook("perf:end" /* PERFORMANCE_END */ );
function createDevtoolsPerformanceHook(hook) {
    return (component, type, time)=>{
        if (!devtools) return;
        devtools.emit(hook, component.appContext.app, component.uid, component, type, time);
    };
}
function devtoolsComponentEmit(component, event, params) {
    if (!devtools) return;
    devtools.emit("component:emit" /* COMPONENT_EMIT */ , component.appContext.app, component, event, params);
}
const deprecationData = {
    ["GLOBAL_MOUNT" /* GLOBAL_MOUNT */ ]: {
        message: `The global app bootstrapping API has changed: vm.$mount() and the "el" ` + `option have been removed. Use createApp(RootComponent).mount() instead.`,
        link: `https://v3.vuejs.org/guide/migration/global-api.html#mounting-app-instance`
    },
    ["GLOBAL_MOUNT_CONTAINER" /* GLOBAL_MOUNT_CONTAINER */ ]: {
        message: `Vue detected directives on the mount container. ` + `In Vue 3, the container is no longer considered part of the template ` + `and will not be processed/replaced.`,
        link: `https://v3.vuejs.org/guide/migration/mount-changes.html`
    },
    ["GLOBAL_EXTEND" /* GLOBAL_EXTEND */ ]: {
        message: `Vue.extend() has been removed in Vue 3. ` + `Use defineComponent() instead.`,
        link: `https://v3.vuejs.org/api/global-api.html#definecomponent`
    },
    ["GLOBAL_PROTOTYPE" /* GLOBAL_PROTOTYPE */ ]: {
        message: `Vue.prototype is no longer available in Vue 3. ` + `Use app.config.globalProperties instead.`,
        link: `https://v3.vuejs.org/guide/migration/global-api.html#vue-prototype-replaced-by-config-globalproperties`
    },
    ["GLOBAL_SET" /* GLOBAL_SET */ ]: {
        message: `Vue.set() has been removed as it is no longer needed in Vue 3. ` + `Simply use native JavaScript mutations.`
    },
    ["GLOBAL_DELETE" /* GLOBAL_DELETE */ ]: {
        message: `Vue.delete() has been removed as it is no longer needed in Vue 3. ` + `Simply use native JavaScript mutations.`
    },
    ["GLOBAL_OBSERVABLE" /* GLOBAL_OBSERVABLE */ ]: {
        message: `Vue.observable() has been removed. ` + `Use \`import { reactive } from "vue"\` from Composition API instead.`,
        link: `https://v3.vuejs.org/api/basic-reactivity.html`
    },
    ["GLOBAL_PRIVATE_UTIL" /* GLOBAL_PRIVATE_UTIL */ ]: {
        message: `Vue.util has been removed. Please refactor to avoid its usage ` + `since it was an internal API even in Vue 2.`
    },
    ["CONFIG_SILENT" /* CONFIG_SILENT */ ]: {
        message: `config.silent has been removed because it is not good practice to ` + `intentionally suppress warnings. You can use your browser console's ` + `filter features to focus on relevant messages.`
    },
    ["CONFIG_DEVTOOLS" /* CONFIG_DEVTOOLS */ ]: {
        message: `config.devtools has been removed. To enable devtools for ` + `production, configure the __VUE_PROD_DEVTOOLS__ compile-time flag.`,
        link: `https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags`
    },
    ["CONFIG_KEY_CODES" /* CONFIG_KEY_CODES */ ]: {
        message: `config.keyCodes has been removed. ` + `In Vue 3, you can directly use the kebab-case key names as v-on modifiers.`,
        link: `https://v3.vuejs.org/guide/migration/keycode-modifiers.html`
    },
    ["CONFIG_PRODUCTION_TIP" /* CONFIG_PRODUCTION_TIP */ ]: {
        message: `config.productionTip has been removed.`,
        link: `https://v3.vuejs.org/guide/migration/global-api.html#config-productiontip-removed`
    },
    ["CONFIG_IGNORED_ELEMENTS" /* CONFIG_IGNORED_ELEMENTS */ ]: {
        message: ()=>{
            let msg = `config.ignoredElements has been removed.`;
            if (isRuntimeOnly()) msg += ` Pass the "isCustomElement" option to @vue/compiler-dom instead.`;
            else msg += ` Use config.isCustomElement instead.`;
            return msg;
        },
        link: `https://v3.vuejs.org/guide/migration/global-api.html#config-ignoredelements-is-now-config-iscustomelement`
    },
    ["CONFIG_WHITESPACE" /* CONFIG_WHITESPACE */ ]: {
        // this warning is only relevant in the full build when using runtime
        // compilation, so it's put in the runtime compatConfig list.
        message: `Vue 3 compiler's whitespace option will default to "condense" instead of ` + `"preserve". To suppress this warning, provide an explicit value for ` + `\`config.compilerOptions.whitespace\`.`
    },
    ["CONFIG_OPTION_MERGE_STRATS" /* CONFIG_OPTION_MERGE_STRATS */ ]: {
        message: `config.optionMergeStrategies no longer exposes internal strategies. ` + `Use custom merge functions instead.`
    },
    ["INSTANCE_SET" /* INSTANCE_SET */ ]: {
        message: `vm.$set() has been removed as it is no longer needed in Vue 3. ` + `Simply use native JavaScript mutations.`
    },
    ["INSTANCE_DELETE" /* INSTANCE_DELETE */ ]: {
        message: `vm.$delete() has been removed as it is no longer needed in Vue 3. ` + `Simply use native JavaScript mutations.`
    },
    ["INSTANCE_DESTROY" /* INSTANCE_DESTROY */ ]: {
        message: `vm.$destroy() has been removed. Use app.unmount() instead.`,
        link: `https://v3.vuejs.org/api/application-api.html#unmount`
    },
    ["INSTANCE_EVENT_EMITTER" /* INSTANCE_EVENT_EMITTER */ ]: {
        message: `vm.$on/$once/$off() have been removed. ` + `Use an external event emitter library instead.`,
        link: `https://v3.vuejs.org/guide/migration/events-api.html`
    },
    ["INSTANCE_EVENT_HOOKS" /* INSTANCE_EVENT_HOOKS */ ]: {
        message: (event)=>`"${event}" lifecycle events are no longer supported. From templates, ` + `use the "vnode" prefix instead of "hook:". For example, @${event} ` + `should be changed to @vnode-${event.slice(5)}. ` + `From JavaScript, use Composition API to dynamically register lifecycle ` + `hooks.`
        ,
        link: `https://v3.vuejs.org/guide/migration/vnode-lifecycle-events.html`
    },
    ["INSTANCE_CHILDREN" /* INSTANCE_CHILDREN */ ]: {
        message: `vm.$children has been removed. Consider refactoring your logic ` + `to avoid relying on direct access to child components.`,
        link: `https://v3.vuejs.org/guide/migration/children.html`
    },
    ["INSTANCE_LISTENERS" /* INSTANCE_LISTENERS */ ]: {
        message: `vm.$listeners has been removed. In Vue 3, parent v-on listeners are ` + `included in vm.$attrs and it is no longer necessary to separately use ` + `v-on="$listeners" if you are already using v-bind="$attrs". ` + `(Note: the Vue 3 behavior only applies if this compat config is disabled)`,
        link: `https://v3.vuejs.org/guide/migration/listeners-removed.html`
    },
    ["INSTANCE_SCOPED_SLOTS" /* INSTANCE_SCOPED_SLOTS */ ]: {
        message: `vm.$scopedSlots has been removed. Use vm.$slots instead.`,
        link: `https://v3.vuejs.org/guide/migration/slots-unification.html`
    },
    ["INSTANCE_ATTRS_CLASS_STYLE" /* INSTANCE_ATTRS_CLASS_STYLE */ ]: {
        message: (componentName)=>`Component <${componentName || 'Anonymous'}> has \`inheritAttrs: false\` but is ` + `relying on class/style fallthrough from parent. In Vue 3, class/style ` + `are now included in $attrs and will no longer fallthrough when ` + `inheritAttrs is false. If you are already using v-bind="$attrs" on ` + `component root it should render the same end result. ` + `If you are binding $attrs to a non-root element and expecting ` + `class/style to fallthrough on root, you will need to now manually bind ` + `them on root via :class="$attrs.class".`
        ,
        link: `https://v3.vuejs.org/guide/migration/attrs-includes-class-style.html`
    },
    ["OPTIONS_DATA_FN" /* OPTIONS_DATA_FN */ ]: {
        message: `The "data" option can no longer be a plain object. ` + `Always use a function.`,
        link: `https://v3.vuejs.org/guide/migration/data-option.html`
    },
    ["OPTIONS_DATA_MERGE" /* OPTIONS_DATA_MERGE */ ]: {
        message: (key)=>`Detected conflicting key "${key}" when merging data option values. ` + `In Vue 3, data keys are merged shallowly and will override one another.`
        ,
        link: `https://v3.vuejs.org/guide/migration/data-option.html#mixin-merge-behavior-change`
    },
    ["OPTIONS_BEFORE_DESTROY" /* OPTIONS_BEFORE_DESTROY */ ]: {
        message: `\`beforeDestroy\` has been renamed to \`beforeUnmount\`.`
    },
    ["OPTIONS_DESTROYED" /* OPTIONS_DESTROYED */ ]: {
        message: `\`destroyed\` has been renamed to \`unmounted\`.`
    },
    ["WATCH_ARRAY" /* WATCH_ARRAY */ ]: {
        message: `"watch" option or vm.$watch on an array value will no longer ` + `trigger on array mutation unless the "deep" option is specified. ` + `If current usage is intended, you can disable the compat behavior and ` + `suppress this warning with:` + `\n\n  configureCompat({ ${"WATCH_ARRAY" /* WATCH_ARRAY */ }: false })\n`,
        link: `https://v3.vuejs.org/guide/migration/watch.html`
    },
    ["PROPS_DEFAULT_THIS" /* PROPS_DEFAULT_THIS */ ]: {
        message: (key)=>`props default value function no longer has access to "this". The compat ` + `build only offers access to this.$options.` + `(found in prop "${key}")`
        ,
        link: `https://v3.vuejs.org/guide/migration/props-default-this.html`
    },
    ["CUSTOM_DIR" /* CUSTOM_DIR */ ]: {
        message: (legacyHook, newHook)=>`Custom directive hook "${legacyHook}" has been removed. ` + `Use "${newHook}" instead.`
        ,
        link: `https://v3.vuejs.org/guide/migration/custom-directives.html`
    },
    ["V_FOR_REF" /* V_FOR_REF */ ]: {
        message: `Ref usage on v-for no longer creates array ref values in Vue 3. ` + `Consider using function refs or refactor to avoid ref usage altogether.`,
        link: `https://v3.vuejs.org/guide/migration/array-refs.html`
    },
    ["V_ON_KEYCODE_MODIFIER" /* V_ON_KEYCODE_MODIFIER */ ]: {
        message: `Using keyCode as v-on modifier is no longer supported. ` + `Use kebab-case key name modifiers instead.`,
        link: `https://v3.vuejs.org/guide/migration/keycode-modifiers.html`
    },
    ["ATTR_FALSE_VALUE" /* ATTR_FALSE_VALUE */ ]: {
        message: (name)=>`Attribute "${name}" with v-bind value \`false\` will render ` + `${name}="false" instead of removing it in Vue 3. To remove the attribute, ` + `use \`null\` or \`undefined\` instead. If the usage is intended, ` + `you can disable the compat behavior and suppress this warning with:` + `\n\n  configureCompat({ ${"ATTR_FALSE_VALUE" /* ATTR_FALSE_VALUE */ }: false })\n`
        ,
        link: `https://v3.vuejs.org/guide/migration/attribute-coercion.html`
    },
    ["ATTR_ENUMERATED_COERCION" /* ATTR_ENUMERATED_COERCION */ ]: {
        message: (name, value, coerced)=>`Enumerated attribute "${name}" with v-bind value \`${value}\` will ` + `${value === null ? `be removed` : `render the value as-is`} instead of coercing the value to "${coerced}" in Vue 3. ` + `Always use explicit "true" or "false" values for enumerated attributes. ` + `If the usage is intended, ` + `you can disable the compat behavior and suppress this warning with:` + `\n\n  configureCompat({ ${"ATTR_ENUMERATED_COERCION" /* ATTR_ENUMERATED_COERCION */ }: false })\n`
        ,
        link: `https://v3.vuejs.org/guide/migration/attribute-coercion.html`
    },
    ["TRANSITION_CLASSES" /* TRANSITION_CLASSES */ ]: {
        message: `` // this feature cannot be runtime-detected
    },
    ["TRANSITION_GROUP_ROOT" /* TRANSITION_GROUP_ROOT */ ]: {
        message: `<TransitionGroup> no longer renders a root <span> element by ` + `default if no "tag" prop is specified. If you do not rely on the span ` + `for styling, you can disable the compat behavior and suppress this ` + `warning with:` + `\n\n  configureCompat({ ${"TRANSITION_GROUP_ROOT" /* TRANSITION_GROUP_ROOT */ }: false })\n`,
        link: `https://v3.vuejs.org/guide/migration/transition-group.html`
    },
    ["COMPONENT_ASYNC" /* COMPONENT_ASYNC */ ]: {
        message: (comp)=>{
            const name = getComponentName(comp);
            return `Async component${name ? ` <${name}>` : `s`} should be explicitly created via \`defineAsyncComponent()\` ` + `in Vue 3. Plain functions will be treated as functional components in ` + `non-compat build. If you have already migrated all async component ` + `usage and intend to use plain functions for functional components, ` + `you can disable the compat behavior and suppress this ` + `warning with:` + `\n\n  configureCompat({ ${"COMPONENT_ASYNC" /* COMPONENT_ASYNC */ }: false })\n`;
        },
        link: `https://v3.vuejs.org/guide/migration/async-components.html`
    },
    ["COMPONENT_FUNCTIONAL" /* COMPONENT_FUNCTIONAL */ ]: {
        message: (comp)=>{
            const name = getComponentName(comp);
            return `Functional component${name ? ` <${name}>` : `s`} should be defined as a plain function in Vue 3. The "functional" ` + `option has been removed. NOTE: Before migrating to use plain ` + `functions for functional components, first make sure that all async ` + `components usage have been migrated and its compat behavior has ` + `been disabled.`;
        },
        link: `https://v3.vuejs.org/guide/migration/functional-components.html`
    },
    ["COMPONENT_V_MODEL" /* COMPONENT_V_MODEL */ ]: {
        message: (comp)=>{
            const configMsg = `opt-in to ` + `Vue 3 behavior on a per-component basis with \`compatConfig: { ${"COMPONENT_V_MODEL" /* COMPONENT_V_MODEL */ }: false }\`.`;
            if (comp.props && (_shared.isArray(comp.props) ? comp.props.includes('modelValue') : _shared.hasOwn(comp.props, 'modelValue'))) return `Component delcares "modelValue" prop, which is Vue 3 usage, but ` + `is running under Vue 2 compat v-model behavior. You can ${configMsg}`;
            return `v-model usage on component has changed in Vue 3. Component that expects ` + `to work with v-model should now use the "modelValue" prop and emit the ` + `"update:modelValue" event. You can update the usage and then ${configMsg}`;
        },
        link: `https://v3.vuejs.org/guide/migration/v-model.html`
    },
    ["RENDER_FUNCTION" /* RENDER_FUNCTION */ ]: {
        message: `Vue 3's render function API has changed. ` + `You can opt-in to the new API with:` + `\n\n  configureCompat({ ${"RENDER_FUNCTION" /* RENDER_FUNCTION */ }: false })\n` + `\n  (This can also be done per-component via the "compatConfig" option.)`,
        link: `https://v3.vuejs.org/guide/migration/render-function-api.html`
    },
    ["FILTERS" /* FILTERS */ ]: {
        message: `filters have been removed in Vue 3. ` + `The "|" symbol will be treated as native JavaScript bitwise OR operator. ` + `Use method calls or computed properties instead.`,
        link: `https://v3.vuejs.org/guide/migration/filters.html`
    },
    ["PRIVATE_APIS" /* PRIVATE_APIS */ ]: {
        message: (name)=>`"${name}" is a Vue 2 private API that no longer exists in Vue 3. ` + `If you are seeing this warning only due to a dependency, you can ` + `suppress this warning via { PRIVATE_APIS: 'supress-warning' }.`
    }
};
const instanceWarned = Object.create(null);
const warnCount = Object.create(null);
function warnDeprecation(key, instance, ...args) {
    instance = instance || getCurrentInstance();
    // check user config
    const config = getCompatConfigForKey(key, instance);
    if (config === 'suppress-warning') return;
    const dupKey = key + args.join('');
    let compId = instance && formatComponentName(instance, instance.type);
    if (compId === 'Anonymous' && instance) compId = instance.uid;
    // skip if the same warning is emitted for the same component type
    const componentDupKey = dupKey + compId;
    if (componentDupKey in instanceWarned) return;
    instanceWarned[componentDupKey] = true;
    // same warning, but different component. skip the long message and just
    // log the key and count.
    if (dupKey in warnCount) {
        warn(`(deprecation ${key}) (${(++warnCount[dupKey]) + 1})`);
        return;
    }
    warnCount[dupKey] = 0;
    const { message , link  } = deprecationData[key];
    warn(`(deprecation ${key}) ${typeof message === 'function' ? message(...args) : message}${link ? `\n  Details: ${link}` : ``}`);
    if (!isCompatEnabled(key, instance, true)) console.error(`^ The above deprecation's compat behavior is disabled and will likely ` + `lead to runtime errors.`);
}
const globalCompatConfig = {
    MODE: 2
};
function getCompatConfigForKey(key, instance) {
    const instanceConfig = instance && instance.type.compatConfig;
    if (instanceConfig && key in instanceConfig) return instanceConfig[key];
    return globalCompatConfig[key];
}
function isCompatEnabled(key, instance, enableForBuiltIn = false) {
    // skip compat for built-in components
    if (!enableForBuiltIn && instance && instance.type.__isBuiltIn) return false;
    const rawMode = getCompatConfigForKey('MODE', instance) || 2;
    const val = getCompatConfigForKey(key, instance);
    const mode = _shared.isFunction(rawMode) ? rawMode(instance && instance.type) : rawMode;
    if (mode === 2) return val !== false;
    else return val === true || val === 'suppress-warning';
}
function emit(instance, event, ...rawArgs) {
    const props = instance.vnode.props || _shared.EMPTY_OBJ;
    {
        const { emitsOptions , propsOptions: [propsOptions]  } = instance;
        if (emitsOptions) {
            if (!(event in emitsOptions) && true) {
                if (!propsOptions || !(_shared.toHandlerKey(event) in propsOptions)) warn(`Component emitted event "${event}" but it is neither declared in ` + `the emits option nor as an "${_shared.toHandlerKey(event)}" prop.`);
            } else {
                const validator = emitsOptions[event];
                if (_shared.isFunction(validator)) {
                    const isValid = validator(...rawArgs);
                    if (!isValid) warn(`Invalid event arguments: event validation failed for event "${event}".`);
                }
            }
        }
    }
    let args = rawArgs;
    const isModelListener = event.startsWith('update:');
    // for v-model update:xxx events, apply modifiers on args
    const modelArg = isModelListener && event.slice(7);
    if (modelArg && modelArg in props) {
        const modifiersKey = `${modelArg === 'modelValue' ? 'model' : modelArg}Modifiers`;
        const { number , trim  } = props[modifiersKey] || _shared.EMPTY_OBJ;
        if (trim) args = rawArgs.map((a)=>a.trim()
        );
        else if (number) args = rawArgs.map(_shared.toNumber);
    }
    devtoolsComponentEmit(instance, event, args);
    {
        const lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && props[_shared.toHandlerKey(lowerCaseEvent)]) warn(`Event "${lowerCaseEvent}" is emitted in component ` + `${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". ` + `Note that HTML attributes are case-insensitive and you cannot use ` + `v-on to listen to camelCase events when using in-DOM templates. ` + `You should probably use "${_shared.hyphenate(event)}" instead of "${event}".`);
    }
    let handlerName;
    let handler = props[handlerName = _shared.toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = _shared.toHandlerKey(_shared.camelize(event))];
    // for v-model update:xxx events, also trigger kebab-case equivalent
    // for props passed via kebab-case
    if (!handler && isModelListener) handler = props[handlerName = _shared.toHandlerKey(_shared.hyphenate(event))];
    if (handler) callWithAsyncErrorHandling(handler, instance, 6 /* COMPONENT_EVENT_HANDLER */ , args);
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
        if (!instance.emitted) instance.emitted = {
        };
        else if (instance.emitted[handlerName]) return;
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(onceHandler, instance, 6 /* COMPONENT_EVENT_HANDLER */ , args);
    }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== undefined) return cached;
    const raw = comp.emits;
    let normalized = {
    };
    // apply mixin/extends props
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !_shared.isFunction(comp)) {
        const extendEmits = (raw1)=>{
            const normalizedFromExtend = normalizeEmitsOptions(raw1, appContext, true);
            if (normalizedFromExtend) {
                hasExtends = true;
                _shared.extend(normalized, normalizedFromExtend);
            }
        };
        if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
        if (comp.extends) extendEmits(comp.extends);
        if (comp.mixins) comp.mixins.forEach(extendEmits);
    }
    if (!raw && !hasExtends) {
        cache.set(comp, null);
        return null;
    }
    if (_shared.isArray(raw)) raw.forEach((key)=>normalized[key] = null
    );
    else _shared.extend(normalized, raw);
    cache.set(comp, normalized);
    return normalized;
}
// Check if an incoming prop key is a declared emit event listener.
// e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
// both considered matched listeners.
function isEmitListener(options, key) {
    if (!options || !_shared.isOn(key)) return false;
    key = key.slice(2).replace(/Once$/, '');
    return _shared.hasOwn(options, key[0].toLowerCase() + key.slice(1)) || _shared.hasOwn(options, _shared.hyphenate(key)) || _shared.hasOwn(options, key);
}
/**
 * mark the current rendering instance for asset resolution (e.g.
 * resolveComponent, resolveDirective) during render
 */ let currentRenderingInstance = null;
let currentScopeId = null;
/**
 * Note: rendering calls maybe nested. The function returns the parent rendering
 * instance if present, which should be restored after the render is done:
 *
 * ```js
 * const prev = setCurrentRenderingInstance(i)
 * // ...render
 * setCurrentRenderingInstance(prev)
 * ```
 */ function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
}
/**
 * Set scope id when creating hoisted vnodes.
 * @private compiler helper
 */ function pushScopeId(id) {
    currentScopeId = id;
}
/**
 * Technically we no longer need this after 3.0.8 but we need to keep the same
 * API for backwards compat w/ code generated by compilers.
 * @private
 */ function popScopeId() {
    currentScopeId = null;
}
/**
 * Only for backwards compat
 * @private
 */ const withScopeId = (_id)=>withCtx
;
/**
 * Wrap a slot function to memoize current rendering instance
 * @private compiler helper
 */ function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot // false only
) {
    if (!ctx) return fn;
    // already normalized
    if (fn._n) return fn;
    const renderFnWithContext = (...args)=>{
        // If a user calls a compiled slot inside a template expression (#1745), it
        // can mess up block tracking, so by default we disable block tracking and
        // force bail out when invoking a compiled slot (indicated by the ._d flag).
        // This isn't necessary if rendering a compiled `<slot>`, so we flip the
        // ._d flag off when invoking the wrapped fn inside `renderSlot`.
        if (renderFnWithContext._d) setBlockTracking(-1);
        const prevInstance = setCurrentRenderingInstance(ctx);
        const res = fn(...args);
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) setBlockTracking(1);
        devtoolsComponentUpdated(ctx);
        return res;
    };
    // mark normalized to avoid duplicated wrapping
    renderFnWithContext._n = true;
    // mark this as compiled by default
    // this is used in vnode.ts -> normalizeChildren() to set the slot
    // rendering flag.
    renderFnWithContext._c = true;
    // disable block tracking by default
    renderFnWithContext._d = true;
    return renderFnWithContext;
}
/**
 * dev only flag to track whether $attrs was used during render.
 * If $attrs was used during render then the warning for failed attrs
 * fallthrough can be suppressed.
 */ let accessedAttrs = false;
function markAttrsAccessed() {
    accessedAttrs = true;
}
function renderComponentRoot(instance) {
    const { type: Component , vnode , proxy , withProxy , props , propsOptions: [propsOptions] , slots , attrs , emit: emit1 , render , renderCache , data , setupState , ctx , inheritAttrs  } = instance;
    let result;
    const prev = setCurrentRenderingInstance(instance);
    accessedAttrs = false;
    try {
        let fallthroughAttrs;
        if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */ ) {
            // withProxy is a proxy with a different `has` trap only for
            // runtime-compiled render functions using `with` block.
            const proxyToUse = withProxy || proxy;
            result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
            fallthroughAttrs = attrs;
        } else {
            // functional
            const render1 = Component;
            // in dev, mark attrs accessed if optional props (attrs === props)
            if (attrs === props) markAttrsAccessed();
            result = normalizeVNode(render1.length > 1 ? render1(props, {
                get attrs () {
                    markAttrsAccessed();
                    return attrs;
                },
                slots,
                emit: emit1
            }) : render1(props, null));
            fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
        }
        // attr merging
        // in dev mode, comments are preserved, and it's possible for a template
        // to have comments along side the root element which makes it a fragment
        let root = result;
        let setRoot = undefined;
        if (result.patchFlag > 0 && result.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */ ) [root, setRoot] = getChildRoot(result);
        if (fallthroughAttrs && inheritAttrs !== false) {
            const keys = Object.keys(fallthroughAttrs);
            const { shapeFlag  } = root;
            if (keys.length) {
                if (shapeFlag & 7 /* COMPONENT */ ) {
                    if (propsOptions && keys.some(_shared.isModelListener)) // If a v-model listener (onUpdate:xxx) has a corresponding declared
                    // prop, it indicates this component expects to handle v-model and
                    // it should not fallthrough.
                    // related: #1543, #1643, #1989
                    fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                    root = cloneVNode(root, fallthroughAttrs);
                } else if (!accessedAttrs && root.type !== Comment1) {
                    const allAttrs = Object.keys(attrs);
                    const eventAttrs = [];
                    const extraAttrs = [];
                    for(let i = 0, l = allAttrs.length; i < l; i++){
                        const key = allAttrs[i];
                        if (_shared.isOn(key)) // ignore v-model handlers when they fail to fallthrough
                        {
                            if (!_shared.isModelListener(key)) // remove `on`, lowercase first letter to reflect event casing
                            // accurately
                            eventAttrs.push(key[2].toLowerCase() + key.slice(3));
                        } else extraAttrs.push(key);
                    }
                    if (extraAttrs.length) warn(`Extraneous non-props attributes (` + `${extraAttrs.join(', ')}) ` + `were passed to component but could not be automatically inherited ` + `because component renders fragment or text root nodes.`);
                    if (eventAttrs.length) warn(`Extraneous non-emits event listeners (` + `${eventAttrs.join(', ')}) ` + `were passed to component but could not be automatically inherited ` + `because component renders fragment or text root nodes. ` + `If the listener is intended to be a component custom event listener only, ` + `declare it using the "emits" option.`);
                }
            }
        }
        // inherit directives
        if (vnode.dirs) {
            if (!isElementRoot(root)) warn(`Runtime directive used on component with non-element root node. ` + `The directives will not function as intended.`);
            root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
        }
        // inherit transition data
        if (vnode.transition) {
            if (!isElementRoot(root)) warn(`Component inside <Transition> renders non-element root node ` + `that cannot be animated.`);
            root.transition = vnode.transition;
        }
        if (setRoot) setRoot(root);
        else result = root;
    } catch (err) {
        blockStack.length = 0;
        handleError(err, instance, 1 /* RENDER_FUNCTION */ );
        result = createVNode(Comment1);
    }
    setCurrentRenderingInstance(prev);
    return result;
}
/**
 * dev only
 * In dev mode, template root level comments are rendered, which turns the
 * template into a fragment root, but we need to locate the single element
 * root for attrs and scope id processing.
 */ const getChildRoot = (vnode)=>{
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) return [
        vnode,
        undefined
    ];
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot)=>{
        rawChildren[index] = updatedRoot;
        if (dynamicChildren) {
            if (dynamicIndex > -1) dynamicChildren[dynamicIndex] = updatedRoot;
            else if (updatedRoot.patchFlag > 0) vnode.dynamicChildren = [
                ...dynamicChildren,
                updatedRoot
            ];
        }
    };
    return [
        normalizeVNode(childRoot),
        setRoot
    ];
};
function filterSingleRoot(children) {
    let singleRoot;
    for(let i = 0; i < children.length; i++){
        const child = children[i];
        if (isVNode(child)) // ignore user comment
        {
            if (child.type !== Comment1 || child.children === 'v-if') {
                if (singleRoot) // has more than 1 non-comment child, return now
                return;
                else singleRoot = child;
            }
        } else return;
    }
    return singleRoot;
}
const getFunctionalFallthrough = (attrs)=>{
    let res;
    for(const key in attrs)if (key === 'class' || key === 'style' || _shared.isOn(key)) (res || (res = {
    }))[key] = attrs[key];
    return res;
};
const filterModelListeners = (attrs, props)=>{
    const res = {
    };
    for(const key in attrs)if (!_shared.isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
    return res;
};
const isElementRoot = (vnode)=>{
    return vnode.shapeFlag & 7 /* ELEMENT */  || vnode.type === Comment1 // potential v-if branch switch
    ;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps , children: prevChildren , component  } = prevVNode;
    const { props: nextProps , children: nextChildren , patchFlag  } = nextVNode;
    const emits = component.emitsOptions;
    // Parent component's render function was hot-updated. Since this may have
    // caused the child component's slots content to have changed, we need to
    // force the child to update as well.
    if ((prevChildren || nextChildren) && isHmrUpdating) return true;
    // force child update for runtime directive or transition on component vnode.
    if (nextVNode.dirs || nextVNode.transition) return true;
    if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024 /* DYNAMIC_SLOTS */ ) // slot content that references values that might have changed,
        // e.g. in a v-for
        return true;
        if (patchFlag & 16 /* FULL_PROPS */ ) {
            if (!prevProps) return !!nextProps;
            // presence of this flag indicates props are always non-null
            return hasPropsChanged(prevProps, nextProps, emits);
        } else if (patchFlag & 8 /* PROPS */ ) {
            const dynamicProps = nextVNode.dynamicProps;
            for(let i = 0; i < dynamicProps.length; i++){
                const key = dynamicProps[i];
                if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) return true;
            }
        }
    } else {
        // this path is only taken by manually written render functions
        // so presence of any children leads to a forced update
        if (prevChildren || nextChildren) {
            if (!nextChildren || !nextChildren.$stable) return true;
        }
        if (prevProps === nextProps) return false;
        if (!prevProps) return !!nextProps;
        if (!nextProps) return true;
        return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) return true;
    for(let i = 0; i < nextKeys.length; i++){
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) return true;
    }
    return false;
}
function updateHOCHostEl({ vnode , parent  }, el // HostNode
) {
    while(parent && parent.subTree === vnode){
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
    }
}
const isSuspense = (type)=>type.__isSuspense
;
// Suspense exposes a component-like API, and is treated like a component
// in the compiler, but internally it's a special built-in type that hooks
// directly into the renderer.
const SuspenseImpl = {
    name: 'Suspense',
    // In order to make Suspense tree-shakable, we need to avoid importing it
    // directly in the renderer. The renderer checks for the __isSuspense flag
    // on a vnode's type and calls the `process` method, passing in renderer
    // internals.
    __isSuspense: true,
    process (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, // platform-specific impl passed from renderer
    rendererInternals) {
        if (n1 == null) mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals);
        else patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, rendererInternals);
    },
    hydrate: hydrateSuspense,
    create: createSuspenseBoundary,
    normalize: normalizeSuspenseChildren
};
// Force-casted public typing for h and TSX props inference
const Suspense = SuspenseImpl;
function triggerEvent(vnode, name) {
    const eventListener = vnode.props && vnode.props[name];
    if (_shared.isFunction(eventListener)) eventListener();
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
    const { p: patch , o: { createElement  }  } = rendererInternals;
    const hiddenContainer = createElement('div');
    const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals);
    // start mounting the content subtree in an off-dom container
    patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds);
    // now check if we have encountered any async deps
    if (suspense.deps > 0) {
        // has async
        // invoke @fallback event
        triggerEvent(vnode, 'onPending');
        triggerEvent(vnode, 'onFallback');
        // mount the fallback tree
        patch(null, vnode.ssFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds);
        setActiveBranch(suspense, vnode.ssFallback);
    } else // Suspense has no async deps. Just resolve.
    suspense.resolve();
}
function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, { p: patch , um: unmount , o: { createElement  }  }) {
    const suspense = n2.suspense = n1.suspense;
    suspense.vnode = n2;
    n2.el = n1.el;
    const newBranch = n2.ssContent;
    const newFallback = n2.ssFallback;
    const { activeBranch , pendingBranch , isInFallback , isHydrating  } = suspense;
    if (pendingBranch) {
        suspense.pendingBranch = newBranch;
        if (isSameVNodeType(newBranch, pendingBranch)) {
            // same root type but content may have changed.
            patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
            if (suspense.deps <= 0) suspense.resolve();
            else if (isInFallback) {
                patch(activeBranch, newFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds, optimized);
                setActiveBranch(suspense, newFallback);
            }
        } else {
            // toggled before pending tree is resolved
            suspense.pendingId++;
            if (isHydrating) {
                // if toggled before hydration is finished, the current DOM tree is
                // no longer valid. set it as the active branch so it will be unmounted
                // when resolved
                suspense.isHydrating = false;
                suspense.activeBranch = pendingBranch;
            } else unmount(pendingBranch, parentComponent, suspense);
            // increment pending ID. this is used to invalidate async callbacks
            // reset suspense state
            suspense.deps = 0;
            // discard effects from pending branch
            suspense.effects.length = 0;
            // discard previous container
            suspense.hiddenContainer = createElement('div');
            if (isInFallback) {
                // already in fallback state
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
                if (suspense.deps <= 0) suspense.resolve();
                else {
                    patch(activeBranch, newFallback, container, anchor, parentComponent, null, isSVG, slotScopeIds, optimized);
                    setActiveBranch(suspense, newFallback);
                }
            } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
                // toggled "back" to current active branch
                patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
                // force resolve
                suspense.resolve(true);
            } else {
                // switched to a 3rd branch
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
                if (suspense.deps <= 0) suspense.resolve();
            }
        }
    } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        // root did not change, just normal patch
        patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
        setActiveBranch(suspense, newBranch);
    } else {
        // root node toggled
        // invoke @pending event
        triggerEvent(n2, 'onPending');
        // mount pending branch in off-dom container
        suspense.pendingBranch = newBranch;
        suspense.pendingId++;
        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
        if (suspense.deps <= 0) // incoming branch has no async deps, resolve now.
        suspense.resolve();
        else {
            const { timeout , pendingId  } = suspense;
            if (timeout > 0) setTimeout(()=>{
                if (suspense.pendingId === pendingId) suspense.fallback(newFallback);
            }, timeout);
            else if (timeout === 0) suspense.fallback(newFallback);
        }
    }
}
let hasWarned = false;
function createSuspenseBoundary(vnode, parent, parentComponent, container1, hiddenContainer, anchor1, isSVG, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
    /* istanbul ignore if */ if (!hasWarned) {
        hasWarned = true;
        // @ts-ignore `console.info` cannot be null error
        console[console.info ? 'info' : 'log'](`<Suspense> is an experimental feature and its API will likely change.`);
    }
    const { p: patch , m: move , um: unmount , n: next , o: { parentNode , remove  }  } = rendererInternals;
    const timeout = _shared.toNumber(vnode.props && vnode.props.timeout);
    const suspense = {
        vnode,
        parent,
        parentComponent,
        isSVG,
        container: container1,
        hiddenContainer,
        anchor: anchor1,
        deps: 0,
        pendingId: 0,
        timeout: typeof timeout === 'number' ? timeout : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: true,
        isHydrating,
        isUnmounted: false,
        effects: [],
        resolve (resume = false) {
            if (!resume && !suspense.pendingBranch) throw new Error(`suspense.resolve() is called without a pending branch.`);
            if (suspense.isUnmounted) throw new Error(`suspense.resolve() is called on an already unmounted suspense boundary.`);
            const { vnode: vnode1 , activeBranch , pendingBranch , pendingId , effects , parentComponent: parentComponent1 , container: container1  } = suspense;
            if (suspense.isHydrating) suspense.isHydrating = false;
            else if (!resume) {
                const delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === 'out-in';
                if (delayEnter) activeBranch.transition.afterLeave = ()=>{
                    if (pendingId === suspense.pendingId) move(pendingBranch, container1, anchor1, 0 /* ENTER */ );
                };
                // this is initial anchor on mount
                let { anchor: anchor1  } = suspense;
                // unmount current active tree
                if (activeBranch) {
                    // if the fallback tree was mounted, it may have been moved
                    // as part of a parent suspense. get the latest anchor for insertion
                    anchor1 = next(activeBranch);
                    unmount(activeBranch, parentComponent1, suspense, true);
                }
                if (!delayEnter) // move content from off-dom container to actual container
                move(pendingBranch, container1, anchor1, 0 /* ENTER */ );
            }
            setActiveBranch(suspense, pendingBranch);
            suspense.pendingBranch = null;
            suspense.isInFallback = false;
            // flush buffered effects
            // check if there is a pending parent suspense
            let parent1 = suspense.parent;
            let hasUnresolvedAncestor = false;
            while(parent1){
                if (parent1.pendingBranch) {
                    // found a pending parent suspense, merge buffered post jobs
                    // into that parent
                    parent1.effects.push(...effects);
                    hasUnresolvedAncestor = true;
                    break;
                }
                parent1 = parent1.parent;
            }
            // no pending parent suspense, flush all jobs
            if (!hasUnresolvedAncestor) queuePostFlushCb(effects);
            suspense.effects = [];
            // invoke @resolve event
            triggerEvent(vnode1, 'onResolve');
        },
        fallback (fallbackVNode) {
            if (!suspense.pendingBranch) return;
            const { vnode: vnode1 , activeBranch , parentComponent: parentComponent1 , container: container1 , isSVG: isSVG1  } = suspense;
            // invoke @fallback event
            triggerEvent(vnode1, 'onFallback');
            const anchor1 = next(activeBranch);
            const mountFallback = ()=>{
                if (!suspense.isInFallback) return;
                // mount the fallback tree
                patch(null, fallbackVNode, container1, anchor1, parentComponent1, null, isSVG1, slotScopeIds, optimized);
                setActiveBranch(suspense, fallbackVNode);
            };
            const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === 'out-in';
            if (delayEnter) activeBranch.transition.afterLeave = mountFallback;
            suspense.isInFallback = true;
            // unmount current active branch
            unmount(activeBranch, parentComponent1, null, true // shouldRemove
            );
            if (!delayEnter) mountFallback();
        },
        move (container, anchor, type) {
            suspense.activeBranch && move(suspense.activeBranch, container, anchor, type);
            suspense.container = container;
        },
        next () {
            return suspense.activeBranch && next(suspense.activeBranch);
        },
        registerDep (instance, setupRenderEffect) {
            const isInPendingSuspense = !!suspense.pendingBranch;
            if (isInPendingSuspense) suspense.deps++;
            const hydratedEl = instance.vnode.el;
            instance.asyncDep.catch((err)=>{
                handleError(err, instance, 0 /* SETUP_FUNCTION */ );
            }).then((asyncSetupResult)=>{
                // retry when the setup() promise resolves.
                // component may have been unmounted before resolve.
                if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) return;
                // retry from this component
                instance.asyncResolved = true;
                const { vnode: vnode1  } = instance;
                pushWarningContext(vnode1);
                handleSetupResult(instance, asyncSetupResult, false);
                if (hydratedEl) // vnode may have been replaced if an update happened before the
                // async dep is resolved.
                vnode1.el = hydratedEl;
                const placeholder = !hydratedEl && instance.subTree.el;
                setupRenderEffect(instance, vnode1, // component may have been moved before resolve.
                // if this is not a hydration, instance.subTree will be the comment
                // placeholder.
                parentNode(hydratedEl || instance.subTree.el), // anchor will not be used if this is hydration, so only need to
                // consider the comment placeholder case.
                hydratedEl ? null : next(instance.subTree), suspense, isSVG, optimized);
                if (placeholder) remove(placeholder);
                updateHOCHostEl(instance, vnode1.el);
                popWarningContext();
                // only decrease deps count if suspense is not already resolved
                if (isInPendingSuspense && (--suspense.deps) === 0) suspense.resolve();
            });
        },
        unmount (parentSuspense, doRemove) {
            suspense.isUnmounted = true;
            if (suspense.activeBranch) unmount(suspense.activeBranch, parentComponent, parentSuspense, doRemove);
            if (suspense.pendingBranch) unmount(suspense.pendingBranch, parentComponent, parentSuspense, doRemove);
        }
    };
    return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
    /* eslint-disable no-restricted-globals */ const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement('div'), null, isSVG, slotScopeIds, optimized, rendererInternals, true);
    // there are two possible scenarios for server-rendered suspense:
    // - success: ssr content should be fully resolved
    // - failure: ssr content should be the fallback branch.
    // however, on the client we don't really know if it has failed or not
    // attempt to hydrate the DOM assuming it has succeeded, but we still
    // need to construct a suspense boundary first
    const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
    if (suspense.deps === 0) suspense.resolve();
    return result;
/* eslint-enable no-restricted-globals */ }
function normalizeSuspenseChildren(vnode) {
    const { shapeFlag , children  } = vnode;
    const isSlotChildren = shapeFlag & 32 /* SLOTS_CHILDREN */ ;
    vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
    vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment1);
}
function normalizeSuspenseSlot(s) {
    let block;
    if (_shared.isFunction(s)) {
        const isCompiledSlot = s._c;
        if (isCompiledSlot) {
            // disableTracking: false
            // allow block tracking for compiled slots
            // (see ./componentRenderContext.ts)
            s._d = false;
            openBlock();
        }
        s = s();
        if (isCompiledSlot) {
            s._d = true;
            block = currentBlock;
            closeBlock();
        }
    }
    if (_shared.isArray(s)) {
        const singleChild = filterSingleRoot(s);
        if (!singleChild) warn(`<Suspense> slots expect a single root node.`);
        s = singleChild;
    }
    s = normalizeVNode(s);
    if (block && !s.dynamicChildren) s.dynamicChildren = block.filter((c)=>c !== s
    );
    return s;
}
function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
        if (_shared.isArray(fn)) suspense.effects.push(...fn);
        else suspense.effects.push(fn);
    } else queuePostFlushCb(fn);
}
function setActiveBranch(suspense, branch) {
    suspense.activeBranch = branch;
    const { vnode , parentComponent  } = suspense;
    const el = vnode.el = branch.el;
    // in case suspense is the root node of a component,
    // recursively update the HOC el
    if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
    }
}
function provide(key, value) {
    if (!currentInstance) warn(`provide() can only be used inside setup().`);
    else {
        let provides = currentInstance.provides;
        // by default an instance inherits its parent's provides object
        // but when it needs to provide values of its own, it creates its
        // own provides object using parent provides object as prototype.
        // this way in `inject` we can simply look up injections from direct
        // parent and let the prototype chain do the work.
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
        // TS doesn't allow symbol as index type
        provides[key] = value;
    }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
    // fallback to `currentRenderingInstance` so that this can be called in
    // a functional component
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
        // #2400
        // to support `app.use` plugins,
        // fallback to appContext's `provides` if the intance is at root
        const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
        if (provides && key in provides) // TS doesn't allow symbol as index type
        return provides[key];
        else if (arguments.length > 1) return treatDefaultAsFactory && _shared.isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
        else warn(`injection "${String(key)}" not found.`);
    } else warn(`inject() can only be used inside setup() or functional components.`);
}
function useTransitionState() {
    const state = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: new Map()
    };
    onMounted(()=>{
        state.isMounted = true;
    });
    onBeforeUnmount(()=>{
        state.isUnmounting = true;
    });
    return state;
}
const TransitionHookValidator = [
    Function,
    Array
];
const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        // enter
        onBeforeEnter: TransitionHookValidator,
        onEnter: TransitionHookValidator,
        onAfterEnter: TransitionHookValidator,
        onEnterCancelled: TransitionHookValidator,
        // leave
        onBeforeLeave: TransitionHookValidator,
        onLeave: TransitionHookValidator,
        onAfterLeave: TransitionHookValidator,
        onLeaveCancelled: TransitionHookValidator,
        // appear
        onBeforeAppear: TransitionHookValidator,
        onAppear: TransitionHookValidator,
        onAfterAppear: TransitionHookValidator,
        onAppearCancelled: TransitionHookValidator
    },
    setup (props, { slots  }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevTransitionKey;
        return ()=>{
            const children = slots.default && getTransitionRawChildren(slots.default(), true);
            if (!children || !children.length) return;
            // warn multiple elements
            if (children.length > 1) warn("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
            // there's no need to track reactivity for these props so use the raw
            // props for a bit better perf
            const rawProps = _reactivity.toRaw(props);
            const { mode  } = rawProps;
            // check mode
            if (mode && ![
                'in-out',
                'out-in',
                'default'
            ].includes(mode)) warn(`invalid <transition> mode: ${mode}`);
            // at this point children has a guaranteed length of 1.
            const child = children[0];
            if (state.isLeaving) return emptyPlaceholder(child);
            // in the case of <transition><keep-alive/></transition>, we need to
            // compare the type of the kept-alive children.
            const innerChild = getKeepAliveChild(child);
            if (!innerChild) return emptyPlaceholder(child);
            const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
            setTransitionHooks(innerChild, enterHooks);
            const oldChild = instance.subTree;
            const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
            let transitionKeyChanged = false;
            const { getTransitionKey  } = innerChild.type;
            if (getTransitionKey) {
                const key = getTransitionKey();
                if (prevTransitionKey === undefined) prevTransitionKey = key;
                else if (key !== prevTransitionKey) {
                    prevTransitionKey = key;
                    transitionKeyChanged = true;
                }
            }
            // handle mode
            if (oldInnerChild && oldInnerChild.type !== Comment1 && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
                const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
                // update old tree's hooks in case of dynamic transition
                setTransitionHooks(oldInnerChild, leavingHooks);
                // switching between different views
                if (mode === 'out-in') {
                    state.isLeaving = true;
                    // return placeholder node and queue update when leave finishes
                    leavingHooks.afterLeave = ()=>{
                        state.isLeaving = false;
                        instance.update();
                    };
                    return emptyPlaceholder(child);
                } else if (mode === 'in-out' && innerChild.type !== Comment1) leavingHooks.delayLeave = (el, earlyRemove, delayedLeave)=>{
                    const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                    leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                    // early removal callback
                    el._leaveCb = ()=>{
                        earlyRemove();
                        el._leaveCb = undefined;
                        delete enterHooks.delayedLeave;
                    };
                    enterHooks.delayedLeave = delayedLeave;
                };
            }
            return child;
        };
    }
};
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes  } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
        leavingVNodesCache = Object.create(null);
        leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
}
// The transition hooks are attached to the vnode as vnode.transition
// and will be called at appropriate timing in the renderer.
function resolveTransitionHooks(vnode1, props, state, instance) {
    const { appear , mode , persisted =false , onBeforeEnter , onEnter , onAfterEnter , onEnterCancelled , onBeforeLeave , onLeave , onAfterLeave , onLeaveCancelled , onBeforeAppear , onAppear , onAfterAppear , onAppearCancelled  } = props;
    const key = String(vnode1.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode1);
    const callHook = (hook, args)=>{
        hook && callWithAsyncErrorHandling(hook, instance, 9 /* TRANSITION_HOOK */ , args);
    };
    const hooks = {
        mode,
        persisted,
        beforeEnter (el) {
            let hook = onBeforeEnter;
            if (!state.isMounted) {
                if (appear) hook = onBeforeAppear || onBeforeEnter;
                else return;
            }
            // for same element (v-show)
            if (el._leaveCb) el._leaveCb(true);
            // for toggled element with same key (v-if)
            const leavingVNode = leavingVNodesCache[key];
            if (leavingVNode && isSameVNodeType(vnode1, leavingVNode) && leavingVNode.el._leaveCb) // force early removal (not cancelled)
            leavingVNode.el._leaveCb();
            callHook(hook, [
                el
            ]);
        },
        enter (el) {
            let hook = onEnter;
            let afterHook = onAfterEnter;
            let cancelHook = onEnterCancelled;
            if (!state.isMounted) {
                if (appear) {
                    hook = onAppear || onEnter;
                    afterHook = onAfterAppear || onAfterEnter;
                    cancelHook = onAppearCancelled || onEnterCancelled;
                } else return;
            }
            let called = false;
            const done = el._enterCb = (cancelled)=>{
                if (called) return;
                called = true;
                if (cancelled) callHook(cancelHook, [
                    el
                ]);
                else callHook(afterHook, [
                    el
                ]);
                if (hooks.delayedLeave) hooks.delayedLeave();
                el._enterCb = undefined;
            };
            if (hook) {
                hook(el, done);
                if (hook.length <= 1) done();
            } else done();
        },
        leave (el, remove) {
            const key1 = String(vnode1.key);
            if (el._enterCb) el._enterCb(true);
            if (state.isUnmounting) return remove();
            callHook(onBeforeLeave, [
                el
            ]);
            let called = false;
            const done = el._leaveCb = (cancelled)=>{
                if (called) return;
                called = true;
                remove();
                if (cancelled) callHook(onLeaveCancelled, [
                    el
                ]);
                else callHook(onAfterLeave, [
                    el
                ]);
                el._leaveCb = undefined;
                if (leavingVNodesCache[key1] === vnode1) delete leavingVNodesCache[key1];
            };
            leavingVNodesCache[key1] = vnode1;
            if (onLeave) {
                onLeave(el, done);
                if (onLeave.length <= 1) done();
            } else done();
        },
        clone (vnode) {
            return resolveTransitionHooks(vnode, props, state, instance);
        }
    };
    return hooks;
}
// the placeholder really only handles one special case: KeepAlive
// in the case of a KeepAlive in a leave phase we need to return a KeepAlive
// placeholder with empty content to avoid the KeepAlive instance from being
// unmounted.
function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
        vnode = cloneVNode(vnode);
        vnode.children = null;
        return vnode;
    }
}
function getKeepAliveChild(vnode) {
    return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : undefined : vnode;
}
function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 /* COMPONENT */  && vnode.component) setTransitionHooks(vnode.component.subTree, hooks);
    else if (vnode.shapeFlag & 128 /* SUSPENSE */ ) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else vnode.transition = hooks;
}
function getTransitionRawChildren(children, keepComment = false) {
    let ret = [];
    let keyedFragmentCount = 0;
    for(let i = 0; i < children.length; i++){
        const child = children[i];
        // handle fragment children case, e.g. v-for
        if (child.type === Fragment) {
            if (child.patchFlag & 128 /* KEYED_FRAGMENT */ ) keyedFragmentCount++;
            ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
        } else if (keepComment || child.type !== Comment1) ret.push(child);
    }
    // #1126 if a transition children list contains multiple sub fragments, these
    // fragments will be merged into a flat children array. Since each v-for
    // fragment may contain different static bindings inside, we need to de-op
    // these children to force full diffs to ensure correct behavior.
    if (keyedFragmentCount > 1) for(let i1 = 0; i1 < ret.length; i1++)ret[i1].patchFlag = -2 /* BAIL */ ;
    return ret;
}
// implementation, close to no-op
function defineComponent(options) {
    return _shared.isFunction(options) ? {
        setup: options,
        name: options.name
    } : options;
}
const isAsyncWrapper = (i)=>!!i.type.__asyncLoader
;
function defineAsyncComponent(source) {
    if (_shared.isFunction(source)) source = {
        loader: source
    };
    const { loader , loadingComponent , errorComponent , delay =200 , timeout , suspensible =true , onError: userOnError  } = source;
    let pendingRequest = null;
    let resolvedComp;
    let retries = 0;
    const retry = ()=>{
        retries++;
        pendingRequest = null;
        return load();
    };
    const load = ()=>{
        let thisRequest;
        return pendingRequest || (thisRequest = pendingRequest = loader().catch((err)=>{
            err = err instanceof Error ? err : new Error(String(err));
            if (userOnError) return new Promise((resolve, reject)=>{
                const userRetry = ()=>resolve(retry())
                ;
                const userFail = ()=>reject(err)
                ;
                userOnError(err, userRetry, userFail, retries + 1);
            });
            else throw err;
        }).then((comp)=>{
            if (thisRequest !== pendingRequest && pendingRequest) return pendingRequest;
            if (!comp) warn(`Async component loader resolved to undefined. ` + `If you are using retry(), make sure to return its return value.`);
            // interop module default
            if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) comp = comp.default;
            if (comp && !_shared.isObject(comp) && !_shared.isFunction(comp)) throw new Error(`Invalid async component load result: ${comp}`);
            resolvedComp = comp;
            return comp;
        }));
    };
    return defineComponent({
        name: 'AsyncComponentWrapper',
        __asyncLoader: load,
        get __asyncResolved () {
            return resolvedComp;
        },
        setup () {
            const instance = currentInstance;
            // already resolved
            if (resolvedComp) return ()=>createInnerComp(resolvedComp, instance)
            ;
            const onError = (err)=>{
                pendingRequest = null;
                handleError(err, instance, 13 /* ASYNC_COMPONENT_LOADER */ , !errorComponent /* do not throw in dev if user provided error component */ );
            };
            // suspense-controlled or SSR.
            if (suspensible && instance.suspense || false) return load().then((comp)=>{
                return ()=>createInnerComp(comp, instance)
                ;
            }).catch((err)=>{
                onError(err);
                return ()=>errorComponent ? createVNode(errorComponent, {
                        error: err
                    }) : null
                ;
            });
            const loaded = _reactivity.ref(false);
            const error = _reactivity.ref();
            const delayed = _reactivity.ref(!!delay);
            if (delay) setTimeout(()=>{
                delayed.value = false;
            }, delay);
            if (timeout != null) setTimeout(()=>{
                if (!loaded.value && !error.value) {
                    const err = new Error(`Async component timed out after ${timeout}ms.`);
                    onError(err);
                    error.value = err;
                }
            }, timeout);
            load().then(()=>{
                loaded.value = true;
                if (instance.parent && isKeepAlive(instance.parent.vnode)) // parent is keep-alive, force update so the loaded component's
                // name is taken into account
                queueJob(instance.parent.update);
            }).catch((err)=>{
                onError(err);
                error.value = err;
            });
            return ()=>{
                if (loaded.value && resolvedComp) return createInnerComp(resolvedComp, instance);
                else if (error.value && errorComponent) return createVNode(errorComponent, {
                    error: error.value
                });
                else if (loadingComponent && !delayed.value) return createVNode(loadingComponent);
            };
        }
    });
}
function createInnerComp(comp, { vnode: { ref , props , children  }  }) {
    const vnode = createVNode(comp, props, children);
    // ensure inner component inherits the async wrapper's ref owner
    vnode.ref = ref;
    return vnode;
}
const isKeepAlive = (vnode)=>vnode.type.__isKeepAlive
;
const KeepAliveImpl = {
    name: `KeepAlive`,
    // Marker for special handling inside the renderer. We are not using a ===
    // check directly on KeepAlive in the renderer, because importing it directly
    // would prevent it from being tree-shaken.
    __isKeepAlive: true,
    props: {
        include: [
            String,
            RegExp,
            Array
        ],
        exclude: [
            String,
            RegExp,
            Array
        ],
        max: [
            String,
            Number
        ]
    },
    setup (props, { slots  }) {
        const instance = getCurrentInstance();
        // KeepAlive communicates with the instantiated renderer via the
        // ctx where the renderer passes in its internals,
        // and the KeepAlive instance exposes activate/deactivate implementations.
        // The whole point of this is to avoid importing KeepAlive directly in the
        // renderer to facilitate tree-shaking.
        const sharedContext = instance.ctx;
        // if the internal renderer is not registered, it indicates that this is server-side rendering,
        // for KeepAlive, we just need to render its children
        if (!sharedContext.renderer) return slots.default;
        const cache = new Map();
        const keys = new Set();
        let current = null;
        instance.__v_cache = cache;
        const parentSuspense = instance.suspense;
        const { renderer: { p: patch , m: move , um: _unmount , o: { createElement  }  }  } = sharedContext;
        const storageContainer = createElement('div');
        sharedContext.activate = (vnode, container, anchor, isSVG, optimized)=>{
            const instance1 = vnode.component;
            move(vnode, container, anchor, 0 /* ENTER */ , parentSuspense);
            // in case props have changed
            patch(instance1.vnode, vnode, container, anchor, instance1, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
            queuePostRenderEffect(()=>{
                instance1.isDeactivated = false;
                if (instance1.a) _shared.invokeArrayFns(instance1.a);
                const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
                if (vnodeHook) invokeVNodeHook(vnodeHook, instance1.parent, vnode);
            }, parentSuspense);
            // Update components tree
            devtoolsComponentAdded(instance1);
        };
        sharedContext.deactivate = (vnode)=>{
            const instance1 = vnode.component;
            move(vnode, storageContainer, null, 1 /* LEAVE */ , parentSuspense);
            queuePostRenderEffect(()=>{
                if (instance1.da) _shared.invokeArrayFns(instance1.da);
                const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
                if (vnodeHook) invokeVNodeHook(vnodeHook, instance1.parent, vnode);
                instance1.isDeactivated = true;
            }, parentSuspense);
            // Update components tree
            devtoolsComponentAdded(instance1);
        };
        function unmount(vnode) {
            // reset the shapeFlag so it can be properly unmounted
            resetShapeFlag(vnode);
            _unmount(vnode, instance, parentSuspense);
        }
        function pruneCache(filter) {
            cache.forEach((vnode, key)=>{
                const name = getComponentName(vnode.type);
                if (name && (!filter || !filter(name))) pruneCacheEntry(key);
            });
        }
        function pruneCacheEntry(key) {
            const cached = cache.get(key);
            if (!current || cached.type !== current.type) unmount(cached);
            else if (current) // current active instance should no longer be kept-alive.
            // we can't unmount it now but it might be later, so reset its flag now.
            resetShapeFlag(current);
            cache.delete(key);
            keys.delete(key);
        }
        // prune cache on include/exclude prop change
        watch(()=>[
                props.include,
                props.exclude
            ]
        , ([include, exclude])=>{
            include && pruneCache((name)=>matches(include, name)
            );
            exclude && pruneCache((name)=>!matches(exclude, name)
            );
        }, // prune post-render after `current` has been updated
        {
            flush: 'post',
            deep: true
        });
        // cache sub tree after render
        let pendingCacheKey = null;
        const cacheSubtree = ()=>{
            // fix #1621, the pendingCacheKey could be 0
            if (pendingCacheKey != null) cache.set(pendingCacheKey, getInnerChild(instance.subTree));
        };
        onMounted(cacheSubtree);
        onUpdated(cacheSubtree);
        onBeforeUnmount(()=>{
            cache.forEach((cached)=>{
                const { subTree , suspense  } = instance;
                const vnode = getInnerChild(subTree);
                if (cached.type === vnode.type) {
                    // current instance will be unmounted as part of keep-alive's unmount
                    resetShapeFlag(vnode);
                    // but invoke its deactivated hook here
                    const da = vnode.component.da;
                    da && queuePostRenderEffect(da, suspense);
                    return;
                }
                unmount(cached);
            });
        });
        return ()=>{
            pendingCacheKey = null;
            if (!slots.default) return null;
            const children = slots.default();
            const rawVNode = children[0];
            if (children.length > 1) {
                warn(`KeepAlive should contain exactly one component child.`);
                current = null;
                return children;
            } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4 /* STATEFUL_COMPONENT */ ) && !(rawVNode.shapeFlag & 128 /* SUSPENSE */ )) {
                current = null;
                return rawVNode;
            }
            let vnode = getInnerChild(rawVNode);
            const comp = vnode.type;
            // for async components, name check should be based in its loaded
            // inner component if available
            const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {
            } : comp);
            const { include , exclude , max  } = props;
            if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
                current = vnode;
                return rawVNode;
            }
            const key = vnode.key == null ? comp : vnode.key;
            const cachedVNode = cache.get(key);
            // clone vnode if it's reused because we are going to mutate it
            if (vnode.el) {
                vnode = cloneVNode(vnode);
                if (rawVNode.shapeFlag & 128 /* SUSPENSE */ ) rawVNode.ssContent = vnode;
            }
            // #1513 it's possible for the returned vnode to be cloned due to attr
            // fallthrough or scopeId, so the vnode here may not be the final vnode
            // that is mounted. Instead of caching it directly, we store the pending
            // key and cache `instance.subTree` (the normalized vnode) in
            // beforeMount/beforeUpdate hooks.
            pendingCacheKey = key;
            if (cachedVNode) {
                // copy over mounted state
                vnode.el = cachedVNode.el;
                vnode.component = cachedVNode.component;
                if (vnode.transition) // recursively update transition hooks on subTree
                setTransitionHooks(vnode, vnode.transition);
                // avoid vnode being mounted as fresh
                vnode.shapeFlag |= 512 /* COMPONENT_KEPT_ALIVE */ ;
                // make this key the freshest
                keys.delete(key);
                keys.add(key);
            } else {
                keys.add(key);
                // prune oldest entry
                if (max && keys.size > parseInt(max, 10)) pruneCacheEntry(keys.values().next().value);
            }
            // avoid vnode being unmounted
            vnode.shapeFlag |= 256 /* COMPONENT_SHOULD_KEEP_ALIVE */ ;
            current = vnode;
            return rawVNode;
        };
    }
};
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
    if (_shared.isArray(pattern)) return pattern.some((p)=>matches(p, name)
    );
    else if (_shared.isString(pattern)) return pattern.split(',').indexOf(name) > -1;
    else if (pattern.test) return pattern.test(name);
    /* istanbul ignore next */ return false;
}
function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a" /* ACTIVATED */ , target);
}
function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da" /* DEACTIVATED */ , target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
    // cache the deactivate branch check wrapper for injected hooks so the same
    // hook can be properly deduped by the scheduler. "__wdc" stands for "with
    // deactivation check".
    const wrappedHook = hook.__wdc || (hook.__wdc = ()=>{
        // only fire the hook if the target instance is NOT in a deactivated branch.
        let current = target;
        while(current){
            if (current.isDeactivated) return;
            current = current.parent;
        }
        hook();
    });
    injectHook(type, wrappedHook, target);
    // In addition to registering it on the target instance, we walk up the parent
    // chain and register it on all ancestor instances that are keep-alive roots.
    // This avoids the need to walk the entire component tree when invoking these
    // hooks, and more importantly, avoids the need to track child components in
    // arrays.
    if (target) {
        let current = target.parent;
        while(current && current.parent){
            if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
            current = current.parent;
        }
    }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    // injectHook wraps the original for error handling, so make sure to remove
    // the wrapped version.
    const injected = injectHook(type, hook, keepAliveRoot, true);
    onUnmounted(()=>{
        _shared.remove(keepAliveRoot[type], injected);
    }, target);
}
function resetShapeFlag(vnode) {
    let shapeFlag = vnode.shapeFlag;
    if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */ ) shapeFlag -= 256 /* COMPONENT_SHOULD_KEEP_ALIVE */ ;
    if (shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */ ) shapeFlag -= 512 /* COMPONENT_KEPT_ALIVE */ ;
    vnode.shapeFlag = shapeFlag;
}
function getInnerChild(vnode) {
    return vnode.shapeFlag & 128 /* SUSPENSE */  ? vnode.ssContent : vnode;
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
        const hooks = target[type] || (target[type] = []);
        // cache the error handling wrapper for injected hooks so the same hook
        // can be properly deduped by the scheduler. "__weh" stands for "with error
        // handling".
        const wrappedHook = hook.__weh || (hook.__weh = (...args)=>{
            if (target.isUnmounted) return;
            // disable tracking inside all lifecycle hooks
            // since they can potentially be called inside effects.
            _reactivity.pauseTracking();
            // Set currentInstance during hook invocation.
            // This assumes the hook does not synchronously trigger other hooks, which
            // can only be false when the user does something really funky.
            setCurrentInstance(target);
            const res = callWithAsyncErrorHandling(hook, target, type, args);
            unsetCurrentInstance();
            _reactivity.resetTracking();
            return res;
        });
        if (prepend) hooks.unshift(wrappedHook);
        else hooks.push(wrappedHook);
        return wrappedHook;
    } else {
        const apiName = _shared.toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''));
        warn(`${apiName} is called when there is no active component instance to be ` + `associated with. ` + `Lifecycle injection APIs can only be used during execution of setup().` + (` If you are using async setup(), make sure to register lifecycle ` + `hooks before the first await statement.`));
    }
}
const createHook = (lifecycle)=>(hook, target = currentInstance)=>// post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
        (!isInSSRComponentSetup || lifecycle === "sp" /* SERVER_PREFETCH */ ) && injectHook(lifecycle, hook, target)
;
const onBeforeMount = createHook("bm" /* BEFORE_MOUNT */ );
const onMounted = createHook("m" /* MOUNTED */ );
const onBeforeUpdate = createHook("bu" /* BEFORE_UPDATE */ );
const onUpdated = createHook("u" /* UPDATED */ );
const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */ );
const onUnmounted = createHook("um" /* UNMOUNTED */ );
const onServerPrefetch = createHook("sp" /* SERVER_PREFETCH */ );
const onRenderTriggered = createHook("rtg" /* RENDER_TRIGGERED */ );
const onRenderTracked = createHook("rtc" /* RENDER_TRACKED */ );
function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec" /* ERROR_CAPTURED */ , hook, target);
}
function createDuplicateChecker() {
    const cache = Object.create(null);
    return (type, key)=>{
        if (cache[key]) warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
        else cache[key] = type;
    };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    // do not cache property access on public proxy during state initialization
    shouldCacheAccess = false;
    // call beforeCreate first before accessing other options since
    // the hook may mutate resolved options (#2791)
    if (options.beforeCreate) callHook(options.beforeCreate, instance, "bc" /* BEFORE_CREATE */ );
    const { // state
    data: dataOptions , computed: computedOptions , methods , watch: watchOptions , provide: provideOptions , inject: injectOptions , // lifecycle
    created , beforeMount , mounted , beforeUpdate , updated , activated , deactivated , beforeDestroy , beforeUnmount , destroyed , unmounted , render , renderTracked , renderTriggered , errorCaptured , serverPrefetch , // public API
    expose , inheritAttrs , // assets
    components , directives , filters  } = options;
    const checkDuplicateProperties = createDuplicateChecker();
    {
        const [propsOptions] = instance.propsOptions;
        if (propsOptions) for(const key in propsOptions)checkDuplicateProperties("Props" /* PROPS */ , key);
    }
    // options initialization order (to be consistent with Vue 2):
    // - props (already done outside of this function)
    // - inject
    // - methods
    // - data (deferred since it relies on `this` access)
    // - computed
    // - watch (deferred since it relies on `this` access)
    if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    if (methods) for(const key in methods){
        const methodHandler = methods[key];
        if (_shared.isFunction(methodHandler)) {
            Object.defineProperty(ctx, key, {
                value: methodHandler.bind(publicThis),
                configurable: true,
                enumerable: true,
                writable: true
            });
            checkDuplicateProperties("Methods" /* METHODS */ , key);
        } else warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. ` + `Did you reference the function correctly?`);
    }
    if (dataOptions) {
        if (!_shared.isFunction(dataOptions)) warn(`The data option must be a function. ` + `Plain object usage is no longer supported.`);
        const data = dataOptions.call(publicThis, publicThis);
        if (_shared.isPromise(data)) warn(`data() returned a Promise - note data() cannot be async; If you ` + `intend to perform data fetching before component renders, use ` + `async setup() + <Suspense>.`);
        if (!_shared.isObject(data)) warn(`data() should return an object.`);
        else {
            instance.data = _reactivity.reactive(data);
            for(const key1 in data){
                checkDuplicateProperties("Data" /* DATA */ , key1);
                // expose data on ctx during dev
                if (key1[0] !== '$' && key1[0] !== '_') Object.defineProperty(ctx, key1, {
                    configurable: true,
                    enumerable: true,
                    get: ()=>data[key1]
                    ,
                    set: _shared.NOOP
                });
            }
        }
    }
    // state initialization complete at this point - start caching access
    shouldCacheAccess = true;
    if (computedOptions) for(const key1 in computedOptions){
        const opt = computedOptions[key1];
        const get = _shared.isFunction(opt) ? opt.bind(publicThis, publicThis) : _shared.isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : _shared.NOOP;
        if (get === _shared.NOOP) warn(`Computed property "${key1}" has no getter.`);
        const set = !_shared.isFunction(opt) && _shared.isFunction(opt.set) ? opt.set.bind(publicThis) : ()=>{
            warn(`Write operation failed: computed property "${key1}" is readonly.`);
        };
        const c = _reactivity.computed({
            get,
            set
        });
        Object.defineProperty(ctx, key1, {
            enumerable: true,
            configurable: true,
            get: ()=>c.value
            ,
            set: (v)=>c.value = v
        });
        checkDuplicateProperties("Computed" /* COMPUTED */ , key1);
    }
    if (watchOptions) for(const key2 in watchOptions)createWatcher(watchOptions[key2], ctx, publicThis, key2);
    if (provideOptions) {
        const provides = _shared.isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach((key3)=>{
            provide(key3, provides[key3]);
        });
    }
    if (created) callHook(created, instance, "c" /* CREATED */ );
    function registerLifecycleHook(register, hook) {
        if (_shared.isArray(hook)) hook.forEach((_hook)=>register(_hook.bind(publicThis))
        );
        else if (hook) register(hook.bind(publicThis));
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (_shared.isArray(expose)) {
        if (expose.length) {
            const exposed = instance.exposed || (instance.exposed = {
            });
            expose.forEach((key3)=>{
                Object.defineProperty(exposed, key3, {
                    get: ()=>publicThis[key3]
                    ,
                    set: (val)=>publicThis[key3] = val
                });
            });
        } else if (!instance.exposed) instance.exposed = {
        };
    }
    // options that are handled when creating the instance but also need to be
    // applied from mixins
    if (render && instance.render === _shared.NOOP) instance.render = render;
    if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
    // asset options.
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = _shared.NOOP, unwrapRef = false) {
    if (_shared.isArray(injectOptions)) injectOptions = normalizeInject(injectOptions);
    for(const key in injectOptions){
        const opt = injectOptions[key];
        let injected;
        if (_shared.isObject(opt)) {
            if ('default' in opt) injected = inject(opt.from || key, opt.default, true);
            else injected = inject(opt.from || key);
        } else injected = inject(opt);
        if (_reactivity.isRef(injected)) {
            // TODO remove the check in 3.3
            if (unwrapRef) Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: ()=>injected.value
                ,
                set: (v)=>injected.value = v
            });
            else {
                warn(`injected property "${key}" is a ref and will be auto-unwrapped ` + `and no longer needs \`.value\` in the next minor release. ` + `To opt-in to the new behavior now, ` + `set \`app.config.unwrapInjectedRef = true\` (this config is ` + `temporary and will not be needed in the future.)`);
                ctx[key] = injected;
            }
        } else ctx[key] = injected;
        checkDuplicateProperties("Inject" /* INJECT */ , key);
    }
}
function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(_shared.isArray(hook) ? hook.map((h)=>h.bind(instance.proxy)
    ) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes('.') ? createPathGetter(publicThis, key) : ()=>publicThis[key]
    ;
    if (_shared.isString(raw)) {
        const handler = ctx[raw];
        if (_shared.isFunction(handler)) watch(getter, handler);
        else warn(`Invalid watch handler specified by key "${raw}"`, handler);
    } else if (_shared.isFunction(raw)) watch(getter, raw.bind(publicThis));
    else if (_shared.isObject(raw)) {
        if (_shared.isArray(raw)) raw.forEach((r)=>createWatcher(r, ctx, publicThis, key)
        );
        else {
            const handler = _shared.isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
            if (_shared.isFunction(handler)) watch(getter, handler, raw);
            else warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
        }
    } else warn(`Invalid watch option: "${key}"`, raw);
}
/**
 * Resolve merged options and cache it on the component.
 * This is done only once per-component since the merging does not involve
 * instances.
 */ function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins , extends: extendsOptions  } = base;
    const { mixins: globalMixins , optionsCache: cache , config: { optionMergeStrategies  }  } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) resolved = cached;
    else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
    else {
        resolved = {
        };
        if (globalMixins.length) globalMixins.forEach((m)=>mergeOptions(resolved, m, optionMergeStrategies, true)
        );
        mergeOptions(resolved, base, optionMergeStrategies);
    }
    cache.set(base, resolved);
    return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins , extends: extendsOptions  } = from;
    if (extendsOptions) mergeOptions(to, extendsOptions, strats, true);
    if (mixins) mixins.forEach((m)=>mergeOptions(to, m, strats, true)
    );
    for(const key in from)if (asMixin && key === 'expose') warn(`"expose" option is ignored when declared in mixins or extends. ` + `It should only be declared in the base component itself.`);
    else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
    return to;
}
const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
};
function mergeDataFn(to, from) {
    if (!from) return to;
    if (!to) return from;
    return function mergedDataFn() {
        return _shared.extend(_shared.isFunction(to) ? to.call(this, this) : to, _shared.isFunction(from) ? from.call(this, this) : from);
    };
}
function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
    if (_shared.isArray(raw)) {
        const res = {
        };
        for(let i = 0; i < raw.length; i++)res[raw[i]] = raw[i];
        return res;
    }
    return raw;
}
function mergeAsArray(to, from) {
    return to ? [
        ...new Set([].concat(to, from))
    ] : from;
}
function mergeObjectOptions(to, from) {
    return to ? _shared.extend(_shared.extend(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = _shared.extend(Object.create(null), to);
    for(const key in from)merged[key] = mergeAsArray(to[key], from[key]);
    return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {
    };
    const attrs = {
    };
    _shared.def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    // ensure all declared prop keys are present
    for(const key in instance.propsOptions[0])if (!(key in props)) props[key] = undefined;
    validateProps(rawProps || {
    }, props, instance);
    if (isStateful) // stateful
    instance.props = isSSR ? props : _reactivity.shallowReactive(props);
    else if (!instance.type.props) // functional w/ optional props, props === attrs
    instance.props = attrs;
    else // functional w/ declared props
    instance.props = props;
    instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props , attrs , vnode: { patchFlag  }  } = instance;
    const rawCurrentProps = _reactivity.toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (// always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16 /* FULL_PROPS */ )) {
        if (patchFlag & 8 /* PROPS */ ) {
            // Compiler-generated props & no keys change, just set the updated
            // the props.
            const propsToUpdate = instance.vnode.dynamicProps;
            for(let i = 0; i < propsToUpdate.length; i++){
                let key = propsToUpdate[i];
                // PROPS flag guarantees rawProps to be non-null
                const value = rawProps[key];
                if (options) {
                    // attr / props separation was done on init and will be consistent
                    // in this code path, so just check if attrs have it.
                    if (_shared.hasOwn(attrs, key)) {
                        if (value !== attrs[key]) {
                            attrs[key] = value;
                            hasAttrsChanged = true;
                        }
                    } else {
                        const camelizedKey = _shared.camelize(key);
                        props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
                    }
                } else if (value !== attrs[key]) {
                    attrs[key] = value;
                    hasAttrsChanged = true;
                }
            }
        }
    } else {
        // full props update.
        if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
        // in case of dynamic props, check if we need to delete keys from
        // the props object
        let kebabKey;
        for(const key in rawCurrentProps)if (!rawProps || !_shared.hasOwn(rawProps, key) && ((kebabKey = _shared.hyphenate(key)) === key || !_shared.hasOwn(rawProps, kebabKey))) {
            if (options) {
                if (rawPrevProps && (rawPrevProps[key] !== undefined || // for kebab-case
                rawPrevProps[kebabKey] !== undefined)) props[key] = resolvePropValue(options, rawCurrentProps, key, undefined, instance, true);
            } else delete props[key];
        }
        // in the case of functional component w/o props declaration, props and
        // attrs point to the same object so it should already have been updated.
        if (attrs !== rawCurrentProps) {
            for(const key1 in attrs)if (!rawProps || !_shared.hasOwn(rawProps, key1)) {
                delete attrs[key1];
                hasAttrsChanged = true;
            }
        }
    }
    // trigger updates for $attrs in case it's used in component slots
    if (hasAttrsChanged) _reactivity.trigger(instance, "set" /* SET */ , '$attrs');
    validateProps(rawProps || {
    }, props, instance);
}
function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) for(let key in rawProps){
        // key, ref are reserved and never passed down
        if (_shared.isReservedProp(key)) continue;
        const value = rawProps[key];
        // prop option names are camelized during normalization, so to support
        // kebab -> camel conversion here we need to camelize the key.
        let camelKey;
        if (options && _shared.hasOwn(options, camelKey = _shared.camelize(key))) {
            if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
            else (rawCastValues || (rawCastValues = {
            }))[camelKey] = value;
        } else if (!isEmitListener(instance.emitsOptions, key)) {
            if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
            }
        }
    }
    if (needCastKeys) {
        const rawCurrentProps = _reactivity.toRaw(props);
        const castValues = rawCastValues || _shared.EMPTY_OBJ;
        for(let i = 0; i < needCastKeys.length; i++){
            const key1 = needCastKeys[i];
            props[key1] = resolvePropValue(options, rawCurrentProps, key1, castValues[key1], instance, !_shared.hasOwn(castValues, key1));
        }
    }
    return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
        const hasDefault = _shared.hasOwn(opt, 'default');
        // default values
        if (hasDefault && value === undefined) {
            const defaultValue = opt.default;
            if (opt.type !== Function && _shared.isFunction(defaultValue)) {
                const { propsDefaults  } = instance;
                if (key in propsDefaults) value = propsDefaults[key];
                else {
                    setCurrentInstance(instance);
                    value = propsDefaults[key] = defaultValue.call(null, props);
                    unsetCurrentInstance();
                }
            } else value = defaultValue;
        }
        // boolean casting
        if (opt[0 /* shouldCast */ ]) {
            if (isAbsent && !hasDefault) value = false;
            else if (opt[1 /* shouldCastTrue */ ] && (value === '' || value === _shared.hyphenate(key))) value = true;
        }
    }
    return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) return cached;
    const raw = comp.props;
    const normalized = {
    };
    const needCastKeys = [];
    // apply mixin/extends props
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !_shared.isFunction(comp)) {
        const extendProps = (raw1)=>{
            hasExtends = true;
            const [props, keys] = normalizePropsOptions(raw1, appContext, true);
            _shared.extend(normalized, props);
            if (keys) needCastKeys.push(...keys);
        };
        if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
        if (comp.extends) extendProps(comp.extends);
        if (comp.mixins) comp.mixins.forEach(extendProps);
    }
    if (!raw && !hasExtends) {
        cache.set(comp, _shared.EMPTY_ARR);
        return _shared.EMPTY_ARR;
    }
    if (_shared.isArray(raw)) for(let i = 0; i < raw.length; i++){
        if (!_shared.isString(raw[i])) warn(`props must be strings when using array syntax.`, raw[i]);
        const normalizedKey = _shared.camelize(raw[i]);
        if (validatePropName(normalizedKey)) normalized[normalizedKey] = _shared.EMPTY_OBJ;
    }
    else if (raw) {
        if (!_shared.isObject(raw)) warn(`invalid props options`, raw);
        for(const key in raw){
            const normalizedKey = _shared.camelize(key);
            if (validatePropName(normalizedKey)) {
                const opt = raw[key];
                const prop = normalized[normalizedKey] = _shared.isArray(opt) || _shared.isFunction(opt) ? {
                    type: opt
                } : opt;
                if (prop) {
                    const booleanIndex = getTypeIndex(Boolean, prop.type);
                    const stringIndex = getTypeIndex(String, prop.type);
                    prop[0 /* shouldCast */ ] = booleanIndex > -1;
                    prop[1 /* shouldCastTrue */ ] = stringIndex < 0 || booleanIndex < stringIndex;
                    // if the prop needs boolean casting or default value
                    if (booleanIndex > -1 || _shared.hasOwn(prop, 'default')) needCastKeys.push(normalizedKey);
                }
            }
        }
    }
    const res = [
        normalized,
        needCastKeys
    ];
    cache.set(comp, res);
    return res;
}
function validatePropName(key) {
    if (key[0] !== '$') return true;
    else warn(`Invalid prop name: "${key}" is a reserved property.`);
    return false;
}
// use function string name to check type constructors
// so that it works across vms / iframes.
function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ctor === null ? 'null' : '';
}
function isSameType(a, b) {
    return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
    if (_shared.isArray(expectedTypes)) return expectedTypes.findIndex((t)=>isSameType(t, type)
    );
    else if (_shared.isFunction(expectedTypes)) return isSameType(expectedTypes, type) ? 0 : -1;
    return -1;
}
/**
 * dev only
 */ function validateProps(rawProps, props, instance) {
    const resolvedValues = _reactivity.toRaw(props);
    const options = instance.propsOptions[0];
    for(const key in options){
        let opt = options[key];
        if (opt == null) continue;
        validateProp(key, resolvedValues[key], opt, !_shared.hasOwn(rawProps, key) && !_shared.hasOwn(rawProps, _shared.hyphenate(key)));
    }
}
/**
 * dev only
 */ function validateProp(name, value, prop, isAbsent) {
    const { type , required , validator  } = prop;
    // required!
    if (required && isAbsent) {
        warn('Missing required prop: "' + name + '"');
        return;
    }
    // missing but optional
    if (value == null && !prop.required) return;
    // type check
    if (type != null && type !== true) {
        let isValid = false;
        const types = _shared.isArray(type) ? type : [
            type
        ];
        const expectedTypes = [];
        // value is valid as long as one of the specified types match
        for(let i = 0; i < types.length && !isValid; i++){
            const { valid , expectedType  } = assertType(value, types[i]);
            expectedTypes.push(expectedType || '');
            isValid = valid;
        }
        if (!isValid) {
            warn(getInvalidTypeMessage(name, value, expectedTypes));
            return;
        }
    }
    // custom validator
    if (validator && !validator(value)) warn('Invalid prop: custom validator check failed for prop "' + name + '".');
}
const isSimpleType = /*#__PURE__*/ _shared.makeMap('String,Number,Boolean,Function,Symbol,BigInt');
/**
 * dev only
 */ function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
        // for primitive wrapper objects
        if (!valid && t === 'object') valid = value instanceof type;
    } else if (expectedType === 'Object') valid = _shared.isObject(value);
    else if (expectedType === 'Array') valid = _shared.isArray(value);
    else if (expectedType === 'null') valid = value === null;
    else valid = value instanceof type;
    return {
        valid,
        expectedType
    };
}
/**
 * dev only
 */ function getInvalidTypeMessage(name, value, expectedTypes) {
    let message = `Invalid prop: type check failed for prop "${name}".` + ` Expected ${expectedTypes.map(_shared.capitalize).join(' | ')}`;
    const expectedType = expectedTypes[0];
    const receivedType = _shared.toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) message += ` with value ${expectedValue}`;
    message += `, got ${receivedType} `;
    // check if we need to specify received value
    if (isExplicable(receivedType)) message += `with value ${receivedValue}.`;
    return message;
}
/**
 * dev only
 */ function styleValue(value, type) {
    if (type === 'String') return `"${value}"`;
    else if (type === 'Number') return `${Number(value)}`;
    else return `${value}`;
}
/**
 * dev only
 */ function isExplicable(type) {
    const explicitTypes = [
        'string',
        'number',
        'boolean'
    ];
    return explicitTypes.some((elem)=>type.toLowerCase() === elem
    );
}
/**
 * dev only
 */ function isBoolean(...args) {
    return args.some((elem)=>elem.toLowerCase() === 'boolean'
    );
}
const isInternalKey = (key)=>key[0] === '_' || key === '$stable'
;
const normalizeSlotValue = (value)=>_shared.isArray(value) ? value.map(normalizeVNode) : [
        normalizeVNode(value)
    ]
;
const normalizeSlot = (key, rawSlot, ctx)=>{
    const normalized = withCtx((...args)=>{
        if (currentInstance) warn(`Slot "${key}" invoked outside of the render function: ` + `this will not track dependencies used in the slot. ` + `Invoke the slot function inside the render function instead.`);
        return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance)=>{
    const ctx = rawSlots._ctx;
    for(const key in rawSlots){
        if (isInternalKey(key)) continue;
        const value = rawSlots[key];
        if (_shared.isFunction(value)) slots[key] = normalizeSlot(key, value, ctx);
        else if (value != null) {
            warn(`Non-function value encountered for slot "${key}". ` + `Prefer function slots for better performance.`);
            const normalized = normalizeSlotValue(value);
            slots[key] = ()=>normalized
            ;
        }
    }
};
const normalizeVNodeSlots = (instance, children)=>{
    if (!isKeepAlive(instance.vnode) && true) warn(`Non-function value encountered for default slot. ` + `Prefer function slots for better performance.`);
    const normalized = normalizeSlotValue(children);
    instance.slots.default = ()=>normalized
    ;
};
const initSlots = (instance, children)=>{
    if (instance.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */ ) {
        const type = children._;
        if (type) {
            // users can get the shallow readonly version of the slots object through `this.$slots`,
            // we should avoid the proxy object polluting the slots of the internal instance
            instance.slots = _reactivity.toRaw(children);
            // make compiler marker non-enumerable
            _shared.def(children, '_', type);
        } else normalizeObjectSlots(children, instance.slots = {
        });
    } else {
        instance.slots = {
        };
        if (children) normalizeVNodeSlots(instance, children);
    }
    _shared.def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized)=>{
    const { vnode , slots  } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = _shared.EMPTY_OBJ;
    if (vnode.shapeFlag & 32 /* SLOTS_CHILDREN */ ) {
        const type = children._;
        if (type) {
            // compiled slots.
            if (isHmrUpdating) // Parent was HMR updated so slot content may have changed.
            // force update slots and mark instance for hmr as well
            _shared.extend(slots, children);
            else if (optimized && type === 1 /* STABLE */ ) // compiled AND stable.
            // no need to update, and skip stale slots removal.
            needDeletionCheck = false;
            else {
                // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
                // normalization.
                _shared.extend(slots, children);
                // #2893
                // when rendering the optimized slots by manually written render function,
                // we need to delete the `slots._` flag if necessary to make subsequent updates reliable,
                // i.e. let the `renderSlot` create the bailed Fragment
                if (!optimized && type === 1 /* STABLE */ ) delete slots._;
            }
        } else {
            needDeletionCheck = !children.$stable;
            normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
    } else if (children) {
        // non slot object children (direct value) passed to a component
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = {
            default: 1
        };
    }
    // delete stale slots
    if (needDeletionCheck) {
        for(const key in slots)if (!isInternalKey(key) && !(key in deletionComparisonTarget)) delete slots[key];
    }
};
/**
Runtime helper for applying directives to a vnode. Example usage:

const comp = resolveComponent('comp')
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h(comp), [
  [foo, this.x],
  [bar, this.y]
])
*/ const isBuiltInDirective = /*#__PURE__*/ _shared.makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text');
function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) warn('Do not use built-in directive ids as custom directive id: ' + name);
}
/**
 * Adds directives to a VNode.
 */ function withDirectives(vnode, directives) {
    const internalInstance = currentRenderingInstance;
    if (internalInstance === null) {
        warn(`withDirectives can only be used inside render functions.`);
        return vnode;
    }
    const instance = internalInstance.proxy;
    const bindings = vnode.dirs || (vnode.dirs = []);
    for(let i = 0; i < directives.length; i++){
        let [dir, value, arg, modifiers = _shared.EMPTY_OBJ] = directives[i];
        if (_shared.isFunction(dir)) dir = {
            mounted: dir,
            updated: dir
        };
        if (dir.deep) traverse(value);
        bindings.push({
            dir,
            instance,
            value,
            oldValue: void 0,
            arg,
            modifiers
        });
    }
    return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for(let i = 0; i < bindings.length; i++){
        const binding = bindings[i];
        if (oldBindings) binding.oldValue = oldBindings[i].value;
        let hook = binding.dir[name];
        if (hook) {
            // disable tracking inside all lifecycle hooks
            // since they can potentially be called inside effects.
            _reactivity.pauseTracking();
            callWithAsyncErrorHandling(hook, instance, 8 /* DIRECTIVE_HOOK */ , [
                vnode.el,
                binding,
                vnode,
                prevVNode
            ]);
            _reactivity.resetTracking();
        }
    }
}
function createAppContext() {
    return {
        app: null,
        config: {
            isNativeTag: _shared.NO,
            performance: false,
            globalProperties: {
            },
            optionMergeStrategies: {
            },
            errorHandler: undefined,
            warnHandler: undefined,
            compilerOptions: {
            }
        },
        mixins: [],
        components: {
        },
        directives: {
        },
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap()
    };
}
let uid = 0;
function createAppAPI(render, hydrate) {
    return function createApp(rootComponent, rootProps = null) {
        if (rootProps != null && !_shared.isObject(rootProps)) {
            warn(`root props passed to app.mount() must be an object.`);
            rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = new Set();
        let isMounted = false;
        const app = context.app = {
            _uid: uid++,
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            _context: context,
            _instance: null,
            version,
            get config () {
                return context.config;
            },
            set config (v){
                warn(`app.config cannot be replaced. Modify individual options instead.`);
            },
            use (plugin, ...options) {
                if (installedPlugins.has(plugin)) warn(`Plugin has already been applied to target app.`);
                else if (plugin && _shared.isFunction(plugin.install)) {
                    installedPlugins.add(plugin);
                    plugin.install(app, ...options);
                } else if (_shared.isFunction(plugin)) {
                    installedPlugins.add(plugin);
                    plugin(app, ...options);
                } else warn(`A plugin must either be a function or an object with an "install" ` + `function.`);
                return app;
            },
            mixin (mixin) {
                if (__VUE_OPTIONS_API__) {
                    if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
                    else warn('Mixin has already been applied to target app' + (mixin.name ? `: ${mixin.name}` : ''));
                } else warn('Mixins are only available in builds supporting Options API');
                return app;
            },
            component (name, component) {
                validateComponentName(name, context.config);
                if (!component) return context.components[name];
                if (context.components[name]) warn(`Component "${name}" has already been registered in target app.`);
                context.components[name] = component;
                return app;
            },
            directive (name, directive) {
                validateDirectiveName(name);
                if (!directive) return context.directives[name];
                if (context.directives[name]) warn(`Directive "${name}" has already been registered in target app.`);
                context.directives[name] = directive;
                return app;
            },
            mount (rootContainer, isHydrate, isSVG) {
                if (!isMounted) {
                    const vnode = createVNode(rootComponent, rootProps);
                    // store app context on the root VNode.
                    // this will be set on the root instance on initial mount.
                    vnode.appContext = context;
                    context.reload = ()=>{
                        render(cloneVNode(vnode), rootContainer, isSVG);
                    };
                    if (isHydrate && hydrate) hydrate(vnode, rootContainer);
                    else render(vnode, rootContainer, isSVG);
                    isMounted = true;
                    app._container = rootContainer;
                    rootContainer.__vue_app__ = app;
                    app._instance = vnode.component;
                    devtoolsInitApp(app, version);
                    return vnode.component.proxy;
                } else warn(`App has already been mounted.\n` + `If you want to remount the same app, move your app creation logic ` + `into a factory function and create fresh app instances for each ` + `mount - e.g. \`const createMyApp = () => createApp(App)\``);
            },
            unmount () {
                if (isMounted) {
                    render(null, app._container);
                    app._instance = null;
                    devtoolsUnmountApp(app);
                    delete app._container.__vue_app__;
                } else warn(`Cannot unmount an app that is not mounted.`);
            },
            provide (key, value) {
                if (key in context.provides) warn(`App already provides property with key "${String(key)}". ` + `It will be overwritten with the new value.`);
                // TypeScript doesn't allow symbols as index type
                // https://github.com/Microsoft/TypeScript/issues/24587
                context.provides[key] = value;
                return app;
            }
        };
        return app;
    };
}
let hasMismatch = false;
const isSVGContainer = (container)=>/svg/.test(container.namespaceURI) && container.tagName !== 'foreignObject'
;
const isComment = (node)=>node.nodeType === 8 /* COMMENT */ 
;
// Note: hydration is DOM-specific
// But we have to place it in core due to tight coupling with core - splitting
// it out creates a ton of unnecessary complexity.
// Hydration also depends on some renderer internal logic which needs to be
// passed in via arguments.
function createHydrationFunctions(rendererInternals) {
    const { mt: mountComponent , p: patch , o: { patchProp , nextSibling , parentNode , remove , insert , createComment  }  } = rendererInternals;
    const hydrate = (vnode, container)=>{
        if (!container.hasChildNodes()) {
            warn(`Attempting to hydrate existing markup but container is empty. ` + `Performing full mount instead.`);
            patch(null, vnode, container);
            flushPostFlushCbs();
            return;
        }
        hasMismatch = false;
        hydrateNode(container.firstChild, vnode, null, null, null);
        flushPostFlushCbs();
        if (hasMismatch && true) // this error should show up in production
        console.error(`Hydration completed but contains mismatches.`);
    };
    const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false)=>{
        const isFragmentStart = isComment(node) && node.data === '[';
        const onMismatch = ()=>handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart)
        ;
        const { type , ref , shapeFlag  } = vnode;
        const domType = node.nodeType;
        vnode.el = node;
        let nextNode = null;
        switch(type){
            case Text1:
                if (domType !== 3 /* TEXT */ ) nextNode = onMismatch();
                else {
                    if (node.data !== vnode.children) {
                        hasMismatch = true;
                        warn(`Hydration text mismatch:` + `\n- Client: ${JSON.stringify(node.data)}` + `\n- Server: ${JSON.stringify(vnode.children)}`);
                        node.data = vnode.children;
                    }
                    nextNode = nextSibling(node);
                }
                break;
            case Comment1:
                if (domType !== 8 /* COMMENT */  || isFragmentStart) nextNode = onMismatch();
                else nextNode = nextSibling(node);
                break;
            case Static:
                if (domType !== 1 /* ELEMENT */ ) nextNode = onMismatch();
                else {
                    // determine anchor, adopt content
                    nextNode = node;
                    // if the static vnode has its content stripped during build,
                    // adopt it from the server-rendered HTML.
                    const needToAdoptContent = !vnode.children.length;
                    for(let i = 0; i < vnode.staticCount; i++){
                        if (needToAdoptContent) vnode.children += nextNode.outerHTML;
                        if (i === vnode.staticCount - 1) vnode.anchor = nextNode;
                        nextNode = nextSibling(nextNode);
                    }
                    return nextNode;
                }
                break;
            case Fragment:
                if (!isFragmentStart) nextNode = onMismatch();
                else nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
                break;
            default:
                if (shapeFlag & 1 /* ELEMENT */ ) {
                    if (domType !== 1 /* ELEMENT */  || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) nextNode = onMismatch();
                    else nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
                } else if (shapeFlag & 6 /* COMPONENT */ ) {
                    // when setting up the render effect, if the initial vnode already
                    // has .el set, the component will perform hydration instead of mount
                    // on its sub-tree.
                    vnode.slotScopeIds = slotScopeIds;
                    const container = parentNode(node);
                    mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
                    // component may be async, so in the case of fragments we cannot rely
                    // on component's rendered output to determine the end of the fragment
                    // instead, we do a lookahead to find the end anchor node.
                    nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
                    // #3787
                    // if component is async, it may get moved / unmounted before its
                    // inner component is loaded, so we need to give it a placeholder
                    // vnode that matches its adopted DOM.
                    if (isAsyncWrapper(vnode)) {
                        let subTree;
                        if (isFragmentStart) {
                            subTree = createVNode(Fragment);
                            subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
                        } else subTree = node.nodeType === 3 ? createTextVNode('') : createVNode('div');
                        subTree.el = node;
                        vnode.component.subTree = subTree;
                    }
                } else if (shapeFlag & 64 /* TELEPORT */ ) {
                    if (domType !== 8 /* COMMENT */ ) nextNode = onMismatch();
                    else nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
                } else if (shapeFlag & 128 /* SUSPENSE */ ) nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
                else warn('Invalid HostVNode type:', type, `(${typeof type})`);
        }
        if (ref != null) setRef(ref, null, parentSuspense, vnode);
        return nextNode;
    };
    const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized)=>{
        optimized = optimized || !!vnode.dynamicChildren;
        const { type , props , patchFlag , shapeFlag , dirs  } = vnode;
        // #4006 for form elements with non-string v-model value bindings
        // e.g. <option :value="obj">, <input type="checkbox" :true-value="1">
        const forcePatchValue = type === 'input' && dirs || type === 'option';
        // skip props & children if this is hoisted static nodes
        if (forcePatchValue || patchFlag !== -1 /* HOISTED */ ) {
            if (dirs) invokeDirectiveHook(vnode, null, parentComponent, 'created');
            // props
            if (props) {
                if (forcePatchValue || !optimized || patchFlag & 48 /* HYDRATE_EVENTS */ ) {
                    for(const key in props)if (forcePatchValue && key.endsWith('value') || _shared.isOn(key) && !_shared.isReservedProp(key)) patchProp(el, key, null, props[key]);
                } else if (props.onClick) // Fast path for click listeners (which is most often) to avoid
                // iterating through props.
                patchProp(el, 'onClick', null, props.onClick);
            }
            // vnode / directive hooks
            let vnodeHooks;
            if (vnodeHooks = props && props.onVnodeBeforeMount) invokeVNodeHook(vnodeHooks, parentComponent, vnode);
            if (dirs) invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
            if ((vnodeHooks = props && props.onVnodeMounted) || dirs) queueEffectWithSuspense(()=>{
                vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
                dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
            }, parentSuspense);
            // children
            if (shapeFlag & 16 /* ARRAY_CHILDREN */  && // skip if element has innerHTML / textContent
            !(props && (props.innerHTML || props.textContent))) {
                let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
                let hasWarned1 = false;
                while(next){
                    hasMismatch = true;
                    if (!hasWarned1) {
                        warn(`Hydration children mismatch in <${vnode.type}>: ` + `server rendered element contains more child nodes than client vdom.`);
                        hasWarned1 = true;
                    }
                    // The SSRed DOM contains more nodes than it should. Remove them.
                    const cur = next;
                    next = next.nextSibling;
                    remove(cur);
                }
            } else if (shapeFlag & 8 /* TEXT_CHILDREN */ ) {
                if (el.textContent !== vnode.children) {
                    hasMismatch = true;
                    warn(`Hydration text content mismatch in <${vnode.type}>:\n` + `- Client: ${el.textContent}\n` + `- Server: ${vnode.children}`);
                    el.textContent = vnode.children;
                }
            }
        }
        return el.nextSibling;
    };
    const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized)=>{
        optimized = optimized || !!parentVNode.dynamicChildren;
        const children = parentVNode.children;
        const l = children.length;
        let hasWarned1 = false;
        for(let i = 0; i < l; i++){
            const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
            if (node) node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
            else if (vnode.type === Text1 && !vnode.children) continue;
            else {
                hasMismatch = true;
                if (!hasWarned1) {
                    warn(`Hydration children mismatch in <${container.tagName.toLowerCase()}>: ` + `server rendered element contains fewer child nodes than client vdom.`);
                    hasWarned1 = true;
                }
                // the SSRed DOM didn't contain enough nodes. Mount the missing ones.
                patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
            }
        }
        return node;
    };
    const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized)=>{
        const { slotScopeIds: fragmentSlotScopeIds  } = vnode;
        if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        const container = parentNode(node);
        const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
        if (next && isComment(next) && next.data === ']') return nextSibling(vnode.anchor = next);
        else {
            // fragment didn't hydrate successfully, since we didn't get a end anchor
            // back. This should have led to node/children mismatch warnings.
            hasMismatch = true;
            // since the anchor is missing, we need to create one and insert it
            insert(vnode.anchor = createComment(`]`), container, next);
            return next;
        }
    };
    const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment)=>{
        hasMismatch = true;
        warn(`Hydration node mismatch:\n- Client vnode:`, vnode.type, `\n- Server rendered DOM:`, node, node.nodeType === 3 /* TEXT */  ? `(text)` : isComment(node) && node.data === '[' ? `(start of fragment)` : ``);
        vnode.el = null;
        if (isFragment) {
            // remove excessive fragment nodes
            const end = locateClosingAsyncAnchor(node);
            while(true){
                const next = nextSibling(node);
                if (next && next !== end) remove(next);
                else break;
            }
        }
        const next = nextSibling(node);
        const container = parentNode(node);
        remove(node);
        patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
        return next;
    };
    const locateClosingAsyncAnchor = (node)=>{
        let match = 0;
        while(node){
            node = nextSibling(node);
            if (node && isComment(node)) {
                if (node.data === '[') match++;
                if (node.data === ']') {
                    if (match === 0) return nextSibling(node);
                    else match--;
                }
            }
        }
        return node;
    };
    return [
        hydrate,
        hydrateNode
    ];
}
let supported;
let perf;
function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) perf.mark(`vue-${type}-${instance.uid}`);
    devtoolsPerfStart(instance, type, supported ? perf.now() : Date.now());
}
function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
        const startTag = `vue-${type}-${instance.uid}`;
        const endTag = startTag + `:end`;
        perf.mark(endTag);
        perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
    }
    devtoolsPerfEnd(instance, type, supported ? perf.now() : Date.now());
}
function isSupported() {
    if (supported !== undefined) return supported;
    /* eslint-disable no-restricted-globals */ if (typeof window !== 'undefined' && window.performance) {
        supported = true;
        perf = window.performance;
    } else supported = false;
    /* eslint-enable no-restricted-globals */ return supported;
}
/**
 * This is only called in esm-bundler builds.
 * It is called when a renderer is created, in `baseCreateRenderer` so that
 * importing runtime-core is side-effects free.
 *
 * istanbul-ignore-next
 */ function initFeatureFlags() {
    let needWarn = false;
    if (typeof __VUE_OPTIONS_API__ !== 'boolean') {
        needWarn = true;
        _shared.getGlobalThis().__VUE_OPTIONS_API__ = true;
    }
    if (typeof __VUE_PROD_DEVTOOLS__ !== 'boolean') {
        needWarn = true;
        _shared.getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
    }
    if (needWarn) console.warn(`You are running the esm-bundler build of Vue. It is recommended to ` + `configure your bundler to explicitly replace feature flag globals ` + `with boolean literals to get proper tree-shaking in the final bundle. ` + `See http://link.vuejs.org/feature-flags for more details.`);
}
const queuePostRenderEffect = queueEffectWithSuspense;
/**
 * The createRenderer function accepts two generic arguments:
 * HostNode and HostElement, corresponding to Node and Element types in the
 * host environment. For example, for runtime-dom, HostNode would be the DOM
 * `Node` interface and HostElement would be the DOM `Element` interface.
 *
 * Custom renderers can pass in the platform specific types like this:
 *
 * ``` js
 * const { render, createApp } = createRenderer<Node, Element>({
 *   patchProp,
 *   ...nodeOps
 * })
 * ```
 */ function createRenderer(options) {
    return baseCreateRenderer(options);
}
// Separate API for creating hydration-enabled renderer.
// Hydration logic is only used when calling this function, making it
// tree-shakable.
function createHydrationRenderer(options) {
    return baseCreateRenderer(options, createHydrationFunctions);
}
// implementation
function baseCreateRenderer(options, createHydrationFns) {
    initFeatureFlags();
    {
        const target = _shared.getGlobalThis();
        target.__VUE__ = true;
        setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__);
    }
    const { insert: hostInsert , remove: hostRemove , patchProp: hostPatchProp , createElement: hostCreateElement , createText: hostCreateText , createComment: hostCreateComment , setText: hostSetText , setElementText: hostSetElementText , parentNode: hostParentNode , nextSibling: hostNextSibling , setScopeId: hostSetScopeId = _shared.NOOP , cloneNode: hostCloneNode , insertStaticContent: hostInsertStaticContent  } = options;
    // Note: functions inside this closure should use `const xxx = () => {}`
    // style in order to prevent being inlined by minifiers.
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren)=>{
        if (n1 === n2) return;
        // patching & not same type, unmount old tree
        if (n1 && !isSameVNodeType(n1, n2)) {
            anchor = getNextHostNode(n1);
            unmount(n1, parentComponent, parentSuspense, true);
            n1 = null;
        }
        if (n2.patchFlag === -2 /* BAIL */ ) {
            optimized = false;
            n2.dynamicChildren = null;
        }
        const { type , ref , shapeFlag  } = n2;
        switch(type){
            case Text1:
                processText(n1, n2, container, anchor);
                break;
            case Comment1:
                processCommentNode(n1, n2, container, anchor);
                break;
            case Static:
                if (n1 == null) mountStaticNode(n2, container, anchor, isSVG);
                else patchStaticNode(n1, n2, container, isSVG);
                break;
            case Fragment:
                processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                break;
            default:
                if (shapeFlag & 1 /* ELEMENT */ ) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                else if (shapeFlag & 6 /* COMPONENT */ ) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                else if (shapeFlag & 64 /* TELEPORT */ ) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                else if (shapeFlag & 128 /* SUSPENSE */ ) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                else warn('Invalid VNode type:', type, `(${typeof type})`);
        }
        // set ref
        if (ref != null && parentComponent) setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    };
    const processText = (n1, n2, container, anchor)=>{
        if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
        else {
            const el = n2.el = n1.el;
            if (n2.children !== n1.children) hostSetText(el, n2.children);
        }
    };
    const processCommentNode = (n1, n2, container, anchor)=>{
        if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ''), container, anchor);
        else // there's no support for dynamic comments
        n2.el = n1.el;
    };
    const mountStaticNode = (n2, container, anchor, isSVG)=>{
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    };
    /**
     * Dev / HMR only
     */ const patchStaticNode = (n1, n2, container, isSVG)=>{
        // static nodes are only patched during dev for HMR
        if (n2.children !== n1.children) {
            const anchor = hostNextSibling(n1.anchor);
            // remove existing
            removeStaticNode(n1);
            [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
        } else {
            n2.el = n1.el;
            n2.anchor = n1.anchor;
        }
    };
    const moveStaticNode = ({ el , anchor  }, container, nextSibling)=>{
        let next;
        while(el && el !== anchor){
            next = hostNextSibling(el);
            hostInsert(el, container, nextSibling);
            el = next;
        }
        hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el , anchor  })=>{
        let next;
        while(el && el !== anchor){
            next = hostNextSibling(el);
            hostRemove(el);
            el = next;
        }
        hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)=>{
        isSVG = isSVG || n2.type === 'svg';
        if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        else patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)=>{
        let el;
        let vnodeHook;
        const { type , props , shapeFlag , transition , patchFlag , dirs  } = vnode;
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
        // mount children first, since some props may rely on child content
        // being already rendered, e.g. `<select value>`
        if (shapeFlag & 8 /* TEXT_CHILDREN */ ) hostSetElementText(el, vnode.children);
        else if (shapeFlag & 16 /* ARRAY_CHILDREN */ ) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', slotScopeIds, optimized);
        if (dirs) invokeDirectiveHook(vnode, null, parentComponent, 'created');
        // props
        if (props) {
            for(const key in props)if (key !== 'value' && !_shared.isReservedProp(key)) hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            /**
                 * Special case for setting value on DOM elements:
                 * - it can be order-sensitive (e.g. should be set *after* min/max, #2325, #4024)
                 * - it needs to be forced (#1471)
                 * #2353 proposes adding another renderer option to configure this, but
                 * the properties affects are so finite it is worth special casing it
                 * here to reduce the complexity. (Special casing it also should not
                 * affect non-DOM renderers)
                 */ if ('value' in props) hostPatchProp(el, 'value', null, props.value);
            if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        // scopeId
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
        Object.defineProperty(el, '__vnode', {
            value: vnode,
            enumerable: false
        });
        Object.defineProperty(el, '__vueParentComponent', {
            value: parentComponent,
            enumerable: false
        });
        if (dirs) invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
        // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
        // #1689 For inside suspense + suspense resolved case, just call it
        const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
        if (needCallTransitionHooks) transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(()=>{
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
        }, parentSuspense);
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent)=>{
        if (scopeId) hostSetScopeId(el, scopeId);
        if (slotScopeIds) for(let i = 0; i < slotScopeIds.length; i++)hostSetScopeId(el, slotScopeIds[i]);
        if (parentComponent) {
            let subTree = parentComponent.subTree;
            if (subTree.patchFlag > 0 && subTree.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */ ) subTree = filterSingleRoot(subTree.children) || subTree;
            if (vnode === subTree) {
                const parentVNode = parentComponent.vnode;
                setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
            }
        }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0)=>{
        for(let i = start; i < children.length; i++){
            const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
            patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)=>{
        const el = n2.el = n1.el;
        let { patchFlag , dynamicChildren , dirs  } = n2;
        // #1426 take the old vnode's patch flag into account since user may clone a
        // compiler-generated vnode, which de-opts to FULL_PROPS
        patchFlag |= n1.patchFlag & 16 /* FULL_PROPS */ ;
        const oldProps = n1.props || _shared.EMPTY_OBJ;
        const newProps = n2.props || _shared.EMPTY_OBJ;
        let vnodeHook;
        if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        if (dirs) invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
        if (isHmrUpdating) {
            // HMR updated, force full diff
            patchFlag = 0;
            optimized = false;
            dynamicChildren = null;
        }
        const areChildrenSVG = isSVG && n2.type !== 'foreignObject';
        if (dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
            if (parentComponent && parentComponent.type.__hmrId) traverseStaticChildren(n1, n2);
        } else if (!optimized) // full diff
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
        if (patchFlag > 0) {
            // the presence of a patchFlag means this element's render code was
            // generated by the compiler and can take the fast path.
            // in this path old node and new node are guaranteed to have the same shape
            // (i.e. at the exact same position in the source template)
            if (patchFlag & 16 /* FULL_PROPS */ ) // element props contain dynamic keys, full diff needed
            patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
            else {
                // class
                // this flag is matched when the element has dynamic class bindings.
                if (patchFlag & 2 /* CLASS */ ) {
                    if (oldProps.class !== newProps.class) hostPatchProp(el, 'class', null, newProps.class, isSVG);
                }
                // style
                // this flag is matched when the element has dynamic style bindings
                if (patchFlag & 4 /* STYLE */ ) hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
                // props
                // This flag is matched when the element has dynamic prop/attr bindings
                // other than class and style. The keys of dynamic prop/attrs are saved for
                // faster iteration.
                // Note dynamic keys like :[foo]="bar" will cause this optimization to
                // bail out and go through a full diff because we need to unset the old key
                if (patchFlag & 8 /* PROPS */ ) {
                    // if the flag is present then dynamicProps must be non-null
                    const propsToUpdate = n2.dynamicProps;
                    for(let i = 0; i < propsToUpdate.length; i++){
                        const key = propsToUpdate[i];
                        const prev = oldProps[key];
                        const next = newProps[key];
                        // #1471 force patch value
                        if (next !== prev || key === 'value') hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
            }
            // text
            // This flag is matched when the element has only dynamic text children.
            if (patchFlag & 1 /* TEXT */ ) {
                if (n1.children !== n2.children) hostSetElementText(el, n2.children);
            }
        } else if (!optimized && dynamicChildren == null) // unoptimized, full diff
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(()=>{
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
        }, parentSuspense);
    };
    // The fast path for blocks.
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds)=>{
        for(let i = 0; i < newChildren.length; i++){
            const oldVNode = oldChildren[i];
            const newVNode = newChildren[i];
            // Determine the container (parent element) for the patch.
            const container = // oldVNode may be an errored async setup() component inside Suspense
            // which will not have a mounted element
            oldVNode.el && (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
            // which also requires the correct parent container
            !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
            oldVNode.shapeFlag & 70 /* TELEPORT */ ) ? hostParentNode(oldVNode.el) : // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer;
            patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
        }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG)=>{
        if (oldProps !== newProps) {
            for(const key in newProps){
                // empty string is not valid prop
                if (_shared.isReservedProp(key)) continue;
                const next = newProps[key];
                const prev = oldProps[key];
                // defer patching value
                if (next !== prev && key !== 'value') hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
            if (oldProps !== _shared.EMPTY_OBJ) {
                for(const key1 in oldProps)if (!_shared.isReservedProp(key1) && !(key1 in newProps)) hostPatchProp(el, key1, oldProps[key1], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
            if ('value' in newProps) hostPatchProp(el, 'value', oldProps.value, newProps.value);
        }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)=>{
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText('');
        const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText('');
        let { patchFlag , dynamicChildren , slotScopeIds: fragmentSlotScopeIds  } = n2;
        if (isHmrUpdating) {
            // HMR updated, force full diff
            patchFlag = 0;
            optimized = false;
            dynamicChildren = null;
        }
        // check if this is a slot fragment with :slotted scope ids
        if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        if (n1 == null) {
            hostInsert(fragmentStartAnchor, container, anchor);
            hostInsert(fragmentEndAnchor, container, anchor);
            // a fragment can only have array children
            // since they are either generated by the compiler, or implicitly created
            // from arrays.
            mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */  && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
            // a stable fragment (template root or <template v-for>) doesn't need to
            // patch children order, but it may contain dynamicChildren.
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
            if (parentComponent && parentComponent.type.__hmrId) traverseStaticChildren(n1, n2);
            else if (// #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
        } else // keyed / unkeyed, or manual fragments.
        // for keyed & unkeyed, since they are compiler generated from v-for,
        // each child is guaranteed to be a block so the fragment will never
        // have dynamicChildren.
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)=>{
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
            if (n2.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */ ) parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
            else mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        } else updateComponent(n1, n2, optimized);
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized)=>{
        const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
        if (instance.type.__hmrId) registerHMR(instance);
        pushWarningContext(initialVNode);
        startMeasure(instance, `mount`);
        // inject renderer internals for keepAlive
        if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
        startMeasure(instance, `init`);
        setupComponent(instance);
        endMeasure(instance, `init`);
        // setup() is async. This component relies on async logic to be resolved
        // before proceeding
        if (instance.asyncDep) {
            parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
            // Give it a placeholder if this is not hydration
            // TODO handle self-defined fallback
            if (!initialVNode.el) {
                const placeholder = instance.subTree = createVNode(Comment1);
                processCommentNode(null, placeholder, container, anchor);
            }
            return;
        }
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
        popWarningContext();
        endMeasure(instance, `mount`);
    };
    const updateComponent = (n1, n2, optimized)=>{
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
            if (instance.asyncDep && !instance.asyncResolved) {
                pushWarningContext(n2);
                updateComponentPreRender(instance, n2, optimized);
                popWarningContext();
                return;
            } else {
                // normal update
                instance.next = n2;
                // in case the child component is also queued, remove it to avoid
                // double updating the same child component in the same flush.
                invalidateJob(instance.update);
                // instance.update is the reactive effect.
                instance.update();
            }
        } else {
            // no update needed. just copy over properties
            n2.component = n1.component;
            n2.el = n1.el;
            instance.vnode = n2;
        }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized)=>{
        const componentUpdateFn = ()=>{
            if (!instance.isMounted) {
                let vnodeHook;
                const { el , props  } = initialVNode;
                const { bm , m , parent  } = instance;
                const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
                effect.allowRecurse = false;
                // beforeMount hook
                if (bm) _shared.invokeArrayFns(bm);
                // onVnodeBeforeMount
                if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
                effect.allowRecurse = true;
                if (el && hydrateNode) {
                    // vnode has adopted host node - perform hydration instead of mount.
                    const hydrateSubTree = ()=>{
                        startMeasure(instance, `render`);
                        instance.subTree = renderComponentRoot(instance);
                        endMeasure(instance, `render`);
                        startMeasure(instance, `hydrate`);
                        hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                        endMeasure(instance, `hydrate`);
                    };
                    if (isAsyncWrapperVNode) initialVNode.type.__asyncLoader().then(// note: we are moving the render call into an async callback,
                    // which means it won't track dependencies - but it's ok because
                    // a server-rendered async wrapper is already in resolved state
                    // and it will never need to change.
                    ()=>!instance.isUnmounted && hydrateSubTree()
                    );
                    else hydrateSubTree();
                } else {
                    startMeasure(instance, `render`);
                    const subTree = instance.subTree = renderComponentRoot(instance);
                    endMeasure(instance, `render`);
                    startMeasure(instance, `patch`);
                    patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
                    endMeasure(instance, `patch`);
                    initialVNode.el = subTree.el;
                }
                // mounted hook
                if (m) queuePostRenderEffect(m, parentSuspense);
                // onVnodeMounted
                if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
                    const scopedInitialVNode = initialVNode;
                    queuePostRenderEffect(()=>invokeVNodeHook(vnodeHook, parent, scopedInitialVNode)
                    , parentSuspense);
                }
                // activated hook for keep-alive roots.
                // #1742 activated hook must be accessed after first render
                // since the hook may be injected by a child keep-alive
                if (initialVNode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */ ) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
                instance.isMounted = true;
                devtoolsComponentAdded(instance);
                // #2458: deference mount-only object parameters to prevent memleaks
                initialVNode = container = anchor = null;
            } else {
                // updateComponent
                // This is triggered by mutation of component's own state (next: null)
                // OR parent calling processComponent (next: VNode)
                let { next , bu , u , parent , vnode  } = instance;
                let originNext = next;
                let vnodeHook;
                pushWarningContext(next || instance.vnode);
                // Disallow component effect recursion during pre-lifecycle hooks.
                effect.allowRecurse = false;
                if (next) {
                    next.el = vnode.el;
                    updateComponentPreRender(instance, next, optimized);
                } else next = vnode;
                // beforeUpdate hook
                if (bu) _shared.invokeArrayFns(bu);
                // onVnodeBeforeUpdate
                if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
                effect.allowRecurse = true;
                startMeasure(instance, `render`);
                const nextTree = renderComponentRoot(instance);
                endMeasure(instance, `render`);
                const prevTree = instance.subTree;
                instance.subTree = nextTree;
                startMeasure(instance, `patch`);
                patch(prevTree, nextTree, // parent may have changed if it's in a teleport
                hostParentNode(prevTree.el), // anchor may have changed if it's in a fragment
                getNextHostNode(prevTree), instance, parentSuspense, isSVG);
                endMeasure(instance, `patch`);
                next.el = nextTree.el;
                if (originNext === null) // self-triggered update. In case of HOC, update parent component
                // vnode el. HOC is indicated by parent instance's subTree pointing
                // to child component's vnode
                updateHOCHostEl(instance, nextTree.el);
                // updated hook
                if (u) queuePostRenderEffect(u, parentSuspense);
                // onVnodeUpdated
                if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(()=>invokeVNodeHook(vnodeHook, parent, next, vnode)
                , parentSuspense);
                devtoolsComponentUpdated(instance);
                popWarningContext();
            }
        };
        // create reactive effect for rendering
        const effect = new _reactivity.ReactiveEffect(componentUpdateFn, ()=>queueJob(instance.update)
        , instance.scope // track it in component's effect scope
        );
        const update = instance.update = effect.run.bind(effect);
        update.id = instance.uid;
        // allowRecurse
        // #1801, #2043 component render effects should allow recursive updates
        effect.allowRecurse = update.allowRecurse = true;
        effect.onTrack = instance.rtc ? (e)=>_shared.invokeArrayFns(instance.rtc, e)
         : void 0;
        effect.onTrigger = instance.rtg ? (e)=>_shared.invokeArrayFns(instance.rtg, e)
         : void 0;
        // @ts-ignore (for scheduler)
        update.ownerInstance = instance;
        update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized)=>{
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        _reactivity.pauseTracking();
        // props update may have triggered pre-flush watchers.
        // flush them before the render update.
        flushPreFlushCbs(undefined, instance.update);
        _reactivity.resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false)=>{
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag , shapeFlag  } = n2;
        // fast path
        if (patchFlag > 0) {
            if (patchFlag & 128 /* KEYED_FRAGMENT */ ) {
                // this could be either fully-keyed or mixed (some keyed some not)
                // presence of patchFlag means children are guaranteed to be arrays
                patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                return;
            } else if (patchFlag & 256 /* UNKEYED_FRAGMENT */ ) {
                // unkeyed
                patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                return;
            }
        }
        // children has 3 possibilities: text, array or no children.
        if (shapeFlag & 8 /* TEXT_CHILDREN */ ) {
            // text children fast path
            if (prevShapeFlag & 16 /* ARRAY_CHILDREN */ ) unmountChildren(c1, parentComponent, parentSuspense);
            if (c2 !== c1) hostSetElementText(container, c2);
        } else if (prevShapeFlag & 16 /* ARRAY_CHILDREN */ ) {
            // prev children was array
            if (shapeFlag & 16 /* ARRAY_CHILDREN */ ) // two arrays, cannot assume anything, do full diff
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            else // no new children, just unmount old
            unmountChildren(c1, parentComponent, parentSuspense, true);
        } else {
            // prev children was text OR null
            // new children is array OR null
            if (prevShapeFlag & 8 /* TEXT_CHILDREN */ ) hostSetElementText(container, '');
            // mount new if array
            if (shapeFlag & 16 /* ARRAY_CHILDREN */ ) mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)=>{
        c1 = c1 || _shared.EMPTY_ARR;
        c2 = c2 || _shared.EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for(i = 0; i < commonLength; i++){
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
        if (oldLength > newLength) // remove old
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
        else // mount new
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    };
    // can be all-keyed or mixed
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized)=>{
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1; // prev ending index
        let e2 = l2 - 1; // next ending index
        // 1. sync from start
        // (a b) c
        // (a b) d e
        while(i <= e1 && i <= e2){
            const n1 = c1[i];
            const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            else break;
            i++;
        }
        // 2. sync from end
        // a (b c)
        // d e (b c)
        while(i <= e1 && i <= e2){
            const n1 = c1[e1];
            const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
            if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            else break;
            e1--;
            e2--;
        }
        // 3. common sequence + mount
        // (a b)
        // (a b) c
        // i = 2, e1 = 1, e2 = 2
        // (a b)
        // c (a b)
        // i = 0, e1 = -1, e2 = 0
        if (i > e1) {
            if (i <= e2) {
                const nextPos = e2 + 1;
                const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                while(i <= e2){
                    patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    i++;
                }
            }
        } else if (i > e2) while(i <= e1){
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
        }
        else {
            const s1 = i; // prev starting index
            const s2 = i; // next starting index
            // 5.1 build key:index map for newChildren
            const keyToNewIndexMap = new Map();
            for(i = s2; i <= e2; i++){
                const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                if (nextChild.key != null) {
                    if (keyToNewIndexMap.has(nextChild.key)) warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
                    keyToNewIndexMap.set(nextChild.key, i);
                }
            }
            // 5.2 loop through old children left to be patched and try to patch
            // matching nodes & remove nodes that are no longer present
            let j;
            let patched = 0;
            const toBePatched = e2 - s2 + 1;
            let moved = false;
            // used to track whether any node has moved
            let maxNewIndexSoFar = 0;
            // works as Map<newIndex, oldIndex>
            // Note that oldIndex is offset by +1
            // and oldIndex = 0 is a special value indicating the new node has
            // no corresponding old node.
            // used for determining longest stable subsequence
            const newIndexToOldIndexMap = new Array(toBePatched);
            for(i = 0; i < toBePatched; i++)newIndexToOldIndexMap[i] = 0;
            for(i = s1; i <= e1; i++){
                const prevChild = c1[i];
                if (patched >= toBePatched) {
                    // all new children have been patched so this can only be a removal
                    unmount(prevChild, parentComponent, parentSuspense, true);
                    continue;
                }
                let newIndex;
                if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
                else {
                    // key-less node, try to locate a key-less node of the same type
                    for(j = s2; j <= e2; j++)if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                        newIndex = j;
                        break;
                    }
                }
                if (newIndex === undefined) unmount(prevChild, parentComponent, parentSuspense, true);
                else {
                    newIndexToOldIndexMap[newIndex - s2] = i + 1;
                    if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
                    else moved = true;
                    patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    patched++;
                }
            }
            // 5.3 move and mount
            // generate longest stable subsequence only when nodes have moved
            const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : _shared.EMPTY_ARR;
            j = increasingNewIndexSequence.length - 1;
            // looping backwards so that we can use last patched node as anchor
            for(i = toBePatched - 1; i >= 0; i--){
                const nextIndex = s2 + i;
                const nextChild = c2[nextIndex];
                const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                if (newIndexToOldIndexMap[i] === 0) // mount new
                patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                else if (moved) {
                    // move if:
                    // There is no stable subsequence (e.g. a reverse)
                    // OR current node is not among the stable sequence
                    if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2 /* REORDER */ );
                    else j--;
                }
            }
        }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null)=>{
        const { el , type , transition , children , shapeFlag  } = vnode;
        if (shapeFlag & 6 /* COMPONENT */ ) {
            move(vnode.component.subTree, container, anchor, moveType);
            return;
        }
        if (shapeFlag & 128 /* SUSPENSE */ ) {
            vnode.suspense.move(container, anchor, moveType);
            return;
        }
        if (shapeFlag & 64 /* TELEPORT */ ) {
            type.move(vnode, container, anchor, internals);
            return;
        }
        if (type === Fragment) {
            hostInsert(el, container, anchor);
            for(let i = 0; i < children.length; i++)move(children[i], container, anchor, moveType);
            hostInsert(vnode.anchor, container, anchor);
            return;
        }
        if (type === Static) {
            moveStaticNode(vnode, container, anchor);
            return;
        }
        // single nodes
        const needTransition = moveType !== 2 /* REORDER */  && shapeFlag & 1 /* ELEMENT */  && transition;
        if (needTransition) {
            if (moveType === 0 /* ENTER */ ) {
                transition.beforeEnter(el);
                hostInsert(el, container, anchor);
                queuePostRenderEffect(()=>transition.enter(el)
                , parentSuspense);
            } else {
                const { leave , delayLeave , afterLeave  } = transition;
                const remove = ()=>hostInsert(el, container, anchor)
                ;
                const performLeave = ()=>{
                    leave(el, ()=>{
                        remove();
                        afterLeave && afterLeave();
                    });
                };
                if (delayLeave) delayLeave(el, remove, performLeave);
                else performLeave();
            }
        } else hostInsert(el, container, anchor);
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false)=>{
        const { type , props , ref , children , dynamicChildren , shapeFlag , patchFlag , dirs  } = vnode;
        // unset ref
        if (ref != null) setRef(ref, null, parentSuspense, vnode, true);
        if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */ ) {
            parentComponent.ctx.deactivate(vnode);
            return;
        }
        const shouldInvokeDirs = shapeFlag & 1 /* ELEMENT */  && dirs;
        const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
        if (shapeFlag & 6 /* COMPONENT */ ) unmountComponent(vnode.component, parentSuspense, doRemove);
        else {
            if (shapeFlag & 128 /* SUSPENSE */ ) {
                vnode.suspense.unmount(parentSuspense, doRemove);
                return;
            }
            if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
            if (shapeFlag & 64 /* TELEPORT */ ) vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
            else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */ )) // fast path for block nodes: only need to unmount dynamic children.
            unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
            else if (type === Fragment && patchFlag & 384 /* UNKEYED_FRAGMENT */  || !optimized && shapeFlag & 16 /* ARRAY_CHILDREN */ ) unmountChildren(children, parentComponent, parentSuspense);
            if (doRemove) remove(vnode);
        }
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) queuePostRenderEffect(()=>{
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
        }, parentSuspense);
    };
    const remove = (vnode)=>{
        const { type , el , anchor , transition  } = vnode;
        if (type === Fragment) {
            removeFragment(el, anchor);
            return;
        }
        if (type === Static) {
            removeStaticNode(vnode);
            return;
        }
        const performRemove = ()=>{
            hostRemove(el);
            if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
        };
        if (vnode.shapeFlag & 1 /* ELEMENT */  && transition && !transition.persisted) {
            const { leave , delayLeave  } = transition;
            const performLeave = ()=>leave(el, performRemove)
            ;
            if (delayLeave) delayLeave(vnode.el, performRemove, performLeave);
            else performLeave();
        } else performRemove();
    };
    const removeFragment = (cur, end)=>{
        // For fragments, directly remove all contained DOM nodes.
        // (fragment child nodes cannot have transition)
        let next;
        while(cur !== end){
            next = hostNextSibling(cur);
            hostRemove(cur);
            cur = next;
        }
        hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove)=>{
        if (instance.type.__hmrId) unregisterHMR(instance);
        const { bum , scope , update , subTree , um  } = instance;
        // beforeUnmount hook
        if (bum) _shared.invokeArrayFns(bum);
        // stop effects in component scope
        scope.stop();
        // update may be null if a component is unmounted before its async
        // setup has resolved.
        if (update) {
            // so that scheduler will no longer invoke it
            update.active = false;
            unmount(subTree, instance, parentSuspense, doRemove);
        }
        // unmounted hook
        if (um) queuePostRenderEffect(um, parentSuspense);
        queuePostRenderEffect(()=>{
            instance.isUnmounted = true;
        }, parentSuspense);
        // A component with async dep inside a pending suspense is unmounted before
        // its async dep resolves. This should remove the dep from the suspense, and
        // cause the suspense to resolve immediately if that was the last dep.
        if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
            parentSuspense.deps--;
            if (parentSuspense.deps === 0) parentSuspense.resolve();
        }
        devtoolsComponentRemoved(instance);
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0)=>{
        for(let i = start; i < children.length; i++)unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    };
    const getNextHostNode = (vnode)=>{
        if (vnode.shapeFlag & 6 /* COMPONENT */ ) return getNextHostNode(vnode.component.subTree);
        if (vnode.shapeFlag & 128 /* SUSPENSE */ ) return vnode.suspense.next();
        return hostNextSibling(vnode.anchor || vnode.el);
    };
    const render = (vnode, container, isSVG)=>{
        if (vnode == null) {
            if (container._vnode) unmount(container._vnode, null, null, true);
        } else patch(container._vnode || null, vnode, container, null, null, null, isSVG);
        flushPostFlushCbs();
        container._vnode = vnode;
    };
    const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
    return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
    };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (_shared.isArray(rawRef)) {
        rawRef.forEach((r, i)=>setRef(r, oldRawRef && (_shared.isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount)
        );
        return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) // when mounting async components, nothing needs to be done,
    // because the template ref is forwarded to inner component
    return;
    const refValue = vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */  ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner , r: ref  } = rawRef;
    if (!owner) {
        warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. ` + `A vnode with ref must be created inside the render function.`);
        return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === _shared.EMPTY_OBJ ? owner.refs = {
    } : owner.refs;
    const setupState = owner.setupState;
    // dynamic ref changed. unset old ref
    if (oldRef != null && oldRef !== ref) {
        if (_shared.isString(oldRef)) {
            refs[oldRef] = null;
            if (_shared.hasOwn(setupState, oldRef)) setupState[oldRef] = null;
        } else if (_reactivity.isRef(oldRef)) oldRef.value = null;
    }
    if (_shared.isString(ref)) {
        const doSet = ()=>{
            refs[ref] = value;
            if (_shared.hasOwn(setupState, ref)) setupState[ref] = value;
        };
        // #1789: for non-null values, set them after render
        // null values means this is unmount and it should not overwrite another
        // ref with the same key
        if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
        } else doSet();
    } else if (_reactivity.isRef(ref)) {
        const doSet = ()=>{
            ref.value = value;
        };
        if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
        } else doSet();
    } else if (_shared.isFunction(ref)) callWithErrorHandling(ref, owner, 12 /* FUNCTION_REF */ , [
        value,
        refs
    ]);
    else warn('Invalid template ref type:', value, `(${typeof value})`);
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7 /* VNODE_HOOK */ , [
        vnode,
        prevVNode
    ]);
}
/**
 * #1156
 * When a component is HMR-enabled, we need to make sure that all static nodes
 * inside a block also inherit the DOM element from the previous tree so that
 * HMR updates (which are full updates) can retrieve the element for patching.
 *
 * #2080
 * Inside keyed `template` fragment static children, if a fragment is moved,
 * the children will always moved so that need inherit el form previous nodes
 * to ensure correct moved position.
 */ function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (_shared.isArray(ch1) && _shared.isArray(ch2)) for(let i = 0; i < ch1.length; i++){
        // this is only called in the optimized path so array children are
        // guaranteed to be vnodes
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 /* ELEMENT */  && !c2.dynamicChildren) {
            if (c2.patchFlag <= 0 || c2.patchFlag === 32 /* HYDRATE_EVENTS */ ) {
                c2 = ch2[i] = cloneIfMounted(ch2[i]);
                c2.el = c1.el;
            }
            if (!shallow) traverseStaticChildren(c1, c2);
        }
        // also inherit for comment nodes, but not placeholders (e.g. v-if which
        // would have received .el during block patch)
        if (c2.type === Comment1 && !c2.el) c2.el = c1.el;
    }
}
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr) {
    const p = arr.slice();
    const result = [
        0
    ];
    let i, j, u, v, c;
    const len = arr.length;
    for(i = 0; i < len; i++){
        const arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while(u < v){
                c = u + v >> 1;
                if (arr[result[c]] < arrI) u = c + 1;
                else v = c;
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) p[i] = result[u - 1];
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while((u--) > 0){
        result[u] = v;
        v = p[v];
    }
    return result;
}
const isTeleport = (type)=>type.__isTeleport
;
const isTeleportDisabled = (props)=>props && (props.disabled || props.disabled === '')
;
const isTargetSVG = (target)=>typeof SVGElement !== 'undefined' && target instanceof SVGElement
;
const resolveTarget = (props, select)=>{
    const targetSelector = props && props.to;
    if (_shared.isString(targetSelector)) {
        if (!select) {
            warn(`Current renderer does not support string target for Teleports. ` + `(missing querySelector renderer option)`);
            return null;
        } else {
            const target = select(targetSelector);
            if (!target) warn(`Failed to locate Teleport target with selector "${targetSelector}". ` + `Note the target element must exist before the component is mounted - ` + `i.e. the target cannot be rendered by the component itself, and ` + `ideally should be outside of the entire Vue component tree.`);
            return target;
        }
    } else {
        if (!targetSelector && !isTeleportDisabled(props)) warn(`Invalid Teleport target: ${targetSelector}`);
        return targetSelector;
    }
};
const TeleportImpl = {
    __isTeleport: true,
    process (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
        const { mc: mountChildren , pc: patchChildren , pbc: patchBlockChildren , o: { insert , querySelector , createText , createComment  }  } = internals;
        const disabled = isTeleportDisabled(n2.props);
        let { shapeFlag , children , dynamicChildren  } = n2;
        // #3302
        // HMR updated, force full diff
        if (isHmrUpdating) {
            optimized = false;
            dynamicChildren = null;
        }
        if (n1 == null) {
            // insert anchors in the main view
            const placeholder = n2.el = createComment('teleport start');
            const mainAnchor = n2.anchor = createComment('teleport end');
            insert(placeholder, container, anchor);
            insert(mainAnchor, container, anchor);
            const target = n2.target = resolveTarget(n2.props, querySelector);
            const targetAnchor = n2.targetAnchor = createText('');
            if (target) {
                insert(targetAnchor, target);
                // #2652 we could be teleporting from a non-SVG tree into an SVG tree
                isSVG = isSVG || isTargetSVG(target);
            } else if (!disabled) warn('Invalid Teleport target on mount:', target, `(${typeof target})`);
            const mount = (container, anchor)=>{
                // Teleport *always* has Array children. This is enforced in both the
                // compiler and vnode children normalization.
                if (shapeFlag & 16 /* ARRAY_CHILDREN */ ) mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            };
            if (disabled) mount(container, mainAnchor);
            else if (target) mount(target, targetAnchor);
        } else {
            // update content
            n2.el = n1.el;
            const mainAnchor = n2.anchor = n1.anchor;
            const target = n2.target = n1.target;
            const targetAnchor = n2.targetAnchor = n1.targetAnchor;
            const wasDisabled = isTeleportDisabled(n1.props);
            const currentContainer = wasDisabled ? container : target;
            const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
            isSVG = isSVG || isTargetSVG(target);
            if (dynamicChildren) {
                // fast path when the teleport happens to be a block root
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
                // even in block tree mode we need to make sure all root-level nodes
                // in the teleport inherit previous DOM references so that they can
                // be moved in future patches.
                traverseStaticChildren(n1, n2, true);
            } else if (!optimized) patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
            if (disabled) {
                if (!wasDisabled) // enabled -> disabled
                // move into main container
                moveTeleport(n2, container, mainAnchor, internals, 1 /* TOGGLE */ );
            } else {
                // target changed
                if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
                    const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
                    if (nextTarget) moveTeleport(n2, nextTarget, null, internals, 0 /* TARGET_CHANGE */ );
                    else warn('Invalid Teleport target on update:', target, `(${typeof target})`);
                } else if (wasDisabled) // disabled -> enabled
                // move into teleport target
                moveTeleport(n2, target, targetAnchor, internals, 1 /* TOGGLE */ );
            }
        }
    },
    remove (vnode, parentComponent, parentSuspense, optimized, { um: unmount , o: { remove: hostRemove  }  }, doRemove) {
        const { shapeFlag , children , anchor , targetAnchor , target , props  } = vnode;
        if (target) hostRemove(targetAnchor);
        // an unmounted teleport should always remove its children if not disabled
        if (doRemove || !isTeleportDisabled(props)) {
            hostRemove(anchor);
            if (shapeFlag & 16 /* ARRAY_CHILDREN */ ) for(let i = 0; i < children.length; i++){
                const child = children[i];
                unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
            }
        }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert  } , m: move  }, moveType = 2 /* REORDER */ ) {
    // move target anchor if this is a target change.
    if (moveType === 0 /* TARGET_CHANGE */ ) insert(vnode.targetAnchor, container, parentAnchor);
    const { el , anchor , shapeFlag , children , props  } = vnode;
    const isReorder = moveType === 2 /* REORDER */ ;
    // move main view anchor if this is a re-order.
    if (isReorder) insert(el, container, parentAnchor);
    // if this is a re-order and teleport is enabled (content is in target)
    // do not move children. So the opposite is: only move children if this
    // is not a reorder, or the teleport is disabled
    if (!isReorder || isTeleportDisabled(props)) {
        // Teleport has either Array children or no children.
        if (shapeFlag & 16 /* ARRAY_CHILDREN */ ) for(let i = 0; i < children.length; i++)move(children[i], container, parentAnchor, 2 /* REORDER */ );
    }
    // move main view anchor if this is a re-order.
    if (isReorder) insert(anchor, container, parentAnchor);
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling , parentNode , querySelector  }  }, hydrateChildren) {
    const target = vnode.target = resolveTarget(vnode.props, querySelector);
    if (target) {
        // if multiple teleports rendered to the same target element, we need to
        // pick up from where the last teleport finished instead of the first node
        const targetNode = target._lpa || target.firstChild;
        if (vnode.shapeFlag & 16 /* ARRAY_CHILDREN */ ) {
            if (isTeleportDisabled(vnode.props)) {
                vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
                vnode.targetAnchor = targetNode;
            } else {
                vnode.anchor = nextSibling(node);
                vnode.targetAnchor = hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
            }
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
        }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
}
// Force-casted public typing for h and TSX props inference
const Teleport = TeleportImpl;
const COMPONENTS = 'components';
const DIRECTIVES = 'directives';
/**
 * @private
 */ function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
/**
 * @private
 */ function resolveDynamicComponent(component) {
    if (_shared.isString(component)) return resolveAsset(COMPONENTS, component, false) || component;
    else // invalid types will fallthrough to createVNode and raise warning
    return component || NULL_DYNAMIC_COMPONENT;
}
/**
 * @private
 */ function resolveDirective(name) {
    return resolveAsset(DIRECTIVES, name);
}
// implementation
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
        const Component = instance.type;
        // explicit self name has highest priority
        if (type === COMPONENTS) {
            const selfName = getComponentName(Component);
            if (selfName && (selfName === name || selfName === _shared.camelize(name) || selfName === _shared.capitalize(_shared.camelize(name)))) return Component;
        }
        const res = // local registration
        // check instance[type] first which is resolved for options API
        resolve(instance[type] || Component[type], name) || // global registration
        resolve(instance.appContext[type], name);
        if (!res && maybeSelfReference) // fallback to implicit self-reference
        return Component;
        if (warnMissing && !res) warn(`Failed to resolve ${type.slice(0, -1)}: ${name}`);
        return res;
    } else warn(`resolve${_shared.capitalize(type.slice(0, -1))} ` + `can only be used in render() or setup().`);
}
function resolve(registry, name) {
    return registry && (registry[name] || registry[_shared.camelize(name)] || registry[_shared.capitalize(_shared.camelize(name))]);
}
const Fragment = Symbol('Fragment');
const Text1 = Symbol('Text');
const Comment1 = Symbol('Comment');
const Static = Symbol('Static');
// Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).
const blockStack = [];
let currentBlock = null;
/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */ function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
}
// Whether we should be tracking dynamic child nodes inside a block.
// Only tracks when this value is > 0
// We are not using a simple boolean because this value may need to be
// incremented/decremented by nested usage of v-once (see below)
let isBlockTreeEnabled = 1;
/**
 * Block tracking sometimes needs to be disabled, for example during the
 * creation of a tree that needs to be cached by v-once. The compiler generates
 * code like this:
 *
 * ``` js
 * _cache[1] || (
 *   setBlockTracking(-1),
 *   _cache[1] = createVNode(...),
 *   setBlockTracking(1),
 *   _cache[1]
 * )
 * ```
 *
 * @private
 */ function setBlockTracking(value) {
    isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
    // save current block children on the block vnode
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || _shared.EMPTY_ARR : null;
    // close block
    closeBlock();
    // a block is always going to be patched, so track it as a child of its
    // parent block
    if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
    return vnode;
}
/**
 * @private
 */ function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */ function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
    if (n2.shapeFlag & 6 /* COMPONENT */  && hmrDirtyComponents.has(n2.type)) // HMR only: if the component has been hot-updated, force a reload.
    return false;
    return n1.type === n2.type && n1.key === n2.key;
}
let vnodeArgsTransformer;
/**
 * Internal API for registering an arguments transform for createVNode
 * used for creating stubs in the test-utils
 * It is *internal* but needs to be exposed for test-utils to pick up proper
 * typings
 */ function transformVNodeArgs(transformer) {
    vnodeArgsTransformer = transformer;
}
const createVNodeWithArgsTransform = (...args)=>{
    return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key  })=>key != null ? key : null
;
const normalizeRef = ({ ref  })=>{
    return ref != null ? _shared.isString(ref) || _reactivity.isRef(ref) || _shared.isFunction(ref) ? {
        i: currentRenderingInstance,
        r: ref
    } : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1 /* ELEMENT */ , isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
    };
    if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children);
        // normalize suspense children
        if (shapeFlag & 128 /* SUSPENSE */ ) type.normalize(vnode);
    } else if (children) // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag |= _shared.isString(children) ? 8 /* TEXT_CHILDREN */  : 16 /* ARRAY_CHILDREN */ ;
    // validate key
    if (vnode.key !== vnode.key) warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    // track vnode for block tree
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6 /* COMPONENT */ ) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32 /* HYDRATE_EVENTS */ ) currentBlock.push(vnode);
    return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
        if (!type) warn(`Invalid vnode type when creating vnode: ${type}.`);
        type = Comment1;
    }
    if (isVNode(type)) {
        // createVNode receiving an existing vnode. This happens in cases like
        // <component :is="vnode"/>
        // #2078 make sure to merge refs during the clone instead of overwriting it
        const cloned = cloneVNode(type, props, true);
        if (children) normalizeChildren(cloned, children);
        return cloned;
    }
    // class component normalization.
    if (isClassComponent(type)) type = type.__vccOpts;
    // class & style normalization.
    if (props) {
        // for reactive or proxy objects, we need to clone it to enable mutation.
        props = guardReactiveProps(props);
        let { class: klass , style  } = props;
        if (klass && !_shared.isString(klass)) props.class = _shared.normalizeClass(klass);
        if (_shared.isObject(style)) {
            // reactive state objects need to be cloned since they are likely to be
            // mutated
            if (_reactivity.isProxy(style) && !_shared.isArray(style)) style = _shared.extend({
            }, style);
            props.style = _shared.normalizeStyle(style);
        }
    }
    // encode the vnode type information into a bitmap
    const shapeFlag = _shared.isString(type) ? 1 /* ELEMENT */  : isSuspense(type) ? 128 /* SUSPENSE */  : isTeleport(type) ? 64 /* TELEPORT */  : _shared.isObject(type) ? 4 /* STATEFUL_COMPONENT */  : _shared.isFunction(type) ? 2 /* FUNCTIONAL_COMPONENT */  : 0;
    if (shapeFlag & 4 /* STATEFUL_COMPONENT */  && _reactivity.isProxy(type)) {
        type = _reactivity.toRaw(type);
        warn(`Vue received a Component which was made a reactive object. This can ` + `lead to unnecessary performance overhead, and should be avoided by ` + `marking the component with \`markRaw\` or using \`shallowRef\` ` + `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
    }
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
    if (!props) return null;
    return _reactivity.isProxy(props) || InternalObjectKey in props ? _shared.extend({
    }, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
    // This is intentionally NOT using spread or extend to avoid the runtime
    // key enumeration cost.
    const { props , ref , patchFlag , children  } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {
    }, extraProps) : props;
    const cloned = {
        __v_isVNode: true,
        __v_skip: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ? // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref ? _shared.isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [
            ref,
            normalizeRef(extraProps)
        ] : normalizeRef(extraProps) : ref,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children: patchFlag === -1 /* HOISTED */  && _shared.isArray(children) ? children.map(deepCloneVNode) : children,
        target: vnode.target,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: perserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 // hoisted node
         ? 16 /* FULL_PROPS */  : patchFlag | 16 /* FULL_PROPS */  : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition: vnode.transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor
    };
    return cloned;
}
/**
 * Dev only, for HMR of hoisted vnodes reused in v-for
 * https://github.com/vitejs/vite/issues/2022
 */ function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (_shared.isArray(vnode.children)) cloned.children = vnode.children.map(deepCloneVNode);
    return cloned;
}
/**
 * @private
 */ function createTextVNode(text = ' ', flag = 0) {
    return createVNode(Text1, null, text, flag);
}
/**
 * @private
 */ function createStaticVNode(content, numberOfNodes) {
    // A static vnode can contain multiple stringified elements, and the number
    // of elements is necessary for hydration.
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
}
/**
 * @private
 */ function createCommentVNode(text = '', // when used as the v-else branch, the comment node must be created as a
// block to ensure correct updates.
asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment1, null, text)) : createVNode(Comment1, null, text);
}
function normalizeVNode(child) {
    if (child == null || typeof child === 'boolean') // empty placeholder
    return createVNode(Comment1);
    else if (_shared.isArray(child)) // fragment
    return createVNode(Fragment, null, // #3666, avoid reference pollution when reusing vnode
    child.slice());
    else if (typeof child === 'object') // already vnode, this should be the most common since compiled templates
    // always produce all-vnode children arrays
    return cloneIfMounted(child);
    else // strings and numbers
    return createVNode(Text1, null, String(child));
}
// optimized normalization for template-compiled render fns
function cloneIfMounted(child) {
    return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag  } = vnode;
    if (children == null) children = null;
    else if (_shared.isArray(children)) type = 16 /* ARRAY_CHILDREN */ ;
    else if (typeof children === 'object') {
        if (shapeFlag & 65 /* TELEPORT */ ) {
            // Normalize slot to plain children for plain element and Teleport
            const slot = children.default;
            if (slot) {
                // _c marker is added by withCtx() indicating this is a compiled slot
                slot._c && (slot._d = false);
                normalizeChildren(vnode, slot());
                slot._c && (slot._d = true);
            }
            return;
        } else {
            type = 32 /* SLOTS_CHILDREN */ ;
            const slotFlag = children._;
            if (!slotFlag && !(InternalObjectKey in children)) children._ctx = currentRenderingInstance;
            else if (slotFlag === 3 /* FORWARDED */  && currentRenderingInstance) {
                // a child component receives forwarded slots from the parent.
                // its slot type is determined by its parent's slot type.
                if (currentRenderingInstance.slots._ === 1 /* STABLE */ ) children._ = 1 /* STABLE */ ;
                else {
                    children._ = 2 /* DYNAMIC */ ;
                    vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */ ;
                }
            }
        }
    } else if (_shared.isFunction(children)) {
        children = {
            default: children,
            _ctx: currentRenderingInstance
        };
        type = 32 /* SLOTS_CHILDREN */ ;
    } else {
        children = String(children);
        // force teleport children to array so it can be moved around
        if (shapeFlag & 64 /* TELEPORT */ ) {
            type = 16 /* ARRAY_CHILDREN */ ;
            children = [
                createTextVNode(children)
            ];
        } else type = 8 /* TEXT_CHILDREN */ ;
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
}
function mergeProps(...args) {
    const ret = {
    };
    for(let i = 0; i < args.length; i++){
        const toMerge = args[i];
        for(const key in toMerge){
            if (key === 'class') {
                if (ret.class !== toMerge.class) ret.class = _shared.normalizeClass([
                    ret.class,
                    toMerge.class
                ]);
            } else if (key === 'style') ret.style = _shared.normalizeStyle([
                ret.style,
                toMerge.style
            ]);
            else if (_shared.isOn(key)) {
                const existing = ret[key];
                const incoming = toMerge[key];
                if (existing !== incoming) ret[key] = existing ? [].concat(existing, incoming) : incoming;
            } else if (key !== '') ret[key] = toMerge[key];
        }
    }
    return ret;
}
/**
 * Actual implementation
 */ function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache && cache[index];
    if (_shared.isArray(source) || _shared.isString(source)) {
        ret = new Array(source.length);
        for(let i = 0, l = source.length; i < l; i++)ret[i] = renderItem(source[i], i, undefined, cached && cached[i]);
    } else if (typeof source === 'number') {
        if (!Number.isInteger(source)) {
            warn(`The v-for range expect an integer value but got ${source}.`);
            return [];
        }
        ret = new Array(source);
        for(let i = 0; i < source; i++)ret[i] = renderItem(i + 1, i, undefined, cached && cached[i]);
    } else if (_shared.isObject(source)) {
        if (source[Symbol.iterator]) ret = Array.from(source, (item, i)=>renderItem(item, i, undefined, cached && cached[i])
        );
        else {
            const keys = Object.keys(source);
            ret = new Array(keys.length);
            for(let i = 0, l = keys.length; i < l; i++){
                const key = keys[i];
                ret[i] = renderItem(source[key], key, i, cached && cached[i]);
            }
        }
    } else ret = [];
    if (cache) cache[index] = ret;
    return ret;
}
/**
 * Compiler runtime helper for creating dynamic slots object
 * @private
 */ function createSlots(slots, dynamicSlots) {
    for(let i = 0; i < dynamicSlots.length; i++){
        const slot = dynamicSlots[i];
        // array of dynamic slot generated by <template v-for="..." #[...]>
        if (_shared.isArray(slot)) for(let j = 0; j < slot.length; j++)slots[slot[j].name] = slot[j].fn;
        else if (slot) // conditional single slot generated by <template v-if="..." #foo>
        slots[slot.name] = slot.fn;
    }
    return slots;
}
/**
 * Compiler runtime helper for rendering `<slot/>`
 * @private
 */ function renderSlot(slots, name, props = {
}, // this is not a user-facing function, so the fallback is always generated by
// the compiler and guaranteed to be a function returning an array
fallback, noSlotted) {
    if (currentRenderingInstance.isCE) return createVNode('slot', name === 'default' ? null : {
        name
    }, fallback && fallback());
    let slot = slots[name];
    if (slot && slot.length > 1) {
        warn(`SSR-optimized slot function detected in a non-SSR-optimized render ` + `function. You need to mark this component with $dynamic-slots in the ` + `parent template.`);
        slot = ()=>[]
        ;
    }
    // a compiled slot disables block tracking by default to avoid manual
    // invocation interfering with template-based block tracking, but in
    // `renderSlot` we can be sure that it's template-based so we can force
    // enable it.
    if (slot && slot._c) slot._d = false;
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const rendered = createBlock(Fragment, {
        key: props.key || `_${name}`
    }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 /* STABLE */  ? 64 /* STABLE_FRAGMENT */  : -2 /* BAIL */ );
    if (!noSlotted && rendered.scopeId) rendered.slotScopeIds = [
        rendered.scopeId + '-s'
    ];
    if (slot && slot._c) slot._d = true;
    return rendered;
}
function ensureValidVNode(vnodes) {
    return vnodes.some((child)=>{
        if (!isVNode(child)) return true;
        if (child.type === Comment1) return false;
        if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
        return true;
    }) ? vnodes : null;
}
/**
 * For prefixing keys in v-on="obj" with "on"
 * @private
 */ function toHandlers(obj) {
    const ret = {
    };
    if (!_shared.isObject(obj)) {
        warn(`v-on with no argument expects an object value.`);
        return ret;
    }
    for(const key in obj)ret[_shared.toHandlerKey(key)] = obj[key];
    return ret;
}
/**
 * #2437 In Vue 3, functional components do not have a public instance proxy but
 * they exist in the internal parent chain. For code that relies on traversing
 * public $parent chains, skip functional ones and go to the parent instead.
 */ const getPublicInstance = (i)=>{
    if (!i) return null;
    if (isStatefulComponent(i)) return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
};
const publicPropertiesMap = _shared.extend(Object.create(null), {
    $: (i)=>i
    ,
    $el: (i)=>i.vnode.el
    ,
    $data: (i)=>i.data
    ,
    $props: (i)=>_reactivity.shallowReadonly(i.props)
    ,
    $attrs: (i)=>_reactivity.shallowReadonly(i.attrs)
    ,
    $slots: (i)=>_reactivity.shallowReadonly(i.slots)
    ,
    $refs: (i)=>_reactivity.shallowReadonly(i.refs)
    ,
    $parent: (i)=>getPublicInstance(i.parent)
    ,
    $root: (i)=>getPublicInstance(i.root)
    ,
    $emit: (i)=>i.emit
    ,
    $options: (i)=>__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type
    ,
    $forceUpdate: (i)=>()=>queueJob(i.update)
    ,
    $nextTick: (i)=>nextTick.bind(i.proxy)
    ,
    $watch: (i)=>__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : _shared.NOOP
});
const PublicInstanceProxyHandlers = {
    get ({ _: instance  }, key) {
        const { ctx , setupState , data , props , accessCache , type , appContext  } = instance;
        // for internal formatters to know that this is a Vue instance
        if (key === '__isVue') return true;
        // prioritize <script setup> bindings during dev.
        // this allows even properties that start with _ or $ to be used - so that
        // it aligns with the production behavior where the render fn is inlined and
        // indeed has access to all declared variables.
        if (setupState !== _shared.EMPTY_OBJ && setupState.__isScriptSetup && _shared.hasOwn(setupState, key)) return setupState[key];
        // data / props / ctx
        // This getter gets called for every property access on the render context
        // during render and is a major hotspot. The most expensive part of this
        // is the multiple hasOwn() calls. It's much faster to do a simple property
        // access on a plain object, so we use an accessCache object (with null
        // prototype) to memoize what access type a key corresponds to.
        let normalizedProps;
        if (key[0] !== '$') {
            const n = accessCache[key];
            if (n !== undefined) switch(n){
                case 0 /* SETUP */ :
                    return setupState[key];
                case 1 /* DATA */ :
                    return data[key];
                case 3 /* CONTEXT */ :
                    return ctx[key];
                case 2 /* PROPS */ :
                    return props[key];
            }
            else if (setupState !== _shared.EMPTY_OBJ && _shared.hasOwn(setupState, key)) {
                accessCache[key] = 0 /* SETUP */ ;
                return setupState[key];
            } else if (data !== _shared.EMPTY_OBJ && _shared.hasOwn(data, key)) {
                accessCache[key] = 1 /* DATA */ ;
                return data[key];
            } else if (// only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && _shared.hasOwn(normalizedProps, key)) {
                accessCache[key] = 2 /* PROPS */ ;
                return props[key];
            } else if (ctx !== _shared.EMPTY_OBJ && _shared.hasOwn(ctx, key)) {
                accessCache[key] = 3 /* CONTEXT */ ;
                return ctx[key];
            } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) accessCache[key] = 4 /* OTHER */ ;
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        // public $xxx properties
        if (publicGetter) {
            if (key === '$attrs') {
                _reactivity.track(instance, "get" /* GET */ , key);
                markAttrsAccessed();
            }
            return publicGetter(instance);
        } else if (// css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
        else if (ctx !== _shared.EMPTY_OBJ && _shared.hasOwn(ctx, key)) {
            // user may set custom properties to `this` that start with `$`
            accessCache[key] = 3 /* CONTEXT */ ;
            return ctx[key];
        } else if (globalProperties = appContext.config.globalProperties, _shared.hasOwn(globalProperties, key)) return globalProperties[key];
        else if (currentRenderingInstance && (!_shared.isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
        // to infinite warning loop
        key.indexOf('__v') !== 0)) {
            if (data !== _shared.EMPTY_OBJ && (key[0] === '$' || key[0] === '_') && _shared.hasOwn(data, key)) warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` + `character ("$" or "_") and is not proxied on the render context.`);
            else if (instance === currentRenderingInstance) warn(`Property ${JSON.stringify(key)} was accessed during render ` + `but is not defined on instance.`);
        }
    },
    set ({ _: instance  }, key, value) {
        const { data , setupState , ctx  } = instance;
        if (setupState !== _shared.EMPTY_OBJ && _shared.hasOwn(setupState, key)) setupState[key] = value;
        else if (data !== _shared.EMPTY_OBJ && _shared.hasOwn(data, key)) data[key] = value;
        else if (_shared.hasOwn(instance.props, key)) {
            warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
            return false;
        }
        if (key[0] === '$' && key.slice(1) in instance) {
            warn(`Attempting to mutate public property "${key}". ` + `Properties starting with $ are reserved and readonly.`, instance);
            return false;
        } else if (key in instance.appContext.config.globalProperties) Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            value
        });
        else ctx[key] = value;
        return true;
    },
    has ({ _: { data , setupState , accessCache , ctx , appContext , propsOptions  }  }, key) {
        let normalizedProps;
        return accessCache[key] !== undefined || data !== _shared.EMPTY_OBJ && _shared.hasOwn(data, key) || setupState !== _shared.EMPTY_OBJ && _shared.hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && _shared.hasOwn(normalizedProps, key) || _shared.hasOwn(ctx, key) || _shared.hasOwn(publicPropertiesMap, key) || _shared.hasOwn(appContext.config.globalProperties, key);
    }
};
PublicInstanceProxyHandlers.ownKeys = (target)=>{
    warn(`Avoid app logic that relies on enumerating keys on a component instance. ` + `The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
};
const RuntimeCompiledPublicInstanceProxyHandlers = /*#__PURE__*/ _shared.extend({
}, PublicInstanceProxyHandlers, {
    get (target, key) {
        // fast path for unscopables when using `with` block
        if (key === Symbol.unscopables) return;
        return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has (_, key) {
        const has = key[0] !== '_' && !_shared.isGloballyWhitelisted(key);
        if (!has && PublicInstanceProxyHandlers.has(_, key)) warn(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
        return has;
    }
});
// dev only
// In dev mode, the proxy target exposes the same properties as seen on `this`
// for easier console inspection. In prod mode it will be an empty object so
// these properties definitions can be skipped.
function createDevRenderContext(instance) {
    const target = {
    };
    // expose internal instance for proxy handlers
    Object.defineProperty(target, `_`, {
        configurable: true,
        enumerable: false,
        get: ()=>instance
    });
    // expose public properties
    Object.keys(publicPropertiesMap).forEach((key)=>{
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: false,
            get: ()=>publicPropertiesMap[key](instance)
            ,
            // intercepted by the proxy so no need for implementation,
            // but needed to prevent set errors
            set: _shared.NOOP
        });
    });
    return target;
}
// dev only
function exposePropsOnRenderContext(instance) {
    const { ctx , propsOptions: [propsOptions]  } = instance;
    if (propsOptions) Object.keys(propsOptions).forEach((key)=>{
        Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: ()=>instance.props[key]
            ,
            set: _shared.NOOP
        });
    });
}
// dev only
function exposeSetupStateOnRenderContext(instance) {
    const { ctx , setupState  } = instance;
    Object.keys(_reactivity.toRaw(setupState)).forEach((key)=>{
        if (!setupState.__isScriptSetup && (key[0] === '$' || key[0] === '_')) {
            warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" ` + `which are reserved prefixes for Vue internals.`);
            return;
        }
        Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: ()=>setupState[key]
            ,
            set: _shared.NOOP
        });
    });
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    // inherit parent app context - or - if root, adopt from root vnode
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
        uid: uid$1++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        next: null,
        subTree: null,
        update: null,
        scope: new _reactivity.EffectScope(true),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        // local resovled assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        // emit
        emit: null,
        emitted: null,
        // props default value
        propsDefaults: _shared.EMPTY_OBJ,
        // inheritAttrs
        inheritAttrs: type.inheritAttrs,
        // state
        ctx: _shared.EMPTY_OBJ,
        data: _shared.EMPTY_OBJ,
        props: _shared.EMPTY_OBJ,
        attrs: _shared.EMPTY_OBJ,
        slots: _shared.EMPTY_OBJ,
        refs: _shared.EMPTY_OBJ,
        setupState: _shared.EMPTY_OBJ,
        setupContext: null,
        // suspense related
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    instance.ctx = createDevRenderContext(instance);
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    // apply custom element special handling
    if (vnode.ce) vnode.ce(instance);
    return instance;
}
let currentInstance = null;
const getCurrentInstance = ()=>currentInstance || currentRenderingInstance
;
const setCurrentInstance = (instance)=>{
    currentInstance = instance;
    instance.scope.on();
};
const unsetCurrentInstance = ()=>{
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
};
const isBuiltInTag = /*#__PURE__*/ _shared.makeMap('slot,component');
function validateComponentName(name, config) {
    const appIsNativeTag = config.isNativeTag || _shared.NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) warn('Do not use built-in or reserved HTML elements as component id: ' + name);
}
function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */ ;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props , children  } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
    isInSSRComponentSetup = false;
    return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    if (Component.name) validateComponentName(Component.name, instance.appContext.config);
    if (Component.components) {
        const names = Object.keys(Component.components);
        for(let i = 0; i < names.length; i++)validateComponentName(names[i], instance.appContext.config);
    }
    if (Component.directives) {
        const names = Object.keys(Component.directives);
        for(let i = 0; i < names.length; i++)validateDirectiveName(names[i]);
    }
    if (Component.compilerOptions && isRuntimeOnly()) warn(`"compilerOptions" is only supported when using a build of Vue that ` + `includes the runtime compiler. Since you are using a runtime-only ` + `build, the options should be passed via your build tool config instead.`);
    // 0. create render proxy property access cache
    instance.accessCache = Object.create(null);
    // 1. create public instance / render proxy
    // also mark it raw so it's never observed
    instance.proxy = _reactivity.markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    exposePropsOnRenderContext(instance);
    // 2. call setup()
    const { setup  } = Component;
    if (setup) {
        const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        setCurrentInstance(instance);
        _reactivity.pauseTracking();
        const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */ , [
            _reactivity.shallowReadonly(instance.props),
            setupContext
        ]);
        _reactivity.resetTracking();
        unsetCurrentInstance();
        if (_shared.isPromise(setupResult)) {
            setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
            if (isSSR) // return the promise so server-renderer can wait on it
            return setupResult.then((resolvedResult)=>{
                handleSetupResult(instance, resolvedResult, isSSR);
            }).catch((e)=>{
                handleError(e, instance, 0 /* SETUP_FUNCTION */ );
            });
            else // async setup returned Promise.
            // bail here and wait for re-entry.
            instance.asyncDep = setupResult;
        } else handleSetupResult(instance, setupResult, isSSR);
    } else finishComponentSetup(instance, isSSR);
}
function handleSetupResult(instance, setupResult, isSSR) {
    if (_shared.isFunction(setupResult)) instance.render = setupResult;
    else if (_shared.isObject(setupResult)) {
        if (isVNode(setupResult)) warn(`setup() should not return VNodes directly - ` + `return a render function instead.`);
        instance.devtoolsRawSetupState = setupResult;
        instance.setupState = _reactivity.proxyRefs(setupResult);
        exposeSetupStateOnRenderContext(instance);
    } else if (setupResult !== undefined) warn(`setup() should return an object. Received: ${setupResult === null ? 'null' : typeof setupResult}`);
    finishComponentSetup(instance, isSSR);
}
let compile;
let installWithProxy;
/**
 * For runtime-dom to register the compiler.
 * Note the exported method uses any to avoid d.ts relying on the compiler types.
 */ function registerRuntimeCompiler(_compile) {
    compile = _compile;
    installWithProxy = (i)=>{
        if (i.render._rc) i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    };
}
// dev only
const isRuntimeOnly = ()=>!compile
;
function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    // template / render function normalization
    if (!instance.render) {
        // could be set from setup()
        if (compile && !Component.render) {
            const template = Component.template;
            if (template) {
                startMeasure(instance, `compile`);
                const { isCustomElement , compilerOptions  } = instance.appContext.config;
                const { delimiters , compilerOptions: componentCompilerOptions  } = Component;
                const finalCompilerOptions = _shared.extend(_shared.extend({
                    isCustomElement,
                    delimiters
                }, compilerOptions), componentCompilerOptions);
                Component.render = compile(template, finalCompilerOptions);
                endMeasure(instance, `compile`);
            }
        }
        instance.render = Component.render || _shared.NOOP;
        // for runtime-compiled render functions using `with` blocks, the render
        // proxy used needs a different `has` handler which is more performant and
        // also only allows a whitelist of globals to fallthrough.
        if (installWithProxy) installWithProxy(instance);
    }
    // support for 2.x options
    if (__VUE_OPTIONS_API__ && true) {
        setCurrentInstance(instance);
        _reactivity.pauseTracking();
        applyOptions(instance);
        _reactivity.resetTracking();
        unsetCurrentInstance();
    }
    // warn missing template/render
    // the runtime compilation of template in SSR is done by server-render
    if (!Component.render && instance.render === _shared.NOOP && !isSSR) {
        /* istanbul ignore if */ if (!compile && Component.template) warn(`Component provided template option but ` + `runtime compilation is not supported in this build of Vue.` + ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
        else warn(`Component is missing template or render function.`);
    }
}
function createAttrsProxy(instance) {
    return new Proxy(instance.attrs, {
        get (target, key) {
            markAttrsAccessed();
            _reactivity.track(instance, "get" /* GET */ , '$attrs');
            return target[key];
        },
        set () {
            warn(`setupContext.attrs is readonly.`);
            return false;
        },
        deleteProperty () {
            warn(`setupContext.attrs is readonly.`);
            return false;
        }
    });
}
function createSetupContext(instance) {
    const expose = (exposed)=>{
        if (instance.exposed) warn(`expose() should be called only once per setup().`);
        instance.exposed = exposed || {
        };
    };
    let attrs;
    // We use getters in dev in case libs like test-utils overwrite instance
    // properties (overwrites should not be done in prod)
    return Object.freeze({
        get attrs () {
            return attrs || (attrs = createAttrsProxy(instance));
        },
        get slots () {
            return _reactivity.shallowReadonly(instance.slots);
        },
        get emit () {
            return (event, ...args)=>instance.emit(event, ...args)
            ;
        },
        expose
    });
}
function getExposeProxy(instance) {
    if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(_reactivity.proxyRefs(_reactivity.markRaw(instance.exposed)), {
        get (target, key) {
            if (key in target) return target[key];
            else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
        }
    }));
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str)=>str.replace(classifyRE, (c)=>c.toUpperCase()
    ).replace(/[-_]/g, '')
;
function getComponentName(Component) {
    return _shared.isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
/* istanbul ignore next */ function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) name = match[1];
    }
    if (!name && instance && instance.parent) {
        // try to infer the name based on reverse resolution
        const inferFromRegistry = (registry)=>{
            for(const key in registry){
                if (registry[key] === Component) return key;
            }
        };
        name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
    return _shared.isFunction(value) && '__vccOpts' in value;
}
const stack = [];
function pushWarningContext(vnode) {
    stack.push(vnode);
}
function popWarningContext() {
    stack.pop();
}
function warn(msg, ...args) {
    // avoid props formatting or warn handler tracking deps that might be mutated
    // during patch, leading to infinite recursion.
    _reactivity.pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */ , [
        msg + args.join(''),
        instance && instance.proxy,
        trace.map(({ vnode  })=>`at <${formatComponentName(instance, vnode.type)}>`
        ).join('\n'),
        trace
    ]);
    else {
        const warnArgs = [
            `[Vue warn]: ${msg}`,
            ...args
        ];
        /* istanbul ignore if */ if (trace.length && // avoid spamming console during tests
        true) warnArgs.push(`\n`, ...formatTrace(trace));
        console.warn(...warnArgs);
    }
    _reactivity.resetTracking();
}
function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) return [];
    // we can't just use the stack because it will be incomplete during updates
    // that did not start from the root. Re-construct the parent chain using
    // instance parent pointers.
    const normalizedStack = [];
    while(currentVNode){
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) last.recurseCount++;
        else normalizedStack.push({
            vnode: currentVNode,
            recurseCount: 0
        });
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
}
/* istanbul ignore next */ function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i)=>{
        logs.push(...i === 0 ? [] : [
            `\n`
        ], ...formatTraceEntry(entry));
    });
    return logs;
}
function formatTraceEntry({ vnode , recurseCount  }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props ? [
        open,
        ...formatProps(vnode.props),
        close
    ] : [
        open + close
    ];
}
/* istanbul ignore next */ function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key)=>{
        res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) res.push(` ...`);
    return res;
}
/* istanbul ignore next */ function formatProp(key, value, raw) {
    if (_shared.isString(value)) {
        value = JSON.stringify(value);
        return raw ? value : [
            `${key}=${value}`
        ];
    } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) return raw ? value : [
        `${key}=${value}`
    ];
    else if (_reactivity.isRef(value)) {
        value = formatProp(key, _reactivity.toRaw(value.value), true);
        return raw ? value : [
            `${key}=Ref<`,
            value,
            `>`
        ];
    } else if (_shared.isFunction(value)) return [
        `${key}=fn${value.name ? `<${value.name}>` : ``}`
    ];
    else {
        value = _reactivity.toRaw(value);
        return raw ? value : [
            `${key}=`,
            value
        ];
    }
}
const ErrorTypeStrings = {
    ["sp" /* SERVER_PREFETCH */ ]: 'serverPrefetch hook',
    ["bc" /* BEFORE_CREATE */ ]: 'beforeCreate hook',
    ["c" /* CREATED */ ]: 'created hook',
    ["bm" /* BEFORE_MOUNT */ ]: 'beforeMount hook',
    ["m" /* MOUNTED */ ]: 'mounted hook',
    ["bu" /* BEFORE_UPDATE */ ]: 'beforeUpdate hook',
    ["u" /* UPDATED */ ]: 'updated',
    ["bum" /* BEFORE_UNMOUNT */ ]: 'beforeUnmount hook',
    ["um" /* UNMOUNTED */ ]: 'unmounted hook',
    ["a" /* ACTIVATED */ ]: 'activated hook',
    ["da" /* DEACTIVATED */ ]: 'deactivated hook',
    ["ec" /* ERROR_CAPTURED */ ]: 'errorCaptured hook',
    ["rtc" /* RENDER_TRACKED */ ]: 'renderTracked hook',
    ["rtg" /* RENDER_TRIGGERED */ ]: 'renderTriggered hook',
    [0 /* SETUP_FUNCTION */ ]: 'setup function',
    [1 /* RENDER_FUNCTION */ ]: 'render function',
    [2 /* WATCH_GETTER */ ]: 'watcher getter',
    [3 /* WATCH_CALLBACK */ ]: 'watcher callback',
    [4 /* WATCH_CLEANUP */ ]: 'watcher cleanup function',
    [5 /* NATIVE_EVENT_HANDLER */ ]: 'native event handler',
    [6 /* COMPONENT_EVENT_HANDLER */ ]: 'component event handler',
    [7 /* VNODE_HOOK */ ]: 'vnode hook',
    [8 /* DIRECTIVE_HOOK */ ]: 'directive hook',
    [9 /* TRANSITION_HOOK */ ]: 'transition hook',
    [10 /* APP_ERROR_HANDLER */ ]: 'app errorHandler',
    [11 /* APP_WARN_HANDLER */ ]: 'app warnHandler',
    [12 /* FUNCTION_REF */ ]: 'ref function',
    [13 /* ASYNC_COMPONENT_LOADER */ ]: 'async component loader',
    [14 /* SCHEDULER */ ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next"
};
function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
        res = args ? fn(...args) : fn();
    } catch (err) {
        handleError(err, instance, type);
    }
    return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (_shared.isFunction(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        if (res && _shared.isPromise(res)) res.catch((err)=>{
            handleError(err, instance, type);
        });
        return res;
    }
    const values = [];
    for(let i = 0; i < fn.length; i++)values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    return values;
}
function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
        let cur = instance.parent;
        // the exposed instance is the render proxy to keep it consistent with 2.x
        const exposedInstance = instance.proxy;
        // in production the hook receives only the error code
        const errorInfo = ErrorTypeStrings[type];
        while(cur){
            const errorCapturedHooks = cur.ec;
            if (errorCapturedHooks) for(let i = 0; i < errorCapturedHooks.length; i++){
                if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) return;
            }
            cur = cur.parent;
        }
        // app-level handling
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
            callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */ , [
                err,
                exposedInstance,
                errorInfo
            ]);
            return;
        }
    }
    logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
    {
        const info = ErrorTypeStrings[type];
        if (contextVNode) pushWarningContext(contextVNode);
        warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
        if (contextVNode) popWarningContext();
        // crash in dev by default so it's more noticeable
        if (throwInDev) throw err;
        else console.error(err);
    }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
    const p = currentFlushPromise || resolvedPromise;
    return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
// #2768
// Use binary-search to find a suitable position in the queue,
// so that the queue maintains the increasing order of job's id,
// which can prevent the job from being skipped and also can avoid repeated patching.
function findInsertionIndex(id) {
    // the start index should be `flushIndex + 1`
    let start = flushIndex + 1;
    let end = queue.length;
    while(start < end){
        const middle = start + end >>> 1;
        const middleJobId = getId(queue[middle]);
        middleJobId < id ? start = middle + 1 : end = middle;
    }
    return start;
}
function queueJob(job) {
    // the dedupe search uses the startIndex argument of Array.includes()
    // by default the search index includes the current job that is being run
    // so it cannot recursively trigger itself again.
    // if the job is a watch() callback, the search will start with a +1 index to
    // allow it recursively trigger itself - it is the user's responsibility to
    // ensure it doesn't end up in an infinite loop.
    if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
        if (job.id == null) queue.push(job);
        else queue.splice(findInsertionIndex(job.id), 0, job);
        queueFlush();
    }
}
function queueFlush() {
    if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
    }
}
function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) queue.splice(i, 1);
}
function queueCb(cb, activeQueue, pendingQueue, index) {
    if (!_shared.isArray(cb)) {
        if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) pendingQueue.push(cb);
    } else // if cb is an array, it is a component lifecycle hook which can only be
    // triggered by a job, which is already deduped in the main queue, so
    // we can skip duplicate check here to improve perf
    pendingQueue.push(...cb);
    queueFlush();
}
function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
        currentPreFlushParentJob = parentJob;
        activePreFlushCbs = [
            ...new Set(pendingPreFlushCbs)
        ];
        pendingPreFlushCbs.length = 0;
        seen = seen || new Map();
        for(preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++){
            if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) continue;
            activePreFlushCbs[preFlushIndex]();
        }
        activePreFlushCbs = null;
        preFlushIndex = 0;
        currentPreFlushParentJob = null;
        // recursively flush until it drains
        flushPreFlushCbs(seen, parentJob);
    }
}
function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        const deduped = [
            ...new Set(pendingPostFlushCbs)
        ];
        pendingPostFlushCbs.length = 0;
        // #1947 already has active queue, nested flushPostFlushCbs call
        if (activePostFlushCbs) {
            activePostFlushCbs.push(...deduped);
            return;
        }
        activePostFlushCbs = deduped;
        seen = seen || new Map();
        activePostFlushCbs.sort((a, b)=>getId(a) - getId(b)
        );
        for(postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++){
            if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) continue;
            activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}
const getId = (job)=>job.id == null ? Infinity : job.id
;
function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    seen = seen || new Map();
    flushPreFlushCbs(seen);
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child so its render effect will have smaller
    //    priority number)
    // 2. If a component is unmounted during a parent component's update,
    //    its update can be skipped.
    queue.sort((a, b)=>getId(a) - getId(b)
    );
    try {
        for(flushIndex = 0; flushIndex < queue.length; flushIndex++){
            const job = queue[flushIndex];
            if (job && job.active !== false) {
                if (checkRecursiveUpdates(seen, job)) continue;
                // console.log(`running:`, job.id)
                callWithErrorHandling(job, null, 14 /* SCHEDULER */ );
            }
        }
    } finally{
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs(seen);
        isFlushing = false;
        currentFlushPromise = null;
        // some postFlushCb queued jobs!
        // keep flushing until it drains.
        if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) flushJobs(seen);
    }
}
function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) seen.set(fn, 1);
    else {
        const count = seen.get(fn);
        if (count > RECURSION_LIMIT) {
            const instance = fn.ownerInstance;
            const componentName = instance && getComponentName(instance.type);
            warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` + `This means you have a reactive effect that is mutating its own ` + `dependencies and thus recursively triggering itself. Possible sources ` + `include component template, render function, updated hook or ` + `watcher source function.`);
            return true;
        } else seen.set(fn, count + 1);
    }
}
// Simple effect.
function watchEffect(effect, options) {
    return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
    return doWatch(effect, null, Object.assign(options || {
    }, {
        flush: 'post'
    }));
}
function watchSyncEffect(effect, options) {
    return doWatch(effect, null, Object.assign(options || {
    }, {
        flush: 'sync'
    }));
}
// initial value for watchers to trigger on undefined initial values
const INITIAL_WATCHER_VALUE = {
};
// implementation
function watch(source, cb, options) {
    if (!_shared.isFunction(cb)) warn(`\`watch(fn, options?)\` signature has been moved to a separate API. ` + `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` + `supports \`watch(source, cb, options?) signature.`);
    return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate , deep , flush , onTrack , onTrigger  } = _shared.EMPTY_OBJ) {
    if (!cb) {
        if (immediate !== undefined) warn(`watch() "immediate" option is only respected when using the ` + `watch(source, callback, options?) signature.`);
        if (deep !== undefined) warn(`watch() "deep" option is only respected when using the ` + `watch(source, callback, options?) signature.`);
    }
    const warnInvalidSource = (s)=>{
        warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` + `a reactive object, or an array of these types.`);
    };
    const instance = currentInstance;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (_reactivity.isRef(source)) {
        getter = ()=>source.value
        ;
        forceTrigger = !!source._shallow;
    } else if (_reactivity.isReactive(source)) {
        getter = ()=>source
        ;
        deep = true;
    } else if (_shared.isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some(_reactivity.isReactive);
        getter = ()=>source.map((s)=>{
                if (_reactivity.isRef(s)) return s.value;
                else if (_reactivity.isReactive(s)) return traverse(s);
                else if (_shared.isFunction(s)) return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */ );
                else warnInvalidSource(s);
            })
        ;
    } else if (_shared.isFunction(source)) {
        if (cb) // getter with cb
        getter = ()=>callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */ )
        ;
        else // no cb -> simple effect
        getter = ()=>{
            if (instance && instance.isUnmounted) return;
            if (cleanup) cleanup();
            return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */ , [
                onInvalidate
            ]);
        };
    } else {
        getter = _shared.NOOP;
        warnInvalidSource(source);
    }
    if (cb && deep) {
        const baseGetter = getter;
        getter = ()=>traverse(baseGetter())
        ;
    }
    let cleanup;
    let onInvalidate = (fn)=>{
        cleanup = effect.onStop = ()=>{
            callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */ );
        };
    };
    let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    const job = ()=>{
        if (!effect.active) return;
        if (cb) {
            // watch(source, cb)
            const newValue = effect.run();
            if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i)=>_shared.hasChanged(v, oldValue[i])
            ) : _shared.hasChanged(newValue, oldValue)) || false) {
                // cleanup before running cb again
                if (cleanup) cleanup();
                callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */ , [
                    newValue,
                    // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                    onInvalidate
                ]);
                oldValue = newValue;
            }
        } else // watchEffect
        effect.run();
    };
    // important: mark the job as a watcher callback so that scheduler knows
    // it is allowed to self-trigger (#1727)
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === 'sync') scheduler = job; // the scheduler function gets called directly
    else if (flush === 'post') scheduler = ()=>queuePostRenderEffect(job, instance && instance.suspense)
    ;
    else // default: 'pre'
    scheduler = ()=>{
        if (!instance || instance.isMounted) queuePreFlushCb(job);
        else // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job();
    };
    const effect = new _reactivity.ReactiveEffect(getter, scheduler);
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
    // initial run
    if (cb) {
        if (immediate) job();
        else oldValue = effect.run();
    } else if (flush === 'post') queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
    else effect.run();
    return ()=>{
        effect.stop();
        if (instance && instance.scope) _shared.remove(instance.scope.effects, effect);
    };
}
// this.$watch
function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = _shared.isString(source) ? source.includes('.') ? createPathGetter(publicThis, source) : ()=>publicThis[source]
     : source.bind(publicThis, publicThis);
    let cb;
    if (_shared.isFunction(value)) cb = value;
    else {
        cb = value.handler;
        options = value;
    }
    const cur = currentInstance;
    setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) setCurrentInstance(cur);
    else unsetCurrentInstance();
    return res;
}
function createPathGetter(ctx, path) {
    const segments = path.split('.');
    return ()=>{
        let cur = ctx;
        for(let i = 0; i < segments.length && cur; i++)cur = cur[segments[i]];
        return cur;
    };
}
function traverse(value, seen = new Set()) {
    if (!_shared.isObject(value) || value["__v_skip" /* SKIP */ ]) return value;
    seen = seen || new Set();
    if (seen.has(value)) return value;
    seen.add(value);
    if (_reactivity.isRef(value)) traverse(value.value, seen);
    else if (_shared.isArray(value)) for(let i = 0; i < value.length; i++)traverse(value[i], seen);
    else if (_shared.isSet(value) || _shared.isMap(value)) value.forEach((v)=>{
        traverse(v, seen);
    });
    else if (_shared.isPlainObject(value)) for(const key in value)traverse(value[key], seen);
    return value;
}
Object.freeze({
});
Object.freeze([]);
const isFunction = (val)=>typeof val === 'function'
;
const isObject = (val)=>val !== null && typeof val === 'object'
;
const isPromise = (val)=>{
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
// dev only
const warnRuntimeUsage = (method)=>warn(`${method}() is a compiler-hint helper that is only usable inside ` + `<script setup> of a single file component. Its arguments should be ` + `compiled away and passing it at runtime has no effect.`)
;
// implementation
function defineProps() {
    warnRuntimeUsage(`defineProps`);
    return null;
}
// implementation
function defineEmits() {
    warnRuntimeUsage(`defineEmits`);
    return null;
}
/**
 * Vue `<script setup>` compiler macro for declaring a component's exposed
 * instance properties when it is accessed by a parent component via template
 * refs.
 *
 * `<script setup>` components are closed by default - i.e. varaibles inside
 * the `<script setup>` scope is not exposed to parent unless explicitly exposed
 * via `defineExpose`.
 *
 * This is only usable inside `<script setup>`, is compiled away in the
 * output and should **not** be actually called at runtime.
 */ function defineExpose(exposed) {
    warnRuntimeUsage(`defineExpose`);
}
/**
 * Vue `<script setup>` compiler macro for providing props default values when
 * using type-based `defineProps` declaration.
 *
 * Example usage:
 * ```ts
 * withDefaults(defineProps<{
 *   size?: number
 *   labels?: string[]
 * }>(), {
 *   size: 3,
 *   labels: () => ['default label']
 * })
 * ```
 *
 * This is only usable inside `<script setup>`, is compiled away in the output
 * and should **not** be actually called at runtime.
 */ function withDefaults(props, defaults) {
    warnRuntimeUsage(`withDefaults`);
    return null;
}
function useSlots() {
    return getContext().slots;
}
function useAttrs() {
    return getContext().attrs;
}
function getContext() {
    const i = getCurrentInstance();
    if (!i) warn(`useContext() called without active instance.`);
    return i.setupContext || (i.setupContext = createSetupContext(i));
}
/**
 * Runtime helper for merging default declarations. Imported by compiled code
 * only.
 * @internal
 */ function mergeDefaults(// the base props is compiler-generated and guaranteed to be in this shape.
props, defaults) {
    for(const key in defaults){
        const val = props[key];
        if (val) val.default = defaults[key];
        else if (val === null) props[key] = {
            default: defaults[key]
        };
        else warn(`props default key "${key}" has no corresponding declaration.`);
    }
    return props;
}
/**
 * `<script setup>` helper for persisting the current instance context over
 * async/await flows.
 *
 * `@vue/compiler-sfc` converts the following:
 *
 * ```ts
 * const x = await foo()
 * ```
 *
 * into:
 *
 * ```ts
 * let __temp, __restore
 * const x = (([__temp, __restore] = withAsyncContext(() => foo())),__temp=await __temp,__restore(),__temp)
 * ```
 * @internal
 */ function withAsyncContext(getAwaitable) {
    const ctx = getCurrentInstance();
    if (!ctx) warn(`withAsyncContext called without active current instance. ` + `This is likely a bug.`);
    let awaitable = getAwaitable();
    unsetCurrentInstance();
    if (isPromise(awaitable)) awaitable = awaitable.catch((e)=>{
        setCurrentInstance(ctx);
        throw e;
    });
    return [
        awaitable,
        ()=>setCurrentInstance(ctx)
    ];
}
// Actual implementation
function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
        if (_shared.isObject(propsOrChildren) && !_shared.isArray(propsOrChildren)) {
            // single vnode without props
            if (isVNode(propsOrChildren)) return createVNode(type, null, [
                propsOrChildren
            ]);
            // props without children
            return createVNode(type, propsOrChildren);
        } else // omit props
        return createVNode(type, null, propsOrChildren);
    } else {
        if (l > 3) children = Array.prototype.slice.call(arguments, 2);
        else if (l === 3 && isVNode(children)) children = [
            children
        ];
        return createVNode(type, propsOrChildren, children);
    }
}
const ssrContextKey = Symbol(`ssrContext`);
const useSSRContext = ()=>{
    {
        const ctx = inject(ssrContextKey);
        if (!ctx) warn(`Server rendering context not provided. Make sure to only call ` + `useSSRContext() conditionally in the server build.`);
        return ctx;
    }
};
function initCustomFormatter() {
    /* eslint-disable no-restricted-globals */ if (typeof window === 'undefined') return;
    const vueStyle = {
        style: 'color:#3ba776'
    };
    const numberStyle = {
        style: 'color:#0b1bc9'
    };
    const stringStyle = {
        style: 'color:#b62e24'
    };
    const keywordStyle = {
        style: 'color:#9d288c'
    };
    // custom formatter for Chrome
    // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
    const formatter = {
        header (obj) {
            // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
            if (!_shared.isObject(obj)) return null;
            if (obj.__isVue) return [
                'div',
                vueStyle,
                `VueInstance`
            ];
            else if (_reactivity.isRef(obj)) return [
                'div',
                {
                },
                [
                    'span',
                    vueStyle,
                    genRefFlag(obj)
                ],
                '<',
                formatValue(obj.value),
                `>`
            ];
            else if (_reactivity.isReactive(obj)) return [
                'div',
                {
                },
                [
                    'span',
                    vueStyle,
                    'Reactive'
                ],
                '<',
                formatValue(obj),
                `>${_reactivity.isReadonly(obj) ? ` (readonly)` : ``}`
            ];
            else if (_reactivity.isReadonly(obj)) return [
                'div',
                {
                },
                [
                    'span',
                    vueStyle,
                    'Readonly'
                ],
                '<',
                formatValue(obj),
                '>'
            ];
            return null;
        },
        hasBody (obj) {
            return obj && obj.__isVue;
        },
        body (obj) {
            if (obj && obj.__isVue) return [
                'div',
                {
                },
                ...formatInstance(obj.$)
            ];
        }
    };
    function formatInstance(instance) {
        const blocks = [];
        if (instance.type.props && instance.props) blocks.push(createInstanceBlock('props', _reactivity.toRaw(instance.props)));
        if (instance.setupState !== _shared.EMPTY_OBJ) blocks.push(createInstanceBlock('setup', instance.setupState));
        if (instance.data !== _shared.EMPTY_OBJ) blocks.push(createInstanceBlock('data', _reactivity.toRaw(instance.data)));
        const computed = extractKeys(instance, 'computed');
        if (computed) blocks.push(createInstanceBlock('computed', computed));
        const injected = extractKeys(instance, 'inject');
        if (injected) blocks.push(createInstanceBlock('injected', injected));
        blocks.push([
            'div',
            {
            },
            [
                'span',
                {
                    style: keywordStyle.style + ';opacity:0.66'
                },
                '$ (internal): '
            ],
            [
                'object',
                {
                    object: instance
                }
            ]
        ]);
        return blocks;
    }
    function createInstanceBlock(type, target) {
        target = _shared.extend({
        }, target);
        if (!Object.keys(target).length) return [
            'span',
            {
            }
        ];
        return [
            'div',
            {
                style: 'line-height:1.25em;margin-bottom:0.6em'
            },
            [
                'div',
                {
                    style: 'color:#476582'
                },
                type
            ],
            [
                'div',
                {
                    style: 'padding-left:1.25em'
                },
                ...Object.keys(target).map((key)=>{
                    return [
                        'div',
                        {
                        },
                        [
                            'span',
                            keywordStyle,
                            key + ': '
                        ],
                        formatValue(target[key], false)
                    ];
                })
            ]
        ];
    }
    function formatValue(v, asRaw = true) {
        if (typeof v === 'number') return [
            'span',
            numberStyle,
            v
        ];
        else if (typeof v === 'string') return [
            'span',
            stringStyle,
            JSON.stringify(v)
        ];
        else if (typeof v === 'boolean') return [
            'span',
            keywordStyle,
            v
        ];
        else if (_shared.isObject(v)) return [
            'object',
            {
                object: asRaw ? _reactivity.toRaw(v) : v
            }
        ];
        else return [
            'span',
            stringStyle,
            String(v)
        ];
    }
    function extractKeys(instance, type) {
        const Comp = instance.type;
        if (_shared.isFunction(Comp)) return;
        const extracted = {
        };
        for(const key in instance.ctx)if (isKeyOfType(Comp, key, type)) extracted[key] = instance.ctx[key];
        return extracted;
    }
    function isKeyOfType(Comp, key, type) {
        const opts = Comp[type];
        if (_shared.isArray(opts) && opts.includes(key) || _shared.isObject(opts) && key in opts) return true;
        if (Comp.extends && isKeyOfType(Comp.extends, key, type)) return true;
        if (Comp.mixins && Comp.mixins.some((m)=>isKeyOfType(m, key, type)
        )) return true;
    }
    function genRefFlag(v) {
        if (v._shallow) return `ShallowRef`;
        if (v.effect) return `ComputedRef`;
        return `Ref`;
    }
    if (window.devtoolsFormatters) window.devtoolsFormatters.push(formatter);
    else window.devtoolsFormatters = [
        formatter
    ];
}
function withMemo(memo, render, cache, index) {
    const cached = cache[index];
    if (cached && isMemoSame(cached, memo)) return cached;
    const ret = render();
    // shallow clone
    ret.memo = memo.slice();
    return cache[index] = ret;
}
function isMemoSame(cached, memo) {
    const prev = cached.memo;
    if (prev.length != memo.length) return false;
    for(let i = 0; i < prev.length; i++){
        if (prev[i] !== memo[i]) return false;
    }
    // make sure to let parent block track it when returning cached
    if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(cached);
    return true;
}
// Core API ------------------------------------------------------------------
const version = "3.2.11";
const _ssrUtils = {
    createComponentInstance,
    setupComponent,
    renderComponentRoot,
    setCurrentRenderingInstance,
    isVNode,
    normalizeVNode
};
/**
 * SSR utils for \@vue/server-renderer. Only exposed in cjs builds.
 * @internal
 */ const ssrUtils = _ssrUtils;
/**
 * @internal only exposed in compat builds
 */ const resolveFilter = null;
/**
 * @internal only exposed in compat builds.
 */ const compatUtils = null;

},{"@vue/reactivity":"8HAvF","@vue/shared":"8bcX0","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"8HAvF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EffectScope", ()=>EffectScope
);
parcelHelpers.export(exports, "ITERATE_KEY", ()=>ITERATE_KEY
);
parcelHelpers.export(exports, "ReactiveEffect", ()=>ReactiveEffect
);
parcelHelpers.export(exports, "computed", ()=>computed
);
parcelHelpers.export(exports, "customRef", ()=>customRef
);
parcelHelpers.export(exports, "deferredComputed", ()=>deferredComputed
);
parcelHelpers.export(exports, "effect", ()=>effect
);
parcelHelpers.export(exports, "effectScope", ()=>effectScope
);
parcelHelpers.export(exports, "enableTracking", ()=>enableTracking
);
parcelHelpers.export(exports, "getCurrentScope", ()=>getCurrentScope
);
parcelHelpers.export(exports, "isProxy", ()=>isProxy
);
parcelHelpers.export(exports, "isReactive", ()=>isReactive
);
parcelHelpers.export(exports, "isReadonly", ()=>isReadonly
);
parcelHelpers.export(exports, "isRef", ()=>isRef
);
parcelHelpers.export(exports, "markRaw", ()=>markRaw
);
parcelHelpers.export(exports, "onScopeDispose", ()=>onScopeDispose
);
parcelHelpers.export(exports, "pauseTracking", ()=>pauseTracking
);
parcelHelpers.export(exports, "proxyRefs", ()=>proxyRefs
);
parcelHelpers.export(exports, "reactive", ()=>reactive
);
parcelHelpers.export(exports, "readonly", ()=>readonly
);
parcelHelpers.export(exports, "ref", ()=>ref
);
parcelHelpers.export(exports, "resetTracking", ()=>resetTracking
);
parcelHelpers.export(exports, "shallowReactive", ()=>shallowReactive
);
parcelHelpers.export(exports, "shallowReadonly", ()=>shallowReadonly
);
parcelHelpers.export(exports, "shallowRef", ()=>shallowRef
);
parcelHelpers.export(exports, "stop", ()=>stop
);
parcelHelpers.export(exports, "toRaw", ()=>toRaw
);
parcelHelpers.export(exports, "toRef", ()=>toRef
);
parcelHelpers.export(exports, "toRefs", ()=>toRefs
);
parcelHelpers.export(exports, "track", ()=>track
);
parcelHelpers.export(exports, "trigger", ()=>trigger
);
parcelHelpers.export(exports, "triggerRef", ()=>triggerRef
);
parcelHelpers.export(exports, "unref", ()=>unref
);
var _shared = require("@vue/shared");
function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
const effectScopeStack = [];
class EffectScope {
    constructor(detached = false){
        this.active = true;
        this.effects = [];
        this.cleanups = [];
        if (!detached && activeEffectScope) {
            this.parent = activeEffectScope;
            this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
    }
    run(fn) {
        if (this.active) try {
            this.on();
            return fn();
        } finally{
            this.off();
        }
        else warn(`cannot run an inactive effect scope.`);
    }
    on() {
        if (this.active) {
            effectScopeStack.push(this);
            activeEffectScope = this;
        }
    }
    off() {
        if (this.active) {
            effectScopeStack.pop();
            activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
        }
    }
    stop(fromParent) {
        if (this.active) {
            this.effects.forEach((e)=>e.stop()
            );
            this.cleanups.forEach((cleanup)=>cleanup()
            );
            if (this.scopes) this.scopes.forEach((e)=>e.stop(true)
            );
            // nested scope, dereference from parent to avoid memory leaks
            if (this.parent && !fromParent) {
                // optimized O(1) removal
                const last = this.parent.scopes.pop();
                if (last && last !== this) {
                    this.parent.scopes[this.index] = last;
                    last.index = this.index;
                }
            }
            this.active = false;
        }
    }
}
function effectScope(detached1) {
    return new EffectScope(detached1);
}
function recordEffectScope(effect, scope) {
    scope = scope || activeEffectScope;
    if (scope && scope.active) scope.effects.push(effect);
}
function getCurrentScope() {
    return activeEffectScope;
}
function onScopeDispose(fn) {
    if (activeEffectScope) activeEffectScope.cleanups.push(fn);
    else warn(`onScopeDispose() is called when there is no active effect scope` + ` to be associated with.`);
}
const createDep = (effects)=>{
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
};
const wasTracked = (dep)=>(dep.w & trackOpBit) > 0
;
const newTracked = (dep)=>(dep.n & trackOpBit) > 0
;
const initDepMarkers = ({ deps  })=>{
    if (deps.length) for(let i = 0; i < deps.length; i++)deps[i].w |= trackOpBit; // set was tracked
};
const finalizeDepMarkers = (effect)=>{
    const { deps  } = effect;
    if (deps.length) {
        let ptr = 0;
        for(let i = 0; i < deps.length; i++){
            const dep = deps[i];
            if (wasTracked(dep) && !newTracked(dep)) dep.delete(effect);
            else deps[ptr++] = dep;
            // clear bits
            dep.w &= ~trackOpBit;
            dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
    }
};
const targetMap = new WeakMap();
// The number of effects currently being tracked recursively.
let effectTrackDepth = 0;
let trackOpBit = 1;
/**
 * The bitwise track markers support at most 30 levels op recursion.
 * This value is chosen to enable modern JS engines to use a SMI on all platforms.
 * When recursion depth is greater, fall back to using a full cleanup.
 */ const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol('iterate');
const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate');
class ReactiveEffect {
    constructor(fn, scheduler = null, scope){
        this.fn = fn;
        this.scheduler = scheduler;
        this.active = true;
        this.deps = [];
        recordEffectScope(this, scope);
    }
    run() {
        if (!this.active) return this.fn();
        if (!effectStack.includes(this)) try {
            effectStack.push(activeEffect = this);
            enableTracking();
            trackOpBit = 1 << ++effectTrackDepth;
            if (effectTrackDepth <= maxMarkerBits) initDepMarkers(this);
            else cleanupEffect(this);
            return this.fn();
        } finally{
            if (effectTrackDepth <= maxMarkerBits) finalizeDepMarkers(this);
            trackOpBit = 1 << --effectTrackDepth;
            resetTracking();
            effectStack.pop();
            const n = effectStack.length;
            activeEffect = n > 0 ? effectStack[n - 1] : undefined;
        }
    }
    stop() {
        if (this.active) {
            cleanupEffect(this);
            if (this.onStop) this.onStop();
            this.active = false;
        }
    }
}
function cleanupEffect(effect) {
    const { deps  } = effect;
    if (deps.length) {
        for(let i = 0; i < deps.length; i++)deps[i].delete(effect);
        deps.length = 0;
    }
}
function effect(fn1, options) {
    if (fn1.effect) fn1 = fn1.effect.fn;
    const _effect = new ReactiveEffect(fn1);
    if (options) {
        _shared.extend(_effect, options);
        if (options.scope) recordEffectScope(_effect, options.scope);
    }
    if (!options || !options.lazy) _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}
function stop(runner) {
    runner.effect.stop();
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
}
function track(target, type, key) {
    if (!isTracking()) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) targetMap.set(target, depsMap = new Map());
    let dep = depsMap.get(key);
    if (!dep) depsMap.set(key, dep = createDep());
    const eventInfo = {
        effect: activeEffect,
        target,
        type,
        key
    };
    trackEffects(dep, eventInfo);
}
function isTracking() {
    return shouldTrack && activeEffect !== undefined;
}
function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack1 = false;
    if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
            dep.n |= trackOpBit; // set newly tracked
            shouldTrack1 = !wasTracked(dep);
        }
    } else // Full cleanup mode.
    shouldTrack1 = !dep.has(activeEffect);
    if (shouldTrack1) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if (activeEffect.onTrack) activeEffect.onTrack(Object.assign({
            effect: activeEffect
        }, debuggerEventExtraInfo));
    }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) // never been tracked
    return;
    let deps = [];
    if (type === "clear" /* CLEAR */ ) // collection being cleared
    // trigger all effects for target
    deps = [
        ...depsMap.values()
    ];
    else if (key === 'length' && _shared.isArray(target)) depsMap.forEach((dep, key1)=>{
        if (key1 === 'length' || key1 >= newValue) deps.push(dep);
    });
    else {
        // schedule runs for SET | ADD | DELETE
        if (key !== void 0) deps.push(depsMap.get(key));
        // also run for iteration key on ADD | DELETE | Map.SET
        switch(type){
            case "add" /* ADD */ :
                if (!_shared.isArray(target)) {
                    deps.push(depsMap.get(ITERATE_KEY));
                    if (_shared.isMap(target)) deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                } else if (_shared.isIntegerKey(key)) // new index added to array -> length changes
                deps.push(depsMap.get('length'));
                break;
            case "delete" /* DELETE */ :
                if (!_shared.isArray(target)) {
                    deps.push(depsMap.get(ITERATE_KEY));
                    if (_shared.isMap(target)) deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                }
                break;
            case "set" /* SET */ :
                if (_shared.isMap(target)) deps.push(depsMap.get(ITERATE_KEY));
                break;
        }
    }
    const eventInfo = {
        target,
        type,
        key,
        newValue,
        oldValue,
        oldTarget
    };
    if (deps.length === 1) {
        if (deps[0]) triggerEffects(deps[0], eventInfo);
    } else {
        const effects = [];
        for (const dep of deps)if (dep) effects.push(...dep);
        triggerEffects(createDep(effects), eventInfo);
    }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
    // spread into array for stabilization
    for (const effect1 of _shared.isArray(dep) ? dep : [
        ...dep
    ])if (effect1 !== activeEffect || effect1.allowRecurse) {
        if (effect1.onTrigger) effect1.onTrigger(_shared.extend({
            effect: effect1
        }, debuggerEventExtraInfo));
        if (effect1.scheduler) effect1.scheduler();
        else effect1.run();
    }
}
const isNonTrackableKeys = /*#__PURE__*/ _shared.makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key)=>Symbol[key]
).filter(_shared.isSymbol));
const get = /*#__PURE__*/ createGetter();
const shallowGet = /*#__PURE__*/ createGetter(false, true);
const readonlyGet = /*#__PURE__*/ createGetter(true);
const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations();
function createArrayInstrumentations() {
    const instrumentations = {
    };
    [
        'includes',
        'indexOf',
        'lastIndexOf'
    ].forEach((key)=>{
        instrumentations[key] = function(...args) {
            const arr = toRaw(this);
            for(let i = 0, l = this.length; i < l; i++)track(arr, "get" /* GET */ , i + '');
            // we run the method using the original args first (which may be reactive)
            const res = arr[key](...args);
            if (res === -1 || res === false) // if that didn't work, run it again using raw values.
            return arr[key](...args.map(toRaw));
            else return res;
        };
    });
    [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice'
    ].forEach((key)=>{
        instrumentations[key] = function(...args) {
            pauseTracking();
            const res = toRaw(this)[key].apply(this, args);
            resetTracking();
            return res;
        };
    });
    return instrumentations;
}
function createGetter(isReadonly = false, shallow = false) {
    return function get1(target, key, receiver) {
        if (key === "__v_isReactive" /* IS_REACTIVE */ ) return !isReadonly;
        else if (key === "__v_isReadonly" /* IS_READONLY */ ) return isReadonly;
        else if (key === "__v_raw" /* RAW */  && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) return target;
        const targetIsArray = _shared.isArray(target);
        if (!isReadonly && targetIsArray && _shared.hasOwn(arrayInstrumentations, key)) return Reflect.get(arrayInstrumentations, key, receiver);
        const res = Reflect.get(target, key, receiver);
        if (_shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
        if (!isReadonly) track(target, "get" /* GET */ , key);
        if (shallow) return res;
        if (isRef(res)) {
            // ref unwrapping - does not apply for Array + integer key.
            const shouldUnwrap = !targetIsArray || !_shared.isIntegerKey(key);
            return shouldUnwrap ? res.value : res;
        }
        if (_shared.isObject(res)) // Convert returned value into a proxy as well. we do the isObject check
        // here to avoid invalid value warning. Also need to lazy access readonly
        // and reactive here to avoid circular dependency.
        return isReadonly ? readonly(res) : reactive(res);
        return res;
    };
}
const set = /*#__PURE__*/ createSetter();
const shallowSet = /*#__PURE__*/ createSetter(true);
function createSetter(shallow = false) {
    return function set1(target, key, value, receiver) {
        let oldValue = target[key];
        if (!shallow) {
            value = toRaw(value);
            oldValue = toRaw(oldValue);
            if (!_shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
        }
        const hadKey = _shared.isArray(target) && _shared.isIntegerKey(key) ? Number(key) < target.length : _shared.hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        // don't trigger if target is something up in the prototype chain of original
        if (target === toRaw(receiver)) {
            if (!hadKey) trigger(target, "add" /* ADD */ , key, value);
            else if (_shared.hasChanged(value, oldValue)) trigger(target, "set" /* SET */ , key, value, oldValue);
        }
        return result;
    };
}
function deleteProperty(target, key) {
    const hadKey = _shared.hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) trigger(target, "delete" /* DELETE */ , key, undefined, oldValue);
    return result;
}
function has(target, key) {
    const result = Reflect.has(target, key);
    if (!_shared.isSymbol(key) || !builtInSymbols.has(key)) track(target, "has" /* HAS */ , key);
    return result;
}
function ownKeys(target) {
    track(target, "iterate" /* ITERATE */ , _shared.isArray(target) ? 'length' : ITERATE_KEY);
    return Reflect.ownKeys(target);
}
const mutableHandlers = {
    get,
    set,
    deleteProperty,
    has,
    ownKeys
};
const readonlyHandlers = {
    get: readonlyGet,
    set (target, key) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        return true;
    },
    deleteProperty (target, key) {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        return true;
    }
};
const shallowReactiveHandlers = /*#__PURE__*/ _shared.extend({
}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
});
// Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.
const shallowReadonlyHandlers = /*#__PURE__*/ _shared.extend({
}, readonlyHandlers, {
    get: shallowReadonlyGet
});
const toReactive = (value)=>_shared.isObject(value) ? reactive(value) : value
;
const toReadonly = (value)=>_shared.isObject(value) ? readonly(value) : value
;
const toShallow = (value)=>value
;
const getProto = (v)=>Reflect.getPrototypeOf(v)
;
function get$1(target, key, isReadonly = false, isShallow = false) {
    // #1772: readonly(reactive(Map)) should return readonly + reactive version
    // of the value
    target = target["__v_raw" /* RAW */ ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) !isReadonly && track(rawTarget, "get" /* GET */ , key);
    !isReadonly && track(rawTarget, "get" /* GET */ , rawKey);
    const { has: has1  } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has1.call(rawTarget, key)) return wrap(target.get(key));
    else if (has1.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
    else if (target !== rawTarget) // #3602 readonly(reactive(Map))
    // ensure that the nested reactive `Map` can do tracking for itself
    target.get(key);
}
function has$1(key, isReadonly = false) {
    const target = this["__v_raw" /* RAW */ ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) !isReadonly && track(rawTarget, "has" /* HAS */ , key);
    !isReadonly && track(rawTarget, "has" /* HAS */ , rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
    target = target["__v_raw" /* RAW */ ];
    !isReadonly && track(toRaw(target), "iterate" /* ITERATE */ , ITERATE_KEY);
    return Reflect.get(target, 'size', target);
}
function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
        target.add(value);
        trigger(target, "add" /* ADD */ , value, value);
    }
    return this;
}
function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has1 , get: get1  } = getProto(target);
    let hadKey = has1.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has1.call(target, key);
    } else checkIdentityKeys(target, has1, key);
    const oldValue = get1.call(target, key);
    target.set(key, value);
    if (!hadKey) trigger(target, "add" /* ADD */ , key, value);
    else if (_shared.hasChanged(value, oldValue)) trigger(target, "set" /* SET */ , key, value, oldValue);
    return this;
}
function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has1 , get: get1  } = getProto(target);
    let hadKey = has1.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has1.call(target, key);
    } else checkIdentityKeys(target, has1, key);
    const oldValue = get1 ? get1.call(target, key) : undefined;
    // forward the operation before queueing reactions
    const result = target.delete(key);
    if (hadKey) trigger(target, "delete" /* DELETE */ , key, undefined, oldValue);
    return result;
}
function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = _shared.isMap(target) ? new Map(target) : new Set(target);
    // forward the operation before queueing reactions
    const result = target.clear();
    if (hadItems) trigger(target, "clear" /* CLEAR */ , undefined, undefined, oldTarget);
    return result;
}
function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw" /* RAW */ ];
        const rawTarget = toRaw(target);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly && track(rawTarget, "iterate" /* ITERATE */ , ITERATE_KEY);
        return target.forEach((value, key)=>{
            // important: make sure the callback is
            // 1. invoked with the reactive map as `this` and 3rd arg
            // 2. the value received should be a corresponding reactive/readonly.
            return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
    };
}
function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
        const target = this["__v_raw" /* RAW */ ];
        const rawTarget = toRaw(target);
        const targetIsMap = _shared.isMap(rawTarget);
        const isPair = method === 'entries' || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === 'keys' && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        !isReadonly && track(rawTarget, "iterate" /* ITERATE */ , isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        // return a wrapped iterator which returns observed versions of the
        // values emitted from the real iterator
        return {
            // iterator protocol
            next () {
                const { value , done  } = innerIterator.next();
                return done ? {
                    value,
                    done
                } : {
                    value: isPair ? [
                        wrap(value[0]),
                        wrap(value[1])
                    ] : wrap(value),
                    done
                };
            },
            // iterable protocol
            [Symbol.iterator] () {
                return this;
            }
        };
    };
}
function createReadonlyMethod(type) {
    return function(...args) {
        {
            const key = args[0] ? `on key "${args[0]}" ` : ``;
            console.warn(`${_shared.capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
        }
        return type === "delete" /* DELETE */  ? false : this;
    };
}
function createInstrumentations() {
    const mutableInstrumentations = {
        get (key) {
            return get$1(this, key);
        },
        get size () {
            return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
    };
    const shallowInstrumentations = {
        get (key) {
            return get$1(this, key, false, true);
        },
        get size () {
            return size(this);
        },
        has: has$1,
        add,
        set: set$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
    };
    const readonlyInstrumentations = {
        get (key) {
            return get$1(this, key, true);
        },
        get size () {
            return size(this, true);
        },
        has (key) {
            return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add" /* ADD */ ),
        set: createReadonlyMethod("set" /* SET */ ),
        delete: createReadonlyMethod("delete" /* DELETE */ ),
        clear: createReadonlyMethod("clear" /* CLEAR */ ),
        forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations = {
        get (key) {
            return get$1(this, key, true, true);
        },
        get size () {
            return size(this, true);
        },
        has (key) {
            return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add" /* ADD */ ),
        set: createReadonlyMethod("set" /* SET */ ),
        delete: createReadonlyMethod("delete" /* DELETE */ ),
        clear: createReadonlyMethod("clear" /* CLEAR */ ),
        forEach: createForEach(true, true)
    };
    const iteratorMethods = [
        'keys',
        'values',
        'entries',
        Symbol.iterator
    ];
    iteratorMethods.forEach((method)=>{
        mutableInstrumentations[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations[method] = createIterableMethod(method, true, false);
        shallowInstrumentations[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
    });
    return [
        mutableInstrumentations,
        readonlyInstrumentations,
        shallowInstrumentations,
        shallowReadonlyInstrumentations
    ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* #__PURE__*/ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver)=>{
        if (key === "__v_isReactive" /* IS_REACTIVE */ ) return !isReadonly;
        else if (key === "__v_isReadonly" /* IS_READONLY */ ) return isReadonly;
        else if (key === "__v_raw" /* RAW */ ) return target;
        return Reflect.get(_shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
}
const mutableCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
    get: /*#__PURE__*/ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has1, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has1.call(target, rawKey)) {
        const type = _shared.toRawType(target);
        console.warn(`Reactive ${type} contains both the raw and reactive ` + `versions of the same object${type === `Map` ? ` as keys` : ``}, ` + `which can lead to inconsistencies. ` + `Avoid differentiating between the raw and reactive versions ` + `of an object and only use the reactive version if possible.`);
    }
}
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
    switch(rawType){
        case 'Object':
        case 'Array':
            return 1 /* COMMON */ ;
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return 2 /* COLLECTION */ ;
        default:
            return 0 /* INVALID */ ;
    }
}
function getTargetType(value) {
    return value["__v_skip" /* SKIP */ ] || !Object.isExtensible(value) ? 0 /* INVALID */  : targetTypeMap(_shared.toRawType(value));
}
function reactive(target) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (target && target["__v_isReadonly" /* IS_READONLY */ ]) return target;
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */ function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */ function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */ function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!_shared.isObject(target)) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
        return target;
    }
    // target is already a Proxy, return it.
    // exception: calling readonly() on a reactive object
    if (target["__v_raw" /* RAW */ ] && !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */ ])) return target;
    // target already has corresponding Proxy
    const existingProxy = proxyMap.get(target);
    if (existingProxy) return existingProxy;
    // only a whitelist of value types can be observed.
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */ ) return target;
    const proxy = new Proxy(target, targetType === 2 /* COLLECTION */  ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
function isReactive(value) {
    if (isReadonly(value)) return isReactive(value["__v_raw" /* RAW */ ]);
    return !!(value && value["__v_isReactive" /* IS_REACTIVE */ ]);
}
function isReadonly(value) {
    return !!(value && value["__v_isReadonly" /* IS_READONLY */ ]);
}
function isProxy(value) {
    return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
    const raw = observed && observed["__v_raw" /* RAW */ ];
    return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
    _shared.def(value, "__v_skip" /* SKIP */ , true);
    return value;
}
function trackRefValue(ref) {
    if (isTracking()) {
        ref = toRaw(ref);
        if (!ref.dep) ref.dep = createDep();
        trackEffects(ref.dep, {
            target: ref,
            type: "get" /* GET */ ,
            key: 'value'
        });
    }
}
function triggerRefValue(ref, newVal) {
    ref = toRaw(ref);
    if (ref.dep) triggerEffects(ref.dep, {
        target: ref,
        type: "set" /* SET */ ,
        key: 'value',
        newValue: newVal
    });
}
const convert = (val)=>_shared.isObject(val) ? reactive(val) : val
;
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
function ref(value) {
    return createRef(value, false);
}
function shallowRef(value) {
    return createRef(value, true);
}
class RefImpl {
    constructor(value, _shallow){
        this._shallow = _shallow;
        this.dep = undefined;
        this.__v_isRef = true;
        this._rawValue = _shallow ? value : toRaw(value);
        this._value = _shallow ? value : convert(value);
    }
    get value() {
        trackRefValue(this);
        return this._value;
    }
    set value(newVal) {
        newVal = this._shallow ? newVal : toRaw(newVal);
        if (_shared.hasChanged(newVal, this._rawValue)) {
            this._rawValue = newVal;
            this._value = this._shallow ? newVal : convert(newVal);
            triggerRefValue(this, newVal);
        }
    }
}
function createRef(rawValue, shallow) {
    if (isRef(rawValue)) return rawValue;
    return new RefImpl(rawValue, shallow);
}
function triggerRef(ref1) {
    triggerRefValue(ref1, ref1.value);
}
function unref(ref1) {
    return isRef(ref1) ? ref1.value : ref1;
}
const shallowUnwrapHandlers = {
    get: (target, key, receiver)=>unref(Reflect.get(target, key, receiver))
    ,
    set: (target, key, value1, receiver)=>{
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value1)) {
            oldValue.value = value1;
            return true;
        } else return Reflect.set(target, key, value1, receiver);
    }
};
function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
    constructor(factory){
        this.dep = undefined;
        this.__v_isRef = true;
        const { get: get1 , set: set1  } = factory(()=>trackRefValue(this)
        , ()=>triggerRefValue(this)
        );
        this._get = get1;
        this._set = set1;
    }
    get value() {
        return this._get();
    }
    set value(newVal) {
        this._set(newVal);
    }
}
function customRef(factory1) {
    return new CustomRefImpl(factory1);
}
function toRefs(object) {
    if (!isProxy(object)) console.warn(`toRefs() expects a reactive object but received a plain one.`);
    const ret = _shared.isArray(object) ? new Array(object.length) : {
    };
    for(const key in object)ret[key] = toRef(object, key);
    return ret;
}
class ObjectRefImpl {
    constructor(_object, _key){
        this._object = _object;
        this._key = _key;
        this.__v_isRef = true;
    }
    get value() {
        return this._object[this._key];
    }
    set value(newVal) {
        this._object[this._key] = newVal;
    }
}
function toRef(object, key) {
    const val = object[key];
    return isRef(val) ? val : new ObjectRefImpl(object, key);
}
class ComputedRefImpl {
    constructor(getter, _setter, isReadonly1){
        this._setter = _setter;
        this.dep = undefined;
        this._dirty = true;
        this.__v_isRef = true;
        this.effect = new ReactiveEffect(getter, ()=>{
            if (!this._dirty) {
                this._dirty = true;
                triggerRefValue(this);
            }
        });
        this["__v_isReadonly" /* IS_READONLY */ ] = isReadonly1;
    }
    get value() {
        // the computed ref may get wrapped by other proxies e.g. readonly() #3376
        const self = toRaw(this);
        trackRefValue(self);
        if (self._dirty) {
            self._dirty = false;
            self._value = self.effect.run();
        }
        return self._value;
    }
    set value(newValue) {
        this._setter(newValue);
    }
}
function computed(getterOrOptions, debugOptions) {
    let getter1;
    let setter;
    if (_shared.isFunction(getterOrOptions)) {
        getter1 = getterOrOptions;
        setter = ()=>{
            console.warn('Write operation failed: computed value is readonly');
        };
    } else {
        getter1 = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter1, setter, _shared.isFunction(getterOrOptions) || !getterOrOptions.set);
    if (debugOptions) {
        cRef.effect.onTrack = debugOptions.onTrack;
        cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
}
var _a;
const tick = Promise.resolve();
const queue = [];
let queued = false;
const scheduler1 = (fn1)=>{
    queue.push(fn1);
    if (!queued) {
        queued = true;
        tick.then(flush);
    }
};
const flush = ()=>{
    for(let i = 0; i < queue.length; i++)queue[i]();
    queue.length = 0;
    queued = false;
};
class DeferredComputedRefImpl {
    constructor(getter1){
        this.dep = undefined;
        this._dirty = true;
        this.__v_isRef = true;
        this[_a] = true;
        let compareTarget;
        let hasCompareTarget = false;
        let scheduled = false;
        this.effect = new ReactiveEffect(getter1, (computedTrigger)=>{
            if (this.dep) {
                if (computedTrigger) {
                    compareTarget = this._value;
                    hasCompareTarget = true;
                } else if (!scheduled) {
                    const valueToCompare = hasCompareTarget ? compareTarget : this._value;
                    scheduled = true;
                    hasCompareTarget = false;
                    scheduler1(()=>{
                        if (this.effect.active && this._get() !== valueToCompare) triggerRefValue(this);
                        scheduled = false;
                    });
                }
                // chained upstream computeds are notified synchronously to ensure
                // value invalidation in case of sync access; normal effects are
                // deferred to be triggered in scheduler.
                for (const e of this.dep)if (e.computed) e.scheduler(true);
            }
            this._dirty = true;
        });
        this.effect.computed = true;
    }
    _get() {
        if (this._dirty) {
            this._dirty = false;
            return this._value = this.effect.run();
        }
        return this._value;
    }
    get value() {
        trackRefValue(this);
        // the computed ref may get wrapped by other proxies e.g. readonly() #3376
        return toRaw(this)._get();
    }
}
_a = "__v_isReadonly" /* IS_READONLY */ ;
function deferredComputed(getter2) {
    return new DeferredComputedRefImpl(getter2);
}

},{"@vue/shared":"8bcX0","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"8bcX0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EMPTY_ARR", ()=>EMPTY_ARR
);
parcelHelpers.export(exports, "EMPTY_OBJ", ()=>EMPTY_OBJ
);
parcelHelpers.export(exports, "NO", ()=>NO
);
parcelHelpers.export(exports, "NOOP", ()=>NOOP
);
parcelHelpers.export(exports, "PatchFlagNames", ()=>PatchFlagNames
);
parcelHelpers.export(exports, "babelParserDefaultPlugins", ()=>babelParserDefaultPlugins
);
parcelHelpers.export(exports, "camelize", ()=>camelize
);
parcelHelpers.export(exports, "capitalize", ()=>capitalize
);
parcelHelpers.export(exports, "def", ()=>def
);
parcelHelpers.export(exports, "escapeHtml", ()=>escapeHtml
);
parcelHelpers.export(exports, "escapeHtmlComment", ()=>escapeHtmlComment
);
parcelHelpers.export(exports, "extend", ()=>extend
);
parcelHelpers.export(exports, "generateCodeFrame", ()=>generateCodeFrame
);
parcelHelpers.export(exports, "getGlobalThis", ()=>getGlobalThis
);
parcelHelpers.export(exports, "hasChanged", ()=>hasChanged
);
parcelHelpers.export(exports, "hasOwn", ()=>hasOwn
);
parcelHelpers.export(exports, "hyphenate", ()=>hyphenate
);
parcelHelpers.export(exports, "includeBooleanAttr", ()=>includeBooleanAttr
);
parcelHelpers.export(exports, "invokeArrayFns", ()=>invokeArrayFns
);
parcelHelpers.export(exports, "isArray", ()=>isArray
);
parcelHelpers.export(exports, "isBooleanAttr", ()=>isBooleanAttr
);
parcelHelpers.export(exports, "isDate", ()=>isDate
);
parcelHelpers.export(exports, "isFunction", ()=>isFunction
);
parcelHelpers.export(exports, "isGloballyWhitelisted", ()=>isGloballyWhitelisted
);
parcelHelpers.export(exports, "isHTMLTag", ()=>isHTMLTag
);
parcelHelpers.export(exports, "isIntegerKey", ()=>isIntegerKey
);
parcelHelpers.export(exports, "isKnownHtmlAttr", ()=>isKnownHtmlAttr
);
parcelHelpers.export(exports, "isKnownSvgAttr", ()=>isKnownSvgAttr
);
parcelHelpers.export(exports, "isMap", ()=>isMap
);
parcelHelpers.export(exports, "isModelListener", ()=>isModelListener
);
parcelHelpers.export(exports, "isNoUnitNumericStyleProp", ()=>isNoUnitNumericStyleProp
);
parcelHelpers.export(exports, "isObject", ()=>isObject
);
parcelHelpers.export(exports, "isOn", ()=>isOn
);
parcelHelpers.export(exports, "isPlainObject", ()=>isPlainObject
);
parcelHelpers.export(exports, "isPromise", ()=>isPromise
);
parcelHelpers.export(exports, "isReservedProp", ()=>isReservedProp
);
parcelHelpers.export(exports, "isSSRSafeAttrName", ()=>isSSRSafeAttrName
);
parcelHelpers.export(exports, "isSVGTag", ()=>isSVGTag
);
parcelHelpers.export(exports, "isSet", ()=>isSet
);
parcelHelpers.export(exports, "isSpecialBooleanAttr", ()=>isSpecialBooleanAttr
);
parcelHelpers.export(exports, "isString", ()=>isString
);
parcelHelpers.export(exports, "isSymbol", ()=>isSymbol
);
parcelHelpers.export(exports, "isVoidTag", ()=>isVoidTag
);
parcelHelpers.export(exports, "looseEqual", ()=>looseEqual
);
parcelHelpers.export(exports, "looseIndexOf", ()=>looseIndexOf
);
parcelHelpers.export(exports, "makeMap", ()=>makeMap
);
parcelHelpers.export(exports, "normalizeClass", ()=>normalizeClass
);
parcelHelpers.export(exports, "normalizeProps", ()=>normalizeProps
);
parcelHelpers.export(exports, "normalizeStyle", ()=>normalizeStyle
);
parcelHelpers.export(exports, "objectToString", ()=>objectToString
);
parcelHelpers.export(exports, "parseStringStyle", ()=>parseStringStyle
);
parcelHelpers.export(exports, "propsToAttrMap", ()=>propsToAttrMap
);
parcelHelpers.export(exports, "remove", ()=>remove
);
parcelHelpers.export(exports, "slotFlagsText", ()=>slotFlagsText
);
parcelHelpers.export(exports, "stringifyStyle", ()=>stringifyStyle
);
parcelHelpers.export(exports, "toDisplayString", ()=>toDisplayString
);
parcelHelpers.export(exports, "toHandlerKey", ()=>toHandlerKey
);
parcelHelpers.export(exports, "toNumber", ()=>toNumber
);
parcelHelpers.export(exports, "toRawType", ()=>toRawType
);
parcelHelpers.export(exports, "toTypeString", ()=>toTypeString
);
var global = arguments[3];
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */ function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for(let i = 0; i < list.length; i++)map[list[i]] = true;
    return expectsLowerCase ? (val)=>!!map[val.toLowerCase()]
     : (val)=>!!map[val]
    ;
}
/**
 * dev only flag -> name mapping
 */ const PatchFlagNames = {
    [1 /* TEXT */ ]: `TEXT`,
    [2 /* CLASS */ ]: `CLASS`,
    [4 /* STYLE */ ]: `STYLE`,
    [8 /* PROPS */ ]: `PROPS`,
    [16 /* FULL_PROPS */ ]: `FULL_PROPS`,
    [32 /* HYDRATE_EVENTS */ ]: `HYDRATE_EVENTS`,
    [64 /* STABLE_FRAGMENT */ ]: `STABLE_FRAGMENT`,
    [128 /* KEYED_FRAGMENT */ ]: `KEYED_FRAGMENT`,
    [256 /* UNKEYED_FRAGMENT */ ]: `UNKEYED_FRAGMENT`,
    [512 /* NEED_PATCH */ ]: `NEED_PATCH`,
    [1024 /* DYNAMIC_SLOTS */ ]: `DYNAMIC_SLOTS`,
    [2048 /* DEV_ROOT_FRAGMENT */ ]: `DEV_ROOT_FRAGMENT`,
    [-1 /* HOISTED */ ]: `HOISTED`,
    [-2 /* BAIL */ ]: `BAIL`
};
/**
 * Dev only
 */ const slotFlagsText = {
    [1 /* STABLE */ ]: 'STABLE',
    [2 /* DYNAMIC */ ]: 'DYNAMIC',
    [3 /* FORWARDED */ ]: 'FORWARDED'
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
    // Split the content into individual lines but capture the newline sequence
    // that separated each line. This is important because the actual sequence is
    // needed to properly take into account the full line length for offset
    // comparison
    let lines = source.split(/(\r?\n)/);
    // Separate the lines and newline sequences into separate arrays for easier referencing
    const newlineSequences = lines.filter((_, idx)=>idx % 2 === 1
    );
    lines = lines.filter((_, idx)=>idx % 2 === 0
    );
    let count = 0;
    const res = [];
    for(let i = 0; i < lines.length; i++){
        count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
        if (count >= start) {
            for(let j = i - range; j <= i + range || end > count; j++){
                if (j < 0 || j >= lines.length) continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
                if (j === i) {
                    // push underline
                    const pad = start - (count - (lineLength + newLineSeqLength));
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                } else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + newLineSeqLength;
                }
            }
            break;
        }
    }
    return res.join('\n');
}
/**
 * On the client we only need to offer special cases for boolean attributes that
 * have different names from their corresponding dom properties:
 * - itemscope -> N/A
 * - allowfullscreen -> allowFullscreen
 * - formnovalidate -> formNoValidate
 * - ismap -> isMap
 * - nomodule -> noModule
 * - novalidate -> noValidate
 * - readonly -> readOnly
 */ const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /*#__PURE__*/ makeMap(specialBooleanAttrs);
/**
 * The full list is needed during SSR to produce the correct initial markup.
 */ const isBooleanAttr = /*#__PURE__*/ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,` + `loop,open,required,reversed,scoped,seamless,` + `checked,muted,multiple,selected`);
/**
 * Boolean attributes should be included if the value is truthy or ''.
 * e.g. <select multiple> compiles to { multiple: '' }
 */ function includeBooleanAttr(value) {
    return !!value || value === '';
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {
};
function isSSRSafeAttrName(name) {
    if (attrValidationCache.hasOwnProperty(name)) return attrValidationCache[name];
    const isUnsafe = unsafeAttrCharRE.test(name);
    if (isUnsafe) console.error(`unsafe attribute name: ${name}`);
    return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
};
/**
 * CSS properties that accept plain numbers
 */ const isNoUnitNumericStyleProp = /*#__PURE__*/ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,` + `border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,` + `columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,` + `grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,` + `grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,` + `line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,` + // SVG
`fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,` + `stroke-miterlimit,stroke-opacity,stroke-width`);
/**
 * Known attributes, this is used for stringification of runtime static nodes
 * so that we don't stringify bindings that cannot be set from HTML.
 * Don't also forget to allow `data-*` and `aria-*`!
 * Generated from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */ const isKnownHtmlAttr = /*#__PURE__*/ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,` + `autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,` + `border,buffered,capture,challenge,charset,checked,cite,class,code,` + `codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,` + `coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,` + `disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,` + `formaction,formenctype,formmethod,formnovalidate,formtarget,headers,` + `height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,` + `ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,` + `manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,` + `open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,` + `referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,` + `selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,` + `start,step,style,summary,tabindex,target,title,translate,type,usemap,` + `value,width,wrap`);
/**
 * Generated from https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 */ const isKnownSvgAttr = /*#__PURE__*/ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,` + `arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,` + `baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,` + `clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,` + `color-interpolation-filters,color-profile,color-rendering,` + `contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,` + `descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,` + `dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,` + `fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,` + `font-family,font-size,font-size-adjust,font-stretch,font-style,` + `font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,` + `glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,` + `gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,` + `horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,` + `k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,` + `lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,` + `marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,` + `mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,` + `name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,` + `overflow,overline-position,overline-thickness,panose-1,paint-order,path,` + `pathLength,patternContentUnits,patternTransform,patternUnits,ping,` + `pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,` + `preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,` + `rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,` + `restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,` + `specularConstant,specularExponent,speed,spreadMethod,startOffset,` + `stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,` + `strikethrough-position,strikethrough-thickness,string,stroke,` + `stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,` + `stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,` + `systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,` + `text-decoration,text-rendering,textLength,to,transform,transform-origin,` + `type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,` + `unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,` + `v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,` + `vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,` + `writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,` + `xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,` + `xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
    if (isArray(value)) {
        const res = {
        };
        for(let i = 0; i < value.length; i++){
            const item = value[i];
            const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
            if (normalized) for(const key in normalized)res[key] = normalized[key];
        }
        return res;
    } else if (isString(value)) return value;
    else if (isObject(value)) return value;
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
    const ret = {
    };
    cssText.split(listDelimiterRE).forEach((item)=>{
        if (item) {
            const tmp = item.split(propertyDelimiterRE);
            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return ret;
}
function stringifyStyle(styles) {
    let ret = '';
    if (!styles || isString(styles)) return ret;
    for(const key in styles){
        const value = styles[key];
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        if (isString(value) || typeof value === 'number' && isNoUnitNumericStyleProp(normalizedKey)) // only render valid values
        ret += `${normalizedKey}:${value};`;
    }
    return ret;
}
function normalizeClass(value) {
    let res = '';
    if (isString(value)) res = value;
    else if (isArray(value)) for(let i = 0; i < value.length; i++){
        const normalized = normalizeClass(value[i]);
        if (normalized) res += normalized + ' ';
    }
    else if (isObject(value)) {
        for(const name in value)if (value[name]) res += name + ' ';
    }
    return res.trim();
}
function normalizeProps(props) {
    if (!props) return null;
    let { class: klass , style  } = props;
    if (klass && !isString(klass)) props.class = normalizeClass(klass);
    if (style) props.style = normalizeStyle(style);
    return props;
}
// These tag configs are shared between compiler-dom and runtime-dom, so they
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';
const isHTMLTag = /*#__PURE__*/ makeMap(HTML_TAGS);
const isSVGTag = /*#__PURE__*/ makeMap(SVG_TAGS);
const isVoidTag = /*#__PURE__*/ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
    const str = '' + string;
    const match = escapeRE.exec(str);
    if (!match) return str;
    let html = '';
    let escaped;
    let index;
    let lastIndex = 0;
    for(index = match.index; index < str.length; index++){
        switch(str.charCodeAt(index)){
            case 34:
                escaped = '&quot;';
                break;
            case 38:
                escaped = '&amp;';
                break;
            case 39:
                escaped = '&#39;';
                break;
            case 60:
                escaped = '&lt;';
                break;
            case 62:
                escaped = '&gt;';
                break;
            default:
                continue;
        }
        if (lastIndex !== index) html += str.substring(lastIndex, index);
        lastIndex = index + 1;
        html += escaped;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// https://www.w3.org/TR/html52/syntax.html#comments
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
    return src.replace(commentStripRE, '');
}
function looseCompareArrays(a, b) {
    if (a.length !== b.length) return false;
    let equal = true;
    for(let i = 0; equal && i < a.length; i++)equal = looseEqual(a[i], b[i]);
    return equal;
}
function looseEqual(a, b) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
        /* istanbul ignore if: this if will probably never be called */ if (!aValidType || !bValidType) return false;
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) return false;
        for(const key in a){
            const aHasKey = a.hasOwnProperty(key);
            const bHasKey = b.hasOwnProperty(key);
            if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) return false;
        }
    }
    return String(a) === String(b);
}
function looseIndexOf(arr, val) {
    return arr.findIndex((item)=>looseEqual(item, val)
    );
}
/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */ const toDisplayString = (val)=>{
    return val == null ? '' : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val)=>{
    // can't use isRef here since @vue/shared has no deps
    if (val && val.__v_isRef) return replacer(_key, val.value);
    else if (isMap(val)) return {
        [`Map(${val.size})`]: [
            ...val.entries()
        ].reduce((entries, [key, val1])=>{
            entries[`${key} =>`] = val1;
            return entries;
        }, {
        })
    };
    else if (isSet(val)) return {
        [`Set(${val.size})`]: [
            ...val.values()
        ]
    };
    else if (isObject(val) && !isArray(val) && !isPlainObject(val)) return String(val);
    return val;
};
/**
 * List of @babel/parser plugins that are used for template expression
 * transforms and SFC script transforms. By default we enable proposals slated
 * for ES2020. This will need to be updated as the spec moves forward.
 * Full list at https://babeljs.io/docs/en/next/babel-parser#plugins
 */ const babelParserDefaultPlugins = [
    'bigInt',
    'optionalChaining',
    'nullishCoalescingOperator'
];
const EMPTY_OBJ = Object.freeze({
});
const EMPTY_ARR = Object.freeze([]);
const NOOP = ()=>{
};
/**
 * Always return false.
 */ const NO = ()=>false
;
const onRE = /^on[^a-z]/;
const isOn = (key)=>onRE.test(key)
;
const isModelListener = (key)=>key.startsWith('onUpdate:')
;
const extend = Object.assign;
const remove = (arr, el)=>{
    const i = arr.indexOf(el);
    if (i > -1) arr.splice(i, 1);
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key)=>hasOwnProperty.call(val, key)
;
const isArray = Array.isArray;
const isMap = (val)=>toTypeString(val) === '[object Map]'
;
const isSet = (val)=>toTypeString(val) === '[object Set]'
;
const isDate = (val)=>val instanceof Date
;
const isFunction = (val)=>typeof val === 'function'
;
const isString = (val)=>typeof val === 'string'
;
const isSymbol = (val)=>typeof val === 'symbol'
;
const isObject = (val)=>val !== null && typeof val === 'object'
;
const isPromise = (val)=>{
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value)=>objectToString.call(value)
;
const toRawType = (value)=>{
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val)=>toTypeString(val) === '[object Object]'
;
const isIntegerKey = (key)=>isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key
;
const isReservedProp = /*#__PURE__*/ makeMap(// the leading comma is intentional so empty string "" is also included
",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn)=>{
    const cache = Object.create(null);
    return (str)=>{
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
};
const camelizeRE = /-(\w)/g;
/**
 * @private
 */ const camelize = cacheStringFunction((str)=>{
    return str.replace(camelizeRE, (_, c)=>c ? c.toUpperCase() : ''
    );
});
const hyphenateRE = /\B([A-Z])/g;
/**
 * @private
 */ const hyphenate = cacheStringFunction((str)=>str.replace(hyphenateRE, '-$1').toLowerCase()
);
/**
 * @private
 */ const capitalize = cacheStringFunction((str)=>str.charAt(0).toUpperCase() + str.slice(1)
);
/**
 * @private
 */ const toHandlerKey = cacheStringFunction((str)=>str ? `on${capitalize(str)}` : ``
);
// compare whether a value has changed, accounting for NaN.
const hasChanged = (value, oldValue)=>!Object.is(value, oldValue)
;
const invokeArrayFns = (fns, arg)=>{
    for(let i = 0; i < fns.length; i++)fns[i](arg);
};
const def = (obj, key, value)=>{
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
    });
};
const toNumber = (val)=>{
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = ()=>{
    return _globalThis || (_globalThis = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"JacNc":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"bKzMy":[function() {},{}],"lssnV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _vuex = require("vuex");
var _state = require("./state");
var _stateDefault = parcelHelpers.interopDefault(_state);
var _actions = require("./actions");
var _mutations = require("./mutations");
exports.default = _vuex.createStore({
    state: _stateDefault.default,
    mutations: _mutations,
    actions: _actions
});

},{"vuex":"kgDnf","./state":"2Hiok","./actions":"l0q2G","./mutations":"oXTE3","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"kgDnf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Store", ()=>Store
);
parcelHelpers.export(exports, "createLogger", ()=>createLogger
);
parcelHelpers.export(exports, "createNamespacedHelpers", ()=>createNamespacedHelpers
);
parcelHelpers.export(exports, "createStore", ()=>createStore
);
parcelHelpers.export(exports, "mapActions", ()=>mapActions
);
parcelHelpers.export(exports, "mapGetters", ()=>mapGetters
);
parcelHelpers.export(exports, "mapMutations", ()=>mapMutations
);
parcelHelpers.export(exports, "mapState", ()=>mapState
);
parcelHelpers.export(exports, "storeKey", ()=>storeKey
);
parcelHelpers.export(exports, "useStore", ()=>useStore
);
/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */ var _vue = require("vue");
var _devtoolsApi = require("@vue/devtools-api");
var storeKey = 'store';
function useStore(key) {
    if (key === void 0) key = null;
    return _vue.inject(key !== null ? key : storeKey);
}
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */ function find(list, f) {
    return list.filter(f)[0];
}
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */ function deepCopy(obj, cache) {
    if (cache === void 0) cache = [];
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') return obj;
    // if obj is hit, it is in circular structure
    var hit = find(cache, function(c) {
        return c.original === obj;
    });
    if (hit) return hit.copy;
    var copy = Array.isArray(obj) ? [] : {
    };
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy: copy
    });
    Object.keys(obj).forEach(function(key) {
        copy[key] = deepCopy(obj[key], cache);
    });
    return copy;
}
/**
 * forEach for object
 */ function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
        return fn(obj[key], key);
    });
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
function isPromise(val) {
    return val && typeof val.then === 'function';
}
function assert(condition, msg) {
    if (!condition) throw new Error("[vuex] " + msg);
}
function partial(fn, arg) {
    return function() {
        return fn(arg);
    };
}
function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    return function() {
        var i = subs.indexOf(fn);
        if (i > -1) subs.splice(i, 1);
    };
}
function resetStore(store, hot) {
    store._actions = Object.create(null);
    store._mutations = Object.create(null);
    store._wrappedGetters = Object.create(null);
    store._modulesNamespaceMap = Object.create(null);
    var state = store.state;
    // init all modules
    installModule(store, state, [], store._modules.root, true);
    // reset state
    resetStoreState(store, state, hot);
}
function resetStoreState(store, state, hot) {
    var oldState = store._state;
    // bind store public getters
    store.getters = {
    };
    // reset local getters cache
    store._makeLocalGettersCache = Object.create(null);
    var wrappedGetters = store._wrappedGetters;
    var computedObj = {
    };
    forEachValue(wrappedGetters, function(fn, key) {
        // use computed to leverage its lazy-caching mechanism
        // direct inline function use will lead to closure preserving oldState.
        // using partial to return function with only arguments preserved in closure environment.
        computedObj[key] = partial(fn, store);
        Object.defineProperty(store.getters, key, {
            // TODO: use `computed` when it's possible. at the moment we can't due to
            // https://github.com/vuejs/vuex/pull/1883
            get: function() {
                return computedObj[key]();
            },
            enumerable: true // for local getters
        });
    });
    store._state = _vue.reactive({
        data: state
    });
    // enable strict mode for new state
    if (store.strict) enableStrictMode(store);
    if (oldState) {
        if (hot) // dispatch changes in all subscribed watchers
        // to force getter re-evaluation for hot reloading.
        store._withCommit(function() {
            oldState.data = null;
        });
    }
}
function installModule(store, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store._modules.getNamespace(path);
    // register in namespace map
    if (module.namespaced) {
        if (store._modulesNamespaceMap[namespace] && true) console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join('/'));
        store._modulesNamespaceMap[namespace] = module;
    }
    // set state
    if (!isRoot && !hot) {
        var parentState = getNestedState(rootState, path.slice(0, -1));
        var moduleName = path[path.length - 1];
        store._withCommit(function() {
            if (moduleName in parentState) console.warn("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + path.join('.') + "\"");
            parentState[moduleName] = module.state;
        });
    }
    var local = module.context = makeLocalContext(store, namespace, path);
    module.forEachMutation(function(mutation, key) {
        var namespacedType = namespace + key;
        registerMutation(store, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
        var type = action.root ? key : namespace + key;
        var handler = action.handler || action;
        registerAction(store, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
        var namespacedType = namespace + key;
        registerGetter(store, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
        installModule(store, rootState, path.concat(key), child, hot);
    });
}
/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */ function makeLocalContext(store, namespace, path) {
    var noNamespace = namespace === '';
    var local = {
        dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;
            if (!options || !options.root) {
                type = namespace + type;
                if (!store._actions[type]) {
                    console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
                    return;
                }
            }
            return store.dispatch(type, payload);
        },
        commit: noNamespace ? store.commit : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type = args.type;
            if (!options || !options.root) {
                type = namespace + type;
                if (!store._mutations[type]) {
                    console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
                    return;
                }
            }
            store.commit(type, payload, options);
        }
    };
    // getters and state object must be gotten lazily
    // because they will be changed by state update
    Object.defineProperties(local, {
        getters: {
            get: noNamespace ? function() {
                return store.getters;
            } : function() {
                return makeLocalGetters(store, namespace);
            }
        },
        state: {
            get: function() {
                return getNestedState(store.state, path);
            }
        }
    });
    return local;
}
function makeLocalGetters(store, namespace) {
    if (!store._makeLocalGettersCache[namespace]) {
        var gettersProxy = {
        };
        var splitPos = namespace.length;
        Object.keys(store.getters).forEach(function(type) {
            // skip if the target getter is not match this namespace
            if (type.slice(0, splitPos) !== namespace) return;
            // extract local getter type
            var localType = type.slice(splitPos);
            // Add a port to the getters proxy.
            // Define as getter property because
            // we do not want to evaluate the getters in this time.
            Object.defineProperty(gettersProxy, localType, {
                get: function() {
                    return store.getters[type];
                },
                enumerable: true
            });
        });
        store._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store._makeLocalGettersCache[namespace];
}
function registerMutation(store, type, handler, local) {
    var entry = store._mutations[type] || (store._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
        handler.call(store, local.state, payload);
    });
}
function registerAction(store, type, handler, local) {
    var entry = store._actions[type] || (store._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
        var res = handler.call(store, {
            dispatch: local.dispatch,
            commit: local.commit,
            getters: local.getters,
            state: local.state,
            rootGetters: store.getters,
            rootState: store.state
        }, payload);
        if (!isPromise(res)) res = Promise.resolve(res);
        if (store._devtoolHook) return res.catch(function(err) {
            store._devtoolHook.emit('vuex:error', err);
            throw err;
        });
        else return res;
    });
}
function registerGetter(store, type, rawGetter, local) {
    if (store._wrappedGetters[type]) {
        console.error("[vuex] duplicate getter key: " + type);
        return;
    }
    store._wrappedGetters[type] = function wrappedGetter(store1) {
        return rawGetter(local.state, local.getters, store1.state, store1.getters // root getters
        );
    };
}
function enableStrictMode(store) {
    _vue.watch(function() {
        return store._state.data;
    }, function() {
        assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }, {
        deep: true,
        flush: 'sync'
    });
}
function getNestedState(state, path) {
    return path.reduce(function(state1, key) {
        return state1[key];
    }, state);
}
function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
        options = payload;
        payload = type;
        type = type.type;
    }
    assert(typeof type === 'string', "expects string as the type, but found " + typeof type + ".");
    return {
        type: type,
        payload: payload,
        options: options
    };
}
var LABEL_VUEX_BINDINGS = 'vuex bindings';
var MUTATIONS_LAYER_ID = 'vuex:mutations';
var ACTIONS_LAYER_ID = 'vuex:actions';
var INSPECTOR_ID = 'vuex';
var actionId = 0;
function addDevtools(app, store) {
    _devtoolsApi.setupDevtoolsPlugin({
        id: 'org.vuejs.vuex',
        app: app,
        label: 'Vuex',
        homepage: 'https://next.vuex.vuejs.org/',
        logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
        packageName: 'vuex',
        componentStateTypes: [
            LABEL_VUEX_BINDINGS
        ]
    }, function(api) {
        api.addTimelineLayer({
            id: MUTATIONS_LAYER_ID,
            label: 'Vuex Mutations',
            color: COLOR_LIME_500
        });
        api.addTimelineLayer({
            id: ACTIONS_LAYER_ID,
            label: 'Vuex Actions',
            color: COLOR_LIME_500
        });
        api.addInspector({
            id: INSPECTOR_ID,
            label: 'Vuex',
            icon: 'storage',
            treeFilterPlaceholder: 'Filter stores...'
        });
        api.on.getInspectorTree(function(payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                if (payload.filter) {
                    var nodes = [];
                    flattenStoreForInspectorTree(nodes, store._modules.root, payload.filter, '');
                    payload.rootNodes = nodes;
                } else payload.rootNodes = [
                    formatStoreForInspectorTree(store._modules.root, '')
                ];
            }
        });
        api.on.getInspectorState(function(payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                var modulePath = payload.nodeId;
                makeLocalGetters(store, modulePath);
                payload.state = formatStoreForInspectorState(getStoreModule(store._modules, modulePath), modulePath === 'root' ? store.getters : store._makeLocalGettersCache, modulePath);
            }
        });
        api.on.editInspectorState(function(payload) {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                var modulePath = payload.nodeId;
                var path = payload.path;
                if (modulePath !== 'root') path = modulePath.split('/').filter(Boolean).concat(path);
                store._withCommit(function() {
                    payload.set(store._state.data, path, payload.state.value);
                });
            }
        });
        store.subscribe(function(mutation, state) {
            var data = {
            };
            if (mutation.payload) data.payload = mutation.payload;
            data.state = state;
            api.notifyComponentUpdate();
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
            api.addTimelineEvent({
                layerId: MUTATIONS_LAYER_ID,
                event: {
                    time: Date.now(),
                    title: mutation.type,
                    data: data
                }
            });
        });
        store.subscribeAction({
            before: function(action, state) {
                var data = {
                };
                if (action.payload) data.payload = action.payload;
                action._id = actionId++;
                action._time = Date.now();
                data.state = state;
                api.addTimelineEvent({
                    layerId: ACTIONS_LAYER_ID,
                    event: {
                        time: action._time,
                        title: action.type,
                        groupId: action._id,
                        subtitle: 'start',
                        data: data
                    }
                });
            },
            after: function(action, state) {
                var data = {
                };
                var duration = Date.now() - action._time;
                data.duration = {
                    _custom: {
                        type: 'duration',
                        display: duration + "ms",
                        tooltip: 'Action duration',
                        value: duration
                    }
                };
                if (action.payload) data.payload = action.payload;
                data.state = state;
                api.addTimelineEvent({
                    layerId: ACTIONS_LAYER_ID,
                    event: {
                        time: Date.now(),
                        title: action.type,
                        groupId: action._id,
                        subtitle: 'end',
                        data: data
                    }
                });
            }
        });
    });
}
// extracted from tailwind palette
var COLOR_LIME_500 = 8702998;
var COLOR_DARK = 6710886;
var COLOR_WHITE = 16777215;
var TAG_NAMESPACED = {
    label: 'namespaced',
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
};
/**
 * @param {string} path
 */ function extractNameFromPath(path) {
    return path && path !== 'root' ? path.split('/').slice(-2, -1)[0] : 'Root';
}
/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorNode}
 */ function formatStoreForInspectorTree(module, path) {
    return {
        id: path || 'root',
        // all modules end with a `/`, we want the last segment only
        // cart/ -> cart
        // nested/cart/ -> cart
        label: extractNameFromPath(path),
        tags: module.namespaced ? [
            TAG_NAMESPACED
        ] : [],
        children: Object.keys(module._children).map(function(moduleName) {
            return formatStoreForInspectorTree(module._children[moduleName], path + moduleName + '/');
        })
    };
}
/**
 * @param {import('@vue/devtools-api').CustomInspectorNode[]} result
 * @param {*} module
 * @param {string} filter
 * @param {string} path
 */ function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) result.push({
        id: path || 'root',
        label: path.endsWith('/') ? path.slice(0, path.length - 1) : path || 'Root',
        tags: module.namespaced ? [
            TAG_NAMESPACED
        ] : []
    });
    Object.keys(module._children).forEach(function(moduleName) {
        flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + '/');
    });
}
/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorState}
 */ function formatStoreForInspectorState(module, getters, path) {
    getters = path === 'root' ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
        state: Object.keys(module.state).map(function(key) {
            return {
                key: key,
                editable: true,
                value: module.state[key]
            };
        })
    };
    if (gettersKeys.length) {
        var tree = transformPathsToObjectTree(getters);
        storeState.getters = Object.keys(tree).map(function(key) {
            return {
                key: key.endsWith('/') ? extractNameFromPath(key) : key,
                editable: false,
                value: canThrow(function() {
                    return tree[key];
                })
            };
        });
    }
    return storeState;
}
function transformPathsToObjectTree(getters) {
    var result = {
    };
    Object.keys(getters).forEach(function(key) {
        var path = key.split('/');
        if (path.length > 1) {
            var target = result;
            var leafKey = path.pop();
            path.forEach(function(p) {
                if (!target[p]) target[p] = {
                    _custom: {
                        value: {
                        },
                        display: p,
                        tooltip: 'Module',
                        abstract: true
                    }
                };
                target = target[p]._custom.value;
            });
            target[leafKey] = canThrow(function() {
                return getters[key];
            });
        } else result[key] = canThrow(function() {
            return getters[key];
        });
    });
    return result;
}
function getStoreModule(moduleMap, path) {
    var names = path.split('/').filter(function(n) {
        return n;
    });
    return names.reduce(function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) throw new Error("Missing module \"" + moduleName + "\" for path \"" + path + "\".");
        return i === names.length - 1 ? child : child._children;
    }, path === 'root' ? moduleMap : moduleMap.root._children);
}
function canThrow(cb) {
    try {
        return cb();
    } catch (e) {
        return e;
    }
}
// Base data struct for store's module, package with some attribute and method
var Module = function Module1(rawModule, runtime) {
    this.runtime = runtime;
    // Store some children item
    this._children = Object.create(null);
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {
    };
};
var prototypeAccessors$1 = {
    namespaced: {
        configurable: true
    }
};
prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
};
Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
};
Module.prototype.getChild = function getChild(key) {
    return this._children[key];
};
Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
};
Module.prototype.update = function update1(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) this._rawModule.actions = rawModule.actions;
    if (rawModule.mutations) this._rawModule.mutations = rawModule.mutations;
    if (rawModule.getters) this._rawModule.getters = rawModule.getters;
};
Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
};
Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) forEachValue(this._rawModule.getters, fn);
};
Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) forEachValue(this._rawModule.actions, fn);
};
Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) forEachValue(this._rawModule.mutations, fn);
};
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection1(rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
        return module.getChild(key);
    }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
        module = module.getChild(key);
        return namespace + (module.namespaced ? key + '/' : '');
    }, '');
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0) runtime = true;
    assertRawModule(path, rawModule);
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) this.root = newModule;
    else {
        var parent = this.get(path.slice(0, -1));
        parent.addChild(path[path.length - 1], newModule);
    }
    // register nested modules
    if (rawModule.modules) forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
};
ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
        console.warn("[vuex] trying to unregister module '" + key + "', which is " + "not registered");
        return;
    }
    if (!child.runtime) return;
    parent.removeChild(key);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) return parent.hasChild(key);
    return false;
};
function update2(path, targetModule, newModule) {
    assertRawModule(path, newModule);
    // update target module
    targetModule.update(newModule);
    // update nested modules
    if (newModule.modules) for(var key in newModule.modules){
        if (!targetModule.getChild(key)) {
            console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " + 'manual reload is needed');
            return;
        }
        update2(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
    }
}
var functionAssert = {
    assert: function(value) {
        return typeof value === 'function';
    },
    expected: 'function'
};
var objectAssert = {
    assert: function(value) {
        return typeof value === 'function' || typeof value === 'object' && typeof value.handler === 'function';
    },
    expected: 'function or object with "handler" function'
};
var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
};
function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
        if (!rawModule[key]) return;
        var assertOptions = assertTypes[key];
        forEachValue(rawModule[key], function(value, type) {
            assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
        });
    });
}
function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
    if (path.length > 0) buf += " in module \"" + path.join('.') + "\"";
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
}
function createStore(options) {
    return new Store(options);
}
var Store = function Store1(options) {
    var this$1$1 = this;
    if (options === void 0) options = {
    };
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store1, "store must be called with the new operator.");
    var plugins = options.plugins;
    if (plugins === void 0) plugins = [];
    var strict = options.strict;
    if (strict === void 0) strict = false;
    var devtools = options.devtools;
    // store internal state
    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = Object.create(null);
    this._devtools = devtools;
    // bind commit and dispatch to self
    var store = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
        return dispatch.call(store, type, payload);
    };
    this.commit = function boundCommit(type, payload, options1) {
        return commit.call(store, type, payload, options1);
    };
    // strict mode
    this.strict = strict;
    var state = this._modules.root.state;
    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root);
    // initialize the store state, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreState(this, state);
    // apply plugins
    plugins.forEach(function(plugin) {
        return plugin(this$1$1);
    });
};
var prototypeAccessors = {
    state: {
        configurable: true
    }
};
Store.prototype.install = function install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== undefined ? this._devtools : true;
    if (useDevtools) addDevtools(app, this);
};
prototypeAccessors.state.get = function() {
    return this._state.data;
};
prototypeAccessors.state.set = function(v) {
    assert(false, "use store.replaceState() to explicit replace store state.");
};
Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    // check object-style commit
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = {
        type: type,
        payload: payload
    };
    var entry = this._mutations[type];
    if (!entry) {
        console.error("[vuex] unknown mutation type: " + type);
        return;
    }
    this._withCommit(function() {
        entry.forEach(function commitIterator(handler) {
            handler(payload);
        });
    });
    this._subscribers.slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function(sub) {
        return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " + 'Use the filter functionality in the vue-devtools');
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    // check object-style dispatch
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = {
        type: type,
        payload: payload
    };
    var entry = this._actions[type];
    if (!entry) {
        console.error("[vuex] unknown action type: " + type);
        return;
    }
    try {
        this._actionSubscribers.slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
        .filter(function(sub) {
            return sub.before;
        }).forEach(function(sub) {
            return sub.before(action, this$1$1.state);
        });
    } catch (e) {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
        return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
        result.then(function(res) {
            try {
                this$1$1._actionSubscribers.filter(function(sub) {
                    return sub.after;
                }).forEach(function(sub) {
                    return sub.after(action, this$1$1.state);
                });
            } catch (e) {
                console.warn("[vuex] error in after action subscribers: ");
                console.error(e);
            }
            resolve(res);
        }, function(error) {
            try {
                this$1$1._actionSubscribers.filter(function(sub) {
                    return sub.error;
                }).forEach(function(sub) {
                    return sub.error(action, this$1$1.state, error);
                });
            } catch (e) {
                console.warn("[vuex] error in error action subscribers: ");
                console.error(e);
            }
            reject(error);
        });
    });
};
Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === 'function' ? {
        before: fn
    } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
};
Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    assert(typeof getter === 'function', "store.watch only accepts a function.");
    return _vue.watch(function() {
        return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({
    }, options));
};
Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
        this$1$1._state.data = state;
    });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0) options = {
    };
    if (typeof path === 'string') path = [
        path
    ];
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    // reset store to update getters...
    resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === 'string') path = [
        path
    ];
    assert(Array.isArray(path), "module path must be a string or an Array.");
    this._modules.unregister(path);
    this._withCommit(function() {
        var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
        delete parentState[path[path.length - 1]];
    });
    resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === 'string') path = [
        path
    ];
    assert(Array.isArray(path), "module path must be a string or an Array.");
    return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */ var mapState = normalizeNamespace(function(namespace, states) {
    var res = {
    };
    if (!isValidMap(states)) console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
    normalizeMap(states).forEach(function(ref) {
        var key = ref.key;
        var val = ref.val;
        res[key] = function mappedState() {
            var state = this.$store.state;
            var getters = this.$store.getters;
            if (namespace) {
                var module = getModuleByNamespace(this.$store, 'mapState', namespace);
                if (!module) return;
                state = module.context.state;
                getters = module.context.getters;
            }
            return typeof val === 'function' ? val.call(this, state, getters) : state[val];
        };
        // mark vuex getter for devtools
        res[key].vuex = true;
    });
    return res;
});
/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */ var mapMutations = normalizeNamespace(function(namespace, mutations) {
    var res = {
    };
    if (!isValidMap(mutations)) console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
    normalizeMap(mutations).forEach(function(ref) {
        var key = ref.key;
        var val = ref.val;
        res[key] = function mappedMutation() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            // Get the commit method from store
            var commit1 = this.$store.commit;
            if (namespace) {
                var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
                if (!module) return;
                commit1 = module.context.commit;
            }
            return typeof val === 'function' ? val.apply(this, [
                commit1
            ].concat(args)) : commit1.apply(this.$store, [
                val
            ].concat(args));
        };
    });
    return res;
});
/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */ var mapGetters = normalizeNamespace(function(namespace, getters) {
    var res = {
    };
    if (!isValidMap(getters)) console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
    normalizeMap(getters).forEach(function(ref) {
        var key = ref.key;
        var val = ref.val;
        // The namespace has been mutated by normalizeNamespace
        val = namespace + val;
        res[key] = function mappedGetter() {
            if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) return;
            if (!(val in this.$store.getters)) {
                console.error("[vuex] unknown getter: " + val);
                return;
            }
            return this.$store.getters[val];
        };
        // mark vuex getter for devtools
        res[key].vuex = true;
    });
    return res;
});
/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */ var mapActions = normalizeNamespace(function(namespace, actions) {
    var res = {
    };
    if (!isValidMap(actions)) console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
    normalizeMap(actions).forEach(function(ref) {
        var key = ref.key;
        var val = ref.val;
        res[key] = function mappedAction() {
            var args = [], len = arguments.length;
            while(len--)args[len] = arguments[len];
            // get dispatch function from store
            var dispatch1 = this.$store.dispatch;
            if (namespace) {
                var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
                if (!module) return;
                dispatch1 = module.context.dispatch;
            }
            return typeof val === 'function' ? val.apply(this, [
                dispatch1
            ].concat(args)) : dispatch1.apply(this.$store, [
                val
            ].concat(args));
        };
    });
    return res;
});
/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */ var createNamespacedHelpers = function(namespace) {
    return {
        mapState: mapState.bind(null, namespace),
        mapGetters: mapGetters.bind(null, namespace),
        mapMutations: mapMutations.bind(null, namespace),
        mapActions: mapActions.bind(null, namespace)
    };
};
/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */ function normalizeMap(map) {
    if (!isValidMap(map)) return [];
    return Array.isArray(map) ? map.map(function(key) {
        return {
            key: key,
            val: key
        };
    }) : Object.keys(map).map(function(key) {
        return {
            key: key,
            val: map[key]
        };
    });
}
/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */ function isValidMap(map) {
    return Array.isArray(map) || isObject(map);
}
/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */ function normalizeNamespace(fn) {
    return function(namespace, map) {
        if (typeof namespace !== 'string') {
            map = namespace;
            namespace = '';
        } else if (namespace.charAt(namespace.length - 1) !== '/') namespace += '/';
        return fn(namespace, map);
    };
}
/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */ function getModuleByNamespace(store, helper, namespace) {
    var module = store._modulesNamespaceMap[namespace];
    if (!module) console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
    return module;
}
// Credits: borrowed code from fcomb/redux-logger
function createLogger(ref) {
    if (ref === void 0) ref = {
    };
    var collapsed = ref.collapsed;
    if (collapsed === void 0) collapsed = true;
    var filter = ref.filter;
    if (filter === void 0) filter = function(mutation, stateBefore, stateAfter) {
        return true;
    };
    var transformer = ref.transformer;
    if (transformer === void 0) transformer = function(state) {
        return state;
    };
    var mutationTransformer = ref.mutationTransformer;
    if (mutationTransformer === void 0) mutationTransformer = function(mut) {
        return mut;
    };
    var actionFilter = ref.actionFilter;
    if (actionFilter === void 0) actionFilter = function(action, state) {
        return true;
    };
    var actionTransformer = ref.actionTransformer;
    if (actionTransformer === void 0) actionTransformer = function(act) {
        return act;
    };
    var logMutations = ref.logMutations;
    if (logMutations === void 0) logMutations = true;
    var logActions = ref.logActions;
    if (logActions === void 0) logActions = true;
    var logger = ref.logger;
    if (logger === void 0) logger = console;
    return function(store) {
        var prevState = deepCopy(store.state);
        if (typeof logger === 'undefined') return;
        if (logMutations) store.subscribe(function(mutation, state) {
            var nextState = deepCopy(state);
            if (filter(mutation, prevState, nextState)) {
                var formattedTime = getFormattedTime();
                var formattedMutation = mutationTransformer(mutation);
                var message = "mutation " + mutation.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
                logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
                logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
                endMessage(logger);
            }
            prevState = nextState;
        });
        if (logActions) store.subscribeAction(function(action, state) {
            if (actionFilter(action, state)) {
                var formattedTime = getFormattedTime();
                var formattedAction = actionTransformer(action);
                var message = "action " + action.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
                endMessage(logger);
            }
        });
    };
}
function startMessage(logger, message, collapsed) {
    var startMessage1 = collapsed ? logger.groupCollapsed : logger.group;
    // render
    try {
        startMessage1.call(logger, message);
    } catch (e) {
        logger.log(message);
    }
}
function endMessage(logger) {
    try {
        logger.groupEnd();
    } catch (e) {
        logger.log('—— log end ——');
    }
}
function getFormattedTime() {
    var time = new Date();
    return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
}
function repeat(str, times) {
    return new Array(times + 1).join(str);
}
function pad(num, maxLength) {
    return repeat('0', maxLength - num.toString().length) + num;
}
var index = {
    version: '4.0.2',
    Store: Store,
    storeKey: storeKey,
    createStore: createStore,
    useStore: useStore,
    mapState: mapState,
    mapMutations: mapMutations,
    mapGetters: mapGetters,
    mapActions: mapActions,
    createNamespacedHelpers: createNamespacedHelpers,
    createLogger: createLogger
};
exports.default = index;

},{"vue":"eg0LR","@vue/devtools-api":"b5OPj","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"b5OPj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setupDevtoolsPlugin", ()=>setupDevtoolsPlugin
);
var _env = require("./env");
var _const = require("./const");
var _api = require("./api");
parcelHelpers.exportAll(_api, exports);
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const hook = _env.getDevtoolsGlobalHook();
    if (hook) hook.emit(_const.HOOK_SETUP, pluginDescriptor, setupFn);
    else {
        const target = _env.getTarget();
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor,
            setupFn
        });
    }
}

},{"./env":"2I2ME","./const":"3q4gn","./api":"7PDJn","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"2I2ME":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getDevtoolsGlobalHook", ()=>getDevtoolsGlobalHook
);
parcelHelpers.export(exports, "getTarget", ()=>getTarget
);
var global = arguments[3];
function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
    // @ts-ignore
    return typeof navigator !== 'undefined' ? window : typeof global !== 'undefined' ? global : {
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"3q4gn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HOOK_SETUP", ()=>HOOK_SETUP
);
const HOOK_SETUP = 'devtools-plugin:setup';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"7PDJn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _api = require("./api");
parcelHelpers.exportAll(_api, exports);
var _app = require("./app");
parcelHelpers.exportAll(_app, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _context = require("./context");
parcelHelpers.exportAll(_context, exports);
var _hooks = require("./hooks");
parcelHelpers.exportAll(_hooks, exports);
var _util = require("./util");
parcelHelpers.exportAll(_util, exports);

},{"./api":"jQJ2X","./app":"3wLXw","./component":"3SJ3x","./context":"b3ve0","./hooks":"aNFuP","./util":"lrVbp","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"jQJ2X":[function(require,module,exports) {

},{}],"3wLXw":[function(require,module,exports) {

},{}],"3SJ3x":[function(require,module,exports) {

},{}],"b3ve0":[function(require,module,exports) {

},{}],"aNFuP":[function(require,module,exports) {

},{}],"lrVbp":[function(require,module,exports) {

},{}],"2Hiok":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _object = require("../libs/object");
var _defaults = require("./defaults");
var _defaultsDefault = parcelHelpers.interopDefault(_defaults);
// set state
let state = _object.convertPureObject(_defaultsDefault.default);
exports.default = state;

},{"../libs/object":"dHAI8","./defaults":"iD2Ls","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"dHAI8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * convert pure object
 * `proxy`, `observable`객체를 순수한 객체로 변환해준다.
 *
 * @param {Object|Array} src
 * @return
 */ parcelHelpers.export(exports, "convertPureObject", ()=>convertPureObject
);
/**
 * check slide items
 *
 * @param {object[]} items
 * @return {boolean}
 * @throws {Error}
 */ parcelHelpers.export(exports, "checkSlideItems", ()=>checkSlideItems
);
/**
 * check tree
 *
 * @param {object} src
 * @return {boolean}
 * @throws {Error}
 */ parcelHelpers.export(exports, "checkTree", ()=>checkTree
);
/**
 * check preference data
 */ parcelHelpers.export(exports, "checkPreference", ()=>checkPreference
);
/**
 * check nested keys in object
 *
 * @param {object} src
 * @param {string} type
 * @param {array} keys
 * @throws {Error}
 */ function checkNestedKeys(src, type, keys) {
    const address = keys.join('.');
    const message_errorType = `The type(${address}) is wrong.`;
    for(let i = 0; i < keys.length; i++){
        if (!src || !src.hasOwnProperty(keys[i])) throw new Error(`The item(${address}) is missing or invalid.`);
        src = src[keys[i]];
    }
    switch(type){
        case 'array':
            if (!Array.isArray(src)) throw new Error(message_errorType);
            break;
        case 'string':
            if (typeof src !== 'string') throw new Error(message_errorType);
            break;
        case 'number':
            if (typeof src !== 'number') throw new Error(message_errorType);
            break;
        case 'boolean':
            if (typeof src !== 'boolean') throw new Error(message_errorType);
            break;
        case 'object':
            if (typeof src !== 'object') throw new Error(message_errorType);
            break;
    }
}
function convertPureObject(src) {
    if (!src) return null;
    try {
        return JSON.parse(JSON.stringify(src));
    } catch (_) {
        return null;
    }
}
function checkSlideItems(items) {
    if (!(items && typeof items === 'object')) throw new Error('Invalid slides data');
    for(let i = 0; i < items.length; i++){
        if (!(items[i] && items[i].src)) throw new Error(`The item[${i}] of this item is invalid.`);
    }
}
function checkTree(src) {
    if (!src) throw new Error('No value');
    if (typeof src !== 'object') throw new Error('This value is not an object.');
    let keys = Object.keys(src);
    for(let i = 0; i < keys.length; i++){
        // for address
        if (typeof src[keys[i]].slides === 'string') continue;
        if (!Array.isArray(src[keys[i]].slides)) throw new Error(`not array item: item.${keys[i]}`);
        if (src[keys[i]].length <= 0) continue;
        checkSlideItems(src[keys[i]]);
    }
    return true;
}
function checkPreference(item) {
    try {
        if (!item) throw new Error('no item');
        if (!(item.general && item.slides && item.style && item.keyboard)) throw new Error('no item property');
        // general
        checkNestedKeys(item, 'string', [
            'general',
            'language'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'hud'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'hoverVisibleHud'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'visibleHudContents',
            'menu'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'visibleHudContents',
            'caption'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'visibleHudContents',
            'controller'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'visibleHudContents',
            'paginate'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'visibleHudContents',
            'autoplay'
        ]);
        checkNestedKeys(item, 'boolean', [
            'general',
            'visibleHudContents',
            'group'
        ]);
        // slides
        checkNestedKeys(item, 'number', [
            'slides',
            'initialNumber'
        ]);
        checkNestedKeys(item, 'string', [
            'slides',
            'animationType'
        ]);
        checkNestedKeys(item, 'number', [
            'slides',
            'animationSpeed'
        ]);
        checkNestedKeys(item, 'string', [
            'slides',
            'captionAnimationType'
        ]);
        checkNestedKeys(item, 'number', [
            'slides',
            'captionAnimationSpeed'
        ]);
        checkNestedKeys(item, 'boolean', [
            'slides',
            'autoplay'
        ]);
        checkNestedKeys(item, 'number', [
            'slides',
            'autoplayDelay'
        ]);
        checkNestedKeys(item, 'boolean', [
            'slides',
            'autoplayDirection'
        ]);
        checkNestedKeys(item, 'boolean', [
            'slides',
            'autoplayPauseOnHover'
        ]);
        checkNestedKeys(item, 'boolean', [
            'slides',
            'loop'
        ]);
        checkNestedKeys(item, 'boolean', [
            'slides',
            'swipe'
        ]);
        // style
        checkNestedKeys(item, 'string', [
            'style',
            'screenColor'
        ]);
        checkNestedKeys(item, 'string', [
            'style',
            'imageType'
        ]);
        checkNestedKeys(item, 'array', [
            'style',
            'imageScale'
        ]);
        checkNestedKeys(item, 'number', [
            'style',
            'captionScale'
        ]);
        checkNestedKeys(item, 'array', [
            'style',
            'captionPosition'
        ]);
        // keyboard
        checkNestedKeys(item, 'boolean', [
            'keyboard',
            'enabled'
        ]);
        return true;
    } catch (e) {
        if (window.dev) console.error(e.message);
        return false;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"iD2Ls":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    preference: {
        general: {
            language: 'en',
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
            animationType: 'horizontal',
            animationSpeed: 500,
            captionAnimationType: 'none',
            captionAnimationSpeed: 40,
            autoplay: false,
            autoplayDelay: 7000,
            autoplayDirection: true,
            autoplayPauseOnHover: false,
            loop: true,
            swipe: true
        },
        style: {
            screenColor: 'system',
            imageType: 'none',
            imageScale: [
                '75%',
                '75%'
            ],
            captionScale: 100,
            captionPosition: [
                '32px',
                '30px'
            ]
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
    group: 'default',
    mode: null,
    activeSlide: undefined,
    keyboardEvent: true,
    autoplay: false
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"l0q2G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * change mode
 * 'null,thumbnail,preference,guide'
 *
 * @param {object} context
 * @param {string} value
 */ parcelHelpers.export(exports, "changeMode", ()=>changeMode
);
/**
 * change preference
 */ parcelHelpers.export(exports, "changePreference", ()=>changePreference
);
/**
 * change autoplay
 * @param {object} context
 * @param {boolean} sw
 */ parcelHelpers.export(exports, "changeAutoplay", ()=>changeAutoplay
);
/**
 * change hud
 *
 * @param {object} context
 * @param {boolean} sw
 */ parcelHelpers.export(exports, "changeHud", ()=>changeHud
);
/**
 * change tree
 *
 * @param {object} context
 * @param {object} tree
 */ parcelHelpers.export(exports, "changeTree", ()=>changeTree
);
/**
 * change slides
 *
 * @param {object} context
 * @param {object[]} newSlides
 */ parcelHelpers.export(exports, "changeSlides", ()=>changeSlides
);
/**
 * change active slide
 *
 * @param {object} context
 * @param {number} active
 */ parcelHelpers.export(exports, "changeActiveSlide", ()=>changeActiveSlide
);
/**
 * reset
 *
 * @param {object} context
 */ parcelHelpers.export(exports, "reset", ()=>reset
);
/**
 * change group
 *
 * @param context
 * @param {string} key
 */ parcelHelpers.export(exports, "changeGroup", ()=>changeGroup
);
var _defaults = require("./defaults");
var _defaultsDefault = parcelHelpers.interopDefault(_defaults);
var _object = require("../libs/object");
var _storage = require("../libs/storage");
function changeMode(context, value) {
    if (context.state.mode === value) return;
    switch(value){
        case 'preference':
        case 'group':
        case 'thumbnail':
            context.commit('updateMode', value);
            break;
        default:
            context.commit('updateMode', null);
            break;
    }
}
function changePreference(context, value) {
    const pref = _object.convertPureObject(value);
    context.commit('updatePreference', pref);
    _storage.set('preference', pref);
}
function changeAutoplay(context, sw) {
    if (!context.state.preference.slides.autoplay) return;
    sw = sw === undefined ? !context.state.autoplay : sw;
    context.commit('updateAutoplay', sw);
}
function changeHud(context, sw) {
    sw = sw === undefined ? !context.state.preference.general.hud : sw;
    context.commit('updateValueInPreference', {
        map: [
            'general',
            'hud'
        ],
        value: sw
    });
}
function changeTree(context, tree) {
    try {
        _object.checkSlideItems(tree);
        context.commit('updateTree', tree);
        _storage.set('tree', tree);
    } catch (e) {
        if (window.dev) console.error(e.message);
        throw new Error(e.message);
    }
}
function changeSlides(context, newSlides) {
    context.commit('updateSlides', newSlides);
}
function changeActiveSlide(context, active) {
    if (typeof active !== 'number') return;
    context.commit('updateActiveSlide', active);
}
async function reset(context) {
    const preference = _object.convertPureObject(_defaultsDefault.default.preference);
    const tree = _object.convertPureObject(_defaultsDefault.default.tree);
    const slides = _object.convertPureObject(_defaultsDefault.default.slides);
    await context.dispatch('changePreference', preference);
    await context.dispatch('changeTree', tree);
    await context.dispatch('changeSlides', slides);
    context.commit('updateActiveSlide', preference.slides.initialNumber);
    context.commit('updateUseKeyboardEvent', true);
    context.commit('updateMode', null);
}
function changeGroup(context, key) {
    context.commit('updateGroup', key);
    _storage.set('group', key);
}

},{"./defaults":"iD2Ls","../libs/object":"dHAI8","../libs/storage":"cDz6X","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"cDz6X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * get value in localStorage
 *
 * @param {string} key
 * @returns {object}
 */ parcelHelpers.export(exports, "get", ()=>get
);
/**
 * set value in localStorage
 *
 * @param {string} key
 * @param {any} value
 */ parcelHelpers.export(exports, "set", ()=>set
);
/**
 * disabled storage
 */ parcelHelpers.export(exports, "disabled", ()=>disabled
);
const prefix = 'slideshow';
let disableStorage = {
    preference: false,
    tree: false
};
/**
 * check localStorage
 *
 * @return {boolean}
 */ function checkObject() {
    return !!window.localStorage;
}
function get(key) {
    if (disableStorage[key]) return;
    if (!(checkObject() && key)) return undefined;
    try {
        return JSON.parse(window.localStorage.getItem(`${prefix}_${key}`));
    } catch (e) {
        return undefined;
    }
}
function set(key, value) {
    if (disableStorage[key]) return;
    if (!(checkObject() && key && value)) return;
    window.localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
}
function disabled(key) {
    switch(key){
        case 'preference':
        case 'tree':
        case 'group':
            disableStorage[key] = true;
            break;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"oXTE3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * change mode
 */ parcelHelpers.export(exports, "updateMode", ()=>updateMode
);
/**
 * update active slide
 */ parcelHelpers.export(exports, "updateActiveSlide", ()=>updateActiveSlide
);
/**
 * use keyboard event
 */ parcelHelpers.export(exports, "updateUseKeyboardEvent", ()=>updateUseKeyboardEvent
);
/**
 * update preference
 */ parcelHelpers.export(exports, "updatePreference", ()=>updatePreference
);
/**
 * update value in preference
 */ parcelHelpers.export(exports, "updateValueInPreference", ()=>updateValueInPreference
);
parcelHelpers.export(exports, "updateTree", ()=>updateTree
);
/**
 * update slides
 */ parcelHelpers.export(exports, "updateSlides", ()=>updateSlides
);
/**
 * update group
 */ parcelHelpers.export(exports, "updateGroup", ()=>updateGroup
);
parcelHelpers.export(exports, "updateAutoplay", ()=>updateAutoplay
);
/**
 * update use preference
 * ex) `store.commit('updateUsePreference', [ 'data', false ]);`
 *
 * @param state
 * @param {array} value
 */ parcelHelpers.export(exports, "updateUsePreference", ()=>updateUsePreference
);
function updateMode(state, value) {
    state.mode = value;
}
function updateActiveSlide(state, n) {
    state.activeSlide = n;
}
function updateUseKeyboardEvent(state, sw) {
    state.keyboardEvent = sw;
}
function updatePreference(state, value) {
    state.preference = value;
}
function updateValueInPreference(state, src) {
    const { value , map  } = src;
    if (!(map && Array.isArray(map))) return;
    switch(map.length){
        case 1:
            state.preference[map[0]] = value;
            break;
        case 2:
            state.preference[map[0]][map[1]] = value;
            break;
        case 3:
            state.preference[map[0]][map[1]][map[2]] = value;
            break;
    }
}
function updateTree(state, value) {
    state.tree = value;
}
function updateSlides(state, value) {
    state.slides = value;
}
function updateGroup(state, value) {
    state.group = value;
}
function updateAutoplay(state, value) {
    state.autoplay = value;
}
function updateUsePreference(state, value) {
    switch(value[0]){
        case 'slides':
        case 'style':
        case 'data':
        case 'keyboard':
        case 'information':
            state.usePreference[value[0]] = Boolean(value[1]);
            break;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"FBreR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _index = require("vue-i18n/index");
var _enJson = require("./en.json");
var _enJsonDefault = parcelHelpers.interopDefault(_enJson);
var _koJson = require("./ko.json");
var _koJsonDefault = parcelHelpers.interopDefault(_koJson);
exports.default = _index.createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: _enJsonDefault.default,
        ko: _koJsonDefault.default
    }
});

},{"vue-i18n/index":"h8rJF","./en.json":"jvlRZ","./ko.json":"l9PjU","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"h8rJF":[function(require,module,exports) {
'use strict';
module.exports = require('./dist/vue-i18n.cjs.js');

},{"./dist/vue-i18n.cjs.js":"3XN88"}],"3XN88":[function(require,module,exports) {
/*!
  * vue-i18n v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */ 'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var shared = require('@intlify/shared');
var coreBase = require('@intlify/core-base');
var vue = require('vue');
/**
 * Vue I18n Version
 *
 * @remarks
 * Semver format. Same format as the package.json `version` field.
 *
 * @VueI18nGeneral
 */ const VERSION = '9.1.7';
const warnMessages = {
    [6 /* FALLBACK_TO_ROOT */ ]: `Fall back to {type} '{key}' with root locale.`,
    [7 /* NOT_SUPPORTED_PRESERVE */ ]: `Not supported 'preserve'.`,
    [8 /* NOT_SUPPORTED_FORMATTER */ ]: `Not supported 'formatter'.`,
    [9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */ ]: `Not supported 'preserveDirectiveContent'.`,
    [10 /* NOT_SUPPORTED_GET_CHOICE_INDEX */ ]: `Not supported 'getChoiceIndex'.`,
    [11 /* COMPONENT_NAME_LEGACY_COMPATIBLE */ ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [12 /* NOT_FOUND_PARENT_SCOPE */ ]: `Not found parent scope. use the global scope.`
};
function getWarnMessage(code, ...args) {
    return shared.format(warnMessages[code], ...args);
}
function createI18nError(code, ...args) {
    return coreBase.createCompileError(code, null, {
        messages: errorMessages,
        args
    });
}
const errorMessages = {
    [14 /* UNEXPECTED_RETURN_TYPE */ ]: 'Unexpected return type in composer',
    [15 /* INVALID_ARGUMENT */ ]: 'Invalid argument',
    [16 /* MUST_BE_CALL_SETUP_TOP */ ]: 'Must be called at the top of a `setup` function',
    [17 /* NOT_INSLALLED */ ]: 'Need to install with `app.use` function',
    [22 /* UNEXPECTED_ERROR */ ]: 'Unexpected error',
    [18 /* NOT_AVAILABLE_IN_LEGACY_MODE */ ]: 'Not available in legacy mode',
    [19 /* REQUIRED_VALUE */ ]: `Required in value: {0}`,
    [20 /* INVALID_VALUE */ ]: `Invalid value`,
    [21 /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */ ]: `Cannot setup vue-devtools plugin`
};
const DEVTOOLS_META = '__INTLIFY_META__';
const TransrateVNodeSymbol = shared.makeSymbol('__transrateVNode');
const DatetimePartsSymbol = shared.makeSymbol('__datetimeParts');
const NumberPartsSymbol = shared.makeSymbol('__numberParts');
const EnableEmitter = shared.makeSymbol('__enableEmitter');
const DisableEmitter = shared.makeSymbol('__disableEmitter');
const SetPluralRulesSymbol = shared.makeSymbol('__setPluralRules');
shared.makeSymbol('__intlifyMeta');
let composerID = 0;
function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type)=>{
        return missing(locale, key, vue.getCurrentInstance() || undefined, type);
    };
}
function getLocaleMessages(locale, options) {
    const { messages , __i18n  } = options;
    // prettier-ignore
    const ret = shared.isPlainObject(messages) ? messages : shared.isArray(__i18n) ? {
    } : {
        [locale]: {
        }
    };
    // merge locale messages of i18n custom block
    if (shared.isArray(__i18n)) __i18n.forEach(({ locale: locale1 , resource  })=>{
        if (locale1) {
            ret[locale1] = ret[locale1] || {
            };
            deepCopy(resource, ret[locale1]);
        } else deepCopy(resource, ret);
    });
    // handle messages for flat json
    if (options.flatJson) {
        for(const key in ret)if (shared.hasOwn(ret, key)) coreBase.handleFlatJson(ret[key]);
    }
    return ret;
}
const isNotObjectOrIsArray = (val)=>!shared.isObject(val) || shared.isArray(val)
;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopy(src, des) {
    // src and des should both be objects, and non of then can be a array
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) throw createI18nError(20 /* INVALID_VALUE */ );
    for(const key in src)if (shared.hasOwn(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) // replace with src[key] when:
        // src[key] or des[key] is not a object, or
        // src[key] or des[key] is a array
        des[key] = src[key];
        else // src[key] and des[key] are both object, merge them
        deepCopy(src[key], des[key]);
    }
}
// for Intlify DevTools
const getMetaInfo = /* #__PURE__*/ ()=>{
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] // eslint-disable-line @typescript-eslint/no-explicit-any
     ? {
        [DEVTOOLS_META]: instance.type[DEVTOOLS_META]
    } // eslint-disable-line @typescript-eslint/no-explicit-any
     : null;
};
/**
 * Create composer interface factory
 *
 * @internal
 */ function createComposer(options = {
}) {
    const { __root  } = options;
    const _isGlobal = __root === undefined;
    let _inheritLocale = shared.isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(// prettier-ignore
    __root && _inheritLocale ? __root.locale.value : shared.isString(options.locale) ? options.locale : 'en-US');
    const _fallbackLocale = vue.ref(// prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : shared.isString(options.fallbackLocale) || shared.isArray(options.fallbackLocale) || shared.isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(shared.isPlainObject(options.datetimeFormats) ? options.datetimeFormats : {
        [_locale.value]: {
        }
    });
    const _numberFormats = vue.ref(shared.isPlainObject(options.numberFormats) ? options.numberFormats : {
        [_locale.value]: {
        }
    });
    // warning suppress options
    // prettier-ignore
    let _missingWarn = __root ? __root.missingWarn : shared.isBoolean(options.missingWarn) || shared.isRegExp(options.missingWarn) ? options.missingWarn : true;
    // prettier-ignore
    let _fallbackWarn = __root ? __root.fallbackWarn : shared.isBoolean(options.fallbackWarn) || shared.isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    // prettier-ignore
    let _fallbackRoot = __root ? __root.fallbackRoot : shared.isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    // configure fall back to root
    let _fallbackFormat = !!options.fallbackFormat;
    // runtime missing
    let _missing = shared.isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = shared.isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    // postTranslation handler
    let _postTranslation = shared.isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = shared.isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    // custom linked modifiers
    // prettier-ignore
    const _modifiers = __root ? __root.modifiers : shared.isPlainObject(options.modifiers) ? options.modifiers : {
    };
    // pluralRules
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    // runtime context
    // eslint-disable-next-line prefer-const
    let _context;
    function getCoreContext() {
        return coreBase.createCoreContext({
            version: VERSION,
            locale: _locale.value,
            fallbackLocale: _fallbackLocale.value,
            messages: _messages.value,
            datetimeFormats: _datetimeFormats.value,
            numberFormats: _numberFormats.value,
            modifiers: _modifiers,
            pluralRules: _pluralRules,
            missing: _runtimeMissing === null ? undefined : _runtimeMissing,
            missingWarn: _missingWarn,
            fallbackWarn: _fallbackWarn,
            fallbackFormat: _fallbackFormat,
            unresolving: true,
            postTranslation: _postTranslation === null ? undefined : _postTranslation,
            warnHtmlMessage: _warnHtmlMessage,
            escapeParameter: _escapeParameter,
            __datetimeFormatters: shared.isPlainObject(_context) ? _context.__datetimeFormatters : undefined,
            __numberFormatters: shared.isPlainObject(_context) ? _context.__numberFormatters : undefined,
            __v_emitter: shared.isPlainObject(_context) ? _context.__v_emitter : undefined,
            __meta: {
                framework: 'vue'
            }
        });
    }
    _context = getCoreContext();
    coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    // track reactivity
    function trackReactivityValues() {
        return [
            _locale.value,
            _fallbackLocale.value,
            _messages.value,
            _datetimeFormats.value,
            _numberFormats.value
        ];
    }
    // locale
    const locale = vue.computed({
        get: ()=>_locale.value
        ,
        set: (val)=>{
            _locale.value = val;
            _context.locale = _locale.value;
        }
    });
    // fallbackLocale
    const fallbackLocale = vue.computed({
        get: ()=>_fallbackLocale.value
        ,
        set: (val)=>{
            _fallbackLocale.value = val;
            _context.fallbackLocale = _fallbackLocale.value;
            coreBase.updateFallbackLocale(_context, _locale.value, val);
        }
    });
    // messages
    const messages = vue.computed(()=>_messages.value
    );
    // datetimeFormats
    const datetimeFormats = vue.computed(()=>_datetimeFormats.value
    );
    // numberFormats
    const numberFormats = vue.computed(()=>_numberFormats.value
    );
    // getPostTranslationHandler
    function getPostTranslationHandler() {
        return shared.isFunction(_postTranslation) ? _postTranslation : null;
    }
    // setPostTranslationHandler
    function setPostTranslationHandler(handler) {
        _postTranslation = handler;
        _context.postTranslation = handler;
    }
    // getMissingHandler
    function getMissingHandler() {
        return _missing;
    }
    // setMissingHandler
    function setMissingHandler(handler) {
        if (handler !== null) _runtimeMissing = defineCoreMissingHandler(handler);
        _missing = handler;
        _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        return type !== 'translate' || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
        trackReactivityValues(); // track reactive dependency
        // NOTE: experimental !!
        let ret;
        try {
            coreBase.setAdditionalMeta(getMetaInfo());
            ret = fn(_context);
        } finally{
            coreBase.setAdditionalMeta(null);
        }
        if (shared.isNumber(ret) && ret === coreBase.NOT_REOSLVED) {
            const [key, arg2] = argumentParser();
            if (__root && shared.isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
                if (_fallbackRoot && (coreBase.isTranslateFallbackWarn(_fallbackWarn, key) || coreBase.isTranslateMissingWarn(_missingWarn, key))) shared.warn(getWarnMessage(6 /* FALLBACK_TO_ROOT */ , {
                    key,
                    type: warnType
                }));
                // for vue-devtools timeline event
                {
                    const { __v_emitter: emitter  } = _context;
                    if (emitter && _fallbackRoot) emitter.emit("fallback" /* FALBACK */ , {
                        type: warnType,
                        key,
                        to: 'global',
                        groupId: `${warnType}:${key}`
                    });
                }
            }
            return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
        } else if (successCondition(ret)) return ret;
        else /* istanbul ignore next */ throw createI18nError(14 /* UNEXPECTED_RETURN_TYPE */ );
    }
    // t
    function t(...args) {
        return wrapWithDeps((context)=>coreBase.translate(context, ...args)
        , ()=>coreBase.parseTranslateArgs(...args)
        , 'translate', (root)=>root.t(...args)
        , (key)=>key
        , (val)=>shared.isString(val)
        );
    }
    // rt
    function rt(...args) {
        const [arg1, arg2, arg3] = args;
        if (arg3 && !shared.isObject(arg3)) throw createI18nError(15 /* INVALID_ARGUMENT */ );
        return t(...[
            arg1,
            arg2,
            shared.assign({
                resolvedMessage: true
            }, arg3 || {
            })
        ]);
    }
    // d
    function d(...args) {
        return wrapWithDeps((context)=>coreBase.datetime(context, ...args)
        , ()=>coreBase.parseDateTimeArgs(...args)
        , 'datetime format', (root)=>root.d(...args)
        , ()=>coreBase.MISSING_RESOLVE_VALUE
        , (val)=>shared.isString(val)
        );
    }
    // n
    function n(...args) {
        return wrapWithDeps((context)=>coreBase.number(context, ...args)
        , ()=>coreBase.parseNumberArgs(...args)
        , 'number format', (root)=>root.n(...args)
        , ()=>coreBase.MISSING_RESOLVE_VALUE
        , (val)=>shared.isString(val)
        );
    }
    // for custom processor
    function normalize(values) {
        return values.map((val)=>shared.isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val
        );
    }
    const interpolate = (val)=>val
    ;
    const processor = {
        normalize,
        interpolate,
        type: 'vnode'
    };
    // transrateVNode, using for `i18n-t` component
    function transrateVNode(...args) {
        return wrapWithDeps((context)=>{
            let ret;
            const _context1 = context;
            try {
                _context1.processor = processor;
                ret = coreBase.translate(_context1, ...args);
            } finally{
                _context1.processor = null;
            }
            return ret;
        }, ()=>coreBase.parseTranslateArgs(...args)
        , 'translate', // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root)=>root[TransrateVNodeSymbol](...args)
        , (key)=>[
                vue.createVNode(vue.Text, null, key, 0)
            ]
        , (val)=>shared.isArray(val)
        );
    }
    // numberParts, using for `i18n-n` component
    function numberParts(...args) {
        return wrapWithDeps((context)=>coreBase.number(context, ...args)
        , ()=>coreBase.parseNumberArgs(...args)
        , 'number format', // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root)=>root[NumberPartsSymbol](...args)
        , ()=>[]
        , (val)=>shared.isString(val) || shared.isArray(val)
        );
    }
    // datetimeParts, using for `i18n-d` component
    function datetimeParts(...args) {
        return wrapWithDeps((context)=>coreBase.datetime(context, ...args)
        , ()=>coreBase.parseDateTimeArgs(...args)
        , 'datetime format', // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root)=>root[DatetimePartsSymbol](...args)
        , ()=>[]
        , (val)=>shared.isString(val) || shared.isArray(val)
        );
    }
    function setPluralRules(rules) {
        _pluralRules = rules;
        _context.pluralRules = _pluralRules;
    }
    // te
    function te(key, locale1) {
        const targetLocale = shared.isString(locale1) ? locale1 : _locale.value;
        const message = getLocaleMessage(targetLocale);
        return coreBase.resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
        let messages1 = null;
        const locales = coreBase.getLocaleChain(_context, _fallbackLocale.value, _locale.value);
        for(let i = 0; i < locales.length; i++){
            const targetLocaleMessages = _messages.value[locales[i]] || {
            };
            const messageValue = coreBase.resolveValue(targetLocaleMessages, key);
            if (messageValue != null) {
                messages1 = messageValue;
                break;
            }
        }
        return messages1;
    }
    // tm
    function tm(key) {
        const messages1 = resolveMessages(key);
        // prettier-ignore
        return messages1 != null ? messages1 : __root ? __root.tm(key) || {
        } : {
        };
    }
    // getLocaleMessage
    function getLocaleMessage(locale1) {
        return _messages.value[locale1] || {
        };
    }
    // setLocaleMessage
    function setLocaleMessage(locale1, message) {
        _messages.value[locale1] = message;
        _context.messages = _messages.value;
    }
    // mergeLocaleMessage
    function mergeLocaleMessage(locale1, message) {
        _messages.value[locale1] = _messages.value[locale1] || {
        };
        deepCopy(message, _messages.value[locale1]);
        _context.messages = _messages.value;
    }
    // getDateTimeFormat
    function getDateTimeFormat(locale1) {
        return _datetimeFormats.value[locale1] || {
        };
    }
    // setDateTimeFormat
    function setDateTimeFormat(locale1, format) {
        _datetimeFormats.value[locale1] = format;
        _context.datetimeFormats = _datetimeFormats.value;
        coreBase.clearDateTimeFormat(_context, locale1, format);
    }
    // mergeDateTimeFormat
    function mergeDateTimeFormat(locale1, format) {
        _datetimeFormats.value[locale1] = shared.assign(_datetimeFormats.value[locale1] || {
        }, format);
        _context.datetimeFormats = _datetimeFormats.value;
        coreBase.clearDateTimeFormat(_context, locale1, format);
    }
    // getNumberFormat
    function getNumberFormat(locale1) {
        return _numberFormats.value[locale1] || {
        };
    }
    // setNumberFormat
    function setNumberFormat(locale1, format) {
        _numberFormats.value[locale1] = format;
        _context.numberFormats = _numberFormats.value;
        coreBase.clearNumberFormat(_context, locale1, format);
    }
    // mergeNumberFormat
    function mergeNumberFormat(locale1, format) {
        _numberFormats.value[locale1] = shared.assign(_numberFormats.value[locale1] || {
        }, format);
        _context.numberFormats = _numberFormats.value;
        coreBase.clearNumberFormat(_context, locale1, format);
    }
    // for debug
    composerID++;
    // watch root locale & fallbackLocale
    if (__root) {
        vue.watch(__root.locale, (val)=>{
            if (_inheritLocale) {
                _locale.value = val;
                _context.locale = val;
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
        vue.watch(__root.fallbackLocale, (val)=>{
            if (_inheritLocale) {
                _fallbackLocale.value = val;
                _context.fallbackLocale = val;
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
    }
    // define composition API!
    const composer = {
        id: composerID,
        locale,
        fallbackLocale,
        get inheritLocale () {
            return _inheritLocale;
        },
        set inheritLocale (val){
            _inheritLocale = val;
            if (val && __root) {
                _locale.value = __root.locale.value;
                _fallbackLocale.value = __root.fallbackLocale.value;
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        },
        get availableLocales () {
            return Object.keys(_messages.value).sort();
        },
        messages,
        datetimeFormats,
        numberFormats,
        get modifiers () {
            return _modifiers;
        },
        get pluralRules () {
            return _pluralRules || {
            };
        },
        get isGlobal () {
            return _isGlobal;
        },
        get missingWarn () {
            return _missingWarn;
        },
        set missingWarn (val1){
            _missingWarn = val1;
            _context.missingWarn = _missingWarn;
        },
        get fallbackWarn () {
            return _fallbackWarn;
        },
        set fallbackWarn (val2){
            _fallbackWarn = val2;
            _context.fallbackWarn = _fallbackWarn;
        },
        get fallbackRoot () {
            return _fallbackRoot;
        },
        set fallbackRoot (val3){
            _fallbackRoot = val3;
        },
        get fallbackFormat () {
            return _fallbackFormat;
        },
        set fallbackFormat (val4){
            _fallbackFormat = val4;
            _context.fallbackFormat = _fallbackFormat;
        },
        get warnHtmlMessage () {
            return _warnHtmlMessage;
        },
        set warnHtmlMessage (val5){
            _warnHtmlMessage = val5;
            _context.warnHtmlMessage = val5;
        },
        get escapeParameter () {
            return _escapeParameter;
        },
        set escapeParameter (val6){
            _escapeParameter = val6;
            _context.escapeParameter = val6;
        },
        t,
        rt,
        d,
        n,
        te,
        tm,
        getLocaleMessage,
        setLocaleMessage,
        mergeLocaleMessage,
        getDateTimeFormat,
        setDateTimeFormat,
        mergeDateTimeFormat,
        getNumberFormat,
        setNumberFormat,
        mergeNumberFormat,
        getPostTranslationHandler,
        setPostTranslationHandler,
        getMissingHandler,
        setMissingHandler,
        [TransrateVNodeSymbol]: transrateVNode,
        [NumberPartsSymbol]: numberParts,
        [DatetimePartsSymbol]: datetimeParts,
        [SetPluralRulesSymbol]: setPluralRules
    };
    composer[EnableEmitter] = (emitter)=>{
        _context.__v_emitter = emitter;
    };
    composer[DisableEmitter] = ()=>{
        _context.__v_emitter = undefined;
    };
    return composer;
}
/**
 * Convert to I18n Composer Options from VueI18n Options
 *
 * @internal
 */ function convertComposerOptions(options) {
    const locale = shared.isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = shared.isString(options.fallbackLocale) || shared.isArray(options.fallbackLocale) || shared.isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = shared.isFunction(options.missing) ? options.missing : undefined;
    const missingWarn = shared.isBoolean(options.silentTranslationWarn) || shared.isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = shared.isBoolean(options.silentFallbackWarn) || shared.isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = shared.isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = shared.isPlainObject(options.modifiers) ? options.modifiers : {
    };
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = shared.isFunction(options.postTranslation) ? options.postTranslation : undefined;
    const warnHtmlMessage = shared.isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== 'off' : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = shared.isBoolean(options.sync) ? options.sync : true;
    if (options.formatter) shared.warn(getWarnMessage(8 /* NOT_SUPPORTED_FORMATTER */ ));
    if (options.preserveDirectiveContent) shared.warn(getWarnMessage(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */ ));
    let messages = options.messages;
    if (shared.isPlainObject(options.sharedMessages)) {
        const sharedMessages = options.sharedMessages;
        const locales = Object.keys(sharedMessages);
        messages = locales.reduce((messages1, locale1)=>{
            const message = messages1[locale1] || (messages1[locale1] = {
            });
            shared.assign(message, sharedMessages[locale1]);
            return messages1;
        }, messages || {
        });
    }
    const { __i18n , __root  } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
        locale,
        fallbackLocale,
        messages,
        flatJson,
        datetimeFormats,
        numberFormats,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackRoot,
        fallbackFormat,
        modifiers,
        pluralRules: pluralizationRules,
        postTranslation,
        warnHtmlMessage,
        escapeParameter,
        inheritLocale,
        __i18n,
        __root
    };
}
/**
 * create VueI18n interface factory
 *
 * @internal
 */ function createVueI18n(options = {
}) {
    const composer = createComposer(convertComposerOptions(options));
    // defines VueI18n
    const vueI18n = {
        // id
        id: composer.id,
        // locale
        get locale () {
            return composer.locale.value;
        },
        set locale (val){
            composer.locale.value = val;
        },
        // fallbackLocale
        get fallbackLocale () {
            return composer.fallbackLocale.value;
        },
        set fallbackLocale (val1){
            composer.fallbackLocale.value = val1;
        },
        // messages
        get messages () {
            return composer.messages.value;
        },
        // datetimeFormats
        get datetimeFormats () {
            return composer.datetimeFormats.value;
        },
        // numberFormats
        get numberFormats () {
            return composer.numberFormats.value;
        },
        // availableLocales
        get availableLocales () {
            return composer.availableLocales;
        },
        // formatter
        get formatter () {
            shared.warn(getWarnMessage(8 /* NOT_SUPPORTED_FORMATTER */ ));
            // dummy
            return {
                interpolate () {
                    return [];
                }
            };
        },
        set formatter (val2){
            shared.warn(getWarnMessage(8 /* NOT_SUPPORTED_FORMATTER */ ));
        },
        // missing
        get missing () {
            return composer.getMissingHandler();
        },
        set missing (handler){
            composer.setMissingHandler(handler);
        },
        // silentTranslationWarn
        get silentTranslationWarn () {
            return shared.isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
        },
        set silentTranslationWarn (val3){
            composer.missingWarn = shared.isBoolean(val3) ? !val3 : val3;
        },
        // silentFallbackWarn
        get silentFallbackWarn () {
            return shared.isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
        },
        set silentFallbackWarn (val4){
            composer.fallbackWarn = shared.isBoolean(val4) ? !val4 : val4;
        },
        // modifiers
        get modifiers () {
            return composer.modifiers;
        },
        // formatFallbackMessages
        get formatFallbackMessages () {
            return composer.fallbackFormat;
        },
        set formatFallbackMessages (val5){
            composer.fallbackFormat = val5;
        },
        // postTranslation
        get postTranslation () {
            return composer.getPostTranslationHandler();
        },
        set postTranslation (handler1){
            composer.setPostTranslationHandler(handler1);
        },
        // sync
        get sync () {
            return composer.inheritLocale;
        },
        set sync (val6){
            composer.inheritLocale = val6;
        },
        // warnInHtmlMessage
        get warnHtmlInMessage () {
            return composer.warnHtmlMessage ? 'warn' : 'off';
        },
        set warnHtmlInMessage (val7){
            composer.warnHtmlMessage = val7 !== 'off';
        },
        // escapeParameterHtml
        get escapeParameterHtml () {
            return composer.escapeParameter;
        },
        set escapeParameterHtml (val8){
            composer.escapeParameter = val8;
        },
        // preserveDirectiveContent
        get preserveDirectiveContent () {
            shared.warn(getWarnMessage(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */ ));
            return true;
        },
        set preserveDirectiveContent (val9){
            shared.warn(getWarnMessage(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */ ));
        },
        // pluralizationRules
        get pluralizationRules () {
            return composer.pluralRules || {
            };
        },
        // for internal
        __composer: composer,
        // t
        t (...args) {
            const [arg1, arg2, arg3] = args;
            const options1 = {
            };
            let list = null;
            let named = null;
            if (!shared.isString(arg1)) throw createI18nError(15 /* INVALID_ARGUMENT */ );
            const key = arg1;
            if (shared.isString(arg2)) options1.locale = arg2;
            else if (shared.isArray(arg2)) list = arg2;
            else if (shared.isPlainObject(arg2)) named = arg2;
            if (shared.isArray(arg3)) list = arg3;
            else if (shared.isPlainObject(arg3)) named = arg3;
            return composer.t(key, list || named || {
            }, options1);
        },
        rt (...args) {
            return composer.rt(...args);
        },
        // tc
        tc (...args) {
            const [arg1, arg2, arg3] = args;
            const options1 = {
                plural: 1
            };
            let list = null;
            let named = null;
            if (!shared.isString(arg1)) throw createI18nError(15 /* INVALID_ARGUMENT */ );
            const key = arg1;
            if (shared.isString(arg2)) options1.locale = arg2;
            else if (shared.isNumber(arg2)) options1.plural = arg2;
            else if (shared.isArray(arg2)) list = arg2;
            else if (shared.isPlainObject(arg2)) named = arg2;
            if (shared.isString(arg3)) options1.locale = arg3;
            else if (shared.isArray(arg3)) list = arg3;
            else if (shared.isPlainObject(arg3)) named = arg3;
            return composer.t(key, list || named || {
            }, options1);
        },
        // te
        te (key, locale) {
            return composer.te(key, locale);
        },
        // tm
        tm (key) {
            return composer.tm(key);
        },
        // getLocaleMessage
        getLocaleMessage (locale) {
            return composer.getLocaleMessage(locale);
        },
        // setLocaleMessage
        setLocaleMessage (locale, message) {
            composer.setLocaleMessage(locale, message);
        },
        // mergeLocaleMessage
        mergeLocaleMessage (locale, message) {
            composer.mergeLocaleMessage(locale, message);
        },
        // d
        d (...args) {
            return composer.d(...args);
        },
        // getDateTimeFormat
        getDateTimeFormat (locale) {
            return composer.getDateTimeFormat(locale);
        },
        // setDateTimeFormat
        setDateTimeFormat (locale, format) {
            composer.setDateTimeFormat(locale, format);
        },
        // mergeDateTimeFormat
        mergeDateTimeFormat (locale, format) {
            composer.mergeDateTimeFormat(locale, format);
        },
        // n
        n (...args) {
            return composer.n(...args);
        },
        // getNumberFormat
        getNumberFormat (locale) {
            return composer.getNumberFormat(locale);
        },
        // setNumberFormat
        setNumberFormat (locale, format) {
            composer.setNumberFormat(locale, format);
        },
        // mergeNumberFormat
        mergeNumberFormat (locale, format) {
            composer.mergeNumberFormat(locale, format);
        },
        // getChoiceIndex
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getChoiceIndex (choice, choicesLength) {
            shared.warn(getWarnMessage(10 /* NOT_SUPPORTED_GET_CHOICE_INDEX */ ));
            return -1;
        },
        // for internal
        __onComponentInstanceCreated (target) {
            const { componentInstanceCreatedListener  } = options;
            if (componentInstanceCreatedListener) componentInstanceCreatedListener(target, vueI18n);
        }
    };
    vueI18n.__enableEmitter = (emitter)=>{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
    };
    vueI18n.__disableEmitter = ()=>{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
    };
    return vueI18n;
}
const baseFormatProps = {
    tag: {
        type: [
            String,
            Object
        ]
    },
    locale: {
        type: String
    },
    scope: {
        type: String,
        validator: (val)=>val === 'parent' || val === 'global'
        ,
        default: 'parent'
    },
    i18n: {
        type: Object
    }
};
/**
 * Translation Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [TranslationProps](component#translationprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Component Interpolation](../guide/advanced/component)
 *
 * @example
 * ```html
 * <div id="app">
 *   <!-- ... -->
 *   <i18n path="term" tag="label" for="tos">
 *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
 *   </i18n>
 *   <!-- ... -->
 * </div>
 * ```
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * const messages = {
 *   en: {
 *     tos: 'Term of Service',
 *     term: 'I accept xxx {0}.'
 *   },
 *   ja: {
 *     tos: '利用規約',
 *     term: '私は xxx の{0}に同意します。'
 *   }
 * }
 *
 * const i18n = createI18n({
 *   locale: 'en',
 *   messages
 * })
 *
 * const app = createApp({
 *   data: {
 *     url: '/term'
 *   }
 * }).use(i18n).mount('#app')
 * ```
 *
 * @VueI18nComponent
 */ const Translation = {
    /* eslint-disable */ name: 'i18n-t',
    props: shared.assign({
        keypath: {
            type: String,
            required: true
        },
        plural: {
            type: [
                Number,
                String
            ],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validator: (val)=>shared.isNumber(val) || !isNaN(val)
        }
    }, baseFormatProps),
    /* eslint-enable */ setup (props, context) {
        const { slots , attrs  } = context;
        const i18n = props.i18n || useI18n({
            useScope: props.scope
        });
        const keys = Object.keys(slots).filter((key)=>key !== '_'
        );
        return ()=>{
            const options = {
            };
            if (props.locale) options.locale = props.locale;
            if (props.plural !== undefined) options.plural = shared.isString(props.plural) ? +props.plural : props.plural;
            const arg = getInterpolateArg(context, keys);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
            const assignedAttrs = shared.assign({
            }, attrs);
            // prettier-ignore
            return shared.isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : shared.isObject(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
        };
    }
};
function getInterpolateArg({ slots  }, keys) {
    if (keys.length === 1 && keys[0] === 'default') // default slot only
    return slots.default ? slots.default() : [];
    else // named slots
    return keys.reduce((arg, key)=>{
        const slot = slots[key];
        if (slot) arg[key] = slot();
        return arg;
    }, {
    });
}
function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots , attrs  } = context;
    return ()=>{
        const options = {
            part: true
        };
        let overrides = {
        };
        if (props.locale) options.locale = props.locale;
        if (shared.isString(props.format)) options.key = props.format;
        else if (shared.isObject(props.format)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (shared.isString(props.format.key)) // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options.key = props.format.key;
            // Filter out number format options only
            overrides = Object.keys(props.format).reduce((options1, prop)=>{
                return slotKeys.includes(prop) ? shared.assign({
                }, options1, {
                    [prop]: props.format[prop]
                }) // eslint-disable-line @typescript-eslint/no-explicit-any
                 : options1;
            }, {
            });
        }
        const parts = partFormatter(...[
            props.value,
            options,
            overrides
        ]);
        let children = [
            options.key
        ];
        if (shared.isArray(parts)) children = parts.map((part, index)=>{
            const slot = slots[part.type];
            return slot ? slot({
                [part.type]: part.value,
                index,
                parts
            }) : [
                part.value
            ];
        });
        else if (shared.isString(parts)) children = [
            parts
        ];
        const assignedAttrs = shared.assign({
        }, attrs);
        // prettier-ignore
        return shared.isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : shared.isObject(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
}
const NUMBER_FORMAT_KEYS = [
    'localeMatcher',
    'style',
    'unit',
    'unitDisplay',
    'currency',
    'currencyDisplay',
    'useGrouping',
    'numberingSystem',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'notation',
    'formatMatcher'
];
/**
 * Number Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
 *
 * @VueI18nComponent
 */ const NumberFormat = {
    /* eslint-disable */ name: 'i18n-n',
    props: shared.assign({
        value: {
            type: Number,
            required: true
        },
        format: {
            type: [
                String,
                Object
            ]
        }
    }, baseFormatProps),
    /* eslint-enable */ setup (props, context) {
        const i18n = props.i18n || useI18n({
            useScope: 'parent'
        });
        return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args)=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
            i18n[NumberPartsSymbol](...args)
        );
    }
};
const DATETIME_FORMAT_KEYS = [
    'dateStyle',
    'timeStyle',
    'fractionalSecondDigits',
    'calendar',
    'dayPeriod',
    'numberingSystem',
    'localeMatcher',
    'timeZone',
    'hour12',
    'hourCycle',
    'formatMatcher',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName'
];
/**
 * Datetime Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
 *
 * @VueI18nComponent
 */ const DatetimeFormat = {
    /* eslint-disable */ name: 'i18n-d',
    props: shared.assign({
        value: {
            type: [
                Number,
                Date
            ],
            required: true
        },
        format: {
            type: [
                String,
                Object
            ]
        }
    }, baseFormatProps),
    /* eslint-enable */ setup (props, context) {
        const i18n = props.i18n || useI18n({
            useScope: 'parent'
        });
        return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args)=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
            i18n[DatetimePartsSymbol](...args)
        );
    }
};
function getComposer$1(i18n, instance) {
    const i18nInternal = i18n;
    if (i18n.mode === 'composition') return i18nInternal.__getInstance(instance) || i18n.global;
    else {
        const vueI18n = i18nInternal.__getInstance(instance);
        return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
    }
}
function vTDirective(i18n) {
    const bind = (el, { instance , value , modifiers  })=>{
        /* istanbul ignore if */ if (!instance || !instance.$) throw createI18nError(22 /* UNEXPECTED_ERROR */ );
        const composer = getComposer$1(i18n, instance.$);
        if (modifiers.preserve) shared.warn(getWarnMessage(7 /* NOT_SUPPORTED_PRESERVE */ ));
        const parsedValue = parseValue(value);
        el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
        beforeMount: bind,
        beforeUpdate: bind
    };
}
function parseValue(value) {
    if (shared.isString(value)) return {
        path: value
    };
    else if (shared.isPlainObject(value)) {
        if (!('path' in value)) throw createI18nError(19 /* REQUIRED_VALUE */ , 'path');
        return value;
    } else throw createI18nError(20 /* INVALID_VALUE */ );
}
function makeParams(value) {
    const { path , locale , args , choice , plural  } = value;
    const options = {
    };
    const named = args || {
    };
    if (shared.isString(locale)) options.locale = locale;
    if (shared.isNumber(choice)) options.plural = choice;
    if (shared.isNumber(plural)) options.plural = plural;
    return [
        path,
        named,
        options
    ];
}
function apply(app, i18n, ...options) {
    const pluginOptions = shared.isPlainObject(options[0]) ? options[0] : {
    };
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = shared.isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) shared.warn(getWarnMessage(11 /* COMPONENT_NAME_LEGACY_COMPATIBLE */ , {
        name: Translation.name
    }));
    if (globalInstall) {
        // install components
        app.component(!useI18nComponentName ? Translation.name : 'i18n', Translation);
        app.component(NumberFormat.name, NumberFormat);
        app.component(DatetimeFormat.name, DatetimeFormat);
    }
    // install directive
    app.directive('t', vTDirective(i18n));
}
// supports compatibility for legacy vue-i18n APIs
function defineMixin(vuei18n, composer, i18n) {
    return {
        beforeCreate () {
            const instance = vue.getCurrentInstance();
            /* istanbul ignore if */ if (!instance) throw createI18nError(22 /* UNEXPECTED_ERROR */ );
            const options = this.$options;
            if (options.i18n) {
                const optionsI18n = options.i18n;
                if (options.__i18n) optionsI18n.__i18n = options.__i18n;
                optionsI18n.__root = composer;
                if (this === this.$root) this.$i18n = mergeToRoot(vuei18n, optionsI18n);
                else this.$i18n = createVueI18n(optionsI18n);
            } else if (options.__i18n) {
                if (this === this.$root) this.$i18n = mergeToRoot(vuei18n, options);
                else this.$i18n = createVueI18n({
                    __i18n: options.__i18n,
                    __root: composer
                });
            } else // set global
            this.$i18n = vuei18n;
            vuei18n.__onComponentInstanceCreated(this.$i18n);
            i18n.__setInstance(instance, this.$i18n);
            // defines vue-i18n legacy APIs
            this.$t = (...args)=>this.$i18n.t(...args)
            ;
            this.$rt = (...args)=>this.$i18n.rt(...args)
            ;
            this.$tc = (...args)=>this.$i18n.tc(...args)
            ;
            this.$te = (key, locale)=>this.$i18n.te(key, locale)
            ;
            this.$d = (...args)=>this.$i18n.d(...args)
            ;
            this.$n = (...args)=>this.$i18n.n(...args)
            ;
            this.$tm = (key)=>this.$i18n.tm(key)
            ;
        },
        mounted () {
        },
        beforeUnmount () {
            const instance = vue.getCurrentInstance();
            /* istanbul ignore if */ if (!instance) throw createI18nError(22 /* UNEXPECTED_ERROR */ );
            delete this.$t;
            delete this.$rt;
            delete this.$tc;
            delete this.$te;
            delete this.$d;
            delete this.$n;
            delete this.$tm;
            i18n.__deleteInstance(instance);
            delete this.$i18n;
        }
    };
}
function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages = getLocaleMessages(root.locale, {
        messages: options.messages,
        __i18n: options.__i18n
    });
    Object.keys(messages).forEach((locale)=>root.mergeLocaleMessage(locale, messages[locale])
    );
    if (options.datetimeFormats) Object.keys(options.datetimeFormats).forEach((locale)=>root.mergeDateTimeFormat(locale, options.datetimeFormats[locale])
    );
    if (options.numberFormats) Object.keys(options.numberFormats).forEach((locale)=>root.mergeNumberFormat(locale, options.numberFormats[locale])
    );
    return root;
}
/**
 * Vue I18n factory
 *
 * @param options - An options, see the {@link I18nOptions}
 *
 * @returns {@link I18n} instance
 *
 * @remarks
 * If you use Legacy API mode, you need toto specify {@link VueI18nOptions} and `legacy: true` option.
 *
 * If you use composition API mode, you need to specify {@link ComposerOptions}.
 *
 * @VueI18nSee [Getting Started](../guide/)
 * @VueI18nSee [Composition API](../guide/advanced/composition)
 *
 * @example
 * case: for Legacy API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   // ...
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @example
 * case: for composition API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n, useI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   legacy: false, // you must specify 'legacy: false' option
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   setup() {
 *     // ...
 *     const { t } = useI18n({ ... })
 *     return { ... , t }
 *   }
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @VueI18nGeneral
 */ function createI18n(options1 = {
}) {
    // prettier-ignore
    const __legacyMode = shared.isBoolean(options1.legacy) ? options1.legacy : true;
    const __globalInjection = !!options1.globalInjection;
    const __instances = new Map();
    // prettier-ignore
    const __global = __legacyMode ? createVueI18n(options1) : createComposer(options1);
    const symbol = shared.makeSymbol('vue-i18n');
    const i18n = {
        // mode
        get mode () {
            // prettier-ignore
            return __legacyMode ? 'legacy' : 'composition';
        },
        // install plugin
        async install (app, ...options) {
            // setup global provider
            app.__VUE_I18N_SYMBOL__ = symbol;
            app.provide(app.__VUE_I18N_SYMBOL__, i18n);
            // global method and properties injection for Composition API
            if (!__legacyMode && __globalInjection) injectGlobalFields(app, i18n.global);
            apply(app, i18n, ...options);
            // setup mixin for Legacy API
            if (__legacyMode) app.mixin(defineMixin(__global, __global.__composer, i18n));
        },
        // global accessor
        get global () {
            return __global;
        },
        // @internal
        __instances,
        // @internal
        __getInstance (component) {
            return __instances.get(component) || null;
        },
        // @internal
        __setInstance (component, instance) {
            __instances.set(component, instance);
        },
        // @internal
        __deleteInstance (component) {
            __instances.delete(component);
        }
    };
    return i18n;
}
/**
 * Use Composition API for Vue I18n
 *
 * @param options - An options, see {@link UseI18nOptions}
 *
 * @returns {@link Composer} instance
 *
 * @remarks
 * This function is mainly used by `setup`.
 *
 * If options are specified, Composer instance is created for each component and you can be localized on the component.
 *
 * If options are not specified, you can be localized using the global Composer.
 *
 * @example
 * case: Component resource base localization
 * ```html
 * <template>
 *   <form>
 *     <label>{{ t('language') }}</label>
 *     <select v-model="locale">
 *       <option value="en">en</option>
 *       <option value="ja">ja</option>
 *     </select>
 *   </form>
 *   <p>message: {{ t('hello') }}</p>
 * </template>
 *
 * <script>
 * import { useI18n } from 'vue-i18n'
 *
 * export default {
 *  setup() {
 *    const { t, locale } = useI18n({
 *      locale: 'ja',
 *      messages: {
 *        en: { ... },
 *        ja: { ... }
 *      }
 *    })
 *    // Something to do ...
 *
 *    return { ..., t, locale }
 *  }
 * }
 * </script>
 * ```
 *
 * @VueI18nComposition
 */ function useI18n(options = {
}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) throw createI18nError(16 /* MUST_BE_CALL_SETUP_TOP */ );
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) throw createI18nError(17 /* NOT_INSLALLED */ );
    const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    /* istanbul ignore if */ if (!i18n) throw createI18nError(22 /* UNEXPECTED_ERROR */ );
    // prettier-ignore
    const global = i18n.mode === 'composition' ? i18n.global : i18n.global.__composer;
    // prettier-ignore
    const scope = shared.isEmptyObject(options) ? '__i18n' in instance.type ? 'local' : 'global' : !options.useScope ? 'local' : options.useScope;
    if (scope === 'global') {
        let messages = shared.isObject(options.messages) ? options.messages : {
        };
        if ('__i18nGlobal' in instance.type) messages = getLocaleMessages(global.locale.value, {
            messages,
            __i18n: instance.type.__i18nGlobal
        });
        // merge locale messages
        const locales = Object.keys(messages);
        if (locales.length) locales.forEach((locale)=>{
            global.mergeLocaleMessage(locale, messages[locale]);
        });
        // merge datetime formats
        if (shared.isObject(options.datetimeFormats)) {
            const locales1 = Object.keys(options.datetimeFormats);
            if (locales1.length) locales1.forEach((locale)=>{
                global.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
            });
        }
        // merge number formats
        if (shared.isObject(options.numberFormats)) {
            const locales1 = Object.keys(options.numberFormats);
            if (locales1.length) locales1.forEach((locale)=>{
                global.mergeNumberFormat(locale, options.numberFormats[locale]);
            });
        }
        return global;
    }
    if (scope === 'parent') {
        let composer = getComposer(i18n, instance);
        if (composer == null) {
            shared.warn(getWarnMessage(12 /* NOT_FOUND_PARENT_SCOPE */ ));
            composer = global;
        }
        return composer;
    }
    // scope 'local' case
    if (i18n.mode === 'legacy') throw createI18nError(18 /* NOT_AVAILABLE_IN_LEGACY_MODE */ );
    const i18nInternal = i18n;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
        const type = instance.type;
        const composerOptions = shared.assign({
        }, options);
        if (type.__i18n) composerOptions.__i18n = type.__i18n;
        if (global) composerOptions.__root = global;
        composer = createComposer(composerOptions);
        setupLifeCycle(i18nInternal, instance);
        i18nInternal.__setInstance(instance, composer);
    }
    return composer;
}
function getComposer(i18n, target) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while(current != null){
        const i18nInternal = i18n;
        if (i18n.mode === 'composition') composer = i18nInternal.__getInstance(current);
        else {
            const vueI18n = i18nInternal.__getInstance(current);
            if (vueI18n != null) composer = vueI18n.__composer;
        }
        if (composer != null) break;
        if (root === current) break;
        current = current.parent;
    }
    return composer;
}
function setupLifeCycle(i18n, target, composer) {
    vue.onMounted(()=>{
    }, target);
    vue.onUnmounted(()=>{
        i18n.__deleteInstance(target);
    }, target);
}
const globalExportProps = [
    'locale',
    'fallbackLocale',
    'availableLocales'
];
const globalExportMethods = [
    't',
    'rt',
    'd',
    'n',
    'tm'
];
function injectGlobalFields(app, composer) {
    const i18n = Object.create(null);
    globalExportProps.forEach((prop)=>{
        const desc = Object.getOwnPropertyDescriptor(composer, prop);
        if (!desc) throw createI18nError(22 /* UNEXPECTED_ERROR */ );
        const wrap = vue.isRef(desc.value) // check computed props
         ? {
            get () {
                return desc.value.value;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set (val) {
                desc.value.value = val;
            }
        } : {
            get () {
                return desc.get && desc.get();
            }
        };
        Object.defineProperty(i18n, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n;
    globalExportMethods.forEach((method)=>{
        const desc = Object.getOwnPropertyDescriptor(composer, method);
        if (!desc || !desc.value) throw createI18nError(22 /* UNEXPECTED_ERROR */ );
        Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
}
// register message compiler at vue-i18n
coreBase.registerMessageCompiler(coreBase.compileToFunction);
// NOTE: experimental !!
{
    const target = shared.getGlobalThis();
    target.__INTLIFY__ = true;
    coreBase.setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}exports.DatetimeFormat = DatetimeFormat;
exports.NumberFormat = NumberFormat;
exports.Translation = Translation;
exports.VERSION = VERSION;
exports.createI18n = createI18n;
exports.useI18n = useI18n;
exports.vTDirective = vTDirective;

},{"@intlify/shared":"5wiTS","@intlify/core-base":"l0Nlc","vue":"eg0LR"}],"5wiTS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "assign", ()=>assign
);
parcelHelpers.export(exports, "createEmitter", ()=>createEmitter
);
parcelHelpers.export(exports, "escapeHtml", ()=>escapeHtml
);
parcelHelpers.export(exports, "format", ()=>format
);
parcelHelpers.export(exports, "friendlyJSONstringify", ()=>friendlyJSONstringify
);
parcelHelpers.export(exports, "generateCodeFrame", ()=>generateCodeFrame
);
parcelHelpers.export(exports, "generateFormatCacheKey", ()=>generateFormatCacheKey
);
parcelHelpers.export(exports, "getGlobalThis", ()=>getGlobalThis
);
parcelHelpers.export(exports, "hasOwn", ()=>hasOwn
);
parcelHelpers.export(exports, "inBrowser", ()=>inBrowser
);
parcelHelpers.export(exports, "isArray", ()=>isArray
);
parcelHelpers.export(exports, "isBoolean", ()=>isBoolean
);
parcelHelpers.export(exports, "isDate", ()=>isDate
);
parcelHelpers.export(exports, "isEmptyObject", ()=>isEmptyObject
);
parcelHelpers.export(exports, "isFunction", ()=>isFunction
);
parcelHelpers.export(exports, "isNumber", ()=>isNumber
);
parcelHelpers.export(exports, "isObject", ()=>isObject
);
parcelHelpers.export(exports, "isPlainObject", ()=>isPlainObject
);
parcelHelpers.export(exports, "isPromise", ()=>isPromise
);
parcelHelpers.export(exports, "isRegExp", ()=>isRegExp
);
parcelHelpers.export(exports, "isString", ()=>isString
);
parcelHelpers.export(exports, "isSymbol", ()=>isSymbol
);
parcelHelpers.export(exports, "makeSymbol", ()=>makeSymbol
);
parcelHelpers.export(exports, "mark", ()=>mark
);
parcelHelpers.export(exports, "measure", ()=>measure
);
parcelHelpers.export(exports, "objectToString", ()=>objectToString
);
parcelHelpers.export(exports, "toDisplayString", ()=>toDisplayString
);
parcelHelpers.export(exports, "toTypeString", ()=>toTypeString
);
parcelHelpers.export(exports, "warn", ()=>warn
);
var global = arguments[3];
/*!
  * @intlify/shared v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */ /**
 * Original Utilities
 * written by kazuya kawaguchi
 */ const inBrowser = typeof window !== 'undefined';
let mark;
let measure;
{
    const perf = inBrowser && window.performance;
    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
        mark = (tag)=>perf.mark(tag)
        ;
        measure = (name, startTag, endTag)=>{
            perf.measure(name, startTag, endTag);
            perf.clearMarks(startTag);
            perf.clearMarks(endTag);
        };
    }
}const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
/* eslint-disable */ function format(message, ...args) {
    if (args.length === 1 && isObject(args[0])) args = args[0];
    if (!args || !args.hasOwnProperty) args = {
    };
    return message.replace(RE_ARGS, (match, identifier)=>{
        return args.hasOwnProperty(identifier) ? args[identifier] : '';
    });
}
const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const makeSymbol = (name)=>hasSymbol ? Symbol(name) : name
;
const generateFormatCacheKey = (locale, key, source)=>friendlyJSONstringify({
        l: locale,
        k: key,
        s: source
    })
;
const friendlyJSONstringify = (json)=>JSON.stringify(json).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029').replace(/\u0027/g, '\\u0027')
;
const isNumber = (val)=>typeof val === 'number' && isFinite(val)
;
const isDate = (val)=>toTypeString(val) === '[object Date]'
;
const isRegExp = (val)=>toTypeString(val) === '[object RegExp]'
;
const isEmptyObject = (val)=>isPlainObject(val) && Object.keys(val).length === 0
;
function warn(msg, err) {
    if (typeof console !== 'undefined') {
        console.warn(`[intlify] ` + msg);
        /* istanbul ignore if */ if (err) console.warn(err.stack);
    }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = ()=>{
    // prettier-ignore
    return _globalThis || (_globalThis = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {
    });
};
function escapeHtml(rawText) {
    return rawText.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
/* eslint-enable */ /**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */ const isArray = Array.isArray;
const isFunction = (val)=>typeof val === 'function'
;
const isString = (val)=>typeof val === 'string'
;
const isBoolean = (val)=>typeof val === 'boolean'
;
const isSymbol = (val)=>typeof val === 'symbol'
;
const isObject = (val)=>val !== null && typeof val === 'object'
;
const isPromise = (val)=>{
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value)=>objectToString.call(value)
;
const isPlainObject = (val)=>toTypeString(val) === '[object Object]'
;
// for converting list and named values to displayed strings.
const toDisplayString = (val)=>{
    return val == null ? '' : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for(let i = 0; i < lines.length; i++){
        count += lines[i].length + 1;
        if (count >= start) {
            for(let j = i - RANGE; j <= i + RANGE || end > count; j++){
                if (j < 0 || j >= lines.length) continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                } else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}
/**
 * Event emitter, forked from the below:
 * - original repository url: https://github.com/developit/mitt
 * - code url: https://github.com/developit/mitt/blob/master/src/index.ts
 * - author: Jason Miller (https://github.com/developit)
 * - license: MIT
 */ /**
 * Create a event emitter
 *
 * @returns An event emitter
 */ function createEmitter() {
    const events = new Map();
    const emitter = {
        events,
        on (event, handler) {
            const handlers = events.get(event);
            const added = handlers && handlers.push(handler);
            if (!added) events.set(event, [
                handler
            ]);
        },
        off (event, handler) {
            const handlers = events.get(event);
            if (handlers) handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        },
        emit (event, payload) {
            (events.get(event) || []).slice().map((handler)=>handler(payload)
            );
            (events.get('*') || []).slice().map((handler)=>handler(event, payload)
            );
        }
    };
    return emitter;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"l0Nlc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createCompileError", ()=>_messageCompiler.createCompileError
);
parcelHelpers.export(exports, "MISSING_RESOLVE_VALUE", ()=>MISSING_RESOLVE_VALUE
);
parcelHelpers.export(exports, "NOT_REOSLVED", ()=>NOT_REOSLVED
);
parcelHelpers.export(exports, "VERSION", ()=>VERSION
);
parcelHelpers.export(exports, "clearCompileCache", ()=>clearCompileCache
);
parcelHelpers.export(exports, "clearDateTimeFormat", ()=>clearDateTimeFormat
);
parcelHelpers.export(exports, "clearNumberFormat", ()=>clearNumberFormat
);
parcelHelpers.export(exports, "compileToFunction", ()=>compileToFunction
);
parcelHelpers.export(exports, "createCoreContext", ()=>createCoreContext
);
parcelHelpers.export(exports, "createCoreError", ()=>createCoreError
);
parcelHelpers.export(exports, "datetime", ()=>datetime
);
parcelHelpers.export(exports, "getAdditionalMeta", ()=>getAdditionalMeta
);
parcelHelpers.export(exports, "getDevToolsHook", ()=>getDevToolsHook
);
parcelHelpers.export(exports, "getLocaleChain", ()=>getLocaleChain
);
parcelHelpers.export(exports, "getWarnMessage", ()=>getWarnMessage
);
parcelHelpers.export(exports, "handleMissing", ()=>handleMissing
);
parcelHelpers.export(exports, "initI18nDevTools", ()=>initI18nDevTools
);
parcelHelpers.export(exports, "isMessageFunction", ()=>isMessageFunction
);
parcelHelpers.export(exports, "isTranslateFallbackWarn", ()=>isTranslateFallbackWarn
);
parcelHelpers.export(exports, "isTranslateMissingWarn", ()=>isTranslateMissingWarn
);
parcelHelpers.export(exports, "number", ()=>number
);
parcelHelpers.export(exports, "parseDateTimeArgs", ()=>parseDateTimeArgs
);
parcelHelpers.export(exports, "parseNumberArgs", ()=>parseNumberArgs
);
parcelHelpers.export(exports, "parseTranslateArgs", ()=>parseTranslateArgs
);
parcelHelpers.export(exports, "registerMessageCompiler", ()=>registerMessageCompiler
);
parcelHelpers.export(exports, "setAdditionalMeta", ()=>setAdditionalMeta
);
parcelHelpers.export(exports, "setDevToolsHook", ()=>setDevToolsHook
);
parcelHelpers.export(exports, "translate", ()=>translate
);
parcelHelpers.export(exports, "translateDevTools", ()=>translateDevTools
);
parcelHelpers.export(exports, "updateFallbackLocale", ()=>updateFallbackLocale
);
/*!
  * @intlify/core-base v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */ var _shared = require("@intlify/shared");
var _messageResolver = require("@intlify/message-resolver");
var _runtime = require("@intlify/runtime");
var _messageCompiler = require("@intlify/message-compiler");
var _devtoolsIf = require("@intlify/devtools-if");
parcelHelpers.exportAll(_messageResolver, exports);
parcelHelpers.exportAll(_runtime, exports);
let devtools = null;
function setDevToolsHook(hook) {
    devtools = hook;
}
function getDevToolsHook() {
    return devtools;
}
function initI18nDevTools(i18n, version, meta) {
    // TODO: queue if devtools is undefined
    devtools && devtools.emit(_devtoolsIf.IntlifyDevToolsHooks.I18nInit, {
        timestamp: Date.now(),
        i18n,
        version,
        meta
    });
}
const translateDevTools = /* #__PURE__*/ createDevToolsHook(_devtoolsIf.IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
    return (payloads)=>devtools && devtools.emit(hook, payloads)
    ;
}
/** @internal */ const warnMessages = {
    [0 /* NOT_FOUND_KEY */ ]: `Not found '{key}' key in '{locale}' locale messages.`,
    [1 /* FALLBACK_TO_TRANSLATE */ ]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [2 /* CANNOT_FORMAT_NUMBER */ ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [3 /* FALLBACK_TO_NUMBER_FORMAT */ ]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [4 /* CANNOT_FORMAT_DATE */ ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [5 /* FALLBACK_TO_DATE_FORMAT */ ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
};
function getWarnMessage(code, ...args) {
    return _shared.format(warnMessages[code], ...args);
}
/**
 * Intlify core-base version
 * @internal
 */ const VERSION = '9.1.7';
const NOT_REOSLVED = -1;
const MISSING_RESOLVE_VALUE = '';
function getDefaultLinkedModifiers() {
    return {
        upper: (val)=>_shared.isString(val) ? val.toUpperCase() : val
        ,
        lower: (val)=>_shared.isString(val) ? val.toLowerCase() : val
        ,
        // prettier-ignore
        capitalize: (val)=>_shared.isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
}
let _compiler;
function registerMessageCompiler(compiler) {
    _compiler = compiler;
}
// Additional Meta for Intlify DevTools
let _additionalMeta = null;
const setAdditionalMeta = /* #__PURE__*/ (meta)=>{
    _additionalMeta = meta;
};
const getAdditionalMeta = /* #__PURE__*/ ()=>_additionalMeta
;
// ID for CoreContext
let _cid = 0;
function createCoreContext(options = {
}) {
    // setup options
    const version = _shared.isString(options.version) ? options.version : VERSION;
    const locale = _shared.isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = _shared.isArray(options.fallbackLocale) || _shared.isPlainObject(options.fallbackLocale) || _shared.isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const messages = _shared.isPlainObject(options.messages) ? options.messages : {
        [locale]: {
        }
    };
    const datetimeFormats = _shared.isPlainObject(options.datetimeFormats) ? options.datetimeFormats : {
        [locale]: {
        }
    };
    const numberFormats = _shared.isPlainObject(options.numberFormats) ? options.numberFormats : {
        [locale]: {
        }
    };
    const modifiers = _shared.assign({
    }, options.modifiers || {
    }, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {
    };
    const missing = _shared.isFunction(options.missing) ? options.missing : null;
    const missingWarn = _shared.isBoolean(options.missingWarn) || _shared.isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = _shared.isBoolean(options.fallbackWarn) || _shared.isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = _shared.isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = _shared.isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = _shared.isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = _shared.isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = _shared.isFunction(options.onWarn) ? options.onWarn : _shared.warn;
    // setup internal options
    const internalOptions = options;
    const __datetimeFormatters = _shared.isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : new Map();
    const __numberFormatters = _shared.isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : new Map();
    const __meta = _shared.isObject(internalOptions.__meta) ? internalOptions.__meta : {
    };
    _cid++;
    const context = {
        version,
        cid: _cid,
        locale,
        fallbackLocale,
        messages,
        datetimeFormats,
        numberFormats,
        modifiers,
        pluralRules,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackFormat,
        unresolving,
        postTranslation,
        processor,
        warnHtmlMessage,
        escapeParameter,
        messageCompiler,
        onWarn,
        __datetimeFormatters,
        __numberFormatters,
        __meta
    };
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : undefined;
    initI18nDevTools(context, version, __meta);
    return context;
}
/** @internal */ function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
/** @internal */ function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
}
/** @internal */ function handleMissing(context, key, locale, missingWarn, type) {
    const { missing , onWarn  } = context;
    {
        const emitter = context.__v_emitter;
        if (emitter) emitter.emit("missing" /* MISSING */ , {
            locale,
            key,
            type,
            groupId: `${type}:${key}`
        });
    }
    if (missing !== null) {
        const ret = missing(context, locale, key, type);
        return _shared.isString(ret) ? ret : key;
    } else {
        if (isTranslateMissingWarn(missingWarn, key)) onWarn(getWarnMessage(0 /* NOT_FOUND_KEY */ , {
            key,
            locale
        }));
        return key;
    }
}
/** @internal */ function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) context.__localeChainCache = new Map();
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
        chain = [];
        // first block defined by start
        let block = [
            start
        ];
        // while any intervening block found
        while(_shared.isArray(block))block = appendBlockToChain(chain, block, fallback);
        // prettier-ignore
        // last block defined by default
        const defaults = _shared.isArray(fallback) ? fallback : _shared.isPlainObject(fallback) ? fallback['default'] ? fallback['default'] : null : fallback;
        // convert defaults to array
        block = _shared.isString(defaults) ? [
            defaults
        ] : defaults;
        if (_shared.isArray(block)) appendBlockToChain(chain, block, false);
        context.__localeChainCache.set(start, chain);
    }
    return chain;
}
function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for(let i = 0; i < block.length && _shared.isBoolean(follow); i++){
        const locale = block[i];
        if (_shared.isString(locale)) follow = appendLocaleToChain(chain, block[i], blocks);
    }
    return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split('-');
    do {
        const target = tokens.join('-');
        follow = appendItemToChain(chain, target, blocks);
        tokens.splice(-1, 1);
    }while (tokens.length && follow === true)
    return follow;
}
function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
        follow = true;
        if (target) {
            follow = target[target.length - 1] !== '!';
            const locale = target.replace(/!/g, '');
            chain.push(locale);
            if ((_shared.isArray(blocks) || _shared.isPlainObject(blocks)) && blocks[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
            ) // eslint-disable-next-line @typescript-eslint/no-explicit-any
            follow = blocks[locale];
        }
    }
    return follow;
}
/** @internal */ function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = new Map();
    getLocaleChain(ctx, fallback, locale);
}
const RE_HTML_TAG = /<\/?[\w\s="/.':;#-\/]+>/;
const WARN_MESSAGE = `Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.`;
function checkHtmlMessage(source, options) {
    const warnHtmlMessage = _shared.isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    if (warnHtmlMessage && RE_HTML_TAG.test(source)) _shared.warn(_shared.format(WARN_MESSAGE, {
        source
    }));
}
const defaultOnCacheKey = (source)=>source
;
let compileCache = Object.create(null);
function clearCompileCache() {
    compileCache = Object.create(null);
}
function compileToFunction(source, options = {
}) {
    {
        checkHtmlMessage(source, options);
        // check caches
        const onCacheKey = options.onCacheKey || defaultOnCacheKey;
        const key = onCacheKey(source);
        const cached = compileCache[key];
        if (cached) return cached;
        // compile error detecting
        let occurred = false;
        const onError = options.onError || _messageCompiler.defaultOnError;
        options.onError = (err)=>{
            occurred = true;
            onError(err);
        };
        // compile
        const { code  } = _messageCompiler.baseCompile(source, options);
        // evaluate function
        const msg = new Function(`return ${code}`)();
        // if occurred compile error, don't cache
        return !occurred ? compileCache[key] = msg : msg;
    }
}
function createCoreError(code) {
    return _messageCompiler.createCompileError(code, null, {
        messages: errorMessages
    });
}
/** @internal */ const errorMessages = {
    [14 /* INVALID_ARGUMENT */ ]: 'Invalid arguments',
    [15 /* INVALID_DATE_ARGUMENT */ ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [16 /* INVALID_ISO_DATE_ARGUMENT */ ]: 'The argument provided is not a valid ISO date string'
};
const NOOP_MESSAGE_FUNCTION = ()=>''
;
const isMessageFunction = (val)=>_shared.isFunction(val)
;
// implementation of `translate` function
function translate(context, ...args) {
    const { fallbackFormat , postTranslation , unresolving , fallbackLocale , messages  } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = _shared.isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = _shared.isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = _shared.isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    // prettier-ignore
    const defaultMsgOrKey = _shared.isString(options.default) || _shared.isBoolean(options.default) // default by function option
     ? !_shared.isBoolean(options.default) ? options.default : key : fallbackFormat // default by `fallbackFormat` option
     ? key : '';
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
    const locale = _shared.isString(options.locale) ? options.locale : context.locale;
    // escape params
    escapeParameter && escapeParams(options);
    // resolve message format
    // eslint-disable-next-line prefer-const
    let [format, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
        key,
        locale,
        messages[locale] || {
        }
    ];
    // if you use default message, set it as message format!
    let cacheBaseKey = key;
    if (!resolvedMessage && !(_shared.isString(format) || isMessageFunction(format))) {
        if (enableDefaultMsg) {
            format = defaultMsgOrKey;
            cacheBaseKey = format;
        }
    }
    // checking message format and target locale
    if (!resolvedMessage && (!(_shared.isString(format) || isMessageFunction(format)) || !_shared.isString(targetLocale))) return unresolving ? NOT_REOSLVED : key;
    if (_shared.isString(format) && context.messageCompiler == null) {
        _shared.warn(`The message format compilation is not supported in this build. ` + `Because message compiler isn't included. ` + `You need to pre-compilation all message format. ` + `So translate function return '${key}'.`);
        return key;
    }
    // setup compile error detecting
    let occurred = false;
    const errorDetector = ()=>{
        occurred = true;
    };
    // compile message format
    const msg = !isMessageFunction(format) ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) : format;
    // if occurred compile error, return the message format
    if (occurred) return format;
    // evaluate message with context
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = _runtime.createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    // if use post translation option, proceed it with handler
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
        // prettier-ignore
        const payloads = {
            timestamp: Date.now(),
            key: _shared.isString(key) ? key : isMessageFunction(format) ? format.key : '',
            locale: targetLocale || (isMessageFunction(format) ? format.locale : ''),
            format: _shared.isString(format) ? format : isMessageFunction(format) ? format.source : '',
            message: ret
        };
        payloads.meta = _shared.assign({
        }, context.__meta, getAdditionalMeta() || {
        });
        translateDevTools(payloads);
    }
    return ret;
}
function escapeParams(options) {
    if (_shared.isArray(options.list)) options.list = options.list.map((item)=>_shared.isString(item) ? _shared.escapeHtml(item) : item
    );
    else if (_shared.isObject(options.named)) Object.keys(options.named).forEach((key)=>{
        if (_shared.isString(options.named[key])) options.named[key] = _shared.escapeHtml(options.named[key]);
    });
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages , onWarn  } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {
    };
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'translate';
    for(let i = 0; i < locales.length; i++){
        targetLocale = to = locales[i];
        if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) onWarn(getWarnMessage(1 /* FALLBACK_TO_TRANSLATE */ , {
            key,
            target: targetLocale
        }));
        // for vue-devtools timeline event
        if (locale !== targetLocale) {
            const emitter = context.__v_emitter;
            if (emitter) emitter.emit("fallback" /* FALBACK */ , {
                type,
                key,
                from,
                to,
                groupId: `${type}:${key}`
            });
        }
        message = messages[targetLocale] || {
        };
        // for vue-devtools timeline event
        let start = null;
        let startTag;
        let endTag;
        if (_shared.inBrowser) {
            start = window.performance.now();
            startTag = 'intlify-message-resolve-start';
            endTag = 'intlify-message-resolve-end';
            _shared.mark && _shared.mark(startTag);
        }
        if ((format = _messageResolver.resolveValue(message, key)) === null) // if null, resolve with object key path
        format = message[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
        // for vue-devtools timeline event
        if (_shared.inBrowser) {
            const end = window.performance.now();
            const emitter = context.__v_emitter;
            if (emitter && start && format) emitter.emit("message-resolve" /* MESSAGE_RESOLVE */ , {
                type: "message-resolve" /* MESSAGE_RESOLVE */ ,
                key,
                message: format,
                time: end - start,
                groupId: `${type}:${key}`
            });
            if (startTag && endTag && _shared.mark && _shared.measure) {
                _shared.mark(endTag);
                _shared.measure('intlify message resolve', startTag, endTag);
            }
        }
        if (_shared.isString(format) || _shared.isFunction(format)) break;
        const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
        if (missingRet !== key) format = missingRet;
        from = to;
    }
    return [
        format,
        targetLocale,
        message
    ];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) {
    const { messageCompiler , warnHtmlMessage  } = context;
    if (isMessageFunction(format)) {
        const msg = format;
        msg.locale = msg.locale || targetLocale;
        msg.key = msg.key || key;
        return msg;
    }
    // for vue-devtools timeline event
    let start = null;
    let startTag;
    let endTag;
    if (_shared.inBrowser) {
        start = window.performance.now();
        startTag = 'intlify-message-compilation-start';
        endTag = 'intlify-message-compilation-end';
        _shared.mark && _shared.mark(startTag);
    }
    const msg = messageCompiler(format, getCompileOptions(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
    // for vue-devtools timeline event
    if (_shared.inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start) emitter.emit("message-compilation" /* MESSAGE_COMPILATION */ , {
            type: "message-compilation" /* MESSAGE_COMPILATION */ ,
            message: format,
            time: end - start,
            groupId: `${'translate'}:${key}`
        });
        if (startTag && endTag && _shared.mark && _shared.measure) {
            _shared.mark(endTag);
            _shared.measure('intlify message compilation', startTag, endTag);
        }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format;
    return msg;
}
function evaluateMessage(context, msg, msgCtx) {
    // for vue-devtools timeline event
    let start = null;
    let startTag;
    let endTag;
    if (_shared.inBrowser) {
        start = window.performance.now();
        startTag = 'intlify-message-evaluation-start';
        endTag = 'intlify-message-evaluation-end';
        _shared.mark && _shared.mark(startTag);
    }
    const messaged = msg(msgCtx);
    // for vue-devtools timeline event
    if (_shared.inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start) emitter.emit("message-evaluation" /* MESSAGE_EVALUATION */ , {
            type: "message-evaluation" /* MESSAGE_EVALUATION */ ,
            value: messaged,
            time: end - start,
            groupId: `${'translate'}:${msg.key}`
        });
        if (startTag && endTag && _shared.mark && _shared.measure) {
            _shared.mark(endTag);
            _shared.measure('intlify message evaluation', startTag, endTag);
        }
    }
    return messaged;
}
/** @internal */ function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {
    };
    if (!_shared.isString(arg1) && !_shared.isNumber(arg1) && !isMessageFunction(arg1)) throw createCoreError(14 /* INVALID_ARGUMENT */ );
    // prettier-ignore
    const key = _shared.isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (_shared.isNumber(arg2)) options.plural = arg2;
    else if (_shared.isString(arg2)) options.default = arg2;
    else if (_shared.isPlainObject(arg2) && !_shared.isEmptyObject(arg2)) options.named = arg2;
    else if (_shared.isArray(arg2)) options.list = arg2;
    if (_shared.isNumber(arg3)) options.plural = arg3;
    else if (_shared.isString(arg3)) options.default = arg3;
    else if (_shared.isPlainObject(arg3)) _shared.assign(options, arg3);
    return [
        key,
        options
    ];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
        warnHtmlMessage,
        onError: (err)=>{
            errorDetector && errorDetector(err);
            {
                const message = `Message compilation error: ${err.message}`;
                const codeFrame = err.location && _shared.generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
                const emitter = context.__v_emitter;
                if (emitter) emitter.emit("compile-error" /* COMPILE_ERROR */ , {
                    message: source,
                    error: err.message,
                    start: err.location && err.location.start.offset,
                    end: err.location && err.location.end.offset,
                    groupId: `${'translate'}:${key}`
                });
                console.error(codeFrame ? `${message}\n${codeFrame}` : message);
            }
        },
        onCacheKey: (source1)=>_shared.generateFormatCacheKey(locale, key, source1)
    };
}
function getMessageContextOptions(context, locale, message, options) {
    const { modifiers , pluralRules  } = context;
    const resolveMessage = (key)=>{
        const val = _messageResolver.resolveValue(message, key);
        if (_shared.isString(val)) {
            let occurred = false;
            const errorDetector = ()=>{
                occurred = true;
            };
            const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
            return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
        } else if (isMessageFunction(val)) return val;
        else // TODO: should be implemented warning message
        return NOOP_MESSAGE_FUNCTION;
    };
    const ctxOptions = {
        locale,
        modifiers,
        pluralRules,
        messages: resolveMessage
    };
    if (context.processor) ctxOptions.processor = context.processor;
    if (options.list) ctxOptions.list = options.list;
    if (options.named) ctxOptions.named = options.named;
    if (_shared.isNumber(options.plural)) ctxOptions.pluralIndex = options.plural;
    return ctxOptions;
}
const intlDefined = typeof Intl !== 'undefined';
const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
    numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
};
// implementation of `datetime` function
function datetime(context, ...args) {
    const { datetimeFormats , unresolving , fallbackLocale , onWarn  } = context;
    const { __datetimeFormatters  } = context;
    if (!Availabilities.dateTimeFormat) {
        onWarn(getWarnMessage(4 /* CANNOT_FORMAT_DATE */ ));
        return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = _shared.isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = _shared.isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = _shared.isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!_shared.isString(key) || key === '') return new Intl.DateTimeFormat(locale).format(value);
    // resolve format
    let datetimeFormat = {
    };
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'datetime format';
    for(let i = 0; i < locales.length; i++){
        targetLocale = to = locales[i];
        if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) onWarn(getWarnMessage(5 /* FALLBACK_TO_DATE_FORMAT */ , {
            key,
            target: targetLocale
        }));
        // for vue-devtools timeline event
        if (locale !== targetLocale) {
            const emitter = context.__v_emitter;
            if (emitter) emitter.emit("fallback" /* FALBACK */ , {
                type,
                key,
                from,
                to,
                groupId: `${type}:${key}`
            });
        }
        datetimeFormat = datetimeFormats[targetLocale] || {
        };
        format = datetimeFormat[key];
        if (_shared.isPlainObject(format)) break;
        handleMissing(context, key, targetLocale, missingWarn, type);
        from = to;
    }
    // checking format and target locale
    if (!_shared.isPlainObject(format) || !_shared.isString(targetLocale)) return unresolving ? NOT_REOSLVED : key;
    let id = `${targetLocale}__${key}`;
    if (!_shared.isEmptyObject(overrides)) id = `${id}__${JSON.stringify(overrides)}`;
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(targetLocale, _shared.assign({
        }, format, overrides));
        __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */ function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {
    };
    let overrides = {
    };
    let value;
    if (_shared.isString(arg1)) {
        // Only allow ISO strings - other date formats are often supported,
        // but may cause different results in different browsers.
        if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) throw createCoreError(16 /* INVALID_ISO_DATE_ARGUMENT */ );
        value = new Date(arg1);
        try {
            // This will fail if the date is not valid
            value.toISOString();
        } catch (e) {
            throw createCoreError(16 /* INVALID_ISO_DATE_ARGUMENT */ );
        }
    } else if (_shared.isDate(arg1)) {
        if (isNaN(arg1.getTime())) throw createCoreError(15 /* INVALID_DATE_ARGUMENT */ );
        value = arg1;
    } else if (_shared.isNumber(arg1)) value = arg1;
    else throw createCoreError(14 /* INVALID_ARGUMENT */ );
    if (_shared.isString(arg2)) options.key = arg2;
    else if (_shared.isPlainObject(arg2)) options = arg2;
    if (_shared.isString(arg3)) options.locale = arg3;
    else if (_shared.isPlainObject(arg3)) overrides = arg3;
    if (_shared.isPlainObject(arg4)) overrides = arg4;
    return [
        options.key || '',
        value,
        options,
        overrides
    ];
}
/** @internal */ function clearDateTimeFormat(ctx, locale, format) {
    const context = ctx;
    for(const key in format){
        const id = `${locale}__${key}`;
        if (!context.__datetimeFormatters.has(id)) continue;
        context.__datetimeFormatters.delete(id);
    }
}
// implementation of `number` function
function number(context, ...args) {
    const { numberFormats , unresolving , fallbackLocale , onWarn  } = context;
    const { __numberFormatters  } = context;
    if (!Availabilities.numberFormat) {
        onWarn(getWarnMessage(2 /* CANNOT_FORMAT_NUMBER */ ));
        return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = _shared.isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = _shared.isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = _shared.isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!_shared.isString(key) || key === '') return new Intl.NumberFormat(locale).format(value);
    // resolve format
    let numberFormat = {
    };
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'number format';
    for(let i = 0; i < locales.length; i++){
        targetLocale = to = locales[i];
        if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) onWarn(getWarnMessage(3 /* FALLBACK_TO_NUMBER_FORMAT */ , {
            key,
            target: targetLocale
        }));
        // for vue-devtools timeline event
        if (locale !== targetLocale) {
            const emitter = context.__v_emitter;
            if (emitter) emitter.emit("fallback" /* FALBACK */ , {
                type,
                key,
                from,
                to,
                groupId: `${type}:${key}`
            });
        }
        numberFormat = numberFormats[targetLocale] || {
        };
        format = numberFormat[key];
        if (_shared.isPlainObject(format)) break;
        handleMissing(context, key, targetLocale, missingWarn, type);
        from = to;
    }
    // checking format and target locale
    if (!_shared.isPlainObject(format) || !_shared.isString(targetLocale)) return unresolving ? NOT_REOSLVED : key;
    let id = `${targetLocale}__${key}`;
    if (!_shared.isEmptyObject(overrides)) id = `${id}__${JSON.stringify(overrides)}`;
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.NumberFormat(targetLocale, _shared.assign({
        }, format, overrides));
        __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */ function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {
    };
    let overrides = {
    };
    if (!_shared.isNumber(arg1)) throw createCoreError(14 /* INVALID_ARGUMENT */ );
    const value = arg1;
    if (_shared.isString(arg2)) options.key = arg2;
    else if (_shared.isPlainObject(arg2)) options = arg2;
    if (_shared.isString(arg3)) options.locale = arg3;
    else if (_shared.isPlainObject(arg3)) overrides = arg3;
    if (_shared.isPlainObject(arg4)) overrides = arg4;
    return [
        options.key || '',
        value,
        options,
        overrides
    ];
}
/** @internal */ function clearNumberFormat(ctx, locale, format) {
    const context = ctx;
    for(const key in format){
        const id = `${locale}__${key}`;
        if (!context.__numberFormatters.has(id)) continue;
        context.__numberFormatters.delete(id);
    }
}
if (typeof __INTLIFY_PROD_DEVTOOLS__ !== 'boolean') _shared.getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;

},{"@intlify/shared":"5wiTS","@intlify/message-resolver":"49Pls","@intlify/runtime":"f8s2z","@intlify/message-compiler":"4q6jp","@intlify/devtools-if":"ksbWd","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"49Pls":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFlatJson", ()=>handleFlatJson
);
parcelHelpers.export(exports, "parse", ()=>parse
);
parcelHelpers.export(exports, "resolveValue", ()=>resolveValue
);
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
const isObject = (val)=>val !== null && typeof val === 'object'
;
const pathStateMachine = [];
pathStateMachine[0 /* BEFORE_PATH */ ] = {
    ["w" /* WORKSPACE */ ]: [
        0 /* BEFORE_PATH */ 
    ],
    ["i" /* IDENT */ ]: [
        3 /* IN_IDENT */ ,
        0 /* APPEND */ 
    ],
    ["[" /* LEFT_BRACKET */ ]: [
        4 /* IN_SUB_PATH */ 
    ],
    ["o" /* END_OF_FAIL */ ]: [
        7 /* AFTER_PATH */ 
    ]
};
pathStateMachine[1 /* IN_PATH */ ] = {
    ["w" /* WORKSPACE */ ]: [
        1 /* IN_PATH */ 
    ],
    ["." /* DOT */ ]: [
        2 /* BEFORE_IDENT */ 
    ],
    ["[" /* LEFT_BRACKET */ ]: [
        4 /* IN_SUB_PATH */ 
    ],
    ["o" /* END_OF_FAIL */ ]: [
        7 /* AFTER_PATH */ 
    ]
};
pathStateMachine[2 /* BEFORE_IDENT */ ] = {
    ["w" /* WORKSPACE */ ]: [
        2 /* BEFORE_IDENT */ 
    ],
    ["i" /* IDENT */ ]: [
        3 /* IN_IDENT */ ,
        0 /* APPEND */ 
    ],
    ["0" /* ZERO */ ]: [
        3 /* IN_IDENT */ ,
        0 /* APPEND */ 
    ]
};
pathStateMachine[3 /* IN_IDENT */ ] = {
    ["i" /* IDENT */ ]: [
        3 /* IN_IDENT */ ,
        0 /* APPEND */ 
    ],
    ["0" /* ZERO */ ]: [
        3 /* IN_IDENT */ ,
        0 /* APPEND */ 
    ],
    ["w" /* WORKSPACE */ ]: [
        1 /* IN_PATH */ ,
        1 /* PUSH */ 
    ],
    ["." /* DOT */ ]: [
        2 /* BEFORE_IDENT */ ,
        1 /* PUSH */ 
    ],
    ["[" /* LEFT_BRACKET */ ]: [
        4 /* IN_SUB_PATH */ ,
        1 /* PUSH */ 
    ],
    ["o" /* END_OF_FAIL */ ]: [
        7 /* AFTER_PATH */ ,
        1 /* PUSH */ 
    ]
};
pathStateMachine[4 /* IN_SUB_PATH */ ] = {
    ["'" /* SINGLE_QUOTE */ ]: [
        5 /* IN_SINGLE_QUOTE */ ,
        0 /* APPEND */ 
    ],
    ["\"" /* DOUBLE_QUOTE */ ]: [
        6 /* IN_DOUBLE_QUOTE */ ,
        0 /* APPEND */ 
    ],
    ["[" /* LEFT_BRACKET */ ]: [
        4 /* IN_SUB_PATH */ ,
        2 /* INC_SUB_PATH_DEPTH */ 
    ],
    ["]" /* RIGHT_BRACKET */ ]: [
        1 /* IN_PATH */ ,
        3 /* PUSH_SUB_PATH */ 
    ],
    ["o" /* END_OF_FAIL */ ]: 8 /* ERROR */ ,
    ["l" /* ELSE */ ]: [
        4 /* IN_SUB_PATH */ ,
        0 /* APPEND */ 
    ]
};
pathStateMachine[5 /* IN_SINGLE_QUOTE */ ] = {
    ["'" /* SINGLE_QUOTE */ ]: [
        4 /* IN_SUB_PATH */ ,
        0 /* APPEND */ 
    ],
    ["o" /* END_OF_FAIL */ ]: 8 /* ERROR */ ,
    ["l" /* ELSE */ ]: [
        5 /* IN_SINGLE_QUOTE */ ,
        0 /* APPEND */ 
    ]
};
pathStateMachine[6 /* IN_DOUBLE_QUOTE */ ] = {
    ["\"" /* DOUBLE_QUOTE */ ]: [
        4 /* IN_SUB_PATH */ ,
        0 /* APPEND */ 
    ],
    ["o" /* END_OF_FAIL */ ]: 8 /* ERROR */ ,
    ["l" /* ELSE */ ]: [
        6 /* IN_DOUBLE_QUOTE */ ,
        0 /* APPEND */ 
    ]
};
/**
 * Check if an expression is a literal value.
 */ const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
    return literalValueRE.test(exp);
}
/**
 * Strip quotes from a string
 */ function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
/**
 * Determine the type of a character in a keypath.
 */ function getPathCharType(ch) {
    if (ch === undefined || ch === null) return "o" /* END_OF_FAIL */ ;
    const code = ch.charCodeAt(0);
    switch(code){
        case 91:
        case 93:
        case 46:
        case 34:
        case 39:
            return ch;
        case 95:
        case 36:
        case 45:
            return "i" /* IDENT */ ;
        case 9:
        case 10:
        case 13:
        case 160:
        case 65279:
        case 8232:
        case 8233:
            return "w" /* WORKSPACE */ ;
    }
    return "i" /* IDENT */ ;
}
/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */ function formatSubPath(path) {
    const trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(parseInt(path))) return false;
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" /* ASTARISK */  + trimmed;
}
/**
 * Parse a string path into an array of segments
 */ function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0 /* BEFORE_PATH */ ;
    let subPathDepth = 0;
    let c;
    let key; // eslint-disable-line
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[0 /* APPEND */ ] = ()=>{
        if (key === undefined) key = newChar;
        else key += newChar;
    };
    actions[1 /* PUSH */ ] = ()=>{
        if (key !== undefined) {
            keys.push(key);
            key = undefined;
        }
    };
    actions[2 /* INC_SUB_PATH_DEPTH */ ] = ()=>{
        actions[0 /* APPEND */ ]();
        subPathDepth++;
    };
    actions[3 /* PUSH_SUB_PATH */ ] = ()=>{
        if (subPathDepth > 0) {
            subPathDepth--;
            mode = 4 /* IN_SUB_PATH */ ;
            actions[0 /* APPEND */ ]();
        } else {
            subPathDepth = 0;
            if (key === undefined) return false;
            key = formatSubPath(key);
            if (key === false) return false;
            else actions[1 /* PUSH */ ]();
        }
    };
    function maybeUnescapeQuote() {
        const nextChar = path[index + 1];
        if (mode === 5 /* IN_SINGLE_QUOTE */  && nextChar === "'" /* SINGLE_QUOTE */  || mode === 6 /* IN_DOUBLE_QUOTE */  && nextChar === "\"" /* DOUBLE_QUOTE */ ) {
            index++;
            newChar = '\\' + nextChar;
            actions[0 /* APPEND */ ]();
            return true;
        }
    }
    while(mode !== null){
        index++;
        c = path[index];
        if (c === '\\' && maybeUnescapeQuote()) continue;
        type = getPathCharType(c);
        typeMap = pathStateMachine[mode];
        transition = typeMap[type] || typeMap["l" /* ELSE */ ] || 8 /* ERROR */ ;
        // check parse error
        if (transition === 8 /* ERROR */ ) return;
        mode = transition[0];
        if (transition[1] !== undefined) {
            action = actions[transition[1]];
            if (action) {
                newChar = c;
                if (action() === false) return;
            }
        }
        // check parse finish
        if (mode === 7 /* AFTER_PATH */ ) return keys;
    }
}
// path token cache
const cache = new Map();
function resolveValue(obj, path) {
    // check object
    if (!isObject(obj)) return null;
    // parse path
    let hit = cache.get(path);
    if (!hit) {
        hit = parse(path);
        if (hit) cache.set(path, hit);
    }
    // check hit
    if (!hit) return null;
    // resolve path value
    const len = hit.length;
    let last = obj;
    let i = 0;
    while(i < len){
        const val = last[hit[i]];
        if (val === undefined) return null;
        last = val;
        i++;
    }
    return last;
}
/**
 * Transform flat json in obj to normal json in obj
 */ function handleFlatJson(obj) {
    // check obj
    if (!isObject(obj)) return obj;
    for(const key in obj){
        // check key
        if (!hasOwn(obj, key)) continue;
        // handle for normal json
        if (!key.includes("." /* DOT */ )) // recursive process value if value is also a object
        {
            if (isObject(obj[key])) handleFlatJson(obj[key]);
        } else {
            // go to the last object
            const subKeys = key.split("." /* DOT */ );
            const lastIndex = subKeys.length - 1;
            let currentObj = obj;
            for(let i = 0; i < lastIndex; i++){
                if (!(subKeys[i] in currentObj)) currentObj[subKeys[i]] = {
                };
                currentObj = currentObj[subKeys[i]];
            }
            // update last object value, delete old property
            currentObj[subKeys[lastIndex]] = obj[key];
            delete obj[key];
            // recursive process value if value is also a object
            if (isObject(currentObj[subKeys[lastIndex]])) handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
    }
    return obj;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"f8s2z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_MESSAGE_DATA_TYPE", ()=>DEFAULT_MESSAGE_DATA_TYPE
);
parcelHelpers.export(exports, "createMessageContext", ()=>createMessageContext
);
/*!
  * @intlify/runtime v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */ var _shared = require("@intlify/shared");
const DEFAULT_MODIFIER = (str)=>str
;
const DEFAULT_MESSAGE = (ctx)=>''
; // eslint-disable-line
const DEFAULT_MESSAGE_DATA_TYPE = 'text';
const DEFAULT_NORMALIZE = (values)=>values.length === 0 ? '' : values.join('')
;
const DEFAULT_INTERPOLATE = _shared.toDisplayString;
function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) // prettier-ignore
    return choice ? choice > 1 ? 1 : 0 : 1;
    return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
    // prettier-ignore
    const index = _shared.isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    // prettier-ignore
    return options.named && (_shared.isNumber(options.named.count) || _shared.isNumber(options.named.n)) ? _shared.isNumber(options.named.count) ? options.named.count : _shared.isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
    if (!props.count) props.count = pluralIndex;
    if (!props.n) props.n = pluralIndex;
}
function createMessageContext(options = {
}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = _shared.isObject(options.pluralRules) && _shared.isString(locale) && _shared.isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = _shared.isObject(options.pluralRules) && _shared.isString(locale) && _shared.isFunction(options.pluralRules[locale]) ? pluralDefault : undefined;
    const plural = (messages)=>messages[pluralRule(pluralIndex, messages.length, orgPluralRule)]
    ;
    const _list = options.list || [];
    const list = (index)=>_list[index]
    ;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _named = options.named || {
    };
    _shared.isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key)=>_named[key]
    ;
    // TODO: need to design resolve message function?
    function message(key) {
        // prettier-ignore
        const msg = _shared.isFunction(options.messages) ? options.messages(key) : _shared.isObject(options.messages) ? options.messages[key] : false;
        return !msg ? options.parent ? options.parent.message(key) // resolve from parent messages
         : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name)=>options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER
    ;
    const normalize = _shared.isPlainObject(options.processor) && _shared.isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = _shared.isPlainObject(options.processor) && _shared.isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = _shared.isPlainObject(options.processor) && _shared.isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
        ["list" /* LIST */ ]: list,
        ["named" /* NAMED */ ]: named,
        ["plural" /* PLURAL */ ]: plural,
        ["linked" /* LINKED */ ]: (key, modifier)=>{
            // TODO: should check `key`
            const msg = message(key)(ctx);
            return _shared.isString(modifier) ? _modifier(modifier)(msg) : msg;
        },
        ["message" /* MESSAGE */ ]: message,
        ["type" /* TYPE */ ]: type,
        ["interpolate" /* INTERPOLATE */ ]: interpolate,
        ["normalize" /* NORMALIZE */ ]: normalize
    };
    return ctx;
}

},{"@intlify/shared":"5wiTS","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"4q6jp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ERROR_DOMAIN", ()=>ERROR_DOMAIN
);
parcelHelpers.export(exports, "LocationStub", ()=>LocationStub
);
parcelHelpers.export(exports, "baseCompile", ()=>baseCompile
);
parcelHelpers.export(exports, "createCompileError", ()=>createCompileError
);
parcelHelpers.export(exports, "createLocation", ()=>createLocation
);
parcelHelpers.export(exports, "createParser", ()=>createParser
);
parcelHelpers.export(exports, "createPosition", ()=>createPosition
);
parcelHelpers.export(exports, "defaultOnError", ()=>defaultOnError
);
parcelHelpers.export(exports, "errorMessages", ()=>errorMessages
);
/*!
  * @intlify/message-compiler v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */ var _shared = require("@intlify/shared");
/** @internal */ const errorMessages = {
    // tokenizer error messages
    [0 /* EXPECTED_TOKEN */ ]: `Expected token: '{0}'`,
    [1 /* INVALID_TOKEN_IN_PLACEHOLDER */ ]: `Invalid token in placeholder: '{0}'`,
    [2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */ ]: `Unterminated single quote in placeholder`,
    [3 /* UNKNOWN_ESCAPE_SEQUENCE */ ]: `Unknown escape sequence: \\{0}`,
    [4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */ ]: `Invalid unicode escape sequence: {0}`,
    [5 /* UNBALANCED_CLOSING_BRACE */ ]: `Unbalanced closing brace`,
    [6 /* UNTERMINATED_CLOSING_BRACE */ ]: `Unterminated closing brace`,
    [7 /* EMPTY_PLACEHOLDER */ ]: `Empty placeholder`,
    [8 /* NOT_ALLOW_NEST_PLACEHOLDER */ ]: `Not allowed nest placeholder`,
    [9 /* INVALID_LINKED_FORMAT */ ]: `Invalid linked format`,
    // parser error messages
    [10 /* MUST_HAVE_MESSAGES_IN_PLURAL */ ]: `Plural must have messages`,
    [11 /* UNEXPECTED_EMPTY_LINKED_MODIFIER */ ]: `Unexpected empty linked modifier`,
    [12 /* UNEXPECTED_EMPTY_LINKED_KEY */ ]: `Unexpected empty linked key`,
    [13 /* UNEXPECTED_LEXICAL_ANALYSIS */ ]: `Unexpected lexical analysis in token: '{0}'`
};
function createCompileError(code, loc, options = {
}) {
    const { domain , messages , args  } = options;
    const msg = _shared.format((messages || errorMessages)[code] || '', ...args || []);
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) error.location = loc;
    error.domain = domain;
    return error;
}
/** @internal */ function defaultOnError(error) {
    throw error;
}
const LocationStub = {
    start: {
        line: 1,
        column: 1,
        offset: 0
    },
    end: {
        line: 1,
        column: 1,
        offset: 0
    }
};
function createPosition(line, column, offset) {
    return {
        line,
        column,
        offset
    };
}
function createLocation(start, end, source) {
    const loc = {
        start,
        end
    };
    if (source != null) loc.source = source;
    return loc;
}
const CHAR_SP = ' ';
const CHAR_CR = '\r';
const CHAR_LF = '\n';
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
    const _buf = str;
    let _index = 0;
    let _line = 1;
    let _column = 1;
    let _peekOffset = 0;
    const isCRLF = (index)=>_buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF
    ;
    const isLF = (index)=>_buf[index] === CHAR_LF
    ;
    const isPS = (index)=>_buf[index] === CHAR_PS
    ;
    const isLS = (index)=>_buf[index] === CHAR_LS
    ;
    const isLineEnd = (index)=>isCRLF(index) || isLF(index) || isPS(index) || isLS(index)
    ;
    const index = ()=>_index
    ;
    const line = ()=>_line
    ;
    const column = ()=>_column
    ;
    const peekOffset = ()=>_peekOffset
    ;
    const charAt = (offset)=>isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset]
    ;
    const currentChar = ()=>charAt(_index)
    ;
    const currentPeek = ()=>charAt(_index + _peekOffset)
    ;
    function next() {
        _peekOffset = 0;
        if (isLineEnd(_index)) {
            _line++;
            _column = 0;
        }
        if (isCRLF(_index)) _index++;
        _index++;
        _column++;
        return _buf[_index];
    }
    function peek() {
        if (isCRLF(_index + _peekOffset)) _peekOffset++;
        _peekOffset++;
        return _buf[_index + _peekOffset];
    }
    function reset() {
        _index = 0;
        _line = 1;
        _column = 1;
        _peekOffset = 0;
    }
    function resetPeek(offset = 0) {
        _peekOffset = offset;
    }
    function skipToPeek() {
        const target = _index + _peekOffset;
        // eslint-disable-next-line no-unmodified-loop-condition
        while(target !== _index)next();
        _peekOffset = 0;
    }
    return {
        index,
        line,
        column,
        peekOffset,
        charAt,
        currentChar,
        currentPeek,
        next,
        peek,
        reset,
        resetPeek,
        skipToPeek
    };
}
const EOF = undefined;
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$1 = 'tokenizer';
function createTokenizer(source, options = {
}) {
    const location = options.location !== false;
    const _scnr = createScanner(source);
    const currentOffset = ()=>_scnr.index()
    ;
    const currentPosition = ()=>createPosition(_scnr.line(), _scnr.column(), _scnr.index())
    ;
    const _initLoc = currentPosition();
    const _initOffset = currentOffset();
    const _context = {
        currentType: 14 /* EOF */ ,
        offset: _initOffset,
        startLoc: _initLoc,
        endLoc: _initLoc,
        lastType: 14 /* EOF */ ,
        lastOffset: _initOffset,
        lastStartLoc: _initLoc,
        lastEndLoc: _initLoc,
        braceNest: 0,
        inLinked: false,
        text: ''
    };
    const context = ()=>_context
    ;
    const { onError  } = options;
    function emitError(code, pos, offset, ...args) {
        const ctx = context();
        pos.column += offset;
        pos.offset += offset;
        if (onError) {
            const loc = createLocation(ctx.startLoc, pos);
            const err = createCompileError(code, loc, {
                domain: ERROR_DOMAIN$1,
                args
            });
            onError(err);
        }
    }
    function getToken(context1, type, value) {
        context1.endLoc = currentPosition();
        context1.currentType = type;
        const token = {
            type
        };
        if (location) token.loc = createLocation(context1.startLoc, context1.endLoc);
        if (value != null) token.value = value;
        return token;
    }
    const getEndToken = (context1)=>getToken(context1, 14 /* EOF */ )
    ;
    function eat(scnr, ch) {
        if (scnr.currentChar() === ch) {
            scnr.next();
            return ch;
        } else {
            emitError(0 /* EXPECTED_TOKEN */ , currentPosition(), 0, ch);
            return '';
        }
    }
    function peekSpaces(scnr) {
        let buf = '';
        while(scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF){
            buf += scnr.currentPeek();
            scnr.peek();
        }
        return buf;
    }
    function skipSpaces(scnr) {
        const buf = peekSpaces(scnr);
        scnr.skipToPeek();
        return buf;
    }
    function isIdentifierStart(ch) {
        if (ch === EOF) return false;
        const cc = ch.charCodeAt(0);
        return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95 // _
        ;
    }
    function isNumberStart(ch) {
        if (ch === EOF) return false;
        const cc = ch.charCodeAt(0);
        return cc >= 48 && cc <= 57; // 0-9
    }
    function isNamedIdentifierStart(scnr, context1) {
        const { currentType  } = context1;
        if (currentType !== 2 /* BraceLeft */ ) return false;
        peekSpaces(scnr);
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    }
    function isListIdentifierStart(scnr, context1) {
        const { currentType  } = context1;
        if (currentType !== 2 /* BraceLeft */ ) return false;
        peekSpaces(scnr);
        const ch = scnr.currentPeek() === '-' ? scnr.peek() : scnr.currentPeek();
        const ret = isNumberStart(ch);
        scnr.resetPeek();
        return ret;
    }
    function isLiteralStart(scnr, context1) {
        const { currentType  } = context1;
        if (currentType !== 2 /* BraceLeft */ ) return false;
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === LITERAL_DELIMITER;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedDotStart(scnr, context1) {
        const { currentType  } = context1;
        if (currentType !== 8 /* LinkedAlias */ ) return false;
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === "." /* LinkedDot */ ;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedModifierStart(scnr, context1) {
        const { currentType  } = context1;
        if (currentType !== 9 /* LinkedDot */ ) return false;
        peekSpaces(scnr);
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    }
    function isLinkedDelimiterStart(scnr, context1) {
        const { currentType  } = context1;
        if (!(currentType === 8 /* LinkedAlias */  || currentType === 12 /* LinkedModifier */ )) return false;
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === ":" /* LinkedDelimiter */ ;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedReferStart(scnr, context1) {
        const { currentType  } = context1;
        if (currentType !== 10 /* LinkedDelimiter */ ) return false;
        const fn = ()=>{
            const ch = scnr.currentPeek();
            if (ch === "{" /* BraceLeft */ ) return isIdentifierStart(scnr.peek());
            else if (ch === "@" /* LinkedAlias */  || ch === "%" /* Modulo */  || ch === "|" /* Pipe */  || ch === ":" /* LinkedDelimiter */  || ch === "." /* LinkedDot */  || ch === CHAR_SP || !ch) return false;
            else if (ch === CHAR_LF) {
                scnr.peek();
                return fn();
            } else // other characters
            return isIdentifierStart(ch);
        };
        const ret = fn();
        scnr.resetPeek();
        return ret;
    }
    function isPluralStart(scnr) {
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === "|" /* Pipe */ ;
        scnr.resetPeek();
        return ret;
    }
    function isTextStart(scnr, reset = true) {
        const fn = (hasSpace = false, prev = '', detectModulo = false)=>{
            const ch = scnr.currentPeek();
            if (ch === "{" /* BraceLeft */ ) return prev === "%" /* Modulo */  ? false : hasSpace;
            else if (ch === "@" /* LinkedAlias */  || !ch) return prev === "%" /* Modulo */  ? true : hasSpace;
            else if (ch === "%" /* Modulo */ ) {
                scnr.peek();
                return fn(hasSpace, "%" /* Modulo */ , true);
            } else if (ch === "|" /* Pipe */ ) return prev === "%" /* Modulo */  || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
            else if (ch === CHAR_SP) {
                scnr.peek();
                return fn(true, CHAR_SP, detectModulo);
            } else if (ch === CHAR_LF) {
                scnr.peek();
                return fn(true, CHAR_LF, detectModulo);
            } else return true;
        };
        const ret = fn();
        reset && scnr.resetPeek();
        return ret;
    }
    function takeChar(scnr, fn) {
        const ch = scnr.currentChar();
        if (ch === EOF) return EOF;
        if (fn(ch)) {
            scnr.next();
            return ch;
        }
        return null;
    }
    function takeIdentifierChar(scnr) {
        const closure = (ch)=>{
            const cc = ch.charCodeAt(0);
            return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36 // $
            ;
        };
        return takeChar(scnr, closure);
    }
    function takeDigit(scnr) {
        const closure = (ch)=>{
            const cc = ch.charCodeAt(0);
            return cc >= 48 && cc <= 57; // 0-9
        };
        return takeChar(scnr, closure);
    }
    function takeHexDigit(scnr) {
        const closure = (ch)=>{
            const cc = ch.charCodeAt(0);
            return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102; // a-f
        };
        return takeChar(scnr, closure);
    }
    function getDigits(scnr) {
        let ch = '';
        let num = '';
        while(ch = takeDigit(scnr))num += ch;
        return num;
    }
    function readText(scnr) {
        const fn = (buf)=>{
            const ch = scnr.currentChar();
            if (ch === "{" /* BraceLeft */  || ch === "}" /* BraceRight */  || ch === "@" /* LinkedAlias */  || !ch) return buf;
            else if (ch === "%" /* Modulo */ ) {
                if (isTextStart(scnr)) {
                    buf += ch;
                    scnr.next();
                    return fn(buf);
                } else return buf;
            } else if (ch === "|" /* Pipe */ ) return buf;
            else if (ch === CHAR_SP || ch === CHAR_LF) {
                if (isTextStart(scnr)) {
                    buf += ch;
                    scnr.next();
                    return fn(buf);
                } else if (isPluralStart(scnr)) return buf;
                else {
                    buf += ch;
                    scnr.next();
                    return fn(buf);
                }
            } else {
                buf += ch;
                scnr.next();
                return fn(buf);
            }
        };
        return fn('');
    }
    function readNamedIdentifier(scnr) {
        skipSpaces(scnr);
        let ch = '';
        let name = '';
        while(ch = takeIdentifierChar(scnr))name += ch;
        if (scnr.currentChar() === EOF) emitError(6 /* UNTERMINATED_CLOSING_BRACE */ , currentPosition(), 0);
        return name;
    }
    function readListIdentifier(scnr) {
        skipSpaces(scnr);
        let value = '';
        if (scnr.currentChar() === '-') {
            scnr.next();
            value += `-${getDigits(scnr)}`;
        } else value += getDigits(scnr);
        if (scnr.currentChar() === EOF) emitError(6 /* UNTERMINATED_CLOSING_BRACE */ , currentPosition(), 0);
        return value;
    }
    function readLiteral(scnr) {
        skipSpaces(scnr);
        eat(scnr, `\'`);
        let ch = '';
        let literal = '';
        const fn = (x)=>x !== LITERAL_DELIMITER && x !== CHAR_LF
        ;
        while(ch = takeChar(scnr, fn))if (ch === '\\') literal += readEscapeSequence(scnr);
        else literal += ch;
        const current = scnr.currentChar();
        if (current === CHAR_LF || current === EOF) {
            emitError(2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */ , currentPosition(), 0);
            // TODO: Is it correct really?
            if (current === CHAR_LF) {
                scnr.next();
                eat(scnr, `\'`);
            }
            return literal;
        }
        eat(scnr, `\'`);
        return literal;
    }
    function readEscapeSequence(scnr) {
        const ch = scnr.currentChar();
        switch(ch){
            case '\\':
            case `\'`:
                scnr.next();
                return `\\${ch}`;
            case 'u':
                return readUnicodeEscapeSequence(scnr, ch, 4);
            case 'U':
                return readUnicodeEscapeSequence(scnr, ch, 6);
            default:
                emitError(3 /* UNKNOWN_ESCAPE_SEQUENCE */ , currentPosition(), 0, ch);
                return '';
        }
    }
    function readUnicodeEscapeSequence(scnr, unicode, digits) {
        eat(scnr, unicode);
        let sequence = '';
        for(let i = 0; i < digits; i++){
            const ch = takeHexDigit(scnr);
            if (!ch) {
                emitError(4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */ , currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
                break;
            }
            sequence += ch;
        }
        return `\\${unicode}${sequence}`;
    }
    function readInvalidIdentifier(scnr) {
        skipSpaces(scnr);
        let ch = '';
        let identifiers = '';
        const closure = (ch1)=>ch1 !== "{" /* BraceLeft */  && ch1 !== "}" /* BraceRight */  && ch1 !== CHAR_SP && ch1 !== CHAR_LF
        ;
        while(ch = takeChar(scnr, closure))identifiers += ch;
        return identifiers;
    }
    function readLinkedModifier(scnr) {
        let ch = '';
        let name = '';
        while(ch = takeIdentifierChar(scnr))name += ch;
        return name;
    }
    function readLinkedRefer(scnr) {
        const fn = (detect = false, buf)=>{
            const ch = scnr.currentChar();
            if (ch === "{" /* BraceLeft */  || ch === "%" /* Modulo */  || ch === "@" /* LinkedAlias */  || ch === "|" /* Pipe */  || !ch) return buf;
            else if (ch === CHAR_SP) return buf;
            else if (ch === CHAR_LF) {
                buf += ch;
                scnr.next();
                return fn(detect, buf);
            } else {
                buf += ch;
                scnr.next();
                return fn(true, buf);
            }
        };
        return fn(false, '');
    }
    function readPlural(scnr) {
        skipSpaces(scnr);
        const plural = eat(scnr, "|" /* Pipe */ );
        skipSpaces(scnr);
        return plural;
    }
    // TODO: We need refactoring of token parsing ...
    function readTokenInPlaceholder(scnr, context1) {
        let token = null;
        const ch = scnr.currentChar();
        switch(ch){
            case "{" /* BraceLeft */ :
                if (context1.braceNest >= 1) emitError(8 /* NOT_ALLOW_NEST_PLACEHOLDER */ , currentPosition(), 0);
                scnr.next();
                token = getToken(context1, 2 /* BraceLeft */ , "{" /* BraceLeft */ );
                skipSpaces(scnr);
                context1.braceNest++;
                return token;
            case "}" /* BraceRight */ :
                if (context1.braceNest > 0 && context1.currentType === 2 /* BraceLeft */ ) emitError(7 /* EMPTY_PLACEHOLDER */ , currentPosition(), 0);
                scnr.next();
                token = getToken(context1, 3 /* BraceRight */ , "}" /* BraceRight */ );
                context1.braceNest--;
                context1.braceNest > 0 && skipSpaces(scnr);
                if (context1.inLinked && context1.braceNest === 0) context1.inLinked = false;
                return token;
            case "@" /* LinkedAlias */ :
                if (context1.braceNest > 0) emitError(6 /* UNTERMINATED_CLOSING_BRACE */ , currentPosition(), 0);
                token = readTokenInLinked(scnr, context1) || getEndToken(context1);
                context1.braceNest = 0;
                return token;
            default:
                let validNamedIdentifier = true;
                let validListIdentifier = true;
                let validLiteral = true;
                if (isPluralStart(scnr)) {
                    if (context1.braceNest > 0) emitError(6 /* UNTERMINATED_CLOSING_BRACE */ , currentPosition(), 0);
                    token = getToken(context1, 1 /* Pipe */ , readPlural(scnr));
                    // reset
                    context1.braceNest = 0;
                    context1.inLinked = false;
                    return token;
                }
                if (context1.braceNest > 0 && (context1.currentType === 5 /* Named */  || context1.currentType === 6 /* List */  || context1.currentType === 7 /* Literal */ )) {
                    emitError(6 /* UNTERMINATED_CLOSING_BRACE */ , currentPosition(), 0);
                    context1.braceNest = 0;
                    return readToken(scnr, context1);
                }
                if (validNamedIdentifier = isNamedIdentifierStart(scnr, context1)) {
                    token = getToken(context1, 5 /* Named */ , readNamedIdentifier(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if (validListIdentifier = isListIdentifierStart(scnr, context1)) {
                    token = getToken(context1, 6 /* List */ , readListIdentifier(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if (validLiteral = isLiteralStart(scnr, context1)) {
                    token = getToken(context1, 7 /* Literal */ , readLiteral(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
                    // TODO: we should be re-designed invalid cases, when we will extend message syntax near the future ...
                    token = getToken(context1, 13 /* InvalidPlace */ , readInvalidIdentifier(scnr));
                    emitError(1 /* INVALID_TOKEN_IN_PLACEHOLDER */ , currentPosition(), 0, token.value);
                    skipSpaces(scnr);
                    return token;
                }
                break;
        }
        return token;
    }
    // TODO: We need refactoring of token parsing ...
    function readTokenInLinked(scnr, context1) {
        const { currentType  } = context1;
        let token = null;
        const ch = scnr.currentChar();
        if ((currentType === 8 /* LinkedAlias */  || currentType === 9 /* LinkedDot */  || currentType === 12 /* LinkedModifier */  || currentType === 10 /* LinkedDelimiter */ ) && (ch === CHAR_LF || ch === CHAR_SP)) emitError(9 /* INVALID_LINKED_FORMAT */ , currentPosition(), 0);
        switch(ch){
            case "@" /* LinkedAlias */ :
                scnr.next();
                token = getToken(context1, 8 /* LinkedAlias */ , "@" /* LinkedAlias */ );
                context1.inLinked = true;
                return token;
            case "." /* LinkedDot */ :
                skipSpaces(scnr);
                scnr.next();
                return getToken(context1, 9 /* LinkedDot */ , "." /* LinkedDot */ );
            case ":" /* LinkedDelimiter */ :
                skipSpaces(scnr);
                scnr.next();
                return getToken(context1, 10 /* LinkedDelimiter */ , ":" /* LinkedDelimiter */ );
            default:
                if (isPluralStart(scnr)) {
                    token = getToken(context1, 1 /* Pipe */ , readPlural(scnr));
                    // reset
                    context1.braceNest = 0;
                    context1.inLinked = false;
                    return token;
                }
                if (isLinkedDotStart(scnr, context1) || isLinkedDelimiterStart(scnr, context1)) {
                    skipSpaces(scnr);
                    return readTokenInLinked(scnr, context1);
                }
                if (isLinkedModifierStart(scnr, context1)) {
                    skipSpaces(scnr);
                    return getToken(context1, 12 /* LinkedModifier */ , readLinkedModifier(scnr));
                }
                if (isLinkedReferStart(scnr, context1)) {
                    skipSpaces(scnr);
                    if (ch === "{" /* BraceLeft */ ) // scan the placeholder
                    return readTokenInPlaceholder(scnr, context1) || token;
                    else return getToken(context1, 11 /* LinkedKey */ , readLinkedRefer(scnr));
                }
                if (currentType === 8 /* LinkedAlias */ ) emitError(9 /* INVALID_LINKED_FORMAT */ , currentPosition(), 0);
                context1.braceNest = 0;
                context1.inLinked = false;
                return readToken(scnr, context1);
        }
    }
    // TODO: We need refactoring of token parsing ...
    function readToken(scnr, context1) {
        let token = {
            type: 14 /* EOF */ 
        };
        if (context1.braceNest > 0) return readTokenInPlaceholder(scnr, context1) || getEndToken(context1);
        if (context1.inLinked) return readTokenInLinked(scnr, context1) || getEndToken(context1);
        const ch = scnr.currentChar();
        switch(ch){
            case "{" /* BraceLeft */ :
                return readTokenInPlaceholder(scnr, context1) || getEndToken(context1);
            case "}" /* BraceRight */ :
                emitError(5 /* UNBALANCED_CLOSING_BRACE */ , currentPosition(), 0);
                scnr.next();
                return getToken(context1, 3 /* BraceRight */ , "}" /* BraceRight */ );
            case "@" /* LinkedAlias */ :
                return readTokenInLinked(scnr, context1) || getEndToken(context1);
            default:
                if (isPluralStart(scnr)) {
                    token = getToken(context1, 1 /* Pipe */ , readPlural(scnr));
                    // reset
                    context1.braceNest = 0;
                    context1.inLinked = false;
                    return token;
                }
                if (isTextStart(scnr)) return getToken(context1, 0 /* Text */ , readText(scnr));
                if (ch === "%" /* Modulo */ ) {
                    scnr.next();
                    return getToken(context1, 4 /* Modulo */ , "%" /* Modulo */ );
                }
                break;
        }
        return token;
    }
    function nextToken() {
        const { currentType , offset , startLoc , endLoc  } = _context;
        _context.lastType = currentType;
        _context.lastOffset = offset;
        _context.lastStartLoc = startLoc;
        _context.lastEndLoc = endLoc;
        _context.offset = currentOffset();
        _context.startLoc = currentPosition();
        if (_scnr.currentChar() === EOF) return getToken(_context, 14 /* EOF */ );
        return readToken(_scnr, _context);
    }
    return {
        nextToken,
        currentOffset,
        currentPosition,
        context
    };
}
const ERROR_DOMAIN = 'parser';
// Backslash backslash, backslash quote, uHHHH, UHHHHHH.
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
    switch(match){
        case `\\\\`:
            return `\\`;
        case `\\\'`:
            return `\'`;
        default:
            {
                const codePoint = parseInt(codePoint4 || codePoint6, 16);
                if (codePoint <= 55295 || codePoint >= 57344) return String.fromCodePoint(codePoint);
                // invalid ...
                // Replace them with U+FFFD REPLACEMENT CHARACTER.
                return '�';
            }
    }
}
function createParser(options = {
}) {
    const location = options.location !== false;
    const { onError  } = options;
    function emitError(tokenzer, code, start, offset, ...args) {
        const end = tokenzer.currentPosition();
        end.offset += offset;
        end.column += offset;
        if (onError) {
            const loc = createLocation(start, end);
            const err = createCompileError(code, loc, {
                domain: ERROR_DOMAIN,
                args
            });
            onError(err);
        }
    }
    function startNode(type, offset, loc) {
        const node = {
            type,
            start: offset,
            end: offset
        };
        if (location) node.loc = {
            start: loc,
            end: loc
        };
        return node;
    }
    function endNode(node, offset, pos, type) {
        node.end = offset;
        if (type) node.type = type;
        if (location && node.loc) node.loc.end = pos;
    }
    function parseText(tokenizer, value) {
        const context = tokenizer.context();
        const node = startNode(3 /* Text */ , context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseList(tokenizer, index) {
        const context = tokenizer.context();
        const { lastOffset: offset , lastStartLoc: loc  } = context; // get brace left loc
        const node = startNode(5 /* List */ , offset, loc);
        node.index = parseInt(index, 10);
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseNamed(tokenizer, key) {
        const context = tokenizer.context();
        const { lastOffset: offset , lastStartLoc: loc  } = context; // get brace left loc
        const node = startNode(4 /* Named */ , offset, loc);
        node.key = key;
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLiteral(tokenizer, value) {
        const context = tokenizer.context();
        const { lastOffset: offset , lastStartLoc: loc  } = context; // get brace left loc
        const node = startNode(9 /* Literal */ , offset, loc);
        node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLinkedModifier(tokenizer) {
        const token = tokenizer.nextToken();
        const context = tokenizer.context();
        const { lastOffset: offset , lastStartLoc: loc  } = context; // get linked dot loc
        const node = startNode(8 /* LinkedModifier */ , offset, loc);
        if (token.type !== 12 /* LinkedModifier */ ) {
            // empty modifier
            emitError(tokenizer, 11 /* UNEXPECTED_EMPTY_LINKED_MODIFIER */ , context.lastStartLoc, 0);
            node.value = '';
            endNode(node, offset, loc);
            return {
                nextConsumeToken: token,
                node
            };
        }
        // check token
        if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
        node.value = token.value || '';
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return {
            node
        };
    }
    function parseLinkedKey(tokenizer, value) {
        const context = tokenizer.context();
        const node = startNode(7 /* LinkedKey */ , context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLinked(tokenizer) {
        const context = tokenizer.context();
        const linkedNode = startNode(6 /* Linked */ , context.offset, context.startLoc);
        let token = tokenizer.nextToken();
        if (token.type === 9 /* LinkedDot */ ) {
            const parsed = parseLinkedModifier(tokenizer);
            linkedNode.modifier = parsed.node;
            token = parsed.nextConsumeToken || tokenizer.nextToken();
        }
        // asset check token
        if (token.type !== 10 /* LinkedDelimiter */ ) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
        token = tokenizer.nextToken();
        // skip brace left
        if (token.type === 2 /* BraceLeft */ ) token = tokenizer.nextToken();
        switch(token.type){
            case 11 /* LinkedKey */ :
                if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                linkedNode.key = parseLinkedKey(tokenizer, token.value || '');
                break;
            case 5 /* Named */ :
                if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                linkedNode.key = parseNamed(tokenizer, token.value || '');
                break;
            case 6 /* List */ :
                if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                linkedNode.key = parseList(tokenizer, token.value || '');
                break;
            case 7 /* Literal */ :
                if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                linkedNode.key = parseLiteral(tokenizer, token.value || '');
                break;
            default:
                // empty key
                emitError(tokenizer, 12 /* UNEXPECTED_EMPTY_LINKED_KEY */ , context.lastStartLoc, 0);
                const nextContext = tokenizer.context();
                const emptyLinkedKeyNode = startNode(7 /* LinkedKey */ , nextContext.offset, nextContext.startLoc);
                emptyLinkedKeyNode.value = '';
                endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
                linkedNode.key = emptyLinkedKeyNode;
                endNode(linkedNode, nextContext.offset, nextContext.startLoc);
                return {
                    nextConsumeToken: token,
                    node: linkedNode
                };
        }
        endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
        return {
            node: linkedNode
        };
    }
    function parseMessage(tokenizer) {
        const context = tokenizer.context();
        const startOffset = context.currentType === 1 /* Pipe */  ? tokenizer.currentOffset() : context.offset;
        const startLoc = context.currentType === 1 /* Pipe */  ? context.endLoc : context.startLoc;
        const node = startNode(2 /* Message */ , startOffset, startLoc);
        node.items = [];
        let nextToken = null;
        do {
            const token = nextToken || tokenizer.nextToken();
            nextToken = null;
            switch(token.type){
                case 0 /* Text */ :
                    if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                    node.items.push(parseText(tokenizer, token.value || ''));
                    break;
                case 6 /* List */ :
                    if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                    node.items.push(parseList(tokenizer, token.value || ''));
                    break;
                case 5 /* Named */ :
                    if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                    node.items.push(parseNamed(tokenizer, token.value || ''));
                    break;
                case 7 /* Literal */ :
                    if (token.value == null) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, getTokenCaption(token));
                    node.items.push(parseLiteral(tokenizer, token.value || ''));
                    break;
                case 8 /* LinkedAlias */ :
                    const parsed = parseLinked(tokenizer);
                    node.items.push(parsed.node);
                    nextToken = parsed.nextConsumeToken || null;
                    break;
            }
        }while (context.currentType !== 14 /* EOF */  && context.currentType !== 1 /* Pipe */ )
        // adjust message node loc
        const endOffset = context.currentType === 1 /* Pipe */  ? context.lastOffset : tokenizer.currentOffset();
        const endLoc = context.currentType === 1 /* Pipe */  ? context.lastEndLoc : tokenizer.currentPosition();
        endNode(node, endOffset, endLoc);
        return node;
    }
    function parsePlural(tokenizer, offset, loc, msgNode) {
        const context = tokenizer.context();
        let hasEmptyMessage = msgNode.items.length === 0;
        const node = startNode(1 /* Plural */ , offset, loc);
        node.cases = [];
        node.cases.push(msgNode);
        do {
            const msg = parseMessage(tokenizer);
            if (!hasEmptyMessage) hasEmptyMessage = msg.items.length === 0;
            node.cases.push(msg);
        }while (context.currentType !== 14 /* EOF */ )
        if (hasEmptyMessage) emitError(tokenizer, 10 /* MUST_HAVE_MESSAGES_IN_PLURAL */ , loc, 0);
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseResource(tokenizer) {
        const context = tokenizer.context();
        const { offset , startLoc  } = context;
        const msgNode = parseMessage(tokenizer);
        if (context.currentType === 14 /* EOF */ ) return msgNode;
        else return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
    function parse(source) {
        const tokenizer = createTokenizer(source, _shared.assign({
        }, options));
        const context = tokenizer.context();
        const node = startNode(0 /* Resource */ , context.offset, context.startLoc);
        if (location && node.loc) node.loc.source = source;
        node.body = parseResource(tokenizer);
        // assert whether achieved to EOF
        if (context.currentType !== 14 /* EOF */ ) emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */ , context.lastStartLoc, 0, source[context.offset] || '');
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    return {
        parse
    };
}
function getTokenCaption(token) {
    if (token.type === 14 /* EOF */ ) return 'EOF';
    const name = (token.value || '').replace(/\r?\n/gu, '\\n');
    return name.length > 10 ? name.slice(0, 9) + '…' : name;
}
function createTransformer(ast, options = {
} // eslint-disable-line
) {
    const _context = {
        ast,
        helpers: new Set()
    };
    const context = ()=>_context
    ;
    const helper = (name)=>{
        _context.helpers.add(name);
        return name;
    };
    return {
        context,
        helper
    };
}
function traverseNodes(nodes, transformer) {
    for(let i = 0; i < nodes.length; i++)traverseNode(nodes[i], transformer);
}
function traverseNode(node, transformer) {
    // TODO: if we need pre-hook of transform, should be implemented to here
    switch(node.type){
        case 1 /* Plural */ :
            traverseNodes(node.cases, transformer);
            transformer.helper("plural" /* PLURAL */ );
            break;
        case 2 /* Message */ :
            traverseNodes(node.items, transformer);
            break;
        case 6 /* Linked */ :
            const linked = node;
            traverseNode(linked.key, transformer);
            transformer.helper("linked" /* LINKED */ );
            break;
        case 5 /* List */ :
            transformer.helper("interpolate" /* INTERPOLATE */ );
            transformer.helper("list" /* LIST */ );
            break;
        case 4 /* Named */ :
            transformer.helper("interpolate" /* INTERPOLATE */ );
            transformer.helper("named" /* NAMED */ );
            break;
    }
// TODO: if we need post-hook of transform, should be implemented to here
}
// transform AST
function transform(ast, options = {
} // eslint-disable-line
) {
    const transformer = createTransformer(ast);
    transformer.helper("normalize" /* NORMALIZE */ );
    // traverse
    ast.body && traverseNode(ast.body, transformer);
    // set meta information
    const context = transformer.context();
    ast.helpers = Array.from(context.helpers);
}
function createCodeGenerator(ast, options) {
    const { sourceMap , filename , breakLineCode , needIndent: _needIndent  } = options;
    const _context = {
        source: ast.loc.source,
        filename,
        code: '',
        column: 1,
        line: 1,
        offset: 0,
        map: undefined,
        breakLineCode,
        needIndent: _needIndent,
        indentLevel: 0
    };
    const context = ()=>_context
    ;
    function push(code, node) {
        _context.code += code;
    }
    function _newline(n, withBreakLine = true) {
        const _breakLineCode = withBreakLine ? breakLineCode : '';
        push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
    }
    function indent(withNewLine = true) {
        const level = ++_context.indentLevel;
        withNewLine && _newline(level);
    }
    function deindent(withNewLine = true) {
        const level = --_context.indentLevel;
        withNewLine && _newline(level);
    }
    function newline() {
        _newline(_context.indentLevel);
    }
    const helper = (key)=>`_${key}`
    ;
    const needIndent = ()=>_context.needIndent
    ;
    return {
        context,
        push,
        indent,
        deindent,
        newline,
        helper,
        needIndent
    };
}
function generateLinkedNode(generator, node) {
    const { helper  } = generator;
    generator.push(`${helper("linked" /* LINKED */ )}(`);
    generateNode(generator, node.key);
    if (node.modifier) {
        generator.push(`, `);
        generateNode(generator, node.modifier);
    }
    generator.push(`)`);
}
function generateMessageNode(generator, node) {
    const { helper , needIndent  } = generator;
    generator.push(`${helper("normalize" /* NORMALIZE */ )}([`);
    generator.indent(needIndent());
    const length = node.items.length;
    for(let i = 0; i < length; i++){
        generateNode(generator, node.items[i]);
        if (i === length - 1) break;
        generator.push(', ');
    }
    generator.deindent(needIndent());
    generator.push('])');
}
function generatePluralNode(generator, node) {
    const { helper , needIndent  } = generator;
    if (node.cases.length > 1) {
        generator.push(`${helper("plural" /* PLURAL */ )}([`);
        generator.indent(needIndent());
        const length = node.cases.length;
        for(let i = 0; i < length; i++){
            generateNode(generator, node.cases[i]);
            if (i === length - 1) break;
            generator.push(', ');
        }
        generator.deindent(needIndent());
        generator.push(`])`);
    }
}
function generateResource(generator, node) {
    if (node.body) generateNode(generator, node.body);
    else generator.push('null');
}
function generateNode(generator, node) {
    const { helper  } = generator;
    switch(node.type){
        case 0 /* Resource */ :
            generateResource(generator, node);
            break;
        case 1 /* Plural */ :
            generatePluralNode(generator, node);
            break;
        case 2 /* Message */ :
            generateMessageNode(generator, node);
            break;
        case 6 /* Linked */ :
            generateLinkedNode(generator, node);
            break;
        case 8 /* LinkedModifier */ :
            generator.push(JSON.stringify(node.value), node);
            break;
        case 7 /* LinkedKey */ :
            generator.push(JSON.stringify(node.value), node);
            break;
        case 5 /* List */ :
            generator.push(`${helper("interpolate" /* INTERPOLATE */ )}(${helper("list" /* LIST */ )}(${node.index}))`, node);
            break;
        case 4 /* Named */ :
            generator.push(`${helper("interpolate" /* INTERPOLATE */ )}(${helper("named" /* NAMED */ )}(${JSON.stringify(node.key)}))`, node);
            break;
        case 9 /* Literal */ :
            generator.push(JSON.stringify(node.value), node);
            break;
        case 3 /* Text */ :
            generator.push(JSON.stringify(node.value), node);
            break;
        default:
            throw new Error(`unhandled codegen node type: ${node.type}`);
    }
}
// generate code from AST
const generate = (ast, options = {
} // eslint-disable-line
)=>{
    const mode = _shared.isString(options.mode) ? options.mode : 'normal';
    const filename = _shared.isString(options.filename) ? options.filename : 'message.intl';
    const sourceMap = !!options.sourceMap;
    // prettier-ignore
    const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === 'arrow' ? ';' : '\n';
    const needIndent = options.needIndent ? options.needIndent : mode !== 'arrow';
    const helpers = ast.helpers || [];
    const generator = createCodeGenerator(ast, {
        mode,
        filename,
        sourceMap,
        breakLineCode,
        needIndent
    });
    generator.push(mode === 'normal' ? `function __msg__ (ctx) {` : `(ctx) => {`);
    generator.indent(needIndent);
    if (helpers.length > 0) {
        generator.push(`const { ${helpers.map((s)=>`${s}: _${s}`
        ).join(', ')} } = ctx`);
        generator.newline();
    }
    generator.push(`return `);
    generateNode(generator, ast);
    generator.deindent(needIndent);
    generator.push(`}`);
    const { code , map  } = generator.context();
    return {
        ast,
        code,
        map: map ? map.toJSON() : undefined // eslint-disable-line @typescript-eslint/no-explicit-any
    };
};
function baseCompile(source, options = {
}) {
    const assignedOptions = _shared.assign({
    }, options);
    // parse source codes
    const parser = createParser(assignedOptions);
    const ast = parser.parse(source);
    // transform ASTs
    transform(ast, assignedOptions);
    // generate javascript codes
    return generate(ast, assignedOptions);
}

},{"@intlify/shared":"5wiTS","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"ksbWd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IntlifyDevToolsHooks", ()=>IntlifyDevToolsHooks
);
/*!
  * @intlify/devtools-if v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */ const IntlifyDevToolsHooks = {
    I18nInit: 'i18n:init',
    FunctionTranslate: 'function:translate'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"jvlRZ":[function(require,module,exports) {
module.exports = JSON.parse("{\"alert\":{\"completeRestore\":\"Restore complete.\",\"errorSubmit\":\"There was a problem with processing.\",\"failedApply\":\"Failed to apply due to an error.\",\"failedGetData\":\"Failed get data.\",\"failedRestore\":\"Restore failed.\",\"invalidAddress\":\"The address is invalid. \",\"invalidData\":\"The data is invalid.\",\"noSelectedFile\":\"There is no file selected.\"},\"base\":{\"ShortcutKey\":\"Shortcut key\",\"add\":\"Add\",\"address\":\"Address\",\"advanced\":\"Advanced\",\"apply\":\"Apply\",\"array\":\"Array\",\"author\":\"Author\",\"autoplay\":\"Autoplay\",\"backup\":\"Backup\",\"basic\":\"Basic\",\"caption\":\"Caption\",\"close\":\"Close\",\"contain\":\"Contain\",\"controller\":\"Controller\",\"cover\":\"Cover\",\"darkMode\":\"Dark mode\",\"data\":\"Data\",\"description\":\"Description\",\"edit\":\"Edit\",\"file\":\"File\",\"fullscreen\":\"Fullscreen\",\"general\":\"General\",\"group\":\"Group\",\"groupKey\":\"Group key\",\"guide\":\"Guide\",\"hud\":\"HUD\",\"image\":\"Image\",\"imageUrl\":\"Image URL\",\"information\":\"Information\",\"inputAddress\":\"Please input address.\",\"inputKey\":\"Please enter the key.\",\"inputText\":\"Please input text.\",\"inputUrl\":\"Please input URL.\",\"keyboard\":\"Keyboard\",\"language\":\"Language\",\"leftKey\":\"Left key\",\"lightMode\":\"Light mode\",\"menu\":\"Menu\",\"name\":\"Name\",\"next\":\"Next\",\"none\":\"None\",\"openUrl\":\"Open URL\",\"paginate\":\"Slide number\",\"preference\":\"Preference\",\"previous\":\"Previous\",\"processing\":\"Processing..\",\"remove\":\"Remove\",\"repeat\":\"Repeat\",\"reset\":\"Reset\",\"resetSlideshow\":\"Reset slideshow\",\"restore\":\"Restore\",\"rightKey\":\"Right key\",\"shuffleText\":\"Shuffle text\",\"slides\":\"Slides\",\"style\":\"Style\",\"subject\":\"Subject\",\"submitEdit\":\"Edit\",\"swipe\":\"Swipe\",\"system\":\"System\",\"thumbnail\":\"Thumbnail\",\"urlThumbnailUrl\":\"Thumbnail image URL\",\"version\":\"Version\"},\"confirm\":{\"applyRestart\":\"The slideshow restarts.\\nWould you like to apply?\",\"backup\":\"Do you really want to back up all your data?\\nThe backed up content is saved as a `JSON` file.\",\"remove\":\"Do you really want to delete it?\",\"reset\":\"Do you really want to reset all settings and slide data?\\nOnce initialized, it cannot be recovered.\",\"restart\":\"Do you really want to restart?\",\"restore\":\"Would you really want to restore all your data?\\nThis operation will delete all current data.\",\"selectGroup\":\"Would you like to use it as the slide of your choice?\\nIf you change the slide, it starts over.\"},\"description\":{\"addSlides\":\"Please add slides in preferences.\",\"autoplay\":\"Autoplay the slide.\",\"autoplayDelay\":\"The amount of time to wait before the slide automatically transitions.\",\"autoplayDirection\":\"Set the direction in which the slide automatically transitions.\",\"autoplayPauseOnHover\":\"If you place the mouse over the slide area, autoplay is paused.\",\"backup\":\"Import or export all data in the slideshow.\",\"captionAnimationSpeed\":\"The higher the value, the faster the animation.\",\"captionAnimationType\":\"Select the caption transition when the slide changes.\",\"captionPosition\":\"Set position of the caption. ex) left,top\",\"captionScale\":\"Set size of the caption.\",\"empty\":\"Empty\",\"emptySlides\":\"No slides.\",\"getDataByRestAPI\":\"Get data by RestAPI address.\",\"getJsonFile\":\"Upload the JSON file to get the data.\",\"group\":\"Opens the slide group selection window.\",\"hoverVisibleHud\":\"If you overlay mouse, HUD will be hidden.\",\"hud\":\"It shows controller and status.\",\"imageScale\":\"Set the size of the slide image. ex) horizontal,vertical\",\"imageType\":\"Choose slide image type\",\"importDataMethod\":\"Select how to import your data.\",\"information\":\"If you have any comments on problems or improvements, please use the %{link} page.\",\"initialNumber\":\"This is the slide number displayed at the start. (Numbers from 0)\",\"inputDescriptionSlide\":\"Input description of the slide.\",\"inputImageUrl\":\"Input image address.\",\"inputKeyOnGroup\":\"Enter the key value for the slide group.\",\"inputSlideDataCode\":\"Please input slides data code.\",\"inputSlideTitle\":\"Input title for the slide.\",\"inputSlidesUrl\":\"Please enter the slide URL address.\",\"inputThumbnailUrl\":\"Input thumbnail image address.\",\"keyboardGuide\":\"Pressing a keyboard shortcut as follows executes the function.\",\"language\":\"Set the language.\",\"openPreference\":\"Open preference\",\"repeat\":\"Moves the slide from last to first.\",\"reset\":\"Reset all settings and slide data.\",\"restart\":\"Restart the slideshow\",\"screenMode\":\"Select a screen mode.\",\"selectGroup\":\"Select the slide you want to use.\",\"selectJsonFile\":\"Please select a JSON file.\",\"selectSlidesType\":\"Select the slide data type.\",\"selectSlidesType2\":\"If you change and apply the URL address method, the slide data will be lost.\",\"setCategoryDescription\":\"Set the description of the category.\",\"setCategoryName\":\"Set the name of the category.\",\"swipe\":\"Use swipe operations on touch devices\",\"thumbnail\":\"Open the thumbnail image list screen\",\"touchHud\":\"Toggles the HUD when clicking the mouse or touching the screen.\",\"transitionSpeed\":\"Change transition animation speed.\",\"transitionType\":\"Select the transition type when the slide changes.\",\"usingKeyboard\":\"Use keyboard shortcuts.\",\"visibleContents\":\"Set the display of each controller and status.\"},\"label\":{\"addGroup\":\"Add group\",\"addSlide\":\"Add slide\",\"editGroup\":\"Edit group\",\"editSlide\":\"Edit slide\",\"fadeInOut\":\"Fade in/out\",\"getData\":\"Import data\",\"imageType\":\"Image type\",\"moveHorizontal\":\"Move horizontally\",\"nextSlide\":\"Go to next slide\",\"prevSlide\":\"Go to previous slide\",\"removeGroup\":\"Remove group\"},\"language\":{\"en\":\"English\",\"ko\":\"Korean\"},\"preference\":{\"header\":{\"data\":\"Manage slide data.\",\"general\":\"Set the basic items.\",\"information\":\"You can check information about the slideshow.\",\"keyboard\":\"Settings related to keyboard shortcuts.\",\"slides\":\"Set the parts related to the slide.\",\"style\":\"Set the parts displayed on the screen.\"}},\"title\":{\"autoplayDelay\":\"Autoplay delay\",\"autoplayDirection\":\"Autoplay direction\",\"autoplayPauseOnHover\":\"Autoplay pause on hover\",\"backupOrRestore\":\"Backup & Restore\",\"captionAnimationSpeed\":\"Caption animation speed\",\"captionAnimationType\":\"Caption animation type\",\"captionPosition\":\"Caption position\",\"captionScale\":\"Caption scale\",\"changeMode\":\"Change the editing mode.\",\"emptySlide\":\"Empty slide\",\"fold\":\"Fold and unfold\",\"getSlideItems\":\"Get slide items\",\"hoverVisibleHud\":\"Visible Hover HUD\",\"imageScale\":\"Image scale\",\"importDataByAddress\":\"Import by address\",\"importDataByFile\":\"Import to file\",\"importSlideData\":\"Import slide data.\",\"initialNumber\":\"Initial slide number\",\"loading\":\"Ready Slideshow..\",\"manageSlideData\":\"Manage slides data\",\"screenMode\":\"Screen mode\",\"selectGroup\":\"Select group\",\"selectSlidesType\":\"Select slide type\",\"slidesUrlAddress\":\"Slide URL address\",\"thumbnailView\":\"Thumbnail view\",\"touchHud\":\"Toggle HUD on click or touch\",\"transitionSpeed\":\"Transition speed\",\"transitionType\":\"Transition type\",\"usingKeyboard\":\"Using keyboard shortcut\",\"visibleContents\":\"Visible contents\"}}");

},{}],"l9PjU":[function(require,module,exports) {
module.exports = JSON.parse("{\"alert\":{\"completeRestore\":\"복원을 완료했습니다.\",\"errorSubmit\":\"처리에 문제가 생겼습니다.\",\"failedApply\":\"오류가 발생하여 적용하지 못했습니다.\",\"failedGetData\":\"데이터를 가져오는데 실패했습니다.\",\"failedRestore\":\"복원에 실패했습니다.\",\"invalidAddress\":\"주소가 잘못되었습니다.\",\"invalidData\":\"데이터가 잘못되었습니다.\",\"noSelectedFile\":\"선택한 파일이 없습니다.\"},\"base\":{\"ShortcutKey\":\"단축키\",\"add\":\"추가하기\",\"address\":\"주소\",\"advanced\":\"전문가\",\"apply\":\"적용하기\",\"array\":\"배열\",\"author\":\"제작자\",\"autoplay\":\"자동재생\",\"backup\":\"백업\",\"basic\":\"기본\",\"caption\":\"캡션\",\"close\":\"닫기\",\"contain\":\"전부 보이기\",\"controller\":\"컨트롤러\",\"cover\":\"꽉채우기\",\"darkMode\":\"다크 모드\",\"data\":\"데이터\",\"description\":\"설명\",\"edit\":\"수정\",\"file\":\"파일\",\"fullscreen\":\"전체화면\",\"general\":\"기본\",\"group\":\"그룹\",\"groupKey\":\"그룹 키\",\"guide\":\"가이드\",\"hud\":\"HUD\",\"image\":\"이미지\",\"imageUrl\":\"이미지 URL\",\"information\":\"정보\",\"inputAddress\":\"주소를 입력해주세요.\",\"inputKey\":\"키를 입력해주세요.\",\"inputText\":\"글자를 입력해주세요.\",\"inputUrl\":\"URL을 입력하세요.\",\"keyboard\":\"키보드\",\"language\":\"언어\",\"leftKey\":\"왼쪽 방향키\",\"lightMode\":\"라이트 모드\",\"menu\":\"메뉴\",\"name\":\"이름\",\"next\":\"다음\",\"none\":\"없음\",\"openUrl\":\"URL 열기\",\"paginate\":\"슬라이드 번호\",\"preference\":\"환경설정\",\"previous\":\"이전\",\"processing\":\"처리중..\",\"remove\":\"삭제\",\"repeat\":\"반복\",\"reset\":\"재설정\",\"resetSlideshow\":\"슬라이드쇼 재설정\",\"restore\":\"복원\",\"rightKey\":\"오른쪽 방향키\",\"shuffleText\":\"무작위로 변하는 글자\",\"slides\":\"슬라이드\",\"style\":\"스타일\",\"subject\":\"제목\",\"submitEdit\":\"수정하기\",\"swipe\":\"밀어 넘기기\",\"system\":\"시스템\",\"thumbnail\":\"썸네일\",\"urlThumbnailUrl\":\"썸네일 이미지 URL\",\"version\":\"버전\"},\"confirm\":{\"applyRestart\":\"슬라이드쇼가 재시작됩니다.\\n적용하시겠습니까?\",\"backup\":\"정말 모든 데이터를 백업할까요?\\n백업한 내용은 `JSON` 파일로 저장됩니다.\",\"remove\":\"정말 삭제할까요?\",\"reset\":\"정말로 모든 설정과 슬라이드 데이터를 초기화 하겠습니까?\\n초기화하면 복구할 수 없습니다.\",\"restart\":\"정말로 재시작 하겠습니까?\",\"restore\":\"정말 모든 데이터를 복원할까요?\\n이 작업은 현재 데이터가 모두 삭제됩니다.\",\"selectGroup\":\"선택한 슬라이드로 사용할까요?\\n슬라이드를 변경하면 다시 시작합니다.\"},\"description\":{\"addSlides\":\"환경설정에서 슬라이드를 추가해주세요.\",\"autoplay\":\"슬라이드를 자동재생 합니다.\",\"autoplayDelay\":\"슬라이드가 자동으로 전환하기 전에 대기하는 시간입니다.\",\"autoplayDirection\":\"슬라이드가 자동으로 전환하는 방향을 설정합니다.\",\"autoplayPauseOnHover\":\"슬라이드 영역에 마우스를 갖다대면 자동재생을 일시정지 합니다.\",\"backup\":\"슬라이드쇼의 모든 데이터를 가져오거나 내보냅니다.\",\"captionAnimationSpeed\":\"값이 높을수록 애니메이션 속도가 빨라집니다.\",\"captionAnimationType\":\"슬라이드가 바뀔때의 캡션 트랜지션을 선택합니다.\",\"captionPosition\":\"캡션의 위치를 설정합니다. 예)왼쪽,상단\",\"captionScale\":\"캡션의 크기를 설정합니다.\",\"empty\":\"비었습니다.\",\"emptySlides\":\"슬라이드가 없습니다.\",\"getDataByRestAPI\":\"RestAPI 주소로 데이터를 가져옵니다.\",\"getJsonFile\":\"JSON 파일을 업로드하여 데이터를 가져옵니다.\",\"group\":\"슬라이드 그룹 선택창을 엽니다.\",\"hoverVisibleHud\":\"슬라이드 영역에 마우스를 갖다대면 조작과 상태요소를 숨깁니다.\",\"hud\":\"조작과 상태요소들을 보여줍니다.\",\"imageScale\":\"슬라이드 이미지 크기를 정합니다. 예) 가로,세로\",\"imageType\":\"슬라이드 이미지 표시방식을 선택합니다.\",\"importDataMethod\":\"데이터를 가져오는 방법을 선택합니다.\",\"information\":\"문제점이나 개선에 관한 의견이 있으면 %{link} 페이지를 이용해주세요.\",\"initialNumber\":\"시작할때 표시되는 슬라이드 번호입니다. (번호는 0부터)\",\"inputDescriptionSlide\":\"슬라이드 설명을 입력합니다.\",\"inputImageUrl\":\"이미지 주소를 입력합니다.\",\"inputKeyOnGroup\":\"슬라이드 그룹의 키값을 입력합니다.\",\"inputSlideDataCode\":\"슬라이드 데이터 코드를 입력해주세요.\",\"inputSlideTitle\":\"슬라이드 제목을 입력합니다.\",\"inputSlidesUrl\":\"슬라이드 URL 주소를 입력해주세요.\",\"inputThumbnailUrl\":\"썸네일 이미지 주소를 입력합니다.\",\"keyboardGuide\":\"다음과 같이 키보드 단축키를 누르면 해당 기능을 실행합니다.\",\"language\":\"언어를 설정합니다.\",\"openPreference\":\"환경설정 열기\",\"repeat\":\"슬라이드를 마지막에서 처음으로 이동합니다.\",\"reset\":\"모든 설정과 슬라이드 데이터를 재설정합니다.\",\"restart\":\"슬라이드쇼 재실행\",\"screenMode\":\"화면모드를 선택합니다.\",\"selectGroup\":\"사용할 슬라이드를 선택합니다.\",\"selectJsonFile\":\"JSON 파일을 선택해주세요.\",\"selectSlidesType\":\"슬라이드 데이터의 타입을 선택합니다.\",\"selectSlidesType2\":\"URL 주소방식으로 변경하고 적용하면 슬라이드 데이터가 없어집니다.\",\"setCategoryDescription\":\"카테고리에 대한 설명을 입력합니다.\",\"setCategoryName\":\"카테고리의 이름을 설정합니다.\",\"swipe\":\"터치 디바이스에서 밀어 넘기는 조작을 사용합니다.\",\"thumbnail\":\"썸네일 이미지 목록화면을 엽니다.\",\"touchHud\":\"마우스를 클릭하거나 화면을 터치할때 HUD를 토글링합니다.\",\"transitionSpeed\":\"트랜지션 애니메이션 속도를 변경합니다.\",\"transitionType\":\"슬라이드가 바뀔때의 트랜지션을 선택합니다.\",\"usingKeyboard\":\"키보드 단축키를 사용합니다.\",\"visibleContents\":\"각 조작과 상태요소들 표시를 설정합니다.\"},\"label\":{\"addGroup\":\"그룹 추가\",\"addSlide\":\"슬라이드 추가\",\"editGroup\":\"그룹 수정\",\"editSlide\":\"슬라이드 수정\",\"fadeInOut\":\"투명도 전환\",\"getData\":\"데이터 가져오기\",\"imageType\":\"이미지 표시방식\",\"moveHorizontal\":\"가로방향으로 이동\",\"nextSlide\":\"다음 슬라이드로 이동하기\",\"prevSlide\":\"이전 슬라이드로 이동하기\",\"removeGroup\":\"그룹 삭제\"},\"language\":{\"en\":\"영어\",\"ko\":\"한국어\"},\"preference\":{\"header\":{\"data\":\"슬라이드 데이터를 관리합니다.\",\"general\":\"기초적인 항목들을 설정합니다.\",\"information\":\"슬라이드쇼에 관한 정보를 확인할 수 있습니다.\",\"keyboard\":\"키보드 단축키에 관한 설정입니다.\",\"slides\":\"슬라이드와 관련된 부분들을 설정합니다.\",\"style\":\"화면에 표시되는 부분들을 설정합니다.\"}},\"title\":{\"autoplayDelay\":\"자동재생 딜레이\",\"autoplayDirection\":\"자동재생 방향\",\"autoplayPauseOnHover\":\"마우스 오버시 자동재생 일시정지\",\"backupOrRestore\":\"백업 및 복원\",\"captionAnimationSpeed\":\"캡션 애니메이션 속도\",\"captionAnimationType\":\"캡션 애니메이션 종류\",\"captionPosition\":\"캡션 위치\",\"captionScale\":\"캡션 크기\",\"changeMode\":\"편집모드를 변경합니다.\",\"emptySlide\":\"빈 슬라이드\",\"fold\":\"접고 펼치기\",\"getSlideItems\":\"슬라이드 아이템 가져오기\",\"hoverVisibleHud\":\"마우스 오버시 HUD 보이기\",\"imageScale\":\"이미지 크기\",\"importDataByAddress\":\"주소로 가져오기\",\"importDataByFile\":\"파일로 가져오기\",\"importSlideData\":\"슬라이드 데이터를 가져옵니다.\",\"initialNumber\":\"기본 슬라이드 번호\",\"loading\":\"슬라이드쇼 준비중..\",\"manageSlideData\":\"슬라이드 데이터 관리\",\"screenMode\":\"화면모드\",\"selectGroup\":\"그룹 선택하기\",\"selectSlidesType\":\"슬라이드 타입 선택\",\"slidesUrlAddress\":\"슬라이드 URL 주소\",\"thumbnailView\":\"썸네일 보기\",\"touchHud\":\"클릭, 터치시 HUD 토글\",\"transitionSpeed\":\"트랜지션 속도\",\"transitionType\":\"트랜지션 종류\",\"usingKeyboard\":\"키보드 단축키 사용\",\"visibleContents\":\"요소들 표시\"}}");

},{}],"6yot6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
let script;
let initialize = ()=>{
    script = {
    };
    script.render = require('template:./Foo.vue').render;
    script.__cssModules = require('style:./Foo.vue').default;
    require('custom:./Foo.vue').default(script);
    script.__scopeId = 'data-v-952d32';
    script.__file = "/Users/redgoose/dev/open/slideshow/src/Foo.vue";
};
initialize();
if (module.hot) {
    script.__hmrId = '952d32-hmr';
    module.hot.accept(()=>{
        setTimeout(()=>{
            initialize();
            if (!__VUE_HMR_RUNTIME__.createRecord('952d32-hmr', script)) __VUE_HMR_RUNTIME__.reload('952d32-hmr', script);
        }, 0);
    });
}
exports.default = script;

},{"template:./Foo.vue":"8tv98","custom:./Foo.vue":"fScx2","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc","style:./Foo.vue":"isTIH"}],"8tv98":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "render", ()=>render
);
var _vue = require("vue");
function render(_ctx, _cache) {
    return _vue.openBlock(), _vue.createElementBlock("div", null, "mdskfsdg");
}
if (module.hot) module.hot.accept(()=>{
    __VUE_HMR_RUNTIME__.rerender('952d32-hmr', render);
});

},{"vue":"eg0LR","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"fScx2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
let NOOP = ()=>{
};
exports.default = (script)=>{
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"isTIH":[function() {},{}]},["kAaS7","i87aF"], "i87aF", "parcelRequire9e1c")

//# sourceMappingURL=index.147655b4.js.map
