# screenshot.js
Take screenshot with JS

## Installation
* If you want to load script locally download its ([here](https://raw.githubusercontent.com/amiad/screenshot.js/master/screenshot.js)).
* Load the script in the header

  ```html
  <script src="https://raw.githubusercontent.com/amiad/screenshot.js/master/screenshot.js"></script>
  ```
  
## Usage
```js
new Screenshot({success: img => {
        // callback function
        myimage = img;
    }});
 ```
 Your user need to allow the action and to select the screen, window or tab to share (tab support in Chrome only).

## Supported Browsers
Firefox 66, Chrome 72, Edge 79, Opera 60, Safari 13.

Mobile not supported!

See [CanIUSe](https://caniuse.com/?search=getDisplayMedia) for more details.
