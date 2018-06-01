
var filter_list = new Array(); //фильтр друзей
var friends_list = new Array(); // все друзья

/* читает localstorage для извлечения фильтра друзей */
function readStorage() {
    let filtered = localStorage.getItem("filtered_friends");
    console.log(JSON.parse(filtered));
    return JSON.parse(filtered);
}

/* обновляет localstorage измененным фильтром */
function updateStorage(filtered_friends) {
    localStorage.setItem("filtered_friends", JSON.stringify(filtered_friends));
    console.log(JSON.stringify(filtered_friends));
    return;
}

function add2filter(event, id) {   
    console.log("id is: " + id);
    for(let fr in friends_list) {
        if(friends_list[fr].id == id) {
            console.log(friends_list[fr]);
            filter_list.push(friends_list[fr]);
            updateStorage(filter_list);
           friends_list.splice(fr, 1);
            showFilter();
            refreshFriends();
        }
    }
}


function removeFromFilter(event, id) {
    console.log("id is: " + id);
    for(let fi in filter_list) {
        if(filter_list[fi].id == id) {
            filter_list.splice(fi, 1); 
            updateStorage(filter_list);
            //  http://www.codexpedia.com/javascript/javascript-loop-through-array-and-object-properties/              
            friends_list.push(filter_list[fi]);
            refreshFriends();
            showFilter();

        }
    }
}

function searchInPanel(searchStr, list) {
    if(list == "friends") {
        
    } else {

    }
}

