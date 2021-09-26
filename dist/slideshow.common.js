module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		0: 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "slideshow.common." + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"1":1,"2":1,"3":1,"4":1,"5":1,"6":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({}[chunkId]||chunkId) + "." + {"1":"64b5330e","2":"e8a59ab6","3":"4ded8cbb","4":"bb02e87d","5":"6fb8c52d","6":"f7e6b1b6","7":"31d6cfe0","8":"31d6cfe0","9":"31d6cfe0","10":"31d6cfe0","11":"31d6cfe0","12":"31d6cfe0","13":"31d6cfe0","14":"31d6cfe0","15":"31d6cfe0","16":"31d6cfe0","17":"31d6cfe0","18":"31d6cfe0","19":"31d6cfe0","20":"31d6cfe0","21":"31d6cfe0","22":"31d6cfe0","23":"31d6cfe0","24":"31d6cfe0","25":"31d6cfe0","26":"31d6cfe0","27":"31d6cfe0","28":"31d6cfe0","29":"31d6cfe0"}[chunkId] + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = (typeof self !== 'undefined' ? self : this)["webpackJsonpslideshow"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpslideshow"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0251":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__("fbf1")
} else {}


/***/ }),

/***/ "0676":
/***/ (function(module) {

module.exports = JSON.parse("{\"default\":{\"name\":\"Welcome\",\"description\":\"Welcome to slideshow.\",\"slides\":[{\"src\":\"https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1476990789491-712b869b91a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Sunset over the mountains of Skye\",\"description\":\"Published on October 21, 2016\"},{\"src\":\"https://images.unsplash.com/photo-1595518107491-f80eb7f9881e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1595518107491-f80eb7f9881e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Zayapas from the Galapagos Islands, Ecuador\",\"description\":\"Published on July 24, 2020\"},{\"src\":\"https://images.unsplash.com/photo-1620678684394-8fee237fc786?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1620678684394-8fee237fc786?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Moscow International Business Center\",\"description\":\"Published on May 11, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1616697256726-b5b7888a7a4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1616697256726-b5b7888a7a4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Brock Wegner\",\"description\":\"Published on March 26, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1619491202102-088c4afb271c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1619491202102-088c4afb271c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Dancing Bettas\",\"description\":\"Published on April 27, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1619857154353-eff1ffd9ffe4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1619857154353-eff1ffd9ffe4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Pretty lady dressed in sari costume.\",\"description\":\"Published on May 1, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1580996378027-23040f16f157?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Reflet de la ville sur l'eau Amsterdam\",\"description\":\"Published on February 6, 2020\"},{\"src\":\"https://images.unsplash.com/photo-1618679352407-4bdfed501f8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1618679352407-4bdfed501f8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"The Cubic Houses\",\"description\":\"Published on April 18, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1506799688517-a81d6bd3df37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1506799688517-a81d6bd3df37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Little green jewel: hummingbird\",\"description\":\"Published on October 1, 2017\"},{\"src\":\"https://images.unsplash.com/photo-1619408506946-a3caaf4e4d35?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1619408506946-a3caaf4e4d35?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Great Sand Dunes National Park\",\"description\":\"Published on April 26, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1618423771949-1de4842d5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1618423771949-1de4842d5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Solen Feyissa\",\"description\":\"Published on April 15, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1616902599633-ebde6959ad85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1616902599633-ebde6959ad85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"奥森人像\",\"description\":\"Published on March 28, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1538226740644-8c7670181991?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1538226740644-8c7670181991?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=70\",\"title\":\"The numbers mason.\",\"description\":\"Published on September 29, 2018\"},{\"src\":\"https://images.unsplash.com/photo-1618422960849-739830070f39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1618422960849-739830070f39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Icy shore\",\"description\":\"Published on April 15, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1616022752456-ba38a5b662ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1616022752456-ba38a5b662ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Nubelson Fernandes\",\"description\":\"Published on March 18, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Jordan Whitt\",\"description\":\"Published on March 29, 2016\"},{\"src\":\"https://images.unsplash.com/photo-1620224027739-3d0e4cc395a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1620224027739-3d0e4cc395a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Sunset to sunrise\",\"description\":\"Published on May 5, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1618242799521-89ad053ab347?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1618242799521-89ad053ab347?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"my little trip to Istanbul\",\"description\":\"Published on April 13, 2021\"},{\"src\":\"https://images.unsplash.com/photo-1495012379376-194a416fcc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1495012379376-194a416fcc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Joel Filipe\",\"description\":\"Published on May 17, 2017\"},{\"src\":\"https://images.unsplash.com/photo-1521986329282-0436c1f1e212?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1521986329282-0436c1f1e212?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"bright sandwiches\",\"description\":\"Published on March 26, 2018\"},{\"src\":\"https://images.unsplash.com/photo-1502663228013-cccc7d39c172?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1502663228013-cccc7d39c172?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Eyes\",\"description\":\"Published on August 14, 2017\"},{\"src\":\"https://images.unsplash.com/photo-1512227395252-27af259c80d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1512227395252-27af259c80d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Smile!\",\"description\":\"Published on December 3, 2017\"},{\"src\":\"https://images.unsplash.com/photo-1600790078201-5490baf711d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1600790078201-5490baf711d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"Ripe black figs\",\"description\":\"Published on September 23, 2020\"},{\"src\":\"https://images.unsplash.com/photo-1619978762902-5eb1b2bee966?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2400&q=70\",\"thumbnail\":\"https://images.unsplash.com/photo-1619978762902-5eb1b2bee966?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70\",\"title\":\"First touch of light\",\"description\":\"Published on May 3, 2021\"}]}}");

/***/ }),

/***/ "0c15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_5614762c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c5e7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_5614762c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_5614762c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "0fee":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1241":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1717":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return convertPureObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkSlideItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return checkTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkPreference; });
/**
 * check nested keys in object
 *
 * @param {object} src
 * @param {string} type
 * @param {array} keys
 * @throws {Error}
 */
function checkNestedKeys(src, type, keys)
{
  const address = keys.join('.');
  const message_errorType = `The type(${address}) is wrong.`;
  for (let i = 0; i < keys.length; i++)
  {
    if (!src || !src.hasOwnProperty(keys[i]))
    {
      throw new Error(`The item(${address}) is missing or invalid.`);
    }
    src = src[keys[i]];
  }
  switch (type)
  {
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

/**
 * convert pure object
 * `proxy`, `observable`객체를 순수한 객체로 변환해준다.
 *
 * @param {Object|Array} src
 * @return
 */
function convertPureObject(src)
{
  if (!src) return null;
  try
  {
    return JSON.parse(JSON.stringify(src));
  }
  catch(_)
  {
    return null;
  }
}

/**
 * check slide items
 *
 * @param {object[]} items
 * @return {boolean}
 * @throws {Error}
 */
function checkSlideItems(items)
{
  if (!(items && typeof items === 'object')) throw new Error('Invalid slides data');
  for (let i=0; i<items.length; i++)
  {
    if (!(items[i] && items[i].src))
    {
      throw new Error(`The item[${i}] of this item is invalid.`);
    }
  }
}

/**
 * check tree
 *
 * @param {object} src
 * @return {boolean}
 * @throws {Error}
 */
function checkTree(src)
{
  if (!src) throw new Error('No value');
  if (typeof src !== 'object') throw new Error('This value is not an object.');
  let keys = Object.keys(src);
  for (let i=0; i<keys.length; i++)
  {
    // for address
    if (typeof src[keys[i]].slides === 'string') continue;
    if (!Array.isArray(src[keys[i]].slides))
    {
      throw new Error(`not array item: item.${keys[i]}`);
    }
    if (src[keys[i]].length <= 0) continue;
    checkSlideItems(src[keys[i]]);
  }
  return true;
}

/**
 * check preference data
 */
function checkPreference(item)
{
  try
  {
    if (!item) throw new Error('no item');
    if (!(item.general && item.slides && item.style && item.keyboard)) throw new Error('no item property');
    // general
    checkNestedKeys(item, 'string', ['general', 'language']);
    checkNestedKeys(item, 'boolean', ['general', 'hud']);
    checkNestedKeys(item, 'boolean', ['general', 'hoverVisibleHud']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'menu']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'caption']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'controller']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'paginate']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'autoplay']);
    checkNestedKeys(item, 'boolean', ['general', 'visibleHudContents', 'group']);
    // slides
    checkNestedKeys(item, 'number', ['slides', 'initialNumber']);
    checkNestedKeys(item, 'string', ['slides', 'animationType']);
    checkNestedKeys(item, 'number', ['slides', 'animationSpeed']);
    checkNestedKeys(item, 'string', ['slides', 'captionAnimationType']);
    checkNestedKeys(item, 'number', ['slides', 'captionAnimationSpeed']);
    checkNestedKeys(item, 'boolean', ['slides', 'autoplay']);
    checkNestedKeys(item, 'number', ['slides', 'autoplayDelay']);
    checkNestedKeys(item, 'boolean', ['slides', 'autoplayDirection']);
    checkNestedKeys(item, 'boolean', ['slides', 'autoplayPauseOnHover']);
    checkNestedKeys(item, 'boolean', ['slides', 'loop']);
    checkNestedKeys(item, 'boolean', ['slides', 'swipe']);
    // style
    checkNestedKeys(item, 'string', ['style', 'screenColor']);
    checkNestedKeys(item, 'string', ['style', 'imageType']);
    checkNestedKeys(item, 'array', ['style', 'imageScale']);
    checkNestedKeys(item, 'number', ['style', 'captionScale']);
    checkNestedKeys(item, 'array', ['style', 'captionPosition']);
    // keyboard
    checkNestedKeys(item, 'boolean', ['keyboard', 'enabled']);
    return true;
  }
  catch(e)
  {
    if (window.dev) console.error(e.message);
    return false;
  }
}


/***/ }),

/***/ "1802":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Side_scss_vue_type_style_index_0_id_2c12f259_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4564");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Side_scss_vue_type_style_index_0_id_2c12f259_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Side_scss_vue_type_style_index_0_id_2c12f259_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "2dd3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "31fc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bf7a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3306":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3cee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Container_scss_vue_type_style_index_0_id_0aacfd4a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bb6c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Container_scss_vue_type_style_index_0_id_0aacfd4a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Container_scss_vue_type_style_index_0_id_0aacfd4a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3f4e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupDevtoolsPlugin", function() { return setupDevtoolsPlugin; });
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("abc5");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b774");
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("f30a");





function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = Object(_env__WEBPACK_IMPORTED_MODULE_0__[/* getTarget */ "b"])();
    const hook = Object(_env__WEBPACK_IMPORTED_MODULE_0__[/* getDevtoolsGlobalHook */ "a"])();
    const enableProxy = _env__WEBPACK_IMPORTED_MODULE_0__[/* isProxyAvailable */ "c"] && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
        hook.emit(_const__WEBPACK_IMPORTED_MODULE_1__[/* HOOK_SETUP */ "b"], pluginDescriptor, setupFn);
    }
    else {
        const proxy = enableProxy ? new _proxy__WEBPACK_IMPORTED_MODULE_2__[/* ApiProxy */ "a"](pluginDescriptor, hook) : null;
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor,
            setupFn,
            proxy
        });
        if (proxy)
            setupFn(proxy.proxiedTarget);
    }
}


/***/ }),

/***/ "4222":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "42e6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Controller_scss_vue_type_style_index_0_id_16c50d3d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3306");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Controller_scss_vue_type_style_index_0_id_16c50d3d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Controller_scss_vue_type_style_index_0_id_16c50d3d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4543":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4564":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4a5c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Close_vue_vue_type_style_index_0_id_11df97a2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c9a8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Close_vue_vue_type_style_index_0_id_11df97a2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Close_vue_vue_type_style_index_0_id_11df97a2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "4f29":
/***/ (function(module) {

module.exports = JSON.parse("{\"alert\":{\"completeRestore\":\"복원을 완료했습니다.\",\"errorSubmit\":\"처리에 문제가 생겼습니다.\",\"failedApply\":\"오류가 발생하여 적용하지 못했습니다.\",\"failedGetData\":\"데이터를 가져오는데 실패했습니다.\",\"failedRestore\":\"복원에 실패했습니다.\",\"invalidAddress\":\"주소가 잘못되었습니다.\",\"invalidData\":\"데이터가 잘못되었습니다.\",\"noSelectedFile\":\"선택한 파일이 없습니다.\"},\"base\":{\"ShortcutKey\":\"단축키\",\"add\":\"추가하기\",\"address\":\"주소\",\"advanced\":\"전문가\",\"apply\":\"적용하기\",\"array\":\"배열\",\"author\":\"제작자\",\"autoplay\":\"자동재생\",\"backup\":\"백업\",\"basic\":\"기본\",\"caption\":\"캡션\",\"close\":\"닫기\",\"contain\":\"전부 보이기\",\"controller\":\"컨트롤러\",\"cover\":\"꽉채우기\",\"darkMode\":\"다크 모드\",\"data\":\"데이터\",\"description\":\"설명\",\"edit\":\"수정\",\"file\":\"파일\",\"fullscreen\":\"전체화면\",\"general\":\"기본\",\"group\":\"그룹\",\"groupKey\":\"그룹 키\",\"guide\":\"가이드\",\"hud\":\"HUD\",\"image\":\"이미지\",\"imageUrl\":\"이미지 URL\",\"information\":\"정보\",\"inputAddress\":\"주소를 입력해주세요.\",\"inputKey\":\"키를 입력해주세요.\",\"inputText\":\"글자를 입력해주세요.\",\"inputUrl\":\"URL을 입력하세요.\",\"keyboard\":\"키보드\",\"language\":\"언어\",\"leftKey\":\"왼쪽 방향키\",\"lightMode\":\"라이트 모드\",\"menu\":\"메뉴\",\"name\":\"이름\",\"next\":\"다음\",\"none\":\"없음\",\"openUrl\":\"URL 열기\",\"paginate\":\"슬라이드 번호\",\"preference\":\"환경설정\",\"previous\":\"이전\",\"processing\":\"처리중..\",\"remove\":\"삭제\",\"repeat\":\"반복\",\"reset\":\"재설정\",\"resetSlideshow\":\"슬라이드쇼 재설정\",\"restore\":\"복원\",\"rightKey\":\"오른쪽 방향키\",\"shuffleText\":\"무작위로 변하는 글자\",\"slides\":\"슬라이드\",\"style\":\"스타일\",\"subject\":\"제목\",\"submitEdit\":\"수정하기\",\"swipe\":\"밀어 넘기기\",\"system\":\"시스템\",\"thumbnail\":\"썸네일\",\"urlThumbnailUrl\":\"썸네일 이미지 URL\",\"version\":\"버전\"},\"confirm\":{\"applyRestart\":\"슬라이드쇼가 재시작됩니다.\\n적용하시겠습니까?\",\"backup\":\"정말 모든 데이터를 백업할까요?\\n백업한 내용은 `JSON` 파일로 저장됩니다.\",\"remove\":\"정말 삭제할까요?\",\"reset\":\"정말로 모든 설정과 슬라이드 데이터를 초기화 하겠습니까?\\n초기화하면 복구할 수 없습니다.\",\"restart\":\"정말로 재시작 하겠습니까?\",\"restore\":\"정말 모든 데이터를 복원할까요?\\n이 작업은 현재 데이터가 모두 삭제됩니다.\",\"selectGroup\":\"선택한 슬라이드로 사용할까요?\\n슬라이드를 변경하면 다시 시작합니다.\"},\"description\":{\"addSlides\":\"환경설정에서 슬라이드를 추가해주세요.\",\"autoplay\":\"슬라이드를 자동재생 합니다.\",\"autoplayDelay\":\"슬라이드가 자동으로 전환하기 전에 대기하는 시간입니다.\",\"autoplayDirection\":\"슬라이드가 자동으로 전환하는 방향을 설정합니다.\",\"autoplayPauseOnHover\":\"슬라이드 영역에 마우스를 갖다대면 자동재생을 일시정지 합니다.\",\"backup\":\"슬라이드쇼의 모든 데이터를 가져오거나 내보냅니다.\",\"captionAnimationSpeed\":\"값이 높을수록 애니메이션 속도가 빨라집니다.\",\"captionAnimationType\":\"슬라이드가 바뀔때의 캡션 트랜지션을 선택합니다.\",\"captionPosition\":\"캡션의 위치를 설정합니다. 예)왼쪽,상단\",\"captionScale\":\"캡션의 크기를 설정합니다.\",\"empty\":\"비었습니다.\",\"emptySlides\":\"슬라이드가 없습니다.\",\"getDataByRestAPI\":\"RestAPI 주소로 데이터를 가져옵니다.\",\"getJsonFile\":\"JSON 파일을 업로드하여 데이터를 가져옵니다.\",\"group\":\"슬라이드 그룹 선택창을 엽니다.\",\"hoverVisibleHud\":\"슬라이드 영역에 마우스를 갖다대면 조작과 상태요소를 숨깁니다.\",\"hud\":\"조작과 상태요소들을 보여줍니다.\",\"imageScale\":\"슬라이드 이미지 크기를 정합니다. 예) 가로,세로\",\"imageType\":\"슬라이드 이미지 표시방식을 선택합니다.\",\"importDataMethod\":\"데이터를 가져오는 방법을 선택합니다.\",\"information\":\"문제점이나 개선에 관한 의견이 있으면 %{link} 페이지를 이용해주세요.\",\"initialNumber\":\"시작할때 표시되는 슬라이드 번호입니다. (번호는 0부터)\",\"inputDescriptionSlide\":\"슬라이드 설명을 입력합니다.\",\"inputImageUrl\":\"이미지 주소를 입력합니다.\",\"inputKeyOnGroup\":\"슬라이드 그룹의 키값을 입력합니다.\",\"inputSlideDataCode\":\"슬라이드 데이터 코드를 입력해주세요.\",\"inputSlideTitle\":\"슬라이드 제목을 입력합니다.\",\"inputSlidesUrl\":\"슬라이드 URL 주소를 입력해주세요.\",\"inputThumbnailUrl\":\"썸네일 이미지 주소를 입력합니다.\",\"keyboardGuide\":\"다음과 같이 키보드 단축키를 누르면 해당 기능을 실행합니다.\",\"language\":\"언어를 설정합니다.\",\"openPreference\":\"환경설정 열기\",\"repeat\":\"슬라이드를 마지막에서 처음으로 이동합니다.\",\"reset\":\"모든 설정과 슬라이드 데이터를 재설정합니다.\",\"restart\":\"슬라이드쇼 재실행\",\"screenMode\":\"화면모드를 선택합니다.\",\"selectGroup\":\"사용할 슬라이드를 선택합니다.\",\"selectJsonFile\":\"JSON 파일을 선택해주세요.\",\"selectSlidesType\":\"슬라이드 데이터의 타입을 선택합니다.\",\"selectSlidesType2\":\"URL 주소방식으로 변경하고 적용하면 슬라이드 데이터가 없어집니다.\",\"setCategoryDescription\":\"카테고리에 대한 설명을 입력합니다.\",\"setCategoryName\":\"카테고리의 이름을 설정합니다.\",\"swipe\":\"터치 디바이스에서 밀어 넘기는 조작을 사용합니다.\",\"thumbnail\":\"썸네일 이미지 목록화면을 엽니다.\",\"touchHud\":\"마우스를 클릭하거나 화면을 터치할때 HUD를 토글링합니다.\",\"transitionSpeed\":\"트랜지션 애니메이션 속도를 변경합니다.\",\"transitionType\":\"슬라이드가 바뀔때의 트랜지션을 선택합니다.\",\"usingKeyboard\":\"키보드 단축키를 사용합니다.\",\"visibleContents\":\"각 조작과 상태요소들 표시를 설정합니다.\"},\"label\":{\"addGroup\":\"그룹 추가\",\"addSlide\":\"슬라이드 추가\",\"editGroup\":\"그룹 수정\",\"editSlide\":\"슬라이드 수정\",\"fadeInOut\":\"투명도 전환\",\"getData\":\"데이터 가져오기\",\"imageType\":\"이미지 표시방식\",\"moveHorizontal\":\"가로방향으로 이동\",\"nextSlide\":\"다음 슬라이드로 이동하기\",\"prevSlide\":\"이전 슬라이드로 이동하기\",\"removeGroup\":\"그룹 삭제\"},\"language\":{\"en\":\"영어\",\"ko\":\"한국어\"},\"preference\":{\"header\":{\"data\":\"슬라이드 데이터를 관리합니다.\",\"general\":\"기초적인 항목들을 설정합니다.\",\"information\":\"슬라이드쇼에 관한 정보를 확인할 수 있습니다.\",\"keyboard\":\"키보드 단축키에 관한 설정입니다.\",\"slides\":\"슬라이드와 관련된 부분들을 설정합니다.\",\"style\":\"화면에 표시되는 부분들을 설정합니다.\"}},\"title\":{\"autoplayDelay\":\"자동재생 딜레이\",\"autoplayDirection\":\"자동재생 방향\",\"autoplayPauseOnHover\":\"마우스 오버시 자동재생 일시정지\",\"backupOrRestore\":\"백업 및 복원\",\"captionAnimationSpeed\":\"캡션 애니메이션 속도\",\"captionAnimationType\":\"캡션 애니메이션 종류\",\"captionPosition\":\"캡션 위치\",\"captionScale\":\"캡션 크기\",\"changeMode\":\"편집모드를 변경합니다.\",\"emptySlide\":\"빈 슬라이드\",\"fold\":\"접고 펼치기\",\"getSlideItems\":\"슬라이드 아이템 가져오기\",\"hoverVisibleHud\":\"마우스 오버시 HUD 보이기\",\"imageScale\":\"이미지 크기\",\"importDataByAddress\":\"주소로 가져오기\",\"importDataByFile\":\"파일로 가져오기\",\"importSlideData\":\"슬라이드 데이터를 가져옵니다.\",\"initialNumber\":\"기본 슬라이드 번호\",\"loading\":\"슬라이드쇼 준비중..\",\"manageSlideData\":\"슬라이드 데이터 관리\",\"screenMode\":\"화면모드\",\"selectGroup\":\"그룹 선택하기\",\"selectSlidesType\":\"슬라이드 타입 선택\",\"slidesUrlAddress\":\"슬라이드 URL 주소\",\"thumbnailView\":\"썸네일 보기\",\"touchHud\":\"클릭, 터치시 HUD 토글\",\"transitionSpeed\":\"트랜지션 속도\",\"transitionType\":\"트랜지션 종류\",\"usingKeyboard\":\"키보드 단축키 사용\",\"visibleContents\":\"요소들 표시\"}}");

/***/ }),

/***/ "5054":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Intro_vue_vue_type_style_index_0_id_49ccabb8_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a8a3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Intro_vue_vue_type_style_index_0_id_49ccabb8_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Intro_vue_vue_type_style_index_0_id_49ccabb8_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5055":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5502":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export createLogger */
/* unused harmony export createNamespacedHelpers */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createStore; });
/* unused harmony export mapActions */
/* unused harmony export mapGetters */
/* unused harmony export mapMutations */
/* unused harmony export mapState */
/* unused harmony export storeKey */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useStore; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vue_devtools_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3f4e");
/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */



var storeKey = 'store';

function useStore (key) {
  if ( key === void 0 ) key = null;

  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["inject"])(key !== null ? key : storeKey)
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
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

function resetStoreState (store, state, hot) {
  var oldState = store._state;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computedObj = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldState.
    // using partial to return function with only arguments preserved in closure environment.
    computedObj[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      // TODO: use `computed` when it's possible. at the moment we can't due to
      // https://github.com/vuejs/vuex/pull/1883
      get: function () { return computedObj[key](); },
      enumerable: true // for local getters
    });
  });

  store._state = Object(vue__WEBPACK_IMPORTED_MODULE_0__["reactive"])({
    data: state
  });

  // enable strict mode for new state
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldState) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldState.data = null;
      });
    }
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && true) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      parentState[moduleName] = module.state;
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by state update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  Object(vue__WEBPACK_IMPORTED_MODULE_0__["watch"])(function () { return store._state.data; }, function () {
    {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, flush: 'sync' });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

var LABEL_VUEX_BINDINGS = 'vuex bindings';
var MUTATIONS_LAYER_ID = 'vuex:mutations';
var ACTIONS_LAYER_ID = 'vuex:actions';
var INSPECTOR_ID = 'vuex';

var actionId = 0;

function addDevtools (app, store) {
  Object(_vue_devtools_api__WEBPACK_IMPORTED_MODULE_1__["setupDevtoolsPlugin"])(
    {
      id: 'org.vuejs.vuex',
      app: app,
      label: 'Vuex',
      homepage: 'https://next.vuex.vuejs.org/',
      logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
      packageName: 'vuex',
      componentStateTypes: [LABEL_VUEX_BINDINGS]
    },
    function (api) {
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

      api.on.getInspectorTree(function (payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          if (payload.filter) {
            var nodes = [];
            flattenStoreForInspectorTree(nodes, store._modules.root, payload.filter, '');
            payload.rootNodes = nodes;
          } else {
            payload.rootNodes = [
              formatStoreForInspectorTree(store._modules.root, '')
            ];
          }
        }
      });

      api.on.getInspectorState(function (payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          makeLocalGetters(store, modulePath);
          payload.state = formatStoreForInspectorState(
            getStoreModule(store._modules, modulePath),
            modulePath === 'root' ? store.getters : store._makeLocalGettersCache,
            modulePath
          );
        }
      });

      api.on.editInspectorState(function (payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          var path = payload.path;
          if (modulePath !== 'root') {
            path = modulePath.split('/').filter(Boolean).concat( path);
          }
          store._withCommit(function () {
            payload.set(store._state.data, path, payload.state.value);
          });
        }
      });

      store.subscribe(function (mutation, state) {
        var data = {};

        if (mutation.payload) {
          data.payload = mutation.payload;
        }

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
        before: function (action, state) {
          var data = {};
          if (action.payload) {
            data.payload = action.payload;
          }
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
        after: function (action, state) {
          var data = {};
          var duration = Date.now() - action._time;
          data.duration = {
            _custom: {
              type: 'duration',
              display: (duration + "ms"),
              tooltip: 'Action duration',
              value: duration
            }
          };
          if (action.payload) {
            data.payload = action.payload;
          }
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
    }
  );
}

// extracted from tailwind palette
var COLOR_LIME_500 = 0x84cc16;
var COLOR_DARK = 0x666666;
var COLOR_WHITE = 0xffffff;

var TAG_NAMESPACED = {
  label: 'namespaced',
  textColor: COLOR_WHITE,
  backgroundColor: COLOR_DARK
};

/**
 * @param {string} path
 */
function extractNameFromPath (path) {
  return path && path !== 'root' ? path.split('/').slice(-2, -1)[0] : 'Root'
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorNode}
 */
function formatStoreForInspectorTree (module, path) {
  return {
    id: path || 'root',
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: extractNameFromPath(path),
    tags: module.namespaced ? [TAG_NAMESPACED] : [],
    children: Object.keys(module._children).map(function (moduleName) { return formatStoreForInspectorTree(
        module._children[moduleName],
        path + moduleName + '/'
      ); }
    )
  }
}

/**
 * @param {import('@vue/devtools-api').CustomInspectorNode[]} result
 * @param {*} module
 * @param {string} filter
 * @param {string} path
 */
function flattenStoreForInspectorTree (result, module, filter, path) {
  if (path.includes(filter)) {
    result.push({
      id: path || 'root',
      label: path.endsWith('/') ? path.slice(0, path.length - 1) : path || 'Root',
      tags: module.namespaced ? [TAG_NAMESPACED] : []
    });
  }
  Object.keys(module._children).forEach(function (moduleName) {
    flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + '/');
  });
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorState}
 */
function formatStoreForInspectorState (module, getters, path) {
  getters = path === 'root' ? getters : getters[path];
  var gettersKeys = Object.keys(getters);
  var storeState = {
    state: Object.keys(module.state).map(function (key) { return ({
      key: key,
      editable: true,
      value: module.state[key]
    }); })
  };

  if (gettersKeys.length) {
    var tree = transformPathsToObjectTree(getters);
    storeState.getters = Object.keys(tree).map(function (key) { return ({
      key: key.endsWith('/') ? extractNameFromPath(key) : key,
      editable: false,
      value: canThrow(function () { return tree[key]; })
    }); });
  }

  return storeState
}

function transformPathsToObjectTree (getters) {
  var result = {};
  Object.keys(getters).forEach(function (key) {
    var path = key.split('/');
    if (path.length > 1) {
      var target = result;
      var leafKey = path.pop();
      path.forEach(function (p) {
        if (!target[p]) {
          target[p] = {
            _custom: {
              value: {},
              display: p,
              tooltip: 'Module',
              abstract: true
            }
          };
        }
        target = target[p]._custom.value;
      });
      target[leafKey] = canThrow(function () { return getters[key]; });
    } else {
      result[key] = canThrow(function () { return getters[key]; });
    }
  });
  return result
}

function getStoreModule (moduleMap, path) {
  var names = path.split('/').filter(function (n) { return n; });
  return names.reduce(
    function (module, moduleName, i) {
      var child = module[moduleName];
      if (!child) {
        throw new Error(("Missing module \"" + moduleName + "\" for path \"" + path + "\"."))
      }
      return i === names.length - 1 ? child : child._children
    },
    path === 'root' ? moduleMap : moduleMap.root._children
  )
}

function canThrow (cb) {
  try {
    return cb()
  } catch (e) {
    return e
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1$1 = this;
    if ( runtime === void 0 ) runtime = true;

  {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

function createStore (options) {
  return new Store(options)
}

var Store = function Store (options) {
  var this$1$1 = this;
  if ( options === void 0 ) options = {};

  {
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;
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
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
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
  plugins.forEach(function (plugin) { return plugin(this$1$1); });
};

var prototypeAccessors = { state: { configurable: true } };

Store.prototype.install = function install (app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;

  var useDevtools = this._devtools !== undefined
    ? this._devtools
    : true ;

  if (useDevtools) {
    addDevtools(app, this);
  }
};

prototypeAccessors.state.get = function () {
  return this._state.data
};

prototypeAccessors.state.set = function (v) {
  {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1$1.state); });

  if (
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1$1.state); });
  } catch (e) {
    {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1$1.state); });
      } catch (e) {
        {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1$1.state, error); });
      } catch (e) {
        {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch$1 (getter, cb, options) {
    var this$1$1 = this;

  {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["watch"])(function () { return getter(this$1$1.state, this$1$1.getters); }, cb, Object.assign({}, options))
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1$1 = this;

  this._withCommit(function () {
    this$1$1._state.data = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreState(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1$1 = this;

  if (typeof path === 'string') { path = [path]; }

  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (!isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (!isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (!isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (!isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
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

/* unused harmony default export */ var _unused_webpack_default_export = (index);



/***/ }),

/***/ "5b2d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "625a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "handleFlatJson", function() { return /* reexport */ handleFlatJson; });
__webpack_require__.d(__webpack_exports__, "parse", function() { return /* reexport */ message_resolver_esm_bundler_parse; });
__webpack_require__.d(__webpack_exports__, "resolveValue", function() { return /* reexport */ resolveValue; });
__webpack_require__.d(__webpack_exports__, "DEFAULT_MESSAGE_DATA_TYPE", function() { return /* reexport */ DEFAULT_MESSAGE_DATA_TYPE; });
__webpack_require__.d(__webpack_exports__, "createMessageContext", function() { return /* reexport */ createMessageContext; });
__webpack_require__.d(__webpack_exports__, "createCompileError", function() { return /* reexport */ createCompileError; });
__webpack_require__.d(__webpack_exports__, "MISSING_RESOLVE_VALUE", function() { return /* binding */ MISSING_RESOLVE_VALUE; });
__webpack_require__.d(__webpack_exports__, "NOT_REOSLVED", function() { return /* binding */ NOT_REOSLVED; });
__webpack_require__.d(__webpack_exports__, "VERSION", function() { return /* binding */ VERSION; });
__webpack_require__.d(__webpack_exports__, "clearCompileCache", function() { return /* binding */ clearCompileCache; });
__webpack_require__.d(__webpack_exports__, "clearDateTimeFormat", function() { return /* binding */ clearDateTimeFormat; });
__webpack_require__.d(__webpack_exports__, "clearNumberFormat", function() { return /* binding */ clearNumberFormat; });
__webpack_require__.d(__webpack_exports__, "compileToFunction", function() { return /* binding */ compileToFunction; });
__webpack_require__.d(__webpack_exports__, "createCoreContext", function() { return /* binding */ createCoreContext; });
__webpack_require__.d(__webpack_exports__, "createCoreError", function() { return /* binding */ createCoreError; });
__webpack_require__.d(__webpack_exports__, "datetime", function() { return /* binding */ datetime; });
__webpack_require__.d(__webpack_exports__, "getAdditionalMeta", function() { return /* binding */ getAdditionalMeta; });
__webpack_require__.d(__webpack_exports__, "getDevToolsHook", function() { return /* binding */ getDevToolsHook; });
__webpack_require__.d(__webpack_exports__, "getLocaleChain", function() { return /* binding */ getLocaleChain; });
__webpack_require__.d(__webpack_exports__, "getWarnMessage", function() { return /* binding */ getWarnMessage; });
__webpack_require__.d(__webpack_exports__, "handleMissing", function() { return /* binding */ handleMissing; });
__webpack_require__.d(__webpack_exports__, "initI18nDevTools", function() { return /* binding */ initI18nDevTools; });
__webpack_require__.d(__webpack_exports__, "isMessageFunction", function() { return /* binding */ isMessageFunction; });
__webpack_require__.d(__webpack_exports__, "isTranslateFallbackWarn", function() { return /* binding */ isTranslateFallbackWarn; });
__webpack_require__.d(__webpack_exports__, "isTranslateMissingWarn", function() { return /* binding */ isTranslateMissingWarn; });
__webpack_require__.d(__webpack_exports__, "number", function() { return /* binding */ number; });
__webpack_require__.d(__webpack_exports__, "parseDateTimeArgs", function() { return /* binding */ parseDateTimeArgs; });
__webpack_require__.d(__webpack_exports__, "parseNumberArgs", function() { return /* binding */ parseNumberArgs; });
__webpack_require__.d(__webpack_exports__, "parseTranslateArgs", function() { return /* binding */ parseTranslateArgs; });
__webpack_require__.d(__webpack_exports__, "registerMessageCompiler", function() { return /* binding */ registerMessageCompiler; });
__webpack_require__.d(__webpack_exports__, "setAdditionalMeta", function() { return /* binding */ setAdditionalMeta; });
__webpack_require__.d(__webpack_exports__, "setDevToolsHook", function() { return /* binding */ setDevToolsHook; });
__webpack_require__.d(__webpack_exports__, "translate", function() { return /* binding */ translate; });
__webpack_require__.d(__webpack_exports__, "translateDevTools", function() { return /* binding */ translateDevTools; });
__webpack_require__.d(__webpack_exports__, "updateFallbackLocale", function() { return /* binding */ updateFallbackLocale; });

// EXTERNAL MODULE: ./node_modules/@intlify/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__("f83d");

// CONCATENATED MODULE: ./node_modules/@intlify/message-resolver/dist/message-resolver.esm-bundler.js
/*!
  * @intlify/message-resolver v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/**
 * Original Utilities
 * written by kazuya kawaguchi
 */
if ((false)) {}
const message_resolver_esm_bundler_hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return message_resolver_esm_bundler_hasOwnProperty.call(obj, key);
}
const isObject = (val) => // eslint-disable-line
 val !== null && typeof val === 'object';

const pathStateMachine = [];
pathStateMachine[0 /* BEFORE_PATH */] = {
    ["w" /* WORKSPACE */]: [0 /* BEFORE_PATH */],
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
};
pathStateMachine[1 /* IN_PATH */] = {
    ["w" /* WORKSPACE */]: [1 /* IN_PATH */],
    ["." /* DOT */]: [2 /* BEFORE_IDENT */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
};
pathStateMachine[2 /* BEFORE_IDENT */] = {
    ["w" /* WORKSPACE */]: [2 /* BEFORE_IDENT */],
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */]
};
pathStateMachine[3 /* IN_IDENT */] = {
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["w" /* WORKSPACE */]: [1 /* IN_PATH */, 1 /* PUSH */],
    ["." /* DOT */]: [2 /* BEFORE_IDENT */, 1 /* PUSH */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */, 1 /* PUSH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */, 1 /* PUSH */]
};
pathStateMachine[4 /* IN_SUB_PATH */] = {
    ["'" /* SINGLE_QUOTE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */],
    ["\"" /* DOUBLE_QUOTE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */],
    ["[" /* LEFT_BRACKET */]: [
        4 /* IN_SUB_PATH */,
        2 /* INC_SUB_PATH_DEPTH */
    ],
    ["]" /* RIGHT_BRACKET */]: [1 /* IN_PATH */, 3 /* PUSH_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */]
};
pathStateMachine[5 /* IN_SINGLE_QUOTE */] = {
    ["'" /* SINGLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */]
};
pathStateMachine[6 /* IN_DOUBLE_QUOTE */] = {
    ["\"" /* DOUBLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */]
};
/**
 * Check if an expression is a literal value.
 */
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
    return literalValueRE.test(exp);
}
/**
 * Strip quotes from a string
 */
function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}
/**
 * Determine the type of a character in a keypath.
 */
function getPathCharType(ch) {
    if (ch === undefined || ch === null) {
        return "o" /* END_OF_FAIL */;
    }
    const code = ch.charCodeAt(0);
    switch (code) {
        case 0x5b: // [
        case 0x5d: // ]
        case 0x2e: // .
        case 0x22: // "
        case 0x27: // '
            return ch;
        case 0x5f: // _
        case 0x24: // $
        case 0x2d: // -
            return "i" /* IDENT */;
        case 0x09: // Tab (HT)
        case 0x0a: // Newline (LF)
        case 0x0d: // Return (CR)
        case 0xa0: // No-break space (NBSP)
        case 0xfeff: // Byte Order Mark (BOM)
        case 0x2028: // Line Separator (LS)
        case 0x2029: // Paragraph Separator (PS)
            return "w" /* WORKSPACE */;
    }
    return "i" /* IDENT */;
}
/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */
function formatSubPath(path) {
    const trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(parseInt(path))) {
        return false;
    }
    return isLiteral(trimmed)
        ? stripQuotes(trimmed)
        : "*" /* ASTARISK */ + trimmed;
}
/**
 * Parse a string path into an array of segments
 */
function message_resolver_esm_bundler_parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0 /* BEFORE_PATH */;
    let subPathDepth = 0;
    let c;
    let key; // eslint-disable-line
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[0 /* APPEND */] = () => {
        if (key === undefined) {
            key = newChar;
        }
        else {
            key += newChar;
        }
    };
    actions[1 /* PUSH */] = () => {
        if (key !== undefined) {
            keys.push(key);
            key = undefined;
        }
    };
    actions[2 /* INC_SUB_PATH_DEPTH */] = () => {
        actions[0 /* APPEND */]();
        subPathDepth++;
    };
    actions[3 /* PUSH_SUB_PATH */] = () => {
        if (subPathDepth > 0) {
            subPathDepth--;
            mode = 4 /* IN_SUB_PATH */;
            actions[0 /* APPEND */]();
        }
        else {
            subPathDepth = 0;
            if (key === undefined) {
                return false;
            }
            key = formatSubPath(key);
            if (key === false) {
                return false;
            }
            else {
                actions[1 /* PUSH */]();
            }
        }
    };
    function maybeUnescapeQuote() {
        const nextChar = path[index + 1];
        if ((mode === 5 /* IN_SINGLE_QUOTE */ &&
            nextChar === "'" /* SINGLE_QUOTE */) ||
            (mode === 6 /* IN_DOUBLE_QUOTE */ &&
                nextChar === "\"" /* DOUBLE_QUOTE */)) {
            index++;
            newChar = '\\' + nextChar;
            actions[0 /* APPEND */]();
            return true;
        }
    }
    while (mode !== null) {
        index++;
        c = path[index];
        if (c === '\\' && maybeUnescapeQuote()) {
            continue;
        }
        type = getPathCharType(c);
        typeMap = pathStateMachine[mode];
        transition = typeMap[type] || typeMap["l" /* ELSE */] || 8 /* ERROR */;
        // check parse error
        if (transition === 8 /* ERROR */) {
            return;
        }
        mode = transition[0];
        if (transition[1] !== undefined) {
            action = actions[transition[1]];
            if (action) {
                newChar = c;
                if (action() === false) {
                    return;
                }
            }
        }
        // check parse finish
        if (mode === 7 /* AFTER_PATH */) {
            return keys;
        }
    }
}
// path token cache
const cache = new Map();
function resolveValue(obj, path) {
    // check object
    if (!isObject(obj)) {
        return null;
    }
    // parse path
    let hit = cache.get(path);
    if (!hit) {
        hit = message_resolver_esm_bundler_parse(path);
        if (hit) {
            cache.set(path, hit);
        }
    }
    // check hit
    if (!hit) {
        return null;
    }
    // resolve path value
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
        const val = last[hit[i]];
        if (val === undefined) {
            return null;
        }
        last = val;
        i++;
    }
    return last;
}
/**
 * Transform flat json in obj to normal json in obj
 */
function handleFlatJson(obj) {
    // check obj
    if (!isObject(obj)) {
        return obj;
    }
    for (const key in obj) {
        // check key
        if (!hasOwn(obj, key)) {
            continue;
        }
        // handle for normal json
        if (!key.includes("." /* DOT */)) {
            // recursive process value if value is also a object
            if (isObject(obj[key])) {
                handleFlatJson(obj[key]);
            }
        }
        // handle for flat json, transform to normal json
        else {
            // go to the last object
            const subKeys = key.split("." /* DOT */);
            const lastIndex = subKeys.length - 1;
            let currentObj = obj;
            for (let i = 0; i < lastIndex; i++) {
                if (!(subKeys[i] in currentObj)) {
                    currentObj[subKeys[i]] = {};
                }
                currentObj = currentObj[subKeys[i]];
            }
            // update last object value, delete old property
            currentObj[subKeys[lastIndex]] = obj[key];
            delete obj[key];
            // recursive process value if value is also a object
            if (isObject(currentObj[subKeys[lastIndex]])) {
                handleFlatJson(currentObj[subKeys[lastIndex]]);
            }
        }
    }
    return obj;
}



// CONCATENATED MODULE: ./node_modules/@intlify/runtime/dist/runtime.esm-bundler.js
/*!
  * @intlify/runtime v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */


const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => ''; // eslint-disable-line
const DEFAULT_MESSAGE_DATA_TYPE = 'text';
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? '' : values.join('');
const DEFAULT_INTERPOLATE = shared_esm_bundler["toDisplayString"];
function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
        // prettier-ignore
        return choice
            ? choice > 1
                ? 1
                : 0
            : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
    // prettier-ignore
    const index = Object(shared_esm_bundler["isNumber"])(options.pluralIndex)
        ? options.pluralIndex
        : -1;
    // prettier-ignore
    return options.named && (Object(shared_esm_bundler["isNumber"])(options.named.count) || Object(shared_esm_bundler["isNumber"])(options.named.n))
        ? Object(shared_esm_bundler["isNumber"])(options.named.count)
            ? options.named.count
            : Object(shared_esm_bundler["isNumber"])(options.named.n)
                ? options.named.n
                : index
        : index;
}
function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
        props.count = pluralIndex;
    }
    if (!props.n) {
        props.n = pluralIndex;
    }
}
function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = Object(shared_esm_bundler["isObject"])(options.pluralRules) &&
        Object(shared_esm_bundler["isString"])(locale) &&
        Object(shared_esm_bundler["isFunction"])(options.pluralRules[locale])
        ? options.pluralRules[locale]
        : pluralDefault;
    const orgPluralRule = Object(shared_esm_bundler["isObject"])(options.pluralRules) &&
        Object(shared_esm_bundler["isString"])(locale) &&
        Object(shared_esm_bundler["isFunction"])(options.pluralRules[locale])
        ? pluralDefault
        : undefined;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _named = options.named || {};
    Object(shared_esm_bundler["isNumber"])(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    // TODO: need to design resolve message function?
    function message(key) {
        // prettier-ignore
        const msg = Object(shared_esm_bundler["isFunction"])(options.messages)
            ? options.messages(key)
            : Object(shared_esm_bundler["isObject"])(options.messages)
                ? options.messages[key]
                : false;
        return !msg
            ? options.parent
                ? options.parent.message(key) // resolve from parent messages
                : DEFAULT_MESSAGE
            : msg;
    }
    const _modifier = (name) => options.modifiers
        ? options.modifiers[name]
        : DEFAULT_MODIFIER;
    const normalize = Object(shared_esm_bundler["isPlainObject"])(options.processor) && Object(shared_esm_bundler["isFunction"])(options.processor.normalize)
        ? options.processor.normalize
        : DEFAULT_NORMALIZE;
    const interpolate = Object(shared_esm_bundler["isPlainObject"])(options.processor) &&
        Object(shared_esm_bundler["isFunction"])(options.processor.interpolate)
        ? options.processor.interpolate
        : DEFAULT_INTERPOLATE;
    const type = Object(shared_esm_bundler["isPlainObject"])(options.processor) && Object(shared_esm_bundler["isString"])(options.processor.type)
        ? options.processor.type
        : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
        ["list" /* LIST */]: list,
        ["named" /* NAMED */]: named,
        ["plural" /* PLURAL */]: plural,
        ["linked" /* LINKED */]: (key, modifier) => {
            // TODO: should check `key`
            const msg = message(key)(ctx);
            return Object(shared_esm_bundler["isString"])(modifier) ? _modifier(modifier)(msg) : msg;
        },
        ["message" /* MESSAGE */]: message,
        ["type" /* TYPE */]: type,
        ["interpolate" /* INTERPOLATE */]: interpolate,
        ["normalize" /* NORMALIZE */]: normalize
    };
    return ctx;
}



// CONCATENATED MODULE: ./node_modules/@intlify/message-compiler/dist/message-compiler.esm-bundler.js
/*!
  * @intlify/message-compiler v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */


/** @internal */
const errorMessages = {
    // tokenizer error messages
    [0 /* EXPECTED_TOKEN */]: `Expected token: '{0}'`,
    [1 /* INVALID_TOKEN_IN_PLACEHOLDER */]: `Invalid token in placeholder: '{0}'`,
    [2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */]: `Unterminated single quote in placeholder`,
    [3 /* UNKNOWN_ESCAPE_SEQUENCE */]: `Unknown escape sequence: \\{0}`,
    [4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */]: `Invalid unicode escape sequence: {0}`,
    [5 /* UNBALANCED_CLOSING_BRACE */]: `Unbalanced closing brace`,
    [6 /* UNTERMINATED_CLOSING_BRACE */]: `Unterminated closing brace`,
    [7 /* EMPTY_PLACEHOLDER */]: `Empty placeholder`,
    [8 /* NOT_ALLOW_NEST_PLACEHOLDER */]: `Not allowed nest placeholder`,
    [9 /* INVALID_LINKED_FORMAT */]: `Invalid linked format`,
    // parser error messages
    [10 /* MUST_HAVE_MESSAGES_IN_PLURAL */]: `Plural must have messages`,
    [11 /* UNEXPECTED_EMPTY_LINKED_MODIFIER */]: `Unexpected empty linked modifier`,
    [12 /* UNEXPECTED_EMPTY_LINKED_KEY */]: `Unexpected empty linked key`,
    [13 /* UNEXPECTED_LEXICAL_ANALYSIS */]: `Unexpected lexical analysis in token: '{0}'`
};
function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = ( false)
        ? undefined
        : code;
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
        error.location = loc;
    }
    error.domain = domain;
    return error;
}
/** @internal */
function defaultOnError(error) {
    throw error;
}

const LocationStub = {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 1, offset: 0 }
};
function createPosition(line, column, offset) {
    return { line, column, offset };
}
function createLocation(start, end, source) {
    const loc = { start, end };
    if (source != null) {
        loc.source = source;
    }
    return loc;
}

const CHAR_SP = ' ';
const CHAR_CR = '\r';
const CHAR_LF = '\n';
const CHAR_LS = String.fromCharCode(0x2028);
const CHAR_PS = String.fromCharCode(0x2029);
function createScanner(str) {
    const _buf = str;
    let _index = 0;
    let _line = 1;
    let _column = 1;
    let _peekOffset = 0;
    const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
    const isLF = (index) => _buf[index] === CHAR_LF;
    const isPS = (index) => _buf[index] === CHAR_PS;
    const isLS = (index) => _buf[index] === CHAR_LS;
    const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
    const index = () => _index;
    const line = () => _line;
    const column = () => _column;
    const peekOffset = () => _peekOffset;
    const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
    const currentChar = () => charAt(_index);
    const currentPeek = () => charAt(_index + _peekOffset);
    function next() {
        _peekOffset = 0;
        if (isLineEnd(_index)) {
            _line++;
            _column = 0;
        }
        if (isCRLF(_index)) {
            _index++;
        }
        _index++;
        _column++;
        return _buf[_index];
    }
    function peek() {
        if (isCRLF(_index + _peekOffset)) {
            _peekOffset++;
        }
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
        while (target !== _index) {
            next();
        }
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
function createTokenizer(source, options = {}) {
    const location = options.location !== false;
    const _scnr = createScanner(source);
    const currentOffset = () => _scnr.index();
    const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
    const _initLoc = currentPosition();
    const _initOffset = currentOffset();
    const _context = {
        currentType: 14 /* EOF */,
        offset: _initOffset,
        startLoc: _initLoc,
        endLoc: _initLoc,
        lastType: 14 /* EOF */,
        lastOffset: _initOffset,
        lastStartLoc: _initLoc,
        lastEndLoc: _initLoc,
        braceNest: 0,
        inLinked: false,
        text: ''
    };
    const context = () => _context;
    const { onError } = options;
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
    function getToken(context, type, value) {
        context.endLoc = currentPosition();
        context.currentType = type;
        const token = { type };
        if (location) {
            token.loc = createLocation(context.startLoc, context.endLoc);
        }
        if (value != null) {
            token.value = value;
        }
        return token;
    }
    const getEndToken = (context) => getToken(context, 14 /* EOF */);
    function eat(scnr, ch) {
        if (scnr.currentChar() === ch) {
            scnr.next();
            return ch;
        }
        else {
            emitError(0 /* EXPECTED_TOKEN */, currentPosition(), 0, ch);
            return '';
        }
    }
    function peekSpaces(scnr) {
        let buf = '';
        while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
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
        if (ch === EOF) {
            return false;
        }
        const cc = ch.charCodeAt(0);
        return ((cc >= 97 && cc <= 122) || // a-z
            (cc >= 65 && cc <= 90) || // A-Z
            cc === 95 // _
        );
    }
    function isNumberStart(ch) {
        if (ch === EOF) {
            return false;
        }
        const cc = ch.charCodeAt(0);
        return cc >= 48 && cc <= 57; // 0-9
    }
    function isNamedIdentifierStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 2 /* BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    }
    function isListIdentifierStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 2 /* BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ch = scnr.currentPeek() === '-' ? scnr.peek() : scnr.currentPeek();
        const ret = isNumberStart(ch);
        scnr.resetPeek();
        return ret;
    }
    function isLiteralStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 2 /* BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === LITERAL_DELIMITER;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedDotStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 8 /* LinkedAlias */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === "." /* LinkedDot */;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedModifierStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 9 /* LinkedDot */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    }
    function isLinkedDelimiterStart(scnr, context) {
        const { currentType } = context;
        if (!(currentType === 8 /* LinkedAlias */ ||
            currentType === 12 /* LinkedModifier */)) {
            return false;
        }
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === ":" /* LinkedDelimiter */;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedReferStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 10 /* LinkedDelimiter */) {
            return false;
        }
        const fn = () => {
            const ch = scnr.currentPeek();
            if (ch === "{" /* BraceLeft */) {
                return isIdentifierStart(scnr.peek());
            }
            else if (ch === "@" /* LinkedAlias */ ||
                ch === "%" /* Modulo */ ||
                ch === "|" /* Pipe */ ||
                ch === ":" /* LinkedDelimiter */ ||
                ch === "." /* LinkedDot */ ||
                ch === CHAR_SP ||
                !ch) {
                return false;
            }
            else if (ch === CHAR_LF) {
                scnr.peek();
                return fn();
            }
            else {
                // other characters
                return isIdentifierStart(ch);
            }
        };
        const ret = fn();
        scnr.resetPeek();
        return ret;
    }
    function isPluralStart(scnr) {
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === "|" /* Pipe */;
        scnr.resetPeek();
        return ret;
    }
    function isTextStart(scnr, reset = true) {
        const fn = (hasSpace = false, prev = '', detectModulo = false) => {
            const ch = scnr.currentPeek();
            if (ch === "{" /* BraceLeft */) {
                return prev === "%" /* Modulo */ ? false : hasSpace;
            }
            else if (ch === "@" /* LinkedAlias */ || !ch) {
                return prev === "%" /* Modulo */ ? true : hasSpace;
            }
            else if (ch === "%" /* Modulo */) {
                scnr.peek();
                return fn(hasSpace, "%" /* Modulo */, true);
            }
            else if (ch === "|" /* Pipe */) {
                return prev === "%" /* Modulo */ || detectModulo
                    ? true
                    : !(prev === CHAR_SP || prev === CHAR_LF);
            }
            else if (ch === CHAR_SP) {
                scnr.peek();
                return fn(true, CHAR_SP, detectModulo);
            }
            else if (ch === CHAR_LF) {
                scnr.peek();
                return fn(true, CHAR_LF, detectModulo);
            }
            else {
                return true;
            }
        };
        const ret = fn();
        reset && scnr.resetPeek();
        return ret;
    }
    function takeChar(scnr, fn) {
        const ch = scnr.currentChar();
        if (ch === EOF) {
            return EOF;
        }
        if (fn(ch)) {
            scnr.next();
            return ch;
        }
        return null;
    }
    function takeIdentifierChar(scnr) {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return ((cc >= 97 && cc <= 122) || // a-z
                (cc >= 65 && cc <= 90) || // A-Z
                (cc >= 48 && cc <= 57) || // 0-9
                cc === 95 || // _
                cc === 36 // $
            );
        };
        return takeChar(scnr, closure);
    }
    function takeDigit(scnr) {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return cc >= 48 && cc <= 57; // 0-9
        };
        return takeChar(scnr, closure);
    }
    function takeHexDigit(scnr) {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return ((cc >= 48 && cc <= 57) || // 0-9
                (cc >= 65 && cc <= 70) || // A-F
                (cc >= 97 && cc <= 102)); // a-f
        };
        return takeChar(scnr, closure);
    }
    function getDigits(scnr) {
        let ch = '';
        let num = '';
        while ((ch = takeDigit(scnr))) {
            num += ch;
        }
        return num;
    }
    function readText(scnr) {
        const fn = (buf) => {
            const ch = scnr.currentChar();
            if (ch === "{" /* BraceLeft */ ||
                ch === "}" /* BraceRight */ ||
                ch === "@" /* LinkedAlias */ ||
                !ch) {
                return buf;
            }
            else if (ch === "%" /* Modulo */) {
                if (isTextStart(scnr)) {
                    buf += ch;
                    scnr.next();
                    return fn(buf);
                }
                else {
                    return buf;
                }
            }
            else if (ch === "|" /* Pipe */) {
                return buf;
            }
            else if (ch === CHAR_SP || ch === CHAR_LF) {
                if (isTextStart(scnr)) {
                    buf += ch;
                    scnr.next();
                    return fn(buf);
                }
                else if (isPluralStart(scnr)) {
                    return buf;
                }
                else {
                    buf += ch;
                    scnr.next();
                    return fn(buf);
                }
            }
            else {
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
        while ((ch = takeIdentifierChar(scnr))) {
            name += ch;
        }
        if (scnr.currentChar() === EOF) {
            emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
        }
        return name;
    }
    function readListIdentifier(scnr) {
        skipSpaces(scnr);
        let value = '';
        if (scnr.currentChar() === '-') {
            scnr.next();
            value += `-${getDigits(scnr)}`;
        }
        else {
            value += getDigits(scnr);
        }
        if (scnr.currentChar() === EOF) {
            emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
        }
        return value;
    }
    function readLiteral(scnr) {
        skipSpaces(scnr);
        eat(scnr, `\'`);
        let ch = '';
        let literal = '';
        const fn = (x) => x !== LITERAL_DELIMITER && x !== CHAR_LF;
        while ((ch = takeChar(scnr, fn))) {
            if (ch === '\\') {
                literal += readEscapeSequence(scnr);
            }
            else {
                literal += ch;
            }
        }
        const current = scnr.currentChar();
        if (current === CHAR_LF || current === EOF) {
            emitError(2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */, currentPosition(), 0);
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
        switch (ch) {
            case '\\':
            case `\'`:
                scnr.next();
                return `\\${ch}`;
            case 'u':
                return readUnicodeEscapeSequence(scnr, ch, 4);
            case 'U':
                return readUnicodeEscapeSequence(scnr, ch, 6);
            default:
                emitError(3 /* UNKNOWN_ESCAPE_SEQUENCE */, currentPosition(), 0, ch);
                return '';
        }
    }
    function readUnicodeEscapeSequence(scnr, unicode, digits) {
        eat(scnr, unicode);
        let sequence = '';
        for (let i = 0; i < digits; i++) {
            const ch = takeHexDigit(scnr);
            if (!ch) {
                emitError(4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
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
        const closure = (ch) => ch !== "{" /* BraceLeft */ &&
            ch !== "}" /* BraceRight */ &&
            ch !== CHAR_SP &&
            ch !== CHAR_LF;
        while ((ch = takeChar(scnr, closure))) {
            identifiers += ch;
        }
        return identifiers;
    }
    function readLinkedModifier(scnr) {
        let ch = '';
        let name = '';
        while ((ch = takeIdentifierChar(scnr))) {
            name += ch;
        }
        return name;
    }
    function readLinkedRefer(scnr) {
        const fn = (detect = false, buf) => {
            const ch = scnr.currentChar();
            if (ch === "{" /* BraceLeft */ ||
                ch === "%" /* Modulo */ ||
                ch === "@" /* LinkedAlias */ ||
                ch === "|" /* Pipe */ ||
                !ch) {
                return buf;
            }
            else if (ch === CHAR_SP) {
                return buf;
            }
            else if (ch === CHAR_LF) {
                buf += ch;
                scnr.next();
                return fn(detect, buf);
            }
            else {
                buf += ch;
                scnr.next();
                return fn(true, buf);
            }
        };
        return fn(false, '');
    }
    function readPlural(scnr) {
        skipSpaces(scnr);
        const plural = eat(scnr, "|" /* Pipe */);
        skipSpaces(scnr);
        return plural;
    }
    // TODO: We need refactoring of token parsing ...
    function readTokenInPlaceholder(scnr, context) {
        let token = null;
        const ch = scnr.currentChar();
        switch (ch) {
            case "{" /* BraceLeft */:
                if (context.braceNest >= 1) {
                    emitError(8 /* NOT_ALLOW_NEST_PLACEHOLDER */, currentPosition(), 0);
                }
                scnr.next();
                token = getToken(context, 2 /* BraceLeft */, "{" /* BraceLeft */);
                skipSpaces(scnr);
                context.braceNest++;
                return token;
            case "}" /* BraceRight */:
                if (context.braceNest > 0 &&
                    context.currentType === 2 /* BraceLeft */) {
                    emitError(7 /* EMPTY_PLACEHOLDER */, currentPosition(), 0);
                }
                scnr.next();
                token = getToken(context, 3 /* BraceRight */, "}" /* BraceRight */);
                context.braceNest--;
                context.braceNest > 0 && skipSpaces(scnr);
                if (context.inLinked && context.braceNest === 0) {
                    context.inLinked = false;
                }
                return token;
            case "@" /* LinkedAlias */:
                if (context.braceNest > 0) {
                    emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                }
                token = readTokenInLinked(scnr, context) || getEndToken(context);
                context.braceNest = 0;
                return token;
            default:
                let validNamedIdentifier = true;
                let validListIdentifier = true;
                let validLiteral = true;
                if (isPluralStart(scnr)) {
                    if (context.braceNest > 0) {
                        emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                    }
                    token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                    // reset
                    context.braceNest = 0;
                    context.inLinked = false;
                    return token;
                }
                if (context.braceNest > 0 &&
                    (context.currentType === 5 /* Named */ ||
                        context.currentType === 6 /* List */ ||
                        context.currentType === 7 /* Literal */)) {
                    emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                    context.braceNest = 0;
                    return readToken(scnr, context);
                }
                if ((validNamedIdentifier = isNamedIdentifierStart(scnr, context))) {
                    token = getToken(context, 5 /* Named */, readNamedIdentifier(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if ((validListIdentifier = isListIdentifierStart(scnr, context))) {
                    token = getToken(context, 6 /* List */, readListIdentifier(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if ((validLiteral = isLiteralStart(scnr, context))) {
                    token = getToken(context, 7 /* Literal */, readLiteral(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
                    // TODO: we should be re-designed invalid cases, when we will extend message syntax near the future ...
                    token = getToken(context, 13 /* InvalidPlace */, readInvalidIdentifier(scnr));
                    emitError(1 /* INVALID_TOKEN_IN_PLACEHOLDER */, currentPosition(), 0, token.value);
                    skipSpaces(scnr);
                    return token;
                }
                break;
        }
        return token;
    }
    // TODO: We need refactoring of token parsing ...
    function readTokenInLinked(scnr, context) {
        const { currentType } = context;
        let token = null;
        const ch = scnr.currentChar();
        if ((currentType === 8 /* LinkedAlias */ ||
            currentType === 9 /* LinkedDot */ ||
            currentType === 12 /* LinkedModifier */ ||
            currentType === 10 /* LinkedDelimiter */) &&
            (ch === CHAR_LF || ch === CHAR_SP)) {
            emitError(9 /* INVALID_LINKED_FORMAT */, currentPosition(), 0);
        }
        switch (ch) {
            case "@" /* LinkedAlias */:
                scnr.next();
                token = getToken(context, 8 /* LinkedAlias */, "@" /* LinkedAlias */);
                context.inLinked = true;
                return token;
            case "." /* LinkedDot */:
                skipSpaces(scnr);
                scnr.next();
                return getToken(context, 9 /* LinkedDot */, "." /* LinkedDot */);
            case ":" /* LinkedDelimiter */:
                skipSpaces(scnr);
                scnr.next();
                return getToken(context, 10 /* LinkedDelimiter */, ":" /* LinkedDelimiter */);
            default:
                if (isPluralStart(scnr)) {
                    token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                    // reset
                    context.braceNest = 0;
                    context.inLinked = false;
                    return token;
                }
                if (isLinkedDotStart(scnr, context) ||
                    isLinkedDelimiterStart(scnr, context)) {
                    skipSpaces(scnr);
                    return readTokenInLinked(scnr, context);
                }
                if (isLinkedModifierStart(scnr, context)) {
                    skipSpaces(scnr);
                    return getToken(context, 12 /* LinkedModifier */, readLinkedModifier(scnr));
                }
                if (isLinkedReferStart(scnr, context)) {
                    skipSpaces(scnr);
                    if (ch === "{" /* BraceLeft */) {
                        // scan the placeholder
                        return readTokenInPlaceholder(scnr, context) || token;
                    }
                    else {
                        return getToken(context, 11 /* LinkedKey */, readLinkedRefer(scnr));
                    }
                }
                if (currentType === 8 /* LinkedAlias */) {
                    emitError(9 /* INVALID_LINKED_FORMAT */, currentPosition(), 0);
                }
                context.braceNest = 0;
                context.inLinked = false;
                return readToken(scnr, context);
        }
    }
    // TODO: We need refactoring of token parsing ...
    function readToken(scnr, context) {
        let token = { type: 14 /* EOF */ };
        if (context.braceNest > 0) {
            return readTokenInPlaceholder(scnr, context) || getEndToken(context);
        }
        if (context.inLinked) {
            return readTokenInLinked(scnr, context) || getEndToken(context);
        }
        const ch = scnr.currentChar();
        switch (ch) {
            case "{" /* BraceLeft */:
                return readTokenInPlaceholder(scnr, context) || getEndToken(context);
            case "}" /* BraceRight */:
                emitError(5 /* UNBALANCED_CLOSING_BRACE */, currentPosition(), 0);
                scnr.next();
                return getToken(context, 3 /* BraceRight */, "}" /* BraceRight */);
            case "@" /* LinkedAlias */:
                return readTokenInLinked(scnr, context) || getEndToken(context);
            default:
                if (isPluralStart(scnr)) {
                    token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                    // reset
                    context.braceNest = 0;
                    context.inLinked = false;
                    return token;
                }
                if (isTextStart(scnr)) {
                    return getToken(context, 0 /* Text */, readText(scnr));
                }
                if (ch === "%" /* Modulo */) {
                    scnr.next();
                    return getToken(context, 4 /* Modulo */, "%" /* Modulo */);
                }
                break;
        }
        return token;
    }
    function nextToken() {
        const { currentType, offset, startLoc, endLoc } = _context;
        _context.lastType = currentType;
        _context.lastOffset = offset;
        _context.lastStartLoc = startLoc;
        _context.lastEndLoc = endLoc;
        _context.offset = currentOffset();
        _context.startLoc = currentPosition();
        if (_scnr.currentChar() === EOF) {
            return getToken(_context, 14 /* EOF */);
        }
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
    switch (match) {
        case `\\\\`:
            return `\\`;
        case `\\\'`:
            return `\'`;
        default: {
            const codePoint = parseInt(codePoint4 || codePoint6, 16);
            if (codePoint <= 0xd7ff || codePoint >= 0xe000) {
                return String.fromCodePoint(codePoint);
            }
            // invalid ...
            // Replace them with U+FFFD REPLACEMENT CHARACTER.
            return '�';
        }
    }
}
function createParser(options = {}) {
    const location = options.location !== false;
    const { onError } = options;
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
        if (location) {
            node.loc = { start: loc, end: loc };
        }
        return node;
    }
    function endNode(node, offset, pos, type) {
        node.end = offset;
        if (type) {
            node.type = type;
        }
        if (location && node.loc) {
            node.loc.end = pos;
        }
    }
    function parseText(tokenizer, value) {
        const context = tokenizer.context();
        const node = startNode(3 /* Text */, context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseList(tokenizer, index) {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(5 /* List */, offset, loc);
        node.index = parseInt(index, 10);
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseNamed(tokenizer, key) {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(4 /* Named */, offset, loc);
        node.key = key;
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLiteral(tokenizer, value) {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(9 /* Literal */, offset, loc);
        node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLinkedModifier(tokenizer) {
        const token = tokenizer.nextToken();
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get linked dot loc
        const node = startNode(8 /* LinkedModifier */, offset, loc);
        if (token.type !== 12 /* LinkedModifier */) {
            // empty modifier
            emitError(tokenizer, 11 /* UNEXPECTED_EMPTY_LINKED_MODIFIER */, context.lastStartLoc, 0);
            node.value = '';
            endNode(node, offset, loc);
            return {
                nextConsumeToken: token,
                node
            };
        }
        // check token
        if (token.value == null) {
            emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
        }
        node.value = token.value || '';
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return {
            node
        };
    }
    function parseLinkedKey(tokenizer, value) {
        const context = tokenizer.context();
        const node = startNode(7 /* LinkedKey */, context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLinked(tokenizer) {
        const context = tokenizer.context();
        const linkedNode = startNode(6 /* Linked */, context.offset, context.startLoc);
        let token = tokenizer.nextToken();
        if (token.type === 9 /* LinkedDot */) {
            const parsed = parseLinkedModifier(tokenizer);
            linkedNode.modifier = parsed.node;
            token = parsed.nextConsumeToken || tokenizer.nextToken();
        }
        // asset check token
        if (token.type !== 10 /* LinkedDelimiter */) {
            emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
        }
        token = tokenizer.nextToken();
        // skip brace left
        if (token.type === 2 /* BraceLeft */) {
            token = tokenizer.nextToken();
        }
        switch (token.type) {
            case 11 /* LinkedKey */:
                if (token.value == null) {
                    emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseLinkedKey(tokenizer, token.value || '');
                break;
            case 5 /* Named */:
                if (token.value == null) {
                    emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseNamed(tokenizer, token.value || '');
                break;
            case 6 /* List */:
                if (token.value == null) {
                    emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseList(tokenizer, token.value || '');
                break;
            case 7 /* Literal */:
                if (token.value == null) {
                    emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseLiteral(tokenizer, token.value || '');
                break;
            default:
                // empty key
                emitError(tokenizer, 12 /* UNEXPECTED_EMPTY_LINKED_KEY */, context.lastStartLoc, 0);
                const nextContext = tokenizer.context();
                const emptyLinkedKeyNode = startNode(7 /* LinkedKey */, nextContext.offset, nextContext.startLoc);
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
        const startOffset = context.currentType === 1 /* Pipe */
            ? tokenizer.currentOffset()
            : context.offset;
        const startLoc = context.currentType === 1 /* Pipe */
            ? context.endLoc
            : context.startLoc;
        const node = startNode(2 /* Message */, startOffset, startLoc);
        node.items = [];
        let nextToken = null;
        do {
            const token = nextToken || tokenizer.nextToken();
            nextToken = null;
            switch (token.type) {
                case 0 /* Text */:
                    if (token.value == null) {
                        emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseText(tokenizer, token.value || ''));
                    break;
                case 6 /* List */:
                    if (token.value == null) {
                        emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseList(tokenizer, token.value || ''));
                    break;
                case 5 /* Named */:
                    if (token.value == null) {
                        emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseNamed(tokenizer, token.value || ''));
                    break;
                case 7 /* Literal */:
                    if (token.value == null) {
                        emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseLiteral(tokenizer, token.value || ''));
                    break;
                case 8 /* LinkedAlias */:
                    const parsed = parseLinked(tokenizer);
                    node.items.push(parsed.node);
                    nextToken = parsed.nextConsumeToken || null;
                    break;
            }
        } while (context.currentType !== 14 /* EOF */ &&
            context.currentType !== 1 /* Pipe */);
        // adjust message node loc
        const endOffset = context.currentType === 1 /* Pipe */
            ? context.lastOffset
            : tokenizer.currentOffset();
        const endLoc = context.currentType === 1 /* Pipe */
            ? context.lastEndLoc
            : tokenizer.currentPosition();
        endNode(node, endOffset, endLoc);
        return node;
    }
    function parsePlural(tokenizer, offset, loc, msgNode) {
        const context = tokenizer.context();
        let hasEmptyMessage = msgNode.items.length === 0;
        const node = startNode(1 /* Plural */, offset, loc);
        node.cases = [];
        node.cases.push(msgNode);
        do {
            const msg = parseMessage(tokenizer);
            if (!hasEmptyMessage) {
                hasEmptyMessage = msg.items.length === 0;
            }
            node.cases.push(msg);
        } while (context.currentType !== 14 /* EOF */);
        if (hasEmptyMessage) {
            emitError(tokenizer, 10 /* MUST_HAVE_MESSAGES_IN_PLURAL */, loc, 0);
        }
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseResource(tokenizer) {
        const context = tokenizer.context();
        const { offset, startLoc } = context;
        const msgNode = parseMessage(tokenizer);
        if (context.currentType === 14 /* EOF */) {
            return msgNode;
        }
        else {
            return parsePlural(tokenizer, offset, startLoc, msgNode);
        }
    }
    function parse(source) {
        const tokenizer = createTokenizer(source, Object(shared_esm_bundler["assign"])({}, options));
        const context = tokenizer.context();
        const node = startNode(0 /* Resource */, context.offset, context.startLoc);
        if (location && node.loc) {
            node.loc.source = source;
        }
        node.body = parseResource(tokenizer);
        // assert whether achieved to EOF
        if (context.currentType !== 14 /* EOF */) {
            emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, source[context.offset] || '');
        }
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    return { parse };
}
function getTokenCaption(token) {
    if (token.type === 14 /* EOF */) {
        return 'EOF';
    }
    const name = (token.value || '').replace(/\r?\n/gu, '\\n');
    return name.length > 10 ? name.slice(0, 9) + '…' : name;
}

function createTransformer(ast, options = {} // eslint-disable-line
) {
    const _context = {
        ast,
        helpers: new Set()
    };
    const context = () => _context;
    const helper = (name) => {
        _context.helpers.add(name);
        return name;
    };
    return { context, helper };
}
function traverseNodes(nodes, transformer) {
    for (let i = 0; i < nodes.length; i++) {
        traverseNode(nodes[i], transformer);
    }
}
function traverseNode(node, transformer) {
    // TODO: if we need pre-hook of transform, should be implemented to here
    switch (node.type) {
        case 1 /* Plural */:
            traverseNodes(node.cases, transformer);
            transformer.helper("plural" /* PLURAL */);
            break;
        case 2 /* Message */:
            traverseNodes(node.items, transformer);
            break;
        case 6 /* Linked */:
            const linked = node;
            traverseNode(linked.key, transformer);
            transformer.helper("linked" /* LINKED */);
            break;
        case 5 /* List */:
            transformer.helper("interpolate" /* INTERPOLATE */);
            transformer.helper("list" /* LIST */);
            break;
        case 4 /* Named */:
            transformer.helper("interpolate" /* INTERPOLATE */);
            transformer.helper("named" /* NAMED */);
            break;
    }
    // TODO: if we need post-hook of transform, should be implemented to here
}
// transform AST
function transform(ast, options = {} // eslint-disable-line
) {
    const transformer = createTransformer(ast);
    transformer.helper("normalize" /* NORMALIZE */);
    // traverse
    ast.body && traverseNode(ast.body, transformer);
    // set meta information
    const context = transformer.context();
    ast.helpers = Array.from(context.helpers);
}

function createCodeGenerator(ast, options) {
    const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
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
    const context = () => _context;
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
    const helper = (key) => `_${key}`;
    const needIndent = () => _context.needIndent;
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
    const { helper } = generator;
    generator.push(`${helper("linked" /* LINKED */)}(`);
    generateNode(generator, node.key);
    if (node.modifier) {
        generator.push(`, `);
        generateNode(generator, node.modifier);
    }
    generator.push(`)`);
}
function generateMessageNode(generator, node) {
    const { helper, needIndent } = generator;
    generator.push(`${helper("normalize" /* NORMALIZE */)}([`);
    generator.indent(needIndent());
    const length = node.items.length;
    for (let i = 0; i < length; i++) {
        generateNode(generator, node.items[i]);
        if (i === length - 1) {
            break;
        }
        generator.push(', ');
    }
    generator.deindent(needIndent());
    generator.push('])');
}
function generatePluralNode(generator, node) {
    const { helper, needIndent } = generator;
    if (node.cases.length > 1) {
        generator.push(`${helper("plural" /* PLURAL */)}([`);
        generator.indent(needIndent());
        const length = node.cases.length;
        for (let i = 0; i < length; i++) {
            generateNode(generator, node.cases[i]);
            if (i === length - 1) {
                break;
            }
            generator.push(', ');
        }
        generator.deindent(needIndent());
        generator.push(`])`);
    }
}
function generateResource(generator, node) {
    if (node.body) {
        generateNode(generator, node.body);
    }
    else {
        generator.push('null');
    }
}
function generateNode(generator, node) {
    const { helper } = generator;
    switch (node.type) {
        case 0 /* Resource */:
            generateResource(generator, node);
            break;
        case 1 /* Plural */:
            generatePluralNode(generator, node);
            break;
        case 2 /* Message */:
            generateMessageNode(generator, node);
            break;
        case 6 /* Linked */:
            generateLinkedNode(generator, node);
            break;
        case 8 /* LinkedModifier */:
            generator.push(JSON.stringify(node.value), node);
            break;
        case 7 /* LinkedKey */:
            generator.push(JSON.stringify(node.value), node);
            break;
        case 5 /* List */:
            generator.push(`${helper("interpolate" /* INTERPOLATE */)}(${helper("list" /* LIST */)}(${node.index}))`, node);
            break;
        case 4 /* Named */:
            generator.push(`${helper("interpolate" /* INTERPOLATE */)}(${helper("named" /* NAMED */)}(${JSON.stringify(node.key)}))`, node);
            break;
        case 9 /* Literal */:
            generator.push(JSON.stringify(node.value), node);
            break;
        case 3 /* Text */:
            generator.push(JSON.stringify(node.value), node);
            break;
        default:
            if ((false)) {}
    }
}
// generate code from AST
const generate = (ast, options = {} // eslint-disable-line
) => {
    const mode = Object(shared_esm_bundler["isString"])(options.mode) ? options.mode : 'normal';
    const filename = Object(shared_esm_bundler["isString"])(options.filename)
        ? options.filename
        : 'message.intl';
    const sourceMap = !!options.sourceMap;
    // prettier-ignore
    const breakLineCode = options.breakLineCode != null
        ? options.breakLineCode
        : mode === 'arrow'
            ? ';'
            : '\n';
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
        generator.push(`const { ${helpers.map(s => `${s}: _${s}`).join(', ')} } = ctx`);
        generator.newline();
    }
    generator.push(`return `);
    generateNode(generator, ast);
    generator.deindent(needIndent);
    generator.push(`}`);
    const { code, map } = generator.context();
    return {
        ast,
        code,
        map: map ? map.toJSON() : undefined // eslint-disable-line @typescript-eslint/no-explicit-any
    };
};

function baseCompile(source, options = {}) {
    const assignedOptions = Object(shared_esm_bundler["assign"])({}, options);
    // parse source codes
    const parser = createParser(assignedOptions);
    const ast = parser.parse(source);
    // transform ASTs
    transform(ast, assignedOptions);
    // generate javascript codes
    return generate(ast, assignedOptions);
}



// CONCATENATED MODULE: ./node_modules/@intlify/devtools-if/dist/devtools-if.esm-bundler.js
/*!
  * @intlify/devtools-if v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
    I18nInit: 'i18n:init',
    FunctionTranslate: 'function:translate'
};



// CONCATENATED MODULE: ./node_modules/@intlify/core-base/dist/core-base.esm-bundler.js
/*!
  * @intlify/core-base v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */









let devtools = null;
function setDevToolsHook(hook) {
    devtools = hook;
}
function getDevToolsHook() {
    return devtools;
}
function initI18nDevTools(i18n, version, meta) {
    // TODO: queue if devtools is undefined
    devtools &&
        devtools.emit(IntlifyDevToolsHooks.I18nInit, {
            timestamp: Date.now(),
            i18n,
            version,
            meta
        });
}
const translateDevTools = /* #__PURE__*/ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
}

/** @internal */
const warnMessages = {
    [0 /* NOT_FOUND_KEY */]: `Not found '{key}' key in '{locale}' locale messages.`,
    [1 /* FALLBACK_TO_TRANSLATE */]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [2 /* CANNOT_FORMAT_NUMBER */]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [3 /* FALLBACK_TO_NUMBER_FORMAT */]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [4 /* CANNOT_FORMAT_DATE */]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [5 /* FALLBACK_TO_DATE_FORMAT */]: `Fall back to datetime format '{key}' key with '{target}' locale.`
};
function getWarnMessage(code, ...args) {
    return Object(shared_esm_bundler["format"])(warnMessages[code], ...args);
}

/**
 * Intlify core-base version
 * @internal
 */
const VERSION = '9.1.7';
const NOT_REOSLVED = -1;
const MISSING_RESOLVE_VALUE = '';
function getDefaultLinkedModifiers() {
    return {
        upper: (val) => (Object(shared_esm_bundler["isString"])(val) ? val.toUpperCase() : val),
        lower: (val) => (Object(shared_esm_bundler["isString"])(val) ? val.toLowerCase() : val),
        // prettier-ignore
        capitalize: (val) => (Object(shared_esm_bundler["isString"])(val)
            ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}`
            : val)
    };
}
let _compiler;
function registerMessageCompiler(compiler) {
    _compiler = compiler;
}
// Additional Meta for Intlify DevTools
let _additionalMeta = null;
const setAdditionalMeta = /* #__PURE__*/ (meta) => {
    _additionalMeta = meta;
};
const getAdditionalMeta = /* #__PURE__*/ () => _additionalMeta;
// ID for CoreContext
let _cid = 0;
function createCoreContext(options = {}) {
    // setup options
    const version = Object(shared_esm_bundler["isString"])(options.version) ? options.version : VERSION;
    const locale = Object(shared_esm_bundler["isString"])(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = Object(shared_esm_bundler["isArray"])(options.fallbackLocale) ||
        Object(shared_esm_bundler["isPlainObject"])(options.fallbackLocale) ||
        Object(shared_esm_bundler["isString"])(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const messages = Object(shared_esm_bundler["isPlainObject"])(options.messages)
        ? options.messages
        : { [locale]: {} };
    const datetimeFormats = Object(shared_esm_bundler["isPlainObject"])(options.datetimeFormats)
        ? options.datetimeFormats
        : { [locale]: {} };
    const numberFormats = Object(shared_esm_bundler["isPlainObject"])(options.numberFormats)
        ? options.numberFormats
        : { [locale]: {} };
    const modifiers = Object(shared_esm_bundler["assign"])({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = Object(shared_esm_bundler["isFunction"])(options.missing) ? options.missing : null;
    const missingWarn = Object(shared_esm_bundler["isBoolean"])(options.missingWarn) || Object(shared_esm_bundler["isRegExp"])(options.missingWarn)
        ? options.missingWarn
        : true;
    const fallbackWarn = Object(shared_esm_bundler["isBoolean"])(options.fallbackWarn) || Object(shared_esm_bundler["isRegExp"])(options.fallbackWarn)
        ? options.fallbackWarn
        : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = Object(shared_esm_bundler["isFunction"])(options.postTranslation)
        ? options.postTranslation
        : null;
    const processor = Object(shared_esm_bundler["isPlainObject"])(options.processor) ? options.processor : null;
    const warnHtmlMessage = Object(shared_esm_bundler["isBoolean"])(options.warnHtmlMessage)
        ? options.warnHtmlMessage
        : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = Object(shared_esm_bundler["isFunction"])(options.messageCompiler)
        ? options.messageCompiler
        : _compiler;
    const onWarn = Object(shared_esm_bundler["isFunction"])(options.onWarn) ? options.onWarn : shared_esm_bundler["warn"];
    // setup internal options
    const internalOptions = options;
    const __datetimeFormatters = Object(shared_esm_bundler["isObject"])(internalOptions.__datetimeFormatters)
        ? internalOptions.__datetimeFormatters
        : new Map();
    const __numberFormatters = Object(shared_esm_bundler["isObject"])(internalOptions.__numberFormatters)
        ? internalOptions.__numberFormatters
        : new Map();
    const __meta = Object(shared_esm_bundler["isObject"])(internalOptions.__meta) ? internalOptions.__meta : {};
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
    // for vue-devtools timeline event
    if ((false)) {}
    // NOTE: experimental !!
    if (false) {}
    return context;
}
/** @internal */
function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
/** @internal */
function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
}
/** @internal */
function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    // for vue-devtools timeline event
    if ((false)) {}
    if (missing !== null) {
        const ret = missing(context, locale, key, type);
        return Object(shared_esm_bundler["isString"])(ret) ? ret : key;
    }
    else {
        if (false) {}
        return key;
    }
}
/** @internal */
function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
        context.__localeChainCache = new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
        chain = [];
        // first block defined by start
        let block = [start];
        // while any intervening block found
        while (Object(shared_esm_bundler["isArray"])(block)) {
            block = appendBlockToChain(chain, block, fallback);
        }
        // prettier-ignore
        // last block defined by default
        const defaults = Object(shared_esm_bundler["isArray"])(fallback)
            ? fallback
            : Object(shared_esm_bundler["isPlainObject"])(fallback)
                ? fallback['default']
                    ? fallback['default']
                    : null
                : fallback;
        // convert defaults to array
        block = Object(shared_esm_bundler["isString"])(defaults) ? [defaults] : defaults;
        if (Object(shared_esm_bundler["isArray"])(block)) {
            appendBlockToChain(chain, block, false);
        }
        context.__localeChainCache.set(start, chain);
    }
    return chain;
}
function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && Object(shared_esm_bundler["isBoolean"])(follow); i++) {
        const locale = block[i];
        if (Object(shared_esm_bundler["isString"])(locale)) {
            follow = appendLocaleToChain(chain, block[i], blocks);
        }
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
    } while (tokens.length && follow === true);
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
            if ((Object(shared_esm_bundler["isArray"])(blocks) || Object(shared_esm_bundler["isPlainObject"])(blocks)) &&
                blocks[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
            ) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                follow = blocks[locale];
            }
        }
    }
    return follow;
}
/** @internal */
function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = new Map();
    getLocaleChain(ctx, fallback, locale);
}

const RE_HTML_TAG = /<\/?[\w\s="/.':;#-\/]+>/;
const WARN_MESSAGE = `Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.`;
function checkHtmlMessage(source, options) {
    const warnHtmlMessage = Object(shared_esm_bundler["isBoolean"])(options.warnHtmlMessage)
        ? options.warnHtmlMessage
        : true;
    if (warnHtmlMessage && RE_HTML_TAG.test(source)) {
        Object(shared_esm_bundler["warn"])(Object(shared_esm_bundler["format"])(WARN_MESSAGE, { source }));
    }
}
const defaultOnCacheKey = (source) => source;
let compileCache = Object.create(null);
function clearCompileCache() {
    compileCache = Object.create(null);
}
function compileToFunction(source, options = {}) {
    {
        // check HTML message
        ( false) && false;
        // check caches
        const onCacheKey = options.onCacheKey || defaultOnCacheKey;
        const key = onCacheKey(source);
        const cached = compileCache[key];
        if (cached) {
            return cached;
        }
        // compile error detecting
        let occurred = false;
        const onError = options.onError || defaultOnError;
        options.onError = (err) => {
            occurred = true;
            onError(err);
        };
        // compile
        const { code } = baseCompile(source, options);
        // evaluate function
        const msg = new Function(`return ${code}`)();
        // if occurred compile error, don't cache
        return !occurred ? (compileCache[key] = msg) : msg;
    }
}

function createCoreError(code) {
    return createCompileError(code, null, ( false) ? undefined : undefined);
}
/** @internal */
const core_base_esm_bundler_errorMessages = {
    [14 /* INVALID_ARGUMENT */]: 'Invalid arguments',
    [15 /* INVALID_DATE_ARGUMENT */]: 'The date provided is an invalid Date object.' +
        'Make sure your Date represents a valid date.',
    [16 /* INVALID_ISO_DATE_ARGUMENT */]: 'The argument provided is not a valid ISO date string'
};

const NOOP_MESSAGE_FUNCTION = () => '';
const isMessageFunction = (val) => Object(shared_esm_bundler["isFunction"])(val);
// implementation of `translate` function
function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = Object(shared_esm_bundler["isBoolean"])(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = Object(shared_esm_bundler["isBoolean"])(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const escapeParameter = Object(shared_esm_bundler["isBoolean"])(options.escapeParameter)
        ? options.escapeParameter
        : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    // prettier-ignore
    const defaultMsgOrKey = Object(shared_esm_bundler["isString"])(options.default) || Object(shared_esm_bundler["isBoolean"])(options.default) // default by function option
        ? !Object(shared_esm_bundler["isBoolean"])(options.default)
            ? options.default
            : key
        : fallbackFormat // default by `fallbackFormat` option
            ? key
            : '';
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
    const locale = Object(shared_esm_bundler["isString"])(options.locale) ? options.locale : context.locale;
    // escape params
    escapeParameter && escapeParams(options);
    // resolve message format
    // eslint-disable-next-line prefer-const
    let [format, targetLocale, message] = !resolvedMessage
        ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn)
        : [
            key,
            locale,
            messages[locale] || {}
        ];
    // if you use default message, set it as message format!
    let cacheBaseKey = key;
    if (!resolvedMessage &&
        !(Object(shared_esm_bundler["isString"])(format) || isMessageFunction(format))) {
        if (enableDefaultMsg) {
            format = defaultMsgOrKey;
            cacheBaseKey = format;
        }
    }
    // checking message format and target locale
    if (!resolvedMessage &&
        (!(Object(shared_esm_bundler["isString"])(format) || isMessageFunction(format)) ||
            !Object(shared_esm_bundler["isString"])(targetLocale))) {
        return unresolving ? NOT_REOSLVED : key;
    }
    if (false) {}
    // setup compile error detecting
    let occurred = false;
    const errorDetector = () => {
        occurred = true;
    };
    // compile message format
    const msg = !isMessageFunction(format)
        ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector)
        : format;
    // if occurred compile error, return the message format
    if (occurred) {
        return format;
    }
    // evaluate message with context
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    // if use post translation option, proceed it with handler
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    // NOTE: experimental !!
    if (false) {}
    return ret;
}
function escapeParams(options) {
    if (Object(shared_esm_bundler["isArray"])(options.list)) {
        options.list = options.list.map(item => Object(shared_esm_bundler["isString"])(item) ? Object(shared_esm_bundler["escapeHtml"])(item) : item);
    }
    else if (Object(shared_esm_bundler["isObject"])(options.named)) {
        Object.keys(options.named).forEach(key => {
            if (Object(shared_esm_bundler["isString"])(options.named[key])) {
                options.named[key] = Object(shared_esm_bundler["escapeHtml"])(options.named[key]);
            }
        });
    }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'translate';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (false) {}
        // for vue-devtools timeline event
        if (false) {}
        message =
            messages[targetLocale] || {};
        // for vue-devtools timeline event
        let start = null;
        let startTag;
        let endTag;
        if (false) {}
        if ((format = resolveValue(message, key)) === null) {
            // if null, resolve with object key path
            format = message[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        // for vue-devtools timeline event
        if (false) {}
        if (Object(shared_esm_bundler["isString"])(format) || Object(shared_esm_bundler["isFunction"])(format))
            break;
        const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
        if (missingRet !== key) {
            format = missingRet;
        }
        from = to;
    }
    return [format, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
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
    if (false) {}
    const msg = messageCompiler(format, getCompileOptions(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
    // for vue-devtools timeline event
    if (false) {}
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
    if (false) {}
    const messaged = msg(msgCtx);
    // for vue-devtools timeline event
    if (false) {}
    return messaged;
}
/** @internal */
function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!Object(shared_esm_bundler["isString"])(arg1) && !Object(shared_esm_bundler["isNumber"])(arg1) && !isMessageFunction(arg1)) {
        throw createCoreError(14 /* INVALID_ARGUMENT */);
    }
    // prettier-ignore
    const key = Object(shared_esm_bundler["isNumber"])(arg1)
        ? String(arg1)
        : isMessageFunction(arg1)
            ? arg1
            : arg1;
    if (Object(shared_esm_bundler["isNumber"])(arg2)) {
        options.plural = arg2;
    }
    else if (Object(shared_esm_bundler["isString"])(arg2)) {
        options.default = arg2;
    }
    else if (Object(shared_esm_bundler["isPlainObject"])(arg2) && !Object(shared_esm_bundler["isEmptyObject"])(arg2)) {
        options.named = arg2;
    }
    else if (Object(shared_esm_bundler["isArray"])(arg2)) {
        options.list = arg2;
    }
    if (Object(shared_esm_bundler["isNumber"])(arg3)) {
        options.plural = arg3;
    }
    else if (Object(shared_esm_bundler["isString"])(arg3)) {
        options.default = arg3;
    }
    else if (Object(shared_esm_bundler["isPlainObject"])(arg3)) {
        Object(shared_esm_bundler["assign"])(options, arg3);
    }
    return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
        warnHtmlMessage,
        onError: (err) => {
            errorDetector && errorDetector(err);
            if ((false)) {}
            else {
                throw err;
            }
        },
        onCacheKey: (source) => Object(shared_esm_bundler["generateFormatCacheKey"])(locale, key, source)
    };
}
function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
        const val = resolveValue(message, key);
        if (Object(shared_esm_bundler["isString"])(val)) {
            let occurred = false;
            const errorDetector = () => {
                occurred = true;
            };
            const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
            return !occurred
                ? msg
                : NOOP_MESSAGE_FUNCTION;
        }
        else if (isMessageFunction(val)) {
            return val;
        }
        else {
            // TODO: should be implemented warning message
            return NOOP_MESSAGE_FUNCTION;
        }
    };
    const ctxOptions = {
        locale,
        modifiers,
        pluralRules,
        messages: resolveMessage
    };
    if (context.processor) {
        ctxOptions.processor = context.processor;
    }
    if (options.list) {
        ctxOptions.list = options.list;
    }
    if (options.named) {
        ctxOptions.named = options.named;
    }
    if (Object(shared_esm_bundler["isNumber"])(options.plural)) {
        ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
}

const intlDefined = typeof Intl !== 'undefined';
const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
    numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
};

// implementation of `datetime` function
function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (false) {}
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = Object(shared_esm_bundler["isBoolean"])(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = Object(shared_esm_bundler["isBoolean"])(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = !!options.part;
    const locale = Object(shared_esm_bundler["isString"])(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!Object(shared_esm_bundler["isString"])(key) || key === '') {
        return new Intl.DateTimeFormat(locale).format(value);
    }
    // resolve format
    let datetimeFormat = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'datetime format';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (false) {}
        // for vue-devtools timeline event
        if (false) {}
        datetimeFormat =
            datetimeFormats[targetLocale] || {};
        format = datetimeFormat[key];
        if (Object(shared_esm_bundler["isPlainObject"])(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, type);
        from = to;
    }
    // checking format and target locale
    if (!Object(shared_esm_bundler["isPlainObject"])(format) || !Object(shared_esm_bundler["isString"])(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!Object(shared_esm_bundler["isEmptyObject"])(overrides)) {
        id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(targetLocale, Object(shared_esm_bundler["assign"])({}, format, overrides));
        __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (Object(shared_esm_bundler["isString"])(arg1)) {
        // Only allow ISO strings - other date formats are often supported,
        // but may cause different results in different browsers.
        if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
            throw createCoreError(16 /* INVALID_ISO_DATE_ARGUMENT */);
        }
        value = new Date(arg1);
        try {
            // This will fail if the date is not valid
            value.toISOString();
        }
        catch (e) {
            throw createCoreError(16 /* INVALID_ISO_DATE_ARGUMENT */);
        }
    }
    else if (Object(shared_esm_bundler["isDate"])(arg1)) {
        if (isNaN(arg1.getTime())) {
            throw createCoreError(15 /* INVALID_DATE_ARGUMENT */);
        }
        value = arg1;
    }
    else if (Object(shared_esm_bundler["isNumber"])(arg1)) {
        value = arg1;
    }
    else {
        throw createCoreError(14 /* INVALID_ARGUMENT */);
    }
    if (Object(shared_esm_bundler["isString"])(arg2)) {
        options.key = arg2;
    }
    else if (Object(shared_esm_bundler["isPlainObject"])(arg2)) {
        options = arg2;
    }
    if (Object(shared_esm_bundler["isString"])(arg3)) {
        options.locale = arg3;
    }
    else if (Object(shared_esm_bundler["isPlainObject"])(arg3)) {
        overrides = arg3;
    }
    if (Object(shared_esm_bundler["isPlainObject"])(arg4)) {
        overrides = arg4;
    }
    return [options.key || '', value, options, overrides];
}
/** @internal */
function clearDateTimeFormat(ctx, locale, format) {
    const context = ctx;
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context.__datetimeFormatters.has(id)) {
            continue;
        }
        context.__datetimeFormatters.delete(id);
    }
}

// implementation of `number` function
function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (false) {}
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = Object(shared_esm_bundler["isBoolean"])(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = Object(shared_esm_bundler["isBoolean"])(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = !!options.part;
    const locale = Object(shared_esm_bundler["isString"])(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!Object(shared_esm_bundler["isString"])(key) || key === '') {
        return new Intl.NumberFormat(locale).format(value);
    }
    // resolve format
    let numberFormat = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'number format';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (false) {}
        // for vue-devtools timeline event
        if (false) {}
        numberFormat =
            numberFormats[targetLocale] || {};
        format = numberFormat[key];
        if (Object(shared_esm_bundler["isPlainObject"])(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, type);
        from = to;
    }
    // checking format and target locale
    if (!Object(shared_esm_bundler["isPlainObject"])(format) || !Object(shared_esm_bundler["isString"])(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!Object(shared_esm_bundler["isEmptyObject"])(overrides)) {
        id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.NumberFormat(targetLocale, Object(shared_esm_bundler["assign"])({}, format, overrides));
        __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!Object(shared_esm_bundler["isNumber"])(arg1)) {
        throw createCoreError(14 /* INVALID_ARGUMENT */);
    }
    const value = arg1;
    if (Object(shared_esm_bundler["isString"])(arg2)) {
        options.key = arg2;
    }
    else if (Object(shared_esm_bundler["isPlainObject"])(arg2)) {
        options = arg2;
    }
    if (Object(shared_esm_bundler["isString"])(arg3)) {
        options.locale = arg3;
    }
    else if (Object(shared_esm_bundler["isPlainObject"])(arg3)) {
        overrides = arg3;
    }
    if (Object(shared_esm_bundler["isPlainObject"])(arg4)) {
        overrides = arg4;
    }
    return [options.key || '', value, options, overrides];
}
/** @internal */
function clearNumberFormat(ctx, locale, format) {
    const context = ctx;
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context.__numberFormatters.has(id)) {
            continue;
        }
        context.__numberFormatters.delete(id);
    }
}

{
    if (false) {}
}




/***/ }),

/***/ "6b0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    for (const [key, val] of props) {
        sfc[key] = val;
    }
    return sfc;
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8ac5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Empty_scss_vue_type_style_index_0_id_0f5cd62a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4222");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Empty_scss_vue_type_style_index_0_id_0f5cd62a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Empty_scss_vue_type_style_index_0_id_0f5cd62a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "8f63":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_b916fef2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2dd3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_b916fef2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_b916fef2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "90f7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Caption_scss_vue_type_style_index_0_id_2910e7b0_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1241");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Caption_scss_vue_type_style_index_0_id_2910e7b0_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Caption_scss_vue_type_style_index_0_id_2910e7b0_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9178":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_40c5a429_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d600");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_40c5a429_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_40c5a429_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "91d8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9d07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_index_vue_vue_type_style_index_0_id_4c5c34b6_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0fee");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_index_vue_vue_type_style_index_0_id_4c5c34b6_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_index_vue_vue_type_style_index_0_id_4c5c34b6_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a8a3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "abc5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getDevtoolsGlobalHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isProxyAvailable; });
function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
    // @ts-ignore
    return (typeof navigator !== 'undefined' && typeof window !== 'undefined')
        ? window
        : typeof global !== 'undefined'
            ? global
            : {};
}
const isProxyAvailable = typeof Proxy === 'function';

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "b774":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HOOK_SETUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HOOK_PLUGIN_SETTINGS_SET; });
const HOOK_SETUP = 'devtools-plugin:setup';
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';


/***/ }),

/***/ "bb67":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Unit_vue_vue_type_style_index_0_id_4b0d7f5e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5b2d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Unit_vue_vue_type_style_index_0_id_4b0d7f5e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Unit_vue_vue_type_style_index_0_id_4b0d7f5e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "bb6c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bf7a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c0b1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c276":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return sleep; });
/* unused harmony export convertPureObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return initCustomEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setAreaTrue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getValueFromType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getApiData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getFileData; });
/**
 * sleep (delay tool)
 *
 * @param {Number} ms
 * @return {Promise}
 */
function sleep(ms = 1000)
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
function convertPureObject(src)
{
  if (!src) return null;
  return JSON.parse(JSON.stringify(src));
}

/**
 * initial custom event
 * 중복되는 `dom`에다 여러 이벤트를 넣고 싶을때(특히 window) 유니크한 이름으로 이벤트를 만들 수 있도록 커스텀 이벤트를 만들어서 사용할때 사용한다.
 */
function initCustomEvent()
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
function setAreaTrue(src, total, current, loop)
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
function fullscreen(sw)
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
function getValueFromType(type, value)
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
function getApiData(url, parse = true)
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
function getFileData(file, parse = true)
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


/***/ }),

/***/ "c5e7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c9a8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d010":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Icon/index.vue?vue&type=template&id=4c5c34b6


const _hoisted_1 = ["aria-labelledby"]

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    "aria-labelledby": _ctx.iconName,
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "slideshow-icon"
  }, [
    (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])(_ctx.state.computedIconComponent)))
  ], 8, _hoisted_1))
}
// CONCATENATED MODULE: ./src/components/Icon/index.vue?vue&type=template&id=4c5c34b6

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Icon/index.vue?vue&type=script&lang=js



/* harmony default export */ var Iconvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'Icon',
  props: {
    iconName: { type: String, required: true },
  },
  setup(props)
  {
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      computedIconComponent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        switch (props.iconName)
        {
          case 'menu':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 23).then(__webpack_require__.bind(null, "1d0d")));
          case 'menu-flat':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 22).then(__webpack_require__.bind(null, "0d4c")));
          case 'arrow-left':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 8).then(__webpack_require__.bind(null, "00c5")));
          case 'arrow-right':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 9).then(__webpack_require__.bind(null, "25bd")));
          case 'arrow-up':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 10).then(__webpack_require__.bind(null, "e5da")));
          case 'arrow-down':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 7).then(__webpack_require__.bind(null, "dc7f")));
          case 'frown':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 20).then(__webpack_require__.bind(null, "104a")));
          case 'tool':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 27).then(__webpack_require__.bind(null, "5233")));
          case 'droplet':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 16).then(__webpack_require__.bind(null, "3412")));
          case 'copy':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 13).then(__webpack_require__.bind(null, "1b13")));
          case 'database':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 14).then(__webpack_require__.bind(null, "adda")));
          case 'command':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 12).then(__webpack_require__.bind(null, "64fa")));
          case 'check':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 11).then(__webpack_require__.bind(null, "f470")));
          case 'x':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 29).then(__webpack_require__.bind(null, "3e0c")));
          case 'upload':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 28).then(__webpack_require__.bind(null, "9d7f")));
          case 'file':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 18).then(__webpack_require__.bind(null, "341e")));
          case 'info':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 21).then(__webpack_require__.bind(null, "55e6")));
          case 'play-circle':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 25).then(__webpack_require__.bind(null, "1830")));
          case 'download':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 15).then(__webpack_require__.bind(null, "4c80")));
          case 'edit':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 17).then(__webpack_require__.bind(null, "c15c")));
          case 'plus':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 26).then(__webpack_require__.bind(null, "fe91")));
          case 'folder':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 19).then(__webpack_require__.bind(null, "9b2f")));
          case 'minus':
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 24).then(__webpack_require__.bind(null, "3a50")));
          default:
            return null;
        }
      }),
    });
    return { state };
  },
}));

// CONCATENATED MODULE: ./src/components/Icon/index.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Icon/index.vue?vue&type=style&index=0&id=4c5c34b6&lang=scss
var Iconvue_type_style_index_0_id_4c5c34b6_lang_scss = __webpack_require__("9d07");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/Icon/index.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(Iconvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var Icon = __webpack_exports__["a"] = (__exports__);

/***/ }),

/***/ "d600":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e088":
/***/ (function(module) {

module.exports = JSON.parse("{\"alert\":{\"completeRestore\":\"Restore complete.\",\"errorSubmit\":\"There was a problem with processing.\",\"failedApply\":\"Failed to apply due to an error.\",\"failedGetData\":\"Failed get data.\",\"failedRestore\":\"Restore failed.\",\"invalidAddress\":\"The address is invalid. \",\"invalidData\":\"The data is invalid.\",\"noSelectedFile\":\"There is no file selected.\"},\"base\":{\"ShortcutKey\":\"Shortcut key\",\"add\":\"Add\",\"address\":\"Address\",\"advanced\":\"Advanced\",\"apply\":\"Apply\",\"array\":\"Array\",\"author\":\"Author\",\"autoplay\":\"Autoplay\",\"backup\":\"Backup\",\"basic\":\"Basic\",\"caption\":\"Caption\",\"close\":\"Close\",\"contain\":\"Contain\",\"controller\":\"Controller\",\"cover\":\"Cover\",\"darkMode\":\"Dark mode\",\"data\":\"Data\",\"description\":\"Description\",\"edit\":\"Edit\",\"file\":\"File\",\"fullscreen\":\"Fullscreen\",\"general\":\"General\",\"group\":\"Group\",\"groupKey\":\"Group key\",\"guide\":\"Guide\",\"hud\":\"HUD\",\"image\":\"Image\",\"imageUrl\":\"Image URL\",\"information\":\"Information\",\"inputAddress\":\"Please input address.\",\"inputKey\":\"Please enter the key.\",\"inputText\":\"Please input text.\",\"inputUrl\":\"Please input URL.\",\"keyboard\":\"Keyboard\",\"language\":\"Language\",\"leftKey\":\"Left key\",\"lightMode\":\"Light mode\",\"menu\":\"Menu\",\"name\":\"Name\",\"next\":\"Next\",\"none\":\"None\",\"openUrl\":\"Open URL\",\"paginate\":\"Slide number\",\"preference\":\"Preference\",\"previous\":\"Previous\",\"processing\":\"Processing..\",\"remove\":\"Remove\",\"repeat\":\"Repeat\",\"reset\":\"Reset\",\"resetSlideshow\":\"Reset slideshow\",\"restore\":\"Restore\",\"rightKey\":\"Right key\",\"shuffleText\":\"Shuffle text\",\"slides\":\"Slides\",\"style\":\"Style\",\"subject\":\"Subject\",\"submitEdit\":\"Edit\",\"swipe\":\"Swipe\",\"system\":\"System\",\"thumbnail\":\"Thumbnail\",\"urlThumbnailUrl\":\"Thumbnail image URL\",\"version\":\"Version\"},\"confirm\":{\"applyRestart\":\"The slideshow restarts.\\nWould you like to apply?\",\"backup\":\"Do you really want to back up all your data?\\nThe backed up content is saved as a `JSON` file.\",\"remove\":\"Do you really want to delete it?\",\"reset\":\"Do you really want to reset all settings and slide data?\\nOnce initialized, it cannot be recovered.\",\"restart\":\"Do you really want to restart?\",\"restore\":\"Would you really want to restore all your data?\\nThis operation will delete all current data.\",\"selectGroup\":\"Would you like to use it as the slide of your choice?\\nIf you change the slide, it starts over.\"},\"description\":{\"addSlides\":\"Please add slides in preferences.\",\"autoplay\":\"Autoplay the slide.\",\"autoplayDelay\":\"The amount of time to wait before the slide automatically transitions.\",\"autoplayDirection\":\"Set the direction in which the slide automatically transitions.\",\"autoplayPauseOnHover\":\"If you place the mouse over the slide area, autoplay is paused.\",\"backup\":\"Import or export all data in the slideshow.\",\"captionAnimationSpeed\":\"The higher the value, the faster the animation.\",\"captionAnimationType\":\"Select the caption transition when the slide changes.\",\"captionPosition\":\"Set position of the caption. ex) left,top\",\"captionScale\":\"Set size of the caption.\",\"empty\":\"Empty\",\"emptySlides\":\"No slides.\",\"getDataByRestAPI\":\"Get data by RestAPI address.\",\"getJsonFile\":\"Upload the JSON file to get the data.\",\"group\":\"Opens the slide group selection window.\",\"hoverVisibleHud\":\"If you overlay mouse, HUD will be hidden.\",\"hud\":\"It shows controller and status.\",\"imageScale\":\"Set the size of the slide image. ex) horizontal,vertical\",\"imageType\":\"Choose slide image type\",\"importDataMethod\":\"Select how to import your data.\",\"information\":\"If you have any comments on problems or improvements, please use the %{link} page.\",\"initialNumber\":\"This is the slide number displayed at the start. (Numbers from 0)\",\"inputDescriptionSlide\":\"Input description of the slide.\",\"inputImageUrl\":\"Input image address.\",\"inputKeyOnGroup\":\"Enter the key value for the slide group.\",\"inputSlideDataCode\":\"Please input slides data code.\",\"inputSlideTitle\":\"Input title for the slide.\",\"inputSlidesUrl\":\"Please enter the slide URL address.\",\"inputThumbnailUrl\":\"Input thumbnail image address.\",\"keyboardGuide\":\"Pressing a keyboard shortcut as follows executes the function.\",\"language\":\"Set the language.\",\"openPreference\":\"Open preference\",\"repeat\":\"Moves the slide from last to first.\",\"reset\":\"Reset all settings and slide data.\",\"restart\":\"Restart the slideshow\",\"screenMode\":\"Select a screen mode.\",\"selectGroup\":\"Select the slide you want to use.\",\"selectJsonFile\":\"Please select a JSON file.\",\"selectSlidesType\":\"Select the slide data type.\",\"selectSlidesType2\":\"If you change and apply the URL address method, the slide data will be lost.\",\"setCategoryDescription\":\"Set the description of the category.\",\"setCategoryName\":\"Set the name of the category.\",\"swipe\":\"Use swipe operations on touch devices\",\"thumbnail\":\"Open the thumbnail image list screen\",\"touchHud\":\"Toggles the HUD when clicking the mouse or touching the screen.\",\"transitionSpeed\":\"Change transition animation speed.\",\"transitionType\":\"Select the transition type when the slide changes.\",\"usingKeyboard\":\"Use keyboard shortcuts.\",\"visibleContents\":\"Set the display of each controller and status.\"},\"label\":{\"addGroup\":\"Add group\",\"addSlide\":\"Add slide\",\"editGroup\":\"Edit group\",\"editSlide\":\"Edit slide\",\"fadeInOut\":\"Fade in/out\",\"getData\":\"Import data\",\"imageType\":\"Image type\",\"moveHorizontal\":\"Move horizontally\",\"nextSlide\":\"Go to next slide\",\"prevSlide\":\"Go to previous slide\",\"removeGroup\":\"Remove group\"},\"language\":{\"en\":\"English\",\"ko\":\"Korean\"},\"preference\":{\"header\":{\"data\":\"Manage slide data.\",\"general\":\"Set the basic items.\",\"information\":\"You can check information about the slideshow.\",\"keyboard\":\"Settings related to keyboard shortcuts.\",\"slides\":\"Set the parts related to the slide.\",\"style\":\"Set the parts displayed on the screen.\"}},\"title\":{\"autoplayDelay\":\"Autoplay delay\",\"autoplayDirection\":\"Autoplay direction\",\"autoplayPauseOnHover\":\"Autoplay pause on hover\",\"backupOrRestore\":\"Backup & Restore\",\"captionAnimationSpeed\":\"Caption animation speed\",\"captionAnimationType\":\"Caption animation type\",\"captionPosition\":\"Caption position\",\"captionScale\":\"Caption scale\",\"changeMode\":\"Change the editing mode.\",\"emptySlide\":\"Empty slide\",\"fold\":\"Fold and unfold\",\"getSlideItems\":\"Get slide items\",\"hoverVisibleHud\":\"Visible Hover HUD\",\"imageScale\":\"Image scale\",\"importDataByAddress\":\"Import by address\",\"importDataByFile\":\"Import to file\",\"importSlideData\":\"Import slide data.\",\"initialNumber\":\"Initial slide number\",\"loading\":\"Ready Slideshow..\",\"manageSlideData\":\"Manage slides data\",\"screenMode\":\"Screen mode\",\"selectGroup\":\"Select group\",\"selectSlidesType\":\"Select slide type\",\"slidesUrlAddress\":\"Slide URL address\",\"thumbnailView\":\"Thumbnail view\",\"touchHud\":\"Toggle HUD on click or touch\",\"transitionSpeed\":\"Transition speed\",\"transitionType\":\"Transition type\",\"usingKeyboard\":\"Using keyboard shortcut\",\"visibleContents\":\"Visible contents\"}}");

/***/ }),

/***/ "e3d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_1caafd8f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("91d8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_1caafd8f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_index_scss_vue_type_style_index_0_id_1caafd8f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e62d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Images_scss_vue_type_style_index_0_id_25785aa4_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4543");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Images_scss_vue_type_style_index_0_id_25785aa4_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Images_scss_vue_type_style_index_0_id_25785aa4_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e842":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return slides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return useProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setupSlides; });
let main = null;
let slides = null;
let useProps = null;

/**
 * setup app
 */
function setup(o, use)
{
  main = o;
  useProps = use;
}

/**
 * setup slides
 */
function setupSlides(o)
{
  slides = o;
}


/***/ }),

/***/ "ec76":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Item_scss_vue_type_style_index_0_id_0eb9918c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5055");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Item_scss_vue_type_style_index_0_id_0eb9918c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Item_scss_vue_type_style_index_0_id_0eb9918c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f270":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Paginate_vue_vue_type_style_index_0_id_7f958ec6_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c0b1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Paginate_vue_vue_type_style_index_0_id_7f958ec6_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Paginate_vue_vue_type_style_index_0_id_7f958ec6_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f30a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProxy; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b774");

class ApiProxy {
    constructor(plugin, hook) {
        this.target = null;
        this.targetQueue = [];
        this.onQueue = [];
        this.plugin = plugin;
        this.hook = hook;
        const defaultSettings = {};
        if (plugin.settings) {
            for (const id in plugin.settings) {
                const item = plugin.settings[id];
                defaultSettings[id] = item.defaultValue;
            }
        }
        const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
        let currentSettings = { ...defaultSettings };
        try {
            const raw = localStorage.getItem(localSettingsSaveId);
            const data = JSON.parse(raw);
            Object.assign(currentSettings, data);
        }
        catch (e) {
            // noop
        }
        this.fallbacks = {
            getSettings() {
                return currentSettings;
            },
            setSettings(value) {
                try {
                    localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
                }
                catch (e) {
                    // noop
                }
                currentSettings = value;
            }
        };
        hook.on(_const__WEBPACK_IMPORTED_MODULE_0__[/* HOOK_PLUGIN_SETTINGS_SET */ "a"], (pluginId, value) => {
            if (pluginId === this.plugin.id) {
                this.fallbacks.setSettings(value);
            }
        });
        this.proxiedOn = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target.on[prop];
                }
                else {
                    return (...args) => {
                        this.onQueue.push({
                            method: prop,
                            args
                        });
                    };
                }
            }
        });
        this.proxiedTarget = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target[prop];
                }
                else if (prop === 'on') {
                    return this.proxiedOn;
                }
                else if (Object.keys(this.fallbacks).includes(prop)) {
                    return (...args) => {
                        this.targetQueue.push({
                            method: prop,
                            args,
                            resolve: () => { }
                        });
                        return this.fallbacks[prop](...args);
                    };
                }
                else {
                    return (...args) => {
                        return new Promise(resolve => {
                            this.targetQueue.push({
                                method: prop,
                                args,
                                resolve
                            });
                        });
                    };
                }
            }
        });
    }
    async setRealTarget(target) {
        this.target = target;
        for (const item of this.onQueue) {
            this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
            item.resolve(await this.target[item.method](...item.args));
        }
    }
}


/***/ }),

/***/ "f83d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmitter", function() { return createEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHtml", function() { return escapeHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "friendlyJSONstringify", function() { return friendlyJSONstringify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCodeFrame", function() { return generateCodeFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFormatCacheKey", function() { return generateFormatCacheKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return getGlobalThis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasOwn", function() { return hasOwn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inBrowser", function() { return inBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return isDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRegExp", function() { return isRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbol", function() { return isSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeSymbol", function() { return makeSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mark", function() { return mark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measure", function() { return measure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectToString", function() { return objectToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDisplayString", function() { return toDisplayString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTypeString", function() { return toTypeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/*!
  * @intlify/shared v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
/**
 * Original Utilities
 * written by kazuya kawaguchi
 */
const inBrowser = typeof window !== 'undefined';
let mark;
let measure;
if ((false)) {}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
/* eslint-disable */
function format(message, ...args) {
    if (args.length === 1 && isObject(args[0])) {
        args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
        args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
        return args.hasOwnProperty(identifier) ? args[identifier] : '';
    });
}
const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/\u0027/g, '\\u0027');
const isNumber = (val) => typeof val === 'number' && isFinite(val);
const isDate = (val) => toTypeString(val) === '[object Date]';
const isRegExp = (val) => toTypeString(val) === '[object RegExp]';
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
    if (typeof console !== 'undefined') {
        console.warn(`[intlify] ` + msg);
        /* istanbul ignore if */
        if (err) {
            console.warn(err.stack);
        }
    }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = () => {
    // prettier-ignore
    return (_globalThis ||
        (_globalThis =
            typeof globalThis !== 'undefined'
                ? globalThis
                : typeof self !== 'undefined'
                    ? self
                    : typeof window !== 'undefined'
                        ? window
                        : typeof global !== 'undefined'
                            ? global
                            : {}));
};
function escapeHtml(rawText) {
    return rawText
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
/* eslint-enable */
/**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isBoolean = (val) => typeof val === 'boolean';
const isSymbol = (val) => typeof val === 'symbol';
const isObject = (val) => // eslint-disable-line
 val !== null && typeof val === 'object';
const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === '[object Object]';
// for converting list and named values to displayed strings.
const toDisplayString = (val) => {
    return val == null
        ? ''
        : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
            ? JSON.stringify(val, null, 2)
            : String(val);
};
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
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
 */
/**
 * Create a event emitter
 *
 * @returns An event emitter
 */
function createEmitter() {
    const events = new Map();
    const emitter = {
        events,
        on(event, handler) {
            const handlers = events.get(event);
            const added = handlers && handlers.push(handler);
            if (!added) {
                events.set(event, [handler]);
            }
        },
        off(event, handler) {
            const handlers = events.get(event);
            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
        },
        emit(event, payload) {
            (events.get(event) || [])
                .slice()
                .map(handler => handler(payload));
            (events.get('*') || [])
                .slice()
                .map(handler => handler(event, payload));
        }
    };
    return emitter;
}



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// NAMESPACE OBJECT: ./src/store/actions.js
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "changeMode", function() { return changeMode; });
__webpack_require__.d(actions_namespaceObject, "changePreference", function() { return changePreference; });
__webpack_require__.d(actions_namespaceObject, "changeAutoplay", function() { return changeAutoplay; });
__webpack_require__.d(actions_namespaceObject, "changeHud", function() { return changeHud; });
__webpack_require__.d(actions_namespaceObject, "changeTree", function() { return changeTree; });
__webpack_require__.d(actions_namespaceObject, "changeSlides", function() { return changeSlides; });
__webpack_require__.d(actions_namespaceObject, "changeActiveSlide", function() { return changeActiveSlide; });
__webpack_require__.d(actions_namespaceObject, "reset", function() { return actions_reset; });
__webpack_require__.d(actions_namespaceObject, "changeGroup", function() { return changeGroup; });

// NAMESPACE OBJECT: ./src/store/mutations.js
var mutations_namespaceObject = {};
__webpack_require__.r(mutations_namespaceObject);
__webpack_require__.d(mutations_namespaceObject, "updateMode", function() { return updateMode; });
__webpack_require__.d(mutations_namespaceObject, "updateActiveSlide", function() { return updateActiveSlide; });
__webpack_require__.d(mutations_namespaceObject, "updateUseKeyboardEvent", function() { return updateUseKeyboardEvent; });
__webpack_require__.d(mutations_namespaceObject, "updatePreference", function() { return updatePreference; });
__webpack_require__.d(mutations_namespaceObject, "updateValueInPreference", function() { return updateValueInPreference; });
__webpack_require__.d(mutations_namespaceObject, "updateTree", function() { return updateTree; });
__webpack_require__.d(mutations_namespaceObject, "updateSlides", function() { return updateSlides; });
__webpack_require__.d(mutations_namespaceObject, "updateGroup", function() { return updateGroup; });
__webpack_require__.d(mutations_namespaceObject, "updateAutoplay", function() { return updateAutoplay; });
__webpack_require__.d(mutations_namespaceObject, "updateUsePreference", function() { return updateUsePreference; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/App.vue?vue&type=template&id=a6b8b9bc


function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LoadingIntro = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("LoadingIntro")
  const _component_Container = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Container")

  return (_ctx.state.loading)
    ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_LoadingIntro, { key: 0 }))
    : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Container, {
        key: 1,
        error: _ctx.state.error
      }, null, 8, ["error"]))
}
// CONCATENATED MODULE: ./src/screen/App.vue?vue&type=template&id=a6b8b9bc

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm-browser.js
var vuex_esm_browser = __webpack_require__("5502");

// EXTERNAL MODULE: ./node_modules/vue-i18n/index.js
var vue_i18n = __webpack_require__("0251");

// CONCATENATED MODULE: ./src/libs/storage.js
const prefix = 'slideshow';
let disableStorage = {
  preference: false,
  tree: false,
};

/**
 * check localStorage
 *
 * @return {boolean}
 */
function checkObject()
{
  return !!window.localStorage;
}

/**
 * get value in localStorage
 *
 * @param {string} key
 * @returns {object}
 */
function get(key)
{
  if (disableStorage[key]) return;
  if (!(checkObject() && key)) return undefined;
  try
  {
    return JSON.parse(window.localStorage.getItem(`${prefix}_${key}`));
  }
  catch(e)
  {
    return undefined;
  }
}

/**
 * set value in localStorage
 *
 * @param {string} key
 * @param {any} value
 */
function set(key, value)
{
  if (disableStorage[key]) return;
  if (!(checkObject() && key && value)) return;
  window.localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
}

/**
 * disabled storage
 */
function disabled(key)
{
  switch (key)
  {
    case 'preference':
    case 'tree':
    case 'group':
      disableStorage[key] = true;
      break;
  }
}

// EXTERNAL MODULE: ./src/libs/local.js
var local = __webpack_require__("e842");

// EXTERNAL MODULE: ./src/libs/util.js
var util = __webpack_require__("c276");

// EXTERNAL MODULE: ./src/libs/object.js
var object = __webpack_require__("1717");

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Container.vue?vue&type=template&id=0aacfd4a&scoped=true


function Containervue_type_template_id_0aacfd4a_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Slides = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Slides")
  const _component_SlidesEmpty = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SlidesEmpty")
  const _component_Navigation = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Navigation")
  const _component_Group = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Group")
  const _component_Thumbnail = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Thumbnail")
  const _component_Preference = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Preference")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([
    'slideshow',
    _ctx.$store.state.preference.general.hoverVisibleHud && 'slideshow--hover',
  ])
  }, [
    (_ctx.computes.existSlides)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Slides, {
          key: 0,
          ref: "slides",
          class: "slideshow__slides"
        }, null, 512))
      : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SlidesEmpty, {
          key: 1,
          title: _ctx.computes.emptyTitle,
          description: _ctx.computes.emptyDescription
        }, null, 8, ["title", "description"])),
    (_ctx.$store.state.preference.general.hud)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Navigation, {
          key: 2,
          ref: "navigation",
          class: "slideshow__navigation"
        }, null, 512))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
    (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Teleport"], { to: "#modal" }, [
      (_ctx.computes.showGroup)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Group, { key: 0 }))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
      (_ctx.computes.showThumbnail)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Thumbnail, { key: 1 }))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
      (_ctx.computes.showPreference)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Preference, { key: 2 }))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
    ]))
  ], 2))
}
// CONCATENATED MODULE: ./src/screen/Container.vue?vue&type=template&id=0aacfd4a&scoped=true

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/index.vue?vue&type=template&id=4da3ec4c


function Slidesvue_type_template_id_4da3ec4c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Images = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Images")
  const _component_Caption = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Caption")
  const _component_Controller = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Controller")
  const _component_Paginate = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Paginate")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("article", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([
    'slideshow-slides',
    _ctx.state.swipeMove && 'swipe-move',
    `slideshow-slides--${_ctx.computes.transitionType}`
  ]),
    onTouchstart: _cache[0] || (_cache[0] = (...args) => (_ctx.onStart && _ctx.onStart(...args))),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => (_ctx.onMove && _ctx.onMove(...args))),
    onTouchend: _cache[2] || (_cache[2] = (...args) => (_ctx.onEnd && _ctx.onEnd(...args))),
    onMousedown: _cache[3] || (_cache[3] = (...args) => (_ctx.onStart && _ctx.onStart(...args))),
    onMousemove: _cache[4] || (_cache[4] = (...args) => (_ctx.onMove && _ctx.onMove(...args))),
    onMouseup: _cache[5] || (_cache[5] = (...args) => (_ctx.onEnd && _ctx.onEnd(...args))),
    onMouseleave: _cache[6] || (_cache[6] = (...args) => (_ctx.onTouchCancel && _ctx.onTouchCancel(...args))),
    onMouseenter: _cache[7] || (_cache[7] = (...args) => (_ctx.onMouseEnter && _ctx.onMouseEnter(...args))),
    onContextmenu: _cache[8] || (_cache[8] = (...args) => (_ctx.onContextMenu && _ctx.onContextMenu(...args)))
  }, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Images, {
      ref: "images",
      "initial-active": _ctx.$store.state.activeSlide,
      items: _ctx.state.computedImages,
      "animation-type": _ctx.computes.transitionType,
      duration: _ctx.$store.state.preference.slides.animationSpeed,
      "image-type": _ctx.$store.state.preference.style.imageType,
      "image-size": _ctx.$store.state.preference.style.imageScale,
      loop: _ctx.$store.state.preference.slides.loop,
      "move-pos": _ctx.state.swipePos,
      onAnimationControl: _ctx.onAnimationControl,
      onChangeActive: _ctx.onChangeActive
    }, null, 8, ["initial-active", "items", "animation-type", "duration", "image-type", "image-size", "loop", "move-pos", "onAnimationControl", "onChangeActive"]),
    (_ctx.state.computedVisibleCaption)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Caption, {
          key: 0,
          active: _ctx.$store.state.activeSlide,
          title: _ctx.state.computedCaption.title,
          description: _ctx.state.computedCaption.description,
          "animation-type": _ctx.$store.state.preference.slides.captionAnimationType,
          "animation-speed": _ctx.$store.state.preference.slides.captionAnimationSpeed,
          position: _ctx.$store.state.preference.style.captionPosition,
          scale: _ctx.$store.state.preference.style.captionScale
        }, null, 8, ["active", "title", "description", "animation-type", "animation-speed", "position", "scale"]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
    (_ctx.state.computedVisibleController)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Controller, {
          key: 1,
          disabled: _ctx.state.animated,
          "show-prev": _ctx.state.computedShowPrevButton,
          "show-next": _ctx.state.computedShowNextButton,
          class: "slideshow-slides__controller",
          onClickPrev: _ctx.prev,
          onClickNext: _ctx.next
        }, null, 8, ["disabled", "show-prev", "show-next", "onClickPrev", "onClickNext"]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
    (_ctx.state.computedVisiblePaginate)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Paginate, {
          key: 2,
          total: _ctx.state.computedImages.length,
          current: _ctx.$store.state.activeSlide,
          class: "slideshow-slides__paginate"
        }, null, 8, ["total", "current"]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
  ], 34))
}
// CONCATENATED MODULE: ./src/components/Slides/index.vue?vue&type=template&id=4da3ec4c

// CONCATENATED MODULE: ./src/libs/number.js
/**
 * move number
 *
 * @param {number} total
 * @param {number} value
 * @param {boolean} loop
 * @return {number}
 */
function move(total = 0, value = 0, loop = true)
{
  if (total - 1 < value)
  {
    if (!loop) return total - 1;
    return 0;
  }
  else if (value < 0)
  {
    if (!loop) return 0;
    return total - 1;
  }
  else
  {
    return Number(value);
  }
}


// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Images.vue?vue&type=template&id=25785aa4&scoped=true


const _withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-25785aa4"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const _hoisted_1 = {
  ref: "wrap",
  class: "wrap"
}
const _hoisted_2 = {
  key: 0,
  class: "first"
}
const _hoisted_3 = ["src", "alt"]
const _hoisted_4 = {
  key: 0,
  class: "empty-image"
}
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("strong", null, "no image", -1))
const _hoisted_6 = ["src", "alt", "onError"]
const _hoisted_7 = {
  key: 1,
  class: "last"
}
const _hoisted_8 = ["src", "alt"]
const _hoisted_9 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", { class: "overlay" }, null, -1))

function Imagesvue_type_template_id_25785aa4_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([
    'slideshow-images',
    `animation--${_ctx.animationType}`,
    _ctx.imageType && `type--${_ctx.imageType}`,
    _ctx.state.playAnimation && 'play-animation',
    _ctx.state.cancelAnimation && 'cancel-animation',
  ]),
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])(_ctx.state.computedContainerStyle)
  }, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_1, [
      (_ctx.state.computedShowFirstItem)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("figure", _hoisted_2, [
            (_ctx.state.loaded[_ctx.items.length-1])
              ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
                  key: 0,
                  src: _ctx.items[_ctx.items.length-1].src,
                  alt: _ctx.items[_ctx.items.length-1].title
                }, null, 8, _hoisted_3))
              : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
          ]))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
      (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.items, (item, key) => {
        return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("figure", {
          ref: el => { _ctx.figures[key] = el },
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([
        (_ctx.state.active === key && !!_ctx.state.activeClassName) && _ctx.state.activeClassName,
        (_ctx.state.nextKey === key && !!_ctx.state.nextClassName) && _ctx.state.nextClassName,
      ])
        }, [
          (_ctx.state.error[key])
            ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_4, [
                Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "x" }),
                _hoisted_5
              ]))
            : (_ctx.state.loaded[key])
              ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
                  key: 1,
                  src: item.src,
                  alt: item.title,
                  onError: $event => (_ctx.onErrorImage(key))
                }, null, 40, _hoisted_6))
              : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
        ], 2))
      }), 256)),
      (_ctx.state.computedShowLastItem)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("figure", _hoisted_7, [
            (_ctx.state.loaded[0])
              ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
                  key: 0,
                  src: _ctx.items[0].src,
                  alt: _ctx.items[0].title
                }, null, 8, _hoisted_8))
              : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
          ]))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
    ], 512),
    _hoisted_9
  ], 6))
}
// CONCATENATED MODULE: ./src/components/Slides/Images.vue?vue&type=template&id=25785aa4&scoped=true

// EXTERNAL MODULE: ./src/components/Icon/index.vue + 4 modules
var Icon = __webpack_require__("d010");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Images.vue?vue&type=script&lang=js





/* harmony default export */ var Imagesvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'SlidesImages',
  components: {
    Icon: Icon["a" /* default */],
  },
  props: {
    items: { type: Array, required: true }, // 슬라이드 아이템 목록
    initialActive: { type: Number, default: 0 }, // 초기 활성화되는 슬라이드
    animationType: { type: String, default: 'none' }, // fade,horizontal,none
    imageType: { type: String, default: null }, // null,contain,cover
    duration: { type: Number, default: 800 }, // animation speed(ms)
    imageSize: { type: Array, default: [100,100] }, // slide image scale(%)
    loop: { type: Boolean }, // slide loop
    movePos: { type: Number, default: undefined },
  },
  setup(props, context)
  {
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      loaded: new Array(props.items.length).fill(false), // 이미지 로드체크 목록
      error: new Array(props.items.length).fill(false), // 이미지 에러체크 목록
      active: props.initialActive, // 현재 활성화되어있는 슬라이드 번호
      activeClassName: 'current',
      nextKey: undefined,
      nextClassName: undefined,
      playAnimation: false,
      cancelAnimation: false,
      computedContainerStyle: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        let result = {
          '--speed-slide-animation': `${props.duration}ms`,
          '--image-size-width': props.imageSize[0],
          '--image-size-height': props.imageSize[1],
        };
        if (props.animationType === 'horizontal')
        {
          result[`--active-column`] = (state.nextKey !== undefined) ? state.nextKey : state.active;
          if (props.movePos !== undefined)
          {
            result['--move-pos'] = `${props.movePos}vw`;
          }
        }
        return result;
      }),
      computedShowFirstItem: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        if (!props.loop) return false;
        if (props.items.length <= 1) return false;
        return props.items[props.items.length-1] && props.animationType === 'horizontal';
      }),
      computedShowLastItem: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        if (!props.loop) return false;
        if (props.items.length <= 1) return false;
        return props.items[0] && props.animationType === 'horizontal';
      }),
    });
    let _active = props.initialActive;
    const figures = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])([]);
    const wrap = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    let targetElement = null;

    // set loaded
    state.loaded[props.initialActive] = true;
    state.loaded = util["f" /* setAreaTrue */](state.loaded, props.items.length, props.initialActive, props.loop);

    // methods
    async function play(n = null, userAnimationType = undefined)
    {
      if (typeof n !== 'number') return;
      // set temp active
      _active = Number(n);
      // play motion
      const type = userAnimationType !== undefined ? userAnimationType : props.animationType;
      // check loaded image
      if (!state.loaded[_active])
      {
        try
        {
          await checkLoadImage(props.items[_active].src);
          state.loaded[_active] = true;
        }
        catch(e)
        {
          state.error[_active] = true;
        }
      }
      // play transition
      switch (type)
      {
        case 'fade':
          if (targetElement)
          {
            targetElement.removeEventListener('transitionend', onTransitionEnd);
            targetElement = null;
          }
          context.emit('animation-control', true);
          state.playAnimation = true;
          state.activeClassName = 'fadeout ready';
          state.nextKey = _active;
          state.nextClassName = 'fadein ready';
          await util["g" /* sleep */](20);
          state.nextClassName = 'fadein';
          targetElement = figures.value[_active];
          targetElement.addEventListener('transitionend', onTransitionEnd);
          break;
        case 'horizontal':
          context.emit('animation-control', true);
          state.playAnimation = true;
          if (props.loop)
          {
            if (state.active === 0 && _active >= props.items.length - 1)
            {
              state.nextKey = -1;
            }
            else if (state.active >= props.items.length - 1 && _active === 0)
            {
              state.nextKey = props.items.length;
            }
            state.active = _active;
          }
          else
          {
            state.active = _active;
          }
          wrap.value.addEventListener('transitionend', onTransitionEnd);
          break;
        case 'none':
        default:
          state.active = _active;
          state.loaded = util["f" /* setAreaTrue */](state.loaded, props.items.length, props.initialActive, props.loop);
          break;
      }
    }
    function onTransitionEnd()
    {
      switch (props.animationType)
      {
        case 'fade':
          state.playAnimation = false;
          state.nextKey = undefined;
          state.nextClassName = undefined;
          state.active = _active;
          state.activeClassName = 'current';
          state.loaded = util["f" /* setAreaTrue */](state.loaded, props.items.length, props.initialActive, props.loop);
          if (targetElement)
          {
            targetElement.removeEventListener('transitionend', onTransitionEnd);
            targetElement = null;
          }
          context.emit('animation-control', false);
          break;
        case 'horizontal':
          state.playAnimation = false;
          state.nextKey = undefined;
          state.loaded = util["f" /* setAreaTrue */](state.loaded, props.items.length, props.initialActive, props.loop);
          wrap.value.removeEventListener('transitionend', onTransitionEnd);
          context.emit('animation-control', false);
          break;
      }
    }
    async function cancel()
    {
      if (state.playAnimation) return;
      context.emit('animation-control', true);
      state.cancelAnimation = true;
      wrap.value.addEventListener('transitionend', onCancelTransitionEnd);
    }
    function onCancelTransitionEnd()
    {
      state.cancelAnimation = false;
      wrap.value.removeEventListener('transitionend', onCancelTransitionEnd);
      context.emit('animation-control', false);
    }
    function onErrorImage(key)
    {
      state.error[key] = true;
    }
    function checkLoadImage(src)
    {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject();
        image.src = src;
      });
    }

    return {
      state,
      figures,
      wrap,
      play,
      cancel,
      onErrorImage,
    };
  },
  emits: {
    'animation-control': null,
    'change-active': null,
  },
}));

// CONCATENATED MODULE: ./src/components/Slides/Images.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Slides/Images.scss?vue&type=style&index=0&id=25785aa4&lang=scss&scoped=true
var Imagesvue_type_style_index_0_id_25785aa4_lang_scss_scoped_true = __webpack_require__("e62d");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/Slides/Images.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(Imagesvue_type_script_lang_js, [['render',Imagesvue_type_template_id_25785aa4_scoped_true_render],['__scopeId',"data-v-25785aa4"]])

/* harmony default export */ var Images = (__exports__);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Caption.vue?vue&type=template&id=2910e7b0&scoped=true


const Captionvue_type_template_id_2910e7b0_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-2910e7b0"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_1 = {
  key: 0,
  ref: "elementTitle"
}
const Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_2 = {
  key: 1,
  ref: "elementDescription"
}
const Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_3 = { key: 0 }
const Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_4 = { key: 1 }

function Captionvue_type_template_id_2910e7b0_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("article", {
    class: "slideshow-caption",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
    '--caption-position-left': _ctx.position[0],
    '--caption-position-top': _ctx.position[1],
    '--caption-scale': _ctx.scale,
  })
  }, [
    (_ctx.animationType === 'shuffle')
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], { key: 0 }, [
          (_ctx.title)
            ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("h1", Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_1, null, 512))
            : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
          (_ctx.description)
            ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("pre", Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_2, null, 512))
            : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
        ], 64))
      : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], { key: 1 }, [
          (_ctx.title)
            ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("h1", Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.title), 1))
            : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
          (_ctx.description)
            ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("pre", Captionvue_type_template_id_2910e7b0_scoped_true_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.description), 1))
            : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
        ], 64))
  ], 4))
}
// CONCATENATED MODULE: ./src/components/Slides/Caption.vue?vue&type=template&id=2910e7b0&scoped=true

// CONCATENATED MODULE: ./src/libs/shuffle.js
/**
 * shuffle
 *
 * @param {HTMLElement} $el
 * @param {Object} options
 * @return {void}
 */
function shuffle($el, options)
{
  // merge options
  options = Object.assign({}, {
    text: '', // 최종적으로 표시되는 텍스트
    waitChar: '-', // 변경되기전에 표시되는 텍스트
    charSpeed: 1, // 한번에 바뀌는 글자의 갯수
    moveFix: 25, // 텍스트가 바뀌는 딜레이 시간
    moveRange: 10, // 랜덤으로 글자가 바뀌고 있을때의 시간관련
    moveTrigger: 25, // 랜덤으로 글자가 바뀌고 있을때의 시간관련
    fps: 60, // speed
    pattern: 'abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>', // random text pattern
    randomTextType: null, // unicode,pattern
    retry: true, // 함수가 실행할때마다 텍스트가 새로 만들어진다.
    callback: null, // 애니메이션이 끝나고 실행되는 함수
  }, options);
  options.text = options.text.trim();

  // set values
  let textKeys = [];
  let frame;
  let position;
  let currentText;
  let checkLast;
  let checkPlay = false;

  /**
   * stack
   */
  function stack()
  {
    let str = currentText;
    checkLast = true;

    for (let tick = position; tick <= frame; tick++)
    {
      if (0 !== textKeys[tick] && null != textKeys[tick])
      {
        checkLast = false;
        const selectKey = textKeys[tick];
        if (Math.abs(selectKey) <= options.moveTrigger)
        {
          let txt = '';
          switch(options.randomTextType)
          {
            case 'pattern':
              txt = randomWord(options.pattern);
              break;
            case 'unicode':
            default:
              const unicode = Math.min(Math.max(options.text.charCodeAt(tick) + selectKey, 33), 126);
              txt = String.fromCharCode(unicode);
              break;
          }
          str += txt;
        }
        else
        {
          str += options.waitChar;
        }
        selectKey > 0 ? textKeys[tick] -= 1 : textKeys[tick] += 1;
      }
      else
      {
        if (position === tick - 1)
        {
          position = tick;
          currentText = options.text.substring(0, position);
        }
        str += options.text.charAt(tick);
      }
      $el.textContent = str;
    }

    if (frame <= options.text.length)
    {
      frame += options.charSpeed;
    }
    else
    {
      checkPlay = true;
    }

    // last stack
    if (checkLast && checkPlay)
    {
      if ($el.dataset.id) clearInterval(parseInt($el.dataset.id));
      $el.textContent = currentText;
      $el.dataset.run = 'false';
      if (options.callback) options.callback();
    }
  }

  /**
   * get random word
   * 무작위 문자를 가져온다.
   *
   * @param {string} pattern
   * @return {string}
   */
  function randomWord(pattern)
  {
    const n = Math.floor(Math.random() * pattern.length);
    return pattern.substring(n, n + 1);
  }

  // play
  if (options.text || (options.text && !options.retry && $el.dataset.run !== 'true'))
  {
    $el.dataset.run = 'true';
    $el.textContent = options.waitChar;

    // set values
    for (let i=0; i<=options.text.length-1; i++)
    {
      if (' ' !== options.text.charAt(0))
      {
        textKeys[i] = (options.moveFix + Math.round(Math.random() * options.moveRange)) * (Math.round(Math.random()) - .5) * 2;
      }
      else
      {
        textKeys[i] = 0;
      }
    }

    // reset values
    frame = 0;
    position = 0;
    currentText = '';

    // set interval
    if ($el.dataset.id) clearInterval(parseInt($el.dataset.id));
    const intervalId = setInterval(stack, 1e3 / options.fps);
    $el.dataset.id = intervalId.toString();
  }
}

/* harmony default export */ var libs_shuffle = (shuffle);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Caption.vue?vue&type=script&lang=js




/* harmony default export */ var Captionvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'Caption',
  props: {
    active: { type: Number, required: true },
    title: { type: String, default: 'Untitled' },
    description: { type: String, default: null },
    animationType: { type: String, default: null }, // null,shuffle
    animationSpeed: { type: Number, default: 40 }, // shuffle(fps)
    position: { type: Array, default: [] }, // [left,top]
    scale: { type: Number, default: 100 },
  },
  setup(props)
  {
    const elementTitle = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    const elementDescription = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      computedRealText: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        switch (props.animationType)
        {
          case 'shuffle':
            return false;
          default:
            return true;
        }
      }),
    });
    let interval = undefined;

    // methods
    function playTransition(type)
    {
      switch (type)
      {
        case 'shuffle':
          clearTimer();
          if (elementDescription.value.dataset.id)
          {
            clearInterval(Number(elementDescription.value.dataset.id));
            elementDescription.value.innerText = '';
          }
          if (props.title)
          {
            libs_shuffle(elementTitle.value, {
              text: props.title,
              fps: props.animationSpeed,
              randomTextType: 'pattern',
            });
          }
          if (props.description)
          {
            interval = setTimeout(() => {
              clearTimer();
              libs_shuffle(elementDescription.value, {
                text: props.description,
                fps: props.animationSpeed,
              });
            }, 300);
          }
          break;
      }
    }
    function clearTimer()
    {
      if (!interval) return;
      clearTimeout(interval);
      interval = undefined;
    }

    // switch animation type
    switch (props.animationType)
    {
      case 'shuffle':
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => setTimeout(() => playTransition('shuffle'), 100));
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => props.active, () => playTransition('shuffle'));
        break;
    }

    return {
      state,
      elementTitle,
      elementDescription,
    };
  },
}));

// CONCATENATED MODULE: ./src/components/Slides/Caption.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Slides/Caption.scss?vue&type=style&index=0&id=2910e7b0&lang=scss&scoped=true
var Captionvue_type_style_index_0_id_2910e7b0_lang_scss_scoped_true = __webpack_require__("90f7");

// CONCATENATED MODULE: ./src/components/Slides/Caption.vue







const Caption_exports_ = /*#__PURE__*/exportHelper_default()(Captionvue_type_script_lang_js, [['render',Captionvue_type_template_id_2910e7b0_scoped_true_render],['__scopeId',"data-v-2910e7b0"]])

/* harmony default export */ var Caption = (Caption_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Paginate.vue?vue&type=template&id=7f958ec6&scoped=true


const Paginatevue_type_template_id_7f958ec6_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-7f958ec6"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Paginatevue_type_template_id_7f958ec6_scoped_true_hoisted_1 = { class: "slideshow-paginate" }

function Paginatevue_type_template_id_7f958ec6_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("em", Paginatevue_type_template_id_7f958ec6_scoped_true_hoisted_1, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.current + 1) + " / " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.total), 1))
}
// CONCATENATED MODULE: ./src/components/Slides/Paginate.vue?vue&type=template&id=7f958ec6&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Paginate.vue?vue&type=script&lang=js



/* harmony default export */ var Paginatevue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'SlidePaginate',
  props: {
    total: { type: Number, default: 0 },
    current: { type: Number, default: 0 },
  },
}));

// CONCATENATED MODULE: ./src/components/Slides/Paginate.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Slides/Paginate.vue?vue&type=style&index=0&id=7f958ec6&lang=scss&scoped=true
var Paginatevue_type_style_index_0_id_7f958ec6_lang_scss_scoped_true = __webpack_require__("f270");

// CONCATENATED MODULE: ./src/components/Slides/Paginate.vue







const Paginate_exports_ = /*#__PURE__*/exportHelper_default()(Paginatevue_type_script_lang_js, [['render',Paginatevue_type_template_id_7f958ec6_scoped_true_render],['__scopeId',"data-v-7f958ec6"]])

/* harmony default export */ var Paginate = (Paginate_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Controller.vue?vue&type=template&id=16c50d3d&scoped=true


const Controllervue_type_template_id_16c50d3d_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-16c50d3d"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Controllervue_type_template_id_16c50d3d_scoped_true_hoisted_1 = { class: "controller" }
const Controllervue_type_template_id_16c50d3d_scoped_true_hoisted_2 = ["disabled", "title"]
const Controllervue_type_template_id_16c50d3d_scoped_true_hoisted_3 = ["disabled", "title"]

function Controllervue_type_template_id_16c50d3d_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("nav", Controllervue_type_template_id_16c50d3d_scoped_true_hoisted_1, [
    (_ctx.showPrev)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
          key: 0,
          type: "button",
          disabled: _ctx.disabled,
          title: _ctx.$t('label.prevSlide'),
          class: "prev",
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('click-prev')))
        }, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "arrow-left" })
        ], 8, Controllervue_type_template_id_16c50d3d_scoped_true_hoisted_2))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
    (_ctx.showNext)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
          key: 1,
          type: "button",
          disabled: _ctx.disabled,
          title: _ctx.$t('label.nextSlide'),
          class: "next",
          onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('click-next')))
        }, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "arrow-right" })
        ], 8, Controllervue_type_template_id_16c50d3d_scoped_true_hoisted_3))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
  ]))
}
// CONCATENATED MODULE: ./src/components/Slides/Controller.vue?vue&type=template&id=16c50d3d&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Controller.vue?vue&type=script&lang=js




/* harmony default export */ var Controllervue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'SlidesController',
  components: {
    Icon: Icon["a" /* default */],
  },
  props: {
    showPrev: { type: Boolean, default: true },
    showNext: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    'click-prev': null,
    'click-next': null,
  },
}));

// CONCATENATED MODULE: ./src/components/Slides/Controller.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Slides/Controller.scss?vue&type=style&index=0&id=16c50d3d&lang=scss&scoped=true
var Controllervue_type_style_index_0_id_16c50d3d_lang_scss_scoped_true = __webpack_require__("42e6");

// CONCATENATED MODULE: ./src/components/Slides/Controller.vue







const Controller_exports_ = /*#__PURE__*/exportHelper_default()(Controllervue_type_script_lang_js, [['render',Controllervue_type_template_id_16c50d3d_scoped_true_render],['__scopeId',"data-v-16c50d3d"]])

/* harmony default export */ var Controller = (Controller_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/index.vue?vue&type=script&lang=js









/* harmony default export */ var Slidesvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'Slides',
  components: {
    Images: Images,
    Caption: Caption,
    Paginate: Paginate,
    Controller: Controller,
  },
  setup()
  {
    const store = Object(vuex_esm_browser["b" /* useStore */])();
    const images = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      animated: false,
      swipePos: undefined,
      swipeMove: false,
      computedImages: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return store.state.slides.map(item => (item));
      }),
      computedShowPrevButton: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        if (store.state.preference.slides.loop) return true;
        return 0 < store.state.activeSlide;
      }),
      computedShowNextButton: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        if (store.state.preference.slides.loop) return true;
        return state.computedImages.length - 1 > store.state.activeSlide;
      }),
      computedCaption: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        const item = state.computedImages[store.state.activeSlide];
        return {
          title: item.title,
          description: item.description,
        };
      }),
      computedVisibleCaption: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        const { hud, visibleHudContents } = store.state.preference.general;
        return hud && visibleHudContents.caption;
      }),
      computedVisibleController: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        const { hud, visibleHudContents } = store.state.preference.general;
        if (state.computedImages.length <= 1) return false;
        return hud && visibleHudContents.controller;
      }),
      computedVisiblePaginate: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        const { hud, visibleHudContents } = store.state.preference.general;
        return hud && visibleHudContents.paginate;
      }),
    });
    let computes = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      transitionType: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        switch (store.state.preference.slides.animationType)
        {
          case 'fade':
          case 'horizontal':
            return store.state.preference.slides.animationType;
          default:
            return 'none';
        }
      }),
    });
    let swipeMeta = null; // 슬라이드를 스와이프할때 필요한 정보들을 담는다.
    let autoplayTimer = undefined; // 오토플레이 `setTimeout` 값을 담는데 사용된다.
    let autoplayPause = false; // 오토플레이 일시정지할때 사용하는 결정적인 값
    let mounted = false;
    let touched = false;

    // check active number
    let active = store.state.preference.slides.initialNumber;
    onChangeActive(!!checkActive(active) ? active : 0);

    // methods
    function onAnimationControl(sw)
    {
      state.animated = sw;
      if (!sw)
      {
        // with autoplay
        let autoplay = store.state.autoplay && !autoplayPause;
        if (autoplay) runAutoplay(true);
      }
    }
    function onChangeActive(n)
    {
      store.dispatch('changeActiveSlide', n);
    }
    function checkActive(n)
    {
      return !!state.computedImages[n];
    }
    function onStart(e)
    {
      e.stopPropagation();
      if (e.touches) touched = true;
      if (!e.touches && touched) return;
      if (e.touches && e.touches.length > 1) e.preventDefault();
      if (state.animated) return;
      if (!store.state.preference.slides.swipe) return;
      if (store.state.preference.slides.animationType !== 'horizontal') return;
      if (state.computedImages.length <= 2) return;
      runAutoplay(false);
      swipeMeta = {
        dist: 0,
        startX: (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX),
        startTime: new Date().getTime(),
      };
      state.swipeMove = true;
    }
    function onMove(e)
    {
      e.stopPropagation();
      if (!e.touches && touched) return;
      if (state.animated || !state.swipeMove) return;
      if (state.computedImages.length <= 2) return;
      swipeMeta.moveX = (e.touches && e.touches[0]) ? Math.floor(e.touches[0].clientX) : (e.clientX || e.pageX);
      const screenWidth = window.innerWidth;
      const dist = swipeMeta.moveX - swipeMeta.startX;
      state.swipePos = (dist / screenWidth * 100) + (0 - (100 * store.state.activeSlide));
    }
    function onEnd(e)
    {
      e.stopPropagation();

      function action(dir)
      {
        if (dir) next();
        else prev();
      }
      function cancel()
      {
        images.value.cancel();
      }

      if (!e.touches && touched) return;
      if (state.animated || !state.swipeMove) return;
      if (e.touches && e.touches.length > 0) return;
      if (state.computedImages.length <= 2) return;

      const screenWidth = window.innerWidth;
      swipeMeta.endX = (e.changedTouches && e.changedTouches[0]) ? Math.floor(e.changedTouches[0].clientX) : (e.clientX || e.pageX);
      let dir = swipeMeta.startX > swipeMeta.endX; // next is true
      let elapsedTime = new Date().getTime() - swipeMeta.startTime;
      let distPos = swipeMeta.endX - swipeMeta.startX;
      let percent = Math.abs(distPos) / screenWidth * 100;

      // unset values
      state.swipePos = undefined;
      state.swipeMove = false;
      swipeMeta = undefined;

      // 클릭하는 수준으로 짧으면 정지
      if (elapsedTime < 60 || percent < 1)
      {
        if (!autoplayPause) runAutoplay(true);
        // toggle hud
        if (store.state.preference.general.clickVisibleHud && !e.target.closest('.controller'))
        {
          store.dispatch('changeHud');
        }
        return;
      }

      // play
      if (elapsedTime > 300)
      {
        // long touch
        if (percent > 30) action(dir);
        else cancel();
      }
      else
      {
        // short touch
        if (percent > 5) action(dir);
        else cancel();
      }
    }
    function onTouchCancel(e)
    {
      if (store.state.mode) return;
      e.stopPropagation();
      if (state.swipeMove) images.value.cancel();
      state.swipePos = undefined;
      state.swipeMove = false;
      if (store.state.preference.slides.autoplayPauseOnHover)
      {
        autoplayPause = false;
        if (store.state.autoplay) pause(false, true);
      }
    }
    function onMouseEnter()
    {
      if (store.state.preference.slides.autoplayPauseOnHover)
      {
        autoplayPause = true;
        if (store.state.autoplay) pause(true, true);
      }
    }
    function onContextMenu()
    {
      state.swipePos = undefined;
      state.swipeMove = false;
    }
    function runAutoplay(sw)
    {
      if (!mounted) return;
      if (sw && !store.state.autoplay) return;
      if (sw && !autoplayTimer)
      {
        if (!store.state.autoplay) return;
        const delay = store.state.preference.slides.autoplayDelay;
        const dir = store.state.preference.slides.autoplayDirection;
        const loop = store.state.preference.slides.loop;
        const side = isActiveSide(dir);
        if (!loop && (!loop && side)) return;
        autoplayTimer = setTimeout(() => {
          if (!dir) prev();
          else next();
        }, delay);
      }
      else if (autoplayTimer)
      {
        clearTimeout(autoplayTimer);
        autoplayTimer = undefined;
      }
    }
    function isActiveSide(dir)
    {
      if (!(state.computedImages && state.computedImages.length > 0)) return;
      return (!dir && store.state.activeSlide === 0) ||
        (dir && store.state.activeSlide >= state.computedImages.length - 1);
    }
    // public methods
    function change(n, userAnimationType = undefined)
    {
      if (state.animated || !checkActive(n) || !images.value) return;
      onChangeActive(n);
      runAutoplay(false);
      images.value.play(n, userAnimationType);
    }
    function prev()
    {
      if (!(state.computedImages && state.computedImages.length > 0)) return;
      let n = move(
        state.computedImages.length,
        store.state.activeSlide - 1,
        store.state.preference.slides.loop
      );
      change(n);
    }
    function next()
    {
      if (!(state.computedImages && state.computedImages.length > 0)) return;
      let n = move(
        state.computedImages.length,
        store.state.activeSlide + 1,
        store.state.preference.slides.loop
      );
      change(n);
    }
    function autoplay(sw = undefined)
    {
      store.dispatch('changeAutoplay', sw);
    }
    function pause(sw = undefined, inside = false)
    {
      if (sw === undefined) return;
      if (!store.state.autoplay) return;
      if (!inside) autoplayPause = sw;
      if (!sw || (sw && !state.animated)) runAutoplay(!sw);
    }

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      mounted = true;
      if (store.state.autoplay) runAutoplay(true);
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(() => {
      mounted = false;
      if (autoplayTimer)
      {
        clearTimeout(autoplayTimer);
        autoplayTimer = undefined;
      }
    });

    // watch
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => store.state.autoplay, sw => {
      if (sw)
      {
        if (!autoplayPause) runAutoplay(sw);
      }
      else
      {
        runAutoplay(sw);
      }
    });

    return {
      state,
      computes,
      images,
      // methods
      onAnimationControl,
      onChangeActive,
      onStart,
      onMove,
      onEnd,
      onTouchCancel,
      onMouseEnter,
      onContextMenu,
      // public methods
      change,
      prev,
      next,
      autoplay,
      pause,
    };
  },
}));

// CONCATENATED MODULE: ./src/components/Slides/index.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Slides/index.scss?vue&type=style&index=0&lang=scss
var Slidesvue_type_style_index_0_lang_scss = __webpack_require__("31fc");

// CONCATENATED MODULE: ./src/components/Slides/index.vue







const Slides_exports_ = /*#__PURE__*/exportHelper_default()(Slidesvue_type_script_lang_js, [['render',Slidesvue_type_template_id_4da3ec4c_render]])

/* harmony default export */ var Slides = (Slides_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Empty.vue?vue&type=template&id=0f5cd62a&scoped=true


const Emptyvue_type_template_id_0f5cd62a_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-0f5cd62a"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Emptyvue_type_template_id_0f5cd62a_scoped_true_hoisted_1 = { class: "empty__wrap" }
const Emptyvue_type_template_id_0f5cd62a_scoped_true_hoisted_2 = { class: "empty__title" }
const Emptyvue_type_template_id_0f5cd62a_scoped_true_hoisted_3 = { class: "empty__description" }

function Emptyvue_type_template_id_0f5cd62a_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("article", {
    class: "empty",
    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onClickWrapper && _ctx.onClickWrapper(...args)))
  }, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Emptyvue_type_template_id_0f5cd62a_scoped_true_hoisted_1, [
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, {
        "icon-name": "frown",
        class: "empty__icon"
      }),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", Emptyvue_type_template_id_0f5cd62a_scoped_true_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.title || _ctx.$t('title.emptySlide')), 1),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", Emptyvue_type_template_id_0f5cd62a_scoped_true_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.description || _ctx.$t('description.addSlides')), 1)
    ])
  ]))
}
// CONCATENATED MODULE: ./src/components/Slides/Empty.vue?vue&type=template&id=0f5cd62a&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Slides/Empty.vue?vue&type=script&lang=js





/* harmony default export */ var Emptyvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'SlidesEmpty',
  components: {
    Icon: Icon["a" /* default */],
  },
  props: {
    title: String,
    description: String,
  },
  setup()
  {
    const store = Object(vuex_esm_browser["b" /* useStore */])();

    // methods
    function onClickWrapper(e)
    {
      if (store.state.preference.general.clickVisibleHud)
      {
        store.dispatch('changeHud');
      }
    }

    return {
      onClickWrapper,
    };
  },
}));

// CONCATENATED MODULE: ./src/components/Slides/Empty.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Slides/Empty.scss?vue&type=style&index=0&id=0f5cd62a&lang=scss&scoped=true
var Emptyvue_type_style_index_0_id_0f5cd62a_lang_scss_scoped_true = __webpack_require__("8ac5");

// CONCATENATED MODULE: ./src/components/Slides/Empty.vue







const Empty_exports_ = /*#__PURE__*/exportHelper_default()(Emptyvue_type_script_lang_js, [['render',Emptyvue_type_template_id_0f5cd62a_scoped_true_render],['__scopeId',"data-v-0f5cd62a"]])

/* harmony default export */ var Empty = (Empty_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Navigation/index.vue?vue&type=template&id=b916fef2&scoped=true


const Navigationvue_type_template_id_b916fef2_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-b916fef2"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_1 = {
  key: 0,
  class: "slideshow-navigation__item"
}
const Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_2 = ["title"]
const Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_3 = {
  key: 1,
  class: "slideshow-navigation__item"
}
const Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_4 = ["title"]
const Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_5 = {
  key: 2,
  class: "slideshow-navigation__item"
}
const Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_6 = ["title"]
const Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_7 = { key: 0 }

function Navigationvue_type_template_id_b916fef2_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("nav", {
    class: "slideshow-navigation",
    onTouchstart: _cache[6] || (_cache[6] = (...args) => (_ctx.onTouchStart && _ctx.onTouchStart(...args))),
    onClick: _cache[7] || (_cache[7] = (...args) => (_ctx.onClickWrapper && _ctx.onClickWrapper(...args)))
  }, [
    (_ctx.computes.visibleAutoplay)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_1, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
            type: "button",
            title: _ctx.$t('base.autoplay'),
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.$store.state.autoplay ? 'active' : ''),
            onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onClickAutoplayButton && _ctx.onClickAutoplayButton(...args)))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "play-circle" })
          ], 10, Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_2)
        ]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
    (_ctx.computes.visibleGroup)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_3, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
            type: "button",
            title: _ctx.$t('base.group'),
            onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClickGroup && _ctx.onClickGroup(...args)))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, {
              "icon-name": "folder",
              class: "folder"
            })
          ], 8, Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_4)
        ]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
    (_ctx.$store.state.preference.general.visibleHudContents.menu)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_5, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
            type: "button",
            title: _ctx.$t('base.menu'),
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.state.activeMenu ? 'on' : ''),
            onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.onClickMenuButton && _ctx.onClickMenuButton(...args)))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "menu" })
          ], 10, Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_6),
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
            class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([
        'slideshow-navigation-context',
        _ctx.state.activeMenu && 'slideshow-navigation-context--on',
      ])
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", null, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [
                Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
                  type: "button",
                  onClick: _cache[3] || (_cache[3] = $event => (_ctx.onClickContextItem('preference')))
                }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.preference')), 1)
              ]),
              (_ctx.computes.visibleThumbnail)
                ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", Navigationvue_type_template_id_b916fef2_scoped_true_hoisted_7, [
                    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
                      type: "button",
                      onClick: _cache[4] || (_cache[4] = $event => (_ctx.onClickContextItem('thumbnail')))
                    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('title.thumbnailView')), 1)
                  ]))
                : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [
                Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
                  type: "button",
                  class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([ _ctx.state.activeFullscreen && 'on' ]),
                  onClick: _cache[5] || (_cache[5] = $event => (_ctx.onClickContextItem('fullscreen')))
                }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.fullscreen')), 3)
              ])
            ])
          ], 2)
        ]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
  ], 32))
}
// CONCATENATED MODULE: ./src/screen/Navigation/index.vue?vue&type=template&id=b916fef2&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Navigation/index.vue?vue&type=script&lang=js







/* harmony default export */ var Navigationvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'Navigation',
  components: {
    Icon: Icon["a" /* default */],
  },
  setup()
  {
    const store = Object(vuex_esm_browser["b" /* useStore */])();
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      activeMenu: false,
      activeFullscreen: false,
    });
    let computes = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      visibleThumbnail: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return store.state.slides && store.state.slides.length > 1;
      }),
      visibleAutoplay: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        const { slides, preference } = store.state;
        if (!preference.slides.autoplay) return false;
        return slides && slides.length > 0;
      }),
      visibleGroup: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        if (!store.state.preference.general.visibleHudContents.group) return false;
        return store.state.tree && Object.keys(store.state.tree).length > 1;
      }),
    });

    // private methods
    function onClickAutoplayButton()
    {
      if (local["d" /* slides */]) local["d" /* slides */].autoplay();
    }
    function onClickMenuButton(e)
    {
      if (e) e.stopPropagation();
      if (state.activeMenu)
      {
        switchActiveMenu(false);
      }
      else
      {
        window.on('click.navigationMenu', () => switchActiveMenu(false));
        switchActiveMenu(true);
      }
    }
    function switchActiveMenu(sw)
    {
      state.activeMenu = sw;
      if (!sw) window.off('click.navigationMenu');
    }
    function onClickContextItem(key)
    {
      switchActiveMenu(false);
      switch (key)
      {
        case 'preference':
          store.dispatch('changeMode', 'preference');
          break;
        case 'thumbnail':
          store.dispatch('changeMode', 'thumbnail');
          break;
        case 'fullscreen':
          util["a" /* fullscreen */](!state.activeFullscreen);
          state.activeFullscreen = !state.activeFullscreen;
          break;
      }
    }
    function onTouchStart(e)
    {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }
    function onClickWrapper(e)
    {
      e.stopPropagation();
    }
    function onClickGroup()
    {
      store.dispatch('changeMode', 'group');
    }

    // public methods
    function blur()
    {
      switchActiveMenu(false);
    }

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      document.on('fullscreenchange.slideshow', () => {
        state.activeFullscreen = !!document.fullscreenElement;
      });
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(() => {
      document.off('fullscreenchange.slideshow');
    });

    return {
      state,
      computes,
      onClickAutoplayButton,
      onClickMenuButton,
      onClickContextItem,
      onTouchStart,
      onClickWrapper,
      onClickGroup,
      blur,
    };
  },
}));

// CONCATENATED MODULE: ./src/screen/Navigation/index.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Navigation/index.scss?vue&type=style&index=0&id=b916fef2&lang=scss&scoped=true
var Navigationvue_type_style_index_0_id_b916fef2_lang_scss_scoped_true = __webpack_require__("8f63");

// CONCATENATED MODULE: ./src/screen/Navigation/index.vue







const Navigation_exports_ = /*#__PURE__*/exportHelper_default()(Navigationvue_type_script_lang_js, [['render',Navigationvue_type_template_id_b916fef2_scoped_true_render],['__scopeId',"data-v-b916fef2"]])

/* harmony default export */ var Navigation = (Navigation_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Preference/index.vue?vue&type=template&id=5614762c&scoped=true


const Preferencevue_type_template_id_5614762c_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-5614762c"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Preferencevue_type_template_id_5614762c_scoped_true_hoisted_1 = { class: "preference-header" }
const Preferencevue_type_template_id_5614762c_scoped_true_hoisted_2 = { class: "preference-header__body" }
const Preferencevue_type_template_id_5614762c_scoped_true_hoisted_3 = { class: "preference-header__nav" }
const Preferencevue_type_template_id_5614762c_scoped_true_hoisted_4 = ["title"]
const Preferencevue_type_template_id_5614762c_scoped_true_hoisted_5 = ["title"]
const Preferencevue_type_template_id_5614762c_scoped_true_hoisted_6 = {
  ref: "content",
  class: "preference__content"
}

function Preferencevue_type_template_id_5614762c_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Side = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Side")
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("article", {
    class: "preference",
    onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.onClose && _ctx.onClose(...args))),
    onTouchstart: _cache[5] || (_cache[5] = (...args) => (_ctx.onTouchStart && _ctx.onTouchStart(...args)))
  }, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      class: "preference__wrap",
      onClick: _cache[3] || (_cache[3] = e => { e.stopPropagation() })
    }, [
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Side, {
        mode: _ctx.state.tab,
        onClickMenu: _ctx.onChangeTab
      }, null, 8, ["mode", "onClickMenu"]),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        class: "preference__body",
        onSubmit: _cache[2] || (_cache[2] = (...args) => (_ctx.onSubmit && _ctx.onSubmit(...args)))
      }, [
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("header", Preferencevue_type_template_id_5614762c_scoped_true_hoisted_1, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Preferencevue_type_template_id_5614762c_scoped_true_hoisted_2, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.state.computedHeaderContent.title), 1),
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.state.computedHeaderContent.description), 1)
          ]),
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("nav", Preferencevue_type_template_id_5614762c_scoped_true_hoisted_3, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
              type: "submit",
              title: _ctx.$t('base.apply'),
              onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onSubmit && _ctx.onSubmit(...args)))
            }, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "check" })
            ], 8, Preferencevue_type_template_id_5614762c_scoped_true_hoisted_4),
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
              type: "button",
              title: _ctx.$t('base.close'),
              onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClose && _ctx.onClose(...args)))
            }, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "x" })
            ], 8, Preferencevue_type_template_id_5614762c_scoped_true_hoisted_5)
          ])
        ]),
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Preferencevue_type_template_id_5614762c_scoped_true_hoisted_6, [
          (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])(_ctx.state.computedContentComponent), {
            structure: _ctx.state.structure[_ctx.state.tab],
            onUpdate: _ctx.onUpdateFields
          }, null, 8, ["structure", "onUpdate"]))
        ], 512)
      ], 32)
    ])
  ], 32))
}
// CONCATENATED MODULE: ./src/screen/Preference/index.vue?vue&type=template&id=5614762c&scoped=true

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Preference/Side.vue?vue&type=template&id=2c12f259&scoped=true


const Sidevue_type_template_id_2c12f259_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-2c12f259"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Sidevue_type_template_id_2c12f259_scoped_true_hoisted_1 = { class: "preference-side" }
const Sidevue_type_template_id_2c12f259_scoped_true_hoisted_2 = ["title", "disabled"]
const Sidevue_type_template_id_2c12f259_scoped_true_hoisted_3 = ["title", "disabled"]
const Sidevue_type_template_id_2c12f259_scoped_true_hoisted_4 = ["title", "disabled"]
const Sidevue_type_template_id_2c12f259_scoped_true_hoisted_5 = ["title", "disabled"]
const Sidevue_type_template_id_2c12f259_scoped_true_hoisted_6 = ["title", "disabled"]
const Sidevue_type_template_id_2c12f259_scoped_true_hoisted_7 = ["title", "disabled"]

function Sidevue_type_template_id_2c12f259_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("aside", Sidevue_type_template_id_2c12f259_scoped_true_hoisted_1, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("nav", null, [
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
        type: "button",
        title: _ctx.$t('base.general'),
        disabled: _ctx.mode === 'general',
        class: "preference-side__button",
        onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('click-menu', 'general')))
      }, [
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "tool" }),
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("em", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.general')), 1)
        ])
      ], 8, Sidevue_type_template_id_2c12f259_scoped_true_hoisted_2),
      (_ctx.$store.state.usePreference.slides)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
            key: 0,
            type: "button",
            title: _ctx.$t('base.slides'),
            disabled: _ctx.mode === 'slides',
            class: "preference-side__button",
            onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('click-menu', 'slides')))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "copy" }),
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("em", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.slides')), 1)
            ])
          ], 8, Sidevue_type_template_id_2c12f259_scoped_true_hoisted_3))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
      (_ctx.$store.state.usePreference.style)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
            key: 1,
            type: "button",
            title: _ctx.$t('base.style'),
            disabled: _ctx.mode === 'style',
            class: "preference-side__button",
            onClick: _cache[2] || (_cache[2] = $event => (_ctx.$emit('click-menu', 'style')))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "droplet" }),
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("em", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.style')), 1)
            ])
          ], 8, Sidevue_type_template_id_2c12f259_scoped_true_hoisted_4))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
      (_ctx.$store.state.usePreference.data)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
            key: 2,
            type: "button",
            title: _ctx.$t('base.data'),
            disabled: _ctx.mode === 'data',
            class: "preference-side__button",
            onClick: _cache[3] || (_cache[3] = $event => (_ctx.$emit('click-menu', 'data')))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "database" }),
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("em", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.data')), 1)
            ])
          ], 8, Sidevue_type_template_id_2c12f259_scoped_true_hoisted_5))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
      (_ctx.$store.state.usePreference.keyboard)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
            key: 3,
            type: "button",
            title: _ctx.$t('base.keyboard'),
            disabled: _ctx.mode === 'keyboard',
            class: "preference-side__button",
            onClick: _cache[4] || (_cache[4] = $event => (_ctx.$emit('click-menu', 'keyboard')))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "command" }),
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("em", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.keyboard')), 1)
            ])
          ], 8, Sidevue_type_template_id_2c12f259_scoped_true_hoisted_6))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
      (_ctx.$store.state.usePreference.information)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
            key: 4,
            type: "button",
            title: _ctx.$t('base.information'),
            disabled: _ctx.mode === 'information',
            class: "preference-side__button",
            onClick: _cache[5] || (_cache[5] = $event => (_ctx.$emit('click-menu', 'information')))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "info" }),
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("em", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.information')), 1)
            ])
          ], 8, Sidevue_type_template_id_2c12f259_scoped_true_hoisted_7))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
    ])
  ]))
}
// CONCATENATED MODULE: ./src/screen/Preference/Side.vue?vue&type=template&id=2c12f259&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Preference/Side.vue?vue&type=script&lang=js




/* harmony default export */ var Sidevue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'preference-side',
  components: {
    Icon: Icon["a" /* default */],
  },
  props: {
    mode: { type: String, required: true },
  },
}));

// CONCATENATED MODULE: ./src/screen/Preference/Side.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Preference/Side.scss?vue&type=style&index=0&id=2c12f259&lang=scss&scoped=true
var Sidevue_type_style_index_0_id_2c12f259_lang_scss_scoped_true = __webpack_require__("1802");

// CONCATENATED MODULE: ./src/screen/Preference/Side.vue







const Side_exports_ = /*#__PURE__*/exportHelper_default()(Sidevue_type_script_lang_js, [['render',Sidevue_type_template_id_2c12f259_scoped_true_render],['__scopeId',"data-v-2c12f259"]])

/* harmony default export */ var Side = (Side_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Preference/index.vue?vue&type=script&lang=js









/* harmony default export */ var Preferencevue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'preference',
  components: {
    Icon: Icon["a" /* default */],
    Side: Side,
  },
  setup()
  {
    const store = Object(vuex_esm_browser["b" /* useStore */])();
    const { t } = Object(vue_i18n["useI18n"])({ useScope: 'global' });
    const preference = Object(object["d" /* convertPureObject */])(store.state.preference);
    const tree = Object(object["d" /* convertPureObject */])(store.state.tree);
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      tab: 'general', // general,slides,style,data,keyboard,information
      structure: {
        general: preference.general,
        slides: preference.slides,
        style: preference.style,
        data: { tree },
        keyboard: preference.keyboard,
      },
      computedContentComponent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        switch (state.tab)
        {
          case 'general':
          default:
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, "86ce")));
          case 'slides':
            if (!store.state.usePreference.slides) return;
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, "6195")));
          case 'style':
            if (!store.state.usePreference.style) return;
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(null, "f45a")));
          case 'data':
            if (!store.state.usePreference.data) return;
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "3280")));
          case 'keyboard':
            if (!store.state.usePreference.keyboard) return;
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(null, "606f")));
          case 'information':
            if (!store.state.usePreference.information) return;
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineAsyncComponent"])(() => __webpack_require__.e(/* import() */ 6).then(__webpack_require__.bind(null, "8d68")));
        }
      }),
      computedHeaderContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        switch (state.tab)
        {
          case 'general':
          default:
            return {
              title: t('base.general'),
              description: t('preference.header.general'),
            };
          case 'slides':
            return {
              title: t('base.slides'),
              description: t('preference.header.slides'),
            }
          case 'style':
            return {
              title: t('base.style'),
              description: t('preference.header.style'),
            };
          case 'data':
            return {
              title: t('base.data'),
              description: t('preference.header.data'),
            };
          case 'keyboard':
            return {
              title: t('base.keyboard'),
              description: t('preference.header.keyboard'),
            };
          case 'information':
            return {
              title: t('base.information'),
              description: t('preference.header.information'),
            };
        }
      }),
    });
    const content = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);

    // methods
    function onTouchStart(e)
    {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }
    function onClose()
    {
      store.dispatch('changeMode', null);
    }
    function onChangeTab(name)
    {
      state.tab = name;
    }
    function onUpdateFields(structure)
    {
      state.structure[state.tab] = structure;
    }
    function onSubmit(e)
    {
      e.preventDefault();
      if (!confirm(t('confirm.applyRestart'))) return;
      try
      {
        let tree = Object(object["d" /* convertPureObject */])(state.structure.data.tree);
        Object(object["c" /* checkTree */])(tree);
        let preference = {
          general: Object(object["d" /* convertPureObject */])(state.structure.general),
          slides: Object(object["d" /* convertPureObject */])(state.structure.slides),
          style: Object(object["d" /* convertPureObject */])(state.structure.style),
          keyboard: Object(object["d" /* convertPureObject */])(state.structure.keyboard),
        };
        if (!Object(object["a" /* checkPreference */])(preference)) throw new Error('Bad preference data.');

        // update store
        store.dispatch('changePreference', preference);
        store.dispatch('changeMode', null);
        store.dispatch('changeActiveSlide', store.state.preference.slides.initialNumber);
        store.dispatch('changeAutoplay', false);
        store.commit('updateUseKeyboardEvent', true);
        store.dispatch('changeTree', tree);
        // check and update group
        if (!Object.keys(tree).filter(key => (key === store.state.group)).length)
        {
          store.dispatch('changeGroup', Object.keys(tree)[0]);
        }

        // update or restart
        if (local["e" /* useProps */].preference || local["e" /* useProps */].tree)
        {
          local["a" /* main */].update('preference');
          local["a" /* main */].update('tree');
        }
        else
        {
          local["a" /* main */].restart().then();
        }
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        alert(t('alert.failedApply'));
      }
    }

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      if (local["d" /* slides */]) local["d" /* slides */].pause(true);
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(() => {
      if (local["d" /* slides */]) local["d" /* slides */].pause(false);
    });

    // watch
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => state.tab, () => content.value.scrollTo(0, 0));

    return {
      state,
      content,
      onTouchStart,
      onClose,
      onChangeTab,
      onSubmit,
      onUpdateFields,
    };
  },
}));

// CONCATENATED MODULE: ./src/screen/Preference/index.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Preference/index.scss?vue&type=style&index=0&id=5614762c&lang=scss&scoped=true
var Preferencevue_type_style_index_0_id_5614762c_lang_scss_scoped_true = __webpack_require__("0c15");

// CONCATENATED MODULE: ./src/screen/Preference/index.vue







const Preference_exports_ = /*#__PURE__*/exportHelper_default()(Preferencevue_type_script_lang_js, [['render',Preferencevue_type_template_id_5614762c_scoped_true_render],['__scopeId',"data-v-5614762c"]])

/* harmony default export */ var Preference = (Preference_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Group/index.vue?vue&type=template&id=40c5a429&scoped=true


const Groupvue_type_template_id_40c5a429_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-40c5a429"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Groupvue_type_template_id_40c5a429_scoped_true_hoisted_1 = { class: "groups-header" }
const Groupvue_type_template_id_40c5a429_scoped_true_hoisted_2 = { class: "groups-header__body" }
const Groupvue_type_template_id_40c5a429_scoped_true_hoisted_3 = { class: "groups-header__nav" }
const Groupvue_type_template_id_40c5a429_scoped_true_hoisted_4 = ["title"]
const Groupvue_type_template_id_40c5a429_scoped_true_hoisted_5 = { class: "groups__body" }
const Groupvue_type_template_id_40c5a429_scoped_true_hoisted_6 = { class: "groups-index" }

function Groupvue_type_template_id_40c5a429_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")
  const _component_Item = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Item")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("article", {
    class: "groups",
    onTouchstart: _cache[2] || (_cache[2] = (...args) => (_ctx.onTouchStart && _ctx.onTouchStart(...args))),
    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.onClose && _ctx.onClose(...args)))
  }, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      class: "groups__wrap",
      onClick: _cache[1] || (_cache[1] = e => { e.stopPropagation() })
    }, [
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("header", Groupvue_type_template_id_40c5a429_scoped_true_hoisted_1, [
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Groupvue_type_template_id_40c5a429_scoped_true_hoisted_2, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('title.selectGroup')), 1),
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('description.selectGroup')), 1)
        ]),
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("nav", Groupvue_type_template_id_40c5a429_scoped_true_hoisted_3, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
            type: "button",
            title: _ctx.$t('base.close'),
            onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.onClose && _ctx.onClose(...args)))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "x" })
          ], 8, Groupvue_type_template_id_40c5a429_scoped_true_hoisted_4)
        ])
      ]),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Groupvue_type_template_id_40c5a429_scoped_true_hoisted_5, [
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", Groupvue_type_template_id_40c5a429_scoped_true_hoisted_6, [
          (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.computes.index, (item) => {
            return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", null, [
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Item, {
                key: item.key,
                src: item.src,
                name: item.name,
                description: item.description,
                count: item.count,
                selected: item.selected,
                onSelect: $event => (_ctx.onSelectSlide(item.key))
              }, null, 8, ["src", "name", "description", "count", "selected", "onSelect"])
            ]))
          }), 256))
        ])
      ])
    ])
  ], 32))
}
// CONCATENATED MODULE: ./src/screen/Group/index.vue?vue&type=template&id=40c5a429&scoped=true

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Group/Item.vue?vue&type=template&id=0eb9918c&scoped=true


const Itemvue_type_template_id_0eb9918c_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-0eb9918c"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_1 = { class: "group-item__image" }
const Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_2 = ["disabled"]
const Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_3 = ["src", "alt"]
const Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_4 = { class: "group-item__body" }
const Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_5 = {
  key: 0,
  class: "group-item__meta"
}
const Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_6 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("Count: ")
const Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_7 = {
  key: 0,
  class: "group-item__nav"
}

function Itemvue_type_template_id_0eb9918c_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([
  'group-item',
  _ctx.selected && 'group-item--selected'
])
  }, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("figure", Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_1, [
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
        type: "button",
        disabled: _ctx.selected,
        onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('select')))
      }, [
        (_ctx.src)
          ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
              key: 0,
              src: _ctx.src,
              alt: _ctx.name
            }, null, 8, Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_3))
          : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Icon, {
              key: 1,
              "icon-name": "x"
            }))
      ], 8, Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_2)
    ]),
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_4, [
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", {
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([ !_ctx.name && 'none' ])
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.name ? _ctx.name : 'None'), 3),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.description), 1),
      (_ctx.count !== undefined)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_5, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [
              Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_6,
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("b", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.count), 1)
            ])
          ]))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
    ]),
    (!_ctx.selected)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("nav", Itemvue_type_template_id_0eb9918c_scoped_true_hoisted_7, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
            type: "button",
            onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('select')))
          }, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "check" })
          ])
        ]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
  ], 2))
}
// CONCATENATED MODULE: ./src/screen/Group/Item.vue?vue&type=template&id=0eb9918c&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Group/Item.vue?vue&type=script&lang=js




/* harmony default export */ var Itemvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'GroupItem',
  components: {
    Icon: Icon["a" /* default */],
  },
  props: {
    src: String,
    name: String,
    description: String,
    count: Number,
    selected: Boolean,
  },
  setup()
  {
    return {};
  },
  emits: {
    'select': null,
  },
}));

// CONCATENATED MODULE: ./src/screen/Group/Item.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Group/Item.scss?vue&type=style&index=0&id=0eb9918c&lang=scss&scoped=true
var Itemvue_type_style_index_0_id_0eb9918c_lang_scss_scoped_true = __webpack_require__("ec76");

// CONCATENATED MODULE: ./src/screen/Group/Item.vue







const Item_exports_ = /*#__PURE__*/exportHelper_default()(Itemvue_type_script_lang_js, [['render',Itemvue_type_template_id_0eb9918c_scoped_true_render],['__scopeId',"data-v-0eb9918c"]])

/* harmony default export */ var Item = (Item_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Group/index.vue?vue&type=script&lang=js








/* harmony default export */ var Groupvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'Group',
  components: {
    Icon: Icon["a" /* default */],
    Item: Item,
  },
  setup()
  {
    const store = Object(vuex_esm_browser["b" /* useStore */])();
    const { t } = Object(vue_i18n["useI18n"])({ useScope: 'global' });
    let computes = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      index: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        const { tree, group } = store.state;
        return Object.keys(tree).map(key => {
          switch (typeof tree[key])
          {
            case 'object':
              const slide = tree[key].slides;
              if (!slide) return false;
              const firstSlide = (slide && slide.length > 0) ? slide[0] : null;
              let src = firstSlide ? (firstSlide.thumbnail || firstSlide.src) : null;
              return {
                key,
                name: tree[key].name,
                description: tree[key].description,
                count: Array.isArray(tree[key].slides) ? tree[key].slides.length : undefined,
                src,
                selected: key === group,
              };
            default:
              return false;
          }
        }).filter(Boolean);
      }),
    });

    // methods
    function onTouchStart(e)
    {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }
    function onClose()
    {
      store.dispatch('changeMode', null);
    }
    function onSelectSlide(key)
    {
      if (!confirm(t('confirm.selectGroup'))) return;
      store.dispatch('changeGroup', key);
      store.dispatch('changeMode', null);
      local["a" /* main */].update('group');
      local["a" /* main */].restart();
    }

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      if (local["d" /* slides */]) local["d" /* slides */].pause(true);
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(() => {
      if (local["d" /* slides */]) local["d" /* slides */].pause(false);
    });

    return {
      computes,
      onTouchStart,
      onClose,
      onSelectSlide,
    };
  },
}));

// CONCATENATED MODULE: ./src/screen/Group/index.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Group/index.scss?vue&type=style&index=0&id=40c5a429&lang=scss&scoped=true
var Groupvue_type_style_index_0_id_40c5a429_lang_scss_scoped_true = __webpack_require__("9178");

// CONCATENATED MODULE: ./src/screen/Group/index.vue







const Group_exports_ = /*#__PURE__*/exportHelper_default()(Groupvue_type_script_lang_js, [['render',Groupvue_type_template_id_40c5a429_scoped_true_render],['__scopeId',"data-v-40c5a429"]])

/* harmony default export */ var Group = (Group_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Thumbnail/index.vue?vue&type=template&id=1caafd8f&scoped=true


const Thumbnailvue_type_template_id_1caafd8f_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-1caafd8f"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_1 = {
  key: 0,
  class: "thumbnail__header"
}
const Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_2 = { key: 0 }
const Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_3 = { class: "thumbnail__body" }
const Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_4 = {
  key: 0,
  class: "thumbnail__index"
}
const Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_5 = ["disabled", "onClick"]
const Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_6 = ["src", "alt"]
const Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_7 = {
  key: 1,
  class: "thumbnail__empty"
}

function Thumbnailvue_type_template_id_1caafd8f_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")
  const _component_ButtonClose = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ButtonClose")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("article", {
    class: "thumbnail",
    onTouchstart: _cache[0] || (_cache[0] = (...args) => (_ctx.onTouchStart && _ctx.onTouchStart(...args)))
  }, [
    (_ctx.computes.title)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("header", Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_1, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.computes.title), 1),
          (_ctx.computes.description)
            ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.computes.description), 1))
            : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
        ]))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true),
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_3, [
      (_ctx.computes.index && _ctx.computes.index.length > 0)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_4, [
            (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.computes.index, (o, k) => {
              return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", null, [
                Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
                  type: "button",
                  disabled: k === _ctx.$store.state.activeSlide,
                  onClick: $event => (_ctx.onSelect(k))
                }, [
                  Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
                    src: o.thumbnail,
                    alt: o.title
                  }, null, 8, Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_6)
                ], 8, Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_5)
              ]))
            }), 256))
          ]))
        : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Thumbnailvue_type_template_id_1caafd8f_scoped_true_hoisted_7, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "frown" }),
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('thumbnail.empty')), 1)
          ]))
    ]),
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ButtonClose, {
      title: _ctx.$t('base.close'),
      class: "thumbnail__close",
      onClick: _ctx.onClose
    }, null, 8, ["title", "onClick"])
  ], 32))
}
// CONCATENATED MODULE: ./src/screen/Thumbnail/index.vue?vue&type=template&id=1caafd8f&scoped=true

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Button/Close.vue?vue&type=template&id=11df97a2&scoped=true


const Closevue_type_template_id_11df97a2_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-11df97a2"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Closevue_type_template_id_11df97a2_scoped_true_hoisted_1 = ["title"]

function Closevue_type_template_id_11df97a2_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Icon")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    type: "button",
    title: _ctx.title,
    class: "button-close",
    onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close')))
  }, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Icon, { "icon-name": "x" })
  ], 8, Closevue_type_template_id_11df97a2_scoped_true_hoisted_1))
}
// CONCATENATED MODULE: ./src/components/Button/Close.vue?vue&type=template&id=11df97a2&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Button/Close.vue?vue&type=script&lang=js




/* harmony default export */ var Closevue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'button-close',
  components: {
    Icon: Icon["a" /* default */],
  },
  props: {
    title: String,
  },
}));

// CONCATENATED MODULE: ./src/components/Button/Close.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Button/Close.vue?vue&type=style&index=0&id=11df97a2&lang=scss&scoped=true
var Closevue_type_style_index_0_id_11df97a2_lang_scss_scoped_true = __webpack_require__("4a5c");

// CONCATENATED MODULE: ./src/components/Button/Close.vue







const Close_exports_ = /*#__PURE__*/exportHelper_default()(Closevue_type_script_lang_js, [['render',Closevue_type_template_id_11df97a2_scoped_true_render],['__scopeId',"data-v-11df97a2"]])

/* harmony default export */ var Close = (Close_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Thumbnail/index.vue?vue&type=script&lang=js







/* harmony default export */ var Thumbnailvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'Thumbnail',
  components: {
    ButtonClose: Close,
    Icon: Icon["a" /* default */],
  },
  setup()
  {
    const store = Object(vuex_esm_browser["b" /* useStore */])();
    let computes = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      index: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return store.state.slides.map(o => ({
          ...o,
          thumbnail: o.thumbnail || o.src,
        }));
      }),
      title: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return store.state.tree[store.state.group].name;
      }),
      description: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return store.state.tree[store.state.group].description;
      }),
    });

    // methods
    function onSelect(n)
    {
      if (local["d" /* slides */]) local["d" /* slides */].change(n, 'none');
      store.dispatch('changeMode', null);
    }
    function onClose()
    {
      store.dispatch('changeMode', null);
    }
    function onTouchStart(e)
    {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      if (local["d" /* slides */]) local["d" /* slides */].pause(true);
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(() => {
      if (local["d" /* slides */]) local["d" /* slides */].pause(false);
    });

    return {
      computes,
      onSelect,
      onClose,
      onTouchStart,
    };
  },
}));

// CONCATENATED MODULE: ./src/screen/Thumbnail/index.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Thumbnail/index.scss?vue&type=style&index=0&id=1caafd8f&lang=scss&scoped=true
var Thumbnailvue_type_style_index_0_id_1caafd8f_lang_scss_scoped_true = __webpack_require__("e3d2");

// CONCATENATED MODULE: ./src/screen/Thumbnail/index.vue







const Thumbnail_exports_ = /*#__PURE__*/exportHelper_default()(Thumbnailvue_type_script_lang_js, [['render',Thumbnailvue_type_template_id_1caafd8f_scoped_true_render],['__scopeId',"data-v-1caafd8f"]])

/* harmony default export */ var Thumbnail = (Thumbnail_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Container.vue?vue&type=script&lang=js












/* harmony default export */ var Containervue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'Container',
  components: {
    Navigation: Navigation,
    Slides: Slides,
    SlidesEmpty: Empty,
    Preference: Preference,
    Group: Group,
    Thumbnail: Thumbnail,
  },
  props: {
    error: Object,
  },
  setup(props)
  {
    const store = Object(vuex_esm_browser["b" /* useStore */])();
    const { t } = Object(vue_i18n["useI18n"])({ useScope: 'global' });
    const slides = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    const navigation = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    let computes = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      mode: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        switch (store.state.mode)
        {
          case 'preference':
          case 'group':
          case 'thumbnail':
            return store.state.mode;
          default:
            return null;
        }
      }),
      existSlides: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return store.state.slides && store.state.slides.length > 0;
      }),
      showThumbnail: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => (computes.mode === 'thumbnail')),
      showPreference: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => (computes.mode === 'preference')),
      showGroup: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => (computes.mode === 'group')),
      emptyTitle: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return props.error ? props.error.title : undefined;
      }),
      emptyDescription: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(() => {
        return props.error ? props.error.description : undefined;
      }),
    });
    let keys = [];

    // methods
    function onKeyup(e)
    {
      if (!store.state.keyboardEvent) return;
      if (keys.length > 1)
      {
        const idx = keys.indexOf(e.keyCode);
        if (idx > -1) keys.splice(idx);
        return;
      }
      if (navigation.value) navigation.value.blur();
      if (computes.mode)
      {
        switch (e.keyCode)
        {
          case 27: // esc
            store.dispatch('changeMode', null);
            break;
        }
      }
      else
      {
        switch (e.keyCode)
        {
          case 37: // arrow left
            if (local["d" /* slides */]) local["d" /* slides */].prev();
            break;
          case 39: // arrow right
            if (local["d" /* slides */]) local["d" /* slides */].next();
            break;
          case 65: // a
            if (local["d" /* slides */] && store.state.preference.slides.autoplay)
            {
              local["d" /* slides */].autoplay();
            }
            break;
          case 83: // s
            store.dispatch('changeMode', 'preference');
            break;
          case 84: // t
            store.dispatch('changeMode', 'thumbnail');
            break;
          case 82: // r
            if (confirm(t('confirm.restart')) && local["a" /* main */])
            {
              local["a" /* main */].restart().then();
            }
            break;
          case 71: // g
            if (store.state.tree && Object.keys(store.state.tree).length > 1)
            {
              store.dispatch('changeMode', 'group');
            }
            break;
          case 72: // h
            store.dispatch('changeHud');
            break;
        }
      }
      keys = [];
    }
    function onKeydown(e)
    {
      if (!store.state.keyboardEvent) return;
      if (keys.indexOf(e.keyCode) > -1) return;
      keys.push(e.keyCode);
    }

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      // setup slides
      local["c" /* setupSlides */](slides.value);
      // on keyboard event
      if (store.state.preference.keyboard.enabled)
      {
        window.on('keyup.slideshow-keyboard', onKeyup);
        window.on('keydown.slideshow-keyboard', onKeydown);
      }
      else
      {
        window.off('keyup.slideshow-keyboard');
        window.off('keydown.slideshow-keyboard');
      }
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(() => {
      // off keyboard event
      if (store.state.preference.keyboard.enabled)
      {
        window.off('keyup.slideshow-keyboard');
        window.off('keydown.slideshow-keyboard');
      }
    });

    return {
      computes,
      slides,
      navigation,
    };
  },
}));

// CONCATENATED MODULE: ./src/screen/Container.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Container.scss?vue&type=style&index=0&id=0aacfd4a&lang=scss&scoped=true
var Containervue_type_style_index_0_id_0aacfd4a_lang_scss_scoped_true = __webpack_require__("3cee");

// CONCATENATED MODULE: ./src/screen/Container.vue







const Container_exports_ = /*#__PURE__*/exportHelper_default()(Containervue_type_script_lang_js, [['render',Containervue_type_template_id_0aacfd4a_scoped_true_render],['__scopeId',"data-v-0aacfd4a"]])

/* harmony default export */ var Container = (Container_exports_);
// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Loading/Intro.vue?vue&type=template&id=49ccabb8


const Introvue_type_template_id_49ccabb8_hoisted_1 = { class: "loading-intro loading-intro--move" }

function Introvue_type_template_id_49ccabb8_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LoadingUnit = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("LoadingUnit")

  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Introvue_type_template_id_49ccabb8_hoisted_1, [
    (_ctx.state.show)
      ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], { key: 0 }, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_LoadingUnit, { class: "unit" }),
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("strong", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('title.loading')), 1)
        ], 64))
      : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
  ]))
}
// CONCATENATED MODULE: ./src/components/Loading/Intro.vue?vue&type=template&id=49ccabb8

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Loading/Unit.vue?vue&type=template&id=4b0d7f5e&scoped=true


const Unitvue_type_template_id_4b0d7f5e_scoped_true_withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-4b0d7f5e"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_1 = { class: "loading-unit" }
const Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_2 = /*#__PURE__*/ Unitvue_type_template_id_4b0d7f5e_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, null, -1))
const Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_3 = /*#__PURE__*/ Unitvue_type_template_id_4b0d7f5e_scoped_true_withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("em", null, null, -1))
const Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_4 = [
  Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_2,
  Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_3
]

function Unitvue_type_template_id_4b0d7f5e_scoped_true_render(_ctx, _cache) {
  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_1, Unitvue_type_template_id_4b0d7f5e_scoped_true_hoisted_4))
}
// CONCATENATED MODULE: ./src/components/Loading/Unit.vue?vue&type=template&id=4b0d7f5e&scoped=true

// EXTERNAL MODULE: ./src/components/Loading/Unit.vue?vue&type=style&index=0&id=4b0d7f5e&lang=scss&scoped=true
var Unitvue_type_style_index_0_id_4b0d7f5e_lang_scss_scoped_true = __webpack_require__("bb67");

// CONCATENATED MODULE: ./src/components/Loading/Unit.vue

const script = {}




const Unit_exports_ = /*#__PURE__*/exportHelper_default()(script, [['render',Unitvue_type_template_id_4b0d7f5e_scoped_true_render],['__scopeId',"data-v-4b0d7f5e"]])

/* harmony default export */ var Unit = (Unit_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/Loading/Intro.vue?vue&type=script&lang=js





/* harmony default export */ var Introvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'LoadingIntro',
  components: {
    LoadingUnit: Unit,
  },
  setup()
  {
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      show: false,
    });
    let mounted = false;

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      mounted = true;
      util["g" /* sleep */](50).then(() => {
        if (mounted) state.show = true;
      });
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(() => {
      mounted = false;
    });

    return {
      state,
    };
  },
}));

// CONCATENATED MODULE: ./src/components/Loading/Intro.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Loading/Intro.vue?vue&type=style&index=0&id=49ccabb8&lang=scss
var Introvue_type_style_index_0_id_49ccabb8_lang_scss = __webpack_require__("5054");

// CONCATENATED MODULE: ./src/components/Loading/Intro.vue







const Intro_exports_ = /*#__PURE__*/exportHelper_default()(Introvue_type_script_lang_js, [['render',Introvue_type_template_id_49ccabb8_render]])

/* harmony default export */ var Intro = (Intro_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/App.vue?vue&type=script&lang=js











// set dev
if (window) window.dev = "production" === 'development';

/* harmony default export */ var Appvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'App',
  components: {
    Container: Container,
    LoadingIntro: Intro,
  },
  props: {
    preference: Object,
    group: String,
    tree: Object,
  },
  setup(props, context)
  {
    let root = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    let store = Object(vuex_esm_browser["b" /* useStore */])();
    const { t, locale } = Object(vue_i18n["useI18n"])({ useScope: 'global' });
    let state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      dev: "production" === 'development',
      loading: true,
      error: undefined,
    });
    let restarting = false;

    // private methods
    function updateTheme(color)
    {
      let theme;
      switch(color)
      {
        case 'light':
        case 'dark':
          theme = color;
          break;
        default:
          theme = 'system';
          break;
      }
      const $html = document.querySelector('html');
      $html.dataset['color'] = theme;
    }
    function error(sw)
    {
      if (sw)
      {
        state.error = {
          title: 'Error slides',
          description: '슬라이드를 가져오는데 오류가 발생했습니다.',
        }
      }
      else
      {
        state.error = undefined;
      }
    }
    function fetchPreference()
    {
      if (props.preference)
      {
        disabled('preference');
        if (Object(object["a" /* checkPreference */])(props.preference))
        {
          let preference = Object(object["d" /* convertPureObject */])(props.preference);
          store.dispatch('changePreference', preference);
          store.dispatch('changeActiveSlide', preference.slides.initialNumber);
        }
      }
      else
      {
        const storagePreference = get('preference');
        if (storagePreference && Object(object["a" /* checkPreference */])(storagePreference))
        {
          store.dispatch('changePreference', storagePreference);
          store.dispatch('changeActiveSlide', storagePreference.slides.initialNumber);
        }
        else
        {
          set('preference', Object(object["d" /* convertPureObject */])(store.state.preference));
        }
      }
    }
    function fetchGroup()
    {
      let group;
      if (props.group)
      {
        disabled('group');
        group = props.group;
      }
      else
      {
        let storageGroup = get('group');
        group = storageGroup || 'default';
      }
      store.dispatch('changeGroup', group);
    }
    function fetchTree()
    {
      try
      {
        let tree;
        if (props.tree)
        {
          disabled('tree');
          tree = props.tree;
        }
        else
        {
          const storageSlides = get('tree');
          tree = !!storageSlides ? storageSlides : Object(object["d" /* convertPureObject */])(__webpack_require__("0676"));
        }
        if (Array.isArray(tree))
        {
          tree = {
            default: {
              slides: tree,
            },
          };
        }
        store.dispatch('changeTree', tree);
        error(false);
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        error(true);
      }
    }
    async function fetchSlides()
    {
      try
      {
        const { group, tree } = store.state;
        let slides = tree[group] ? tree[group].slides : [];
        if (slides && typeof slides === 'string')
        {
          let getSlides = await Object(util["b" /* getApiData */])(slides);
          Object(object["b" /* checkSlideItems */])(getSlides);
          slides = getSlides;
        }
        else if (!(slides && Array.isArray(slides)))
        {
          slides = null;
        }
        store.dispatch('changeSlides', slides);
        error(false);
      }
      catch(e)
      {
        if (window.dev) console.error(e.message);
        store.dispatch('changeSlides', null);
        error(true);
      }
    }
    // public methods
    function start()
    {
      Object(util["g" /* sleep */])(60).then(() => {
        state.loading = false;
      });
    }
    function stop()
    {
      state.loading = true;
    }
    async function restart()
    {
      if (restarting) return;
      restarting = true;
      stop();
      updateTheme(store.state.preference.style.screenColor);
      locale.value = store.state.preference.general.language;
      await fetchSlides();
      await Object(util["g" /* sleep */])(800);
      start();
      restarting = false;
    }
    function update(type)
    {
      switch (type)
      {
        case 'preference':
          context.emit('update-preference', Object(object["d" /* convertPureObject */])(store.state.preference));
          break;
        case 'tree':
          context.emit('update-tree', Object(object["d" /* convertPureObject */])(store.state.tree));
          break;
        case 'group':
          context.emit('update-group', store.state.group);
          break;
      }
    }

    // lifecycles
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(async () => {
      fetchTree();
      fetchGroup();
      await fetchSlides();
      start();
    });

    // watch
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => props.preference, () => {
      fetchPreference();
      restart().then();
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => props.tree, () => {
      fetchTree();
      restart().then();
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(() => props.group, () => {
      fetchGroup();
      restart().then();
    });

    // actions
    Object(util["e" /* initCustomEvent */])();
    fetchPreference();
    updateTheme(store.state.preference.style.screenColor);
    locale.value = store.state.preference.general.language;

    return {
      root,
      state,
      start,
      stop,
      restart,
      update,
    };
  },
  mounted()
  {
    local["b" /* setup */](this, {
      preference: !!this.preference,
      tree: !!this.tree,
      group: !!this.group,
    });
  },
  emits: {
    'update-preference': null,
    'update-tree': null,
    'update-group': null,
  },
}));

// CONCATENATED MODULE: ./src/screen/App.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/screen/App.vue





const App_exports_ = /*#__PURE__*/exportHelper_default()(Appvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var App = (App_exports_);
// CONCATENATED MODULE: ./src/store/defaults.js
/* harmony default export */ var defaults = ({
  preference: {
    general: {
      language: 'en', // en,ko
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
        group: true,
      },
    },
    slides: {
      initialNumber: 0,
      animationType: 'horizontal', // none,fade,horizontal
      animationSpeed: 500,
      captionAnimationType: 'none', // none,shuffle
      captionAnimationSpeed: 40,
      autoplay: false,
      autoplayDelay: 7000,
      autoplayDirection: true, // next(true), prev(false)
      autoplayPauseOnHover: false,
      loop: true,
      swipe: true,
    },
    style: {
      screenColor: 'system', // dark,light,system
      imageType: 'none', // none,contain,cover
      imageScale: ['75%','75%'], // [ width, height ]
      captionScale: 100, // %
      captionPosition: ['32px','30px'], // [ left, top ]
    },
    keyboard: {
      enabled: true,
    },
  },
  usePreference: {
    slides: true,
    style: true,
    data: true,
    keyboard: true,
    information: true,
  },
  tree: {
    default: {
      slides: [],
    },
  },
  slides: [],
  group: 'default',
  mode: null,
  activeSlide: undefined,
  keyboardEvent: true,
  autoplay: false,
});

// CONCATENATED MODULE: ./src/store/state.js



// set state
let state_state = Object(object["d" /* convertPureObject */])(defaults);

/* harmony default export */ var store_state = (state_state);

// CONCATENATED MODULE: ./src/store/actions.js




/**
 * change mode
 * 'null,thumbnail,preference,guide'
 *
 * @param {object} context
 * @param {string} value
 */
function changeMode(context, value)
{
  if (context.state.mode === value) return;
  switch (value)
  {
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

/**
 * change preference
 */
function changePreference(context, value)
{
  const pref = object["d" /* convertPureObject */](value);
  context.commit('updatePreference', pref);
  set('preference', pref);
}

/**
 * change autoplay
 * @param {object} context
 * @param {boolean} sw
 */
function changeAutoplay(context, sw = undefined)
{
  if (!context.state.preference.slides.autoplay) return;
  sw = sw === undefined ? !context.state.autoplay : sw;
  context.commit('updateAutoplay', sw);
}

/**
 * change hud
 *
 * @param {object} context
 * @param {boolean} sw
 */
function changeHud(context, sw = undefined)
{
  sw = sw === undefined ? !context.state.preference.general.hud : sw;
  context.commit('updateValueInPreference', {
    map: [ 'general', 'hud' ],
    value: sw,
  });
}

/**
 * change tree
 *
 * @param {object} context
 * @param {object} tree
 */
function changeTree(context, tree)
{
  try
  {
    object["b" /* checkSlideItems */](tree);
    context.commit('updateTree', tree);
    set('tree', tree);
  }
  catch(e)
  {
    if (window.dev) console.error(e.message);
    throw new Error(e.message);
  }
}

/**
 * change slides
 *
 * @param {object} context
 * @param {object[]} newSlides
 */
function changeSlides(context, newSlides)
{
  context.commit('updateSlides', newSlides);
}

/**
 * change active slide
 *
 * @param {object} context
 * @param {number} active
 */
function changeActiveSlide(context, active)
{
  if (typeof active !== 'number') return;
  context.commit('updateActiveSlide', active);
}

/**
 * reset
 *
 * @param {object} context
 */
async function actions_reset(context)
{
  const preference = object["d" /* convertPureObject */](defaults.preference);
  const tree = object["d" /* convertPureObject */](defaults.tree);
  const slides = object["d" /* convertPureObject */](defaults.slides);
  await context.dispatch('changePreference', preference);
  await context.dispatch('changeTree', tree);
  await context.dispatch('changeSlides', slides);
  context.commit('updateActiveSlide', preference.slides.initialNumber);
  context.commit('updateUseKeyboardEvent', true);
  context.commit('updateMode', null);
}

/**
 * change group
 *
 * @param context
 * @param {string} key
 */
function changeGroup(context, key)
{
  context.commit('updateGroup', key);
  set('group', key);
}

// CONCATENATED MODULE: ./src/store/mutations.js
/**
 * change mode
 */
function updateMode(state, value)
{
  state.mode = value;
}

/**
 * update active slide
 */
function updateActiveSlide(state, n)
{
  state.activeSlide = n;
}

/**
 * use keyboard event
 */
function updateUseKeyboardEvent(state, sw)
{
  state.keyboardEvent = sw;
}

/**
 * update preference
 */
function updatePreference(state, value)
{
  state.preference = value;
}

/**
 * update value in preference
 */
function updateValueInPreference(state, src)
{
  const { value, map } = src;
  if (!(map && Array.isArray(map))) return;
  switch (map.length)
  {
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

function updateTree(state, value)
{
  state.tree = value;
}

/**
 * update slides
 */
function updateSlides(state, value)
{
  state.slides = value;
}

/**
 * update group
 */
function updateGroup(state, value)
{
  state.group = value;
}

function updateAutoplay(state, value)
{
  state.autoplay = value;
}

/**
 * update use preference
 * ex) `store.commit('updateUsePreference', [ 'data', false ]);`
 *
 * @param state
 * @param {array} value
 */
function updateUsePreference(state, value)
{
  switch (value[0])
  {
    case 'slides':
    case 'style':
    case 'data':
    case 'keyboard':
    case 'information':
      state.usePreference[value[0]] = Boolean(value[1]);
      break;
  }
}

// CONCATENATED MODULE: ./src/store/index.js





/* harmony default export */ var src_store = (Object(vuex_esm_browser["a" /* createStore */])({
  state: store_state,
  mutations: mutations_namespaceObject,
  actions: actions_namespaceObject,
}));

// EXTERNAL MODULE: ./src/i18n/en.json
var en = __webpack_require__("e088");

// EXTERNAL MODULE: ./src/i18n/ko.json
var ko = __webpack_require__("4f29");

// CONCATENATED MODULE: ./src/i18n/index.js




/* harmony default export */ var i18n = (Object(vue_i18n["createI18n"])({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    ko: ko,
  },
}));

// CONCATENATED MODULE: ./src/resource.js




/* harmony default export */ var resource = ({
  component: App,
  store: src_store,
  i18n: i18n
});

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (resource);



/***/ }),

/***/ "fbf1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
  * vue-i18n v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */


Object.defineProperty(exports, '__esModule', { value: true });

var coreBase = __webpack_require__("625a");
var vue = __webpack_require__("8bbf");
var shared = __webpack_require__("f83d");

/**
 * Vue I18n Version
 *
 * @remarks
 * Semver format. Same format as the package.json `version` field.
 *
 * @VueI18nGeneral
 */
const VERSION = '9.1.7';

function createI18nError(code, ...args) {
    return coreBase.createCompileError(code, null, undefined);
}

const TransrateVNodeSymbol = shared.makeSymbol('__transrateVNode');
const DatetimePartsSymbol = shared.makeSymbol('__datetimeParts');
const NumberPartsSymbol = shared.makeSymbol('__numberParts');
shared.makeSymbol('__enableEmitter');
shared.makeSymbol('__disableEmitter');
const SetPluralRulesSymbol = shared.makeSymbol('__setPluralRules');
shared.makeSymbol('__intlifyMeta');
let composerID = 0;
function defineCoreMissingHandler(missing) {
    return ((ctx, locale, key, type) => {
        return missing(locale, key, vue.getCurrentInstance() || undefined, type);
    });
}
function getLocaleMessages(locale, options) {
    const { messages, __i18n } = options;
    // prettier-ignore
    const ret = shared.isPlainObject(messages)
        ? messages
        : shared.isArray(__i18n)
            ? {}
            : { [locale]: {} };
    // merge locale messages of i18n custom block
    if (shared.isArray(__i18n)) {
        __i18n.forEach(({ locale, resource }) => {
            if (locale) {
                ret[locale] = ret[locale] || {};
                deepCopy(resource, ret[locale]);
            }
            else {
                deepCopy(resource, ret);
            }
        });
    }
    // handle messages for flat json
    if (options.flatJson) {
        for (const key in ret) {
            if (shared.hasOwn(ret, key)) {
                coreBase.handleFlatJson(ret[key]);
            }
        }
    }
    return ret;
}
const isNotObjectOrIsArray = (val) => !shared.isObject(val) || shared.isArray(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopy(src, des) {
    // src and des should both be objects, and non of then can be a array
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
        throw createI18nError(20 /* INVALID_VALUE */);
    }
    for (const key in src) {
        if (shared.hasOwn(src, key)) {
            if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
                // replace with src[key] when:
                // src[key] or des[key] is not a object, or
                // src[key] or des[key] is a array
                des[key] = src[key];
            }
            else {
                // src[key] and des[key] are both object, merge them
                deepCopy(src[key], des[key]);
            }
        }
    }
}
/**
 * Create composer interface factory
 *
 * @internal
 */
function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === undefined;
    let _inheritLocale = shared.isBoolean(options.inheritLocale)
        ? options.inheritLocale
        : true;
    const _locale = vue.ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.locale.value
        : shared.isString(options.locale)
            ? options.locale
            : 'en-US');
    const _fallbackLocale = vue.ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.fallbackLocale.value
        : shared.isString(options.fallbackLocale) ||
            shared.isArray(options.fallbackLocale) ||
            shared.isPlainObject(options.fallbackLocale) ||
            options.fallbackLocale === false
            ? options.fallbackLocale
            : _locale.value);
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(shared.isPlainObject(options.datetimeFormats)
        ? options.datetimeFormats
        : { [_locale.value]: {} });
    const _numberFormats = vue.ref(shared.isPlainObject(options.numberFormats)
        ? options.numberFormats
        : { [_locale.value]: {} });
    // warning suppress options
    // prettier-ignore
    let _missingWarn = __root
        ? __root.missingWarn
        : shared.isBoolean(options.missingWarn) || shared.isRegExp(options.missingWarn)
            ? options.missingWarn
            : true;
    // prettier-ignore
    let _fallbackWarn = __root
        ? __root.fallbackWarn
        : shared.isBoolean(options.fallbackWarn) || shared.isRegExp(options.fallbackWarn)
            ? options.fallbackWarn
            : true;
    // prettier-ignore
    let _fallbackRoot = __root
        ? __root.fallbackRoot
        : shared.isBoolean(options.fallbackRoot)
            ? options.fallbackRoot
            : true;
    // configure fall back to root
    let _fallbackFormat = !!options.fallbackFormat;
    // runtime missing
    let _missing = shared.isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = shared.isFunction(options.missing)
        ? defineCoreMissingHandler(options.missing)
        : null;
    // postTranslation handler
    let _postTranslation = shared.isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    let _warnHtmlMessage = shared.isBoolean(options.warnHtmlMessage)
        ? options.warnHtmlMessage
        : true;
    let _escapeParameter = !!options.escapeParameter;
    // custom linked modifiers
    // prettier-ignore
    const _modifiers = __root
        ? __root.modifiers
        : shared.isPlainObject(options.modifiers)
            ? options.modifiers
            : {};
    // pluralRules
    let _pluralRules = options.pluralRules || (__root && __root.pluralRules);
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
            __datetimeFormatters: shared.isPlainObject(_context)
                ? _context.__datetimeFormatters
                : undefined,
            __numberFormatters: shared.isPlainObject(_context)
                ? _context.__numberFormatters
                : undefined,
            __v_emitter: shared.isPlainObject(_context)
                ? _context.__v_emitter
                : undefined,
            __meta: { framework: 'vue' }
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
        get: () => _locale.value,
        set: val => {
            _locale.value = val;
            _context.locale = _locale.value;
        }
    });
    // fallbackLocale
    const fallbackLocale = vue.computed({
        get: () => _fallbackLocale.value,
        set: val => {
            _fallbackLocale.value = val;
            _context.fallbackLocale = _fallbackLocale.value;
            coreBase.updateFallbackLocale(_context, _locale.value, val);
        }
    });
    // messages
    const messages = vue.computed(() => _messages.value);
    // datetimeFormats
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    // numberFormats
    const numberFormats = vue.computed(() => _numberFormats.value);
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
        if (handler !== null) {
            _runtimeMissing = defineCoreMissingHandler(handler);
        }
        _missing = handler;
        _context.missing = _runtimeMissing;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
        trackReactivityValues(); // track reactive dependency
        // NOTE: experimental !!
        let ret;
        {
            ret = fn(_context);
        }
        if (shared.isNumber(ret) && ret === coreBase.NOT_REOSLVED) {
            const [key, arg2] = argumentParser();
            return __root && _fallbackRoot
                ? fallbackSuccess(__root)
                : fallbackFail(key);
        }
        else if (successCondition(ret)) {
            return ret;
        }
        else {
            /* istanbul ignore next */
            throw createI18nError(14 /* UNEXPECTED_RETURN_TYPE */);
        }
    }
    // t
    function t(...args) {
        return wrapWithDeps(context => coreBase.translate(context, ...args), () => coreBase.parseTranslateArgs(...args), 'translate', root => root.t(...args), key => key, val => shared.isString(val));
    }
    // rt
    function rt(...args) {
        const [arg1, arg2, arg3] = args;
        if (arg3 && !shared.isObject(arg3)) {
            throw createI18nError(15 /* INVALID_ARGUMENT */);
        }
        return t(...[arg1, arg2, shared.assign({ resolvedMessage: true }, arg3 || {})]);
    }
    // d
    function d(...args) {
        return wrapWithDeps(context => coreBase.datetime(context, ...args), () => coreBase.parseDateTimeArgs(...args), 'datetime format', root => root.d(...args), () => coreBase.MISSING_RESOLVE_VALUE, val => shared.isString(val));
    }
    // n
    function n(...args) {
        return wrapWithDeps(context => coreBase.number(context, ...args), () => coreBase.parseNumberArgs(...args), 'number format', root => root.n(...args), () => coreBase.MISSING_RESOLVE_VALUE, val => shared.isString(val));
    }
    // for custom processor
    function normalize(values) {
        return values.map(val => shared.isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
        normalize,
        interpolate,
        type: 'vnode'
    };
    // transrateVNode, using for `i18n-t` component
    function transrateVNode(...args) {
        return wrapWithDeps(context => {
            let ret;
            const _context = context;
            try {
                _context.processor = processor;
                ret = coreBase.translate(_context, ...args);
            }
            finally {
                _context.processor = null;
            }
            return ret;
        }, () => coreBase.parseTranslateArgs(...args), 'translate', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[TransrateVNodeSymbol](...args), key => [vue.createVNode(vue.Text, null, key, 0)], val => shared.isArray(val));
    }
    // numberParts, using for `i18n-n` component
    function numberParts(...args) {
        return wrapWithDeps(context => coreBase.number(context, ...args), () => coreBase.parseNumberArgs(...args), 'number format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[NumberPartsSymbol](...args), () => [], val => shared.isString(val) || shared.isArray(val));
    }
    // datetimeParts, using for `i18n-d` component
    function datetimeParts(...args) {
        return wrapWithDeps(context => coreBase.datetime(context, ...args), () => coreBase.parseDateTimeArgs(...args), 'datetime format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[DatetimePartsSymbol](...args), () => [], val => shared.isString(val) || shared.isArray(val));
    }
    function setPluralRules(rules) {
        _pluralRules = rules;
        _context.pluralRules = _pluralRules;
    }
    // te
    function te(key, locale) {
        const targetLocale = shared.isString(locale) ? locale : _locale.value;
        const message = getLocaleMessage(targetLocale);
        return coreBase.resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
        let messages = null;
        const locales = coreBase.getLocaleChain(_context, _fallbackLocale.value, _locale.value);
        for (let i = 0; i < locales.length; i++) {
            const targetLocaleMessages = _messages.value[locales[i]] || {};
            const messageValue = coreBase.resolveValue(targetLocaleMessages, key);
            if (messageValue != null) {
                messages = messageValue;
                break;
            }
        }
        return messages;
    }
    // tm
    function tm(key) {
        const messages = resolveMessages(key);
        // prettier-ignore
        return messages != null
            ? messages
            : __root
                ? __root.tm(key) || {}
                : {};
    }
    // getLocaleMessage
    function getLocaleMessage(locale) {
        return (_messages.value[locale] || {});
    }
    // setLocaleMessage
    function setLocaleMessage(locale, message) {
        _messages.value[locale] = message;
        _context.messages = _messages.value;
    }
    // mergeLocaleMessage
    function mergeLocaleMessage(locale, message) {
        _messages.value[locale] = _messages.value[locale] || {};
        deepCopy(message, _messages.value[locale]);
        _context.messages = _messages.value;
    }
    // getDateTimeFormat
    function getDateTimeFormat(locale) {
        return _datetimeFormats.value[locale] || {};
    }
    // setDateTimeFormat
    function setDateTimeFormat(locale, format) {
        _datetimeFormats.value[locale] = format;
        _context.datetimeFormats = _datetimeFormats.value;
        coreBase.clearDateTimeFormat(_context, locale, format);
    }
    // mergeDateTimeFormat
    function mergeDateTimeFormat(locale, format) {
        _datetimeFormats.value[locale] = shared.assign(_datetimeFormats.value[locale] || {}, format);
        _context.datetimeFormats = _datetimeFormats.value;
        coreBase.clearDateTimeFormat(_context, locale, format);
    }
    // getNumberFormat
    function getNumberFormat(locale) {
        return _numberFormats.value[locale] || {};
    }
    // setNumberFormat
    function setNumberFormat(locale, format) {
        _numberFormats.value[locale] = format;
        _context.numberFormats = _numberFormats.value;
        coreBase.clearNumberFormat(_context, locale, format);
    }
    // mergeNumberFormat
    function mergeNumberFormat(locale, format) {
        _numberFormats.value[locale] = shared.assign(_numberFormats.value[locale] || {}, format);
        _context.numberFormats = _numberFormats.value;
        coreBase.clearNumberFormat(_context, locale, format);
    }
    // for debug
    composerID++;
    // watch root locale & fallbackLocale
    if (__root) {
        vue.watch(__root.locale, (val) => {
            if (_inheritLocale) {
                _locale.value = val;
                _context.locale = val;
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
        vue.watch(__root.fallbackLocale, (val) => {
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
        get inheritLocale() {
            return _inheritLocale;
        },
        set inheritLocale(val) {
            _inheritLocale = val;
            if (val && __root) {
                _locale.value = __root.locale.value;
                _fallbackLocale.value = __root.fallbackLocale.value;
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        },
        get availableLocales() {
            return Object.keys(_messages.value).sort();
        },
        messages,
        datetimeFormats,
        numberFormats,
        get modifiers() {
            return _modifiers;
        },
        get pluralRules() {
            return _pluralRules || {};
        },
        get isGlobal() {
            return _isGlobal;
        },
        get missingWarn() {
            return _missingWarn;
        },
        set missingWarn(val) {
            _missingWarn = val;
            _context.missingWarn = _missingWarn;
        },
        get fallbackWarn() {
            return _fallbackWarn;
        },
        set fallbackWarn(val) {
            _fallbackWarn = val;
            _context.fallbackWarn = _fallbackWarn;
        },
        get fallbackRoot() {
            return _fallbackRoot;
        },
        set fallbackRoot(val) {
            _fallbackRoot = val;
        },
        get fallbackFormat() {
            return _fallbackFormat;
        },
        set fallbackFormat(val) {
            _fallbackFormat = val;
            _context.fallbackFormat = _fallbackFormat;
        },
        get warnHtmlMessage() {
            return _warnHtmlMessage;
        },
        set warnHtmlMessage(val) {
            _warnHtmlMessage = val;
            _context.warnHtmlMessage = val;
        },
        get escapeParameter() {
            return _escapeParameter;
        },
        set escapeParameter(val) {
            _escapeParameter = val;
            _context.escapeParameter = val;
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
    return composer;
}

/**
 * Convert to I18n Composer Options from VueI18n Options
 *
 * @internal
 */
function convertComposerOptions(options) {
    const locale = shared.isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = shared.isString(options.fallbackLocale) ||
        shared.isArray(options.fallbackLocale) ||
        shared.isPlainObject(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const missing = shared.isFunction(options.missing) ? options.missing : undefined;
    const missingWarn = shared.isBoolean(options.silentTranslationWarn) ||
        shared.isRegExp(options.silentTranslationWarn)
        ? !options.silentTranslationWarn
        : true;
    const fallbackWarn = shared.isBoolean(options.silentFallbackWarn) ||
        shared.isRegExp(options.silentFallbackWarn)
        ? !options.silentFallbackWarn
        : true;
    const fallbackRoot = shared.isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = shared.isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = shared.isFunction(options.postTranslation)
        ? options.postTranslation
        : undefined;
    const warnHtmlMessage = shared.isString(options.warnHtmlInMessage)
        ? options.warnHtmlInMessage !== 'off'
        : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = shared.isBoolean(options.sync) ? options.sync : true;
    let messages = options.messages;
    if (shared.isPlainObject(options.sharedMessages)) {
        const sharedMessages = options.sharedMessages;
        const locales = Object.keys(sharedMessages);
        messages = locales.reduce((messages, locale) => {
            const message = messages[locale] || (messages[locale] = {});
            shared.assign(message, sharedMessages[locale]);
            return messages;
        }, (messages || {}));
    }
    const { __i18n, __root } = options;
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
 */
function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    // defines VueI18n
    const vueI18n = {
        // id
        id: composer.id,
        // locale
        get locale() {
            return composer.locale.value;
        },
        set locale(val) {
            composer.locale.value = val;
        },
        // fallbackLocale
        get fallbackLocale() {
            return composer.fallbackLocale.value;
        },
        set fallbackLocale(val) {
            composer.fallbackLocale.value = val;
        },
        // messages
        get messages() {
            return composer.messages.value;
        },
        // datetimeFormats
        get datetimeFormats() {
            return composer.datetimeFormats.value;
        },
        // numberFormats
        get numberFormats() {
            return composer.numberFormats.value;
        },
        // availableLocales
        get availableLocales() {
            return composer.availableLocales;
        },
        // formatter
        get formatter() {
            // dummy
            return {
                interpolate() {
                    return [];
                }
            };
        },
        set formatter(val) {
        },
        // missing
        get missing() {
            return composer.getMissingHandler();
        },
        set missing(handler) {
            composer.setMissingHandler(handler);
        },
        // silentTranslationWarn
        get silentTranslationWarn() {
            return shared.isBoolean(composer.missingWarn)
                ? !composer.missingWarn
                : composer.missingWarn;
        },
        set silentTranslationWarn(val) {
            composer.missingWarn = shared.isBoolean(val) ? !val : val;
        },
        // silentFallbackWarn
        get silentFallbackWarn() {
            return shared.isBoolean(composer.fallbackWarn)
                ? !composer.fallbackWarn
                : composer.fallbackWarn;
        },
        set silentFallbackWarn(val) {
            composer.fallbackWarn = shared.isBoolean(val) ? !val : val;
        },
        // modifiers
        get modifiers() {
            return composer.modifiers;
        },
        // formatFallbackMessages
        get formatFallbackMessages() {
            return composer.fallbackFormat;
        },
        set formatFallbackMessages(val) {
            composer.fallbackFormat = val;
        },
        // postTranslation
        get postTranslation() {
            return composer.getPostTranslationHandler();
        },
        set postTranslation(handler) {
            composer.setPostTranslationHandler(handler);
        },
        // sync
        get sync() {
            return composer.inheritLocale;
        },
        set sync(val) {
            composer.inheritLocale = val;
        },
        // warnInHtmlMessage
        get warnHtmlInMessage() {
            return composer.warnHtmlMessage ? 'warn' : 'off';
        },
        set warnHtmlInMessage(val) {
            composer.warnHtmlMessage = val !== 'off';
        },
        // escapeParameterHtml
        get escapeParameterHtml() {
            return composer.escapeParameter;
        },
        set escapeParameterHtml(val) {
            composer.escapeParameter = val;
        },
        // preserveDirectiveContent
        get preserveDirectiveContent() {
            return true;
        },
        set preserveDirectiveContent(val) {
        },
        // pluralizationRules
        get pluralizationRules() {
            return composer.pluralRules || {};
        },
        // for internal
        __composer: composer,
        // t
        t(...args) {
            const [arg1, arg2, arg3] = args;
            const options = {};
            let list = null;
            let named = null;
            if (!shared.isString(arg1)) {
                throw createI18nError(15 /* INVALID_ARGUMENT */);
            }
            const key = arg1;
            if (shared.isString(arg2)) {
                options.locale = arg2;
            }
            else if (shared.isArray(arg2)) {
                list = arg2;
            }
            else if (shared.isPlainObject(arg2)) {
                named = arg2;
            }
            if (shared.isArray(arg3)) {
                list = arg3;
            }
            else if (shared.isPlainObject(arg3)) {
                named = arg3;
            }
            return composer.t(key, list || named || {}, options);
        },
        rt(...args) {
            return composer.rt(...args);
        },
        // tc
        tc(...args) {
            const [arg1, arg2, arg3] = args;
            const options = { plural: 1 };
            let list = null;
            let named = null;
            if (!shared.isString(arg1)) {
                throw createI18nError(15 /* INVALID_ARGUMENT */);
            }
            const key = arg1;
            if (shared.isString(arg2)) {
                options.locale = arg2;
            }
            else if (shared.isNumber(arg2)) {
                options.plural = arg2;
            }
            else if (shared.isArray(arg2)) {
                list = arg2;
            }
            else if (shared.isPlainObject(arg2)) {
                named = arg2;
            }
            if (shared.isString(arg3)) {
                options.locale = arg3;
            }
            else if (shared.isArray(arg3)) {
                list = arg3;
            }
            else if (shared.isPlainObject(arg3)) {
                named = arg3;
            }
            return composer.t(key, list || named || {}, options);
        },
        // te
        te(key, locale) {
            return composer.te(key, locale);
        },
        // tm
        tm(key) {
            return composer.tm(key);
        },
        // getLocaleMessage
        getLocaleMessage(locale) {
            return composer.getLocaleMessage(locale);
        },
        // setLocaleMessage
        setLocaleMessage(locale, message) {
            composer.setLocaleMessage(locale, message);
        },
        // mergeLocaleMessage
        mergeLocaleMessage(locale, message) {
            composer.mergeLocaleMessage(locale, message);
        },
        // d
        d(...args) {
            return composer.d(...args);
        },
        // getDateTimeFormat
        getDateTimeFormat(locale) {
            return composer.getDateTimeFormat(locale);
        },
        // setDateTimeFormat
        setDateTimeFormat(locale, format) {
            composer.setDateTimeFormat(locale, format);
        },
        // mergeDateTimeFormat
        mergeDateTimeFormat(locale, format) {
            composer.mergeDateTimeFormat(locale, format);
        },
        // n
        n(...args) {
            return composer.n(...args);
        },
        // getNumberFormat
        getNumberFormat(locale) {
            return composer.getNumberFormat(locale);
        },
        // setNumberFormat
        setNumberFormat(locale, format) {
            composer.setNumberFormat(locale, format);
        },
        // mergeNumberFormat
        mergeNumberFormat(locale, format) {
            composer.mergeNumberFormat(locale, format);
        },
        // getChoiceIndex
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getChoiceIndex(choice, choicesLength) {
            return -1;
        },
        // for internal
        __onComponentInstanceCreated(target) {
            const { componentInstanceCreatedListener } = options;
            if (componentInstanceCreatedListener) {
                componentInstanceCreatedListener(target, vueI18n);
            }
        }
    };
    return vueI18n;
}

const baseFormatProps = {
    tag: {
        type: [String, Object]
    },
    locale: {
        type: String
    },
    scope: {
        type: String,
        validator: (val) => val === 'parent' || val === 'global',
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
 */
const Translation = {
    /* eslint-disable */
    name: 'i18n-t',
    props: shared.assign({
        keypath: {
            type: String,
            required: true
        },
        plural: {
            type: [Number, String],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validator: (val) => shared.isNumber(val) || !isNaN(val)
        }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
        const { slots, attrs } = context;
        const i18n = props.i18n ||
            useI18n({ useScope: props.scope });
        const keys = Object.keys(slots).filter(key => key !== '_');
        return () => {
            const options = {};
            if (props.locale) {
                options.locale = props.locale;
            }
            if (props.plural !== undefined) {
                options.plural = shared.isString(props.plural) ? +props.plural : props.plural;
            }
            const arg = getInterpolateArg(context, keys);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
            const assignedAttrs = shared.assign({}, attrs);
            // prettier-ignore
            return shared.isString(props.tag)
                ? vue.h(props.tag, assignedAttrs, children)
                : shared.isObject(props.tag)
                    ? vue.h(props.tag, assignedAttrs, children)
                    : vue.h(vue.Fragment, assignedAttrs, children);
        };
    }
};
function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === 'default') {
        // default slot only
        return slots.default ? slots.default() : [];
    }
    else {
        // named slots
        return keys.reduce((arg, key) => {
            const slot = slots[key];
            if (slot) {
                arg[key] = slot();
            }
            return arg;
        }, {});
    }
}

function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
        const options = { part: true };
        let overrides = {};
        if (props.locale) {
            options.locale = props.locale;
        }
        if (shared.isString(props.format)) {
            options.key = props.format;
        }
        else if (shared.isObject(props.format)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (shared.isString(props.format.key)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                options.key = props.format.key;
            }
            // Filter out number format options only
            overrides = Object.keys(props.format).reduce((options, prop) => {
                return slotKeys.includes(prop)
                    ? shared.assign({}, options, { [prop]: props.format[prop] }) // eslint-disable-line @typescript-eslint/no-explicit-any
                    : options;
            }, {});
        }
        const parts = partFormatter(...[props.value, options, overrides]);
        let children = [options.key];
        if (shared.isArray(parts)) {
            children = parts.map((part, index) => {
                const slot = slots[part.type];
                return slot
                    ? slot({ [part.type]: part.value, index, parts })
                    : [part.value];
            });
        }
        else if (shared.isString(parts)) {
            children = [parts];
        }
        const assignedAttrs = shared.assign({}, attrs);
        // prettier-ignore
        return shared.isString(props.tag)
            ? vue.h(props.tag, assignedAttrs, children)
            : shared.isObject(props.tag)
                ? vue.h(props.tag, assignedAttrs, children)
                : vue.h(vue.Fragment, assignedAttrs, children);
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
 */
const NumberFormat = {
    /* eslint-disable */
    name: 'i18n-n',
    props: shared.assign({
        value: {
            type: Number,
            required: true
        },
        format: {
            type: [String, Object]
        }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
        const i18n = props.i18n ||
            useI18n({ useScope: 'parent' });
        return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[NumberPartsSymbol](...args));
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
 */
const DatetimeFormat = {
    /* eslint-disable */
    name: 'i18n-d',
    props: shared.assign({
        value: {
            type: [Number, Date],
            required: true
        },
        format: {
            type: [String, Object]
        }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
        const i18n = props.i18n ||
            useI18n({ useScope: 'parent' });
        return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[DatetimePartsSymbol](...args));
    }
};

function getComposer$1(i18n, instance) {
    const i18nInternal = i18n;
    if (i18n.mode === 'composition') {
        return (i18nInternal.__getInstance(instance) || i18n.global);
    }
    else {
        const vueI18n = i18nInternal.__getInstance(instance);
        return vueI18n != null
            ? vueI18n.__composer
            : i18n.global.__composer;
    }
}
function vTDirective(i18n) {
    const bind = (el, { instance, value, modifiers }) => {
        /* istanbul ignore if */
        if (!instance || !instance.$) {
            throw createI18nError(22 /* UNEXPECTED_ERROR */);
        }
        const composer = getComposer$1(i18n, instance.$);
        const parsedValue = parseValue(value);
        el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
        beforeMount: bind,
        beforeUpdate: bind
    };
}
function parseValue(value) {
    if (shared.isString(value)) {
        return { path: value };
    }
    else if (shared.isPlainObject(value)) {
        if (!('path' in value)) {
            throw createI18nError(19 /* REQUIRED_VALUE */, 'path');
        }
        return value;
    }
    else {
        throw createI18nError(20 /* INVALID_VALUE */);
    }
}
function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (shared.isString(locale)) {
        options.locale = locale;
    }
    if (shared.isNumber(choice)) {
        options.plural = choice;
    }
    if (shared.isNumber(plural)) {
        options.plural = plural;
    }
    return [path, named, options];
}

function apply(app, i18n, ...options) {
    const pluginOptions = shared.isPlainObject(options[0])
        ? options[0]
        : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = shared.isBoolean(pluginOptions.globalInstall)
        ? pluginOptions.globalInstall
        : true;
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
        beforeCreate() {
            const instance = vue.getCurrentInstance();
            /* istanbul ignore if */
            if (!instance) {
                throw createI18nError(22 /* UNEXPECTED_ERROR */);
            }
            const options = this.$options;
            if (options.i18n) {
                const optionsI18n = options.i18n;
                if (options.__i18n) {
                    optionsI18n.__i18n = options.__i18n;
                }
                optionsI18n.__root = composer;
                if (this === this.$root) {
                    this.$i18n = mergeToRoot(vuei18n, optionsI18n);
                }
                else {
                    this.$i18n = createVueI18n(optionsI18n);
                }
            }
            else if (options.__i18n) {
                if (this === this.$root) {
                    this.$i18n = mergeToRoot(vuei18n, options);
                }
                else {
                    this.$i18n = createVueI18n({
                        __i18n: options.__i18n,
                        __root: composer
                    });
                }
            }
            else {
                // set global
                this.$i18n = vuei18n;
            }
            vuei18n.__onComponentInstanceCreated(this.$i18n);
            i18n.__setInstance(instance, this.$i18n);
            // defines vue-i18n legacy APIs
            this.$t = (...args) => this.$i18n.t(...args);
            this.$rt = (...args) => this.$i18n.rt(...args);
            this.$tc = (...args) => this.$i18n.tc(...args);
            this.$te = (key, locale) => this.$i18n.te(key, locale);
            this.$d = (...args) => this.$i18n.d(...args);
            this.$n = (...args) => this.$i18n.n(...args);
            this.$tm = (key) => this.$i18n.tm(key);
        },
        mounted() {
        },
        beforeUnmount() {
            const instance = vue.getCurrentInstance();
            /* istanbul ignore if */
            if (!instance) {
                throw createI18nError(22 /* UNEXPECTED_ERROR */);
            }
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
    root.silentTranslationWarn =
        options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn =
        options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages =
        options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml =
        options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages = getLocaleMessages(root.locale, {
        messages: options.messages,
        __i18n: options.__i18n
    });
    Object.keys(messages).forEach(locale => root.mergeLocaleMessage(locale, messages[locale]));
    if (options.datetimeFormats) {
        Object.keys(options.datetimeFormats).forEach(locale => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
        Object.keys(options.numberFormats).forEach(locale => root.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
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
 */
function createI18n(options = {}) {
    // prettier-ignore
    const __legacyMode = shared.isBoolean(options.legacy)
        ? options.legacy
        : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = new Map();
    // prettier-ignore
    const __global = __legacyMode
        ? createVueI18n(options)
        : createComposer(options);
    const symbol = shared.makeSymbol('');
    const i18n = {
        // mode
        get mode() {
            // prettier-ignore
            return __legacyMode
                    ? 'legacy'
                    : 'composition'
                ;
        },
        // install plugin
        async install(app, ...options) {
            // setup global provider
            app.__VUE_I18N_SYMBOL__ = symbol;
            app.provide(app.__VUE_I18N_SYMBOL__, i18n);
            // global method and properties injection for Composition API
            if (!__legacyMode && __globalInjection) {
                injectGlobalFields(app, i18n.global);
            }
            // install built-in components and directive
            {
                apply(app, i18n, ...options);
            }
            // setup mixin for Legacy API
            if (__legacyMode) {
                app.mixin(defineMixin(__global, __global.__composer, i18n));
            }
        },
        // global accessor
        get global() {
            return __global;
        },
        // @internal
        __instances,
        // @internal
        __getInstance(component) {
            return __instances.get(component) || null;
        },
        // @internal
        __setInstance(component, instance) {
            __instances.set(component, instance);
        },
        // @internal
        __deleteInstance(component) {
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
 */
function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
        throw createI18nError(16 /* MUST_BE_CALL_SETUP_TOP */);
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
        throw createI18nError(17 /* NOT_INSLALLED */);
    }
    const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    /* istanbul ignore if */
    if (!i18n) {
        throw createI18nError(22 /* UNEXPECTED_ERROR */);
    }
    // prettier-ignore
    const global = i18n.mode === 'composition'
        ? i18n.global
        : i18n.global.__composer;
    // prettier-ignore
    const scope = shared.isEmptyObject(options)
        ? ('__i18n' in instance.type)
            ? 'local'
            : 'global'
        : !options.useScope
            ? 'local'
            : options.useScope;
    if (scope === 'global') {
        let messages = shared.isObject(options.messages) ? options.messages : {};
        if ('__i18nGlobal' in instance.type) {
            messages = getLocaleMessages(global.locale.value, {
                messages,
                __i18n: instance.type.__i18nGlobal
            });
        }
        // merge locale messages
        const locales = Object.keys(messages);
        if (locales.length) {
            locales.forEach(locale => {
                global.mergeLocaleMessage(locale, messages[locale]);
            });
        }
        // merge datetime formats
        if (shared.isObject(options.datetimeFormats)) {
            const locales = Object.keys(options.datetimeFormats);
            if (locales.length) {
                locales.forEach(locale => {
                    global.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
                });
            }
        }
        // merge number formats
        if (shared.isObject(options.numberFormats)) {
            const locales = Object.keys(options.numberFormats);
            if (locales.length) {
                locales.forEach(locale => {
                    global.mergeNumberFormat(locale, options.numberFormats[locale]);
                });
            }
        }
        return global;
    }
    if (scope === 'parent') {
        let composer = getComposer(i18n, instance);
        if (composer == null) {
            composer = global;
        }
        return composer;
    }
    // scope 'local' case
    if (i18n.mode === 'legacy') {
        throw createI18nError(18 /* NOT_AVAILABLE_IN_LEGACY_MODE */);
    }
    const i18nInternal = i18n;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
        const type = instance.type;
        const composerOptions = shared.assign({}, options);
        if (type.__i18n) {
            composerOptions.__i18n = type.__i18n;
        }
        if (global) {
            composerOptions.__root = global;
        }
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
    while (current != null) {
        const i18nInternal = i18n;
        if (i18n.mode === 'composition') {
            composer = i18nInternal.__getInstance(current);
        }
        else {
            const vueI18n = i18nInternal.__getInstance(current);
            if (vueI18n != null) {
                composer = vueI18n
                    .__composer;
            }
        }
        if (composer != null) {
            break;
        }
        if (root === current) {
            break;
        }
        current = current.parent;
    }
    return composer;
}
function setupLifeCycle(i18n, target, composer) {
    vue.onMounted(() => {
    }, target);
    vue.onUnmounted(() => {
        i18n.__deleteInstance(target);
    }, target);
}
const globalExportProps = [
    'locale',
    'fallbackLocale',
    'availableLocales'
];
const globalExportMethods = ['t', 'rt', 'd', 'n', 'tm'];
function injectGlobalFields(app, composer) {
    const i18n = Object.create(null);
    globalExportProps.forEach(prop => {
        const desc = Object.getOwnPropertyDescriptor(composer, prop);
        if (!desc) {
            throw createI18nError(22 /* UNEXPECTED_ERROR */);
        }
        const wrap = vue.isRef(desc.value) // check computed props
            ? {
                get() {
                    return desc.value.value;
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                set(val) {
                    desc.value.value = val;
                }
            }
            : {
                get() {
                    return desc.get && desc.get();
                }
            };
        Object.defineProperty(i18n, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n;
    globalExportMethods.forEach(method => {
        const desc = Object.getOwnPropertyDescriptor(composer, method);
        if (!desc || !desc.value) {
            throw createI18nError(22 /* UNEXPECTED_ERROR */);
        }
        Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
}

// register message compiler at vue-i18n
coreBase.registerMessageCompiler(coreBase.compileToFunction);

exports.DatetimeFormat = DatetimeFormat;
exports.NumberFormat = NumberFormat;
exports.Translation = Translation;
exports.VERSION = VERSION;
exports.createI18n = createI18n;
exports.useI18n = useI18n;
exports.vTDirective = vTDirective;


/***/ })

/******/ });