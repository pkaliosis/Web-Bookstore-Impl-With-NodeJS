// DAO module for an entity class, e.g. telephone contact 
var favBooks = [];

function addBook(b){
    favBooks.push(b);
}

function deleteBook(b) {
    favBooks.pop(b);
}

function findBookById(b, givenId){
    for(i = 0; i < favBooks.length; i++) {
        if (favBooks[i].id == givenId) {
            return favBooks[i];
        }
    }
}

function find(b, givenId){
    if (b.id == givenId){
        return true;
    }
}

function create(titlef, titleshortf, isbnf, workidf) {
    return new BookDAO(titlef, titleshortf, isbnf, workidf);
}

function save(book) {
    favBooks.push(book);
}

class BookDAO{
    BookDAO(title, titleshort, isbn, workid){
        this.title = title;
        this.titleshort = titleshort;
        this.isbn = isbn;
        this.workid = workid;
    }

    var favBooks = [];

    function addBook(b){
        favBooks.push(b);
    }

    function deleteBook(b) {
        favBooks.pop(b);
    }

    function findBookById(b, givenId){
        for(i = 0; i < favBooks.length; i++) {
            if (favBooks[i].id == givenId) {
                return favBooks[i];
            }
        }
    }

    function find(b, givenId){
        if (b.id == givenId){
            return true;
        }
    }

    function create(titlef, titleshortf, isbnf, workidf) {
        return new BookDAO(titlef, titleshortf, isbnf, workidf);
    }

    function save(book) {
        favBooks.push(book);
    }
}