import{_ as n}from"./index.2b5e35b2.js";import{o as i,b as s,B as r,n as a}from"./vendor.95a30472.js";function p(t){return`0${t}`.slice(-2)}function m(t){let e;try{e=new URL(t)}catch{return!1}return e.protocol==="http:"||e.protocol==="https:"}function _(t){return JSON.stringify(t,null,2)}const c=["type","disabled","title"],u={props:{type:{type:String,default:"button"},title:String,color:String,disabled:Boolean},emits:{click:null},setup(t,{emit:e}){return(o,l)=>(i(),s("button",{type:t.type,disabled:t.disabled,title:t.title,class:a(["button-basic",t.color&&`button-basic--color-${t.color}`]),onClick:l[0]||(l[0]=d=>o.$emit("click"))},[r(o.$slots,"default",{},void 0,!0)],10,c))}};var y=n(u,[["__scopeId","data-v-0f29739b"]]);export{y as B,_ as o,p as t,m as v};