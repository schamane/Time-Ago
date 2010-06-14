# YUI3 time ago widget

widget that will show some time ago in human readable format made as YUI3 module.
Based on jQuery widget http://github.com/rmm5t/jquery-timeago

## USAGE
HTML5 code like that:
<div id="content">
    <items>
	<item></item>
	Time: <time datetime="2010-06-14T20:01:09+01:00">June 14th 2010 at 20:28</time>
    </items>
</div>
<script type="text/javascript" src="timeago-min.js"></script>

And than
<pre>
    var timeAgo = new Y.TimeAgo({
	contentBox: "#content items time"
    });
    timeAgo.startUpdates();
</pre>

Result something like that:
<pre>
Time: 20 minutes
</pre>

## TODO
> Better inline documentation
> Internationalization of the messages.
> Cleanups


## LICENSING
TimeAgo widget is released under the [BSD License](http://creativecommons.org/licenses/BSD/).
Copyright (c) 2010, Nazar Kulyk