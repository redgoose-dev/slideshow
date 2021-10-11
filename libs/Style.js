import { reactive, openBlock, createElementBlock, createElementVNode, toDisplayString, unref, createVNode, withCtx, pushScopeId, popScopeId } from "vue";
import { _ as _export_sfc, i as i18n, c as convertPureObject } from "./exports.js";
import { F as FormText } from "./Text.js";
import { F as FormSelect } from "./Select.js";
import "vuex";
import "vue-i18n/index";
var Style_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-656bb80e"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "Style fields", -1));
const _hoisted_2 = { class: "fields" };
const _hoisted_3 = { class: "field-basic" };
const _hoisted_4 = { class: "field-title" };
const _hoisted_5 = { for: "pref_screenColor" };
const _hoisted_6 = { class: "field-description" };
const _hoisted_7 = { class: "field-basic__body" };
const _hoisted_8 = { value: "system" };
const _hoisted_9 = { value: "light" };
const _hoisted_10 = { value: "dark" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_12 = { class: "field-basic" };
const _hoisted_13 = { class: "field-title" };
const _hoisted_14 = { for: "pref_imageType" };
const _hoisted_15 = { class: "field-description" };
const _hoisted_16 = { class: "field-basic__body" };
const _hoisted_17 = { value: "none" };
const _hoisted_18 = { value: "contain" };
const _hoisted_19 = { value: "cover" };
const _hoisted_20 = { class: "field-basic" };
const _hoisted_21 = { class: "field-title" };
const _hoisted_22 = { for: "pref_imageScale" };
const _hoisted_23 = { class: "field-description" };
const _hoisted_24 = { class: "field-basic__body" };
const _hoisted_25 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_26 = { class: "field-basic" };
const _hoisted_27 = { class: "field-title" };
const _hoisted_28 = { for: "pref_captionScale" };
const _hoisted_29 = { class: "field-description" };
const _hoisted_30 = { class: "field-basic__inline" };
const _hoisted_31 = { class: "label" };
const _hoisted_32 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "%", -1));
const _hoisted_33 = { class: "field-basic" };
const _hoisted_34 = { class: "field-title" };
const _hoisted_35 = { for: "pref_captionPosition" };
const _hoisted_36 = { class: "field-description" };
const _hoisted_37 = { class: "field-basic__body" };
const _sfc_main = {
  props: { structure: Object },
  emits: { "update": null },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({
      screenColor: props.structure.screenColor,
      imageType: props.structure.imageType,
      imageScale: props.structure.imageScale,
      captionScale: props.structure.captionScale,
      captionPosition: props.structure.captionPosition
    });
    function onSave() {
      const structure = convertPureObject(state);
      emits("update", structure);
    }
    function onUpdateImageScale(s) {
      state.imageScale = s.split(",");
      onSave();
    }
    function onUpdateCaptionPosition(s) {
      state.captionPosition = s.split(",");
      onSave();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("fieldset", null, [
        _hoisted_1,
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createElementVNode("h3", _hoisted_4, [
              createElementVNode("label", _hoisted_5, toDisplayString(unref(t)("title.screenMode")), 1)
            ]),
            createElementVNode("p", _hoisted_6, toDisplayString(unref(t)("description.screenMode")), 1),
            createElementVNode("div", _hoisted_7, [
              createVNode(FormSelect, {
                name: "pref_screenColor",
                id: "pref_screenColor",
                modelValue: unref(state).screenColor,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => unref(state).screenColor = $event),
                  onSave
                ]
              }, {
                default: withCtx(() => [
                  createElementVNode("option", _hoisted_8, toDisplayString(unref(t)("base.system")), 1),
                  createElementVNode("option", _hoisted_9, toDisplayString(unref(t)("base.lightMode")), 1),
                  createElementVNode("option", _hoisted_10, toDisplayString(unref(t)("base.darkMode")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          _hoisted_11,
          createElementVNode("div", _hoisted_12, [
            createElementVNode("h3", _hoisted_13, [
              createElementVNode("label", _hoisted_14, toDisplayString(unref(t)("label.imageType")), 1)
            ]),
            createElementVNode("p", _hoisted_15, toDisplayString(unref(t)("description.imageType")), 1),
            createElementVNode("div", _hoisted_16, [
              createVNode(FormSelect, {
                name: "pref_imageType",
                id: "pref_imageType",
                modelValue: unref(state).imageType,
                "onUpdate:modelValue": [
                  _cache[1] || (_cache[1] = ($event) => unref(state).imageType = $event),
                  onSave
                ]
              }, {
                default: withCtx(() => [
                  createElementVNode("option", _hoisted_17, toDisplayString(unref(t)("base.none")), 1),
                  createElementVNode("option", _hoisted_18, toDisplayString(unref(t)("base.contain")), 1),
                  createElementVNode("option", _hoisted_19, toDisplayString(unref(t)("base.cover")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_20, [
            createElementVNode("h3", _hoisted_21, [
              createElementVNode("label", _hoisted_22, toDisplayString(unref(t)("title.imageScale")), 1)
            ]),
            createElementVNode("p", _hoisted_23, toDisplayString(unref(t)("description.imageScale")), 1),
            createElementVNode("div", _hoisted_24, [
              createVNode(FormText, {
                type: "text",
                name: "pref_imageScale",
                id: "pref_imageScale",
                modelValue: unref(state).imageScale,
                "onUpdate:modelValue": [
                  _cache[2] || (_cache[2] = ($event) => unref(state).imageScale = $event),
                  onUpdateImageScale
                ],
                placeholder: "80%,80%",
                "model-type": "array",
                inline: true,
                size: 16
              }, null, 8, ["modelValue"])
            ])
          ]),
          _hoisted_25,
          createElementVNode("div", _hoisted_26, [
            createElementVNode("h3", _hoisted_27, [
              createElementVNode("label", _hoisted_28, toDisplayString(unref(t)("title.captionScale")), 1)
            ]),
            createElementVNode("p", _hoisted_29, toDisplayString(unref(t)("description.captionScale")), 1),
            createElementVNode("div", _hoisted_30, [
              createElementVNode("label", _hoisted_31, [
                createVNode(FormText, {
                  type: "tel",
                  name: "pref_captionScale",
                  id: "pref_captionScale",
                  modelValue: unref(state).captionScale,
                  "onUpdate:modelValue": [
                    _cache[3] || (_cache[3] = ($event) => unref(state).captionScale = $event),
                    onSave
                  ],
                  placeholder: "100",
                  inline: true,
                  maxlength: 3,
                  size: 5,
                  "model-type": "number"
                }, null, 8, ["modelValue"]),
                _hoisted_32
              ])
            ])
          ]),
          createElementVNode("div", _hoisted_33, [
            createElementVNode("h3", _hoisted_34, [
              createElementVNode("label", _hoisted_35, toDisplayString(unref(t)("title.captionPosition")), 1)
            ]),
            createElementVNode("p", _hoisted_36, toDisplayString(unref(t)("description.captionPosition")), 1),
            createElementVNode("div", _hoisted_37, [
              createVNode(FormText, {
                type: "text",
                name: "pref_captionPosition",
                id: "pref_captionPosition",
                modelValue: unref(state).captionPosition,
                "onUpdate:modelValue": [
                  _cache[4] || (_cache[4] = ($event) => unref(state).captionPosition = $event),
                  onUpdateCaptionPosition
                ],
                placeholder: "30px,30px",
                "model-type": "array",
                inline: true,
                size: 16
              }, null, 8, ["modelValue"])
            ])
          ])
        ])
      ]);
    };
  }
};
var Style = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-656bb80e"]]);
export { Style as default };
//# sourceMappingURL=Style.js.map
