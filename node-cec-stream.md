# Creating a CEC-Client for Node

I tried two. Neither worked so wrote this.

## Get Stream-splitter

Parses the stdout into usable data.

`npm i stream-splitter omxctrl`

## Example program

```js
const KEYS_ARRAY = [
  'select',
  'exit',
  'F1',
  'F2',
  'F3',
  'F4',
  'left',
  'up',
  'right',
  'down',
];

var cec = require('child_process').spawn('cec-client')
var StreamSplitter = require("stream-splitter");
var splitter;

var splitter = cec.stdout.pipe(StreamSplitter('\n'));

var omx = require('omxctrl');
// omx.play('http://localhost:8888');

splitter.encoding = "utf8";

splitter.on("token", function(token) {
  var keyPressed = KEYS_ARRAY.find(elem => {
    return token.indexOf(`SetCurrentButton ${elem}`) > -1;
  });

  if (keyPressed) {
    if (keyPressed === KEYS_ARRAY[7] ) {
      console.log('PLAY');
      omx.play('http://localhost:8888');
    }

    if (keyPressed === KEYS_ARRAY[9] ) {
      console.log('PAUSE');
      omx.pause();
    }

    if (keyPressed === KEYS_ARRAY[3] ) {
      console.log('STOP');
      omx.stop();
    }

    console.log(keyPressed);
  }
});

splitter.on("done", function() { console.log("And that's all folks!"); });

splitter.on("error", function(err) { console.error("Oh noes!", err); });
```
