$(document).ready(function(){
	


	/* DATE */

	var dateInput = $("#order_pickup_date").dateinput({format:"dddd, mmmm dd yyyy", trigger: true, min: 0, max: 180, "onShow": function(event) {
		
		var calendar = this.getCalendar();
        
        function disableDays() {
            var weeks = calendar.find('.calweek');
            
			// Go Through Each Week
            weeks.each(function(x){
			
				// Go Through Each Day
            	$(this).find('a').each(function(index){
            		
					var $this = $(this);
            		
            		
	            });
            });
        }
        calendar.find('#calprev, #calnext').click(disableDays);
        disableDays();
        
        //$('.pie-cart').slideUp(250);
		
	}}).change(function(event){
	
		// $(".pie-order .pie").slideUp(250, function(){
		// 	$(".pie-order .pie").remove();
		// 	$(".pie-order .total .cost").html("$0");
		// });
		
	}).bind("onHide", function(event){
		
		// if ($('.pie-cart').css("display") == "none") {
		// 	var date = $(this).val().split(",")[1];
		// 	$.get("/get_pies?date="+date, function(data) {
		// 		$('.pie-cart').html(data).slideDown(250);
		// 		bindPies();
		// 	});
		
		// }
		
		// $(this).blur();
		
		// return true;
		
	});
	
	// Load Pies From Initial Date
	
	// var date = $("#order_pickup_date").val().split(",")[1];
	// $.get("/get_pies?date="+date, function(data) {
	// 	$('.pie-cart').html(data).slideDown(250);
	// 	bindPies();
	// });
	
	// Move the calendar into the same div and the input to match width.
	$("#calroot").detach().appendTo($("#order_pickup_date").parent());
	
	// Remove focus when input is clicked to give illusion of button.
	$("#order_pickup_date").bind("focus", function(){ $(this).blur() });
	
	
	
	/* TIME */
	
	var $timeDisplay = $(".time .time-display");
	
	$("#order_pickup_time").rangeinput({
		keyboard:false,
		change:function(e,v){
			$timeDisplay.html(timeFromNumber(v));
		},
		onSlide:function(e,v){
			$timeDisplay.html(timeFromNumber(v));
		}
	});
	
	
	/* PIES */
	
	function bindPies() {
		
		var $pieList = $(".pie-order");
		
		$(".pie-cart a.pie").click(function(e){
			e.preventDefault();
			
			var $this = $(this),
				name = $this.find(".name").text(),
				cost = $this.find(".cost").text().replace("$",""),
				id = $this.attr("id").replace("pie-", "");
			
			$pieList.find(".empty").slideUp(500);
			
			if ($pieList.find(".pie").length < 5) {
			
				var row = $("<div/>", {
					class: 'pie',
					style: 'display:none',
					html: "<div class='name'>"+ name +"</div><div class='x'></div><div class='cost'>$"+ cost +"</div><input type='hidden' name='order[pie_ids][]' value='"+ id +"' />"
				}).hide().prependTo($pieList).slideDown(500);
				
				var removeButton = $("<a/>", {
					href: "/#/remove-pie",
					class: "remove",
					text: "[x]"
				}).click(removePie).appendTo(row.find('.x'));
				
				var $total = $pieList.find(".total .cost");
				
				$total.fadeOut(150, function(){
					$total.html("$" + (parseInt(cost) + parseInt($total.text().replace("$","")) ) ).fadeIn(150);
				});
			
			} else {
				var $pieLimit = $(".pie-limit");
	
				$pieLimit.css({color:'red'});
	
				setTimeout(function(){
					$pieLimit.css({color:'inherit'});
				}, 4000);
			}
			
	
		});
		
		$(".pie-order a.remove").click(removePie);
	}
	
});

function removePie(e) {
	e.preventDefault();
	
	var $this = $(this);
	
	if (!$this.hasClass("deleting")) {
	
		$this.addClass("deleting");
		
		var $parent = $this.parent().parent(),
			$total = $parent.parent().find(".total .cost");
		
		$total.fadeOut(150, function(){
			var cost = parseInt($parent.find(".cost").text().replace("$","")),
				newCost = parseInt($total.text().replace("$","")) - cost;
			
			$total.html("$" + (newCost < 0 ? 0 : newCost) ).fadeIn(150);
		});
		
		$parent.slideUp(500, function(){
			$parent.remove();
		});
	}
}


/*function timeFromNumber(number) {
	var time = (number * 0.01);
		time = (Math.floor(time) * 100) + ((time - Math.floor(time)) * 60);
	
	if (time >= 1300) {
		var timeString = "0" + (time - 1200).toString();
	} else {
		var timeString = time.toString();
	}
	
	return timeString.substr(0,2) + ":" + timeString.substr(2,3) + "pm";
}*/

function timeFromNumber(number) {
	var time = (number * 0.01);
		time = (Math.floor(time) * 100) + ((time - Math.floor(time)) * 60);

	if(time == 0){
		var timeString = "1200";
		timetype = "am";
	}
	else if(time>0 && time<100){
		var timeString = "12" + time.toString();
		timetype = "am";
	}
	else if(time>=100 && time <1000){
		var timeString = "0" + time.toString();
		timetype = "am";
	}else if(time>=1000 && time<1200){
		var timeString = time.toString();
		timetype = "am";
	}else if(time>=1200 && time<=1300){
		var timeString = time.toString();
		timetype = "pm";
	}
	else if(time>=1300 && time<2200){
		var timeString = "0" + (time - 1200).toString();
		timetype = "pm";
	}else{
		var timeString = (time - 1200).toString();
		timetype = "pm";
	}
	
	return timeString.substr(0,2) + ":" + timeString.substr(2,3) + timetype;
}


/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * dateinput/dateinput.js
 * rangeinput/rangeinput.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(a,b){a.tools=a.tools||{version:"v1.2.7"};var c=[],d={},e,f=[75,76,38,39,74,72,40,37],g={};e=a.tools.dateinput={conf:{format:"mm/dd/yy",formatter:"default",selectors:!1,yearRange:[-5,5],lang:"en",offset:[0,0],speed:0,firstDay:0,min:b,max:b,trigger:0,toggle:0,editable:0,css:{prefix:"cal",input:"date",root:0,head:0,title:0,prev:0,next:0,month:0,year:0,days:0,body:0,weeks:0,today:0,current:0,week:0,off:0,sunday:0,focus:0,disabled:0,trigger:0}},addFormatter:function(a,b){d[a]=b},localize:function(b,c){a.each(c,function(a,b){c[a]=b.split(",")}),g[b]=c}},e.localize("en",{months:"January,February,March,April,May,June,July,August,September,October,November,December",shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",days:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",shortDays:"Sun,Mon,Tue,Wed,Thu,Fri,Sat"});function h(a,b){return(new Date(a,b+1,0)).getDate()}function i(a,b){a=""+a,b=b||2;while(a.length<b)a="0"+a;return a}var j=a("<a/>");function k(a,b,c,e){var f=b.getDate(),h=b.getDay(),k=b.getMonth(),l=b.getFullYear(),m={d:f,dd:i(f),ddd:g[e].shortDays[h],dddd:g[e].days[h],m:k+1,mm:i(k+1),mmm:g[e].shortMonths[k],mmmm:g[e].months[k],yy:String(l).slice(2),yyyy:l},n=d[a](c,b,m,e);return j.html(n).html()}e.addFormatter("default",function(a,b,c,d){return a.replace(/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,function(a){return a in c?c[a]:a})}),e.addFormatter("prefixed",function(a,b,c,d){return a.replace(/%(d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*')/g,function(a,b){return b in c?c[b]:a})});function l(a){return parseInt(a,10)}function m(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()==b.getMonth()&&a.getDate()==b.getDate()}function n(a){if(a!==b){if(a.constructor==Date)return a;if(typeof a=="string"){var c=a.split("-");if(c.length==3)return new Date(l(c[0]),l(c[1])-1,l(c[2]));if(!/^-?\d+$/.test(a))return;a=l(a)}var d=new Date;d.setDate(d.getDate()+a);return d}}function o(d,e){var i=this,j=new Date,o=j.getFullYear(),p=e.css,q=g[e.lang],r=a("#"+p.root),s=r.find("#"+p.title),t,u,v,w,x,y,z=d.attr("data-value")||e.value||d.val(),A=d.attr("min")||e.min,B=d.attr("max")||e.max,C,D;A===0&&(A="0"),z=n(z)||j,A=n(A||new Date(o+e.yearRange[0],1,1)),B=n(B||new Date(o+e.yearRange[1]+1,1,-1));if(!q)throw"Dateinput: invalid language: "+e.lang;if(d.attr("type")=="date"){var D=d.clone(),E=D.wrap("<div/>").parent().html(),F=a(E.replace(/type/i,"type=text data-orig-type"));e.value&&F.val(e.value),d.replaceWith(F),d=F}d.addClass(p.input);var G=d.add(i);if(!r.length){r=a("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({position:"absolute"}).attr("id",p.root),r.children().eq(0).attr("id",p.head).end().eq(1).attr("id",p.body).children().eq(0).attr("id",p.days).end().eq(1).attr("id",p.weeks).end().end().end().find("a").eq(0).attr("id",p.prev).end().eq(1).attr("id",p.next),s=r.find("#"+p.head).find("div").attr("id",p.title);if(e.selectors){var H=a("<select/>").attr("id",p.month),I=a("<select/>").attr("id",p.year);s.html(H.add(I))}var J=r.find("#"+p.days);for(var K=0;K<7;K++)J.append(a("<span/>").text(q.shortDays[(K+e.firstDay)%7]));a("body").append(r)}e.trigger&&(t=a("<a/>").attr("href","#").addClass(p.trigger).click(function(a){e.toggle?i.toggle():i.show();return a.preventDefault()}).insertAfter(d));var L=r.find("#"+p.weeks);I=r.find("#"+p.year),H=r.find("#"+p.month);function M(b,c,e){z=b,w=b.getFullYear(),x=b.getMonth(),y=b.getDate(),e||(e=a.Event("api")),e.type=="click"&&!a.browser.msie&&d.focus(),e.type="beforeChange",G.trigger(e,[b]);e.isDefaultPrevented()||(d.val(k(c.formatter,b,c.format,c.lang)),e.type="change",G.trigger(e),d.data("date",b),i.hide(e))}function N(b){b.type="onShow",G.trigger(b),a(document).on("keydown.d",function(b){if(b.ctrlKey)return!0;var c=b.keyCode;if(c==8||c==46){d.val("");return i.hide(b)}if(c==27||c==9)return i.hide(b);if(a(f).index(c)>=0){if(!C){i.show(b);return b.preventDefault()}var e=a("#"+p.weeks+" a"),g=a("."+p.focus),h=e.index(g);g.removeClass(p.focus);if(c==74||c==40)h+=7;else if(c==75||c==38)h-=7;else if(c==76||c==39)h+=1;else if(c==72||c==37)h-=1;h>41?(i.addMonth(),g=a("#"+p.weeks+" a:eq("+(h-42)+")")):h<0?(i.addMonth(-1),g=a("#"+p.weeks+" a:eq("+(h+42)+")")):g=e.eq(h),g.addClass(p.focus);return b.preventDefault()}if(c==34)return i.addMonth();if(c==33)return i.addMonth(-1);if(c==36)return i.today();c==13&&(a(b.target).is("select")||a("."+p.focus).click());return a([16,17,18,9]).index(c)>=0}),a(document).on("click.d",function(b){var c=b.target;!a(c).parents("#"+p.root).length&&c!=d[0]&&(!t||c!=t[0])&&i.hide(b)})}a.extend(i,{show:function(b){if(!(d.attr("readonly")||d.attr("disabled")||C)){b=b||a.Event(),b.type="onBeforeShow",G.trigger(b);if(b.isDefaultPrevented())return;a.each(c,function(){this.hide()}),C=!0,H.off("change").change(function(){i.setValue(l(I.val()),l(a(this).val()))}),I.off("change").change(function(){i.setValue(l(a(this).val()),l(H.val()))}),u=r.find("#"+p.prev).off("click").click(function(a){u.hasClass(p.disabled)||i.addMonth(-1);return!1}),v=r.find("#"+p.next).off("click").click(function(a){v.hasClass(p.disabled)||i.addMonth();return!1}),i.setValue(z);var f=d.offset();/iPad/i.test(navigator.userAgent)&&(f.top-=a(window).scrollTop()),r.css({top:f.top+d.outerHeight({margins:!0})+e.offset[0],left:f.left+e.offset[1]}),e.speed?r.show(e.speed,function(){N(b)}):(r.show(),N(b));return i}},setValue:function(c,d,f){var g=l(d)>=-1?new Date(l(c),l(d),l(f==b||isNaN(f)?1:f)):c||z;g<A?g=A:g>B&&(g=B),typeof c=="string"&&(g=n(c)),c=g.getFullYear(),d=g.getMonth(),f=g.getDate(),d==-1?(d=11,c--):d==12&&(d=0,c++);if(!C){M(g,e);return i}x=d,w=c,y=f;var k=new Date(c,d,1-e.firstDay),o=k.getDay(),r=h(c,d),t=h(c,d-1),D;if(e.selectors){H.empty(),a.each(q.months,function(b,d){A<new Date(c,b+1,1)&&B>new Date(c,b,0)&&H.append(a("<option/>").html(d).attr("value",b))}),I.empty();var E=j.getFullYear();for(var F=E+e.yearRange[0];F<E+e.yearRange[1];F++)A<new Date(F+1,0,1)&&B>new Date(F,0,0)&&I.append(a("<option/>").text(F));H.val(d),I.val(c)}else s.html(q.months[d]+" "+c);L.empty(),u.add(v).removeClass(p.disabled);for(var G=o?0:-7,J,K;G<(o?42:35);G++)J=a("<a/>"),G%7===0&&(D=a("<div/>").addClass(p.week),L.append(D)),G<o?(J.addClass(p.off),K=t-o+G+1,g=new Date(c,d-1,K)):G<o+r?(K=G-o+1,g=new Date(c,d,K),m(z,g)?J.attr("id",p.current).addClass(p.focus):m(j,g)&&J.attr("id",p.today)):(J.addClass(p.off),K=G-r-o+1,g=new Date(c,d+1,K)),A&&g<A&&J.add(u).addClass(p.disabled),B&&g>B&&J.add(v).addClass(p.disabled),J.attr("href","#"+K).text(K).data("date",g),D.append(J);L.find("a").click(function(b){var c=a(this);c.hasClass(p.disabled)||(a("#"+p.current).removeAttr("id"),c.attr("id",p.current),M(c.data("date"),e,b));return!1}),p.sunday&&L.find("."+p.week).each(function(){var b=e.firstDay?7-e.firstDay:0;a(this).children().slice(b,b+1).addClass(p.sunday)});return i},setMin:function(a,b){A=n(a),b&&z<A&&i.setValue(A);return i},setMax:function(a,b){B=n(a),b&&z>B&&i.setValue(B);return i},today:function(){return i.setValue(j)},addDay:function(a){return this.setValue(w,x,y+(a||1))},addMonth:function(a){var b=x+(a||1),c=h(w,b),d=y<=c?y:c;return this.setValue(w,b,d)},addYear:function(a){return this.setValue(w+(a||1),x,y)},destroy:function(){d.add(document).off("click.d keydown.d"),r.add(t).remove(),d.removeData("dateinput").removeClass(p.input),D&&d.replaceWith(D)},hide:function(b){if(C){b=a.Event(),b.type="onHide",G.trigger(b);if(b.isDefaultPrevented())return;a(document).off("click.d keydown.d"),r.hide(),C=!1}return i},toggle:function(){return i.isOpen()?i.hide():i.show()},getConf:function(){return e},getInput:function(){return d},getCalendar:function(){return r},getValue:function(a){return a?k(e.formatter,z,a,e.lang):z},isOpen:function(){return C}}),a.each(["onBeforeShow","onShow","change","onHide"],function(b,c){a.isFunction(e[c])&&a(i).on(c,e[c]),i[c]=function(b){b&&a(i).on(c,b);return i}}),e.editable||d.on("focus.d click.d",i.show).keydown(function(b){var c=b.keyCode;if(C||a(f).index(c)<0)(c==8||c==46)&&d.val("");else{i.show(b);return b.preventDefault()}return b.shiftKey||b.ctrlKey||b.altKey||c==9?!0:b.preventDefault()}),n(d.val())&&M(z,e)}a.expr[":"].date=function(b){var c=b.getAttribute("type");return c&&c=="date"||a(b).data("dateinput")},a.fn.dateinput=function(b){if(this.data("dateinput"))return this;b=a.extend(!0,{},e.conf,b),a.each(b.css,function(a,c){!c&&a!="prefix"&&(b.css[a]=(b.css.prefix||"")+(c||a))});var d;this.each(function(){var e=new o(a(this),b);c.push(e);var f=e.getInput().data("dateinput",e);d=d?d.add(f):f});return d?d:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"};var b;b=a.tools.rangeinput={conf:{min:0,max:100,step:"any",steps:0,value:0,precision:undefined,vertical:0,keyboard:!0,progress:!1,speed:100,css:{input:"range",slider:"slider",progress:"progress",handle:"handle"}}};var c,d;a.fn.drag=function(b){document.ondragstart=function(){return!1},b=a.extend({x:!0,y:!0,drag:!0},b),c=c||a(document).on("mousedown mouseup",function(e){var f=a(e.target);if(e.type=="mousedown"&&f.data("drag")){var g=f.position(),h=e.pageX-g.left,i=e.pageY-g.top,j=!0;c.on("mousemove.drag",function(a){var c=a.pageX-h,e=a.pageY-i,g={};b.x&&(g.left=c),b.y&&(g.top=e),j&&(f.trigger("dragStart"),j=!1),b.drag&&f.css(g),f.trigger("drag",[e,c]),d=f}),e.preventDefault()}else try{d&&d.trigger("dragEnd")}finally{c.off("mousemove.drag"),d=null}});return this.data("drag",!0)};function e(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}function f(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function g(a){var b=a.data("events");return b&&b.onSlide}function h(b,c){var d=this,h=c.css,i=a("<div><div/><a href='#'/></div>").data("rangeinput",d),j,k,l,m,n;b.before(i);var o=i.addClass(h.slider).find("a").addClass(h.handle),p=i.find("div").addClass(h.progress);a.each("min,max,step,value".split(","),function(a,d){var e=b.attr(d);parseFloat(e)&&(c[d]=parseFloat(e,10))});var q=c.max-c.min,r=c.step=="any"?0:c.step,s=c.precision;s===undefined&&(s=r.toString().split("."),s=s.length===2?s[1].length:0);if(b.attr("type")=="range"){var t=b.clone().wrap("<div/>").parent().html(),u=a(t.replace(/type/i,"type=text data-orig-type"));u.val(c.value),b.replaceWith(u),b=u}b.addClass(h.input);var v=a(d).add(b),w=!0;function x(a,f,g,h){g===undefined?g=f/m*q:h&&(g-=c.min),r&&(g=Math.round(g/r)*r);if(f===undefined||r)f=g*m/q;if(isNaN(g))return d;f=Math.max(0,Math.min(f,m)),g=f/m*q;if(h||!j)g+=c.min;j&&(h?f=m-f:g=c.max-g),g=e(g,s);var i=a.type=="click";if(w&&k!==undefined&&!i){a.type="onSlide",v.trigger(a,[g,f]);if(a.isDefaultPrevented())return d}var l=i?c.speed:0,t=i?function(){a.type="change",v.trigger(a,[g])}:null;j?(o.animate({top:f},l,t),c.progress&&p.animate({height:m-f+o.height()/2},l)):(o.animate({left:f},l,t),c.progress&&p.animate({width:f+o.width()/2},l)),k=g,n=f,b.val(g);return d}a.extend(d,{getValue:function(){return k},setValue:function(b,c){y();return x(c||a.Event("api"),undefined,b,!0)},getConf:function(){return c},getProgress:function(){return p},getHandle:function(){return o},getInput:function(){return b},step:function(b,e){e=e||a.Event();var f=c.step=="any"?1:c.step;d.setValue(k+f*(b||1),e)},stepUp:function(a){return d.step(a||1)},stepDown:function(a){return d.step(-a||-1)}}),a.each("onSlide,change".split(","),function(b,e){a.isFunction(c[e])&&a(d).on(e,c[e]),d[e]=function(b){b&&a(d).on(e,b);return d}}),o.drag({drag:!1}).on("dragStart",function(){y(),w=g(a(d))||g(b)}).on("drag",function(a,c,d){if(b.is(":disabled"))return!1;x(a,j?c:d)}).on("dragEnd",function(a){a.isDefaultPrevented()||(a.type="change",v.trigger(a,[k]))}).click(function(a){return a.preventDefault()}),i.click(function(a){if(b.is(":disabled")||a.target==o[0])return a.preventDefault();y();var c=j?o.height()/2:o.width()/2;x(a,j?m-l-c+a.pageY:a.pageX-l-c)}),c.keyboard&&b.keydown(function(c){if(!b.attr("readonly")){var e=c.keyCode,f=a([75,76,38,33,39]).index(e)!=-1,g=a([74,72,40,34,37]).index(e)!=-1;if((f||g)&&!(c.shiftKey||c.altKey||c.ctrlKey)){f?d.step(e==33?10:1,c):g&&d.step(e==34?-10:-1,c);return c.preventDefault()}}}),b.blur(function(b){var c=a(this).val();c!==k&&d.setValue(c,b)}),a.extend(b[0],{stepUp:d.stepUp,stepDown:d.stepDown});function y(){j=c.vertical||f(i,"height")>f(i,"width"),j?(m=f(i,"height")-f(o,"height"),l=i.offset().top+m):(m=f(i,"width")-f(o,"width"),l=i.offset().left)}function z(){y(),d.setValue(c.value!==undefined?c.value:c.min)}z(),m||a(window).load(z)}a.expr[":"].range=function(b){var c=b.getAttribute("type");return c&&c=="range"||a(b).filter("input").data("rangeinput")},a.fn.rangeinput=function(c){if(this.data("rangeinput"))return this;c=a.extend(!0,{},b.conf,c);var d;this.each(function(){var b=new h(a(this),a.extend(!0,{},c)),e=b.getInput().data("rangeinput",b);d=d?d.add(e):e});return d?d:this}})(jQuery);
