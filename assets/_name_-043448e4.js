import{d as p,u as _,l as d,w as f,r as k,o as s,c as a,b as e,t,e as r,F as x,m as h,g as b,a as v,n as y,i as g,_ as N}from"./app-7c45913e.js";const w=e("div",{"text-4xl":""},[e("div",{"i-carbon-pedestrian":"","inline-block":""})],-1),C={"text-sm":"","opacity-75":""},V={key:0,"text-sm":"","mt-4":""},B={"opacity-75":""},S=p({__name:"[name]",props:{name:{type:String,required:!0}},setup(c){const l=c,u=_(),n=d();return f(()=>{n.setNewName(l.name)}),(E,i)=>{const m=k("router-link");return s(),a("div",null,[w,e("p",null," Hei, "+t(r(n).name)+"! ",1),e("p",C,[e("em",null,t("intro.dynamic-route"),1)]),r(n).otherNames.length?(s(),a("p",V,[e("span",B,t("intro.aka")+":",1),e("ul",null,[(s(!0),a(x,null,h(r(n).otherNames,o=>(s(),a("li",{key:o},[v(m,{to:`/hi/${o}`,replace:""},{default:y(()=>[g(t(o),1)]),_:2},1032,["to"])]))),128))])])):b("v-if",!0),e("div",null,[e("button",{btn:"",m:"3 t6","text-sm":"",onClick:i[0]||(i[0]=o=>r(u).back())},t("button.back"),1)])])}}}),$=N(S,[["__file","/home/runner/work/finnacro/finnacro/src/pages/hi/[name].vue"]]);export{$ as default};