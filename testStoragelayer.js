"use strict";
const 
  {getAllBooksFromStorage,getOneBookFromStorageById,addBookToStorage,
    updateBookToStorage,removeBooksFromStorage}
 = require("./storage/bookStorageLayer");
 getAllBooksFromStorage().then(console.log).catch(console.log);
 getOneBookFromStorageById(2).then(console.log).catch(console.log);


//addtoStorage(emp).then(console.log).catch(console.log);
//updateStorage(emp).then(console.log).catch(console.log);
//removeFromstorage(3).then(console.log).catch(console.log);
