// Opentip
// Copyright (c) 2009-2012
// www.opentip.org
// MIT Licensed
var Opentip,firstAdapter,i,position,vendors,_i,_len,_ref,__slice=[].slice,__indexOf=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1},__hasProp={}.hasOwnProperty;for(Opentip=function(){function t(e,i,o,s){var n,r,a,h,p,d,l,u,c=this;if(this.id=++t.lastId,this.debug("Creating Opentip."),this.adapter=t.adapter,n=this.adapter.data(e,"opentips")||[],n.push(this),this.adapter.data(e,"opentips",n),this.triggerElement=this.adapter.wrap(e),this.triggerElement.length>1)throw Error("You can't call Opentip on multiple elements.");if(1>this.triggerElement.length)throw Error("Invalid element.");for(this.loaded=!1,this.loading=!1,this.visible=!1,this.waitingToShow=!1,this.waitingToHide=!1,this.currentPosition={left:0,top:0},this.dimensions={width:100,height:50},this.content="",this.redraw=!0,this.currentObservers={showing:!1,visible:!1,hiding:!1,hidden:!1},s=this.adapter.clone(s),typeof i=="object"?(s=i,i=o=void 0):typeof o=="object"&&(s=o,o=void 0),o!=null&&(s.title=o),i!=null&&this.setContent(i),s.style||(s.style=t.defaultStyle),a=[],a.push(t.styles.standard),s.style!=="standard"&&a.push(t.styles[s.style]),a.push(s),s=(l=this.adapter).extend.apply(l,[{}].concat(__slice.call(a))),s.hideTriggers=function(){var t,e,i,o;for(i=s.hideTriggers,o=[],t=0,e=i.length;e>t;t++)r=i[t],o.push(r);return o}(),s.hideTrigger&&s.hideTriggers.push(s.hideTrigger),u=["tipJoint","targetJoint","stem"],p=0,d=u.length;d>p;p++)h=u[p],s[h]&&typeof s[h]=="string"&&(s[h]=new t.Joint(s[h]));!s.ajax||s.ajax!==!0&&s.ajax||(s.ajax=this.adapter.tagName(this.triggerElement)==="A"?this.adapter.attr(this.triggerElement,"href"):!1),s.showOn==="click"&&this.adapter.tagName(this.triggerElement)==="A"&&this.adapter.observe(this.triggerElement,"click",function(t){return t.preventDefault(),t.stopPropagation(),t.stopped=!0}),s.target&&(s.fixed=!0),s.stem===!0&&(s.stem=new t.Joint(s.tipJoint)),s.target===!0?s.target=this.triggerElement:s.target&&(s.target=this.adapter.wrap(s.target)),this.currentStem=s.stem,s.delay==null&&(s.delay=s.showOn==="mouseover"?.2:0),s.targetJoint==null&&(s.targetJoint=new t.Joint(s.tipJoint).flip()),this.showTriggersWhenHidden=[],this.showTriggersWhenVisible=[],this.hideTriggers=[],s.showOn&&s.showOn!=="creation"&&this.showTriggersWhenHidden.push({element:this.triggerElement,event:s.showOn}),this.options=s,this.adapter.domReady(function(){return c._init()})}return t.prototype.STICKS_OUT_TOP=1,t.prototype.STICKS_OUT_BOTTOM=2,t.prototype.STICKS_OUT_LEFT=1,t.prototype.STICKS_OUT_RIGHT=2,t.prototype["class"]={container:"opentip-container",opentip:"opentip",content:"content",loadingIndicator:"loading-indicator",close:"close",goingToHide:"going-to-hide",hidden:"hidden",hiding:"hiding",goingToShow:"going-to-show",showing:"showing",visible:"visible",loading:"loading",ajaxError:"ajax-error",fixed:"fixed",showEffectPrefix:"show-effect-",hideEffectPrefix:"hide-effect-",stylePrefix:"style-"},t.prototype._init=function(){var t,e,i,o,s,n,r,a,h,p,d,l=this;for(this._buildContainer(),p=this.options.hideTriggers,o=n=0,a=p.length;a>n;o=++n){if(e=p[o],i=null,t=this.options.hideOn instanceof Array?this.options.hideOn[o]:this.options.hideOn,typeof e=="string")switch(e){case"trigger":t=t||"mouseout",i=this.triggerElement;break;case"tip":t=t||"mouseover",i=this.container;break;case"target":t=t||"mouseover",i=this.options.target;break;case"closeButton":break;default:throw Error("Unknown hide trigger: "+e+".")}else t=t||"mouseover",i=this.adapter.wrap(e);i&&(this.hideTriggers.push({element:i,event:t}),t==="mouseout"&&this.showTriggersWhenVisible.push({element:i,event:"mouseover"}))}for(this.bound={},d=["prepareToShow","prepareToHide","show","hide","reposition"],r=0,h=d.length;h>r;r++)s=d[r],this.bound[s]=function(t){return function(){return l[t].apply(l,arguments)}}(s);return this.activate(),this.options.showOn==="creation"?this.prepareToShow():void 0},t.prototype._buildContainer=function(){return this.container=this.adapter.create('<div id="opentip-'+this.id+'" class="'+this["class"].container+" "+this["class"].hidden+" "+this["class"].stylePrefix+this.options.className+'"></div>'),this.adapter.css(this.container,{position:"absolute"}),this.options.ajax&&this.adapter.addClass(this.container,this["class"].loading),this.options.fixed&&this.adapter.addClass(this.container,this["class"].fixed),this.options.showEffect&&this.adapter.addClass(this.container,""+this["class"].showEffectPrefix+this.options.showEffect),this.options.hideEffect?this.adapter.addClass(this.container,""+this["class"].hideEffectPrefix+this.options.hideEffect):void 0},t.prototype._buildElements=function(){var t,e;return this.tooltipElement=this.adapter.create('<div class="'+this["class"].opentip+'"><header></header><div class="'+this["class"].content+'"></div></div>'),this.backgroundCanvas=this.adapter.create('<canvas style="position: absolute;"></canvas>'),typeof G_vmlCanvasManager!="undefined"&&G_vmlCanvasManager!==null&&G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas)),t=this.adapter.find(this.tooltipElement,"header"),this.options.title&&(e=this.adapter.create("<h1></h1>"),this.adapter.update(e,this.options.title,this.options.escapeTitle),this.adapter.append(t,e)),this.options.ajax&&this.adapter.append(this.tooltipElement,this.adapter.create('<div class="'+this["class"].loadingIndicator+'"><span>Loading...</span></div>')),0>__indexOf.call(this.options.hideTriggers,"closeButton")||(this.closeButtonElement=this.adapter.create('<a href="javascript:undefined;" class="'+this["class"].close+'"><span>Close</span></a>'),this.adapter.append(t,this.closeButtonElement)),this.adapter.append(this.container,this.backgroundCanvas),this.adapter.append(this.container,this.tooltipElement),this.adapter.append(document.body,this.container)},t.prototype.setContent=function(t){return this.content=t,this.visible?this._updateElementContent():void 0},t.prototype._updateElementContent=function(){var t;return t=this.adapter.find(this.container,".content"),t!=null&&(typeof this.content=="function"&&(this.debug("Executing content function."),this.content=this.content(this)),this.adapter.update(t,this.content,this.options.escapeContent)),this._storeAndLockDimensions(),this.reposition()},t.prototype._storeAndLockDimensions=function(){var t;return t=this.dimensions,this.adapter.css(this.container,{width:"auto",left:"0px",top:"0px"}),this.dimensions=this.adapter.dimensions(this.container),this.dimensions.width+=1,this.adapter.css(this.container,{width:""+this.dimensions.width+"px",top:""+this.currentPosition.top+"px",left:""+this.currentPosition.left+"px"}),this._dimensionsEqual(this.dimensions,t)?void 0:(this.redraw=!0,this._draw())},t.prototype.activate=function(){return this._setupObservers("-showing","-visible","hidden","hiding")},t.prototype.deactivate=function(){return this.debug("Deactivating tooltip."),this.hide()},t.prototype._setupObservers=function(){var t,e,i,o,s,n,r,a,h,p,d,l,u,c,g,f,m=this;for(o=1>arguments.length?[]:__slice.call(arguments,0),n=0,p=o.length;p>n;n++)if(i=o[n],e=!1,i.charAt(0)==="-"&&(e=!0,i=i.substr(1)),this.currentObservers[i]!==!e)switch(this.currentObservers[i]=!e,t=function(){var t,i,o;return t=1>arguments.length?[]:__slice.call(arguments,0),e?(i=m.adapter).stopObserving.apply(i,t):(o=m.adapter).observe.apply(o,t)},i){case"showing":for(c=this.hideTriggers,r=0,d=c.length;d>r;r++)s=c[r],t(s.element,s.event,this.bound.prepareToHide);t(document.onresize!=null?document:window,"resize",this.bound.reposition),t(window,"scroll",this.bound.reposition);break;case"visible":for(g=this.showTriggersWhenVisible,a=0,l=g.length;l>a;a++)s=g[a],t(s.element,s.event,this.bound.prepareToShow);break;case"hiding":for(f=this.showTriggersWhenHidden,h=0,u=f.length;u>h;h++)s=f[h],t(s.element,s.event,this.bound.prepareToShow);break;case"hidden":break;default:throw Error("Unknown state: "+i)}return null},t.prototype.prepareToShow=function(){return this._abortHiding(),this.visible?void 0:(this.debug("Showing in "+this.options.delay+"s."),this.options.group&&t._abortShowingGroup(this.options.group),this.preparingToShow=!0,this._setupObservers("-hidden","-hiding","showing"),this._followMousePosition(),this.reposition(),this._showTimeoutId=this.setTimeout(this.bound.show,this.options.delay||0))},t.prototype.show=function(){var e=this;return this._clearTimeouts(),this.visible?void 0:this._triggerElementExists()?(this.debug("Showing now."),this.options.group&&t._hideGroup(this.options.group),this.visible=!0,this.preparingToShow=!1,this.tooltipElement==null&&this._buildElements(),this._updateElementContent(),!this.options.ajax||this.loaded&&this.options.ajaxCache||this._loadAjax(),this._searchAndActivateCloseButtons(),this._startEnsureTriggerElement(),this.adapter.css(this.container,{zIndex:t.lastZIndex++}),this._setupObservers("-hidden","-hiding","showing","visible"),this.reposition(),this.adapter.removeClass(this.container,this["class"].hiding),this.adapter.removeClass(this.container,this["class"].hidden),this.adapter.addClass(this.container,this["class"].goingToShow),this.setCss3Style(this.container,{transitionDuration:"0s"}),this.defer(function(){var t;return e.adapter.removeClass(e.container,e["class"].goingToShow),e.adapter.addClass(e.container,e["class"].showing),t=0,e.options.showEffect&&e.options.showEffectDuration&&(t=e.options.showEffectDuration),e.setCss3Style(e.container,{transitionDuration:""+t+"s"}),e._visibilityStateTimeoutId=e.setTimeout(function(){return e.adapter.removeClass(e.container,e["class"].showing),e.adapter.addClass(e.container,e["class"].visible)},t),e._activateFirstInput()}),this._draw()):this.deactivate()},t.prototype._abortShowing=function(){return this.preparingToShow?(this.debug("Aborting showing."),this._clearTimeouts(),this._stopFollowingMousePosition(),this.preparingToShow=!1,this._setupObservers("-showing","-visible","hiding","hidden")):void 0},t.prototype.prepareToHide=function(){return this._abortShowing(),this.visible?(this.debug("Hiding in "+this.options.hideDelay+"s"),this.preparingToHide=!0,this._setupObservers("-showing","-visible","-hidden","hiding"),this._hideTimeoutId=this.setTimeout(this.bound.hide,this.options.hideDelay)):void 0},t.prototype.hide=function(){var t=this;return this._clearTimeouts(),this.visible?(this.debug("Hiding!"),this.visible=!1,this.preparingToHide=!1,this._stopEnsureTriggerElement(),this._setupObservers("-showing","-visible","hiding","hidden"),this.options.fixed||this._stopFollowingMousePosition(),this.adapter.removeClass(this.container,this["class"].visible),this.adapter.removeClass(this.container,this["class"].showing),this.adapter.addClass(this.container,this["class"].goingToHide),this.setCss3Style(this.container,{transitionDuration:"0s"}),this.defer(function(){var e;return t.adapter.removeClass(t.container,t["class"].goingToHide),t.adapter.addClass(t.container,t["class"].hiding),e=0,t.options.hideEffect&&t.options.hideEffectDuration&&(e=t.options.hideEffectDuration),t.setCss3Style(t.container,{transitionDuration:""+e+"s"}),t._visibilityStateTimeoutId=t.setTimeout(function(){return t.adapter.removeClass(t.container,t["class"].hiding),t.adapter.addClass(t.container,t["class"].hidden),t.setCss3Style(t.container,{transitionDuration:"0s"})},e)})):void 0},t.prototype._abortHiding=function(){return this.preparingToHide?(this.debug("Aborting hiding."),this._clearTimeouts(),this.preparingToHide=!1,this._setupObservers("-hiding","showing","visible")):void 0},t.prototype.reposition=function(t){var e,i,o,s=this;return t==null&&(t=this.lastEvent),e=this.getPosition(t),e==null||(i=this.options.stem,this.options.containInViewport&&(o=this._ensureViewportContainment(t,e),e=o.position,i=o.stem),this._positionsEqual(e,this.currentPosition))?void 0:(this.options.stem&&!i.eql(this.currentStem)&&(this.redraw=!0),this.currentPosition=e,this.currentStem=i,this._draw(),this.adapter.css(this.container,{left:""+e.left+"px",top:""+e.top+"px"}),this.defer(function(){var t,e;return t=s.adapter.unwrap(s.container),t.style.visibility="hidden",e=t.offsetHeight,t.style.visibility="visible"}))},t.prototype.getPosition=function(t,e,i,o){var s,n,r,a,h,p,d,l,u,c;if(e==null&&(e=this.options.tipJoint),i==null&&(i=this.options.targetJoint),h={},this.options.target)l=this.adapter.offset(this.options.target),d=this.adapter.dimensions(this.options.target),h=l,i.right?(u=this.adapter.unwrap(this.options.target),u.getBoundingClientRect!=null?h.left=u.getBoundingClientRect().right+((c=window.pageXOffset)!=null?c:document.body.scrollLeft):h.left+=d.width):i.center&&(h.left+=Math.round(d.width/2)),i.bottom?h.top+=d.height:i.middle&&(h.top+=Math.round(d.height/2)),this.options.borderWidth&&(this.options.tipJoint.left&&(h.left+=this.options.borderWidth),this.options.tipJoint.right&&(h.left-=this.options.borderWidth),this.options.tipJoint.top?h.top+=this.options.borderWidth:this.options.tipJoint.bottom&&(h.top-=this.options.borderWidth));else{if(t!=null&&(this.lastEvent=t),r=this.adapter.mousePosition(t),r==null)return;h={top:r.y,left:r.x}}return this.options.autoOffset&&(p=this.options.stem?this.options.stemLength:0,a=p&&this.options.fixed?2:10,s=e.middle&&!this.options.fixed?15:0,n=e.center&&!this.options.fixed?15:0,e.right?h.left-=a+s:e.left&&(h.left+=a+s),e.bottom?h.top-=a+n:e.top&&(h.top+=a+n),p&&(o==null&&(o=this.options.stem),o.right?h.left-=p:o.left&&(h.left+=p),o.bottom?h.top-=p:o.top&&(h.top+=p))),h.left+=this.options.offset[0],h.top+=this.options.offset[1],e.right?h.left-=this.dimensions.width:e.center&&(h.left-=Math.round(this.dimensions.width/2)),e.bottom?h.top-=this.dimensions.height:e.middle&&(h.top-=Math.round(this.dimensions.height/2)),h},t.prototype._ensureViewportContainment=function(e,i){var o,s,n,r,a,h,p,d,l,u,c,g;if(p=this.options.stem,n={position:i,stem:p},!this.visible||!i)return n;if(d=this._sticksOut(i),!d[0]&&!d[1])return n;if(u=new t.Joint(this.options.tipJoint),this.options.targetJoint&&(l=new t.Joint(this.options.targetJoint)),h=this.adapter.scrollOffset(),c=this.adapter.viewportDimensions(),g=[i.left-h[0],i.top-h[1]],o=!1,c.width>=this.dimensions.width&&d[0])switch(o=!0,d[0]){case this.STICKS_OUT_LEFT:u.setHorizontal("left"),this.options.targetJoint&&l.setHorizontal("right");break;case this.STICKS_OUT_RIGHT:u.setHorizontal("right"),this.options.targetJoint&&l.setHorizontal("left")}if(c.height>=this.dimensions.height&&d[1])switch(o=!0,d[1]){case this.STICKS_OUT_TOP:u.setVertical("top"),this.options.targetJoint&&l.setVertical("bottom");break;case this.STICKS_OUT_BOTTOM:u.setVertical("bottom"),this.options.targetJoint&&l.setVertical("top")}return o?(this.options.stem&&(p=u),i=this.getPosition(e,u,l,p),s=this._sticksOut(i),r=!1,a=!1,s[0]&&s[0]!==d[0]&&(r=!0,u.setHorizontal(this.options.tipJoint.horizontal),this.options.targetJoint&&l.setHorizontal(this.options.targetJoint.horizontal)),s[1]&&s[1]!==d[1]&&(a=!0,u.setVertical(this.options.tipJoint.vertical),this.options.targetJoint&&l.setVertical(this.options.targetJoint.vertical)),r&&a?n:((r||a)&&(this.options.stem&&(p=u),i=this.getPosition(e,u,l,p)),{position:i,stem:p})):n},t.prototype._sticksOut=function(t){var e,i,o,s;return i=this.adapter.scrollOffset(),s=this.adapter.viewportDimensions(),e=[t.left-i[0],t.top-i[1]],o=[!1,!1],0>e[0]?o[0]=this.STICKS_OUT_LEFT:e[0]+this.dimensions.width>s.width&&(o[0]=this.STICKS_OUT_RIGHT),0>e[1]?o[1]=this.STICKS_OUT_TOP:e[1]+this.dimensions.height>s.height&&(o[1]=this.STICKS_OUT_BOTTOM),o},t.prototype._draw=function(){var e,i,o,s,n,r,a,h,p,d,l,u,c,g,f,m=this;if(this.backgroundCanvas&&this.redraw)return this.debug("Drawing background."),this.redraw=!1,r=[0,0],a=[0,0],0>__indexOf.call(this.options.hideTriggers,"closeButton")||(n=new t.Joint(((g=this.currentStem)!=null?g+"":void 0)==="top right"?"top left":"top right"),r=[this.options.closeButtonRadius+this.options.closeButtonOffset[0],this.options.closeButtonRadius+this.options.closeButtonOffset[1]],a=[this.options.closeButtonRadius-this.options.closeButtonOffset[0],this.options.closeButtonRadius-this.options.closeButtonOffset[1]]),o=this.adapter.clone(this.dimensions),s=[0,0],this.options.borderWidth&&(o.width+=this.options.borderWidth*2,o.height+=this.options.borderWidth*2,s[0]-=this.options.borderWidth,s[1]-=this.options.borderWidth),this.options.shadow&&(o.width+=this.options.shadowBlur*2,o.width+=Math.max(0,this.options.shadowOffset[0]-this.options.shadowBlur*2),o.height+=this.options.shadowBlur*2,o.height+=Math.max(0,this.options.shadowOffset[1]-this.options.shadowBlur*2),s[0]-=Math.max(0,this.options.shadowBlur-this.options.shadowOffset[0]),s[1]-=Math.max(0,this.options.shadowBlur-this.options.shadowOffset[1])),i={left:0,right:0,top:0,bottom:0},this.currentStem&&(this.currentStem.left?i.left=this.options.stemLength:this.currentStem.right&&(i.right=this.options.stemLength),this.currentStem.top?i.top=this.options.stemLength:this.currentStem.bottom&&(i.bottom=this.options.stemLength)),n&&(n.left?i.left=Math.max(i.left,a[0]):n.right&&(i.right=Math.max(i.right,a[0])),n.top?i.top=Math.max(i.top,a[1]):n.bottom&&(i.bottom=Math.max(i.bottom,a[1]))),o.width+=i.left+i.right,o.height+=i.top+i.bottom,s[0]-=i.left,s[1]-=i.top,this.currentStem&&this.options.borderWidth&&(f=this._getPathStemMeasures(this.options.stemBase,this.options.stemLength,this.options.borderWidth),c=f.stemLength,u=f.stemBase),e=this.adapter.unwrap(this.backgroundCanvas),e.width=o.width,e.height=o.height,this.adapter.css(this.backgroundCanvas,{width:""+e.width+"px",height:""+e.height+"px",left:""+s[0]+"px",top:""+s[1]+"px"}),h=e.getContext("2d"),h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,e.width,e.height),h.beginPath(),h.fillStyle=this._getColor(h,this.dimensions,this.options.background,this.options.backgroundGradientHorizontal),h.lineJoin="miter",h.miterLimit=500,l=this.options.borderWidth/2,this.options.borderWidth?(h.strokeStyle=this.options.borderColor,h.lineWidth=this.options.borderWidth):(c=this.options.stemLength,u=this.options.stemBase),u==null&&(u=0),d=function(t,e,i){return i&&h.moveTo(Math.max(u,m.options.borderRadius,r[0])+1-l,-l),e?(h.lineTo(t/2-u/2,-l),h.lineTo(t/2,-c-l),h.lineTo(t/2+u/2,-l)):void 0},p=function(t,e,i){var o,s,n,a;return t?(h.lineTo(-u+l,0-l),h.lineTo(c+l,-c-l),h.lineTo(l,u-l)):e?(a=m.options.closeButtonOffset,n=r[0],i%2!==0&&(a=[a[1],a[0]],n=r[1]),o=Math.acos(a[1]/m.options.closeButtonRadius),s=Math.acos(a[0]/m.options.closeButtonRadius),h.lineTo(-n+l,-l),h.arc(l-a[0],-l+a[1],m.options.closeButtonRadius,-(Math.PI/2+o),s,!1)):(h.lineTo(-m.options.borderRadius+l,-l),h.quadraticCurveTo(l,-l,l,m.options.borderRadius-l))},h.translate(-s[0],-s[1]),h.save(),function(){var e,i,o,s,r,a,l,u,c,g,f;for(f=[],i=c=0,g=t.positions.length/2;0>g?c>g:g>c;i=0>g?--c:++c)r=i*2,a=i===0||i===3?0:m.dimensions.width,l=2>i?0:m.dimensions.height,u=Math.PI/2*i,o=i%2===0?m.dimensions.width:m.dimensions.height,s=new t.Joint(t.positions[r]),e=new t.Joint(t.positions[r+1]),h.save(),h.translate(a,l),h.rotate(u),d(o,s.eql(m.currentStem),i===0),h.translate(o,0),p(e.eql(m.currentStem),e.eql(n),i),f.push(h.restore());return f}(),h.closePath(),h.save(),this.options.shadow&&(h.shadowColor=this.options.shadowColor,h.shadowBlur=this.options.shadowBlur,h.shadowOffsetX=this.options.shadowOffset[0],h.shadowOffsetY=this.options.shadowOffset[1]),h.fill(),h.restore(),this.options.borderWidth&&h.stroke(),h.restore(),n?function(){var t,e,i,o,s;return i=e=m.options.closeButtonRadius*2,n+""=="top right"?(s=[m.dimensions.width-m.options.closeButtonOffset[0],m.options.closeButtonOffset[1]],t=[s[0]+l,s[1]-l]):(s=[m.options.closeButtonOffset[0],m.options.closeButtonOffset[1]],t=[s[0]-l,s[1]-l]),h.translate(t[0],t[1]),o=m.options.closeButtonCrossSize/2,h.save(),h.beginPath(),h.strokeStyle=m.options.closeButtonCrossColor,h.lineWidth=m.options.closeButtonCrossLineWidth,h.lineCap="round",h.moveTo(-o,-o),h.lineTo(o,o),h.stroke(),h.beginPath(),h.moveTo(o,-o),h.lineTo(-o,o),h.stroke(),h.restore(),m.adapter.css(m.closeButtonElement,{left:""+(s[0]-o-m.options.closeButtonLinkOverscan)+"px",top:""+(s[1]-o-m.options.closeButtonLinkOverscan)+"px",width:""+(m.options.closeButtonCrossSize+m.options.closeButtonLinkOverscan*2)+"px",height:""+(m.options.closeButtonCrossSize+m.options.closeButtonLinkOverscan*2)+"px"})}():void 0},t.prototype._getPathStemMeasures=function(t,e,i){var o,s,n,r,a,h,p;if(r=i/2,n=Math.atan(t/2/e),o=n*2,a=r/Math.sin(o),s=2*a*Math.cos(n),p=r+e-s,0>p)throw Error("Sorry but your stemLength / stemBase ratio is strange.");return h=Math.tan(n)*p*2,{stemLength:p,stemBase:h}},t.prototype._getColor=function(t,e,i,o){var s,n,r,a,h;if(o==null&&(o=!1),typeof i=="string")return i;for(n=o?t.createLinearGradient(0,0,e.width,0):t.createLinearGradient(0,0,0,e.height),r=a=0,h=i.length;h>a;r=++a)s=i[r],n.addColorStop(s[0],s[1]);return n},t.prototype._searchAndActivateCloseButtons=function(){var t,e,i,o;for(o=this.adapter.findAll(this.container,"."+this["class"].close),e=0,i=o.length;i>e;e++)t=o[e],this.hideTriggers.push({element:this.adapter.wrap(t),event:"click"});return this.currentObservers.showing&&this._setupObservers("-showing","showing"),this.currentObservers.visible?this._setupObservers("-visible","visible"):void 0},t.prototype._activateFirstInput=function(){var t;return t=this.adapter.unwrap(this.adapter.find(this.container,"input, textarea")),t!=null?typeof t.focus=="function"?t.focus():void 0:void 0},t.prototype._followMousePosition=function(){return this.options.fixed?void 0:this.adapter.observe(document.body,"mousemove",this.bound.reposition)},t.prototype._stopFollowingMousePosition=function(){return this.options.fixed?void 0:this.adapter.stopObserving(document.body,"mousemove",this.bound.reposition)},t.prototype._clearShowTimeout=function(){return clearTimeout(this._showTimeoutId)},t.prototype._clearHideTimeout=function(){return clearTimeout(this._hideTimeoutId)},t.prototype._clearTimeouts=function(){return clearTimeout(this._visibilityStateTimeoutId),this._clearShowTimeout(),this._clearHideTimeout()},t.prototype._triggerElementExists=function(){var t;t=this.adapter.unwrap(this.triggerElement);while(t.parentNode){if(t.parentNode.tagName==="BODY")return!0;t=t.parentNode}return!1},t.prototype._loadAjax=function(){var t=this;if(!this.loading)return this.loaded=!1,this.loading=!0,this.adapter.addClass(this.container,this["class"].loading),this.debug("Loading content from "+this.options.ajax),this.adapter.ajax({url:this.options.ajax,method:this.options.ajaxMethod,onSuccess:function(e){return t.debug("Loading successful."),t.adapter.removeClass(t.container,t["class"].loading),t.setContent(e)},onError:function(e){var i;return i="There was a problem downloading the content.",t.debug(i,e),t.setContent(i),t.adapter.addClass(t.container,t["class"].ajaxError)},onComplete:function(){return t.adapter.removeClass(t.container,t["class"].loading),t.loading=!1,t.loaded=!0,t._searchAndActivateCloseButtons(),t._activateFirstInput(),t.reposition()}})},t.prototype._ensureTriggerElement=function(){return this._triggerElementExists()?void 0:(this.deactivate(),this._stopEnsureTriggerElement())},t.prototype._ensureTriggerElementInterval=1e3,t.prototype._startEnsureTriggerElement=function(){var t=this;return this._ensureTriggerElementTimeoutId=setInterval(function(){return t._ensureTriggerElement()},this._ensureTriggerElementInterval)},t.prototype._stopEnsureTriggerElement=function(){return clearInterval(this._ensureTriggerElementTimeoutId)},t}(),vendors=["khtml","ms","o","moz","webkit"],Opentip.prototype.setCss3Style=function(t,e){var i,o,s,n,r;t=this.adapter.unwrap(t),r=[];for(i in e)__hasProp.call(e,i)&&(o=e[i],t.style[i]!=null?r.push(t.style[i]=o):r.push(function(){var e,r,a;for(a=[],e=0,r=vendors.length;r>e;e++)s=vendors[e],n=""+this.ucfirst(s)+this.ucfirst(i),t.style[n]!=null?a.push(t.style[n]=o):a.push(void 0);return a}.call(this)));return r},Opentip.prototype.defer=function(t){return setTimeout(t,0)},Opentip.prototype.setTimeout=function(t,e){return setTimeout(t,e?e*1e3:0)},Opentip.prototype.ucfirst=function(t){return t==null?"":t.charAt(0).toUpperCase()+t.slice(1)},Opentip.prototype.dasherize=function(t){return t.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()})},Opentip.Joint=function(){function t(t){t!=null&&(t instanceof Opentip.Joint&&(t+=""),this.set(t))}return t.prototype.set=function(t){return t=t.toLowerCase(),this.setHorizontal(t),this.setVertical(t),this},t.prototype.setHorizontal=function(t){var e,i,o,s,n,r,a;for(i=["left","center","right"],o=0,n=i.length;n>o;o++)e=i[o],~t.indexOf(e)&&(this.horizontal=e.toLowerCase());for(this.horizontal==null&&(this.horizontal="center"),a=[],s=0,r=i.length;r>s;s++)e=i[s],a.push(this[e]=this.horizontal===e?e:void 0);return a},t.prototype.setVertical=function(t){var e,i,o,s,n,r,a;for(i=["top","middle","bottom"],o=0,n=i.length;n>o;o++)e=i[o],~t.indexOf(e)&&(this.vertical=e.toLowerCase());for(this.vertical==null&&(this.vertical="middle"),a=[],s=0,r=i.length;r>s;s++)e=i[s],a.push(this[e]=this.vertical===e?e:void 0);return a},t.prototype.eql=function(t){return t!=null&&this.horizontal===t.horizontal&&this.vertical===t.vertical},t.prototype.flip=function(){var t,e;return e=Opentip.position[this.toString(!0)],t=(e+4)%8,this.set(Opentip.positions[t]),this},t.prototype.toString=function(t){var e,i;return t==null&&(t=!1),i=this.vertical==="middle"?"":this.vertical,e=this.horizontal==="center"?"":this.horizontal,i&&e&&(e=t?Opentip.prototype.ucfirst(e):" "+e),""+i+e},t}(),Opentip.prototype._positionsEqual=function(t,e){return t!=null&&e!=null&&t.left===e.left&&t.top===e.top},Opentip.prototype._dimensionsEqual=function(t,e){return t!=null&&e!=null&&t.width===e.width&&t.height===e.height},Opentip.prototype.debug=function(){var t;return t=1>arguments.length?[]:__slice.call(arguments,0),Opentip.debug&&(typeof console!="undefined"&&console!==null?console.debug:void 0)!=null?(t.unshift("#"+this.id+" |"),console.debug.apply(console,t)):void 0},Opentip.findElements=function(){var t,e,i,o,s,n,r,a,h,p;for(t=Opentip.adapter,h=t.findAll(document.body,"[data-ot]"),p=[],r=0,a=h.length;a>r;r++){i=h[r],n={},e=t.data(i,"ot"),(e===""||e==="true"||e==="yes")&&(e=t.attr(i,"title"),t.attr(i,"title","")),e=e||"";for(o in Opentip.styles.standard)(s=t.data(i,"ot"+Opentip.prototype.ucfirst(o)))&&(s==="yes"||s==="true"||s==="on"?s=!0:(s==="no"||s==="false"||s==="off")&&(s=!1),n[o]=s);p.push(new Opentip(i,e,n))}return p},Opentip.version="2.0.2-dev",Opentip.debug=!1,Opentip.lastId=0,Opentip.lastZIndex=100,Opentip.tips=[],Opentip._abortShowingGroup=function(){},Opentip._hideGroup=function(){},Opentip.adapters={},Opentip.adapter=null,firstAdapter=!0,Opentip.addAdapter=function(t){return Opentip.adapters[t.name]=t,firstAdapter?(Opentip.adapter=t,t.domReady(Opentip.findElements),firstAdapter=!1):void 0},Opentip.positions=["top","topRight","right","bottomRight","bottom","bottomLeft","left","topLeft"],Opentip.position={},_ref=Opentip.positions,i=_i=0,_len=_ref.length;_len>_i;i=++_i)position=_ref[i],Opentip.position[position]=i;Opentip.styles={standard:{title:void 0,escapeTitle:!0,escapeContent:!1,className:"standard",stem:!0,delay:null,hideDelay:.1,fixed:!1,showOn:"mouseover",hideTrigger:"trigger",hideTriggers:[],hideOn:null,offset:[0,0],containInViewport:!0,autoOffset:!0,showEffect:"appear",hideEffect:"fade",showEffectDuration:.3,hideEffectDuration:.2,stemLength:5,stemBase:8,tipJoint:"top left",target:null,targetJoint:null,ajax:!1,ajaxMethod:"GET",ajaxCache:!0,group:null,style:null,background:"#fff18f",backgroundGradientHorizontal:!1,closeButtonOffset:[5,5],closeButtonRadius:7,closeButtonCrossSize:4,closeButtonCrossColor:"#d2c35b",closeButtonCrossLineWidth:1.5,closeButtonLinkOverscan:6,borderRadius:5,borderWidth:1,borderColor:"#f2e37b",shadow:!0,shadowBlur:10,shadowOffset:[3,3],shadowColor:"rgba(0, 0, 0, 0.1)"},glass:{className:"glass",background:[[0,"rgba(252, 252, 252, 0.8)"],[.5,"rgba(255, 255, 255, 0.8)"],[.5,"rgba(250, 250, 250, 0.9)"],[1,"rgba(245, 245, 245, 0.9)"]],borderColor:"#eee",closeButtonCrossColor:"rgba(0, 0, 0, 0.2)",borderRadius:15,closeButtonRadius:10,closeButtonOffset:[8,8]},dark:{className:"dark",borderRadius:13,borderColor:"#444",closeButtonCrossColor:"rgba(240, 240, 240, 1)",shadowColor:"rgba(0, 0, 0, 0.3)",shadowOffset:[2,2],background:[[0,"rgba(30, 30, 30, 0.7)"],[.5,"rgba(30, 30, 30, 0.8)"],[.5,"rgba(10, 10, 10, 0.8)"],[1,"rgba(10, 10, 10, 0.9)"]]},alert:{className:"alert",borderRadius:1,borderColor:"#AE0D11",closeButtonCrossColor:"rgba(255, 255, 255, 1)",shadowColor:"rgba(0, 0, 0, 0.3)",shadowOffset:[2,2],background:[[0,"rgba(203, 15, 19, 0.7)"],[.5,"rgba(203, 15, 19, 0.8)"],[.5,"rgba(189, 14, 18, 0.8)"],[1,"rgba(179, 14, 17, 0.9)"]]}},Opentip.defaultStyle="standard",typeof module!="undefined"&&module!==null?module.exports=Opentip:window.Opentip=Opentip;var __slice=[].slice;(function(t){var e;return t.fn.opentip=function(t,e,i){return new Opentip(this,t,e,i)},e=function(){function e(){}return e.prototype.name="jquery",e.prototype.domReady=function(e){return t(e)},e.prototype.create=function(e){return t(e)},e.prototype.wrap=function(e){if(e=t(e),e.length>1)throw Error("Multiple elements provided.");return e},e.prototype.unwrap=function(e){return t(e)[0]},e.prototype.tagName=function(t){return this.unwrap(t).tagName},e.prototype.attr=function(){var e,i,o;return i=arguments[0],e=2>arguments.length?[]:__slice.call(arguments,1),(o=t(i)).attr.apply(o,e)},e.prototype.data=function(){var e,i,o;return i=arguments[0],e=2>arguments.length?[]:__slice.call(arguments,1),(o=t(i)).data.apply(o,e)},e.prototype.find=function(e,i){return t(e).find(i)},e.prototype.findAll=function(){return this.find.apply(this,arguments)},e.prototype.update=function(e,i,o){return e=t(e),o?e.text(i):e.html(i)},e.prototype.append=function(e,i){return t(e).append(i)},e.prototype.addClass=function(e,i){return t(e).addClass(i)},e.prototype.removeClass=function(e,i){return t(e).removeClass(i)},e.prototype.css=function(e,i){return t(e).css(i)},e.prototype.dimensions=function(e){return{width:t(e).outerWidth(),height:t(e).outerHeight()}},e.prototype.scrollOffset=function(){return[window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop]},e.prototype.viewportDimensions=function(){return{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}},e.prototype.mousePosition=function(t){return t==null?null:{x:t.pageX,y:t.pageY}},e.prototype.offset=function(e){var i;return i=t(e).offset(),{left:i.left,top:i.top}},e.prototype.observe=function(e,i,o){return t(e).bind(i,o)},e.prototype.stopObserving=function(e,i,o){return t(e).unbind(i,o)},e.prototype.ajax=function(e){var i,o;if(e.url==null)throw Error("No url provided");return t.ajax({url:e.url,type:(i=(o=e.method)!=null?o.toUpperCase():void 0)!=null?i:"GET"}).done(function(t){return typeof e.onSuccess=="function"?e.onSuccess(t):void 0}).fail(function(t){return typeof e.onError=="function"?e.onError("Server responded with status "+t.status):void 0}).always(function(){return typeof e.onComplete=="function"?e.onComplete():void 0})},e.prototype.clone=function(e){return t.extend({},e)},e.prototype.extend=function(){var e,i;return i=arguments[0],e=2>arguments.length?[]:__slice.call(arguments,1),t.extend.apply(t,[i].concat(__slice.call(e)))},e}(),Opentip.addAdapter(new e)})(jQuery)