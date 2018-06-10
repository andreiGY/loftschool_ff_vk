/* глобальные переменные -  списки друзей */
var filter_list = new Array(); //фильтр друзей
var friends_list = new Array(); // все друзья


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
            friends_list.push(filter_list[fi]);
            updateStorage(friends_list, "friends_list");
            filter_list.splice(fi, 1); 
            updateStorage(filter_list, "filtered_friends");
            refreshListView(friends_list, "friend-template","allfriends");
            refreshListView(filter_list, "filter-template","filtered"); 

        }
    }
}

function searchInPanel(searchStr, list) {   
    let resArray = [];
    if(searchStr != "") {
        for(let it in list) {
            if(list[it].first_name.search(searchStr) != -1 || list[it].last_name.search(searchStr) != -1 ) {
                resArray.push(list[it]);              
            }
        } 
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(resArray, "filter-template","filtered"): refreshListView(resArray, "friend-template","allfriends");            
    } else {
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(filter_list, "filter-template","filtered"): refreshListView(friends_list, "friend-template","allfriends");            
    } 
}

/*загрузка уже хранящегося фильтра друзей*/
function showFilter(fromStorage) {
    if(fromStorage) {
        let result = readStorage("filter_list");
        if(result !== null) filter_list = result;    
    }
    refreshListView(filter_list, "filter-template","filtered"); 
}

