import { reactive, openBlock, createElementBlock, createElementVNode, toDisplayString, unref, createVNode, pushScopeId, popScopeId } from "vue";
import { _ as _export_sfc, i as i18n, c as convertPureObject } from "./exports.js";
import { F as FormSwitch } from "./Switch.js";
import "vuex";
import "vue-i18n/index";
var Keyboard_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-36820774"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "Keyboard fields", -1));
const _hoisted_2 = { class: "fields" };
const _hoisted_3 = { class: "field-switch" };
const _hoisted_4 = { class: "field-switch__body" };
const _hoisted_5 = { class: "field-title" };
const _hoisted_6 = { for: "pref_enabled" };
const _hoisted_7 = { class: "field-description" };
const _hoisted_8 = { class: "field-switch__input" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_10 = { class: "keyboard-guide" };
const _hoisted_11 = { class: "keyboard-guide__header" };
const _hoisted_12 = { class: "keyboard-guide__body" };
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("th", null, [
  /* @__PURE__ */ createElementVNode("code", null, "A")
], -1));
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("th", null, [
  /* @__PURE__ */ createElementVNode("code", null, "S")
], -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("th", null, [
  /* @__PURE__ */ createElementVNode("code", null, "T")
], -1));
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("th", null, [
  /* @__PURE__ */ createElementVNode("code", null, "R")
], -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("th", null, [
  /* @__PURE__ */ createElementVNode("code", null, "H")
], -1));
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("th", null, [
  /* @__PURE__ */ createElementVNode("code", null, "G")
], -1));
const _sfc_main = {
  props: { structure: Object },
  emits: { "update": null },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({ enabled: props.structure.enabled });
    function onSave() {
      const structure = convertPureObject(state);
      emits("update", structure);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("fieldset", null, [
        _hoisted_1,
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createElementVNode("div", _hoisted_4, [
              createElementVNode("h3", _hoisted_5, [
                createElementVNode("label", _hoisted_6, toDisplayString(unref(t)("title.usingKeyboard")), 1)
              ]),
              createElementVNode("p", _hoisted_7, toDisplayString(unref(t)("description.usingKeyboard")), 1)
            ]),
            createElementVNode("div", _hoisted_8, [
              createVNode(FormSwitch, {
                name: "pref_enabled",
                id: "pref_enabled",
                modelValue: unref(state).enabled,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => unref(state).enabled = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          _hoisted_9
        ]),
        createElementVNode("section", _hoisted_10, [
          createElementVNode("header", _hoisted_11, [
            createElementVNode("h3", null, toDisplayString(unref(t)("base.guide")), 1),
            createElementVNode("p", null, toDisplayString(unref(t)("description.keyboardGuide")), 1)
          ]),
          createElementVNode("table", _hoisted_12, [
            createElementVNode("thead", null, [
              createElementVNode("tr", null, [
                createElementVNode("th", null, toDisplayString(unref(t)("base.ShortcutKey")), 1),
                createElementVNode("td", null, toDisplayString(unref(t)("base.description")), 1)
              ])
            ]),
            createElementVNode("tbody", null, [
              createElementVNode("tr", null, [
                createElementVNode("th", null, [
                  createElementVNode("code", null, toDisplayString(unref(t)("base.leftKey")), 1)
                ]),
                createElementVNode("td", null, toDisplayString(unref(t)("label.prevSlide")), 1)
              ]),
              createElementVNode("tr", null, [
                createElementVNode("th", null, [
                  createElementVNode("code", null, toDisplayString(unref(t)("base.rightKey")), 1)
                ]),
                createElementVNode("td", null, toDisplayString(unref(t)("label.nextSlide")), 1)
              ]),
              createElementVNode("tr", null, [
                _hoisted_13,
                createElementVNode("td", null, toDisplayString(unref(t)("base.autoplay")), 1)
              ]),
              createElementVNode("tr", null, [
                _hoisted_14,
                createElementVNode("td", null, toDisplayString(unref(t)("description.openPreference")), 1)
              ]),
              createElementVNode("tr", null, [
                _hoisted_15,
                createElementVNode("td", null, toDisplayString(unref(t)("description.thumbnail")), 1)
              ]),
              createElementVNode("tr", null, [
                _hoisted_16,
                createElementVNode("td", null, toDisplayString(unref(t)("description.restart")), 1)
              ]),
              createElementVNode("tr", null, [
                _hoisted_17,
                createElementVNode("td", null, toDisplayString(unref(t)("description.hud")), 1)
              ]),
              createElementVNode("tr", null, [
                _hoisted_18,
                createElementVNode("td", null, toDisplayString(unref(t)("description.group")), 1)
              ])
            ])
          ])
        ])
      ]);
    };
  }
};
var Keyboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-36820774"]]);
export { Keyboard as default };
//# sourceMappingURL=Keyboard.js.map
