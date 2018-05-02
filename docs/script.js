!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s=2)}([function(t,e){
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";var t=0,e={};function n(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=n.Adapter.extend({},n.defaults,o),this.element=this.options.element,this.adapter=new n.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=n.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=n.Context.findOrCreateByElement(this.options.context),n.offsetAliases[this.options.offset]&&(this.options.offset=n.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),e[this.key]=this,t+=1}n.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},n.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},n.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete e[this.key]},n.prototype.disable=function(){return this.enabled=!1,this},n.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},n.prototype.next=function(){return this.group.next(this)},n.prototype.previous=function(){return this.group.previous(this)},n.invokeAll=function(t){var n=[];for(var o in e)n.push(e[o]);for(var i=0,r=n.length;i<r;i++)n[i][t]()},n.destroyAll=function(){n.invokeAll("destroy")},n.disableAll=function(){n.invokeAll("disable")},n.enableAll=function(){for(var t in n.Context.refreshAll(),e)e[t].enabled=!0;return this},n.refreshAll=function(){n.Context.refreshAll()},n.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},n.viewportWidth=function(){return document.documentElement.clientWidth},n.adapters=[],n.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},n.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=n}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}var e=0,n={},o=window.Waypoint,i=window.onload;function r(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+e,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,e+=1,o.windowContext||(o.windowContext=!0,o.windowContext=new r(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}r.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},r.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),o=this.element==this.element.window;t&&e&&!o&&(this.adapter.off(".waypoints"),delete n[this.key])},r.prototype.createThrottledResizeHandler=function(){var t=this;function e(){t.handleResize(),t.didResize=!1}this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,o.requestAnimationFrame(e))})},r.prototype.createThrottledScrollHandler=function(){var t=this;function e(){t.handleScroll(),t.didScroll=!1}this.adapter.on("scroll.waypoints",function(){t.didScroll&&!o.isTouch||(t.didScroll=!0,o.requestAnimationFrame(e))})},r.prototype.handleResize=function(){o.Context.refreshAll()},r.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var o=e[n],i=o.newScroll>o.oldScroll?o.forward:o.backward;for(var r in this.waypoints[n]){var s=this.waypoints[n][r];if(null!==s.triggerPoint){var a=o.oldScroll<s.triggerPoint,l=o.newScroll>=s.triggerPoint;(a&&l||!a&&!l)&&(s.queueTrigger(i),t[s.group.id]=s.group)}}}for(var u in t)t[u].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},r.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},r.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},r.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},r.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var o=0,i=t.length;o<i;o++)t[o].destroy()},r.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),i={};for(var r in this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var s=t[r];for(var a in this.waypoints[r]){var l,u,c,d,h=this.waypoints[r][a],p=h.options.offset,f=h.triggerPoint,y=0,m=null==f;h.element!==h.element.window&&(y=h.adapter.offset()[s.offsetProp]),"function"==typeof p?p=p.apply(h):"string"==typeof p&&(p=parseFloat(p),h.options.offset.indexOf("%")>-1&&(p=Math.ceil(s.contextDimension*p/100))),l=s.contextScroll-s.contextOffset,h.triggerPoint=Math.floor(y+l-p),u=f<s.oldScroll,c=h.triggerPoint>=s.oldScroll,d=!u&&!c,!m&&(u&&c)?(h.queueTrigger(s.backward),i[h.group.id]=h.group):!m&&d?(h.queueTrigger(s.forward),i[h.group.id]=h.group):m&&s.oldScroll>=h.triggerPoint&&(h.queueTrigger(s.forward),i[h.group.id]=h.group)}}return o.requestAnimationFrame(function(){for(var t in i)i[t].flushTriggers()}),this},r.findOrCreateByElement=function(t){return r.findByElement(t)||new r(t)},r.refreshAll=function(){for(var t in n)n[t].refresh()},r.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){i&&i(),r.refreshAll()},o.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},o.Context=r}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}var n={vertical:{},horizontal:{}},o=window.Waypoint;function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var o=this.triggerQueues[n],i="up"===n||"left"===n;o.sort(i?e:t);for(var r=0,s=o.length;r<s;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n===this.waypoints.length-1?null:this.waypoints[n+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},o.Group=i}(),function(){"use strict";var t=window.Waypoint;function e(t){return t===t.window}function n(t){return e(t)?t:t.defaultView}function o(t){this.element=t,this.handlers={}}o.prototype.innerHeight=function(){return e(this.element)?this.element.innerHeight:this.element.clientHeight},o.prototype.innerWidth=function(){return e(this.element)?this.element.innerWidth:this.element.clientWidth},o.prototype.off=function(t,e){function n(t,e,n){for(var o=0,i=e.length-1;o<i;o++){var r=e[o];n&&n!==r||t.removeEventListener(r)}}var o=t.split("."),i=o[0],r=o[1],s=this.element;if(r&&this.handlers[r]&&i)n(s,this.handlers[r][i],e),this.handlers[r][i]=[];else if(i)for(var a in this.handlers)n(s,this.handlers[a][i]||[],e),this.handlers[a][i]=[];else if(r&&this.handlers[r]){for(var l in this.handlers[r])n(s,this.handlers[r][l],e);this.handlers[r]={}}},o.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,e=n(this.element.ownerDocument),o={top:0,left:0};return this.element.getBoundingClientRect&&(o=this.element.getBoundingClientRect()),{top:o.top+e.pageYOffset-t.clientTop,left:o.left+e.pageXOffset-t.clientLeft}},o.prototype.on=function(t,e){var n=t.split("."),o=n[0],i=n[1]||"__default",r=this.handlers[i]=this.handlers[i]||{};(r[o]=r[o]||[]).push(e),this.element.addEventListener(o,e)},o.prototype.outerHeight=function(t){var n,o=this.innerHeight();return t&&!e(this.element)&&(n=window.getComputedStyle(this.element),o+=parseInt(n.marginTop,10),o+=parseInt(n.marginBottom,10)),o},o.prototype.outerWidth=function(t){var n,o=this.innerWidth();return t&&!e(this.element)&&(n=window.getComputedStyle(this.element),o+=parseInt(n.marginLeft,10),o+=parseInt(n.marginRight,10)),o},o.prototype.scrollLeft=function(){var t=n(this.element);return t?t.pageXOffset:this.element.scrollLeft},o.prototype.scrollTop=function(){var t=n(this.element);return t?t.pageYOffset:this.element.scrollTop},o.extend=function(){var t=Array.prototype.slice.call(arguments);function e(t,e){if("object"==typeof t&&"object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}for(var n=1,o=t.length;n<o;n++)e(t[0],t[n]);return t[0]},o.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},o.isEmptyObject=function(t){for(var e in t)return!1;return!0},t.adapters.push({name:"noframework",Adapter:o}),t.Adapter=o}()},function(t,e,n){"use strict";var o;(o=n(0))&&o.__esModule;var i=new Date;i.setDate(i.getDate());var r=i.getDate(),s=i.getMonth(),a=i.getDay(),l=i.getFullYear();document.getElementById("date").textContent=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][a]+", "+["January","February","March","April","May","June","July","August","September","October","November","December"][s]+" "+r+", "+l;var u=document.querySelectorAll(".videosList li"),c=document.querySelector(".videos iframe");function d(t){c.src=u[t].firstElementChild.firstElementChild.dataset.video}u[0].addEventListener("click",function(t){return d(0)}),u[1].addEventListener("click",function(t){return d(1)}),u[2].addEventListener("click",function(t){return d(2)}),u[3].addEventListener("click",function(t){return d(3)}),d(0);var h,p=1;function f(){var t=document.getElementById("image1"),e=document.getElementById("image2"),n=document.getElementById("image3");1===p?(e.style.opacity="0",setTimeout(function(){t.style.transform="translate3d(0, 0, 0)",t.style.zIndex="1000",e.style.transform="translate3d(583px, 0, 0)",e.style.zIndex="1500",n.style.transform="translate3d(-583px, 0, 0)",n.style.zIndex="500"},200),setTimeout(function(){e.style.opacity="1"},700),p=2):2===p?(n.style.opacity="0",setTimeout(function(){e.style.transform="translate3d(0, 0, 0)",e.style.zIndex="1000",n.style.transform="translate3d(583px, 0, 0)",n.style.zIndex="1500",t.style.transform="translate3d(-583px, 0, 0)",t.style.zIndex="500"},200),setTimeout(function(){n.style.opacity="1"},700),p=3):3===p&&(t.style.opacity="0",setTimeout(function(){n.style.transform="translate3d(0, 0, 0)",n.style.zIndex="1000",t.style.transform="translate3d(583px, 0, 0)",t.style.zIndex="1500",e.style.transform="translate3d(-583px, 0, 0)",e.style.zIndex="500"},200),setTimeout(function(){t.style.opacity="1"},700),p=1)}window.onload=function(){f()},h=setInterval(function(){f()},3e3),document.getElementById("imageSection").onmouseenter=function(){clearInterval(h)},document.getElementById("imageSection").onmouseleave=function(){h=setInterval(function(){f()},3e3)},document.getElementById("imgbanbtn-prev").onclick=function(){var t,e,n;t=document.getElementById("image1"),e=document.getElementById("image2"),n=document.getElementById("image3"),1===p?(t.style.opacity="0",setTimeout(function(){e.style.transform="translate3d(0, 0, 0)",e.style.zIndex="1000",t.style.transform="translate3d(-583px, 0, 0)",t.style.zIndex="1500",n.style.transform="translate3d(583px, 0, 0)",n.style.zIndex="500"},200),setTimeout(function(){t.style.opacity="1"},700),p=3):2===p?(e.style.opacity="0",setTimeout(function(){n.style.transform="translate3d(0, 0, 0)",n.style.zIndex="1000",e.style.transform="translate3d(-583px, 0, 0)",e.style.zIndex="1500",t.style.transform="translate3d(583px, 0, 0)",t.style.zIndex="500"},200),setTimeout(function(){e.style.opacity="1"},700),p=1):3===p&&(n.style.opacity="0",setTimeout(function(){t.style.transform="translate3d(0, 0, 0)",t.style.zIndex="1000",n.style.transform="translate3d(-583px, 0, 0)",n.style.zIndex="1500",e.style.transform="translate3d(583px, 0, 0)",e.style.zIndex="500"},200),setTimeout(function(){n.style.opacity="1"},700),p=2)},document.getElementById("imgbanbtn-next").onclick=function(){f()};var y=document.getElementsByClassName("dlSection")[0];y.style.opacity=0,y.style.transform="scale(1.1)",new Waypoint({element:y,handler:function(){y.style.opacity=1,y.style.transform="scale(1)",y.style.transition="all 1s ease"},offset:"62%"});var m=document.getElementById("mainFooter");m.style.opacity=0,m.style.transform="scale(1.1)",new Waypoint({element:m,handler:function(){m.style.opacity=1,m.style.transition="all 1000ms ease",m.style.transform="scale(1)"},offset:"88%"})},function(t,e,n){"use strict";n(11),n(4),n(1)},,function(t,e){},,,,,,,function(t,e){}]);