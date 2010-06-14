/*
 * A yui 3 timeago widget
 * 
 * @module TimeAgo
 * @requires oop, base, dom, lang, node
 */
 
 
/*
 * a YUI 3 implementation of the jQuery timeAgo widget
 * @class TimeAgo
 * @namespace Y.TimeAgo
 * @extends Y.Base
 */
  
/*
 * Inspired by: http://github.com/rmm5t/jquery-timeago/
 */
YUI.add('time-ago', function(Y) {

    var Lang = Y.Lang;

    function TimeAgo(config) {
		TimeAgo.superclass.constructor.apply(this, arguments);
    }

    TimeAgo.NAME = "timeAgo";
    TimeAgo.CLASS_NAME = "yui-time-ago";
    TimeAgo.refreshMillis= 60000;

    TimeAgo.strings = {
		suffixFromNow: "from now",
		seconds: "less than a minute",
		minute: "about a minute",
		minutes: "%d minutes",
		hour: "about an hour",
		hours: "about %d hours",
		day: "a day",
		days: "%d days",
		month: "about a month",
		months: "%d months",
		year: "about a year",
		years: "%d years"
    };

    Y.extend( TimeAgo, Y.Base );

    TimeAgo.prototype.initializer = function(cfg) {
		var elements = Y.all(cfg.contentBox);
	
		elements.addClass(TimeAgo.CLASS_NAME);
		this.elements = elements;
		this.updateDateTimes();
		this.update();
		this._contentBox = cfg.contentBox;
		this.refreshMillis = cfg.refreshMillis ? cfg.refreshMillis : TimeAgo.refreshMillis;
    }

    TimeAgo.prototype.destroy = function() {
		delete this.elements;
		this.elements = null;
    }

    TimeAgo.prototype.update = function() {
	
		this.elements.each(function(node) {
	    	var timeago = this._distance(node._datetime);
	    	node.set('innerHTML', this._inWords(timeago));
		}, this, true);
    }
    
    TimeAgo.prototype.refresh = function() {
    	var timerId = this.timerId;
    	if(timerId)
    		timerId.cancel();
    	this.timerId = null;
		Y.all(this._contentBox);
		this.elements = Y.all(this._contentBox);
		this.updateDateTimes();
		this.update();
		if(timerId) {
			this._recall();
		}
    }

    TimeAgo.prototype.updateDateTimes = function() {
		this.elements.each( function(node) {
	    	var datetime = node.getAttribute("datetime");
	    	node._datetime = this._parse(datetime);
		}, this, true);
    }
    
    TimeAgo.prototype.startUpdates = function() {
		if(!this.timerId)
    		this._recall();
    }
    
    TimeAgo.prototype.stopUpdates = function() {
		if(this.timerId)
    		this.timerId.cancel();
    	this.timerId = null;
    }
    TimeAgo.prototype._inWords = function(distance) {
		var sec = distance/1000,
	    	min = sec/60,
	    	hours = min/60,
	    	days = hours/24,
	    	years = days/365,
	    	words,
	    	str = TimeAgo.strings;
	
		function substitute(string, number) {
	    	return string.replace(/%d/i, number);
		}
	
		words = sec < 45 && substitute(str.seconds, Math.round(sec)) ||
        	sec < 90 && substitute(str.minute, 1) ||
        	min < 45 && substitute(str.minutes, Math.round(min)) ||
        	min < 90 && substitute(str.hour, 1) ||
        	hours < 24 && substitute(str.hours, Math.round(hours)) ||
        	hours < 48 && substitute(str.day, 1) ||
        	days < 30 && substitute(str.days, Math.floor(days)) ||
        	days < 60 && substitute(str.month, 1) ||
        	days < 365 && substitute(str.months, Math.floor(days / 30)) ||
        	years < 2 && substitute(str.year, 1) ||
        	substitute(str.years, Math.floor(years));
		return words;
    }

    TimeAgo.prototype._distance = function(date) {
		return (new Date().getTime() - date.getTime());
    }

    TimeAgo.prototype._parse = function(iso8601) {
		var s = Lang.trim(iso8601);
	
		s = s.replace(/-/,"/").replace(/-/,"/");
		s = s.replace(/T/," ").replace(/Z/," UTC");
		s = s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
		return new Date(s);
    }
    
    TimeAgo.prototype._recall = function() {
    	var refreshMillis = this.refreshMillis;
    	if(refreshMillis <= 0)
    		return;
    	this.update();
    	Y.log("update done:");
    	this.timerId = Y.later(this.refreshMillis, this, this._recall );
    }

Y.namespace('time-ago');
Y.TimeAgo = TimeAgo;

},
'1.0',
{requires:['node', 'base', 'dump', 'lang']});
