(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25d6b169"],{"16e9":function(e,t,l){},"1be3":function(e,t,l){},2975:function(e,t,l){"use strict";l("5184")},3252:function(e,t,l){},4498:function(e,t,l){"use strict";l("5842")},"48d4":function(e,t,l){"use strict";var n=l("7a23");Object(n["pushScopeId"])("data-v-1579453c");const o=["type","disabled","title"];function a(e,t,l,a,c,r){return Object(n["openBlock"])(),Object(n["createElementBlock"])("button",{type:e.type,disabled:e.disabled,title:e.title,class:Object(n["normalizeClass"])(["button-basic",e.color&&"button-basic--color-"+e.color]),onClick:t[0]||(t[0]=t=>e.$emit("click"))},[Object(n["renderSlot"])(e.$slots,"default",{},void 0,!0)],10,o)}Object(n["popScopeId"])();var c=Object(n["defineComponent"])({name:"ButtonBasic",props:{type:{type:String,default:"button"},title:String,color:String,disabled:Boolean},emits:{click:null}});l("ae33");c.render=a,c.__scopeId="data-v-1579453c";t["a"]=c},"4d6b":function(e,t,l){},"4f9d":function(e,t,l){},5184:function(e,t,l){},"529a":function(e,t,l){"use strict";l("3252")},5842:function(e,t,l){},"5b66":function(e,t,l){},"7aa5":function(e,t,l){"use strict";function n(e){return("0"+e).slice(-2)}function o(e){let t;try{t=new URL(e)}catch(l){return!1}return"http:"===t.protocol||"https:"===t.protocol}function a(e){return JSON.stringify(e,null,2)}l.d(t,"b",(function(){return n})),l.d(t,"c",(function(){return o})),l.d(t,"a",(function(){return a}))},"7eb5":function(e,t,l){},"86ce":function(e,t,l){"use strict";l.r(t);var n=l("7a23");Object(n["pushScopeId"])("data-v-f9793592");const o=Object(n["createElementVNode"])("legend",null,"General fields",-1),a={class:"fields"},c={class:"field-basic"},r={class:"field-title"},i={for:"pref_language"},d={class:"field-description"},s={class:"field-basic__body"},u={value:"en"},b={value:"ko"},m=Object(n["createElementVNode"])("hr",{class:"field-line"},null,-1),p={class:"field-switch"},f={class:"field-switch__body"},O={class:"field-title"},j={for:"pref_hud"},V={class:"field-description"},h={class:"field-switch__input"},g={class:"field-switch"},v={class:"field-switch__body"},N={class:"field-title"},k={for:"pref_hoverVisibleHud"},C={class:"field-description"},S={class:"field-switch__input"},E={class:"field-switch"},y={class:"field-switch__body"},_={class:"field-title"},w={for:"pref_clickVisibleHud"},B={class:"field-description"},x={class:"field-switch__input"},$={class:"field-basic"},H={class:"field-title"},I={for:"pref_hudContents"},D={class:"field-description"},q={class:"field-basic__body"},U={class:"field-checks"},F=Object(n["createElementVNode"])("hr",{class:"field-line"},null,-1),z={class:"field-basic"},T={class:"field-title"},R={class:"field-description"},A={class:"field-basic__body"},J={class:"grid import-data"},P={class:"field-basic"},G={class:"field-title"},L={class:"field-description"},M={class:"field-basic__body"};function K(e,t,l,K,Y,Q){const W=Object(n["resolveComponent"])("FormSelect"),X=Object(n["resolveComponent"])("FormSwitch"),Z=Object(n["resolveComponent"])("FormCheckbox"),ee=Object(n["resolveComponent"])("ButtonBasic");return Object(n["openBlock"])(),Object(n["createElementBlock"])("fieldset",null,[o,Object(n["createElementVNode"])("div",a,[Object(n["createElementVNode"])("div",c,[Object(n["createElementVNode"])("h3",r,[Object(n["createElementVNode"])("label",i,Object(n["toDisplayString"])(e.$t("base.language")),1)]),Object(n["createElementVNode"])("p",d,Object(n["toDisplayString"])(e.$t("description.language")),1),Object(n["createElementVNode"])("div",s,[Object(n["createVNode"])(W,{name:"pref_language",id:"pref_language",modelValue:e.state.language,"onUpdate:modelValue":[t[0]||(t[0]=t=>e.state.language=t),e.onSave]},{default:Object(n["withCtx"])(()=>[Object(n["createElementVNode"])("option",u,Object(n["toDisplayString"])(e.$t("language.en")),1),Object(n["createElementVNode"])("option",b,Object(n["toDisplayString"])(e.$t("language.ko")),1)]),_:1},8,["modelValue","onUpdate:modelValue"])])]),m,Object(n["createElementVNode"])("div",p,[Object(n["createElementVNode"])("div",f,[Object(n["createElementVNode"])("h3",O,[Object(n["createElementVNode"])("label",j,Object(n["toDisplayString"])(e.$t("base.hud")),1)]),Object(n["createElementVNode"])("p",V,Object(n["toDisplayString"])(e.$t("description.hud")),1)]),Object(n["createElementVNode"])("div",h,[Object(n["createVNode"])(X,{name:"pref_hud",id:"pref_hud",modelValue:e.state.hud,"onUpdate:modelValue":[t[1]||(t[1]=t=>e.state.hud=t),e.onSave]},null,8,["modelValue","onUpdate:modelValue"])])]),Object(n["createElementVNode"])("div",g,[Object(n["createElementVNode"])("div",v,[Object(n["createElementVNode"])("h3",N,[Object(n["createElementVNode"])("label",k,Object(n["toDisplayString"])(e.$t("title.hoverVisibleHud")),1)]),Object(n["createElementVNode"])("p",C,Object(n["toDisplayString"])(e.$t("description.hoverVisibleHud")),1)]),Object(n["createElementVNode"])("div",S,[Object(n["createVNode"])(X,{name:"pref_hoverVisibleHud",id:"pref_hoverVisibleHud",modelValue:e.state.hoverVisibleHud,"onUpdate:modelValue":[t[2]||(t[2]=t=>e.state.hoverVisibleHud=t),e.onSave]},null,8,["modelValue","onUpdate:modelValue"])])]),Object(n["createElementVNode"])("div",E,[Object(n["createElementVNode"])("div",y,[Object(n["createElementVNode"])("h3",_,[Object(n["createElementVNode"])("label",w,Object(n["toDisplayString"])(e.$t("title.touchHud")),1)]),Object(n["createElementVNode"])("p",B,Object(n["toDisplayString"])(e.$t("description.touchHud")),1)]),Object(n["createElementVNode"])("div",x,[Object(n["createVNode"])(X,{name:"pref_clickVisibleHud",id:"pref_clickVisibleHud",modelValue:e.state.clickVisibleHud,"onUpdate:modelValue":[t[3]||(t[3]=t=>e.state.clickVisibleHud=t),e.onSave]},null,8,["modelValue","onUpdate:modelValue"])])]),Object(n["createElementVNode"])("div",$,[Object(n["createElementVNode"])("h3",H,[Object(n["createElementVNode"])("label",I,Object(n["toDisplayString"])(e.$t("title.visibleContents")),1)]),Object(n["createElementVNode"])("p",D,Object(n["toDisplayString"])(e.$t("description.visibleContents")),1),Object(n["createElementVNode"])("div",q,[Object(n["createElementVNode"])("ul",U,[Object(n["createElementVNode"])("li",null,[Object(n["createVNode"])(Z,{name:"pref_hudContents",id:"pref_hudContents",label:e.$t("base.menu"),modelValue:e.state.visibleHudContents.menu,"onUpdate:modelValue":t[4]||(t[4]=t=>e.onUpdateHudContents("menu",t))},null,8,["label","modelValue"])]),Object(n["createElementVNode"])("li",null,[Object(n["createVNode"])(Z,{name:"pref_hudContents",label:e.$t("base.caption"),modelValue:e.state.visibleHudContents.caption,"onUpdate:modelValue":t[5]||(t[5]=t=>e.onUpdateHudContents("caption",t))},null,8,["label","modelValue"])]),Object(n["createElementVNode"])("li",null,[Object(n["createVNode"])(Z,{name:"pref_hudContents",label:e.$t("base.controller"),modelValue:e.state.visibleHudContents.controller,"onUpdate:modelValue":t[6]||(t[6]=t=>e.onUpdateHudContents("controller",t))},null,8,["label","modelValue"])]),Object(n["createElementVNode"])("li",null,[Object(n["createVNode"])(Z,{name:"pref_hudContents",label:e.$t("base.paginate"),modelValue:e.state.visibleHudContents.paginate,"onUpdate:modelValue":t[7]||(t[7]=t=>e.onUpdateHudContents("paginate",t))},null,8,["label","modelValue"])]),Object(n["createElementVNode"])("li",null,[Object(n["createVNode"])(Z,{name:"pref_hudContents",label:e.$t("base.group"),modelValue:e.state.visibleHudContents.group,"onUpdate:modelValue":t[8]||(t[8]=t=>e.onUpdateHudContents("group",t))},null,8,["label","modelValue"])])])])]),F,Object(n["createElementVNode"])("div",z,[Object(n["createElementVNode"])("h3",T,[Object(n["createElementVNode"])("label",null,Object(n["toDisplayString"])(e.$t("title.backupOrRestore")),1)]),Object(n["createElementVNode"])("p",R,Object(n["toDisplayString"])(e.$t("description.backup")),1),Object(n["createElementVNode"])("div",A,[Object(n["createElementVNode"])("div",J,[Object(n["createElementVNode"])("div",null,[Object(n["createVNode"])(ee,{color:"key",onClick:e.onClickBackup},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.$t("base.backup")),1)]),_:1},8,["onClick"])]),Object(n["createElementVNode"])("div",null,[Object(n["createVNode"])(ee,{color:"key",onClick:e.onClickRestore},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.$t("base.restore")),1)]),_:1},8,["onClick"])])])])]),Object(n["createElementVNode"])("div",P,[Object(n["createElementVNode"])("h3",G,[Object(n["createElementVNode"])("label",null,Object(n["toDisplayString"])(e.$t("base.reset")),1)]),Object(n["createElementVNode"])("p",L,Object(n["toDisplayString"])(e.$t("description.reset")),1),Object(n["createElementVNode"])("div",M,[Object(n["createVNode"])(ee,{color:"danger",onClick:e.onClickReset},{default:Object(n["withCtx"])(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.$t("base.resetSlideshow")),1)]),_:1},8,["onClick"])])])])])}Object(n["popScopeId"])();var Y=l("5502"),Q=l("0251"),W=l("1717"),X=l("e842"),Z=l("7aa5"),ee=l("92dd"),te=l("8fa4"),le=l("b1f0");Object(n["pushScopeId"])("data-v-ce3e3886");const ne={class:"form-checkbox"},oe={class:"form-checkbox__body"},ae=["name","id","required","disabled","checked"],ce={key:0,class:"form-checkbox__label"};function re(e,t,l,o,a,c){const r=Object(n["resolveComponent"])("Icon");return Object(n["openBlock"])(),Object(n["createElementBlock"])("label",ne,[Object(n["createElementVNode"])("span",oe,[Object(n["createElementVNode"])("input",{type:"checkbox",name:e.name,id:e.id,required:e.required,disabled:e.disabled,checked:e.modelValue,onChange:t[0]||(t[0]=t=>e.$emit("update:modelValue",Boolean(t.target.checked)))},null,40,ae),Object(n["createElementVNode"])("i",null,[Object(n["createVNode"])(r,{"icon-name":"check"})])]),e.label?(Object(n["openBlock"])(),Object(n["createElementBlock"])("em",ce,Object(n["toDisplayString"])(e.label),1)):Object(n["createCommentVNode"])("",!0)])}Object(n["popScopeId"])();var ie=l("d010"),de=Object(n["defineComponent"])({name:"FormCheckbox",components:{Icon:ie["a"]},props:{name:{type:String,required:!0},id:String,disabled:Boolean,required:Boolean,label:String,modelValue:Boolean},emits:{"update:modelValue":null,"blur:modelValue":null}});l("ab8a");de.render=re,de.__scopeId="data-v-ce3e3886";var se=de,ue=l("48d4"),be=Object(n["defineComponent"])({name:"PreferenceGeneral",components:{FormText:ee["a"],FormSelect:te["a"],FormSwitch:le["a"],FormCheckbox:se,ButtonBasic:ue["a"]},props:{structure:Object},setup(e,t){const l=Object(Y["b"])(),{t:o}=Object(Q["useI18n"])({useScope:"global"});let a=Object(n["reactive"])({language:e.structure.language,hud:e.structure.hud,hoverVisibleHud:e.structure.hoverVisibleHud,clickVisibleHud:e.structure.clickVisibleHud,visibleHudContents:W["d"](e.structure.visibleHudContents)});function c(){const e=W["d"](a);t.emit("update",e)}function r(e,t){a.visibleHudContents[e]=t,c()}function i(){if(!confirm(o("confirm.backup")))return;let e={preference:W["d"](l.state.preference),tree:W["d"](l.state.tree)};const t=new Date;let n=`${t.getFullYear()}${Z["b"](t.getMonth()+1)}${Z["b"](t.getDate())}`;const a=document.createElement("a");a.setAttribute("href","data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,2))),a.setAttribute("download",`slideshow_${n}.json`),a.click()}function d(){return new Promise((e,t)=>{const n=document.createElement("input");n.setAttribute("type","file"),n.setAttribute("accept","application/json"),n.addEventListener("change",e=>{if(!(e.target.files&&e.target.files.length>0))return void alert(o("alert.noSelectedFile"));const t=e.target.files[0],n=new FileReader;n.onload=e=>{try{let t=JSON.parse(String(e.target.result));if(!confirm(o("confirm.restore")))return;if(!t.preference&&!t.tree)throw new Error("no data");t.preference&&l.dispatch("changePreference",t.preference),t.tree&&l.dispatch("changeTree",t.tree),l.dispatch("changeMode",null),l.dispatch("changeActiveSlide",l.state.preference.slides.initialNumber),l.dispatch("changeAutoplay",!1),l.commit("updateUseKeyboardEvent",!0),alert(o("alert.completeRestore")),X["a"].restart().then()}catch(e){window.dev&&console.error(e.message),alert(o("alert.failedRestore"))}},n.readAsText(t)},!1),n.click()})}function s(){confirm(o("confirm.reset"))&&l.dispatch("reset").then(()=>X["a"].restart().then())}return{state:a,onSave:c,onUpdateHudContents:r,onClickBackup:i,onClickRestore:d,onClickReset:s}},emits:{update:null}});l("bd80"),l("4498");be.render=K,be.__scopeId="data-v-f9793592";t["default"]=be},"8fa4":function(e,t,l){"use strict";var n=l("7a23");Object(n["pushScopeId"])("data-v-0349d436");const o=["name","id","required","value","disabled"],a={key:0,value:"",disabled:!1};function c(e,t,l,c,r,i){const d=Object(n["resolveComponent"])("Icon");return Object(n["openBlock"])(),Object(n["createElementBlock"])("label",{class:Object(n["normalizeClass"])(["form","form-select",e.disabled&&"form-select--disabled"])},[Object(n["createElementVNode"])("select",{name:e.name,id:e.id,required:e.required,value:e.modelValue,disabled:e.disabled,class:"form-select__body",onChange:t[0]||(t[0]=(...t)=>e.onChange&&e.onChange(...t)),onBlur:t[1]||(t[1]=t=>e.$emit("blur:modelValue",t.target.value))},[e.placeholder?(Object(n["openBlock"])(),Object(n["createElementBlock"])("option",a,Object(n["toDisplayString"])(e.placeholder),1)):Object(n["createCommentVNode"])("",!0),Object(n["renderSlot"])(e.$slots,"default",{},void 0,!0)],40,o),Object(n["createVNode"])(d,{"icon-name":"arrow-down",class:"form-select__icon"})],2)}Object(n["popScopeId"])();var r=l("c276"),i=l("d010"),d=Object(n["defineComponent"])({name:"FormSelect",components:{Icon:i["a"]},props:{name:{type:String,required:!0},id:String,disabled:Boolean,required:Boolean,placeholder:{type:[String,null],default:null},modelType:String,modelValue:[String,Number]},setup(e,t){function l(l){t.emit("update:modelValue",r["d"](e.modelType,l.target.value))}return{onChange:l}},emits:{"update:modelValue":null,"blur:modelValue":null}});l("529a"),l("ffe3");d.render=c,d.__scopeId="data-v-0349d436";t["a"]=d},"92dd":function(e,t,l){"use strict";var n=l("7a23");Object(n["pushScopeId"])("data-v-237eca52");const o=["type","name","id","value","placeholder","required","min","max","step","maxlength","rows","size"],a=["type","name","id","value","placeholder","required","min","max","step","maxlength","size"];function c(e,t,l,c,r,i){return"textarea"===e.type?(Object(n["openBlock"])(),Object(n["createElementBlock"])("textarea",{key:0,ref:"root",type:e.type,name:e.name,id:e.id,value:e.modelValue,placeholder:e.placeholder,required:e.required,min:e.min,max:e.max,step:e.step,maxlength:e.maxlength,rows:e.rows,size:e.size,class:Object(n["normalizeClass"])(["form","form-text",e.inline&&"form-text--inline",e.color&&"form-text--color-"+e.color]),onInput:t[0]||(t[0]=(...t)=>e.onChange&&e.onChange(...t)),onBlur:t[1]||(t[1]=t=>e.$emit("blur:modelValue",t.target.value))},null,42,o)):(Object(n["openBlock"])(),Object(n["createElementBlock"])("input",{key:1,ref:"root",type:e.type,name:e.name,id:e.id,value:e.modelValue,placeholder:e.placeholder,required:e.required,min:e.min,max:e.max,step:e.step,maxlength:e.maxlength,size:e.size,class:Object(n["normalizeClass"])(["form","form-text",e.inline&&"form-text--inline",e.color&&"form-text--color-"+e.color]),onInput:t[2]||(t[2]=(...t)=>e.onChange&&e.onChange(...t)),onBlur:t[3]||(t[3]=t=>e.$emit("blur:modelValue",t.target.value))},null,42,a))}Object(n["popScopeId"])();var r=l("c276"),i=Object(n["defineComponent"])({name:"FormText",props:{type:{type:String,default:"text"},name:String,id:String,placeholder:String,required:Boolean,min:Number,max:Number,step:Number,maxlength:Number,inline:Boolean,rows:{type:Number,default:3},size:{type:Number,default:10},color:String,modelType:String,modelValue:[String,Number,Boolean,Array]},setup(e,t){const l=Object(n["ref"])(0);function o(l){t.emit("update:modelValue",r["d"](e.modelType,l.target.value))}function a(){l.value&&l.value.focus()}return{root:l,onChange:o,focus:a}},emits:{"update:modelValue":null,"blur:modelValue":null}});l("2975"),l("aca9");i.render=c,i.__scopeId="data-v-237eca52";t["a"]=i},a76c:function(e,t,l){"use strict";l("4f9d")},ab8a:function(e,t,l){"use strict";l("5b66")},aca9:function(e,t,l){"use strict";l("1be3")},ae33:function(e,t,l){"use strict";l("16e9")},b1f0:function(e,t,l){"use strict";var n=l("7a23");Object(n["pushScopeId"])("data-v-06571056");const o=["name","id","required","disabled","checked"],a=Object(n["createElementVNode"])("i",{class:"form-switch__icon"},null,-1);function c(e,t,l,c,r,i){return Object(n["openBlock"])(),Object(n["createElementBlock"])("label",{class:Object(n["normalizeClass"])(["form","form-switch",e.disabled&&"form-switch--disabled"])},[Object(n["createElementVNode"])("input",{type:"checkbox",name:e.name,id:e.id,required:e.required,disabled:e.disabled,checked:e.modelValue,onChange:t[0]||(t[0]=t=>e.$emit("update:modelValue",Boolean(t.target.checked))),class:"form-switch__body"},null,40,o),a],2)}Object(n["popScopeId"])();var r=Object(n["defineComponent"])({name:"FormSwitch",props:{name:{type:String,required:!0},id:String,disabled:Boolean,required:Boolean,modelValue:Boolean},emits:{"update:modelValue":null,"blur:modelValue":null}});l("a76c");r.render=c,r.__scopeId="data-v-06571056";t["a"]=r},bd80:function(e,t,l){"use strict";l("7eb5")},ffe3:function(e,t,l){"use strict";l("4d6b")}}]);