(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const _ of document.querySelectorAll('link[rel="modulepreload"]'))R(_);new MutationObserver(_=>{for(const g of _)if(g.type==="childList")for(const U of g.addedNodes)U.tagName==="LINK"&&U.rel==="modulepreload"&&R(U)}).observe(document,{childList:!0,subtree:!0});function T(_){const g={};return _.integrity&&(g.integrity=_.integrity),_.referrerpolicy&&(g.referrerPolicy=_.referrerpolicy),_.crossorigin==="use-credentials"?g.credentials="include":_.crossorigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function R(_){if(_.ep)return;_.ep=!0;const g=T(_);fetch(_.href,g)}})();var Pe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ue(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var je={exports:{}},ve={exports:{}},k={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var q=Symbol.for("react.element"),Qe=Symbol.for("react.portal"),Ye=Symbol.for("react.fragment"),We=Symbol.for("react.strict_mode"),Fe=Symbol.for("react.profiler"),ze=Symbol.for("react.provider"),Ve=Symbol.for("react.context"),He=Symbol.for("react.forward_ref"),Ne=Symbol.for("react.suspense"),Ke=Symbol.for("react.memo"),Ge=Symbol.for("react.lazy"),Ee=Symbol.iterator;function Je(e){return e===null||typeof e!="object"?null:(e=Ee&&e[Ee]||e["@@iterator"],typeof e=="function"?e:null)}var xe={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ce=Object.assign,Re={};function Z(e,n,T){this.props=e,this.context=n,this.refs=Re,this.updater=T||xe}Z.prototype.isReactComponent={};Z.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Z.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Me(){}Me.prototype=Z.prototype;function ye(e,n,T){this.props=e,this.context=n,this.refs=Re,this.updater=T||xe}var he=ye.prototype=new Me;he.constructor=ye;Ce(he,Z.prototype);he.isPureReactComponent=!0;var we=Array.isArray,Ae=Object.prototype.hasOwnProperty,me={current:null},Ie={key:!0,ref:!0,__self:!0,__source:!0};function Le(e,n,T){var R,_={},g=null,U=null;if(n!=null)for(R in n.ref!==void 0&&(U=n.ref),n.key!==void 0&&(g=""+n.key),n)Ae.call(n,R)&&!Ie.hasOwnProperty(R)&&(_[R]=n[R]);var p=arguments.length-2;if(p===1)_.children=T;else if(1<p){for(var t=Array(p),r=0;r<p;r++)t[r]=arguments[r+2];_.children=t}if(e&&e.defaultProps)for(R in p=e.defaultProps,p)_[R]===void 0&&(_[R]=p[R]);return{$$typeof:q,type:e,key:g,ref:U,props:_,_owner:me.current}}function Xe(e,n){return{$$typeof:q,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function _e(e){return typeof e=="object"&&e!==null&&e.$$typeof===q}function Be(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(T){return n[T]})}var Oe=/\/+/g;function pe(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Be(""+e.key):n.toString(36)}function ne(e,n,T,R,_){var g=typeof e;(g==="undefined"||g==="boolean")&&(e=null);var U=!1;if(e===null)U=!0;else switch(g){case"string":case"number":U=!0;break;case"object":switch(e.$$typeof){case q:case Qe:U=!0}}if(U)return U=e,_=_(U),e=R===""?"."+pe(U,0):R,we(_)?(T="",e!=null&&(T=e.replace(Oe,"$&/")+"/"),ne(_,n,T,"",function(r){return r})):_!=null&&(_e(_)&&(_=Xe(_,T+(!_.key||U&&U.key===_.key?"":(""+_.key).replace(Oe,"$&/")+"/")+e)),n.push(_)),1;if(U=0,R=R===""?".":R+":",we(e))for(var p=0;p<e.length;p++){g=e[p];var t=R+pe(g,p);U+=ne(g,n,T,t,_)}else if(t=Je(e),typeof t=="function")for(e=t.call(e),p=0;!(g=e.next()).done;)g=g.value,t=R+pe(g,p++),U+=ne(g,n,T,t,_);else if(g==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return U}function re(e,n,T){if(e==null)return e;var R=[],_=0;return ne(e,R,"","",function(g){return n.call(T,g,_++)}),R}function Ze(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(T){(e._status===0||e._status===-1)&&(e._status=1,e._result=T)},function(T){(e._status===0||e._status===-1)&&(e._status=2,e._result=T)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var H={current:null},oe={transition:null},qe={ReactCurrentDispatcher:H,ReactCurrentBatchConfig:oe,ReactCurrentOwner:me};k.Children={map:re,forEach:function(e,n,T){re(e,function(){n.apply(this,arguments)},T)},count:function(e){var n=0;return re(e,function(){n++}),n},toArray:function(e){return re(e,function(n){return n})||[]},only:function(e){if(!_e(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};k.Component=Z;k.Fragment=Ye;k.Profiler=Fe;k.PureComponent=ye;k.StrictMode=We;k.Suspense=Ne;k.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=qe;k.cloneElement=function(e,n,T){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var R=Ce({},e.props),_=e.key,g=e.ref,U=e._owner;if(n!=null){if(n.ref!==void 0&&(g=n.ref,U=me.current),n.key!==void 0&&(_=""+n.key),e.type&&e.type.defaultProps)var p=e.type.defaultProps;for(t in n)Ae.call(n,t)&&!Ie.hasOwnProperty(t)&&(R[t]=n[t]===void 0&&p!==void 0?p[t]:n[t])}var t=arguments.length-2;if(t===1)R.children=T;else if(1<t){p=Array(t);for(var r=0;r<t;r++)p[r]=arguments[r+2];R.children=p}return{$$typeof:q,type:e.type,key:_,ref:g,props:R,_owner:U}};k.createContext=function(e){return e={$$typeof:Ve,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ze,_context:e},e.Consumer=e};k.createElement=Le;k.createFactory=function(e){var n=Le.bind(null,e);return n.type=e,n};k.createRef=function(){return{current:null}};k.forwardRef=function(e){return{$$typeof:He,render:e}};k.isValidElement=_e;k.lazy=function(e){return{$$typeof:Ge,_payload:{_status:-1,_result:e},_init:Ze}};k.memo=function(e,n){return{$$typeof:Ke,type:e,compare:n===void 0?null:n}};k.startTransition=function(e){var n=oe.transition;oe.transition={};try{e()}finally{oe.transition=n}};k.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};k.useCallback=function(e,n){return H.current.useCallback(e,n)};k.useContext=function(e){return H.current.useContext(e)};k.useDebugValue=function(){};k.useDeferredValue=function(e){return H.current.useDeferredValue(e)};k.useEffect=function(e,n){return H.current.useEffect(e,n)};k.useId=function(){return H.current.useId()};k.useImperativeHandle=function(e,n,T){return H.current.useImperativeHandle(e,n,T)};k.useInsertionEffect=function(e,n){return H.current.useInsertionEffect(e,n)};k.useLayoutEffect=function(e,n){return H.current.useLayoutEffect(e,n)};k.useMemo=function(e,n){return H.current.useMemo(e,n)};k.useReducer=function(e,n,T){return H.current.useReducer(e,n,T)};k.useRef=function(e){return H.current.useRef(e)};k.useState=function(e){return H.current.useState(e)};k.useSyncExternalStore=function(e,n,T){return H.current.useSyncExternalStore(e,n,T)};k.useTransition=function(){return H.current.useTransition()};k.version="18.2.0";(function(e){e.exports=k})(ve);const tt=Ue(ve.exports);(function(e,n){(function(R,_){e.exports=_(ve.exports)})(Pe,T=>(()=>{var R={"./node_modules/css-mediaquery/index.js":(p,t)=>{t.match=i,t.parse=s;var r=/(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,E=/\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,w=/^(?:(min|max)-)?(.+)/,b=/(em|rem|px|cm|mm|in|pt|pc)?$/,a=/(dpi|dpcm|dppx)?$/;function i(O,l){return s(O).some(function(S){var u=S.inverse,d=S.type==="all"||l.type===S.type;if(d&&u||!(d||u))return!1;var P=S.expressions.every(function(c){var x=c.feature,A=c.modifier,I=c.value,j=l[x];if(!j)return!1;switch(x){case"orientation":case"scan":return j.toLowerCase()===I.toLowerCase();case"width":case"height":case"device-width":case"device-height":I=v(I),j=v(j);break;case"resolution":I=f(I),j=f(j);break;case"aspect-ratio":case"device-aspect-ratio":case"device-pixel-ratio":I=m(I),j=m(j);break;case"grid":case"color":case"color-index":case"monochrome":I=parseInt(I,10)||1,j=parseInt(j,10)||0;break}switch(A){case"min":return j>=I;case"max":return j<=I;default:return j===I}});return P&&!u||!P&&u})}function s(O){return O.split(",").map(function(l){l=l.trim();var S=l.match(r),u=S[1],d=S[2],P=S[3]||"",c={};return c.inverse=!!u&&u.toLowerCase()==="not",c.type=d?d.toLowerCase():"all",P=P.match(/\([^\)]+\)/g)||[],c.expressions=P.map(function(x){var A=x.match(E),I=A[1].toLowerCase().match(w);return{modifier:I[1],feature:I[2],value:A[2]}}),c})}function m(O){var l=Number(O),S;return l||(S=O.match(/^(\d+)\s*\/\s*(\d+)$/),l=S[1]/S[2]),l}function f(O){var l=parseFloat(O),S=String(O).match(a)[1];switch(S){case"dpcm":return l/2.54;case"dppx":return l*96;default:return l}}function v(O){var l=parseFloat(O),S=String(O).match(b)[1];switch(S){case"em":return l*16;case"rem":return l*16;case"cm":return l*96/2.54;case"mm":return l*96/2.54/10;case"in":return l*96;case"pt":return l*72;case"pc":return l*72/12;default:return l}}},"./node_modules/hyphenate-style-name/index.js":(p,t,r)=>{r.r(t),r.d(t,{default:()=>s});var E=/[A-Z]/g,w=/^ms-/,b={};function a(m){return"-"+m.toLowerCase()}function i(m){if(b.hasOwnProperty(m))return b[m];var f=m.replace(E,a);return b[m]=w.test(f)?"-"+f:f}const s=i},"./node_modules/matchmediaquery/index.js":(p,t,r)=>{var E=r("./node_modules/css-mediaquery/index.js").match,w=typeof window<"u"?window.matchMedia:null;function b(i,s,m){var f=this;if(w&&!m){var v=w.call(window,i);this.matches=v.matches,this.media=v.media,v.addListener(S)}else this.matches=E(i,s),this.media=i;this.addListener=O,this.removeListener=l,this.dispose=u;function O(d){v&&v.addListener(d)}function l(d){v&&v.removeListener(d)}function S(d){f.matches=d.matches,f.media=d.media}function u(){v&&v.removeListener(S)}}function a(i,s,m){return new b(i,s,m)}p.exports=a},"./node_modules/object-assign/index.js":p=>{/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;function w(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function b(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var i={},s=0;s<10;s++)i["_"+String.fromCharCode(s)]=s;var m=Object.getOwnPropertyNames(i).map(function(v){return i[v]});if(m.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(v){f[v]=v}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}p.exports=b()?Object.assign:function(a,i){for(var s,m=w(a),f,v=1;v<arguments.length;v++){s=Object(arguments[v]);for(var O in s)r.call(s,O)&&(m[O]=s[O]);if(t){f=t(s);for(var l=0;l<f.length;l++)E.call(s,f[l])&&(m[f[l]]=s[f[l]])}}return m}},"./node_modules/prop-types/checkPropTypes.js":(p,t,r)=>{var E=function(){};{var w=r("./node_modules/prop-types/lib/ReactPropTypesSecret.js"),b={},a=r("./node_modules/prop-types/lib/has.js");E=function(s){var m="Warning: "+s;typeof console<"u"&&console.error(m);try{throw new Error(m)}catch{}}}function i(s,m,f,v,O){for(var l in s)if(a(s,l)){var S;try{if(typeof s[l]!="function"){var u=Error((v||"React class")+": "+f+" type `"+l+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[l]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw u.name="Invariant Violation",u}S=s[l](m,l,v,f,null,w)}catch(P){S=P}if(S&&!(S instanceof Error)&&E((v||"React class")+": type specification of "+f+" `"+l+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof S+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),S instanceof Error&&!(S.message in b)){b[S.message]=!0;var d=O?O():"";E("Failed "+f+" type: "+S.message+(d!=null?d:""))}}}i.resetWarningCache=function(){b={}},p.exports=i},"./node_modules/prop-types/factoryWithTypeCheckers.js":(p,t,r)=>{var E=r("./node_modules/react-is/index.js"),w=r("./node_modules/object-assign/index.js"),b=r("./node_modules/prop-types/lib/ReactPropTypesSecret.js"),a=r("./node_modules/prop-types/lib/has.js"),i=r("./node_modules/prop-types/checkPropTypes.js"),s=function(){};s=function(f){var v="Warning: "+f;typeof console<"u"&&console.error(v);try{throw new Error(v)}catch{}};function m(){return null}p.exports=function(f,v){var O=typeof Symbol=="function"&&Symbol.iterator,l="@@iterator";function S(o){var h=o&&(O&&o[O]||o[l]);if(typeof h=="function")return h}var u="<<anonymous>>",d={array:A("array"),bigint:A("bigint"),bool:A("boolean"),func:A("function"),number:A("number"),object:A("object"),string:A("string"),symbol:A("symbol"),any:I(),arrayOf:j,element:V(),elementType:N(),instanceOf:J,node:se(),objectOf:ue,oneOf:ae,oneOfType:ie,shape:ce,exact:fe};function P(o,h){return o===h?o!==0||1/o===1/h:o!==o&&h!==h}function c(o,h){this.message=o,this.data=h&&typeof h=="object"?h:{},this.stack=""}c.prototype=Error.prototype;function x(o){var h={},$=0;function L(Q,M,D,Y,F,W,y){if(Y=Y||u,W=W||D,y!==b){if(v){var z=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw z.name="Invariant Violation",z}else if(typeof console<"u"){var K=Y+":"+D;!h[K]&&$<3&&(s("You are manually calling a React.PropTypes validation function for the `"+W+"` prop on `"+Y+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),h[K]=!0,$++)}}return M[D]==null?Q?M[D]===null?new c("The "+F+" `"+W+"` is marked as required "+("in `"+Y+"`, but its value is `null`.")):new c("The "+F+" `"+W+"` is marked as required in "+("`"+Y+"`, but its value is `undefined`.")):null:o(M,D,Y,F,W)}var C=L.bind(null,!1);return C.isRequired=L.bind(null,!0),C}function A(o){function h($,L,C,Q,M,D){var Y=$[L],F=G(Y);if(F!==o){var W=X(Y);return new c("Invalid "+Q+" `"+M+"` of type "+("`"+W+"` supplied to `"+C+"`, expected ")+("`"+o+"`."),{expectedType:o})}return null}return x(h)}function I(){return x(m)}function j(o){function h($,L,C,Q,M){if(typeof o!="function")return new c("Property `"+M+"` of component `"+C+"` has invalid PropType notation inside arrayOf.");var D=$[L];if(!Array.isArray(D)){var Y=G(D);return new c("Invalid "+Q+" `"+M+"` of type "+("`"+Y+"` supplied to `"+C+"`, expected an array."))}for(var F=0;F<D.length;F++){var W=o(D,F,C,Q,M+"["+F+"]",b);if(W instanceof Error)return W}return null}return x(h)}function V(){function o(h,$,L,C,Q){var M=h[$];if(!f(M)){var D=G(M);return new c("Invalid "+C+" `"+Q+"` of type "+("`"+D+"` supplied to `"+L+"`, expected a single ReactElement."))}return null}return x(o)}function N(){function o(h,$,L,C,Q){var M=h[$];if(!E.isValidElementType(M)){var D=G(M);return new c("Invalid "+C+" `"+Q+"` of type "+("`"+D+"` supplied to `"+L+"`, expected a single ReactElement type."))}return null}return x(o)}function J(o){function h($,L,C,Q,M){if(!($[L]instanceof o)){var D=o.name||u,Y=te($[L]);return new c("Invalid "+Q+" `"+M+"` of type "+("`"+Y+"` supplied to `"+C+"`, expected ")+("instance of `"+D+"`."))}return null}return x(h)}function ae(o){if(!Array.isArray(o))return arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array."),m;function h($,L,C,Q,M){for(var D=$[L],Y=0;Y<o.length;Y++)if(P(D,o[Y]))return null;var F=JSON.stringify(o,function(y,z){var K=X(z);return K==="symbol"?String(z):z});return new c("Invalid "+Q+" `"+M+"` of value `"+String(D)+"` "+("supplied to `"+C+"`, expected one of "+F+"."))}return x(h)}function ue(o){function h($,L,C,Q,M){if(typeof o!="function")return new c("Property `"+M+"` of component `"+C+"` has invalid PropType notation inside objectOf.");var D=$[L],Y=G(D);if(Y!=="object")return new c("Invalid "+Q+" `"+M+"` of type "+("`"+Y+"` supplied to `"+C+"`, expected an object."));for(var F in D)if(a(D,F)){var W=o(D,F,C,Q,M+"."+F,b);if(W instanceof Error)return W}return null}return x(h)}function ie(o){if(!Array.isArray(o))return s("Invalid argument supplied to oneOfType, expected an instance of array."),m;for(var h=0;h<o.length;h++){var $=o[h];if(typeof $!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+de($)+" at index "+h+"."),m}function L(C,Q,M,D,Y){for(var F=[],W=0;W<o.length;W++){var y=o[W],z=y(C,Q,M,D,Y,b);if(z==null)return null;z.data&&a(z.data,"expectedType")&&F.push(z.data.expectedType)}var K=F.length>0?", expected one of type ["+F.join(", ")+"]":"";return new c("Invalid "+D+" `"+Y+"` supplied to "+("`"+M+"`"+K+"."))}return x(L)}function se(){function o(h,$,L,C,Q){return B(h[$])?null:new c("Invalid "+C+" `"+Q+"` supplied to "+("`"+L+"`, expected a ReactNode."))}return x(o)}function ee(o,h,$,L,C){return new c((o||"React class")+": "+h+" type `"+$+"."+L+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+C+"`.")}function ce(o){function h($,L,C,Q,M){var D=$[L],Y=G(D);if(Y!=="object")return new c("Invalid "+Q+" `"+M+"` of type `"+Y+"` "+("supplied to `"+C+"`, expected `object`."));for(var F in o){var W=o[F];if(typeof W!="function")return ee(C,Q,M,F,X(W));var y=W(D,F,C,Q,M+"."+F,b);if(y)return y}return null}return x(h)}function fe(o){function h($,L,C,Q,M){var D=$[L],Y=G(D);if(Y!=="object")return new c("Invalid "+Q+" `"+M+"` of type `"+Y+"` "+("supplied to `"+C+"`, expected `object`."));var F=w({},$[L],o);for(var W in F){var y=o[W];if(a(o,W)&&typeof y!="function")return ee(C,Q,M,W,X(y));if(!y)return new c("Invalid "+Q+" `"+M+"` key `"+W+"` supplied to `"+C+"`.\nBad object: "+JSON.stringify($[L],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(o),null,"  "));var z=y(D,W,C,Q,M+"."+W,b);if(z)return z}return null}return x(h)}function B(o){switch(typeof o){case"number":case"string":case"undefined":return!0;case"boolean":return!o;case"object":if(Array.isArray(o))return o.every(B);if(o===null||f(o))return!0;var h=S(o);if(h){var $=h.call(o),L;if(h!==o.entries){for(;!(L=$.next()).done;)if(!B(L.value))return!1}else for(;!(L=$.next()).done;){var C=L.value;if(C&&!B(C[1]))return!1}}else return!1;return!0;default:return!1}}function le(o,h){return o==="symbol"?!0:h?h["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&h instanceof Symbol:!1}function G(o){var h=typeof o;return Array.isArray(o)?"array":o instanceof RegExp?"object":le(h,o)?"symbol":h}function X(o){if(typeof o>"u"||o===null)return""+o;var h=G(o);if(h==="object"){if(o instanceof Date)return"date";if(o instanceof RegExp)return"regexp"}return h}function de(o){var h=X(o);switch(h){case"array":case"object":return"an "+h;case"boolean":case"date":case"regexp":return"a "+h;default:return h}}function te(o){return!o.constructor||!o.constructor.name?u:o.constructor.name}return d.checkPropTypes=i,d.resetWarningCache=i.resetWarningCache,d.PropTypes=d,d}},"./node_modules/prop-types/index.js":(p,t,r)=>{{var E=r("./node_modules/react-is/index.js"),w=!0;p.exports=r("./node_modules/prop-types/factoryWithTypeCheckers.js")(E.isElement,w)}},"./node_modules/prop-types/lib/ReactPropTypesSecret.js":p=>{var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";p.exports=t},"./node_modules/prop-types/lib/has.js":p=>{p.exports=Function.call.bind(Object.prototype.hasOwnProperty)},"./node_modules/react-is/cjs/react-is.development.js":(p,t)=>{/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){var r=typeof Symbol=="function"&&Symbol.for,E=r?Symbol.for("react.element"):60103,w=r?Symbol.for("react.portal"):60106,b=r?Symbol.for("react.fragment"):60107,a=r?Symbol.for("react.strict_mode"):60108,i=r?Symbol.for("react.profiler"):60114,s=r?Symbol.for("react.provider"):60109,m=r?Symbol.for("react.context"):60110,f=r?Symbol.for("react.async_mode"):60111,v=r?Symbol.for("react.concurrent_mode"):60111,O=r?Symbol.for("react.forward_ref"):60112,l=r?Symbol.for("react.suspense"):60113,S=r?Symbol.for("react.suspense_list"):60120,u=r?Symbol.for("react.memo"):60115,d=r?Symbol.for("react.lazy"):60116,P=r?Symbol.for("react.block"):60121,c=r?Symbol.for("react.fundamental"):60117,x=r?Symbol.for("react.responder"):60118,A=r?Symbol.for("react.scope"):60119;function I(y){return typeof y=="string"||typeof y=="function"||y===b||y===v||y===i||y===a||y===l||y===S||typeof y=="object"&&y!==null&&(y.$$typeof===d||y.$$typeof===u||y.$$typeof===s||y.$$typeof===m||y.$$typeof===O||y.$$typeof===c||y.$$typeof===x||y.$$typeof===A||y.$$typeof===P)}function j(y){if(typeof y=="object"&&y!==null){var z=y.$$typeof;switch(z){case E:var K=y.type;switch(K){case f:case v:case b:case i:case a:case l:return K;default:var ge=K&&K.$$typeof;switch(ge){case m:case O:case d:case u:case s:return ge;default:return z}}case w:return z}}}var V=f,N=v,J=m,ae=s,ue=E,ie=O,se=b,ee=d,ce=u,fe=w,B=i,le=a,G=l,X=!1;function de(y){return X||(X=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),te(y)||j(y)===f}function te(y){return j(y)===v}function o(y){return j(y)===m}function h(y){return j(y)===s}function $(y){return typeof y=="object"&&y!==null&&y.$$typeof===E}function L(y){return j(y)===O}function C(y){return j(y)===b}function Q(y){return j(y)===d}function M(y){return j(y)===u}function D(y){return j(y)===w}function Y(y){return j(y)===i}function F(y){return j(y)===a}function W(y){return j(y)===l}t.AsyncMode=V,t.ConcurrentMode=N,t.ContextConsumer=J,t.ContextProvider=ae,t.Element=ue,t.ForwardRef=ie,t.Fragment=se,t.Lazy=ee,t.Memo=ce,t.Portal=fe,t.Profiler=B,t.StrictMode=le,t.Suspense=G,t.isAsyncMode=de,t.isConcurrentMode=te,t.isContextConsumer=o,t.isContextProvider=h,t.isElement=$,t.isForwardRef=L,t.isFragment=C,t.isLazy=Q,t.isMemo=M,t.isPortal=D,t.isProfiler=Y,t.isStrictMode=F,t.isSuspense=W,t.isValidElementType=I,t.typeOf=j})()},"./node_modules/react-is/index.js":(p,t,r)=>{p.exports=r("./node_modules/react-is/cjs/react-is.development.js")},"./node_modules/shallow-equal/dist/index.esm.js":(p,t,r)=>{r.r(t),r.d(t,{shallowEqualArrays:()=>w,shallowEqualObjects:()=>E});function E(b,a){if(b===a)return!0;if(!b||!a)return!1;var i=Object.keys(b),s=Object.keys(a),m=i.length;if(s.length!==m)return!1;for(var f=0;f<m;f++){var v=i[f];if(b[v]!==a[v]||!Object.prototype.hasOwnProperty.call(a,v))return!1}return!0}function w(b,a){if(b===a)return!0;if(!b||!a)return!1;var i=b.length;if(a.length!==i)return!1;for(var s=0;s<i;s++)if(b[s]!==a[s])return!1;return!0}},"./src/Component.ts":function(p,t,r){var E=this&&this.__rest||function(i,s){var m={};for(var f in i)Object.prototype.hasOwnProperty.call(i,f)&&s.indexOf(f)<0&&(m[f]=i[f]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var v=0,f=Object.getOwnPropertySymbols(i);v<f.length;v++)s.indexOf(f[v])<0&&Object.prototype.propertyIsEnumerable.call(i,f[v])&&(m[f[v]]=i[f[v]]);return m},w=this&&this.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(t,"__esModule",{value:!0});var b=w(r("./src/useMediaQuery.ts")),a=function(i){var s=i.children,m=i.device,f=i.onChange,v=E(i,["children","device","onChange"]),O=(0,b.default)(v,m,f);return typeof s=="function"?s(O):O?s:null};t.default=a},"./src/Context.ts":(p,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});var E=r("react"),w=(0,E.createContext)(void 0);t.default=w},"./src/index.ts":function(p,t,r){var E=this&&this.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(t,"__esModule",{value:!0}),t.Context=t.toQuery=t.useMediaQuery=t.default=void 0;var w=E(r("./src/useMediaQuery.ts"));t.useMediaQuery=w.default;var b=E(r("./src/Component.ts"));t.default=b.default;var a=E(r("./src/toQuery.ts"));t.toQuery=a.default;var i=E(r("./src/Context.ts"));t.Context=i.default},"./src/mediaQuery.ts":function(p,t,r){var E=this&&this.__assign||function(){return E=Object.assign||function(l){for(var S,u=1,d=arguments.length;u<d;u++){S=arguments[u];for(var P in S)Object.prototype.hasOwnProperty.call(S,P)&&(l[P]=S[P])}return l},E.apply(this,arguments)},w=this&&this.__rest||function(l,S){var u={};for(var d in l)Object.prototype.hasOwnProperty.call(l,d)&&S.indexOf(d)<0&&(u[d]=l[d]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var P=0,d=Object.getOwnPropertySymbols(l);P<d.length;P++)S.indexOf(d[P])<0&&Object.prototype.propertyIsEnumerable.call(l,d[P])&&(u[d[P]]=l[d[P]]);return u},b=this&&this.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(t,"__esModule",{value:!0});var a=b(r("./node_modules/prop-types/index.js")),i=a.default.oneOfType([a.default.string,a.default.number]),s={all:a.default.bool,grid:a.default.bool,aural:a.default.bool,braille:a.default.bool,handheld:a.default.bool,print:a.default.bool,projection:a.default.bool,screen:a.default.bool,tty:a.default.bool,tv:a.default.bool,embossed:a.default.bool},m={orientation:a.default.oneOf(["portrait","landscape"]),scan:a.default.oneOf(["progressive","interlace"]),aspectRatio:a.default.string,deviceAspectRatio:a.default.string,height:i,deviceHeight:i,width:i,deviceWidth:i,color:a.default.bool,colorIndex:a.default.bool,monochrome:a.default.bool,resolution:i,type:Object.keys(s)};m.type;var f=w(m,["type"]),v=E({minAspectRatio:a.default.string,maxAspectRatio:a.default.string,minDeviceAspectRatio:a.default.string,maxDeviceAspectRatio:a.default.string,minHeight:i,maxHeight:i,minDeviceHeight:i,maxDeviceHeight:i,minWidth:i,maxWidth:i,minDeviceWidth:i,maxDeviceWidth:i,minColor:a.default.number,maxColor:a.default.number,minColorIndex:a.default.number,maxColorIndex:a.default.number,minMonochrome:a.default.number,maxMonochrome:a.default.number,minResolution:i,maxResolution:i},f),O=E(E({},s),v);t.default={all:O,types:s,matchers:m,features:v}},"./src/toQuery.ts":function(p,t,r){var E=this&&this.__importDefault||function(f){return f&&f.__esModule?f:{default:f}};Object.defineProperty(t,"__esModule",{value:!0});var w=E(r("./node_modules/hyphenate-style-name/index.js")),b=E(r("./src/mediaQuery.ts")),a=function(f){return"not ".concat(f)},i=function(f,v){var O=(0,w.default)(f);return typeof v=="number"&&(v="".concat(v,"px")),v===!0?O:v===!1?a(O):"(".concat(O,": ").concat(v,")")},s=function(f){return f.join(" and ")},m=function(f){var v=[];return Object.keys(b.default.all).forEach(function(O){var l=f[O];l!=null&&v.push(i(O,l))}),s(v)};t.default=m},"./src/useMediaQuery.ts":function(p,t,r){var E=this&&this.__importDefault||function(c){return c&&c.__esModule?c:{default:c}};Object.defineProperty(t,"__esModule",{value:!0});var w=r("react"),b=E(r("./node_modules/matchmediaquery/index.js")),a=E(r("./node_modules/hyphenate-style-name/index.js")),i=r("./node_modules/shallow-equal/dist/index.esm.js"),s=E(r("./src/toQuery.ts")),m=E(r("./src/Context.ts")),f=function(c){return c.query||(0,s.default)(c)},v=function(c){if(!!c){var x=Object.keys(c);return x.reduce(function(A,I){return A[(0,a.default)(I)]=c[I],A},{})}},O=function(){var c=(0,w.useRef)(!1);return(0,w.useEffect)(function(){c.current=!0},[]),c.current},l=function(c){var x=(0,w.useContext)(m.default),A=function(){return v(c)||v(x)},I=(0,w.useState)(A),j=I[0],V=I[1];return(0,w.useEffect)(function(){var N=A();(0,i.shallowEqualObjects)(j,N)||V(N)},[c,x]),j},S=function(c){var x=function(){return f(c)},A=(0,w.useState)(x),I=A[0],j=A[1];return(0,w.useEffect)(function(){var V=x();I!==V&&j(V)},[c]),I},u=function(c,x){var A=function(){return(0,b.default)(c,x||{},!!x)},I=(0,w.useState)(A),j=I[0],V=I[1],N=O();return(0,w.useEffect)(function(){if(N){var J=A();return V(J),function(){J&&J.dispose()}}},[c,x]),j},d=function(c){var x=(0,w.useState)(c.matches),A=x[0],I=x[1];return(0,w.useEffect)(function(){var j=function(V){I(V.matches)};return c.addListener(j),I(c.matches),function(){c.removeListener(j)}},[c]),A},P=function(c,x,A){var I=l(x),j=S(c);if(!j)throw new Error("Invalid or missing MediaQuery!");var V=u(j,I),N=d(V),J=O();return(0,w.useEffect)(function(){J&&A&&A(N)},[N]),(0,w.useEffect)(function(){return function(){V&&V.dispose()}},[]),N};t.default=P},react:p=>{p.exports=T}},_={};function g(p){var t=_[p];if(t!==void 0)return t.exports;var r=_[p]={exports:{}};return R[p].call(r.exports,r,r.exports,g),r.exports}g.d=(p,t)=>{for(var r in t)g.o(t,r)&&!g.o(p,r)&&Object.defineProperty(p,r,{enumerable:!0,get:t[r]})},g.o=(p,t)=>Object.prototype.hasOwnProperty.call(p,t),g.r=p=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(p,"__esModule",{value:!0})};var U=g("./src/index.ts");return U})())})(je);const rt=()=>{try{return window.self!==window.top}catch{return!0}},nt={PowerON:"ComputerScreen_Start",PowerOFF:"ComputerScreen_Exit"},ot=location.host.startsWith("localhost")||location.host.startsWith("127.0.0.1")||location.host.startsWith("192.168."),at=()=>window.innerWidth<480,ut=()=>je.exports.useMediaQuery({query:"(max-width: 480px)"});var De={exports:{}};(function(e,n){(function(T,R){e.exports=R()})(Pe,function(){/*! *****************************************************************************
	    Copyright (c) Microsoft Corporation. All rights reserved.
	    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	    this file except in compliance with the License. You may obtain a copy of the
	    License at http://www.apache.org/licenses/LICENSE-2.0

	    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	    MERCHANTABLITY OR NON-INFRINGEMENT.

	    See the Apache Version 2.0 License for specific language governing permissions
	    and limitations under the License.
	    ***************************************************************************** */var T=function(){return T=Object.assign||function(d){for(var P,c=1,x=arguments.length;c<x;c++){P=arguments[c];for(var A in P)Object.prototype.hasOwnProperty.call(P,A)&&(d[A]=P[A])}return d},T.apply(this,arguments)};function R(){var u=document.createElement("div");return u.style.cssText="position: fixed; top: 0; height: 100vh; pointer-events: none;",document.documentElement.insertBefore(u,document.documentElement.firstChild),u}function _(u){document.documentElement.removeChild(u)}function g(){var u=R(),d=window.innerHeight,P=u.offsetHeight,c=P-d;return _(u),{vh:P,windowHeight:d,offset:c,isNeeded:c!==0,value:0}}function U(){}function p(){var u=g();return u.value=u.offset,u}function t(){var u=g();return u.value=u.windowHeight*.01,u}var r=Object.freeze({noop:U,computeDifference:p,redefineVhUnit:t});function E(u){return typeof u=="string"&&u.length>0}function w(u){return typeof u=="function"}var b=Object.freeze({cssVarName:"vh-offset",redefineVh:!1,method:p,force:!1,bind:!0,updateOnTouch:!1,onUpdate:U});function a(u){if(E(u))return T({},b,{cssVarName:u});if(typeof u!="object")return b;var d={force:u.force===!0,bind:u.bind!==!1,updateOnTouch:u.updateOnTouch===!0,onUpdate:w(u.onUpdate)?u.onUpdate:U},P=u.redefineVh===!0;return d.method=r[P?"redefineVhUnit":"computeDifference"],d.cssVarName=E(u.cssVarName)?u.cssVarName:P?"vh":b.cssVarName,d}var i=!1,s=[];try{var m=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("test",m,m),window.removeEventListener("test",m,m)}catch{i=!1}function f(u,d){s.push({eventName:u,callback:d}),window.addEventListener(u,d,i?{passive:!0}:!1)}function v(){s.forEach(function(u){window.removeEventListener(u.eventName,u.callback)}),s=[]}function O(u,d){document.documentElement.style.setProperty("--"+u,d.value+"px")}function l(u,d){return T({},u,{unbind:v,recompute:d.method})}function S(u){var d=Object.freeze(a(u)),P=l(d.method(),d);if(!P.isNeeded&&!d.force||(O(d.cssVarName,P),d.onUpdate(P),!d.bind))return P;function c(){window.requestAnimationFrame(function(){var x=d.method();O(d.cssVarName,x),d.onUpdate(l(x,d))})}return P.unbind(),f("orientationchange",c),d.updateOnTouch&&f("touchmove",c),P}return S})})(De);const it=De.exports;var ke={exports:{}};const et=(e,n)=>Math.floor(Math.random()*(n-e+1)+e),Te=()=>{const e=new Error("Delay aborted");return e.name="AbortError",e},Se=({clearTimeout:e,setTimeout:n,willResolve:T})=>(R,{value:_,signal:g}={})=>{if(g&&g.aborted)return Promise.reject(Te());let U,p,t;const r=e||clearTimeout,E=()=>{r(U),t(Te())},w=()=>{g&&g.removeEventListener("abort",E)},b=new Promise((a,i)=>{p=()=>{w(),T?a(_):i(_)},t=i,U=(n||setTimeout)(p,R)});return g&&g.addEventListener("abort",E,{once:!0}),b.clear=()=>{r(U),U=null,p()},b},$e=e=>{const n=Se({...e,willResolve:!0});return n.reject=Se({...e,willResolve:!1}),n.range=(T,R,_)=>n(et(T,R),_),n},be=$e();be.createWithTimers=$e;ke.exports=be;ke.exports.default=be;export{nt as M,tt as R,ot as a,rt as b,Pe as c,ke as d,at as i,ve as r,ut as u,it as v};
