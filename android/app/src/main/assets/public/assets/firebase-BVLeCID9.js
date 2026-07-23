import{o as e,R as t}from"./vendor-gmpf-yVK.js";var n={};
/**
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
 */const r=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++r)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const t=e[s],i=s+1<e.length,o=i?e[s+1]:0,a=s+2<e.length,c=a?e[s+2]:0,u=t>>2,l=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(h=64)),r.push(n[u],n[l],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(r(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){const i=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(i>>10)),t[r++]=String.fromCharCode(56320+(1023&i))}else{const i=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<e.length;){const t=n[e.charAt(s++)],o=s<e.length?n[e.charAt(s)]:0;++s;const a=s<e.length?n[e.charAt(s)]:64;++s;const c=s<e.length?n[e.charAt(s)]:64;if(++s,null==t||null==o||null==a||null==c)throw new i;const u=t<<2|o>>4;if(r.push(u),64!==a){const e=o<<4&240|a>>2;if(r.push(e),64!==c){const e=a<<6&192|c;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class i extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const o=function(e){return function(e){const t=r(e);return s.encodeByteArray(t,!0)}(e).replace(/\./g,"")},a=function(e){try{return s.decodeString(e,!0)}catch(Wm){}return null};
/**
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
 */
function c(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
/**
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
 */const u=()=>{try{return c().__FIREBASE_DEFAULTS__||(()=>{if("undefined"==typeof process)return;const e=n.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(Wm){return}const t=e&&a(e[1]);return t&&JSON.parse(t)})()}catch(Wm){return}},l=e=>u()?.emulatorHosts?.[e],h=e=>{const t=l(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},d=()=>u()?.config,f=e=>u()?.[`_${e}`];
/**
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
 */
class p{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
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
 */function m(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e};return[o(JSON.stringify({alg:"none",type:"JWT"})),o(JSON.stringify(i)),""].join(".")}
/**
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
 */function g(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function y(){const e=u()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(Wm){return!1}}function w(){return!y()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function v(){return!y()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function _(){try{return"object"==typeof indexedDB}catch(Wm){return!1}}class b extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,b.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,I.prototype.create)}}class I{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],i=s?function(e,t){return e.replace(T,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(s,n):"Error",o=`${this.serviceName}: ${i} (${r}).`;return new b(r,o,n)}}const T=/\{\$([^}]+)}/g;function E(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const n=e[s],i=t[s];if(S(n)&&S(i)){if(!E(n,i))return!1}else if(n!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function S(e){return null!==e&&"object"==typeof e}
/**
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
 */function x(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function N(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function A(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class C{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=k),void 0===r.error&&(r.error=k),void 0===r.complete&&(r.complete=k);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(Wm){}}),this.observers.push(r),s}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(Wm){"undefined"!=typeof console&&console.error}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function k(){}
/**
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
 */function D(e){return e&&e._delegate?e._delegate:e}
/**
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
 */function R(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function P(e){return(await fetch(e,{credentials:"include"})).ok}class O{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
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
 */const L="[DEFAULT]";
/**
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
 */class V{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new p;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(Wm){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(Wm){if(n)return null;throw Wm}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
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
 */(e))try{this.getOrInitializeService({instanceIdentifier:L})}catch(Wm){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(Wm){}}}}clearInstance(e=L){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=L){return this.instances.has(e)}getOptions(e=L){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&i.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const s=this.instances.get(n);return s&&e(s,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===L?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var r;return n||null}normalizeInstanceIdentifier(e=L){return this.component?this.component.multipleInstances?e:L:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class M{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new V(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
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
 */var U;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(U||(U={}));const F={debug:U.DEBUG,verbose:U.VERBOSE,info:U.INFO,warn:U.WARN,error:U.ERROR,silent:U.SILENT},B=U.INFO,q={[U.DEBUG]:"log",[U.VERBOSE]:"log",[U.INFO]:"info",[U.WARN]:"warn",[U.ERROR]:"error"},j=(e,t,...n)=>{if(t<e.logLevel)return;(new Date).toISOString();if(!q[t])throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class z{constructor(e){this.name=e,this._logLevel=B,this._logHandler=j,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in U))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?F[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,U.DEBUG,...e),this._logHandler(this,U.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,U.VERBOSE,...e),this._logHandler(this,U.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,U.INFO,...e),this._logHandler(this,U.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,U.WARN,...e),this._logHandler(this,U.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,U.ERROR,...e),this._logHandler(this,U.ERROR,...e)}}
/**
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
 */class ${constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const K="@firebase/app",G="0.15.1",H=new z("@firebase/app"),W="@firebase/app-compat",Q="@firebase/analytics-compat",J="@firebase/analytics",Y="@firebase/app-check-compat",X="@firebase/app-check",Z="@firebase/auth",ee="@firebase/auth-compat",te="@firebase/database",ne="@firebase/data-connect",re="@firebase/database-compat",se="@firebase/functions",ie="@firebase/functions-compat",oe="@firebase/installations",ae="@firebase/installations-compat",ce="@firebase/messaging",ue="@firebase/messaging-compat",le="@firebase/performance",he="@firebase/performance-compat",de="@firebase/remote-config",fe="@firebase/remote-config-compat",pe="@firebase/storage",me="@firebase/storage-compat",ge="@firebase/firestore",ye="@firebase/ai",we="@firebase/firestore-compat",ve="firebase",_e="[DEFAULT]",be={[K]:"fire-core",[W]:"fire-core-compat",[J]:"fire-analytics",[Q]:"fire-analytics-compat",[X]:"fire-app-check",[Y]:"fire-app-check-compat",[Z]:"fire-auth",[ee]:"fire-auth-compat",[te]:"fire-rtdb",[ne]:"fire-data-connect",[re]:"fire-rtdb-compat",[se]:"fire-fn",[ie]:"fire-fn-compat",[oe]:"fire-iid",[ae]:"fire-iid-compat",[ce]:"fire-fcm",[ue]:"fire-fcm-compat",[le]:"fire-perf",[he]:"fire-perf-compat",[de]:"fire-rc",[fe]:"fire-rc-compat",[pe]:"fire-gcs",[me]:"fire-gcs-compat",[ge]:"fire-fst",[we]:"fire-fst-compat",[ye]:"fire-vertex","fire-js":"fire-js",[ve]:"fire-js-all"},Ie=new Map,Te=new Map,Ee=new Map;function Se(e,t){try{e.container.addComponent(t)}catch(Wm){H.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,Wm)}}function xe(e){const t=e.name;if(Ee.has(t))return H.debug(`There were multiple attempts to register component ${t}.`),!1;Ee.set(t,e);for(const n of Ie.values())Se(n,e);for(const n of Te.values())Se(n,e);return!0}function Ne(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Ae(e){return null!=e&&void 0!==e.settings}
/**
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
 */const Ce=new I("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
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
 */
class ke{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new O("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ce.create("app-deleted",{appName:this._name})}}
/**
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
 */const De="12.16.0";function Re(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const r={name:_e,automaticDataCollectionEnabled:!0,...t},s=r.name;if("string"!=typeof s||!s)throw Ce.create("bad-app-name",{appName:String(s)});if(n||(n=d()),!n)throw Ce.create("no-options");const i=Ie.get(s);if(i){if(E(n,i.options)&&E(r,i.config))return i;throw Ce.create("duplicate-app",{appName:s})}const o=new M(s);for(const c of Ee.values())o.addComponent(c);const a=new ke(n,r,o);return Ie.set(s,a),a}function Pe(e=_e){const t=Ie.get(e);if(!t&&e===_e&&d())return Re();if(!t)throw Ce.create("no-app",{appName:e});return t}function Oe(){return Array.from(Ie.values())}function Le(e,t,n){let r=be[e]??e;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const e=[`Unable to register library "${r}" with version "${t}":`];return s&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&e.push("and"),i&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void H.warn(e.join(" "))}xe(new O(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}
/**
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
 */const Ve="firebase-heartbeat-store";let Me=null;function Ue(){return Me||(Me=e("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Ve)}catch(Wm){}}}).catch(e=>{throw Ce.create("idb-open",{originalErrorMessage:e.message})})),Me}async function Fe(e,t){try{const n=(await Ue()).transaction(Ve,"readwrite"),r=n.objectStore(Ve);await r.put(t,Be(e)),await n.done}catch(Wm){if(Wm instanceof b)H.warn(Wm.message);else{const t=Ce.create("idb-set",{originalErrorMessage:Wm?.message});H.warn(t.message)}}}function Be(e){return`${e.name}!${e.options.appId}`}
/**
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
 */class qe{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ze(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=je();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
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
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(Wm){H.warn(Wm)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=je(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let r=e.slice();for(const s of e){const e=n.find(e=>e.agent===s.agent);if(e){if(e.dates.push(s.date),$e(n)>t){e.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),$e(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=o(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(Wm){return H.warn(Wm),""}}}function je(){return(new Date).toISOString().substring(0,10)}class ze{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!_()&&new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{t(s.error?.message||"")}}catch(n){t(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Ue()).transaction(Ve),n=await t.objectStore(Ve).get(Be(e));return await t.done,n}catch(Wm){if(Wm instanceof b)H.warn(Wm.message);else{const t=Ce.create("idb-get",{originalErrorMessage:Wm?.message});H.warn(t.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Fe(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Fe(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function $e(e){return o(JSON.stringify({version:2,heartbeats:e})).length}var Ke;Ke="",xe(new O("platform-logger",e=>new $(e),"PRIVATE")),xe(new O("heartbeat",e=>new qe(e),"PRIVATE")),Le(K,G,Ke),Le(K,G,"esm2020"),Le("fire-js","");var Ge,He,We="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const r=Array(16);if("string"==typeof t)for(var s=0;s<16;++s)r[s]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(s=0;s<16;++s)r[s]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],s=e.g[2];let i,o=e.g[3];i=t+(o^n&(s^o))+r[0]+3614090360&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[1]+3905402710&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[2]+606105819&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[3]+3250441966&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[4]+4118548399&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[5]+1200080426&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[6]+2821735955&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[7]+4249261313&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[8]+1770035416&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[9]+2336552879&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[10]+4294925233&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[11]+2304563134&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[12]+1804603682&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[13]+4254626195&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[14]+2792965006&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[15]+1236535329&4294967295,i=t+(s^o&((n=s+(i<<22&4294967295|i>>>10))^s))+r[1]+4129170786&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[6]+3225465664&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[11]+643717713&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[0]+3921069994&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[5]+3593408605&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[10]+38016083&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[15]+3634488961&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[4]+3889429448&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[9]+568446438&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[14]+3275163606&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[3]+4107603335&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[8]+1163531501&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[13]+2850285829&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[2]+4243563512&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[7]+1735328473&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[12]+2368359562&4294967295,i=t+((n=s+(i<<20&4294967295|i>>>12))^s^o)+r[5]+4294588738&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[8]+2272392833&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[11]+1839030562&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[14]+4259657740&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[1]+2763975236&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[4]+1272893353&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[7]+4139469664&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[10]+3200236656&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[13]+681279174&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[0]+3936430074&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[3]+3572445317&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[6]+76029189&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[9]+3654602809&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[12]+3873151461&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[15]+530742520&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[2]+3299628645&4294967295,i=t+(s^((n=s+(i<<23&4294967295|i>>>9))|~o))+r[0]+4096336452&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[7]+1126891415&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[14]+2878612391&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[5]+4237533241&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[12]+1700485571&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[3]+2399980690&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[10]+4293915773&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[1]+2240044497&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[8]+1873313359&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[15]+4264355552&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[6]+2734768916&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[13]+1309151649&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[4]+4149444226&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[11]+3174756917&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[2]+718787259&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(s+(i<<21&4294967295|i>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+o&4294967295}function r(e,t){this.h=t;const n=[];let r=!0;for(let s=e.length-1;s>=0;s--){const i=0|e[s];r&&i==t||(n[s]=i,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const r=t-this.blockSize,s=this.C;let i=this.h,o=0;for(;o<t;){if(0==i)for(;o<=r;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(s[i++]=e.charCodeAt(o++),i==this.blockSize){n(this,s),i=0;break}}else for(;o<t;)if(s[i++]=e[o++],i==this.blockSize){n(this,s),i=0;break}}this.h=i,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};var s={};function i(e){return-128<=e&&e<128?function(e,t){var n=s;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new r([0|e],e<0?-1:0)}):new r([0|e],e<0?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(e<0)return d(o(-e));const t=[];let n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var a=i(0),c=i(1),u=i(16777216);function l(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(l(t))throw Error("division by zero");if(l(e))return new m(a,a);if(h(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(h(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(e.g.length>30){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,r=t;r.l(e)<=0;)n=y(n),r=y(r);var s=w(n,1),i=w(r,1);for(r=w(r,2),n=w(n,2);!l(r);){var u=i.add(r);u.l(e)<=0&&(s=s.add(n),i=u),r=w(r,1),n=w(n,1)}return t=f(e,s.j(t)),new m(s,t)}for(s=a;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=(r=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,r-48),u=(i=o(n)).j(t);h(u)||u.l(e)>0;)u=(i=o(n-=r)).j(t);l(i)&&(i=c),s=s.add(i),e=f(e,u)}return new m(s,e)}function y(e){const t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function w(e,t){const n=t>>5;t%=32;const s=e.g.length-n,i=[];for(let r=0;r<s;r++)i[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(i,e.h)}(e=r.prototype).m=function(){if(h(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(l(this))return"0";if(h(this))return"-"+d(this).toString(e);const t=o(Math.pow(e,6));var n=this;let r="";for(;;){const s=g(n,t).g;let i=(((n=f(n,s.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(l(n=s))return i+r;for(;i.length<6;)i="0"+i;r=i+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=f(this,e))?-1:l(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let s=0;for(let r=0;r<=t;r++){let t=s+(65535&this.i(r))+(65535&e.i(r)),i=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);s=i>>>16,t&=65535,i&=65535,n[r]=i<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(l(this)||l(e))return a;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(this.l(u)<0&&e.l(u)<0)return o(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var s=0;s<2*t;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(let t=0;t<e.g.length;t++){const r=this.i(s)>>>16,i=65535&this.i(s),o=e.i(t)>>>16,a=65535&e.i(t);n[2*s+2*t]+=i*a,p(n,2*s+2*t),n[2*s+2*t+1]+=r*a,p(n,2*s+2*t+1),n[2*s+2*t+1]+=i*o,p(n,2*s+2*t+1),n[2*s+2*t+2]+=r*o,p(n,2*s+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},e.B=function(e){return g(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,He=t,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const r=o(Math.pow(n,8));let s=a;for(let a=0;a<t.length;a+=8){var i=Math.min(8,t.length-a);const e=parseInt(t.substring(a,a+i),n);i<8?(i=o(Math.pow(n,i)),s=s.j(i).add(o(e))):(s=s.j(r),s=s.add(o(e)))}return s},Ge=r}).apply(void 0!==We?We:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var Qe,Je,Ye,Xe,Ze,et,tt,nt,rt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e,t=Object.defineProperty;var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof rt&&rt];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function r(e,r){if(r)e:{var s=n;e=e.split(".");for(var i=0;i<e.length-1;i++){var o=e[i];if(!(o in s))break e;s=s[o]}(r=r(i=s[e=e[e.length-1]]))!=i&&null!=r&&t(s,e,{configurable:!0,writable:!0,value:r})}}r("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var s=s||{},i=this||self;function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){return(c=a).apply(null,arguments)}function u(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function l(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}var h="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function f(e,t){for(let r=1;r<arguments.length;r++){const t=arguments[r];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const r=t.length||0;e.length=n+r;for(let s=0;s<r;s++)e[n+s]=t[s]}else e.push(t)}}function p(e){i.setTimeout(()=>{throw e},0)}function m(){var e=_;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var g=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let w,v=!1,_=new class{constructor(){this.h=this.g=null}add(e,t){const n=g.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},b=()=>{const e=Promise.resolve(void 0);w=()=>{e.then(I)}};function I(){for(var e;e=m();){try{e.h.call(e.g)}catch(n){p(n)}var t=g;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}v=!1}function T(){this.u=this.u,this.C=this.C}function E(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},E.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!i.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};i.addEventListener("test",e,t),i.removeEventListener("test",e,t)}catch(n){}return e}();function x(e){return/^[\s\xa0]*$/.test(e)}function N(e,t){E.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}l(N,E),N.prototype.init=function(e,t){const n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&N.Z.h.call(this)},N.prototype.h=function(){N.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var A="closure_listenable_"+(1e6*Math.random()|0),C=0;function k(e,t,n,r,s){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=s,this.key=++C,this.da=this.fa=!1}function D(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function R(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function P(e){const t={};for(const n in e)t[n]=e[n];return t}const O="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function L(e,t){let n,r;for(let s=1;s<arguments.length;s++){for(n in r=arguments[s],r)e[n]=r[n];for(let t=0;t<O.length;t++)n=O[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function V(e){this.src=e,this.g={},this.h=0}function M(e,t){const n=t.type;if(n in e.g){var r,s=e.g[n],i=Array.prototype.indexOf.call(s,t,void 0);(r=i>=0)&&Array.prototype.splice.call(s,i,1),r&&(D(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function U(e,t,n,r){for(let s=0;s<e.length;++s){const i=e[s];if(!i.da&&i.listener==t&&i.capture==!!n&&i.ha==r)return s}return-1}V.prototype.add=function(e,t,n,r,s){const i=e.toString();(e=this.g[i])||(e=this.g[i]=[],this.h++);const o=U(e,t,r,s);return o>-1?(t=e[o],n||(t.fa=!1)):((t=new k(t,this.src,i,!!r,s)).fa=n,e.push(t)),t};var F="closure_lm_"+(1e6*Math.random()|0),B={};function q(e,t,n,r,s){if(Array.isArray(t)){for(let i=0;i<t.length;i++)q(e,t[i],n,r,s);return null}return n=W(n),e&&e[A]?e.J(t,n,!!o(r)&&!!r.capture,s):function(e,t,n,r,s,i){if(!t)throw Error("Invalid event type");const a=o(s)?!!s.capture:!!s;let c=G(e);if(c||(e[F]=c=new V(e)),n=c.add(t,n,r,a,i),n.proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}const t=K;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)S||(s=a),void 0===s&&(s=!1),e.addEventListener(t.toString(),r,s);else if(e.attachEvent)e.attachEvent($(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}(e,t,n,!1,r,s)}function j(e,t,n,r,s){if(Array.isArray(t))for(var i=0;i<t.length;i++)j(e,t[i],n,r,s);else r=o(r)?!!r.capture:!!r,n=W(n),e&&e[A]?(e=e.i,(i=String(t).toString())in e.g&&((n=U(t=e.g[i],n,r,s))>-1&&(D(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[i],e.h--)))):e&&(e=G(e))&&(t=e.g[t.toString()],e=-1,t&&(e=U(t,n,r,s)),(n=e>-1?t[e]:null)&&z(n))}function z(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[A])M(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent($(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=G(t))?(M(n,e),0==n.h&&(n.src=null,t[F]=null)):D(e)}}}function $(e){return e in B?B[e]:B[e]="on"+e}function K(e,t){if(e.da)e=!0;else{t=new N(t,this);const n=e.listener,r=e.ha||e.src;e.fa&&z(e),e=n.call(r,t)}return e}function G(e){return(e=e[F])instanceof V?e:null}var H="__closure_events_fn_"+(1e9*Math.random()>>>0);function W(e){return"function"==typeof e?e:(e[H]||(e[H]=function(t){return e.handleEvent(t)}),e[H])}function Q(){T.call(this),this.i=new V(this),this.M=this,this.G=null}function J(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new E(t,e);else if(t instanceof E)t.target=t.target||e;else{var s=t;L(t=new E(r,e),s)}let i,o;if(s=!0,n)for(o=n.length-1;o>=0;o--)i=t.g=n[o],s=Y(i,r,!0,t)&&s;if(i=t.g=e,s=Y(i,r,!0,t)&&s,s=Y(i,r,!1,t)&&s,n)for(o=0;o<n.length;o++)i=t.g=n[o],s=Y(i,r,!1,t)&&s}function Y(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let s=!0;for(let i=0;i<t.length;++i){const o=t[i];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&M(e.i,o),s=!1!==t.call(n,r)&&s}}return s&&!r.defaultPrevented}function X(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return Number(t)>2147483647?-1:i.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,X(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}l(Q,T),Q.prototype[A]=!0,Q.prototype.removeEventListener=function(e,t,n,r){j(this,e,t,n,r)},Q.prototype.N=function(){if(Q.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)D(n[e]);delete e.g[t],e.h--}}this.G=null},Q.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Q.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Z extends T{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:X(this)}N(){super.N(),this.g&&(i.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){T.call(this),this.h=e,this.g={}}l(ee,T);var te=[];function ne(e){R(e.g,function(e,t){this.g.hasOwnProperty(t)&&z(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var re=i.JSON.stringify,se=i.JSON.parse,ie=class{stringify(e){return i.JSON.stringify(e,void 0)}parse(e){return i.JSON.parse(e,void 0)}};function oe(){}function ae(){}var ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ue(){E.call(this,"d")}function le(){E.call(this,"c")}l(ue,E),l(le,E);var he={},de=null;function fe(){return de=de||new Q}function pe(e){E.call(this,he.Ia,e)}function me(e){const t=fe();J(t,new pe(t))}function ge(e,t){E.call(this,he.STAT_EVENT,e),this.stat=t}function ye(e){const t=fe();J(t,new ge(t,e))}function we(e,t){E.call(this,he.Ja,e),this.size=t}function ve(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return i.setTimeout(function(){e()},t)}function _e(){this.g=!0}function be(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const i=JSON.parse(t);if(i)for(e=0;e<i.length;e++)if(Array.isArray(i[e])){var n=i[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var s=r[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(let e=1;e<r.length;e++)r[e]=""}}}return re(i)}catch(i){return t}}(e,n)+(r?" "+r:"")})}he.Ia="serverreachability",l(pe,E),he.STAT_EVENT="statevent",l(ge,E),he.Ja="timingevent",l(we,E),_e.prototype.ua=function(){this.g=!1},_e.prototype.info=function(){};var Ie,Te={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ee={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Se(){}function xe(e){return encodeURIComponent(String(e))}function Ne(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function Ae(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ce}function Ce(){this.i=null,this.g="",this.h=!1}l(Se,oe),Se.prototype.g=function(){return new XMLHttpRequest},Ie=new Se;var ke={},De={};function Re(e,t,n){e.M=1,e.A=dt(at(t)),e.u=n,e.R=!0,Pe(e,null)}function Pe(e,t){e.F=Date.now(),Ve(e),e.B=at(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),xt(n.i,"t",r),e.C=0,n=e.j.L,e.h=new Ce,e.g=pn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new Z(c(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var s="readystatechange";Array.isArray(s)||(s&&(te[0]=s.toString()),s=te);for(let i=0;i<s.length;i++){const e=q(n,s[i],r||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?P(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),me(),function(e,t,n,r,s,i){e.info(function(){if(e.g)if(i){var o="",a=i.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Oe(e){return!!e.g&&("GET"==e.v&&2!=e.M&&e.j.Aa)}function Le(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?De:(n=Number(t.substring(n,r)),isNaN(n)?ke:(r+=1)+n>t.length?De:(t=t.slice(r,r+n),e.C=r+n,t))}function Ve(e){e.T=Date.now()+e.H,Me(e,e.H)}function Me(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=ve(c(e.aa,e),t)}function Ue(e){e.D&&(i.clearTimeout(e.D),e.D=null)}function Fe(e){0==e.j.I||e.K||un(e.j,e)}function Be(e){Ue(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function qe(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||Ge(n.h,e)))if(!e.L&&Ge(n.h,e)&&3==n.I){try{var r=n.Ba.g.parse(t)}catch(l){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;cn(n),Jt(n)}sn(n),ye(18)}}else n.xa=s[1],0<n.xa-n.K&&s[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=ve(c(n.Va,n),6e3));Ke(n.h)<=1&&n.ta&&(n.ta=void 0)}else hn(n,11)}else if((e.L||n.g==e)&&cn(n),!x(t))for(s=n.Ba.g.parse(t),t=0;t<s.length;t++){let c=s[t];const l=c[0];if(!(l<=n.K))if(n.K=l,c=c[1],2==n.I)if("c"==c[0]){n.M=c[1],n.ba=c[2];const t=c[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const s=c[4];null!=s&&(n.za=s,n.j.info("SVER="+n.za));const l=c[5];null!=l&&"number"==typeof l&&l>0&&(r=1.5*l,n.O=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var i=r.h;i.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(He(i,i.h),i.h=null))}if(r.G){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.wa=e,ht(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var o=e;if((r=n).na=fn(r,r.L?r.ba:null,r.W),o.L){We(r.h,o);var a=o,u=r.O;u&&(a.H=u),a.D&&(Ue(a),Ve(a)),r.g=o}else rn(r);n.i.length>0&&Zt(n)}else"stop"!=c[0]&&"close"!=c[0]||hn(n,7);else 3==n.I&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?hn(n,7):Qt(n):"noop"!=c[0]&&n.l&&n.l.qa(c),n.A=0)}me()}catch(l){}}Ae.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==Kt(e)?t.j():this.Y(e)},Ae.prototype.Y=function(e){try{if(e==this.g)e:{const c=Kt(this.g),u=this.g.ya();this.g.ca();if(!(c<3)&&(3!=c||this.g&&(this.h.h||this.g.la()||Gt(this.g)))){this.K||4!=c||7==u||me(),Ue(this);var t=this.g.ca();this.X=t;var n=function(e){if(!Oe(e))return e.g.la();const t=Gt(e.g);if(""===t)return"";let n="";const r=t.length,s=4==Kt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return Be(e),Fe(e),"";e.h.i=new i.TextDecoder}for(let i=0;i<r;i++)e.h.h=!0,n+=e.h.i.decode(t[i],{stream:!(s&&i==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,r,s,i,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+t+"\n"+n+"\n"+i+" "+o})}(this.i,this.v,this.B,this.l,this.S,c,t),this.o){if(this.U&&!this.L){t:{if(this.g){var r,s=this.g;if((r=s.g?s.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(r)){var o=r;break t}}o=null}if(!(e=o)){this.o=!1,this.m=3,ye(12),Be(this),Fe(this);break e}be(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,qe(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=Le(this,n),t==De){4==c&&(this.m=4,ye(14),e=!1),be(this.i,this.l,null,"[Incomplete Response]");break}if(t==ke){this.m=4,ye(15),be(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}be(this.i,this.l,t,null),qe(this,t)}if(Oe(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),on(a),a.P=!0,ye(11))}}else be(this.i,this.l,n,"[Invalid Chunked Response]"),Be(this),Fe(this)}else be(this.i,this.l,n,null),qe(this,n);4==c&&Be(this),this.o&&!this.K&&(4==c?un(this.j,this):(this.o=!1,Ve(this)))}else(function(e){const t={};e=(e.g&&Kt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(x(e[r]))continue;var n=Ne(e[r]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=t[s]||[];t[s]=i,i.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),Be(this),Fe(this)}}}catch(An){}},Ae.prototype.cancel=function(){this.K=!0,Be(this)},Ae.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(me(),ye(17)),Be(this),this.m=2,Fe(this)):Me(this,this.T-e)};var je=class{constructor(e,t){this.g=e,this.map=t}};function ze(e){this.l=e||10,i.PerformanceNavigationTiming?e=(e=i.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(i.chrome&&i.chrome.loadTimes&&i.chrome.loadTimes()&&i.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function $e(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ke(e){return e.h?1:e.g?e.g.size:0}function Ge(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function He(e,t){e.g?e.g.add(t):e.h=t}function We(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function st(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}ze.prototype.cancel=function(){if(this.i=st(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var it=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ot(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof ot?(this.l=e.l,ct(this,e.j),this.o=e.o,this.g=e.g,ut(this,e.u),this.h=e.h,lt(this,Nt(e.i)),this.m=e.m):e&&(t=String(e).match(it))?(this.l=!1,ct(this,t[1]||"",!0),this.o=ft(t[2]||""),this.g=ft(t[3]||"",!0),ut(this,t[4]),this.h=ft(t[5]||"",!0),lt(this,t[6]||"",!0),this.m=ft(t[7]||"")):(this.l=!1,this.i=new bt(null,this.l))}function at(e){return new ot(e)}function ct(e,t,n){e.j=n?ft(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function ut(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function lt(e,t,n){t instanceof bt?(e.i=t,function(e,t){t&&!e.j&&(It(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(Tt(this,t),xt(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=pt(t,vt)),e.i=new bt(t,e.l))}function ht(e,t,n){e.i.set(t,n)}function dt(e){return ht(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function ft(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function pt(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,mt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function mt(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}ot.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(pt(t,gt,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(pt(t,gt,!0),"@"),e.push(xe(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(pt(n,"/"==n.charAt(0)?wt:yt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",pt(n,_t)),e.join("")},ot.prototype.resolve=function(e){const t=at(this);let n=!!e.j;n?ct(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var r=e.h;if(n)ut(t,e.u);else if(n=!!e.h){if("/"!=r.charAt(0))if(this.g&&!this.h)r="/"+r;else{var s=t.h.lastIndexOf("/");-1!=s&&(r=t.h.slice(0,s+1)+r)}if(".."==(s=r)||"."==s)r="";else if(-1!=s.indexOf("./")||-1!=s.indexOf("/.")){r=0==s.lastIndexOf("/",0),s=s.split("/");const e=[];for(let t=0;t<s.length;){const n=s[t++];"."==n?r&&t==s.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),r&&t==s.length&&e.push("")):(e.push(n),r=!0)}r=e.join("/")}else r=s}return n?t.h=r:n=""!==e.i.toString(),n?lt(t,Nt(e.i)):n=!!e.m,n&&(t.m=e.m),t};var gt=/[#\/\?@]/g,yt=/[#\?:]/g,wt=/[#\?]/g,vt=/[#\?@]/g,_t=/#/g;function bt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function It(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const r=e[n].indexOf("=");let s,i=null;r>=0?(s=e[n].substring(0,r),i=e[n].substring(r+1)):s=e[n],t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function Tt(e,t){It(e),t=At(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Et(e,t){return It(e),t=At(e,t),e.g.has(t)}function St(e,t){It(e);let n=[];if("string"==typeof t)Et(e,t)&&(n=n.concat(e.g.get(At(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function xt(e,t,n){Tt(e,t),n.length>0&&(e.i=null,e.g.set(At(e,t),d(n)),e.h+=n.length)}function Nt(e){const t=new bt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function At(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Ct(e,t,n,r,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),r(n)}catch(i){}}function kt(){this.g=new ie}function Dt(e){this.i=e.Sb||null,this.h=e.ab||!1}function Rt(e,t){Q.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function Pt(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function Ot(e){e.readyState=4,e.l=null,e.j=null,e.B=null,Lt(e)}function Lt(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Vt(e){let t="";return R(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function Mt(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Vt(n),"string"==typeof e?null!=n&&xe(n):ht(e,t,n))}function Ut(e){Q.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=bt.prototype).add=function(e,t){It(this),this.i=null,e=At(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){It(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.set=function(e,t){return It(this),this.i=null,Et(this,e=At(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=St(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];const s=xe(n);n=St(this,n);for(let t=0;t<n.length;t++){let r=s;""!==n[t]&&(r+="="+xe(n[t])),e.push(r)}}return this.i=e.join("&")},l(Dt,oe),Dt.prototype.g=function(){return new Rt(this.i,this.h)},l(Rt,Q),(e=Rt.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,Lt(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||i).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,Ot(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Lt(this)),this.g&&(this.readyState=3,Lt(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==i.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Pt(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Ot(this):Lt(this),3==this.readyState&&Pt(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,Ot(this))},e.Na=function(e){this.g&&(this.response=e,Ot(this))},e.ga=function(){this.g&&Ot(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Rt.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),l(Ut,Q);var Ft=/^https?$/i,Bt=["POST","PUT"];function qt(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,jt(e),$t(e)}function jt(e){e.A||(e.A=!0,J(e,"complete"),J(e,"error"))}function zt(e){if(e.h&&void 0!==s)if(e.v&&4==Kt(e))setTimeout(e.Ca.bind(e),0);else if(J(e,"readystatechange"),4==Kt(e)){e.h=!1;try{const s=e.ca();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===s){let t=String(e.D).match(it)[1]||null;!t&&i.self&&i.self.location&&(t=i.self.location.protocol.slice(0,-1)),r=!Ft.test(t?t.toLowerCase():"")}n=r}if(n)J(e,"complete"),J(e,"success");else{e.o=6;try{var o=Kt(e)>2?e.g.statusText:""}catch(a){o=""}e.l=o+" ["+e.ca()+"]",jt(e)}}finally{$t(e)}}}function $t(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const r=e.g;e.g=null,t||J(e,"ready");try{r.onreadystatechange=null}catch(n){}}}function Kt(e){return e.g?e.g.readyState:0}function Gt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Ht(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Wt(e){this.za=0,this.i=[],this.j=new _e,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ht("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ht("baseRetryDelayMs",5e3,e),this.Za=Ht("retryDelaySeedMs",1e4,e),this.Ta=Ht("forwardChannelMaxRetries",2,e),this.va=Ht("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new ze(e&&e.concurrentRequestLimit),this.Ba=new kt,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function Qt(e){if(Yt(e),3==e.I){var t=e.V++,n=at(e.J);if(ht(n,"SID",e.M),ht(n,"RID",t),ht(n,"TYPE","terminate"),tn(e,n),(t=new Ae(e,e.j,t)).M=2,t.A=dt(at(n)),n=!1,i.navigator&&i.navigator.sendBeacon)try{n=i.navigator.sendBeacon(t.A.toString(),"")}catch(r){}!n&&i.Image&&((new Image).src=t.A,n=!0),n||(t.g=pn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),Ve(t)}dn(e)}function Jt(e){e.g&&(on(e),e.g.cancel(),e.g=null)}function Yt(e){Jt(e),e.v&&(i.clearTimeout(e.v),e.v=null),cn(e),e.h.cancel(),e.m&&("number"==typeof e.m&&i.clearTimeout(e.m),e.m=null)}function Zt(e){if(!$e(e.h)&&!e.m){e.m=!0;var t=e.Ea;w||b(),v||(w(),v=!0),_.add(t,e),e.D=0}}function en(e,t){var n;n=t?t.l:e.V++;const r=at(e.J);ht(r,"SID",e.M),ht(r,"RID",n),ht(r,"AID",e.K),tn(e,r),e.u&&e.o&&Mt(r,e.u,e.o),n=new Ae(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=nn(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),He(e.h,n),Re(n,r,t)}function tn(e,t){e.H&&R(e.H,function(e,n){ht(t,n,e)}),e.l&&R({},function(e,n){ht(t,n,e)})}function nn(e,t,n){n=Math.min(e.i.length,n);const r=e.l?c(e.l.Ka,e.l,e):null;e:{var s=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=s[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let u=0;u<n;u++){var i=s[u].g;const n=s[u].map;if((i-=t)<0)t=Math.max(0,s[u].g-100),c=!1;else try{i="req"+i+"_"||"";try{var a=n instanceof Map?n:Object.entries(n);for(const[t,n]of a){let r=n;o(n)&&(r=re(n)),e.push(i+t+"="+encodeURIComponent(r))}}catch(Xt){throw e.push(i+"type="+encodeURIComponent("_badmap")),Xt}}catch(Xt){r&&r(n)}}if(c){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,n),t.G=e,a}function rn(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;w||b(),v||(w(),v=!0),_.add(t,e),e.A=0}}function sn(e){return!(e.g||e.v||e.A>=3)&&(e.Y++,e.v=ve(c(e.Da,e),ln(e,e.A)),e.A++,!0)}function on(e){null!=e.B&&(i.clearTimeout(e.B),e.B=null)}function an(e){e.g=new Ae(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=at(e.na);ht(t,"RID","rpc"),ht(t,"SID",e.M),ht(t,"AID",e.K),ht(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&ht(t,"TO",e.ia),ht(t,"TYPE","xmlhttp"),tn(e,t),e.u&&e.o&&Mt(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=dt(at(t)),n.u=null,n.R=!0,Pe(n,e)}function cn(e){null!=e.C&&(i.clearTimeout(e.C),e.C=null)}function un(e,t){var n=null;if(e.g==t){cn(e),on(e),e.g=null;var r=2}else{if(!Ge(e.h,t))return;n=t.G,We(e.h,t),r=1}if(0!=e.I)if(t.o)if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.F;var s=e.D;J(r=fe(),new we(r,n)),Zt(e)}else rn(e);else if(3==(s=t.m)||0==s&&t.X>0||!(1==r&&function(e,t){return!(Ke(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=ve(c(e.Ea,e,t),ln(e,e.D)),e.D++,0)))}(e,t)||2==r&&sn(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),s){case 1:hn(e,5);break;case 4:hn(e,10);break;case 3:hn(e,6);break;default:hn(e,2)}}function ln(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function hn(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.bb,e),r=e.Ua;const t=!r;r=new ot(r||"//www.google.com/images/cleardot.gif"),i.location&&"http"==i.location.protocol||ct(r,"https"),dt(r),t?function(e,t){const n=new _e;if(i.Image){const r=new Image;r.onload=u(Ct,n,"TestLoadImage: loaded",!0,t,r),r.onerror=u(Ct,n,"TestLoadImage: error",!1,t,r),r.onabort=u(Ct,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=u(Ct,n,"TestLoadImage: timeout",!1,t,r),i.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){new _e;const n=new AbortController,r=setTimeout(()=>{n.abort(),Ct(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(r),e.ok?Ct(0,0,!0,t):Ct(0,0,!1,t)}).catch(()=>{clearTimeout(r),Ct(0,0,!1,t)})}(r.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),dn(e),Yt(e)}function dn(e){if(e.I=0,e.ja=[],e.l){const t=st(e.h);0==t.length&&0==e.i.length||(f(e.ja,t),f(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function fn(e,t,n){var r=n instanceof ot?at(n):new ot(n);if(""!=r.g)t&&(r.g=t+"."+r.g),ut(r,r.u);else{var s=i.location;r=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;const e=new ot(null);r&&ct(e,r),t&&(e.g=t),s&&ut(e,s),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&ht(r,n,t),ht(r,"VER",e.ka),tn(e,r),r}function pn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Ut(new Dt({ab:n})):new Ut(e.ma)).Fa(e.L),t}function mn(){}function gn(){}function yn(e,t){Q.call(this),this.g=new Wt(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!x(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!x(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new _n(this)}function wn(e){ue.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function vn(){le.call(this),this.status=1}function _n(e){this.g=e}(e=Ut.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ie.g(),this.g.onreadystatechange=h(c(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void qt(this,o)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=i.FormData&&e instanceof i.FormData,!(Array.prototype.indexOf.call(Bt,t,void 0)>=0)||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,a]of n)this.g.setRequestHeader(i,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(o){qt(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,J(this,"complete"),J(this,"abort"),$t(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),$t(this,!0)),Ut.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?zt(this):this.Xa())},e.Xa=function(){zt(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return Kt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),se(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Wt.prototype).ka=8,e.I=1,e.connect=function(e,t,n,r){ye(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=fn(this,null,this.W),Zt(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const s=new Ae(this,this.j,e);let i=this.o;if(this.U&&(i?(i=P(i),L(i,this.U)):i=this.U),null!==this.u||this.R||(s.J=i,i=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if((t+=r)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=nn(this,s,t),ht(n=at(this.J),"RID",e),ht(n,"CVER",22),this.G&&ht(n,"X-HTTP-Session-Id",this.G),tn(this,n),i&&(this.R?t="headers="+xe(Vt(i))+"&"+t:this.u&&Mt(n,this.u,i)),He(this.h,s),this.Ra&&ht(n,"TYPE","init"),this.S?(ht(n,"$req",t),ht(n,"SID","null"),s.U=!0,Re(s,n,null)):Re(s,n,t),this.I=2}}else 3==this.I&&(e?en(this,e):0==this.i.length||$e(this.h)||en(this))},e.Da=function(){if(this.v=null,an(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=ve(c(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),Jt(this),an(this))},e.Va=function(){null!=this.C&&(this.C=null,Jt(this),sn(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=mn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},gn.prototype.g=function(e,t){return new yn(e,t)},l(yn,Q),yn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},yn.prototype.close=function(){Qt(this.g)},yn.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=re(e),e=n);t.i.push(new je(t.Ya++,e)),3==t.I&&Zt(t)},yn.prototype.N=function(){this.g.l=null,delete this.j,Qt(this.g),delete this.g,yn.Z.N.call(this)},l(wn,ue),l(vn,le),l(_n,mn),_n.prototype.ra=function(){J(this.g,"a")},_n.prototype.qa=function(e){J(this.g,new wn(e))},_n.prototype.pa=function(e){J(this.g,new vn)},_n.prototype.oa=function(){J(this.g,"b")},gn.prototype.createWebChannel=gn.prototype.g,yn.prototype.send=yn.prototype.o,yn.prototype.open=yn.prototype.m,yn.prototype.close=yn.prototype.close,nt=function(){return new gn},tt=function(){return fe()},et=he,Ze={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Te.NO_ERROR=0,Te.TIMEOUT=8,Te.HTTP_ERROR=6,Xe=Te,Ee.COMPLETE="complete",Ye=Ee,ae.EventType=ce,ce.OPEN="a",ce.CLOSE="b",ce.ERROR="c",ce.MESSAGE="d",Q.prototype.listen=Q.prototype.J,Je=ae,Ut.prototype.listenOnce=Ut.prototype.K,Ut.prototype.getLastError=Ut.prototype.Ha,Ut.prototype.getLastErrorCode=Ut.prototype.ya,Ut.prototype.getStatus=Ut.prototype.ca,Ut.prototype.getResponseJson=Ut.prototype.La,Ut.prototype.getResponseText=Ut.prototype.la,Ut.prototype.send=Ut.prototype.ea,Ut.prototype.setWithCredentials=Ut.prototype.Fa,Qe=Ut}).apply(void 0!==rt?rt:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
/**
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
 */
class st{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}st.UNAUTHENTICATED=new st(null),st.GOOGLE_CREDENTIALS=new st("google-credentials-uid"),st.FIRST_PARTY=new st("first-party-uid"),st.MOCK_USER=new st("mock-user");
/**
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
 */
let it="12.15.0";
/**
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
 */
/**
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
 */
const ot=new z("@firebase/firestore");function at(){return ot.logLevel}function ct(e,...t){if(ot.logLevel<=U.DEBUG){const n=t.map(ht);ot.debug(`Firestore (${it}): ${e}`,...n)}}function ut(e,...t){if(ot.logLevel<=U.ERROR){const n=t.map(ht);ot.error(`Firestore (${it}): ${e}`,...n)}}function lt(e,...t){if(ot.logLevel<=U.WARN){const n=t.map(ht);ot.warn(`Firestore (${it}): ${e}`,...n)}}function ht(e){if("string"==typeof e)return e;try{return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
/**
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
 */function dt(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,ft(e,r,n)}function ft(e,t,n){let r=`FIRESTORE (${it}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw ut(r),new Error(r)}function pt(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||ft(t,s,r)}function mt(e,t){return e}
/**
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
 */const gt={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class yt extends b{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
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
 */class wt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
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
 */class vt{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _t{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(st.UNAUTHENTICATED))}shutdown(){}}class bt{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class It{constructor(e){this.t=e,this.currentUser=st.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){pt(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new wt,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{ct("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(ct("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new wt)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(ct("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(pt("string"==typeof t.accessToken,31837,{l:t}),new vt(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return pt(null===e||"string"==typeof e,2055,{h:e}),new st(e)}}class Tt{constructor(e,t,n){this.T=e,this.P=t,this.R=n,this.type="FirstParty",this.user=st.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class Et{constructor(e,t,n){this.T=e,this.P=t,this.R=n}getToken(){return Promise.resolve(new Tt(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable(()=>t(st.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class St{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class xt{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ae(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){pt(void 0===this.o,3512);const n=e=>{null!=e.error&&ct("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,ct("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{ct("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):ct("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new St(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(pt("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new St(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
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
 */
function Nt(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
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
 */class At{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=Nt(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function Ct(e,t){return e<t?-1:e>t?1:0}function kt(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return Pt(n)===Pt(s)?Ct(n,s):Pt(n)?1:-1}return Ct(e.length,t.length)}const Dt=55296,Rt=57343;function Pt(e){const t=e.charCodeAt(0);return t>=Dt&&t<=Rt}function Ot(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function Lt(e){return e+"\0"}
/**
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
 */const Vt="__name__";class Mt{constructor(e,t,n){void 0===t?t=0:t>e.length&&dt(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&dt(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===Mt.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Mt?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=Mt.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return Ct(e.length,t.length)}static compareSegments(e,t){const n=Mt.isNumericId(e),r=Mt.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?Mt.extractNumericId(e).compare(Mt.extractNumericId(t)):kt(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ge.fromString(e.substring(4,e.length-2))}}class Ut extends Mt{construct(e,t,n){return new Ut(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new yt(gt.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new Ut(t)}static emptyPath(){return new Ut([])}}const Ft=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Bt extends Mt{construct(e,t,n){return new Bt(e,t,n)}static isValidIdentifier(e){return Ft.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Bt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Vt}static keyField(){return new Bt([Vt])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new yt(gt.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new yt(gt.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new yt(gt.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new yt(gt.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Bt(t)}static emptyPath(){return new Bt([])}}
/**
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
 */class qt{constructor(e){this.path=e}static fromPath(e){return new qt(Ut.fromString(e))}static fromName(e){return new qt(Ut.fromString(e).popFirst(5))}static empty(){return new qt(Ut.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Ut.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Ut.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new qt(new Ut(e.slice()))}}
/**
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
 */function jt(e,t,n){if(!n)throw new yt(gt.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function zt(e,t,n,r){if(!0===t&&!0===r)throw new yt(gt.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function $t(e){if(!qt.isDocumentKey(e))throw new yt(gt.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Kt(e){if(qt.isDocumentKey(e))throw new yt(gt.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Gt(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function Ht(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":dt(12329,{type:typeof e})}function Wt(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new yt(gt.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ht(e);throw new yt(gt.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function Qt(e,t){if(t<=0)throw new yt(gt.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
/**
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
 */function Jt(e,t){const n={typeString:e};return t&&(n.value=t),n}function Yt(e,t){if(!Gt(e))throw new yt(gt.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new yt(gt.INVALID_ARGUMENT,n);return!0}
/**
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
 */const Xt=-62135596800,Zt=1e6;class en{static now(){return en.fromMillis(Date.now())}static fromDate(e){return en.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Zt);return new en(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new yt(gt.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new yt(gt.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Xt)throw new yt(gt.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new yt(gt.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Zt}_compareTo(e){return this.seconds===e.seconds?Ct(this.nanoseconds,e.nanoseconds):Ct(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:en._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Yt(e,en._jsonSchema))return new en(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Xt;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}en._jsonSchemaVersion="firestore/timestamp/1.0",en._jsonSchema={type:Jt("string",en._jsonSchemaVersion),seconds:Jt("number"),nanoseconds:Jt("number")};
/**
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
 */
class tn{static fromTimestamp(e){return new tn(e)}static min(){return new tn(new en(0,0))}static max(){return new tn(new en(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
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
 */const nn=-1;class rn{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function sn(e){return e.fields.find(e=>2===e.kind)}function on(e){return e.fields.filter(e=>2!==e.kind)}function an(e,t){let n=Ct(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(n=un(e.fields[r],t.fields[r]),0!==n)return n;return Ct(e.fields.length,t.fields.length)}rn.UNKNOWN_ID=-1;class cn{constructor(e,t){this.fieldPath=e,this.kind=t}}function un(e,t){const n=Bt.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:Ct(e.kind,t.kind)}class ln{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ln(0,fn.min())}}function hn(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=tn.fromTimestamp(1e9===r?new en(n+1,0):new en(n,r));return new fn(s,qt.empty(),t)}function dn(e){return new fn(e.readTime,e.key,nn)}class fn{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new fn(tn.min(),qt.empty(),nn)}static max(){return new fn(tn.max(),qt.empty(),nn)}}function pn(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=qt.comparator(e.documentKey,t.documentKey),0!==n?n:Ct(e.largestBatchId,t.largestBatchId)
/**
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
 */)}const mn="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class gn{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
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
 */async function yn(e){if(e.code!==gt.FAILED_PRECONDITION||e.message!==mn)throw e;ct("LocalStore","Unexpectedly lost primary lease")}
/**
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
 */class wn{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&dt(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new wn((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof wn?t:wn.resolve(t)}catch(e){return wn.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):wn.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):wn.reject(t)}static resolve(e){return new wn((t,n)=>{t(e)})}static reject(e){return new wn((t,n)=>{n(e)})}static waitFor(e){return new wn((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=wn.resolve(!1);for(const n of e)t=t.next(e=>e?wn.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new wn((n,r)=>{const s=e.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;t(e[c]).next(e=>{i[c]=e,++o,o===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new wn((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}
/**
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
 */const vn="SimpleDb";class _n{static open(e,t,n,r){try{return new _n(t,e.transaction(r,n))}catch(e){throw new En(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.v=new wt,this.transaction.oncomplete=()=>{this.v.resolve()},this.transaction.onabort=()=>{t.error?this.v.reject(new En(e,t.error)):this.v.resolve()},this.transaction.onerror=t=>{const n=Cn(t.target.error);this.v.reject(new En(e,n))}}get S(){return this.v.promise}abort(e){e&&this.v.reject(e),this.aborted||(ct(vn,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}D(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new xn(t)}}class bn{static delete(e){return ct(vn,"Removing database:",e),Nn(c().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!_())return!1;if(bn.F())return!0;const e=g(),t=bn.O(e),n=0<t&&t<10,r=In(e),s=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static F(){return"undefined"!=typeof process&&"YES"===process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static M(e,t){return e.store(t)}static O(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.L=null,12.2===bn.O(g())&&ut("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async B(e){return this.db||(ct(vn,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new En(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new yt(gt.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new yt(gt.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new En(e,r))},r.onupgradeneeded=e=>{ct(vn,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.N.U(t,r.transaction,e.oldVersion,this.version).next(()=>{ct(vn,"Database upgrade to version "+this.version+" complete")})}})),this.k&&(this.db.onversionchange=e=>this.k(e)),this.db}q(e){this.k=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const s="readonly"===t;let i=0;for(;;){++i;try{this.db=await this.B(e);const t=_n.open(this.db,e,s?"readonly":"readwrite",n),i=r(t).next(e=>(t.D(),e)).catch(e=>(t.abort(e),wn.reject(e))).toPromise();return i.catch(()=>{}),await t.S,i}catch(e){const t=e,n="FirebaseError"!==t.name&&i<3;if(ct(vn,"Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function In(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class Tn{constructor(e){this.$=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.$=e}done(){this.K=!0}j(e){this.W=e}delete(){return Nn(this.$.delete())}}class En extends yt{constructor(e,t){super(gt.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Sn(e){return"IndexedDbTransactionError"===e.name}class xn{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(ct(vn,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(ct(vn,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Nn(n)}add(e){return ct(vn,"ADD",this.store.name,e,e),Nn(this.store.add(e))}get(e){return Nn(this.store.get(e)).next(t=>(void 0===t&&(t=null),ct(vn,"GET",this.store.name,e,t),t))}delete(e){return ct(vn,"DELETE",this.store.name,e),Nn(this.store.delete(e))}count(){return ct(vn,"COUNT",this.store.name),Nn(this.store.count())}H(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new wn((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.J(e,(e,n)=>{t.push(n)}).next(()=>t)}}Y(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new wn((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}Z(e,t){ct(vn,"DELETE ALL",this.store.name);const n=this.options(e,t);n.X=!1;const r=this.cursor(n);return this.J(r,(e,t,n)=>n.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.J(r,t)}te(e){const t=this.cursor({});return new wn((n,r)=>{t.onerror=e=>{const t=Cn(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}J(e,t){const n=[];return new wn((r,s)=>{e.onerror=e=>{s(e.target.error)},e.onsuccess=e=>{const s=e.target.result;if(!s)return void r();const i=new Tn(s),o=t(s.primaryKey,s.value,i);if(o instanceof wn){const e=o.catch(e=>(i.done(),wn.reject(e)));n.push(e)}i.isDone?r():null===i.G?s.continue():s.continue(i.G)}}).next(()=>wn.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Nn(e){return new wn((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=Cn(e.target.error);n(t)}})}let An=!1;function Cn(e){const t=bn.O(g());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new yt("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return An||(An=!0,setTimeout(()=>{throw e},0)),e}}return e}const kn="IndexBackfiller";class Dn{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){ct(kn,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.ne.ie();ct(kn,`Documents written: ${e}`)}catch(e){Sn(e)?ct(kn,"Ignoring IndexedDB error during index backfill: ",e):await yn(e)}await this.re(6e4)})}}class Rn{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let r=t,s=!0;return wn.doWhile(()=>!0===s&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return ct(kn,`Processing collection: ${t}`),this._e(e,t,r).next(e=>{r-=e,n.add(t)});s=!1})).next(()=>t-r)}_e(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const s=n.changes;return this.localStore.indexManager.updateIndexEntries(e,s).next(()=>this.oe(r,n)).next(n=>(ct(kn,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>s.size)}))}oe(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=dn(t);pn(r,n)>0&&(n=r)}),new fn(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}
/**
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
 */class Pn{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Pn.ce=-1;
/**
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
 */
const On=-1;function Ln(e){return null==e}function Vn(e){return 0===e&&1/e==-1/0}function Mn(e){return"number"==typeof e&&Number.isInteger(e)&&!Vn(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
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
 */
const Un="";function Fn(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=qn(t)),t=Bn(e.get(n),t);return qn(t)}function Bn(e,t){let n=t;const r=e.length;for(let s=0;s<r;s++){const t=e.charAt(s);switch(t){case"\0":n+="";break;case Un:n+="";break;default:n+=t}}return n}function qn(e){return e+Un+""}function jn(e){const t=e.length;if(pt(t>=2,64408,{path:e}),2===t)return pt(e.charAt(0)===Un&&""===e.charAt(1),56145,{path:e}),Ut.emptyPath();const n=t-2,r=[];let s="";for(let i=0;i<t;){const t=e.indexOf(Un,i);switch((t<0||t>n)&&dt(50515,{path:e}),e.charAt(t+1)){case"":const n=e.substring(i,t);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=e.substring(i,t),s+="\0";break;case"":s+=e.substring(i,t+1);break;default:dt(61167,{path:e})}i=t+2}return new Ut(r)}
/**
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
 */const zn="remoteDocuments",$n="owner",Kn="owner",Gn="mutationQueues",Hn="mutations",Wn="batchId",Qn="userMutationsIndex",Jn=["userId","batchId"];
/**
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
 */function Yn(e,t){return[e,Fn(t)]}function Xn(e,t,n){return[e,Fn(t),n]}const Zn={},er="documentMutations",tr="remoteDocumentsV14",nr=["prefixPath","collectionGroup","readTime","documentId"],rr="documentKeyIndex",sr=["prefixPath","collectionGroup","documentId"],ir="collectionGroupIndex",or=["collectionGroup","readTime","prefixPath","documentId"],ar="remoteDocumentGlobal",cr="remoteDocumentGlobalKey",ur="targets",lr="queryTargetsIndex",hr=["canonicalId","targetId"],dr="targetDocuments",fr=["targetId","path"],pr="documentTargetsIndex",mr=["path","targetId"],gr="targetGlobalKey",yr="targetGlobal",wr="collectionParents",vr=["collectionId","parent"],_r="clientMetadata",br="bundles",Ir="namedQueries",Tr="indexConfiguration",Er="collectionGroupIndex",Sr="indexState",xr=["indexId","uid"],Nr="sequenceNumberIndex",Ar=["uid","sequenceNumber"],Cr="indexEntries",kr=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Dr="documentKeyIndex",Rr=["indexId","uid","orderedDocumentKey"],Pr="documentOverlays",Or=["userId","collectionPath","documentId"],Lr="collectionPathOverlayIndex",Vr=["userId","collectionPath","largestBatchId"],Mr="collectionGroupOverlayIndex",Ur=["userId","collectionGroup","largestBatchId"],Fr="globals",Br=[Gn,Hn,er,zn,ur,$n,yr,dr,_r,ar,wr,br,Ir],qr=[...Br,Pr],jr=[Gn,Hn,er,tr,ur,$n,yr,dr,_r,ar,wr,br,Ir,Pr],zr=jr,$r=[...zr,Tr,Sr,Cr],Kr=$r,Gr=[...$r,Fr],Hr=Gr;
/**
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
 */class Wr extends gn{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Qr(e,t){const n=mt(e);return bn.M(n.le,t)}
/**
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
 */class Jr{constructor(e,t){this.comparator=e,this.root=t||Xr.EMPTY}insert(e,t){return new Jr(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Xr.BLACK,null,null))}remove(e){return new Jr(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Xr.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Yr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Yr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Yr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Yr(this.root,e,this.comparator,!0)}}class Yr{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Xr{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:Xr.RED,this.left=null!=r?r:Xr.EMPTY,this.right=null!=s?s:Xr.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new Xr(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Xr.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return Xr.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Xr.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Xr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw dt(43730,{key:this.key,value:this.value});if(this.right.isRed())throw dt(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw dt(27949);return e+(this.isRed()?0:1)}}Xr.EMPTY=null,Xr.RED=!0,Xr.BLACK=!1,Xr.EMPTY=new class{constructor(){this.size=0}get key(){throw dt(57766)}get value(){throw dt(16141)}get color(){throw dt(16727)}get left(){throw dt(29726)}get right(){throw dt(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new Xr(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
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
 */
class Zr{constructor(e){this.comparator=e,this.data=new Jr(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new es(this.data.getIterator())}getIteratorFrom(e){return new es(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Zr))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Zr(this.comparator);return t.data=e,t}}class es{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function ts(e){return e.hasNext()?e.getNext():void 0}
/**
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
 */class ns{constructor(e){this.fields=e,e.sort(Bt.comparator)}static empty(){return new ns([])}unionWith(e){let t=new Zr(Bt.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new ns(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ot(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
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
 */function rs(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function ss(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function is(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function os(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
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
 */class as extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
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
 */
/**
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
 */
class cs{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new as("Invalid base64 string: "+e):e}}(e);return new cs(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new cs(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
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
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ct(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}cs.EMPTY_BYTE_STRING=new cs("");const us=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ls(e){if(pt(!!e,39018),"string"==typeof e){let t=0;const n=us.exec(e);if(pt(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:hs(e.seconds),nanos:hs(e.nanos)}}function hs(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function ds(e){return"string"==typeof e?cs.fromBase64String(e):cs.fromUint8Array(e)}
/**
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
 */const fs="server_timestamp",ps="__type__",ms="__previous_value__",gs="__local_write_time__";function ys(e){const t=(e?.mapValue?.fields||{})[ps]?.stringValue;return t===fs}function ws(e){const t=e.mapValue.fields[ms];return ys(t)?ws(t):t}function vs(e){const t=ls(e.mapValue.fields[gs].timestampValue);return new en(t.seconds,t.nanos)}
/**
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
 */class _s{constructor(e,t,n,r,s,i,o,a,c,u,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u,this.apiKey=l}}const bs="(default)";class Is{constructor(e,t){this.projectId=e,this.database=t||bs}static empty(){return new Is("","")}get isDefaultDatabase(){return this.database===bs}isEqual(e){return e instanceof Is&&e.projectId===this.projectId&&e.database===this.database}}
/**
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
 */
const Ts="__type__",Es="__max__",Ss={mapValue:{fields:{__type__:{stringValue:Es}}}},xs="__vector__",Ns="value",As={nullValue:"NULL_VALUE"},Cs={booleanValue:!0},ks={booleanValue:!1};function Ds(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ys(e)?4:Ys(e)?9007199254740991:Ws(e)?10:11:dt(28295,{value:e})}function Rs(e,t,n){if(e===t)return!0;const r=Ds(e);if(r!==Ds(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return vs(e).isEqual(vs(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=ls(e.timestampValue),r=ls(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return ds(e.bytesValue).isEqual(ds(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return hs(e.geoPointValue.latitude)===hs(t.geoPointValue.latitude)&&hs(e.geoPointValue.longitude)===hs(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t,n){if("integerValue"in e&&"integerValue"in t)return hs(e.integerValue)===hs(t.integerValue);let r,s;if("doubleValue"in e&&"doubleValue"in t)r=hs(e.doubleValue),s=hs(t.doubleValue);else{if(!n?.Ee)return!1;r=hs(e.integerValue??e.doubleValue),s=hs(t.integerValue??t.doubleValue)}return r===s?!!n?.he||Vn(r)===Vn(s):!(void 0!==n&&!n.Te)&&isNaN(r)&&isNaN(s)}(e,t,n);case 9:return Ot(e.arrayValue.values||[],t.arrayValue.values||[],(e,t)=>Rs(e,t,n));case 10:case 11:return function(e,t,n){const r=e.mapValue.fields||{},s=t.mapValue.fields||{};if(rs(r)!==rs(s))return!1;for(const i in r)if(r.hasOwnProperty(i)&&(void 0===s[i]||!Rs(r[i],s[i],n)))return!1;return!0}(e,t,n);default:return dt(52216,{left:e})}}function Ps(e,t){return void 0!==(e.values||[]).find(e=>Rs(e,t))}function Os(e,t){if(e===t)return 0;const n=Ds(e),r=Ds(t);if(n!==r)return Ct(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ct(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=hs(e.integerValue||e.doubleValue),r=hs(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Ls(e.timestampValue,t.timestampValue);case 4:return Ls(vs(e),vs(t));case 5:return kt(e.stringValue,t.stringValue);case 6:return function(e,t){const n=ds(e),r=ds(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let s=0;s<n.length&&s<r.length;s++){const e=Ct(n[s],r[s]);if(0!==e)return e}return Ct(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Ct(hs(e.latitude),hs(t.latitude));return 0!==n?n:Ct(hs(e.longitude),hs(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Vs(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},s=n[Ns]?.arrayValue,i=r[Ns]?.arrayValue,o=Ct(s?.values?.length||0,i?.values?.length||0);return 0!==o?o:Vs(s,i)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Ss.mapValue&&t===Ss.mapValue)return 0;if(e===Ss.mapValue)return 1;if(t===Ss.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let o=0;o<r.length&&o<i.length;++o){const e=kt(r[o],i[o]);if(0!==e)return e;const t=Os(n[r[o]],s[i[o]]);if(0!==t)return t}return Ct(r.length,i.length)}(e.mapValue,t.mapValue);default:throw dt(23264,{Pe:n})}}function Ls(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Ct(e,t);const n=ls(e),r=ls(t),s=Ct(n.seconds,r.seconds);return 0!==s?s:Ct(n.nanos,r.nanos)}function Vs(e,t){const n=e.values||[],r=t.values||[];for(let s=0;s<n.length&&s<r.length;++s){const e=Os(n[s],r[s]);if(void 0!==e&&0!==e)return e}return Ct(n.length,r.length)}function Ms(e){return Us(e)}function Us(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=ls(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return ds(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return qt.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=Us(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${Us(e.fields[s])}`;return n+"}"}(e.mapValue):dt(61005,{value:e})}function Fs(e){switch(Ds(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=ws(e);return t?16+Fs(t):16;case 5:return 2*e.stringValue.length;case 6:return ds(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+Fs(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return ss(e.fields,(e,n)=>{t+=e.length+Fs(n)}),t}(e.mapValue);default:throw dt(13486,{value:e})}}function Bs(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function qs(e){return!!e&&"integerValue"in e}function js(e){return!!e&&"doubleValue"in e}function zs(e){return qs(e)||js(e)}function $s(e){return!!e&&"arrayValue"in e}function Ks(e){return!!e&&"nullValue"in e}function Gs(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Hs(e){return!!e&&"mapValue"in e}function Ws(e){const t=(e?.mapValue?.fields||{})[Ts]?.stringValue;return t===xs}function Qs(e){return(e?.mapValue?.fields||{})[Ns]?.arrayValue}function Js(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return ss(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Js(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Js(e.arrayValue.values[n]);return t}return{...e}}function Ys(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===Es}const Xs={mapValue:{fields:{[Ts]:{stringValue:xs},[Ns]:{arrayValue:{}}}}};function Zs(e){return"nullValue"in e?As:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?Bs(Is.empty(),qt.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?Ws(e)?Xs:{mapValue:{}}:dt(35942,{value:e})}function ei(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?Bs(Is.empty(),qt.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?Xs:"mapValue"in e?Ws(e)?{mapValue:{}}:Ss:dt(61959,{value:e})}function ti(e,t){const n=Os(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function ni(e,t){const n=Os(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
/**
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
 */class ri{constructor(e){this.value=e}static empty(){return new ri({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Hs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Js(t)}setAll(e){let t=Bt.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=Js(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());Hs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Rs(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Hs(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){ss(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new ri(Js(this.value))}}function si(e){const t=[];return ss(e.fields,(e,n)=>{const r=new Bt([e]);if(Hs(n)){const e=si(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new ns(t)
/**
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
 */}function ii(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Vn(t)?"-0":t}}function oi(e){return{integerValue:""+e}}function ai(e,t,n){return Number.isInteger(t)&&n?.preferIntegers||Mn(t)?oi(t):ii(e,t)}
/**
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
 */class ci{constructor(){this._=void 0}}function ui(e,t,n){return e instanceof di?function(e,t){const n={fields:{[ps]:{stringValue:fs},[gs]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&ys(t)&&(t=ws(t)),t&&(n.fields[ms]=t),{mapValue:n}}(n,t):e instanceof fi?pi(e,t):e instanceof mi?gi(e,t):e instanceof wi?function(e,t){const n=hi(e,t),r=Ii(n)+Ii(e.Re);return qs(n)&&qs(e.Re)?oi(r):ii(e.serializer,r)}(e,t):e instanceof vi?function(e,t){return bi(e,t,Math.min)}(e,t):e instanceof _i?function(e,t){return bi(e,t,Math.max)}(e,t):void 0}function li(e,t,n){return e instanceof fi?pi(e,t):e instanceof mi?gi(e,t):n}function hi(e,t){return e instanceof wi?zs(t)?t:{integerValue:0}:null}class di extends ci{}class fi extends ci{constructor(e){super(),this.elements=e}}function pi(e,t){const n=Ti(t);for(const r of e.elements)n.some(e=>Rs(e,r))||n.push(r);return{arrayValue:{values:n}}}class mi extends ci{constructor(e){super(),this.elements=e}}function gi(e,t){let n=Ti(t);for(const r of e.elements)n=n.filter(e=>!Rs(e,r));return{arrayValue:{values:n}}}class yi extends ci{constructor(e,t){super(),this.serializer=e,this.Re=t}}class wi extends yi{}class vi extends yi{}class _i extends yi{}function bi(e,t,n){if(!zs(t))return e.Re;const r=n(Ii(t),Ii(e.Re));return qs(t)&&qs(e.Re)?oi(r):ii(e.serializer,r)}function Ii(e){return hs(e.integerValue||e.doubleValue)}function Ti(e){return $s(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
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
 */class Ei{constructor(e,t){this.field=e,this.transform=t}}class Si{constructor(e,t){this.version=e,this.transformResults=t}}class xi{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new xi}static exists(e){return new xi(void 0,e)}static updateTime(e){return new xi(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ni(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Ai{}function Ci(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Fi(e.key,xi.none()):new Oi(e.key,e.data,xi.none());{const n=e.data,r=ri.empty();let s=new Zr(Bt.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new Li(e.key,r,new ns(s.toArray()),xi.none())}}function ki(e,t,n){e instanceof Oi?function(e,t,n){const r=e.value.clone(),s=Mi(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Li?function(e,t,n){if(!Ni(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Mi(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(Vi(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function Di(e,t,n,r){return e instanceof Oi?function(e,t,n,r){if(!Ni(e.precondition,t))return n;const s=e.value.clone(),i=Ui(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,r):e instanceof Li?function(e,t,n,r){if(!Ni(e.precondition,t))return n;const s=Ui(e.fieldTransforms,r,t),i=t.data;return i.setAll(Vi(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return Ni(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function Ri(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=hi(r.transform,e||null);null!=s&&(null===n&&(n=ri.empty()),n.set(r.field,s))}return n||null}function Pi(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&Ot(e,t,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof fi&&t instanceof fi||e instanceof mi&&t instanceof mi?Ot(e.elements,t.elements,Rs):e instanceof wi&&t instanceof wi||e instanceof vi&&t instanceof vi||e instanceof _i&&t instanceof _i?Rs(e.Re,t.Re):e instanceof di&&t instanceof di}(e.transform,t.transform)}(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Oi extends Ai{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Li extends Ai{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Vi(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function Mi(e,t,n){const r=new Map;pt(e.length===n.length,32656,{Ie:n.length,Ae:e.length});for(let s=0;s<n.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,li(o,a,n[s]))}return r}function Ui(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,ui(e,i,t))}return r}class Fi extends Ai{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Bi extends Ai{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
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
 */class qi{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}
/**
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
 */class ji{constructor(e,t){this.position=e,this.inclusive=t}}function zi(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(r=i.field.isKeyField()?qt.comparator(qt.fromName(o.referenceValue),n.key):Os(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function $i(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Rs(e.position[n],t.position[n]))return!1;return!0}
/**
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
 */class Ki{}class Gi extends Ki{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new no(e,t,n):"array-contains"===t?new oo(e,n):"in"===t?new ao(e,n):"not-in"===t?new co(e,n):"array-contains-any"===t?new uo(e,n):new Gi(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new ro(e,n):new so(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Os(t,this.value)):null!==t&&Ds(this.value)===Ds(t)&&this.matchesComparison(Os(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return dt(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Hi extends Ki{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new Hi(e,t)}matches(e){return Wi(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Ve||(this.Ve=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function Wi(e){return"and"===e.op}function Qi(e){return"or"===e.op}function Ji(e){return Yi(e)&&Wi(e)}function Yi(e){for(const t of e.filters)if(t instanceof Hi)return!1;return!0}function Xi(e){if(e instanceof Gi)return e.field.canonicalString()+e.op.toString()+Ms(e.value);if(Ji(e))return e.filters.map(e=>Xi(e)).join(",");{const t=e.filters.map(e=>Xi(e)).join(",");return`${e.op}(${t})`}}function Zi(e,t){return e instanceof Gi?function(e,t){return t instanceof Gi&&e.op===t.op&&e.field.isEqual(t.field)&&Rs(e.value,t.value)}(e,t):e instanceof Hi?function(e,t){return t instanceof Hi&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&Zi(n,t.filters[r]),!0)}(e,t):void dt(19439)}function eo(e,t){const n=e.filters.concat(t);return Hi.create(n,e.op)}function to(e){return e instanceof Gi?function(e){return`${e.field.canonicalString()} ${e.op} ${Ms(e.value)}`}(e):e instanceof Hi?function(e){return e.op.toString()+" {"+e.getFilters().map(to).join(" ,")+"}"}(e):"Filter"}class no extends Gi{constructor(e,t,n){super(e,t,n),this.key=qt.fromName(n.referenceValue)}matches(e){const t=qt.comparator(e.key,this.key);return this.matchesComparison(t)}}class ro extends Gi{constructor(e,t){super(e,"in",t),this.keys=io("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class so extends Gi{constructor(e,t){super(e,"not-in",t),this.keys=io("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function io(e,t){return(t.arrayValue?.values||[]).map(e=>qt.fromName(e.referenceValue))}class oo extends Gi{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return $s(t)&&Ps(t.arrayValue,this.value)}}class ao extends Gi{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Ps(this.value.arrayValue,t)}}class co extends Gi{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ps(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Ps(this.value.arrayValue,t)}}class uo extends Gi{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!$s(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Ps(this.value.arrayValue,e))}}
/**
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
 */class lo{constructor(e,t="asc"){this.field=e,this.dir=t}}function ho(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
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
 */class fo{constructor(e,t,n,r,s,i,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(e){return new fo(e,0,tn.min(),tn.min(),tn.min(),ri.empty(),0)}static newFoundDocument(e,t,n,r){return new fo(e,1,t,tn.min(),n,r,0)}static newNoDocument(e,t){return new fo(e,2,t,tn.min(),tn.min(),ri.empty(),0)}static newUnknownDocument(e,t){return new fo(e,3,t,tn.min(),tn.min(),ri.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(tn.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ri.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ri.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=tn.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof fo&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new fo(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
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
 */class po{constructor(e,t=null,n=[],r=[],s=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.de=null}}function mo(e,t=null,n=[],r=[],s=null,i=null,o=null){return new po(e,t,n,r,s,i,o)}function go(e){const t=mt(e);if(null===t.de){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Xi(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),Ln(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Ms(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Ms(e)).join(",")),t.de=e}return t.de}function yo(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!ho(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Zi(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!$i(e.startAt,t.startAt)&&$i(e.endAt,t.endAt)}function wo(e){return!!e.isCorePipeline}function vo(e){return!!e.path&&qt.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function _o(e,t){return e.filters.filter(e=>e instanceof Gi&&e.field.isEqual(t))}function bo(e,t,n){let r=As,s=!0;for(const i of _o(e,t)){let e=As,t=!0;switch(i.op){case"<":case"<=":e=Zs(i.value);break;case"==":case"in":case">=":e=i.value;break;case">":e=i.value,t=!1;break;case"!=":case"not-in":e=As}ti({value:r,inclusive:s},{value:e,inclusive:t})<0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];ti({value:r,inclusive:s},{value:e,inclusive:n.inclusive})<0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}function Io(e,t,n){let r=Ss,s=!0;for(const i of _o(e,t)){let e=Ss,t=!0;switch(i.op){case">=":case">":e=ei(i.value),t=!1;break;case"==":case"in":case"<=":e=i.value;break;case"<":e=i.value,t=!1;break;case"!=":case"not-in":e=Ss}ni({value:r,inclusive:s},{value:e,inclusive:t})>0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];ni({value:r,inclusive:s},{value:e,inclusive:n.inclusive})>0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}
/**
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
 */class To{constructor(e,t=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function Eo(e,t,n,r,s,i,o,a){return new To(e,t,n,r,s,i,o,a)}function So(e){return new To(e)}function xo(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function No(e){return null!==e.collectionGroup}function Ao(e){const t=mt(e);if(null===t.fe){t.fe=[];const e=new Set;for(const s of t.explicitOrderBy)t.fe.push(s),e.add(s.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new Zr(Bt.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.fe.push(new lo(r,n))}),e.has(Bt.keyField().canonicalString())||t.fe.push(new lo(Bt.keyField(),n))}return t.fe}function Co(e){const t=mt(e);return t.me||(t.me=Do(t,Ao(e))),t.me}function ko(e){const t=mt(e);return t.pe||(t.pe=Do(t,e.explicitOrderBy)),t.pe}function Do(e,t){if("F"===e.limitType)return mo(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new lo(e.field,t)});const n=e.endAt?new ji(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new ji(e.startAt.position,e.startAt.inclusive):null;return mo(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function Ro(e,t){const n=e.filters.concat([t]);return new To(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Po(e,t,n){return new To(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Oo(e,t){return yo(Co(e),Co(t))&&e.limitType===t.limitType}function Lo(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>to(e)).join(", ")}]`),Ln(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Ms(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Ms(e)).join(",")),`Target(${t})`}(Co(e))}; limitType=${e.limitType})`}function Vo(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):qt.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Ao(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=zi(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,Ao(e),t))&&!(e.endAt&&!function(e,t,n){const r=zi(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,Ao(e),t))}(e,t)}function Mo(e){return(t,n)=>{let r=!1;for(const s of Ao(e)){const e=Uo(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function Uo(e,t,n){const r=e.field.isKeyField()?qt.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?Os(r,s):dt(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return dt(19790,{direction:e.dir})}}
/**
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
 */class Fo{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
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
 */var Bo,qo;function jo(e){switch(e){case gt.OK:return dt(64938);case gt.CANCELLED:case gt.UNKNOWN:case gt.DEADLINE_EXCEEDED:case gt.RESOURCE_EXHAUSTED:case gt.INTERNAL:case gt.UNAVAILABLE:case gt.UNAUTHENTICATED:return!1;case gt.INVALID_ARGUMENT:case gt.NOT_FOUND:case gt.ALREADY_EXISTS:case gt.PERMISSION_DENIED:case gt.FAILED_PRECONDITION:case gt.ABORTED:case gt.OUT_OF_RANGE:case gt.UNIMPLEMENTED:case gt.DATA_LOSS:return!0;default:return dt(15467,{code:e})}}function zo(e){if(void 0===e)return ut("GRPC error has no .code"),gt.UNKNOWN;switch(e){case Bo.OK:return gt.OK;case Bo.CANCELLED:return gt.CANCELLED;case Bo.UNKNOWN:return gt.UNKNOWN;case Bo.DEADLINE_EXCEEDED:return gt.DEADLINE_EXCEEDED;case Bo.RESOURCE_EXHAUSTED:return gt.RESOURCE_EXHAUSTED;case Bo.INTERNAL:return gt.INTERNAL;case Bo.UNAVAILABLE:return gt.UNAVAILABLE;case Bo.UNAUTHENTICATED:return gt.UNAUTHENTICATED;case Bo.INVALID_ARGUMENT:return gt.INVALID_ARGUMENT;case Bo.NOT_FOUND:return gt.NOT_FOUND;case Bo.ALREADY_EXISTS:return gt.ALREADY_EXISTS;case Bo.PERMISSION_DENIED:return gt.PERMISSION_DENIED;case Bo.FAILED_PRECONDITION:return gt.FAILED_PRECONDITION;case Bo.ABORTED:return gt.ABORTED;case Bo.OUT_OF_RANGE:return gt.OUT_OF_RANGE;case Bo.UNIMPLEMENTED:return gt.UNIMPLEMENTED;case Bo.DATA_LOSS:return gt.DATA_LOSS;default:return dt(39323,{code:e})}}(qo=Bo||(Bo={}))[qo.OK=0]="OK",qo[qo.CANCELLED=1]="CANCELLED",qo[qo.UNKNOWN=2]="UNKNOWN",qo[qo.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",qo[qo.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",qo[qo.NOT_FOUND=5]="NOT_FOUND",qo[qo.ALREADY_EXISTS=6]="ALREADY_EXISTS",qo[qo.PERMISSION_DENIED=7]="PERMISSION_DENIED",qo[qo.UNAUTHENTICATED=16]="UNAUTHENTICATED",qo[qo.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",qo[qo.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",qo[qo.ABORTED=10]="ABORTED",qo[qo.OUT_OF_RANGE=11]="OUT_OF_RANGE",qo[qo.UNIMPLEMENTED=12]="UNIMPLEMENTED",qo[qo.INTERNAL=13]="INTERNAL",qo[qo.UNAVAILABLE=14]="UNAVAILABLE",qo[qo.DATA_LOSS=15]="DATA_LOSS";
/**
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
 */
class $o{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return void(r[s]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){ss(this.inner,(t,n)=>{for(const[r,s]of n)e(r,s)})}isEmpty(){return os(this.inner)}size(){return this.innerSize}}
/**
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
 */const Ko=new Jr(qt.comparator);function Go(){return Ko}const Ho=new Jr(qt.comparator);function Wo(...e){let t=Ho;for(const n of e)t=t.insert(n.key,n);return t}function Qo(e){let t=Ho;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Jo(){return Xo()}function Yo(){return Xo()}function Xo(){return new $o(e=>e.toString(),(e,t)=>e.isEqual(t))}const Zo=new Jr(qt.comparator),ea=new Zr(qt.comparator);function ta(...e){let t=ea;for(const n of e)t=t.add(n);return t}const na=new Zr(Ct);function ra(){return na}
/**
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
 */let sa=null;
/**
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
 */
function ia(){return new TextEncoder}
/**
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
 */const oa=new Ge([4294967295,4294967295],0);function aa(e){const t=ia().encode(e),n=new He;return n.update(t),new Uint8Array(n.digest())}function ca(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Ge([n,r],0),new Ge([s,i],0)]}class ua{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new la(`Invalid padding: ${t}`);if(n<0)throw new la(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new la(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new la(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=Ge.fromNumber(this.ge)}we(e,t,n){let r=e.add(t.multiply(Ge.fromNumber(n)));return 1===r.compare(oa)&&(r=new Ge([r.getBits(0),r.getBits(1)],0)),r.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=aa(e),[n,r]=ca(t);for(let s=0;s<this.hashCount;s++){const e=this.we(n,r,s);if(!this.be(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new ua(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=aa(e),[n,r]=ca(t);for(let s=0;s<this.hashCount;s++){const e=this.we(n,r,s);this.ve(e)}}ve(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class la extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
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
 */class ha{constructor(e,t,n,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.augmentedDocumentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,da.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new ha(tn.min(),r,new Jr(Ct),Go(),Go(),ta())}}class da{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new da(n,t,ta(),ta(),ta())}}
/**
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
 */class fa{constructor(e,t,n,r){this.Se=e,this.removedTargetIds=t,this.key=n,this.De=r}}class pa{constructor(e,t){this.targetId=e,this.xe=t}}class ma{constructor(e,t,n=cs.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class ga{constructor(e){this.targetId=e,this.Ce=0,this.Fe=_a(),this.Oe=cs.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return 0!==this.Ce}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=ta(),t=ta(),n=ta();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:dt(38017,{changeType:s})}}),new da(this.Oe,this.Me,e,t,n)}qe(){this.Ne=!1,this.Fe=_a()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,pt(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const ya="WatchChangeAggregator";class wa{constructor(e){this.ze=e,this.je=new Map,this.He=Go(),this.Je=va(),this.Ye=Go(),this.Ze=va(),this.Xe=new Jr(Ct)}et(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(const t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,t=>{const n=this.je.get(t);if(n)switch(e.state){case 0:this.it(t)&&n.Ue(e.resumeToken);break;case 1:n.Qe(),n.Le||n.qe(),n.Ue(e.resumeToken);break;case 2:n.Qe(),n.Le||this.removeTarget(t);break;case 3:this.it(t)&&(n.Ge(),n.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),n.Ue(e.resumeToken));break;default:dt(56790,{state:e.state})}else ct(ya,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((e,n)=>{this.it(n)&&t(n)})}_t(e){return wo(e)?"documents"===e.getPipelineSourceType()&&1===e.getPipelineDocuments()?.length:vo(e)}ot(e){const t=e.targetId,n=e.xe.count,r=this.ut(t);if(r){const s=r.target;if(this._t(s))if(0===n){const e=new qt(wo(s)?Ut.fromString(s.getPipelineDocuments()[0]):s.path);this.nt(t,e,fo.newNoDocument(e,tn.min()))}else pt(1===n,20013,"Single document existence filter with count: "+n);else{const r=this.ct(t);if(r!==n){const n=this.lt(e),s=n?this.Et(n,e,r):1;if(0!==s){this.st(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(t,e)}sa?.u(function(e,t,n,r,s){const i={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(i.bloomFilter={applied:0===s,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),i}
/**
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
 */(r,e.xe,this.ze.Tt(),n,s))}}}}lt(e){const t=e.xe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,o;try{i=ds(n).toUint8Array()}catch(e){if(e instanceof as)return lt("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new ua(i,r,s)}catch(e){return lt(e instanceof la?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}Et(e,t,n){return t.xe.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.ze.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.ze.Tt(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.nt(t,n,null),r++)}),r}Rt(e){const t=new Map;this.je.forEach((n,r)=>{const s=this.ut(r);if(s){if(n.current&&this._t(s.target)){const t=wo(s.target)?Ut.fromString(s.target.getPipelineDocuments()[0]):s.target.path,n=new qt(t);this.It(n).has(r)||this.At(r,n)||this.nt(r,n,fo.newNoDocument(n,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=ta();this.Ze.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ut(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.He.forEach((t,n)=>n.setReadTime(e)),this.Ye.forEach((t,n)=>n.setReadTime(e));const r=new ha(e,t,this.Xe,this.He,this.Ye,n);return this.He=Go(),this.Je=va(),this.Ye=Go(),this.Ze=va(),this.Xe=new Jr(Ct),r}tt(e,t){const n=this.je.get(e);if(!n||!this.it(e))return void ct(ya,`addDocumentToTarget received document for unknown inactive target (${e})`);const r=this.At(e,t.key)?2:0;n.$e(t.key,r),wo(this.ut(e).target)&&"exact"!==this.ut(e).target.getPipelineFlavor()?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,n){const r=this.je.get(e);r&&this.it(e)?(this.At(e,t)?r.$e(t,1):r.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),n&&(wo(this.ut(e).target)&&"exact"!==this.ut(e).target.getPipelineFlavor()?this.Ye=this.Ye.insert(t,n):this.He=this.He.insert(t,n))):ct(ya,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){const t=this.je.get(e);if(!t)return 0;const n=t.ke();return this.ze.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}We(e){let t=this.je.get(e);t||(ct(ya,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new ga(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new Zr(Ct),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Zr(Ct),this.Je=this.Je.insert(e,t)),t}it(e){const t=null!==this.ut(e);return t||ct(ya,"Detected inactive target",e),t}ut(e){const t=this.je.get(e);return void 0===t||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new ga(e)),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.nt(e,t,null)})}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function va(){return new Jr(qt.comparator)}function _a(){return new Jr(qt.comparator)}const ba={asc:"ASCENDING",desc:"DESCENDING"},Ia={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ta={and:"AND",or:"OR"};class Ea{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Sa(e,t){return e.useProto3Json||Ln(t)?t:{value:t}}function xa(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Na(e){const t=ls(e);return new en(t.seconds,t.nanos)}function Aa(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Ca(e,t){return xa(e,t.toTimestamp())}function ka(e){return pt(!!e,49232),tn.fromTimestamp(Na(e))}function Da(e,t){return Ra(e,t).canonicalString()}function Ra(e,t){const n=function(e){return new Ut(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Pa(e){const t=Ut.fromString(e);return pt(rc(t),10190,{key:t.toString()}),t}function Oa(e,t){return Da(e.databaseId,t.path)}function La(e,t){const n=Pa(t);if(n.get(1)!==e.databaseId.projectId)throw new yt(gt.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new yt(gt.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new qt(Fa(n))}function Va(e,t){return Da(e.databaseId,t)}function Ma(e){const t=Pa(e);return 4===t.length?Ut.emptyPath():Fa(t)}function Ua(e){return new Ut(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Fa(e){return pt(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Ba(e,t,n){return{name:Oa(e,t),fields:n.value.mapValue.fields}}function qa(e,t,n){const r=La(e,t.name),s=ka(t.updateTime),i=t.createTime?ka(t.createTime):tn.min(),o=new ri({mapValue:{fields:t.fields}}),a=fo.newFoundDocument(r,s,i,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function ja(e,t){let n;if(t instanceof Oi)n={update:Ba(e,t.key,t.value)};else if(t instanceof Fi)n={delete:Oa(e,t.key)};else if(t instanceof Li)n={update:Ba(e,t.key,t.data),updateMask:nc(t.fieldMask)};else{if(!(t instanceof Bi))return dt(16599,{gt:t.type});n={verify:Oa(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof di)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof fi)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof mi)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof wi)return{fieldPath:t.field.canonicalString(),increment:n.Re};if(n instanceof vi)return{fieldPath:t.field.canonicalString(),minimum:n.Re};if(n instanceof _i)return{fieldPath:t.field.canonicalString(),maximum:n.Re};throw dt(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:Ca(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:dt(27497)}(e,t.precondition)),n}function za(e,t){const n=t.currentDocument?function(e){return void 0!==e.updateTime?xi.updateTime(ka(e.updateTime)):void 0!==e.exists?xi.exists(e.exists):xi.none()}(t.currentDocument):xi.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)pt("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new di;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new fi(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new mi(e)}else"increment"in t?n=new wi(e,t.increment):"minimum"in t?n=new vi(e,t.minimum):"maximum"in t?n=new _i(e,t.maximum):dt(16584,{proto:t});const r=Bt.fromServerFormat(t.fieldPath);return new Ei(r,n)}(e,t)):[];if(t.update){t.update.name;const s=La(e,t.update.name),i=new ri({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new ns(t.map(e=>Bt.fromServerFormat(e)))}(t.updateMask);return new Li(s,i,e,n,r)}return new Oi(s,i,n,r)}if(t.delete){const r=La(e,t.delete);return new Fi(r,n)}if(t.verify){const r=La(e,t.verify);return new Bi(r,n)}return dt(1463,{proto:t})}function $a(e,t){return{documents:[Va(e,t.path)]}}function Ka(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Va(e,s);const i=function(e){if(0!==e.length)return tc(Hi.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:Za(e.field),direction:Ja(e.dir)}}(e))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Sa(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{yt:n,parent:s}}function Ga(e,t,n,r){const{yt:s,parent:i}=Ka(e,t),o={},a=[];let c=0;return n.forEach(e=>{const t=r?e.alias:"aggregate_"+c++;o[t]=e.alias,"count"===e.aggregateType?a.push({alias:t,count:{}}):"avg"===e.aggregateType?a.push({alias:t,avg:{field:Za(e.fieldPath)}}):"sum"===e.aggregateType&&a.push({alias:t,sum:{field:Za(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:s.structuredQuery},parent:s.parent},wt:o,parent:i}}function Ha(e){let t=Ma(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){pt(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=Qa(e);return t instanceof Hi&&Ji(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map(e=>function(e){return new lo(ec(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Ln(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new ji(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new ji(n,t)}(n.endAt)),Eo(t,s,o,i,a,"F",c,u)}function Wa(e,t){return{structuredPipeline:{pipeline:{stages:t.stages.map(t=>t._toProto(e))}}}}function Qa(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=ec(e.unaryFilter.field);return Gi.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=ec(e.unaryFilter.field);return Gi.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=ec(e.unaryFilter.field);return Gi.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=ec(e.unaryFilter.field);return Gi.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return dt(61313);default:return dt(60726)}}(e):void 0!==e.fieldFilter?function(e){return Gi.create(ec(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return dt(58110);default:return dt(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return Hi.create(e.compositeFilter.filters.map(e=>Qa(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return dt(1026)}}(e.compositeFilter.op))}(e):dt(30097,{filter:e})}function Ja(e){return ba[e]}function Ya(e){return Ia[e]}function Xa(e){return Ta[e]}function Za(e){return{fieldPath:e.canonicalString()}}function ec(e){return Bt.fromServerFormat(e.fieldPath)}function tc(e){return e instanceof Gi?function(e){if("=="===e.op){if(Gs(e.value))return{unaryFilter:{field:Za(e.field),op:"IS_NAN"}};if(Ks(e.value))return{unaryFilter:{field:Za(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Gs(e.value))return{unaryFilter:{field:Za(e.field),op:"IS_NOT_NAN"}};if(Ks(e.value))return{unaryFilter:{field:Za(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Za(e.field),op:Ya(e.op),value:e.value}}}(e):e instanceof Hi?function(e){const t=e.getFilters().map(e=>tc(e));return 1===t.length?t[0]:{compositeFilter:{op:Xa(e.op),filters:t}}}(e):dt(54877,{filter:e})}function nc(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function rc(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function sc(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function ic(e,t){const n={fields:{}};return t.forEach((t,r)=>{if("string"!=typeof r)throw new Error(`Cannot encode map with non-string key: ${r}`);n.fields[r]=t._toProto(e)}),{mapValue:n}}function oc(e){return{stringValue:e}}
/**
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
 */function ac(e){return new Ea(e,!0)}
/**
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
 */class cc{constructor(e){this._byteString=e}static fromBase64String(e){try{return new cc(cs.fromBase64String(e))}catch(e){throw new yt(gt.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new cc(cs.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:cc._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Yt(e,cc._jsonSchema))return cc.fromBase64String(e.bytes)}}cc._jsonSchemaVersion="firestore/bytes/1.0",cc._jsonSchema={type:Jt("string",cc._jsonSchemaVersion),bytes:Jt("string")};
/**
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
 */
class uc{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new yt(gt.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Bt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function lc(){return new uc(Vt)}
/**
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
 */class hc{constructor(e){this._methodName=e}}
/**
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
 */class dc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new yt(gt.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new yt(gt.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ct(this._lat,e._lat)||Ct(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:dc._jsonSchemaVersion}}static fromJSON(e){if(Yt(e,dc._jsonSchema))return new dc(e.latitude,e.longitude)}}function fc(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
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
 */}dc._jsonSchemaVersion="firestore/geoPoint/1.0",dc._jsonSchema={type:Jt("string",dc._jsonSchemaVersion),latitude:Jt("number"),longitude:Jt("number")};class pc{bt(e){}shutdown(){}}
/**
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
 */const mc="ConnectivityMonitor";class gc{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){ct(mc,"Network connectivity changed: AVAILABLE");for(const e of this.Ct)e(0)}xt(){ct(mc,"Network connectivity changed: UNAVAILABLE");for(const e of this.Ct)e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
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
 */let yc=null;function wc(){return null===yc?yc=268435456+Math.round(2147483648*Math.random()):yc++,"0x"+yc.toString(16)
/**
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
 */}const vc="RestConnection",_c={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class bc{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${n}/databases/${r}`,this.Lt=this.databaseId.database===bs?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Bt(e,t,n,r,s){const i=wc(),o=this.Ut(e,t.toUriEncodedString());ct(vc,`Sending RPC '${e}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(a,r,s);const{host:c}=new URL(o),u=R(c);return this.qt(e,o,a,n,u).then(t=>(ct(vc,`Received RPC '${e}' ${i}: `,t),t),t=>{throw lt(vc,`RPC '${e}' ${i} failed with error: `,t,"url: ",o,"request:",n),t})}$t(e,t,n,r,s,i){return this.Bt(e,t,n,r,s)}kt(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+it,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}Ut(e,t){const n=_c[e];let r=`${this.Mt}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}
/**
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
 */class Ic{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}
/**
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
 */const Tc="WebChannelConnection",Ec=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};class Sc extends bc{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){if(!Sc.sn){const e=tt();Ec(e,et.STAT_EVENT,e=>{e.stat===Ze.PROXY?ct(Tc,"STAT_EVENT: detected buffering proxy"):e.stat===Ze.NOPROXY&&ct(Tc,"STAT_EVENT: detected no buffering proxy")}),Sc.sn=!0}}qt(e,t,n,r,s){const i=wc();return new Promise((s,o)=>{const a=new Qe;a.setWithCredentials(!0),a.listenOnce(Ye.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Xe.NO_ERROR:const t=a.getResponseJson();ct(Tc,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case Xe.TIMEOUT:ct(Tc,`RPC '${e}' ${i} timed out`),o(new yt(gt.DEADLINE_EXCEEDED,"Request time out"));break;case Xe.HTTP_ERROR:const n=a.getStatus();if(ct(Tc,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(gt).indexOf(t)>=0?t:gt.UNKNOWN}(t.status);o(new yt(e,t.message))}else o(new yt(gt.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new yt(gt.UNAVAILABLE,"Connection failed."));break;default:dt(9055,{_n:e,streamId:i,an:a.getLastErrorCode(),un:a.getLastError()})}}finally{ct(Tc,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(r);ct(Tc,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",c,n,15)})}cn(e,t,n){const r=wc(),s=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},a=this.longPollingOptions.timeoutSeconds;void 0!==a&&(o.longPollingTimeout=Math.round(1e3*a)),this.useFetchStreams&&(o.useFetchStreams=!0),this.kt(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const c=s.join("");ct(Tc,`Creating RPC '${e}' stream ${r}: ${c}`,o);const u=i.createWebChannel(c,o);this.En(u);let l=!1,h=!1;const d=new Ic({Kt:t=>{h?ct(Tc,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(l||(ct(Tc,`Opening RPC '${e}' stream ${r} transport.`),u.open(),l=!0),ct(Tc,`RPC '${e}' stream ${r} sending:`,t),u.send(t))},Wt:()=>u.close()});return Ec(u,Je.EventType.OPEN,()=>{h||(ct(Tc,`RPC '${e}' stream ${r} transport opened.`),d.Zt())}),Ec(u,Je.EventType.CLOSE,()=>{h||(h=!0,ct(Tc,`RPC '${e}' stream ${r} transport closed`),d.en(),this.hn(u))}),Ec(u,Je.EventType.ERROR,t=>{h||(h=!0,lt(Tc,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),d.en(new yt(gt.UNAVAILABLE,"The operation could not be completed")))}),Ec(u,Je.EventType.MESSAGE,t=>{if(!h){const n=t.data[0];pt(!!n,16349);const s=n,i=s?.error||s[0]?.error;if(i){ct(Tc,`RPC '${e}' stream ${r} received error:`,i);const t=i.status;let n=function(e){const t=Bo[e];if(void 0!==t)return zo(t)}(t),s=i.message;"NOT_FOUND"===t&&s.includes("database")&&s.includes("does not exist")&&s.includes(this.databaseId.database)&&lt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=gt.INTERNAL,s="Unknown error status: "+t+" with message "+i.message),h=!0,d.en(new yt(n,s)),u.close()}else ct(Tc,`RPC '${e}' stream ${r} received:`,n),d.tn(n)}}),Sc.rn(),setTimeout(()=>{d.Xt()},0),d}terminate(){this.nn.forEach(e=>e.close()),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter(t=>t===e)}kt(e,t,n){super.kt(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return nt()}}
/**
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
 */Sc.sn=!1;class xc{constructor(e,t,n=1e3,r=1.5,s=6e4){this.Tn=e,this.timerId=t,this.Pn=n,this.Rn=r,this.In=s,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();const t=Math.floor(this.An+this.pn()),n=Math.max(0,Date.now()-this.dn),r=Math.max(0,t-n);r>0&&ct("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,r,()=>(this.dn=Date.now(),e())),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){null!==this.Vn&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){null!==this.Vn&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}
/**
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
 */const Nc="PersistentStream";class Ac{constructor(e,t,n,r,s,i,o,a){this.Tn=e,this.yn=n,this.wn=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new xc(e,t)}Cn(){return 1===this.state||5===this.state||this.Fn()}Fn(){return 2===this.state||3===this.state}start(){this.Dn=0,4!==this.state?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&null===this.vn&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,()=>this.Ln()))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,4!==e?this.xn.reset():t&&t.code===gt.RESOURCE_EXHAUSTED?(ut(t.toString()),ut("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===gt.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;const e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.bn===t&&this.Kn(e,n)},t=>{e(()=>{const e=new yt(gt.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Wn(e)})})}Kn(e,t){const n=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt(()=>{n(()=>this.listener.Qt())}),this.stream.zt(()=>{n(()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,()=>(this.Fn()&&(this.state=3),Promise.resolve())),this.listener.zt()))}),this.stream.Ht(e=>{n(()=>this.Wn(e))}),this.stream.onMessage(e=>{n(()=>1==++this.Dn?this.Gn(e):this.onNext(e))})}On(){this.state=5,this.xn.mn(async()=>{this.state=0,this.start()})}Wn(e){return ct(Nc,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget(()=>this.bn===e?t():(ct(Nc,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Cc extends Ac{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:dt(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(e,t){return e.useProto3Json?(pt(void 0===t||"string"==typeof t,58123),cs.fromBase64String(t||"")):(pt(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),cs.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?gt.UNKNOWN:zo(e.code);return new yt(t,e.message||"")}(o);n=new ma(r,s,i,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=La(e,r.document.name),i=ka(r.document.updateTime),o=r.document.createTime?ka(r.document.createTime):tn.min(),a=new ri({mapValue:{fields:r.document.fields}}),c=fo.newFoundDocument(s,i,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new fa(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=La(e,r.document),i=r.readTime?ka(r.readTime):tn.min(),o=fo.newNoDocument(s,i),a=r.removedTargetIds||[];n=new fa([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=La(e,r.document),i=r.removedTargetIds||[];n=new fa([],i,s,null)}else{if(!("filter"in t))return dt(11601,{ft:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:s}=e,i=new Fo(r,s),o=e.targetId;n=new pa(o,i)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return tn.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?tn.min():t.readTime?ka(t.readTime):tn.min()}(e);return this.listener.zn(t,n)}jn(e){const t={};t.database=Ua(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=wo(r)?{pipelineQuery:Wa(e,r)}:vo(r)?{documents:$a(e,r)}:{query:Ka(e,r).yt},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Aa(e,t.resumeToken);const r=Sa(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(tn.min())>0){n.readTime=xa(e,t.snapshotVersion.toTimestamp());const r=Sa(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return dt(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.Bn(t)}Hn(e){const t={};t.database=Ua(this.serializer),t.removeTarget=e,this.Bn(t)}}class kc extends Ac{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(e,t){return this.connection.cn("Write",e,t)}Gn(e){return pt(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,pt(!e.writeResults||0===e.writeResults.length,55816),this.listener.Zn()}onNext(e){pt(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.xn.reset();const t=function(e,t){return e&&e.length>0?(pt(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?ka(e.updateTime):ka(t);return n.isEqual(tn.min())&&(n=ka(t)),new Si(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=ka(e.commitTime);return this.listener.Xn(n,t)}er(){const e={};e.database=Ua(this.serializer),this.Bn(e)}Yn(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>ja(this.serializer,e))};this.Bn(t)}}
/**
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
 */class Dc{}class Rc extends Dc{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.tr=!1}nr(){if(this.tr)throw new yt(gt.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,n,r){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Bt(e,Ra(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===gt.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new yt(gt.UNKNOWN,e.toString())})}$t(e,t,n,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.$t(e,Ra(t,n),r,i,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===gt.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new yt(gt.UNKNOWN,e.toString())})}terminate(){this.tr=!0,this.connection.terminate()}}
/**
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
 */
const Pc=new Map;
/**
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
 */
const Oc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Lc=41943040;class Vc{static withCacheSize(e){return new Vc(e,Vc.DEFAULT_COLLECTION_PERCENTILE,Vc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}Vc.DEFAULT_COLLECTION_PERCENTILE=10,Vc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Vc.DEFAULT=new Vc(Lc,Vc.DEFAULT_COLLECTION_PERCENTILE,Vc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Vc.DISABLED=new Vc(-1,0,0);
/**
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
 */
const Mc="LruGarbageCollector",Uc=1048576;function Fc([e,t],[n,r]){const s=Ct(e,n);return 0===s?Ct(t,r):s}class Bc{constructor(e){this.rr=e,this.buffer=new Zr(Fc),this.ir=0}sr(){return++this.ir}_r(e){const t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Fc(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class qc{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.ar=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return null!==this.ar}ur(e){ct(Mc,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Sn(e)?ct(Mc,"Ignoring IndexedDB error during garbage collection: ",e):await yn(e)}await this.ur(3e5)})}}class jc{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return wn.resolve(Pn.ce);const n=new Bc(t);return this.cr.forEachTarget(e,e=>n._r(e.sequenceNumber)).next(()=>this.cr.Er(e,e=>n._r(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.cr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(ct("LruGarbageCollector","Garbage collection skipped; disabled"),wn.resolve(Oc)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(ct("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Oc):this.hr(e,t))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(ct("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,i=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),at()<=U.DEBUG&&ct("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${e} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),wn.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})))}}function zc(e,t){return new jc(e,t)}
/**
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
 */const $c="firestore.googleapis.com",Kc=!0;class Gc{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new yt(gt.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=$c,this.ssl=Kc}else this.host=e.host,this.ssl=e.ssl??Kc;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=Lc;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<Uc)throw new yt(gt.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zt("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=fc(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new yt(gt.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new yt(gt.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new yt(gt.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
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
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&
/**
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
 */
function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Hc{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Gc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new yt(gt.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new yt(gt.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Gc(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new _t;switch(e.type){case"firstParty":return new Et(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new yt(gt.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Pc.get(e);t&&(ct("ComponentProvider","Removing Datastore"),Pc.delete(e),t.terminate())}(this),Promise.resolve()}}function Wc(e,t,n,r={}){e=Wt(e,Hc);const s=R(t),i=e._getSettings(),o={...i,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;s&&P(`https://${a}`),i.host!==$c&&i.host!==a&&lt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:s,emulatorOptions:r};if(!E(c,o)&&(e._setSettings(c),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=st.MOCK_USER;else{t=m(r.mockUserToken,e._app?.options.projectId);const s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new yt(gt.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new st(s)}e._authCredentials=new bt(new vt(t,n))}}
/**
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
 */class Qc{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Qc(this.firestore,e,this._query)}}class Jc{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yc(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Jc(this.firestore,e,this._key)}toJSON(){return{type:Jc._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Yt(t,Jc._jsonSchema))return new Jc(e,n||null,new qt(Ut.fromString(t.referencePath)))}}Jc._jsonSchemaVersion="firestore/documentReference/1.0",Jc._jsonSchema={type:Jt("string",Jc._jsonSchemaVersion),referencePath:Jt("string")};class Yc extends Qc{constructor(e,t,n){super(e,t,So(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Jc(this.firestore,null,new qt(e))}withConverter(e){return new Yc(this.firestore,e,this._path)}}function Xc(e,t,...n){if(e=D(e),jt("collection","path",t),e instanceof Hc){const r=Ut.fromString(t,...n);return Kt(r),new Yc(e,null,r)}{if(!(e instanceof Jc||e instanceof Yc))throw new yt(gt.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ut.fromString(t,...n));return Kt(r),new Yc(e.firestore,null,r)}}function Zc(e,t,...n){if(e=D(e),1===arguments.length&&(t=At.newId()),jt("doc","path",t),e instanceof Hc){const r=Ut.fromString(t,...n);return $t(r),new Jc(e,null,new qt(r))}{if(!(e instanceof Jc||e instanceof Yc))throw new yt(gt.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ut.fromString(t,...n));return $t(r),new Jc(e.firestore,e instanceof Yc?e.converter:null,new qt(r))}}function eu(e,t){return e=D(e),t=D(t),e instanceof Qc&&t instanceof Qc&&e.firestore===t.firestore&&Oo(e._query,t._query)&&e.converter===t.converter
/**
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
 */
/**
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
 */}class tu{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:tu._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Yt(e,tu._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new tu(e.vectorValues);throw new yt(gt.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}tu._jsonSchemaVersion="firestore/vectorValue/1.0",tu._jsonSchema={type:Jt("string",tu._jsonSchemaVersion),vectorValues:Jt("object")};
/**
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
 */
const nu=/^__.*__$/;class ru{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Li(e,this.data,this.fieldMask,t,this.fieldTransforms):new Oi(e,this.data,t,this.fieldTransforms)}}class su{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Li(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function iu(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw dt(40011,{dataSource:e})}}class ou{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ou({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Au(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(iu(this.dataSource)&&nu.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class au{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||ac(e)}createContext(e,t,n,r=!1){return new ou({dataSource:e,methodName:t,targetDoc:n,path:Bt.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function cu(e){const t=e._freezeSettings(),n=ac(e._databaseId);return new au(e._databaseId,!!t.ignoreUndefinedProperties,n)}function uu(e,t,n,r,s,i={}){const o=e.createContext(i.merge||i.mergeFields?2:0,t,n,s);Eu("Data must be an object, but it was:",o,r);const a=Iu(r,o);let c,u;if(i.merge)c=new ns(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=Su(t,r,n);if(!o.contains(s))throw new yt(gt.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Cu(e,s)||e.push(s)}c=new ns(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new ru(new ri(a),c,u)}class lu extends hc{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof lu}}function hu(e,t,n){return new ou({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class du extends hc{_toFieldTransform(e){return new Ei(e.path,new di)}isEqual(e){return e instanceof du}}class fu extends hc{constructor(e,t){super(e),this.Tr=t}_toFieldTransform(e){const t=hu(this,e,!0),n=this.Tr.map(e=>bu(e,t)),r=new fi(n);return new Ei(e.path,r)}isEqual(e){return e instanceof fu&&E(this.Tr,e.Tr)}}class pu extends hc{constructor(e,t){super(e),this.Tr=t}_toFieldTransform(e){const t=hu(this,e,!0),n=this.Tr.map(e=>bu(e,t)),r=new mi(n);return new Ei(e.path,r)}isEqual(e){return e instanceof pu&&E(this.Tr,e.Tr)}}class mu extends hc{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new wi(e.serializer,ai(e.serializer,this.Pr));return new Ei(e.path,t)}isEqual(e){return e instanceof mu&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}class gu extends hc{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new vi(e.serializer,ai(e.serializer,this.Pr));return new Ei(e.path,t)}isEqual(e){return e instanceof gu&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}class yu extends hc{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new _i(e.serializer,ai(e.serializer,this.Pr));return new Ei(e.path,t)}isEqual(e){return e instanceof yu&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}function wu(e,t,n,r){const s=e.createContext(1,t,n);Eu("Data must be an object, but it was:",s,r);const i=[],o=ri.empty();ss(r,(e,r)=>{const a=Nu(t,e,n);r=D(r);const c=s.childContextForFieldPath(a);if(r instanceof lu)i.push(a);else{const e=bu(r,c);null!=e&&(i.push(a),o.set(a,e))}});const a=new ns(i);return new su(o,a,s.fieldTransforms)}function vu(e,t,n,r,s,i){const o=e.createContext(1,t,n),a=[Su(t,r,n)],c=[s];if(i.length%2!=0)throw new yt(gt.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Su(t,i[d])),c.push(i[d+1]);const u=[],l=ri.empty();for(let d=a.length-1;d>=0;--d)if(!Cu(u,a[d])){const e=a[d];let t=c[d];t=D(t);const n=o.childContextForFieldPath(e);if(t instanceof lu)u.push(e);else{const r=bu(t,n);null!=r&&(u.push(e),l.set(e,r))}}const h=new ns(u);return new su(l,h,o.fieldTransforms)}function _u(e,t,n,r=!1){return bu(n,e.createContext(r?4:3,t))}function bu(e,t,n){if(Tu(e=D(e)))return Eu("Unsupported field value:",t,e),Iu(e,t);if(e instanceof hc)return function(e,t){if(!iu(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const s of e){let e=bu(s,t.childContextForArray(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t,n){if(null===(e=D(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return ai(t.serializer,e,n);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=en.fromDate(e);return{timestampValue:xa(t.serializer,n)}}if(e instanceof en){const n=new en(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:xa(t.serializer,n)}}if(e instanceof dc)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof cc)return{bytesValue:Aa(t.serializer,e._byteString)};if(e instanceof Jc){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.createError(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Da(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof tu)return function(e,t){const n=e instanceof tu?e.toArray():e,r={fields:{[Ts]:{stringValue:xs},[Ns]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return ii(t.serializer,e)})}}}};return{mapValue:r}}(e,t);if(sc(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${Ht(e)}`)}(e,t,n)}function Iu(e,t){const n={};return os(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ss(e,(e,r)=>{const s=bu(r,t.childContextForField(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function Tu(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof en||e instanceof dc||e instanceof cc||e instanceof Jc||e instanceof hc||e instanceof tu||sc(e))}function Eu(e,t,n){if(!Tu(n)||!Gt(n)){const r=Ht(n);throw"an object"===r?t.createError(e+" a custom object"):t.createError(e+" "+r)}}function Su(e,t,n){if((t=D(t))instanceof uc)return t._internalPath;if("string"==typeof t)return Nu(e,t);throw Au("Field path arguments must be of type string or ",e,!1,void 0,n)}const xu=new RegExp("[~\\*/\\[\\]]");function Nu(e,t,n){if(t.search(xu)>=0)throw Au(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new uc(...t.split("."))._internalPath}catch(r){throw Au(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Au(e,t,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new yt(gt.INVALID_ARGUMENT,a+e+c)}function Cu(e,t){return e.some(e=>e.isEqual(t))}function ku(e){return"function"==typeof e._readUserData}
/**
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
 */class Du{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=ri.empty();for(const r in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(r)){const s=this.optionDefinitions[r];if(r in e){const i=e[r];let o;s.nestedOptions&&Gt(i)?o={mapValue:{fields:new Du(s.nestedOptions).getOptionsProto(t,i)}}:i&&(o=bu(i,t)??void 0),o&&n.set(Bt.fromServerFormat(s.serverName),o)}}return n}getOptionsProto(e,t,n){const r=this._getKnownOptions(t,e);if(n){const t=new Map(is(n,(t,n)=>[Bt.fromServerFormat(n),void 0!==t?bu(t,e):null]));r.setAll(t)}return r.value.mapValue.fields??{}}}
/**
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
 */function Ru(){return new du("serverTimestamp")}function Pu(e){return new tu(e)}
/**
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
 */function Ou(e){let t;return e instanceof Mu?e:(t=Gt(e)?function(e){const t=[];for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)){const r=e[n];t.push(Ku(n)),t.push(Ou(r))}return new Hu("map",t,"map")}(e):e instanceof Array?function(e){return function(e,t){return new Hu("array",e.map(e=>Ou(e)),t)}(e,"array")}(e):Gu(e,void 0),t)}function Lu(e){if(e instanceof Mu)return e;if(e instanceof tu)return Ku(e);if(Array.isArray(e))return Ku(Pu(e));throw new Error("Unsupported value: "+typeof e)}function Vu(e){return function(e){return"string"==typeof e}(e)?zu(e):Ou(e)}class Mu{constructor(){this._protoValueType="ProtoValue"}add(e){return new Hu("add",[this,Ou(e)],"add")}asBoolean(){if(this instanceof Wu)return this;if(this instanceof $u)return new Ju(this);if(this instanceof ju)return new Yu(this);if(this instanceof Hu)return new Qu(this);throw new yt("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new Hu("subtract",[this,Ou(e)],"subtract")}multiply(e){return new Hu("multiply",[this,Ou(e)],"multiply")}divide(e){return new Hu("divide",[this,Ou(e)],"divide")}mod(e){return new Hu("mod",[this,Ou(e)],"mod")}equal(e){return new Hu("equal",[this,Ou(e)],"equal").asBoolean()}notEqual(e){return new Hu("not_equal",[this,Ou(e)],"notEqual").asBoolean()}lessThan(e){return new Hu("less_than",[this,Ou(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new Hu("less_than_or_equal",[this,Ou(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new Hu("greater_than",[this,Ou(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new Hu("greater_than_or_equal",[this,Ou(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const n=[e,...t].map(e=>Ou(e));return new Hu("array_concat",[this,...n],"arrayConcat")}arrayContains(e){return new Hu("array_contains",[this,Ou(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new qu(e.map(Ou),"arrayContainsAll"):e;return new Hu("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new qu(e.map(Ou),"arrayContainsAny"):e;return new Hu("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new Hu("array_reverse",[this])}arrayLength(){return new Hu("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new qu(e.map(Ou),"equalAny"):e;return new Hu("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new qu(e.map(Ou),"notEqualAny"):e;return new Hu("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new Hu("exists",[this],"exists").asBoolean()}charLength(){return new Hu("char_length",[this],"charLength")}like(e){return new Hu("like",[this,Ou(e)],"like").asBoolean()}regexContains(e){return new Hu("regex_contains",[this,Ou(e)],"regexContains").asBoolean()}regexFind(e){return new Hu("regex_find",[this,Ou(e)],"regexFind")}regexFindAll(e){return new Hu("regex_find_all",[this,Ou(e)],"regexFindAll")}regexMatch(e){return new Hu("regex_match",[this,Ou(e)],"regexMatch").asBoolean()}stringContains(e){return new Hu("string_contains",[this,Ou(e)],"stringContains").asBoolean()}startsWith(e){return new Hu("starts_with",[this,Ou(e)],"startsWith").asBoolean()}endsWith(e){return new Hu("ends_with",[this,Ou(e)],"endsWith").asBoolean()}toLower(){return new Hu("to_lower",[this],"toLower")}toUpper(){return new Hu("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(Ou(e)),new Hu("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(Ou(e)),new Hu("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(Ou(e)),new Hu("rtrim",t,"rtrim")}type(){return new Hu("type",[this])}isType(e){return new Hu("is_type",[this,Ku(e)],"isType").asBoolean()}stringConcat(e,...t){const n=[e,...t].map(Ou);return new Hu("string_concat",[this,...n],"stringConcat")}stringIndexOf(e){return new Hu("string_index_of",[this,Ou(e)],"stringIndexOf")}stringRepeat(e){return new Hu("string_repeat",[this,Ou(e)],"stringRepeat")}stringReplaceAll(e,t){return new Hu("string_replace_all",[this,Ou(e),Ou(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new Hu("string_replace_one",[this,Ou(e),Ou(t)],"stringReplaceOne")}concat(e,...t){const n=[e,...t].map(Ou);return new Hu("concat",[this,...n],"concat")}reverse(){return new Hu("reverse",[this],"reverse")}arrayFilter(e,t){return new Hu("array_filter",[this,Ou(e),t],"arrayFilter")}arrayTransform(e,t){return new Hu("array_transform",[this,Ou(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,n){return new Hu("array_transform",[this,Ou(e),Ou(t),n],"arrayTransformWithIndex")}arraySlice(e,t){const n=[this,Ou(e)];return void 0!==t&&n.push(Ou(t)),new Hu("array_slice",n,"arraySlice")}arrayFirst(){return new Hu("array_first",[this],"arrayFirst")}arrayFirstN(e){return new Hu("array_first_n",[this,Ou(e)],"arrayFirstN")}arrayLast(){return new Hu("array_last",[this],"arrayLast")}arrayLastN(e){return new Hu("array_last_n",[this,Ou(e)],"arrayLastN")}arrayMaximum(){return new Hu("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new Hu("maximum_n",[this,Ou(e)],"arrayMaximumN")}arrayMinimum(){return new Hu("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new Hu("minimum_n",[this,Ou(e)],"arrayMinimumN")}arrayIndexOf(e){return new Hu("array_index_of",[this,Ou(e),Ou("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new Hu("array_index_of",[this,Ou(e),Ou("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new Hu("array_index_of_all",[this,Ou(e)],"arrayIndexOfAll")}byteLength(){return new Hu("byte_length",[this],"byteLength")}ceil(){return new Hu("ceil",[this])}floor(){return new Hu("floor",[this])}abs(){return new Hu("abs",[this])}exp(){return new Hu("exp",[this])}mapGet(e){return new Hu("map_get",[this,Ku(e)],"mapGet")}mapSet(e,t,...n){const r=[this,Ou(e),Ou(t),...n.map(Ou)];return new Hu("map_set",r,"mapSet")}mapKeys(){return new Hu("map_keys",[this],"mapKeys")}mapValues(){return new Hu("map_values",[this],"mapValues")}mapEntries(){return new Hu("map_entries",[this],"mapEntries")}getField(e){return new Hu("get_field",[this,Ou(e)],"get_field")}count(){return Uu._create("count",[this],"count")}sum(){return Uu._create("sum",[this],"sum")}average(){return Uu._create("average",[this],"average")}minimum(){return Uu._create("minimum",[this],"minimum")}maximum(){return Uu._create("maximum",[this],"maximum")}first(){return Uu._create("first",[this],"first")}last(){return Uu._create("last",[this],"last")}arrayAgg(){return Uu._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return Uu._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return Uu._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const n=[e,...t];return new Hu("maximum",[this,...n.map(Ou)],"logicalMaximum")}logicalMinimum(e,...t){const n=[e,...t];return new Hu("minimum",[this,...n.map(Ou)],"minimum")}vectorLength(){return new Hu("vector_length",[this],"vectorLength")}cosineDistance(e){return new Hu("cosine_distance",[this,Lu(e)],"cosineDistance")}dotProduct(e){return new Hu("dot_product",[this,Lu(e)],"dotProduct")}euclideanDistance(e){return new Hu("euclidean_distance",[this,Lu(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new Hu("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new Hu("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new Hu("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new Hu("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new Hu("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new Hu("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new Hu("timestamp_add",[this,Ou(e),Ou(t)],"timestampAdd")}timestampSubtract(e,t){return new Hu("timestamp_subtract",[this,Ou(e),Ou(t)],"timestampSubtract")}timestampDiff(e,t){return new Hu("timestamp_diff",[this,Vu(e),Ou(t)],"timestampDiff")}timestampExtract(e,t){const n=[this,Ou(e)];return t&&n.push(Ou(t)),new Hu("timestamp_extract",n,"timestampExtract")}documentId(){return new Hu("document_id",[this],"documentId")}parent(){return new Hu("parent",[this],"parent")}substring(e,t){const n=Ou(e);return new Hu("substring",void 0===t?[this,n]:[this,n,Ou(t)],"substring")}arrayGet(e){return new Hu("array_get",[this,Ou(e)],"arrayGet")}isError(){return new Hu("is_error",[this],"isError").asBoolean()}ifError(e){const t=new Hu("if_error",[this,Ou(e)],"ifError");return e instanceof Wu?t.asBoolean():t}isAbsent(){return new Hu("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new Hu("map_remove",[this,Ou(e)],"mapRemove")}mapMerge(e,...t){const n=Ou(e),r=t.map(Ou);return new Hu("map_merge",[this,n,...r],"mapMerge")}pow(e){return new Hu("pow",[this,Ou(e)])}trunc(e){return void 0===e?new Hu("trunc",[this]):new Hu("trunc",[this,Ou(e)],"trunc")}round(e){return void 0===e?new Hu("round",[this]):new Hu("round",[this,Ou(e)],"round")}collectionId(){return new Hu("collection_id",[this])}length(){return new Hu("length",[this])}ln(){return new Hu("ln",[this])}sqrt(){return new Hu("sqrt",[this])}stringReverse(){return new Hu("string_reverse",[this])}ifAbsent(e){return new Hu("if_absent",[this,Ou(e)],"ifAbsent")}ifNull(e){return new Hu("if_null",[this,Ou(e)],"ifNull")}coalesce(e,...t){return new Hu("coalesce",[this,Ou(e),...t.map(Ou)],"coalesce")}join(e){return new Hu("join",[this,Ou(e)],"join")}log10(){return new Hu("log10",[this])}arraySum(){return new Hu("sum",[this])}split(e){return new Hu("split",[this,Ou(e)])}timestampTruncate(e,t){const n=[this,Ou(e)];return t&&n.push(Ou(t)),new Hu("timestamp_trunc",n)}ascending(){return new Xu(Vu(this),"ascending","ascending")}descending(){return new Xu(Vu(this),"descending","descending")}as(e){return new Bu(this,e,"as")}}class Uu{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,n){const r=new Uu(e,t);return r._methodName=n,r}as(e){return new Fu(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class Fu{constructor(e,t,n){this.aggregate=e,this.alias=t,this._methodName=n}_readUserData(e){this.aggregate._readUserData(e)}}class Bu{constructor(e,t,n){this.expr=e,this.alias=t,this._methodName=n,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class qu extends Mu{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map(t=>t._toProto(e))}}}_readUserData(e){this.Rr.forEach(t=>t._readUserData(e))}}class ju extends Mu{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new Hu("geo_distance",[this,Ou(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function zu(e){return function(e,t){return new ju("string"==typeof e?Vt===e?lc()._internalPath:Su("field",e):e._internalPath,t)}(e,"field")}class $u extends Mu{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new $u(e,void 0);return t._protoValue=e,t}_toProto(e){return pt(void 0!==this._protoValue,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,function(e){return"object"==typeof e&&null!==e&&!!("nullValue"in e&&(null===e.nullValue||"NULL_VALUE"===e.nullValue)||"booleanValue"in e&&(null===e.booleanValue||"boolean"==typeof e.booleanValue)||"integerValue"in e&&(null===e.integerValue||"number"==typeof e.integerValue||"string"==typeof e.integerValue)||"doubleValue"in e&&(null===e.doubleValue||"number"==typeof e.doubleValue)||"timestampValue"in e&&(null===e.timestampValue||function(e){return"object"==typeof e&&null!==e&&"seconds"in e&&(null===e.seconds||"number"==typeof e.seconds||"string"==typeof e.seconds)&&"nanos"in e&&(null===e.nanos||"number"==typeof e.nanos)}(e.timestampValue))||"stringValue"in e&&(null===e.stringValue||"string"==typeof e.stringValue)||"bytesValue"in e&&(null===e.bytesValue||e.bytesValue instanceof Uint8Array)||"referenceValue"in e&&(null===e.referenceValue||"string"==typeof e.referenceValue)||"geoPointValue"in e&&(null===e.geoPointValue||function(e){return"object"==typeof e&&null!==e&&"latitude"in e&&(null===e.latitude||"number"==typeof e.latitude)&&"longitude"in e&&(null===e.longitude||"number"==typeof e.longitude)}(e.geoPointValue))||"arrayValue"in e&&(null===e.arrayValue||function(e){return"object"==typeof e&&null!==e&&!(!("values"in e)||null!==e.values&&!Array.isArray(e.values))}(e.arrayValue))||"mapValue"in e&&(null===e.mapValue||function(e){return"object"==typeof e&&null!==e&&!(!("fields"in e)||null!==e.fields&&!Gt(e.fields))}(e.mapValue))||"fieldReferenceValue"in e&&(null===e.fieldReferenceValue||"string"==typeof e.fieldReferenceValue)||"functionValue"in e&&(null===e.functionValue||function(e){return"object"==typeof e&&null!==e&&!(!("name"in e)||null!==e.name&&"string"!=typeof e.name||!("args"in e)||null!==e.args&&!Array.isArray(e.args))}(e.functionValue))||"pipelineValue"in e&&(null===e.pipelineValue||function(e){return"object"==typeof e&&null!==e&&!(!("stages"in e)||null!==e.stages&&!Array.isArray(e.stages))}(e.pipelineValue)))}
/**
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
 */(this._protoValue)||(this._protoValue=bu(this.value,e))}}function Ku(e,t){return Gu(e,"constant")}function Gu(e,t){const n=new $u(e,t);return"boolean"==typeof e?new Ju(n):n}class Hu extends Mu{constructor(e,t,n,r){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,void 0!==n&&(this._methodName=n),void 0!==r&&(this._options=r)}get _optionsUtil(){return new Du({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Wu extends Mu{get _methodName(){return this._expr._methodName}countIf(){return Uu._create("count_if",[this],"countIf")}not(){return new Hu("not",[this],"not").asBoolean()}conditional(e,t){return new Hu("conditional",[this,e,t],"conditional")}ifError(e){const t=Ou(e),n=new Hu("if_error",[this,t],"ifError");return t instanceof Wu?n.asBoolean():n}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class Qu extends Wu{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class Ju extends Wu{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class Yu extends Wu{constructor(e){super(),this._expr=e,this.expressionType="Field"}}class Xu{constructor(e,t,n){this.expr=e,this.direction=t,this._methodName=n,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:oc(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}
/**
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
 */class Zu{constructor(e){this.optionsProto=void 0,({rawOptions:this.rawOptions,...this.knownOptions}=e)}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class el extends Zu{get _name(){return"add_fields"}get _optionsUtil(){return new Du({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[ic(e,this.fields)]}}_readUserData(e){super._readUserData(e),fl(this.fields,e)}}class tl extends Zu{get _name(){return"aggregate"}get _optionsUtil(){return new Du({})}constructor(e,t,n){super(n),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[ic(e,this.accumulators),ic(e,this.groups)]}}_readUserData(e){super._readUserData(e),fl(this.groups,e),fl(this.accumulators,e)}}class nl extends Zu{get _name(){return"distinct"}get _optionsUtil(){return new Du({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[ic(e,this.groups)]}}_readUserData(e){super._readUserData(e),fl(this.groups,e)}}class rl extends Zu{get _name(){return"collection"}get _optionsUtil(){return new Du({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class sl extends Zu{get _name(){return"collection_group"}get _optionsUtil(){return new Du({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class il extends Zu{get _name(){return"database"}get _optionsUtil(){return new Du({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class ol extends Zu{get _name(){return"documents"}get _optionsUtil(){return new Du({})}constructor(e,t){if(super(t),!e||0===e.length)throw new yt(gt.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const n=e.map(e=>e.startsWith("/")?e:"/"+e),r=new Set(n);if(r.size!==n.length)throw new yt(gt.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=n,this.mr=r}_toProto(e){return{...super._toProto(e),args:this.dr.map(e=>({referenceValue:e}))}}_readUserData(e){super._readUserData(e)}}class al extends Zu{get _name(){return"where"}get _optionsUtil(){return new Du({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),fl(this.condition,e)}}class cl extends Zu{get _name(){return"limit"}get _optionsUtil(){return new Du({})}constructor(e,t){pt(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[ai(e,this.limit)]}}}class ul extends Zu{get _name(){return"offset"}get _optionsUtil(){return new Du({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[ai(e,this.offset)]}}}class ll extends Zu{get _name(){return"select"}get _optionsUtil(){return new Du({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[ic(e,this.selections)]}}_readUserData(e){super._readUserData(e),fl(this.selections,e)}}class hl extends Zu{get _name(){return"sort"}get _optionsUtil(){return new Du({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),fl(this.orderings,e)}}class dl extends Zu{get _name(){return"replace_with"}get _optionsUtil(){return new Du({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),oc(dl.pr)]}}_readUserData(e){super._readUserData(e),fl(this.map,e)}}function fl(e,t){return ku(e)?e._readUserData(t):Array.isArray(e)||e instanceof Map?e.forEach(e=>e._readUserData(t)):Object.values(e).forEach(e=>e._readUserData(t)),e}
// Copyright 2024 Google LLC* @license
dl.pr="full_replace";class pl{constructor(e,t,n){this.serializer=e,this.stages=t,this.listenOptions=n,this.isCorePipeline=!0}getPipelineCollection(){return gl(this)}getPipelineCollectionGroup(){return yl(this)}getPipelineCollectionId(){return wl(this)}getPipelineDocuments(){return vl(this)}getPipelineFlavor(){return function(e){let t="exact";return e.stages.forEach((n,r)=>{n._name!==nl.name&&n._name!==tl.name||(t="keyless"),n._name===ll.name&&"exact"===t&&(t="augmented"),n._name===el.name&&r<e.stages.length-1&&"exact"===t&&(t="augmented")}),t}
/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this)}getPipelineSourceType(){return ml(this)}}function ml(e){const t=e.stages[0];return t instanceof rl||t instanceof sl||t instanceof il||t instanceof ol?t._name:"unknown"}function gl(e){if("collection"===ml(e))return e.stages[0].Vr}function yl(e){if("collection_group"===ml(e))return e.stages[0].collectionId}function wl(e){switch(ml(e)){case"collection":return Ut.fromString(gl(e)).lastSegment();case"collection_group":return yl(e);default:return}}function vl(e){if("documents"===ml(e))return e.stages[0].dr}class _l{constructor(e,t,n,r){this._db=e,this.userDataReader=t,this._userDataWriter=n,this.stages=r}wr(e,t){const n=this.userDataReader.createContext(3,e);return ku(t)?t._readUserData(n):(Array.isArray(t),t.forEach(e=>e._readUserData(n))),t}where(e){const t=this.stages.map(e=>e);return this.wr("where",e),t.push(new al(e,{})),new _l(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map(e=>e);return t.push(new cl(e,{})),new _l(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const n=this.stages.map(e=>e);return"orderings"in e?n.push(new hl(this.wr("sort",e.orderings),{})):n.push(new hl(this.wr("sort",[e,...t]),{})),new _l(this._db,this.userDataReader,this._userDataWriter,n)}br(e){return{pipeline:{stages:this.stages.map(t=>t._toProto(e))}}}}
// Copyright 2024 Google LLC* @license
class bl{constructor(e,t){this.type=e,this.value=t}static vr(){return new bl("ERROR",void 0)}static Sr(){return new bl("UNSET",void 0)}static Dr(){return new bl("NULL",As)}static newValue(e){return Ks(e)?new bl("NULL",As):function(e){return!!e&&"booleanValue"in e}(e)?new bl("BOOLEAN",e):qs(e)?new bl("INT",e):js(e)?new bl("DOUBLE",e):function(e){return!!e&&"timestampValue"in e&&!!e.timestampValue}(e)?new bl("TIMESTAMP",e):function(e){return!!e&&"stringValue"in e}(e)?new bl("STRING",e):function(e){return!!e&&"bytesValue"in e}(e)?new bl("BYTES",e):e.referenceValue?new bl("REFERENCE",e):e.geoPointValue?new bl("GEO_POINT",e):$s(e)?new bl("ARRAY",e):Ws(e)?new bl("VECTOR",e):Hs(e)?new bl("MAP",e):new bl("ERROR",void 0)}Cr(){return"ERROR"===this.type||"UNSET"===this.type}Fr(){return"NULL"===this.type}}function Il(e){if(!e.Cr())return e.value}function Tl(e){return e instanceof Wu?e._expr:e}function El(e){if((e=Tl(e))instanceof ju)return new Sl(e);if(e instanceof $u)return new xl(e);if(e instanceof qu)return new Nl(e);if(e instanceof Hu){if("add"===e.name)return new Ol(e);if("subtract"===e.name)return new Ll(e);if("multiply"===e.name)return new Vl(e);if("divide"===e.name)return new Ml(e);if("mod"===e.name)return new Ul(e);if("and"===e.name)return new Fl(e);if("equal"===e.name)return new th(e);if("not_equal"===e.name)return new nh(e);if("less_than"===e.name)return new rh(e);if("less_than_or_equal"===e.name)return new sh(e);if("greater_than"===e.name)return new ih(e);if("greater_than_or_equal"===e.name)return new oh(e);if("array_concat"===e.name)return new ah(e);if("array_reverse"===e.name)return new ch(e);if("array_contains"===e.name)return new uh(e);if("array_contains_all"===e.name)return new lh(e);if("array_contains_any"===e.name)return new hh(e);if("array_length"===e.name)return new dh(e);if("array_element"===e.name)return new fh(e);if("equal_any"===e.name)return new zl(e);if("not_equal_any"===e.name)return new $l(e);if("is_nan"===e.name)return new Kl(e);if("is_not_nan"===e.name)return new Gl(e);if("is_null"===e.name)return new Hl(e);if("is_not_null"===e.name)return new Wl(e);if("is_error"===e.name)return new Ql(e);if("exists"===e.name)return new Jl(e);if("not"===e.name)return new Bl(e);if("or"===e.name)return new ql(e);if("xor"===e.name)return new jl(e);if("conditional"===e.name)return new Yl(e);if("maximum"===e.name)return new Xl(e);if("minimum"===e.name)return new Zl(e);if("reverse"===e.name)return new ph(e);if("replace_first"===e.name)return new mh(e);if("replace_all"===e.name)return new gh(e);if("char_length"===e.name)return new yh(e);if("byte_length"===e.name)return new wh(e);if("like"===e.name)return new _h(e);if("regex_contains"===e.name)return new bh(e);if("regex_match"===e.name)return new Ih(e);if("string_contains"===e.name)return new Th(e);if("starts_with"===e.name)return new Eh(e);if("ends_with"===e.name)return new Sh(e);if("to_lower"===e.name)return new xh(e);if("to_upper"===e.name)return new Nh(e);if("trim"===e.name)return new Ah(e);if("string_concat"===e.name)return new Ch(e);if("map_get"===e.name)return new kh(e);if("cosine_distance"===e.name)return new Rh(e);if("dot_product"===e.name)return new Ph(e);if("euclidean_distance"===e.name)return new Oh(e);if("vector_length"===e.name)return new Lh(e);if("unix_micros_to_timestamp"===e.name)return new Jh(e);if("timestamp_to_unix_micros"===e.name)return new ed(e);if("unix_millis_to_timestamp"===e.name)return new Yh(e);if("timestamp_to_unix_millis"===e.name)return new td(e);if("unix_seconds_to_timestamp"===e.name)return new Xh(e);if("timestamp_to_unix_seconds"===e.name)return new nd(e);if("timestamp_add"===e.name)return new sd(e);if("timestamp_subtract"===e.name)return new id(e)}throw new Error(`Unknown Expr : ${e}`)}class Sl{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Vt)return bl.newValue({referenceValue:Oa(e.serializer,t.key)});if("__update_time__"===this.expr.fieldName)return bl.newValue({timestampValue:Ca(e.serializer,t.version)});if("__create_time__"===this.expr.fieldName)return bl.newValue({timestampValue:Ca(e.serializer,t.createTime)});const n=t.data.field(this.expr._fieldPath);return n?ys(n)?bl.newValue(function(e,t){if("estimate"===e.serverTimestampBehavior)return{timestampValue:Ca(e.serializer,tn.fromTimestamp(vs(t)))};if("previous"===e.serverTimestampBehavior){const e=ws(t);if(e)return e}return{nullValue:"NULL_VALUE"}}(e,n)):bl.newValue(n):bl.Sr()}}class xl{constructor(e){this.expr=e}evaluate(e,t){return bl.newValue(this.expr._getValue())}}class Nl{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.Rr.map(n=>El(n).evaluate(e,t));return n.some(e=>e.Cr())?bl.vr():bl.newValue({arrayValue:{values:n.map(e=>e.value)}})}}function Al(e){return js(e)?Number(e.doubleValue):Number(e.integerValue)}function Cl(e){return BigInt(e.integerValue)}const kl=BigInt("0x7fffffffffffffff"),Dl=-BigInt("0x8000000000000000");class Rl{constructor(e){this.expr=e}evaluate(e,t){pt(this.expr.params.length>=2,24778);const n=El(this.expr.params[0]).evaluate(e,t),r=El(this.expr.params[1]).evaluate(e,t);let s=this.Or(n,r);for(const i of this.expr.params.slice(2)){const n=El(i).evaluate(e,t);s=this.Or(s,n)}return s}Or(e,t){if(e.Cr()||t.Cr())return bl.vr();if(e.Fr()||t.Fr())return bl.Dr();const n=e.value,r=t.value;if(!js(n)&&!qs(n)||!js(r)&&!qs(r))return bl.vr();if(js(n)||js(r)){const e=this.Mr(n,r);return e?bl.newValue(e):bl.vr()}if(qs(n)&&qs(r)){const e=this.Nr(n,r);return void 0===e?bl.vr():"number"==typeof e?bl.newValue({doubleValue:e}):e<Dl||e>kl?bl.vr():bl.newValue({integerValue:`${e}`})}return bl.vr()}}function Pl(e,t){return Ds(e)!==Ds(t)?"TYPE_MISMATCH":Gs(e)||Gs(t)?"NOT_EQ":Ks(e)&&Ks(t)?"EQ":Ks(e)||Ks(t)?"NULL":$s(e)&&$s(t)?function(e,t){if(e.values?.length!==t.values?.length)return"NOT_EQ";let n=!1;for(let r=0;r<(e.values?.length??0);r++){const s=e.values[r],i=t.values[r];switch(Pl(s,i)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":n=!0;break;default:dt(44609,{Lr:s,Br:i})}}return n?"NULL":"EQ"}(e.arrayValue,t.arrayValue):Ws(e)&&Ws(t)||Hs(e)&&Hs(t)?function(e,t){const n=e.fields||{},r=t.fields||{};if(rs(n)!==rs(r))return"NOT_EQ";let s=!1;for(const i in n)if(n.hasOwnProperty(i)){if(void 0===r[i])return"NOT_EQ";switch(Pl(n[i],r[i])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":s=!0}}return s?"NULL":"EQ"}(e.mapValue,t.mapValue):function(e,t){return Rs(e,t,{Te:!1,Ee:!0,he:!0})}(e,t)?"EQ":"NOT_EQ"}class Ol extends Rl{Nr(e,t){return Cl(e)+Cl(t)}Mr(e,t){return{doubleValue:Al(e)+Al(t)}}}class Ll extends Rl{constructor(e){super(e),this.expr=e}Nr(e,t){return Cl(e)-Cl(t)}Mr(e,t){return{doubleValue:Al(e)-Al(t)}}}class Vl extends Rl{constructor(e){super(e),this.expr=e}Nr(e,t){return Cl(e)*Cl(t)}Mr(e,t){return{doubleValue:Al(e)*Al(t)}}}class Ml extends Rl{constructor(e){super(e),this.expr=e}Nr(e,t){const n=Cl(t);if(n!==BigInt(0))return Cl(e)/n}Mr(e,t){const n=Al(t);return 0===n?{doubleValue:Vn(n)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Al(e)/n}}}class Ul extends Rl{constructor(e){super(e),this.expr=e}Nr(e,t){const n=Cl(t);if(n!==BigInt(0))return Cl(e)%n}Mr(e,t){const n=Al(t);if(0!==n)return{doubleValue:Al(e)%n}}}class Fl{constructor(e){this.expr=e}evaluate(e,t){let n=!1,r=!1;for(const s of this.expr.params){const i=El(s).evaluate(e,t);switch(i.type){case"BOOLEAN":if(!i.value?.booleanValue)return bl.newValue(ks);break;case"NULL":r=!0;break;default:n=!0}}return n?bl.vr():r?bl.Dr():bl.newValue(Cs)}}class Bl{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,9634);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return bl.newValue({booleanValue:!n.value?.booleanValue});case"NULL":return bl.Dr();default:return bl.vr()}}}class ql{constructor(e){this.expr=e}evaluate(e,t){let n=!1,r=!1;for(const s of this.expr.params){const i=El(s).evaluate(e,t);switch(i.type){case"BOOLEAN":if(i.value?.booleanValue)return bl.newValue(Cs);break;case"NULL":r=!0;break;default:n=!0}}return n?bl.vr():r?bl.Dr():bl.newValue(ks)}}class jl{constructor(e){this.expr=e}evaluate(e,t){let n=!1,r=!1;for(const s of this.expr.params){const i=El(s).evaluate(e,t);switch(i.type){case"BOOLEAN":n=jl.xor(n,!!i.value?.booleanValue);break;case"NULL":r=!0;break;default:return bl.vr()}}return r?bl.Dr():bl.newValue({booleanValue:n})}static xor(e,t){return(e||t)&&!(e&&t)}}class zl{constructor(e){this.expr=e}evaluate(e,t){pt(2===this.expr.params.length,55094);let n=!1;const r=El(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":n=!0;break;case"ERROR":case"UNSET":return bl.vr()}const s=El(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return bl.vr()}if(n)return bl.Dr();for(const i of s.value?.arrayValue?.values??[])switch(Ks(r.value)&&Ks(i)?"EQ":Pl(r.value,i)){case"EQ":return bl.newValue(Cs);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:dt(44608,{value:r.value,candidate:i})}return n?bl.Dr():bl.newValue(ks)}}class $l{constructor(e){this.expr=e}evaluate(e,t){return new Bl(new Hu("not",[new Hu("equal_any",this.expr.params)])).evaluate(e,t)}}class Kl{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,23322);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return bl.newValue(ks);case"DOUBLE":return bl.newValue({booleanValue:isNaN(Al(n.value))});case"NULL":return bl.Dr();default:return bl.vr()}}}class Gl{constructor(e){this.expr=e}evaluate(e,t){return pt(1===this.expr.params.length,50406),new Bl(new Hu("not",[new Hu("is_nan",this.expr.params)])).evaluate(e,t)}}class Hl{constructor(e){this.expr=e}evaluate(e,t){switch(pt(1===this.expr.params.length,23123),El(this.expr.params[0]).evaluate(e,t).type){case"NULL":return bl.newValue(Cs);case"UNSET":case"ERROR":return bl.vr();default:return bl.newValue(ks)}}}class Wl{constructor(e){this.expr=e}evaluate(e,t){return pt(1===this.expr.params.length,23167),new Bl(new Hu("not",[new Hu("is_null",this.expr.params)])).evaluate(e,t)}}class Ql{constructor(e){this.expr=e}evaluate(e,t){return pt(1===this.expr.params.length,5228),"ERROR"===El(this.expr.params[0]).evaluate(e,t).type?bl.newValue(Cs):bl.newValue(ks)}}class Jl{constructor(e){this.expr=e}evaluate(e,t){switch(pt(1===this.expr.params.length,6877),El(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return bl.vr();case"UNSET":return bl.newValue(ks);default:return bl.newValue(Cs)}}}class Yl{constructor(e){this.expr=e}evaluate(e,t){pt(3===this.expr.params.length,11706);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return n.value?.booleanValue?El(this.expr.params[1]).evaluate(e,t):El(this.expr.params[2]).evaluate(e,t);case"NULL":return El(this.expr.params[2]).evaluate(e,t);default:return bl.vr()}}}class Xl{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(n=>El(n).evaluate(e,t));let r;for(const s of n)switch(s.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=void 0===r||Os(s.value,r.value)>0?s:r}return void 0===r?bl.Dr():r}}class Zl{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(n=>El(n).evaluate(e,t));let r;for(const s of n)switch(s.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=void 0===r||Os(s.value,r.value)<0?s:r}return void 0===r?bl.Dr():r}}class eh{constructor(e){this.expr=e}evaluate(e,t){pt(2===this.expr.params.length,31033,`${this.expr.name}() function should have exactly 2 params`);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return bl.vr()}const r=El(this.expr.params[1]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return bl.vr()}return this.Ur(n,r)}}class th extends eh{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return bl.newValue(Cs);if(e.Fr()||t.Fr())return bl.newValue(ks);if(Gs(e.value)||Gs(t.value))return bl.newValue(ks);if(Ds(e.value)!==Ds(t.value))return bl.newValue(ks);switch(Pl(e.value,t.value)){case"EQ":return bl.newValue(Cs);case"NOT_EQ":return bl.newValue(ks);case"NULL":return bl.Dr();default:dt(44615,{left:e,right:t})}}}class nh extends eh{constructor(e){super(e),this.expr=e}Ur(e,t){switch(Pl(e.value,t.value)){case"EQ":return bl.newValue(ks);case"NOT_EQ":case"TYPE_MISMATCH":return bl.newValue(Cs);case"NULL":return bl.Dr();default:dt(44614,{left:e,right:t})}}}class rh extends eh{constructor(e){super(e),this.expr=e}Ur(e,t){return Ds(e.value)!==Ds(t.value)||Gs(e.value)||Gs(t.value)?bl.newValue(ks):bl.newValue({booleanValue:Os(e.value,t.value)<0})}}class sh extends eh{constructor(e){super(e),this.expr=e}Ur(e,t){return Ds(e.value)!==Ds(t.value)||Gs(e.value)||Gs(t.value)?bl.newValue(ks):"EQ"===Pl(e.value,t.value)?bl.newValue(Cs):bl.newValue({booleanValue:Os(e.value,t.value)<0})}}class ih extends eh{constructor(e){super(e),this.expr=e}Ur(e,t){return Ds(e.value)!==Ds(t.value)||Gs(e.value)||Gs(t.value)?bl.newValue(ks):bl.newValue({booleanValue:Os(e.value,t.value)>0})}}class oh extends eh{constructor(e){super(e),this.expr=e}Ur(e,t){return Ds(e.value)!==Ds(t.value)||Gs(e.value)||Gs(t.value)?bl.newValue(ks):"EQ"===Pl(e.value,t.value)?bl.newValue(Cs):bl.newValue({booleanValue:Os(e.value,t.value)>0})}}class ah{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class ch{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,216);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return bl.Dr();case"ARRAY":{const e=n.value.arrayValue?.values??[];return bl.newValue({arrayValue:{values:[...e].reverse()}})}default:return bl.vr()}}}class uh{constructor(e){this.expr=e}evaluate(e,t){return pt(2===this.expr.params.length,52884),new zl(new Hu("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class lh{constructor(e){this.expr=e}evaluate(e,t){pt(2===this.expr.params.length,1392);let n=!1;const r=El(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ARRAY":break;case"NULL":n=!0;break;default:return bl.vr()}const s=El(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return bl.vr()}if(n)return bl.Dr();const i=s.value?.arrayValue?.values??[],o=r.value?.arrayValue?.values??[];for(const a of i){let e=!1;n=!1;for(const t of o){switch(Ks(a)&&Ks(t)?"EQ":Pl(a,t)){case"EQ":e=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:dt(44613,{value:t,search:a})}if(e)break}if(!e)return bl.newValue(ks)}return bl.newValue(Cs)}}class hh{constructor(e){this.expr=e}evaluate(e,t){pt(2===this.expr.params.length,2680);let n=!1;const r=El(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ARRAY":break;case"NULL":n=!0;break;default:return bl.vr()}const s=El(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return bl.vr()}if(n)return bl.Dr();const i=s.value?.arrayValue?.values??[],o=r.value?.arrayValue?.values??[];for(const a of o)for(const e of i)switch(Ks(a)&&Ks(e)?"EQ":Pl(a,e)){case"EQ":return bl.newValue(Cs);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:dt(44608,{value:a,search:e})}return n?bl.Dr():bl.newValue(ks)}}class dh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,38605);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return bl.Dr();case"ARRAY":return bl.newValue({integerValue:`${n.value?.arrayValue?.values?.length??0}`});default:return bl.vr()}}}class fh{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class ph{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,1508);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return bl.Dr();case"BYTES":{const e=n.value?.bytesValue;if("string"==typeof e){const t=cs.fromBase64String(e).toUint8Array();return t.reverse(),bl.newValue({bytesValue:cs.fromUint8Array(t).toBase64()})}return bl.newValue({bytesValue:new Uint8Array(e).reverse()})}case"STRING":{const e=n.value?.stringValue,t=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(e),r=Array.from(t,e=>e.segment).reverse();return bl.newValue({stringValue:r.join("")})}default:return bl.vr()}}}class mh{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class gh{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class yh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,19400);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return bl.Dr();case"STRING":{const e=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.codePointAt(n);if(void 0===r)return;if(r<=65535)if(r>=55296&&r<=57343)if(r<=56319){const r=e.codePointAt(n+1);void 0!==r&&r>=56320&&r<=57343?(t+=1,n++):t+=1}else t+=1;else t+=1;else{if(!(r<=1114111))return;t+=1,n++}}return t}(n.value.stringValue);return void 0===e?bl.vr():bl.newValue({integerValue:e})}default:return bl.vr()}}}class wh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,8486);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BYTES":{const e=n.value?.bytesValue;return"string"==typeof e?bl.newValue({integerValue:cs.fromBase64String(e).toUint8Array().length}):bl.newValue({integerValue:new Uint8Array(e).length})}case"STRING":{const e=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.codePointAt(n);if(void 0===r)return;if(r>=55296&&r<=57343){if(!(r<=56319))return;{const r=e.codePointAt(n+1);if(void 0===r||!(r>=56320&&r<=57343))return;t+=4,n++}}else if(r<=127)t+=1;else if(r<=2047)t+=2;else if(r<=65535)t+=3;else{if(!(r<=1114111))return;t+=4,n++}}return t}(n.value?.stringValue);return void 0===e?bl.vr():bl.newValue({integerValue:e})}case"NULL":return bl.Dr();default:return bl.vr()}}}class vh{constructor(e){this.expr=e}evaluate(e,t){pt(2===this.expr.params.length,39773,`${this.expr.name}() function should have exactly two parameters`);let n=!1;const r=El(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":break;case"NULL":n=!0;break;default:return bl.vr()}const s=El(this.expr.params[1]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":n=!0;break;default:return bl.vr()}return n?bl.Dr():this.kr(r.value?.stringValue,s.value?.stringValue)}}class _h extends vh{kr(e,n){try{const r=function(e){let t="";for(let n=0;n<e.length;n++){const r=e.charAt(n);switch(r){case"_":t+=".";break;case"%":t+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":t+="\\"+r;break;default:t+=r}}return"^"+t+"$"}(n),s=t.compile(r);return bl.newValue({booleanValue:s.matches(e)})}catch(e){return lt(`Invalid LIKE pattern converted to regex: ${n}, returning error. Error: ${e}`),bl.vr()}}}class bh extends vh{kr(e,n){try{const r=t.compile(n);return bl.newValue({booleanValue:r.matcher(e).find()})}catch(e){return lt(`Invalid regex pattern found in regex_contains: ${n}, returning error`),bl.vr()}}}class Ih extends vh{kr(e,n){try{return bl.newValue({booleanValue:t.compile(n).matches(e)})}catch(e){return lt(`Invalid regex pattern found in regex_match: ${n}, returning error`),bl.vr()}}}class Th extends vh{kr(e,t){return bl.newValue({booleanValue:e.includes(t)})}}class Eh extends vh{kr(e,t){return bl.newValue({booleanValue:e.startsWith(t)})}}class Sh extends vh{kr(e,t){return bl.newValue({booleanValue:e.endsWith(t)})}}class xh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,29079);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return bl.newValue({stringValue:n.value?.stringValue?.toLowerCase()});case"NULL":return bl.Dr();default:return bl.vr()}}}class Nh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,60487);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return bl.newValue({stringValue:n.value?.stringValue?.toUpperCase()});case"NULL":return bl.Dr();default:return bl.vr()}}}class Ah{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,28544);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return bl.newValue({stringValue:n.value?.stringValue?.trim()});case"NULL":return bl.Dr();default:return bl.vr()}}}class Ch{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(n=>El(n).evaluate(e,t));let r="",s=!1;for(const i of n)switch(i.type){case"STRING":r+=i.value.stringValue;break;case"NULL":s=!0;break;default:return bl.vr()}return s?bl.Dr():bl.newValue({stringValue:r})}}class kh{constructor(e){this.expr=e}evaluate(e,t){pt(2===this.expr.params.length,4483);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"UNSET":return bl.Sr();case"MAP":break;default:return bl.vr()}const r=El(this.expr.params[1]).evaluate(e,t);if("STRING"!==r.type)return bl.vr();const s=n.value?.mapValue?.fields?.[r.value?.stringValue];return void 0===s?bl.Sr():bl.newValue(s)}}class Dh{constructor(e){this.expr=e}evaluate(e,t){pt(2===this.expr.params.length,25231,`${this.expr.name}() function should have exactly 2 params`);let n=!1;const r=El(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":break;case"NULL":n=!0;break;default:return bl.vr()}const s=El(this.expr.params[1]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":n=!0;break;default:return bl.vr()}if(n)return bl.Dr();const i=Qs(r.value),o=Qs(s.value);if(void 0===i||void 0===o||i.values?.length!==o.values?.length)return bl.vr();const a=this.qr(i,o);return void 0===a||isNaN(a)?bl.vr():bl.newValue({doubleValue:a})}}class Rh extends Dh{qr(e,t){const n=e?.values??[],r=t?.values??[];if(0===n.length)return;let s=0,i=0,o=0;for(let c=0;c<n.length;c++){if(!zs(n[c])||!zs(r[c]))return;const e=Al(n[c]),t=Al(r[c]);s+=e*t,i+=e*e,o+=t*t}const a=Math.sqrt(i)*Math.sqrt(o);return 0!==a?1-Math.max(-1,Math.min(1,s/a)):void 0}}class Ph extends Dh{qr(e,t){const n=e?.values??[],r=t?.values??[];if(0===n.length)return 0;let s=0;for(let i=0;i<n.length;i++){if(!zs(n[i])||!zs(r[i]))return;s+=Al(n[i])*Al(r[i])}return s}}class Oh extends Dh{qr(e,t){const n=e?.values??[],r=t?.values??[];if(0===n.length)return 0;let s=0;for(let i=0;i<n.length;i++){if(!zs(n[i])||!zs(r[i]))return;const e=Al(n[i]),t=Al(r[i]);s+=Math.pow(e-t,2)}return Math.sqrt(s)}}class Lh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,39044);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"VECTOR":{const e=Qs(n.value);return bl.newValue({integerValue:e?.values?.length??0})}case"NULL":return bl.Dr();default:return bl.vr()}}}const Vh=BigInt(-62135596800),Mh=BigInt(253402300799),Uh=BigInt(1e3),Fh=BigInt(1e6),Bh=Vh*Uh,qh=Mh*Uh+BigInt(999),jh=Vh*Fh,zh=Mh*Fh+BigInt(999999);function $h(e){return e>=jh&&e<=zh}function Kh(e){return e>=Vh&&e<=Mh}function Gh(e,t){const n=BigInt(e);return!(n<Vh||n>Mh||t<0||t>=1e9||n===Vh&&0!==t||n===Mh&&t>999999999)}function Hh(e,t){return t<0?{seconds:e-1,nanos:t+1e9}:{seconds:e,nanos:t}}function Wh(e){return BigInt(e.seconds)*Fh+BigInt(Math.trunc(e.nanoseconds/1e3))}class Qh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,49262,`${this.expr.name}() function should have exactly one parameter`);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return this.toTimestamp(BigInt(n.value.integerValue));case"NULL":return bl.Dr();default:return bl.vr()}}}class Jh extends Qh{toTimestamp(e){if(!$h(e))return bl.vr();let t=Number(e/Fh),n=Number(e%Fh*BigInt(1e3));const r=Hh(t,n);return t=r.seconds,n=r.nanos,Gh(t,n)?bl.newValue({timestampValue:{seconds:t,nanos:n}}):bl.vr()}}class Yh extends Qh{toTimestamp(e){if(!function(e){return e>=Bh&&e<=qh}(e))return bl.vr();let t=Number(e/Uh),n=Number(e%Uh*BigInt(1e6));const r=Hh(t,n);return t=r.seconds,n=r.nanos,Gh(t,n)?bl.newValue({timestampValue:{seconds:t,nanos:n}}):bl.vr()}}class Xh extends Qh{toTimestamp(e){if(!Kh(e))return bl.vr();const t=Number(e);return bl.newValue({timestampValue:{seconds:t,nanos:0}})}}class Zh{constructor(e){this.expr=e}evaluate(e,t){pt(1===this.expr.params.length,1265,`${this.expr.name}() function should have exactly one parameter`);const n=El(this.expr.params[0]).evaluate(e,t);switch(n.type){case"TIMESTAMP":break;case"NULL":return bl.Dr();default:return bl.vr()}const r=Na(n.value.timestampValue);return Gh(r.seconds,r.nanoseconds)?this.$r(r):bl.vr()}}class ed extends Zh{$r(e){const t=Wh(e);return $h(t)?bl.newValue({integerValue:`${t.toString()}`}):bl.vr()}}class td extends Zh{$r(e){const t=Wh(e),n=t/BigInt(1e3),r=t%BigInt(1e3);return n>BigInt(0)||r===BigInt(0)?bl.newValue({integerValue:n.toString()}):bl.newValue({integerValue:(n-BigInt(1)).toString()})}}class nd extends Zh{$r(e){const t=BigInt(e.seconds);return Kh(t)?bl.newValue({integerValue:t.toString()}):bl.vr()}}class rd{constructor(e){this.expr=e}evaluate(e,t){pt(3===this.expr.params.length,2775,`${this.expr.name}() function should have exactly 3 parameters`);let n=!1;const r=El(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":n=!0;break;default:return bl.vr()}const s=El(this.expr.params[1]).evaluate(e,t);let i;switch(s.type){case"STRING":if(i=function(e){switch(e){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(s.value.stringValue),void 0===i)return bl.vr();break;case"NULL":n=!0;break;default:return bl.vr()}const o=El(this.expr.params[2]).evaluate(e,t);switch(o.type){case"INT":break;case"NULL":n=!0;break;default:return bl.vr()}if(n)return bl.Dr();const a=BigInt(o.value.integerValue);let c;try{switch(i){case"microsecond":c=a;break;case"millisecond":c=a*BigInt(1e3);break;case"second":c=a*BigInt(1e6);break;case"minute":c=a*BigInt(6e7);break;case"hour":c=a*BigInt(36e8);break;case"day":c=a*BigInt(864e8);break;default:return bl.vr()}if("microsecond"!==i&&a!==BigInt(0)&&c/a!==BigInt(this.Kr(i)))return bl.vr()}catch(e){return lt(`Error during timestamp arithmetic: ${e}`),bl.vr()}const u=Na(r.value.timestampValue);if(!Gh(u.seconds,u.nanoseconds))return bl.vr();const l=Wh(u),h=this.Wr(l,c);if(!$h(h))return bl.vr();const d=Number(h/Fh),f=h%Fh,p=Number((f<0?f+Fh:f)*BigInt(1e3)),m=f<0?d-1:d;return Gh(m,p)?bl.newValue({timestampValue:{seconds:m,nanos:p}}):bl.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class sd extends rd{Wr(e,t){return e+t}}class id extends rd{Wr(e,t){return e-t}}function od(e){if((e=Tl(e))instanceof ju)return`fld(${e.fieldName})`;if(e instanceof $u)return`cst(${function(e){return null===e?"null":"number"==typeof e?e.toString():"string"==typeof e?`"${e}"`:e instanceof Jc?`ref(${e.path})`:e instanceof tu?`vec(${JSON.stringify(e)})`:JSON.stringify(e)}(e.value)})`;if(e instanceof Hu)return`fn(${e.name},[${e.params.map(od).join(",")}])`;if("ListOfExpressions"===e.expressionType)return`list([${e.Rr.map(od).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(e,null,2)}`)}function ad(e){return`${Array.from(e.entries()).sort().map(([e,t])=>`${e}=${od(t)}`).join(",")}`}function cd(e){return e.stages.map(e=>function(e){if(e instanceof el)return`${e._name}(${ad(e.fields)})`;if(e instanceof tl){let t=`${e._name}(${ad(e.accumulators)})`;return e.groups.size>0&&(t+=`grouping(${ad(e.groups)})`),t}if(e instanceof nl)return`${e._name}(${ad(e.groups)})`;if(e instanceof rl)return`${e._name}(${e.Vr})`;if(e instanceof sl)return`${e._name}(${e.collectionId})`;if(e instanceof il)return`${e._name}()`;if(e instanceof ol)return`${e._name}(${e.dr.sort()})`;if(e instanceof al)return`${e._name}(${od(e.condition)})`;if(e instanceof cl)return`${e._name}(${e.limit})`;if(e instanceof hl)return`${e._name}(${function(e){return e.map(e=>`${od(e.expr)}${e.direction}`).join(",")}(e.orderings)})`;throw new Error(`Unrecognized stage ${e._name}`)}(e)).join("|")}function ud(e,t){return cd(e)===cd(t)}function ld(e){return e instanceof pl}function hd(e){return ld(e)?cd(e):Lo(e)}function dd(e){return ld(e)?cd(e):function(e){return`${go(Co(e))}|lt:${e.limitType}`}(e)}function fd(e,t){return e instanceof pl&&t instanceof pl?ud(e,t):!(e instanceof pl&&!(t instanceof pl)||!(e instanceof pl)&&t instanceof pl)&&Oo(e,t)}function pd(e){return wo(e)?cd(e):go(e)}function md(e,t){return e instanceof pl&&t instanceof pl?ud(e,t):!(e instanceof pl&&!(t instanceof pl)||!(e instanceof pl)&&t instanceof pl)&&yo(e,t)}
/**
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
 */
class gd{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&ki(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Di(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Di(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Yo();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=t.has(r.key)?null:o;const a=Ci(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(tn.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ta())}isEqual(e){return this.batchId===e.batchId&&Ot(this.mutations,e.mutations,(e,t)=>Pi(e,t))&&Ot(this.baseMutations,e.baseMutations,(e,t)=>Pi(e,t))}}class yd{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){pt(e.mutations.length===n.length,58842,{Qr:e.mutations.length,Gr:n.length});let r=Zo;const s=e.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new yd(e,t,n,r)}}
/**
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
 */class wd{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
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
 */class vd{constructor(e,t,n,r,s=tn.min(),i=tn.min(),o=cs.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new vd(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new vd(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new vd(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new vd(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
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
 */class _d{constructor(e){this.zr=e}}function bd(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:Id(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=function(e,t){return{name:Oa(e,t.key),fields:t.data.value.mapValue.fields,updateTime:xa(e,t.version.toTimestamp()),createTime:xa(e,t.createTime.toTimestamp())}}(e.zr,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Td(t.version)};else{if(!t.isUnknownDocument())return dt(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:Td(t.version)}}return r}function Id(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function Td(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Ed(e){const t=new en(e.seconds,e.nanoseconds);return tn.fromTimestamp(t)}function Sd(e,t){const n=(t.baseMutations||[]).map(t=>za(e.zr,t));for(let i=0;i<t.mutations.length-1;++i){const e=t.mutations[i];if(i+1<t.mutations.length&&void 0!==t.mutations[i+1].transform){const n=t.mutations[i+1];e.updateTransforms=n.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const r=t.mutations.map(t=>za(e.zr,t)),s=en.fromMillis(t.localWriteTimeMs);return new gd(t.batchId,s,n,r)}function xd(e,t){const n=Ed(t.readTime),r=void 0!==t.lastLimboFreeSnapshotVersion?Ed(t.lastLimboFreeSnapshotVersion):tn.min();let s;return s=function(e){return void 0!==e.structuredPipeline}(t.query)?function(e,t){const n=e.structuredPipeline;pt((n?.pipeline?.stages??[]).length>0,1845);const r=n?.pipeline?.stages.map(Rd);return new pl(t,r)}(t.query,e.zr):function(e){return void 0!==e.documents}(t.query)?function(e){const t=e.documents.length;return pt(1===t,1966,{count:t}),Co(So(Ma(e.documents[0])))}(t.query):function(e){return Co(Ha(e))}(t.query),new vd(s,t.targetId,"TargetPurposeListen",t.lastListenSequenceNumber,n,r,cs.fromBase64String(t.resumeToken))}function Nd(e,t){const n=Td(t.snapshotVersion),r=Td(t.lastLimboFreeSnapshotVersion);let s;s=wo(t.target)?Wa(e.zr,t.target):vo(t.target)?$a(e.zr,t.target):Ka(e.zr,t.target).yt;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:pd(t.target),readTime:n,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function Ad(e){const t=Ha({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Po(t,t.limit,"L"):t}function Cd(e,t){return new wd(t.largestBatchId,za(e.zr,t.overlayMutation))}function kd(e,t){const n=t.path.lastSegment();return[e,Fn(t.path.popLast()),n]}function Dd(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:Td(r.readTime),documentKey:Fn(r.documentKey.path),largestBatchId:r.largestBatchId}}function Rd(e){switch(e.name){case"collection":return new rl(e.args[0].referenceValue,{});case"collection_group":return new sl(e.args[1].stringValue,{});case"database":return new il({});case"documents":return new ol(e.args.map(e=>e.referenceValue),{});case"where":return new al(Pd(e.args[0]),{});case"limit":{const t=e.args[0].integerValue??e.args[0].doubleValue;return new cl("number"==typeof t?t:Number(t),{})}case"sort":return new hl(e.args.map(e=>function(e){const t=e.mapValue?.fields;return new Xu(Pd(t.expression),t.direction?.stringValue,"orderingFromProto")}
/**
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
 */(e)),{});default:throw new Error(`Stage type: ${e.name} not supported.`)}}function Pd(e){return e.fieldReferenceValue?new ju(Su("_exprFromProto",e.fieldReferenceValue),"_exprFromProto"):e.functionValue?function(e){return new Hu(e.functionValue.name,e.functionValue.args?.map(Pd)||[])}(e):$u._fromProto(e)}class Od{getBundleMetadata(e,t){return Ld(e).get(t).next(e=>{if(e)return function(e){return{id:e.bundleId,createTime:Ed(e.createTime),version:e.version}}(e)})}saveBundleMetadata(e,t){return Ld(e).put(function(e){return{bundleId:e.id,createTime:Td(ka(e.createTime)),version:e.version}}(t))}getNamedQuery(e,t){return Vd(e).get(t).next(e=>{if(e)return function(e){return{name:e.name,query:Ad(e.bundledQuery),readTime:Ed(e.readTime)}}(e)})}saveNamedQuery(e,t){return Vd(e).put(function(e){return{name:e.name,readTime:Td(ka(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function Ld(e){return Qr(e,br)}function Vd(e){return Qr(e,Ir)}
/**
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
 */class Md{constructor(e,t){this.serializer=e,this.userId=t}static jr(e,t){const n=t.uid||"";return new Md(e,n)}getOverlay(e,t){return Ud(e).get(kd(this.userId,t)).next(e=>e?Cd(this.serializer,e):null)}getOverlays(e,t){const n=Jo();return wn.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}getAllOverlays(e,t){const n=Jo();return Ud(e).ee((e,r)=>{const s=Cd(this.serializer,r);s.largestBatchId>t&&n.set(s.getKey(),s)}).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,s)=>{const i=new wd(t,s);r.push(this.Hr(e,i))}),wn.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(Fn(e.getCollectionPath())));const s=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);s.push(Ud(e).Z(Lr,r))}),wn.waitFor(s)}getOverlaysForCollection(e,t,n){const r=Jo(),s=Fn(t),i=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ud(e).H(Lr,i).next(e=>{for(const t of e){const e=Cd(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const s=Jo();let i;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ud(e).ee({index:Mr,range:o},(e,t,n)=>{const o=Cd(this.serializer,t);s.size()<r||o.largestBatchId===i?(s.set(o.getKey(),o),i=o.largestBatchId):n.done()}).next(()=>s)}Hr(e,t){return Ud(e).put(function(e,t,n){const[r,s,i]=kd(t,n.mutation.key);return{userId:t,collectionPath:s,documentId:i,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:ja(e.zr,n.mutation)}}(this.serializer,this.userId,t))}}function Ud(e){return Qr(e,Pr)}
/**
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
 */class Fd{Jr(e){return Qr(e,Fr)}getSessionToken(e){return this.Jr(e).get("sessionToken").next(e=>{const t=e?.value;return t?cs.fromUint8Array(t):cs.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Jr(e).put({name:"sessionToken",value:t.toUint8Array()})}}
/**
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
 */class Bd{constructor(){}Yr(e,t){this.Zr(e,t),t.Xr()}Zr(e,t){if("nullValue"in e)this.ei(t,5);else if("booleanValue"in e)this.ei(t,10),t.ti(e.booleanValue?1:0);else if("integerValue"in e)this.ei(t,15),t.ti(hs(e.integerValue));else if("doubleValue"in e){const n=hs(e.doubleValue);isNaN(n)?this.ei(t,13):(this.ei(t,15),Vn(n)?t.ti(0):t.ti(n))}else if("timestampValue"in e){let n=e.timestampValue;this.ei(t,20),"string"==typeof n&&(n=ls(n)),t.ni(`${n.seconds||""}`),t.ti(n.nanos||0)}else if("stringValue"in e)this.ri(e.stringValue,t),this.ii(t);else if("bytesValue"in e)this.ei(t,30),t.si(ds(e.bytesValue)),this.ii(t);else if("referenceValue"in e)this._i(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.ei(t,45),t.ti(n.latitude||0),t.ti(n.longitude||0)}else"mapValue"in e?Ys(e)?this.ei(t,Number.MAX_SAFE_INTEGER):Ws(e)?this.oi(e.mapValue,t):(this.ai(e.mapValue,t),this.ii(t)):"arrayValue"in e?(this.ui(e.arrayValue,t),this.ii(t)):dt(19022,{ci:e})}ri(e,t){this.ei(t,25),this.li(e,t)}li(e,t){t.ni(e)}ai(e,t){const n=e.fields||{};this.ei(t,55);for(const r of Object.keys(n))this.ri(r,t),this.Zr(n[r],t)}oi(e,t){const n=e.fields||{};this.ei(t,53);const r=Ns,s=n[r].arrayValue?.values?.length||0;this.ei(t,15),t.ti(hs(s)),this.ri(r,t),this.Zr(n[r],t)}ui(e,t){const n=e.values||[];this.ei(t,50);for(const r of n)this.Zr(r,t)}_i(e,t){this.ei(t,37),qt.fromName(e).path.forEach(e=>{this.ei(t,60),this.li(e,t)})}ei(e,t){e.ti(t)}ii(e){e.ti(2)}}Bd.Ei=new Bd;
/**
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
 */
const qd=255;function jd(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function zd(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=jd(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}class $d{constructor(){this.buffer=new Uint8Array(1024),this.position=0}hi(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ti(n.value),n=t.next();this.Pi()}Ri(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ii(n.value),n=t.next();this.Ai()}Vi(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Ti(e);else if(e<2048)this.Ti(960|e>>>6),this.Ti(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ti(480|e>>>12),this.Ti(128|63&e>>>6),this.Ti(128|63&e);else{const e=t.codePointAt(0);this.Ti(240|e>>>18),this.Ti(128|63&e>>>12),this.Ti(128|63&e>>>6),this.Ti(128|63&e)}}this.Pi()}di(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Ii(e);else if(e<2048)this.Ii(960|e>>>6),this.Ii(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ii(480|e>>>12),this.Ii(128|63&e>>>6),this.Ii(128|63&e);else{const e=t.codePointAt(0);this.Ii(240|e>>>18),this.Ii(128|63&e>>>12),this.Ii(128|63&e>>>6),this.Ii(128|63&e)}}this.Ai()}fi(e){const t=this.mi(e),n=zd(t);this.pi(1+n),this.buffer[this.position++]=255&n;for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=255&t[r]}gi(e){const t=this.mi(e),n=zd(t);this.pi(1+n),this.buffer[this.position++]=~(255&n);for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=~(255&t[r])}yi(){this.wi(qd),this.wi(255)}bi(){this.Si(qd),this.Si(255)}reset(){this.position=0}seed(e){this.pi(e.length),this.buffer.set(e,this.position),this.position+=e.length}Di(){return this.buffer.slice(0,this.position)}mi(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let r=1;r<t.length;++r)t[r]^=n?255:0;return t}Ti(e){const t=255&e;0===t?(this.wi(0),this.wi(255)):t===qd?(this.wi(qd),this.wi(0)):this.wi(t)}Ii(e){const t=255&e;0===t?(this.Si(0),this.Si(255)):t===qd?(this.Si(qd),this.Si(0)):this.Si(e)}Pi(){this.wi(0),this.wi(1)}Ai(){this.Si(0),this.Si(1)}wi(e){this.pi(1),this.buffer[this.position++]=e}Si(e){this.pi(1),this.buffer[this.position++]=~e}pi(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class Kd{constructor(e){this.xi=e}si(e){this.xi.hi(e)}ni(e){this.xi.Vi(e)}ti(e){this.xi.fi(e)}Xr(){this.xi.yi()}}class Gd{constructor(e){this.xi=e}si(e){this.xi.Ri(e)}ni(e){this.xi.di(e)}ti(e){this.xi.gi(e)}Xr(){this.xi.bi()}}class Hd{constructor(){this.xi=new $d,this.ascending=new Kd(this.xi),this.descending=new Gd(this.xi)}seed(e){this.xi.seed(e)}Ci(e){return 0===e?this.ascending:this.descending}Di(){return this.xi.Di()}reset(){this.xi.reset()}}
/**
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
 */class Wd{constructor(e,t,n,r){this.Fi=e,this.Oi=t,this.Mi=n,this.Ni=r}Li(){const e=this.Ni.length,t=0===e||255===this.Ni[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.Ni,0),t!==e?n.set([0],this.Ni.length):++n[n.length-1],new Wd(this.Fi,this.Oi,this.Mi,n)}Bi(e,t,n){return{indexId:this.Fi,uid:e,arrayValue:Yd(this.Mi),directionalValue:Yd(this.Ni),orderedDocumentKey:Yd(t),documentKey:n.path.toArray()}}Ui(e,t,n){const r=this.Bi(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function Qd(e,t){let n=e.Fi-t.Fi;return 0!==n?n:(n=Jd(e.Mi,t.Mi),0!==n?n:(n=Jd(e.Ni,t.Ni),0!==n?n:qt.comparator(e.Oi,t.Oi)))}function Jd(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function Yd(e){return v()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function Xd(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
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
 */(e)}class Zd{constructor(e){this.ki=new Zr((e,t)=>Bt.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.qi=e.orderBy,this.$i=[];for(const t of e.filters){const e=t;e.isInequality()?this.ki=this.ki.add(e):this.$i.push(e)}}get Ki(){return this.ki.size>1}Wi(e){if(pt(e.collectionGroup===this.collectionId,49279),this.Ki)return!1;const t=sn(e);if(void 0!==t&&!this.Qi(t))return!1;const n=on(e);let r=new Set,s=0,i=0;for(;s<n.length&&this.Qi(n[s]);++s)r=r.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.ki.size>0){const e=this.ki.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[s];if(!this.Gi(e,t)||!this.zi(this.qi[i++],t))return!1}++s}for(;s<n.length;++s){const e=n[s];if(i>=this.qi.length||!this.zi(this.qi[i++],e))return!1}return!0}ji(){if(this.Ki)return null;let e=new Zr(Bt.comparator);const t=[];for(const n of this.$i)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new cn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new cn(n.field,0))}for(const n of this.qi)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new cn(n.field,"asc"===n.dir?0:1)));return new rn(rn.UNKNOWN_ID,this.collectionId,t,ln.empty())}Qi(e){for(const t of this.$i)if(this.Gi(t,e))return!0;return!1}Gi(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}zi(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
/**
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
 */function ef(e){if(pt(e instanceof Gi||e instanceof Hi,20012),e instanceof Gi){if(e instanceof ao){const t=e.value.arrayValue?.values?.map(t=>Gi.create(e.field,"==",t))||[];return Hi.create(t,"or")}return e}const t=e.filters.map(e=>ef(e));return Hi.create(t,e.op)}function tf(e){if(0===e.getFilters().length)return[];const t=of(ef(e));return pt(sf(t),7391),nf(t)||rf(t)?[t]:t.getFilters()}function nf(e){return e instanceof Gi}function rf(e){return e instanceof Hi&&Ji(e)}function sf(e){return nf(e)||rf(e)||function(e){if(e instanceof Hi&&Qi(e)){for(const t of e.getFilters())if(!nf(t)&&!rf(t))return!1;return!0}return!1}(e)}function of(e){if(pt(e instanceof Gi||e instanceof Hi,34018),e instanceof Gi)return e;if(1===e.filters.length)return of(e.filters[0]);const t=e.filters.map(e=>of(e));let n=Hi.create(t,e.op);return n=uf(n),sf(n)?n:(pt(n instanceof Hi,64498),pt(Wi(n),40251),pt(n.filters.length>1,57927),n.filters.reduce((e,t)=>af(e,t)))}function af(e,t){let n;return pt(e instanceof Gi||e instanceof Hi,38388),pt(t instanceof Gi||t instanceof Hi,25473),n=e instanceof Gi?t instanceof Gi?function(e,t){return Hi.create([e,t],"and")}(e,t):cf(e,t):t instanceof Gi?cf(t,e):function(e,t){if(pt(e.filters.length>0&&t.filters.length>0,48005),Wi(e)&&Wi(t))return eo(e,t.getFilters());const n=Qi(e)?e:t,r=Qi(e)?t:e,s=n.filters.map(e=>af(e,r));return Hi.create(s,"or")}(e,t),uf(n)}function cf(e,t){if(Wi(t))return eo(t,e.getFilters());{const n=t.filters.map(t=>af(e,t));return Hi.create(n,"or")}}function uf(e){if(pt(e instanceof Gi||e instanceof Hi,11850),e instanceof Gi)return e;const t=e.getFilters();if(1===t.length)return uf(t[0]);if(Yi(e))return e;const n=t.map(e=>uf(e)),r=[];return n.forEach(t=>{t instanceof Gi?r.push(t):t instanceof Hi&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:Hi.create(r,e.op)
/**
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
 */}class lf{constructor(){this.Hi=new hf}addToCollectionParentIndex(e,t){return this.Hi.add(t),wn.resolve()}getCollectionParents(e,t){return wn.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return wn.resolve()}deleteFieldIndex(e,t){return wn.resolve()}deleteAllFieldIndexes(e){return wn.resolve()}createTargetIndexes(e,t){return wn.resolve()}getDocumentsMatchingTarget(e,t){return wn.resolve(null)}getIndexType(e,t){return wn.resolve(0)}getFieldIndexes(e,t){return wn.resolve([])}getNextCollectionGroupToUpdate(e){return wn.resolve(null)}getMinOffset(e,t){return wn.resolve(fn.min())}getMinOffsetFromCollectionGroup(e,t){return wn.resolve(fn.min())}updateCollectionGroup(e,t,n){return wn.resolve()}updateIndexEntries(e,t){return wn.resolve()}}class hf{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Zr(Ut.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Zr(Ut.comparator)).toArray()}}
/**
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
 */const df="IndexedDbIndexManager",ff=new Uint8Array(0);class pf{constructor(e,t){this.databaseId=t,this.Ji=new hf,this.Yi=new $o(e=>go(e),(e,t)=>yo(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Ji.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Ji.add(t)});const s={collectionId:n,parent:Fn(r)};return mf(e).put(s)}return wn.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[Lt(t),""],!1,!0);return mf(e).H(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(jn(r.parent))}return n})}addFieldIndex(e,t){const n=yf(e),r=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete r.indexId;const s=n.add(r);if(t.indexState){const n=wf(e);return s.next(e=>{n.put(Dd(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=yf(e),r=wf(e),s=gf(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=yf(e),n=gf(e),r=wf(e);return t.Z().next(()=>n.Z()).next(()=>r.Z())}createTargetIndexes(e,t){return wn.forEach(this.Zi(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new Zd(t).ji();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=gf(e);let r=!0;const s=new Map;return wn.forEach(this.Zi(t),t=>this.Xi(e,t).next(e=>{r&&(r=!!e),s.set(t,e)})).next(()=>{if(r){let e=ta();const r=[];return wn.forEach(s,(s,i)=>{ct(df,`Using index ${function(e){return`id=${e.indexId}|cg=${e.collectionGroup}|f=${e.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`}(s)} to execute ${go(t)}`);const o=function(e,t){const n=sn(t);if(void 0===n)return null;for(const r of _o(e,n.fieldPath))switch(r.op){case"array-contains-any":return r.value.arrayValue.values||[];case"array-contains":return[r.value]}return null}(i,s),a=function(e,t){const n=new Map;for(const r of on(t))for(const t of _o(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(i,s),c=function(e,t){const n=[];let r=!0;for(const s of on(t)){const t=0===s.kind?bo(e,s.fieldPath,e.startAt):Io(e,s.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new ji(n,r)}(i,s),u=function(e,t){const n=[];let r=!0;for(const s of on(t)){const t=0===s.kind?Io(e,s.fieldPath,e.endAt):bo(e,s.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new ji(n,r)}(i,s),l=this.es(s,i,c),h=this.es(s,i,u),d=this.ts(s,i,a),f=this.ns(s.indexId,o,l,c.inclusive,h,u.inclusive,d);return wn.forEach(f,s=>n.Y(s,t.limit).next(t=>{t.forEach(t=>{const n=qt.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return wn.resolve(null)})}Zi(e){let t=this.Yi.get(e);return t||(t=0===e.filters.length?[e]:tf(Hi.create(e.filters,"and")).map(t=>mo(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Yi.set(e,t),t)}ns(e,t,n,r,s,i,o){const a=(null!=t?t.length:1)*Math.max(n.length,s.length),c=a/(null!=t?t.length:1),u=[];for(let l=0;l<a;++l){const a=t?this.rs(t[l/c]):ff,h=this.ss(e,a,n[l%c],r),d=this._s(e,a,s[l%c],i),f=o.map(t=>this.ss(e,a,t,!0));u.push(...this.createRange(h,d,f))}return u}ss(e,t,n,r){const s=new Wd(e,qt.empty(),t,n);return r?s:s.Li()}_s(e,t,n,r){const s=new Wd(e,qt.empty(),t,n);return r?s.Li():s}Xi(e,t){const n=new Zd(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.Wi(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.Zi(t);return wn.forEach(r,t=>this.Xi(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new Zr(Bt.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const r of e.orderBy)r.field.isKeyField()||(t=t.add(r.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>function(e){return null!==e.limit}(t)&&r.length>1&&2===n?1:n)}us(e,t){const n=new Hd;for(const r of on(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const s=n.Ci(r.kind);Bd.Ei.Yr(e,s)}return n.Di()}rs(e){const t=new Hd;return Bd.Ei.Yr(e,t.Ci(0)),t.Di()}cs(e,t){const n=new Hd;return Bd.Ei.Yr(Bs(this.databaseId,t),n.Ci(function(e){const t=on(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.Di()}ts(e,t,n){if(null===n)return[];let r=[];r.push(new Hd);let s=0;for(const i of on(e)){const e=n[s++];for(const n of r)if(this.ls(t,i.fieldPath)&&$s(e))r=this.Es(r,i,e);else{const t=n.Ci(i.kind);Bd.Ei.Yr(e,t)}}return this.hs(r)}es(e,t,n){return this.ts(e,t,n.position)}hs(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].Di();return t}Es(e,t,n){const r=[...e],s=[];for(const i of n.arrayValue.values||[])for(const e of r){const n=new Hd;n.seed(e.Di()),Bd.Ei.Yr(i,n.Ci(t.kind)),s.push(n)}return s}ls(e,t){return!!e.filters.find(e=>e instanceof Gi&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=yf(e),r=wf(e);return(t?n.H(Er,IDBKeyRange.bound(t,t)):n.H()).next(e=>{const t=[];return wn.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new ln(t.sequenceNumber,new fn(Ed(t.readTime),new qt(jn(t.documentKey)),t.largestBatchId)):ln.empty(),r=e.fields.map(([e,t])=>new cn(Bt.fromServerFormat(e),t));return new rn(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:Ct(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=yf(e),s=wf(e);return this.Ts(e).next(e=>r.H(Er,IDBKeyRange.bound(t,t)).next(t=>wn.forEach(t,t=>s.put(Dd(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return wn.forEach(t,(t,r)=>{const s=n.get(t.collectionGroup);return(s?wn.resolve(s):this.getFieldIndexes(e,t.collectionGroup)).next(s=>(n.set(t.collectionGroup,s),wn.forEach(s,n=>this.Ps(e,t,n).next(t=>{const s=this.Rs(r,n);return t.isEqual(s)?wn.resolve():this.Is(e,r,n,t,s)}))))})}As(e,t,n,r){return gf(e).put(r.Bi(this.uid,this.cs(n,t.key),t.key))}Vs(e,t,n,r){return gf(e).delete(r.Ui(this.uid,this.cs(n,t.key),t.key))}Ps(e,t,n){const r=gf(e);let s=new Zr(Qd);return r.ee({index:Dr,range:IDBKeyRange.only([n.indexId,this.uid,Yd(this.cs(n,t))])},(e,r)=>{s=s.add(new Wd(n.indexId,t,Xd(r.arrayValue),Xd(r.directionalValue)))}).next(()=>s)}Rs(e,t){let n=new Zr(Qd);const r=this.us(t,e);if(null==r)return n;const s=sn(t);if(null!=s){const i=e.data.field(s.fieldPath);if($s(i))for(const s of i.arrayValue.values||[])n=n.add(new Wd(t.indexId,e.key,this.rs(s),r))}else n=n.add(new Wd(t.indexId,e.key,ff,r));return n}Is(e,t,n,r,s){ct(df,"Updating index entries for document '%s'",t.key);const i=[];return function(e,t,n,r,s){const i=e.getIterator(),o=t.getIterator();let a=ts(i),c=ts(o);for(;a||c;){let e=!1,t=!1;if(a&&c){const r=n(a,c);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(c),c=ts(o)):t?(s(a),a=ts(i)):(a=ts(i),c=ts(o))}}(r,s,Qd,r=>{i.push(this.As(e,t,n,r))},r=>{i.push(this.Vs(e,t,n,r))}),wn.waitFor(i)}Ts(e){let t=1;return wf(e).ee({index:Nr,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>Qd(e,t)).filter((e,t,n)=>!t||0!==Qd(e,n[t-1]));const r=[];r.push(e);for(const i of n){const n=Qd(i,e),s=Qd(i,t);if(0===n)r[0]=e.Li();else if(n>0&&s<0)r.push(i),r.push(i.Li());else if(s>0)break}r.push(t);const s=[];for(let i=0;i<r.length;i+=2){if(this.ds(r[i],r[i+1]))return[];const e=r[i].Ui(this.uid,ff,qt.empty()),t=r[i+1].Ui(this.uid,ff,qt.empty());s.push(IDBKeyRange.bound(e,t))}return s}ds(e,t){return Qd(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(vf)}getMinOffset(e,t){return wn.mapArray(this.Zi(t),t=>this.Xi(e,t).next(e=>e||dt(44426))).next(vf)}}function mf(e){return Qr(e,wr)}function gf(e){return Qr(e,Cr)}function yf(e){return Qr(e,Tr)}function wf(e){return Qr(e,Sr)}function vf(e){pt(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const s=e[r].indexState.offset;pn(s,t)<0&&(t=s),n<s.largestBatchId&&(n=s.largestBatchId)}return new fn(t.readTime,t.documentKey,n)}
/**
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
 */function _f(e,t,n){const r=e.store(Hn),s=e.store(er),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.ee({range:o},(e,t,n)=>(a++,n.delete()));i.push(c.next(()=>{pt(1===a,47070,{batchId:n.batchId})}));const u=[];for(const l of n.mutations){const e=Xn(t,l.key.path,n.batchId);i.push(s.delete(e)),u.push(l.key)}return wn.waitFor(i).next(()=>u)}function bf(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw dt(14731);t=e.noDocument}return JSON.stringify(t).length}
/**
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
 */class If{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.fs={}}static jr(e,t,n,r){pt(""!==e.uid,64387);const s=e.isAuthenticated()?e.uid:"";return new If(s,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ef(e).ee({index:Qn,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const s=Sf(e),i=Ef(e);return i.add({}).next(o=>{pt("number"==typeof o,49019);const a=new gd(o,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>ja(e.zr,t)),s=n.mutations.map(t=>ja(e.zr,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:s}}(this.serializer,this.userId,a),u=[];let l=new Zr((e,t)=>Ct(e.canonicalString(),t.canonicalString()));for(const e of r){const t=Xn(this.userId,e.key.path,o);l=l.add(e.key.path.popLast()),u.push(i.put(c)),u.push(s.put(t,Zn))}return l.forEach(t=>{u.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.fs[o]=a.keys()}),wn.waitFor(u).next(()=>a)})}lookupMutationBatch(e,t){return Ef(e).get(t).next(e=>e?(pt(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),Sd(this.serializer,e)):null)}ps(e,t){return this.fs[t]?wn.resolve(this.fs[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.fs[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return Ef(e).ee({index:Qn,range:r},(e,t,r)=>{t.userId===this.userId&&(pt(t.batchId>=n,47524,{gs:n}),s=Sd(this.serializer,t)),r.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=On;return Ef(e).ee({index:Qn,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,On],[this.userId,Number.POSITIVE_INFINITY]);return Ef(e).H(Qn,t).next(e=>e.map(e=>Sd(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Yn(this.userId,t.path),r=IDBKeyRange.lowerBound(n),s=[];return Sf(e).ee({range:r},(n,r,i)=>{const[o,a,c]=n,u=jn(a);if(o===this.userId&&t.path.isEqual(u))return Ef(e).get(c).next(e=>{if(!e)throw dt(61480,{ys:n,batchId:c});pt(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:c}),s.push(Sd(this.serializer,e))});i.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Zr(Ct);const r=[];return t.forEach(t=>{const s=Yn(this.userId,t.path),i=IDBKeyRange.lowerBound(s),o=Sf(e).ee({range:i},(e,r,s)=>{const[i,o,a]=e,c=jn(o);i===this.userId&&t.path.isEqual(c)?n=n.add(a):s.done()});r.push(o)}),wn.waitFor(r).next(()=>this.ws(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,s=Yn(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new Zr(Ct);return Sf(e).ee({range:i},(e,t,s)=>{const[i,a,c]=e,u=jn(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()}).next(()=>this.ws(e,o))}ws(e,t){const n=[],r=[];return t.forEach(t=>{r.push(Ef(e).get(t).next(e=>{if(null===e)throw dt(35274,{batchId:t});pt(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(Sd(this.serializer,e))}))}),wn.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return _f(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.bs(t.batchId)}),wn.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}bs(e){delete this.fs[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return wn.resolve();const n=IDBKeyRange.lowerBound(function(e){return[e]}(this.userId)),r=[];return Sf(e).ee({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=jn(e[1]);r.push(t)}else n.done()}).next(()=>{pt(0===r.length,56720,{vs:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return Tf(e,this.userId,t)}Ss(e){return xf(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:On,lastStreamToken:""})}}function Tf(e,t,n){const r=Yn(t,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Sf(e).ee({range:i,X:!0},(e,n,r)=>{const[i,a,c]=e;i===t&&a===s&&(o=!0),r.done()}).next(()=>o)}function Ef(e){return Qr(e,Hn)}function Sf(e){return Qr(e,er)}function xf(e){return Qr(e,Gn)}
/**
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
 */class Nf{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new Nf(0)}static Cs(){return new Nf(-1)}}
/**
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
 */class Af{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Fs(e).next(t=>{const n=new Nf(t.highestTargetId);return t.highestTargetId=n.next(),this.Os(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Fs(e).next(e=>tn.fromTimestamp(new en(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Fs(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.Fs(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.Os(e,r)))}addTargetData(e,t){return this.Ms(e,t).next(()=>this.Fs(e).next(n=>(n.targetCount+=1,this.Ns(t,n),this.Os(e,n))))}updateTargetData(e,t){return this.Ms(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Cf(e).delete(t.targetId)).next(()=>this.Fs(e)).next(t=>(pt(t.targetCount>0,8065),t.targetCount-=1,this.Os(e,t)))}removeTargets(e,t,n){let r=0;const s=[];return Cf(e).ee((i,o)=>{const a=xd(this.serializer,o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(e,a)))}).next(()=>wn.waitFor(s)).next(()=>r)}forEachTarget(e,t){return Cf(e).ee((e,n)=>{const r=xd(this.serializer,n);t(r)})}Fs(e){return kf(e).get(gr).next(e=>(pt(null!==e,2888),e))}Os(e,t){return kf(e).put(gr,t)}Ms(e,t){return Cf(e).put(Nd(this.serializer,t))}Ns(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.Fs(e).next(e=>e.targetCount)}getTargetData(e,t){const n=pd(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Cf(e).ee({range:r,index:lr},(e,n,r)=>{const i=xd(this.serializer,n);md(t,i.target)&&(s=i,r.done())}).next(()=>s)}addMatchingKeys(e,t,n){const r=[],s=Df(e);return t.forEach(t=>{const i=Fn(t.path);r.push(s.put({targetId:n,path:i})),r.push(this.referenceDelegate.addReference(e,n,t))}),wn.waitFor(r)}removeMatchingKeys(e,t,n){const r=Df(e);return wn.forEach(t,t=>{const s=Fn(t.path);return wn.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=Df(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=Df(e);let s=ta();return r.ee({range:n,X:!0},(e,t,n)=>{const r=jn(e[1]),i=new qt(r);s=s.add(i)}).next(()=>s)}containsKey(e,t){const n=Fn(t.path),r=IDBKeyRange.bound([n],[Lt(n)],!1,!0);let s=0;return Df(e).ee({index:pr,X:!0,range:r},([e,t],n,r)=>{0!==e&&(s++,r.done())}).next(()=>s>0)}dt(e,t){return Cf(e).get(t).next(e=>e?xd(this.serializer,e):null)}}function Cf(e){return Qr(e,ur)}function kf(e){return Qr(e,yr)}function Df(e){return Qr(e,dr)}
/**
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
 */class Rf{constructor(e,t){this.db=e,this.garbageCollector=zc(this,t)}lr(e){const t=this.Ls(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Ls(e){let t=0;return this.Er(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Er(e,t){return this.Bs(e,(e,n)=>t(n))}addReference(e,t,n){return Pf(e,n)}removeReference(e,t,n){return Pf(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Pf(e,t)}Us(e,t){return function(e,t){let n=!1;return xf(e).te(r=>Tf(e,r,t).next(e=>(e&&(n=!0),wn.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.Bs(e,(i,o)=>{if(o<=t){const t=this.Us(e,i).next(t=>{if(!t)return s++,n.getEntry(e,i).next(()=>(n.removeEntry(i,tn.min()),Df(e).delete(function(e){return[0,Fn(e.path)]}(i))))});r.push(t)}}).next(()=>wn.waitFor(r)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Pf(e,t)}Bs(e,t){const n=Df(e);let r,s=Pn.ce;return n.ee({index:pr},([e,n],{path:i,sequenceNumber:o})=>{0===e?(s!==Pn.ce&&t(new qt(jn(r)),s),s=o,r=i):s=Pn.ce}).next(()=>{s!==Pn.ce&&t(new qt(jn(r)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Pf(e,t){return Df(e).put(function(e,t){return{targetId:0,path:Fn(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
// Copyright 2024 Google LLC* @license
function Of(e,t){let n=t;for(const r of e.stages)n=Mf({serializer:e.serializer,serverTimestampBehavior:e.listenOptions?.serverTimestampBehavior},r,n);return n}function Lf(e,t){return Of(e,[t]).length>0}function Vf(e,t){return ld(e)?Lf(e,t):Vo(e,t)}function Mf(e,t,n){if(t instanceof rl)return function(e,t,n){return n.filter(e=>e.isFoundDocument()&&`/${e.key.getCollectionPath().canonicalString()}`===t.Vr)}(0,t,n);if(t instanceof al)return function(e,t,n){return n.filter(n=>{const r=Il(El(t.condition).evaluate(e,n));return void 0!==r&&Rs(r,Cs)})}(e,t,n);if(t instanceof sl)return function(e,t,n){return n.filter(e=>e.isFoundDocument()&&e.key.getCollectionPath().lastSegment()===t.collectionId)}(0,t,n);if(t instanceof il)return function(e,t,n){return n.filter(e=>e.isFoundDocument())}(0,0,n);if(t instanceof ol)return function(e,t,n){return n.filter(e=>e.isFoundDocument()&&t.mr.has(e.key.path.toStringWithLeadingSlash()))}(0,t,n);if(t instanceof cl)return function(e,t,n){return n.slice(0,t.limit)}(0,t,n);if(t instanceof hl)return function(e,t,n){const r=t.orderings.map(e=>({ks:El(e.expr),direction:e.direction}));return[...n].sort((t,n)=>{for(const{ks:s,direction:i}of r){const r=Il(s.evaluate(e,t)),o=Il(s.evaluate(e,n)),a=Os(r??As,o??As);if(0!==a)return"ascending"===i?a:-a}return 0})}(e,t,n);throw new Error(`Unknown stage: ${t._name}`)}function Uf(e){const t=function(e){for(let t=e.stages.length-1;t>=0;t--){const n=e.stages[t];if(n instanceof hl)return n.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(e);return(n,r)=>{for(const s of t){const t=Il(El(s.expr).evaluate({serializer:e.serializer},n)),i=Il(El(s.expr).evaluate({serializer:e.serializer},r)),o=Os(t||As,i||As);if(0!==o)return"ascending"===s.direction?o:-o}return 0}}function Ff(e){for(let t=e.stages.length-1;t>=0;t--){const n=e.stages[t];if(n instanceof cl)return{limit:n.limit}}}
/**
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
 */class Bf{constructor(){this.changes=new $o(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,fo.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?wn.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
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
 */class qf{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Kf(e).put(n)}removeEntry(e,t,n){return Kf(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],Id(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.qs(e,n)))}getEntry(e,t){let n=fo.newInvalidDocument(t);return Kf(e).ee({index:rr,range:IDBKeyRange.only(Gf(t))},(e,r)=>{n=this.$s(t,r)}).next(()=>n)}Ks(e,t){let n={size:0,document:fo.newInvalidDocument(t)};return Kf(e).ee({index:rr,range:IDBKeyRange.only(Gf(t))},(e,r)=>{n={document:this.$s(t,r),size:bf(r)}}).next(()=>n)}getEntries(e,t){let n=Go();return this.Ws(e,t,(e,t)=>{const r=this.$s(e,t);n=n.insert(e,r)}).next(()=>n)}getAllEntries(e){let t=Go();return Kf(e).ee((e,n)=>{const r=this.$s(qt.fromSegments(n.prefixPath.concat(n.collectionGroup,n.documentId)),n);t=t.insert(r.key,r)}).next(()=>t)}Qs(e,t){let n=Go(),r=new Jr(qt.comparator);return this.Ws(e,t,(e,t)=>{const s=this.$s(e,t);n=n.insert(e,s),r=r.insert(e,bf(t))}).next(()=>({documents:n,Gs:r}))}Ws(e,t,n){if(t.isEmpty())return wn.resolve();let r=new Zr(Wf);t.forEach(e=>r=r.add(e));const s=IDBKeyRange.bound(Gf(r.first()),Gf(r.last())),i=r.getIterator();let o=i.getNext();return Kf(e).ee({index:rr,range:s},(e,t,r)=>{const s=qt.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&Wf(o,s)<0;)n(o,null),o=i.getNext();o&&o.isEqual(s)&&(n(o,t),o=i.hasNext()?i.getNext():null),o?r.j(Gf(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=i.hasNext()?i.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,s){const i=ld(t)?Ut.fromString(gl(t)):t.path,o=[i.popLast().toArray(),i.lastSegment(),Id(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Kf(e).H(IDBKeyRange.bound(o,a,!0)).next(e=>{s?.incrementDocumentReadCount(e.length);let n=Go();for(const s of e){const e=this.$s(qt.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);e.isFoundDocument()&&(Vf(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let s=Go();const i=Hf(t,n),o=Hf(t,fn.max());return Kf(e).ee({index:ir,range:IDBKeyRange.bound(i,o,!0)},(e,t,n)=>{const i=this.$s(qt.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);s=s.insert(i.key,i),s.size===r&&n.done()}).next(()=>s)}newChangeBuffer(e){return new zf(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return $f(e).get(cr).next(e=>(pt(!!e,20021),e))}qs(e,t){return $f(e).put(cr,t)}$s(e,t){if(t){const e=function(e,t){let n;if(t.document)n=qa(e.zr,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=qt.fromSegments(t.noDocument.path),r=Ed(t.noDocument.readTime);n=fo.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return dt(56709);{const e=qt.fromSegments(t.unknownDocument.path),r=Ed(t.unknownDocument.version);n=fo.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new en(e[0],e[1]);return tn.fromTimestamp(t)}(t.readTime)),n}(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(tn.min()))return e}return fo.newInvalidDocument(e)}}function jf(e){return new qf(e)}class zf extends Bf{constructor(e,t){super(),this.zs=e,this.trackRemovals=t,this.js=new $o(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new Zr((e,t)=>Ct(e.canonicalString(),t.canonicalString()));return this.changes.forEach((s,i)=>{const o=this.js.get(s);if(t.push(this.zs.removeEntry(e,s,o.readTime)),i.isValidDocument()){const a=bd(this.zs.serializer,i);r=r.add(s.path.popLast());const c=bf(a);n+=c-o.size,t.push(this.zs.addEntry(e,s,a))}else if(n-=o.size,this.trackRemovals){const n=bd(this.zs.serializer,i.convertToNoDocument(tn.min()));t.push(this.zs.addEntry(e,s,n))}}),r.forEach(n=>{t.push(this.zs.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.zs.updateMetadata(e,n)),wn.waitFor(t)}getFromCache(e,t){return this.zs.Ks(e,t).next(e=>(this.js.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.zs.Qs(e,t).next(({documents:e,Gs:t})=>(t.forEach((t,n)=>{this.js.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function $f(e){return Qr(e,ar)}function Kf(e){return Qr(e,tr)}function Gf(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Hf(e,t){const n=t.documentKey.path.toArray();return[e,Id(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Wf(e,t){const n=e.path.toArray(),r=t.path.toArray();let s=0;for(let i=0;i<n.length-2&&i<r.length-2;++i)if(s=Ct(n[i],r[i]),s)return s;return s=Ct(n.length,r.length),s||(s=Ct(n[n.length-2],r[r.length-2]),s||Ct(n[n.length-1],r[r.length-1])
/**
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
 */
/**
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
 */)}class Qf{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
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
 */class Jf{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Di(n.mutation,e,ns.empty(),en.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,ta()).next(()=>t))}getLocalViewOfDocuments(e,t,n=ta()){const r=Jo();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=Wo();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Jo();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,ta()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=Go();const i=Xo(),o=Xo();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Li)?s=s.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),Di(o.mutation,t,o.mutation.getFieldMask(),en.now())):i.set(t.key,ns.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>o.set(e,new Qf(t,i.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=Xo();let r=new Jr((e,t)=>e-t),s=ta();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let o=n.get(e)||ns.empty();o=s.applyToLocalView(i,o),n.set(e,o);const a=(r.get(s.batchId)||ta()).add(e);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=Yo();c.forEach(e=>{if(!s.has(e)){const r=Ci(t.get(e),n.get(e));null!==r&&u.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,a,u))}return wn.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return ld(t)?this.getDocumentsMatchingPipeline(e,t,n,r):function(e){return qt.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):No(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):wn.resolve(Jo());let o=nn,a=s;return i.next(t=>wn.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(t)?wn.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,ta())).next(e=>({batchId:o,changes:Qo(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new qt(t)).next(e=>{let t=Wo();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=Wo();return this.indexManager.getCollectionParents(e,s).next(o=>wn.forEach(o,o=>{const a=function(e,t){return new To(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(s));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>this.retrieveMatchingLocalDocuments(s,e,e=>Vo(t,e)))}getDocumentsMatchingPipeline(e,t,n,r){if("collection_group"===ml(t)){const s=yl(t);let i=Wo();return this.indexManager.getCollectionParents(e,s).next(o=>wn.forEach(o,o=>{const a=function(e,t){const n=e.stages.map(e=>e instanceof sl?new rl(t.canonicalString(),{}):e);return new pl(e.serializer,n)}(t,o.child(s));return this.getDocumentsMatchingPipeline(e,a,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}{let s;return this.getOverlaysForPipeline(e,t,n.largestBatchId).next(i=>{switch(s=i,ml(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r);case"documents":let i=ta();for(const e of vl(t))i=i.add(qt.fromPath(e));return this.remoteDocumentCache.getEntries(e,i);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new yt("invalid-argument",`Invalid pipeline source to execute offline: ${cd(t)}`)}}).next(e=>this.retrieveMatchingLocalDocuments(s,e,e=>Lf(t,e)))}}retrieveMatchingLocalDocuments(e,t,n){e.forEach((e,n)=>{const r=n.getKey();null===t.get(r)&&(t=t.insert(r,fo.newInvalidDocument(r)))});let r=Wo();return t.forEach((t,s)=>{const i=e.get(t);void 0!==i&&Di(i.mutation,s,ns.empty(),en.now()),n(s)&&(r=r.insert(t,s))}),r}getOverlaysForPipeline(e,t,n){switch(ml(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Ut.fromString(gl(t)),n);case"collection_group":throw new yt("invalid-argument",`Unexpected collection group pipeline: ${cd(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,vl(t).map(e=>qt.fromPath(e)));case"database":return this.documentOverlayCache.getAllOverlays(e,n);default:throw new yt("invalid-argument",`Failed to get overlays for pipeline: ${cd(t)}`)}}}
/**
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
 */class Yf{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return wn.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,function(e){return{id:e.id,version:e.version,createTime:ka(e.createTime)}}(t)),wn.resolve()}getNamedQuery(e,t){return wn.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,function(e){return{name:e.name,query:Ad(e.bundledQuery),readTime:ka(e.readTime)}}(t)),wn.resolve()}}
/**
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
 */class Xf{constructor(){this.overlays=new Jr(qt.comparator),this.Ys=new Map}getOverlay(e,t){return wn.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Jo();return wn.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}getAllOverlays(e,t){const n=Jo();return this.overlays.forEach((e,r)=>{r.largestBatchId>t&&n.set(e,r)}),wn.resolve(n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.Hr(e,t,r)}),wn.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Ys.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Ys.delete(n)),wn.resolve()}getOverlaysForCollection(e,t,n){const r=Jo(),s=t.length+1,i=new qt(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return wn.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new Jr((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=Jo(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Jo(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return wn.resolve(o)}Hr(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Ys.get(r.largestBatchId).delete(n.key);this.Ys.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new wd(t,n));let s=this.Ys.get(t);void 0===s&&(s=ta(),this.Ys.set(t,s)),this.Ys.set(t,s.add(n.key))}}
/**
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
 */class Zf{constructor(){this.sessionToken=cs.EMPTY_BYTE_STRING}getSessionToken(e){return wn.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,wn.resolve()}}
/**
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
 */class ep{constructor(){this.Zs=new Zr(tp.Xs),this.e_=new Zr(tp.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){const n=new tp(e,t);this.Zs=this.Zs.add(n),this.e_=this.e_.add(n)}n_(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.r_(new tp(e,t))}i_(e,t){e.forEach(e=>this.removeReference(e,t))}s_(e){const t=new qt(new Ut([])),n=new tp(t,e),r=new tp(t,e+1),s=[];return this.e_.forEachInRange([n,r],e=>{this.r_(e),s.push(e.key)}),s}__(){this.Zs.forEach(e=>this.r_(e))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){const t=new qt(new Ut([])),n=new tp(t,e),r=new tp(t,e+1);let s=ta();return this.e_.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new tp(e,0),n=this.Zs.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class tp{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return qt.comparator(e.key,t.key)||Ct(e.a_,t.a_)}static t_(e,t){return Ct(e.a_,t.a_)||qt.comparator(e.key,t.key)}}
/**
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
 */class np{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new Zr(tp.Xs)}checkEmpty(e){return wn.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new gd(s,t,n,r);this.mutationQueue.push(i);for(const o of r)this.u_=this.u_.add(new tp(o.key,s)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return wn.resolve(i)}lookupMutationBatch(e,t){return wn.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.l_(n),s=r<0?0:r;return wn.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return wn.resolve(0===this.mutationQueue.length?On:this.gs-1)}getAllMutationBatches(e){return wn.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new tp(t,0),r=new tp(t,Number.POSITIVE_INFINITY),s=[];return this.u_.forEachInRange([n,r],e=>{const t=this.c_(e.a_);s.push(t)}),wn.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Zr(Ct);return t.forEach(e=>{const t=new tp(e,0),r=new tp(e,Number.POSITIVE_INFINITY);this.u_.forEachInRange([t,r],e=>{n=n.add(e.a_)})}),wn.resolve(this.E_(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;qt.isDocumentKey(s)||(s=s.child(""));const i=new tp(new qt(s),0);let o=new Zr(Ct);return this.u_.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.a_)),!0)},i),wn.resolve(this.E_(o))}E_(e){const t=[];return e.forEach(e=>{const n=this.c_(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){pt(0===this.h_(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.u_;return wn.forEach(t.mutations,r=>{const s=new tp(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.u_=n})}bs(e){}containsKey(e,t){const n=new tp(t,0),r=this.u_.firstAfterOrEqual(n);return wn.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,wn.resolve()}h_(e,t){return this.l_(e)}l_(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}c_(e){const t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
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
 */class rp{constructor(e){this.T_=e,this.docs=new Jr(qt.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.T_(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return wn.resolve(n?n.document.mutableCopy():fo.newInvalidDocument(t))}getEntries(e,t){let n=Go();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():fo.newInvalidDocument(e))}),wn.resolve(n)}getAllEntries(e){let t=Go();return this.docs.forEach((e,n)=>{t=t.insert(e,n.document)}),wn.resolve(t)}getDocumentsMatchingQuery(e,t,n,r){let s,i;ld(t)?(s=Ut.fromString(gl(t)),i=e=>Lf(t,e)):(s=t.path,i=e=>Vo(t,e));let o=Go();const a=new qt(s.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:e,value:{document:t}}=c.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||pn(dn(t),n)<=0||(r.has(t.key)||i(t))&&(o=o.insert(t.key,t.mutableCopy()))}return wn.resolve(o)}getAllFromCollectionGroup(e,t,n,r){dt(9500)}P_(e,t){return wn.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new sp(this)}getSize(e){return wn.resolve(this.size)}}class sp extends Bf{constructor(e){super(),this.zs=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.zs.addEntry(e,r)):this.zs.removeEntry(n)}),wn.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}
/**
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
 */class ip{constructor(e){this.persistence=e,this.R_=new $o(e=>pd(e),md),this.lastRemoteSnapshotVersion=tn.min(),this.highestTargetId=0,this.I_=0,this.A_=new ep,this.targetCount=0,this.V_=Nf.xs()}forEachTarget(e,t){return this.R_.forEach((e,n)=>t(n)),wn.resolve()}getLastRemoteSnapshotVersion(e){return wn.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return wn.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),wn.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.I_&&(this.I_=t),wn.resolve()}Ms(e){this.R_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.V_=new Nf(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,wn.resolve()}updateTargetData(e,t){return this.Ms(t),wn.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,wn.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.R_.forEach((i,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.R_.delete(i),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),wn.waitFor(s).next(()=>r)}getTargetCount(e){return wn.resolve(this.targetCount)}getTargetData(e,t){const n=this.R_.get(t)||null;return wn.resolve(n)}addMatchingKeys(e,t,n){return this.A_.n_(t,n),wn.resolve()}removeMatchingKeys(e,t,n){this.A_.i_(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),wn.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),wn.resolve()}getMatchingKeysForTargetId(e,t){const n=this.A_.o_(t);return wn.resolve(n)}containsKey(e,t){return wn.resolve(this.A_.containsKey(t))}}
/**
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
 */class op{constructor(e,t){this.d_={},this.overlays={},this.f_=new Pn(0),this.m_=!1,this.m_=!0,this.p_=new Zf,this.referenceDelegate=e(this),this.g_=new ip(this),this.indexManager=new lf,this.remoteDocumentCache=function(e){return new rp(e)}(e=>this.referenceDelegate.y_(e)),this.serializer=new _d(t),this.w_=new Yf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Xf,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.d_[e.toKey()];return n||(n=new np(t,this.referenceDelegate),this.d_[e.toKey()]=n),n}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,n){ct("MemoryPersistence","Starting transaction:",e);const r=new ap(this.f_.next());return this.referenceDelegate.b_(),n(r).next(e=>this.referenceDelegate.v_(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}S_(e,t){return wn.or(Object.values(this.d_).map(n=>()=>n.containsKey(e,t)))}}class ap extends gn{constructor(e){super(),this.currentSequenceNumber=e}}class cp{constructor(e){this.persistence=e,this.D_=new ep,this.x_=null}static C_(e){return new cp(e)}get F_(){if(this.x_)return this.x_;throw dt(60996)}addReference(e,t,n){return this.D_.addReference(n,t),this.F_.delete(n.toString()),wn.resolve()}removeReference(e,t,n){return this.D_.removeReference(n,t),this.F_.add(n.toString()),wn.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),wn.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach(e=>this.F_.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.F_.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}b_(){this.x_=new Set}v_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return wn.forEach(this.F_,n=>{const r=qt.fromPath(n);return this.O_(e,r).next(e=>{e||t.removeEntry(r,tn.min())})}).next(()=>(this.x_=null,t.apply(e)))}updateLimboDocument(e,t){return this.O_(e,t).next(e=>{e?this.F_.delete(t.toString()):this.F_.add(t.toString())})}y_(e){return 0}O_(e,t){return wn.or([()=>wn.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class up{constructor(e,t){this.persistence=e,this.M_=new $o(e=>Fn(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=zc(this,t)}static C_(e,t){return new up(e,t)}b_(){}v_(e){return wn.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){const t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Ls(e){let t=0;return this.Er(e,e=>{t++}).next(()=>t)}Er(e,t){return wn.forEach(this.M_,(n,r)=>this.Us(e,n,r).next(e=>e?wn.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.P_(e,r=>this.Us(e,r,t).next(e=>{e||(n++,s.removeEntry(r,tn.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),wn.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.M_.set(n,e.currentSequenceNumber),wn.resolve()}removeReference(e,t,n){return this.M_.set(n,e.currentSequenceNumber),wn.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),wn.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Fs(e.data.value)),t}Us(e,t,n){return wn.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.M_.get(t);return wn.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
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
 */class lp{constructor(e){this.serializer=e}U(e,t,n,r){const s=new _n("createOrUpgrade",t);n<1&&r>=1&&(function(e){e.createObjectStore($n)}(e),function(e){e.createObjectStore(Gn,{keyPath:"userId"});e.createObjectStore(Hn,{keyPath:Wn,autoIncrement:!0}).createIndex(Qn,Jn,{unique:!0}),e.createObjectStore(er)}(e),hp(e),function(e){e.createObjectStore(zn)}(e));let i=wn.resolve();return n<3&&r>=3&&(0!==n&&(function(e){e.deleteObjectStore(dr),e.deleteObjectStore(ur),e.deleteObjectStore(yr)}(e),hp(e)),i=i.next(()=>function(e){const t=e.store(yr),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:tn.min().toTimestamp(),targetCount:0};return t.put(gr,n)}(s))),n<4&&r>=4&&(0!==n&&(i=i.next(()=>function(e,t){return t.store(Hn).H().next(n=>{e.deleteObjectStore(Hn),e.createObjectStore(Hn,{keyPath:Wn,autoIncrement:!0}).createIndex(Qn,Jn,{unique:!0});const r=t.store(Hn),s=n.map(e=>r.put(e));return wn.waitFor(s)})}(e,s))),i=i.next(()=>{!function(e){e.createObjectStore(_r,{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(i=i.next(()=>this.N_(s))),n<6&&r>=6&&(i=i.next(()=>(function(e){e.createObjectStore(ar)}(e),this.L_(s)))),n<7&&r>=7&&(i=i.next(()=>this.B_(s))),n<8&&r>=8&&(i=i.next(()=>this.U_(e,s))),n<9&&r>=9&&(i=i.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),n<10&&r>=10&&(i=i.next(()=>this.k_(s))),n<11&&r>=11&&(i=i.next(()=>{!function(e){e.createObjectStore(br,{keyPath:"bundleId"})}(e),function(e){e.createObjectStore(Ir,{keyPath:"name"})}(e)})),n<12&&r>=12&&(i=i.next(()=>{!function(e){const t=e.createObjectStore(Pr,{keyPath:Or});t.createIndex(Lr,Vr,{unique:!1}),t.createIndex(Mr,Ur,{unique:!1})}(e)})),n<13&&r>=13&&(i=i.next(()=>function(e){const t=e.createObjectStore(tr,{keyPath:nr});t.createIndex(rr,sr),t.createIndex(ir,or)}(e)).next(()=>this.q_(e,s)).next(()=>e.deleteObjectStore(zn))),n<14&&r>=14&&(i=i.next(()=>this.K_(e,s))),n<15&&r>=15&&(i=i.next(()=>function(e){e.createObjectStore(Tr,{keyPath:"indexId",autoIncrement:!0}).createIndex(Er,"collectionGroup",{unique:!1});e.createObjectStore(Sr,{keyPath:xr}).createIndex(Nr,Ar,{unique:!1});e.createObjectStore(Cr,{keyPath:kr}).createIndex(Dr,Rr,{unique:!1})}(e))),n<16&&r>=16&&(i=i.next(()=>{t.objectStore(Sr).clear()}).next(()=>{t.objectStore(Cr).clear()})),n<17&&r>=17&&(i=i.next(()=>{!function(e){e.createObjectStore(Fr,{keyPath:"name"})}(e)})),n<18&&r>=18&&v()&&(i=i.next(()=>{t.objectStore(Sr).clear()}).next(()=>{t.objectStore(Cr).clear()})),i}L_(e){let t=0;return e.store(zn).ee((e,n)=>{t+=bf(n)}).next(()=>{const n={byteSize:t};return e.store(ar).put(cr,n)})}N_(e){const t=e.store(Gn),n=e.store(Hn);return t.H().next(t=>wn.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,On],[t.userId,t.lastAcknowledgedBatchId]);return n.H(Qn,r).next(n=>wn.forEach(n,n=>{pt(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=Sd(this.serializer,n);return _f(e,t.userId,r).next(()=>{})}))}))}B_(e){const t=e.store(dr),n=e.store(zn);return e.store(yr).get(gr).next(e=>{const r=[];return n.ee((n,s)=>{const i=new Ut(n),o=function(e){return[0,Fn(e)]}(i);r.push(t.get(o).next(n=>n?wn.resolve():(n=>t.put({targetId:0,path:Fn(n),sequenceNumber:e.highestListenSequenceNumber}))(i)))}).next(()=>wn.waitFor(r))})}U_(e,t){e.createObjectStore(wr,{keyPath:vr});const n=t.store(wr),r=new hf,s=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:Fn(r)})}};return t.store(zn).ee({X:!0},(e,t)=>{const n=new Ut(e);return s(n.popLast())}).next(()=>t.store(er).ee({X:!0},([e,t,n],r)=>{const i=jn(t);return s(i.popLast())}))}k_(e){const t=e.store(ur);return t.ee((e,n)=>{const r=xd(this.serializer,n),s=Nd(this.serializer,r);return t.put(s)})}q_(e,t){const n=t.store(zn),r=[];return n.ee((e,n)=>{const s=t.store(tr),i=function(e){return e.document?new qt(Ut.fromString(e.document.name).popFirst(5)):e.noDocument?qt.fromSegments(e.noDocument.path):e.unknownDocument?qt.fromSegments(e.unknownDocument.path):dt(36783)}
/**
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
 */(n).path.toArray(),o={prefixPath:i.slice(0,i.length-2),collectionGroup:i[i.length-2],documentId:i[i.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(s.put(o))}).next(()=>wn.waitFor(r))}K_(e,t){const n=t.store(Hn),r=jf(this.serializer),s=new op(cp.C_,this.serializer.zr);return n.H().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??ta();Sd(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),wn.forEach(n,(e,n)=>{const i=new st(n),o=Md.jr(this.serializer,i),a=s.getIndexManager(i),c=If.jr(i,this.serializer,a,s.referenceDelegate);return new Jf(r,c,o,a).recalculateAndSaveOverlaysForDocumentKeys(new Wr(t,Pn.ce),e).next()})})}}function hp(e){e.createObjectStore(dr,{keyPath:fr}).createIndex(pr,mr,{unique:!0}),e.createObjectStore(ur,{keyPath:"targetId"}).createIndex(lr,hr,{unique:!0}),e.createObjectStore(yr)}const dp="IndexedDbPersistence",fp=18e5,pp=5e3,mp="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",gp="main";class yp{constructor(e,t,n,r,s,i,o,a,c,u,l=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Tn=s,this.window=i,this.document=o,this.W_=c,this.Q_=u,this.G_=l,this.f_=null,this.m_=!1,this.isPrimary=!1,this.networkEnabled=!0,this.z_=null,this.inForeground=!1,this.j_=null,this.H_=null,this.J_=Number.NEGATIVE_INFINITY,this.Y_=e=>Promise.resolve(),!yp.C())throw new yt(gt.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Rf(this,r),this.Z_=t+gp,this.serializer=new _d(a),this.X_=new bn(this.Z_,this.G_,new lp(this.serializer)),this.p_=new Fd,this.g_=new Af(this.referenceDelegate,this.serializer),this.remoteDocumentCache=jf(this.serializer),this.w_=new Od,this.window&&this.window.localStorage?this.eo=this.window.localStorage:(this.eo=null,!1===u&&ut(dp,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.no().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new yt(gt.FAILED_PRECONDITION,mp);return this.ro(),this.io(),this.so(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.g_.getHighestSequenceNumber(e))}).then(e=>{this.f_=new Pn(e,this.W_)}).then(()=>{this.m_=!0}).catch(e=>(this.X_&&this.X_.close(),Promise.reject(e)))}_o(e){return this.Y_=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.X_.q(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Tn.enqueueAndForget(async()=>{this.started&&await this.no()}))}no(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>vp(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.oo(e).next(e=>{e||(this.isPrimary=!1,this.Tn.enqueueRetryable(()=>this.Y_(!1)))})}).next(()=>this.ao(e)).next(t=>this.isPrimary&&!t?this.uo(e).next(()=>!1):!!t&&this.co(e).next(()=>!0))).catch(e=>{if(Sn(e))return ct(dp,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return ct(dp,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Tn.enqueueRetryable(()=>this.Y_(e)),this.isPrimary=e})}oo(e){return wp(e).get(Kn).next(e=>wn.resolve(this.lo(e)))}Eo(e){return vp(e).delete(this.clientId)}async ho(){if(this.isPrimary&&!this.To(this.J_,fp)){this.J_=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=Qr(e,_r);return t.H().next(e=>{const n=this.Po(e,fp),r=e.filter(e=>-1===n.indexOf(e));return wn.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.eo)for(const t of e)this.eo.removeItem(this.Ro(t.clientId))}}so(){this.H_=this.Tn.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.no().then(()=>this.ho()).then(()=>this.so()))}lo(e){return!!e&&e.ownerId===this.clientId}ao(e){return this.Q_?wn.resolve(!0):wp(e).get(Kn).next(t=>{if(null!==t&&this.To(t.leaseTimestampMs,pp)&&!this.Io(t.ownerId)){if(this.lo(t)&&this.networkEnabled)return!0;if(!this.lo(t)){if(!t.allowTabSynchronization)throw new yt(gt.FAILED_PRECONDITION,mp);return!1}}return!(!this.networkEnabled||!this.inForeground)||vp(e).H().next(e=>void 0===this.Po(e,pp).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&ct(dp,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.m_=!1,this.Ao(),this.H_&&(this.H_.cancel(),this.H_=null),this.Vo(),this.fo(),await this.X_.runTransaction("shutdown","readwrite",[$n,_r],e=>{const t=new Wr(e,Pn.ce);return this.uo(t).next(()=>this.Eo(t))}),this.X_.close(),this.mo()}Po(e,t){return e.filter(e=>this.To(e.updateTimeMs,t)&&!this.Io(e.clientId))}po(){return this.runTransaction("getActiveClients","readonly",e=>vp(e).H().next(e=>this.Po(e,fp).map(e=>e.clientId)))}get started(){return this.m_}getGlobalsCache(){return this.p_}getMutationQueue(e,t){return If.jr(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new pf(e,this.serializer.zr.databaseId)}getDocumentOverlayCache(e){return Md.jr(this.serializer,e)}getBundleCache(){return this.w_}runTransaction(e,t,n){ct(dp,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",s=function(e){return 18===e?Hr:17===e?Gr:16===e?Kr:15===e?$r:14===e?zr:13===e?jr:12===e?qr:11===e?Br:void dt(60245)}(this.G_);let i;return this.X_.runTransaction(e,r,s,r=>(i=new Wr(r,this.f_?this.f_.next():Pn.ce),"readwrite-primary"===t?this.oo(i).next(e=>!!e||this.ao(i)).next(t=>{if(!t)throw ut(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Tn.enqueueRetryable(()=>this.Y_(!1)),new yt(gt.FAILED_PRECONDITION,mn);return n(i)}).next(e=>this.co(i).next(()=>e)):this.yo(i).next(()=>n(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}yo(e){return wp(e).get(Kn).next(e=>{if(null!==e&&this.To(e.leaseTimestampMs,pp)&&!this.Io(e.ownerId)&&!this.lo(e)&&!(this.Q_||this.allowTabSynchronization&&e.allowTabSynchronization))throw new yt(gt.FAILED_PRECONDITION,mp)})}co(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return wp(e).put(Kn,t)}static C(){return bn.C()}uo(e){const t=wp(e);return t.get(Kn).next(e=>this.lo(e)?(ct(dp,"Releasing primary lease."),t.delete(Kn)):wn.resolve())}To(e,t){const n=Date.now();return!(e<n-t||e>n&&(ut(`Detected an update time that is in the future: ${e} > ${n}`),1))}ro(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.j_=()=>{this.Tn.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.no()))},this.document.addEventListener("visibilitychange",this.j_),this.inForeground="visible"===this.document.visibilityState)}Vo(){this.j_&&(this.document.removeEventListener("visibilitychange",this.j_),this.j_=null)}io(){"function"==typeof this.window?.addEventListener&&(this.z_=()=>{this.Ao();const e=/(?:Version|Mobile)\/1[456]/;w()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Tn.enterRestrictedMode(!0),this.Tn.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.z_))}fo(){this.z_&&(this.window.removeEventListener("pagehide",this.z_),this.z_=null)}Io(e){try{const t=null!==this.eo?.getItem(this.Ro(e));return ct(dp,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return ut(dp,"Failed to get zombied client id.",e),!1}}Ao(){if(this.eo)try{this.eo.setItem(this.Ro(this.clientId),String(Date.now()))}catch(Wm){ut("Failed to set zombie client id.",Wm)}}mo(){if(this.eo)try{this.eo.removeItem(this.Ro(this.clientId))}catch(Wm){}}Ro(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function wp(e){return Qr(e,$n)}function vp(e){return Qr(e,_r)}function _p(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"
/**
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
 */}class bp{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.wo=n,this.bo=r}static vo(e,t){let n=ta(),r=ta();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new bp(e,t.fromCache,n,r)}}
/**
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
 */function Ip(e,t){return qt.comparator(e.key,t.key)}
/**
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
 */class Tp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
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
 */class Ep{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=w()?8:In(g())>0?6:4}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.Oo(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.Mo(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new Tp;return this.No(e,t,n).next(r=>{if(s.result=r,this.Do)return this.Lo(e,t,n,r.size)})}).next(()=>s.result)}Lo(e,t,n,r){return ld(t)?wn.resolve():n.documentReadCount<this.xo?(at()<=U.DEBUG&&ct("QueryEngine","SDK will not create cache indexes for query:",Lo(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),wn.resolve()):(at()<=U.DEBUG&&ct("QueryEngine","Query:",Lo(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.Co*r?(at()<=U.DEBUG&&ct("QueryEngine","The SDK decides to create cache indexes for query:",Lo(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Co(t))):wn.resolve())}Oo(e,t){if(ld(t))return wn.resolve(null);let n=t;if(xo(n))return wn.resolve(null);let r=Co(n);return this.indexManager.getIndexType(e,r).next(t=>0===t?null:(null!==n.limit&&1===t&&(n=Po(n,null,"F"),r=Co(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(t=>{const s=ta(...t);return this.Fo.getDocuments(e,s).next(t=>this.indexManager.getMinOffset(e,r).next(r=>{const i=this.Bo(n,t);return this.Uo(n,i,s,r.readTime)?this.Oo(e,Po(n,null,"F")):this.ko(e,i,n,r)}))})))}Mo(e,t,n,r){return(ld(t)?function(e){for(const t of e.stages){if(t instanceof cl||t instanceof ul)return!1;if(t instanceof al){if(t.condition instanceof Qu&&"exists"===t.condition._expr.name&&t.condition._expr.params[0]instanceof ju&&t.condition._expr.params[0].fieldName===Vt)continue;return!1}}return!0}(t):xo(t))||r.isEqual(tn.min())?wn.resolve(null):this.Fo.getDocuments(e,n).next(s=>{const i=this.Bo(t,s);return this.Uo(t,i,n,r)?wn.resolve(null):(at()<=U.DEBUG&&ct("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),hd(t)),this.ko(e,i,t,hn(r,nn)).next(e=>e))})}Bo(e,t){let n,r;return ld(e)?(n=new Zr(Ip),r=t=>Lf(e,t)):(n=new Zr(Mo(e)),r=t=>Vo(e,t)),t.forEach((e,t)=>{r(t)&&(n=n.add(t))}),n}Uo(e,t,n,r){if(ld(e))return function(e){return e.stages.some(e=>e instanceof cl||e instanceof ul)}(e);if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}No(e,t,n){return at()<=U.DEBUG&&ct("QueryEngine","Using full collection scan to execute query:",hd(t)),this.Fo.getDocumentsMatchingQuery(e,t,fn.min(),n)}ko(e,t,n,r){return this.Fo.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
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
 */const Sp="LocalStore";class xp{constructor(e,t,n,r){this.persistence=e,this.qo=t,this.serializer=r,this.$o=new Jr(Ct),this.Ko=new $o(e=>pd(e),md),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(n)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Jf(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.$o))}}function Np(e,t,n,r){return new xp(e,t,n,r)}async function Ap(e,t){const n=mt(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.Go(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let o=ta();for(const e of r){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({zo:e,removedBatchIds:s,addedBatchIds:i}))})})}function Cp(e){const t=mt(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.g_.getLastRemoteSnapshotVersion(e))}function kp(e,t,n){let r=ta(),s=ta();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=Go();return n.forEach((n,i)=>{const o=e.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(tn.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):ct(Sp,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{jo:r,Ho:s}})}function Dp(e,t){const n=mt(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=On),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function Rp(e,t){const n=mt(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.g_.getTargetData(e,t).next(s=>s?(r=s,wn.resolve(r)):n.g_.allocateTargetId(e).next(s=>(r=new vd(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.g_.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.$o.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.$o=n.$o.insert(e.targetId,e),n.Ko.set(t,e.targetId)),e})}async function Pp(e,t,n){const r=mt(e),s=r.$o.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(e){if(!Sn(e))throw e;ct(Sp,`Failed to update sequence numbers for target ${t}: ${e}`)}r.$o=r.$o.remove(t),r.Ko.delete(s.target)}function Op(e,t,n){const r=mt(e);let s=tn.min(),i=ta();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=mt(e),s=r.Ko.get(n);return void 0!==s?wn.resolve(r.$o.get(s)):r.g_.getTargetData(t,n)}(r,e,ld(t)?t:Co(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.qo.getDocumentsMatchingQuery(e,t,n?s:tn.min(),n?i:ta())).next(e=>(Mp(r,e),{documents:e,Jo:i})))}function Lp(e,t){const n=mt(e),r=mt(n.g_),s=n.$o.get(t);return s?Promise.resolve(s.target??null):n.persistence.runTransaction("Get target data","readonly",e=>r.dt(e,t).next(e=>e?.target??null))}function Vp(e,t){const n=mt(e),r=n.Wo.get(t)||tn.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.Qo.getAllFromCollectionGroup(e,t,hn(r,nn),Number.MAX_SAFE_INTEGER)).then(e=>(Mp(n,e),e))}function Mp(e,t){t.forEach((t,n)=>{const r=n.key.getCollectionGroup(),s=e.Wo.get(r)||tn.min();n.readTime.compareTo(s)>0&&e.Wo.set(r,n.readTime)})}async function Up(e,t,n=ta()){const r=await Rp(e,Co(Ad(t.bundledQuery))),s=mt(e);return s.persistence.runTransaction("Save named query","readwrite",e=>{const i=ka(t.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.w_.saveNamedQuery(e,t);const o=r.withResumeToken(cs.EMPTY_BYTE_STRING,i);return s.$o=s.$o.insert(o.targetId,o),s.g_.updateTargetData(e,o).next(()=>s.g_.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>s.g_.addMatchingKeys(e,n,r.targetId)).next(()=>s.w_.saveNamedQuery(e,t))})}
/**
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
 */const Fp="firestore_clients";function Bp(e,t){return`${Fp}_${e}_${t}`}const qp="firestore_mutations";function jp(e,t,n){let r=`${qp}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}const zp="firestore_targets";function $p(e,t){return`${zp}_${e}_${t}`}
/**
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
 */const Kp="SharedClientState";class Gp{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static ea(e,t,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new yt(r.error.code,r.error.message))),i?new Gp(e,t,r.state,s):(ut(Kp,`Failed to parse mutation state for ID '${t}': ${n}`),null)}ta(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Hp{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static ea(e,t){const n=JSON.parse(t);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new yt(n.error.code,n.error.message))),s?new Hp(e,n.state,r):(ut(Kp,`Failed to parse target state for ID '${e}': ${t}`),null)}ta(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Wp{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static ea(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=ra();for(let i=0;r&&i<n.activeTargetIds.length;++i)r=Mn(n.activeTargetIds[i]),s=s.add(n.activeTargetIds[i]);return r?new Wp(e,s):(ut(Kp,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Qp{constructor(e,t){this.clientId=e,this.onlineState=t}static ea(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new Qp(t.clientId,t.onlineState):(ut(Kp,`Failed to parse online state: ${e}`),null)}}class Jp{constructor(){this.activeTargetIds=ra()}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Yp{constructor(e,t,n,r,s){this.window=e,this.Tn=t,this.persistenceKey=n,this.ia=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.sa=this._a.bind(this),this.oa=new Jr(Ct),this.started=!1,this.aa=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.ua=Bp(this.persistenceKey,this.ia),this.ca=function(e){return`firestore_sequence_number_${e}`}(this.persistenceKey),this.oa=this.oa.insert(this.ia,new Jp),this.la=new RegExp(`^${Fp}_${i}_([^_]*)$`),this.Ea=new RegExp(`^${qp}_${i}_(\\d+)(?:_(.*))?$`),this.ha=new RegExp(`^${zp}_${i}_(\\d+)$`),this.Ta=function(e){return`firestore_online_state_${e}`}(this.persistenceKey),this.Pa=function(e){return`firestore_bundle_loaded_v2_${e}`}(this.persistenceKey),this.window.addEventListener("storage",this.sa)}static C(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.po();for(const n of e){if(n===this.ia)continue;const e=this.getItem(Bp(this.persistenceKey,n));if(e){const t=Wp.ea(n,e);t&&(this.oa=this.oa.insert(t.clientId,t))}}this.Ra();const t=this.storage.getItem(this.Ta);if(t){const e=this.Ia(t);e&&this.Aa(e)}for(const n of this.aa)this._a(n);this.aa=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.ca,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Va(this.oa)}isActiveQueryTarget(e){let t=!1;return this.oa.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.da(e,"pending")}updateMutationState(e,t,n){this.da(e,t,n),this.fa(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem($p(this.persistenceKey,e));if(t){const r=Hp.ea(e,t);r&&(n=r.state)}}return t&&this.ma.na(e),this.Ra(),n}removeLocalQueryTarget(e){this.ma.ra(e),this.Ra()}isLocalQueryTarget(e){return this.ma.activeTargetIds.has(e)}clearQueryState(e){this.removeItem($p(this.persistenceKey,e))}updateQueryState(e,t,n){this.pa(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.fa(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.ga(e)}notifyBundleLoaded(e){this.ya(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.sa),this.removeItem(this.ua),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return ct(Kp,"READ",e,t),t}setItem(e,t){ct(Kp,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){ct(Kp,"REMOVE",e),this.storage.removeItem(e)}_a(e){const t=e;if(t.storageArea===this.storage){if(ct(Kp,"EVENT",t.key,t.newValue),t.key===this.ua)return void ut("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Tn.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.la.test(t.key)){if(null==t.newValue){const e=this.wa(t.key);return this.ba(e,null)}{const e=this.va(t.key,t.newValue);if(e)return this.ba(e.clientId,e)}}else if(this.Ea.test(t.key)){if(null!==t.newValue){const e=this.Sa(t.key,t.newValue);if(e)return this.Da(e)}}else if(this.ha.test(t.key)){if(null!==t.newValue){const e=this.xa(t.key,t.newValue);if(e)return this.Ca(e)}}else if(t.key===this.Ta){if(null!==t.newValue){const e=this.Ia(t.newValue);if(e)return this.Aa(e)}}else if(t.key===this.ca){const e=function(e){let t=Pn.ce;if(null!=e)try{const n=JSON.parse(e);pt("number"==typeof n,30636,{Fa:e}),t=n}catch(e){ut(Kp,"Failed to read sequence number from WebStorage",e)}return t}(t.newValue);e!==Pn.ce&&this.sequenceNumberHandler(e)}else if(t.key===this.Pa){const e=this.Oa(t.newValue);await Promise.all(e.map(e=>this.syncEngine.Ma(e)))}}else this.aa.push(t)})}}get ma(){return this.oa.get(this.ia)}Ra(){this.setItem(this.ua,this.ma.ta())}da(e,t,n){const r=new Gp(this.currentUser,e,t,n),s=jp(this.persistenceKey,this.currentUser,e);this.setItem(s,r.ta())}fa(e){const t=jp(this.persistenceKey,this.currentUser,e);this.removeItem(t)}ga(e){const t={clientId:this.ia,onlineState:e};this.storage.setItem(this.Ta,JSON.stringify(t))}pa(e,t,n){const r=$p(this.persistenceKey,e),s=new Hp(e,t,n);this.setItem(r,s.ta())}ya(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Pa,t)}wa(e){const t=this.la.exec(e);return t?t[1]:null}va(e,t){const n=this.wa(e);return Wp.ea(n,t)}Sa(e,t){const n=this.Ea.exec(e),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return Gp.ea(new st(s),r,t)}xa(e,t){const n=this.ha.exec(e),r=Number(n[1]);return Hp.ea(r,t)}Ia(e){return Qp.ea(e)}Oa(e){return JSON.parse(e)}async Da(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Na(e.batchId,e.state,e.error);ct(Kp,`Ignoring mutation for non-active user ${e.user.uid}`)}Ca(e){return this.syncEngine.La(e.targetId,e.state,e.error)}ba(e,t){const n=t?this.oa.insert(e,t):this.oa.remove(e),r=this.Va(this.oa),s=this.Va(n),i=[],o=[];return s.forEach(e=>{r.has(e)||i.push(e)}),r.forEach(e=>{s.has(e)||o.push(e)}),this.syncEngine.Ba(i,o).then(()=>{this.oa=n})}Aa(e){this.oa.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Va(e){let t=ra();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class Xp{constructor(){this.Ua=new Jp,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,n){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new Jp,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
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
 */function Zp(){return"undefined"!=typeof window?window:null}function em(){return"undefined"!=typeof document?document:null}
/**
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
 */class tm{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){0===this.qa&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve())))}za(e){"Online"===this.state?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,"Online"===e&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(ut(t),this.Ka=!1):ct("OnlineStateTracker",t)}ja(){null!==this.$a&&(this.$a.cancel(),this.$a=null)}}
/**
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
 */const nm="RemoteStore";class rm{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new Nf(1e3),this.eu=new Nf(1001),this.tu=new Set,this.nu=[],this.ru=s,this.ru.bt(e=>{n.enqueueAndForget(async()=>{fm(this)&&(ct(nm,"Restarting streams for network reachability change."),await async function(e){const t=mt(e);t.tu.add(4),await im(t),t.iu.set("Unknown"),t.tu.delete(4),await sm(t)}(this))})}),this.iu=new tm(n,r)}}async function sm(e){if(fm(e))for(const t of e.nu)await t(!0)}async function im(e){for(const t of e.nu)await t(!1)}function om(e,t){return e.Ya.get(t)||void 0}function am(e,t){const n=mt(e),r=om(n,t.targetId);if(void 0!==r&&n.Ja.has(r))return;const s=function(e,t){const n=om(e,t);void 0!==n&&e.Za.delete(n);const r=function(e,t){return t%2!=0?e.eu.next():e.Xa.next()}(e,t);return e.Ya.set(t,r),e.Za.set(r,t),r}(n,t.targetId);ct(nm,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new vd(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);n.Ja.set(s,i),dm(n)?hm(n):Rm(n).Fn()&&um(n,i)}function cm(e,t){const n=mt(e),r=Rm(n),s=om(n,t);ct(nm,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),n.Ja.delete(s),n.Ya.delete(t),n.Za.delete(s),r.Fn()&&lm(n,s),0===n.Ja.size&&(r.Fn()?r.Nn():fm(n)&&n.iu.set("Unknown"))}function um(e,t){if(e.su.We(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(tn.min())>0){const n=e.Za.get(t.targetId);if(void 0===n)return void ct(nm,"SDK target ID not found for remote ID: "+t.targetId);const r=e.remoteSyncer.getRemoteKeysForTarget(n).size;t=t.withExpectedCount(r)}Rm(e).jn(t)}function lm(e,t){e.su.We(t),Rm(e).Hn(t)}function hm(e){e.su=new wa({getRemoteKeysForTarget:t=>{const n=e.Za.get(t);return void 0!==n?e.remoteSyncer.getRemoteKeysForTarget(n):ta()},dt:t=>e.Ja.get(t)||null,Tt:()=>e.datastore.serializer.databaseId}),Rm(e).start(),e.iu.Wa()}function dm(e){return fm(e)&&!Rm(e).Cn()&&e.Ja.size>0}function fm(e){return 0===mt(e).tu.size}function pm(e){e.su=void 0}async function mm(e){e.iu.set("Online")}async function gm(e){e.Ja.forEach((t,n)=>{um(e,t)})}async function ym(e,t){pm(e),dm(e)?(e.iu.za(t),hm(e)):e.iu.set("Unknown")}async function wm(e,t,n){if(e.iu.set("Online"),t instanceof ma&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds){if(e.Ja.has(r)){const t=e.Za.get(r);void 0!==t&&(await e.remoteSyncer.rejectListen(t,n),e.Ya.delete(t),e.Za.delete(r)),e.Ja.delete(r)}e.su.removeTarget(r)}}(e,t)}catch(n){ct(nm,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await vm(e,n)}else if(t instanceof fa?e.su.et(t):t instanceof pa?e.su.ot(t):e.su.rt(t),!n.isEqual(tn.min()))try{const t=await Cp(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.su.Rt(t);n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ja.get(r);s&&e.Ja.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ja.get(t);if(!r)return;e.Ja.set(t,r.withResumeToken(cs.EMPTY_BYTE_STRING,r.snapshotVersion)),lm(e,t);const s=new vd(r.target,t,n,r.sequenceNumber);um(e,s)});const r=function(e,t){const n=new Map;t.targetChanges.forEach((t,r)=>{const s=e.Za.get(r);void 0!==s&&n.set(s,t)});let r=new Jr(Ct);return t.targetMismatches.forEach((t,n)=>{const s=e.Za.get(t);void 0!==s&&(r=r.insert(s,n))}),new ha(t.snapshotVersion,n,r,t.documentUpdates,t.augmentedDocumentUpdates,t.resolvedLimboDocuments)}(e,n);return e.remoteSyncer.applyRemoteEvent(r)}(e,n)}catch(t){ct(nm,"Failed to raise snapshot:",t),await vm(e,t)}}async function vm(e,t,n){if(!Sn(t))throw t;e.tu.add(1),await im(e),e.iu.set("Offline"),n||(n=()=>Cp(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{ct(nm,"Retrying IndexedDB access"),await n(),e.tu.delete(1),await sm(e)})}function _m(e,t){return t().catch(n=>vm(e,n,t))}async function bm(e){const t=mt(e),n=Pm(t);let r=t.Ha.length>0?t.Ha[t.Ha.length-1].batchId:On;for(;Im(t);)try{const e=await Dp(t.localStore,r);if(null===e){0===t.Ha.length&&n.Nn();break}r=e.batchId,Tm(t,e)}catch(e){await vm(t,e)}Em(t)&&Sm(t)}function Im(e){return fm(e)&&e.Ha.length<10}function Tm(e,t){e.Ha.push(t);const n=Pm(e);n.Fn()&&n.Jn&&n.Yn(t.mutations)}function Em(e){return fm(e)&&!Pm(e).Cn()&&e.Ha.length>0}function Sm(e){Pm(e).start()}async function xm(e){Pm(e).er()}async function Nm(e){const t=Pm(e);for(const n of e.Ha)t.Yn(n.mutations)}async function Am(e,t,n){const r=e.Ha.shift(),s=yd.from(r,t,n);await _m(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await bm(e)}async function Cm(e,t){t&&Pm(e).Jn&&await async function(e,t){if(function(e){return jo(e)&&e!==gt.ABORTED}(t.code)){const n=e.Ha.shift();Pm(e).Mn(),await _m(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await bm(e)}}(e,t),Em(e)&&Sm(e)}async function km(e,t){const n=mt(e);n.asyncQueue.verifyOperationInProgress(),ct(nm,"RemoteStore received new credentials");const r=fm(n);n.tu.add(3),await im(n),r&&n.iu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.tu.delete(3),await sm(n)}async function Dm(e,t){const n=mt(e);t?(n.tu.delete(2),await sm(n)):t||(n.tu.add(2),await im(n),n.iu.set("Unknown"))}function Rm(e){return e._u||(e._u=function(e,t,n){const r=mt(e);return r.nr(),new Cc(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Qt:mm.bind(null,e),zt:gm.bind(null,e),Ht:ym.bind(null,e),zn:wm.bind(null,e)}),e.nu.push(async t=>{t?(e._u.Mn(),dm(e)?hm(e):e.iu.set("Unknown")):(await e._u.stop(),pm(e))})),e._u}function Pm(e){return e.ou||(e.ou=function(e,t,n){const r=mt(e);return r.nr(),new kc(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Qt:()=>Promise.resolve(),zt:xm.bind(null,e),Ht:Cm.bind(null,e),Zn:Nm.bind(null,e),Xn:Am.bind(null,e)}),e.nu.push(async t=>{t?(e.ou.Mn(),await bm(e)):(await e.ou.stop(),e.Ha.length>0&&(ct(nm,`Stopping write stream with ${e.Ha.length} pending writes`),e.Ha=[]))})),e.ou
/**
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
 */}class Om{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,o=new Om(e,t,i,r,s);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new yt(gt.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Lm(e,t){if(ut("AsyncQueue",`${t}: ${e}`),Sn(e))return new yt(gt.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
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
 */class Vm{static emptySet(e){return new Vm(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||qt.comparator(t.key,n.key):(e,t)=>qt.comparator(e.key,t.key),this.keyedMap=Wo(),this.sortedSet=new Jr(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Vm))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Vm;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
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
 */class Mm{constructor(){this.au=new Jr(qt.comparator)}track(e){const t=e.doc.key,n=this.au.get(t);n?0!==e.type&&3===n.type?this.au=this.au.insert(t,e):3===e.type&&1!==n.type?this.au=this.au.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.au=this.au.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.au=this.au.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.au=this.au.remove(t):1===e.type&&2===n.type?this.au=this.au.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.au=this.au.insert(t,{type:2,doc:e.doc}):dt(63341,{ft:e,uu:n}):this.au=this.au.insert(t,e)}cu(){const e=[];return this.au.inorderTraversal((t,n)=>{e.push(n)}),e}}class Um{constructor(e,t,n,r,s,i,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new Um(e,t,Vm.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&fd(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
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
 */class Fm{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some(e=>e.Tu())}}class Bm{constructor(){this.queries=qm(),this.onlineState="Unknown",this.Pu=new Set}terminate(){!function(e,t){const n=mt(e),r=n.queries;n.queries=qm(),r.forEach((e,n)=>{for(const r of n.Eu)r.onError(t)})}(this,new yt(gt.ABORTED,"Firestore shutting down"))}}function qm(){return new $o(e=>dd(e),fd)}async function jm(e,t){const n=mt(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.hu()&&t.Tu()&&(r=2):(i=new Fm,r=t.Tu()?0:1);try{switch(r){case 0:i.lu=await n.onListen(s,!0);break;case 1:i.lu=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(e){const n=Lm(e,`Initialization of query '${ld(t.query)?cd(t.query):Lo(t.query)}' failed`);return void t.onError(n)}n.queries.set(s,i),i.Eu.push(t),t.Ru(n.onlineState),i.lu&&t.Iu(i.lu)&&Gm(n)}async function zm(e,t){const n=mt(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.Eu.indexOf(t);e>=0&&(i.Eu.splice(e,1),0===i.Eu.length?s=t.Tu()?0:1:!i.hu()&&t.Tu()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function $m(e,t){const n=mt(e);let r=!1;for(const s of t){const e=s.query,t=n.queries.get(e);if(t){for(const e of t.Eu)e.Iu(s)&&(r=!0);t.lu=s}}r&&Gm(n)}function Km(e,t,n){const r=mt(e),s=r.queries.get(t);if(s)for(const i of s.Eu)i.onError(n);r.queries.delete(t)}function Gm(e){e.Pu.forEach(e=>{e.next()})}var Hm,Wm;(Wm=Hm||(Hm={})).Default="default",Wm.Cache="cache";class Qm{constructor(e,t,n){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=n||{}}Iu(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Um(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){if(!e.fromCache)return!0;if(!this.Tu())return!0;const n="Offline"!==t;return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}fu(e){if(e.docChanges.length>0)return!0;const t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}pu(e){e=Um.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==Hm.Cache}}
/**
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
 */class Jm{constructor(e,t){this.gu=e,this.byteLength=t}yu(){return"metadata"in this.gu}}
/**
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
 */class Ym{constructor(e){this.serializer=e}Yo(e){return La(this.serializer,e)}Zo(e){return e.metadata.exists?qa(this.serializer,e.document,!1):fo.newNoDocument(this.Yo(e.metadata.name),this.Xo(e.metadata.readTime))}Xo(e){return ka(e)}}class Xm{constructor(e,t){this.wu=e,this.serializer=t,this.bu=[],this.vu=[],this.collectionGroups=new Set,this.progress=Zm(e)}get queries(){return this.bu}get documents(){return this.vu}o(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.gu.namedQuery)this.bu.push(e.gu.namedQuery);else if(e.gu.documentMetadata){this.vu.push({metadata:e.gu.documentMetadata}),e.gu.documentMetadata.exists||++t;const n=Ut.fromString(e.gu.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.gu.document&&(this.vu[this.vu.length-1].document=e.gu.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}Du(e){const t=new Map,n=new Ym(this.serializer);for(const r of e)if(r.metadata.queries){const e=n.Yo(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||ta()).add(e);t.set(n,r)}}return t}async xu(e){const t=await async function(e,t,n,r){const s=mt(e);let i=ta(),o=Go();for(const u of n){const e=t.Yo(u.metadata.name);u.document&&(i=i.add(e));const n=t.Zo(u);n.setReadTime(t.Xo(u.metadata.readTime)),o=o.insert(e,n)}const a=s.Qo.newChangeBuffer({trackRemovals:!0}),c=await Rp(s,function(e){return Co(So(Ut.fromString(`__bundle__/docs/${e}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",e=>kp(e,a,o).next(t=>(a.apply(e),t)).next(t=>s.g_.removeMatchingKeysForTargetId(e,c.targetId).next(()=>s.g_.addMatchingKeys(e,i,c.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(e,t.jo,t.Ho)).next(()=>t.jo)))}(e,new Ym(this.serializer),this.vu,this.wu.id),n=this.Du(this.documents);for(const r of this.bu)await Up(e,r,n.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Cu:this.collectionGroups,Fu:t}}}function Zm(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
/**
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
 */class eg{constructor(e){this.key=e}}class tg{constructor(e){this.key=e}}class ng{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=ta(),this.mutatedKeys=ta(),this.Lu=ld(e)?Uf(e):Mo(e),this.Bu=new Vm(this.Lu)}get Uu(){return this.Ou}ku(e,t){const n=t?t.qu:new Mm,r=t?t.Bu:this.Bu;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,o=!1;const[a,c]=this.$u(this.query,r);e.inorderTraversal((e,t)=>{const u=r.get(e),l=Vf(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;u&&l?u.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.Ku(u,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.Lu(l,a)>0||c&&this.Lu(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),f=!0):u&&!l&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(l?(i=i.add(l),s=d?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))});const u=this.Wu(this.query);if(u)if(ld(this.query)){const e=[];i.forEach(t=>e.push(t));const t=Of(this.query,e);let r=new Vm(Uf(this.query));for(const n of t)r=r.add(n);i.forEach(e=>{r.has(e.key)||(s=s.delete(e.key),n.track({type:1,doc:e}))}),i=r}else{const e=this.Qu(this.query);for(;i.size>u;){const t="F"===e?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}}return{Bu:i,qu:n,Uo:o,mutatedKeys:s}}Wu(e){return ld(e)?Ff(e)?.limit:e.limit||void 0}Qu(e){if(ld(e)){const t=Ff(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){if(ld(e)){const n=Ff(e)?.limit;return[t.size===n?t.last():null,null]}return["F"===e.limitType&&t.size===this.Wu(this.query)?t.last():null,"L"===e.limitType&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;const i=e.qu.cu();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return dt(20277,{ft:e})}};return n(e)-n(t)}
/**
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
 */(e.type,t.type)||this.Lu(e.doc,t.doc)),this.Gu(n),r=r??!1;const o=t&&!r?this.zu():[],a=0===this.Nu.size&&this.current&&!r?1:0,c=a!==this.Mu;return this.Mu=a,0!==i.length||c?{snapshot:new Um(this.query,e.Bu,s,i,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),ju:o}:{ju:o}}Ru(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new Mm,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach(e=>this.Ou=this.Ou.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ou=this.Ou.delete(e)),this.current=e.current)}zu(){if(!this.current)return[];const e=this.Nu;this.Nu=ta(),this.Bu.forEach(e=>{this.Hu(e.key)&&(this.Nu=this.Nu.add(e.key))});const t=[];return e.forEach(e=>{this.Nu.has(e)||t.push(new tg(e))}),this.Nu.forEach(n=>{e.has(n)||t.push(new eg(n))}),t}Ju(e){this.Ou=e.Jo,this.Nu=ta();const t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return Um.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,0===this.Mu,this.hasCachedResults)}}const rg="SyncEngine";class sg{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class ig{constructor(e){this.key=e,this.Zu=!1}}class og{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Xu={},this.ec=new $o(e=>dd(e),fd),this.tc=new Map,this.nc=new Set,this.rc=new Jr(qt.comparator),this.sc=new Map,this._c=new ep,this.oc={},this.ac=new Map,this.uc=Nf.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return!0===this.cc}}async function ag(e,t,n=!0){const r=Vg(e);let s;const i=r.ec.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await ug(r,t,n,!0),s}async function cg(e,t){const n=Vg(e);await ug(n,t,!0,!1)}async function ug(e,t,n,r){const s=await Rp(e.localStore,ld(t)?t:Co(t)),i=s.targetId,o=e.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await lg(e,t,i,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&am(e.remoteStore,s),a}async function lg(e,t,n,r,s){e.lc=(t,n,r)=>async function(e,t,n,r){let s=t.view.ku(n);s.Uo&&(s=await Op(e.localStore,t.query,!1).then(({documents:e})=>t.view.ku(e,s)));const i=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i,o);return Ig(e,t.targetId,a.ju),a.snapshot}(e,t,n,r);const i=await Op(e.localStore,t,!0),o=new ng(t,i.Jo),a=o.ku(i.documents),c=da.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),u=o.applyChanges(a,e.isPrimaryClient,c);Ig(e,n,u.ju);const l=new sg(t,n,o);return e.ec.set(t,l),e.tc.has(n)?e.tc.get(n).push(t):e.tc.set(n,[t]),u.snapshot}async function hg(e,t,n){const r=mt(e),s=r.ec.get(t),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter(e=>!fd(e,t))),void r.ec.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Pp(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&cm(r.remoteStore,s.targetId),_g(r,s.targetId)}).catch(yn)):(_g(r,s.targetId),await Pp(r.localStore,s.targetId,!0))}async function dg(e,t){const n=mt(e),r=n.ec.get(t),s=n.tc.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),cm(n.remoteStore,r.targetId))}async function fg(e,t){const n=mt(e);try{const e=await function(e,t){const n=mt(e),r=t.snapshotVersion;let s=n.$o;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.Qo.newChangeBuffer({trackRemovals:!0});s=n.$o;const o=[];t.targetChanges.forEach((i,a)=>{const c=s.get(a);if(!c)return;o.push(n.g_.removeMatchingKeys(e,i.removedDocuments,a).next(()=>n.g_.addMatchingKeys(e,i.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(cs.EMPTY_BYTE_STRING,tn.min()).withLastLimboFreeSnapshotVersion(tn.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(a,u),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,u,i)&&o.push(n.g_.updateTargetData(e,u))});let a=Go(),c=ta();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(kp(e,i,t.documentUpdates).next(e=>{a=e.jo,c=e.Ho})),!r.isEqual(tn.min())){const t=n.g_.getLastRemoteSnapshotVersion(e).next(t=>n.g_.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return wn.waitFor(o).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.$o=s,e))}(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.sc.get(t);r&&(pt(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.Zu=!0:e.modifiedDocuments.size>0?pt(r.Zu,14607):e.removedDocuments.size>0&&(pt(r.Zu,42227),r.Zu=!1))}),await Sg(n,e,t)}catch(e){await yn(e)}}function pg(e,t,n){const r=mt(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.ec.forEach((n,r)=>{const s=r.view.Ru(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=mt(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const s of n.Eu)s.Ru(t)&&(r=!0)}),r&&Gm(n)}(r.eventManager,t),e.length&&r.Xu.zn(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function mg(e,t,n){const r=mt(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.sc.get(t),i=s&&s.key;if(i){let e=new Jr(qt.comparator);e=e.insert(i,fo.newNoDocument(i,tn.min()));const n=ta().add(i),s=new ha(tn.min(),new Map,new Jr(Ct),e,Go(),n);await fg(r,s),r.rc=r.rc.remove(i),r.sc.delete(t),Eg(r)}else await Pp(r.localStore,t,!1).then(()=>_g(r,t,n)).catch(yn)}async function gg(e,t){const n=mt(e),r=t.batch.batchId;try{const e=await function(e,t){const n=mt(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.Qo.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const s=n.batch,i=s.keys();let o=wn.resolve();return i.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);pt(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=ta();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);vg(n,r,null),wg(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Sg(n,e)}catch(e){await yn(e)}}async function yg(e,t,n){const r=mt(e);try{const e=await function(e,t){const n=mt(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(pt(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);vg(r,t,n),wg(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Sg(r,e)}catch(n){await yn(n)}}function wg(e,t){(e.ac.get(t)||[]).forEach(e=>{e.resolve()}),e.ac.delete(t)}function vg(e,t,n){const r=mt(e);let s=r.oc[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.oc[r.currentUser.toKey()]=s}}function _g(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.tc.get(t))e.ec.delete(r),n&&e.Xu.Ec(r,n);e.tc.delete(t),e.isPrimaryClient&&e._c.s_(t).forEach(t=>{e._c.containsKey(t)||bg(e,t)})}function bg(e,t){e.nc.delete(t.path.canonicalString());const n=e.rc.get(t);null!==n&&(cm(e.remoteStore,n),e.rc=e.rc.remove(t),e.sc.delete(n),Eg(e))}function Ig(e,t,n){for(const r of n)r instanceof eg?(e._c.addReference(r.key,t),Tg(e,r)):r instanceof tg?(ct(rg,"Document no longer in limbo: "+r.key),e._c.removeReference(r.key,t),e._c.containsKey(r.key)||bg(e,r.key)):dt(19791,{hc:r})}function Tg(e,t){const n=t.key,r=n.path.canonicalString();e.rc.get(n)||e.nc.has(r)||(ct(rg,"New document in limbo: "+n),e.nc.add(r),Eg(e))}function Eg(e){for(;e.nc.size>0&&e.rc.size<e.maxConcurrentLimboResolutions;){const t=e.nc.values().next().value;e.nc.delete(t);const n=new qt(Ut.fromString(t)),r=e.uc.next();e.sc.set(r,new ig(n)),e.rc=e.rc.insert(n,r),am(e.remoteStore,new vd(Co(So(n.path)),r,"TargetPurposeLimboResolution",Pn.ce))}}async function Sg(e,t,n){const r=mt(e),s=[],i=[],o=[];r.ec.isEmpty()||(r.ec.forEach((e,a)=>{o.push(r.lc(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){s.push(e);const t=bp.vo(a.targetId,e);i.push(t)}}))}),await Promise.all(o),r.Xu.zn(s),await async function(e,t){const n=mt(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>wn.forEach(t,t=>wn.forEach(t.wo,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>wn.forEach(t.bo,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Sn(e))throw e;ct(Sp,"Failed to update sequence numbers: "+e)}for(const r of t){const e=r.targetId;if(!r.fromCache){const t=n.$o.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.$o=n.$o.insert(e,s)}}}(r.localStore,i))}async function xg(e,t){const n=mt(e);if(!n.currentUser.isEqual(t)){ct(rg,"User change. New user:",t.toKey());const e=await Ap(n.localStore,t);n.currentUser=t,function(e,t){e.ac.forEach(e=>{e.forEach(e=>{e.reject(new yt(gt.CANCELLED,t))})}),e.ac.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Sg(n,e.zo)}}function Ng(e,t){const n=mt(e),r=n.sc.get(t);if(r&&r.Zu)return ta().add(r.key);{let e=ta();const r=n.tc.get(t);if(!r)return e;for(const t of r??[]){const r=n.ec.get(t);e=e.unionWith(r.view.Uu)}return e}}async function Ag(e,t){const n=mt(e),r=await Op(n.localStore,t.query,!0),s=t.view.Ju(r);return n.isPrimaryClient&&Ig(n,t.targetId,s.ju),s}async function Cg(e,t){const n=mt(e);return Vp(n.localStore,t).then(e=>Sg(n,e))}async function kg(e,t,n,r){const s=mt(e),i=await function(e,t){const n=mt(e),r=mt(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.ps(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):wn.resolve(null)))}(s.localStore,t);null!==i?("pending"===n?await bm(s.remoteStore):"acknowledged"===n||"rejected"===n?(vg(s,t,r||null),wg(s,t),function(e,t){mt(mt(e).mutationQueue).bs(t)}(s.localStore,t)):dt(6720,"Unknown batchState",{Tc:n}),await Sg(s,i)):ct(rg,"Cannot apply mutation batch with id: "+t)}async function Dg(e,t,n){const r=mt(e),s=[],i=[];for(const o of t){let e;const t=r.tc.get(o);if(t&&0!==t.length){e=await Rp(r.localStore,ld(t[0])?t[0]:Co(t[0]));for(const e of t){const t=r.ec.get(e),n=await Ag(r,t);n.snapshot&&i.push(n.snapshot)}}else{const t=await Lp(r.localStore,o);e=await Rp(r.localStore,t),await lg(r,Rg(t),o,!1,e.resumeToken)}s.push(e)}return r.Xu.zn(i),s}function Rg(e){return wo(e)?e:Eo(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function Pg(e){return function(e){return mt(mt(e).persistence).po()}(mt(e).localStore)}async function Og(e,t,n,r){const s=mt(e);if(s.cc)return void ct(rg,"Ignoring unexpected query state notification.");const i=s.tc.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{let e;if(ld(i[0]))switch(ml(i[0])){case"collection_group":case"collection":e=await Vp(s.localStore,wl(i[0]));break;case"documents":e=await function(e,t){const n=mt(e),r=ta(...vl(t).map(e=>qt.fromPath(e)));return n.persistence.runTransaction("Get documents for pipeline","readonly",e=>n.Qo.getEntries(e,r)).then(e=>e)}(s.localStore,i[0]);break;default:lt(""),e=Wo()}else e=await Vp(s.localStore,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(i[0]));const r=ha.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,cs.EMPTY_BYTE_STRING);await Sg(s,e,r);break}case"rejected":await Pp(s.localStore,t,!0),_g(s,t,r);break;default:dt(64155,n)}}async function Lg(e,t,n){const r=Vg(e);if(r.cc){for(const e of t){if(r.tc.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){ct(rg,"Adding an already active target "+e);continue}const t=await Lp(r.localStore,e),n=await Rp(r.localStore,t);await lg(r,Rg(t),n.targetId,!1,n.resumeToken),am(r.remoteStore,n)}for(const e of n)r.tc.has(e)&&await Pp(r.localStore,e,!1).then(()=>{cm(r.remoteStore,e),_g(r,e)}).catch(yn)}}function Vg(e){const t=mt(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=fg.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ng.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=mg.bind(null,t),t.Xu.zn=$m.bind(null,t.eventManager),t.Xu.Ec=Km.bind(null,t.eventManager),t}function Mg(e){const t=mt(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=gg.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=yg.bind(null,t),t}class Ug{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ac(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){return Np(this.persistence,new Ep,e.initialUser,this.serializer)}Ic(e){return new op(cp.C_,this.serializer)}Rc(e){return new Xp}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ug.provider={build:()=>new Ug};class Fg extends Ug{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){pt(this.persistence.referenceDelegate instanceof up,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new qc(n,e.asyncQueue,t)}Ic(e){const t=void 0!==this.cacheSizeBytes?Vc.withCacheSize(this.cacheSizeBytes):Vc.DEFAULT;return new op(e=>up.C_(e,t),this.serializer)}}class Bg extends Ug{constructor(e,t,n){super(),this.fc=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.fc.initialize(this,e),await Mg(this.fc.syncEngine),await bm(this.fc.remoteStore),await this.persistence._o(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Ac(e){return Np(this.persistence,new Ep,e.initialUser,this.serializer)}Vc(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new qc(n,e.asyncQueue,t)}dc(e,t){const n=new Rn(t,this.persistence);return new Dn(e.asyncQueue,n)}Ic(e){const t=_p(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?Vc.withCacheSize(this.cacheSizeBytes):Vc.DEFAULT;return new yp(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Zp(),em(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Rc(e){return new Xp}}class qg extends Bg{constructor(e,t){super(e,t,!1),this.fc=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.fc.syncEngine;this.sharedClientState instanceof Yp&&(this.sharedClientState.syncEngine={Na:kg.bind(null,t),La:Og.bind(null,t),Ba:Lg.bind(null,t),po:Pg.bind(null,t),Ma:Cg.bind(null,t)},await this.sharedClientState.start()),await this.persistence._o(async e=>{await async function(e,t){const n=mt(e);if(Vg(n),Mg(n),!0===t&&!0!==n.cc){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await Dg(n,e.toArray());n.cc=!0,await Dm(n.remoteStore,!0);for(const r of t)am(n.remoteStore,r)}else if(!1===t&&!1!==n.cc){const e=[];let t=Promise.resolve();n.tc.forEach((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?e.push(s):t=t.then(()=>(_g(n,s),Pp(n.localStore,s,!0))),cm(n.remoteStore,s)}),await t,await Dg(n,e),function(e){const t=mt(e);t.sc.forEach((e,n)=>{cm(t.remoteStore,n)}),t._c.__(),t.sc=new Map,t.rc=new Jr(qt.comparator)}(n),n.cc=!1,await Dm(n.remoteStore,!1)}}(this.fc.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Rc(e){const t=Zp();if(!Yp.C(t))throw new yt(gt.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=_p(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Yp(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class jg{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>pg(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=xg.bind(null,this.syncEngine),await Dm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Bm}createDatastore(e){const t=ac(e.databaseInfo.databaseId),n=function(e){return new Sc(e)}(e.databaseInfo);return function(e,t,n,r){return new Rc(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,s){return new rm(e,t,n,r,s)}(this.localStore,this.datastore,e.asyncQueue,e=>pg(this.syncEngine,e,0),gc.C()?new gc:new pc)}createSyncEngine(e,t){return function(e,t,n,r,s,i,o){const a=new og(e,t,n,r,s,i);return o&&(a.cc=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=mt(e);ct(nm,"RemoteStore shutting down."),t.tu.add(5),await im(t),t.ru.shutdown(),t.iu.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}function zg(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}
/**
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
 */
/**
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
 */jg.provider={build:()=>new jg};class $g{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):ut("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
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
 */class Kg{constructor(e,t){this.yc=e,this.serializer=t,this.metadata=new wt,this.buffer=new Uint8Array,this.wc=new TextDecoder("utf-8"),this.bc().then(e=>{e&&e.yu()?this.metadata.resolve(e.gu.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(e?.gu)}`))},e=>this.metadata.reject(e))}close(){return this.yc.cancel()}async getMetadata(){return this.metadata.promise}async Pc(){return await this.getMetadata(),this.bc()}async bc(){const e=await this.vc();if(null===e)return null;const t=this.wc.decode(e),n=Number(t);isNaN(n)&&this.Sc(`length string (${t}) is not valid number`);const r=await this.Dc(n);return new Jm(JSON.parse(r),e.length+n)}xc(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async vc(){for(;this.xc()<0&&!(await this.Cc()););if(0===this.buffer.length)return null;const e=this.xc();e<0&&this.Sc("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Dc(e){for(;this.buffer.length<e;)await this.Cc()&&this.Sc("Reached the end of bundle when more is expected.");const t=this.wc.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Sc(e){throw this.yc.cancel(),new Error(`Invalid bundle format: ${e}`)}async Cc(){const e=await this.yc.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
/**
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
 */class Gg{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.Pc();if(!n||!n.yu())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(n?.gu)}`);this.metadata=n;do{n=this.Pc(),null!==n&&this.elements.push(n)}while(null!==n)}getMetadata(){return this.metadata}t(){return this.elements}Pc(){if(this.cursor===this.bundleData.length)return null;const e=this.vc(),t=this.Dc(e);return new Jm(JSON.parse(t),e)}Dc(e){if(this.cursor+e>this.bundleData.length)throw new yt(gt.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}vc(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
/**
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
 */let Hg=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new yt(gt.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(e,t){const n=mt(e),r={documents:t.map(e=>Oa(n.serializer,e))},s=await n.$t("BatchGetDocuments",n.serializer.databaseId,Ut.emptyPath(),r,t.length),i=new Map;s.forEach(e=>{const t=function(e,t){return"found"in t?function(e,t){pt(!!t.found,43571),t.found.name,t.found.updateTime;const n=La(e,t.found.name),r=ka(t.found.updateTime),s=t.found.createTime?ka(t.found.createTime):tn.min(),i=new ri({mapValue:{fields:t.found.fields}});return fo.newFoundDocument(n,r,s,i)}(e,t):"missing"in t?function(e,t){pt(!!t.missing,3894),pt(!!t.readTime,22933);const n=La(e,t.missing),r=ka(t.readTime);return fo.newNoDocument(n,r)}(e,t):dt(7234,{result:t})}(n.serializer,e);i.set(t.key.toString(),t)});const o=[];return t.forEach(e=>{const t=i.get(e.toString());pt(!!t,55234,{key:e}),o.push(t)}),o}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new Fi(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=qt.fromPath(t);this.mutations.push(new Bi(n,this.precondition(n)))}),await async function(e,t){const n=mt(e),r={writes:t.map(e=>ja(n.serializer,e))};await n.Bt("Commit",n.serializer.databaseId,Ut.emptyPath(),r)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw dt(50498,{Oc:e.constructor.name});t=tn.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new yt(gt.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(tn.min())?xi.exists(!1):xi.updateTime(t):xi.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(tn.min()))throw new yt(gt.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return xi.updateTime(t)}return xi.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};
/**
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
 */class Wg{constructor(e,t,n,r,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=s,this.Mc=n.maxAttempts,this.xn=new xc(this.asyncQueue,"transaction_retry")}Nc(){this.Mc-=1,this.Lc()}Lc(){this.xn.mn(async()=>{const e=new Hg(this.datastore),t=this.Bc(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Uc(e)}))}).catch(e=>{this.Uc(e)})})}Bc(e){try{const t=this.updateFunction(e);return!Ln(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Uc(e){this.Mc>0&&this.kc(e)?(this.Mc-=1,this.asyncQueue.enqueueAndForget(()=>(this.Lc(),Promise.resolve()))):this.deferred.reject(e)}kc(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!jo(t)}return!1}}
/**
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
 */const Qg="FirestoreClient";class Jg{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=st.UNAUTHENTICATED,this.clientId=At.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{ct(Qg,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(ct(Qg,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Lm(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Yg(e,t){e.asyncQueue.verifyOperationInProgress(),ct(Qg,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Ap(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Xg(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Zg(e);ct(Qg,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>km(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>km(t.remoteStore,n)),e._onlineComponents=t}async function Zg(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){ct(Qg,"Using user provided OfflineComponentProvider");try{await Yg(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===gt.FAILED_PRECONDITION||e.code===gt.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(n))throw n;lt("Error using user provided cache. Falling back to memory cache: "+n),await Yg(e,new Ug)}}else ct(Qg,"Using default OfflineComponentProvider"),await Yg(e,new Fg(void 0));return e._offlineComponents}async function ey(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(ct(Qg,"Using user provided OnlineComponentProvider"),await Xg(e,e._uninitializedComponentsProvider._online)):(ct(Qg,"Using default OnlineComponentProvider"),await Xg(e,new jg))),e._onlineComponents}function ty(e){return Zg(e).then(e=>e.persistence)}function ny(e){return Zg(e).then(e=>e.localStore)}function ry(e){return ey(e).then(e=>e.remoteStore)}function sy(e){return ey(e).then(e=>e.syncEngine)}function iy(e){return ey(e).then(e=>e.datastore)}async function oy(e){const t=await ey(e),n=t.eventManager;return n.onListen=ag.bind(null,t.syncEngine),n.onUnlisten=hg.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=cg.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=dg.bind(null,t.syncEngine),n}function ay(e,t,n={}){const r=new wt;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new $g({next:a=>{i.gc(),t.enqueueAndForget(()=>zm(e,o));const c=a.docs.has(n);!c&&a.fromCache?s.reject(new yt(gt.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?s.reject(new yt(gt.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:e=>s.reject(e)}),o=new Qm(So(n.path),i,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return jm(e,o)}(await oy(e),e.asyncQueue,t,n,r)),r.promise}function cy(e,t,n={}){const r=new wt;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new $g({next:n=>{i.gc(),t.enqueueAndForget(()=>zm(e,o)),n.fromCache&&"server"===r.source?s.reject(new yt(gt.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),o=new Qm(n instanceof _l?function(e,t){const n=function(e){let t=!1;const n=[];for(const r of e)if(r instanceof hl)if(t=!0,r.orderings.some(e=>e.expr instanceof ju&&e.expr.fieldName===Vt))n.push(r);else{const e=r.orderings.map(e=>e);e.push(zu(Vt).ascending()),n.push(new hl(e,{}))}else r instanceof cl?(t||(n.push(new hl([zu(Vt).ascending()],{})),t=!0),n.push(r)):n.push(r);return t||n.push(new hl([zu(Vt).ascending()],{})),n}(e.stages);if(e.userDataReader){const t=e.userDataReader.createContext(3,"toCorePipeline");n.forEach(e=>e._readUserData(t))}return new pl(e.userDataReader.serializer,n,t)}(n):n,i,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return jm(e,o)}(await oy(e),e.asyncQueue,t,n,r)),r.promise}function uy(e,t){const n=new wt;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){const r=Mg(e);try{const e=await function(e,t){const n=mt(e),r=en.now(),s=t.reduce((e,t)=>e.add(t.key),ta());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=Go(),c=ta();return n.Qo.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(s=>{i=s;const o=[];for(const e of t){const t=Ri(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new Li(e.key,t,si(t.value.mapValue),xi.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:Qo(i)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.oc[e.currentUser.toKey()];r||(r=new Jr(Ct)),r=r.insert(t,n),e.oc[e.currentUser.toKey()]=r}(r,e.batchId,n),await Sg(r,e.changes),await bm(r.remoteStore)}catch(e){const t=Lm(e,"Failed to persist write");n.reject(t)}}(await sy(e),t,n)),n.promise}function ly(e,t,n,r){const s=function(e,t){let n;return n="string"==typeof e?ia().encode(e):e,function(e,t){return new Kg(e,t)}(function(e,t){if(e instanceof Uint8Array)return zg(e,t);if(e instanceof ArrayBuffer)return zg(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),t)}(n,ac(t));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){const r=mt(e);(async function(e,t,n){try{const r=await t.getMetadata();if(await function(e,t){const n=mt(e),r=ka(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.w_.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)}(e.localStore,r))return await t.close(),n._completeWith(function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}(r)),Promise.resolve(new Set);n._updateProgress(Zm(r));const s=new Xm(r,t.serializer);let i=await t.Pc();for(;i;){const e=await s.o(i);e&&n._updateProgress(e),i=await t.Pc()}const o=await s.xu(e.localStore);return await Sg(e,o.Fu,void 0),await function(e,t){const n=mt(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.w_.saveBundleMetadata(e,t))}(e.localStore,r),n._completeWith(o.progress),Promise.resolve(o.Cu)}catch(e){return lt(rg,`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)}}
/**
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
 */)(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}(await sy(e),s,r)})}function hy(e,t){return function(e,t){return new Gg(e,t)}(e,t)}
/**
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
 */
const dy="AsyncQueue";class fy{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new xc(this,"async_queue_retry"),this.jc=()=>{const e=em();e&&ct(dy,"Visibility state changed to "+e.visibilityState),this.xn.gn()},this.Hc=e;const t=em();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=em();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise(()=>{});const t=new wt;return this.Yc(()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.qc.push(e),this.Zc()))}async Zc(){if(0!==this.qc.length){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(Wm){if(!Sn(Wm))throw Wm;ct(dy,"Operation failed with retryable error: "+Wm)}this.qc.length>0&&this.xn.mn(()=>this.Zc())}}Yc(e){const t=this.Hc.then(()=>(this.Qc=!0,e().catch(e=>{throw this.Wc=e,this.Qc=!1,ut("INTERNAL UNHANDLED ERROR: ",py(e)),e}).then(e=>(this.Qc=!1,e))));return this.Hc=t,t}enqueueAfterDelay(e,t,n){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const r=Om.createAndSchedule(this,e,t,n,e=>this.Xc(e));return this.Kc.push(r),r}Jc(){this.Wc&&dt(47125,{el:py(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do{e=this.Hc,await e}while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then(()=>{this.Kc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.Kc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.tl()})}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function py(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
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
 */}class my{constructor(){this._progressObserver={},this._taskCompletionResolver=new wt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}
/**
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
 */class gy extends Hc{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new fy,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fy(e),this._firestoreClient=void 0,await e}}}function yy(e,t,n){n||(n=bs);const r=Ne(e,"firestore");if(r.isInitialized(n)){const e=r.getImmediate({identifier:n});if(E(r.getOptions(n),t))return e;throw new yt(gt.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new yt(gt.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<Uc)throw new yt(gt.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&R(t.host)&&P(t.host),r.initialize({options:t,instanceIdentifier:n})}function wy(e,t){const n="object"==typeof e?e:Pe(),r="string"==typeof e?e:t||bs,s=Ne(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const e=h("firestore");e&&Wc(s,...e)}return s}function vy(e){if(e._terminated)throw new yt(gt.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||_y(e),e._firestoreClient}function _y(e){const t=e._freezeSettings(),n=function(e,t,n,r,s){return new _s(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,fc(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new Jg(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function by(e,t,n){if((e=Wt(e,gy))._firestoreClient||e._terminated)throw new yt(gt.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new yt(gt.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},_y(e)}function Iy(e,t){const n=vy(e=Wt(e,gy)),r=new my;return ly(n,e._databaseId,t,r),r}function Ty(e,t){return function(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){const n=mt(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.w_.getNamedQuery(e,t))}(await ny(e),t))}(vy(e=Wt(e,gy)),t).then(t=>t?new Qc(e,null,t.query):null)}
/**
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
 */class Ey{convertValue(e,t="none"){switch(Ds(e)){case 0:return null;case 1:return e.booleanValue;case 2:return hs(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ds(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw dt(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return ss(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[Ns].arrayValue?.values?.map(e=>hs(e.doubleValue));return new tu(t)}convertGeoPoint(e){return new dc(hs(e.latitude),hs(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=ws(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(vs(e));default:return null}}convertTimestamp(e){const t=ls(e);return new en(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Ut.fromString(e);pt(rc(n),9688,{name:e});const r=new Is(n.get(1),n.get(3)),s=new qt(n.popFirst(5));return r.isEqual(t)||ut(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}
/**
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
 */class Sy extends Ey{constructor(e){super(),this.firestore=e}convertBytes(e){return new cc(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Jc(this.firestore,null,t)}}
/**
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
 */const xy="@firebase/firestore",Ny="4.16.0";
/**
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
 */function Ay(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}
/**
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
 */(e,["next","error","complete"])}
/**
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
 */class Cy{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class ky{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new ri({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}
/**
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
 */class Dy{constructor(e,t,n,r,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Jc(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Ry(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Su("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Ry extends Dy{data(){return super.data()}}
/**
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
 */function Py(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new yt(gt.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Oy{}class Ly extends Oy{}function Vy(e,t,...n){let r=[];t instanceof Oy&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof Fy).length,n=e.filter(e=>e instanceof My).length;if(t>1||t>0&&n>0)throw new yt(gt.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
/**
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
 */(r);for(const s of r)e=s._apply(e);return e}class My extends Ly{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new My(e,t,n)}_apply(e){const t=this._parse(e);return Qy(e._query,t),new Qc(e.firestore,e.converter,Ro(e._query,t))}_parse(e){const t=cu(e.firestore),n=function(e,t,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new yt(gt.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){Wy(o,i);const t=[];for(const n of o)t.push(Hy(r,e,n));a={arrayValue:{values:t}}}else a=Hy(r,e,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||Wy(o,i),a=_u(n,t,o,"in"===i||"not-in"===i);return Gi.create(s,i,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function Uy(e,t,n){const r=t,s=Su("where",e);return My._create(s,r,n)}class Fy extends Oy{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Fy(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:Hi.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const s of r)Qy(n,s),n=Ro(n,s)}(e._query,t),new Qc(e.firestore,e.converter,Ro(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class By extends Ly{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new By(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new yt(gt.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new yt(gt.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new lo(t,n)}(e._query,this._field,this._direction);return new Qc(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new To(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function qy(e,t="asc"){const n=t,r=Su("orderBy",e);return By._create(r,n)}class jy extends Ly{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new jy(e,t,n)}_apply(e){return new Qc(e.firestore,e.converter,Po(e._query,this._limit,this._limitType))}}function zy(e){return Qt("limit",e),jy._create("limit",e,"F")}class $y extends Ly{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new $y(e,t,n)}_apply(e){const t=Gy(e,this.type,this._docOrFields,this._inclusive);return new Qc(e.firestore,e.converter,function(e,t){return new To(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}(e._query,t))}}class Ky extends Ly{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Ky(e,t,n)}_apply(e){const t=Gy(e,this.type,this._docOrFields,this._inclusive);return new Qc(e.firestore,e.converter,function(e,t){return new To(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}(e._query,t))}}function Gy(e,t,n,r){if(n[0]=D(n[0]),n[0]instanceof Dy)return function(e,t,n,r,s){if(!r)throw new yt(gt.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const o of Ao(e))if(o.field.isKeyField())i.push(Bs(t,r.key));else{const e=r.data.field(o.field);if(ys(e))throw new yt(gt.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+o.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){const e=o.field.canonicalString();throw new yt(gt.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}i.push(e)}return new ji(i,s)}(e._query,e.firestore._databaseId,t,n[0]._document,r);{const s=cu(e.firestore);return function(e,t,n,r,s,i){const o=e.explicitOrderBy;if(s.length>o.length)throw new yt(gt.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let c=0;c<s.length;c++){const i=s[c];if(o[c].field.isKeyField()){if("string"!=typeof i)throw new yt(gt.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof i}`);if(!No(e)&&-1!==i.indexOf("/"))throw new yt(gt.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${i}' contains a slash.`);const n=e.path.child(Ut.fromString(i));if(!qt.isDocumentKey(n))throw new yt(gt.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const s=new qt(n);a.push(Bs(t,s))}else{const e=_u(n,r,i);a.push(e)}}return new ji(a,i)}(e._query,e.firestore._databaseId,s,t,n,r)}}function Hy(e,t,n){if("string"==typeof(n=D(n))){if(""===n)throw new yt(gt.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!No(t)&&-1!==n.indexOf("/"))throw new yt(gt.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(Ut.fromString(n));if(!qt.isDocumentKey(r))throw new yt(gt.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Bs(e,new qt(r))}if(n instanceof Jc)return Bs(e,n._key);throw new yt(gt.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ht(n)}.`)}function Wy(e,t){if(!Array.isArray(e)||0===e.length)throw new yt(gt.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Qy(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new yt(gt.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new yt(gt.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function Jy(e,t){if(!(t instanceof My||t instanceof Fy))throw new yt(gt.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Yy(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class Xy extends Ey{constructor(e){super(),this.firestore=e}convertBytes(e){return new cc(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Jc(this.firestore,null,t)}}
/**
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
 */function Zy(){return new Cy("count")}function ew(e,t){const n=Wt(e.firestore,gy),r=vy(n),s=is(t,(e,t)=>new qi(t,e.aggregateType,e._internalFieldPath));return function(e,t,n){const r=new wt;return e.asyncQueue.enqueueAndForget(async()=>{try{const s=await iy(e);r.resolve(async function(e,t,n){const r=mt(e),{request:s,wt:i,parent:o}=Ga(r.serializer,ko(t),n);r.connection.Ot||delete s.parent;const a=(await r.$t("RunAggregationQuery",r.serializer.databaseId,o,s,1)).filter(e=>!!e.result);pt(1===a.length,64727);const c=a[0].result?.aggregateFields;return Object.keys(c).reduce((e,t)=>(e[i[t]]=c[t],e),{})}(s,t,n))}catch(e){r.reject(e)}}),r.promise}(r,e._query,s).then(t=>function(e,t,n){const r=new Sy(e);return new ky(t,r,n)}
/**
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
 */(n,e,t))}class tw{constructor(e){this.kind="memory",this._onlineComponentProvider=jg.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new Fg(void 0)}}toJSON(){return{kind:this.kind}}}class nw{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=uw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class rw{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Ug.provider}toJSON(){return{kind:this.kind}}}class sw{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Fg(e)}}toJSON(){return{kind:this.kind}}}function iw(e){return new tw(e)}function ow(e){return new nw(e)}class aw{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=jg.provider,this._offlineComponentProvider={build:t=>new Bg(t,e?.cacheSizeBytes,this.forceOwnership)}}}class cw{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=jg.provider,this._offlineComponentProvider={build:t=>new qg(t,e?.cacheSizeBytes)}}}function uw(e){return new aw(e?.forceOwnership)}
/**
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
 */
/**
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
 */
const lw="NOT SUPPORTED";class hw{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class dw extends Dy{constructor(e,t,n,r,s,i){super(e,t,n,r,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new fw(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Su("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new yt(gt.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=dw._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}dw._jsonSchemaVersion="firestore/documentSnapshot/1.0",dw._jsonSchema={type:Jt("string",dw._jsonSchemaVersion),bundleSource:Jt("string","DocumentSnapshot"),bundleName:Jt("string"),bundle:Jt("string")};class fw extends dw{data(e={}){return super.data(e)}}class pw{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new hw(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new fw(this._firestore,this._userDataWriter,n.key,n,new hw(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new yt(gt.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{ld(e._snapshot.query)?Uf(e._snapshot.query):Mo(e.query._query);const r=new fw(e._firestore,e._userDataWriter,n.doc.key,n.doc,new hw(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new fw(e._firestore,e._userDataWriter,t.doc.key,t.doc,new hw(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,i=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),i=n.indexOf(t.doc.key)),{type:mw(t.type),doc:r,oldIndex:s,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new yt(gt.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=pw._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=At.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function mw(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return dt(61501,{type:e})}}
/**
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
 */
pw._jsonSchemaVersion="firestore/querySnapshot/1.0",pw._jsonSchema={type:Jt("string",pw._jsonSchemaVersion),bundleSource:Jt("string","QuerySnapshot"),bundleName:Jt("string"),bundle:Jt("string")};const gw={maxAttempts:5};
/**
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
 */class yw{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=cu(e)}set(e,t,n){this._verifyNotCommitted();const r=ww(e,this._firestore),s=Yy(r.converter,t,n),i=uu(this._dataReader,"WriteBatch.set",r._key,s,null!==r.converter,n);return this._mutations.push(i.toMutation(r._key,xi.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const s=ww(e,this._firestore);let i;return i="string"==typeof(t=D(t))||t instanceof uc?vu(this._dataReader,"WriteBatch.update",s._key,t,n,r):wu(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(i.toMutation(s._key,xi.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ww(e,this._firestore);return this._mutations=this._mutations.concat(new Fi(t._key,xi.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new yt(gt.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ww(e,t){if((e=D(e)).firestore!==t)throw new yt(gt.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
/**
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
 */class vw{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=cu(e)}get(e){const t=ww(e,this._firestore),n=new Xy(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return dt(24041);const r=e[0];if(r.isFoundDocument())return new Dy(this._firestore,n,r.key,r,t.converter);if(r.isNoDocument())return new Dy(this._firestore,n,t._key,null,t.converter);throw dt(18433,{doc:r})})}set(e,t,n){const r=ww(e,this._firestore),s=Yy(r.converter,t,n),i=uu(this._dataReader,"Transaction.set",r._key,s,null!==r.converter,n);return this._transaction.set(r._key,i),this}update(e,t,n,...r){const s=ww(e,this._firestore);let i;return i="string"==typeof(t=D(t))||t instanceof uc?vu(this._dataReader,"Transaction.update",s._key,t,n,r):wu(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,i),this}delete(e){const t=ww(e,this._firestore);return this._transaction.delete(t._key),this}}
/**
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
 */class _w extends vw{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=ww(e,this._firestore),n=new Sy(this._firestore);return super.get(e).then(e=>new dw(this._firestore,n,t._key,e._document,new hw(!1,!1),t.converter))}}
/**
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
 */
function bw(e){e=Wt(e,Jc);const t=Wt(e.firestore,gy);return ay(vy(t),e._key).then(n=>Dw(t,e,n))}function Iw(e){e=Wt(e,Jc);const t=Wt(e.firestore,gy),n=vy(t),r=new Sy(t);return function(e,t){const n=new wt;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await function(e,t){const n=mt(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new yt(gt.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const r=Lm(e,`Failed to get document '${t} from cache`);n.reject(r)}}(await ny(e),t,n)),n.promise}(n,e._key).then(n=>new dw(t,r,e._key,n,new hw(null!==n&&n.hasLocalMutations,!0),e.converter))}function Tw(e){e=Wt(e,Qc);const t=Wt(e.firestore,gy),n=vy(t),r=new Sy(t);return Py(e._query),cy(n,e._query).then(n=>new pw(t,r,e,n))}function Ew(e){e=Wt(e,Qc);const t=Wt(e.firestore,gy),n=vy(t),r=new Sy(t);return function(e,t){const n=new wt;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){try{const r=await Op(e,t,!0),s=new ng(t,r.Jo),i=s.ku(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(e){const r=Lm(e,`Failed to execute query '${t} against cache`);n.reject(r)}}(await ny(e),t,n)),n.promise}(n,e._query).then(n=>new pw(t,r,e,n))}function Sw(e,t,n){e=Wt(e,Jc);const r=Wt(e.firestore,gy),s=Yy(e.converter,t,n);return kw(r,[uu(cu(r),"setDoc",e._key,s,null!==e.converter,n).toMutation(e._key,xi.none())])}function xw(e,t,n,...r){e=Wt(e,Jc);const s=Wt(e.firestore,gy),i=cu(s);let o;return o="string"==typeof(t=D(t))||t instanceof uc?vu(i,"updateDoc",e._key,t,n,r):wu(i,"updateDoc",e._key,t),kw(s,[o.toMutation(e._key,xi.exists(!0))])}function Nw(e){return kw(Wt(e.firestore,gy),[new Fi(e._key,xi.none())])}function Aw(e,t){const n=Wt(e.firestore,gy),r=Zc(e),s=Yy(e.converter,t);return kw(n,[uu(cu(e.firestore),"addDoc",r._key,s,null!==e.converter,{}).toMutation(r._key,xi.exists(!1))]).then(()=>r)}function Cw(e,...t){e=D(e);let n={includeMetadataChanges:!1,source:"default"},r=0;"object"!=typeof t[r]||Ay(t[r])||(n=t[r++]);const s={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Ay(t[r])){const e=t[r];t[r]=e.next?.bind(e),t[r+1]=e.error?.bind(e),t[r+2]=e.complete?.bind(e)}let i,o,a;if(e instanceof Jc)o=Wt(e.firestore,gy),a=So(e._key.path),i={next:n=>{t[r]&&t[r](Dw(o,e,n))},error:t[r+1],complete:t[r+2]};else{const n=Wt(e,Qc);o=Wt(n.firestore,gy),a=n._query;const s=new Sy(o);i={next:e=>{t[r]&&t[r](new pw(o,s,n,e))},error:t[r+1],complete:t[r+2]},Py(e._query)}return function(e,t,n,r){const s=new $g(r),i=new Qm(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>jm(await oy(e),i)),()=>{s.gc(),e.asyncQueue.enqueueAndForget(async()=>zm(await oy(e),i))}}(vy(o),a,s,i)}function kw(e,t){return uy(vy(e),t)}function Dw(e,t,n){const r=n.docs.get(t._key),s=new Sy(e);return new dw(e,s,t._key,r,new hw(n.hasPendingWrites,n.fromCache),t.converter)}function Rw(e){return vy(e=Wt(e,gy)),new yw(e,t=>kw(e,t))
/**
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
 */}function Pw(e,t){if("string"!=typeof e[t])throw new yt(gt.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}
/**
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
 */class Ow{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function Lw(e,t){(function(e,t){return e.asyncQueue.enqueue(async()=>function(e,t){mt(e).qo.Do=t}(await ny(e),t))})(vy(e._firestore),t).then(e=>ct(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(e=>lt(`setting persistent cache index auto creation isEnabled=${t} failed`,e))}const Vw=new WeakMap;
/**
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
 */class Mw{constructor(){this.i=new Map}static get instance(){return Uw||(Uw=new Mw,function(e){if(sa)throw new Error("a TestingHooksSpi instance is already set");sa=e}(Uw)),Uw}u(e){this.i.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.i;return n.set(t,e),()=>n.delete(t)}}let Uw=null;!function(e,t=!0){(function(e){it=e})(De),xe(new O("firestore",(e,{instanceIdentifier:n,options:r})=>{const s=e.getProvider("app").getImmediate(),i=new gy(new It(e.getProvider("auth-internal")),new xt(s,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new yt(gt.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Is(e.options.projectId,t)}(s,n),s);return r={useFetchStreams:t,...r},i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),Le(xy,Ny,e),Le(xy,Ny,"esm2020")}();const Fw=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Ey,AggregateField:Cy,AggregateQuerySnapshot:ky,Bytes:cc,CACHE_SIZE_UNLIMITED:-1,CollectionReference:Yc,DocumentReference:Jc,DocumentSnapshot:dw,FieldPath:uc,FieldValue:hc,Firestore:gy,FirestoreError:yt,GeoPoint:dc,LoadBundleTask:my,PersistentCacheIndexManager:Ow,Query:Qc,QueryCompositeFilterConstraint:Fy,QueryConstraint:Ly,QueryDocumentSnapshot:fw,QueryEndAtConstraint:Ky,QueryFieldFilterConstraint:My,QueryLimitConstraint:jy,QueryOrderByConstraint:By,QuerySnapshot:pw,QueryStartAtConstraint:$y,SnapshotMetadata:hw,Timestamp:en,Transaction:_w,VectorValue:tu,WriteBatch:yw,_AutoId:At,_ByteString:cs,_DatabaseId:Is,_DocumentKey:qt,_EmptyAppCheckTokenProvider:class{getToken(){return Promise.resolve(new St(""))}invalidateToken(){}start(e,t){}shutdown(){}},_EmptyAuthCredentialsProvider:_t,_FieldPath:Bt,_TestingHooks:class{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Mw.instance.onExistenceFilterMismatch(e)}},_cast:Wt,_debugAssert:function(e,t){e||dt(57014,t)},_internalAggregationQueryToProtoRunAggregationQueryRequest:function(e,t){const n=is(t,(e,t)=>new qi(t,e.aggregateType,e._internalFieldPath)),r=vy(Wt(e.firestore,gy)),s=r._onlineComponents?.datastore.serializer;return void 0===s?null:Ga(s,ko(e._query),n,!0).request},_internalQueryToProtoQueryTarget:function(e){const t=vy(Wt(e.firestore,gy)),n=t._onlineComponents?.datastore.serializer;return void 0===n?null:Ka(n,Co(e._query)).yt},_isBase64Available:function(){return"undefined"!=typeof atob},_logWarn:lt,_validateIsNotUsedTogether:zt,addDoc:Aw,aggregateFieldEqual:function(e,t){return e instanceof Cy&&t instanceof Cy&&e.aggregateType===t.aggregateType&&e._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()},aggregateQuerySnapshotEqual:function(e,t){return eu(e.query,t.query)&&E(e.data(),t.data())}
/**
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
 */,and:function(...e){return e.forEach(e=>Jy("and",e)),Fy._create("and",e)},arrayRemove:function(...e){return new pu("arrayRemove",e)},arrayUnion:function(...e){return new fu("arrayUnion",e)},average:function(e){return new Cy("avg",Su("average",e))},clearIndexedDbPersistence:function(e){if(e._initialized&&!e._terminated)throw new yt(gt.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new wt;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!bn.C())return Promise.resolve();const t=e+gp;await bn.delete(t)}(_p(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise},collection:Xc,collectionGroup:function(e,t){if(e=Wt(e,Hc),jt("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new yt(gt.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Qc(e,null,function(e){return new To(Ut.emptyPath(),e)}(t))},connectFirestoreEmulator:Wc,count:Zy,deleteAllPersistentCacheIndexes:function(e){(function(e){return e.asyncQueue.enqueue(async()=>function(e){const t=mt(e),n=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>n.deleteAllFieldIndexes(e))}(await ny(e)))})(vy(e._firestore)).then(e=>ct("deleting all persistent cache indexes succeeded")).catch(e=>lt("deleting all persistent cache indexes failed",e))},deleteDoc:Nw,deleteField:function(){return new lu("deleteField")},disableNetwork:function(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await ty(e),n=await ry(e);return t.setNetworkEnabled(!1),async function(e){const t=mt(e);t.tu.add(0),await im(t),t.iu.set("Offline")}(n)})}(vy(e=Wt(e,gy)))},disablePersistentCacheIndexAutoCreation:function(e){Lw(e,!1)},doc:Zc,documentId:lc,documentSnapshotFromJSON:function(e,t,n){if(Yt(t,dw._jsonSchema)){if(t.bundle===lw)throw new yt(gt.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=ac(e._databaseId),s=hy(t.bundle,r),i=s.t(),o=new Xm(s.getMetadata(),r);for(const e of i)o.o(e);const a=o.documents;if(1!==a.length)throw new yt(gt.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${a.length} documents.`);const c=qa(r,a[0].document),u=new qt(Ut.fromString(t.bundleName));return new dw(e,new Xy(e),u,c,new hw(!1,!1),n||null)}},enableIndexedDbPersistence:function(e,t){lt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return by(e,jg.provider,{build:e=>new Bg(e,n.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()},enableMultiTabIndexedDbPersistence:async function(e){lt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();by(e,jg.provider,{build:e=>new qg(e,t.cacheSizeBytes)})},enableNetwork:function(e){return function(e){return e.asyncQueue.enqueue(async()=>{const t=await ty(e),n=await ry(e);return t.setNetworkEnabled(!0),function(e){const t=mt(e);return t.tu.delete(0),sm(t)}(n)})}(vy(e=Wt(e,gy)))},enablePersistentCacheIndexAutoCreation:function(e){Lw(e,!0)},endAt:function(...e){return Ky._create("endAt",e,!0)},endBefore:function(...e){return Ky._create("endBefore",e,!1)},ensureFirestoreConfigured:vy,executeWrite:kw,getAggregateFromServer:ew,getCountFromServer:function(e){return ew(e,{count:Zy()})},getDoc:bw,getDocFromCache:Iw,getDocFromServer:function(e){e=Wt(e,Jc);const t=Wt(e.firestore,gy);return ay(vy(t),e._key,{source:"server"}).then(n=>Dw(t,e,n))},getDocs:Tw,getDocsFromCache:Ew,getDocsFromServer:function(e){e=Wt(e,Qc);const t=Wt(e.firestore,gy),n=vy(t),r=new Sy(t);return cy(n,e._query,{source:"server"}).then(n=>new pw(t,r,e,n))},getFirestore:wy,getPersistentCacheIndexManager:function(e){e=Wt(e,gy);const t=Vw.get(e);if(t)return t;const n=vy(e);if("persistent"!==n._uninitializedComponentsProvider?._offline.kind)return null;const r=new Ow(e);return Vw.set(e,r),r},increment:function(e){return new mu("increment",e)},initializeFirestore:yy,limit:zy,limitToLast:function(e){return Qt("limitToLast",e),jy._create("limitToLast",e,"L")},loadBundle:Iy,maximum:function(e){return new yu("maximum",e)},memoryEagerGarbageCollector:function(){return new rw},memoryLocalCache:iw,memoryLruGarbageCollector:function(e){return new sw(e?.cacheSizeBytes)},minimum:function(e){return new gu("minimum",e)},namedQuery:Ty,onSnapshot:Cw,onSnapshotResume:function(e,t,...n){const r=D(e),s=function(e){const t={bundle:"",bundleName:"",bundleSource:""},n=["bundle","bundleName","bundleSource"];for(const r of n){if(!(r in e)){t.error=`snapshotJson missing required field: ${r}`;break}const n=e[r];if("string"!=typeof n){t.error=`snapshotJson field '${r}' must be a string.`;break}if(0===n.length){t.error=`snapshotJson field '${r}' cannot be an empty string.`;break}"bundle"===r?t.bundle=n:"bundleName"===r?t.bundleName=n:"bundleSource"===r&&(t.bundleSource=n)}return t}(t);if(s.error)throw new yt(gt.INVALID_ARGUMENT,s.error);let i,o=0;if("object"!=typeof n[o]||Ay(n[o])||(i=n[o++]),"QuerySnapshot"===s.bundleSource){let e=null;if("object"==typeof n[o]&&Ay(n[o])){const t=n[o++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[o++],error:n[o++],complete:n[o++]};return function(e,t,n,r,s){let i,o=!1;return Iy(e,t.bundle).then(()=>Ty(e,t.bundleName)).then(e=>{e&&!o&&(s&&e.withConverter(s),i=Cw(e,n||{},r))}).catch(e=>(r.error&&r.error(e),()=>{})),()=>{o||(o=!0,i&&i())}
/**
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
 */}(r,s,i,e,n[o])}if("DocumentSnapshot"===s.bundleSource){let e=null;if("object"==typeof n[o]&&Ay(n[o])){const t=n[o++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[o++],error:n[o++],complete:n[o++]};return function(e,t,n,r,s){let i,o=!1;return Iy(e,t.bundle).then(()=>{if(!o){const o=new Jc(e,s||null,qt.fromPath(t.bundleName));i=Cw(o,n||{},r)}}).catch(e=>(r.error&&r.error(e),()=>{})),()=>{o||(o=!0,i&&i())}}(r,s,i,e,n[o])}throw new yt(gt.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)},onSnapshotsInSync:function(e,t){return function(e,t){const n=new $g(t);return e.asyncQueue.enqueueAndForget(async()=>function(e,t){mt(e).Pu.add(t),t.next()}(await oy(e),n)),()=>{n.gc(),e.asyncQueue.enqueueAndForget(async()=>function(e,t){mt(e).Pu.delete(t)}(await oy(e),n))}}(vy(e=Wt(e,gy)),Ay(t)?t:{next:t})},or:function(...e){return e.forEach(e=>Jy("or",e)),Fy._create("or",e)},orderBy:qy,persistentLocalCache:ow,persistentMultipleTabManager:function(){return new cw},persistentSingleTabManager:uw,query:Vy,queryEqual:eu,querySnapshotFromJSON:function(e,t,n){if(Yt(t,pw._jsonSchema)){if(t.bundle===lw)throw new yt(gt.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=ac(e._databaseId),s=hy(t.bundle,r),i=s.t(),o=new Xm(s.getMetadata(),r);for(const e of i)o.o(e);if(1!==o.queries.length)throw new yt(gt.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const a=Ad(o.queries[0].bundledQuery),c=o.documents;let u=new Vm;c.map(e=>{const t=qa(r,e.document);u=u.add(t)});const l=Um.fromInitialDocuments(a,u,ta(),!1,!1),h=new Qc(e,n||null,a);return new pw(e,new Xy(e),h,l)}},refEqual:function(e,t){return e=D(e),t=D(t),(e instanceof Jc||e instanceof Yc)&&(t instanceof Jc||t instanceof Yc)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter},runTransaction:function(e,t,n){e=Wt(e,gy);const r={...gw,...n};return function(e){if(e.maxAttempts<1)throw new yt(gt.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(e,t,n){const r=new wt;return e.asyncQueue.enqueueAndForget(async()=>{const s=await iy(e);new Wg(e.asyncQueue,s,n,t,r).Nc()}),r.promise}(vy(e),n=>t(new _w(e,n)),r)},serverTimestamp:Ru,setDoc:Sw,setIndexConfiguration:function(e,t){const n=vy(e=Wt(e,gy));if(!n._uninitializedComponentsProvider||"memory"===n._uninitializedComponentsProvider._offline.kind)return lt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(e){const t="string"==typeof e?function(e){try{return JSON.parse(e)}catch(e){throw new yt(gt.INVALID_ARGUMENT,"Failed to parse JSON: "+e?.message)}}(e):e,n=[];if(Array.isArray(t.indexes))for(const r of t.indexes){const e=Pw(r,"collectionGroup"),t=[];if(Array.isArray(r.fields))for(const n of r.fields){const e=Nu("setIndexConfiguration",Pw(n,"fieldPath"));"CONTAINS"===n.arrayConfig?t.push(new cn(e,2)):"ASCENDING"===n.order?t.push(new cn(e,0)):"DESCENDING"===n.order&&t.push(new cn(e,1))}n.push(new rn(rn.UNKNOWN_ID,e,t,ln.empty()))}return n}(t);return function(e,t){return e.asyncQueue.enqueue(async()=>async function(e,t){const n=mt(e),r=n.indexManager,s=[];return n.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(n=>function(e,t,n,r,s){e=[...e],t=[...t],e.sort(n),t.sort(n);const i=e.length,o=t.length;let a=0,c=0;for(;a<o&&c<i;){const i=n(e[c],t[a]);i<0?s(e[c++]):i>0?r(t[a++]):(a++,c++)}for(;a<o;)r(t[a++]);for(;c<i;)s(e[c++])}(n,t,an,t=>{s.push(r.addFieldIndex(e,t))},t=>{s.push(r.deleteFieldIndex(e,t))})).next(()=>wn.waitFor(s)))}(await ny(e),t))}(n,r)},setLogLevel:function(e){ot.setLogLevel(e)},snapshotEqual:function(e,t){return e instanceof dw&&t instanceof dw?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof pw&&t instanceof pw&&e._firestore===t._firestore&&eu(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)},startAfter:function(...e){return $y._create("startAfter",e,!1)},startAt:function(...e){return $y._create("startAt",e,!0)},sum:function(e){return new Cy("sum",Su("sum",e))},terminate:function(e){return function(e,t,n=_e){Ne(e,t).clearInstance(n)}(e.app,"firestore",e._databaseId.database),e._delete()},updateDoc:xw,vector:Pu,waitForPendingWrites:function(e){return function(e){const t=new wt;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t){const n=mt(e);fm(n.remoteStore)||ct(rg,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await function(e){const t=mt(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))}(n.localStore);if(e===On)return void t.resolve();const r=n.ac.get(e)||[];r.push(t),n.ac.set(e,r)}catch(e){const n=Lm(e,"Initialization of waitForPendingWrites() operation failed");t.reject(n)}}(await sy(e),t)),t.promise}(vy(e=Wt(e,gy)))},where:Uy,writeBatch:Rw},Symbol.toStringTag,{value:"Module"}));
/**
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
 */
Le("firebase","12.16.0","app");
/**
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
 */
const Bw="firebasestorage.googleapis.com",qw="storageBucket";
/**
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
 */
class jw extends b{constructor(e,t,n=0){super(Kw(e),`Firebase Storage: ${t} (${Kw(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,jw.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Kw(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var zw,$w;function Kw(e){return"storage/"+e}function Gw(){return new jw(zw.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function Hw(e){return new jw(zw.INVALID_ARGUMENT,e)}function Ww(){return new jw(zw.APP_DELETED,"The Firebase app was deleted.")}function Qw(e,t){return new jw(zw.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function Jw(e){throw new jw(zw.INTERNAL_ERROR,"Internal error: "+e)}
/**
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
 */!function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(zw||(zw={}));class Yw{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=Yw.makeFromUrl(e,t)}catch(Wm){return new Yw(e,"")}if(""===n.path)return n;throw r=e,new jw(zw.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const s=new RegExp("^gs://"+r+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}const o=t.replace(/[.]/g,"\\."),a=[{regex:s,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:i},{regex:new RegExp(`^https?://${t===Bw?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:i}];for(let c=0;c<a.length;c++){const t=a[c],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let s=r[t.indices.path];s||(s=""),n=new Yw(e,s),t.postModify(n);break}}if(null==n)throw function(e){return new jw(zw.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class Xw{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
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
 */function Zw(e){return"string"==typeof e||e instanceof String}function ev(e){return tv()&&e instanceof Blob}function tv(){return"undefined"!=typeof Blob}function nv(e,t,n,r){if(r<t)throw Hw(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw Hw(`Invalid value for '${e}'. Expected ${n} or less.`)}
/**
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
 */function rv(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function sv(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){n=n+(t(r)+"="+t(e[r]))+"&"}return n=n.slice(0,-1),n}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}($w||($w={}));
/**
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
 */
class iv{constructor(e,t,n,r,s,i,o,a,c,u,l,h=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=i,this.callback_=o,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=l,this.retry=h,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new ov(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===$w.NO_ERROR,s=n.getStatus();if(!t||
/**
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
 */
function(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),s=-1!==t.indexOf(e);return n||r||s}(s,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===$w.ABORT;return void e(!1,new ov(!1,null,t))}const i=-1!==this.successCodes_.indexOf(s);e(!0,new ov(i,n))})},t=(e,t)=>{const n=this.resolve_,r=this.reject_,s=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(s,s.getResponse());void 0!==e?n(e):n()}catch(Wm){r(Wm)}else if(null!==s){const e=Gw();e.serverResponse=s.getErrorText(),this.errorCallback_?r(this.errorCallback_(s,e)):r(e)}else if(t.canceled){r(this.appDelete_?Ww():new jw(zw.CANCELED,"User canceled the upload/download."))}else{r(new jw(zw.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))}};this.canceled_?t(0,new ov(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,s=null,i=null,o=!1,a=0;function c(){return 2===a}let u=!1;function l(...e){u||(u=!0,t.apply(null,e))}function h(t){s=setTimeout(()=>{s=null,e(f,c())},t)}function d(){i&&clearTimeout(i)}function f(e,...t){if(u)return void d();if(e)return d(),void l.call(null,e,...t);if(c()||o)return d(),void l.call(null,e,...t);let n;r<64&&(r*=2),1===a?(a=2,n=0):n=1e3*(r+Math.random()),h(n)}let p=!1;function m(e){p||(p=!0,d(),u||(null!==s?(e||(a=2),clearTimeout(s),h(0)):e||(a=1)))}return h(0),i=setTimeout(()=>{o=!0,m(!0)},n),m}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class ov{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}
/**
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
 */
function av(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function cv(...e){const t=av();if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(tv())return new Blob(e);throw new jw(zw.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}
/**
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
 */
function uv(e){if("undefined"==typeof atob)throw t="base-64",new jw(zw.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var t;return atob(e)}
/**
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
 */const lv="raw",hv="base64",dv="base64url",fv="data_url";class pv{constructor(e,t){this.data=e,this.contentType=t||null}}function mv(e,t){switch(e){case lv:return new pv(gv(t));case hv:case dv:return new pv(yv(e,t));case fv:return new pv(function(e){const t=new wv(e);return t.base64?yv(hv,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(Wm){throw Qw(fv,"Malformed data URL.")}return gv(t)}(t.rest)}(t),new wv(t).contentType)}throw Gw()}function gv(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296==(64512&r)){if(n<e.length-1&&56320==(64512&e.charCodeAt(n+1))){r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320==(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function yv(e,t){switch(e){case hv:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){throw Qw(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case dv:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){throw Qw(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=uv(t)}catch(Wm){if(Wm.message.includes("polyfill"))throw Wm;throw Qw(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class wv{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw Qw(fv,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){if(!(e.length>=t.length))return!1;return e.substring(e.length-t.length)===t}
/**
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
 */(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class vv{constructor(e,t){let n=0,r="";ev(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(ev(this.data_)){const n=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,e,t);return null===n?null:new vv(n)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new vv(n,!0)}}static getBlob(...e){if(tv()){const t=e.map(e=>e instanceof vv?e.data_:e);return new vv(cv.apply(null,t))}{const t=e.map(e=>Zw(e)?mv(lv,e).data:e.data_);let n=0;t.forEach(e=>{n+=e.byteLength});const r=new Uint8Array(n);let s=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)r[s++]=e[t]}),new vv(r,!0)}}uploadData(){return this.data_}}
/**
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
 */function _v(e){let t;try{t=JSON.parse(e)}catch(Wm){return null}return"object"!=typeof(n=t)||Array.isArray(n)?null:t;var n}
/**
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
 */function bv(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
/**
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
 */function Iv(e,t){return t}class Tv{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||Iv}}let Ev=null;function Sv(){if(Ev)return Ev;const e=[];e.push(new Tv("bucket")),e.push(new Tv("generation")),e.push(new Tv("metageneration")),e.push(new Tv("name","fullPath",!0));const t=new Tv("name");t.xform=function(e,t){return function(e){return!Zw(e)||e.length<2?e:bv(e)}(t)},e.push(t);const n=new Tv("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new Tv("timeCreated")),e.push(new Tv("updated")),e.push(new Tv("md5Hash",null,!0)),e.push(new Tv("cacheControl",null,!0)),e.push(new Tv("contentDisposition",null,!0)),e.push(new Tv("contentEncoding",null,!0)),e.push(new Tv("contentLanguage",null,!0)),e.push(new Tv("contentType",null,!0)),e.push(new Tv("metadata","customMetadata",!0)),Ev=e,Ev}function xv(e,t,n){const r={type:"file"},s=n.length;for(let i=0;i<s;i++){const e=n[i];r[e.local]=e.xform(r,t[e.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,r=e.fullPath,s=new Yw(n,r);return t._makeStorageReference(s)}})}(r,e),r}function Nv(e,t,n){const r=_v(t);if(null===r)return null;return xv(e,r,n)}class Av{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
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
 */function Cv(e){if(!e)throw Gw()}function kv(e,t){return function(n,r){const s=Nv(e,r,t);return Cv(null!==s),function(e,t,n,r){const s=_v(t);if(null===s)return null;if(!Zw(s.downloadTokens))return null;const i=s.downloadTokens;if(0===i.length)return null;const o=encodeURIComponent;return i.split(",").map(t=>{const s=e.bucket,i=e.fullPath;return rv("/b/"+o(s)+"/o/"+o(i),n,r)+sv({alt:"media",token:t})})[0]}(s,r,e.host,e._protocol)}}function Dv(e){return function(t,n){let r;var s,i;return 401===t.getStatus()?r=t.getErrorText().includes("Firebase App Check token is invalid")?new jw(zw.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new jw(zw.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(i=e.bucket,r=new jw(zw.QUOTA_EXCEEDED,"Quota for bucket '"+i+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(s=e.path,r=new jw(zw.UNAUTHORIZED,"User does not have permission to access '"+s+"'.")):r=n,r.status=t.getStatus(),r.serverResponse=n.serverResponse,r}}function Rv(e){const t=Dv(e);return function(n,r){let s=t(n,r);var i;return 404===n.getStatus()&&(i=e.path,s=new jw(zw.OBJECT_NOT_FOUND,"Object '"+i+"' does not exist.")),s.serverResponse=r.serverResponse,s}}function Pv(e,t,n,r,s){const i=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};const a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();o["Content-Type"]="multipart/related; boundary="+a;const c=function(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),r}(t,r,s),u=function(e,t){const n={},r=t.length;for(let s=0;s<r;s++){const r=t[s];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}(c,n),l="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+u+"\r\n--"+a+"\r\nContent-Type: "+c.contentType+"\r\n\r\n",h="\r\n--"+a+"--",d=vv.getBlob(l,r,h);if(null===d)throw new jw(zw.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.");const f={name:c.fullPath},p=rv(i,e.host,e._protocol),m=e.maxUploadRetryTime,g=new Av(p,"POST",function(e,t){return function(n,r){const s=Nv(e,r,t);return Cv(null!==s),s}}(e,n),m);return g.urlParams=f,g.headers=o,g.body=d.uploadData(),g.errorHandler=Dv(t),g}class Ov{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=$w.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=$w.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=$w.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r,s){if(this.sent_)throw Jw("cannot .send() more than once");if(R(e)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==s)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Jw("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Jw("cannot .getStatus() before sending");try{return this.xhr_.status}catch(Wm){return-1}}getResponse(){if(!this.sent_)throw Jw("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Jw("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class Lv extends Ov{initXhr(){this.xhr_.responseType="text"}}function Vv(){return new Lv}
/**
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
 */class Mv{constructor(e,t){this._service=e,this._location=t instanceof Yw?t:Yw.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Mv(e,t)}get root(){const e=new Yw(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return bv(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new Yw(this._location.bucket,e);return new Mv(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new jw(zw.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function Uv(e,t,n){e._throwIfRoot("uploadBytes");const r=Pv(e.storage,e._location,Sv(),new vv(t,!0),n);return e.storage.makeRequestWithTokens(r,Vv).then(t=>({metadata:t,ref:e}))}function Fv(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const r=rv(t.fullServerUrl(),e.host,e._protocol),s=e.maxOperationRetryTime,i=new Av(r,"GET",kv(e,n),s);return i.errorHandler=Rv(t),i}(e.storage,e._location,Sv());return e.storage.makeRequestWithTokens(t,Vv).then(e=>{if(null===e)throw new jw(zw.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}function Bv(e){e._throwIfRoot("deleteObject");const t=function(e,t){const n=rv(t.fullServerUrl(),e.host,e._protocol),r=e.maxOperationRetryTime,s=new Av(n,"DELETE",function(e,t){},r);return s.successCodes=[200,204],s.errorHandler=Rv(t),s}(e.storage,e._location);return e.storage.makeRequestWithTokens(t,Vv)}function qv(e,t){if(e instanceof $v){const n=e;if(null==n._bucket)throw new jw(zw.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+qw+"' property when initializing the app?");const r=new Mv(n,n._bucket);return null!=t?qv(r,t):r}return void 0!==t?function(e,t){const n=function(e,t){const n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new Yw(e._location.bucket,n);return new Mv(e.storage,r)}
/**
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
 */(e,t):e}function jv(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof $v)return new Mv(e,t);throw Hw("To use ref(service, url), the first argument must be a Storage instance.")}return qv(e,t)}function zv(e,t){const n=t?.[qw];return null==n?null:Yw.makeFromBucketSpec(n,e)}class $v{constructor(e,t,n,r,s,i=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=s,this._isUsingEmulator=i,this._bucket=null,this._host=Bw,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?Yw.makeFromBucketSpec(r,this._host):zv(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=Yw.makeFromBucketSpec(this._url,e):this._bucket=zv(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){nv("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){nv("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if(Ae(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Mv(this,e)}_makeRequest(e,t,n,r,s=!0){if(this._deleted)return new Xw(Ww());{const i=function(e,t,n,r,s,i,o=!0,a=!1){const c=sv(e.urlParams),u=e.url+c,l=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(l,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(l,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(l,i),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(l,r),new iv(u,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,o,a)}(e,this._appId,n,r,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const Kv="@firebase/storage",Gv="0.14.3",Hv="storage";function Wv(e,t,n){return Uv(e=D(e),t,n)}function Qv(e,t,n,r){return function(e,t,n=lv,r){e._throwIfRoot("uploadString");const s=mv(n,t),i={...r};return null==i.contentType&&null!=s.contentType&&(i.contentType=s.contentType),Uv(e,s.data,i)}(e=D(e),t,n,r)}function Jv(e){return Fv(e=D(e))}function Yv(e){return Bv(e=D(e))}function Xv(e,t){return jv(e=D(e),t)}function Zv(e=Pe(),t){const n=Ne(e=D(e),Hv).getImmediate({identifier:t}),r=h("storage");return r&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`;const s=R(t);s&&P(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:m(i,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}function e_(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new $v(n,r,s,t,De)}function t_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}xe(new O(Hv,e_,"PUBLIC").setMultipleInstances(!0)),Le(Kv,Gv,""),Le(Kv,Gv,"esm2020");const n_=t_,r_=new I("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),s_=new z("@firebase/auth");function i_(e,...t){s_.logLevel<=U.ERROR&&s_.error(`Auth (${De}): ${e}`,...t)}
/**
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
 */function o_(e,...t){throw l_(e,...t)}function a_(e,...t){return l_(e,...t)}function c_(e,t,n){const r={...n_(),[t]:n};return new I("auth","Firebase",r).create(t,{appName:e.name})}function u_(e){return c_(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function l_(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return r_.create(e,...t)}function h_(e,t,...n){if(!e)throw l_(t,...n)}function d_(e){const t="INTERNAL ASSERTION FAILED: "+e;throw i_(t),new Error(t)}function f_(e,t){e||d_(t)}
/**
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
 */function p_(){return"undefined"!=typeof self&&self.location?.href||""}function m_(){return"undefined"!=typeof self&&self.location?.protocol||null}
/**
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
 */function g_(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==m_()&&"https:"!==m_()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
/**
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
 */
class y_{constructor(e,t){this.shortDelay=e,this.longDelay=t,f_(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(g())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return g_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
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
 */function w_(e,t){f_(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
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
 */class v_{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void d_("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void d_("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void d_("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
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
 */const __={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},b_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],I_=new y_(3e4,6e4);
/**
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
 */function T_(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function E_(e,t,n,r,s={}){return S_(e,s,async()=>{let s={},i={};r&&("GET"===t?i=r:s={body:JSON.stringify(r)});const o=x({...i,key:e.config.apiKey}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...s};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="strict-origin-when-cross-origin"),e.emulatorConfig&&R(e.emulatorConfig.host)&&(c.credentials="include"),v_.fetch()(await N_(e,e.config.apiHost,n,o),c)})}async function S_(e,t,n){e._canInitEmulator=!1;const r={...__,...t};try{const t=new C_(e),s=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const i=await s.json();if("needConfirmation"in i)throw k_(e,"account-exists-with-different-credential",i);if(s.ok&&!("errorMessage"in i))return i;{const t=s.ok?i.errorMessage:i.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw k_(e,"credential-already-in-use",i);if("EMAIL_EXISTS"===n)throw k_(e,"email-already-in-use",i);if("USER_DISABLED"===n)throw k_(e,"user-disabled",i);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw c_(e,a,o);o_(e,a)}}catch(Wm){if(Wm instanceof b)throw Wm;o_(e,"network-request-failed",{message:String(Wm)})}}async function x_(e,t,n,r,s={}){const i=await E_(e,t,n,r,s);return"mfaPendingCredential"in i&&o_(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function N_(e,t,n,r){const s=`${t}${n}?${r}`,i=e,o=i.config.emulator?w_(e.config,s):`${e.config.apiScheme}://${s}`;if(b_.includes(n)&&(await i._persistenceManagerAvailable,"COOKIE"===i._getPersistenceType())){return i._getPersistence()._getFinalTarget(o).toString()}return o}function A_(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class C_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(a_(this.auth,"network-request-failed")),I_.get())})}}function k_(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=a_(e,t,r);return s.customData._tokenResponse=n,s}function D_(e){return void 0!==e&&void 0!==e.enterprise}class R_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return A_(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function P_(e,t){return E_(e,"POST","/v1/accounts:lookup",t)}
/**
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
 */function O_(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(Wm){}}function L_(e){return 1e3*Number(e)}function V_(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return i_("JWT malformed, contained fewer than 3 sections"),null;try{const e=a(n);return e?JSON.parse(e):(i_("Failed to decode base64 JWT payload"),null)}catch(Wm){return i_("Caught error parsing JWT payload as JSON",Wm?.toString()),null}}function M_(e){const t=V_(e);return h_(t,"internal-error"),h_(void 0!==t.exp,"internal-error"),h_(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
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
 */async function U_(e,t,n=!1){if(n)return t;try{return await t}catch(Wm){throw Wm instanceof b&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
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
 */(Wm)&&e.auth.currentUser===e&&await e.auth.signOut(),Wm}}class F_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(Wm){return void("auth/network-request-failed"===Wm?.code&&this.schedule(!0))}this.schedule()}}
/**
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
 */class B_{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=O_(this.lastLoginAt),this.creationTime=O_(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
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
 */async function q_(e){const t=e.auth,n=await e.getIdToken(),r=await U_(e,P_(t,{idToken:n}));h_(r?.users.length,t,"internal-error");const s=r.users[0];e._notifyReloadListener(s);const i=s.providerUserInfo?.length?j_(s.providerUserInfo):[],o=(a=e.providerData,c=i,[...a.filter(e=>!c.some(t=>t.providerId===e.providerId)),...c]);var a,c;const u=e.isAnonymous,l=!(e.email&&s.passwordHash||o?.length),h=!!u&&l,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new B_(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(e,d)}function j_(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
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
 */
/**
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
 */
class z_{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){h_(e.idToken,"internal-error"),h_(void 0!==e.idToken,"internal-error"),h_(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):M_(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){h_(0!==e.length,"internal-error");const t=M_(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(h_(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:s}=await async function(e,t){const n=await S_(e,{},async()=>{const n=x({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,i=await N_(e,r,"/v1/token",`key=${s}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&R(e.emulatorConfig.host)&&(a.credentials="include"),v_.fetch()(i,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:s}=t,i=new z_;return n&&(h_("string"==typeof n,"internal-error",{appName:e}),i.refreshToken=n),r&&(h_("string"==typeof r,"internal-error",{appName:e}),i.accessToken=r),s&&(h_("number"==typeof s,"internal-error",{appName:e}),i.expirationTime=s),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new z_,this.toJSON())}_performRefresh(){return d_("not implemented")}}
/**
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
 */function $_(e,t){h_("string"==typeof e||void 0===e,"internal-error",{appName:t})}class K_{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new F_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new B_(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await U_(this,this.stsTokenManager.getToken(this.auth,e));return h_(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=D(e),r=await n.getIdToken(t),s=V_(r);h_(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i="object"==typeof s.firebase?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:O_(L_(s.auth_time)),issuedAtTime:O_(L_(s.iat)),expirationTime:O_(L_(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}(this,e)}reload(){return async function(e){const t=D(e);await q_(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(h_(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new K_({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){h_(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await q_(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ae(this.auth.app))return Promise.reject(u_(this.auth));const e=await this.getIdToken();return await U_(this,
/**
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
 */
async function(e,t){return E_(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,s=t.phoneNumber??void 0,i=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:l,emailVerified:h,isAnonymous:d,providerData:f,stsTokenManager:p}=t;h_(l&&p,e,"internal-error");const m=z_.fromJSON(this.name,p);h_("string"==typeof l,e,"internal-error"),$_(n,e.name),$_(r,e.name),h_("boolean"==typeof h,e,"internal-error"),h_("boolean"==typeof d,e,"internal-error"),$_(s,e.name),$_(i,e.name),$_(o,e.name),$_(a,e.name),$_(c,e.name),$_(u,e.name);const g=new K_({uid:l,auth:e,email:r,emailVerified:h,displayName:n,isAnonymous:d,photoURL:i,phoneNumber:s,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:u});return f&&Array.isArray(f)&&(g.providerData=f.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const r=new z_;r.updateFromServerResponse(t);const s=new K_({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await q_(s),s}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];h_(void 0!==r.localId,"internal-error");const s=void 0!==r.providerUserInfo?j_(r.providerUserInfo):[],i=!(r.email&&r.passwordHash||s?.length),o=new z_;o.updateFromIdToken(n);const a=new K_({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:i}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new B_(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||s?.length)};return Object.assign(a,c),a}}
/**
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
 */const G_=new Map;function H_(e){f_(e instanceof Function,"Expected a class definition");let t=G_.get(e);return t?(f_(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,G_.set(e,t),t)}
/**
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
 */class W_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}W_.type="NONE";const Q_=W_;
/**
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
 */function J_(e,t,n){return`firebase:${e}:${t}:${n}`}class Y_{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:s}=this.auth;this.fullUserKey=J_(this.userKey,r.apiKey,s),this.fullPersistenceKey=J_("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await P_(this.auth,{idToken:e}).catch(()=>{});return t?K_._fromGetAccountInfoResponse(this.auth,t,e):null}return K_._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Y_(H_(Q_),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let s=r[0]||H_(Q_);const i=J_(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(i);if(t){let n;if("string"==typeof t){const r=await P_(e,{idToken:t}).catch(()=>{});if(!r)break;n=await K_._fromGetAccountInfoResponse(e,r,t)}else n=K_._fromJSON(e,t);c!==s&&(o=n),s=c;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return s._shouldAllowMigration&&a.length?(s=a[0],o&&await s._set(i,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==s)try{await e._remove(i)}catch{}})),new Y_(s,e,n)):new Y_(s,e,n)}}
/**
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
 */function X_(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(nb(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Z_(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(sb(t))return"Blackberry";if(ib(t))return"Webos";if(eb(t))return"Safari";if((t.includes("chrome/")||tb(t))&&!t.includes("edge/"))return"Chrome";if(rb(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function Z_(e=g()){return/firefox\//i.test(e)}function eb(e=g()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function tb(e=g()){return/crios\//i.test(e)}function nb(e=g()){return/iemobile/i.test(e)}function rb(e=g()){return/android/i.test(e)}function sb(e=g()){return/blackberry/i.test(e)}function ib(e=g()){return/webos/i.test(e)}function ob(e=g()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function ab(){return function(){const e=g();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function cb(e=g()){return ob(e)||rb(e)||ib(e)||sb(e)||/windows phone/i.test(e)||nb(e)}
/**
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
 */function ub(e,t=[]){let n;switch(e){case"Browser":n=X_(g());break;case"Worker":n=`${X_(g())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${De}/${r}`}
/**
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
 */class lb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(Wm){r(Wm)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(Wm){t.reverse();for(const r of t)try{r()}catch(n){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:Wm?.message})}}}
/**
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
 */class hb{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}
/**
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
 */class db{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pb(this),this.idTokenSubscription=new pb(this),this.beforeStateQueue=new lb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=r_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=H_(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Y_.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(Wm){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await P_(this,{idToken:e}),n=await K_._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ae(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,s=n?._redirectEventId,i=await this.tryRedirectSignIn(e);t&&t!==s||!i?.user||(n=i.user,r=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(n)}catch(Wm){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(Wm))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return h_(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(Wm){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await q_(e)}catch(Wm){if("auth/network-request-failed"!==Wm?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ae(this.app))return Promise.reject(u_(this));const t=e?D(e):null;return t&&h_(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&h_(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ae(this.app)?Promise.reject(u_(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ae(this.app)?Promise.reject(u_(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(H_(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return E_(e,"GET","/v2/passwordPolicy",T_(e,t))}
/**
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
 */(this),t=new hb(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new I("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return E_(e,"POST","/v2/accounts:revokeToken",T_(e,t))}(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&H_(e)||this._popupRedirectResolver;h_(t,this,"argument-error"),this.redirectPersistenceManager=await Y_.create(this,[H_(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const s="function"==typeof t?t:t.next.bind(t);let i=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(h_(o,this,"internal-error"),o.then(()=>{i||s(this.currentUser)}),"function"==typeof t){const s=e.addObserver(t,n,r);return()=>{i=!0,s()}}{const n=e.addObserver(t);return()=>{i=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return h_(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ub(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(Ae(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&function(e,...t){s_.logLevel<=U.WARN&&s_.warn(`Auth (${De}): ${e}`,...t)}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function fb(e){return D(e)}class pb{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new C(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return h_(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
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
 */let mb={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gb(e){return mb.loadJS(e)}class yb{constructor(){this.enterprise=new wb}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class wb{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const vb="NO_RECAPTCHA",_b="onFirebaseAuthREInstanceReady";class bb{constructor(e){this.type="recaptcha-enterprise",this.auth=fb(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{(async function(e,t){return E_(e,"GET","/v2/recaptchaConfig",T_(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new R_(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const s=window.grecaptcha;D_(s)?s.enterprise.ready(()=>{s.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(vb)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new yb).execute("siteKey",{action:"verify"})}return new Promise((e,s)=>{n(this.auth).then(async n=>{if(!t&&D_(window.grecaptcha)&&bb.scriptInjectionDeferred)await bb.scriptInjectionDeferred.promise,r(n,e,s);else{if("undefined"==typeof window)return void s(new Error("RecaptchaVerifier is only supported in browser"));let t=mb.recaptchaEnterpriseScript;0!==t.length&&(t+=n+`&onload=${_b}`),bb.scriptInjectionDeferred=new p,window[_b]=()=>{bb.scriptInjectionDeferred?.resolve()},gb(t).then(()=>bb.scriptInjectionDeferred?.promise).then(()=>{r(n,e,s)}).catch(e=>{s(e)})}}).catch(e=>{s(e)})})}}async function Ib(e,t,n,r=!1,s=!1){const i=new bb(e);let o;if(s)o=vb;else try{o=await i.verify(n)}catch(c){o=await i.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Tb(e,t,n,r,s){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Ib(e,t,n,"getOobCode"===n);return r(e,s)}return r(e,t).catch(async s=>{if("auth/missing-recaptcha-token"===s.code){const s=await Ib(e,t,n,"getOobCode"===n);return r(e,s)}return Promise.reject(s)})}
/**
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
 */function Eb(e,t,n){const r=fb(e);h_(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=Sb(t),{host:i,port:o}=function(e){const t=Sb(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const e=s[1];return{host:e,port:xb(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:xb(t)}}}(t),a=null===o?"":`:${o}`,c={url:`${s}//${i}${a}/`},u=Object.freeze({host:i,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!r._canInitEmulator)return h_(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void h_(E(c,r.config.emulator)&&E(u,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=c,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,R(i)?P(`${s}//${i}${a}`):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&console.info;"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
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
 */()}function Sb(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function xb(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}bb.scriptInjectionDeferred=null;class Nb{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return d_("not implemented")}_getIdTokenResponse(e){return d_("not implemented")}_linkToIdToken(e,t){return d_("not implemented")}_getReauthenticationResolver(e){return d_("not implemented")}}async function Ab(e,t){return E_(e,"POST","/v1/accounts:signUp",t)}
/**
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
 */async function Cb(e,t){return x_(e,"POST","/v1/accounts:signInWithPassword",T_(e,t))}
/**
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
 */
/**
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
 */
class kb extends Nb{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new kb(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new kb(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Tb(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Cb);case"emailLink":return async function(e,t){return x_(e,"POST","/v1/accounts:signInWithEmailLink",T_(e,t))}(e,{email:this._email,oobCode:this._password});default:o_(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Tb(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Ab);case"emailLink":return async function(e,t){return x_(e,"POST","/v1/accounts:signInWithEmailLink",T_(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:o_(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
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
 */async function Db(e,t){return x_(e,"POST","/v1/accounts:signInWithIdp",T_(e,t))}
/**
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
 */class Rb extends Nb{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Rb(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):o_("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...s}=t;if(!n||!r)return null;const i=new Rb(n,r);return i.idToken=s.idToken||void 0,i.accessToken=s.accessToken||void 0,i.secret=s.secret,i.nonce=s.nonce,i.pendingToken=s.pendingToken||null,i}_getIdTokenResponse(e){return Db(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Db(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Db(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=x(t)}return e}}
/**
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
 */class Pb{constructor(e){const t=N(A(e)),n=t.apiKey??null,r=t.oobCode??null,s=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);h_(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=N(A(e)).link,n=t?N(A(t)).deep_link_id:null,r=N(A(e)).deep_link_id;return(r?N(A(r)).link:null)||r||n||t||e}(e);try{return new Pb(t)}catch{return null}}}
/**
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
 */class Ob{constructor(){this.providerId=Ob.PROVIDER_ID}static credential(e,t){return kb._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Pb.parseLink(t);return h_(n,"argument-error"),kb._fromEmailAndCode(e,n.code,n.tenantId)}}Ob.PROVIDER_ID="password",Ob.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Ob.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
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
 */
class Lb{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
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
 */class Vb extends Lb{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
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
 */class Mb extends Vb{constructor(){super("facebook.com")}static credential(e){return Rb._fromParams({providerId:Mb.PROVIDER_ID,signInMethod:Mb.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Mb.credentialFromTaggedObject(e)}static credentialFromError(e){return Mb.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Mb.credential(e.oauthAccessToken)}catch{return null}}}Mb.FACEBOOK_SIGN_IN_METHOD="facebook.com",Mb.PROVIDER_ID="facebook.com";
/**
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
 */
class Ub extends Vb{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Rb._fromParams({providerId:Ub.PROVIDER_ID,signInMethod:Ub.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ub.credentialFromTaggedObject(e)}static credentialFromError(e){return Ub.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Ub.credential(t,n)}catch{return null}}}Ub.GOOGLE_SIGN_IN_METHOD="google.com",Ub.PROVIDER_ID="google.com";
/**
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
 */
class Fb extends Vb{constructor(){super("github.com")}static credential(e){return Rb._fromParams({providerId:Fb.PROVIDER_ID,signInMethod:Fb.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fb.credentialFromTaggedObject(e)}static credentialFromError(e){return Fb.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Fb.credential(e.oauthAccessToken)}catch{return null}}}Fb.GITHUB_SIGN_IN_METHOD="github.com",Fb.PROVIDER_ID="github.com";
/**
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
 */
class Bb extends Vb{constructor(){super("twitter.com")}static credential(e,t){return Rb._fromParams({providerId:Bb.PROVIDER_ID,signInMethod:Bb.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Bb.credentialFromTaggedObject(e)}static credentialFromError(e){return Bb.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Bb.credential(t,n)}catch{return null}}}Bb.TWITTER_SIGN_IN_METHOD="twitter.com",Bb.PROVIDER_ID="twitter.com";
/**
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
 */
class qb{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const s=await K_._fromIdTokenResponse(e,n,r),i=jb(n);return new qb({user:s,providerId:i,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=jb(n);return new qb({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function jb(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
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
 */class zb extends b{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,zb.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new zb(e,t,n,r)}}function $b(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw zb._fromErrorAndOperation(e,n,t,r);throw n})}
/**
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
 */
async function Kb(e,t,n=!1){if(Ae(e.app))return Promise.reject(u_(e));const r="signIn",s=await $b(e,r,t),i=await qb._fromIdTokenResponse(e,r,s);return n||await e._updateCurrentUser(i.user),i}function Gb(e,t,n){return Ae(e.app)?Promise.reject(u_(e)):async function(e,t){return Kb(fb(e),t)}
/**
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
 */(D(e),Ob.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&async function(e){const t=fb(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}(e),t})}function Hb(e){return D(e).signOut()}const Wb="__sak";
/**
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
 */class Qb{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Wb,"1"),this.storage.removeItem(Wb),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
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
 */class Jb extends Qb{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cb(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);ab()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jb.type="LOCAL";const Yb=Jb;
/**
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
 */class Xb extends Qb{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xb.type="SESSION";const Zb=Xb;
/**
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
 */
/**
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
 */
class eI{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new eI(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:s}=t.data,i=this.handlersMap[r];if(!i?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(i).map(async e=>e(t.origin,s)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
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
 */
function tI(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
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
 */eI.receivers=[];class nI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,i;return new Promise((o,a)=>{const c=tI("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);i={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),o(t.data.response);break;default:clearTimeout(u),clearTimeout(s),a(new Error("invalid_response"))}}},this.handlers.add(i),r.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}
/**
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
 */function rI(){return window}
/**
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
 */
function sI(){return void 0!==rI().WorkerGlobalScope&&"function"==typeof rI().importScripts}
/**
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
 */
const iI="firebaseLocalStorageDb",oI="firebaseLocalStorage",aI="fbase_key";class cI{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function uI(e,t){return e.transaction([oI],t?"readwrite":"readonly").objectStore(oI)}function lI(){const e=indexedDB.open(iI,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(oI,{keyPath:aI})}catch(Wm){n(Wm)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(oI)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(iI);return new cI(e).toPromise()}(),t(await lI()))})})}async function hI(e,t,n){const r=uI(e,!0).put({[aI]:t,value:n});return new cI(r).toPromise()}function dI(e,t){const n=uI(e,!0).delete(t);return new cI(n).toPromise()}class fI{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise||(this.dbPromise=lI(),this.dbPromise.catch(()=>{this.dbPromise=null})),this.dbPromise}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(Wm){if(t++>3)throw Wm;if(this.dbPromise){(await this.dbPromise).close(),this.dbPromise=null}}}async initializeServiceWorkerMessaging(){return sI()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=eI._getInstance(sI()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await async function(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new nI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return!!indexedDB&&(await this._withRetries(async e=>{await hI(e,Wb,"1"),await dI(e,Wb)}),!0)}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>hI(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=uI(e,!1).get(t),r=await new cI(n).toPromise();return void 0===r?null:r.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>dI(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=uI(e,!1).getAll();return new cI(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:s}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}fI.type="LOCAL";const pI=fI;
/**
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
 */
function mI(e,t){return t?H_(t):(h_(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
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
 */new y_(3e4,6e4);class gI extends Nb{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Db(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Db(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Db(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function yI(e){return Kb(e.auth,new gI(e),e.bypassAuthState)}function wI(e){const{auth:t,user:n}=e;return h_(n,t,"internal-error"),
/**
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
 */
async function(e,t,n=!1){const{auth:r}=e;if(Ae(r.app))return Promise.reject(u_(r));const s="reauthenticate";try{const i=await U_(e,$b(r,s,t,e),n);h_(i.idToken,r,"internal-error");const o=V_(i.idToken);h_(o,r,"internal-error");const{sub:a}=o;return h_(e.uid===a,r,"user-mismatch"),qb._forOperation(e,s,i)}catch(Wm){throw"auth/user-not-found"===Wm?.code&&o_(r,"user-mismatch"),Wm}}(n,new gI(e),e.bypassAuthState)}async function vI(e){const{auth:t,user:n}=e;return h_(n,t,"internal-error"),async function(e,t,n=!1){const r=await U_(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return qb._forOperation(e,"link",r)}(n,new gI(e),e.bypassAuthState)}
/**
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
 */class _I{constructor(e,t,n,r,s=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(Wm){this.reject(Wm)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:s,error:i,type:o}=e;if(i)return void this.reject(i);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(Wm){this.reject(Wm)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return yI;case"linkViaPopup":case"linkViaRedirect":return vI;case"reauthViaPopup":case"reauthViaRedirect":return wI;default:o_(this.auth,"internal-error")}}resolve(e){f_(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){f_(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
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
 */const bI=new y_(2e3,1e4);async function II(e,t,n){if(Ae(e.app))return Promise.reject(a_(e,"operation-not-supported-in-this-environment"));const r=fb(e);!function(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&o_(e,"argument-error"),c_(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,Lb);const s=mI(r,n);return new TI(r,"signInViaPopup",t,s).executeNotNull()}class TI extends _I{constructor(e,t,n,r,s){super(e,t,r,s),this.provider=n,this.authWindow=null,this.pollId=null,TI.currentPopupAction&&TI.currentPopupAction.cancel(),TI.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return h_(e,this.auth,"internal-error"),e}async onExecution(){f_(1===this.filter.length,"Popup operations only handle one event");const e=tI();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(a_(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(a_(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,TI.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(a_(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,bI.get())};e()}}TI.currentPopupAction=null;
/**
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
 */
const EI="pendingRedirect",SI=new Map;class xI extends _I{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=SI.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return J_(EI,e.config.apiKey,e.name)}(t),r=function(e){return H_(e._redirectPersistence)}(e);if(!(await r._isAvailable()))return!1;const s="true"===await r._get(n);return await r._remove(n),s}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(Wm){e=()=>Promise.reject(Wm)}SI.set(this.auth._key(),e)}return this.bypassAuthState||SI.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function NI(e,t){SI.set(e._key(),t)}async function AI(e,t,n=!1){if(Ae(e.app))return Promise.reject(u_(e));const r=fb(e),s=mI(r,t),i=new xI(r,s,n),o=await i.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}
/**
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
 */class CI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return DI(e);default:return!1}}
/**
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
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!DI(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(a_(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(kI(e))}saveEventToCache(e){this.cachedEventUids.add(kI(e)),this.lastProcessedEventTime=Date.now()}}function kI(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function DI({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}
/**
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
 */
const RI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,PI=/^https?/;async function OI(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return E_(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(LI(n))return}catch{}o_(e,"unauthorized-domain")}function LI(e){const t=p_(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return""===s.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&s.hostname===r}if(!PI.test(n))return!1;if(RI.test(e))return r===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}
/**
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
 */const VI=new y_(3e4,6e4);function MI(){const e=rI().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function UI(e){return new Promise((t,n)=>{function r(){MI(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{MI(),n(a_(e,"network-request-failed"))},timeout:VI.get()})}if(rI().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!rI().gapi?.load){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return rI()[t]=()=>{gapi.load?r():n(a_(e,"network-request-failed"))},gb(`${mb.gapiScript}?onload=${t}`).catch(e=>n(e))}r()}}).catch(e=>{throw FI=null,e})}let FI=null;
/**
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
 */
const BI=new y_(5e3,15e3),qI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zI(e){const t=e.config;h_(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?w_(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:De},s=jI.get(e.config.apiHost);s&&(r.eid=s);const i=e._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${x(r).slice(1)}`}async function $I(e){const t=await function(e){return FI=FI||UI(e),FI}(e),n=rI().gapi;return h_(n,e,"internal-error"),t.open({where:document.body,url:zI(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:qI,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const s=a_(e,"network-request-failed"),i=rI().setTimeout(()=>{r(s)},BI.get());function o(){rI().clearTimeout(i),n(t)}t.ping(o).then(o,()=>{r(s)})}))}
/**
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
 */const KI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class GI{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(Wm){}}}function HI(e,t,n,r=500,s=600){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...KI,width:r.toString(),height:s.toString(),top:i,left:o},u=g().toLowerCase();n&&(a=tb(u)?"_blank":n),Z_(u)&&(t=t||"http://localhost",c.scrollbars="yes");const l=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=g()){return ob(e)&&!!window.navigator?.standalone}(u)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
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
 */(t||"",a),new GI(null);const h=window.open(t||"",a,l);h_(h,e,"popup-blocked");try{h.focus()}catch(Wm){}return new GI(h)}const WI="__/auth/handler",QI="emulator/auth/handler",JI=encodeURIComponent("fac");async function YI(e,t,n,r,s,i){h_(e.config.authDomain,e,"auth-domain-config-required"),h_(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:De,eventId:s};if(t instanceof Lb){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Vb){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const l of Object.keys(a))void 0===a[l]&&delete a[l];const c=await e._getAppCheckToken(),u=c?`#${JI}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${WI}`;return w_(e,QI)}
/**
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
 */(e)}?${x(a).slice(1)}${u}`}const XI="webStorageSupport";const ZI=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zb,this._completeRedirectFn=AI,this._overrideRedirectResult=NI}async _openPopup(e,t,n,r){f_(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");return HI(e,await YI(e,t,n,p_(),r),tI())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){rI().location.href=e}(await YI(e,t,n,p_(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(f_(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await $I(e),n=new CI(e);return t.register("authEvent",t=>{h_(t?.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(XI,{type:XI},n=>{const r=n?.[0]?.[XI];void 0!==r&&t(!!r),o_(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=OI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return cb()||eb()||ob()}};var eT="@firebase/auth",tT="1.13.3";
/**
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
 */
class nT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){h_(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
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
 */
/**
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
 */
const rT=f("authIdTokenMaxAge")||300;let sT=null;function iT(e=Pe()){const t=Ne(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=Ne(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(E(n.getOptions(),t??{}))return e;o_(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:ZI,persistence:[pI,Yb,Zb]}),r=f("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(s=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>rT)return;const r=t?.token;sT!==r&&(sT=r,await fetch(s,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(e,t,n){D(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,r){D(e).onIdTokenChanged(t,n,r)}(n,e=>t(e))}}var s;const i=l("auth");return i&&Eb(n,`http://${i}`),n}var oT,aT;oT={loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=a_("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},mb=oT,aT="Browser",xe(new O("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:i,authDomain:o}=n.options;h_(i&&!i.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:i,authDomain:o,clientPlatform:aT,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ub(aT)},c=new db(n,r,s,a);return function(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(H_);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),xe(new O("auth-internal",e=>(e=>new nT(e))(fb(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),Le(eT,tT,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(aT)),Le(eT,tT,"esm2020");export{Wv as A,Jv as B,Qv as C,qy as D,Yv as E,Rw as F,Ub as G,II as H,zy as I,Gb as J,Fw as K,Pe as a,yy as b,uw as c,wy as d,Zv as e,iT as f,Oe as g,Xc as h,Re as i,Tw as j,Zc as k,Ru as l,iw as m,Aw as n,Cw as o,ow as p,Vy as q,Nw as r,Sw as s,Ew as t,xw as u,bw as v,Uy as w,Iw as x,Hb as y,Xv as z};
