const bookLocalStorageKey = "BOOKS_APPS";

let books = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(bookLocalStorageKey, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(bookLocalStorageKey);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function bookComObject(title, writer, year, isReaded){
    return{
        id: +new Date(),
        title: title,
        author: writer,
        year: year,
        isComplete: isReaded,
    }
}

function findBookId(bookId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
}

function findBookIdIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;
  
        index++;
    }
  
    return -1;
}
 
function refreshDataFromBooks() {
    const listIncompleted = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    let listCompleted = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);
   
   
    for(book1 of books){
        const newBook = makeNewBook(book1.title, book1.author, book1.year, book1.isComplete);
        newBook[BOOK_ITEMID] = book1.id;
        
        if(book1.isComplete){
            listCompleted.append(newBook);
        }else{
            listIncompleted.append(newBook);
        }
    }
}