!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(o,i){this.$element=e(o),this.options=e.extend({},t.DEFAULTS,e.isPlainObject(i)&&i),this.init()}var o="qor.help",i="enable."+o,n="disable."+o,r="click."+o,s="keyup."+o,a="change."+o;return t.prototype={constructor:t,init:function(){this.bind()},bind:function(){this.$element.on(r,".qor-help__lists [data-inline-url]",this.loadDoc).on(s,".qor-help__search",this.searchKeyup.bind(this)).on(r,".qor-help__search-button",this.search.bind(this)).on(a,".qor-help__search-category",this.search.bind(this))},unbind:function(){this.$element.off(r,".qor-help__lists [data-inline-url]",this.loadDoc).off(s,".qor-help__search",this.searchKeyup.bind(this)).off(r,".qor-help__search-button",this.search.bind(this)).off(a,".qor-help__search-category",this.search.bind(this))},searchKeyup:function(e){13==e.keyCode&&this.searchAction()},search:function(){this.searchAction()},searchAction:function(){var o=e(".qor-help__search-category"),i=e(".qor-help__search"),n=e(".qor-help__body"),r=e(t.TEMPLATE_LOADING),s=[i.data().helpFilterUrl,"?",o.prop("name"),"=",o.val(),"&",i.prop("name"),"=",i.val()].join("");e.ajax(s,{method:"GET",dataType:"html",processData:!1,contentType:!1,beforeSend:function(){n.hide().after(r),window.componentHandler.upgradeElement(r.children()[0])},success:function(t){e(".qor-slideout__title").show(),e(".qor-slideout__show_title").remove(),n.html(e(t).find(".qor-help__body").html()).show(),r.remove()},error:function(e,t,o){n.show(),r.remove(),window.alert([t,o].join(": "))}})},loadDoc:function(o){var i=e(o.target),n=e(".qor-help__index"),r=e(t.TEMPLATE_LOADING),s=e(".qor-help__body"),a=i.data().inlineUrl;return n.hide(),e.ajax(a,{method:"GET",dataType:"html",processData:!1,contentType:!1,beforeSend:function(){s.append(r),window.componentHandler.upgradeElement(r.children()[0])},success:function(o){e(o).find(".qor-page__show").appendTo(s).addClass("qor-doc__preview"),e(".qor-slideout__show_title").remove(),e(".qor-slideout__title").hide();var i=e("<h3 class='qor-slideout__title qor-slideout__show_title'></h3>");i.text(e(".qor-doc__preview .qor-help__document_title").hide().text()),i.prepend(e(t.TEMPLATE_PREVIEW_CLOSE)).appendTo(e(".qor-slideout__header")),e(".qor-slideout__title .qor-doc__close").click(function(){n.show(),e(".qor-slideout__title").show(),e(".qor-doc__preview").remove(),e(".qor-slideout__show_title").remove()}),r.remove()},error:function(e,t,o){r.remove(),window.alert([t,o].join(": "))}}),!1},destroy:function(){this.unbind(),this.$element.removeData(o)}},t.TEMPLATE_LOADING='<div style="text-align: center; margin-top: 30px;"><div class="mdl-spinner mdl-js-spinner is-active qor-layout__bottomsheet-spinner"></div></div>',t.TEMPLATE_PREVIEW_CLOSE='<a href="javascript://" class="qor-doc__close"><i class="material-icons">keyboard_backspace</i></a>',t.plugin=function(i){return this.each(function(){var n,r=e(this),s=r.data(o);if(!s){if(/destroy/.test(i))return;r.data(o,s=new t(this,i))}"string"==typeof i&&e.isFunction(n=s[i])&&n.apply(s)})},e(function(){var o='[data-toggle="qor.help"]';e(document).on(n,function(i){t.plugin.call(e(o,i.target),"destroy")}).on(i,function(i){t.plugin.call(e(o,i.target))}).triggerHandler(i)}),t});