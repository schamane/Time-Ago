YUI.add("time-ago",function(d){function b(){b.superclass.constructor.apply(this,arguments)}b.NAME="timeAgo";b.CLASS_NAME="yui-time-ago";b.refreshMillis=6E4;b.strings={prefixAgo:null,suffixAgo:"ago",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years"};d.extend(b,d.Base);b.prototype.initializer=function(a){var c=d.all(a.contentBox);
c.addClass(b.CLASS_NAME);this.elements=c;this.updateDateTimes();this.update();this._contentBox=a.contentBox;this.refreshMillis=a.refreshMillis?a.refreshMillis:b.refreshMillis};b.prototype.destroy=function(){delete this.elements;this.elements=null};b.prototype.update=function(){this.elements.each(function(a){var c=this._distance(a._datetime);a.set("innerHTML",this._inWords(c))},this,true)};b.prototype.refresh=function(){var a=this.timerId;a&&a.cancel();this.timerId=null;this.elements=d.all(this._contentBox);
this.updateDateTimes();this.update();a&&this._recall()};b.prototype.updateDateTimes=function(){this.elements.each(function(a){var c=a.getAttribute("datetime");a._datetime=this._parse(c)},this,true)};b.prototype.startUpdates=function(){this.timerId||this._recall()};b.prototype.stopUpdates=function(){this.timerId&&this.timerId.cancel();this.timerId=null};b.prototype._inWords=function(a){function c(j,k){return j.replace(/%d/i,k)}var e=a/1E3,g=e/60,h=g/60,f=h/24,i=f/365;a=b.strings;e=e<45&&c(a.seconds,
Math.round(e))||e<90&&c(a.minute,1)||g<45&&c(a.minutes,Math.round(g))||g<90&&c(a.hour,1)||h<24&&c(a.hours,Math.round(h))||h<48&&c(a.day,1)||f<30&&c(a.days,Math.floor(f))||f<60&&c(a.month,1)||f<365&&c(a.months,Math.floor(f/30))||i<2&&c(a.year,1)||c(a.years,Math.floor(i));return[a.prefixAgo,e,a.suffixAgo].join(" ")};b.prototype._distance=function(a){return(new Date).getTime()-a.getTime()};b.prototype._parse=function(a){a=d.Lang.trim(a);a=a.replace(/-/,"/").replace(/-/,"/");a=a.replace(/T/," ").replace(/Z/,
" UTC");a=a.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2");return new Date(a)};b.prototype._recall=function(){if(!(this.refreshMillis<=0)){this.update();this.timerId=d.later(this.refreshMillis,this,this._recall)}};d.namespace("time-ago");d.TimeAgo=b},"1.0",{requires:["node","base","lang"]});
