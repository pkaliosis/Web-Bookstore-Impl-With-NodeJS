console.log("Running...");
const express = require('express')
const path = require('path')
const app = express()
const port = 8080
const exphbs = require('express-handlebars')
const fetch = require('node-fetch')
const DAO = require('./models/favBooks.js')

console.log(DAO);

var books = [];
var datas = [];
var keyword = ''


app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /static, 
    e.g. http://localhost:8080/static/index.html
*/
app.use('/static', express.static(__dirname + '/public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})



app.get("/assets/py-bg1.jpg", function(req, res){
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end("py-bg1.jpg");
  })

  
app.post('/favBooks', function(req, res){
    let contentType = req.header('Content-Type');
    /*
    for (i=0; i<books.length;i++) {
        books.pop();
    }*/
    let obj = req.body;
    console.log('server talking');
    console.log(obj);
    let x1 = obj.title.split('>')[2];
    let x2 = obj.titleshort.split('>')[2];
    let x3 = obj.isbn.split('>')[2];
    let x4 = obj.workid.split('>')[2];
    let x5 = obj.review.split('>')[2];
    let book = DAO.create(x1, x2, x3, x4, x5);
    console.log("book title: " + x1);
    // console.log("book titleshort: " + x2);
    // console.log("book isbn: " + x3);
    // console.log("book workid: " + x4);
    // console.log("book review: " + x5);
    let saved = DAO.save(book);
    console.log(saved);
    if (saved){
        books.push(book);
    }
    for (i=0; i<books.length;i++) {
        console.log(books[i]);
    }
    //res.status(200).send(saved.title);

    
    if(!saved) {
        res.status(409).send('Book exists');
        //res.status(200).send('good job');
        return
    }
    
    res.location('/favBooks/'+book.title).status(201).send('goooood job');

})

app.post('/editData', function(req, res){
    let contentType = req.header('Content-Type');
    
    let obj = req.body;
    console.log('server got book data');
    console.log(obj);
    console.log("EDWWWW BOOK DATA: " + obj.title);
    let dt = DAO.createEditData(obj.title, obj.titleshort, obj.isbn, obj.workid);
    console.log(dt.title);
    datas.push(dt);
    //res.status(200).send(saved.title);
    
    res.location('/editData/'+dt.title).status(201).send('very goooood job');

})

app.post('/edited', function(req, res){
    let contentType = req.header('Content-Type');
    
    let obj = req.body;
    console.log('server got EDITED BOOK data');
    console.log("EDITED BOOK data: " + obj);
    console.log("title: " + obj.title);
    console.log("isbn: " + obj.isbn);
    console.log("review: " + obj.review);

    for (i=0; i<books.length;i++) {
        console.log("saved book isbn: " + books[i].isbn);
        if (books[i].isbn.trim() == obj.isbn.trim()) {
            console.log("in the loop");
            books[i].title = obj.title;
            books[i].titleshort = obj.titleshort;
            books[i].isbn = obj.isbn;
            books[i].workid = obj.workid;
            books[i].review = obj.review;
            console.log(books[i].title);
            console.log(books[i].titleshort);
            console.log(books[i].isbn);
            console.log(books[i].workid);
            console.log(books[i].review);
        }
    }
    
    res.location('/edited/'+obj.title).status(201).send('very goooood job');

})


app.get('/favorites', function(req, res){
    let favorites = DAO.findAll();
    console.log("hereeee");
    console.log("DAO: ")
    console.log(favorites);
    console.log("SERVER: ")
    console.log(books);
    res.send(favorites);
})

app.get('/edits', function(req, res){
    let bod = req.body;
    console.log("request body: " + bod);
    let editable = DAO.findData(datas[datas.length-1]);
    console.log("edwwwwwww");
    console.log(editable);
    res.send(editable);
})

app.delete('/deleteData', function(req, res){
    let contentType = req.header('Content-Type');
    
    let obj = req.body;
    console.log('server got TO BE DELETED BOOK data');
    console.log("TO BE DELETED data: " + obj);
    console.log("title: " + obj.title);
    console.log("title: " + obj.titleshort);
    console.log("isbn: " + obj.isbn);
    console.log("isbn: " + obj.workid);
    console.log("review: " + obj.review);

    for (i=0; i<books.length;i++) {
        console.log("saved book isbn: " + books[i].isbn.trim());
        console.log("obj book isbn: " + obj.isbn.trim());
        if (books[i].isbn.trim() == obj.isbn.trim()) {
            books.splice(i, 1);
            DAO.deleteBook(obj.isbn);
            console.log(books);
        }
    }

    res.location('/deleteData/'+obj.title).status(201).send('very goooood job');


})

app.delete('/undoData', function(req, res){
    let contentType = req.header('Content-Type');
    
    let obj = req.body;
    obj.title = obj.title.split(">")[2];
    obj.titleshort = obj.titleshort.split(">")[2];
    obj.isbn = obj.isbn.split(">")[2];
    obj.workid = obj.workid.split(">")[2];
    console.log('server got TO BE UNDONE BOOK data');
    console.log("TO BE UNDONE data: " + obj);
    console.log("title: " + obj.title);
    console.log("titleshort: " + obj.titleshort);
    console.log("isbn: " + obj.isbn);
    console.log("workid: " + obj.workid);
    console.log("review: " + obj.review);

    for (i=0; i<books.length;i++) {
        console.log("saved book isbn: " + books[i].isbn.trim());
        console.log("to be undone book isbn: " + obj.isbn.trim());
        if (books[i].isbn.trim() == obj.isbn.trim()) {
            books.splice(i, 1);
            DAO.deleteBook(obj.isbn);
            console.log(books);
        }
    }

    res.location('/deleteData/'+obj.title).status(201).send('very goooood job');


})

app.post('/searchData', function(req, res){
    //let contentType = req.header('Content-Type');
    
    let obj = req.body;
    console.log('server got search data');
    console.log(obj);
    console.log("EDWWWW SEARCH DATA: " + obj.keyword);
    keyword = obj.keyword;
    let results = DAO.searchKeyword(keyword);
    res.send(results);
    
    
    res.location('/searchData/'+keyword).status(201).send('very goooood job');

})



