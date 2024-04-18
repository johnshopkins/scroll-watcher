const throttle = require('lodash.throttle');

class ScrollWatcher {

  constructor(throttleWait = 10, scrollDoneWait = 300) {

    this.throttleWait = throttleWait;
    this.scrollDoneWait = scrollDoneWait;

    this.handleScroll = throttle(this.handleScroll.bind(this), throttleWait);

    // info about the current scroll event
    this.depth = 0;
    this.direction = null;

    // info about the previous scroll event
    this.previousDepth = 0;
    this.previousDirection = null;

    // info about all scroll events since the last directional change.
    this.directionChangeLocation = null;
    this.pixelsSinceDirectionChange = null;

    this.scrollId = null;

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('touchmove', this.handleScroll);
  }

  handleScroll(e) {
      
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
    const event = new CustomEvent('winscroll', { detail: data });
    window.dispatchEvent(event);

    this.scrollId = setTimeout(() => {
      const event = new CustomEvent('winscroll:done', { detail: data });
      window.dispatchEvent(event);
    }, this.scrollDoneWait);
  }

}

export default ScrollWatcher;
