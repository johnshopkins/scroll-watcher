const EventEmitter = require('wolfy87-eventemitter');
const throttle = require('lodash.throttle');

const ScrollWatcher = function (eventEmitter) {

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

  this.eventEmitter = eventEmitter;

};

ScrollWatcher.prototype.handleScroll = throttle(function (e) {

  if (this.scrollId) clearTimeout(this.scrollId);

  // depth of scroll from the top of the window (scrollYOffset for IE)
  this.depth = window.scrollY || window.pageYOffset;

  // figure out the direction of the current scroll
  this.direction = this.previousDepth < this.depth ? 'down' : 'up';

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
  const data = {
    e: e,
    depth: this.depth,
    direction: this.direction,
    sinceDirectionChange: Math.abs(this.pixelsSinceDirectionChange)
  };

  // publish event
  this.eventEmitter.emit('winscroll', data);

  this.scrollId = setTimeout(() => {
    this.eventEmitter.emit('winscroll:done', data);
  }, 300);

}, 10);

module.exports = ScrollWatcher;
