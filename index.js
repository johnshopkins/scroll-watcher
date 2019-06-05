var throttle = require('lodash.throttle');

var ScrollWatcher = function (eventsObject) {

  /**
   * Information about the current scroll event
   */
  this.depth = 0;
  this.direction = null;

  /**
   * Information about the previous scroll event
   */
  this.previousDepth = 0;
  this.previousDirection = null;

  /**
   * Information about all scroll events
   * since the last directional change.
   */
  this.directionChangeLocation = null;
  this.pixelsSinceDirectionChange = null;

  this.scrollId = null;

  this.vent = eventsObject;

};

ScrollWatcher.prototype.handleScroll = throttle(function (e) {

  if (this.scrollId) clearTimeout(this.scrollId);

  // depth of scroll from the top of the window
  this.depth = $(window).scrollTop();

  // figure out the direction of the current scroll
  this.direction = this.previousDepth < this.depth ? "down" : "up";

  // figre out if the direction changed from the last scroll
  if (this.previousDirection !== this.direction) {
    this.directionChangeLocation = this.depth;
    this.pixelsSinceDirectionChange = 0;
  } else {
    this.pixelsSinceDirectionChange = this.depth - this.directionChangeLocation;
  }

  // save current scroll informaion for use in next scroll event
  this.previousDepth = this.depth;
  this.previousDirection = this.direction;

  // create data
  var data = {
    e: e,
    depth: this.depth,
    direction: this.direction,
    sinceDirectionChange: Math.abs(this.pixelsSinceDirectionChange)
  };

  // publish event
  this.vent.trigger("winscroll", data);

  var self = this;
  this.scrollId = setTimeout(function () {
    self.vent.trigger("winscroll:done", data);
  }, 300);

}, 10);

module.exports = ScrollWatcher;
