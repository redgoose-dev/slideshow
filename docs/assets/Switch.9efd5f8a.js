import{_ as r}from"./index.2b5e35b2.js";import{o as i,b as c,h as s,n as l,p as n,m}from"./vendor.95a30472.js";const _=a=>(n("data-v-f718ac00"),a=a(),m(),a),p=["name","id","required","disabled","checked"],u=_(()=>s("i",{class:"form-switch__icon"},null,-1)),h={props:{name:{type:String,required:!0},id:String,disabled:Boolean,required:Boolean,modelValue:Boolean},emits:["update:modelValue","blur:modelValue"],setup(a,{emit:f}){const e=a;return(d,o)=>(i(),c("label",{class:l(["form","form-switch",e.disabled&&"form-switch--disabled"])},[s("input",{type:"checkbox",name:e.name,id:e.id,required:e.required,disabled:e.disabled,checked:e.modelValue,onChange:o[0]||(o[0]=t=>d.$emit("update:modelValue",Boolean(t.target.checked))),class:"form-switch__body"},null,40,p),u],2))}};var B=r(h,[["__scopeId","data-v-f718ac00"]]);export{B as F};
