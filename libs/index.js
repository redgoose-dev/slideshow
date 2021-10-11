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
import { defineComponent, resolveComponent, openBlock, createElementBlock, createVNode, createElementVNode, toDisplayString, unref, renderSlot, reactive, Fragment, renderList, normalizeClass, createCommentVNode, withCtx, createTextVNode, pushScopeId, popScopeId, ref, computed, createBlock, Teleport } from "vue";
import { I as Icon, _ as _export_sfc, i as i18n, c as convertPureObject, a as getFileData, b as getApiData, d as checkTree } from "./exports.js";
import { B as ButtonBasic, v as validUrl, o as objectToString } from "./Basic.js";
import { F as FormText } from "./Text.js";
import { F as FormRadio } from "./Radio.js";
import "vuex";
import "vue-i18n/index";
var ButtonIcon_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$8 = defineComponent({
  name: "PreferenceDataButtonIcon",
  components: {
    Icon
  },
  props: {
    iconName: String,
    title: String
  }
});
const _hoisted_1$8 = ["title"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Icon = resolveComponent("Icon");
  return openBlock(), createElementBlock("button", {
    type: "button",
    title: _ctx.title,
    class: "button-icon"
  }, [
    createVNode(_component_Icon, { "icon-name": _ctx.iconName }, null, 8, ["icon-name"])
  ], 8, _hoisted_1$8);
}
var ButtonIcon = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render], ["__scopeId", "data-v-2958fe58"]]);
var ModalWrapper_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$7 = { class: "modal-wrapper__header" };
const _hoisted_2$7 = ["title"];
const _hoisted_3$6 = { class: "modal-wrapper__body" };
const _sfc_main$7 = {
  props: {
    title: { type: String, default: "Title" }
  },
  emits: { "close": null },
  setup(__props, { emit: emits }) {
    const { t } = i18n.global;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", {
        class: "modal-wrapper",
        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
      }, [
        createElementVNode("div", {
          class: "modal-wrapper__box",
          onClick: _cache[1] || (_cache[1] = (e) => {
            e.stopPropagation();
          })
        }, [
          createElementVNode("header", _hoisted_1$7, [
            createElementVNode("h2", null, toDisplayString(__props.title), 1),
            createElementVNode("nav", null, [
              createElementVNode("button", {
                type: "button",
                title: unref(t)("base.close"),
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
              }, [
                createVNode(Icon, { "icon-name": "x" })
              ], 8, _hoisted_2$7)
            ])
          ]),
          createElementVNode("div", _hoisted_3$6, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ])
      ]);
    };
  }
};
var ModalWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-27c2820a"]]);
var Slides_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$6 = ["data-key"];
const _hoisted_2$6 = ["data-key"];
const _hoisted_3$5 = { class: "data-slide__handle" };
const _hoisted_4$5 = { class: "data-slide__body" };
const _hoisted_5$5 = { key: 0 };
const _hoisted_6$5 = ["href"];
const _hoisted_7$5 = ["href"];
const _hoisted_8$5 = { class: "data-slide__nav" };
const _hoisted_9$5 = ["title", "onClick"];
const _hoisted_10$4 = ["title", "onClick"];
const _hoisted_11$3 = {
  key: 0,
  class: "data-slides__empty"
};
const _sfc_main$6 = {
  props: {
    itemKey: String,
    items: { type: Array, required: true }
  },
  emits: {
    "change-order": null,
    "edit": null,
    "remove": null
  },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({
      dragStartKey: void 0,
      dragPlaceholderKey: void 0
    });
    let dragTarget;
    let dragItems;
    function getTargetElement(el) {
      return el.dataset.key ? el : el.closest("li");
    }
    function onMouseDown(e) {
      dragTarget = e.target;
    }
    function onDragStart(e) {
      if (!dragTarget.closest(".data-slide__handle > i")) {
        e.preventDefault();
        return;
      }
      dragTarget = getTargetElement(e.target);
      dragItems = dragTarget.parentNode.children;
      state.dragStartKey = Number(dragTarget.dataset.key);
      for (let i = 0; i < dragItems.length; i++) {
        dragItems[i].addEventListener("dragover", onDragOver);
        dragItems[i].addEventListener("drop", onDrop);
        dragItems[i].addEventListener("dragend", onDragEnd);
      }
    }
    function onDragOver(e) {
      if (e.preventDefault)
        e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      let target = getTargetElement(e.target);
      state.dragPlaceholderKey = Number(target.dataset.key);
    }
    function onDrop(e) {
      let target = getTargetElement(e.target);
      if (state.dragStartKey === state.dragPlaceholderKey)
        return;
      let clone = convertPureObject(props.items);
      clone.splice(state.dragStartKey, 1);
      clone.splice(Number(target.dataset.key), 0, convertPureObject(props.items[state.dragStartKey]));
      context.emit("change-order", clone);
    }
    function onDragEnd() {
      if (!(dragTarget && dragItems))
        return;
      for (let i = 0; i < dragItems.length; i++) {
        dragItems[i].removeEventListener("dragover", onDragOver);
        dragItems[i].removeEventListener("drop", onDrop);
        dragItems[i].removeEventListener("dragend", onDragEnd);
      }
      dragTarget = void 0;
      dragItems = void 0;
      state.dragStartKey = void 0;
      state.dragPlaceholderKey = void 0;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", {
        "data-key": __props.itemKey,
        class: "data-slides"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (slide, k) => {
          return openBlock(), createElementBlock("li", {
            "data-key": k,
            draggable: true,
            class: normalizeClass([
              "data-slide",
              unref(state).dragStartKey === k && "data-slide--start",
              unref(state).dragStartKey !== unref(state).dragPlaceholderKey && unref(state).dragPlaceholderKey === k && "data-slide--placeholder"
            ]),
            onMousedown: onMouseDown,
            onDragstart: onDragStart
          }, [
            createElementVNode("div", _hoisted_3$5, [
              createElementVNode("i", null, [
                createVNode(Icon, { "icon-name": "menu-flat" })
              ])
            ]),
            createElementVNode("div", _hoisted_4$5, [
              createElementVNode("h4", {
                class: normalizeClass(!slide.title ? "none" : "")
              }, toDisplayString(slide.title || "None"), 3),
              slide.description ? (openBlock(), createElementBlock("p", _hoisted_5$5, toDisplayString(slide.description), 1)) : createCommentVNode("", true),
              createElementVNode("nav", null, [
                createElementVNode("a", {
                  href: slide.src,
                  target: "_blank"
                }, toDisplayString(unref(t)("base.image")), 9, _hoisted_6$5),
                slide.thumbnail ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  href: slide.thumbnail,
                  target: "_blank"
                }, toDisplayString(unref(t)("base.thumbnail")), 9, _hoisted_7$5)) : createCommentVNode("", true)
              ])
            ]),
            createElementVNode("nav", _hoisted_8$5, [
              createElementVNode("button", {
                type: "button",
                title: unref(t)("base.edit"),
                class: "edit",
                onClick: ($event) => _ctx.$emit("edit", k)
              }, [
                createVNode(Icon, { "icon-name": "edit" })
              ], 8, _hoisted_9$5),
              createElementVNode("button", {
                type: "button",
                title: unref(t)("base.remove"),
                class: "remove",
                onClick: ($event) => _ctx.$emit("remove", k)
              }, [
                createVNode(Icon, { "icon-name": "x" })
              ], 8, _hoisted_10$4)
            ])
          ], 42, _hoisted_2$6);
        }), 256)),
        !(__props.items && __props.items.length > 0) ? (openBlock(), createElementBlock("li", _hoisted_11$3, toDisplayString(unref(t)("description.empty")), 1)) : createCommentVNode("", true)
      ], 8, _hoisted_1$6);
    };
  }
};
var Slides = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-5d3e8550"]]);
var ManageGroup_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-3af212e7"), n = n(), popScopeId(), n);
const _hoisted_1$5 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("legend", null, "Manage slides group fields", -1));
const _hoisted_2$5 = { class: "fields" };
const _hoisted_3$4 = { class: "field-basic" };
const _hoisted_4$4 = { class: "field-title" };
const _hoisted_5$4 = {
  for: "pref_key",
  class: "required"
};
const _hoisted_6$4 = { class: "field-description" };
const _hoisted_7$4 = { class: "field-basic__body" };
const _hoisted_8$4 = { class: "field-basic" };
const _hoisted_9$4 = { class: "field-title" };
const _hoisted_10$3 = { for: "pref_name" };
const _hoisted_11$2 = { class: "field-description" };
const _hoisted_12$2 = { class: "field-basic__body" };
const _hoisted_13$2 = { class: "field-basic" };
const _hoisted_14$2 = { class: "field-title" };
const _hoisted_15$2 = { for: "pref_description" };
const _hoisted_16$1 = { class: "field-description" };
const _hoisted_17$1 = { class: "field-basic__body" };
const _hoisted_18$1 = { class: "field-basic" };
const _hoisted_19$1 = { class: "field-title" };
const _hoisted_20$1 = { for: "pref_slideType" };
const _hoisted_21$1 = { class: "field-description" };
const _hoisted_22$1 = { class: "field-basic__body" };
const _hoisted_23$1 = {
  key: 0,
  class: "field-basic"
};
const _hoisted_24$1 = { class: "field-title" };
const _hoisted_25$1 = { for: "pref_slidesUrl" };
const _hoisted_26 = { class: "field-description" };
const _hoisted_27 = { class: "field-basic__body" };
const _hoisted_28 = { class: "submit-buttons" };
const _sfc_main$5 = {
  props: { form: Object },
  emits: { "submit": null },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({
      form: props.form,
      error: {
        key: false
      },
      slides: {
        type: props.form.slidesType || "array",
        url: props.form.slidesUrl || ""
      }
    });
    function onUpdateKey(str) {
      if (!str)
        state.error.key = true;
      state.error.key = !/^[a-zA-Z0-9_]+$/.test(str);
    }
    function onSubmit(e) {
      e.preventDefault();
      try {
        if (state.error.key) {
          throw new Error("error value / key");
        }
        emits("submit", state.form);
      } catch (e2) {
        if (window.dev)
          console.error(e2.message);
        alert(t("alert.errorSubmit"));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("form", { onSubmit }, [
        createElementVNode("fieldset", null, [
          _hoisted_1$5,
          createElementVNode("div", _hoisted_2$5, [
            createElementVNode("div", _hoisted_3$4, [
              createElementVNode("h3", _hoisted_4$4, [
                createElementVNode("label", _hoisted_5$4, toDisplayString(unref(t)("base.groupKey")), 1)
              ]),
              createElementVNode("p", _hoisted_6$4, toDisplayString(unref(t)("description.inputKeyOnGroup")), 1),
              createElementVNode("div", _hoisted_7$4, [
                createVNode(FormText, {
                  name: "pref_key",
                  id: "pref_key",
                  placeholder: unref(t)("base.inputKey"),
                  inline: true,
                  required: true,
                  size: 24,
                  maxlength: 20,
                  color: unref(state).error.key ? "error" : "",
                  modelValue: unref(state).form.key,
                  "onUpdate:modelValue": [
                    _cache[0] || (_cache[0] = ($event) => unref(state).form.key = $event),
                    onUpdateKey
                  ]
                }, null, 8, ["placeholder", "color", "modelValue"])
              ])
            ]),
            createElementVNode("div", _hoisted_8$4, [
              createElementVNode("h3", _hoisted_9$4, [
                createElementVNode("label", _hoisted_10$3, toDisplayString(unref(t)("base.name")), 1)
              ]),
              createElementVNode("p", _hoisted_11$2, toDisplayString(unref(t)("description.setCategoryName")), 1),
              createElementVNode("div", _hoisted_12$2, [
                createVNode(FormText, {
                  name: "pref_name",
                  id: "pref_name",
                  placeholder: unref(t)("base.inputText"),
                  maxlength: 32,
                  modelValue: unref(state).form.name,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(state).form.name = $event)
                }, null, 8, ["placeholder", "modelValue"])
              ])
            ])
          ]),
          createElementVNode("div", _hoisted_13$2, [
            createElementVNode("h3", _hoisted_14$2, [
              createElementVNode("label", _hoisted_15$2, toDisplayString(unref(t)("base.description")), 1)
            ]),
            createElementVNode("p", _hoisted_16$1, toDisplayString(unref(t)("description.setCategoryDescription")), 1),
            createElementVNode("div", _hoisted_17$1, [
              createVNode(FormText, {
                name: "pref_description",
                id: "pref_description",
                placeholder: unref(t)("base.inputText"),
                maxlength: 80,
                modelValue: unref(state).form.description,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(state).form.description = $event)
              }, null, 8, ["placeholder", "modelValue"])
            ])
          ]),
          createElementVNode("div", _hoisted_18$1, [
            createElementVNode("h3", _hoisted_19$1, [
              createElementVNode("label", _hoisted_20$1, toDisplayString(unref(t)("title.selectSlidesType")), 1)
            ]),
            createElementVNode("p", _hoisted_21$1, toDisplayString(unref(t)("description.selectSlidesType")) + " " + toDisplayString(__props.form.type === "edit" ? unref(t)("description.selectSlidesType2") : ""), 1),
            createElementVNode("div", _hoisted_22$1, [
              createVNode(FormRadio, {
                type: "button",
                name: "pref_slideType",
                id: "prof_slideType",
                title: unref(t)("title.selectSlidesType"),
                items: [
                  { key: "array", label: unref(t)("base.array") },
                  { key: "url", label: `URL ${unref(t)("base.address")}` }
                ],
                modelValue: unref(state).form.slidesType,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(state).form.slidesType = $event)
              }, null, 8, ["title", "items", "modelValue"])
            ])
          ]),
          unref(state).form.slidesType === "url" ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
            createElementVNode("h3", _hoisted_24$1, [
              createElementVNode("label", _hoisted_25$1, toDisplayString(unref(t)("title.slidesUrlAddress")), 1)
            ]),
            createElementVNode("p", _hoisted_26, toDisplayString(unref(t)("description.inputSlidesUrl")), 1),
            createElementVNode("div", _hoisted_27, [
              createVNode(FormText, {
                name: "pref_slidesUrl",
                id: "pref_slidesUrl",
                placeholder: unref(t)("base.inputUrl"),
                required: true,
                modelValue: unref(state).form.slidesUrl,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(state).form.slidesUrl = $event)
              }, null, 8, ["placeholder", "modelValue"])
            ])
          ])) : createCommentVNode("", true),
          createElementVNode("nav", _hoisted_28, [
            createElementVNode("div", null, [
              createVNode(ButtonBasic, {
                type: "submit",
                color: "key",
                inline: true
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.form.type === "add" ? unref(t)("label.addGroup") : unref(t)("label.editGroup")), 1)
                ]),
                _: 1
              })
            ])
          ])
        ])
      ], 32);
    };
  }
};
var ManageGroup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-3af212e7"]]);
var ManageSlide_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-7af839c4"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("legend", null, "Manage slide fields", -1));
const _hoisted_2$4 = { class: "fields" };
const _hoisted_3$3 = { class: "field-basic" };
const _hoisted_4$3 = { class: "field-title" };
const _hoisted_5$3 = {
  for: "pref_src",
  class: "required"
};
const _hoisted_6$3 = { class: "field-description" };
const _hoisted_7$3 = { class: "field-multiple" };
const _hoisted_8$3 = { class: "field-multiple__body" };
const _hoisted_9$3 = { class: "field-basic" };
const _hoisted_10$2 = { class: "field-title" };
const _hoisted_11$1 = { for: "pref_thumbnail" };
const _hoisted_12$1 = { class: "field-description" };
const _hoisted_13$1 = { class: "field-multiple" };
const _hoisted_14$1 = { class: "field-multiple__body" };
const _hoisted_15$1 = { class: "field-basic" };
const _hoisted_16 = { class: "field-title" };
const _hoisted_17 = { for: "pref_title" };
const _hoisted_18 = { class: "field-description" };
const _hoisted_19 = { class: "field-basic__body" };
const _hoisted_20 = { class: "field-basic" };
const _hoisted_21 = { class: "field-title" };
const _hoisted_22 = { for: "pref_description" };
const _hoisted_23 = { class: "field-description" };
const _hoisted_24 = { class: "field-basic__body" };
const _hoisted_25 = { class: "submit-buttons" };
const _sfc_main$4 = {
  props: { form: Object },
  emits: { "submit": null },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({ form: props.form });
    const src = ref(null);
    const thumbnail = ref(null);
    function onClickCheckUrl(key) {
      const check = validUrl(state.form[key]);
      if (check) {
        window.open(state.form[key]);
      } else {
        alert(t("alert.invalidAddress"));
        switch (key) {
          case "src":
            src.value.focus();
            break;
          case "thumbnail":
            thumbnail.value.focus();
            break;
        }
      }
    }
    function onSubmit(e) {
      e.preventDefault();
      try {
        if (!(state.form.src && validUrl(state.form.src))) {
          src.value.focus();
          throw new Error("no image src address");
        }
        emits("submit", state.form);
      } catch (e2) {
        if (window.dev)
          console.error(e2.message);
        alert(t("alert.errorSubmit"));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("form", { onSubmit }, [
        createElementVNode("fieldset", null, [
          _hoisted_1$4,
          createElementVNode("div", _hoisted_2$4, [
            createElementVNode("div", _hoisted_3$3, [
              createElementVNode("h3", _hoisted_4$3, [
                createElementVNode("label", _hoisted_5$3, toDisplayString(unref(t)("base.imageUrl")), 1)
              ]),
              createElementVNode("p", _hoisted_6$3, toDisplayString(unref(t)("description.inputImageUrl")), 1),
              createElementVNode("div", _hoisted_7$3, [
                createElementVNode("div", _hoisted_8$3, [
                  createVNode(FormText, {
                    ref: (_value, _refs) => {
                      _refs["src"] = _value;
                      src.value = _value;
                    },
                    name: "pref_src",
                    id: "pref_src",
                    placeholder: unref(t)("base.inputUrl"),
                    required: false,
                    modelValue: unref(state).form.src,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(state).form.src = $event)
                  }, null, 8, ["placeholder", "modelValue"])
                ]),
                createElementVNode("nav", null, [
                  createVNode(ButtonBasic, {
                    type: "button",
                    onClick: _cache[1] || (_cache[1] = ($event) => onClickCheckUrl("src"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("base.openUrl")), 1)
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            createElementVNode("div", _hoisted_9$3, [
              createElementVNode("h3", _hoisted_10$2, [
                createElementVNode("label", _hoisted_11$1, toDisplayString(unref(t)("base.urlThumbnailUrl")), 1)
              ]),
              createElementVNode("p", _hoisted_12$1, toDisplayString(unref(t)("description.inputThumbnailUrl")), 1),
              createElementVNode("div", _hoisted_13$1, [
                createElementVNode("div", _hoisted_14$1, [
                  createVNode(FormText, {
                    ref: (_value, _refs) => {
                      _refs["thumbnail"] = _value;
                      thumbnail.value = _value;
                    },
                    name: "pref_thumbnail",
                    id: "pref_thumbnail",
                    placeholder: unref(t)("base.inputUrl"),
                    modelValue: unref(state).form.thumbnail,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(state).form.thumbnail = $event)
                  }, null, 8, ["placeholder", "modelValue"])
                ]),
                createElementVNode("nav", null, [
                  createVNode(ButtonBasic, {
                    type: "button",
                    onClick: _cache[3] || (_cache[3] = ($event) => onClickCheckUrl("thumbnail"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("base.openUrl")), 1)
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            createElementVNode("div", _hoisted_15$1, [
              createElementVNode("h3", _hoisted_16, [
                createElementVNode("label", _hoisted_17, toDisplayString(unref(t)("base.subject")), 1)
              ]),
              createElementVNode("p", _hoisted_18, toDisplayString(unref(t)("description.inputSlideTitle")), 1),
              createElementVNode("div", _hoisted_19, [
                createVNode(FormText, {
                  name: "pref_title",
                  id: "pref_title",
                  placeholder: unref(t)("base.inputText"),
                  modelValue: unref(state).form.title,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(state).form.title = $event)
                }, null, 8, ["placeholder", "modelValue"])
              ])
            ]),
            createElementVNode("div", _hoisted_20, [
              createElementVNode("h3", _hoisted_21, [
                createElementVNode("label", _hoisted_22, toDisplayString(unref(t)("base.description")), 1)
              ]),
              createElementVNode("p", _hoisted_23, toDisplayString(unref(t)("description.inputDescriptionSlide")), 1),
              createElementVNode("div", _hoisted_24, [
                createVNode(FormText, {
                  name: "pref_description",
                  id: "pref_description",
                  placeholder: unref(t)("base.inputText"),
                  modelValue: unref(state).form.description,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(state).form.description = $event)
                }, null, 8, ["placeholder", "modelValue"])
              ])
            ])
          ]),
          createElementVNode("nav", _hoisted_25, [
            createElementVNode("div", null, [
              createVNode(ButtonBasic, {
                type: "submit",
                color: "key",
                inline: true
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.form.type === "add" ? unref(t)("base.add") : unref(t)("base.submitEdit")), 1)
                ]),
                _: 1
              })
            ])
          ])
        ])
      ], 32);
    };
  }
};
var ManageSlide = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-7af839c4"]]);
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$3 = { class: "manage-tree" };
const _hoisted_2$3 = { class: "tree-item" };
const _hoisted_3$2 = { class: "tree-item__header" };
const _hoisted_4$2 = ["title", "disabled", "onClick"];
const _hoisted_5$2 = { key: 0 };
const _hoisted_6$2 = { key: 0 };
const _hoisted_7$2 = ["title", "onClick"];
const _hoisted_8$2 = ["title", "onClick"];
const _hoisted_9$2 = ["title", "onClick"];
const _hoisted_10$1 = { class: "add-tree" };
const _sfc_main$3 = {
  props: {
    tree: { type: Object, required: true }
  },
  emits: { "update": null },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let state = reactive({
      fold: createFold(),
      dragPlaceholder: void 0,
      showManageGroup: false,
      showManageSlide: false,
      manageFormGroup: void 0,
      editFormSlide: void 0
    });
    let computes = reactive({
      index: computed(() => {
        const keys = Object.keys(props.tree);
        return keys.map((key) => __spreadProps(__spreadValues({}, props.tree[key]), {
          fold: Array.isArray(props.tree[key].slides),
          key
        }));
      })
    });
    function createFold() {
      let obj = {};
      Object.keys(props.tree).forEach((key) => {
        obj[key] = false;
      });
      return obj;
    }
    function onUpdateSlides(key, newSlides) {
      let clone = convertPureObject(props.tree);
      clone[key].slides = newSlides;
      emits("update", clone);
    }
    function onToggleFold(key, sw = void 0) {
      state.fold[key] = sw === void 0 ? !state.fold[key] : sw;
    }
    function onAddGroup() {
      state.manageFormGroup = {
        type: "add",
        key: "",
        name: "",
        description: "",
        slidesType: "array",
        slidesUrl: ""
      };
      state.showManageGroup = true;
    }
    function onEditGroup(key) {
      state.manageFormGroup = {
        type: "edit",
        key,
        originalKey: key,
        name: props.tree[key].name,
        description: props.tree[key].description,
        slidesType: Array.isArray(props.tree[key].slides) ? "array" : "url",
        slidesUrl: typeof props.tree[key].slides === "string" ? props.tree[key].slides : ""
      };
      state.showManageGroup = true;
    }
    function onRemoveGroup(key) {
      if (!confirm(t("confirm.remove")))
        return;
      let clone = convertPureObject(props.tree);
      delete clone[key];
      emits("update", clone);
    }
    function onSubmitGroup(res) {
      try {
        let testKey = function(str) {
          if (!/^[a-zA-Z0-9_]+$/.test(str))
            throw new Error("Error key");
          if (props.tree[str])
            throw new Error("The value exists.");
          return key;
        };
        const { key, originalKey, type, name, description, slidesUrl } = res;
        let newKey;
        let clone = convertPureObject(props.tree);
        switch (type) {
          case "add":
            newKey = testKey(key);
            clone[newKey] = {
              name,
              description,
              slides: res.slidesType === "url" ? res.slidesUrl : []
            };
            break;
          case "edit":
            newKey = originalKey !== key ? testKey(key) : key;
            if (!newKey)
              throw new Error("Not a valid key.");
            clone[newKey] = __spreadProps(__spreadValues({}, clone[originalKey]), {
              name,
              description
            });
            if (res.slidesType === "url") {
              clone[newKey].slides = res.slidesUrl;
            } else if (!Array.isArray(clone[newKey].slides)) {
              clone[newKey].slides = [];
            }
            if (originalKey !== key)
              delete clone[originalKey];
            break;
        }
        emits("update", clone);
        state.showManageGroup = false;
      } catch (e) {
        if (window.dev)
          console.error(e.message);
        alert(t("alert.errorSubmit"));
      }
    }
    function onAddSlide(key) {
      state.editFormSlide = {
        type: "add",
        groupKey: key,
        src: "",
        thumbnail: "",
        title: "",
        description: ""
      };
      state.showManageSlide = true;
    }
    function onEditSlide(key, n) {
      const item = props.tree[key].slides[n];
      state.editFormSlide = {
        type: "edit",
        groupKey: key,
        key: n,
        src: item.src,
        thumbnail: item.thumbnail,
        title: item.title,
        description: item.description
      };
      state.showManageSlide = true;
    }
    function onRemoveSlide(key, n) {
      if (!confirm(t("confirm.remove")))
        return;
      let clone = convertPureObject(props.tree);
      clone[key].slides.splice(n, 1);
      emits("update", clone);
    }
    function onSubmitSlide(res) {
      const { type, groupKey, key, src, thumbnail, title, description } = res;
      let clone = convertPureObject(props.tree);
      try {
        const obj = {
          src,
          thumbnail,
          title,
          description
        };
        switch (type) {
          case "add":
            clone[groupKey].slides.push(obj);
            break;
          case "edit":
            clone[groupKey].slides[key] = obj;
            break;
        }
        onToggleFold(groupKey, true);
        emits("update", clone);
        state.showManageSlide = false;
      } catch (e) {
        if (window.dev)
          console.error(e.message);
        alert(t("alert.errorSubmit"));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", _hoisted_1$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(computes).index, (item, k) => {
          return openBlock(), createElementBlock("section", _hoisted_2$3, [
            createElementVNode("header", _hoisted_3$2, [
              createElementVNode("nav", null, [
                createElementVNode("button", {
                  type: "button",
                  title: unref(t)("title.fold"),
                  disabled: !item.fold,
                  class: normalizeClass([
                    item.fold ? "fold" : "minus",
                    item.fold && unref(state).fold[item.key] && "fold--on"
                  ]),
                  onClick: ($event) => onToggleFold(item.key)
                }, [
                  createVNode(Icon, {
                    "icon-name": item.fold ? "arrow-down" : "minus"
                  }, null, 8, ["icon-name"])
                ], 10, _hoisted_4$2)
              ]),
              createElementVNode("h3", null, [
                createElementVNode("strong", null, [
                  createElementVNode("b", null, toDisplayString(item.key), 1),
                  createTextVNode(" " + toDisplayString(item.name) + " ", 1),
                  item.fold ? (openBlock(), createElementBlock("em", _hoisted_5$2, toDisplayString(item.slides.length), 1)) : createCommentVNode("", true)
                ]),
                item.description ? (openBlock(), createElementBlock("span", _hoisted_6$2, toDisplayString(item.description), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("nav", null, [
                item.fold ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  title: unref(t)("label.addSlide"),
                  class: "add",
                  onClick: ($event) => onAddSlide(item.key)
                }, [
                  createVNode(Icon, { "icon-name": "plus" })
                ], 8, _hoisted_7$2)) : createCommentVNode("", true),
                createElementVNode("button", {
                  type: "button",
                  title: unref(t)("label.editGroup"),
                  class: "edit",
                  onClick: ($event) => onEditGroup(item.key)
                }, [
                  createVNode(Icon, { "icon-name": "edit" })
                ], 8, _hoisted_8$2),
                createElementVNode("button", {
                  type: "button",
                  title: unref(t)("label.removeGroup"),
                  class: "remove",
                  onClick: ($event) => onRemoveGroup(item.key)
                }, [
                  createVNode(Icon, { "icon-name": "x" })
                ], 8, _hoisted_9$2)
              ])
            ]),
            unref(state).fold[item.key] && item.fold ? (openBlock(), createBlock(Slides, {
              key: 0,
              "item-key": item.key,
              items: item.slides,
              onChangeOrder: (o) => onUpdateSlides(item.key, o),
              onEdit: (n) => onEditSlide(item.key, n),
              onRemove: (n) => onRemoveSlide(item.key, n)
            }, null, 8, ["item-key", "items", "onChangeOrder", "onEdit", "onRemove"])) : createCommentVNode("", true)
          ]);
        }), 256)),
        createElementVNode("nav", _hoisted_10$1, [
          createVNode(ButtonBasic, {
            title: unref(t)("label.addGroup"),
            color: "key",
            onClick: onAddGroup
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("label.addGroup")), 1)
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        (openBlock(), createBlock(Teleport, { to: "#slideshowModal" }, [
          unref(state).showManageGroup ? (openBlock(), createBlock(ModalWrapper, {
            key: 0,
            title: unref(t)(unref(state).manageFormGroup.type === "edit" ? "label.editGroup" : "label.addGroup"),
            class: "modal-edit-group",
            onClose: _cache[0] || (_cache[0] = ($event) => unref(state).showManageGroup = false)
          }, {
            default: withCtx(() => [
              createVNode(ManageGroup, {
                form: unref(state).manageFormGroup,
                onSubmit: onSubmitGroup
              }, null, 8, ["form"])
            ]),
            _: 1
          }, 8, ["title"])) : createCommentVNode("", true),
          unref(state).showManageSlide ? (openBlock(), createBlock(ModalWrapper, {
            key: 1,
            title: unref(t)(unref(state).editFormSlide.type === "edit" ? "label.editSlide" : "label.addSlide"),
            class: "modal-edit-slide",
            onClose: _cache[1] || (_cache[1] = ($event) => unref(state).showManageSlide = false)
          }, {
            default: withCtx(() => [
              createVNode(ManageSlide, {
                form: unref(state).editFormSlide,
                onSubmit: onSubmitSlide
              }, null, 8, ["form"])
            ]),
            _: 1
          }, 8, ["title"])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
};
var Manage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-8fe99d3c"]]);
var Upload_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1$2 = ["accept", "disabled"];
const _hoisted_2$2 = { class: "form-upload__body" };
const _sfc_main$2 = {
  props: {
    name: String,
    id: String,
    label: { type: String, default: "Please upload file" },
    disabled: Boolean,
    accept: String
  },
  emits: ["change"],
  setup(__props, { expose, emit: emits }) {
    let state = reactive({ filename: "" });
    const input = ref(null);
    function onChange(e) {
      if (!(e.target.files && e.target.files[0]))
        return;
      state.filename = e.target.files[0].name;
      emits("change", e.target.files);
    }
    function focus() {
      input.value.focus();
    }
    expose({
      input,
      focus
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          "form",
          "form-upload",
          __props.disabled && "form-upload--disabled"
        ])
      }, [
        createElementVNode("input", {
          ref: (_value, _refs) => {
            _refs["input"] = _value;
            input.value = _value;
          },
          type: "file",
          class: "form-upload__input",
          accept: __props.accept,
          disabled: __props.disabled,
          onChange
        }, null, 40, _hoisted_1$2),
        createElementVNode("span", _hoisted_2$2, [
          createVNode(Icon, { "icon-name": "file" }),
          createElementVNode("em", null, toDisplayString(unref(state).filename || __props.label), 1),
          createElementVNode("i", null, [
            createVNode(Icon, { "icon-name": "upload" })
          ])
        ])
      ], 2);
    };
  }
};
var FormUpload = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bb58139c"]]);
var ImportData_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-01b5f92e"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("legend", null, "Import data fields", -1));
const _hoisted_2$1 = { class: "fields" };
const _hoisted_3$1 = { class: "field-basic" };
const _hoisted_4$1 = { class: "field-basic__body" };
const _hoisted_5$1 = {
  key: 0,
  class: "field-basic"
};
const _hoisted_6$1 = { class: "field-title" };
const _hoisted_7$1 = { for: "pref_address" };
const _hoisted_8$1 = { class: "field-description" };
const _hoisted_9$1 = { class: "field-basic__body" };
const _hoisted_10 = {
  key: 1,
  class: "field-basic"
};
const _hoisted_11 = { class: "field-title" };
const _hoisted_12 = { for: "pref_address" };
const _hoisted_13 = { class: "field-description" };
const _hoisted_14 = { class: "field-basic__body" };
const _hoisted_15 = { class: "submit-buttons" };
const _sfc_main$1 = {
  emits: { "update": null },
  setup(__props, { emit: emits }) {
    const { t } = i18n.global;
    let state = reactive({
      mode: "address",
      address: "https://raw.githubusercontent.com/redgoose-dev/slideshow/main/resource/example/tree.json",
      file: null,
      processing: false
    });
    const address = ref(null);
    const file = ref(null);
    function onSelectFile(e) {
      if (e[0])
        state.file = e[0];
    }
    async function onSubmit(e) {
      e.preventDefault();
      state.processing = true;
      try {
        let res;
        switch (state.mode) {
          case "address":
            if (!state.address) {
              address.value.focus();
              throw new Error("no address");
            }
            res = await getApiData(state.address);
            break;
          case "file":
            if (!state.file) {
              file.value.focus();
              throw new Error("no file");
            }
            res = await getFileData(state.file);
            break;
          default:
            throw new Error("no mode");
        }
        if (Array.isArray(res)) {
          res = {
            default: {
              slides: res
            }
          };
        }
        checkTree(res);
        emits("update", res);
        state.processing = false;
      } catch (e2) {
        if (window.dev)
          console.error(e2.message);
        alert(t("alert.failedGetData"));
        state.processing = false;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("form", {
        class: "import-data",
        onSubmit
      }, [
        createElementVNode("fieldset", null, [
          _hoisted_1$1,
          createElementVNode("div", _hoisted_2$1, [
            createElementVNode("div", _hoisted_3$1, [
              createElementVNode("div", _hoisted_4$1, [
                createVNode(FormRadio, {
                  name: "pref_mode",
                  id: "prof_mode",
                  title: unref(t)("description.importDataMethod"),
                  items: [
                    { key: "address", label: unref(t)("base.address") },
                    { key: "file", label: unref(t)("base.file") }
                  ],
                  modelValue: unref(state).mode,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(state).mode = $event)
                }, null, 8, ["title", "items", "modelValue"])
              ])
            ]),
            unref(state).mode === "address" ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
              createElementVNode("h3", _hoisted_6$1, [
                createElementVNode("label", _hoisted_7$1, toDisplayString(unref(t)("title.importDataByAddress")), 1)
              ]),
              createElementVNode("p", _hoisted_8$1, toDisplayString(unref(t)("description.getDataByRestAPI")), 1),
              createElementVNode("div", _hoisted_9$1, [
                createVNode(FormText, {
                  ref: (_value, _refs) => {
                    _refs["address"] = _value;
                    address.value = _value;
                  },
                  name: "pref_address",
                  id: "pref_address",
                  placeholder: unref(t)("base.inputAddress"),
                  modelValue: unref(state).address,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(state).address = $event)
                }, null, 8, ["placeholder", "modelValue"])
              ])
            ])) : createCommentVNode("", true),
            unref(state).mode === "file" ? (openBlock(), createElementBlock("div", _hoisted_10, [
              createElementVNode("h3", _hoisted_11, [
                createElementVNode("label", _hoisted_12, toDisplayString(unref(t)("title.importDataByFile")), 1)
              ]),
              createElementVNode("p", _hoisted_13, toDisplayString(unref(t)("description.getJsonFile")), 1),
              createElementVNode("div", _hoisted_14, [
                createVNode(FormUpload, {
                  ref: (_value, _refs) => {
                    _refs["file"] = _value;
                    file.value = _value;
                  },
                  accept: "application/json",
                  label: unref(t)("description.selectJsonFile"),
                  onChange: onSelectFile
                }, null, 8, ["label"])
              ])
            ])) : createCommentVNode("", true)
          ]),
          createElementVNode("nav", _hoisted_15, [
            createElementVNode("div", null, [
              createVNode(ButtonBasic, {
                type: "submit",
                color: unref(state).processing ? "" : "key",
                disabled: unref(state).processing,
                inline: true
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(state).processing ? unref(t)("base.processing") : unref(t)("label.getData")), 1)
                ]),
                _: 1
              }, 8, ["color", "disabled"])
            ])
          ])
        ])
      ], 32);
    };
  }
};
var ImportData = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-01b5f92e"]]);
var index_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-470f5195"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "pref-data" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "Data fields", -1));
const _hoisted_3 = { class: "fields" };
const _hoisted_4 = { class: "field-basic" };
const _hoisted_5 = { class: "field-title" };
const _hoisted_6 = { class: "field-basic__body" };
const _hoisted_7 = { class: "manage-tree" };
const _hoisted_8 = { class: "manage-tree-toolbar" };
const _hoisted_9 = { class: "manage-tree-body" };
const _sfc_main = {
  props: { structure: Object },
  emits: { "update": null },
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = i18n.global;
    let localState = reactive({
      mode: "basic",
      showImportData: false,
      textTreeColor: void 0
    });
    let state = reactive({
      tree: localState.mode === "advanced" ? JSON.stringify(props.structure.tree, null, 2) : props.structure.tree
    });
    let timer;
    function onChangeMode(key) {
      try {
        switch (key) {
          case "basic":
            let tree = JSON.parse(state.tree);
            if (!checkTree(tree))
              ;
            state.tree = tree;
            localState.mode = key;
            break;
          case "advanced":
            state.tree = objectToString(state.tree);
            localState.mode = key;
            break;
        }
      } catch (e) {
        if (window.dev)
          console.error(e.message);
        alert(t("alert.invalidData"));
      }
    }
    function onUpdateTreeSource(str) {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          let tree = JSON.parse(str);
          localState.textTreeColor = void 0;
          emits("update", { tree });
        } catch (e) {
          localState.textTreeColor = "error";
        }
      }, 600);
    }
    function onUpdateTreeUI(tree) {
      state.tree = tree;
      emits("update", { tree });
    }
    function onImportData(res) {
      switch (localState.mode) {
        case "advanced":
          state.tree = objectToString(res);
          break;
        default:
          state.tree = res;
          break;
      }
      emits("update", { tree: res });
      localState.showImportData = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("fieldset", _hoisted_1, [
        _hoisted_2,
        createElementVNode("div", _hoisted_3, [
          createElementVNode("div", _hoisted_4, [
            createElementVNode("h3", _hoisted_5, toDisplayString(unref(t)("title.manageSlideData")), 1),
            createElementVNode("div", _hoisted_6, [
              createElementVNode("div", _hoisted_7, [
                createElementVNode("nav", _hoisted_8, [
                  createElementVNode("div", null, [
                    createVNode(FormRadio, {
                      type: "button",
                      name: "pref_mode",
                      id: "prof_mode",
                      title: unref(t)("title.changeMode"),
                      items: [
                        { key: "basic", label: unref(t)("base.basic") },
                        { key: "advanced", label: unref(t)("base.advanced") }
                      ],
                      modelValue: unref(localState).mode,
                      "onUpdate:modelValue": onChangeMode,
                      class: "manage-tree__mode"
                    }, null, 8, ["title", "items", "modelValue"])
                  ]),
                  createElementVNode("div", null, [
                    createVNode(ButtonIcon, {
                      title: unref(t)("title.importSlideData"),
                      "icon-name": "download",
                      class: "manage-tree__button",
                      onClick: _cache[0] || (_cache[0] = ($event) => unref(localState).showImportData = true)
                    }, null, 8, ["title"])
                  ])
                ]),
                createElementVNode("div", _hoisted_9, [
                  unref(localState).mode === "basic" ? (openBlock(), createBlock(Manage, {
                    key: 0,
                    tree: unref(state).tree,
                    onUpdate: onUpdateTreeUI
                  }, null, 8, ["tree"])) : unref(localState).mode === "advanced" ? (openBlock(), createBlock(FormText, {
                    key: 1,
                    ref: (_value, _refs) => {
                      _refs["tree"] = _value;
                    },
                    type: "textarea",
                    name: "pref_tree",
                    id: "pref_tree",
                    placeholder: unref(t)("description.inputSlideDataCode"),
                    rows: 15,
                    color: unref(localState).textTreeColor,
                    modelValue: unref(state).tree,
                    "onUpdate:modelValue": [
                      _cache[1] || (_cache[1] = ($event) => unref(state).tree = $event),
                      onUpdateTreeSource
                    ]
                  }, null, 8, ["placeholder", "color", "modelValue"])) : createCommentVNode("", true)
                ])
              ])
            ])
          ])
        ]),
        (openBlock(), createBlock(Teleport, { to: "#slideshowModal" }, [
          unref(localState).showImportData ? (openBlock(), createBlock(ModalWrapper, {
            key: 0,
            title: unref(t)("title.getSlideItems"),
            class: "pref-data__import-data",
            onClose: _cache[2] || (_cache[2] = ($event) => unref(localState).showImportData = false)
          }, {
            default: withCtx(() => [
              createVNode(ImportData, { onUpdate: onImportData })
            ]),
            _: 1
          }, 8, ["title"])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
};
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-470f5195"]]);
export { index as default };
//# sourceMappingURL=index.js.map
