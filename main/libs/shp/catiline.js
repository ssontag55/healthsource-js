"undefined"==typeof document?(self._noTransferable=!0,self.onmessage=function(e){eval(e.data)}):!function(global){"use strict"
function regexImports(e){for(var n=e,t=!0,r={},a=function(e,n){n&&"importScripts("+n.split(",").forEach(function(e){r[catiline.makeUrl(e.match(/\s*[\'\"](\S*)[\'\"]\s*/)[1])]=!0})+");\n"};t;)t=n.match(/(importScripts\(.*?\);?)/),n=n.replace(/(importScripts\(\s*(?:[\'\"].*?[\'\"])?\s*\);?)/,"\n"),t&&t[0].replace(/importScripts\(\s*([\'\"].*?[\'\"])?\s*\);?/g,a)
return r=Object.keys(r),[r,n]}function moveImports(e){var n=regexImports(e),t=n[0],r=n[1]
return t.length>0?"importScripts('"+t.join("','")+"');\n"+r:r}function moveIimports(e){var n=regexImports(e),t=n[0],r=n[1]
return t.length>0?"importScripts('"+t.join("','")+"');eval(__scripts__);\n"+r:r}function getPath(){if("undefined"!=typeof SHIM_WORKER_PATH)return SHIM_WORKER_PATH
if("SHIM_WORKER_PATH"in catiline)return catiline.SHIM_WORKER_PATH
for(var e=document.getElementsByTagName("script"),n=e.length,t=0;n>t;){if(/catiline(\.min)?\.js/.test(e[t].src))return e[t].src
t++}}function appendScript(e,n){var t=e.createElement("script")
void 0!==t.text?t.text=n:t.innerHTML=n,"complete"===e.readyState?e.documentElement.appendChild(t):e.onreadystatechange=function(){"complete"===e.readyState&&e.documentElement.appendChild(t)}}function actualMakeI(e,n){var t=document.createElement("iframe")
t.style.display="none",document.body.appendChild(t)
var r=t.contentWindow,a=r.document,i=["try{ \nvar __scripts__='';function importScripts(scripts){\n	if(Array.isArray(scripts)&&scripts.length>0){\n		scripts.forEach(function(url){\n			var ajax = new XMLHttpRequest();\n			ajax.open('GET',url,false);\n			ajax.send();__scripts__+=ajax.responseText;\n			__scripts__+='\\n;';\n		});\n	}\n};",e,"}catch(e){","	window.parent.postMessage(['"+n+"','error'],'*')","}"].join("\n")
return appendScript(a,i),t}function makeIframe(e,n){var t=catiline.deferred()
return"complete"===document.readyState?t.resolve(actualMakeI(e,n)):window.addEventListener("load",function(){t.resolve(actualMakeI(e,n))},!1),t.promise}function makeFallbackWorker(e){catiline._noTransferable=!0
var n=new Worker(getPath())
return n.postMessage(e),n}function catiline(e,n,t){return 1===arguments.length||!n||1>=n?new catiline.Worker(e):new catiline.Queue(e,n,t)}function initBrowser(e){var n=global.cw
e.noConflict=function(t){global.cw=n,t&&(global[t]=e)},global.catiline=e,global.cw=e,"communist"in global||(global.communist=e)}!function(attachTo,global){function isStringAndStartsWith(e,n){return"string"==typeof e&&e.substring(0,n.length)===n}function onGlobalMessage(e){if(e.source===global&&isStringAndStartsWith(e.data,MESSAGE_PREFIX)){var n=e.data.substring(MESSAGE_PREFIX.length)
tasks.runIfPresent(n)}}var tasks=function(){function Task(e,n){this.handler=e,this.args=n}Task.prototype.run=function(){if("function"==typeof this.handler)this.handler.apply(void 0,this.args)
else{var scriptSource=""+this.handler
eval(scriptSource)}}
var nextHandle=1,tasksByHandle={},currentlyRunningATask=!1
return{addFromSetImmediateArguments:function(e){var n=e[0],t=Array.prototype.slice.call(e,1),r=new Task(n,t),a=nextHandle++
return tasksByHandle[a]=r,a},runIfPresent:function(e){if(currentlyRunningATask)global.setTimeout(function(){tasks.runIfPresent(e)},0)
else{var n=tasksByHandle[e]
if(n){currentlyRunningATask=!0
try{n.run()}finally{delete tasksByHandle[e],currentlyRunningATask=!1}}}},remove:function(e){delete tasksByHandle[e]}}}(),MESSAGE_PREFIX="com.catilinejs.setImmediate"+Math.random()
global.addEventListener?global.addEventListener("message",onGlobalMessage,!1):global.attachEvent("onmessage",onGlobalMessage),attachTo.setImmediate=function(){var e=tasks.addFromSetImmediateArguments(arguments)
return global.postMessage(MESSAGE_PREFIX+e,"*"),e}}(catiline,global),function(e,n){function t(){function e(){this.then=function(e,t){return n(e,t)}}var n=function(e,c,s){var f
if(e!==n)return f=r(),n.queue.push({deferred:f,resolve:e,reject:c}),f.promise
for(var u,l,d,_=c?"resolve":"reject",m=0,p=n.queue.length;p>m;m++)u=n.queue[m],l=u.deferred,d=u[_],typeof d!==o?l[_](s):i(d,s,l)
n=a(t,s,c)},t=new e
this.promise=t,n.queue=[],this.resolve=function(e){n.queue&&n(n,!0,e)},this.reject=function(e){n.queue&&n(n,!1,e)}}function r(){return new t}function a(e,n,t){return function(a,c){var s,f=t?a:c
return typeof f!==o?e:(i(f,n,s=r()),s.promise)}}function i(e,t,r){n(function(){var n
try{n=e(t),n&&typeof n.then===o?n.then(r.resolve,r.reject):r.resolve(n)}catch(a){r.reject(a)}})}var o="function"
e.resolve=function(e){var n={}
return n.then=a(n,e,!0),n},e.reject=function(e){var n={}
return n.then=a(n,e,!1),n},e.deferred=r,e.all=function(n){var t=e.deferred(),r=n.length,a=0,i=[],o=function(e){return function(n){i[e]=n,a++,a===r&&t.resolve(i)}}
return n.forEach(function(e,n){e.then(o(n),function(e){t.reject(e)})}),t.promise}}(catiline,catiline.setImmediate),catiline._hasWorker="undefined"!=typeof Worker&&"undefined"==typeof fakeLegacy,catiline.URL=window.URL||window.webkitURL,catiline._noTransferable=!catiline.URL,catiline.makeIWorker=function(e,n){var t=moveIimports(e.join("")),r={onmessage:function(){}},a=makeIframe(t,n)
return window.addEventListener("message",function(e){"string"==typeof e.data&&e.data.length>n.length&&e.data.slice(0,n.length)===n&&r.onmessage({data:JSON.parse(e.data.slice(n.length))})}),r.postMessage=function(e){a.then(function(n){n.contentWindow.postMessage(JSON.stringify(e),"*")})},r.terminate=function(){a.then(function(e){document.body.removeChild(e)})},r},catiline.makeWorker=function(e,n){if(!catiline._hasWorker)return catiline.makeIWorker(e,n)
var t,r=moveImports(e.join(""))
if(catiline._noTransferable)return makeFallbackWorker(r)
try{t=new Worker(catiline.URL.createObjectURL(new Blob([r],{type:"text/javascript"})))}catch(a){try{t=makeFallbackWorker(r)}catch(i){t=catiline.makeIWorker(e,n)}}finally{return t}},catiline.makeUrl=function(e){var n=document.createElement("link")
return n.href=e,n.href},catiline.Worker=function(e){function n(e,t){return e.indexOf(" ")>0?(e.split(" ").forEach(function(e){n(e,t)}),a):e in r?(r[e].forEach(function(e){e(t)}),a):a}"function"==typeof e&&(e={data:e})
var t="com.catilinejs."+(catiline._hasWorker?"iframe":"worker")+Math.random(),r={},a=this
a.on=function(e,n,t){return t=t||a,e.indexOf(" ")>0?(e.split(" ").map(function(e){return a.on(e,n,t)},this),a):(e in r||(r[e]=[]),r[e].push(function(e){n.call(t,e)}),a)},a.fire=function(e,n,t){return catiline._noTransferable?l.postMessage([[e],n]):l.postMessage([[e],n],t),a},a.off=function(e,n){return e.indexOf(" ")>0?(e.split(" ").map(function(e){return a.off(e,n)}),a):e in r?(n?r[e].indexOf(n)>-1&&(r[e].length>1?delete r[e]:r[e].splice(r[e].indexOf(n),1)):delete r[e],a):a}
var i=0,o=[],c=function(e){"string"!=typeof e&&"preventDefault"in e&&(e.preventDefault(),e=e.message),o.forEach(function(n){n&&n.reject(e)})}
e.__codeWord__='"'+t+'"',"initialize"in e||(e.initialize="init"in e?e.init:function(){})
var s="{\n	",f=function(e){var n=function(n,r){var a=o.length
return o[a]=catiline.deferred(),catiline._noTransferable?l.postMessage([[t,a],e,n]):l.postMessage([[t,a],e,n],r),o[a].promise}
return n}
for(var u in e)0!==i?s+=",\n	":i++,s=s+u+":"+e[u],a[u]=f(u)
s+="}"
var l=catiline.makeWorker(["'use strict';\n\nvar _db = ",s,';\nvar listeners = {};\nvar __iFrame__ = typeof document!=="undefined";\nvar __self__={onmessage:function(e){\n	_fire("messege",e.data[1]);\n	if(e.data[0][0]===_db.__codeWord__){\n		return regMsg(e);\n	}else{\n		_fire(e.data[0][0],e.data[1]);\n	}\n}};\nif(__iFrame__){\n	window.onmessage=function(e){\n		if(typeof e.data === "string"){\n			e ={data: JSON.parse(e.data)};\n		}\n		__self__.onmessage(e);\n	};\n}else{\n	self.onmessage=__self__.onmessage;\n}\n__self__.postMessage=function(rawData, transfer){\n	var data;\n	if(!self._noTransferable&&!__iFrame__){\n		self.postMessage(rawData, transfer);\n	}else if(__iFrame__){\n		data = _db.__codeWord__+JSON.stringify(rawData);\n		window.parent.postMessage(data,"*");\n	}else if(self._noTransferable){\n		self.postMessage(rawData);\n	}\n};\n_db.on = function (eventName, func, scope) {\n	if(eventName.indexOf(" ")>0){\n		return eventName.split(" ").map(function(v){\n			return _db.on(v,func,scope);\n		},_db);\n	}\n	scope = scope || _db;\n	if (!(eventName in listeners)) {\n		listeners[eventName] = [];\n	}\n	listeners[eventName].push(function (a) {\n		func.call(scope, a, _db);\n	});\n};\nfunction _fire(eventName,data){\n	if(eventName.indexOf(" ")>0){\n		eventName.split(" ").forEach(function(v){\n			_fire(v,data);\n		});\n		return;\n	}\n	if (!(eventName in listeners)) {\n		return;\n	}\n	listeners[eventName].forEach(function (v) {\n		v(data);\n	});\n}\n\n_db.fire = function (eventName, data, transfer) {\n	__self__.postMessage([[eventName], data], transfer);\n};\n_db.off=function(eventName,func){\n	if(eventName.indexOf(" ")>0){\n		return eventName.split(" ").map(function(v){\n			return _db.off(v,func);\n		});\n	}\n	if(!(eventName in listeners)){\n		return;\n	}else if(!func){\n		delete listeners[eventName];\n	}else{\n		if(listeners[eventName].indexOf(func)>-1){\n			if(listeners[eventName].length>1){\n				delete listeners[eventName];\n			}else{\n				listeners[eventName].splice(listeners[eventName].indexOf(func),1);\n			}\n		}\n	}\n};\nvar console={};\nfunction makeConsole(method){\n	return function(){\n		var len = arguments.length;\n		var out =[];\n		var i = 0;\n		while (i<len){\n			out.push(arguments[i]);\n			i++;\n		}\n		_db.fire("console",[method,out]);\n	};\n}\n["log", "debug", "error", "info", "warn", "time", "timeEnd"].forEach(function(v){\n	console[v]=makeConsole(v);\n});\nvar regMsg = function(e){\n	var cb=function(data,transfer){\n		__self__.postMessage([e.data[0],data],transfer);\n	};\n	var result;\n	if(__iFrame__){\n		try{\n			result = _db[e.data[1]](e.data[2],cb,_db);\n		}catch(e){\n			_db.fire("error",JSON.stringify(e));\n		}\n	}else{\n		result = _db[e.data[1]](e.data[2],cb,_db);\n	}\n	if(typeof result !== "undefined"){\n		cb(result);\n	}\n};\n_db.initialize(_db);\n'],t)
l.onmessage=function(e){n("message",e.data[1]),e.data[0][0]===t?(o[e.data[0][1]].resolve(e.data[1]),o[e.data[0][1]]=0):n(e.data[0][0],e.data[1])},a.on("error",c),l.onerror=function(e){n("error",e)},a.on("console",function(e){console[e[0]].apply(console,e[1])}),a._close=function(){return l.terminate(),c("closed"),catiline.resolve()},"close"in a||(a.close=a._close)},catiline.worker=function(e){return new catiline.Worker(e)},catiline.Queue=function(e,n,t){function r(e){e=e||"canceled",v=0
var n=p
return p=[],n.forEach(function(n){n[3].reject(e)}),l}function a(e){return function(n,t){return u(e,n,t)}}function i(e){return function(n){return catiline.all(n.map(function(n){return u(e,n)}))}}function o(e){return function(n){var t=this
return catiline.all(n.map(function(n){return u(e,n).then(t.__cb__)}))}}function c(e){return function(n){return catiline.all(n.map(function(n){return u(e,n[0],n[1])}))}}function s(e){return function(n){var t=this
return catiline.all(n.map(function(n){return u(e,n[0],n[1]).then(t.__cb__)}))}}function f(e){var n
v?(n=p.shift(),v--,d[e][n[0]](n[1],n[2]).then(function(t){f(e),n[3].resolve(t)},function(t){f(e),n[3].reject(t)})):(_++,m.push(e))}function u(e,r,a){if(t)return d[~~(Math.random()*n)][e](r,a)
var i,o=catiline.deferred()
return!v&&_?(i=m.pop(),_--,d[i][e](r,a).then(function(e){f(i),o.resolve(e)},function(e){f(i),o.reject(e)})):(v||!_)&&(v=p.push([e,r,a,o])),o.promise}var l=this
l.__batchcb__={},l.__batchtcb__={},l.batch=function(e){return"function"==typeof e?(l.__batchcb__.__cb__=e,l.__batchcb__):r(e)},l.batchTransfer=function(e){return"function"==typeof e?(l.__batchtcb__.__cb__=e,l.__batchtcb__):r(e)}
for(var d=Array(n),_=0,m=[],p=[],v=0;n>_;)d[_]=new catiline.Worker(e),m.push(_),_++
l.on=function(e,n,t){return d.forEach(function(r){r.on(e,n,t)}),l},l.off=function(e,n,t){return d.forEach(function(r){r.off(e,n,t)}),l}
var h=function(e,n){return d.forEach(function(t){t.fire(e,n)}),l}
l.fire=function(e,t){return d[~~(Math.random()*n)].fire(e,t),l},l.batch.fire=h,l.batchTransfer.fire=h
for(var g in e)l[g]=a(g),l.batch[g]=i(g),l.__batchcb__[g]=o(g),l.batchTransfer[g]=c(g),l.__batchtcb__[g]=s(g)
l._close=function(){return catiline.all(d.map(function(e){return e._close()}))},"close"in l||(l.close=l._close)},catiline.queue=function(e,n,t){return new catiline.Queue(e,n,t)},"function"==typeof define?define(function(e){return catiline.SHIM_WORKER_PATH=e.toUrl("./catiline.js"),catiline}):"undefined"!=typeof module&&"exports"in module?module.exports=catiline:initBrowser(catiline),catiline.version="2.4.2"}(this)
