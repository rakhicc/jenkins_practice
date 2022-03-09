"use strict";
const { readFile, writeToFile } = require("./storage/readerWriter");
readFile("./storage/Chandran_Chirayil_books.json")
  .then(console.log)
  .catch(console.log);
//if you povide folder name before json file this will fail if such folder doesn't exists.
 /* writeToFile("./test.json", { a: 2, b: 4 ,c:6})
  .then(console.log)
  .catch(console.log);
  readFile("./test.json")
  .then((data) => Object.assign(data, { c: 10 }))
  .then((modified) => writeToFile("./test.json", modified))
  .then(console.log)
  .catch(console.log);  */

  readFile("./test.json")
  .then(console.log)
  .catch(console.log);
