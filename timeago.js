/*
 * A yui 3 timeago widget
 * 
 * @module time-ago
 * @requires oop, base, dom,  node
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

    /*
     * @constructor
     * @param {Object} config to be used to setup widget
     */
    function TimeAgo(config) {
	TimeAgo.superclass.constructor.apply(this, arguments);
    }
    
    /*
     * Static Properties
     */
    TimeAgo.NAME = "timeAgo";
    TimeAgo.CLASS_NAME = "yui-time-ago";
    TimeAgo.refreshMillis= 60000;

    TimeAgo.strings = {
	prefixAgo: null,
	suffixAgo: "ago",
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

    /*
     * Overwrite standard Y.Base.initializer method to setup widget
     * @method initializer
     * @param {Object} cfg object with setup properties
     */
    TimeAgo.prototype.initializer = function(cfg) {
	var elements = Y.all(cfg.contentBox);
	
	elements.addClass(TimeAgo.CLASS_NAME);
	this.elements = elements;
	this.updateDateTimes();
	this.update();
	this._contentBox = cfg.contentBox;
	this.refreshMillis = cfg.refreshMillis ? cfg.refreshMillis : TimeAgo.refreshMillis;
    }

    /*
     * Destroy and cleanup
     * @method destroy
     */
    TimeAgo.prototype.destroy = function() {
	delete this.elements;
	this.elements = null;
    }

    /*
     * update content of the dom elements that show time ago information
     * @method update
     */
    TimeAgo.prototype.update = function() {
	this.elements.each(function(node) {
	    var timeago = this._distance(node._datetime);
	    node.set('innerHTML', this._inWords(timeago));
	}, this, true);
    }

    /*
     * refresh widget with whole recalculation of the dom element list and datetime values
     * @method refresh
     */
    TimeAgo.prototype.refresh = function() {
	var timerId = this.timerId;
	if(timerId)
	    timerId.cancel();
	this.timerId = null;
	this.elements = Y.all(this._contentBox);
	this.updateDateTimes();
	this.update();
	if(timerId) {
	    this._recall();
	}
    }

    /*
     * update values from dom for date time and hold it internaly
     * @method updateDateTimes
     */
    TimeAgo.prototype.updateDateTimes = function() {
	this.elements.each( function(node) {
	    var datetime = node.getAttribute("datetime");
	    node._datetime = this._parse(datetime);
	}, this, true);
    }

    /*
     * start widget automaticaly update it self and dom elements content
     * @method startUpdates
     */
    TimeAgo.prototype.startUpdates = function() {
	if(!this.timerId)
	    this._recall();
    }

    /*
     * stop widget automatical update it self and dom elements content
     * @method stopUpdates
     */
    TimeAgo.prototype.stopUpdates = function() {
	if(this.timerId)
	    this.timerId.cancel();
	this.timerId = null;
    }

    /*
     * calculate human readable string for the date based on datetime
     * @method _inWords
     * @private
     * @param {int} distance in miliseconds from current time
     * @return {String} value to show as content of the dom element
     */
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
	return [str.prefixAgo, words, str.suffixAgo].join(" ");
    }

    /*
     * calculate distance from current time to given date in miliseconds
     * @method _distance
     * @private
     * @param {int} date given to calculate distance
     * @return {int} the distance value
     */
    TimeAgo.prototype._distance = function(date) {
	return (new Date().getTime() - date.getTime());
    }

    /*
     * convert iso8601 to date value
     * @method _parse
     * @private
     * @param {String} iso8601 time in string format
     * @return {int} the date value
     */
    TimeAgo.prototype._parse = function(iso8601) {
	var s = Y.Lang.trim(iso8601);
	
	s = s.replace(/-/,"/").replace(/-/,"/");
	s = s.replace(/T/," ").replace(/Z/," UTC");
	s = s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
	return new Date(s);
    }

    /*
     * self calling method to do refresh of the dom content every x miliseconds
     * @method _recall
     * @private
     */
    TimeAgo.prototype._recall = function() {
	var refreshMillis = this.refreshMillis;
	if(refreshMillis <= 0)
		return;
	this.update();
	this.timerId = Y.later(this.refreshMillis, this, this._recall );
    }

Y.namespace('time-ago');
Y.TimeAgo = TimeAgo;

},
'1.0',
{requires:['node', 'base', 'lang']});
