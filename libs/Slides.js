import { reactive, openBlock, createElementBlock, createElementVNode, toDisplayString, unref, createVNode, withCtx, pushScopeId, popScopeId } from "vue";
import { _ as _export_sfc, i as i18n, c as convertPureObject } from "./exports.js";
import { F as FormText } from "./Text.js";
import { F as FormSelect } from "./Select.js";
import { F as FormSwitch } from "./Switch.js";
import { F as FormRadio } from "./Radio.js";
import "vuex";
import "vue-i18n/index";
var Slides_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-3efd8df9"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "Slides fields", -1));
const _hoisted_2 = { class: "fields" };
const _hoisted_3 = { class: "field-basic" };
const _hoisted_4 = { class: "field-title" };
const _hoisted_5 = { for: "pref_initialNumber" };
const _hoisted_6 = { class: "field-description" };
const _hoisted_7 = { class: "field-basic__body" };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_9 = { class: "field-basic" };
const _hoisted_10 = { class: "field-title" };
const _hoisted_11 = { for: "pref_animationType" };
const _hoisted_12 = { class: "field-description" };
const _hoisted_13 = { class: "field-basic__body" };
const _hoisted_14 = { value: "none" };
const _hoisted_15 = { value: "fade" };
const _hoisted_16 = { value: "horizontal" };
const _hoisted_17 = { class: "field-basic" };
const _hoisted_18 = { class: "field-title" };
const _hoisted_19 = { for: "pref_animationSpeed" };
const _hoisted_20 = { class: "field-description" };
const _hoisted_21 = { class: "field-basic__inline" };
const _hoisted_22 = { class: "label" };
const _hoisted_23 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "ms", -1));
const _hoisted_24 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_25 = { class: "field-basic" };
const _hoisted_26 = { class: "field-title" };
const _hoisted_27 = { for: "pref_captionAnimationType" };
const _hoisted_28 = { class: "field-description" };
const _hoisted_29 = { class: "field-basic__body" };
const _hoisted_30 = { value: "none" };
const _hoisted_31 = { value: "shuffle" };
const _hoisted_32 = { class: "field-basic" };
const _hoisted_33 = { class: "field-title" };
const _hoisted_34 = { for: "pref_captionAnimationSpeed" };
const _hoisted_35 = { class: "field-description" };
const _hoisted_36 = { class: "field-basic__inline" };
const _hoisted_37 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_38 = { class: "field-switch" };
const _hoisted_39 = { class: "field-switch__body" };
const _hoisted_40 = { class: "field-title" };
const _hoisted_41 = { for: "pref_autoplay" };
const _hoisted_42 = { class: "field-description" };
const _hoisted_43 = { class: "field-switch__input" };
const _hoisted_44 = { class: "field-basic" };
const _hoisted_45 = { class: "field-title" };
const _hoisted_46 = { for: "pref_autoplayDelay" };
const _hoisted_47 = { class: "field-description" };
const _hoisted_48 = { class: "field-basic__inline" };
const _hoisted_49 = { class: "label" };
const _hoisted_50 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "ms", -1));
const _hoisted_51 = { class: "field-basic" };
const _hoisted_52 = { class: "field-title" };
const _hoisted_53 = { for: "pref_autoplayDirection" };
const _hoisted_54 = { class: "field-description" };
const _hoisted_55 = { class: "field-basic__inline" };
const _hoisted_56 = { class: "field-switch" };
const _hoisted_57 = { class: "field-switch__body" };
const _hoisted_58 = { class: "field-title" };
const _hoisted_59 = { for: "pref_autoplayPauseOnHover" };
const _hoisted_60 = { class: "field-description" };
const _hoisted_61 = { class: "field-switch__input" };
const _hoisted_62 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_63 = { class: "field-switch" };
const _hoisted_64 = { class: "field-switch__body" };
const _hoisted_65 = { class: "field-title" };
const _hoisted_66 = { for: "pref_loop" };
const _hoisted_67 = { class: "field-description" };
const _hoisted_68 = { class: "field-switch__input" };
const _hoisted_69 = { class: "field-switch" };
const _hoisted_70 = { class: "field-switch__body" };
const _hoisted_71 = { class: "field-title" };
const _hoisted_72 = { for: "pref_swipe" };
const _hoisted_73 = { class: "field-description" };
const _hoisted_74 = { class: "field-switch__input" };
const _sfc_main = {
  props: { structure: Object },
  emits: { "update": null },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({
      initialNumber: props.structure.initialNumber,
      animationType: props.structure.animationType,
      animationSpeed: props.structure.animationSpeed,
      captionAnimationType: props.structure.captionAnimationType,
      captionAnimationSpeed: props.structure.captionAnimationSpeed,
      autoplay: props.structure.autoplay,
      autoplayDelay: props.structure.autoplayDelay,
      autoplayDirection: props.structure.autoplayDirection,
      autoplayPauseOnHover: props.structure.autoplayPauseOnHover,
      loop: props.structure.loop,
      swipe: props.structure.swipe
    });
    function onSave() {
      const structure = convertPureObject(state);
      emits("update", structure);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("fieldset", null, [
        _hoisted_1,
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createElementVNode("h3", _hoisted_4, [
              createElementVNode("label", _hoisted_5, toDisplayString(unref(t)("title.initialNumber")), 1)
            ]),
            createElementVNode("p", _hoisted_6, toDisplayString(unref(t)("description.initialNumber")), 1),
            createElementVNode("div", _hoisted_7, [
              createVNode(FormText, {
                type: "tel",
                name: "pref_initialNumber",
                id: "pref_initialNumber",
                modelValue: unref(state).initialNumber,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => unref(state).initialNumber = $event),
                  onSave
                ],
                placeholder: "0",
                inline: true,
                maxlength: 3,
                size: 5,
                "model-type": "number"
              }, null, 8, ["modelValue"])
            ])
          ]),
          _hoisted_8,
          createElementVNode("div", _hoisted_9, [
            createElementVNode("h3", _hoisted_10, [
              createElementVNode("label", _hoisted_11, toDisplayString(unref(t)("title.transitionType")), 1)
            ]),
            createElementVNode("p", _hoisted_12, toDisplayString(unref(t)("description.transitionType")), 1),
            createElementVNode("div", _hoisted_13, [
              createVNode(FormSelect, {
                name: "pref_animationType",
                id: "pref_animationType",
                modelValue: unref(state).animationType,
                "onUpdate:modelValue": [
                  _cache[1] || (_cache[1] = ($event) => unref(state).animationType = $event),
                  onSave
                ]
              }, {
                default: withCtx(() => [
                  createElementVNode("option", _hoisted_14, toDisplayString(unref(t)("base.none")), 1),
                  createElementVNode("option", _hoisted_15, toDisplayString(unref(t)("label.fadeInOut")), 1),
                  createElementVNode("option", _hoisted_16, toDisplayString(unref(t)("label.moveHorizontal")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_17, [
            createElementVNode("h3", _hoisted_18, [
              createElementVNode("label", _hoisted_19, toDisplayString(unref(t)("title.transitionSpeed")), 1)
            ]),
            createElementVNode("p", _hoisted_20, toDisplayString(unref(t)("description.transitionSpeed")), 1),
            createElementVNode("div", _hoisted_21, [
              createElementVNode("label", _hoisted_22, [
                createVNode(FormText, {
                  type: "tel",
                  name: "pref_animationSpeed",
                  id: "pref_animationSpeed",
                  modelValue: unref(state).animationSpeed,
                  "onUpdate:modelValue": [
                    _cache[2] || (_cache[2] = ($event) => unref(state).animationSpeed = $event),
                    onSave
                  ],
                  placeholder: "1000",
                  inline: true,
                  maxlength: 4,
                  size: 5,
                  "model-type": "number"
                }, null, 8, ["modelValue"]),
                _hoisted_23
              ])
            ])
          ]),
          _hoisted_24,
          createElementVNode("div", _hoisted_25, [
            createElementVNode("h3", _hoisted_26, [
              createElementVNode("label", _hoisted_27, toDisplayString(unref(t)("title.captionAnimationType")), 1)
            ]),
            createElementVNode("p", _hoisted_28, toDisplayString(unref(t)("description.captionAnimationType")), 1),
            createElementVNode("div", _hoisted_29, [
              createVNode(FormSelect, {
                name: "pref_captionAnimationType",
                id: "pref_captionAnimationType",
                modelValue: unref(state).captionAnimationType,
                "onUpdate:modelValue": [
                  _cache[3] || (_cache[3] = ($event) => unref(state).captionAnimationType = $event),
                  onSave
                ]
              }, {
                default: withCtx(() => [
                  createElementVNode("option", _hoisted_30, toDisplayString(unref(t)("base.none")), 1),
                  createElementVNode("option", _hoisted_31, toDisplayString(unref(t)("base.shuffleText")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_32, [
            createElementVNode("h3", _hoisted_33, [
              createElementVNode("label", _hoisted_34, toDisplayString(unref(t)("title.captionAnimationSpeed")), 1)
            ]),
            createElementVNode("p", _hoisted_35, toDisplayString(unref(t)("description.captionAnimationSpeed")), 1),
            createElementVNode("div", _hoisted_36, [
              createVNode(FormText, {
                type: "tel",
                name: "pref_captionAnimationSpeed",
                id: "pref_captionAnimationSpeed",
                modelValue: unref(state).captionAnimationSpeed,
                "onUpdate:modelValue": [
                  _cache[4] || (_cache[4] = ($event) => unref(state).captionAnimationSpeed = $event),
                  onSave
                ],
                placeholder: "1000",
                inline: true,
                maxlength: 4,
                size: 5,
                "model-type": "number"
              }, null, 8, ["modelValue"])
            ])
          ]),
          _hoisted_37,
          createElementVNode("div", _hoisted_38, [
            createElementVNode("div", _hoisted_39, [
              createElementVNode("h3", _hoisted_40, [
                createElementVNode("label", _hoisted_41, toDisplayString(unref(t)("base.autoplay")), 1)
              ]),
              createElementVNode("p", _hoisted_42, toDisplayString(unref(t)("description.autoplay")), 1)
            ]),
            createElementVNode("div", _hoisted_43, [
              createVNode(FormSwitch, {
                name: "pref_autoplay",
                id: "pref_autoplay",
                modelValue: unref(state).autoplay,
                "onUpdate:modelValue": [
                  _cache[5] || (_cache[5] = ($event) => unref(state).autoplay = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_44, [
            createElementVNode("h3", _hoisted_45, [
              createElementVNode("label", _hoisted_46, toDisplayString(unref(t)("title.autoplayDelay")), 1)
            ]),
            createElementVNode("p", _hoisted_47, toDisplayString(unref(t)("description.autoplayDelay")), 1),
            createElementVNode("div", _hoisted_48, [
              createElementVNode("label", _hoisted_49, [
                createVNode(FormText, {
                  type: "tel",
                  name: "pref_autoplayDelay",
                  id: "pref_autoplayDelay",
                  modelValue: unref(state).autoplayDelay,
                  "onUpdate:modelValue": [
                    _cache[6] || (_cache[6] = ($event) => unref(state).autoplayDelay = $event),
                    onSave
                  ],
                  placeholder: "1000",
                  inline: true,
                  maxlength: 4,
                  size: 5,
                  "model-type": "number"
                }, null, 8, ["modelValue"]),
                _hoisted_50
              ])
            ])
          ]),
          createElementVNode("div", _hoisted_51, [
            createElementVNode("h3", _hoisted_52, [
              createElementVNode("label", _hoisted_53, toDisplayString(unref(t)("title.autoplayDirection")), 1)
            ]),
            createElementVNode("p", _hoisted_54, toDisplayString(unref(t)("description.autoplayDirection")), 1),
            createElementVNode("div", _hoisted_55, [
              createVNode(FormRadio, {
                name: "pref_autoplayDirection",
                id: "pref_autoplayDirection",
                inline: true,
                items: [
                  { key: false, label: unref(t)("base.previous") },
                  { key: true, label: unref(t)("base.next") }
                ],
                "model-type": "boolean",
                modelValue: unref(state).autoplayDirection,
                "onUpdate:modelValue": [
                  _cache[7] || (_cache[7] = ($event) => unref(state).autoplayDirection = $event),
                  onSave
                ]
              }, null, 8, ["items", "modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_56, [
            createElementVNode("div", _hoisted_57, [
              createElementVNode("h3", _hoisted_58, [
                createElementVNode("label", _hoisted_59, toDisplayString(unref(t)("title.autoplayPauseOnHover")), 1)
              ]),
              createElementVNode("p", _hoisted_60, toDisplayString(unref(t)("description.autoplayPauseOnHover")), 1)
            ]),
            createElementVNode("div", _hoisted_61, [
              createVNode(FormSwitch, {
                name: "pref_autoplayPauseOnHover",
                id: "pref_autoplayPauseOnHover",
                modelValue: unref(state).autoplayPauseOnHover,
                "onUpdate:modelValue": [
                  _cache[8] || (_cache[8] = ($event) => unref(state).autoplayPauseOnHover = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          _hoisted_62,
          createElementVNode("div", _hoisted_63, [
            createElementVNode("div", _hoisted_64, [
              createElementVNode("h3", _hoisted_65, [
                createElementVNode("label", _hoisted_66, toDisplayString(unref(t)("base.repeat")), 1)
              ]),
              createElementVNode("p", _hoisted_67, toDisplayString(unref(t)("description.repeat")), 1)
            ]),
            createElementVNode("div", _hoisted_68, [
              createVNode(FormSwitch, {
                name: "pref_loop",
                id: "pref_loop",
                modelValue: unref(state).loop,
                "onUpdate:modelValue": [
                  _cache[9] || (_cache[9] = ($event) => unref(state).loop = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_69, [
            createElementVNode("div", _hoisted_70, [
              createElementVNode("h3", _hoisted_71, [
                createElementVNode("label", _hoisted_72, toDisplayString(unref(t)("base.swipe")), 1)
              ]),
              createElementVNode("p", _hoisted_73, toDisplayString(unref(t)("description.swipe")), 1)
            ]),
            createElementVNode("div", _hoisted_74, [
              createVNode(FormSwitch, {
                name: "pref_swipe",
                id: "pref_swipe",
                modelValue: unref(state).swipe,
                "onUpdate:modelValue": [
                  _cache[10] || (_cache[10] = ($event) => unref(state).swipe = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ])
        ])
      ]);
    };
  }
};
var Slides = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3efd8df9"]]);
export { Slides as default };
//# sourceMappingURL=Slides.js.map
