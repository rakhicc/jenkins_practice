'use strict';

const {CODES,MESSAGES}=require('./statuscodes');

const {getAllBooksFromStorage,getOneBookFromStorageById,addBookToStorage,
    updateBookToStorage,removeBooksFromStorage}= require('./bookStorageLayer');


    module.exports = class DataStorage{
    get CODES(){
        return CODES;
    }

    getAll(){
       return getAllBooksFromStorage();
    }

    getOne(id) {
        return new Promise(async (resolve, reject) => {
          if (!id) {
            reject(MESSAGES.NOT_FOUND("--empty--"));
          } else {
            const result = await getOneBookFromStorageById(id);
            if (result) {
              resolve(result);
            } else {
              reject(MESSAGES.NOT_FOUND(id));
            }
          }
        });
      }

      insert(book) {
        return new Promise(async (resolve, reject) => {
          if (book) {
            if (!book.bookID) {
              reject(MESSAGES.NOT_INSERTED());
            } else if (await getOneBookFromStorageById(book.bookID)) {
              reject(MESSAGES.ALREADY_IN_USE(book.bookID));
            } else if (await addBookToStorage(book)) {
              resolve(MESSAGES.INSERT_OK(book.bookID));
            } else {
              reject(MESSAGES.NOT_INSERTED());
            }
          } else {
            reject(MESSAGES.NOT_INSERTED());
          }
        });
      }

    update(book){
        return new Promise(async (resolve,reject) =>{
        if(book) {
            if(await updateBookToStorage(book)) {
                resolve(MESSAGES.UPDATE_OK(book.bookID));
            } else {
                reject(MESSAGES.NOT_UPDATED());
            }
        } else {
            reject(MESSAGES.NOT_UPDATED()); 
        }
        })
    }
    remove(id){
      return new Promise(async(resolve,reject)=>{
          if(!id){
              reject (MESSAGES.NOT_FOUND("--empty"))
          } else if(await removeBooksFromStorage(id)){
              resolve(MESSAGES.REMOVE_OK(id));
          } else {
              reject(MESSAGES.NOT_REMOVED(id));
          }
      })
    }
    }