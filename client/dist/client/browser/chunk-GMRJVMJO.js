import{a as f}from"./chunk-426OJ4HC.js";import{a as I}from"./chunk-MM5QLNJM.js";import{b as v}from"./chunk-H3GX5QFY.js";import{e as $}from"./chunk-ZLWXLFXI.js";import{b as A}from"./chunk-MCRJI3T3.js";import{c as b}from"./chunk-MWATPQFI.js";import{e as r}from"./chunk-FP7EQKGB.js";var T=t=>f().duration(t?400:300),q=t=>{let o,a,l=t.width+8,c=f(),m=f();t.isEndSide?(o=l+"px",a="0px"):(o=-l+"px",a="0px"),c.addElement(t.menuInnerEl).fromTo("transform",`translateX(${o})`,`translateX(${a})`);let p=b(t)==="ios",x=p?.2:.25;return m.addElement(t.backdropEl).fromTo("opacity",.01,x),T(p).addAnimation([c,m])},U=t=>{let o,a,l=b(t),c=t.width;t.isEndSide?(o=-c+"px",a=c+"px"):(o=c+"px",a=-c+"px");let m=f().addElement(t.menuInnerEl).fromTo("transform",`translateX(${a})`,"translateX(0px)"),h=f().addElement(t.contentEl).fromTo("transform","translateX(0px)",`translateX(${o})`),p=f().addElement(t.backdropEl).fromTo("opacity",.01,.32);return T(l==="ios").addAnimation([m,h,p])},D=t=>{let o=b(t),a=t.width*(t.isEndSide?-1:1)+"px",l=f().addElement(t.contentEl).fromTo("transform","translateX(0px)",`translateX(${a})`);return T(o==="ios").addAnimation(l)},G=()=>{let t=new Map,o=[],a=n=>r(void 0,null,function*(){let e=yield d(n,!0);return e?e.open():!1}),l=n=>r(void 0,null,function*(){let e=yield n!==void 0?d(n,!0):E();return e!==void 0?e.close():!1}),c=n=>r(void 0,null,function*(){let e=yield d(n,!0);return e?e.toggle():!1}),m=(n,e)=>r(void 0,null,function*(){let s=yield d(e);return s&&(s.disabled=!n),s}),h=(n,e)=>r(void 0,null,function*(){let s=yield d(e);return s&&(s.swipeGesture=n),s}),p=n=>r(void 0,null,function*(){if(n!=null){let e=yield d(n);return e!==void 0&&e.isOpen()}else return(yield E())!==void 0}),x=n=>r(void 0,null,function*(){let e=yield d(n);return e?!e.disabled:!1}),d=(n,e=!1)=>r(void 0,null,function*(){if(yield y(),n==="start"||n==="end"){let i=o.filter(u=>u.side===n&&!u.disabled);if(i.length>=1)return i.length>1&&e&&I(`menuController queried for a menu on the "${n}" side, but ${i.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`,i.map(u=>u.el)),i[0].el;let w=o.filter(u=>u.side===n);if(w.length>=1)return w.length>1&&e&&I(`menuController queried for a menu on the "${n}" side, but ${w.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`,w.map(u=>u.el)),w[0].el}else if(n!=null)return X(i=>i.menuId===n);let s=X(i=>!i.disabled);return s||(o.length>0?o[0].el:void 0)}),E=()=>r(void 0,null,function*(){return yield y(),O()}),M=()=>r(void 0,null,function*(){return yield y(),P()}),R=()=>r(void 0,null,function*(){return yield y(),_()}),g=(n,e)=>{t.set(n,e)},C=n=>{o.indexOf(n)<0&&o.push(n)},S=n=>{let e=o.indexOf(n);e>-1&&o.splice(e,1)},k=(n,e,s)=>r(void 0,null,function*(){if(_())return!1;if(e){let i=yield E();i&&n.el!==i&&(yield i.setOpen(!1,!1))}return n._setOpen(e,s)}),B=(n,e)=>{let s=t.get(n);if(!s)throw new Error("animation not registered");return s(e)},O=()=>X(n=>n._isOpen),P=()=>o.map(n=>n.el),_=()=>o.some(n=>n.isAnimating),X=n=>{let e=o.find(n);if(e!==void 0)return e.el},y=()=>Promise.all(Array.from(document.querySelectorAll("ion-menu")).map(n=>new Promise(e=>v(n,e))));return g("reveal",D),g("push",U),g("overlay",q),A===null||A===void 0||A.addEventListener("ionBackButton",n=>{let e=O();e&&n.detail.register($,()=>e.close())}),{registerAnimation:g,get:d,getMenus:M,getOpen:E,isEnabled:x,swipeGesture:h,isAnimating:R,isOpen:p,enable:m,toggle:c,close:l,open:a,_getOpenSync:O,_createAnimation:B,_register:C,_unregister:S,_setOpen:k}},z=G();export{z as a};
