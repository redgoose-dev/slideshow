import { openBlock, createElementBlock, createElementVNode, createVNode, toDisplayString, createCommentVNode, reactive, unref, withCtx, createTextVNode, pushScopeId, popScopeId } from "vue";
import { _ as _export_sfc, I as Icon, i as i18n, c as convertPureObject, s as store, m as main } from "./exports.js";
import { B as ButtonBasic, t as twoDigit } from "./Basic.js";
import { F as FormSelect } from "./Select.js";
import { F as FormSwitch } from "./Switch.js";
import "vuex";
import "vue-i18n/index";
var Checkbox_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$1 = { class: "form-checkbox" };
const _hoisted_2$1 = { class: "form-checkbox__body" };
const _hoisted_3$1 = ["name", "id", "required", "disabled", "checked"];
const _hoisted_4$1 = {
  key: 0,
  class: "form-checkbox__label"
};
const _sfc_main$1 = {
  props: {
    name: { type: String, required: true },
    id: String,
    disabled: Boolean,
    required: Boolean,
    label: String,
    modelValue: Boolean
  },
  emits: ["update:modelValue", "blur:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", _hoisted_1$1, [
        createElementVNode("span", _hoisted_2$1, [
          createElementVNode("input", {
            type: "checkbox",
            name: props.name,
            id: props.id,
            required: props.required,
            disabled: props.disabled,
            checked: props.modelValue,
            onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", Boolean($event.target.checked)))
          }, null, 40, _hoisted_3$1),
          createElementVNode("i", null, [
            createVNode(Icon, { "icon-name": "check" })
          ])
        ]),
        props.label ? (openBlock(), createElementBlock("em", _hoisted_4$1, toDisplayString(props.label), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
var FormCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-db7f017c"]]);
var General_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-20ae9ce0"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "General fields", -1));
const _hoisted_2 = { class: "fields" };
const _hoisted_3 = { class: "field-basic" };
const _hoisted_4 = { class: "field-title" };
const _hoisted_5 = { for: "pref_language" };
const _hoisted_6 = { class: "field-description" };
const _hoisted_7 = { class: "field-basic__body" };
const _hoisted_8 = { value: "en" };
const _hoisted_9 = { value: "ko" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_11 = { class: "field-switch" };
const _hoisted_12 = { class: "field-switch__body" };
const _hoisted_13 = { class: "field-title" };
const _hoisted_14 = { for: "pref_hud" };
const _hoisted_15 = { class: "field-description" };
const _hoisted_16 = { class: "field-switch__input" };
const _hoisted_17 = { class: "field-switch" };
const _hoisted_18 = { class: "field-switch__body" };
const _hoisted_19 = { class: "field-title" };
const _hoisted_20 = { for: "pref_hoverVisibleHud" };
const _hoisted_21 = { class: "field-description" };
const _hoisted_22 = { class: "field-switch__input" };
const _hoisted_23 = { class: "field-switch" };
const _hoisted_24 = { class: "field-switch__body" };
const _hoisted_25 = { class: "field-title" };
const _hoisted_26 = { for: "pref_clickVisibleHud" };
const _hoisted_27 = { class: "field-description" };
const _hoisted_28 = { class: "field-switch__input" };
const _hoisted_29 = { class: "field-basic" };
const _hoisted_30 = { class: "field-title" };
const _hoisted_31 = { for: "pref_hudContents" };
const _hoisted_32 = { class: "field-description" };
const _hoisted_33 = { class: "field-basic__body" };
const _hoisted_34 = { class: "field-checks" };
const _hoisted_35 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("hr", { class: "field-line" }, null, -1));
const _hoisted_36 = { class: "field-basic" };
const _hoisted_37 = { class: "field-title" };
const _hoisted_38 = { class: "field-description" };
const _hoisted_39 = { class: "field-basic__body" };
const _hoisted_40 = { class: "grid import-data" };
const _hoisted_41 = { class: "field-basic" };
const _hoisted_42 = { class: "field-title" };
const _hoisted_43 = { class: "field-description" };
const _hoisted_44 = { class: "field-basic__body" };
const _sfc_main = {
  props: {
    structure: Object
  },
  emits: {
    "update": null
  },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({
      language: props.structure.language,
      hud: props.structure.hud,
      hoverVisibleHud: props.structure.hoverVisibleHud,
      clickVisibleHud: props.structure.clickVisibleHud,
      visibleHudContents: convertPureObject(props.structure.visibleHudContents)
    });
    function onSave() {
      const structure = convertPureObject(state);
      emits("update", structure);
    }
    function onUpdateHudContents(key, value) {
      state.visibleHudContents[key] = value;
      onSave();
    }
    function onClickBackup() {
      if (!confirm(t("confirm.backup")))
        return;
      let result = {
        preference: convertPureObject(store.state.preference),
        tree: convertPureObject(store.state.tree)
      };
      const date = new Date();
      let dateFormat = `${date.getFullYear()}${twoDigit(date.getMonth() + 1)}${twoDigit(date.getDate())}`;
      const element = document.createElement("a");
      element.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result, null, 2))}`);
      element.setAttribute("download", `slideshow_${dateFormat}.json`);
      element.click();
    }
    function onClickRestore() {
      return new Promise((resolve, reject) => {
        const el = document.createElement("input");
        el.setAttribute("type", "file");
        el.setAttribute("accept", "application/json");
        el.addEventListener("change", (e) => {
          if (!(e.target.files && e.target.files.length > 0)) {
            alert(t("alert.noSelectedFile"));
            return;
          }
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e2) => {
            try {
              let json = JSON.parse(String(e2.target.result));
              if (!confirm(t("confirm.restore")))
                return;
              if (!(json.preference || json.tree))
                throw new Error("no data");
              if (json.preference)
                store.dispatch("changePreference", json.preference);
              if (json.tree)
                store.dispatch("changeTree", json.tree);
              store.dispatch("changeMode", null);
              store.dispatch("changeActiveSlide", store.state.preference.slides.initialNumber);
              store.dispatch("changeAutoplay", false);
              store.commit("updateUseKeyboardEvent", true);
              alert(t("alert.completeRestore"));
              main.restart().then();
            } catch (e3) {
              if (window.dev)
                console.error(e3.message);
              alert(t("alert.failedRestore"));
            }
          };
          reader.readAsText(file);
        }, false);
        el.click();
      });
    }
    function onClickReset() {
      if (!confirm(t("confirm.reset")))
        return;
      store.dispatch("reset").then(() => main.restart().then());
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("fieldset", null, [
        _hoisted_1,
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createElementVNode("h3", _hoisted_4, [
              createElementVNode("label", _hoisted_5, toDisplayString(unref(t)("base.language")), 1)
            ]),
            createElementVNode("p", _hoisted_6, toDisplayString(unref(t)("description.language")), 1),
            createElementVNode("div", _hoisted_7, [
              createVNode(FormSelect, {
                name: "pref_language",
                id: "pref_language",
                modelValue: unref(state).language,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => unref(state).language = $event),
                  onSave
                ]
              }, {
                default: withCtx(() => [
                  createElementVNode("option", _hoisted_8, toDisplayString(unref(t)("language.en")), 1),
                  createElementVNode("option", _hoisted_9, toDisplayString(unref(t)("language.ko")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          _hoisted_10,
          createElementVNode("div", _hoisted_11, [
            createElementVNode("div", _hoisted_12, [
              createElementVNode("h3", _hoisted_13, [
                createElementVNode("label", _hoisted_14, toDisplayString(unref(t)("base.hud")), 1)
              ]),
              createElementVNode("p", _hoisted_15, toDisplayString(unref(t)("description.hud")), 1)
            ]),
            createElementVNode("div", _hoisted_16, [
              createVNode(FormSwitch, {
                name: "pref_hud",
                id: "pref_hud",
                modelValue: unref(state).hud,
                "onUpdate:modelValue": [
                  _cache[1] || (_cache[1] = ($event) => unref(state).hud = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_17, [
            createElementVNode("div", _hoisted_18, [
              createElementVNode("h3", _hoisted_19, [
                createElementVNode("label", _hoisted_20, toDisplayString(unref(t)("title.hoverVisibleHud")), 1)
              ]),
              createElementVNode("p", _hoisted_21, toDisplayString(unref(t)("description.hoverVisibleHud")), 1)
            ]),
            createElementVNode("div", _hoisted_22, [
              createVNode(FormSwitch, {
                name: "pref_hoverVisibleHud",
                id: "pref_hoverVisibleHud",
                modelValue: unref(state).hoverVisibleHud,
                "onUpdate:modelValue": [
                  _cache[2] || (_cache[2] = ($event) => unref(state).hoverVisibleHud = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_23, [
            createElementVNode("div", _hoisted_24, [
              createElementVNode("h3", _hoisted_25, [
                createElementVNode("label", _hoisted_26, toDisplayString(unref(t)("title.touchHud")), 1)
              ]),
              createElementVNode("p", _hoisted_27, toDisplayString(unref(t)("description.touchHud")), 1)
            ]),
            createElementVNode("div", _hoisted_28, [
              createVNode(FormSwitch, {
                name: "pref_clickVisibleHud",
                id: "pref_clickVisibleHud",
                modelValue: unref(state).clickVisibleHud,
                "onUpdate:modelValue": [
                  _cache[3] || (_cache[3] = ($event) => unref(state).clickVisibleHud = $event),
                  onSave
                ]
              }, null, 8, ["modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_29, [
            createElementVNode("h3", _hoisted_30, [
              createElementVNode("label", _hoisted_31, toDisplayString(unref(t)("title.visibleContents")), 1)
            ]),
            createElementVNode("p", _hoisted_32, toDisplayString(unref(t)("description.visibleContents")), 1),
            createElementVNode("div", _hoisted_33, [
              createElementVNode("ul", _hoisted_34, [
                createElementVNode("li", null, [
                  createVNode(FormCheckbox, {
                    name: "pref_hudContents",
                    id: "pref_hudContents",
                    label: unref(t)("base.menu"),
                    modelValue: unref(state).visibleHudContents.menu,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = (o) => onUpdateHudContents("menu", o))
                  }, null, 8, ["label", "modelValue"])
                ]),
                createElementVNode("li", null, [
                  createVNode(FormCheckbox, {
                    name: "pref_hudContents",
                    label: unref(t)("base.caption"),
                    modelValue: unref(state).visibleHudContents.caption,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = (o) => onUpdateHudContents("caption", o))
                  }, null, 8, ["label", "modelValue"])
                ]),
                createElementVNode("li", null, [
                  createVNode(FormCheckbox, {
                    name: "pref_hudContents",
                    label: unref(t)("base.controller"),
                    modelValue: unref(state).visibleHudContents.controller,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = (o) => onUpdateHudContents("controller", o))
                  }, null, 8, ["label", "modelValue"])
                ]),
                createElementVNode("li", null, [
                  createVNode(FormCheckbox, {
                    name: "pref_hudContents",
                    label: unref(t)("base.paginate"),
                    modelValue: unref(state).visibleHudContents.paginate,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = (o) => onUpdateHudContents("paginate", o))
                  }, null, 8, ["label", "modelValue"])
                ]),
                createElementVNode("li", null, [
                  createVNode(FormCheckbox, {
                    name: "pref_hudContents",
                    label: unref(t)("base.group"),
                    modelValue: unref(state).visibleHudContents.group,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = (o) => onUpdateHudContents("group", o))
                  }, null, 8, ["label", "modelValue"])
                ])
              ])
            ])
          ]),
          _hoisted_35,
          createElementVNode("div", _hoisted_36, [
            createElementVNode("h3", _hoisted_37, [
              createElementVNode("label", null, toDisplayString(unref(t)("title.backupOrRestore")), 1)
            ]),
            createElementVNode("p", _hoisted_38, toDisplayString(unref(t)("description.backup")), 1),
            createElementVNode("div", _hoisted_39, [
              createElementVNode("div", _hoisted_40, [
                createElementVNode("div", null, [
                  createVNode(ButtonBasic, {
                    color: "key",
                    onClick: onClickBackup
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("base.backup")), 1)
                    ]),
                    _: 1
                  })
                ]),
                createElementVNode("div", null, [
                  createVNode(ButtonBasic, {
                    color: "key",
                    onClick: onClickRestore
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("base.restore")), 1)
                    ]),
                    _: 1
                  })
                ])
              ])
            ])
          ]),
          createElementVNode("div", _hoisted_41, [
            createElementVNode("h3", _hoisted_42, [
              createElementVNode("label", null, toDisplayString(unref(t)("base.reset")), 1)
            ]),
            createElementVNode("p", _hoisted_43, toDisplayString(unref(t)("description.reset")), 1),
            createElementVNode("div", _hoisted_44, [
              createVNode(ButtonBasic, {
                color: "danger",
                onClick: onClickReset
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("base.resetSlideshow")), 1)
                ]),
                _: 1
              })
            ])
          ])
        ])
      ]);
    };
  }
};
var General = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-20ae9ce0"]]);
export { General as default };
//# sourceMappingURL=General.js.map
