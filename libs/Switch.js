import { openBlock, createElementBlock, normalizeClass, createElementVNode, pushScopeId, popScopeId } from "vue";
import { _ as _export_sfc } from "./exports.js";
var Switch_scss_vue_type_style_index_0_src_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-f718ac00"), n = n(), popScopeId(), n);
const _hoisted_1 = ["name", "id", "required", "disabled", "checked"];
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("i", { class: "form-switch__icon" }, null, -1));
const _sfc_main = {
  props: {
    name: { type: String, required: true },
    id: String,
    disabled: Boolean,
    required: Boolean,
    modelValue: Boolean
  },
  emits: ["update:modelValue", "blur:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          "form",
          "form-switch",
          props.disabled && "form-switch--disabled"
        ])
      }, [
        createElementVNode("input", {
          type: "checkbox",
          name: props.name,
          id: props.id,
          required: props.required,
          disabled: props.disabled,
          checked: props.modelValue,
          onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", Boolean($event.target.checked))),
          class: "form-switch__body"
        }, null, 40, _hoisted_1),
        _hoisted_2
      ], 2);
    };
  }
};
var FormSwitch = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f718ac00"]]);
export { FormSwitch as F };
//# sourceMappingURL=Switch.js.map
