for(var i = 0; i < localStorage.length; i++) { // iterate over local storage to recover saved list
    var item = localStorage.getItem(localStorage.key(i)); // get an item from local storage
    var listItem = document.createElement("li"); // create the list item
    listItem.innerText = localStorage.key(i).slice(0,-2); // set the text, culling the " X" that is added due to the button
    listItem.innerHTML = `${listItem.innerText} <button> X </button>` // add the button to the item
    if(item === "true") { // if the item is marked complete we will create it already struck-through
        listItem.complete = true;
        listItem.style.textDecoration = "line-through";
    }
    else // if not we will create it without strike through
        listItem.complete = false;
    document.querySelector("ul").appendChild(listItem); // finally add it as a child
}

document.querySelector("form").addEventListener("submit", function(event) { // function called when submitting the form
    event.preventDefault(); // prevent defaults to prevent page from reloading
    var todo = document.querySelector("#todo") // select the text field
    var listItem = document.createElement("li") // make new list item
    listItem.innerHTML = `${todo.value} <button> X </button>`; // change text on list item to inputted text
    listItem.complete = false; // set the default complete status for the todo item to incomplete
    document.querySelector("ul").appendChild(listItem); // add list item as child of list
    todo.value = ""; // reset input text field
    localStorage.setItem(listItem.innerText, "false"); // save item to local storage
})

document.querySelector("ul").addEventListener("click", function(event) { // function for handling when a list item is clicked
    if(event.target.localName === "li") { // first check whether it's a list item or a button
        if(event.target.complete) { // if it's a list item, check if it's complete
            event.target.style.textDecoration = "none"; // if it is complete already, mark it as incomplete, get rid of the strike through, and then save the new status to local storage
            event.target.complete = false;
            localStorage.setItem(event.target.innerText, "false")
        } else { // if it's not complete, strike it through, mark it complete, and save the new status to local storage
            event.target.style.textDecoration = "line-through";
            event.target.complete = true;
            localStorage.setItem(event.target.innerText, "true")
        }
    } else { // if it was not a list item then it's the remove button 
        localStorage.removeItem(event.target.parentNode.innerText); // first remove it from storage
        event.target.parentNode.remove(); // then remove it from the html
    }
})