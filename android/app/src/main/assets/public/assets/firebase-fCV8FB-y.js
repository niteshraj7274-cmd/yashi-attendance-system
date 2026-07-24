import{o as XI,R as el}from"./vendor-CnOBNLjs.js";/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=()=>{};var Wd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ew=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Jp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,d=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|l>>6,E=l&63;u||(E=64,o||(g=64)),r.push(t[d],t[p],t[g],t[E])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Qp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ew(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||p==null)throw new tw;const g=i<<2|c>>4;if(r.push(g),l!==64){const E=c<<4&240|l>>2;if(r.push(E),p!==64){const S=l<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class tw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nw=function(n){const e=Qp(n);return Jp.encodeByteArray(e,!0)},wa=function(n){return nw(n).replace(/\./g,"")},Yp=function(n){try{return Jp.decodeString(n,!0)}catch{}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rw=()=>Xp().__FIREBASE_DEFAULTS__,sw=()=>{if(typeof process>"u"||typeof Wd>"u")return;const n=Wd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},iw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Yp(n[1]);return e&&JSON.parse(e)},Wa=()=>{try{return ZI()||rw()||sw()||iw()}catch{return}},Zp=n=>Wa()?.emulatorHosts?.[n],em=n=>{const e=Zp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},tm=()=>Wa()?.config,nm=n=>Wa()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[wa(JSON.stringify(t)),wa(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ow(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function im(){const n=Wa()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function aw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cw(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function uw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function lw(){const n=De();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function om(){return!im()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function am(){return!im()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function cm(){try{return typeof indexedDB=="object"}catch{return!1}}function hw(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw="FirebaseError";class Gt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=dw,Object.setPrototypeOf(this,Gt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,uo.prototype.create)}}class uo{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?fw(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Gt(s,c,r)}}function fw(n,e){return n.replace(pw,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const pw=/\{\$([^}]+)}/g;function mw(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Pt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Hd(i)&&Hd(o)){if(!Pt(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Hd(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ri(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Pi(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function gw(n,e){const t=new _w(n,e);return t.subscribe.bind(t)}class _w{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");yw(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=eu),s.error===void 0&&(s.error=eu),s.complete===void 0&&(s.complete=eu);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch{}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function yw(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function eu(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ha(n){return(await fetch(n,{credentials:"include"})).ok}class Mn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new rm;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Tw(e))try{this.getOrInitializeService({instanceIdentifier:ur})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=ur){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ur){return this.instances.has(e)}getOptions(e=ur){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ww(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ur){return this.component?this.component.multipleInstances?e:ur:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ww(n){return n===ur?void 0:n}function Tw(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Iw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(te||(te={}));const vw={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},Aw=te.INFO,Rw={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},Pw=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Rw[e];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class tl{constructor(e){this.name=e,this._logLevel=Aw,this._logHandler=Pw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Sw(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Sw(n){return n.getComponent()?.type==="VERSION"}const gu="@firebase/app",Qd="0.15.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new tl("@firebase/app"),Vw="@firebase/app-compat",Cw="@firebase/analytics-compat",xw="@firebase/analytics",Dw="@firebase/app-check-compat",Nw="@firebase/app-check",kw="@firebase/auth",Ow="@firebase/auth-compat",Lw="@firebase/database",Mw="@firebase/data-connect",Fw="@firebase/database-compat",Uw="@firebase/functions",Bw="@firebase/functions-compat",qw="@firebase/installations",$w="@firebase/installations-compat",jw="@firebase/messaging",zw="@firebase/messaging-compat",Gw="@firebase/performance",Kw="@firebase/performance-compat",Ww="@firebase/remote-config",Hw="@firebase/remote-config-compat",Qw="@firebase/storage",Jw="@firebase/storage-compat",Yw="@firebase/firestore",Xw="@firebase/ai",Zw="@firebase/firestore-compat",eT="firebase",tT="12.16.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ta="[DEFAULT]",nT={[gu]:"fire-core",[Vw]:"fire-core-compat",[xw]:"fire-analytics",[Cw]:"fire-analytics-compat",[Nw]:"fire-app-check",[Dw]:"fire-app-check-compat",[kw]:"fire-auth",[Ow]:"fire-auth-compat",[Lw]:"fire-rtdb",[Mw]:"fire-data-connect",[Fw]:"fire-rtdb-compat",[Uw]:"fire-fn",[Bw]:"fire-fn-compat",[qw]:"fire-iid",[$w]:"fire-iid-compat",[jw]:"fire-fcm",[zw]:"fire-fcm-compat",[Gw]:"fire-perf",[Kw]:"fire-perf-compat",[Ww]:"fire-rc",[Hw]:"fire-rc-compat",[Qw]:"fire-gcs",[Jw]:"fire-gcs-compat",[Yw]:"fire-fst",[Zw]:"fire-fst-compat",[Xw]:"fire-vertex","fire-js":"fire-js",[eT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=new Map,rT=new Map,_u=new Map;function Jd(n,e){try{n.container.addComponent(e)}catch(t){Zt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ar(n){const e=n.name;if(_u.has(e))return Zt.debug(`There were multiple attempts to register component ${e}.`),!1;_u.set(e,n);for(const t of Gi.values())Jd(t,n);for(const t of rT.values())Jd(t,n);return!0}function Fs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function sT(n,e,t=Ta){Fs(n,e).clearInstance(t)}function dt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xn=new uo("app","Firebase",iT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Mn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr=tT;function aT(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Ta,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw xn.create("bad-app-name",{appName:String(s)});if(t||(t=tm()),!t)throw xn.create("no-options");const i=Gi.get(s);if(i){if(Pt(t,i.options)&&Pt(r,i.config))return i;throw xn.create("duplicate-app",{appName:s})}const o=new Ew(s);for(const u of _u.values())o.addComponent(u);const c=new oT(t,r,o);return Gi.set(s,c),c}function nl(n=Ta){const e=Gi.get(n);if(!e&&n===Ta&&tm())return aT();if(!e)throw xn.create("no-app",{appName:n});return e}function Ix(){return Array.from(Gi.values())}function Mt(n,e,t){let r=nT[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Zt.warn(o.join(" "));return}Ar(new Mn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cT="firebase-heartbeat-database",uT=1,Ki="firebase-heartbeat-store";let tu=null;function um(){return tu||(tu=XI(cT,uT,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ki)}catch{}}}}).catch(n=>{throw xn.create("idb-open",{originalErrorMessage:n.message})})),tu}async function lT(n){try{const t=(await um()).transaction(Ki),r=await t.objectStore(Ki).get(lm(n));return await t.done,r}catch(e){if(e instanceof Gt)Zt.warn(e.message);else{const t=xn.create("idb-get",{originalErrorMessage:e?.message});Zt.warn(t.message)}}}async function Yd(n,e){try{const r=(await um()).transaction(Ki,"readwrite");await r.objectStore(Ki).put(e,lm(n)),await r.done}catch(t){if(t instanceof Gt)Zt.warn(t.message);else{const r=xn.create("idb-set",{originalErrorMessage:t?.message});Zt.warn(r.message)}}}function lm(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT=1024,dT=30;class fT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new mT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Xd();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>dT){const s=gT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Zt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Xd(),{heartbeatsToSend:t,unsentEntries:r}=pT(this._heartbeatsCache.heartbeats),s=wa(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Zt.warn(e),""}}}function Xd(){return new Date().toISOString().substring(0,10)}function pT(n,e=hT){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Zd(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Zd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class mT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return cm()?hw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await lT(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Yd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Yd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Zd(n){return wa(JSON.stringify({version:2,heartbeats:n})).length}function gT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _T(n){Ar(new Mn("platform-logger",e=>new bw(e),"PRIVATE")),Ar(new Mn("heartbeat",e=>new fT(e),"PRIVATE")),Mt(gu,Qd,n),Mt(gu,Qd,"esm2020"),Mt("fire-js","")}_T("");var ef=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dn,hm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,_){function I(){}I.prototype=_.prototype,w.F=_.prototype,w.prototype=new I,w.prototype.constructor=w,w.D=function(A,v,V){for(var y=Array(arguments.length-2),tt=2;tt<arguments.length;tt++)y[tt-2]=arguments[tt];return _.prototype[v].apply(A,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,_,I){I||(I=0);const A=Array(16);if(typeof _=="string")for(var v=0;v<16;++v)A[v]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(v=0;v<16;++v)A[v]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=w.g[0],I=w.g[1],v=w.g[2];let V=w.g[3],y;y=_+(V^I&(v^V))+A[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(v^_&(I^v))+A[1]+3905402710&4294967295,V=_+(y<<12&4294967295|y>>>20),y=v+(I^V&(_^I))+A[2]+606105819&4294967295,v=V+(y<<17&4294967295|y>>>15),y=I+(_^v&(V^_))+A[3]+3250441966&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(V^I&(v^V))+A[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(v^_&(I^v))+A[5]+1200080426&4294967295,V=_+(y<<12&4294967295|y>>>20),y=v+(I^V&(_^I))+A[6]+2821735955&4294967295,v=V+(y<<17&4294967295|y>>>15),y=I+(_^v&(V^_))+A[7]+4249261313&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(V^I&(v^V))+A[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(v^_&(I^v))+A[9]+2336552879&4294967295,V=_+(y<<12&4294967295|y>>>20),y=v+(I^V&(_^I))+A[10]+4294925233&4294967295,v=V+(y<<17&4294967295|y>>>15),y=I+(_^v&(V^_))+A[11]+2304563134&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(V^I&(v^V))+A[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(v^_&(I^v))+A[13]+4254626195&4294967295,V=_+(y<<12&4294967295|y>>>20),y=v+(I^V&(_^I))+A[14]+2792965006&4294967295,v=V+(y<<17&4294967295|y>>>15),y=I+(_^v&(V^_))+A[15]+1236535329&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(v^V&(I^v))+A[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^v&(_^I))+A[6]+3225465664&4294967295,V=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(V^_))+A[11]+643717713&4294967295,v=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(v^V))+A[0]+3921069994&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(v^V&(I^v))+A[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^v&(_^I))+A[10]+38016083&4294967295,V=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(V^_))+A[15]+3634488961&4294967295,v=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(v^V))+A[4]+3889429448&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(v^V&(I^v))+A[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^v&(_^I))+A[14]+3275163606&4294967295,V=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(V^_))+A[3]+4107603335&4294967295,v=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(v^V))+A[8]+1163531501&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(v^V&(I^v))+A[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^v&(_^I))+A[2]+4243563512&4294967295,V=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(V^_))+A[7]+1735328473&4294967295,v=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(v^V))+A[12]+2368359562&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(I^v^V)+A[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^v)+A[8]+2272392833&4294967295,V=_+(y<<11&4294967295|y>>>21),y=v+(V^_^I)+A[11]+1839030562&4294967295,v=V+(y<<16&4294967295|y>>>16),y=I+(v^V^_)+A[14]+4259657740&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(I^v^V)+A[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^v)+A[4]+1272893353&4294967295,V=_+(y<<11&4294967295|y>>>21),y=v+(V^_^I)+A[7]+4139469664&4294967295,v=V+(y<<16&4294967295|y>>>16),y=I+(v^V^_)+A[10]+3200236656&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(I^v^V)+A[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^v)+A[0]+3936430074&4294967295,V=_+(y<<11&4294967295|y>>>21),y=v+(V^_^I)+A[3]+3572445317&4294967295,v=V+(y<<16&4294967295|y>>>16),y=I+(v^V^_)+A[6]+76029189&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(I^v^V)+A[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^v)+A[12]+3873151461&4294967295,V=_+(y<<11&4294967295|y>>>21),y=v+(V^_^I)+A[15]+530742520&4294967295,v=V+(y<<16&4294967295|y>>>16),y=I+(v^V^_)+A[2]+3299628645&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(v^(I|~V))+A[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~v))+A[7]+1126891415&4294967295,V=_+(y<<10&4294967295|y>>>22),y=v+(_^(V|~I))+A[14]+2878612391&4294967295,v=V+(y<<15&4294967295|y>>>17),y=I+(V^(v|~_))+A[5]+4237533241&4294967295,I=v+(y<<21&4294967295|y>>>11),y=_+(v^(I|~V))+A[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~v))+A[3]+2399980690&4294967295,V=_+(y<<10&4294967295|y>>>22),y=v+(_^(V|~I))+A[10]+4293915773&4294967295,v=V+(y<<15&4294967295|y>>>17),y=I+(V^(v|~_))+A[1]+2240044497&4294967295,I=v+(y<<21&4294967295|y>>>11),y=_+(v^(I|~V))+A[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~v))+A[15]+4264355552&4294967295,V=_+(y<<10&4294967295|y>>>22),y=v+(_^(V|~I))+A[6]+2734768916&4294967295,v=V+(y<<15&4294967295|y>>>17),y=I+(V^(v|~_))+A[13]+1309151649&4294967295,I=v+(y<<21&4294967295|y>>>11),y=_+(v^(I|~V))+A[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~v))+A[11]+3174756917&4294967295,V=_+(y<<10&4294967295|y>>>22),y=v+(_^(V|~I))+A[2]+718787259&4294967295,v=V+(y<<15&4294967295|y>>>17),y=I+(V^(v|~_))+A[9]+3951481745&4294967295,w.g[0]=w.g[0]+_&4294967295,w.g[1]=w.g[1]+(v+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+v&4294967295,w.g[3]=w.g[3]+V&4294967295}r.prototype.v=function(w,_){_===void 0&&(_=w.length);const I=_-this.blockSize,A=this.C;let v=this.h,V=0;for(;V<_;){if(v==0)for(;V<=I;)s(this,w,V),V+=this.blockSize;if(typeof w=="string"){for(;V<_;)if(A[v++]=w.charCodeAt(V++),v==this.blockSize){s(this,A),v=0;break}}else for(;V<_;)if(A[v++]=w[V++],v==this.blockSize){s(this,A),v=0;break}}this.h=v,this.o+=_},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var _=1;_<w.length-8;++_)w[_]=0;_=this.o*8;for(var I=w.length-8;I<w.length;++I)w[I]=_&255,_/=256;for(this.v(w),w=Array(16),_=0,I=0;I<4;++I)for(let A=0;A<32;A+=8)w[_++]=this.g[I]>>>A&255;return w};function i(w,_){var I=c;return Object.prototype.hasOwnProperty.call(I,w)?I[w]:I[w]=_(w)}function o(w,_){this.h=_;const I=[];let A=!0;for(let v=w.length-1;v>=0;v--){const V=w[v]|0;A&&V==_||(I[v]=V,A=!1)}this.g=I}var c={};function u(w){return-128<=w&&w<128?i(w,function(_){return new o([_|0],_<0?-1:0)}):new o([w|0],w<0?-1:0)}function l(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return k(l(-w));const _=[];let I=1;for(let A=0;w>=I;A++)_[A]=w/I|0,I*=4294967296;return new o(_,0)}function d(w,_){if(w.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(w.charAt(0)=="-")return k(d(w.substring(1),_));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=l(Math.pow(_,8));let A=p;for(let V=0;V<w.length;V+=8){var v=Math.min(8,w.length-V);const y=parseInt(w.substring(V,V+v),_);v<8?(v=l(Math.pow(_,v)),A=A.j(v).add(l(y))):(A=A.j(I),A=A.add(l(y)))}return A}var p=u(0),g=u(1),E=u(16777216);n=o.prototype,n.m=function(){if(N(this))return-k(this).m();let w=0,_=1;for(let I=0;I<this.g.length;I++){const A=this.i(I);w+=(A>=0?A:4294967296+A)*_,_*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(S(this))return"0";if(N(this))return"-"+k(this).toString(w);const _=l(Math.pow(w,6));var I=this;let A="";for(;;){const v=J(I,_).g;I=q(I,v.j(_));let V=((I.g.length>0?I.g[0]:I.h)>>>0).toString(w);if(I=v,S(I))return V+A;for(;V.length<6;)V="0"+V;A=V+A}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function S(w){if(w.h!=0)return!1;for(let _=0;_<w.g.length;_++)if(w.g[_]!=0)return!1;return!0}function N(w){return w.h==-1}n.l=function(w){return w=q(this,w),N(w)?-1:S(w)?0:1};function k(w){const _=w.g.length,I=[];for(let A=0;A<_;A++)I[A]=~w.g[A];return new o(I,~w.h).add(g)}n.abs=function(){return N(this)?k(this):this},n.add=function(w){const _=Math.max(this.g.length,w.g.length),I=[];let A=0;for(let v=0;v<=_;v++){let V=A+(this.i(v)&65535)+(w.i(v)&65535),y=(V>>>16)+(this.i(v)>>>16)+(w.i(v)>>>16);A=y>>>16,V&=65535,y&=65535,I[v]=y<<16|V}return new o(I,I[I.length-1]&-2147483648?-1:0)};function q(w,_){return w.add(k(_))}n.j=function(w){if(S(this)||S(w))return p;if(N(this))return N(w)?k(this).j(k(w)):k(k(this).j(w));if(N(w))return k(this.j(k(w)));if(this.l(E)<0&&w.l(E)<0)return l(this.m()*w.m());const _=this.g.length+w.g.length,I=[];for(var A=0;A<2*_;A++)I[A]=0;for(A=0;A<this.g.length;A++)for(let v=0;v<w.g.length;v++){const V=this.i(A)>>>16,y=this.i(A)&65535,tt=w.i(v)>>>16,rr=w.i(v)&65535;I[2*A+2*v]+=y*rr,G(I,2*A+2*v),I[2*A+2*v+1]+=V*rr,G(I,2*A+2*v+1),I[2*A+2*v+1]+=y*tt,G(I,2*A+2*v+1),I[2*A+2*v+2]+=V*tt,G(I,2*A+2*v+2)}for(w=0;w<_;w++)I[w]=I[2*w+1]<<16|I[2*w];for(w=_;w<2*_;w++)I[w]=0;return new o(I,0)};function G(w,_){for(;(w[_]&65535)!=w[_];)w[_+1]+=w[_]>>>16,w[_]&=65535,_++}function j(w,_){this.g=w,this.h=_}function J(w,_){if(S(_))throw Error("division by zero");if(S(w))return new j(p,p);if(N(w))return _=J(k(w),_),new j(k(_.g),k(_.h));if(N(_))return _=J(w,k(_)),new j(k(_.g),_.h);if(w.g.length>30){if(N(w)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,A=_;A.l(w)<=0;)I=se(I),A=se(A);var v=ee(I,1),V=ee(A,1);for(A=ee(A,2),I=ee(I,2);!S(A);){var y=V.add(A);y.l(w)<=0&&(v=v.add(I),V=y),A=ee(A,1),I=ee(I,1)}return _=q(w,v.j(_)),new j(v,_)}for(v=p;w.l(_)>=0;){for(I=Math.max(1,Math.floor(w.m()/_.m())),A=Math.ceil(Math.log(I)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),V=l(I),y=V.j(_);N(y)||y.l(w)>0;)I-=A,V=l(I),y=V.j(_);S(V)&&(V=g),v=v.add(V),w=q(w,y)}return new j(v,w)}n.B=function(w){return J(this,w).h},n.and=function(w){const _=Math.max(this.g.length,w.g.length),I=[];for(let A=0;A<_;A++)I[A]=this.i(A)&w.i(A);return new o(I,this.h&w.h)},n.or=function(w){const _=Math.max(this.g.length,w.g.length),I=[];for(let A=0;A<_;A++)I[A]=this.i(A)|w.i(A);return new o(I,this.h|w.h)},n.xor=function(w){const _=Math.max(this.g.length,w.g.length),I=[];for(let A=0;A<_;A++)I[A]=this.i(A)^w.i(A);return new o(I,this.h^w.h)};function se(w){const _=w.g.length+1,I=[];for(let A=0;A<_;A++)I[A]=w.i(A)<<1|w.i(A-1)>>>31;return new o(I,w.h)}function ee(w,_){const I=_>>5;_%=32;const A=w.g.length-I,v=[];for(let V=0;V<A;V++)v[V]=_>0?w.i(V+I)>>>_|w.i(V+I+1)<<32-_:w.i(V+I);return new o(v,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,hm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,Dn=o}).apply(typeof ef<"u"?ef:typeof self<"u"?self:typeof window<"u"?window:{});var Wo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dm,bi,fm,oa,yu,pm,mm,gm;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Wo=="object"&&Wo];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var P=a[m];if(!(P in f))break e;f=f[P]}a=a[a.length-1],m=f[a],h=h(m),h!=m&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var f=[],m;for(m in h)Object.prototype.hasOwnProperty.call(h,m)&&f.push([m,h[m]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,f){return a.call.apply(a.bind,arguments)}function l(a,h,f){return l=u,l.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(m,P,C){for(var B=Array(arguments.length-2),X=2;X<arguments.length;X++)B[X-2]=arguments[X];return h.prototype[P].apply(m,B)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function E(a){const h=a.length;if(h>0){const f=Array(h);for(let m=0;m<h;m++)f[m]=a[m];return f}return[]}function S(a,h){for(let m=1;m<arguments.length;m++){const P=arguments[m];var f=typeof P;if(f=f!="object"?f:P?Array.isArray(P)?"array":f:"null",f=="array"||f=="object"&&typeof P.length=="number"){f=a.length||0;const C=P.length||0;a.length=f+C;for(let B=0;B<C;B++)a[f+B]=P[B]}else a.push(P)}}class N{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){o.setTimeout(()=>{throw a},0)}function q(){var a=w;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class G{constructor(){this.h=this.g=null}add(h,f){const m=j.get();m.set(h,f),this.h?this.h.next=m:this.g=m,this.h=m}}var j=new N(()=>new J,a=>a.reset());class J{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let se,ee=!1,w=new G,_=()=>{const a=Promise.resolve(void 0);se=()=>{a.then(I)}};function I(){for(var a;a=q();){try{a.h.call(a.g)}catch(f){k(f)}var h=j;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}ee=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var V=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function tt(a,h){v.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(tt,v),tt.prototype.init=function(a,h){const f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&tt.Z.h.call(this)},tt.prototype.h=function(){tt.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var rr="closure_listenable_"+(Math.random()*1e6|0),wI=0;function TI(a,h,f,m,P){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!m,this.ha=P,this.key=++wI,this.da=this.fa=!1}function Do(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function No(a,h,f){for(const m in a)h.call(f,a[m],m,a)}function EI(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function Kh(a){const h={};for(const f in a)h[f]=a[f];return h}const Wh="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Hh(a,h){let f,m;for(let P=1;P<arguments.length;P++){m=arguments[P];for(f in m)a[f]=m[f];for(let C=0;C<Wh.length;C++)f=Wh[C],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function ko(a){this.src=a,this.g={},this.h=0}ko.prototype.add=function(a,h,f,m,P){const C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);const B=xc(a,h,m,P);return B>-1?(h=a[B],f||(h.fa=!1)):(h=new TI(h,this.src,C,!!m,P),h.fa=f,a.push(h)),h};function Cc(a,h){const f=h.type;if(f in a.g){var m=a.g[f],P=Array.prototype.indexOf.call(m,h,void 0),C;(C=P>=0)&&Array.prototype.splice.call(m,P,1),C&&(Do(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function xc(a,h,f,m){for(let P=0;P<a.length;++P){const C=a[P];if(!C.da&&C.listener==h&&C.capture==!!f&&C.ha==m)return P}return-1}var Dc="closure_lm_"+(Math.random()*1e6|0),Nc={};function Qh(a,h,f,m,P){if(Array.isArray(h)){for(let C=0;C<h.length;C++)Qh(a,h[C],f,m,P);return null}return f=Xh(f),a&&a[rr]?a.J(h,f,c(m)?!!m.capture:!1,P):vI(a,h,f,!1,m,P)}function vI(a,h,f,m,P,C){if(!h)throw Error("Invalid event type");const B=c(P)?!!P.capture:!!P;let X=Oc(a);if(X||(a[Dc]=X=new ko(a)),f=X.add(h,f,m,B,C),f.proxy)return f;if(m=AI(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)V||(P=B),P===void 0&&(P=!1),a.addEventListener(h.toString(),m,P);else if(a.attachEvent)a.attachEvent(Yh(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function AI(){function a(f){return h.call(a.src,a.listener,f)}const h=RI;return a}function Jh(a,h,f,m,P){if(Array.isArray(h))for(var C=0;C<h.length;C++)Jh(a,h[C],f,m,P);else m=c(m)?!!m.capture:!!m,f=Xh(f),a&&a[rr]?(a=a.i,C=String(h).toString(),C in a.g&&(h=a.g[C],f=xc(h,f,m,P),f>-1&&(Do(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[C],a.h--)))):a&&(a=Oc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=xc(h,f,m,P)),(f=a>-1?h[a]:null)&&kc(f))}function kc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[rr])Cc(h.i,a);else{var f=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(f,m,a.capture):h.detachEvent?h.detachEvent(Yh(f),m):h.addListener&&h.removeListener&&h.removeListener(m),(f=Oc(h))?(Cc(f,a),f.h==0&&(f.src=null,h[Dc]=null)):Do(a)}}}function Yh(a){return a in Nc?Nc[a]:Nc[a]="on"+a}function RI(a,h){if(a.da)a=!0;else{h=new tt(h,this);const f=a.listener,m=a.ha||a.src;a.fa&&kc(a),a=f.call(m,h)}return a}function Oc(a){return a=a[Dc],a instanceof ko?a:null}var Lc="__closure_events_fn_"+(Math.random()*1e9>>>0);function Xh(a){return typeof a=="function"?a:(a[Lc]||(a[Lc]=function(h){return a.handleEvent(h)}),a[Lc])}function je(){A.call(this),this.i=new ko(this),this.M=this,this.G=null}p(je,A),je.prototype[rr]=!0,je.prototype.removeEventListener=function(a,h,f,m){Jh(this,a,h,f,m)};function Ye(a,h){var f,m=a.G;if(m)for(f=[];m;m=m.G)f.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new v(h,a);else if(h instanceof v)h.target=h.target||a;else{var P=h;h=new v(m,a),Hh(h,P)}P=!0;let C,B;if(f)for(B=f.length-1;B>=0;B--)C=h.g=f[B],P=Oo(C,m,!0,h)&&P;if(C=h.g=a,P=Oo(C,m,!0,h)&&P,P=Oo(C,m,!1,h)&&P,f)for(B=0;B<f.length;B++)C=h.g=f[B],P=Oo(C,m,!1,h)&&P}je.prototype.N=function(){if(je.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let m=0;m<f.length;m++)Do(f[m]);delete a.g[h],a.h--}}this.G=null},je.prototype.J=function(a,h,f,m){return this.i.add(String(a),h,!1,f,m)},je.prototype.K=function(a,h,f,m){return this.i.add(String(a),h,!0,f,m)};function Oo(a,h,f,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let P=!0;for(let C=0;C<h.length;++C){const B=h[C];if(B&&!B.da&&B.capture==f){const X=B.listener,Ce=B.ha||B.src;B.fa&&Cc(a.i,B),P=X.call(Ce,m)!==!1&&P}}return P&&!m.defaultPrevented}function PI(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Zh(a){a.g=PI(()=>{a.g=null,a.i&&(a.i=!1,Zh(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class bI extends A{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Zh(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ni(a){A.call(this),this.h=a,this.g={}}p(ni,A);var ed=[];function td(a){No(a.g,function(h,f){this.g.hasOwnProperty(f)&&kc(h)},a),a.g={}}ni.prototype.N=function(){ni.Z.N.call(this),td(this)},ni.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Mc=o.JSON.stringify,SI=o.JSON.parse,VI=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function nd(){}function rd(){}var ri={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Fc(){v.call(this,"d")}p(Fc,v);function Uc(){v.call(this,"c")}p(Uc,v);var sr={},sd=null;function Lo(){return sd=sd||new je}sr.Ia="serverreachability";function id(a){v.call(this,sr.Ia,a)}p(id,v);function si(a){const h=Lo();Ye(h,new id(h))}sr.STAT_EVENT="statevent";function od(a,h){v.call(this,sr.STAT_EVENT,a),this.stat=h}p(od,v);function Xe(a){const h=Lo();Ye(h,new od(h,a))}sr.Ja="timingevent";function ad(a,h){v.call(this,sr.Ja,a),this.size=h}p(ad,v);function ii(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function oi(){this.g=!0}oi.prototype.ua=function(){this.g=!1};function CI(a,h,f,m,P,C){a.info(function(){if(a.g)if(C){var B="",X=C.split("&");for(let he=0;he<X.length;he++){var Ce=X[he].split("=");if(Ce.length>1){const Le=Ce[0];Ce=Ce[1];const Vt=Le.split("_");B=Vt.length>=2&&Vt[1]=="type"?B+(Le+"="+Ce+"&"):B+(Le+"=redacted&")}}}else B=null;else B=C;return"XMLHTTP REQ ("+m+") [attempt "+P+"]: "+h+`
`+f+`
`+B})}function xI(a,h,f,m,P,C,B){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+P+"]: "+h+`
`+f+`
`+C+" "+B})}function Hr(a,h,f,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+NI(a,f)+(m?" "+m:"")})}function DI(a,h){a.info(function(){return"TIMEOUT: "+h})}oi.prototype.info=function(){};function NI(a,h){if(!a.g)return h;if(!h)return null;try{const C=JSON.parse(h);if(C){for(a=0;a<C.length;a++)if(Array.isArray(C[a])){var f=C[a];if(!(f.length<2)){var m=f[1];if(Array.isArray(m)&&!(m.length<1)){var P=m[0];if(P!="noop"&&P!="stop"&&P!="close")for(let B=1;B<m.length;B++)m[B]=""}}}}return Mc(C)}catch{return h}}var Mo={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},cd={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ud;function Bc(){}p(Bc,nd),Bc.prototype.g=function(){return new XMLHttpRequest},ud=new Bc;function ai(a){return encodeURIComponent(String(a))}function kI(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function ln(a,h,f,m){this.j=a,this.i=h,this.l=f,this.S=m||1,this.V=new ni(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ld}function ld(){this.i=null,this.g="",this.h=!1}var hd={},qc={};function $c(a,h,f){a.M=1,a.A=Uo(St(h)),a.u=f,a.R=!0,dd(a,null)}function dd(a,h){a.F=Date.now(),Fo(a),a.B=St(a.A);var f=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),Rd(f.i,"t",m),a.C=0,f=a.j.L,a.h=new ld,a.g=jd(a.j,f?h:null,!a.u),a.P>0&&(a.O=new bI(l(a.Y,a,a.g),a.P)),h=a.V,f=a.g,m=a.ba;var P="readystatechange";Array.isArray(P)||(P&&(ed[0]=P.toString()),P=ed);for(let C=0;C<P.length;C++){const B=Qh(f,P[C],m||h.handleEvent,!1,h.h||h);if(!B)break;h.g[B.key]=B}h=a.J?Kh(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),si(),CI(a.i,a.v,a.B,a.l,a.S,a.u)}ln.prototype.ba=function(a){a=a.target;const h=this.O;h&&fn(a)==3?h.j():this.Y(a)},ln.prototype.Y=function(a){try{if(a==this.g)e:{const X=fn(this.g),Ce=this.g.ya(),he=this.g.ca();if(!(X<3)&&(X!=3||this.g&&(this.h.h||this.g.la()||Dd(this.g)))){this.K||X!=4||Ce==7||(Ce==8||he<=0?si(3):si(2)),jc(this);var h=this.g.ca();this.X=h;var f=OI(this);if(this.o=h==200,xI(this.i,this.v,this.B,this.l,this.S,X,h),this.o){if(this.U&&!this.L){t:{if(this.g){var m,P=this.g;if((m=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var C=m;break t}}C=null}if(a=C)Hr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,zc(this,a);else{this.o=!1,this.m=3,Xe(12),ir(this),ci(this);break e}}if(this.R){a=!0;let Le;for(;!this.K&&this.C<f.length;)if(Le=LI(this,f),Le==qc){X==4&&(this.m=4,Xe(14),a=!1),Hr(this.i,this.l,null,"[Incomplete Response]");break}else if(Le==hd){this.m=4,Xe(15),Hr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else Hr(this.i,this.l,Le,null),zc(this,Le);if(fd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),X!=4||f.length!=0||this.h.h||(this.m=1,Xe(16),a=!1),this.o=this.o&&a,!a)Hr(this.i,this.l,f,"[Invalid Chunked Response]"),ir(this),ci(this);else if(f.length>0&&!this.W){this.W=!0;var B=this.j;B.g==this&&B.aa&&!B.P&&(B.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),Xc(B),B.P=!0,Xe(11))}}else Hr(this.i,this.l,f,null),zc(this,f);X==4&&ir(this),this.o&&!this.K&&(X==4?Ud(this.j,this):(this.o=!1,Fo(this)))}else JI(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,Xe(12)):(this.m=0,Xe(13)),ir(this),ci(this)}}}catch{}finally{}};function OI(a){if(!fd(a))return a.g.la();const h=Dd(a.g);if(h==="")return"";let f="";const m=h.length,P=fn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return ir(a),ci(a),"";a.h.i=new o.TextDecoder}for(let C=0;C<m;C++)a.h.h=!0,f+=a.h.i.decode(h[C],{stream:!(P&&C==m-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function fd(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function LI(a,h){var f=a.C,m=h.indexOf(`
`,f);return m==-1?qc:(f=Number(h.substring(f,m)),isNaN(f)?hd:(m+=1,m+f>h.length?qc:(h=h.slice(m,m+f),a.C=m+f,h)))}ln.prototype.cancel=function(){this.K=!0,ir(this)};function Fo(a){a.T=Date.now()+a.H,pd(a,a.H)}function pd(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=ii(l(a.aa,a),h)}function jc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}ln.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(DI(this.i,this.B),this.M!=2&&(si(),Xe(17)),ir(this),this.m=2,ci(this)):pd(this,this.T-a)};function ci(a){a.j.I==0||a.K||Ud(a.j,a)}function ir(a){jc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,td(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function zc(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||Gc(f.h,a))){if(!a.L&&Gc(f.h,a)&&f.I==3){try{var m=f.Ba.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var P=m;if(P[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)zo(f),$o(f);else break e;Yc(f),Xe(18)}}else f.xa=P[1],0<f.xa-f.K&&P[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=ii(l(f.Va,f),6e3));_d(f.h)<=1&&f.ta&&(f.ta=void 0)}else ar(f,11)}else if((a.L||f.g==a)&&zo(f),!y(h))for(P=f.Ba.g.parse(h),h=0;h<P.length;h++){let he=P[h];const Le=he[0];if(!(Le<=f.K))if(f.K=Le,he=he[1],f.I==2)if(he[0]=="c"){f.M=he[1],f.ba=he[2];const Vt=he[3];Vt!=null&&(f.ka=Vt,f.j.info("VER="+f.ka));const cr=he[4];cr!=null&&(f.za=cr,f.j.info("SVER="+f.za));const pn=he[5];pn!=null&&typeof pn=="number"&&pn>0&&(m=1.5*pn,f.O=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const mn=a.g;if(mn){const Ko=mn.g?mn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ko){var C=m.h;C.g||Ko.indexOf("spdy")==-1&&Ko.indexOf("quic")==-1&&Ko.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(Kc(C,C.h),C.h=null))}if(m.G){const Zc=mn.g?mn.g.getResponseHeader("X-HTTP-Session-Id"):null;Zc&&(m.wa=Zc,ge(m.J,m.G,Zc))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),m=f;var B=a;if(m.na=$d(m,m.L?m.ba:null,m.W),B.L){yd(m.h,B);var X=B,Ce=m.O;Ce&&(X.H=Ce),X.D&&(jc(X),Fo(X)),m.g=B}else Md(m);f.i.length>0&&jo(f)}else he[0]!="stop"&&he[0]!="close"||ar(f,7);else f.I==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?ar(f,7):Jc(f):he[0]!="noop"&&f.l&&f.l.qa(he),f.A=0)}}si(4)}catch{}}var MI=class{constructor(a,h){this.g=a,this.map=h}};function md(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function gd(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function _d(a){return a.h?1:a.g?a.g.size:0}function Gc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Kc(a,h){a.g?a.g.add(h):a.h=h}function yd(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}md.prototype.cancel=function(){if(this.i=Id(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Id(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return E(a.i)}var wd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function FI(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const m=a[f].indexOf("=");let P,C=null;m>=0?(P=a[f].substring(0,m),C=a[f].substring(m+1)):P=a[f],h(P,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function hn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof hn?(this.l=a.l,ui(this,a.j),this.o=a.o,this.g=a.g,li(this,a.u),this.h=a.h,Wc(this,Pd(a.i)),this.m=a.m):a&&(h=String(a).match(wd))?(this.l=!1,ui(this,h[1]||"",!0),this.o=hi(h[2]||""),this.g=hi(h[3]||"",!0),li(this,h[4]),this.h=hi(h[5]||"",!0),Wc(this,h[6]||"",!0),this.m=hi(h[7]||"")):(this.l=!1,this.i=new fi(null,this.l))}hn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(di(h,Td,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(di(h,Td,!0),"@"),a.push(ai(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(di(f,f.charAt(0)=="/"?qI:BI,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",di(f,jI)),a.join("")},hn.prototype.resolve=function(a){const h=St(this);let f=!!a.j;f?ui(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var m=a.h;if(f)li(h,a.u);else if(f=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var P=h.h.lastIndexOf("/");P!=-1&&(m=h.h.slice(0,P+1)+m)}if(P=m,P==".."||P==".")m="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){m=P.lastIndexOf("/",0)==0,P=P.split("/");const C=[];for(let B=0;B<P.length;){const X=P[B++];X=="."?m&&B==P.length&&C.push(""):X==".."?((C.length>1||C.length==1&&C[0]!="")&&C.pop(),m&&B==P.length&&C.push("")):(C.push(X),m=!0)}m=C.join("/")}else m=P}return f?h.h=m:f=a.i.toString()!=="",f?Wc(h,Pd(a.i)):f=!!a.m,f&&(h.m=a.m),h};function St(a){return new hn(a)}function ui(a,h,f){a.j=f?hi(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function li(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Wc(a,h,f){h instanceof fi?(a.i=h,zI(a.i,a.l)):(f||(h=di(h,$I)),a.i=new fi(h,a.l))}function ge(a,h,f){a.i.set(h,f)}function Uo(a){return ge(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function hi(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function di(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,UI),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function UI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Td=/[#\/\?@]/g,BI=/[#\?:]/g,qI=/[#\?]/g,$I=/[#\?@]/g,jI=/#/g;function fi(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function or(a){a.g||(a.g=new Map,a.h=0,a.i&&FI(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=fi.prototype,n.add=function(a,h){or(this),this.i=null,a=Qr(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function Ed(a,h){or(a),h=Qr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function vd(a,h){return or(a),h=Qr(a,h),a.g.has(h)}n.forEach=function(a,h){or(this),this.g.forEach(function(f,m){f.forEach(function(P){a.call(h,P,m,this)},this)},this)};function Ad(a,h){or(a);let f=[];if(typeof h=="string")vd(a,h)&&(f=f.concat(a.g.get(Qr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}n.set=function(a,h){return or(this),this.i=null,a=Qr(this,a),vd(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=Ad(this,a),a.length>0?String(a[0]):h):h};function Rd(a,h,f){Ed(a,h),f.length>0&&(a.i=null,a.g.set(Qr(a,h),E(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let m=0;m<h.length;m++){var f=h[m];const P=ai(f);f=Ad(this,f);for(let C=0;C<f.length;C++){let B=P;f[C]!==""&&(B+="="+ai(f[C])),a.push(B)}}return this.i=a.join("&")};function Pd(a){const h=new fi;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function Qr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function zI(a,h){h&&!a.j&&(or(a),a.i=null,a.g.forEach(function(f,m){const P=m.toLowerCase();m!=P&&(Ed(this,m),Rd(this,P,f))},a)),a.j=h}function GI(a,h){const f=new oi;if(o.Image){const m=new Image;m.onload=d(dn,f,"TestLoadImage: loaded",!0,h,m),m.onerror=d(dn,f,"TestLoadImage: error",!1,h,m),m.onabort=d(dn,f,"TestLoadImage: abort",!1,h,m),m.ontimeout=d(dn,f,"TestLoadImage: timeout",!1,h,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function KI(a,h){const f=new oi,m=new AbortController,P=setTimeout(()=>{m.abort(),dn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(C=>{clearTimeout(P),C.ok?dn(f,"TestPingServer: ok",!0,h):dn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(P),dn(f,"TestPingServer: error",!1,h)})}function dn(a,h,f,m,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),m(f)}catch{}}function WI(){this.g=new VI}function Hc(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Hc,nd),Hc.prototype.g=function(){return new Bo(this.i,this.h)};function Bo(a,h){je.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Bo,je),n=Bo.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,mi(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,pi(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,mi(this)),this.g&&(this.readyState=3,mi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;bd(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function bd(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?pi(this):mi(this),this.readyState==3&&bd(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,pi(this))},n.Na=function(a){this.g&&(this.response=a,pi(this))},n.ga=function(){this.g&&pi(this)};function pi(a){a.readyState=4,a.l=null,a.j=null,a.B=null,mi(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function mi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Bo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Sd(a){let h="";return No(a,function(f,m){h+=m,h+=":",h+=f,h+=`\r
`}),h}function Qc(a,h,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=Sd(f),typeof a=="string"?f!=null&&ai(f):ge(a,h,f))}function we(a){je.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(we,je);var HI=/^https?$/i,QI=["POST","PUT"];n=we.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ud.g(),this.g.onreadystatechange=g(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(C){Vd(this,C);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var P in m)f.set(P,m[P]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const C of m.keys())f.set(C,m.get(C));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(C=>C.toLowerCase()=="content-type"),P=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(QI,h,void 0)>=0)||m||P||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,B]of f)this.g.setRequestHeader(C,B);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(C){Vd(this,C)}};function Vd(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Cd(a),qo(a)}function Cd(a){a.A||(a.A=!0,Ye(a,"complete"),Ye(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ye(this,"complete"),Ye(this,"abort"),qo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),qo(this,!0)),we.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?xd(this):this.Xa())},n.Xa=function(){xd(this)};function xd(a){if(a.h&&typeof i<"u"){if(a.v&&fn(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ye(a,"readystatechange"),fn(a)==4){a.h=!1;try{const C=a.ca();e:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var m;if(m=C===0){let B=String(a.D).match(wd)[1]||null;!B&&o.self&&o.self.location&&(B=o.self.location.protocol.slice(0,-1)),m=!HI.test(B?B.toLowerCase():"")}f=m}if(f)Ye(a,"complete"),Ye(a,"success");else{a.o=6;try{var P=fn(a)>2?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.ca()+"]",Cd(a)}}finally{qo(a)}}}}function qo(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||Ye(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function fn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return fn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),SI(h)}};function Dd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function JI(a){const h={};a=(a.g&&fn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(y(a[m]))continue;var f=kI(a[m]);const P=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const C=h[P]||[];h[P]=C,C.push(f)}EI(h,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function gi(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Nd(a){this.za=0,this.i=[],this.j=new oi,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=gi("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=gi("baseRetryDelayMs",5e3,a),this.Za=gi("retryDelaySeedMs",1e4,a),this.Ta=gi("forwardChannelMaxRetries",2,a),this.va=gi("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new md(a&&a.concurrentRequestLimit),this.Ba=new WI,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Nd.prototype,n.ka=8,n.I=1,n.connect=function(a,h,f,m){Xe(0),this.W=a,this.H=h||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.J=$d(this,null,this.W),jo(this)};function Jc(a){if(kd(a),a.I==3){var h=a.V++,f=St(a.J);if(ge(f,"SID",a.M),ge(f,"RID",h),ge(f,"TYPE","terminate"),_i(a,f),h=new ln(a,a.j,h),h.M=2,h.A=Uo(St(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=jd(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Fo(h)}qd(a)}function $o(a){a.g&&(Xc(a),a.g.cancel(),a.g=null)}function kd(a){$o(a),a.v&&(o.clearTimeout(a.v),a.v=null),zo(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function jo(a){if(!gd(a.h)&&!a.m){a.m=!0;var h=a.Ea;se||_(),ee||(se(),ee=!0),w.add(h,a),a.D=0}}function YI(a,h){return _d(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=ii(l(a.Ea,a,h),Bd(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const P=new ln(this,this.j,a);let C=this.o;if(this.U&&(C?(C=Kh(C),Hh(C,this.U)):C=this.U),this.u!==null||this.R||(P.J=C,C=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Ld(this,P,h),f=St(this.J),ge(f,"RID",a),ge(f,"CVER",22),this.G&&ge(f,"X-HTTP-Session-Id",this.G),_i(this,f),C&&(this.R?h="headers="+ai(Sd(C))+"&"+h:this.u&&Qc(f,this.u,C)),Kc(this.h,P),this.Ra&&ge(f,"TYPE","init"),this.S?(ge(f,"$req",h),ge(f,"SID","null"),P.U=!0,$c(P,f,null)):$c(P,f,h),this.I=2}}else this.I==3&&(a?Od(this,a):this.i.length==0||gd(this.h)||Od(this))};function Od(a,h){var f;h?f=h.l:f=a.V++;const m=St(a.J);ge(m,"SID",a.M),ge(m,"RID",f),ge(m,"AID",a.K),_i(a,m),a.u&&a.o&&Qc(m,a.u,a.o),f=new ln(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Ld(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Kc(a.h,f),$c(f,m,h)}function _i(a,h){a.H&&No(a.H,function(f,m){ge(h,m,f)}),a.l&&No({},function(f,m){ge(h,m,f)})}function Ld(a,h,f){f=Math.min(a.i.length,f);const m=a.l?l(a.l.Ka,a.l,a):null;e:{var P=a.i;let X=-1;for(;;){const Ce=["count="+f];X==-1?f>0?(X=P[0].g,Ce.push("ofs="+X)):X=0:Ce.push("ofs="+X);let he=!0;for(let Le=0;Le<f;Le++){var C=P[Le].g;const Vt=P[Le].map;if(C-=X,C<0)X=Math.max(0,P[Le].g-100),he=!1;else try{C="req"+C+"_"||"";try{var B=Vt instanceof Map?Vt:Object.entries(Vt);for(const[cr,pn]of B){let mn=pn;c(pn)&&(mn=Mc(pn)),Ce.push(C+cr+"="+encodeURIComponent(mn))}}catch(cr){throw Ce.push(C+"type="+encodeURIComponent("_badmap")),cr}}catch{m&&m(Vt)}}if(he){B=Ce.join("&");break e}}B=void 0}return a=a.i.splice(0,f),h.G=a,B}function Md(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;se||_(),ee||(se(),ee=!0),w.add(h,a),a.A=0}}function Yc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=ii(l(a.Da,a),Bd(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Fd(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=ii(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Xe(10),$o(this),Fd(this))};function Xc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Fd(a){a.g=new ln(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=St(a.na);ge(h,"RID","rpc"),ge(h,"SID",a.M),ge(h,"AID",a.K),ge(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&ge(h,"TO",a.ia),ge(h,"TYPE","xmlhttp"),_i(a,h),a.u&&a.o&&Qc(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=Uo(St(h)),f.u=null,f.R=!0,dd(f,a)}n.Va=function(){this.C!=null&&(this.C=null,$o(this),Yc(this),Xe(19))};function zo(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Ud(a,h){var f=null;if(a.g==h){zo(a),Xc(a),a.g=null;var m=2}else if(Gc(a.h,h))f=h.G,yd(a.h,h),m=1;else return;if(a.I!=0){if(h.o)if(m==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var P=a.D;m=Lo(),Ye(m,new ad(m,f)),jo(a)}else Md(a);else if(P=h.m,P==3||P==0&&h.X>0||!(m==1&&YI(a,h)||m==2&&Yc(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),P){case 1:ar(a,5);break;case 4:ar(a,10);break;case 3:ar(a,6);break;default:ar(a,2)}}}function Bd(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function ar(a,h){if(a.j.info("Error code "+h),h==2){var f=l(a.bb,a),m=a.Ua;const P=!m;m=new hn(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||ui(m,"https"),Uo(m),P?GI(m.toString(),f):KI(m.toString(),f)}else Xe(2);a.I=0,a.l&&a.l.pa(h),qd(a),kd(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Xe(2)):(this.j.info("Failed to ping google.com"),Xe(1))};function qd(a){if(a.I=0,a.ja=[],a.l){const h=Id(a.h);(h.length!=0||a.i.length!=0)&&(S(a.ja,h),S(a.ja,a.i),a.h.i.length=0,E(a.i),a.i.length=0),a.l.oa()}}function $d(a,h,f){var m=f instanceof hn?St(f):new hn(f);if(m.g!="")h&&(m.g=h+"."+m.g),li(m,m.u);else{var P=o.location;m=P.protocol,h=h?h+"."+P.hostname:P.hostname,P=+P.port;const C=new hn(null);m&&ui(C,m),h&&(C.g=h),P&&li(C,P),f&&(C.h=f),m=C}return f=a.G,h=a.wa,f&&h&&ge(m,f,h),ge(m,"VER",a.ka),_i(a,m),m}function jd(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new we(new Hc({ab:f})):new we(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function zd(){}n=zd.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Go(){}Go.prototype.g=function(a,h){return new ut(a,h)};function ut(a,h){je.call(this),this.g=new Nd(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!y(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!y(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Jr(this)}p(ut,je),ut.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ut.prototype.close=function(){Jc(this.g)},ut.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=Mc(a),a=f);h.i.push(new MI(h.Ya++,a)),h.I==3&&jo(h)},ut.prototype.N=function(){this.g.l=null,delete this.j,Jc(this.g),delete this.g,ut.Z.N.call(this)};function Gd(a){Fc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(Gd,Fc);function Kd(){Uc.call(this),this.status=1}p(Kd,Uc);function Jr(a){this.g=a}p(Jr,zd),Jr.prototype.ra=function(){Ye(this.g,"a")},Jr.prototype.qa=function(a){Ye(this.g,new Gd(a))},Jr.prototype.pa=function(a){Ye(this.g,new Kd)},Jr.prototype.oa=function(){Ye(this.g,"b")},Go.prototype.createWebChannel=Go.prototype.g,ut.prototype.send=ut.prototype.o,ut.prototype.open=ut.prototype.m,ut.prototype.close=ut.prototype.close,gm=function(){return new Go},mm=function(){return Lo()},pm=sr,yu={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Mo.NO_ERROR=0,Mo.TIMEOUT=8,Mo.HTTP_ERROR=6,oa=Mo,cd.COMPLETE="complete",fm=cd,rd.EventType=ri,ri.OPEN="a",ri.CLOSE="b",ri.ERROR="c",ri.MESSAGE="d",je.prototype.listen=je.prototype.J,bi=rd,we.prototype.listenOnce=we.prototype.K,we.prototype.getLastError=we.prototype.Ha,we.prototype.getLastErrorCode=we.prototype.ya,we.prototype.getStatus=we.prototype.ca,we.prototype.getResponseJson=we.prototype.La,we.prototype.getResponseText=we.prototype.la,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Fa,dm=we}).apply(typeof Wo<"u"?Wo:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Fe.UNAUTHENTICATED=new Fe(null),Fe.GOOGLE_CREDENTIALS=new Fe("google-credentials-uid"),Fe.FIRST_PARTY=new Fe("first-party-uid"),Fe.MOCK_USER=new Fe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Us="12.15.0";function yT(n){Us=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn=new tl("@firebase/firestore");function ss(){return Fn.logLevel}function IT(n){Fn.setLogLevel(n)}function O(n,...e){if(Fn.logLevel<=te.DEBUG){const t=e.map(rl);Fn.debug(`Firestore (${Us}): ${n}`,...t)}}function Ae(n,...e){if(Fn.logLevel<=te.ERROR){const t=e.map(rl);Fn.error(`Firestore (${Us}): ${n}`,...t)}}function Ne(n,...e){if(Fn.logLevel<=te.WARN){const t=e.map(rl);Fn.warn(`Firestore (${Us}): ${n}`,...t)}}function rl(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,_m(n,r,t)}function _m(n,e,t){let r=`FIRESTORE (${Us}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ae(r),new Error(r)}function L(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||_m(e,s,r)}function wT(n,e){n||$(57014,e)}function U(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Gt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Im{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Fe.UNAUTHENTICATED)))}shutdown(){}}class TT{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class ET{constructor(e){this.t=e,this.currentUser=Fe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){L(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Be;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Be,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Be)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(L(typeof r.accessToken=="string",31837,{l:r}),new ym(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return L(e===null||typeof e=="string",2055,{h:e}),new Fe(e)}}class vT{constructor(e,t,r){this.T=e,this.P=t,this.R=r,this.type="FirstParty",this.user=Fe.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class AT{constructor(e,t,r){this.T=e,this.P=t,this.R=r}getToken(){return Promise.resolve(new vT(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable((()=>t(Fe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Iu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class RT{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,dt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){L(this.o===void 0,3512);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,O("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Iu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(L(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Iu(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class PT{getToken(){return Promise.resolve(new Iu(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bT(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=bT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function W(n,e){return n<e?-1:n>e?1:0}function wu(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return nu(s)===nu(i)?W(s,i):nu(s)?1:-1}return W(n.length,e.length)}const ST=55296,VT=57343;function nu(n){const e=n.charCodeAt(0);return e>=ST&&e<=VT}function fs(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}function wm(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt="__name__";class Ct{constructor(e,t,r){t===void 0?t=0:t>e.length&&$(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&$(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ct.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ct?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ct.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return W(e.length,t.length)}static compareSegments(e,t){const r=Ct.isNumericId(e),s=Ct.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ct.extractNumericId(e).compare(Ct.extractNumericId(t)):wu(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Dn.fromString(e.substring(4,e.length-2))}}class Y extends Ct{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Y(t)}static emptyPath(){return new Y([])}}const CT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class de extends Ct{construct(e,t,r){return new de(e,t,r)}static isValidIdentifier(e){return CT.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),de.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Dt}static keyField(){return new de([Dt])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new D(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new D(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new de(t)}static emptyPath(){return new de([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(Y.fromString(e))}static fromName(e){return new M(Y.fromString(e).popFirst(5))}static empty(){return new M(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new Y(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(n,e,t){if(!t)throw new D(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Tm(n,e,t,r){if(e===!0&&r===!0)throw new D(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function tf(n){if(!M.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function nf(n){if(M.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ho(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ja(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":$(12329,{type:typeof n})}function Z(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ja(n);throw new D(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Em(n,e){if(e<=0)throw new D(b.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(n,e){const t={typeString:n};return e&&(t.value=e),t}function Mr(n,e){if(!ho(n))throw new D(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new D(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf=-62135596800,sf=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*sf);return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<rf)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sf}_compareTo(e){return this.seconds===e.seconds?W(this.nanoseconds,e.nanoseconds):W(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Mr(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-rf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:Se("string",oe._jsonSchemaVersion),seconds:Se("number"),nanoseconds:Se("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(e){return new z(e)}static min(){return new z(new oe(0,0))}static max(){return new z(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps=-1;class ms{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function Tu(n){return n.fields.find((e=>e.kind===2))}function lr(n){return n.fields.filter((e=>e.kind!==2))}function xT(n,e){let t=W(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=DT(n.fields[r],e.fields[r]),t!==0)return t;return W(n.fields.length,e.fields.length)}ms.UNKNOWN_ID=-1;class wr{constructor(e,t){this.fieldPath=e,this.kind=t}}function DT(n,e){const t=de.comparator(n.fieldPath,e.fieldPath);return t!==0?t:W(n.kind,e.kind)}class gs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new gs(0,mt.min())}}function vm(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=z.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new mt(s,M.empty(),e)}function Am(n){return new mt(n.readTime,n.key,ps)}class mt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new mt(z.min(),M.empty(),ps)}static max(){return new mt(z.max(),M.empty(),ps)}}function il(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(n.documentKey,e.documentKey),t!==0?t:W(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Pm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==Rm)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&$(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):R.reject(t)}static resolve(e){return new R(((t,r)=>{t(e)}))}static reject(e){return new R(((t,r)=>{r(e)}))}static waitFor(e){return new R(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>r(u)))})),o=!0,i===s&&t()}))}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next((s=>s?R.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new R(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next((d=>{o[l]=d,++c,c===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,t){return new R(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht="SimpleDb";class Ya{static open(e,t,r,s){try{return new Ya(t,e.transaction(s,r))}catch(i){throw new xi(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.v=new Be,this.transaction.oncomplete=()=>{this.v.resolve()},this.transaction.onabort=()=>{t.error?this.v.reject(new xi(e,t.error)):this.v.resolve()},this.transaction.onerror=r=>{const s=ol(r.target.error);this.v.reject(new xi(e,s))}}get S(){return this.v.promise}abort(e){e&&this.v.reject(e),this.aborted||(O(ht,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}D(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new kT(t)}}class Ft{static delete(e){return O(ht,"Removing database:",e),dr(Xp().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!cm())return!1;if(Ft.F())return!0;const e=De(),t=Ft.O(e),r=0<t&&t<10,s=bm(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static M(e,t){return e.store(t)}static O(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.L=null,Ft.O(De())===12.2&&Ae("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async B(e){return this.db||(O(ht,"Opening database:",this.name),this.db=await new Promise(((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new xi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new D(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new D(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new xi(e,o))},s.onupgradeneeded=i=>{O(ht,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.U(o,s.transaction,i.oldVersion,this.version).next((()=>{O(ht,"Database upgrade to version "+this.version+" complete")}))}}))),this.k&&(this.db.onversionchange=t=>this.k(t)),this.db}q(e){this.k=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.B(e);const c=Ya.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next((l=>(c.D(),l))).catch((l=>(c.abort(l),R.reject(l)))).toPromise();return u.catch((()=>{})),await c.S,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(O(ht,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function bm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class NT{constructor(e){this.$=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.$=e}done(){this.K=!0}j(e){this.W=e}delete(){return dr(this.$.delete())}}class xi extends D{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Yn(n){return n.name==="IndexedDbTransactionError"}class kT{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(O(ht,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(O(ht,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),dr(r)}add(e){return O(ht,"ADD",this.store.name,e,e),dr(this.store.add(e))}get(e){return dr(this.store.get(e)).next((t=>(t===void 0&&(t=null),O(ht,"GET",this.store.name,e,t),t)))}delete(e){return O(ht,"DELETE",this.store.name,e),dr(this.store.delete(e))}count(){return O(ht,"COUNT",this.store.name),dr(this.store.count())}H(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new R(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(r),o=[];return this.J(i,((c,u)=>{o.push(u)})).next((()=>o))}}Y(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new R(((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}}))}Z(e,t){O(ht,"DELETE ALL",this.store.name);const r=this.options(e,t);r.X=!1;const s=this.cursor(r);return this.J(s,((i,o,c)=>c.delete()))}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.J(s,t)}te(e){const t=this.cursor({});return new R(((r,s)=>{t.onerror=i=>{const o=ol(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():r()})):r()}}))}J(e,t){const r=[];return new R(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new NT(c),l=t(c.primaryKey,c.value,u);if(l instanceof R){const d=l.catch((p=>(u.done(),R.reject(p))));r.push(d)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>R.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.X?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function dr(n){return new R(((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=ol(r.target.error);t(s)}}))}let of=!1;function ol(n){const e=Ft.O(De());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return of||(of=!0,setTimeout((()=>{throw r}),0)),r}}return n}const Di="IndexBackfiller";class OT{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){O(Di,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();O(Di,`Documents written: ${t}`)}catch(t){Yn(t)?O(Di,"Ignoring IndexedDB error during index backfill: ",t):await Jn(t)}await this.re(6e4)}))}}class LT{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const r=new Set;let s=t,i=!0;return R.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return O(Di,`Processing collection: ${o}`),this._e(e,o,s).next((c=>{s-=c,r.add(o)}));i=!1})))).next((()=>t-s))}_e(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this.oe(s,i))).next((c=>(O(Di,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}oe(e,t){let r=e;return t.changes.forEach(((s,i)=>{const o=Am(i);il(o,r)>0&&(r=o)})),new mt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}rt.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=-1;function fo(n){return n==null}function _s(n){return n===0&&1/n==-1/0}function Sm(n){return typeof n=="number"&&Number.isInteger(n)&&!_s(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function MT(n){return typeof n=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="";function We(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=af(e)),e=FT(n.get(t),e);return af(e)}function FT(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Ea:t+="";break;default:t+=i}}return t}function af(n){return n+Ea+""}function Nt(n){const e=n.length;if(L(e>=2,64408,{path:n}),e===2)return L(n.charAt(0)===Ea&&n.charAt(1)==="",56145,{path:n}),Y.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(Ea,i);switch((o<0||o>t)&&$(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:$(61167,{path:n})}i=o+2}return new Y(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr="remoteDocuments",po="owner",Yr="owner",Wi="mutationQueues",UT="userId",wt="mutations",cf="batchId",_r="userMutationsIndex",uf=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n,e){return[n,We(e)]}function Vm(n,e,t){return[n,We(e),t]}const BT={},ys="documentMutations",va="remoteDocumentsV14",qT=["prefixPath","collectionGroup","readTime","documentId"],ca="documentKeyIndex",$T=["prefixPath","collectionGroup","documentId"],Cm="collectionGroupIndex",jT=["collectionGroup","readTime","prefixPath","documentId"],Hi="remoteDocumentGlobal",Eu="remoteDocumentGlobalKey",Is="targets",xm="queryTargetsIndex",zT=["canonicalId","targetId"],ws="targetDocuments",GT=["targetId","path"],al="documentTargetsIndex",KT=["path","targetId"],Aa="targetGlobalKey",Tr="targetGlobal",Qi="collectionParents",WT=["collectionId","parent"],Ts="clientMetadata",HT="clientId",Xa="bundles",QT="bundleId",Za="namedQueries",JT="name",cl="indexConfiguration",YT="indexId",vu="collectionGroupIndex",XT="collectionGroup",Ni="indexState",ZT=["indexId","uid"],Dm="sequenceNumberIndex",eE=["uid","sequenceNumber"],ki="indexEntries",tE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Nm="documentKeyIndex",nE=["indexId","uid","orderedDocumentKey"],ec="documentOverlays",rE=["userId","collectionPath","documentId"],Au="collectionPathOverlayIndex",sE=["userId","collectionPath","largestBatchId"],km="collectionGroupOverlayIndex",iE=["userId","collectionGroup","largestBatchId"],ul="globals",oE="name",Om=[Wi,wt,ys,hr,Is,po,Tr,ws,Ts,Hi,Qi,Xa,Za],aE=[...Om,ec],Lm=[Wi,wt,ys,va,Is,po,Tr,ws,Ts,Hi,Qi,Xa,Za,ec],Mm=Lm,ll=[...Mm,cl,Ni,ki],cE=ll,Fm=[...ll,ul],uE=Fm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru extends Pm{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Oe(n,e){const t=U(n);return Ft.M(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t){this.comparator=e,this.root=t||qe.EMPTY}insert(e,t){return new fe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,qe.BLACK,null,null))}remove(e){return new fe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ho(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ho(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ho(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ho(this.root,e,this.comparator,!0)}}class Ho{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class qe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??qe.RED,this.left=s??qe.EMPTY,this.right=i??qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new qe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw $(43730,{key:this.key,value:this.value});if(this.right.isRed())throw $(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw $(27949);return e+(this.isRed()?0:1)}}qe.EMPTY=null,qe.RED=!0,qe.BLACK=!1;qe.EMPTY=new class{constructor(){this.size=0}get key(){throw $(57766)}get value(){throw $(16141)}get color(){throw $(16727)}get left(){throw $(29726)}get right(){throw $(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.comparator=e,this.data=new fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new lf(this.data.getIterator())}getIteratorFrom(e){return new lf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ce(this.comparator);return t.data=e,t}}class lf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Xr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.fields=e,e.sort(de.comparator)}static empty(){return new st([])}unionWith(e){let t=new ce(de.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new st(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return fs(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Xn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function hl(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Um(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Bm("Invalid base64 string: "+i):i}})(e);return new me(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new me(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return W(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}me.EMPTY_BYTE_STRING=new me("");const hE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function en(n){if(L(!!n,39018),typeof n=="string"){let e=0;const t=hE.exec(n);if(L(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:pe(n.seconds),nanos:pe(n.nanos)}}function pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function tn(n){return typeof n=="string"?me.fromBase64String(n):me.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm="server_timestamp",$m="__type__",jm="__previous_value__",zm="__local_write_time__";function mo(n){return(n?.mapValue?.fields||{})[$m]?.stringValue===qm}function go(n){const e=n.mapValue.fields[jm];return mo(e)?go(e):e}function Es(n){const e=en(n.mapValue.fields[zm].timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(e,t,r,s,i,o,c,u,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=p}}const Ji="(default)";class Un{constructor(e,t){this.projectId=e,this.database=t||Ji}static empty(){return new Un("","")}get isDefaultDatabase(){return this.database===Ji}isEqual(e){return e instanceof Un&&e.projectId===this.projectId&&e.database===this.database}}function fE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Un(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl="__type__",Gm="__max__",Vn={mapValue:{fields:{__type__:{stringValue:Gm}}}},fl="__vector__",Rr="value",Ut={nullValue:"NULL_VALUE"},at={booleanValue:!0},Ue={booleanValue:!1};function Ve(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?mo(n)?4:Km(n)?9007199254740991:br(n)?10:11:$(28295,{value:n})}function yt(n,e,t){if(n===e)return!0;const r=Ve(n);if(r!==Ve(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Es(n).isEqual(Es(e));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const c=en(i.timestampValue),u=en(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,o){return tn(i.bytesValue).isEqual(tn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,o){return pe(i.geoPointValue.latitude)===pe(o.geoPointValue.latitude)&&pe(i.geoPointValue.longitude)===pe(o.geoPointValue.longitude)})(n,e);case 2:return(function(i,o,c){if("integerValue"in i&&"integerValue"in o)return pe(i.integerValue)===pe(o.integerValue);let u,l;if("doubleValue"in i&&"doubleValue"in o)u=pe(i.doubleValue),l=pe(o.doubleValue);else{if(!c?.Ee)return!1;u=pe(i.integerValue??i.doubleValue),l=pe(o.integerValue??o.doubleValue)}return u===l?!!c?.he||_s(u)===_s(l):!!(c===void 0||c.Te)&&isNaN(u)&&isNaN(l)})(n,e,t);case 9:return fs(n.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>yt(s,i,t)));case 10:case 11:return(function(i,o,c){const u=i.mapValue.fields||{},l=o.mapValue.fields||{};if(Ra(u)!==Ra(l))return!1;for(const d in u)if(u.hasOwnProperty(d)&&(l[d]===void 0||!yt(u[d],l[d],c)))return!1;return!0})(n,e,t);default:return $(52216,{left:n})}}function Yi(n,e){return(n.values||[]).find((t=>yt(t,e)))!==void 0}function Qe(n,e){if(n===e)return 0;const t=Ve(n),r=Ve(e);if(t!==r)return W(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=pe(i.integerValue||i.doubleValue),u=pe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return hf(n.timestampValue,e.timestampValue);case 4:return hf(Es(n),Es(e));case 5:return wu(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=tn(i),u=tn(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=W(c[l],u[l]);if(d!==0)return d}return W(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=W(pe(i.latitude),pe(o.latitude));return c!==0?c:W(pe(i.longitude),pe(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return df(n.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},u=o.fields||{},l=c[Rr]?.arrayValue,d=u[Rr]?.arrayValue,p=W(l?.values?.length||0,d?.values?.length||0);return p!==0?p:df(l,d)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Vn.mapValue&&o===Vn.mapValue)return 0;if(i===Vn.mapValue)return 1;if(o===Vn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const g=wu(u[p],d[p]);if(g!==0)return g;const E=Qe(c[u[p]],l[d[p]]);if(E!==0)return E}return W(u.length,d.length)})(n.mapValue,e.mapValue);default:throw $(23264,{Pe:t})}}function hf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return W(n,e);const t=en(n),r=en(e),s=W(t.seconds,r.seconds);return s!==0?s:W(t.nanos,r.nanos)}function df(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Qe(t[s],r[s]);if(i!==void 0&&i!==0)return i}return W(t.length,r.length)}function vs(n){return Pu(n)}function Pu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=en(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return tn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return M.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Pu(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Pu(t.fields[o])}`;return s+"}"})(n.mapValue):$(61005,{value:n})}function ua(n){switch(Ve(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=go(n);return e?16+ua(e):16;case 5:return 2*n.stringValue.length;case 6:return tn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+ua(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Xn(r.fields,((i,o)=>{s+=i.length+ua(o)})),s})(n.mapValue);default:throw $(13486,{value:n})}}function Pr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function kt(n){return!!n&&"integerValue"in n}function yr(n){return!!n&&"doubleValue"in n}function Bn(n){return kt(n)||yr(n)}function qn(n){return!!n&&"arrayValue"in n}function ft(n){return!!n&&"nullValue"in n}function ct(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Er(n){return!!n&&"mapValue"in n}function br(n){return(n?.mapValue?.fields||{})[dl]?.stringValue===fl}function bu(n){return(n?.mapValue?.fields||{})[Rr]?.arrayValue}function Oi(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Xn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Oi(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Oi(n.arrayValue.values[t]);return e}return{...n}}function Km(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Gm}const Wm={mapValue:{fields:{[dl]:{stringValue:fl},[Rr]:{arrayValue:{}}}}};function pE(n){return"nullValue"in n?Ut:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Pr(Un.empty(),M.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?br(n)?Wm:{mapValue:{}}:$(35942,{value:n})}function mE(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Pr(Un.empty(),M.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Wm:"mapValue"in n?br(n)?{mapValue:{}}:Vn:$(61959,{value:n})}function ff(n,e){const t=Qe(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function pf(n,e){const t=Qe(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Er(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Oi(t)}setAll(e){let t=de.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Oi(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Er(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Er(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Xn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new xe(Oi(this.value))}}function Hm(n){const e=[];return Xn(n.fields,((t,r)=>{const s=new de([t]);if(Er(r)){const i=Hm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new st(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_s(e)?"-0":e}}function pl(n){return{integerValue:""+n}}function Bs(n,e,t){return Number.isInteger(e)&&t?.preferIntegers||Sm(e)?pl(e):tc(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(){this._=void 0}}function gE(n,e,t){return n instanceof As?(function(s,i){const o={fields:{[$m]:{stringValue:qm},[zm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&mo(i)&&(i=go(i)),i&&(o.fields[jm]=i),{mapValue:o}})(t,e):n instanceof Sr?Jm(n,e):n instanceof Vr?Ym(n,e):n instanceof Cr?(function(s,i){const o=Qm(s,i),c=Pa(o)+Pa(s.Re);return kt(o)&&kt(s.Re)?pl(c):tc(s.serializer,c)})(n,e):n instanceof Rs?(function(s,i){return mf(s,i,Math.min)})(n,e):n instanceof Ps?(function(s,i){return mf(s,i,Math.max)})(n,e):void 0}function _E(n,e,t){return n instanceof Sr?Jm(n,e):n instanceof Vr?Ym(n,e):t}function Qm(n,e){return n instanceof Cr?Bn(e)?e:{integerValue:0}:null}class As extends nc{}class Sr extends nc{constructor(e){super(),this.elements=e}}function Jm(n,e){const t=Xm(e);for(const r of n.elements)t.some((s=>yt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Vr extends nc{constructor(e){super(),this.elements=e}}function Ym(n,e){let t=Xm(e);for(const r of n.elements)t=t.filter((s=>!yt(s,r)));return{arrayValue:{values:t}}}class ml extends nc{constructor(e,t){super(),this.serializer=e,this.Re=t}}class Cr extends ml{}class Rs extends ml{}class Ps extends ml{}function mf(n,e,t){if(!Bn(e))return n.Re;const r=t(Pa(e),Pa(n.Re));return kt(e)&&kt(n.Re)?pl(r):tc(n.serializer,r)}function Pa(n){return pe(n.integerValue||n.doubleValue)}function Xm(n){return qn(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t){this.field=e,this.transform=t}}function yE(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Sr&&s instanceof Sr||r instanceof Vr&&s instanceof Vr?fs(r.elements,s.elements,yt):r instanceof Cr&&s instanceof Cr||r instanceof Rs&&s instanceof Rs||r instanceof Ps&&s instanceof Ps?yt(r.Re,s.Re):r instanceof As&&s instanceof As})(n.transform,e.transform)}class IE{constructor(e,t){this.version=e,this.transformResults=t}}class ye{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ye}static exists(e){return new ye(void 0,e)}static updateTime(e){return new ye(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function la(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class rc{}function Zm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new $s(n.key,ye.none()):new qs(n.key,n.data,ye.none());{const t=n.data,r=xe.empty();let s=new ce(de.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new on(n.key,r,new st(s.toArray()),ye.none())}}function wE(n,e,t){n instanceof qs?(function(s,i,o){const c=s.value.clone(),u=_f(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof on?(function(s,i,o){if(!la(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=_f(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(eg(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Li(n,e,t,r){return n instanceof qs?(function(i,o,c,u){if(!la(i.precondition,o))return c;const l=i.value.clone(),d=yf(i.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof on?(function(i,o,c,u){if(!la(i.precondition,o))return c;const l=yf(i.fieldTransforms,u,o),d=o.data;return d.setAll(eg(i)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return la(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function TE(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Qm(r.transform,s||null);i!=null&&(t===null&&(t=xe.empty()),t.set(r.field,i))}return t||null}function gf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&fs(r,s,((i,o)=>yE(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class qs extends rc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class on extends rc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function eg(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function _f(n,e,t){const r=new Map;L(n.length===t.length,32656,{Ie:t.length,Ae:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,_E(o,c,t[s]))}return r}function yf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,gE(i,o,e))}return r}class $s extends rc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class gl extends rc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,t){this.position=e,this.inclusive=t}}function If(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=M.comparator(M.fromName(o.referenceValue),t.key):r=Qe(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function wf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!yt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{}class ne extends ng{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new EE(e,t,r):t==="array-contains"?new RE(e,r):t==="in"?new cg(e,r):t==="not-in"?new PE(e,r):t==="array-contains-any"?new bE(e,r):new ne(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new vE(e,r):new AE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Qe(t,this.value)):t!==null&&Ve(this.value)===Ve(t)&&this.matchesComparison(Qe(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return $(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ue extends ng{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new ue(e,t)}matches(e){return bs(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function bs(n){return n.op==="and"}function Su(n){return n.op==="or"}function _l(n){return rg(n)&&bs(n)}function rg(n){for(const e of n.filters)if(e instanceof ue)return!1;return!0}function Vu(n){if(n instanceof ne)return n.field.canonicalString()+n.op.toString()+vs(n.value);if(_l(n))return n.filters.map((e=>Vu(e))).join(",");{const e=n.filters.map((t=>Vu(t))).join(",");return`${n.op}(${e})`}}function sg(n,e){return n instanceof ne?(function(r,s){return s instanceof ne&&r.op===s.op&&r.field.isEqual(s.field)&&yt(r.value,s.value)})(n,e):n instanceof ue?(function(r,s){return s instanceof ue&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&sg(o,s.filters[c])),!0):!1})(n,e):void $(19439)}function ig(n,e){const t=n.filters.concat(e);return ue.create(t,n.op)}function og(n){return n instanceof ne?(function(t){return`${t.field.canonicalString()} ${t.op} ${vs(t.value)}`})(n):n instanceof ue?(function(t){return t.op.toString()+" {"+t.getFilters().map(og).join(" ,")+"}"})(n):"Filter"}class EE extends ne{constructor(e,t,r){super(e,t,r),this.key=M.fromName(r.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class vE extends ne{constructor(e,t){super(e,"in",t),this.keys=ag("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class AE extends ne{constructor(e,t){super(e,"not-in",t),this.keys=ag("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function ag(n,e){return(e.arrayValue?.values||[]).map((t=>M.fromName(t.referenceValue)))}class RE extends ne{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return qn(t)&&Yi(t.arrayValue,this.value)}}class cg extends ne{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Yi(this.value.arrayValue,t)}}class PE extends ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(Yi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Yi(this.value.arrayValue,t)}}class bE extends ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!qn(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Yi(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e,t="asc"){this.field=e,this.dir=t}}function SE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new _e(e,0,z.min(),z.min(),z.min(),xe.empty(),0)}static newFoundDocument(e,t,r,s){return new _e(e,1,t,z.min(),r,s,0)}static newNoDocument(e,t){return new _e(e,2,t,z.min(),z.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new _e(e,3,t,z.min(),z.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof _e&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new _e(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.de=null}}function Cu(n,e=null,t=[],r=[],s=null,i=null,o=null){return new VE(n,e,t,r,s,i,o)}function ba(n){const e=U(n);if(e.de===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Vu(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),fo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>vs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>vs(r))).join(",")),e.de=t}return e.de}function yl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!SE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!sg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!wf(n.startAt,e.startAt)&&wf(n.endAt,e.endAt)}function Wt(n){return!!n.isCorePipeline}function Il(n){return!!n.path&&M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Sa(n,e){return n.filters.filter((t=>t instanceof ne&&t.field.isEqual(e)))}function Tf(n,e,t){let r=Ut,s=!0;for(const i of Sa(n,e)){let o=Ut,c=!0;switch(i.op){case"<":case"<=":o=pE(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Ut}ff({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];ff({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Ef(n,e,t){let r=Vn,s=!0;for(const i of Sa(n,e)){let o=Vn,c=!0;switch(i.op){case">=":case">":o=mE(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Vn}pf({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];pf({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function ug(n,e,t,r,s,i,o,c){return new an(n,e,t,r,s,i,o,c)}function js(n){return new an(n)}function vf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function CE(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function wl(n){return n.collectionGroup!==null}function as(n){const e=U(n);if(e.fe===null){e.fe=[];const t=new Set;for(const i of e.explicitOrderBy)e.fe.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ce(de.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((l=>{l.isInequality()&&(c=c.add(l.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.fe.push(new Xi(i,r))})),t.has(de.keyField().canonicalString())||e.fe.push(new Xi(de.keyField(),r))}return e.fe}function He(n){const e=U(n);return e.me||(e.me=hg(e,as(n))),e.me}function lg(n){const e=U(n);return e.pe||(e.pe=hg(e,n.explicitOrderBy)),e.pe}function hg(n,e){if(n.limitType==="F")return Cu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Xi(s.field,i)}));const t=n.endAt?new $n(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new $n(n.startAt.position,n.startAt.inclusive):null;return Cu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function xu(n,e){const t=n.filters.concat([e]);return new an(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function xE(n,e){const t=n.explicitOrderBy.concat([e]);return new an(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Va(n,e,t){return new an(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function DE(n,e){return new an(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function NE(n,e){return new an(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function dg(n,e){return yl(He(n),He(e))&&n.limitType===e.limitType}function Mi(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>og(s))).join(", ")}]`),fo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>vs(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>vs(s))).join(",")),`Target(${r})`})(He(n))}; limitType=${n.limitType})`}function sc(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):M.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of as(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const l=If(o,c,u);return o.inclusive?l<=0:l<0})(r.startAt,as(r),s)||r.endAt&&!(function(o,c,u){const l=If(o,c,u);return o.inclusive?l>=0:l>0})(r.endAt,as(r),s))})(n,e)}function Tl(n){return(e,t)=>{let r=!1;for(const s of as(n)){const i=kE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function kE(n,e,t){const r=n.field.isKeyField()?M.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?Qe(u,l):$(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return $(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pe,re;function fg(n){switch(n){case b.OK:return $(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return $(15467,{code:n})}}function pg(n){if(n===void 0)return Ae("GRPC error has no .code"),b.UNKNOWN;switch(n){case Pe.OK:return b.OK;case Pe.CANCELLED:return b.CANCELLED;case Pe.UNKNOWN:return b.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return b.INTERNAL;case Pe.UNAVAILABLE:return b.UNAVAILABLE;case Pe.UNAUTHENTICATED:return b.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case Pe.NOT_FOUND:return b.NOT_FOUND;case Pe.ALREADY_EXISTS:return b.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return b.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case Pe.ABORTED:return b.ABORTED;case Pe.OUT_OF_RANGE:return b.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return b.UNIMPLEMENTED;case Pe.DATA_LOSS:return b.DATA_LOSS;default:return $(39323,{code:n})}}(re=Pe||(Pe={}))[re.OK=0]="OK",re[re.CANCELLED=1]="CANCELLED",re[re.UNKNOWN=2]="UNKNOWN",re[re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",re[re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",re[re.NOT_FOUND=5]="NOT_FOUND",re[re.ALREADY_EXISTS=6]="ALREADY_EXISTS",re[re.PERMISSION_DENIED=7]="PERMISSION_DENIED",re[re.UNAUTHENTICATED=16]="UNAUTHENTICATED",re[re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",re[re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",re[re.ABORTED=10]="ABORTED",re[re.OUT_OF_RANGE=11]="OUT_OF_RANGE",re[re.UNIMPLEMENTED=12]="UNIMPLEMENTED",re[re.INTERNAL=13]="INTERNAL",re[re.UNAVAILABLE=14]="UNAVAILABLE",re[re.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Xn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Um(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LE=new fe(M.comparator);function be(){return LE}const mg=new fe(M.comparator);function fr(...n){let e=mg;for(const t of n)e=e.insert(t.key,t);return e}function gg(n){let e=mg;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function _t(){return Fi()}function _g(){return Fi()}function Fi(){return new cn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const ME=new fe(M.comparator),FE=new ce(M.comparator);function Q(...n){let e=FE;for(const t of n)e=e.add(t);return e}const UE=new ce(W);function El(){return UE}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Du=null;function BE(n){if(Du)throw new Error("a TestingHooksSpi instance is already set");Du=n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yg(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qE=new Dn([4294967295,4294967295],0);function Af(n){const e=yg().encode(n),t=new hm;return t.update(e),new Uint8Array(t.digest())}function Rf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Dn([t,r],0),new Dn([s,i],0)]}class vl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Si(`Invalid padding: ${t}`);if(r<0)throw new Si(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Si(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Si(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=Dn.fromNumber(this.ge)}we(e,t,r){let s=e.add(t.multiply(Dn.fromNumber(r)));return s.compare(qE)===1&&(s=new Dn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Af(e),[r,s]=Rf(t);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);if(!this.be(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new vl(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Af(e),[r,s]=Rf(t);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);this.ve(o)}}ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Si extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,t,r,s,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,_o.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new zs(z.min(),s,new fe(W),be(),be(),Q())}}class _o{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new _o(r,t,Q(),Q(),Q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Ig{constructor(e,t){this.targetId=e,this.xe=t}}class wg{constructor(e,t,r=me.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Pf{constructor(e){this.targetId=e,this.Ce=0,this.Fe=bf(),this.Oe=me.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=Q(),t=Q(),r=Q();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:$(38017,{changeType:i})}})),new _o(this.Oe,this.Me,e,t,r)}qe(){this.Ne=!1,this.Fe=bf()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,L(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const yi="WatchChangeAggregator";class $E{constructor(e){this.ze=e,this.je=new Map,this.He=be(),this.Je=Qo(),this.Ye=be(),this.Ze=Qo(),this.Xe=new fe(W)}et(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(const t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,(t=>{const r=this.je.get(t);if(r)switch(e.state){case 0:this.it(t)&&r.Ue(e.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(e.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(t);break;case 3:this.it(t)&&(r.Ge(),r.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),r.Ue(e.resumeToken));break;default:$(56790,{state:e.state})}else O(yi,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach(((r,s)=>{this.it(s)&&t(s)}))}_t(e){return Wt(e)?e.getPipelineSourceType()==="documents"&&e.getPipelineDocuments()?.length===1:Il(e)}ot(e){const t=e.targetId,r=e.xe.count,s=this.ut(t);if(s){const i=s.target;if(this._t(i))if(r===0){const o=new M(Wt(i)?Y.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(t,o,_e.newNoDocument(o,z.min()))}else L(r===1,20013,"Single document existence filter with count: "+r);else{const o=this.ct(t);if(o!==r){const c=this.lt(e),u=c?this.Et(c,e,o):1;if(u!==0){this.st(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(t,l)}Du?.u((function(d,p,g,E,S){const N={localCacheCount:d,existenceFilterCount:p.count,databaseId:g.database,projectId:g.projectId},k=p.unchangedNames;return k&&(N.bloomFilter={applied:S===0,hashCount:k?.hashCount??0,bitmapLength:k?.bits?.bitmap?.length??0,padding:k?.bits?.padding??0,mightContain:q=>E?.mightContain(q)??!1}),N})(o,e.xe,this.ze.Tt(),c,u))}}}}lt(e){const t=e.xe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=tn(r).toUint8Array()}catch(u){if(u instanceof Bm)return Ne("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new vl(o,s,i)}catch(u){return Ne(u instanceof Si?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}Et(e,t,r){return t.xe.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.ze.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.ze.Tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.nt(t,i,null),s++)})),s}Rt(e){const t=new Map;this.je.forEach(((i,o)=>{const c=this.ut(o);if(c){if(i.current&&this._t(c.target)){const u=Wt(c.target)?Y.fromString(c.target.getPipelineDocuments()[0]):c.target.path,l=new M(u);this.It(l).has(o)||this.At(o,l)||this.nt(o,l,_e.newNoDocument(l,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=Q();this.Ze.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const l=this.ut(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.He.forEach(((i,o)=>o.setReadTime(e))),this.Ye.forEach(((i,o)=>o.setReadTime(e)));const s=new zs(e,t,this.Xe,this.He,this.Ye,r);return this.He=be(),this.Je=Qo(),this.Ye=be(),this.Ze=Qo(),this.Xe=new fe(W),s}tt(e,t){const r=this.je.get(e);if(!r||!this.it(e))return void O(yi,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.At(e,t.key)?2:0;r.$e(t.key,s),Wt(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,r){const s=this.je.get(e);s&&this.it(e)?(this.At(e,t)?s.$e(t,1):s.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),r&&(Wt(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t,r):this.He=this.He.insert(t,r))):O(yi,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){const t=this.je.get(e);if(!t)return 0;const r=t.ke();return this.ze.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}We(e){let t=this.je.get(e);t||(O(yi,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Pf(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new ce(W),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ce(W),this.Je=this.Je.insert(e,t)),t}it(e){const t=this.ut(e)!==null;return t||O(yi,"Detected inactive target",e),t}ut(e){const t=this.je.get(e);return t===void 0||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new Pf(e)),this.ze.getRemoteKeysForTarget(e).forEach((t=>{this.nt(e,t,null)}))}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function Qo(){return new fe(M.comparator)}function bf(){return new fe(M.comparator)}const jE={asc:"ASCENDING",desc:"DESCENDING"},zE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},GE={and:"AND",or:"OR"};class KE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Nu(n,e){return n.useProto3Json||fo(e)?e:{value:e}}function Ss(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Al(n){const e=en(n);return new oe(e.seconds,e.nanos)}function Tg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function da(n,e){return Ss(n,e.toTimestamp())}function Re(n){return L(!!n,49232),z.fromTimestamp(Al(n))}function Rl(n,e){return ku(n,e).canonicalString()}function ku(n,e){const t=(function(s){return new Y(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Eg(n){const e=Y.fromString(n);return L(Dg(e),10190,{key:e.toString()}),e}function Vs(n,e){return Rl(n.databaseId,e.path)}function Bt(n,e){const t=Eg(e);if(t.get(1)!==n.databaseId.projectId)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new M(Rg(t))}function vg(n,e){return Rl(n.databaseId,e)}function Ag(n){const e=Eg(n);return e.length===4?Y.emptyPath():Rg(e)}function Ou(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Rg(n){return L(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Sf(n,e,t){return{name:Vs(n,e),fields:t.value.mapValue.fields}}function ic(n,e,t){const r=Bt(n,e.name),s=Re(e.updateTime),i=e.createTime?Re(e.createTime):z.min(),o=new xe({mapValue:{fields:e.fields}}),c=_e.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function WE(n,e){return"found"in e?(function(r,s){L(!!s.found,43571),s.found.name,s.found.updateTime;const i=Bt(r,s.found.name),o=Re(s.found.updateTime),c=s.found.createTime?Re(s.found.createTime):z.min(),u=new xe({mapValue:{fields:s.found.fields}});return _e.newFoundDocument(i,o,c,u)})(n,e):"missing"in e?(function(r,s){L(!!s.missing,3894),L(!!s.readTime,22933);const i=Bt(r,s.missing),o=Re(s.readTime);return _e.newNoDocument(i,o)})(n,e):$(7234,{result:e})}function HE(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:$(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,d){return l.useProto3Json?(L(d===void 0||typeof d=="string",58123),me.fromBase64String(d||"")):(L(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),me.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(l){const d=l.code===void 0?b.UNKNOWN:pg(l.code);return new D(d,l.message||"")})(o);t=new wg(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Bt(n,r.document.name),i=Re(r.document.updateTime),o=r.document.createTime?Re(r.document.createTime):z.min(),c=new xe({mapValue:{fields:r.document.fields}}),u=_e.newFoundDocument(s,i,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new ha(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Bt(n,r.document),i=r.readTime?Re(r.readTime):z.min(),o=_e.newNoDocument(s,i),c=r.removedTargetIds||[];t=new ha([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Bt(n,r.document),i=r.removedTargetIds||[];t=new ha([],i,s,null)}else{if(!("filter"in e))return $(11601,{ft:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new OE(s,i),c=r.targetId;t=new Ig(c,o)}}return t}function Zi(n,e){let t;if(e instanceof qs)t={update:Sf(n,e.key,e.value)};else if(e instanceof $s)t={delete:Vs(n,e.key)};else if(e instanceof on)t={update:Sf(n,e.key,e.data),updateMask:ev(e.fieldMask)};else{if(!(e instanceof gl))return $(16599,{gt:e.type});t={verify:Vs(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof As)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Sr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Vr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Cr)return{fieldPath:o.field.canonicalString(),increment:c.Re};if(c instanceof Rs)return{fieldPath:o.field.canonicalString(),minimum:c.Re};if(c instanceof Ps)return{fieldPath:o.field.canonicalString(),maximum:c.Re};throw $(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:da(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:$(27497)})(n,e.precondition)),t}function Lu(n,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?ye.updateTime(Re(i.updateTime)):i.exists!==void 0?ye.exists(i.exists):ye.none()})(e.currentDocument):ye.none(),r=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)L(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new As;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new Sr(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new Vr(d)}else"increment"in c?u=new Cr(o,c.increment):"minimum"in c?u=new Rs(o,c.minimum):"maximum"in c?u=new Ps(o,c.maximum):$(16584,{proto:c});const l=de.fromServerFormat(c.fieldPath);return new Fr(l,u)})(n,s))):[];if(e.update){e.update.name;const s=Bt(n,e.update.name),i=new xe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const l=u.fieldPaths||[];return new st(l.map((d=>de.fromServerFormat(d))))})(e.updateMask);return new on(s,i,o,t,r)}return new qs(s,i,t,r)}if(e.delete){const s=Bt(n,e.delete);return new $s(s,t)}if(e.verify){const s=Bt(n,e.verify);return new gl(s,t)}return $(1463,{proto:e})}function QE(n,e){return n&&n.length>0?(L(e!==void 0,14353),n.map((t=>(function(s,i){let o=s.updateTime?Re(s.updateTime):Re(i);return o.isEqual(z.min())&&(o=Re(i)),new IE(o,s.transformResults||[])})(t,e)))):[]}function Pg(n,e){return{documents:[vg(n,e.path)]}}function oc(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=vg(n,s);const i=(function(l){if(l.length!==0)return xg(ue.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(l){if(l.length!==0)return l.map((d=>(function(g){return{field:Tn(g.field),direction:YE(g.dir)}})(d)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Nu(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{yt:t,parent:s}}function bg(n,e,t,r){const{yt:s,parent:i}=oc(n,e),o={},c=[];let u=0;return t.forEach((l=>{const d=r?l.alias:"aggregate_"+u++;o[d]=l.alias,l.aggregateType==="count"?c.push({alias:d,count:{}}):l.aggregateType==="avg"?c.push({alias:d,avg:{field:Tn(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:d,sum:{field:Tn(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},wt:o,parent:i}}function Sg(n){let e=Ag(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){L(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(p){const g=Cg(p);return g instanceof ue&&_l(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((g=>(function(S){return new Xi(is(S.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(S.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let g;return g=typeof p=="object"?p.value:p,fo(g)?null:g})(t.limit));let u=null;t.startAt&&(u=(function(p){const g=!!p.before,E=p.values||[];return new $n(E,g)})(t.startAt));let l=null;return t.endAt&&(l=(function(p){const g=!p.before,E=p.values||[];return new $n(E,g)})(t.endAt)),ug(e,s,o,i,c,"F",u,l)}function JE(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return $(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vg(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function Cg(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=is(t.unaryFilter.field);return ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=is(t.unaryFilter.field);return ne.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=is(t.unaryFilter.field);return ne.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=is(t.unaryFilter.field);return ne.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return $(61313);default:return $(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ne.create(is(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return $(58110);default:return $(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ue.create(t.compositeFilter.filters.map((r=>Cg(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return $(1026)}})(t.compositeFilter.op))})(n):$(30097,{filter:n})}function YE(n){return jE[n]}function XE(n){return zE[n]}function ZE(n){return GE[n]}function Tn(n){return{fieldPath:n.canonicalString()}}function is(n){return de.fromServerFormat(n.fieldPath)}function xg(n){return n instanceof ne?(function(t){if(t.op==="=="){if(ct(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NAN"}};if(ft(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ct(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NOT_NAN"}};if(ft(t.value))return{unaryFilter:{field:Tn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Tn(t.field),op:XE(t.op),value:t.value}}})(n):n instanceof ue?(function(t){const r=t.getFilters().map((s=>xg(s)));return r.length===1?r[0]:{compositeFilter:{op:ZE(t.op),filters:r}}})(n):$(54877,{filter:n})}function ev(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Dg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Ng(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function eo(n,e){const t={fields:{}};return e.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)})),{mapValue:t}}function kg(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return new KE(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nt(me.fromBase64String(e))}catch(t){throw new D(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new nt(me.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:nt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Mr(e,nt._jsonSchema))return nt.fromBase64String(e.bytes)}}nt._jsonSchemaVersion="firestore/bytes/1.0",nt._jsonSchema={type:Se("string",nt._jsonSchemaVersion),bytes:Se("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new de(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function Og(){return new Br(Dt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return W(this._lat,e._lat)||W(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:vt._jsonSchemaVersion}}static fromJSON(e){if(Mr(e,vt._jsonSchema))return new vt(e.latitude,e.longitude)}}function Lg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt._jsonSchemaVersion="firestore/geoPoint/1.0",vt._jsonSchema={type:Se("string",vt._jsonSchemaVersion),latitude:Se("number"),longitude:Se("number")};class tv{bt(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf="ConnectivityMonitor";class Cf{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){O(Vf,"Network connectivity changed: AVAILABLE");for(const e of this.Ct)e(0)}xt(){O(Vf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Ct)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jo=null;function Mu(){return Jo===null?Jo=(function(){return 268435456+Math.round(2147483648*Math.random())})():Jo++,"0x"+Jo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru="RestConnection",nv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class rv{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===Ji?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(e,t,r,s,i){const o=Mu(),c=this.Ut(e,t.toUriEncodedString());O(ru,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(u,s,i);const{host:l}=new URL(c),d=Qn(l);return this.qt(e,c,u,r,d).then((p=>(O(ru,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw Ne(ru,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}$t(e,t,r,s,i,o){return this.Bt(e,t,r,s,i)}kt(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Us})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Ut(e,t){const r=nv[e];let s=`${this.Mt}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ze="WebChannelConnection",Ii=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class cs extends rv{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){if(!cs.sn){const e=mm();Ii(e,pm.STAT_EVENT,(t=>{t.stat===yu.PROXY?O(ze,"STAT_EVENT: detected buffering proxy"):t.stat===yu.NOPROXY&&O(ze,"STAT_EVENT: detected no buffering proxy")})),cs.sn=!0}}qt(e,t,r,s,i){const o=Mu();return new Promise(((c,u)=>{const l=new dm;l.setWithCredentials(!0),l.listenOnce(fm.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case oa.NO_ERROR:const p=l.getResponseJson();O(ze,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case oa.TIMEOUT:O(ze,`RPC '${e}' ${o} timed out`),u(new D(b.DEADLINE_EXCEEDED,"Request time out"));break;case oa.HTTP_ERROR:const g=l.getStatus();if(O(ze,`RPC '${e}' ${o} failed with status:`,g,"response text:",l.getResponseText()),g>0){let E=l.getResponseJson();Array.isArray(E)&&(E=E[0]);const S=E?.error;if(S&&S.status&&S.message){const N=(function(q){const G=q.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(G)>=0?G:b.UNKNOWN})(S.status);u(new D(N,S.message))}else u(new D(b.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new D(b.UNAVAILABLE,"Connection failed."));break;default:$(9055,{_n:e,streamId:o,an:l.getLastErrorCode(),un:l.getLastError()})}}finally{O(ze,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);O(ze,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",d,r,15)}))}cn(e,t,r){const s=Mu(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.kt(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");O(ze,`Creating RPC '${e}' stream ${s}: ${l}`,c);const d=o.createWebChannel(l,c);this.En(d);let p=!1,g=!1;const E=new sv({Kt:S=>{g?O(ze,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(p||(O(ze,`Opening RPC '${e}' stream ${s} transport.`),d.open(),p=!0),O(ze,`RPC '${e}' stream ${s} sending:`,S),d.send(S))},Wt:()=>d.close()});return Ii(d,bi.EventType.OPEN,(()=>{g||(O(ze,`RPC '${e}' stream ${s} transport opened.`),E.Zt())})),Ii(d,bi.EventType.CLOSE,(()=>{g||(g=!0,O(ze,`RPC '${e}' stream ${s} transport closed`),E.en(),this.hn(d))})),Ii(d,bi.EventType.ERROR,(S=>{g||(g=!0,Ne(ze,`RPC '${e}' stream ${s} transport errored. Name:`,S.name,"Message:",S.message),E.en(new D(b.UNAVAILABLE,"The operation could not be completed")))})),Ii(d,bi.EventType.MESSAGE,(S=>{if(!g){const N=S.data[0];L(!!N,16349);const k=N,q=k?.error||k[0]?.error;if(q){O(ze,`RPC '${e}' stream ${s} received error:`,q);const G=q.status;let j=(function(ee){const w=Pe[ee];if(w!==void 0)return pg(w)})(G),J=q.message;G==="NOT_FOUND"&&J.includes("database")&&J.includes("does not exist")&&J.includes(this.databaseId.database)&&Ne(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),j===void 0&&(j=b.INTERNAL,J="Unknown error status: "+G+" with message "+q.message),g=!0,E.en(new D(j,J)),d.close()}else O(ze,`RPC '${e}' stream ${s} received:`,N),E.tn(N)}})),cs.rn(),setTimeout((()=>{E.Xt()}),0),E}terminate(){this.nn.forEach((e=>e.close())),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter((t=>t===e))}kt(e,t,r){super.kt(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return gm()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(n){return new cs(n)}cs.sn=!1;class Pl{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Tn=e,this.timerId=t,this.Pn=r,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();const t=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),e()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf="PersistentStream";class Mg{constructor(e,t,r,s,i,o,c,u){this.Tn=e,this.yn=r,this.wn=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new Pl(e,t)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,e!==4?this.xn.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(Ae(t.toString()),Ae("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;const e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===t&&this.Kn(r,s)}),(r=>{e((()=>{const s=new D(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(e,t){const r=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(e){return O(xf,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget((()=>this.bn===e?t():(O(xf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ov extends Mg{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();const t=HE(this.serializer,e),r=(function(i){if(!("targetChange"in i))return z.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?Re(o.readTime):z.min()})(e);return this.listener.zn(t,r)}jn(e){const t={};t.database=Ou(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=Wt(u)?{pipelineQuery:Vg(i,u)}:Il(u)?{documents:Pg(i,u)}:{query:oc(i,u).yt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Tg(i,o.resumeToken);const l=Nu(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(z.min())>0){c.readTime=Ss(i,o.snapshotVersion.toTimestamp());const l=Nu(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c})(this.serializer,e);const r=JE(this.serializer,e);r&&(t.labels=r),this.Bn(t)}Hn(e){const t={};t.database=Ou(this.serializer),t.removeTarget=e,this.Bn(t)}}class av extends Mg{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(e,t){return this.connection.cn("Write",e,t)}Gn(e){return L(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,L(!e.writeResults||e.writeResults.length===0,55816),this.listener.Zn()}onNext(e){L(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.xn.reset();const t=QE(e.writeResults,e.commitTime),r=Re(e.commitTime);return this.listener.Xn(r,t)}er(){const e={};e.database=Ou(this.serializer),this.Bn(e)}Yn(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Zi(this.serializer,r)))};this.Bn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{}class uv extends cv{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Bt(e,ku(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(b.UNKNOWN,i.toString())}))}$t(e,t,r,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.$t(e,ku(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(b.UNKNOWN,o.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function lv(n,e,t,r){return new uv(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv="ComponentProvider",Df=new Map;function dv(n,e,t,r,s){return new dE(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Lg(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Fg=41943040;class Ge{static withCacheSize(e){return new Ge(e,Ge.DEFAULT_COLLECTION_PERCENTILE,Ge.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}Ge.DEFAULT_COLLECTION_PERCENTILE=10,Ge.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ge.DEFAULT=new Ge(Fg,Ge.DEFAULT_COLLECTION_PERCENTILE,Ge.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ge.DISABLED=new Ge(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kf="LruGarbageCollector",Ug=1048576;function Of([n,e],[t,r]){const s=W(n,t);return s===0?W(e,r):s}class fv{constructor(e){this.rr=e,this.buffer=new ce(Of),this.ir=0}sr(){return++this.ir}_r(e){const t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Of(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Bg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(e){O(kf,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Yn(t)?O(kf,"Ignoring IndexedDB error during garbage collection: ",t):await Jn(t)}await this.ur(3e5)}))}}class pv{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return R.resolve(rt.ce);const r=new fv(t);return this.cr.forEachTarget(e,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(e,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.cr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(Nf)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Nf):this.hr(e,t)))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let r,s,i,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(l=Date.now(),ss()<=te.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function qg(n,e){return new pv(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g="firestore.googleapis.com",Lf=!0;class Mf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=$g,this.ssl=Lf}else this.host=e.host,this.ssl=e.ssl??Lf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Fg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ug)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Tm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Lg(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class yo{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Mf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Mf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Im;switch(r.type){case"firstParty":return new AT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Df.get(t);r&&(O(hv,"Removing Datastore"),Df.delete(t),r.terminate())})(this),Promise.resolve()}}function jg(n,e,t,r={}){n=Z(n,yo);const s=Qn(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Ha(`https://${c}`),i.host!==$g&&i.host!==c&&Ne("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!Pt(u,o)&&(n._setSettings(u),r.mockUserToken)){let l,d;if(typeof r.mockUserToken=="string")l=r.mockUserToken,d=Fe.MOCK_USER;else{l=sm(r.mockUserToken,n._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new D(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new Fe(p)}n._authCredentials=new TT(new ym(l,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ke(this.firestore,e,this._query)}}class ae{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new At(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ae(this.firestore,e,this._key)}toJSON(){return{type:ae._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Mr(t,ae._jsonSchema))return new ae(e,r||null,new M(Y.fromString(t.referencePath)))}}ae._jsonSchemaVersion="firestore/documentReference/1.0",ae._jsonSchema={type:Se("string",ae._jsonSchemaVersion),referencePath:Se("string")};class At extends ke{constructor(e,t,r){super(e,t,js(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ae(this.firestore,null,new M(e))}withConverter(e){return new At(this.firestore,e,this._path)}}function mv(n,e,...t){if(n=ie(n),sl("collection","path",e),n instanceof yo){const r=Y.fromString(e,...t);return nf(r),new At(n,null,r)}{if(!(n instanceof ae||n instanceof At))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return nf(r),new At(n.firestore,null,r)}}function gv(n,e){if(n=Z(n,yo),sl("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ke(n,null,(function(r){return new an(Y.emptyPath(),r)})(e))}function zg(n,e,...t){if(n=ie(n),arguments.length===1&&(e=Qa.newId()),sl("doc","path",e),n instanceof yo){const r=Y.fromString(e,...t);return tf(r),new ae(n,null,new M(r))}{if(!(n instanceof ae||n instanceof At))throw new D(b.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return tf(r),new ae(n.firestore,n instanceof At?n.converter:null,new M(r))}}function _v(n,e){return n=ie(n),e=ie(e),(n instanceof ae||n instanceof At)&&(e instanceof ae||e instanceof At)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function bl(n,e){return n=ie(n),e=ie(e),n instanceof ke&&e instanceof ke&&n.firestore===e.firestore&&dg(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:et._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Mr(e,et._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new et(e.vectorValues);throw new D(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}et._jsonSchemaVersion="firestore/vectorValue/1.0",et._jsonSchema={type:Se("string",et._jsonSchemaVersion),vectorValues:Se("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv=/^__.*__$/;class Iv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new on(e,this.data,this.fieldMask,t,this.fieldTransforms):new qs(e,this.data,t,this.fieldTransforms)}}class Gg{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new on(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Kg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw $(40011,{dataSource:n})}}class ac{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ac({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ca(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Kg(this.dataSource)&&yv.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class wv{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ur(e)}createContext(e,t,r,s=!1){return new ac({dataSource:e,methodName:t,targetDoc:r,path:de.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qr(n){const e=n._freezeSettings(),t=Ur(n._databaseId);return new wv(n._databaseId,!!e.ignoreUndefinedProperties,t)}function cc(n,e,t,r,s,i={}){const o=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);Ll("Data must be an object, but it was:",o,r);const c=Qg(r,o);let u,l;if(i.merge)u=new st(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=bt(e,p,t);if(!o.contains(g))throw new D(b.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Yg(d,g)||d.push(g)}u=new st(d),l=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,l=o.fieldTransforms;return new Iv(new xe(c),u,l)}class Io extends Kt{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Io}}function Wg(n,e,t){return new ac({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Sl extends Kt{_toFieldTransform(e){return new Fr(e.path,new As)}isEqual(e){return e instanceof Sl}}class Vl extends Kt{constructor(e,t){super(e),this.Tr=t}_toFieldTransform(e){const t=Wg(this,e,!0),r=this.Tr.map((i=>$t(i,t))),s=new Sr(r);return new Fr(e.path,s)}isEqual(e){return e instanceof Vl&&Pt(this.Tr,e.Tr)}}class Cl extends Kt{constructor(e,t){super(e),this.Tr=t}_toFieldTransform(e){const t=Wg(this,e,!0),r=this.Tr.map((i=>$t(i,t))),s=new Vr(r);return new Fr(e.path,s)}isEqual(e){return e instanceof Cl&&Pt(this.Tr,e.Tr)}}class xl extends Kt{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new Cr(e.serializer,Bs(e.serializer,this.Pr));return new Fr(e.path,t)}isEqual(e){return e instanceof xl&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}class Dl extends Kt{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new Rs(e.serializer,Bs(e.serializer,this.Pr));return new Fr(e.path,t)}isEqual(e){return e instanceof Dl&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}class Nl extends Kt{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new Ps(e.serializer,Bs(e.serializer,this.Pr));return new Fr(e.path,t)}isEqual(e){return e instanceof Nl&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}function kl(n,e,t,r){const s=n.createContext(1,e,t);Ll("Data must be an object, but it was:",s,r);const i=[],o=xe.empty();Xn(r,((u,l)=>{const d=Ml(e,u,t);l=ie(l);const p=s.childContextForFieldPath(d);if(l instanceof Io)i.push(d);else{const g=$t(l,p);g!=null&&(i.push(d),o.set(d,g))}}));const c=new st(i);return new Gg(o,c,s.fieldTransforms)}function Ol(n,e,t,r,s,i){const o=n.createContext(1,e,t),c=[bt(e,r,t)],u=[s];if(i.length%2!=0)throw new D(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(bt(e,i[g])),u.push(i[g+1]);const l=[],d=xe.empty();for(let g=c.length-1;g>=0;--g)if(!Yg(l,c[g])){const E=c[g];let S=u[g];S=ie(S);const N=o.childContextForFieldPath(E);if(S instanceof Io)l.push(E);else{const k=$t(S,N);k!=null&&(l.push(E),d.set(E,k))}}const p=new st(l);return new Gg(d,p,o.fieldTransforms)}function Hg(n,e,t,r=!1){return $t(t,n.createContext(r?4:3,e))}function $t(n,e,t){if(Jg(n=ie(n)))return Ll("Unsupported field value:",e,n),Qg(n,e);if(n instanceof Kt)return(function(s,i){if(!Kg(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){const o=[];let c=0;for(const u of s){let l=$t(u,i.childContextForArray(c));l==null&&(l={nullValue:"NULL_VALUE"}),o.push(l),c++}return{arrayValue:{values:o}}})(n,e)}return(function(s,i,o){if((s=ie(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Bs(i.serializer,s,o);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=oe.fromDate(s);return{timestampValue:Ss(i.serializer,c)}}if(s instanceof oe){const c=new oe(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Ss(i.serializer,c)}}if(s instanceof vt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof nt)return{bytesValue:Tg(i.serializer,s._byteString)};if(s instanceof ae){const c=i.databaseId,u=s.firestore._databaseId;if(!u.isEqual(c))throw i.createError(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:Rl(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof et)return(function(u,l){const d=u instanceof et?u.toArray():u;return{mapValue:{fields:{[dl]:{stringValue:fl},[Rr]:{arrayValue:{values:d.map((g=>{if(typeof g!="number")throw l.createError("VectorValues must only contain numeric values.");return tc(l.serializer,g)}))}}}}}})(s,i);if(Ng(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Ja(s)}`)})(n,e,t)}function Qg(n,e){const t={};return Um(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xn(n,((r,s)=>{const i=$t(s,e.childContextForField(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Jg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof vt||n instanceof nt||n instanceof ae||n instanceof Kt||n instanceof et||Ng(n))}function Ll(n,e,t){if(!Jg(t)||!ho(t)){const r=Ja(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function bt(n,e,t){if((e=ie(e))instanceof Br)return e._internalPath;if(typeof e=="string")return Ml(n,e);throw Ca("Field path arguments must be of type string or ",n,!1,void 0,t)}const Tv=new RegExp("[~\\*/\\[\\]]");function Ml(n,e,t){if(e.search(Tv)>=0)throw Ca(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Br(...e.split("."))._internalPath}catch{throw Ca(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ca(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new D(b.INVALID_ARGUMENT,c+n+u)}function Yg(n,e){return n.some((t=>t.isEqual(e)))}function Xg(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=xe.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const o=e[s];let c;i.nestedOptions&&ho(o)?c={mapValue:{fields:new Je(i.nestedOptions).getOptionsProto(t,o)}}:o&&(c=$t(o,t)??void 0),c&&r.set(de.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(hl(r,((o,c)=>[de.fromServerFormat(c),o!==void 0?$t(o,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ev(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!ho(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vv(){return new Io("deleteField")}function Av(){return new Sl("serverTimestamp")}function Rv(...n){return new Vl("arrayUnion",n)}function Pv(...n){return new Cl("arrayRemove",n)}function bv(n){return new xl("increment",n)}function Sv(n){return new Dl("minimum",n)}function Vv(n){return new Nl("maximum",n)}function Zg(n){return new et(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n){let e;return n instanceof $r?n:(e=ho(n)?kv(n):n instanceof Array?Ov(n):e_(n,void 0),e)}function su(n){if(n instanceof $r)return n;if(n instanceof et)return to(n);if(Array.isArray(n))return to(Zg(n));throw new Error("Unsupported value: "+typeof n)}function Fl(n){return MT(n)?fa(n):F(n)}class $r{constructor(){this._protoValueType="ProtoValue"}add(e){return new x("add",[this,F(e)],"add")}asBoolean(){if(this instanceof jn)return this;if(this instanceof zr)return new n_(this);if(this instanceof jr)return new Nv(this);if(this instanceof x)return new t_(this);throw new D("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new x("subtract",[this,F(e)],"subtract")}multiply(e){return new x("multiply",[this,F(e)],"multiply")}divide(e){return new x("divide",[this,F(e)],"divide")}mod(e){return new x("mod",[this,F(e)],"mod")}equal(e){return new x("equal",[this,F(e)],"equal").asBoolean()}notEqual(e){return new x("not_equal",[this,F(e)],"notEqual").asBoolean()}lessThan(e){return new x("less_than",[this,F(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new x("less_than_or_equal",[this,F(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new x("greater_than",[this,F(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new x("greater_than_or_equal",[this,F(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map((s=>F(s)));return new x("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new x("array_contains",[this,F(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Vi(e.map(F),"arrayContainsAll"):e;return new x("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Vi(e.map(F),"arrayContainsAny"):e;return new x("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new x("array_reverse",[this])}arrayLength(){return new x("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Vi(e.map(F),"equalAny"):e;return new x("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Vi(e.map(F),"notEqualAny"):e;return new x("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new x("exists",[this],"exists").asBoolean()}charLength(){return new x("char_length",[this],"charLength")}like(e){return new x("like",[this,F(e)],"like").asBoolean()}regexContains(e){return new x("regex_contains",[this,F(e)],"regexContains").asBoolean()}regexFind(e){return new x("regex_find",[this,F(e)],"regexFind")}regexFindAll(e){return new x("regex_find_all",[this,F(e)],"regexFindAll")}regexMatch(e){return new x("regex_match",[this,F(e)],"regexMatch").asBoolean()}stringContains(e){return new x("string_contains",[this,F(e)],"stringContains").asBoolean()}startsWith(e){return new x("starts_with",[this,F(e)],"startsWith").asBoolean()}endsWith(e){return new x("ends_with",[this,F(e)],"endsWith").asBoolean()}toLower(){return new x("to_lower",[this],"toLower")}toUpper(){return new x("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(F(e)),new x("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(F(e)),new x("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(F(e)),new x("rtrim",t,"rtrim")}type(){return new x("type",[this])}isType(e){return new x("is_type",[this,to(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(F);return new x("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new x("string_index_of",[this,F(e)],"stringIndexOf")}stringRepeat(e){return new x("string_repeat",[this,F(e)],"stringRepeat")}stringReplaceAll(e,t){return new x("string_replace_all",[this,F(e),F(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new x("string_replace_one",[this,F(e),F(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(F);return new x("concat",[this,...r],"concat")}reverse(){return new x("reverse",[this],"reverse")}arrayFilter(e,t){return new x("array_filter",[this,F(e),t],"arrayFilter")}arrayTransform(e,t){return new x("array_transform",[this,F(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new x("array_transform",[this,F(e),F(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,F(e)];return t!==void 0&&r.push(F(t)),new x("array_slice",r,"arraySlice")}arrayFirst(){return new x("array_first",[this],"arrayFirst")}arrayFirstN(e){return new x("array_first_n",[this,F(e)],"arrayFirstN")}arrayLast(){return new x("array_last",[this],"arrayLast")}arrayLastN(e){return new x("array_last_n",[this,F(e)],"arrayLastN")}arrayMaximum(){return new x("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new x("maximum_n",[this,F(e)],"arrayMaximumN")}arrayMinimum(){return new x("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new x("minimum_n",[this,F(e)],"arrayMinimumN")}arrayIndexOf(e){return new x("array_index_of",[this,F(e),F("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new x("array_index_of",[this,F(e),F("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new x("array_index_of_all",[this,F(e)],"arrayIndexOfAll")}byteLength(){return new x("byte_length",[this],"byteLength")}ceil(){return new x("ceil",[this])}floor(){return new x("floor",[this])}abs(){return new x("abs",[this])}exp(){return new x("exp",[this])}mapGet(e){return new x("map_get",[this,to(e)],"mapGet")}mapSet(e,t,...r){const s=[this,F(e),F(t),...r.map(F)];return new x("map_set",s,"mapSet")}mapKeys(){return new x("map_keys",[this],"mapKeys")}mapValues(){return new x("map_values",[this],"mapValues")}mapEntries(){return new x("map_entries",[this],"mapEntries")}getField(e){return new x("get_field",[this,F(e)],"get_field")}count(){return lt._create("count",[this],"count")}sum(){return lt._create("sum",[this],"sum")}average(){return lt._create("average",[this],"average")}minimum(){return lt._create("minimum",[this],"minimum")}maximum(){return lt._create("maximum",[this],"maximum")}first(){return lt._create("first",[this],"first")}last(){return lt._create("last",[this],"last")}arrayAgg(){return lt._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return lt._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return lt._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new x("maximum",[this,...r.map(F)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new x("minimum",[this,...r.map(F)],"minimum")}vectorLength(){return new x("vector_length",[this],"vectorLength")}cosineDistance(e){return new x("cosine_distance",[this,su(e)],"cosineDistance")}dotProduct(e){return new x("dot_product",[this,su(e)],"dotProduct")}euclideanDistance(e){return new x("euclidean_distance",[this,su(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new x("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new x("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new x("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new x("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new x("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new x("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new x("timestamp_add",[this,F(e),F(t)],"timestampAdd")}timestampSubtract(e,t){return new x("timestamp_subtract",[this,F(e),F(t)],"timestampSubtract")}timestampDiff(e,t){return new x("timestamp_diff",[this,Fl(e),F(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,F(e)];return t&&r.push(F(t)),new x("timestamp_extract",r,"timestampExtract")}documentId(){return new x("document_id",[this],"documentId")}parent(){return new x("parent",[this],"parent")}substring(e,t){const r=F(e);return new x("substring",t===void 0?[this,r]:[this,r,F(t)],"substring")}arrayGet(e){return new x("array_get",[this,F(e)],"arrayGet")}isError(){return new x("is_error",[this],"isError").asBoolean()}ifError(e){const t=new x("if_error",[this,F(e)],"ifError");return e instanceof jn?t.asBoolean():t}isAbsent(){return new x("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new x("map_remove",[this,F(e)],"mapRemove")}mapMerge(e,...t){const r=F(e),s=t.map(F);return new x("map_merge",[this,r,...s],"mapMerge")}pow(e){return new x("pow",[this,F(e)])}trunc(e){return e===void 0?new x("trunc",[this]):new x("trunc",[this,F(e)],"trunc")}round(e){return e===void 0?new x("round",[this]):new x("round",[this,F(e)],"round")}collectionId(){return new x("collection_id",[this])}length(){return new x("length",[this])}ln(){return new x("ln",[this])}sqrt(){return new x("sqrt",[this])}stringReverse(){return new x("string_reverse",[this])}ifAbsent(e){return new x("if_absent",[this,F(e)],"ifAbsent")}ifNull(e){return new x("if_null",[this,F(e)],"ifNull")}coalesce(e,...t){return new x("coalesce",[this,F(e),...t.map(F)],"coalesce")}join(e){return new x("join",[this,F(e)],"join")}log10(){return new x("log10",[this])}arraySum(){return new x("sum",[this])}split(e){return new x("split",[this,F(e)])}timestampTruncate(e,t){const r=[this,F(e)];return t&&r.push(F(t)),new x("timestamp_trunc",r)}ascending(){return Lv(this)}descending(){return Mv(this)}as(e){return new xv(this,e,"as")}}class lt{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new lt(e,t);return s._methodName=r,s}as(e){return new Cv(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class Cv{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class xv{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Vi extends $r{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map((t=>t._toProto(e)))}}}_readUserData(e){this.Rr.forEach((t=>t._readUserData(e)))}}class jr extends $r{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new x("geo_distance",[this,F(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function fa(n){return Dv(n,"field")}function Dv(n,e){return new jr(typeof n=="string"?Dt===n?Og()._internalPath:bt("field",n):n._internalPath,e)}class zr extends $r{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new zr(e,void 0);return t._protoValue=e,t}_toProto(e){return L(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,Ev(this._protoValue)||(this._protoValue=$t(this.value,e))}}function to(n,e){return e_(n,"constant")}function e_(n,e){const t=new zr(n,e);return typeof n=="boolean"?new n_(t):t}class x extends $r{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Je({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class jn extends $r{get _methodName(){return this._expr._methodName}countIf(){return lt._create("count_if",[this],"countIf")}not(){return new x("not",[this],"not").asBoolean()}conditional(e,t){return new x("conditional",[this,e,t],"conditional")}ifError(e){const t=F(e),r=new x("if_error",[this,t],"ifError");return t instanceof jn?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class t_ extends jn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class n_ extends jn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class Nv extends jn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function kv(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(to(r)),t.push(F(s))}return new x("map",t,"map")}function Ov(n){return(function(t,r){return new x("array",t.map((s=>F(s))),r)})(n,"array")}function Lv(n){return new Ul(Fl(n),"ascending","ascending")}function Mv(n){return new Ul(Fl(n),"descending","descending")}class Ul{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:kg(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class r_ extends gt{get _name(){return"add_fields"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[eo(e,this.fields)]}}_readUserData(e){super._readUserData(e),Gn(this.fields,e)}}class s_ extends gt{get _name(){return"aggregate"}get _optionsUtil(){return new Je({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[eo(e,this.accumulators),eo(e,this.groups)]}}_readUserData(e){super._readUserData(e),Gn(this.groups,e),Gn(this.accumulators,e)}}class i_ extends gt{get _name(){return"distinct"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[eo(e,this.groups)]}}_readUserData(e){super._readUserData(e),Gn(this.groups,e)}}class wo extends gt{get _name(){return"collection"}get _optionsUtil(){return new Je({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class To extends gt{get _name(){return"collection_group"}get _optionsUtil(){return new Je({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class uc extends gt{get _name(){return"database"}get _optionsUtil(){return new Je({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class lc extends gt{get _name(){return"documents"}get _optionsUtil(){return new Je({})}constructor(e,t){if(super(t),!e||e.length===0)throw new D(b.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new D(b.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(e){return{...super._toProto(e),args:this.dr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class Eo extends gt{get _name(){return"where"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Gn(this.condition,e)}}class zn extends gt{get _name(){return"limit"}get _optionsUtil(){return new Je({})}constructor(e,t){L(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Bs(e,this.limit)]}}}class Ff extends gt{get _name(){return"offset"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Bs(e,this.offset)]}}}class Fv extends gt{get _name(){return"select"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[eo(e,this.selections)]}}_readUserData(e){super._readUserData(e),Gn(this.selections,e)}}class Ot extends gt{get _name(){return"sort"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),Gn(this.orderings,e)}}class Bl extends gt{get _name(){return"replace_with"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),kg(Bl.pr)]}}_readUserData(e){super._readUserData(e),Gn(this.map,e)}}Bl.pr="full_replace";function Gn(n,e){return Xg(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}// Copyright 2024 Google LLC* @license
class Ke{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return vo(this)}getPipelineCollectionGroup(){return ql(this)}getPipelineCollectionId(){return o_(this)}getPipelineDocuments(){return xa(this)}getPipelineFlavor(){return(function(t){let r="exact";return t.stages.forEach(((s,i)=>{s._name!==i_.name&&s._name!==s_.name||(r="keyless"),s._name===Fv.name&&r==="exact"&&(r="augmented"),s._name===r_.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return Yt(this)}}function Yt(n){const e=n.stages[0];return e instanceof wo||e instanceof To||e instanceof uc||e instanceof lc?e._name:"unknown"}function vo(n){if(Yt(n)==="collection")return n.stages[0].Vr}function ql(n){if(Yt(n)==="collection_group")return n.stages[0].collectionId}function o_(n){switch(Yt(n)){case"collection":return Y.fromString(vo(n)).lastSegment();case"collection_group":return ql(n);default:return}}function xa(n){if(Yt(n)==="documents")return n.stages[0].dr}class Ui{constructor(e,t,r,s){this._db=e,this.userDataReader=t,this._userDataWriter=r,this.stages=s}wr(e,t){const r=this.userDataReader.createContext(3,e);return Xg(t)?t._readUserData(r):Array.isArray(t)?t.forEach((s=>s._readUserData(r))):t.forEach((s=>s._readUserData(r))),t}where(e){const t=this.stages.map((r=>r));return this.wr("where",e),t.push(new Eo(e,{})),new Ui(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map((r=>r));return t.push(new zn(e,{})),new Ui(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const r=this.stages.map((s=>s));return"orderings"in e?r.push(new Ot(this.wr("sort",e.orderings),{})):r.push(new Ot(this.wr("sort",[e,...t]),{})),new Ui(this._db,this.userDataReader,this._userDataWriter,r)}br(e){return{pipeline:{stages:this.stages.map((t=>t._toProto(e)))}}}}// Copyright 2024 Google LLC* @license
class T{constructor(e,t){this.type=e,this.value=t}static vr(){return new T("ERROR",void 0)}static Sr(){return new T("UNSET",void 0)}static Dr(){return new T("NULL",Ut)}static newValue(e){return ft(e)?new T("NULL",Ut):(function(r){return!!r&&"booleanValue"in r})(e)?new T("BOOLEAN",e):kt(e)?new T("INT",e):yr(e)?new T("DOUBLE",e):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(e)?new T("TIMESTAMP",e):(function(r){return!!r&&"stringValue"in r})(e)?new T("STRING",e):(function(r){return!!r&&"bytesValue"in r})(e)?new T("BYTES",e):e.referenceValue?new T("REFERENCE",e):e.geoPointValue?new T("GEO_POINT",e):qn(e)?new T("ARRAY",e):br(e)?new T("VECTOR",e):Er(e)?new T("MAP",e):new T("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function Bi(n){if(!n.Cr())return n.value}function a_(n){return n instanceof jn?n._expr:n}function K(n){if((n=a_(n))instanceof jr)return new Uv(n);if(n instanceof zr)return new Bv(n);if(n instanceof Vi)return new qv(n);if(n instanceof x){if(n.name==="add")return new zv(n);if(n.name==="subtract")return new Gv(n);if(n.name==="multiply")return new Kv(n);if(n.name==="divide")return new Wv(n);if(n.name==="mod")return new Hv(n);if(n.name==="and")return new Qv(n);if(n.name==="equal")return new aA(n);if(n.name==="not_equal")return new cA(n);if(n.name==="less_than")return new uA(n);if(n.name==="less_than_or_equal")return new lA(n);if(n.name==="greater_than")return new hA(n);if(n.name==="greater_than_or_equal")return new dA(n);if(n.name==="array_concat")return new fA(n);if(n.name==="array_reverse")return new pA(n);if(n.name==="array_contains")return new mA(n);if(n.name==="array_contains_all")return new gA(n);if(n.name==="array_contains_any")return new _A(n);if(n.name==="array_length")return new yA(n);if(n.name==="array_element")return new IA(n);if(n.name==="equal_any")return new c_(n);if(n.name==="not_equal_any")return new Yv(n);if(n.name==="is_nan")return new Xv(n);if(n.name==="is_not_nan")return new Zv(n);if(n.name==="is_null")return new eA(n);if(n.name==="is_not_null")return new tA(n);if(n.name==="is_error")return new nA(n);if(n.name==="exists")return new rA(n);if(n.name==="not")return new hc(n);if(n.name==="or")return new Jv(n);if(n.name==="xor")return new $l(n);if(n.name==="conditional")return new sA(n);if(n.name==="maximum")return new iA(n);if(n.name==="minimum")return new oA(n);if(n.name==="reverse")return new wA(n);if(n.name==="replace_first")return new TA(n);if(n.name==="replace_all")return new EA(n);if(n.name==="char_length")return new vA(n);if(n.name==="byte_length")return new AA(n);if(n.name==="like")return new RA(n);if(n.name==="regex_contains")return new PA(n);if(n.name==="regex_match")return new bA(n);if(n.name==="string_contains")return new SA(n);if(n.name==="starts_with")return new VA(n);if(n.name==="ends_with")return new CA(n);if(n.name==="to_lower")return new xA(n);if(n.name==="to_upper")return new DA(n);if(n.name==="trim")return new NA(n);if(n.name==="string_concat")return new kA(n);if(n.name==="map_get")return new OA(n);if(n.name==="cosine_distance")return new LA(n);if(n.name==="dot_product")return new MA(n);if(n.name==="euclidean_distance")return new FA(n);if(n.name==="vector_length")return new UA(n);if(n.name==="unix_micros_to_timestamp")return new zA(n);if(n.name==="timestamp_to_unix_micros")return new WA(n);if(n.name==="unix_millis_to_timestamp")return new GA(n);if(n.name==="timestamp_to_unix_millis")return new HA(n);if(n.name==="unix_seconds_to_timestamp")return new KA(n);if(n.name==="timestamp_to_unix_seconds")return new QA(n);if(n.name==="timestamp_add")return new JA(n);if(n.name==="timestamp_subtract")return new YA(n)}throw new Error(`Unknown Expr : ${n}`)}class Uv{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Dt)return T.newValue({referenceValue:Vs(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return T.newValue({timestampValue:da(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return T.newValue({timestampValue:da(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?mo(r)?T.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:da(i.serializer,z.fromTimestamp(Es(o)))};if(i.serverTimestampBehavior==="previous"){const c=go(o);if(c)return c}return{nullValue:"NULL_VALUE"}})(e,r)):T.newValue(r):T.Sr()}}class Bv{constructor(e){this.expr=e}evaluate(e,t){return T.newValue(this.expr._getValue())}}class qv{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.Rr.map((s=>K(s).evaluate(e,t)));return r.some((s=>s.Cr()))?T.vr():T.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function $e(n){return yr(n)?Number(n.doubleValue):Number(n.integerValue)}function jt(n){return BigInt(n.integerValue)}const $v=BigInt("0x7fffffffffffffff"),jv=-BigInt("0x8000000000000000");class Ao{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length>=2,24778);const r=K(this.expr.params[0]).evaluate(e,t),s=K(this.expr.params[1]).evaluate(e,t);let i=this.Or(r,s);for(const o of this.expr.params.slice(2)){const c=K(o).evaluate(e,t);i=this.Or(i,c)}return i}Or(e,t){if(e.Cr()||t.Cr())return T.vr();if(e.Fr()||t.Fr())return T.Dr();const r=e.value,s=t.value;if(!yr(r)&&!kt(r)||!yr(s)&&!kt(s))return T.vr();if(yr(r)||yr(s)){const i=this.Mr(r,s);return i?T.newValue(i):T.vr()}if(kt(r)&&kt(s)){const i=this.Nr(r,s);return i===void 0?T.vr():typeof i=="number"?T.newValue({doubleValue:i}):i<jv||i>$v?T.vr():T.newValue({integerValue:`${i}`})}return T.vr()}}function nn(n,e){return Ve(n)!==Ve(e)?"TYPE_MISMATCH":ct(n)||ct(e)?"NOT_EQ":ft(n)&&ft(e)?"EQ":ft(n)||ft(e)?"NULL":qn(n)&&qn(e)?(function(r,s){if(r.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let o=0;o<(r.values?.length??0);o++){const c=r.values[o],u=s.values[o];switch(nn(c,u)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:$(44609,{Lr:c,Br:u})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):br(n)&&br(e)||Er(n)&&Er(e)?(function(r,s){const i=r.fields||{},o=s.fields||{};if(Ra(i)!==Ra(o))return"NOT_EQ";let c=!1;for(const u in i)if(i.hasOwnProperty(u)){if(o[u]===void 0)return"NOT_EQ";switch(nn(i[u],o[u])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(r,s){return yt(r,s,{Te:!1,Ee:!0,he:!0})})(n,e)?"EQ":"NOT_EQ"}class zv extends Ao{Nr(e,t){return jt(e)+jt(t)}Mr(e,t){return{doubleValue:$e(e)+$e(t)}}}class Gv extends Ao{constructor(e){super(e),this.expr=e}Nr(e,t){return jt(e)-jt(t)}Mr(e,t){return{doubleValue:$e(e)-$e(t)}}}class Kv extends Ao{constructor(e){super(e),this.expr=e}Nr(e,t){return jt(e)*jt(t)}Mr(e,t){return{doubleValue:$e(e)*$e(t)}}}class Wv extends Ao{constructor(e){super(e),this.expr=e}Nr(e,t){const r=jt(t);if(r!==BigInt(0))return jt(e)/r}Mr(e,t){const r=$e(t);return r===0?{doubleValue:_s(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:$e(e)/r}}}class Hv extends Ao{constructor(e){super(e),this.expr=e}Nr(e,t){const r=jt(t);if(r!==BigInt(0))return jt(e)%r}Mr(e,t){const r=$e(t);if(r!==0)return{doubleValue:$e(e)%r}}}class Qv{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const o=K(i).evaluate(e,t);switch(o.type){case"BOOLEAN":if(!o.value?.booleanValue)return T.newValue(Ue);break;case"NULL":s=!0;break;default:r=!0}}return r?T.vr():s?T.Dr():T.newValue(at)}}class hc{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,9634);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return T.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return T.Dr();default:return T.vr()}}}class Jv{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const o=K(i).evaluate(e,t);switch(o.type){case"BOOLEAN":if(o.value?.booleanValue)return T.newValue(at);break;case"NULL":s=!0;break;default:r=!0}}return r?T.vr():s?T.Dr():T.newValue(Ue)}}class $l{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(const i of this.expr.params){const o=K(i).evaluate(e,t);switch(o.type){case"BOOLEAN":r=$l.xor(r,!!o.value?.booleanValue);break;case"NULL":s=!0;break;default:return T.vr()}}return s?T.Dr():T.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class c_{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===2,55094);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();for(const o of i.value?.arrayValue?.values??[])switch(ft(s.value)&&ft(o)?"EQ":nn(s.value,o)){case"EQ":return T.newValue(at);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:$(44608,{value:s.value,candidate:o})}return r?T.Dr():T.newValue(Ue)}}class Yv{constructor(e){this.expr=e}evaluate(e,t){return new hc(new x("not",[new x("equal_any",this.expr.params)])).evaluate(e,t)}}class Xv{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,23322);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return T.newValue(Ue);case"DOUBLE":return T.newValue({booleanValue:isNaN($e(r.value))});case"NULL":return T.Dr();default:return T.vr()}}}class Zv{constructor(e){this.expr=e}evaluate(e,t){return L(this.expr.params.length===1,50406),new hc(new x("not",[new x("is_nan",this.expr.params)])).evaluate(e,t)}}class eA{constructor(e){this.expr=e}evaluate(e,t){switch(L(this.expr.params.length===1,23123),K(this.expr.params[0]).evaluate(e,t).type){case"NULL":return T.newValue(at);case"UNSET":case"ERROR":return T.vr();default:return T.newValue(Ue)}}}class tA{constructor(e){this.expr=e}evaluate(e,t){return L(this.expr.params.length===1,23167),new hc(new x("not",[new x("is_null",this.expr.params)])).evaluate(e,t)}}class nA{constructor(e){this.expr=e}evaluate(e,t){return L(this.expr.params.length===1,5228),K(this.expr.params[0]).evaluate(e,t).type==="ERROR"?T.newValue(at):T.newValue(Ue)}}class rA{constructor(e){this.expr=e}evaluate(e,t){switch(L(this.expr.params.length===1,6877),K(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return T.vr();case"UNSET":return T.newValue(Ue);default:return T.newValue(at)}}}class sA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===3,11706);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?K(this.expr.params[1]).evaluate(e,t):K(this.expr.params[2]).evaluate(e,t);case"NULL":return K(this.expr.params[2]).evaluate(e,t);default:return T.vr()}}}class iA{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>K(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Qe(i.value,s.value)>0?i:s}return s===void 0?T.Dr():s}}class oA{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>K(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Qe(i.value,s.value)<0?i:s}return s===void 0?T.Dr():s}}class Gs{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return T.vr()}const s=K(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return T.vr()}return this.Ur(r,s)}}class aA extends Gs{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return T.newValue(at);if(e.Fr()||t.Fr()||ct(e.value)||ct(t.value)||Ve(e.value)!==Ve(t.value))return T.newValue(Ue);switch(nn(e.value,t.value)){case"EQ":return T.newValue(at);case"NOT_EQ":return T.newValue(Ue);case"NULL":return T.Dr();default:$(44615,{left:e,right:t})}}}class cA extends Gs{constructor(e){super(e),this.expr=e}Ur(e,t){switch(nn(e.value,t.value)){case"EQ":return T.newValue(Ue);case"NOT_EQ":case"TYPE_MISMATCH":return T.newValue(at);case"NULL":return T.Dr();default:$(44614,{left:e,right:t})}}}class uA extends Gs{constructor(e){super(e),this.expr=e}Ur(e,t){return Ve(e.value)!==Ve(t.value)||ct(e.value)||ct(t.value)?T.newValue(Ue):T.newValue({booleanValue:Qe(e.value,t.value)<0})}}class lA extends Gs{constructor(e){super(e),this.expr=e}Ur(e,t){return Ve(e.value)!==Ve(t.value)||ct(e.value)||ct(t.value)?T.newValue(Ue):nn(e.value,t.value)==="EQ"?T.newValue(at):T.newValue({booleanValue:Qe(e.value,t.value)<0})}}class hA extends Gs{constructor(e){super(e),this.expr=e}Ur(e,t){return Ve(e.value)!==Ve(t.value)||ct(e.value)||ct(t.value)?T.newValue(Ue):T.newValue({booleanValue:Qe(e.value,t.value)>0})}}class dA extends Gs{constructor(e){super(e),this.expr=e}Ur(e,t){return Ve(e.value)!==Ve(t.value)||ct(e.value)||ct(t.value)?T.newValue(Ue):nn(e.value,t.value)==="EQ"?T.newValue(at):T.newValue({booleanValue:Qe(e.value,t.value)>0})}}class fA{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class pA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,216);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"ARRAY":{const s=r.value.arrayValue?.values??[];return T.newValue({arrayValue:{values:[...s].reverse()}})}default:return T.vr()}}}class mA{constructor(e){this.expr=e}evaluate(e,t){return L(this.expr.params.length===2,52884),new c_(new x("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class gA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===2,1392);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const o=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const u of o){let l=!1;r=!1;for(const d of c){switch(ft(u)&&ft(d)?"EQ":nn(u,d)){case"EQ":l=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:$(44613,{value:d,search:u})}if(l)break}if(!l)return T.newValue(Ue)}return T.newValue(at)}}class _A{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===2,2680);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const o=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(const u of c)for(const l of o)switch(ft(u)&&ft(l)?"EQ":nn(u,l)){case"EQ":return T.newValue(at);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:$(44608,{value:u,search:l})}return r?T.Dr():T.newValue(Ue)}}class yA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,38605);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"ARRAY":return T.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return T.vr()}}}class IA{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class wA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,1508);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"BYTES":{const s=r.value?.bytesValue;if(typeof s=="string"){const i=me.fromBase64String(s).toUint8Array();return i.reverse(),T.newValue({bytesValue:me.fromUint8Array(i).toBase64()})}return T.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{const s=r.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),o=Array.from(i,(c=>c.segment)).reverse();return T.newValue({stringValue:o.join("")})}default:return T.vr()}}}class TA{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class EA{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class vA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,19400);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.Dr();case"STRING":{const s=(function(o){let c=0;for(let u=0;u<o.length;u++){const l=o.codePointAt(u);if(l===void 0)return;if(l<=65535)if(l>=55296&&l<=57343)if(l<=56319){const d=o.codePointAt(u+1);d!==void 0&&d>=56320&&d<=57343?(c+=1,u++):c+=1}else c+=1;else c+=1;else{if(!(l<=1114111))return;c+=1,u++}}return c})(r.value.stringValue);return s===void 0?T.vr():T.newValue({integerValue:s})}default:return T.vr()}}}class AA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,8486);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const s=r.value?.bytesValue;return typeof s=="string"?T.newValue({integerValue:me.fromBase64String(s).toUint8Array().length}):T.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{const s=(function(o){let c=0;for(let u=0;u<o.length;u++){const l=o.codePointAt(u);if(l===void 0)return;if(l>=55296&&l<=57343){if(!(l<=56319))return;{const d=o.codePointAt(u+1);if(d===void 0||!(d>=56320&&d<=57343))return;c+=4,u++}}else if(l<=127)c+=1;else if(l<=2047)c+=2;else if(l<=65535)c+=3;else{if(!(l<=1114111))return;c+=4,u++}}return c})(r.value?.stringValue);return s===void 0?T.vr():T.newValue({integerValue:s})}case"NULL":return T.Dr();default:return T.vr()}}}class Ks{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return T.vr()}return r?T.Dr():this.kr(s.value?.stringValue,i.value?.stringValue)}}class RA extends Ks{kr(e,t){try{const r=(function(o){let c="";for(let u=0;u<o.length;u++){const l=o.charAt(u);switch(l){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+l;break;default:c+=l}}return"^"+c+"$"})(t),s=el.compile(r);return T.newValue({booleanValue:s.matches(e)})}catch(r){return Ne(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),T.vr()}}}class PA extends Ks{kr(e,t){try{const r=el.compile(t);return T.newValue({booleanValue:r.matcher(e).find()})}catch{return Ne(`Invalid regex pattern found in regex_contains: ${t}, returning error`),T.vr()}}}class bA extends Ks{kr(e,t){try{return T.newValue({booleanValue:el.compile(t).matches(e)})}catch{return Ne(`Invalid regex pattern found in regex_match: ${t}, returning error`),T.vr()}}}class SA extends Ks{kr(e,t){return T.newValue({booleanValue:e.includes(t)})}}class VA extends Ks{kr(e,t){return T.newValue({booleanValue:e.startsWith(t)})}}class CA extends Ks{kr(e,t){return T.newValue({booleanValue:e.endsWith(t)})}}class xA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,29079);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return T.Dr();default:return T.vr()}}}class DA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,60487);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return T.Dr();default:return T.vr()}}}class NA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,28544);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return T.Dr();default:return T.vr()}}}class kA{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((o=>K(o).evaluate(e,t)));let s="",i=!1;for(const o of r)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return T.vr()}return i?T.Dr():T.newValue({stringValue:s})}}class OA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===2,4483);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return T.Sr();case"MAP":break;default:return T.vr()}const s=K(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return T.vr();const i=r.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?T.Sr():T.newValue(i)}}class jl{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const o=bu(s.value),c=bu(i.value);if(o===void 0||c===void 0||o.values?.length!==c.values?.length)return T.vr();const u=this.qr(o,c);return u===void 0||isNaN(u)?T.vr():T.newValue({doubleValue:u})}}class LA extends jl{qr(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return;let i=0,o=0,c=0;for(let l=0;l<r.length;l++){if(!Bn(r[l])||!Bn(s[l]))return;const d=$e(r[l]),p=$e(s[l]);i+=d*p,o+=d*d,c+=p*p}const u=Math.sqrt(o)*Math.sqrt(c);if(u!==0)return 1-Math.max(-1,Math.min(1,i/u))}}class MA extends jl{qr(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!Bn(r[o])||!Bn(s[o]))return;i+=$e(r[o])*$e(s[o])}return i}}class FA extends jl{qr(e,t){const r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!Bn(r[o])||!Bn(s[o]))return;const c=$e(r[o]),u=$e(s[o]);i+=Math.pow(c-u,2)}return Math.sqrt(i)}}class UA{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,39044);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const s=bu(r.value);return T.newValue({integerValue:s?.values?.length??0})}case"NULL":return T.Dr();default:return T.vr()}}}const no=BigInt(-62135596800),ro=BigInt(253402300799),Da=BigInt(1e3),kn=BigInt(1e6),BA=no*Da,qA=ro*Da+BigInt(999),$A=no*kn,jA=ro*kn+BigInt(999999);function zl(n){return n>=$A&&n<=jA}function u_(n){return n>=no&&n<=ro}function so(n,e){const t=BigInt(n);return!(t<no||t>ro)&&!(e<0||e>=1e9)&&(t!==no||e===0)&&!(t===ro&&e>999999999)}function l_(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function Gl(n){return BigInt(n.seconds)*kn+BigInt(Math.trunc(n.nanoseconds/1e3))}class Kl{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return T.Dr();default:return T.vr()}}}class zA extends Kl{toTimestamp(e){if(!zl(e))return T.vr();let t=Number(e/kn),r=Number(e%kn*BigInt(1e3));const s=l_(t,r);return t=s.seconds,r=s.nanos,so(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.vr()}}class GA extends Kl{toTimestamp(e){if(!(function(o){return o>=BA&&o<=qA})(e))return T.vr();let t=Number(e/Da),r=Number(e%Da*BigInt(1e6));const s=l_(t,r);return t=s.seconds,r=s.nanos,so(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.vr()}}class KA extends Kl{toTimestamp(e){if(!u_(e))return T.vr();const t=Number(e);return T.newValue({timestampValue:{seconds:t,nanos:0}})}}class Wl{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return T.Dr();default:return T.vr()}const s=Al(r.value.timestampValue);return so(s.seconds,s.nanoseconds)?this.$r(s):T.vr()}}class WA extends Wl{$r(e){const t=Gl(e);return zl(t)?T.newValue({integerValue:`${t.toString()}`}):T.vr()}}class HA extends Wl{$r(e){const t=Gl(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?T.newValue({integerValue:r.toString()}):T.newValue({integerValue:(r-BigInt(1)).toString()})}}class QA extends Wl{$r(e){const t=BigInt(e.seconds);return u_(t)?T.newValue({integerValue:t.toString()}):T.vr()}}class h_{constructor(e){this.expr=e}evaluate(e,t){L(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return T.vr()}const i=K(this.expr.params[1]).evaluate(e,t);let o;switch(i.type){case"STRING":if(o=(function(G){switch(G){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return T.vr();break;case"NULL":r=!0;break;default:return T.vr()}const c=K(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return T.vr()}if(r)return T.Dr();const u=BigInt(c.value.integerValue);let l;try{switch(o){case"microsecond":l=u;break;case"millisecond":l=u*BigInt(1e3);break;case"second":l=u*BigInt(1e6);break;case"minute":l=u*BigInt(6e7);break;case"hour":l=u*BigInt(36e8);break;case"day":l=u*BigInt(864e8);break;default:return T.vr()}if(o!=="microsecond"&&u!==BigInt(0)&&l/u!==BigInt(this.Kr(o)))return T.vr()}catch(q){return Ne(`Error during timestamp arithmetic: ${q}`),T.vr()}const d=Al(s.value.timestampValue);if(!so(d.seconds,d.nanoseconds))return T.vr();const p=Gl(d),g=this.Wr(p,l);if(!zl(g))return T.vr();const E=Number(g/kn),S=g%kn,N=Number((S<0?S+kn:S)*BigInt(1e3)),k=S<0?E-1:E;return so(k,N)?T.newValue({timestampValue:{seconds:k,nanos:N}}):T.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class JA extends h_{Wr(e,t){return e+t}}class YA extends h_{Wr(e,t){return e-t}}function io(n){if((n=a_(n))instanceof jr)return`fld(${n.fieldName})`;if(n instanceof zr)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof ae?`ref(${t.path})`:t instanceof et?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof x)return`fn(${n.name},[${n.params.map(io).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(io).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function XA(n){if(n instanceof r_)return`${n._name}(${Yo(n.fields)})`;if(n instanceof s_){let e=`${n._name}(${Yo(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${Yo(n.groups)})`),e}if(n instanceof i_)return`${n._name}(${Yo(n.groups)})`;if(n instanceof wo)return`${n._name}(${n.Vr})`;if(n instanceof To)return`${n._name}(${n.collectionId})`;if(n instanceof uc)return`${n._name}()`;if(n instanceof lc)return`${n._name}(${n.dr.sort()})`;if(n instanceof Eo)return`${n._name}(${io(n.condition)})`;if(n instanceof zn)return`${n._name}(${n.limit})`;if(n instanceof Ot)return`${n._name}(${(function(t){return t.map((r=>`${io(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Yo(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${io(t)}`)).join(",")}`}function Xt(n){return n.stages.map((e=>XA(e))).join("|")}function d_(n,e){return Xt(n)===Xt(e)}function Te(n){return n instanceof Ke}function Uf(n){return Te(n)?Xt(n):Mi(n)}function f_(n){return Te(n)?Xt(n):(function(t){return`${ba(He(t))}|lt:${t.limitType}`})(n)}function dc(n,e){return n instanceof Ke&&e instanceof Ke?d_(n,e):!(n instanceof Ke&&!(e instanceof Ke)||!(n instanceof Ke)&&e instanceof Ke)&&dg(n,e)}function fc(n){return Wt(n)?Xt(n):ba(n)}function Hl(n,e){return n instanceof Ke&&e instanceof Ke?d_(n,e):!(n instanceof Ke&&!(e instanceof Ke)||!(n instanceof Ke)&&e instanceof Ke)&&yl(n,e)}function ZA(n,e){const t=(function(s){let i=!1;const o=[];for(const c of s)if(c instanceof Ot)if(i=!0,c.orderings.some((u=>u.expr instanceof jr&&u.expr.fieldName===Dt)))o.push(c);else{const u=c.orderings.map((l=>l));u.push(fa(Dt).ascending()),o.push(new Ot(u,{}))}else c instanceof zn&&(i||(o.push(new Ot([fa(Dt).ascending()],{})),i=!0)),o.push(c);return i||o.push(new Ot([fa(Dt).ascending()],{})),o})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");t.forEach((s=>s._readUserData(r)))}return new Ke(n.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&wE(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Li(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Li(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=_g();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Zm(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(z.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Q())}isEqual(e){return this.batchId===e.batchId&&fs(this.mutations,e.mutations,((t,r)=>gf(t,r)))&&fs(this.baseMutations,e.baseMutations,((t,r)=>gf(t,r)))}}class Jl{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){L(e.mutations.length===r.length,58842,{Qr:e.mutations.length,Gr:r.length});let s=(function(){return ME})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Jl(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,t,r,s,i=z.min(),o=z.min(),c=me.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Lt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(e){this.zr=e}}function eR(n,e){let t;if(e.document)t=ic(n.zr,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=M.fromSegments(e.noDocument.path),s=Dr(e.noDocument.readTime);t=_e.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return $(56709);{const r=M.fromSegments(e.unknownDocument.path),s=Dr(e.unknownDocument.version);t=_e.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime((function(s){const i=new oe(s[0],s[1]);return z.fromTimestamp(i)})(e.readTime)),t}function Bf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Na(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(i,o){return{name:Vs(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Ss(i,o.version.toTimestamp()),createTime:Ss(i,o.createTime.toTimestamp())}})(n.zr,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:xr(e.version)};else{if(!e.isUnknownDocument())return $(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:xr(e.version)}}return r}function Na(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function xr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Dr(n){const e=new oe(n.seconds,n.nanoseconds);return z.fromTimestamp(e)}function pr(n,e){const t=(e.baseMutations||[]).map((i=>Lu(n.zr,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map((i=>Lu(n.zr,i))),s=oe.fromMillis(e.localWriteTimeMs);return new Ql(e.batchId,s,t,r)}function Ci(n,e){const t=Dr(e.readTime),r=e.lastLimboFreeSnapshotVersion!==void 0?Dr(e.lastLimboFreeSnapshotVersion):z.min();let s;return s=(function(o){return o.structuredPipeline!==void 0})(e.query)?(function(o,c){const u=o.structuredPipeline;L((u?.pipeline?.stages??[]).length>0,1845);const l=u?.pipeline?.stages.map(tR);return new Ke(c,l)})(e.query,n.zr):(function(o){return o.documents!==void 0})(e.query)?(function(o){const c=o.documents.length;return L(c===1,1966,{count:c}),He(js(Ag(o.documents[0])))})(e.query):(function(o){return He(Sg(o))})(e.query),new Lt(s,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,r,me.fromBase64String(e.resumeToken))}function m_(n,e){const t=xr(e.snapshotVersion),r=xr(e.lastLimboFreeSnapshotVersion);let s;s=Wt(e.target)?Vg(n.zr,e.target):Il(e.target)?Pg(n.zr,e.target):oc(n.zr,e.target).yt;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:fc(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function pc(n){const e=Sg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Va(e,e.limit,"L"):e}function Xo(n,e){return new Yl(e.largestBatchId,Lu(n.zr,e.overlayMutation))}function qf(n,e){const t=e.path.lastSegment();return[n,We(e.path.popLast()),t]}function $f(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:xr(r.readTime),documentKey:We(r.documentKey.path),largestBatchId:r.largestBatchId}}function tR(n){switch(n.name){case"collection":return new wo(n.args[0].referenceValue,{});case"collection_group":return new To(n.args[1].stringValue,{});case"database":return new uc({});case"documents":return new lc(n.args.map((e=>e.referenceValue)),{});case"where":return new Eo(Fu(n.args[0]),{});case"limit":{const e=n.args[0].integerValue??n.args[0].doubleValue;return new zn(typeof e=="number"?e:Number(e),{})}case"sort":return new Ot(n.args.map((e=>(function(r){const s=r.mapValue?.fields;return new Ul(Fu(s.expression),s.direction?.stringValue,"orderingFromProto")})(e))),{});default:throw new Error(`Stage type: ${n.name} not supported.`)}}function Fu(n){return n.fieldReferenceValue?new jr(bt("_exprFromProto",n.fieldReferenceValue),"_exprFromProto"):n.functionValue?(function(t){return new x(t.functionValue.name,t.functionValue.args?.map(Fu)||[])})(n):zr._fromProto(n)}class nR{getBundleMetadata(e,t){return jf(e).get(t).next((r=>{if(r)return(function(i){return{id:i.bundleId,createTime:Dr(i.createTime),version:i.version}})(r)}))}saveBundleMetadata(e,t){return jf(e).put((function(s){return{bundleId:s.id,createTime:xr(Re(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return zf(e).get(t).next((r=>{if(r)return(function(i){return{name:i.name,query:pc(i.bundledQuery),readTime:Dr(i.readTime)}})(r)}))}saveNamedQuery(e,t){return zf(e).put((function(s){return{name:s.name,readTime:xr(Re(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function jf(n){return Oe(n,Xa)}function zf(n){return Oe(n,Za)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e,t){this.serializer=e,this.userId=t}static jr(e,t){const r=t.uid||"";return new mc(e,r)}getOverlay(e,t){return Zr(e).get(qf(this.userId,t)).next((r=>r?Xo(this.serializer,r):null))}getOverlays(e,t){const r=_t();return R.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){const r=_t();return Zr(e).ee(((s,i)=>{const o=Xo(this.serializer,i);o.largestBatchId>t&&r.set(o.getKey(),o)})).next((()=>r))}saveOverlays(e,t,r){const s=[];return r.forEach(((i,o)=>{const c=new Yl(t,o);s.push(this.Hr(e,c))})),R.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach((o=>s.add(We(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Zr(e).Z(Au,c))})),R.waitFor(i)}getOverlaysForCollection(e,t,r){const s=_t(),i=We(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Zr(e).H(Au,o).next((c=>{for(const u of c){const l=Xo(this.serializer,u);s.set(l.getKey(),l)}return s}))}getOverlaysForCollectionGroup(e,t,r,s){const i=_t();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Zr(e).ee({index:km,range:c},((u,l,d)=>{const p=Xo(this.serializer,l);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):d.done()})).next((()=>i))}Hr(e,t){return Zr(e).put((function(s,i,o){const[c,u,l]=qf(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Zi(s.zr,o.mutation)}})(this.serializer,this.userId,t))}}function Zr(n){return Oe(n,ec)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rR{Jr(e){return Oe(e,ul)}getSessionToken(e){return this.Jr(e).get("sessionToken").next((t=>{const r=t?.value;return r?me.fromUint8Array(r):me.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Jr(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(){}Yr(e,t){this.Zr(e,t),t.Xr()}Zr(e,t){if("nullValue"in e)this.ei(t,5);else if("booleanValue"in e)this.ei(t,10),t.ti(e.booleanValue?1:0);else if("integerValue"in e)this.ei(t,15),t.ti(pe(e.integerValue));else if("doubleValue"in e){const r=pe(e.doubleValue);isNaN(r)?this.ei(t,13):(this.ei(t,15),_s(r)?t.ti(0):t.ti(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ei(t,20),typeof r=="string"&&(r=en(r)),t.ni(`${r.seconds||""}`),t.ti(r.nanos||0)}else if("stringValue"in e)this.ri(e.stringValue,t),this.ii(t);else if("bytesValue"in e)this.ei(t,30),t.si(tn(e.bytesValue)),this.ii(t);else if("referenceValue"in e)this._i(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ei(t,45),t.ti(r.latitude||0),t.ti(r.longitude||0)}else"mapValue"in e?Km(e)?this.ei(t,Number.MAX_SAFE_INTEGER):br(e)?this.oi(e.mapValue,t):(this.ai(e.mapValue,t),this.ii(t)):"arrayValue"in e?(this.ui(e.arrayValue,t),this.ii(t)):$(19022,{ci:e})}ri(e,t){this.ei(t,25),this.li(e,t)}li(e,t){t.ni(e)}ai(e,t){const r=e.fields||{};this.ei(t,55);for(const s of Object.keys(r))this.ri(s,t),this.Zr(r[s],t)}oi(e,t){const r=e.fields||{};this.ei(t,53);const s=Rr,i=r[s].arrayValue?.values?.length||0;this.ei(t,15),t.ti(pe(i)),this.ri(s,t),this.Zr(r[s],t)}ui(e,t){const r=e.values||[];this.ei(t,50);for(const s of r)this.Zr(s,t)}_i(e,t){this.ei(t,37),M.fromName(e).path.forEach((r=>{this.ei(t,60),this.li(r,t)}))}ei(e,t){e.ti(t)}ii(e){e.ti(2)}}mr.Ei=new mr;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=255;function sR(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Gf(n){const e=64-(function(r){let s=0;for(let i=0;i<8;++i){const o=sR(255&r[i]);if(s+=o,o!==8)break}return s})(n);return Math.ceil(e/8)}class iR{constructor(){this.buffer=new Uint8Array(1024),this.position=0}hi(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ti(r.value),r=t.next();this.Pi()}Ri(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ii(r.value),r=t.next();this.Ai()}Vi(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ti(r);else if(r<2048)this.Ti(960|r>>>6),this.Ti(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ti(480|r>>>12),this.Ti(128|63&r>>>6),this.Ti(128|63&r);else{const s=t.codePointAt(0);this.Ti(240|s>>>18),this.Ti(128|63&s>>>12),this.Ti(128|63&s>>>6),this.Ti(128|63&s)}}this.Pi()}di(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ii(r);else if(r<2048)this.Ii(960|r>>>6),this.Ii(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ii(480|r>>>12),this.Ii(128|63&r>>>6),this.Ii(128|63&r);else{const s=t.codePointAt(0);this.Ii(240|s>>>18),this.Ii(128|63&s>>>12),this.Ii(128|63&s>>>6),this.Ii(128|63&s)}}this.Ai()}fi(e){const t=this.mi(e),r=Gf(t);this.pi(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}gi(e){const t=this.mi(e),r=Gf(t);this.pi(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}yi(){this.wi(es),this.wi(255)}bi(){this.Si(es),this.Si(255)}reset(){this.position=0}seed(e){this.pi(e.length),this.buffer.set(e,this.position),this.position+=e.length}Di(){return this.buffer.slice(0,this.position)}mi(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Ti(e){const t=255&e;t===0?(this.wi(0),this.wi(255)):t===es?(this.wi(es),this.wi(0)):this.wi(t)}Ii(e){const t=255&e;t===0?(this.Si(0),this.Si(255)):t===es?(this.Si(es),this.Si(0)):this.Si(e)}Pi(){this.wi(0),this.wi(1)}Ai(){this.Si(0),this.Si(1)}wi(e){this.pi(1),this.buffer[this.position++]=e}Si(e){this.pi(1),this.buffer[this.position++]=~e}pi(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class oR{constructor(e){this.xi=e}si(e){this.xi.hi(e)}ni(e){this.xi.Vi(e)}ti(e){this.xi.fi(e)}Xr(){this.xi.yi()}}class aR{constructor(e){this.xi=e}si(e){this.xi.Ri(e)}ni(e){this.xi.di(e)}ti(e){this.xi.gi(e)}Xr(){this.xi.bi()}}class wi{constructor(){this.xi=new iR,this.ascending=new oR(this.xi),this.descending=new aR(this.xi)}seed(e){this.xi.seed(e)}Ci(e){return e===0?this.ascending:this.descending}Di(){return this.xi.Di()}reset(){this.xi.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t,r,s){this.Fi=e,this.Oi=t,this.Mi=r,this.Ni=s}Li(){const e=this.Ni.length,t=e===0||this.Ni[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.Ni,0),t!==e?r.set([0],this.Ni.length):++r[r.length-1],new gr(this.Fi,this.Oi,this.Mi,r)}Bi(e,t,r){return{indexId:this.Fi,uid:e,arrayValue:pa(this.Mi),directionalValue:pa(this.Ni),orderedDocumentKey:pa(t),documentKey:r.path.toArray()}}Ui(e,t,r){const s=this.Bi(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function gn(n,e){let t=n.Fi-e.Fi;return t!==0?t:(t=Kf(n.Mi,e.Mi),t!==0?t:(t=Kf(n.Ni,e.Ni),t!==0?t:M.comparator(n.Oi,e.Oi)))}function Kf(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function pa(n){return am()?(function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r})(n):n}function Wf(n){return typeof n!="string"?n:(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(n)}class Hf{constructor(e){this.ki=new ce(((t,r)=>de.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.qi=e.orderBy,this.$i=[];for(const t of e.filters){const r=t;r.isInequality()?this.ki=this.ki.add(r):this.$i.push(r)}}get Ki(){return this.ki.size>1}Wi(e){if(L(e.collectionGroup===this.collectionId,49279),this.Ki)return!1;const t=Tu(e);if(t!==void 0&&!this.Qi(t))return!1;const r=lr(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.Qi(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.ki.size>0){const c=this.ki.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.Gi(c,u)||!this.zi(this.qi[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.qi.length||!this.zi(this.qi[o++],c))return!1}return!0}ji(){if(this.Ki)return null;let e=new ce(de.comparator);const t=[];for(const r of this.$i)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new wr(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new wr(r.field,0))}for(const r of this.qi)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new wr(r.field,r.dir==="asc"?0:1)));return new ms(ms.UNKNOWN_ID,this.collectionId,t,gs.empty())}Qi(e){for(const t of this.$i)if(this.Gi(t,e))return!0;return!1}Gi(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}zi(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(n){if(L(n instanceof ne||n instanceof ue,20012),n instanceof ne){if(n instanceof cg){const t=n.value.arrayValue?.values?.map((r=>ne.create(n.field,"==",r)))||[];return ue.create(t,"or")}return n}const e=n.filters.map((t=>g_(t)));return ue.create(e,n.op)}function cR(n){if(n.getFilters().length===0)return[];const e=qu(g_(n));return L(__(e),7391),Uu(e)||Bu(e)?[e]:e.getFilters()}function Uu(n){return n instanceof ne}function Bu(n){return n instanceof ue&&_l(n)}function __(n){return Uu(n)||Bu(n)||(function(t){if(t instanceof ue&&Su(t)){for(const r of t.getFilters())if(!Uu(r)&&!Bu(r))return!1;return!0}return!1})(n)}function qu(n){if(L(n instanceof ne||n instanceof ue,34018),n instanceof ne)return n;if(n.filters.length===1)return qu(n.filters[0]);const e=n.filters.map((r=>qu(r)));let t=ue.create(e,n.op);return t=ka(t),__(t)?t:(L(t instanceof ue,64498),L(bs(t),40251),L(t.filters.length>1,57927),t.filters.reduce(((r,s)=>Xl(r,s))))}function Xl(n,e){let t;return L(n instanceof ne||n instanceof ue,38388),L(e instanceof ne||e instanceof ue,25473),t=n instanceof ne?e instanceof ne?(function(s,i){return ue.create([s,i],"and")})(n,e):Qf(n,e):e instanceof ne?Qf(e,n):(function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),bs(s)&&bs(i))return ig(s,i.getFilters());const o=Su(s)?s:i,c=Su(s)?i:s,u=o.filters.map((l=>Xl(l,c)));return ue.create(u,"or")})(n,e),ka(t)}function Qf(n,e){if(bs(e))return ig(e,n.getFilters());{const t=e.filters.map((r=>Xl(n,r)));return ue.create(t,"or")}}function ka(n){if(L(n instanceof ne||n instanceof ue,11850),n instanceof ne)return n;const e=n.getFilters();if(e.length===1)return ka(e[0]);if(rg(n))return n;const t=e.map((s=>ka(s))),r=[];return t.forEach((s=>{s instanceof ne?r.push(s):s instanceof ue&&(s.op===n.op?r.push(...s.filters):r.push(s))})),r.length===1?r[0]:ue.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uR{constructor(){this.Hi=new Zl}addToCollectionParentIndex(e,t){return this.Hi.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(mt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(mt.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class Zl{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ce(Y.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ce(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf="IndexedDbIndexManager",Zo=new Uint8Array(0);class lR{constructor(e,t){this.databaseId=t,this.Ji=new Zl,this.Yi=new cn((r=>ba(r)),((r,s)=>yl(r,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Ji.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Ji.add(t)}));const i={collectionId:r,parent:We(s)};return Yf(e).put(i)}return R.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[wm(t),""],!1,!0);return Yf(e).H(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Nt(o.parent))}return r}))}addFieldIndex(e,t){const r=Ti(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=ns(e);return i.next((c=>{o.put($f(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const r=Ti(e),s=ns(e),i=ts(e);return r.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Ti(e),r=ts(e),s=ns(e);return t.Z().next((()=>r.Z())).next((()=>s.Z()))}createTargetIndexes(e,t){return R.forEach(this.Zi(t),(r=>this.getIndexType(e,r).next((s=>{if(s===0||s===1){const i=new Hf(r).ji();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const r=ts(e);let s=!0;const i=new Map;return R.forEach(this.Zi(t),(o=>this.Xi(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=Q();const c=[];return R.forEach(i,((u,l)=>{O(Jf,`Using index ${(function(j){return`id=${j.indexId}|cg=${j.collectionGroup}|f=${j.fields.map((J=>`${J.fieldPath}:${J.kind}`)).join(",")}`})(u)} to execute ${ba(t)}`);const d=(function(j,J){const se=Tu(J);if(se===void 0)return null;for(const ee of Sa(j,se.fieldPath))switch(ee.op){case"array-contains-any":return ee.value.arrayValue.values||[];case"array-contains":return[ee.value]}return null})(l,u),p=(function(j,J){const se=new Map;for(const ee of lr(J))for(const w of Sa(j,ee.fieldPath))switch(w.op){case"==":case"in":se.set(ee.fieldPath.canonicalString(),w.value);break;case"not-in":case"!=":return se.set(ee.fieldPath.canonicalString(),w.value),Array.from(se.values())}return null})(l,u),g=(function(j,J){const se=[];let ee=!0;for(const w of lr(J)){const _=w.kind===0?Tf(j,w.fieldPath,j.startAt):Ef(j,w.fieldPath,j.startAt);se.push(_.value),ee&&(ee=_.inclusive)}return new $n(se,ee)})(l,u),E=(function(j,J){const se=[];let ee=!0;for(const w of lr(J)){const _=w.kind===0?Ef(j,w.fieldPath,j.endAt):Tf(j,w.fieldPath,j.endAt);se.push(_.value),ee&&(ee=_.inclusive)}return new $n(se,ee)})(l,u),S=this.es(u,l,g),N=this.es(u,l,E),k=this.ts(u,l,p),q=this.ns(u.indexId,d,S,g.inclusive,N,E.inclusive,k);return R.forEach(q,(G=>r.Y(G,t.limit).next((j=>{j.forEach((J=>{const se=M.fromSegments(J.documentKey);o.has(se)||(o=o.add(se),c.push(se))}))}))))})).next((()=>c))}return R.resolve(null)}))}Zi(e){let t=this.Yi.get(e);return t||(e.filters.length===0?t=[e]:t=cR(ue.create(e.filters,"and")).map((r=>Cu(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.Yi.set(e,t),t)}ns(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),l=u/(t!=null?t.length:1),d=[];for(let p=0;p<u;++p){const g=t?this.rs(t[p/l]):Zo,E=this.ss(e,g,r[p%l],s),S=this._s(e,g,i[p%l],o),N=c.map((k=>this.ss(e,g,k,!0)));d.push(...this.createRange(E,S,N))}return d}ss(e,t,r,s){const i=new gr(e,M.empty(),t,r);return s?i:i.Li()}_s(e,t,r,s){const i=new gr(e,M.empty(),t,r);return s?i.Li():i}Xi(e,t){const r=new Hf(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)r.Wi(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let r=2;const s=this.Zi(t);return R.forEach(s,(i=>this.Xi(e,i).next((o=>{o?r!==0&&o.fields.length<(function(u){let l=new ce(de.comparator),d=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?d=!0:l=l.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(l=l.add(p.field));return l.size+(d?1:0)})(i)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&r===2?1:r))}us(e,t){const r=new wi;for(const s of lr(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.Ci(s.kind);mr.Ei.Yr(i,o)}return r.Di()}rs(e){const t=new wi;return mr.Ei.Yr(e,t.Ci(0)),t.Di()}cs(e,t){const r=new wi;return mr.Ei.Yr(Pr(this.databaseId,t),r.Ci((function(i){const o=lr(i);return o.length===0?0:o[o.length-1].kind})(e))),r.Di()}ts(e,t,r){if(r===null)return[];let s=[];s.push(new wi);let i=0;for(const o of lr(e)){const c=r[i++];for(const u of s)if(this.ls(t,o.fieldPath)&&qn(c))s=this.Es(s,o,c);else{const l=u.Ci(o.kind);mr.Ei.Yr(c,l)}}return this.hs(s)}es(e,t,r){return this.ts(e,t,r.position)}hs(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Di();return t}Es(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new wi;u.seed(c.Di()),mr.Ei.Yr(o,u.Ci(t.kind)),i.push(u)}return i}ls(e,t){return!!e.filters.find((r=>r instanceof ne&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Ti(e),s=ns(e);return(t?r.H(vu,IDBKeyRange.bound(t,t)):r.H()).next((i=>{const o=[];return R.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(d,p){const g=p?new gs(p.sequenceNumber,new mt(Dr(p.readTime),new M(Nt(p.documentKey)),p.largestBatchId)):gs.empty(),E=d.fields.map((([S,N])=>new wr(de.fromServerFormat(S),N)));return new ms(d.indexId,d.collectionGroup,E,g)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:W(r.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const s=Ti(e),i=ns(e);return this.Ts(e).next((o=>s.H(vu,IDBKeyRange.bound(t,t)).next((c=>R.forEach(c,(u=>i.put($f(u.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return R.forEach(t,((s,i)=>{const o=r.get(s.collectionGroup);return(o?R.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(r.set(s.collectionGroup,c),R.forEach(c,(u=>this.Ps(e,s,u).next((l=>{const d=this.Rs(i,u);return l.isEqual(d)?R.resolve():this.Is(e,i,u,l,d)})))))))}))}As(e,t,r,s){return ts(e).put(s.Bi(this.uid,this.cs(r,t.key),t.key))}Vs(e,t,r,s){return ts(e).delete(s.Ui(this.uid,this.cs(r,t.key),t.key))}Ps(e,t,r){const s=ts(e);let i=new ce(gn);return s.ee({index:Nm,range:IDBKeyRange.only([r.indexId,this.uid,pa(this.cs(r,t))])},((o,c)=>{i=i.add(new gr(r.indexId,t,Wf(c.arrayValue),Wf(c.directionalValue)))})).next((()=>i))}Rs(e,t){let r=new ce(gn);const s=this.us(t,e);if(s==null)return r;const i=Tu(t);if(i!=null){const o=e.data.field(i.fieldPath);if(qn(o))for(const c of o.arrayValue.values||[])r=r.add(new gr(t.indexId,e.key,this.rs(c),s))}else r=r.add(new gr(t.indexId,e.key,Zo,s));return r}Is(e,t,r,s,i){O(Jf,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,l,d,p,g){const E=u.getIterator(),S=l.getIterator();let N=Xr(E),k=Xr(S);for(;N||k;){let q=!1,G=!1;if(N&&k){const j=d(N,k);j<0?G=!0:j>0&&(q=!0)}else N!=null?G=!0:q=!0;q?(p(k),k=Xr(S)):G?(g(N),N=Xr(E)):(N=Xr(E),k=Xr(S))}})(s,i,gn,(c=>{o.push(this.As(e,t,r,c))}),(c=>{o.push(this.Vs(e,t,r,c))})),R.waitFor(o)}Ts(e){let t=1;return ns(e).ee({index:Dm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,c)=>gn(o,c))).filter(((o,c,u)=>!c||gn(o,u[c-1])!==0));const s=[];s.push(e);for(const o of r){const c=gn(o,e),u=gn(o,t);if(c===0)s[0]=e.Li();else if(c>0&&u<0)s.push(o),s.push(o.Li());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.ds(s[o],s[o+1]))return[];const c=s[o].Ui(this.uid,Zo,M.empty()),u=s[o+1].Ui(this.uid,Zo,M.empty());i.push(IDBKeyRange.bound(c,u))}return i}ds(e,t){return gn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Xf)}getMinOffset(e,t){return R.mapArray(this.Zi(t),(r=>this.Xi(e,r).next((s=>s||$(44426))))).next(Xf)}}function Yf(n){return Oe(n,Qi)}function ts(n){return Oe(n,ki)}function Ti(n){return Oe(n,cl)}function ns(n){return Oe(n,Ni)}function Xf(n){L(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;il(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new mt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y_(n,e,t){const r=n.store(wt),s=n.store(ys),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},((d,p,g)=>(c++,g.delete())));i.push(u.next((()=>{L(c===1,47070,{batchId:t.batchId})})));const l=[];for(const d of t.mutations){const p=Vm(e,d.key.path,t.batchId);i.push(s.delete(p)),l.push(d.key)}return R.waitFor(i).next((()=>l))}function Oa(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw $(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.fs={}}static jr(e,t,r,s){L(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new gc(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return _n(e).ee({index:_r,range:r},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,s){const i=os(e),o=_n(e);return o.add({}).next((c=>{L(typeof c=="number",49019);const u=new Ql(c,t,r,s),l=(function(E,S,N){const k=N.baseMutations.map((G=>Zi(E.zr,G))),q=N.mutations.map((G=>Zi(E.zr,G)));return{userId:S,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:k,mutations:q}})(this.serializer,this.userId,u),d=[];let p=new ce(((g,E)=>W(g.canonicalString(),E.canonicalString())));for(const g of s){const E=Vm(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),d.push(o.put(l)),d.push(i.put(E,BT))}return p.forEach((g=>{d.push(this.indexManager.addToCollectionParentIndex(e,g))})),e.addOnCommittedListener((()=>{this.fs[c]=u.keys()})),R.waitFor(d).next((()=>u))}))}lookupMutationBatch(e,t){return _n(e).get(t).next((r=>r?(L(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),pr(this.serializer,r)):null))}ps(e,t){return this.fs[t]?R.resolve(this.fs[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const s=r.keys();return this.fs[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return _n(e).ee({index:_r,range:s},((o,c,u)=>{c.userId===this.userId&&(L(c.batchId>=r,47524,{gs:r}),i=pr(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Nn;return _n(e).ee({index:_r,range:t,reverse:!0},((s,i,o)=>{r=i.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Nn],[this.userId,Number.POSITIVE_INFINITY]);return _n(e).H(_r,t).next((r=>r.map((s=>pr(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=aa(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return os(e).ee({range:s},((o,c,u)=>{const[l,d,p]=o,g=Nt(d);if(l===this.userId&&t.path.isEqual(g))return _n(e).get(p).next((E=>{if(!E)throw $(61480,{ys:o,batchId:p});L(E.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:E.userId,batchId:p}),i.push(pr(this.serializer,E))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(W);const s=[];return t.forEach((i=>{const o=aa(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=os(e).ee({range:c},((l,d,p)=>{const[g,E,S]=l,N=Nt(E);g===this.userId&&i.path.isEqual(N)?r=r.add(S):p.done()}));s.push(u)})),R.waitFor(s).next((()=>this.ws(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=aa(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ce(W);return os(e).ee({range:o},((u,l,d)=>{const[p,g,E]=u,S=Nt(g);p===this.userId&&r.isPrefixOf(S)?S.length===s&&(c=c.add(E)):d.done()})).next((()=>this.ws(e,c)))}ws(e,t){const r=[],s=[];return t.forEach((i=>{s.push(_n(e).get(i).next((o=>{if(o===null)throw $(35274,{batchId:i});L(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(pr(this.serializer,o))})))})),R.waitFor(s).next((()=>r))}removeMutationBatch(e,t){return y_(e.le,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.bs(t.batchId)})),R.forEach(r,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}bs(e){delete this.fs[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return R.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return os(e).ee({range:r},((i,o,c)=>{if(i[0]===this.userId){const u=Nt(i[1]);s.push(u)}else c.done()})).next((()=>{L(s.length===0,56720,{vs:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return I_(e,this.userId,t)}Ss(e){return w_(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:Nn,lastStreamToken:""}))}}function I_(n,e,t){const r=aa(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return os(n).ee({range:i,X:!0},((c,u,l)=>{const[d,p,g]=c;d===e&&p===s&&(o=!0),l.done()})).next((()=>o))}function _n(n){return Oe(n,wt)}function os(n){return Oe(n,ys)}function w_(n){return Oe(n,Wi)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new rn(0)}static Cs(){return new rn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hR{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Fs(e).next((t=>{const r=new rn(t.highestTargetId);return t.highestTargetId=r.next(),this.Os(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.Fs(e).next((t=>z.fromTimestamp(new oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.Fs(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.Fs(e).next((s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Os(e,s))))}addTargetData(e,t){return this.Ms(e,t).next((()=>this.Fs(e).next((r=>(r.targetCount+=1,this.Ns(t,r),this.Os(e,r))))))}updateTargetData(e,t){return this.Ms(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>rs(e).delete(t.targetId))).next((()=>this.Fs(e))).next((r=>(L(r.targetCount>0,8065),r.targetCount-=1,this.Os(e,r))))}removeTargets(e,t,r){let s=0;const i=[];return rs(e).ee(((o,c)=>{const u=Ci(this.serializer,c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>R.waitFor(i))).next((()=>s))}forEachTarget(e,t){return rs(e).ee(((r,s)=>{const i=Ci(this.serializer,s);t(i)}))}Fs(e){return Zf(e).get(Aa).next((t=>(L(t!==null,2888),t)))}Os(e,t){return Zf(e).put(Aa,t)}Ms(e,t){return rs(e).put(m_(this.serializer,t))}Ns(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Fs(e).next((t=>t.targetCount))}getTargetData(e,t){const r=fc(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return rs(e).ee({range:s,index:xm},((o,c,u)=>{const l=Ci(this.serializer,c);Hl(t,l.target)&&(i=l,u.done())})).next((()=>i))}addMatchingKeys(e,t,r){const s=[],i=En(e);return t.forEach((o=>{const c=We(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))})),R.waitFor(s)}removeMatchingKeys(e,t,r){const s=En(e);return R.forEach(t,(i=>{const o=We(i.path);return R.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])}))}removeMatchingKeysForTargetId(e,t){const r=En(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=En(e);let i=Q();return s.ee({range:r,X:!0},((o,c,u)=>{const l=Nt(o[1]),d=new M(l);i=i.add(d)})).next((()=>i))}containsKey(e,t){const r=We(t.path),s=IDBKeyRange.bound([r],[wm(r)],!1,!0);let i=0;return En(e).ee({index:al,X:!0,range:s},(([o,c],u,l)=>{o!==0&&(i++,l.done())})).next((()=>i>0))}dt(e,t){return rs(e).get(t).next((r=>r?Ci(this.serializer,r):null))}}function rs(n){return Oe(n,Is)}function Zf(n){return Oe(n,Tr)}function En(n){return Oe(n,ws)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dR{constructor(e,t){this.db=e,this.garbageCollector=qg(this,t)}lr(e){const t=this.Ls(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Ls(e){let t=0;return this.Er(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Er(e,t){return this.Bs(e,((r,s)=>t(s)))}addReference(e,t,r){return ea(e,r)}removeReference(e,t,r){return ea(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return ea(e,t)}Us(e,t){return(function(s,i){let o=!1;return w_(s).te((c=>I_(s,c,i).next((u=>(u&&(o=!0),R.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Bs(e,((o,c)=>{if(c<=t){const u=this.Us(e,o).next((l=>{if(!l)return i++,r.getEntry(e,o).next((()=>(r.removeEntry(o,z.min()),En(e).delete((function(p){return[0,We(p.path)]})(o)))))}));s.push(u)}})).next((()=>R.waitFor(s))).next((()=>r.apply(e))).next((()=>i))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return ea(e,t)}Bs(e,t){const r=En(e);let s,i=rt.ce;return r.ee({index:al},(([o,c],{path:u,sequenceNumber:l})=>{o===0?(i!==rt.ce&&t(new M(Nt(s)),i),i=l,s=u):i=rt.ce})).next((()=>{i!==rt.ce&&t(new M(Nt(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ea(n,e){return En(n).put((function(r,s){return{targetId:0,path:We(r.path),sequenceNumber:s}})(e,n.currentSequenceNumber))}// Copyright 2024 Google LLC* @license
function T_(n,e){let t=e;for(const r of n.stages)t=fR({serializer:n.serializer,serverTimestampBehavior:n.listenOptions?.serverTimestampBehavior},r,t);return t}function _c(n,e){return T_(n,[e]).length>0}function E_(n,e){return Te(n)?_c(n,e):sc(n,e)}function fR(n,e,t){if(e instanceof wo)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.Vr))})(0,e,t);if(e instanceof Eo)return(function(s,i,o){return o.filter((c=>{const u=Bi(K(i.condition).evaluate(s,c));return u!==void 0&&yt(u,at)}))})(n,e,t);if(e instanceof To)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof uc)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()))})(0,0,t);if(e instanceof lc)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&i.mr.has(c.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof zn)return(function(s,i,o){return o.slice(0,i.limit)})(0,e,t);if(e instanceof Ot)return(function(s,i,o){const c=i.orderings.map((u=>({ks:K(u.expr),direction:u.direction})));return[...o].sort(((u,l)=>{for(const{ks:d,direction:p}of c){const g=Bi(d.evaluate(s,u)),E=Bi(d.evaluate(s,l)),S=Qe(g??Ut,E??Ut);if(S!==0)return p==="ascending"?S:-S}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function $u(n){const e=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof Ot)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,r)=>{for(const s of e){const i=Bi(K(s.expr).evaluate({serializer:n.serializer},t)),o=Bi(K(s.expr).evaluate({serializer:n.serializer},r)),c=Qe(i||Ut,o||Ut);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function iu(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof zn)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(){this.changes=new cn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,_e.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pR{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return yn(e).put(r)}removeEntry(e,t,r){return yn(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Na(o),c[c.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.qs(e,r))))}getEntry(e,t){let r=_e.newInvalidDocument(t);return yn(e).ee({index:ca,range:IDBKeyRange.only(Ei(t))},((s,i)=>{r=this.$s(t,i)})).next((()=>r))}Ks(e,t){let r={size:0,document:_e.newInvalidDocument(t)};return yn(e).ee({index:ca,range:IDBKeyRange.only(Ei(t))},((s,i)=>{r={document:this.$s(t,i),size:Oa(i)}})).next((()=>r))}getEntries(e,t){let r=be();return this.Ws(e,t,((s,i)=>{const o=this.$s(s,i);r=r.insert(s,o)})).next((()=>r))}getAllEntries(e){let t=be();return yn(e).ee(((r,s)=>{const i=this.$s(M.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);t=t.insert(i.key,i)})).next((()=>t))}Qs(e,t){let r=be(),s=new fe(M.comparator);return this.Ws(e,t,((i,o)=>{const c=this.$s(i,o);r=r.insert(i,c),s=s.insert(i,Oa(o))})).next((()=>({documents:r,Gs:s})))}Ws(e,t,r){if(t.isEmpty())return R.resolve();let s=new ce(np);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(Ei(s.first()),Ei(s.last())),o=s.getIterator();let c=o.getNext();return yn(e).ee({index:ca,range:i},((u,l,d)=>{const p=M.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&np(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.j(Ei(c)):d.done()})).next((()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,s,i){const o=Te(t)?Y.fromString(vo(t)):t.path,c=[o.popLast().toArray(),o.lastSegment(),Na(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return yn(e).H(IDBKeyRange.bound(c,u,!0)).next((l=>{i?.incrementDocumentReadCount(l.length);let d=be();for(const p of l){const g=this.$s(M.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(E_(t,g)||s.has(g.key))&&(d=d.insert(g.key,g))}return d}))}getAllFromCollectionGroup(e,t,r,s){let i=be();const o=tp(t,r),c=tp(t,mt.max());return yn(e).ee({index:Cm,range:IDBKeyRange.bound(o,c,!0)},((u,l,d)=>{const p=this.$s(M.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(p.key,p),i.size===s&&d.done()})).next((()=>i))}newChangeBuffer(e){return new mR(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return ep(e).get(Eu).next((t=>(L(!!t,20021),t)))}qs(e,t){return ep(e).put(Eu,t)}$s(e,t){if(t){const r=eR(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(z.min())))return r}return _e.newInvalidDocument(e)}}function A_(n){return new pR(n)}class mR extends v_{constructor(e,t){super(),this.zs=e,this.trackRemovals=t,this.js=new cn((r=>r.toString()),((r,s)=>r.isEqual(s)))}applyChanges(e){const t=[];let r=0,s=new ce(((i,o)=>W(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.js.get(i);if(t.push(this.zs.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Bf(this.zs.serializer,o);s=s.add(i.path.popLast());const l=Oa(u);r+=l-c.size,t.push(this.zs.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Bf(this.zs.serializer,o.convertToNoDocument(z.min()));t.push(this.zs.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.zs.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.zs.updateMetadata(e,r)),R.waitFor(t)}getFromCache(e,t){return this.zs.Ks(e,t).next((r=>(this.js.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.zs.Qs(e,t).next((({documents:r,Gs:s})=>(s.forEach(((i,o)=>{this.js.set(i,{size:o,readTime:r.get(i).readTime})})),r)))}}function ep(n){return Oe(n,Hi)}function yn(n){return Oe(n,va)}function Ei(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function tp(n,e){const t=e.documentKey.path.toArray();return[n,Na(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function np(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=W(t[i],r[i]),s)return s;return s=W(t.length,r.length),s||(s=W(t[t.length-2],r[r.length-2]),s||W(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gR{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Li(r.mutation,s,st.empty(),oe.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Q()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Q()){const s=_t();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=fr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=_t();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Q())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=be();const o=Fi(),c=(function(){return Fi()})();return t.forEach(((u,l)=>{const d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof on)?i=i.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Li(d.mutation,l,d.mutation.getFieldMask(),oe.now())):o.set(l.key,st.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((l,d)=>o.set(l,d))),t.forEach(((l,d)=>c.set(l,new gR(d,o.get(l)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Fi();let s=new fe(((o,c)=>o-c)),i=Q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||st.empty();d=c.applyToLocalView(l,d),r.set(u,d);const p=(s.get(c.batchId)||Q()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,p=_g();d.forEach((g=>{if(!i.has(g)){const E=Zm(t.get(g),r.get(g));E!==null&&p.set(g,E),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return R.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return Te(t)?this.getDocumentsMatchingPipeline(e,t,r,s):CE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):wl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):R.resolve(_t());let c=ps,u=i;return o.next((l=>R.forEach(l,((d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(d)?R.resolve():this.remoteDocumentCache.getEntry(e,d).next((g=>{u=u.insert(d,g)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,u,l,Q()))).next((d=>({batchId:c,changes:gg(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next((r=>{let s=fr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=fr();return this.indexManager.getCollectionParents(e,i).next((c=>R.forEach(c,(u=>{const l=(function(p,g){return new an(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next((d=>{d.forEach(((p,g)=>{o=o.insert(p,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>sc(t,c)))))}getDocumentsMatchingPipeline(e,t,r,s){if(Yt(t)==="collection_group"){const i=ql(t);let o=fr();return this.indexManager.getCollectionParents(e,i).next((c=>R.forEach(c,(u=>{const l=(function(p,g){const E=p.stages.map((S=>S instanceof To?new wo(g.canonicalString(),{}):S));return new Ke(p.serializer,E)})(t,u.child(i));return this.getDocumentsMatchingPipeline(e,l,r,s).next((d=>{d.forEach(((p,g)=>{o=o.insert(p,g)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next((o=>{switch(i=o,Yt(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=Q();for(const u of xa(t))c=c.add(M.fromPath(u));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new D("invalid-argument",`Invalid pipeline source to execute offline: ${Xt(t)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>_c(t,c)))))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach(((i,o)=>{const c=o.getKey();t.get(c)===null&&(t=t.insert(c,_e.newInvalidDocument(c)))}));let s=fr();return t.forEach(((i,o)=>{const c=e.get(i);c!==void 0&&Li(c.mutation,o,st.empty(),oe.now()),r(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(e,t,r){switch(Yt(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Y.fromString(vo(t)),r);case"collection_group":throw new D("invalid-argument",`Unexpected collection group pipeline: ${Xt(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,xa(t).map((s=>M.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new D("invalid-argument",`Failed to get overlays for pipeline: ${Xt(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return R.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Re(s.createTime)}})(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,(function(s){return{name:s.name,query:pc(s.bundledQuery),readTime:Re(s.readTime)}})(t)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yR{constructor(){this.overlays=new fe(M.comparator),this.Ys=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=_t();return R.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){const r=_t();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&r.set(s,i)})),R.resolve(r)}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.Hr(e,t,i)})),R.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ys.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const s=_t(),i=t.length+1,o=new M(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return R.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new fe(((l,d)=>l-d));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=_t(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=_t(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((l,d)=>c.set(l,d))),!(c.size()>=s)););return R.resolve(c)}Hr(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Yl(t,r));let i=this.Ys.get(t);i===void 0&&(i=Q(),this.Ys.set(t,i)),this.Ys.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IR{constructor(){this.sessionToken=me.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this.Zs=new ce(Me.Xs),this.e_=new ce(Me.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){const r=new Me(e,t);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.r_(new Me(e,t))}i_(e,t){e.forEach((r=>this.removeReference(r,t)))}s_(e){const t=new M(new Y([])),r=new Me(t,e),s=new Me(t,e+1),i=[];return this.e_.forEachInRange([r,s],(o=>{this.r_(o),i.push(o.key)})),i}__(){this.Zs.forEach((e=>this.r_(e)))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){const t=new M(new Y([])),r=new Me(t,e),s=new Me(t,e+1);let i=Q();return this.e_.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Me(e,0),r=this.Zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Me{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return M.comparator(e.key,t.key)||W(e.a_,t.a_)}static t_(e,t){return W(e.a_,t.a_)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new ce(Me.Xs)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Ql(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.u_=this.u_.add(new Me(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(o)}lookupMutationBatch(e,t){return R.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.l_(r),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Nn:this.gs-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Me(t,0),s=new Me(t,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([r,s],(o=>{const c=this.c_(o.a_);i.push(c)})),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(W);return t.forEach((s=>{const i=new Me(s,0),o=new Me(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,o],(c=>{r=r.add(c.a_)}))})),R.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;M.isDocumentKey(i)||(i=i.child(""));const o=new Me(new M(i),0);let c=new ce(W);return this.u_.forEachWhile((u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.a_)),!0)}),o),R.resolve(this.E_(c))}E_(e){const t=[];return e.forEach((r=>{const s=this.c_(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){L(this.h_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return R.forEach(t.mutations,(s=>{const i=new Me(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.u_=r}))}bs(e){}containsKey(e,t){const r=new Me(t,0),s=this.u_.firstAfterOrEqual(r);return R.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}h_(e,t){return this.l_(e)}l_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}c_(e){const t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TR{constructor(e){this.T_=e,this.docs=(function(){return new fe(M.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.T_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():_e.newInvalidDocument(t))}getEntries(e,t){let r=be();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():_e.newInvalidDocument(s))})),R.resolve(r)}getAllEntries(e){let t=be();return this.docs.forEach(((r,s)=>{t=t.insert(r,s.document)})),R.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,o;Te(t)?(i=Y.fromString(vo(t)),o=d=>_c(t,d)):(i=t.path,o=d=>sc(t,d));let c=be();const u=new M(i.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!i.isPrefixOf(d.path))break;d.path.length>i.length+1||il(Am(p),r)<=0||(s.has(p.key)||o(p))&&(c=c.insert(p.key,p.mutableCopy()))}return R.resolve(c)}getAllFromCollectionGroup(e,t,r,s){$(9500)}P_(e,t){return R.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new ER(this)}getSize(e){return R.resolve(this.size)}}class ER extends v_{constructor(e){super(),this.zs=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.zs.addEntry(e,s)):this.zs.removeEntry(r)})),R.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vR{constructor(e){this.persistence=e,this.R_=new cn((t=>fc(t)),Hl),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.I_=0,this.A_=new eh,this.targetCount=0,this.V_=rn.xs()}forEachTarget(e,t){return this.R_.forEach(((r,s)=>t(s))),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.I_&&(this.I_=t),R.resolve()}Ms(e){this.R_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.V_=new rn(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Ms(t),R.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.R_.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.R_.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),R.waitFor(i).next((()=>s))}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.R_.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this.A_.n_(t,r),R.resolve()}removeMatchingKeys(e,t,r){this.A_.i_(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),R.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this.A_.o_(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this.A_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e,t){this.d_={},this.overlays={},this.f_=new rt(0),this.m_=!1,this.m_=!0,this.p_=new IR,this.referenceDelegate=e(this),this.g_=new vR(this),this.indexManager=new uR,this.remoteDocumentCache=(function(s){return new TR(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new p_(t),this.w_=new _R(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new yR,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.d_[e.toKey()];return r||(r=new wR(t,this.referenceDelegate),this.d_[e.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new AR(this.f_.next());return this.referenceDelegate.b_(),r(s).next((i=>this.referenceDelegate.v_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}S_(e,t){return R.or(Object.values(this.d_).map((r=>()=>r.containsKey(e,t))))}}class AR extends Pm{constructor(e){super(),this.currentSequenceNumber=e}}class yc{constructor(e){this.persistence=e,this.D_=new eh,this.x_=null}static C_(e){return new yc(e)}get F_(){if(this.x_)return this.x_;throw $(60996)}addReference(e,t,r){return this.D_.addReference(r,t),this.F_.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.D_.removeReference(r,t),this.F_.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),R.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.F_.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}b_(){this.x_=new Set}v_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.F_,(r=>{const s=M.fromPath(r);return this.O_(e,s).next((i=>{i||t.removeEntry(s,z.min())}))})).next((()=>(this.x_=null,t.apply(e))))}updateLimboDocument(e,t){return this.O_(e,t).next((r=>{r?this.F_.delete(t.toString()):this.F_.add(t.toString())}))}y_(e){return 0}O_(e,t){return R.or([()=>R.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class La{constructor(e,t){this.persistence=e,this.M_=new cn((r=>We(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=qg(this,t)}static C_(e,t){return new La(e,t)}b_(){}v_(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){const t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Ls(e){let t=0;return this.Er(e,(r=>{t++})).next((()=>t))}Er(e,t){return R.forEach(this.M_,((r,s)=>this.Us(e,r,s).next((i=>i?R.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(e,(o=>this.Us(e,o,t).next((c=>{c||(r++,i.removeEntry(o,z.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),R.resolve()}removeReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),R.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ua(e.data.value)),t}Us(e,t,r){return R.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.M_.get(t);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RR{constructor(e){this.serializer=e}U(e,t,r,s){const i=new Ya("createOrUpgrade",t);r<1&&s>=1&&((function(u){u.createObjectStore(po)})(e),(function(u){u.createObjectStore(Wi,{keyPath:UT}),u.createObjectStore(wt,{keyPath:cf,autoIncrement:!0}).createIndex(_r,uf,{unique:!0}),u.createObjectStore(ys)})(e),rp(e),(function(u){u.createObjectStore(hr)})(e));let o=R.resolve();return r<3&&s>=3&&(r!==0&&((function(u){u.deleteObjectStore(ws),u.deleteObjectStore(Is),u.deleteObjectStore(Tr)})(e),rp(e)),o=o.next((()=>(function(u){const l=u.store(Tr),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return l.put(Aa,d)})(i)))),r<4&&s>=4&&(r!==0&&(o=o.next((()=>(function(u,l){return l.store(wt).H().next((p=>{u.deleteObjectStore(wt),u.createObjectStore(wt,{keyPath:cf,autoIncrement:!0}).createIndex(_r,uf,{unique:!0});const g=l.store(wt),E=p.map((S=>g.put(S)));return R.waitFor(E)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(Ts,{keyPath:HT})})(e)}))),r<5&&s>=5&&(o=o.next((()=>this.N_(i)))),r<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(Hi)})(e),this.L_(i))))),r<7&&s>=7&&(o=o.next((()=>this.B_(i)))),r<8&&s>=8&&(o=o.next((()=>this.U_(e,i)))),r<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&s>=10&&(o=o.next((()=>this.k_(i)))),r<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(Xa,{keyPath:QT})})(e),(function(u){u.createObjectStore(Za,{keyPath:JT})})(e)}))),r<12&&s>=12&&(o=o.next((()=>{(function(u){const l=u.createObjectStore(ec,{keyPath:rE});l.createIndex(Au,sE,{unique:!1}),l.createIndex(km,iE,{unique:!1})})(e)}))),r<13&&s>=13&&(o=o.next((()=>(function(u){const l=u.createObjectStore(va,{keyPath:qT});l.createIndex(ca,$T),l.createIndex(Cm,jT)})(e))).next((()=>this.q_(e,i))).next((()=>e.deleteObjectStore(hr)))),r<14&&s>=14&&(o=o.next((()=>this.K_(e,i)))),r<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(cl,{keyPath:YT,autoIncrement:!0}).createIndex(vu,XT,{unique:!1}),u.createObjectStore(Ni,{keyPath:ZT}).createIndex(Dm,eE,{unique:!1}),u.createObjectStore(ki,{keyPath:tE}).createIndex(Nm,nE,{unique:!1})})(e)))),r<16&&s>=16&&(o=o.next((()=>{t.objectStore(Ni).clear()})).next((()=>{t.objectStore(ki).clear()}))),r<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(ul,{keyPath:oE})})(e)}))),r<18&&s>=18&&am()&&(o=o.next((()=>{t.objectStore(Ni).clear()})).next((()=>{t.objectStore(ki).clear()}))),o}L_(e){let t=0;return e.store(hr).ee(((r,s)=>{t+=Oa(s)})).next((()=>{const r={byteSize:t};return e.store(Hi).put(Eu,r)}))}N_(e){const t=e.store(Wi),r=e.store(wt);return t.H().next((s=>R.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,Nn],[i.userId,i.lastAcknowledgedBatchId]);return r.H(_r,o).next((c=>R.forEach(c,(u=>{L(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=pr(this.serializer,u);return y_(e,i.userId,l).next((()=>{}))}))))}))))}B_(e){const t=e.store(ws),r=e.store(hr);return e.store(Tr).get(Aa).next((s=>{const i=[];return r.ee(((o,c)=>{const u=new Y(o),l=(function(p){return[0,We(p)]})(u);i.push(t.get(l).next((d=>d?R.resolve():(p=>t.put({targetId:0,path:We(p),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>R.waitFor(i)))}))}U_(e,t){e.createObjectStore(Qi,{keyPath:WT});const r=t.store(Qi),s=new Zl,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:We(u)})}};return t.store(hr).ee({X:!0},((o,c)=>{const u=new Y(o);return i(u.popLast())})).next((()=>t.store(ys).ee({X:!0},(([o,c,u],l)=>{const d=Nt(c);return i(d.popLast())}))))}k_(e){const t=e.store(Is);return t.ee(((r,s)=>{const i=Ci(this.serializer,s),o=m_(this.serializer,i);return t.put(o)}))}q_(e,t){const r=t.store(hr),s=[];return r.ee(((i,o)=>{const c=t.store(va),u=(function(p){return p.document?new M(Y.fromString(p.document.name).popFirst(5)):p.noDocument?M.fromSegments(p.noDocument.path):p.unknownDocument?M.fromSegments(p.unknownDocument.path):$(36783)})(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(l))})).next((()=>R.waitFor(s)))}K_(e,t){const r=t.store(wt),s=A_(this.serializer),i=new th(yc.C_,this.serializer.zr);return r.H().next((o=>{const c=new Map;return o.forEach((u=>{let l=c.get(u.userId)??Q();pr(this.serializer,u).keys().forEach((d=>l=l.add(d))),c.set(u.userId,l)})),R.forEach(c,((u,l)=>{const d=new Fe(l),p=mc.jr(this.serializer,d),g=i.getIndexManager(d),E=gc.jr(d,this.serializer,g,i.referenceDelegate);return new R_(s,E,p,g).recalculateAndSaveOverlaysForDocumentKeys(new Ru(t,rt.ce),u).next()}))}))}}function rp(n){n.createObjectStore(ws,{keyPath:GT}).createIndex(al,KT,{unique:!0}),n.createObjectStore(Is,{keyPath:"targetId"}).createIndex(xm,zT,{unique:!0}),n.createObjectStore(Tr)}const In="IndexedDbPersistence",ou=18e5,au=5e3,cu="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",P_="main";class nh{constructor(e,t,r,s,i,o,c,u,l,d,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Tn=i,this.window=o,this.document=c,this.W_=l,this.Q_=d,this.G_=p,this.f_=null,this.m_=!1,this.isPrimary=!1,this.networkEnabled=!0,this.z_=null,this.inForeground=!1,this.j_=null,this.H_=null,this.J_=Number.NEGATIVE_INFINITY,this.Y_=g=>Promise.resolve(),!nh.C())throw new D(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new dR(this,s),this.Z_=t+P_,this.serializer=new p_(u),this.X_=new Ft(this.Z_,this.G_,new RR(this.serializer)),this.p_=new rR,this.g_=new hR(this.referenceDelegate,this.serializer),this.remoteDocumentCache=A_(this.serializer),this.w_=new nR,this.window&&this.window.localStorage?this.eo=this.window.localStorage:(this.eo=null,d===!1&&Ae(In,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.no().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,cu);return this.ro(),this.io(),this.so(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.g_.getHighestSequenceNumber(e)))})).then((e=>{this.f_=new rt(e,this.W_)})).then((()=>{this.m_=!0})).catch((e=>(this.X_&&this.X_.close(),Promise.reject(e))))}_o(e){return this.Y_=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.X_.q((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Tn.enqueueAndForget((async()=>{this.started&&await this.no()})))}no(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>ta(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.oo(e).next((t=>{t||(this.isPrimary=!1,this.Tn.enqueueRetryable((()=>this.Y_(!1))))}))})).next((()=>this.ao(e))).next((t=>this.isPrimary&&!t?this.uo(e).next((()=>!1)):!!t&&this.co(e).next((()=>!0)))))).catch((e=>{if(Yn(e))return O(In,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return O(In,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Tn.enqueueRetryable((()=>this.Y_(e))),this.isPrimary=e}))}oo(e){return vi(e).get(Yr).next((t=>R.resolve(this.lo(t))))}Eo(e){return ta(e).delete(this.clientId)}async ho(){if(this.isPrimary&&!this.To(this.J_,ou)){this.J_=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=Oe(t,Ts);return r.H().next((s=>{const i=this.Po(s,ou),o=s.filter((c=>i.indexOf(c)===-1));return R.forEach(o,(c=>r.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.eo)for(const t of e)this.eo.removeItem(this.Ro(t.clientId))}}so(){this.H_=this.Tn.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.no().then((()=>this.ho())).then((()=>this.so()))))}lo(e){return!!e&&e.ownerId===this.clientId}ao(e){return this.Q_?R.resolve(!0):vi(e).get(Yr).next((t=>{if(t!==null&&this.To(t.leaseTimestampMs,au)&&!this.Io(t.ownerId)){if(this.lo(t)&&this.networkEnabled)return!0;if(!this.lo(t)){if(!t.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,cu);return!1}}return!(!this.networkEnabled||!this.inForeground)||ta(e).H().next((r=>this.Po(r,au).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&O(In,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.m_=!1,this.Ao(),this.H_&&(this.H_.cancel(),this.H_=null),this.Vo(),this.fo(),await this.X_.runTransaction("shutdown","readwrite",[po,Ts],(e=>{const t=new Ru(e,rt.ce);return this.uo(t).next((()=>this.Eo(t)))})),this.X_.close(),this.mo()}Po(e,t){return e.filter((r=>this.To(r.updateTimeMs,t)&&!this.Io(r.clientId)))}po(){return this.runTransaction("getActiveClients","readonly",(e=>ta(e).H().next((t=>this.Po(t,ou).map((r=>r.clientId))))))}get started(){return this.m_}getGlobalsCache(){return this.p_}getMutationQueue(e,t){return gc.jr(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new lR(e,this.serializer.zr.databaseId)}getDocumentOverlayCache(e){return mc.jr(this.serializer,e)}getBundleCache(){return this.w_}runTransaction(e,t,r){O(In,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?uE:u===17?Fm:u===16?cE:u===15?ll:u===14?Mm:u===13?Lm:u===12?aE:u===11?Om:void $(60245)})(this.G_);let o;return this.X_.runTransaction(e,s,i,(c=>(o=new Ru(c,this.f_?this.f_.next():rt.ce),t==="readwrite-primary"?this.oo(o).next((u=>!!u||this.ao(o))).next((u=>{if(!u)throw Ae(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Tn.enqueueRetryable((()=>this.Y_(!1))),new D(b.FAILED_PRECONDITION,Rm);return r(o)})).next((u=>this.co(o).next((()=>u)))):this.yo(o).next((()=>r(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}yo(e){return vi(e).get(Yr).next((t=>{if(t!==null&&this.To(t.leaseTimestampMs,au)&&!this.Io(t.ownerId)&&!this.lo(t)&&!(this.Q_||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(b.FAILED_PRECONDITION,cu)}))}co(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return vi(e).put(Yr,t)}static C(){return Ft.C()}uo(e){const t=vi(e);return t.get(Yr).next((r=>this.lo(r)?(O(In,"Releasing primary lease."),t.delete(Yr)):R.resolve()))}To(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ae(`Detected an update time that is in the future: ${e} > ${r}`),!1))}ro(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.j_=()=>{this.Tn.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.no())))},this.document.addEventListener("visibilitychange",this.j_),this.inForeground=this.document.visibilityState==="visible")}Vo(){this.j_&&(this.document.removeEventListener("visibilitychange",this.j_),this.j_=null)}io(){typeof this.window?.addEventListener=="function"&&(this.z_=()=>{this.Ao();const e=/(?:Version|Mobile)\/1[456]/;om()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Tn.enterRestrictedMode(!0),this.Tn.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.z_))}fo(){this.z_&&(this.window.removeEventListener("pagehide",this.z_),this.z_=null)}Io(e){try{const t=this.eo?.getItem(this.Ro(e))!==null;return O(In,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return Ae(In,"Failed to get zombied client id.",t),!1}}Ao(){if(this.eo)try{this.eo.setItem(this.Ro(this.clientId),String(Date.now()))}catch(e){Ae("Failed to set zombie client id.",e)}}mo(){if(this.eo)try{this.eo.removeItem(this.Ro(this.clientId))}catch{}}Ro(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function vi(n){return Oe(n,po)}function ta(n){return Oe(n,Ts)}function rh(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.wo=r,this.bo=s}static vo(e,t){let r=Q(),s=Q();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new sh(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PR(n,e){return M.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return om()?8:bm(De())>0?6:4})()}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Oo(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Mo(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new bR;return this.No(e,t,o).next((c=>{if(i.result=c,this.Do)return this.Lo(e,t,o,c.size)}))})).next((()=>i.result))}Lo(e,t,r,s){return Te(t)?R.resolve():r.documentReadCount<this.xo?(ss()<=te.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Mi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),R.resolve()):(ss()<=te.DEBUG&&O("QueryEngine","Query:",Mi(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(ss()<=te.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Mi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,He(t))):R.resolve())}Oo(e,t){if(Te(t))return R.resolve(null);let r=t;if(vf(r))return R.resolve(null);let s=He(r);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=Va(r,null,"F"),s=He(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next((o=>{const c=Q(...o);return this.Fo.getDocuments(e,c).next((u=>this.indexManager.getMinOffset(e,s).next((l=>{const d=this.Bo(r,u);return this.Uo(r,d,c,l.readTime)?this.Oo(e,Va(r,null,"F")):this.ko(e,d,r,l)}))))})))))}Mo(e,t,r,s){return(Te(t)?(function(o){for(const c of o.stages){if(c instanceof zn||c instanceof Ff)return!1;if(c instanceof Eo){if(c.condition instanceof t_&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof jr&&c.condition._expr.params[0].fieldName===Dt)continue;return!1}}return!0})(t):vf(t))||s.isEqual(z.min())?R.resolve(null):this.Fo.getDocuments(e,r).next((i=>{const o=this.Bo(t,i);return this.Uo(t,o,r,s)?R.resolve(null):(ss()<=te.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Uf(t)),this.ko(e,o,t,vm(s,ps)).next((c=>c)))}))}Bo(e,t){let r,s;return Te(e)?(r=new ce(PR),s=i=>_c(e,i)):(r=new ce(Tl(e)),s=i=>sc(e,i)),t.forEach(((i,o)=>{s(o)&&(r=r.add(o))})),r}Uo(e,t,r,s){if(Te(e))return(function(c){return c.stages.some((u=>u instanceof zn||u instanceof Ff))})(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(e,t,r){return ss()<=te.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Uf(t)),this.Fo.getDocumentsMatchingQuery(e,t,mt.min(),r)}ko(e,t,r,s){return this.Fo.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="LocalStore",SR=3e8;class VR{constructor(e,t,r,s){this.persistence=e,this.qo=t,this.serializer=s,this.$o=new fe(W),this.Ko=new cn((i=>fc(i)),Hl),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(r)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new R_(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.$o)))}}function S_(n,e,t,r){return new VR(n,e,t,r)}async function V_(n,e){const t=U(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Go(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=Q();for(const l of s){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of i){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next((l=>({zo:l,removedBatchIds:o,addedBatchIds:c})))}))}))}function CR(n,e){const t=U(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Qo.newChangeBuffer({trackRemovals:!0});return(function(c,u,l,d){const p=l.batch,g=p.keys();let E=R.resolve();return g.forEach((S=>{E=E.next((()=>d.getEntry(u,S))).next((N=>{const k=l.docVersions.get(S);L(k!==null,48541),N.version.compareTo(k)<0&&(p.applyToRemoteDocument(N,l),N.isValidDocument()&&(N.setReadTime(l.commitVersion),d.addEntry(N)))}))})),E.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=Q();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function C_(n){const e=U(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.g_.getLastRemoteSnapshotVersion(t)))}function xR(n,e){const t=U(n),r=e.snapshotVersion;let s=t.$o;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Qo.newChangeBuffer({trackRemovals:!0});s=t.$o;const c=[];e.targetChanges.forEach(((d,p)=>{const g=s.get(p);if(!g)return;c.push(t.g_.removeMatchingKeys(i,d.removedDocuments,p).next((()=>t.g_.addMatchingKeys(i,d.addedDocuments,p))));let E=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?E=E.withResumeToken(me.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):d.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(d.resumeToken,r)),s=s.insert(p,E),(function(N,k,q){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=SR?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0})(g,E,d)&&c.push(t.g_.updateTargetData(i,E))}));let u=be(),l=Q();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),c.push(x_(i,o,e.documentUpdates).next((d=>{u=d.jo,l=d.Ho}))),!r.isEqual(z.min())){const d=t.g_.getLastRemoteSnapshotVersion(i).next((p=>t.g_.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(d)}return R.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,l))).next((()=>u))})).then((i=>(t.$o=s,i)))}function x_(n,e,t){let r=Q(),s=Q();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=be();return t.forEach(((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(z.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):O(ih,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)})),{jo:o,Ho:s}}))}function DR(n,e){const t=U(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Nn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function Cs(n,e){const t=U(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.g_.getTargetData(r,e).next((i=>i?(s=i,R.resolve(s)):t.g_.allocateTargetId(r).next((o=>(s=new Lt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.$o=t.$o.insert(r.targetId,r),t.Ko.set(e,r.targetId)),r}))}async function xs(n,e,t){const r=U(n),s=r.$o.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Yn(o))throw o;O(ih,`Failed to update sequence numbers for target ${e}: ${o}`)}r.$o=r.$o.remove(e),r.Ko.delete(s.target)}function Ma(n,e,t){const r=U(n);let s=z.min(),i=Q();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,l,d){const p=U(u),g=p.Ko.get(d);return g!==void 0?R.resolve(p.$o.get(g)):p.g_.getTargetData(l,d)})(r,o,Te(e)?e:He(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.qo.getDocumentsMatchingQuery(o,e,t?s:z.min(),t?i:Q()))).next((c=>(N_(r,c),{documents:c,Jo:i})))))}function D_(n,e){const t=U(n),r=U(t.g_),s=t.$o.get(e);return s?Promise.resolve(s.target??null):t.persistence.runTransaction("Get target data","readonly",(i=>r.dt(i,e).next((o=>o?.target??null))))}function ju(n,e){const t=U(n),r=t.Wo.get(e)||z.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.Qo.getAllFromCollectionGroup(s,e,vm(r,ps),Number.MAX_SAFE_INTEGER))).then((s=>(N_(t,s),s)))}function N_(n,e){e.forEach(((t,r)=>{const s=r.key.getCollectionGroup(),i=n.Wo.get(s)||z.min();r.readTime.compareTo(i)>0&&n.Wo.set(s,r.readTime)}))}async function NR(n,e,t,r){const s=U(n);let i=Q(),o=be();for(const l of t){const d=e.Yo(l.metadata.name);l.document&&(i=i.add(d));const p=e.Zo(l);p.setReadTime(e.Xo(l.metadata.readTime)),o=o.insert(d,p)}const c=s.Qo.newChangeBuffer({trackRemovals:!0}),u=await Cs(s,(function(d){return He(js(Y.fromString(`__bundle__/docs/${d}`)))})(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(l=>x_(l,c,o).next((d=>(c.apply(l),d))).next((d=>s.g_.removeMatchingKeysForTargetId(l,u.targetId).next((()=>s.g_.addMatchingKeys(l,i,u.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(l,d.jo,d.Ho))).next((()=>d.jo))))))}async function kR(n,e,t=Q()){const r=await Cs(n,He(pc(e.bundledQuery))),s=U(n);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=Re(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.w_.saveNamedQuery(i,e);const c=r.withResumeToken(me.EMPTY_BYTE_STRING,o);return s.$o=s.$o.insert(c.targetId,c),s.g_.updateTargetData(i,c).next((()=>s.g_.removeMatchingKeysForTargetId(i,r.targetId))).next((()=>s.g_.addMatchingKeys(i,t,r.targetId))).next((()=>s.w_.saveNamedQuery(i,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_="firestore_clients";function sp(n,e){return`${k_}_${n}_${e}`}const O_="firestore_mutations";function ip(n,e,t){let r=`${O_}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const L_="firestore_targets";function uu(n,e){return`${L_}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="SharedClientState";class Fa{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static ea(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new D(s.error.code,s.error.message))),o?new Fa(e,t,s.state,i):(Ae(xt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}ta(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class qi{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static ea(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new D(r.error.code,r.error.message))),i?new qi(e,r.state,s):(Ae(xt,`Failed to parse target state for ID '${e}': ${t}`),null)}ta(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ua{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static ea(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=El();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=Sm(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new Ua(e,i):(Ae(xt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class oh{constructor(e,t){this.clientId=e,this.onlineState=t}static ea(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new oh(t.clientId,t.onlineState):(Ae(xt,`Failed to parse online state: ${e}`),null)}}class zu{constructor(){this.activeTargetIds=El()}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class lu{constructor(e,t,r,s,i){this.window=e,this.Tn=t,this.persistenceKey=r,this.ia=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.sa=this._a.bind(this),this.oa=new fe(W),this.started=!1,this.aa=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.ua=sp(this.persistenceKey,this.ia),this.ca=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.oa=this.oa.insert(this.ia,new zu),this.la=new RegExp(`^${k_}_${o}_([^_]*)$`),this.Ea=new RegExp(`^${O_}_${o}_(\\d+)(?:_(.*))?$`),this.ha=new RegExp(`^${L_}_${o}_(\\d+)$`),this.Ta=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this.Pa=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.sa)}static C(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.po();for(const r of e){if(r===this.ia)continue;const s=this.getItem(sp(this.persistenceKey,r));if(s){const i=Ua.ea(r,s);i&&(this.oa=this.oa.insert(i.clientId,i))}}this.Ra();const t=this.storage.getItem(this.Ta);if(t){const r=this.Ia(t);r&&this.Aa(r)}for(const r of this.aa)this._a(r);this.aa=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.ca,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Va(this.oa)}isActiveQueryTarget(e){let t=!1;return this.oa.forEach(((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.da(e,"pending")}updateMutationState(e,t,r){this.da(e,t,r),this.fa(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(uu(this.persistenceKey,e));if(s){const i=qi.ea(e,s);i&&(r=i.state)}}return t&&this.ma.na(e),this.Ra(),r}removeLocalQueryTarget(e){this.ma.ra(e),this.Ra()}isLocalQueryTarget(e){return this.ma.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(uu(this.persistenceKey,e))}updateQueryState(e,t,r){this.pa(e,t,r)}handleUserChange(e,t,r){t.forEach((s=>{this.fa(s)})),this.currentUser=e,r.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.ga(e)}notifyBundleLoaded(e){this.ya(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.sa),this.removeItem(this.ua),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return O(xt,"READ",e,t),t}setItem(e,t){O(xt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){O(xt,"REMOVE",e),this.storage.removeItem(e)}_a(e){const t=e;if(t.storageArea===this.storage){if(O(xt,"EVENT",t.key,t.newValue),t.key===this.ua)return void Ae("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Tn.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.la.test(t.key)){if(t.newValue==null){const r=this.wa(t.key);return this.ba(r,null)}{const r=this.va(t.key,t.newValue);if(r)return this.ba(r.clientId,r)}}else if(this.Ea.test(t.key)){if(t.newValue!==null){const r=this.Sa(t.key,t.newValue);if(r)return this.Da(r)}}else if(this.ha.test(t.key)){if(t.newValue!==null){const r=this.xa(t.key,t.newValue);if(r)return this.Ca(r)}}else if(t.key===this.Ta){if(t.newValue!==null){const r=this.Ia(t.newValue);if(r)return this.Aa(r)}}else if(t.key===this.ca){const r=(function(i){let o=rt.ce;if(i!=null)try{const c=JSON.parse(i);L(typeof c=="number",30636,{Fa:i}),o=c}catch(c){Ae(xt,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);r!==rt.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.Pa){const r=this.Oa(t.newValue);await Promise.all(r.map((s=>this.syncEngine.Ma(s))))}}}else this.aa.push(t)}))}}get ma(){return this.oa.get(this.ia)}Ra(){this.setItem(this.ua,this.ma.ta())}da(e,t,r){const s=new Fa(this.currentUser,e,t,r),i=ip(this.persistenceKey,this.currentUser,e);this.setItem(i,s.ta())}fa(e){const t=ip(this.persistenceKey,this.currentUser,e);this.removeItem(t)}ga(e){const t={clientId:this.ia,onlineState:e};this.storage.setItem(this.Ta,JSON.stringify(t))}pa(e,t,r){const s=uu(this.persistenceKey,e),i=new qi(e,t,r);this.setItem(s,i.ta())}ya(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Pa,t)}wa(e){const t=this.la.exec(e);return t?t[1]:null}va(e,t){const r=this.wa(e);return Ua.ea(r,t)}Sa(e,t){const r=this.Ea.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return Fa.ea(new Fe(i),s,t)}xa(e,t){const r=this.ha.exec(e),s=Number(r[1]);return qi.ea(s,t)}Ia(e){return oh.ea(e)}Oa(e){return JSON.parse(e)}async Da(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Na(e.batchId,e.state,e.error);O(xt,`Ignoring mutation for non-active user ${e.user.uid}`)}Ca(e){return this.syncEngine.La(e.targetId,e.state,e.error)}ba(e,t){const r=t?this.oa.insert(e,t):this.oa.remove(e),s=this.Va(this.oa),i=this.Va(r),o=[],c=[];return i.forEach((u=>{s.has(u)||o.push(u)})),s.forEach((u=>{i.has(u)||c.push(u)})),this.syncEngine.Ba(o,c).then((()=>{this.oa=r}))}Aa(e){this.oa.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Va(e){let t=El();return e.forEach(((r,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class M_{constructor(){this.Ua=new zu,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,r){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new zu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F_(){return typeof window<"u"?window:null}function ma(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OR{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(e){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,e==="Online"&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(Ae(t),this.Ka=!1):O("OnlineStateTracker",t)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt="RemoteStore";class LR{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new rn(1e3),this.eu=new rn(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt((o=>{r.enqueueAndForget((async()=>{Zn(this)&&(O(zt,"Restarting streams for network reachability change."),await(async function(u){const l=U(u);l.tu.add(4),await Ws(l),l.iu.set("Unknown"),l.tu.delete(4),await Ro(l)})(this))}))})),this.iu=new OR(r,s)}}async function Ro(n){if(Zn(n))for(const e of n.nu)await e(!0)}async function Ws(n){for(const e of n.nu)await e(!1)}function Gu(n,e){return n.Ya.get(e)||void 0}function Ic(n,e){const t=U(n),r=Gu(t,e.targetId);if(r!==void 0&&t.Ja.has(r))return;const s=(function(c,u){const l=Gu(c,u);l!==void 0&&c.Za.delete(l);const d=(function(g,E){return E%2!=0?g.eu.next():g.Xa.next()})(c,u);return c.Ya.set(u,d),c.Za.set(d,u),d})(t,e.targetId);O(zt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new Lt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ja.set(s,i),uh(t)?ch(t):Qs(t).Fn()&&ah(t,i)}function Ds(n,e){const t=U(n),r=Qs(t),s=Gu(t,e);O(zt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ja.delete(s),t.Ya.delete(e),t.Za.delete(s),r.Fn()&&U_(t,s),t.Ja.size===0&&(r.Fn()?r.Nn():Zn(t)&&t.iu.set("Unknown"))}function ah(n,e){if(n.su.We(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=n.Za.get(e.targetId);if(t===void 0)return void O(zt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}Qs(n).jn(e)}function U_(n,e){n.su.We(e),Qs(n).Hn(e)}function ch(n){n.su=new $E({getRemoteKeysForTarget:e=>{const t=n.Za.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):Q()},dt:e=>n.Ja.get(e)||null,Tt:()=>n.datastore.serializer.databaseId}),Qs(n).start(),n.iu.Wa()}function uh(n){return Zn(n)&&!Qs(n).Cn()&&n.Ja.size>0}function Zn(n){return U(n).tu.size===0}function B_(n){n.su=void 0}async function MR(n){n.iu.set("Online")}async function FR(n){n.Ja.forEach(((e,t)=>{ah(n,e)}))}async function UR(n,e){B_(n),uh(n)?(n.iu.za(e),ch(n)):n.iu.set("Unknown")}async function BR(n,e,t){if(n.iu.set("Online"),e instanceof wg&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds){if(s.Ja.has(c)){const u=s.Za.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.Ya.delete(u),s.Za.delete(c)),s.Ja.delete(c)}s.su.removeTarget(c)}})(n,e)}catch(r){O(zt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ba(n,r)}else if(e instanceof ha?n.su.et(e):e instanceof Ig?n.su.ot(e):n.su.rt(e),!t.isEqual(z.min()))try{const r=await C_(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.su.Rt(o);c.targetChanges.forEach(((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.Ja.get(d);p&&i.Ja.set(d,p.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,d)=>{const p=i.Ja.get(l);if(!p)return;i.Ja.set(l,p.withResumeToken(me.EMPTY_BYTE_STRING,p.snapshotVersion)),U_(i,l);const g=new Lt(p.target,l,d,p.sequenceNumber);ah(i,g)}));const u=(function(d,p){const g=new Map;p.targetChanges.forEach(((S,N)=>{const k=d.Za.get(N);k!==void 0&&g.set(k,S)}));let E=new fe(W);return p.targetMismatches.forEach(((S,N)=>{const k=d.Za.get(S);k!==void 0&&(E=E.insert(k,N))})),new zs(p.snapshotVersion,g,E,p.documentUpdates,p.augmentedDocumentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){O(zt,"Failed to raise snapshot:",r),await Ba(n,r)}}async function Ba(n,e,t){if(!Yn(e))throw e;n.tu.add(1),await Ws(n),n.iu.set("Offline"),t||(t=()=>C_(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{O(zt,"Retrying IndexedDB access"),await t(),n.tu.delete(1),await Ro(n)}))}function q_(n,e){return e().catch((t=>Ba(n,t,e)))}async function Hs(n){const e=U(n),t=Kn(e);let r=e.Ha.length>0?e.Ha[e.Ha.length-1].batchId:Nn;for(;qR(e);)try{const s=await DR(e.localStore,r);if(s===null){e.Ha.length===0&&t.Nn();break}r=s.batchId,$R(e,s)}catch(s){await Ba(e,s)}$_(e)&&j_(e)}function qR(n){return Zn(n)&&n.Ha.length<10}function $R(n,e){n.Ha.push(e);const t=Kn(n);t.Fn()&&t.Jn&&t.Yn(e.mutations)}function $_(n){return Zn(n)&&!Kn(n).Cn()&&n.Ha.length>0}function j_(n){Kn(n).start()}async function jR(n){Kn(n).er()}async function zR(n){const e=Kn(n);for(const t of n.Ha)e.Yn(t.mutations)}async function GR(n,e,t){const r=n.Ha.shift(),s=Jl.from(r,e,t);await q_(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Hs(n)}async function KR(n,e){e&&Kn(n).Jn&&await(async function(r,s){if((function(o){return fg(o)&&o!==b.ABORTED})(s.code)){const i=r.Ha.shift();Kn(r).Mn(),await q_(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Hs(r)}})(n,e),$_(n)&&j_(n)}async function op(n,e){const t=U(n);t.asyncQueue.verifyOperationInProgress(),O(zt,"RemoteStore received new credentials");const r=Zn(t);t.tu.add(3),await Ws(t),r&&t.iu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.tu.delete(3),await Ro(t)}async function Ku(n,e){const t=U(n);e?(t.tu.delete(2),await Ro(t)):e||(t.tu.add(2),await Ws(t),t.iu.set("Unknown"))}function Qs(n){return n._u||(n._u=(function(t,r,s){const i=U(t);return i.nr(),new ov(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:MR.bind(null,n),zt:FR.bind(null,n),Ht:UR.bind(null,n),zn:BR.bind(null,n)}),n.nu.push((async e=>{e?(n._u.Mn(),uh(n)?ch(n):n.iu.set("Unknown")):(await n._u.stop(),B_(n))}))),n._u}function Kn(n){return n.ou||(n.ou=(function(t,r,s){const i=U(t);return i.nr(),new av(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:()=>Promise.resolve(),zt:jR.bind(null,n),Ht:KR.bind(null,n),Zn:zR.bind(null,n),Xn:GR.bind(null,n)}),n.nu.push((async e=>{e?(n.ou.Mn(),await Hs(n)):(await n.ou.stop(),n.Ha.length>0&&(O(zt,`Stopping write stream with ${n.Ha.length} pending writes`),n.Ha=[]))}))),n.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Be,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new lh(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Js(n,e){if(Ae("AsyncQueue",`${e}: ${n}`),Yn(n))return new D(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{static emptySet(e){return new On(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||M.comparator(t.key,r.key):(t,r)=>M.comparator(t.key,r.key),this.keyedMap=fr(),this.sortedSet=new fe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof On)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new On;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(){this.au=new fe(M.comparator)}track(e){const t=e.doc.key,r=this.au.get(t);r?e.type!==0&&r.type===3?this.au=this.au.insert(t,e):e.type===3&&r.type!==1?this.au=this.au.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.au=this.au.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.au=this.au.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.au=this.au.remove(t):e.type===1&&r.type===2?this.au=this.au.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.au=this.au.insert(t,{type:2,doc:e.doc}):$(63341,{ft:e,uu:r}):this.au=this.au.insert(t,e)}cu(){const e=[];return this.au.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Nr{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new Nr(e,t,On.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&dc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WR{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((e=>e.Tu()))}}class HR{constructor(){this.queries=cp(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(t,r){const s=U(t),i=s.queries;s.queries=cp(),i.forEach(((o,c)=>{for(const u of c.Eu)u.onError(r)}))})(this,new D(b.ABORTED,"Firestore shutting down"))}}function cp(){return new cn((n=>f_(n)),dc)}async function hh(n,e){const t=U(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.hu()&&e.Tu()&&(r=2):(i=new WR,r=e.Tu()?0:1);try{switch(r){case 0:i.lu=await t.onListen(s,!0);break;case 1:i.lu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Js(o,`Initialization of query '${Te(e.query)?Xt(e.query):Mi(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Eu.push(e),e.Ru(t.onlineState),i.lu&&e.Iu(i.lu)&&fh(t)}async function dh(n,e){const t=U(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Eu.indexOf(e);o>=0&&(i.Eu.splice(o,1),i.Eu.length===0?s=e.Tu()?0:1:!i.hu()&&e.Tu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function QR(n,e){const t=U(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Eu)c.Iu(s)&&(r=!0);o.lu=s}}r&&fh(t)}function JR(n,e,t){const r=U(n),s=r.queries.get(e);if(s)for(const i of s.Eu)i.onError(t);r.queries.delete(e)}function fh(n){n.Pu.forEach((e=>{e.next()}))}var Wu;(function(n){n.Default="default",n.Cache="cache"})(Wu||(Wu={}));class ph{constructor(e,t,r){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Nr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){if(!e.fromCache||!this.Tu())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}fu(e){if(e.docChanges.length>0)return!0;const t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}pu(e){e=Nr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==Wu.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_{constructor(e,t){this.gu=e,this.byteLength=t}yu(){return"metadata"in this.gu}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e){this.serializer=e}Yo(e){return Bt(this.serializer,e)}Zo(e){return e.metadata.exists?ic(this.serializer,e.document,!1):_e.newNoDocument(this.Yo(e.metadata.name),this.Xo(e.metadata.readTime))}Xo(e){return Re(e)}}class mh{constructor(e,t){this.wu=e,this.serializer=t,this.bu=[],this.vu=[],this.collectionGroups=new Set,this.progress=G_(e)}get queries(){return this.bu}get documents(){return this.vu}o(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.gu.namedQuery)this.bu.push(e.gu.namedQuery);else if(e.gu.documentMetadata){this.vu.push({metadata:e.gu.documentMetadata}),e.gu.documentMetadata.exists||++t;const r=Y.fromString(e.gu.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.gu.document&&(this.vu[this.vu.length-1].document=e.gu.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}Du(e){const t=new Map,r=new up(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.Yo(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||Q()).add(i);t.set(o,c)}}return t}async xu(e){const t=await NR(e,new up(this.serializer),this.vu,this.wu.id),r=this.Du(this.documents);for(const s of this.bu)await kR(e,s,r.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Cu:this.collectionGroups,Fu:t}}}function G_(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e){this.key=e}}class W_{constructor(e){this.key=e}}class H_{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=Q(),this.mutatedKeys=Q(),this.Lu=Te(e)?$u(e):Tl(e),this.Bu=new On(this.Lu)}get Uu(){return this.Ou}ku(e,t){const r=t?t.qu:new ap,s=t?t.Bu:this.Bu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const[u,l]=this.$u(this.query,s);e.inorderTraversal(((p,g)=>{const E=s.get(p),S=E_(this.query,g)?g:null,N=!!E&&this.mutatedKeys.has(E.key),k=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let q=!1;E&&S?E.data.isEqual(S.data)?N!==k&&(r.track({type:3,doc:S}),q=!0):this.Ku(E,S)||(r.track({type:2,doc:S}),q=!0,(u&&this.Lu(S,u)>0||l&&this.Lu(S,l)<0)&&(c=!0)):!E&&S?(r.track({type:0,doc:S}),q=!0):E&&!S&&(r.track({type:1,doc:E}),q=!0,(u||l)&&(c=!0)),q&&(S?(o=o.add(S),i=k?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}));const d=this.Wu(this.query);if(d)if(Te(this.query)){const p=[];o.forEach((S=>p.push(S)));const g=T_(this.query,p);let E=new On($u(this.query));for(const S of g)E=E.add(S);o.forEach((S=>{E.has(S.key)||(i=i.delete(S.key),r.track({type:1,doc:S}))})),o=E}else{const p=this.Qu(this.query);for(;o.size>d;){const g=p==="F"?o.last():o.first();o=o.delete(g.key),i=i.delete(g.key),r.track({type:1,doc:g})}}return{Bu:o,qu:r,Uo:c,mutatedKeys:i}}Wu(e){return Te(e)?iu(e)?.limit:e.limit||void 0}Qu(e){if(Te(e)){const t=iu(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){if(Te(e)){const r=iu(e)?.limit;return[t.size===r?t.last():null,null]}return[e.limitType==="F"&&t.size===this.Wu(this.query)?t.last():null,e.limitType==="L"&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;const o=e.qu.cu();o.sort(((d,p)=>(function(E,S){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return $(20277,{ft:k})}};return N(E)-N(S)})(d.type,p.type)||this.Lu(d.doc,p.doc))),this.Gu(r),s=s??!1;const c=t&&!s?this.zu():[],u=this.Nu.size===0&&this.current&&!s?1:0,l=u!==this.Mu;return this.Mu=u,o.length!==0||l?{snapshot:new Nr(this.query,e.Bu,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:c}:{ju:c}}Ru(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new ap,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach((t=>this.Ou=this.Ou.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ou=this.Ou.delete(t))),this.current=e.current)}zu(){if(!this.current)return[];const e=this.Nu;this.Nu=Q(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const t=[];return e.forEach((r=>{this.Nu.has(r)||t.push(new W_(r))})),this.Nu.forEach((r=>{e.has(r)||t.push(new K_(r))})),t}Ju(e){this.Ou=e.Jo,this.Nu=Q();const t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return Nr.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const er="SyncEngine";class YR{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class XR{constructor(e){this.key=e,this.Zu=!1}}class ZR{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Xu={},this.ec=new cn((c=>f_(c)),dc),this.tc=new Map,this.nc=new Set,this.rc=new fe(M.comparator),this.sc=new Map,this._c=new eh,this.oc={},this.ac=new Map,this.uc=rn.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function eP(n,e,t=!0){const r=wc(n);let s;const i=r.ec.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await Q_(r,e,t,!0),s}async function tP(n,e){const t=wc(n);await Q_(t,e,!0,!1)}async function Q_(n,e,t,r){const s=await Cs(n.localStore,Te(e)?e:He(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await gh(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Ic(n.remoteStore,s),c}async function gh(n,e,t,r,s){n.lc=(p,g,E)=>(async function(N,k,q,G){let j=k.view.ku(q);j.Uo&&(j=await Ma(N.localStore,k.query,!1).then((({documents:w})=>k.view.ku(w,j))));const J=G&&G.targetChanges.get(k.targetId),se=G&&G.targetMismatches.get(k.targetId)!=null,ee=k.view.applyChanges(j,N.isPrimaryClient,J,se);return Hu(N,k.targetId,ee.ju),ee.snapshot})(n,p,g,E);const i=await Ma(n.localStore,e,!0),o=new H_(e,i.Jo),c=o.ku(i.documents),u=_o.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);Hu(n,t,l.ju);const d=new YR(e,t,o);return n.ec.set(e,d),n.tc.has(t)?n.tc.get(t).push(e):n.tc.set(t,[e]),l.snapshot}async function nP(n,e,t){const r=U(n),s=r.ec.get(e),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter((o=>!dc(o,e)))),void r.ec.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await xs(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ds(r.remoteStore,s.targetId),Ns(r,s.targetId)})).catch(Jn)):(Ns(r,s.targetId),await xs(r.localStore,s.targetId,!0))}async function rP(n,e){const t=U(n),r=t.ec.get(e),s=t.tc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ds(t.remoteStore,r.targetId))}async function sP(n,e,t){const r=wh(n);try{const s=await(function(o,c){const u=U(o),l=oe.now(),d=c.reduce(((E,S)=>E.add(S.key)),Q());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",(E=>{let S=be(),N=Q();return u.Qo.getEntries(E,d).next((k=>{S=k,S.forEach(((q,G)=>{G.isValidDocument()||(N=N.add(q))}))})).next((()=>u.localDocuments.getOverlayedDocuments(E,S))).next((k=>{p=k;const q=[];for(const G of c){const j=TE(G,p.get(G.key).overlayedDocument);j!=null&&q.push(new on(G.key,j,Hm(j.value.mapValue),ye.exists(!0)))}return u.mutationQueue.addMutationBatch(E,l,q,c)})).next((k=>{g=k;const q=k.applyToLocalDocumentSet(p,N);return u.documentOverlayCache.saveOverlays(E,k.batchId,q)}))})).then((()=>({batchId:g.batchId,changes:gg(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let l=o.oc[o.currentUser.toKey()];l||(l=new fe(W)),l=l.insert(c,u),o.oc[o.currentUser.toKey()]=l})(r,s.batchId,t),await un(r,s.changes),await Hs(r.remoteStore)}catch(s){const i=Js(s,"Failed to persist write");t.reject(i)}}async function J_(n,e){const t=U(n);try{const r=await xR(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.sc.get(i);o&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Zu=!0:s.modifiedDocuments.size>0?L(o.Zu,14607):s.removedDocuments.size>0&&(L(o.Zu,42227),o.Zu=!1))})),await un(t,r,e)}catch(r){await Jn(r)}}function lp(n,e,t){const r=U(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ec.forEach(((i,o)=>{const c=o.view.Ru(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=U(o);u.onlineState=c;let l=!1;u.queries.forEach(((d,p)=>{for(const g of p.Eu)g.Ru(c)&&(l=!0)})),l&&fh(u)})(r.eventManager,e),s.length&&r.Xu.zn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function iP(n,e,t){const r=U(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.sc.get(e),i=s&&s.key;if(i){let o=new fe(M.comparator);o=o.insert(i,_e.newNoDocument(i,z.min()));const c=Q().add(i),u=new zs(z.min(),new Map,new fe(W),o,be(),c);await J_(r,u),r.rc=r.rc.remove(i),r.sc.delete(e),Ih(r)}else await xs(r.localStore,e,!1).then((()=>Ns(r,e,t))).catch(Jn)}async function oP(n,e){const t=U(n),r=e.batch.batchId;try{const s=await CR(t.localStore,e);yh(t,r,null),_h(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await un(t,s)}catch(s){await Jn(s)}}async function aP(n,e,t){const r=U(n);try{const s=await(function(o,c){const u=U(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next((p=>(L(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(l,p)))).next((()=>u.mutationQueue.performConsistencyCheck(l))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d))).next((()=>u.localDocuments.getDocuments(l,d)))}))})(r.localStore,e);yh(r,e,t),_h(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await un(r,s)}catch(s){await Jn(s)}}async function cP(n,e){const t=U(n);Zn(t.remoteStore)||O(er,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const c=U(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u)))})(t.localStore);if(r===Nn)return void e.resolve();const s=t.ac.get(r)||[];s.push(e),t.ac.set(r,s)}catch(r){const s=Js(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function _h(n,e){(n.ac.get(e)||[]).forEach((t=>{t.resolve()})),n.ac.delete(e)}function yh(n,e,t){const r=U(n);let s=r.oc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.oc[r.currentUser.toKey()]=s}}function Ns(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.tc.get(e))n.ec.delete(r),t&&n.Xu.Ec(r,t);n.tc.delete(e),n.isPrimaryClient&&n._c.s_(e).forEach((r=>{n._c.containsKey(r)||Y_(n,r)}))}function Y_(n,e){n.nc.delete(e.path.canonicalString());const t=n.rc.get(e);t!==null&&(Ds(n.remoteStore,t),n.rc=n.rc.remove(e),n.sc.delete(t),Ih(n))}function Hu(n,e,t){for(const r of t)r instanceof K_?(n._c.addReference(r.key,e),uP(n,r)):r instanceof W_?(O(er,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,e),n._c.containsKey(r.key)||Y_(n,r.key)):$(19791,{hc:r})}function uP(n,e){const t=e.key,r=t.path.canonicalString();n.rc.get(t)||n.nc.has(r)||(O(er,"New document in limbo: "+t),n.nc.add(r),Ih(n))}function Ih(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const e=n.nc.values().next().value;n.nc.delete(e);const t=new M(Y.fromString(e)),r=n.uc.next();n.sc.set(r,new XR(t)),n.rc=n.rc.insert(t,r),Ic(n.remoteStore,new Lt(He(js(t.path)),r,"TargetPurposeLimboResolution",rt.ce))}}async function un(n,e,t){const r=U(n),s=[],i=[],o=[];r.ec.isEmpty()||(r.ec.forEach(((c,u)=>{o.push(r.lc(u,e,t).then((l=>{if((l||t)&&r.isPrimaryClient){const d=l?!l.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,d?"current":"not-current")}if(l){s.push(l);const d=sh.vo(u.targetId,l);i.push(d)}})))})),await Promise.all(o),r.Xu.zn(s),await(async function(u,l){const d=U(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>R.forEach(l,(g=>R.forEach(g.wo,(E=>d.persistence.referenceDelegate.addReference(p,g.targetId,E))).next((()=>R.forEach(g.bo,(E=>d.persistence.referenceDelegate.removeReference(p,g.targetId,E)))))))))}catch(p){if(!Yn(p))throw p;O(ih,"Failed to update sequence numbers: "+p)}for(const p of l){const g=p.targetId;if(!p.fromCache){const E=d.$o.get(g),S=E.snapshotVersion,N=E.withLastLimboFreeSnapshotVersion(S);d.$o=d.$o.insert(g,N)}}})(r.localStore,i))}async function lP(n,e){const t=U(n);if(!t.currentUser.isEqual(e)){O(er,"User change. New user:",e.toKey());const r=await V_(t.localStore,e);t.currentUser=e,(function(i,o){i.ac.forEach((c=>{c.forEach((u=>{u.reject(new D(b.CANCELLED,o))}))})),i.ac.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await un(t,r.zo)}}function hP(n,e){const t=U(n),r=t.sc.get(e);if(r&&r.Zu)return Q().add(r.key);{let s=Q();const i=t.tc.get(e);if(!i)return s;for(const o of i??[]){const c=t.ec.get(o);s=s.unionWith(c.view.Uu)}return s}}async function dP(n,e){const t=U(n),r=await Ma(t.localStore,e.query,!0),s=e.view.Ju(r);return t.isPrimaryClient&&Hu(t,e.targetId,s.ju),s}async function fP(n,e){const t=U(n);return ju(t.localStore,e).then((r=>un(t,r)))}async function pP(n,e,t,r){const s=U(n),i=await(function(c,u){const l=U(c),d=U(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(p=>d.ps(p,u).next((g=>g?l.localDocuments.getDocuments(p,g):R.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await Hs(s.remoteStore):t==="acknowledged"||t==="rejected"?(yh(s,e,r||null),_h(s,e),(function(c,u){U(U(c).mutationQueue).bs(u)})(s.localStore,e)):$(6720,"Unknown batchState",{Tc:t}),await un(s,i)):O(er,"Cannot apply mutation batch with id: "+e)}async function mP(n,e){const t=U(n);if(wc(t),wh(t),e===!0&&t.cc!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await hp(t,r.toArray());t.cc=!0,await Ku(t.remoteStore,!0);for(const i of s)Ic(t.remoteStore,i)}else if(e===!1&&t.cc!==!1){const r=[];let s=Promise.resolve();t.tc.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then((()=>(Ns(t,o),xs(t.localStore,o,!0)))),Ds(t.remoteStore,o)})),await s,await hp(t,r),(function(o){const c=U(o);c.sc.forEach(((u,l)=>{Ds(c.remoteStore,l)})),c._c.__(),c.sc=new Map,c.rc=new fe(M.comparator)})(t),t.cc=!1,await Ku(t.remoteStore,!1)}}async function hp(n,e,t){const r=U(n),s=[],i=[];for(const o of e){let c;const u=r.tc.get(o);if(u&&u.length!==0){c=await Cs(r.localStore,Te(u[0])?u[0]:He(u[0]));for(const l of u){const d=r.ec.get(l),p=await dP(r,d);p.snapshot&&i.push(p.snapshot)}}else{const l=await D_(r.localStore,o);c=await Cs(r.localStore,l),await gh(r,X_(l),o,!1,c.resumeToken)}s.push(c)}return r.Xu.zn(i),s}function X_(n){return Wt(n)?n:ug(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function gP(n){return(function(t){return U(U(t).persistence).po()})(U(n).localStore)}async function _P(n,e,t,r){const s=U(n);if(s.cc)return void O(er,"Ignoring unexpected query state notification.");const i=s.tc.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{let o;if(Te(i[0]))switch(Yt(i[0])){case"collection_group":case"collection":o=await ju(s.localStore,o_(i[0]));break;case"documents":o=await(function(l,d){const p=U(l),g=Q(...xa(d).map((E=>M.fromPath(E))));return p.persistence.runTransaction("Get documents for pipeline","readonly",(E=>p.Qo.getEntries(E,g))).then((E=>E))})(s.localStore,i[0]);break;default:Ne(""),o=fr()}else o=await ju(s.localStore,(function(l){return l.collectionGroup||(l.path.length%2==1?l.path.lastSegment():l.path.get(l.path.length-2))})(i[0]));const c=zs.createSynthesizedRemoteEventForCurrentChange(e,t==="current",me.EMPTY_BYTE_STRING);await un(s,o,c);break}case"rejected":await xs(s.localStore,e,!0),Ns(s,e,r);break;default:$(64155,t)}}async function yP(n,e,t){const r=wc(n);if(r.cc){for(const s of e){if(r.tc.has(s)&&r.sharedClientState.isActiveQueryTarget(s)){O(er,"Adding an already active target "+s);continue}const i=await D_(r.localStore,s),o=await Cs(r.localStore,i);await gh(r,X_(i),o.targetId,!1,o.resumeToken),Ic(r.remoteStore,o)}for(const s of t)r.tc.has(s)&&await xs(r.localStore,s,!1).then((()=>{Ds(r.remoteStore,s),Ns(r,s)})).catch(Jn)}}function wc(n){const e=U(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=J_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=hP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=iP.bind(null,e),e.Xu.zn=QR.bind(null,e.eventManager),e.Xu.Ec=JR.bind(null,e.eventManager),e}function wh(n){const e=U(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=oP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=aP.bind(null,e),e}function IP(n,e,t){const r=U(n);(async function(i,o,c){try{const u=await o.getMetadata();if(await(function(E,S){const N=U(E),k=Re(S.createTime);return N.persistence.runTransaction("hasNewerBundle","readonly",(q=>N.w_.getBundleMetadata(q,S.id))).then((q=>!!q&&q.createTime.compareTo(k)>=0))})(i.localStore,u))return await o.close(),c._completeWith((function(E){return{taskState:"Success",documentsLoaded:E.totalDocuments,bytesLoaded:E.totalBytes,totalDocuments:E.totalDocuments,totalBytes:E.totalBytes}})(u)),Promise.resolve(new Set);c._updateProgress(G_(u));const l=new mh(u,o.serializer);let d=await o.Pc();for(;d;){const g=await l.o(d);g&&c._updateProgress(g),d=await o.Pc()}const p=await l.xu(i.localStore);return await un(i,p.Fu,void 0),await(function(E,S){const N=U(E);return N.persistence.runTransaction("Save bundle","readwrite",(k=>N.w_.saveBundleMetadata(k,S)))})(i.localStore,u),c._completeWith(p.progress),Promise.resolve(p.Cu)}catch(u){return Ne(er,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then((s=>{r.sharedClientState.notifyBundleLoaded(s)}))}class ks{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ur(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){return S_(this.persistence,new b_,e.initialUser,this.serializer)}Ic(e){return new th(yc.C_,this.serializer)}Rc(e){return new M_}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ks.provider={build:()=>new ks};class Th extends ks{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){L(this.persistence.referenceDelegate instanceof La,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Bg(r,e.asyncQueue,t)}Ic(e){const t=this.cacheSizeBytes!==void 0?Ge.withCacheSize(this.cacheSizeBytes):Ge.DEFAULT;return new th((r=>La.C_(r,t)),this.serializer)}}class Eh extends ks{constructor(e,t,r){super(),this.fc=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.fc.initialize(this,e),await wh(this.fc.syncEngine),await Hs(this.fc.remoteStore),await this.persistence._o((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}Ac(e){return S_(this.persistence,new b_,e.initialUser,this.serializer)}Vc(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Bg(r,e.asyncQueue,t)}dc(e,t){const r=new LT(t,this.persistence);return new OT(e.asyncQueue,r)}Ic(e){const t=rh(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Ge.withCacheSize(this.cacheSizeBytes):Ge.DEFAULT;return new nh(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,F_(),ma(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Rc(e){return new M_}}class Z_ extends Eh{constructor(e,t){super(e,t,!1),this.fc=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.fc.syncEngine;this.sharedClientState instanceof lu&&(this.sharedClientState.syncEngine={Na:pP.bind(null,t),La:_P.bind(null,t),Ba:yP.bind(null,t),po:gP.bind(null,t),Ma:fP.bind(null,t)},await this.sharedClientState.start()),await this.persistence._o((async r=>{await mP(this.fc.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Rc(e){const t=F_();if(!lu.C(t))throw new D(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=rh(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new lu(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Wn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>lp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=lP.bind(null,this.syncEngine),await Ku(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new HR})()}createDatastore(e){const t=Ur(e.databaseInfo.databaseId),r=iv(e.databaseInfo);return lv(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new LR(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>lp(this.syncEngine,t,0)),(function(){return Cf.C()?new Cf:new tv})())}createSyncEngine(e,t){return(function(s,i,o,c,u,l,d){const p=new ZR(s,i,o,c,u,l);return d&&(p.cc=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=U(t);O(zt,"RemoteStore shutting down."),r.tu.add(5),await Ws(r),r.ru.shutdown(),r.iu.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Wn.provider={build:()=>new Wn};function dp(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):Ae("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wP{constructor(e,t){this.yc=e,this.serializer=t,this.metadata=new Be,this.buffer=new Uint8Array,this.wc=(function(){return new TextDecoder("utf-8")})(),this.bc().then((r=>{r&&r.yu()?this.metadata.resolve(r.gu.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r?.gu)}`))}),(r=>this.metadata.reject(r)))}close(){return this.yc.cancel()}async getMetadata(){return this.metadata.promise}async Pc(){return await this.getMetadata(),this.bc()}async bc(){const e=await this.vc();if(e===null)return null;const t=this.wc.decode(e),r=Number(t);isNaN(r)&&this.Sc(`length string (${t}) is not valid number`);const s=await this.Dc(r);return new z_(JSON.parse(s),e.length+r)}xc(){return this.buffer.findIndex((e=>e===123))}async vc(){for(;this.xc()<0&&!await this.Cc(););if(this.buffer.length===0)return null;const e=this.xc();e<0&&this.Sc("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Dc(e){for(;this.buffer.length<e;)await this.Cc()&&this.Sc("Reached the end of bundle when more is expected.");const t=this.wc.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Sc(e){throw this.yc.cancel(),new Error(`Invalid bundle format: ${e}`)}async Cc(){const e=await this.yc.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TP{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.Pc();if(!r||!r.yu())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r?.gu)}`);this.metadata=r;do r=this.Pc(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}t(){return this.elements}Pc(){if(this.cursor===this.bundleData.length)return null;const e=this.vc(),t=this.Dc(e);return new z_(JSON.parse(t),e)}Dc(e){if(this.cursor+e>this.bundleData.length)throw new D(b.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}vc(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let EP=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(b.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=U(s),c={documents:i.map((p=>Vs(o.serializer,p)))},u=await o.$t("BatchGetDocuments",o.serializer.databaseId,Y.emptyPath(),c,i.length),l=new Map;u.forEach((p=>{const g=WE(o.serializer,p);l.set(g.key.toString(),g)}));const d=[];return i.forEach((p=>{const g=l.get(p.toString());L(!!g,55234,{key:p}),d.push(g)})),d})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new $s(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const s=M.fromPath(r);this.mutations.push(new gl(s,this.precondition(s)))})),await(async function(r,s){const i=U(r),o={writes:s.map((c=>Zi(i.serializer,c)))};await i.Bt("Commit",i.serializer.databaseId,Y.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw $(50498,{Oc:e.constructor.name});t=z.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(b.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(z.min())?ye.exists(!1):ye.updateTime(t):ye.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(z.min()))throw new D(b.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ye.updateTime(t)}return ye.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vP{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Mc=r.maxAttempts,this.xn=new Pl(this.asyncQueue,"transaction_retry")}Nc(){this.Mc-=1,this.Lc()}Lc(){this.xn.mn((async()=>{const e=new EP(this.datastore),t=this.Bc(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Uc(s)}))))})).catch((r=>{this.Uc(r)}))}))}Bc(e){try{const t=this.updateFunction(e);return!fo(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Uc(e){this.Mc>0&&this.kc(e)?(this.Mc-=1,this.asyncQueue.enqueueAndForget((()=>(this.Lc(),Promise.resolve())))):this.deferred.reject(e)}kc(e){if(e?.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!fg(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn="FirestoreClient";class AP{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Fe.UNAUTHENTICATED,this.clientId=Qa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{O(Hn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(O(Hn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Be;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Js(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function hu(n,e){n.asyncQueue.verifyOperationInProgress(),O(Hn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await V_(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function fp(n,e){n.asyncQueue.verifyOperationInProgress();const t=await vh(n);O(Hn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>op(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>op(e.remoteStore,s))),n._onlineComponents=e}async function vh(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(Hn,"Using user provided OfflineComponentProvider");try{await hu(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Ne("Error using user provided cache. Falling back to memory cache: "+t),await hu(n,new ks)}}else O(Hn,"Using default OfflineComponentProvider"),await hu(n,new Th(void 0));return n._offlineComponents}async function Ec(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(Hn,"Using user provided OnlineComponentProvider"),await fp(n,n._uninitializedComponentsProvider._online)):(O(Hn,"Using default OnlineComponentProvider"),await fp(n,new Wn))),n._onlineComponents}function ey(n){return vh(n).then((e=>e.persistence))}function Ys(n){return vh(n).then((e=>e.localStore))}function ty(n){return Ec(n).then((e=>e.remoteStore))}function Ah(n){return Ec(n).then((e=>e.syncEngine))}function ny(n){return Ec(n).then((e=>e.datastore))}async function Os(n){const e=await Ec(n),t=e.eventManager;return t.onListen=eP.bind(null,e.syncEngine),t.onUnlisten=nP.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=tP.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=rP.bind(null,e.syncEngine),t}function RP(n){return n.asyncQueue.enqueue((async()=>{const e=await ey(n),t=await ty(n);return e.setNetworkEnabled(!0),(function(s){const i=U(s);return i.tu.delete(0),Ro(i)})(t)}))}function PP(n){return n.asyncQueue.enqueue((async()=>{const e=await ey(n),t=await ty(n);return e.setNetworkEnabled(!1),(async function(s){const i=U(s);i.tu.add(0),await Ws(i),i.iu.set("Offline")})(t)}))}function bP(n,e,t,r){const s=new Tc(r),i=new ph(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>hh(await Os(n),i))),()=>{s.gc(),n.asyncQueue.enqueueAndForget((async()=>dh(await Os(n),i)))}}function SP(n,e){const t=new Be;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await(function(l,d){const p=U(l);return p.persistence.runTransaction("read document","readonly",(g=>p.localDocuments.getDocument(g,d)))})(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new D(b.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Js(c,`Failed to get document '${i} from cache`);o.reject(u)}})(await Ys(n),e,t))),t.promise}function ry(n,e,t={}){const r=new Be;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const d=new Tc({next:g=>{d.gc(),o.enqueueAndForget((()=>dh(i,p)));const E=g.docs.has(c);!E&&g.fromCache?l.reject(new D(b.UNAVAILABLE,"Failed to get document because the client is offline.")):E&&g.fromCache&&u&&u.source==="server"?l.reject(new D(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new ph(js(c.path),d,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return hh(i,p)})(await Os(n),n.asyncQueue,e,t,r))),r.promise}function VP(n,e){const t=new Be;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await Ma(s,i,!0),u=new H_(i,c.Jo),l=u.ku(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=Js(c,`Failed to execute query '${i} against cache`);o.reject(u)}})(await Ys(n),e,t))),t.promise}function sy(n,e,t={}){const r=new Be;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const d=new Tc({next:g=>{d.gc(),o.enqueueAndForget((()=>dh(i,p))),g.fromCache&&u.source==="server"?l.reject(new D(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new ph(c instanceof Ui?ZA(c):c,d,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return hh(i,p)})(await Os(n),n.asyncQueue,e,t,r))),r.promise}function CP(n,e,t){const r=new Be;return n.asyncQueue.enqueueAndForget((async()=>{try{const s=await ny(n);r.resolve((async function(o,c,u){const l=U(o),{request:d,wt:p,parent:g}=bg(l.serializer,lg(c),u);l.connection.Ot||delete d.parent;const E=(await l.$t("RunAggregationQuery",l.serializer.databaseId,g,d,1)).filter((N=>!!N.result));L(E.length===1,64727);const S=E[0].result?.aggregateFields;return Object.keys(S).reduce(((N,k)=>(N[p[k]]=S[k],N)),{})})(s,e,t))}catch(s){r.reject(s)}})),r.promise}function xP(n,e){const t=new Be;return n.asyncQueue.enqueueAndForget((async()=>sP(await Ah(n),e,t))),t.promise}function DP(n,e){const t=new Tc(e);return n.asyncQueue.enqueueAndForget((async()=>(function(s,i){U(s).Pu.add(i),i.next()})(await Os(n),t))),()=>{t.gc(),n.asyncQueue.enqueueAndForget((async()=>(function(s,i){U(s).Pu.delete(i)})(await Os(n),t)))}}function NP(n,e,t){const r=new Be;return n.asyncQueue.enqueueAndForget((async()=>{const s=await ny(n);new vP(n.asyncQueue,s,t,e,r).Nc()})),r.promise}function kP(n,e,t,r){const s=(function(o,c){let u;return u=typeof o=="string"?yg().encode(o):o,(function(d,p){return new wP(d,p)})((function(d,p){if(d instanceof Uint8Array)return dp(d,p);if(d instanceof ArrayBuffer)return dp(new Uint8Array(d),p);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(u),c)})(t,Ur(e));n.asyncQueue.enqueueAndForget((async()=>{IP(await Ah(n),s,r)}))}function OP(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){const i=U(r);return i.persistence.runTransaction("Get named query","readonly",(o=>i.w_.getNamedQuery(o,s)))})(await Ys(n),e)))}function iy(n,e){return(function(r,s){return new TP(r,s)})(n,e)}function LP(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,s){const i=U(r),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",(u=>o.getFieldIndexes(u).next((l=>(function(p,g,E,S,N){p=[...p],g=[...g],p.sort(E),g.sort(E);const k=p.length,q=g.length;let G=0,j=0;for(;G<q&&j<k;){const J=E(p[j],g[G]);J<0?N(p[j++]):J>0?S(g[G++]):(G++,j++)}for(;G<q;)S(g[G++]);for(;j<k;)N(p[j++])})(l,s,xT,(d=>{c.push(o.addFieldIndex(u,d))}),(d=>{c.push(o.deleteFieldIndex(u,d))})))).next((()=>R.waitFor(c)))))})(await Ys(n),e)))}function MP(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){U(r).qo.Do=s})(await Ys(n),e)))}function FP(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=U(t),s=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await Ys(n))))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="AsyncQueue";class mp{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new Pl(this,"async_queue_retry"),this.jc=()=>{const r=ma();r&&O(pp,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=e;const t=ma();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=ma();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise((()=>{}));const t=new Be;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.qc.push(e),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(e){if(!Yn(e))throw e;O(pp,"Operation failed with retryable error: "+e)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(e){const t=this.Hc.then((()=>(this.Qc=!0,e().catch((r=>{throw this.Wc=r,this.Qc=!1,Ae("INTERNAL UNHANDLED ERROR: ",gp(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=t,t}enqueueAfterDelay(e,t,r){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const s=lh.createAndSchedule(this,e,t,r,(i=>this.Xc(i)));return this.Kc.push(s),s}Jc(){this.Wc&&$(47125,{el:gp(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do e=this.Hc,await e;while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then((()=>{this.Kc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Kc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tl()}))}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function gp(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(){this._progressObserver={},this._taskCompletionResolver=new Be,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UP=-1;class le extends yo{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new mp,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new mp(e),this._firestoreClient=void 0,await e}}}function BP(n,e,t){t||(t=Ji);const r=Fs(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(Pt(i,e))return s;throw new D(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ug)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Qn(e.host)&&Ha(e.host),r.initialize({options:e,instanceIdentifier:t})}function qP(n,e){const t=typeof n=="object"?n:nl(),r=typeof n=="string"?n:e||Ji,s=Fs(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=em("firestore");i&&jg(s,...i)}return s}function Ie(n){if(n._terminated)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ay(n),n._firestoreClient}function ay(n){const e=n._freezeSettings(),t=dv(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new AP(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}function $P(n,e){Ne("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return cy(n,Wn.provider,{build:r=>new Eh(r,t.cacheSizeBytes,e?.forceOwnership)}),Promise.resolve()}async function jP(n){Ne("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();cy(n,Wn.provider,{build:t=>new Z_(t,e.cacheSizeBytes)})}function cy(n,e,t){if((n=Z(n,le))._firestoreClient||n._terminated)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new D(b.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},ay(n)}function zP(n){if(n._initialized&&!n._terminated)throw new D(b.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Be;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!Ft.C())return Promise.resolve();const s=r+P_;await Ft.delete(s)})(rh(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function GP(n){return(function(t){const r=new Be;return t.asyncQueue.enqueueAndForget((async()=>cP(await Ah(t),r))),r.promise})(Ie(n=Z(n,le)))}function KP(n){return RP(Ie(n=Z(n,le)))}function WP(n){return PP(Ie(n=Z(n,le)))}function HP(n){return sT(n.app,"firestore",n._databaseId.database),n._delete()}function Qu(n,e){const t=Ie(n=Z(n,le)),r=new oy;return kP(t,n._databaseId,e,r),r}function uy(n,e){return OP(Ie(n=Z(n,le)),e).then((t=>t?new ke(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{convertValue(e,t="none"){switch(Ve(e)){case 0:return null;case 1:return e.booleanValue;case 2:return pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(tn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw $(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Xn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[Rr].arrayValue?.values?.map((r=>pe(r.doubleValue)));return new et(t)}convertGeoPoint(e){return new vt(pe(e.latitude),pe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=go(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Es(e));default:return null}}convertTimestamp(e){const t=en(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);L(Dg(r),9688,{name:e});const s=new Un(r.get(1),r.get(3)),i=new M(r.popFirst(5));return s.isEqual(t)||Ae(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr extends Rh{constructor(e){super(),this.firestore=e}convertBytes(e){return new nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QP(n){const e=Ie(Z(n.firestore,le)),t=e._onlineComponents?.datastore.serializer;return t===void 0?null:oc(t,He(n._query)).yt}function JP(n,e){const t=hl(e,((i,o)=>new tg(o,i.aggregateType,i._internalFieldPath))),r=Ie(Z(n.firestore,le)),s=r._onlineComponents?.datastore.serializer;return s===void 0?null:bg(s,lg(n._query),t,!0).request}const _p="@firebase/firestore",yp="4.16.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function us(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class ly{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new xe({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ae(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new YP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(bt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class YP extends oo{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hy(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ph{}class Xs extends Ph{}function XP(n,e,...t){let r=[];e instanceof Ph&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((u=>u instanceof Gr)).length,c=i.filter((u=>u instanceof Zs)).length;if(o>1||o>0&&c>0)throw new D(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Zs extends Xs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Zs(e,t,r)}_apply(e){const t=this._parse(e);return fy(e._query,t),new ke(e.firestore,e.converter,xu(e._query,t))}_parse(e){const t=qr(e.firestore);return(function(i,o,c,u,l,d,p){let g;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new D(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){wp(p,d);const S=[];for(const N of p)S.push(Ip(u,i,N));g={arrayValue:{values:S}}}else g=Ip(u,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||wp(p,d),g=Hg(c,o,p,d==="in"||d==="not-in");return ne.create(l,d,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ZP(n,e,t){const r=e,s=bt("where",n);return Zs._create(s,r,t)}class Gr extends Ph{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Gr(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:ue.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)fy(o,u),o=xu(o,u)})(e._query,t),new ke(e.firestore,e.converter,xu(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function eb(...n){return n.forEach((e=>py("or",e))),Gr._create("or",n)}function tb(...n){return n.forEach((e=>py("and",e))),Gr._create("and",n)}class vc extends Xs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new vc(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Xi(i,o)})(e._query,this._field,this._direction);return new ke(e.firestore,e.converter,xE(e._query,t))}}function nb(n,e="asc"){const t=e,r=bt("orderBy",n);return vc._create(r,t)}class Po extends Xs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Po(e,t,r)}_apply(e){return new ke(e.firestore,e.converter,Va(e._query,this._limit,this._limitType))}}function rb(n){return Em("limit",n),Po._create("limit",n,"F")}function sb(n){return Em("limitToLast",n),Po._create("limitToLast",n,"L")}class bo extends Xs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new bo(e,t,r)}_apply(e){const t=dy(e,this.type,this._docOrFields,this._inclusive);return new ke(e.firestore,e.converter,DE(e._query,t))}}function ib(...n){return bo._create("startAt",n,!0)}function ob(...n){return bo._create("startAfter",n,!1)}class So extends Xs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new So(e,t,r)}_apply(e){const t=dy(e,this.type,this._docOrFields,this._inclusive);return new ke(e.firestore,e.converter,NE(e._query,t))}}function ab(...n){return So._create("endBefore",n,!1)}function cb(...n){return So._create("endAt",n,!0)}function dy(n,e,t,r){if(t[0]=ie(t[0]),t[0]instanceof oo)return(function(i,o,c,u,l){if(!u)throw new D(b.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const p of as(i))if(p.field.isKeyField())d.push(Pr(o,u.key));else{const g=u.data.field(p.field);if(mo(g))throw new D(b.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const E=p.field.canonicalString();throw new D(b.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${E}' (used as the orderBy) does not exist.`)}d.push(g)}return new $n(d,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=qr(n.firestore);return(function(o,c,u,l,d,p){const g=o.explicitOrderBy;if(d.length>g.length)throw new D(b.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const E=[];for(let S=0;S<d.length;S++){const N=d[S];if(g[S].field.isKeyField()){if(typeof N!="string")throw new D(b.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof N}`);if(!wl(o)&&N.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${N}' contains a slash.`);const k=o.path.child(Y.fromString(N));if(!M.isDocumentKey(k))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const q=new M(k);E.push(Pr(c,q))}else{const k=Hg(u,l,N);E.push(k)}}return new $n(E,p)})(n._query,n.firestore._databaseId,s,e,t,r)}}function Ip(n,e,t){if(typeof(t=ie(t))=="string"){if(t==="")throw new D(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!wl(e)&&t.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Y.fromString(t));if(!M.isDocumentKey(r))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Pr(n,new M(r))}if(t instanceof ae)return Pr(n,t._key);throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ja(t)}.`)}function wp(n,e){if(!Array.isArray(n)||n.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function fy(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function py(n,e){if(!(e instanceof Zs||e instanceof Gr))throw new D(b.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Ac(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class bh extends Rh{constructor(e){super(),this.firestore=e}convertBytes(e){return new nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ub(n){return new Ls("sum",bt("sum",n))}function lb(n){return new Ls("avg",bt("average",n))}function my(){return new Ls("count")}function hb(n,e){return n instanceof Ls&&e instanceof Ls&&n.aggregateType===e.aggregateType&&n._internalFieldPath?.canonicalString()===e._internalFieldPath?.canonicalString()}function db(n,e){return bl(n.query,e.query)&&Pt(n.data(),e.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fb(n){return gy(n,{count:my()})}function gy(n,e){const t=Z(n.firestore,le),r=Ie(t),s=hl(e,((i,o)=>new tg(o,i.aggregateType,i._internalFieldPath)));return CP(r,n._query,s).then((i=>(function(c,u,l){const d=new tr(c);return new ly(u,d,l)})(t,n,i)))}class pb{constructor(e){this.kind="memory",this._onlineComponentProvider=Wn.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new Th(void 0)}}toJSON(){return{kind:this.kind}}}class mb{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=_y(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class gb{constructor(){this.kind="memoryEager",this._offlineComponentProvider=ks.provider}toJSON(){return{kind:this.kind}}}class _b{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Th(e)}}toJSON(){return{kind:this.kind}}}function yb(){return new gb}function Ib(n){return new _b(n?.cacheSizeBytes)}function wb(n){return new pb(n)}function Tb(n){return new mb(n)}class Eb{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Wn.provider,this._offlineComponentProvider={build:t=>new Eh(t,e?.cacheSizeBytes,this.forceOwnership)}}}class vb{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Wn.provider,this._offlineComponentProvider={build:t=>new Z_(t,e?.cacheSizeBytes)}}}function _y(n){return new Eb(n?.forceOwnership)}function Ab(){return new vb}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy="NOT SUPPORTED";class Ht{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class it extends oo{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new $i(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(bt("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=it._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function Rb(n,e,t){if(Mr(e,it._jsonSchema)){if(e.bundle===yy)throw new D(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Ur(n._databaseId),s=iy(e.bundle,r),i=s.t(),o=new mh(s.getMetadata(),r);for(const d of i)o.o(d);const c=o.documents;if(c.length!==1)throw new D(b.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=ic(r,c[0].document),l=new M(Y.fromString(e.bundleName));return new it(n,new bh(n),l,u,new Ht(!1,!1),t||null)}}it._jsonSchemaVersion="firestore/documentSnapshot/1.0",it._jsonSchema={type:Se("string",it._jsonSchemaVersion),bundleSource:Se("string","DocumentSnapshot"),bundleName:Se("string"),bundle:Se("string")};class $i extends it{data(e={}){return super.data(e)}}class ot{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ht(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new $i(this._firestore,this._userDataWriter,r.key,r,new Ht(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{Te(s._snapshot.query)?$u(s._snapshot.query):Tl(s.query._query);const u=new $i(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ht(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new $i(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ht(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:bb(c.type),doc:u,oldIndex:l,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ot._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Qa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Pb(n,e,t){if(Mr(e,ot._jsonSchema)){if(e.bundle===yy)throw new D(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Ur(n._databaseId),s=iy(e.bundle,r),i=s.t(),o=new mh(s.getMetadata(),r);for(const g of i)o.o(g);if(o.queries.length!==1)throw new D(b.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=pc(o.queries[0].bundledQuery),u=o.documents;let l=new On;u.map((g=>{const E=ic(r,g.document);l=l.add(E)}));const d=Nr.fromInitialDocuments(c,l,Q(),!1,!1),p=new ke(n,t||null,c);return new ot(n,new bh(n),p,d)}}function bb(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return $(61501,{type:n})}}function Sb(n,e){return n instanceof it&&e instanceof it?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof ot&&e instanceof ot&&n._firestore===e._firestore&&bl(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ot._jsonSchemaVersion="firestore/querySnapshot/1.0",ot._jsonSchema={type:Se("string",ot._jsonSchemaVersion),bundleSource:Se("string","QuerySnapshot"),bundleName:Se("string"),bundle:Se("string")};const Vb={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=qr(e)}set(e,t,r){this._verifyNotCommitted();const s=Cn(e,this._firestore),i=Ac(s.converter,t,r),o=cc(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,ye.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Cn(e,this._firestore);let o;return o=typeof(t=ie(t))=="string"||t instanceof Br?Ol(this._dataReader,"WriteBatch.update",i._key,t,r,s):kl(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,ye.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Cn(e,this._firestore);return this._mutations=this._mutations.concat(new $s(t._key,ye.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Cn(n,e){if((n=ie(n)).firestore!==e)throw new D(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cb{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=qr(e)}get(e){const t=Cn(e,this._firestore),r=new bh(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return $(24041);const i=s[0];if(i.isFoundDocument())return new oo(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new oo(this._firestore,r,t._key,null,t.converter);throw $(18433,{doc:i})}))}set(e,t,r){const s=Cn(e,this._firestore),i=Ac(s.converter,t,r),o=cc(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=Cn(e,this._firestore);let o;return o=typeof(t=ie(t))=="string"||t instanceof Br?Ol(this._dataReader,"Transaction.update",i._key,t,r,s):kl(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=Cn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy extends Cb{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Cn(e,this._firestore),r=new tr(this._firestore);return super.get(e).then((s=>new it(this._firestore,r,t._key,s._document,new Ht(!1,!1),t.converter)))}}function xb(n,e,t){n=Z(n,le);const r={...Vb,...t};(function(o){if(o.maxAttempts<1)throw new D(b.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=Ie(n);return NP(s,(i=>e(new wy(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Db(n){n=Z(n,ae);const e=Z(n.firestore,le),t=Ie(e);return ry(t,n._key).then((r=>Sh(e,n,r)))}function Nb(n){n=Z(n,ae);const e=Z(n.firestore,le),t=Ie(e),r=new tr(e);return SP(t,n._key).then((s=>new it(e,r,n._key,s,new Ht(s!==null&&s.hasLocalMutations,!0),n.converter)))}function kb(n){n=Z(n,ae);const e=Z(n.firestore,le),t=Ie(e);return ry(t,n._key,{source:"server"}).then((r=>Sh(e,n,r)))}function Ob(n){n=Z(n,ke);const e=Z(n.firestore,le),t=Ie(e),r=new tr(e);return hy(n._query),sy(t,n._query).then((s=>new ot(e,r,n,s)))}function Lb(n){n=Z(n,ke);const e=Z(n.firestore,le),t=Ie(e),r=new tr(e);return VP(t,n._query).then((s=>new ot(e,r,n,s)))}function Mb(n){n=Z(n,ke);const e=Z(n.firestore,le),t=Ie(e),r=new tr(e);return sy(t,n._query,{source:"server"}).then((s=>new ot(e,r,n,s)))}function Fb(n,e,t){n=Z(n,ae);const r=Z(n.firestore,le),s=Ac(n.converter,e,t),i=qr(r);return ei(r,[cc(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ye.none())])}function Ub(n,e,t,...r){n=Z(n,ae);const s=Z(n.firestore,le),i=qr(s);let o;return o=typeof(e=ie(e))=="string"||e instanceof Br?Ol(i,"updateDoc",n._key,e,t,r):kl(i,"updateDoc",n._key,e),ei(s,[o.toMutation(n._key,ye.exists(!0))])}function Bb(n){return ei(Z(n.firestore,le),[new $s(n._key,ye.none())])}function qb(n,e){const t=Z(n.firestore,le),r=zg(n),s=Ac(n.converter,e),i=qr(n.firestore);return ei(t,[cc(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,ye.exists(!1))]).then((()=>r))}function Ju(n,...e){n=ie(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||us(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(us(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let i,o,c;if(n instanceof ae)o=Z(n.firestore,le),c=js(n._key.path),i={next:l=>{e[r]&&e[r](Sh(o,n,l))},error:e[r+1],complete:e[r+2]};else{const l=Z(n,ke);o=Z(l.firestore,le),c=l._query;const d=new tr(o);i={next:p=>{e[r]&&e[r](new ot(o,d,l,p))},error:e[r+1],complete:e[r+2]},hy(n._query)}const u=Ie(o);return bP(u,c,s,i)}function $b(n,e,...t){const r=ie(n),s=(function(u){const l={bundle:"",bundleName:"",bundleSource:""},d=["bundle","bundleName","bundleSource"];for(const p of d){if(!(p in u)){l.error=`snapshotJson missing required field: ${p}`;break}const g=u[p];if(typeof g!="string"){l.error=`snapshotJson field '${p}' must be a string.`;break}if(g.length===0){l.error=`snapshotJson field '${p}' cannot be an empty string.`;break}p==="bundle"?l.bundle=g:p==="bundleName"?l.bundleName=g:p==="bundleSource"&&(l.bundleSource=g)}return l})(e);if(s.error)throw new D(b.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||us(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&us(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,d,p,g,E){let S,N=!1;return Qu(l,d.bundle).then((()=>uy(l,d.bundleName))).then((q=>{q&&!N&&(E&&q.withConverter(E),S=Ju(q,p||{},g))})).catch((q=>(g.error&&g.error(q),()=>{}))),()=>{N||(N=!0,S&&S())}})(r,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&us(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,d,p,g,E){let S,N=!1;return Qu(l,d.bundle).then((()=>{if(!N){const q=new ae(l,E||null,M.fromPath(d.bundleName));S=Ju(q,p||{},g)}})).catch((q=>(g.error&&g.error(q),()=>{}))),()=>{N||(N=!0,S&&S())}})(r,s,i,c,t[o])}throw new D(b.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function jb(n,e){n=Z(n,le);const t=Ie(n),r=us(e)?e:{next:e};return DP(t,r)}function ei(n,e){const t=Ie(n);return xP(t,e)}function Sh(n,e,t){const r=t.docs.get(e._key),s=new tr(n);return new it(n,s,e._key,r,new Ht(t.hasPendingWrites,t.fromCache),e.converter)}function zb(n){return n=Z(n,le),Ie(n),new Iy(n,(e=>ei(n,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gb(n,e){n=Z(n,le);const t=Ie(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return Ne("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(i){const o=typeof i=="string"?(function(l){try{return JSON.parse(l)}catch(d){throw new D(b.INVALID_ARGUMENT,"Failed to parse JSON: "+d?.message)}})(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=Tp(u,"collectionGroup"),d=[];if(Array.isArray(u.fields))for(const p of u.fields){const g=Tp(p,"fieldPath"),E=Ml("setIndexConfiguration",g);p.arrayConfig==="CONTAINS"?d.push(new wr(E,2)):p.order==="ASCENDING"?d.push(new wr(E,0)):p.order==="DESCENDING"&&d.push(new wr(E,1))}c.push(new ms(ms.UNKNOWN_ID,l,d,gs.empty()))}return c})(e);return LP(t,r)}function Tp(n,e){if(typeof n[e]!="string")throw new D(b.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function Kb(n){n=Z(n,le);const e=Ep.get(n);if(e)return e;if(Ie(n)._uninitializedComponentsProvider?._offline.kind!=="persistent")return null;const r=new Ty(n);return Ep.set(n,r),r}function Wb(n){Ey(n,!0)}function Hb(n){Ey(n,!1)}function Qb(n){const e=Ie(n._firestore);FP(e).then((t=>O("deleting all persistent cache indexes succeeded"))).catch((t=>Ne("deleting all persistent cache indexes failed",t)))}function Ey(n,e){const t=Ie(n._firestore);MP(t,e).then((r=>O(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((r=>Ne(`setting persistent cache index auto creation isEnabled=${e} failed`,r)))}const Ep=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Vh.instance.onExistenceFilterMismatch(e)}}class Vh{constructor(){this.i=new Map}static get instance(){return na||(na=new Vh,BE(na)),na}u(e){this.i.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.i;return r.set(t,e),()=>r.delete(t)}}let na=null;(function(e,t=!0){yT(Lr),Ar(new Mn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new le(new ET(r.getProvider("auth-internal")),new RT(o,r.getProvider("app-check-internal")),fE(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Mt(_p,yp,e),Mt(_p,yp,"esm2020")})();const Ex=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Rh,AggregateField:Ls,AggregateQuerySnapshot:ly,Bytes:nt,CACHE_SIZE_UNLIMITED:UP,CollectionReference:At,DocumentReference:ae,DocumentSnapshot:it,FieldPath:Br,FieldValue:Kt,Firestore:le,FirestoreError:D,GeoPoint:vt,LoadBundleTask:oy,PersistentCacheIndexManager:Ty,Query:ke,QueryCompositeFilterConstraint:Gr,QueryConstraint:Xs,QueryDocumentSnapshot:$i,QueryEndAtConstraint:So,QueryFieldFilterConstraint:Zs,QueryLimitConstraint:Po,QueryOrderByConstraint:vc,QuerySnapshot:ot,QueryStartAtConstraint:bo,SnapshotMetadata:Ht,Timestamp:oe,Transaction:wy,VectorValue:et,WriteBatch:Iy,_AutoId:Qa,_ByteString:me,_DatabaseId:Un,_DocumentKey:M,_EmptyAppCheckTokenProvider:PT,_EmptyAuthCredentialsProvider:Im,_FieldPath:de,_TestingHooks:Jb,_cast:Z,_debugAssert:wT,_internalAggregationQueryToProtoRunAggregationQueryRequest:JP,_internalQueryToProtoQueryTarget:QP,_isBase64Available:lE,_logWarn:Ne,_validateIsNotUsedTogether:Tm,addDoc:qb,aggregateFieldEqual:hb,aggregateQuerySnapshotEqual:db,and:tb,arrayRemove:Pv,arrayUnion:Rv,average:lb,clearIndexedDbPersistence:zP,collection:mv,collectionGroup:gv,connectFirestoreEmulator:jg,count:my,deleteAllPersistentCacheIndexes:Qb,deleteDoc:Bb,deleteField:vv,disableNetwork:WP,disablePersistentCacheIndexAutoCreation:Hb,doc:zg,documentId:Og,documentSnapshotFromJSON:Rb,enableIndexedDbPersistence:$P,enableMultiTabIndexedDbPersistence:jP,enableNetwork:KP,enablePersistentCacheIndexAutoCreation:Wb,endAt:cb,endBefore:ab,ensureFirestoreConfigured:Ie,executeWrite:ei,getAggregateFromServer:gy,getCountFromServer:fb,getDoc:Db,getDocFromCache:Nb,getDocFromServer:kb,getDocs:Ob,getDocsFromCache:Lb,getDocsFromServer:Mb,getFirestore:qP,getPersistentCacheIndexManager:Kb,increment:bv,initializeFirestore:BP,limit:rb,limitToLast:sb,loadBundle:Qu,maximum:Vv,memoryEagerGarbageCollector:yb,memoryLocalCache:wb,memoryLruGarbageCollector:Ib,minimum:Sv,namedQuery:uy,onSnapshot:Ju,onSnapshotResume:$b,onSnapshotsInSync:jb,or:eb,orderBy:nb,persistentLocalCache:Tb,persistentMultipleTabManager:Ab,persistentSingleTabManager:_y,query:XP,queryEqual:bl,querySnapshotFromJSON:Pb,refEqual:_v,runTransaction:xb,serverTimestamp:Av,setDoc:Fb,setIndexConfiguration:Gb,setLogLevel:IT,snapshotEqual:Sb,startAfter:ob,startAt:ib,sum:ub,terminate:HP,updateDoc:Ub,vector:Zg,waitForPendingWrites:GP,where:ZP,writeBatch:zb},Symbol.toStringTag,{value:"Module"}));var Yb="firebase",Xb="12.16.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mt(Yb,Xb,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy="firebasestorage.googleapis.com",Ay="storageBucket",Zb=120*1e3,eS=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve extends Gt{constructor(e,t,r=0){super(du(e),`Firebase Storage: ${t} (${du(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ve.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return du(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ee;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ee||(Ee={}));function du(n){return"storage/"+n}function Ch(){const n="An unknown error occurred, please check the error payload for server response.";return new ve(Ee.UNKNOWN,n)}function tS(n){return new ve(Ee.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function nS(n){return new ve(Ee.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function rS(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ve(Ee.UNAUTHENTICATED,n)}function sS(){return new ve(Ee.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function iS(n){return new ve(Ee.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function oS(){return new ve(Ee.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function aS(){return new ve(Ee.CANCELED,"User canceled the upload/download.")}function cS(n){return new ve(Ee.INVALID_URL,"Invalid URL '"+n+"'.")}function uS(n){return new ve(Ee.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function lS(){return new ve(Ee.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ay+"' property when initializing the app?")}function hS(){return new ve(Ee.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function dS(){return new ve(Ee.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function fS(n){return new ve(Ee.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Yu(n){return new ve(Ee.INVALID_ARGUMENT,n)}function Ry(){return new ve(Ee.APP_DELETED,"The Firebase app was deleted.")}function pS(n){return new ve(Ee.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function ji(n,e){return new ve(Ee.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Ai(n){throw new ve(Ee.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=pt.makeFromUrl(e,t)}catch{return new pt(e,"")}if(r.path==="")return r;throw uS(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(J){J.path.charAt(J.path.length-1)==="/"&&(J.path_=J.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function l(J){J.path_=decodeURIComponent(J.path)}const d="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",E=new RegExp(`^https?://${p}/${d}/b/${s}/o${g}`,"i"),S={bucket:1,path:3},N=t===vy?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",q=new RegExp(`^https?://${N}/${s}/${k}`,"i"),j=[{regex:c,indices:u,postModify:i},{regex:E,indices:S,postModify:l},{regex:q,indices:{bucket:1,path:2},postModify:l}];for(let J=0;J<j.length;J++){const se=j[J],ee=se.regex.exec(e);if(ee){const w=ee[se.indices.bucket];let _=ee[se.indices.path];_||(_=""),r=new pt(w,_),se.postModify(r);break}}if(r==null)throw cS(e);return r}}class mS{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gS(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let l=!1;function d(...k){l||(l=!0,e.apply(null,k))}function p(k){s=setTimeout(()=>{s=null,n(E,u())},k)}function g(){i&&clearTimeout(i)}function E(k,...q){if(l){g();return}if(k){g(),d.call(null,k,...q);return}if(u()||o){g(),d.call(null,k,...q);return}r<64&&(r*=2);let j;c===1?(c=2,j=0):j=(r+Math.random())*1e3,p(j)}let S=!1;function N(k){S||(S=!0,g(),!l&&(s!==null?(k||(c=2),clearTimeout(s),p(0)):k||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,N(!0)},t),N}function _S(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yS(n){return n!==void 0}function IS(n){return typeof n=="object"&&!Array.isArray(n)}function xh(n){return typeof n=="string"||n instanceof String}function vp(n){return Dh()&&n instanceof Blob}function Dh(){return typeof Blob<"u"}function Ap(n,e,t,r){if(r<e)throw Yu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Yu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Py(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var vr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(vr||(vr={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wS(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e,t,r,s,i,o,c,u,l,d,p,g=!0,E=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=d,this.connectionFactory_=p,this.retry=g,this.isUsingEmulator=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((S,N)=>{this.resolve_=S,this.reject_=N,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new ra(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===vr.NO_ERROR,u=i.getStatus();if(!c||wS(u,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===vr.ABORT;r(!1,new ra(!1,null,d));return}const l=this.successCodes_.indexOf(u)!==-1;r(!0,new ra(l,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());yS(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=Ch();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Ry():aS();o(u)}else{const u=oS();o(u)}};this.canceled_?t(!1,new ra(!1,null,!0)):this.backoffId_=gS(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&_S(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ra{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function ES(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function vS(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function AS(n,e){e&&(n["X-Firebase-GMPID"]=e)}function RS(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function PS(n,e,t,r,s,i,o=!0,c=!1){const u=Py(n.urlParams),l=n.url+u,d=Object.assign({},n.headers);return AS(d,e),ES(d,t),vS(d,i),RS(d,r),new TS(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bS(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function SS(...n){const e=bS();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Dh())return new Blob(n);throw new ve(Ee.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function VS(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CS(n){if(typeof atob>"u")throw fS("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class fu{constructor(e,t){this.data=e,this.contentType=t||null}}function by(n,e){switch(n){case Tt.RAW:return new fu(Sy(e));case Tt.BASE64:case Tt.BASE64URL:return new fu(Vy(n,e));case Tt.DATA_URL:return new fu(DS(e),NS(e))}throw Ch()}function Sy(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function xS(n){let e;try{e=decodeURIComponent(n)}catch{throw ji(Tt.DATA_URL,"Malformed data URL.")}return Sy(e)}function Vy(n,e){switch(n){case Tt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw ji(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Tt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw ji(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=CS(e)}catch(s){throw s.message.includes("polyfill")?s:ji(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Cy{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw ji(Tt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=kS(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function DS(n){const e=new Cy(n);return e.base64?Vy(Tt.BASE64,e.rest):xS(e.rest)}function NS(n){return new Cy(n).contentType}function kS(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,t){let r=0,s="";vp(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(vp(this.data_)){const r=this.data_,s=VS(r,e,t);return s===null?null:new vn(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new vn(r,!0)}}static getBlob(...e){if(Dh()){const t=e.map(r=>r instanceof vn?r.data_:r);return new vn(SS.apply(null,t))}else{const t=e.map(o=>xh(o)?by(Tt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new vn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(n){let e;try{e=JSON.parse(n)}catch{return null}return IS(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OS(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function LS(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Dy(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MS(n,e){return e}class Ze{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||MS}}let sa=null;function FS(n){return!xh(n)||n.length<2?n:Dy(n)}function Ny(){if(sa)return sa;const n=[];n.push(new Ze("bucket")),n.push(new Ze("generation")),n.push(new Ze("metageneration")),n.push(new Ze("name","fullPath",!0));function e(i,o){return FS(o)}const t=new Ze("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new Ze("size");return s.xform=r,n.push(s),n.push(new Ze("timeCreated")),n.push(new Ze("updated")),n.push(new Ze("md5Hash",null,!0)),n.push(new Ze("cacheControl",null,!0)),n.push(new Ze("contentDisposition",null,!0)),n.push(new Ze("contentEncoding",null,!0)),n.push(new Ze("contentLanguage",null,!0)),n.push(new Ze("contentType",null,!0)),n.push(new Ze("metadata","customMetadata",!0)),sa=n,sa}function US(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new pt(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function BS(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return US(r,n),r}function ky(n,e,t){const r=xy(e);return r===null?null:BS(n,r,t)}function qS(n,e,t,r){const s=xy(e);if(s===null||!xh(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(l=>{const d=n.bucket,p=n.fullPath,g="/b/"+o(d)+"/o/"+o(p),E=Rc(g,t,r),S=Py({alt:"media",token:l});return E+S})[0]}function $S(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class Nh{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy(n){if(!n)throw Ch()}function jS(n,e){function t(r,s){const i=ky(n,s,e);return Oy(i!==null),i}return t}function zS(n,e){function t(r,s){const i=ky(n,s,e);return Oy(i!==null),qS(i,s,n.host,n._protocol)}return t}function Ly(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=sS():s=rS():t.getStatus()===402?s=nS(n.bucket):t.getStatus()===403?s=iS(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function My(n){const e=Ly(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=tS(n.path)),i.serverResponse=s.serverResponse,i}return t}function GS(n,e,t){const r=e.fullServerUrl(),s=Rc(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Nh(s,i,zS(n,t),o);return c.errorHandler=My(e),c}function KS(n,e){const t=e.fullServerUrl(),r=Rc(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,l){}const c=new Nh(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=My(e),c}function WS(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function HS(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=WS(null,e)),r}function QS(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let j="";for(let J=0;J<2;J++)j=j+Math.random().toString().slice(2);return j}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const l=HS(e,r,s),d=$S(l,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,g=`\r
--`+u+"--",E=vn.getBlob(p,r,g);if(E===null)throw hS();const S={name:l.fullPath},N=Rc(i,n.host,n._protocol),k="POST",q=n.maxUploadRetryTime,G=new Nh(N,k,jS(n,t),q);return G.urlParams=S,G.headers=o,G.body=E.uploadData(),G.errorHandler=Ly(e),G}class JS{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=vr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=vr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=vr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw Ai("cannot .send() more than once");if(Qn(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Ai("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Ai("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Ai("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Ai("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class YS extends JS{initXhr(){this.xhr_.responseType="text"}}function kh(){return new YS}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,t){this._service=e,t instanceof pt?this._location=t:this._location=pt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new kr(e,t)}get root(){const e=new pt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Dy(this._location.path)}get storage(){return this._service}get parent(){const e=OS(this._location.path);if(e===null)return null;const t=new pt(this._location.bucket,e);return new kr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw pS(e)}}function Fy(n,e,t){n._throwIfRoot("uploadBytes");const r=QS(n.storage,n._location,Ny(),new vn(e,!0),t);return n.storage.makeRequestWithTokens(r,kh).then(s=>({metadata:s,ref:n}))}function XS(n,e,t=Tt.RAW,r){n._throwIfRoot("uploadString");const s=by(t,e),i={...r};return i.contentType==null&&s.contentType!=null&&(i.contentType=s.contentType),Fy(n,s.data,i)}function ZS(n){n._throwIfRoot("getDownloadURL");const e=GS(n.storage,n._location,Ny());return n.storage.makeRequestWithTokens(e,kh).then(t=>{if(t===null)throw dS();return t})}function eV(n){n._throwIfRoot("deleteObject");const e=KS(n.storage,n._location);return n.storage.makeRequestWithTokens(e,kh)}function tV(n,e){const t=LS(n._location.path,e),r=new pt(n._location.bucket,t);return new kr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nV(n){return/^[A-Za-z]+:\/\//.test(n)}function rV(n,e){return new kr(n,e)}function Uy(n,e){if(n instanceof Oh){const t=n;if(t._bucket==null)throw lS();const r=new kr(t,t._bucket);return e!=null?Uy(r,e):r}else return e!==void 0?tV(n,e):n}function sV(n,e){if(e&&nV(e)){if(n instanceof Oh)return rV(n,e);throw Yu("To use ref(service, url), the first argument must be a Storage instance.")}else return Uy(n,e)}function Rp(n,e){const t=e?.[Ay];return t==null?null:pt.makeFromBucketSpec(t,n)}function iV(n,e,t,r={}){n.host=`${e}:${t}`;const s=Qn(e);s&&Ha(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:sm(i,n.app.options.projectId))}class Oh{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=vy,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Zb,this._maxUploadRetryTime=eS,this._requests=new Set,s!=null?this._bucket=pt.makeFromBucketSpec(s,this._host):this._bucket=Rp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=pt.makeFromBucketSpec(this._url,e):this._bucket=Rp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Ap("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Ap("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(dt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new kr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new mS(Ry());{const o=PS(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Pp="@firebase/storage",bp="0.14.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By="storage";function vx(n,e,t){return n=ie(n),Fy(n,e,t)}function Ax(n,e,t,r){return n=ie(n),XS(n,e,t,r)}function Rx(n){return n=ie(n),ZS(n)}function Px(n){return n=ie(n),eV(n)}function bx(n,e){return n=ie(n),sV(n,e)}function Sx(n=nl(),e){n=ie(n);const r=Fs(n,By).getImmediate({identifier:e}),s=em("storage");return s&&oV(r,...s),r}function oV(n,e,t,r={}){iV(n,e,t,r)}function aV(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Oh(t,r,s,e,Lr)}function cV(){Ar(new Mn(By,aV,"PUBLIC").setMultipleInstances(!0)),Mt(Pp,bp,""),Mt(Pp,bp,"esm2020")}cV();function qy(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const uV=qy,$y=new uo("auth","Firebase",qy());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa=new tl("@firebase/auth");function lV(n,...e){qa.logLevel<=te.WARN&&qa.warn(`Auth (${Lr}): ${n}`,...e)}function ga(n,...e){qa.logLevel<=te.ERROR&&qa.error(`Auth (${Lr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(n,...e){throw Mh(n,...e)}function Rt(n,...e){return Mh(n,...e)}function Lh(n,e,t){const r={...uV(),[e]:t};return new uo("auth","Firebase",r).create(e,{appName:n.name})}function Ln(n){return Lh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hV(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&It(n,"argument-error"),Lh(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Mh(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return $y.create(n,...e)}function H(n,e,...t){if(!n)throw Mh(e,...t)}function Qt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ga(e),new Error(e)}function sn(n,e){n||Qt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xu(){return typeof self<"u"&&self.location?.href||""}function dV(){return Sp()==="http:"||Sp()==="https:"}function Sp(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fV(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dV()||cw()||"connection"in navigator)?navigator.onLine:!0}function pV(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,t){this.shortDelay=e,this.longDelay=t,sn(t>e,"Short delay should be less than long delay!"),this.isMobile=ow()||uw()}get(){return fV()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fh(n,e){sn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Qt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Qt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Qt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mV={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gV=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],_V=new Vo(3e4,6e4);function Kr(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function nr(n,e,t,r,s={}){return zy(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=lo({...o,key:n.config.apiKey}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return aw()||(l.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(l.credentials="include"),jy.fetch()(await Gy(n,n.config.apiHost,t,c),l)})}async function zy(n,e,t){n._canInitEmulator=!1;const r={...mV,...e};try{const s=new IV(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ia(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ia(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ia(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw ia(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Lh(n,d,l);It(n,d)}}catch(s){if(s instanceof Gt)throw s;It(n,"network-request-failed",{message:String(s)})}}async function Pc(n,e,t,r,s={}){const i=await nr(n,e,t,r,s);return"mfaPendingCredential"in i&&It(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Gy(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?Fh(n.config,s):`${n.config.apiScheme}://${s}`;return gV.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function yV(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class IV{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Rt(this.auth,"network-request-failed")),_V.get())})}}function ia(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Rt(n,e,r);return s.customData._tokenResponse=t,s}function Vp(n){return n!==void 0&&n.enterprise!==void 0}class wV{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return yV(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function TV(n,e){return nr(n,"GET","/v2/recaptchaConfig",Kr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EV(n,e){return nr(n,"POST","/v1/accounts:delete",e)}async function $a(n,e){return nr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function vV(n,e=!1){const t=ie(n),r=await t.getIdToken(e),s=Uh(r);H(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:zi(pu(s.auth_time)),issuedAtTime:zi(pu(s.iat)),expirationTime:zi(pu(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function pu(n){return Number(n)*1e3}function Uh(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ga("JWT malformed, contained fewer than 3 sections"),null;try{const s=Yp(t);return s?JSON.parse(s):(ga("Failed to decode base64 JWT payload"),null)}catch(s){return ga("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Cp(n){const e=Uh(n);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ao(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Gt&&AV(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function AV({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=zi(this.lastLoginAt),this.creationTime=zi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ja(n){const e=n.auth,t=await n.getIdToken(),r=await ao(n,$a(e,{idToken:t}));H(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Ky(s.providerUserInfo):[],o=bV(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!o?.length,l=c?u:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Zu(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function PV(n){const e=ie(n);await ja(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bV(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Ky(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SV(n,e){const t=await zy(n,{},async()=>{const r=lo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Gy(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(u.credentials="include"),jy.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function VV(n,e){return nr(n,"POST","/v2/accounts:revokeToken",Kr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Cp(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=Cp(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await SV(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new ls;return r&&(H(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(H(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ls,this.toJSON())}_performRefresh(){return Qt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(n,e){H(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Et{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new RV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Zu(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ao(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return vV(this,e)}reload(){return PV(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Et({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ja(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(dt(this.auth.app))return Promise.reject(Ln(this.auth));const e=await this.getIdToken();return await ao(this,EV(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:E,providerData:S,stsTokenManager:N}=t;H(p&&N,e,"internal-error");const k=ls.fromJSON(this.name,N);H(typeof p=="string",e,"internal-error"),wn(r,e.name),wn(s,e.name),H(typeof g=="boolean",e,"internal-error"),H(typeof E=="boolean",e,"internal-error"),wn(i,e.name),wn(o,e.name),wn(c,e.name),wn(u,e.name),wn(l,e.name),wn(d,e.name);const q=new Et({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:E,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:k,createdAt:l,lastLoginAt:d});return S&&Array.isArray(S)&&(q.providerData=S.map(G=>({...G}))),u&&(q._redirectEventId=u),q}static async _fromIdTokenResponse(e,t,r=!1){const s=new ls;s.updateFromServerResponse(t);const i=new Et({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ja(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];H(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Ky(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new ls;c.updateFromIdToken(r);const u=new Et({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Zu(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp=new Map;function Jt(n){sn(n instanceof Function,"Expected a class definition");let e=xp.get(n);return e?(sn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xp.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Wy.type="NONE";const Dp=Wy;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _a(n,e,t){return`firebase:${n}:${e}:${t}`}class hs{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=_a(this.userKey,s.apiKey,i),this.fullPersistenceKey=_a("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await $a(this.auth,{idToken:e}).catch(()=>{});return t?Et._fromGetAccountInfoResponse(this.auth,t,e):null}return Et._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new hs(Jt(Dp),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||Jt(Dp);const o=_a(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let p;if(typeof d=="string"){const g=await $a(e,{idToken:d}).catch(()=>{});if(!g)break;p=await Et._fromGetAccountInfoResponse(e,g,d)}else p=Et._fromJSON(e,d);l!==i&&(c=p),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new hs(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new hs(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Hy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zy(e))return"Blackberry";if(eI(e))return"Webos";if(Qy(e))return"Safari";if((e.includes("chrome/")||Jy(e))&&!e.includes("edge/"))return"Chrome";if(Xy(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Hy(n=De()){return/firefox\//i.test(n)}function Qy(n=De()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jy(n=De()){return/crios\//i.test(n)}function Yy(n=De()){return/iemobile/i.test(n)}function Xy(n=De()){return/android/i.test(n)}function Zy(n=De()){return/blackberry/i.test(n)}function eI(n=De()){return/webos/i.test(n)}function Bh(n=De()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function CV(n=De()){return Bh(n)&&!!window.navigator?.standalone}function xV(){return lw()&&document.documentMode===10}function tI(n=De()){return Bh(n)||Xy(n)||eI(n)||Zy(n)||/windows phone/i.test(n)||Yy(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nI(n,e=[]){let t;switch(n){case"Browser":t=Np(De());break;case"Worker":t=`${Np(De())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Lr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DV{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NV(n,e={}){return nr(n,"GET","/v2/passwordPolicy",Kr(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kV=6;class OV{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??kV,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LV{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new kp(this),this.idTokenSubscription=new kp(this),this.beforeStateQueue=new DV(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=$y,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Jt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await hs.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await $a(this,{idToken:e}),r=await Et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch{await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(dt(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ja(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=pV()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(dt(this.app))return Promise.reject(Ln(this));const t=e?ie(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return dt(this.app)?Promise.reject(Ln(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return dt(this.app)?Promise.reject(Ln(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Jt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await NV(this),t=new OV(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new uo("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await VV(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Jt(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await hs.create(this,[Jt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=nI(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(dt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&lV(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Wr(n){return ie(n)}class kp{constructor(e){this.auth=e,this.observer=null,this.addObserver=gw(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function MV(n){bc=n}function rI(n){return bc.loadJS(n)}function FV(){return bc.recaptchaEnterpriseScript}function UV(){return bc.gapiScript}function BV(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class qV{constructor(){this.enterprise=new $V}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class $V{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const jV="recaptcha-enterprise",sI="NO_RECAPTCHA",Op="onFirebaseAuthREInstanceReady";class An{constructor(e){this.type=jV,this.auth=Wr(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{TV(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new wV(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Vp(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(sI)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new qV().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(async c=>{if(!t&&Vp(window.grecaptcha)&&An.scriptInjectionDeferred)await An.scriptInjectionDeferred.promise,s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=FV();u.length!==0&&(u+=c+`&onload=${Op}`),An.scriptInjectionDeferred=new rm,window[Op]=()=>{An.scriptInjectionDeferred?.resolve()},rI(u).then(()=>An.scriptInjectionDeferred?.promise).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}An.scriptInjectionDeferred=null;async function Lp(n,e,t,r=!1,s=!1){const i=new An(n);let o;if(s)o=sI;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Mp(n,e,t,r,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Lp(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){const o=await Lp(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zV(n,e){const t=Fs(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Pt(i,e??{}))return s;It(s,"already-initialized")}return t.initialize({options:e})}function GV(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Jt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function KV(n,e,t){const r=Wr(n);H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=iI(e),{host:o,port:c}=WV(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){H(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),H(Pt(l,r.config.emulator)&&Pt(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Qn(o)?Ha(`${i}//${o}${u}`):HV()}function iI(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function WV(n){const e=iI(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Fp(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Fp(o)}}}function Fp(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function HV(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Qt("not implemented")}_getIdTokenResponse(e){return Qt("not implemented")}_linkToIdToken(e,t){return Qt("not implemented")}_getReauthenticationResolver(e){return Qt("not implemented")}}async function QV(n,e){return nr(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JV(n,e){return Pc(n,"POST","/v1/accounts:signInWithPassword",Kr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YV(n,e){return Pc(n,"POST","/v1/accounts:signInWithEmailLink",Kr(n,e))}async function XV(n,e){return Pc(n,"POST","/v1/accounts:signInWithEmailLink",Kr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co extends qh{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new co(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new co(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Mp(e,t,"signInWithPassword",JV);case"emailLink":return YV(e,{email:this._email,oobCode:this._password});default:It(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Mp(e,r,"signUpPassword",QV);case"emailLink":return XV(e,{idToken:t,email:this._email,oobCode:this._password});default:It(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ds(n,e){return Pc(n,"POST","/v1/accounts:signInWithIdp",Kr(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZV="http://localhost";class Or extends qh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Or(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):It("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new Or(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return ds(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ds(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ds(e,t)}buildRequest(){const e={requestUri:ZV,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=lo(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eC(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function tC(n){const e=Ri(Pi(n)).link,t=e?Ri(Pi(e)).deep_link_id:null,r=Ri(Pi(n)).deep_link_id;return(r?Ri(Pi(r)).link:null)||r||t||e||n}class $h{constructor(e){const t=Ri(Pi(e)),r=t.apiKey??null,s=t.oobCode??null,i=eC(t.mode??null);H(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=tC(e);try{return new $h(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(){this.providerId=ti.PROVIDER_ID}static credential(e,t){return co._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=$h.parseLink(t);return H(r,"argument-error"),co._fromEmailAndCode(e,r.code,r.tenantId)}}ti.PROVIDER_ID="password";ti.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ti.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co extends jh{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends Co{constructor(){super("facebook.com")}static credential(e){return Or._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rn.credential(e.oauthAccessToken)}catch{return null}}}Rn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Rn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn extends Co{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Or._fromParams({providerId:Pn.PROVIDER_ID,signInMethod:Pn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Pn.credentialFromTaggedObject(e)}static credentialFromError(e){return Pn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Pn.credential(t,r)}catch{return null}}}Pn.GOOGLE_SIGN_IN_METHOD="google.com";Pn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends Co{constructor(){super("github.com")}static credential(e){return Or._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bn.credential(e.oauthAccessToken)}catch{return null}}}bn.GITHUB_SIGN_IN_METHOD="github.com";bn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends Co{constructor(){super("twitter.com")}static credential(e,t){return Or._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Sn.credentialFromTaggedObject(e)}static credentialFromError(e){return Sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Sn.credential(t,r)}catch{return null}}}Sn.TWITTER_SIGN_IN_METHOD="twitter.com";Sn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Et._fromIdTokenResponse(e,r,s),o=Up(r);return new Ms({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Up(r);return new Ms({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Up(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za extends Gt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,za.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new za(e,t,r,s)}}function oI(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?za._fromErrorAndOperation(n,i,e,r):i})}async function nC(n,e,t=!1){const r=await ao(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ms._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rC(n,e,t=!1){const{auth:r}=n;if(dt(r.app))return Promise.reject(Ln(r));const s="reauthenticate";try{const i=await ao(n,oI(r,s,e,n),t);H(i.idToken,r,"internal-error");const o=Uh(i.idToken);H(o,r,"internal-error");const{sub:c}=o;return H(n.uid===c,r,"user-mismatch"),Ms._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&It(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aI(n,e,t=!1){if(dt(n.app))return Promise.reject(Ln(n));const r="signIn",s=await oI(n,r,e),i=await Ms._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function sC(n,e){return aI(Wr(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iC(n){const e=Wr(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Vx(n,e,t){return dt(n.app)?Promise.reject(Ln(n)):sC(ie(n),ti.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&iC(n),r})}function oC(n,e,t,r){return ie(n).onIdTokenChanged(e,t,r)}function aC(n,e,t){return ie(n).beforeAuthStateChanged(e,t)}function Cx(n){return ie(n).signOut()}const Ga="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ga,"1"),this.storage.removeItem(Ga),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cC=1e3,uC=10;class uI extends cI{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=tI(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);xV()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,uC):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},cC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}uI.type="LOCAL";const lC=uI;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI extends cI{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}lI.type="SESSION";const hI=lI;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hC(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Sc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await hC(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Sc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dC{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=zh("",20);s.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(){return window}function fC(n){qt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dI(){return typeof qt().WorkerGlobalScope<"u"&&typeof qt().importScripts=="function"}async function pC(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function mC(){return navigator?.serviceWorker?.controller||null}function gC(){return dI()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fI="firebaseLocalStorageDb",_C=1,Ka="firebaseLocalStorage",pI="fbase_key";class xo{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Vc(n,e){return n.transaction([Ka],e?"readwrite":"readonly").objectStore(Ka)}function yC(){const n=indexedDB.deleteDatabase(fI);return new xo(n).toPromise()}function mI(){const n=indexedDB.open(fI,_C);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ka,{keyPath:pI})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ka)?e(r):(r.close(),await yC(),e(await mI()))})})}async function Bp(n,e,t){const r=Vc(n,!0).put({[pI]:e,value:t});return new xo(r).toPromise()}async function IC(n,e){const t=Vc(n,!1).get(e),r=await new xo(t).toPromise();return r===void 0?null:r.value}function qp(n,e){const t=Vc(n,!0).delete(e);return new xo(t).toPromise()}const wC=800,TC=3;class gI{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=mI(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>TC)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return dI()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Sc._getInstance(gC()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await pC(),!this.activeServiceWorker)return;this.sender=new dC(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||mC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Bp(e,Ga,"1"),await qp(e,Ga)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Bp(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>IC(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>qp(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Vc(s,!1).getAll();return new xo(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),wC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}gI.type="LOCAL";const EC=gI;new Vo(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _I(n,e){return e?Jt(e):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh extends qh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ds(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ds(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ds(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function vC(n){return aI(n.auth,new Gh(n),n.bypassAuthState)}function AC(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),rC(t,new Gh(n),n.bypassAuthState)}async function RC(n){const{auth:e,user:t}=n;return H(t,e,"internal-error"),nC(t,new Gh(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return vC;case"linkViaPopup":case"linkViaRedirect":return RC;case"reauthViaPopup":case"reauthViaRedirect":return AC;default:It(this.auth,"internal-error")}}resolve(e){sn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){sn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PC=new Vo(2e3,1e4);async function xx(n,e,t){if(dt(n.app))return Promise.reject(Rt(n,"operation-not-supported-in-this-environment"));const r=Wr(n);hV(n,e,jh);const s=_I(r,t);return new Ir(r,"signInViaPopup",e,s).executeNotNull()}class Ir extends yI{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Ir.currentPopupAction&&Ir.currentPopupAction.cancel(),Ir.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){sn(this.filter.length===1,"Popup operations only handle one event");const e=zh();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ir.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,PC.get())};e()}}Ir.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bC="pendingRedirect",ya=new Map;class SC extends yI{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ya.get(this.auth._key());if(!e){try{const r=await VC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ya.set(this.auth._key(),e)}return this.bypassAuthState||ya.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function VC(n,e){const t=DC(e),r=xC(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function CC(n,e){ya.set(n._key(),e)}function xC(n){return Jt(n._redirectPersistence)}function DC(n){return _a(bC,n.config.apiKey,n.name)}async function NC(n,e,t=!1){if(dt(n.app))return Promise.reject(Ln(n));const r=Wr(n),s=_I(r,e),o=await new SC(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kC=600*1e3;class OC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!LC(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!II(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Rt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=kC&&this.cachedEventUids.clear(),this.cachedEventUids.has($p(e))}saveEventToCache(e){this.cachedEventUids.add($p(e)),this.lastProcessedEventTime=Date.now()}}function $p(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function II({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function LC(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return II(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MC(n,e={}){return nr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FC=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,UC=/^https?/;async function BC(n){if(n.config.emulator)return;const{authorizedDomains:e}=await MC(n);for(const t of e)try{if(qC(t))return}catch{}It(n,"unauthorized-domain")}function qC(n){const e=Xu(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!UC.test(t))return!1;if(FC.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $C=new Vo(3e4,6e4);function jp(){const n=qt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function jC(n){return new Promise((e,t)=>{function r(){jp(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jp(),t(Rt(n,"network-request-failed"))},timeout:$C.get()})}if(qt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(qt().gapi?.load)r();else{const s=BV("iframefcb");return qt()[s]=()=>{gapi.load?r():t(Rt(n,"network-request-failed"))},rI(`${UV()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Ia=null,e})}let Ia=null;function zC(n){return Ia=Ia||jC(n),Ia}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GC=new Vo(5e3,15e3),KC="__/auth/iframe",WC="emulator/auth/iframe",HC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},QC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function JC(n){const e=n.config;H(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Fh(e,WC):`https://${n.config.authDomain}/${KC}`,r={apiKey:e.apiKey,appName:n.name,v:Lr},s=QC.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${lo(r).slice(1)}`}async function YC(n){const e=await zC(n),t=qt().gapi;return H(t,n,"internal-error"),e.open({where:document.body,url:JC(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:HC,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Rt(n,"network-request-failed"),c=qt().setTimeout(()=>{i(o)},GC.get());function u(){qt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ZC=500,ex=600,tx="_blank",nx="http://localhost";class zp{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function rx(n,e,t,r=ZC,s=ex){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...XC,width:r.toString(),height:s.toString(),top:i,left:o},l=De().toLowerCase();t&&(c=Jy(l)?tx:t),Hy(l)&&(e=e||nx,u.scrollbars="yes");const d=Object.entries(u).reduce((g,[E,S])=>`${g}${E}=${S},`,"");if(CV(l)&&c!=="_self")return sx(e||"",c),new zp(null);const p=window.open(e||"",c,d);H(p,n,"popup-blocked");try{p.focus()}catch{}return new zp(p)}function sx(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ix="__/auth/handler",ox="emulator/auth/handler",ax=encodeURIComponent("fac");async function Gp(n,e,t,r,s,i){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Lr,eventId:s};if(e instanceof jh){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",mw(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Co){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${ax}=${encodeURIComponent(u)}`:"";return`${cx(n)}?${lo(c).slice(1)}${l}`}function cx({config:n}){return n.emulator?Fh(n,ox):`https://${n.authDomain}/${ix}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu="webStorageSupport";class ux{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hI,this._completeRedirectFn=NC,this._overrideRedirectResult=CC}async _openPopup(e,t,r,s){sn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Gp(e,t,r,Xu(),s);return rx(e,i,zh())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Gp(e,t,r,Xu(),s);return fC(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(sn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await YC(e),r=new OC(e);return t.register("authEvent",s=>(H(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(mu,{type:mu},s=>{const i=s?.[0]?.[mu];i!==void 0&&t(!!i),It(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=BC(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return tI()||Qy()||Bh()}}const lx=ux;var Kp="@firebase/auth",Wp="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hx{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dx(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function fx(n){Ar(new Mn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;H(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:nI(n)},l=new LV(r,s,i,u);return GV(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ar(new Mn("auth-internal",e=>{const t=Wr(e.getProvider("auth").getImmediate());return(r=>new hx(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Mt(Kp,Wp,dx(n)),Mt(Kp,Wp,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const px=300,mx=nm("authIdTokenMaxAge")||px;let Hp=null;const gx=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>mx)return;const s=t?.token;Hp!==s&&(Hp=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Dx(n=nl()){const e=Fs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=zV(n,{popupRedirectResolver:lx,persistence:[EC,lC,hI]}),r=nm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=gx(i.toString());aC(t,o,()=>o(t.currentUser)),oC(t,c=>o(c))}}const s=Zp("auth");return s&&KV(t,`http://${s}`),t}function _x(){return document.getElementsByTagName("head")?.[0]??document}MV({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Rt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",_x().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});fx("Browser");export{vx as A,Rx as B,Ax as C,nb as D,Px as E,zb as F,Pn as G,xx as H,rb as I,Vx as J,Ex as K,nl as a,BP as b,_y as c,qP as d,Sx as e,Dx as f,Ix as g,zg as h,aT as i,Ob as j,mv as k,qb as l,wb as m,Av as n,Ju as o,Tb as p,XP as q,Bb as r,Cx as s,Lb as t,Ub as u,Db as v,ZP as w,Nb as x,Fb as y,bx as z};
