



let footerpic = document.getElementsByClassName("footer-pics");
for (i=0; i<footerpic.length; i++){
    footerpic[i].onclick = function() {
        alert("You will be redirected to another page.");
    }
}

document.getElementById("getResults").addEventListener("click", getResults);

document.getElementById("getResults2").addEventListener("click", getResultsAuthors);

document.addEventListener('click', function(e){
    if(e.target && e.target.id== 'addBookToFavsBtn'){
         undoAddFav(e.target);
         addToFavs(e.target);
    }
});

document.addEventListener('click', function(b){
    if(b.target && b.target.id== 'undo'){
         undoFav(b.target);
    }
});

//document.getElementById("getFavs").addEventListener("click", showFavorites);

//--------------------------------------------------------------------------
var template = document.getElementById("handlebars-book-search").innerHTML;
var templateScript = Handlebars.compile(template);

var templateAuthors = document.getElementById("handlebars-author-search").innerHTML;
var templateScriptAuthors = Handlebars.compile(templateAuthors);

var templateBtn = document.getElementById("handlebars-undo-button").innerHTML;
var templateScriptBtn = Handlebars.compile(templateBtn);
//--------------------------------------------------------------------------


function getResults(){
   fetch('https://reststop.randomhouse.com/resources/works/?start=0&max=0&expandLevel=1&search='  + document.getElementById("search-keywords").value)
    .then((res) => res.text())
    //.then((res2) => JSON.parse(JSON.stringify(res2)))
    .then((resData) => {
        let out = '';
        var domparse = new DOMParser();
        let xmlthing = domparse.parseFromString(resData, 'application/xml');
        let works = xmlthing.querySelectorAll("work");
        let outputs = document.getElementById("resShow").value;
        if (outputs == "All") {
            outputs = works.length;
        }
        console.log(xmlthing);
        console.log(works.length);
        let intro = 'Query results: ' + works.length + '.';
        let intro2 = 'The first' + outputs + 'results are: ';
        for (i=0; i<outputs; i++){
            let authorweb = xmlthing.getElementsByTagName("authorweb")[i].innerHTML;
            let isbn = xmlthing.getElementsByTagName("isbn")[i].innerHTML;
            let saledate = xmlthing.getElementsByTagName("onsaledate")[i].innerHTML;
            let titleAuth = xmlthing.getElementsByTagName("titleAuth")[i].innerHTML;
            let titleSubtitleAuth = xmlthing.getElementsByTagName("titleSubtitleAuth")[i].innerHTML;
            let titleshort = xmlthing.getElementsByTagName("titleshort")[i].innerHTML;
            let titleweb = xmlthing.getElementsByTagName("titleweb")[i].innerHTML;
            let workid = xmlthing.getElementsByTagName("workid")[i].innerHTML;

            var context = { "title" : titleweb, "titleshort" : titleshort, "isbn" : isbn, "workid" : workid, "i": i+1};

            var html = templateScript(context);
            document.getElementById("search-output").innerHTML += html;
        }
    })
    .catch((err) => console.log(err))
}

function addToFavs(e, u){
    //u.preventDefault();
    /*
    let title = document.getElementById("bookTitle").value;
    let titleshort = document.getElementById("bookTitleshort").value;
    let isbn = document.getElementById("bookIsbn").value;
    let workid = document.getElementById("bookWorkid").value;
    */
   let beginpoint = e.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling;
   let title = beginpoint.innerHTML;
   let titleshort = beginpoint.nextSibling.nextSibling.innerHTML;
   let isbn = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
   let workid = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
   let review = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
   console.log(title);
   console.log(titleshort);
   console.log(isbn);
   console.log(workid);

    fetch('/favBooks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'mode': 'no-cors'
        },
        body: JSON.stringify({title:title, titleshort:titleshort, isbn:isbn, workid:workid, review:review})
    })
    .then(response => {
        if (response.status == 201){
            console.log('Object created.')
            console.log(response)
        }
    })
    .catch(error => {
        console.log(error)
    })

    /*
    
    .then((res) => res.text())
    .then((data) => {
        alert('YOOOOOOOOOOOOOOOOOO')
        //var domparse = new DOMParser();
        //let xmlthing = domparse.parseFromString(data, 'application/xml');
        console.log(data);
    })
    */
    
    /*
   .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
        console.log(error)
    })
    */

    
}



function getResultsAuthors(){
   fetch('https://reststop.randomhouse.com/resources/works/?start=0&max=0&expandLevel=1&search='  + document.getElementById("search-keywords-authors").value)
    .then((res) => res.text())
    //.then((res2) => JSON.parse(JSON.stringify(res2)))
    .then((resData) => {
        let outAuthor = '';
        var parser = new DOMParser();
        let xmlDoc = parser.parseFromString(resData, 'application/xml');
        let works = xmlDoc.querySelectorAll("work");
        let outputs = document.getElementById("resShowAuthors").value;
        if (outputs == "All") {
            outputs = works.length;
        }
        console.log(xmlDoc);
        console.log(works.length);
        let intro = 'Query results: ' + works.length + '.';
        let intro2 = 'The first' + outputs + 'results are: ';
        for (i=0; i<outputs; i++){
            let authorweb = xmlDoc.getElementsByTagName("authorweb")[i].innerHTML;
            let isbn = xmlDoc.getElementsByTagName("isbn")[i].innerHTML;
            let saledate = xmlDoc.getElementsByTagName("onsaledate")[i].innerHTML;
            let titleAuth = xmlDoc.getElementsByTagName("titleAuth")[i].innerHTML;
            let titleSubtitleAuth = xmlDoc.getElementsByTagName("titleSubtitleAuth")[i].innerHTML;
            let titleshort = xmlDoc.getElementsByTagName("titleshort")[i].innerHTML;
            let titleweb = xmlDoc.getElementsByTagName("titleweb")[i].innerHTML;
            let workid = xmlDoc.getElementsByTagName("workid")[i].innerHTML;

            var contextAuthor = { "author" : authorweb, "titleAndAuthor" : titleAuth, "i": i+1};

            var htmlAuthor = templateScriptAuthors(contextAuthor);
            document.getElementById("search-output-authors").innerHTML += htmlAuthor;

        }
    })
    .catch((err) => console.log(err))
}


function undoAddFav(a){
   console.log("Trying to put an undo button over there...");
   console.log(a.id);
   var parent = a.parentElement;
   console.log(parent);
   var undobtn = parent.lastChild.previousSibling;
   console.log(undobtn);
   undobtn.style.display = "inline";
}

function undoFav(e){

    let beginpoint = e.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling;
    let title = beginpoint.innerHTML;
    let titleshort = beginpoint.nextSibling.nextSibling.innerHTML;
    let isbn = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    let workid = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    let review = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    console.log("title to undo :" + title);
    console.log("titleshort to undo :" + titleshort);
    console.log("isbn to undo :" +isbn);
    console.log("workid to undo :" +workid);
    console.log("review to undo :" +review);
    fetch('/undoData', {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'mode': 'no-cors'
        },
        body: JSON.stringify({title:title, titleshort:titleshort, isbn:isbn, workid:workid, review:review})
})
    .then(res => {
        if (res.status == 201){
            console.log('Object deleted.')
            console.log(res)
        }
    })
    alert("Book: " + title.split(">")[2] + " has been deleted from your favorites.");
}





    

