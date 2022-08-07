const INCOMPLETE_BOOKSHELF_LIST_ID = "incompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook(){
    const incompleteBookList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const completeBookList = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);
    const judul = document.getElementById("inputBookTitle").value;
    const penulis = document.getElementById("inputBookAuthor").value;
    const tahun = document.getElementById("inputBookYear").value;

    const selesaiValue = selesai.checked;
    const book = makeNewBook(judul, penulis, tahun, selesaiValue);

    const bookObject = bookComObject(judul, penulis, tahun, selesaiValue);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(selesaiValue == true){
        completeBookList.append(book);
        updateDataToStorage();
    }else{
        incompleteBookList.append(book);
        updateDataToStorage();
    }
}

function makeNewBook(title, writer, year, isReaded){
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book_title");
    bookTitle.innerText = title;

    const bookWriter = document.createElement("p");
    bookWriter.classList.add("book_writer");
    bookWriter.innerText = writer;

    const bookYear = document.createElement("p");
    bookYear.classList.add("book_year");
    bookYear.innerText = year;

    const article = document.createElement("article");
    article.classList.add("book_item");
    article.append(bookTitle, bookWriter, bookYear);

    if(isReaded == true){
        article.append(
            createUnfinishButton(),
            createDeleteButton()
        );
    }else{
        article.append(
            createFinishButton(),
            createDeleteButton()
        )
    }

    return article;
}

function createActionButton(buttonClassType, buttonClassType2, buttonText, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonClassType, buttonClassType2);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createFinishButton() {
    return createActionButton("finish-button", "green", "Selesai Di Baca", function(event){
        addBookToCompleted(event.target.parentElement);
    });
}

function createUnfinishButton() {
    return createActionButton("unfinish-button", "green", "Belum Selesai Di Baca", function(event){
        addBookToUncompleted(event.target.parentElement);
    });
}

function createDeleteButton() {
    return createActionButton("delete-button", "red", "Hapus Buku", function(event){
        removeBook(event.target.parentElement);
    });
}

function addBookToCompleted(bookElement){
    const bookListCompleted = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);

    const bookTitle = bookElement.querySelector(".book_item > .book_title").innerText;
    const writer = bookElement.querySelector(".book_item > .book_writer").innerText;
    const year = bookElement.querySelector(".book_item > .book_year").innerText;
    const finishedValue = true;

    const newBook = makeNewBook(bookTitle, writer, year, finishedValue);
    const book = findBookId(bookElement[BOOK_ITEMID]);
    book.isComplete = true;
    newBook[BOOK_ITEMID] = book.id;

    bookListCompleted.append(newBook);
    alert("Anda akan memasukkan buku ke list buku yang sudah selesai dibaca");

    bookElement.remove();

    updateDataToStorage();
}

function addBookToUncompleted(bookElement){
    const bookListCompleted = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);

    const bookTitle = bookElement.querySelector(".book_item > .book_title").innerText;
    const writer = bookElement.querySelector(".book_item > .book_writer").innerText;
    const year = bookElement.querySelector(".book_item > .book_year").innerText;
    const finishedValue = false;

    const newBook = makeNewBook(bookTitle, writer, year, finishedValue);
    const book = findBookId(bookElement[BOOK_ITEMID]);
    book.isComplete = false;
    newBook[BOOK_ITEMID] = book.id;

    bookListCompleted.append(newBook);
    alert("Anda akan memasukkan buku ke list buku yang sudah belum selesai dibaca");

    bookElement.remove();

    updateDataToStorage();
}

function removeBook(bookElement){
    const bookPosition = findBookIdIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    alert("Anda akan menghapus sebuah buku");
    updateDataToStorage();
}

function getBookList() {
    if (isStorageExist()) {
        return JSON.parse(localStorage.getItem(bookLocalStorageKey)) || [];
    } else {
        return [];
    }
}

function searchBooks(){
    const searchBookValue = document.getElementById("searchBookTitle");

    if (localStorage.getItem(bookLocalStorageKey) == "") {    
        alert("Tidak ada data buku");
        return location.reload();
    }else{
        const getBookByTitle = getBookList().filter(book => book.title == searchBookValue.value.trim());
        if (getBookByTitle.length == 0) {
            const getBookByAuthor = getBookList().filter(book => book.author == searchBookValue.value.trim());
            if (getBookByAuthor.length == 0) {
                const getBookByYear = getBookList().filter(book => book.year == searchBookValue.value.trim());
                if (getBookByYear.length == 0) {
                    alert('Buku yang anda cari tidak ditemukan');
                    return location.reload();
                }else{
                    searchBookResult(getBookByYear);
                }
            }else{
                searchBookResult(getBookByAuthor);
            }
        }else{
            searchBookResult(getBookByTitle);
        }
    }

    searchBookValue.value = '';
}

function searchBookResult(books){
    const bookResult = document.getElementById("searchBookResult");

    bookResult.innerHTML = '';

    books.forEach(book => {
        let searchHtml = `
        <article class="book_item">
            <h3>Hasil Pencarian :</h3><p class="search">Pencarian menunjukkan bahwa data berasal dari buku "${book.title}" </p>
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <p class="ket">Keterangan : <span>${book.isComplete ? 'Sudah dibaca' : 'Belum selesai dibaca'}</span></p>
        </article>
        `

        bookResult.innerHTML += searchHtml;
    });
}