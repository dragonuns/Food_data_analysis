(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-548bc5b6"],{"159b":function(t,e,r){var n=r("da84"),o=r("fdbc"),i=r("17c2"),a=r("9112");for(var c in o){var l=n[c],s=l&&l.prototype;if(s&&s.forEach!==i)try{a(s,"forEach",i)}catch(f){s.forEach=i}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,o=r("a640"),i=r("ae40"),a=o("forEach"),c=i("forEach");t.exports=a&&c?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},4127:function(t,e,r){"use strict";var n=r("d233"),o=r("b313"),i={brackets:function(t){return t+"[]"},indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},a=Date.prototype.toISOString,c={delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,serializeDate:function(t){return a.call(t)},skipNulls:!1,strictNullHandling:!1},l=function t(e,r,o,i,a,l,s,f,u,d,p,y){var h=e;if("function"===typeof s)h=s(r,h);else if(h instanceof Date)h=d(h);else if(null===h){if(i)return l&&!y?l(r,c.encoder):r;h=""}if("string"===typeof h||"number"===typeof h||"boolean"===typeof h||n.isBuffer(h)){if(l){var m=y?r:l(r,c.encoder);return[p(m)+"="+p(l(h,c.encoder))]}return[p(r)+"="+p(String(h))]}var v,b=[];if("undefined"===typeof h)return b;if(Array.isArray(s))v=s;else{var g=Object.keys(h);v=f?g.sort(f):g}for(var x=0;x<v.length;++x){var S=v[x];a&&null===h[S]||(b=Array.isArray(h)?b.concat(t(h[S],o(r,S),o,i,a,l,s,f,u,d,p,y)):b.concat(t(h[S],r+(u?"."+S:"["+S+"]"),o,i,a,l,s,f,u,d,p,y)))}return b};t.exports=function(t,e){var r=t,a=e?n.assign({},e):{};if(null!==a.encoder&&void 0!==a.encoder&&"function"!==typeof a.encoder)throw new TypeError("Encoder has to be a function.");var s="undefined"===typeof a.delimiter?c.delimiter:a.delimiter,f="boolean"===typeof a.strictNullHandling?a.strictNullHandling:c.strictNullHandling,u="boolean"===typeof a.skipNulls?a.skipNulls:c.skipNulls,d="boolean"===typeof a.encode?a.encode:c.encode,p="function"===typeof a.encoder?a.encoder:c.encoder,y="function"===typeof a.sort?a.sort:null,h="undefined"!==typeof a.allowDots&&a.allowDots,m="function"===typeof a.serializeDate?a.serializeDate:c.serializeDate,v="boolean"===typeof a.encodeValuesOnly?a.encodeValuesOnly:c.encodeValuesOnly;if("undefined"===typeof a.format)a.format=o["default"];else if(!Object.prototype.hasOwnProperty.call(o.formatters,a.format))throw new TypeError("Unknown format option provided.");var b,g,x=o.formatters[a.format];"function"===typeof a.filter?(g=a.filter,r=g("",r)):Array.isArray(a.filter)&&(g=a.filter,b=g);var S,_=[];if("object"!==typeof r||null===r)return"";S=a.arrayFormat in i?a.arrayFormat:"indices"in a?a.indices?"indices":"repeat":"indices";var w=i[S];b||(b=Object.keys(r)),y&&b.sort(y);for(var k=0;k<b.length;++k){var O=b[k];u&&null===r[O]||(_=_.concat(l(r[O],O,w,f,u,d?p:null,g,y,h,m,x,v)))}var j=_.join(s),L=!0===a.addQueryPrefix?"?":"";return j.length>0?L+j:""}},4160:function(t,e,r){"use strict";var n=r("23e7"),o=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},4328:function(t,e,r){"use strict";var n=r("4127"),o=r("9e6a"),i=r("b313");t.exports={formats:i,parse:o,stringify:n}},"65f0":function(t,e,r){var n=r("861d"),o=r("e8b5"),i=r("b622"),a=i("species");t.exports=function(t,e){var r;return o(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!o(r.prototype)?n(r)&&(r=r[a],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"9e6a":function(t,e,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(t,e){for(var r={},n=e.ignoreQueryPrefix?t.replace(/^\?/,""):t,a=e.parameterLimit===1/0?void 0:e.parameterLimit,c=n.split(e.delimiter,a),l=0;l<c.length;++l){var s,f,u=c[l],d=u.indexOf("]="),p=-1===d?u.indexOf("="):d+1;-1===p?(s=e.decoder(u,i.decoder),f=e.strictNullHandling?null:""):(s=e.decoder(u.slice(0,p),i.decoder),f=e.decoder(u.slice(p+1),i.decoder)),o.call(r,s)?r[s]=[].concat(r[s]).concat(f):r[s]=f}return r},c=function(t,e,r){for(var n=e,o=t.length-1;o>=0;--o){var i,a=t[o];if("[]"===a)i=[],i=i.concat(n);else{i=r.plainObjects?Object.create(null):{};var c="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,l=parseInt(c,10);!isNaN(l)&&a!==c&&String(l)===c&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(i=[],i[l]=n):i[c]=n}n=i}return n},l=function(t,e,r){if(t){var n=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,i=/(\[[^[\]]*])/,a=/(\[[^[\]]*])/g,l=i.exec(n),s=l?n.slice(0,l.index):n,f=[];if(s){if(!r.plainObjects&&o.call(Object.prototype,s)&&!r.allowPrototypes)return;f.push(s)}var u=0;while(null!==(l=a.exec(n))&&u<r.depth){if(u+=1,!r.plainObjects&&o.call(Object.prototype,l[1].slice(1,-1))&&!r.allowPrototypes)return;f.push(l[1])}return l&&f.push("["+n.slice(l.index)+"]"),c(f,e,r)}};t.exports=function(t,e){var r=e?n.assign({},e):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!==typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"===typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:i.delimiter,r.depth="number"===typeof r.depth?r.depth:i.depth,r.arrayLimit="number"===typeof r.arrayLimit?r.arrayLimit:i.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"===typeof r.decoder?r.decoder:i.decoder,r.allowDots="boolean"===typeof r.allowDots?r.allowDots:i.allowDots,r.plainObjects="boolean"===typeof r.plainObjects?r.plainObjects:i.plainObjects,r.allowPrototypes="boolean"===typeof r.allowPrototypes?r.allowPrototypes:i.allowPrototypes,r.parameterLimit="number"===typeof r.parameterLimit?r.parameterLimit:i.parameterLimit,r.strictNullHandling="boolean"===typeof r.strictNullHandling?r.strictNullHandling:i.strictNullHandling,""===t||null===t||"undefined"===typeof t)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof t?a(t,r):t,c=r.plainObjects?Object.create(null):{},s=Object.keys(o),f=0;f<s.length;++f){var u=s[f],d=l(u,o[u],r);c=n.merge(c,d,r)}return n.compact(c)}},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},a6c1:function(t,e,r){},ae40:function(t,e,r){var n=r("83ab"),o=r("d039"),i=r("5135"),a=Object.defineProperty,c={},l=function(t){throw t};t.exports=function(t,e){if(i(c,t))return c[t];e||(e={});var r=[][t],s=!!i(e,"ACCESSORS")&&e.ACCESSORS,f=i(e,0)?e[0]:l,u=i(e,1)?e[1]:void 0;return c[t]=!!r&&!o((function(){if(s&&!n)return!0;var t={length:-1};s?a(t,1,{enumerable:!0,get:l}):t[1]=1,r.call(t,f,u)}))}},b313:function(t,e,r){"use strict";var n=String.prototype.replace,o=/%20/g;t.exports={default:"RFC3986",formatters:{RFC1738:function(t){return n.call(t,o,"+")},RFC3986:function(t){return t}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},b6fb:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticStyle:{"background-color":"#00BBFF"}},[r("div",{staticStyle:{"font-size":"2.5rem",color:"white"}},[t._v("食物营养成分对比")]),r("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[r("el-input",{staticClass:".el-input__inner",staticStyle:{width:"780px"},attrs:{placeholder:"请输入您要对比的食物，如：大米 小米，点击右侧按钮进行对比"},on:{blur:t.onSubmit},nativeOn:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.clearInput(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSubmit(e)}]},model:{value:t.form.food_name,callback:function(e){t.$set(t.form,"food_name",e)},expression:"form.food_name"}}),r("el-button",{staticStyle:{"margin-left":"18px"},attrs:{type:"primary",icon:"el-icon-search",circle:""},on:{click:t.onSubmit}}),t.form.food_name?r("el-button",{staticStyle:{"margin-left":"18px"},attrs:{type:"primary",icon:"el-icon-delete",circle:""},on:{click:t.clearInput}}):t._e()],1),r("ul",{staticClass:"show_result"},[r("div",{staticClass:"ttt",staticStyle:{"background-color":"#00BBFF",color:"white"}},[t._v("食物搜索结果")]),t._m(0),t._l(t.resdata,(function(e,n){return r("div",{key:n,staticStyle:{"list-style":"none"}},[r("div",{staticClass:"food-item",staticStyle:{"margin-bottom":"5px","line-height":"45px"}},[r("div",[t._v(t._s(e.id))]),r("div",[t._v(t._s(e.food_name))]),r("el-button",{staticStyle:{height:"39px","margin-left":"35px","margin-top":"3px"},attrs:{label:e.id},on:{click:function(r){return t.addContrast(e)}}},[t._v(" 加入对比")])],1)])}))],2),0!==t.resdata.length?r("el-button",{staticStyle:{"line-height":"30px","font-size":"20px"},attrs:{type:"danger"},on:{click:t.clearResult}},[t._v("清空查询结果")]):t._e(),r("ul",{staticClass:"show_contrast"},[r("div",{staticClass:"kkk",staticStyle:{"background-color":"#00BBFF",color:"white"}},[t._v("等待对比的食物")]),t._m(1),t._l(t.select,(function(e,n){return r("div",{key:n,staticStyle:{"list-style":"none"}},[r("div",{staticClass:"food-item",staticStyle:{"margin-bottom":"5px","line-height":"45px"}},[r("div",[t._v(t._s(e.id))]),r("div",[t._v(t._s(e.food_name))]),r("el-checkbox",{attrs:{checked:e.checked},on:{change:function(r){return t.check(e)}}})],1)])})),0!==t.select.length?r("el-button",{staticStyle:{"line-height":"30px","font-size":"20px"},attrs:{type:"success"},on:{click:t.onContrast}},[t._v("开始对比")]):t._e(),0!==t.select.length?r("el-button",{staticStyle:{"line-height":"30px","font-size":"20px"},attrs:{type:"danger"},on:{click:t.clearContrast}},[t._v("清空对比")]):t._e(),0!==t.select.length||0!==t.resdata.length||t.form.food_name?r("el-button",{staticStyle:{"line-height":"30px","font-size":"20px"},attrs:{type:"danger"},on:{click:t.clearAll}},[t._v("清空全部")]):t._e()],2)],1)},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"food-item",staticStyle:{"line-height":"45px","list-style":"none"}},[r("div",{staticStyle:{float:"left","line-height":"45px"}},[t._v("编号")]),r("div",[t._v("食物名称")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"food-item",staticStyle:{"line-height":"45px","list-style":"none"}},[r("div",{staticStyle:{float:"left","line-height":"45px"}},[t._v("编号")]),r("div",[t._v("食物名称")])])}],i=(r("4160"),r("159b"),r("d70b")),a=r("4328"),c=r.n(a),l={data:function(){return{input:"",form:{food_name:""},resdata:[],select:[]}},methods:{clearResult:function(){var t=window.confirm("是否确认清空查询结果?(tip:对比也会被清空!!!)");t&&(this.resdata.length=0,this.select.length=0)},clearInput:function(){var t=window.confirm("是否清空搜索框?");t&&(this.form.food_name="")},clearAll:function(){if(this.form.food_name)if(0!==this.resdata.length)if(0!==this.select.length){var t=window.confirm("是否清空全部?");t&&(this.form.food_name="",this.resdata.length=0,this.select.length=0)}else{var e=window.confirm("是否清空搜索框以及查询结果?");e&&(this.form.food_name="",this.resdata.length=0)}else this.clearInput();else 0!==this.resdata.length&&this.clearResult()},check:function(t){t.checked=!t.checked},onSubmit:function(){var t=this;this.axios.post(i["a"]+"/api/food/food_list",c.a.stringify(this.form)).then((function(e){0===e.data.code&&alert(e.data.data[0]),1===e.data.code&&(t.resdata=e.data.data[0])}))},clearContrast:function(){this.select!=[]&&window.confirm("是否确认清空对比?")&&(this.select=[])},addContrast:function(t){this.select.length>=2?alert("每次对比只能选择两种食物！"):(this.select.push(t),this.select.forEach((function(t){t.checked=!0})))},onContrast:function(){var t="";this.select.forEach((function(e){e.checked&&(t.length>0&&(t+=","),t+=e.id)})),console.log(t),this.$router.push({path:"/food_contrast/result?food_id="+t})}}},s=l,f=(r("c459"),r("2877")),u=Object(f["a"])(s,n,o,!1,null,"684ecf87",null);e["default"]=u.exports},b727:function(t,e,r){var n=r("0366"),o=r("44ad"),i=r("7b0b"),a=r("50c4"),c=r("65f0"),l=[].push,s=function(t){var e=1==t,r=2==t,s=3==t,f=4==t,u=6==t,d=5==t||u;return function(p,y,h,m){for(var v,b,g=i(p),x=o(g),S=n(y,h,3),_=a(x.length),w=0,k=m||c,O=e?k(p,_):r?k(p,0):void 0;_>w;w++)if((d||w in x)&&(v=x[w],b=S(v,w,g),t))if(e)O[w]=b;else if(b)switch(t){case 3:return!0;case 5:return v;case 6:return w;case 2:l.call(O,v)}else if(f)return!1;return u?-1:s||f?f:O}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6)}},c459:function(t,e,r){"use strict";var n=r("a6c1"),o=r.n(n);o.a},d233:function(t,e,r){"use strict";var n=Object.prototype.hasOwnProperty,o=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),i=function(t){var e;while(t.length){var r=t.pop();if(e=r.obj[r.prop],Array.isArray(e)){for(var n=[],o=0;o<e.length;++o)"undefined"!==typeof e[o]&&n.push(e[o]);r.obj[r.prop]=n}}return e},a=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},n=0;n<t.length;++n)"undefined"!==typeof t[n]&&(r[n]=t[n]);return r},c=function t(e,r,o){if(!r)return e;if("object"!==typeof r){if(Array.isArray(e))e.push(r);else{if("object"!==typeof e)return[e,r];(o.plainObjects||o.allowPrototypes||!n.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!==typeof e)return[e].concat(r);var i=e;return Array.isArray(e)&&!Array.isArray(r)&&(i=a(e,o)),Array.isArray(e)&&Array.isArray(r)?(r.forEach((function(r,i){n.call(e,i)?e[i]&&"object"===typeof e[i]?e[i]=t(e[i],r,o):e.push(r):e[i]=r})),e):Object.keys(r).reduce((function(e,i){var a=r[i];return n.call(e,i)?e[i]=t(e[i],a,o):e[i]=a,e}),i)},l=function(t,e){return Object.keys(e).reduce((function(t,r){return t[r]=e[r],t}),t)},s=function(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(e){return t}},f=function(t){if(0===t.length)return t;for(var e="string"===typeof t?t:String(t),r="",n=0;n<e.length;++n){var i=e.charCodeAt(n);45===i||46===i||95===i||126===i||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122?r+=e.charAt(n):i<128?r+=o[i]:i<2048?r+=o[192|i>>6]+o[128|63&i]:i<55296||i>=57344?r+=o[224|i>>12]+o[128|i>>6&63]+o[128|63&i]:(n+=1,i=65536+((1023&i)<<10|1023&e.charCodeAt(n)),r+=o[240|i>>18]+o[128|i>>12&63]+o[128|i>>6&63]+o[128|63&i])}return r},u=function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],n=0;n<e.length;++n)for(var o=e[n],a=o.obj[o.prop],c=Object.keys(a),l=0;l<c.length;++l){var s=c[l],f=a[s];"object"===typeof f&&null!==f&&-1===r.indexOf(f)&&(e.push({obj:a,prop:s}),r.push(f))}return i(e)},d=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},p=function(t){return null!==t&&"undefined"!==typeof t&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))};t.exports={arrayToObject:a,assign:l,compact:u,decode:s,encode:f,isBuffer:p,isRegExp:d,merge:c}},d70b:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));const n="http://localhost:5000"},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-548bc5b6.b9ab020a.js.map