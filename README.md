# Scroll Watcher

Dispatches a `winscroll` event when the user scrolls, throttled by a given value (default is 10ms). After a given length of time has passed since the last `winscroll` event (default is 300ms), a `winscroll:done` event is dispatched.

## Basic usage

```javascript
const ScrollWatcher = require('scroll-watcher');

const scrollwatcher = new ScrollWatcher();

window.addEventListener('scroll', scrollwatcher.handleScroll);
window.addEventListener('touchmove', scrollwatcher.handleScroll);
```
