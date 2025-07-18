var fs = require("fs");
var readline = require("readline");
import clipboardy from 'clipboardy';

var text = fs.readFileSync("../frost.md", "utf-8");
var textByLine = text.split("\n")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function lineCount( text ) {
    var nLines = 0;
    for( var i = 0, n = text.length;  i < n;  ++i ) {
        if( text[i] === '\n' ) {
            ++nLines;
        }
    }
    return nLines;
}

let num = 0

const displayNextLine = () => {
  if (num < textByLine.length) {
    console.log(textByLine[num]);
    clipboardy.writeSync(textByLine[num]);
    num++;
    rl.question(`================(${num}/${lineCount(text)})=================`, () => {
      displayNextLine();
    });
  } else {
    console.log('End of text reached');
    rl.close();
  }
};

displayNextLine();

