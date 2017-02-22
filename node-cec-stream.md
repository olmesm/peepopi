# Creating a CEC-Client for Node

I tried two. Neither worked so wrote this.

## Get Stream-splitter

Parses the stdout into usable data.

`npm i stream-splitter`

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

splitter.encoding = "utf8";

splitter.on("token", function(token) {
  var keyPressed = KEYS_ARRAY.find(elem => {
    return token.indexOf(`pressed: ${elem}`) > -1;
  });

  if (keyPressed) { console.log(keyPressed); }
});

splitter.on("done", function() { console.log("And that's all folks!"); });

splitter.on("error", function(err) { console.error("Oh noes!", err); });
```
