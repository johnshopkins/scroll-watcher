# window resize window

A module to use in conjunction with Backbone. Fires `winscroll` event when the browser window is scrolled and `winscroll:done` when the browser window has stopped scrolling.

### Dependencies

* Backbone
* Underscore

### Usage

```javaScript
var ScrollWatcher = require("../../lib/scroll-watcher");

$(function() {

  var bbevents = _.extend({}, Backbone.Events);

  var scrollwatcher = new ScrollWatcher(bbevents);
  $(window).on("scroll", scrollwatcher.handleScroll.bind(scrollwatcher));
  $(window).on("touchmove", scrollwatcher.handleScroll.bind(scrollwatcher));

});
```
