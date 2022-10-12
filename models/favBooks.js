// DAO module for an entity class, e.g. telephone contact 
var favBooks = [];

var datas = [];

var searchResults = [];



function addBook(b){
    favBooks.push(b);
}

function deleteBook(isbn) {
    console.log("in deleteBook DAO");
    for(i = 0; i < favBooks.length; i++) {
        if (favBooks[i].isbn.trim() == isbn.trim()) {
            console.log("ready to delete");
            favBooks.splice(i,1);
        }
    }
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


function create() {
    let book = new Book(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    return book;
}

function createEditData(){
    let editData = new Data(arguments[0], arguments[1], arguments[2], arguments[3]);
    datas.push(editData);
    return editData;
}

function findData(){
    for(i = 0; i < datas.length; i++) {
        if (datas[i].title == arguments[0].title && datas[i].workid == arguments[0].workid) {
            return datas[i];
        }
    }
}

function searchKeyword(){
    for(i = 0; i < searchResults.length + 2; i++) {
        searchResults.pop();
    }
    console.log("After popping: " + searchResults.length);
    for(i = 0; i < favBooks.length; i++) {
        if (favBooks[i].title.includes(arguments[0])) {
            searchResults.push(favBooks[i]);
        }
        else if (favBooks[i].titleshort.includes(arguments[0])){
            searchResults.push(favBooks[i]);
        }
        else if (favBooks[i].isbn.includes(arguments[0])){
            searchResults.push(favBooks[i]);
        }
        else if (favBooks[i].workid.includes(arguments[0])){
            searchResults.push(favBooks[i]);
        }
    }
    return searchResults;
}

function save() {
    
    for(i = 0; i < favBooks.length; i++) {
        console.log("favbook: "+ getTitle(favBooks[i]));
        if (favBooks[i].title == arguments[0].title) {
            return false;
        }
    }
    favBooks.push(arguments[0]);
    return true;
}

function clear(){
    for(i = 0; i < favBooks.length; i++) {
        favbooks.pop()
    }
}

function getTitle() {
    return arguments[0].title;
}

function findAll(){
    return favBooks;
}

class Book{
    constructor(title, titleshort, isbn, workid, review){
        this.title = title;
        this.titleshort = titleshort;
        this.isbn = isbn;
        this.workid = workid;
        this.review = "-";
    }
}

class Data{
    constructor(title, titleshort, isbn, workid){
        this.title = title;
        this.titleshort = titleshort;
        this.isbn = isbn;
        this.workid = workid;
    }
}

module.exports= {addBook, deleteBook, findBookById, find, save, create, getTitle, findAll, createEditData, findData, searchKeyword};