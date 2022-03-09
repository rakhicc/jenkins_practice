'use strict';
const path=require('path');
const {readFile,writeToFile}=require('./readerWriter');
const {storageFile,adapterFile}=require('./storageConfig.json');
const {adapt}=require(path.join(__dirname,adapterFile));
const filePath=path.join(__dirname,storageFile);

async function getAllBooksFromStorage(){
    return readFile(filePath);
}
async function getOneBookFromStorageById(id){
    const data =await readFile(filePath);
    return data.find((item)=>item.bookID==id) || null;
}

async function addBookToStorage(book){
    const data=await readFile(filePath);
    data.push(adapt(book));
    return await writeToFile(filePath,data);
}

async function updateBookToStorage(book){
    const data=await readFile(filePath);
    const oldBook= data.find(item=>item.bookID==book.bookID);
    if(oldBook) {
        Object.assign(oldBook,adapt(book));
        return await writeToFile(filePath,data);
    }
    return false;
}

async function removeBooksFromStorage(id){
    const data=await readFile(filePath);
    const index=data.findIndex((item)=>item.bookID==id);
    if(index<0) {
        return false;
    }
    data.splice(index,1);
        return await writeToFile(filePath,data);

}

module.exports={getAllBooksFromStorage,getOneBookFromStorageById,addBookToStorage,
    updateBookToStorage,removeBooksFromStorage};
