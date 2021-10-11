import { openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
import { _ as _export_sfc } from "./exports.js";
function twoDigit(day) {
  return `0${day}`.slice(-2);
}
function validUrl(str) {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
function objectToString(src) {
  return JSON.stringify(src, null, 2);
}
var Basic_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _hoisted_1 = ["type", "disabled", "title"];
const _sfc_main = {
  props: {
    type: { type: String, default: "button" },
    title: String,
    color: String,
    disabled: Boolean
  },
  emits: { "click": null },
  setup(__props, { emit: emits }) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: __props.type,
        disabled: __props.disabled,
        title: __props.title,
        class: normalizeClass([
          "button-basic",
          __props.color && `button-basic--color-${__props.color}`
        ]),
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 10, _hoisted_1);
    };
  }
};
var ButtonBasic = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f29739b"]]);
export { ButtonBasic as B, objectToString as o, twoDigit as t, validUrl as v };
//# sourceMappingURL=Basic.js.map
