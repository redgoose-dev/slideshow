import{_ as k,g as s}from"./index.3092a2e2.js";import{o as n,b as l,h as d,F as c,j as y,t as b,n as V}from"./vendor.740e9bd1.js";const p={class:"form-radio__wrap"},h={class:"form-radio__button"},_=["disabled","onClick"],B=["id","value","checked"],C={props:{type:String,items:{type:Array,required:!0},name:String,id:String,inline:Boolean,modelType:String,modelValue:[String,Number,Boolean]},emits:["update:modelValue","blur:modelValue"],setup(e,{emit:i}){const r=e,f="FormRadio";function g(a){i("update:modelValue",s(r.modelType,a.target.value))}function v(a){i("update:modelValue",s(r.modelType,a))}return(a,u)=>(n(),l("nav",{class:V(["form form-radio",e.inline&&"form-radio--inline",e.type==="button"&&"form-radio--button"])},[d("div",p,[e.type==="button"?(n(!0),l(c,{key:0},y(e.items,(t,o)=>(n(),l("div",h,[d("button",{type:"button",disabled:e.modelValue===t.key||!e.modelValue&&o===0,onClick:m=>v(t.key)},b(t.label),9,_)]))),256)):(n(!0),l(c,{key:1},y(e.items,(t,o)=>(n(),l("label",null,[d("input",{type:"radio",name:f,id:o===0?e.id:void 0,value:t.key,checked:e.modelValue===t.key||!e.modelValue&&o===0,onChange:g,onBlur:u[0]||(u[0]=m=>a.$emit("blur:modelValue",m.target.value))},null,40,B),d("em",null,b(t.label),1)]))),256))])],2))}};var x=k(C,[["__scopeId","data-v-596cdf8b"]]);export{x as F};
