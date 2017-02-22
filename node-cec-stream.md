

`npm i stream-splitter`

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

// Set encoding on the splitter Stream, so tokens come back as a String.
splitter.encoding = "utf8";

splitter.on("token", function(token) {
  var keyPressed = KEYS_ARRAY.find(elem => {
    return token.indexOf(`pressed: ${elem}`) > -1;
  });

  if (keyPressed) {
    console.log(keyPressed);
  }

  // console.log('.');
});

splitter.on("done", function() {
    console.log("And that's all folks!");
});

splitter.on("error", function(err) {
    // Any errors that occur on a source stream will be emitted on the
    // splitter Stream, if the source stream is piped into the splitter
    // Stream, and if the source stream doesn't have any other error
    // handlers registered.
    console.error("Oh noes!", err);
});
```
