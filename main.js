/*var xhr = new XMLHttpRequest(); // This is an inbuilt objectthat JS provides to allow us to consume APIs
var data; //we can store the data of the object in a new variable and manipulate it (adding then line 13)

xhr.open("GET","https://ci-swapi.herokuapp.com/api/"); //As we want to retrieve data from the Star Wars API, we use GET method
xhr.send(); //This sends our request


/*xhr.onreadystatechange = function () { // This function is waiitng to see if xhr's state has changed 
    if(this.readyState == 4 && this.status == 200) { //Ready State=4 means the operation has been completed (Google xhr readystate to see). Status of 200 means 'ok. Request succeeded'...similar to 404 error, etc 
        //document.getElementById("data").innerHTML = this.responseText; //once everything is ok, we want to go to the ID of 'data' and change its innher HTML to the response text that we get back from our xhr object
        //console.log(typeof(this.responseText)); //checks the type of data that is 'this.responseText'.
        //console.log(typeof(JSON.parse(this.responseText))); //reads the strung into a JSON data structure. 'string' becomes 'object'
        //console.log(JSON.parse(this.responseText)); //This logs the actual data of the object to the console i.e. we can see the data itself
        data = this.responseText; // store and manipulate the data in the new variable and then console.log outside of the function
    }
};

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        
    }
};
/* setTimeout stops console.log being called long before the data is set.
we set a callback function and then a time in milliseconds, which tells the 
console.log to wait (e.g. 500 milliseconds) before being executed i.e. stops 'undefined' being returned
due to being called before ready state 4 
setTimeout(function() {
    console.log(data);
}, 500); */



// Using callbacks without setting a time
/*function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET","https://ci-swapi.herokuapp.com/api/");
    xhr.send(); 

    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        cb(JSON.parse(this.responseText));   
    }
};
} */

/*getData (function(data) {
    console.log(data);
});
/* We're explicitly invoking our getData function, then checks to see if readystate is 4 & status is 200
and only at that stage we then invoke our callback function (cb) that we passed through as our argument */

/* if we dont want to write a funcion inside getData, we can write a seperate function as below */
/*function printDataToConsole(data) {
    console.log(data);
};

getData(printDataToConsole); */



function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send(); 

    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        cb(JSON.parse(this.responseText));   
    }
};
}
// as 'films' does not have a Name propery, we create a table to bring in all the values
function getTableHeaders(obj) {
        var tableHeaders = [];
        Object.keys(obj).forEach(function(key) {
            tableHeaders.push(`<td>${key}</td>`);
        });

        return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = []; //to import rows of data to the table
    var el = document.getElementById("data"); //stores the data
    el.innerHTML = ""; // empty string - clears the returned list so you dont get it appeneded each time you click
    getData(url, function(data) {
        var pagination; //for pagination
        if (data.next || data.previous) { 
            pagination = generatePaginationButtons(data.next,data.previous);
        }
        
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        data.forEach(function(item) {
            //el.innerHTML += "<p>" + item.name + "</p>"; .name unpacks into JSON format. += stops overwriting
            var dataRow = [];
            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString(); // this converts each value of the key to a string, so we can truncate
                var truncatedData = rowData.substring(0, 15); //truncates to 15 characters
                dataRow.push(`<td>${truncatedData}</td>`); // item[key] (the value of the key) will push the data thats in each individual key. This pushes into dataRow
            })
            tableRows.push(`<tr>${dataRow}</tr>`); //this then pushes dataRow (above) into the tableRows array in line 86
        })

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
        // document.getElementById("data").innerHTML = data.results;
    });
}