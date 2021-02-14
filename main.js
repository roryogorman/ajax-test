var xhr = new XMLHttpRequest(); // This is an inbuilt objectthat JS provides to allow us to consume APIs
var data; //we can store the data of the object in a new variable and manipulate it (adding then line 13)

xhr.open("GET","https://ci-swapi.herokuapp.com/api/"); //As we want to retrieve data from the Star Wars API, we use GET method
xhr.send(); //This sends our request

xhr.onreadystatechange = function () { // This function is waiitng to see if xhr's state has changed 
    if(this.readyState == 4 && this.status == 200) { //Ready State=4 means the operation has been completed (Google xhr readystate to see). Status of 200 means 'ok. Request succeeded'...similar to 404 error, etc 
        //document.getElementById("data").innerHTML = this.responseText; //once everything is ok, we want to go to the ID of 'data' and change its innher HTML to the response text that we get back from our xhr object
        //console.log(typeof(this.responseText)); //checks the type of data that is 'this.responseText'.
        //console.log(typeof(JSON.parse(this.responseText))); //reads the strung into a JSON data structure. 'string' becomes 'object'
        //console.log(JSON.parse(this.responseText)); //This logs the actual data of the object to the console i.e. we can see the data itself
        data = this.responseText; // store and manipulate the data in the new variable and then console.log outside of the function
    }
};

console.log(data);
