
var filter_list = new Array(); //фильтр друзей
var friends_list = new Array(); // все друзья

/* читает localstorage для извлечения фильтра друзей */
/*
filtered_friends -  фильтр друзей
allfriends - все друзья
*/
function readStorage(storageName) {
    let storage = localStorage.getItem(storageName);
    console.log(JSON.parse(storage));
    return JSON.parse(storage);
}

/* обновляет localstorage измененным фильтром */
function updateStorage(data, storageName) {
    localStorage.setItem(storageName, JSON.stringify(data));
    console.log(JSON.stringify(data));
}

/* добавляет друга в фильтр */
function add2filter(event, id) {   
    console.log("id is: " + id);
    for(let fr in friends_list) {
        if(friends_list[fr].id == id) {
            console.log(friends_list[fr]);
            filter_list == null? filter_list[0] = friends_list[fr] : filter_list.push(friends_list[fr]);          
            updateStorage(filter_list, "filtered_friends");
            friends_list.splice(fr, 1);
            updateStorage(friends_list, "friends_list");
            refreshListView(friends_list, "friend-template","allfriends");
            refreshListView(filter_list, "filter-template","filtered"); 
        }
    }
}

/* удаляет друга из фильтра */
function removeFromFilter(event, id) {
    console.log("id is: " + id);
    for(let fi in filter_list) {
        if(filter_list[fi].id == id) {
            //  http://www.codexpedia.com/javascript/javascript-loop-through-array-and-object-properties/              
            friends_list.push(filter_list[fi]);
            updateStorage(friends_list, "friends_list");
            filter_list.splice(fi, 1); 
            updateStorage(filter_list, "filtered_friends");
            refreshListView(friends_list, "friend-template","allfriends");
            refreshListView(filter_list, "filter-template","filtered"); 

        }
    }
}

function searchInPanel_v1(searchStr, list) {
    if(searchStr != "") {
        for(let it in list) {
            if(!(list[it].first_name.search(searchStr) != -1 || list[it].last_name.search(searchStr) != -1 )) {
                console.log("не найдено в:  " + list[it].first_name + " " + list[it].last_name);
                list.splice(it,1); it =0;               
            }
        } 
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(filter_list, "filter-template","filtered"): refreshListView(friends_list, "friend-template","allfriends");            
    } else { 
        // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(filter_list, "filter-template","filtered", "filtered_friends"): refreshListView(friends_list, "friend-template","allfriends", "allfriends");            
    }  
        
}

function searchInPanel(searchStr, list) {
    let resArray = [];
    if(searchStr != "") {
        for(let it in list) {
            if(list[it].first_name.search(searchStr) != -1 || list[it].last_name.search(searchStr) != -1 ) {
               // console.log("не найдено в:  " + list[it].first_name + " " + list[it].last_name);
                resArray.push(list[it]);              
            }
        } 
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(resArray, "filter-template","filtered"): refreshListView(resArray, "friend-template","allfriends");            
    } else { 
        // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(filter_list, "filter-template","filtered"): refreshListView(friends_list, "friend-template","allfriends");            
    } 
}

