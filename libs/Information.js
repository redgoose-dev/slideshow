import { openBlock, createElementBlock, createElementVNode, createTextVNode, toDisplayString, unref, pushScopeId, popScopeId } from "vue";
import { _ as _export_sfc, i as i18n } from "./exports.js";
import "vuex";
import "vue-i18n/index";
const name = "@redgoose/slideshow";
const productName = "Slideshow";
const description = "vue slideshow";
const version = "1.2.0-ready";
const main = "./libs/Slideshow.es.js";
const module = "./libs/Slideshow.es.js";
const repository = "https://github.com/redgoose-dev/slideshow.git";
const author = {
  name: "redgoose",
  email: "scripter@me.com",
  url: "https://redgoose.me"
};
const license = "MIT";
const scripts = {
  dev: "vite --config config/vite.dev.config.js",
  "build-docs": "rm -rf docs && vite build --config config/vite.docs.config.js",
  "build-libs": "rm -rf dist && vite build --config config/vite.libs.config.js",
  build: "$npm_execpath run build-docs && $npm_execpath run build-libs",
  preview: "vite preview --config config/vite.docs.config.js --port 8080",
  "dev-external": ""
};
const browserslist = [
  "> 1%",
  "last 2 versions"
];
const dependencies = {
  vue: "^3.2.20",
  "vue-i18n": "^9.1.9",
  vuex: "^4.0.2"
};
const devDependencies = {
  "@vitejs/plugin-vue": "^1.9.3",
  sass: "^1.42.1",
  vite: "^2.6.5"
};
var pkg = {
  name,
  productName,
  description,
  version,
  main,
  module,
  repository,
  author,
  license,
  scripts,
  browserslist,
  dependencies,
  devDependencies
};
var Information_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-76d50735"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "information fields", -1));
const _hoisted_2 = { class: "information" };
const _hoisted_3 = ["src"];
const _hoisted_4 = ["src"];
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("li", null, [
  /* @__PURE__ */ createTextVNode("GitHub: "),
  /* @__PURE__ */ createElementVNode("a", {
    href: "https://github.com/redgoose-dev/slideshow",
    target: "_blank"
  }, "https://github.com/redgoose-dev/slideshow")
], -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("a", {
  href: "https://redgoose.me",
  target: "_blank"
}, "https://redgoose.me", -1));
const _hoisted_7 = ["innerHTML"];
const _sfc_main = {
  setup(__props) {
    const { t } = i18n.global;
    const version2 = pkg.version;
    const signatures = {
      light: "https://raw.githubusercontent.com/redgoose-dev/slideshow/main/resource/github/signature-light.png",
      dark: "https://raw.githubusercontent.com/redgoose-dev/slideshow/main/resource/github/signature-dark.png"
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("fieldset", null, [
        _hoisted_1,
        createElementVNode("div", _hoisted_2, [
          createElementVNode("figure", null, [
            createElementVNode("img", {
              src: signatures.light,
              alt: "slideshow"
            }, null, 8, _hoisted_3),
            createElementVNode("img", {
              src: signatures.dark,
              alt: "slideshow"
            }, null, 8, _hoisted_4)
          ]),
          createElementVNode("ul", null, [
            createElementVNode("li", null, [
              createTextVNode(toDisplayString(unref(t)("base.version")) + ": ", 1),
              createElementVNode("strong", null, toDisplayString(unref(version2)), 1)
            ]),
            _hoisted_5,
            createElementVNode("li", null, [
              createTextVNode(toDisplayString(unref(t)("base.author")) + ": ", 1),
              _hoisted_6
            ])
          ]),
          createElementVNode("p", {
            innerHTML: unref(t)("description.information", { link: `<a href='https://github.com/redgoose-dev/slideshow/issues' target='_blank'>GitHub Issues</a>` })
          }, null, 8, _hoisted_7)
        ])
      ]);
    };
  }
};
var Information = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76d50735"]]);
export { Information as default };
//# sourceMappingURL=Information.js.map
