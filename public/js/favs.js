

window.addEventListener("load", showFavorites);

document.addEventListener('click', function(e){
    if(e.target && e.target.id== 'editBookBtn'){
        sendDataToEdit(e.target);
        window.location.href = "/static/editBook.html"
    }
});

document.addEventListener('click', function(c){
    if(c.target && c.target.id== 'deleteBookBtn'){
        deleteData(c.target);
        //window.location.href = "/static/editBook.html"
    }
});

// document.addEventListener('oninput', function(t){
//     if(t.target && t.target.id== 'searchbar'){
//         postSearchKeywords(t.target);
//         //window.location.href = "/static/editBook.html"
//     }
// });
document.getElementById("searchbar").addEventListener('input', postSearchKeywords);




//--------------------------------------------------------------------------
var template = document.getElementById("handlebars-favs-show").innerHTML;
var templateScript = Handlebars.compile(template);
//--------------------------------------------------------------------------


function showFavorites(){

    fetch('/favorites', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json()) //maybe try json
    .then(data => {
        console.log(data);
        console.log(data[0]);
        
        //let bookresult = JSON.stringify(data);
        //console.log(bookresult);
        outputs = data.length;
        
        let out = '';
        //let intro = 'Favorite Books ' + works.length + '.';
        //let intro2 = 'The first' + outputs + 'results are: ';
        for (i=0; i<outputs; i++){
            bookresult = data[i];
            let isbn = bookresult.isbn;
            let titleshort = bookresult.titleshort;
            let titleweb = bookresult.title;
            let workid = bookresult.workid;
            let review = bookresult.review;

            var context = { "title" : titleweb, "titleshort" : titleshort, "isbn" : isbn, "workid" : workid, "i": i+1, "review": review};

            var html = templateScript(context);
            document.getElementById("favs-output").innerHTML += html;
            
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function sendDataToEdit(e){

    let bp = e.parentElement.firstChild.nextSibling.nextSibling.nextSibling;
    let title2 = bp.innerHTML.split('>')[2];
    let titleshort2 = bp.nextSibling.nextSibling.innerHTML.split('>')[2];
    let isbn2 = bp.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split('>')[2];
    let workid2 = bp.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split('>')[2];
    let review2 = bp.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split('>')[2];
   
    console.log("book to edit: " + title2);
    console.log("book to edit: " + titleshort2);
    console.log( "book to edit: " +isbn2);
    console.log("book to edit: " + workid2);
    console.log("book to edit: " + review2);

    fetch('/editData', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'mode': 'no-cors'
        },
        body: JSON.stringify({title:title2, titleshort:titleshort2, isbn:isbn2, workid:workid2, review:review2})
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
}


function deleteData(e){

    let bp = e.parentElement.firstChild.nextSibling.nextSibling.nextSibling;
    let title2 = bp.innerHTML.split('>')[2];
    let titleshort2 = bp.nextSibling.nextSibling.innerHTML.split('>')[2];
    let isbn2 = bp.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split('>')[2];
    let workid2 = bp.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split('>')[2];
    let review2 = bp.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split('>')[2];
   
    console.log("book to delete: " + title2);
    console.log("book to delete: " + titleshort2);
    console.log("book to delete: " +isbn2);
    console.log("book to delete: " + workid2);
    console.log("book to delete: " + review2);

    fetch('/deleteData', {
        method: "DELETE",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'mode': 'no-cors'
        },
        body: JSON.stringify({title:title2, titleshort:titleshort2, isbn:isbn2, workid:workid2, review:review2})
})
    .then(res => {
        if (res.status == 201){
            console.log('Object deleted.')
            console.log(res)
        }
    })
    location.reload();
}

function postSearchKeywords(e){

    // let bp = e.previousSibling.previousSibling;
    // console.log(bp);
    // let keyword = bp.value;
    // console.log(keyword);
    let keyword = e.target.value;
   
    setTimeout(function(){
        console.log("keyword to search: " + keyword);


        fetch('/searchData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'mode': 'no-cors'
            },
            body: JSON.stringify({keyword:keyword})
        })
        .then(response => response.json()) //maybe try json
        .then(data => {
            console.log(data);
            
            //let bookresult = JSON.stringify(data);
            //console.log(bookresult);
            outputs = data.length;
            console.log("outputs: " + outputs);
            
            let out = '';
            //let intro = 'Favorite Books ' + works.length + '.';
            //let intro2 = 'The first' + outputs + 'results are: ';
            document.getElementById("favs-output").innerHTML = '';
            for (i=0; i<outputs; i++){
                bookresult = data[i];
                console.log(bookresult);
                let isbn = bookresult.isbn;
                let titleshort = bookresult.titleshort;
                let titleweb = bookresult.title;
                let workid = bookresult.workid;
                let review = bookresult.review;

                var context = { "title" : titleweb, "titleshort" : titleshort, "isbn" : isbn, "workid" : workid, "i": i+1, "review": review};

                var html = templateScript(context);
                document.getElementById("favs-output").innerHTML += html;
                
            }
        })
        .catch(error => {
            console.log(error)
        })
    }, 500);
}






    

