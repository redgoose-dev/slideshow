(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ce12d5b"],{"1be3":function(e,t,a){},2975:function(e,t,a){"use strict";a("5184")},3252:function(e,t,a){},"4d6b":function(e,t,a){},5184:function(e,t,a){},"529a":function(e,t,a){"use strict";a("3252")},6392:function(e,t,a){"use strict";a("a822")},"8fa4":function(e,t,a){"use strict";var l=a("7a23");Object(l["pushScopeId"])("data-v-0349d436");const o=["name","id","required","value","disabled"],n={key:0,value:"",disabled:!1};function c(e,t,a,c,i,r){const d=Object(l["resolveComponent"])("Icon");return Object(l["openBlock"])(),Object(l["createElementBlock"])("label",{class:Object(l["normalizeClass"])(["form","form-select",e.disabled&&"form-select--disabled"])},[Object(l["createElementVNode"])("select",{name:e.name,id:e.id,required:e.required,value:e.modelValue,disabled:e.disabled,class:"form-select__body",onChange:t[0]||(t[0]=(...t)=>e.onChange&&e.onChange(...t)),onBlur:t[1]||(t[1]=t=>e.$emit("blur:modelValue",t.target.value))},[e.placeholder?(Object(l["openBlock"])(),Object(l["createElementBlock"])("option",n,Object(l["toDisplayString"])(e.placeholder),1)):Object(l["createCommentVNode"])("",!0),Object(l["renderSlot"])(e.$slots,"default",{},void 0,!0)],40,o),Object(l["createVNode"])(d,{"icon-name":"arrow-down",class:"form-select__icon"})],2)}Object(l["popScopeId"])();var i=a("c276"),r=a("d010"),d=Object(l["defineComponent"])({name:"FormSelect",components:{Icon:r["a"]},props:{name:{type:String,required:!0},id:String,disabled:Boolean,required:Boolean,placeholder:{type:[String,null],default:null},modelType:String,modelValue:[String,Number]},setup(e,t){function a(a){t.emit("update:modelValue",i["d"](e.modelType,a.target.value))}return{onChange:a}},emits:{"update:modelValue":null,"blur:modelValue":null}});a("529a"),a("ffe3");d.render=c,d.__scopeId="data-v-0349d436";t["a"]=d},"92dd":function(e,t,a){"use strict";var l=a("7a23");Object(l["pushScopeId"])("data-v-237eca52");const o=["type","name","id","value","placeholder","required","min","max","step","maxlength","rows","size"],n=["type","name","id","value","placeholder","required","min","max","step","maxlength","size"];function c(e,t,a,c,i,r){return"textarea"===e.type?(Object(l["openBlock"])(),Object(l["createElementBlock"])("textarea",{key:0,ref:"root",type:e.type,name:e.name,id:e.id,value:e.modelValue,placeholder:e.placeholder,required:e.required,min:e.min,max:e.max,step:e.step,maxlength:e.maxlength,rows:e.rows,size:e.size,class:Object(l["normalizeClass"])(["form","form-text",e.inline&&"form-text--inline",e.color&&"form-text--color-"+e.color]),onInput:t[0]||(t[0]=(...t)=>e.onChange&&e.onChange(...t)),onBlur:t[1]||(t[1]=t=>e.$emit("blur:modelValue",t.target.value))},null,42,o)):(Object(l["openBlock"])(),Object(l["createElementBlock"])("input",{key:1,ref:"root",type:e.type,name:e.name,id:e.id,value:e.modelValue,placeholder:e.placeholder,required:e.required,min:e.min,max:e.max,step:e.step,maxlength:e.maxlength,size:e.size,class:Object(l["normalizeClass"])(["form","form-text",e.inline&&"form-text--inline",e.color&&"form-text--color-"+e.color]),onInput:t[2]||(t[2]=(...t)=>e.onChange&&e.onChange(...t)),onBlur:t[3]||(t[3]=t=>e.$emit("blur:modelValue",t.target.value))},null,42,n))}Object(l["popScopeId"])();var i=a("c276"),r=Object(l["defineComponent"])({name:"FormText",props:{type:{type:String,default:"text"},name:String,id:String,placeholder:String,required:Boolean,min:Number,max:Number,step:Number,maxlength:Number,inline:Boolean,rows:{type:Number,default:3},size:{type:Number,default:10},color:String,modelType:String,modelValue:[String,Number,Boolean,Array]},setup(e,t){const a=Object(l["ref"])(0);function o(a){t.emit("update:modelValue",i["d"](e.modelType,a.target.value))}function n(){a.value&&a.value.focus()}return{root:a,onChange:o,focus:n}},emits:{"update:modelValue":null,"blur:modelValue":null}});a("2975"),a("aca9");r.render=c,r.__scopeId="data-v-237eca52";t["a"]=r},a822:function(e,t,a){},aca9:function(e,t,a){"use strict";a("1be3")},f45a:function(e,t,a){"use strict";a.r(t);var l=a("7a23");Object(l["pushScopeId"])("data-v-48fd634c");const o=Object(l["createElementVNode"])("legend",null,"Style fields",-1),n={class:"fields"},c={class:"field-basic"},i={class:"field-title"},r={for:"pref_screenColor"},d={class:"field-description"},s={class:"field-basic__body"},p={value:"system"},m={value:"light"},u={value:"dark"},b=Object(l["createElementVNode"])("hr",{class:"field-line"},null,-1),f={class:"field-basic"},j={class:"field-title"},O={for:"pref_imageType"},V={class:"field-description"},g={class:"field-basic__body"},S={value:"none"},y={value:"contain"},v={value:"cover"},N={class:"field-basic"},h={class:"field-title"},E={for:"pref_imageScale"},_={class:"field-description"},x={class:"field-basic__body"},C=Object(l["createElementVNode"])("hr",{class:"field-line"},null,-1),$={class:"field-basic"},k={class:"field-title"},B={for:"pref_captionScale"},D={class:"field-description"},T={class:"field-basic__inline"},I={class:"label"},w=Object(l["createElementVNode"])("span",null,"%",-1),U={class:"field-basic"},z={class:"field-title"},P={for:"pref_captionPosition"},q={class:"field-description"},F={class:"field-basic__body"};function M(e,t,a,M,J,A){const G=Object(l["resolveComponent"])("FormSelect"),H=Object(l["resolveComponent"])("FormText");return Object(l["openBlock"])(),Object(l["createElementBlock"])("fieldset",null,[o,Object(l["createElementVNode"])("div",n,[Object(l["createElementVNode"])("div",c,[Object(l["createElementVNode"])("h3",i,[Object(l["createElementVNode"])("label",r,Object(l["toDisplayString"])(e.$t("title.screenMode")),1)]),Object(l["createElementVNode"])("p",d,Object(l["toDisplayString"])(e.$t("description.screenMode")),1),Object(l["createElementVNode"])("div",s,[Object(l["createVNode"])(G,{name:"pref_screenColor",id:"pref_screenColor",modelValue:e.state.screenColor,"onUpdate:modelValue":[t[0]||(t[0]=t=>e.state.screenColor=t),e.onSave]},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("option",p,Object(l["toDisplayString"])(e.$t("base.system")),1),Object(l["createElementVNode"])("option",m,Object(l["toDisplayString"])(e.$t("base.lightMode")),1),Object(l["createElementVNode"])("option",u,Object(l["toDisplayString"])(e.$t("base.darkMode")),1)]),_:1},8,["modelValue","onUpdate:modelValue"])])]),b,Object(l["createElementVNode"])("div",f,[Object(l["createElementVNode"])("h3",j,[Object(l["createElementVNode"])("label",O,Object(l["toDisplayString"])(e.$t("label.imageType")),1)]),Object(l["createElementVNode"])("p",V,Object(l["toDisplayString"])(e.$t("description.imageType")),1),Object(l["createElementVNode"])("div",g,[Object(l["createVNode"])(G,{name:"pref_imageType",id:"pref_imageType",modelValue:e.state.imageType,"onUpdate:modelValue":[t[1]||(t[1]=t=>e.state.imageType=t),e.onSave]},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("option",S,Object(l["toDisplayString"])(e.$t("base.none")),1),Object(l["createElementVNode"])("option",y,Object(l["toDisplayString"])(e.$t("base.contain")),1),Object(l["createElementVNode"])("option",v,Object(l["toDisplayString"])(e.$t("base.cover")),1)]),_:1},8,["modelValue","onUpdate:modelValue"])])]),Object(l["createElementVNode"])("div",N,[Object(l["createElementVNode"])("h3",h,[Object(l["createElementVNode"])("label",E,Object(l["toDisplayString"])(e.$t("title.imageScale")),1)]),Object(l["createElementVNode"])("p",_,Object(l["toDisplayString"])(e.$t("description.imageScale")),1),Object(l["createElementVNode"])("div",x,[Object(l["createVNode"])(H,{type:"text",name:"pref_imageScale",id:"pref_imageScale",modelValue:e.state.imageScale,"onUpdate:modelValue":[t[2]||(t[2]=t=>e.state.imageScale=t),e.onUpdateImageScale],placeholder:"80%,80%","model-type":"array",inline:!0,size:16},null,8,["modelValue","onUpdate:modelValue"])])]),C,Object(l["createElementVNode"])("div",$,[Object(l["createElementVNode"])("h3",k,[Object(l["createElementVNode"])("label",B,Object(l["toDisplayString"])(e.$t("title.captionScale")),1)]),Object(l["createElementVNode"])("p",D,Object(l["toDisplayString"])(e.$t("description.captionScale")),1),Object(l["createElementVNode"])("div",T,[Object(l["createElementVNode"])("label",I,[Object(l["createVNode"])(H,{type:"tel",name:"pref_captionScale",id:"pref_captionScale",modelValue:e.state.captionScale,"onUpdate:modelValue":[t[3]||(t[3]=t=>e.state.captionScale=t),e.onSave],placeholder:"100",inline:!0,maxlength:3,size:5,"model-type":"number"},null,8,["modelValue","onUpdate:modelValue"]),w])])]),Object(l["createElementVNode"])("div",U,[Object(l["createElementVNode"])("h3",z,[Object(l["createElementVNode"])("label",P,Object(l["toDisplayString"])(e.$t("title.captionPosition")),1)]),Object(l["createElementVNode"])("p",q,Object(l["toDisplayString"])(e.$t("description.captionPosition")),1),Object(l["createElementVNode"])("div",F,[Object(l["createVNode"])(H,{type:"text",name:"pref_captionPosition",id:"pref_captionPosition",modelValue:e.state.captionPosition,"onUpdate:modelValue":[t[4]||(t[4]=t=>e.state.captionPosition=t),e.onUpdateCaptionPosition],placeholder:"30px,30px","model-type":"array",inline:!0,size:16},null,8,["modelValue","onUpdate:modelValue"])])])])])}Object(l["popScopeId"])();var J=a("1717"),A=a("92dd"),G=a("8fa4"),H=Object(l["defineComponent"])({name:"PreferenceStyle",components:{FormText:A["a"],FormSelect:G["a"]},props:{structure:Object},setup(e,t){let a=Object(l["reactive"])({screenColor:e.structure.screenColor,imageType:e.structure.imageType,imageScale:e.structure.imageScale,captionScale:e.structure.captionScale,captionPosition:e.structure.captionPosition});function o(){const e=Object(J["d"])(a);t.emit("update",e)}function n(e){a.imageScale=e.split(","),o()}function c(e){a.captionPosition=e.split(","),o()}return{state:a,onSave:o,onUpdateImageScale:n,onUpdateCaptionPosition:c}},emits:{update:null}});a("6392");H.render=M,H.__scopeId="data-v-48fd634c";t["default"]=H},ffe3:function(e,t,a){"use strict";a("4d6b")}}]);