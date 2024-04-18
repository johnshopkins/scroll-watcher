# Scroll Watcher

Dispatches a `winscroll` event when the user scrolls, throttled by a given value (default is 10ms). After a given length of time has passed since the last `winscroll` event (default is 300ms), a `winscroll:done` event is dispatched. Within the `detail` property of the event, you will find the following information:

```javascript
{
  e: e,                             // original scroll or touchmove event
  depth: <integer>,                 // current scroll depth
  direction: <up|down>,             // which direction is the user srolling
  sinceDirectionChange: <integer>   // how many pixels have been scrolled since the user changed direction
}
```

## Basic usage

```javascript
const ScrollWatcher = require('scroll-watcher');
const scrollwatcher = new ScrollWatcher();

window.addEventListener('winscroll', (e) => {
  console.log(e.detail);
});

window.addEventListener('winscroll:done', scrollwatcher.handleScroll);
```

## Customization

```javascript
const ScrollWatcher = require('scroll-watcher');

// time to wait between scroll events
const throttleWait = 50;

// time to wait until scroll is considered complete
const scrollDoneWait = 500;

const scrollwatcher = new ScrollWatcher(throttleWait, scrollDoneWait);
```
