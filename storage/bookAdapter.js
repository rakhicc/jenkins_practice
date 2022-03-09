'use strict';

function adapt(book){
    return {
        bookID:+book.bookID,
        name:book.name,
        author:book.author,
        topic:book.topic,
        numberOfBooks:+book.numberOfBooks
    }
}

module.exports={adapt};