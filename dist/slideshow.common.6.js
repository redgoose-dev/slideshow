((typeof self !== 'undefined' ? self : this)["webpackJsonpslideshow"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpslideshow"] || []).push([[6],{

/***/ "1ee7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_fieldset_scss_vue_type_style_index_0_id_ab8c505e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b09e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_fieldset_scss_vue_type_style_index_0_id_ab8c505e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_fieldset_scss_vue_type_style_index_0_id_ab8c505e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8d68":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Preference/Information.vue?vue&type=template&id=ab8c505e&scoped=true


const _withScopeId = n => (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-ab8c505e"),n=n(),Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("legend", null, "information fields", -1))
const _hoisted_2 = { class: "information" }
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("figure", null, [
  /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
    src: "assets/information-light.png",
    alt: "slideshow"
  }),
  /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
    src: "assets/information-dark.png",
    alt: "slideshow"
  })
], -1))
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [
  /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("GitHub: "),
  /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: "https://github.com/redgoose-dev/slideshow",
    target: "_blank"
  }, "https://github.com/redgoose-dev/slideshow")
], -1))
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
  href: "https://redgoose.me",
  target: "_blank"
}, "https://redgoose.me", -1))
const _hoisted_6 = ["innerHTML"]

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("fieldset", null, [
    _hoisted_1,
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_2, [
      _hoisted_3,
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", null, [
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.version')) + ": ", 1),
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("strong", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.version), 1)
        ]),
        _hoisted_4,
        Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.$t('base.author')) + ": ", 1),
          _hoisted_5
        ])
      ]),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", {
        innerHTML: _ctx.$t('description.information', { link: `<a href='https://github.com/redgoose-dev/slideshow/issues' target='_blank'>GitHub Issues</a>` })
      }, null, 8, _hoisted_6)
    ])
  ]))
}
// CONCATENATED MODULE: ./src/screen/Preference/Information.vue?vue&type=template&id=ab8c505e&scoped=true

// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__("9224");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/screen/Preference/Information.vue?vue&type=script&lang=js




/* harmony default export */ var Informationvue_type_script_lang_js = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'PreferenceInformation',
  setup()
  {
    return {
      version: package_0["a" /* version */],
    };
  },
}));

// CONCATENATED MODULE: ./src/screen/Preference/Information.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/screen/Preference/fieldset.scss?vue&type=style&index=0&id=ab8c505e&lang=scss&scoped=true
var fieldsetvue_type_style_index_0_id_ab8c505e_lang_scss_scoped_true = __webpack_require__("1ee7");

// EXTERNAL MODULE: ./src/screen/Preference/Information.scss?vue&type=style&index=1&id=ab8c505e&lang=scss&scoped=true
var Informationvue_type_style_index_1_id_ab8c505e_lang_scss_scoped_true = __webpack_require__("def0");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/screen/Preference/Information.vue








const __exports__ = /*#__PURE__*/exportHelper_default()(Informationvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-ab8c505e"]])

/* harmony default export */ var Information = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "9224":
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":\"1.1.17-ready\"}");

/***/ }),

/***/ "b09e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "def0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Information_scss_vue_type_style_index_1_id_ab8c505e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f4d4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Information_scss_vue_type_style_index_1_id_ab8c505e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_Information_scss_vue_type_style_index_1_id_ab8c505e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f4d4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);