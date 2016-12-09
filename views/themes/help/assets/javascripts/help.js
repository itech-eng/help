!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(n,o){this.$element=e(n),this.options=e.extend({},t.DEFAULTS,e.isPlainObject(o)&&o),this.init()}var n="qor.help",o="enable."+n,i="disable."+n,r="click."+n,s="keyup."+n;return t.prototype={constructor:t,init:function(){this.bind()},bind:function(){this.$element.on(r,".qor-help__lists [data-inline-url]",this.loadDoc).on(s,".qor-help__search",this.searchKeyup.bind(this)).on(r,".qor-help__search-button",this.search.bind(this)).on(r,".qor-doc__close",this.closeDoc)},unbind:function(){this.$element.off(r,".qor-help__lists [data-inline-url]",this.loadDoc).off(s,".qor-help__search",this.searchKeyup.bind(this)).off(r,".qor-help__search-button",this.search.bind(this)).off(r,".qor-doc__close",this.closeDoc)},searchKeyup:function(e){13==e.keyCode&&this.searchAction()},search:function(){this.searchAction()},searchAction:function(){var n=e(".qor-help__search-category"),o=e(".qor-help__search"),i=e(".qor-help__lists"),r=e(t.TEMPLATE_LOADING),s=[e(this).data().helpFilterUrl,"?",n.prop("name"),"=",n.find("option:selected").text(),"&",o.prop("name"),"=",o.val()].join("");e.ajax(s,{method:"GET",dataType:"html",processData:!1,contentType:!1,beforeSend:function(){i.hide().after(r),window.componentHandler.upgradeElement(r.children()[0])},success:function(t){i.html(e(t).find(".qor-help__lists").html()).show(),r.remove()},error:function(e,t,n){i.show(),r.remove(),window.alert([t,n].join(": "))}})},loadDoc:function(n){var o=e(n.target),i=e(".qor-help__lists li"),r=o.closest("li"),s=r.find(".qor-doc__preview"),c=e(t.TEMPLATE_LOADING),a=o.data().inlineUrl;return i.not(r).hide(),s.size()?(s.is(":visible")?(s.hide(),i.show()):s.show(),!1):(e.ajax(a,{method:"GET",dataType:"html",processData:!1,contentType:!1,beforeSend:function(){r.append(c),window.componentHandler.upgradeElement(c.children()[0])},success:function(n){e(n).find(".qor-form-container").appendTo(r).addClass("qor-fieldset qor-doc__preview").prepend(t.TEMPLATE_PREVIEW_CLOSE),c.remove()},error:function(e,t,n){c.remove(),window.alert([t,n].join(": "))}}),!1)},closeDoc:function(){var t=e(".qor-help__lists li"),n=e(".qor-doc__preview");t.show(),n.hide()},destroy:function(){this.unbind(),this.$element.removeData(n)}},t.TEMPLATE_LOADING='<div style="text-align: center; margin-top: 30px;"><div class="mdl-spinner mdl-js-spinner is-active qor-layout__bottomsheet-spinner"></div></div>',t.TEMPLATE_PREVIEW_CLOSE='<a href="javascript://" class="mdl-button mdl-button--fab mdl-button--primary mdl-js-button mdl-js-ripple-effect qor-doc__close"><i class="material-icons">close</i></a>',t.plugin=function(o){return this.each(function(){var i,r=e(this),s=r.data(n);if(!s){if(/destroy/.test(o))return;r.data(n,s=new t(this,o))}"string"==typeof o&&e.isFunction(i=s[o])&&i.apply(s)})},e(function(){var n='[data-toggle="qor.help"]';e(document).on(i,function(o){t.plugin.call(e(n,o.target),"destroy")}).on(o,function(o){t.plugin.call(e(n,o.target))}).triggerHandler(o)}),t});