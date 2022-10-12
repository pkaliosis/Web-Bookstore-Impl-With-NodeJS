window.addEventListener("load", editBook);

document.addEventListener('click', function(e){
    if(e.target && e.target.id == 'submit-button'){
        postChanges(e.target);
    }
});

//--------------------------------------------------------------------------
var template = document.getElementById("handlebars-edit-show").innerHTML;
var templateScript = Handlebars.compile(template);
//--------------------------------------------------------------------------


function editBook(){

    fetch('/edits', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json()) //maybe try json
    .then(data => {
        console.log("edits data: " + data);
        console.log(data.title);
        console.log(data.titleshort);
        console.log(data.isbn);
        console.log(data.workid);
        console.log(data.review);

        document.getElementById("title").value = data.title;
        document.getElementById("titleshort").value = data.titleshort;
        document.getElementById("isbn").value = data.isbn;
        document.getElementById("isbn").readOnly = true;
        document.getElementById("workid").value = data.workid;
        
        //let bookresult = JSON.stringify(data);
        //console.log(bookresult);
        /*
        outputs = data.length;
        
        let out = '';
        //let intro = 'Favorite Books ' + works.length + '.';
        //let intro2 = 'The first' + outputs + 'results are: ';
        //for (i=0; i<outputs; i++){
        let isbn = data.isbn;
        let titleshort = data.titleshort;
        let titleweb = data.title;
        let workid = data.workid;
        var context = { "title" : titleweb, "titleshort" : titleshort, "isbn" : isbn, "workid" : workid, "i": i+1};

        var html = templateScript(context);
        document.getElementById("edit-output").innerHTML += html;
        */
                
        //}
    })
    .catch(error => {
        console.log(error)
    })
}

function postChanges(e){

    // let beginpoint = e.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling;
    // let title = beginpoint.innerHTML;
    // let titleshort = beginpoint.nextSibling.nextSibling.innerHTML;
    // let isbn = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    // let workid = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    // let review = beginpoint.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
   
    let title = document.getElementById("title").value;
    let titleshort = document.getElementById("titleshort").value;
    let isbn = document.getElementById("isbn").value;
    let workid = document.getElementById("workid").value;
    let review = document.getElementById("review").value;
    console.log("title: " + title);
    console.log("titleshort: " + titleshort);
    console.log("isbn: " + isbn);
    console.log("workid: " + workid);
    console.log("review: " + review);

    fetch('/edited', {
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
    alert('Your changes have been submitted. Go back to the Favorites page in order to see them.');

    
    
}

/*

    fetch('/submitData', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *//**',
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
    */