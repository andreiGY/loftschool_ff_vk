/* глобальные переменные -  списки друзей */
var filter_list = new Array(); //фильтр друзей
var friends_list = new Array(); // все друзья

/**
 * 
 * @param {список из которого перемещаяется друг} fromList 
 * @param {список, в который перемещается друг} toList 
 * @param {id друга} friendId 
 */
function moveFriend(fromList, toList, friendId) {
    if(fromList == toList) return;

    let fromListStorage, toListStorage, fromListArr, toListArr; // массивы и хранилища
    if(fromList == "a_friends") {
        fromListArr = friends_list;
        toListArr = filter_list;
        fromListStorage = allfriends;
        toListStorage = filtered_friends;

    } else { // f_friends
        fromListArr = filter_list;
        toListArr = friends_list;
        fromListStorage = filtered_friends;
        toListStorage = allfriends;
    }

    console.log("from list: " + fromList + "; to list: " + toList + ". friend = " + friendId);
    for(let fri in fromListArr) {
        if(fromListArr[fri].id == friendId) {
            toListArr == null? toListArr[0] = fromListArr[fri]: toListArr.push(fromListArr[fri]);
            updateStorage(toListArr, toListStorage);
            fromListArr.splice(fri, 1);
            updateStorage(fromListArr, fromListStorage);
            refreshAllListView();
        }

    }
}

/**
 * @description поиск строки в имени и/или фамилии друга
 * @param {искомая строка в имени или в фамилии друга} searchStr 
 * @param {массив всех друзей или массив отфильтрованных друзей} list 
 */
function searchInPanel(searchStr, list) {   
    let resArray = [];
    searchStr = searchStr.toUpperCase();
    if(searchStr != "") {
        for(let it in list) {
            if(list[it].first_name.toUpperCase().search(searchStr) != -1 || list[it].last_name.toUpperCase().search(searchStr) != -1 ) {
                resArray.push(list[it]);              
            }
        } 
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(resArray, "filter-template","filtered"): refreshListView(resArray, "friend-template","allfriends");            
    } else {
        JSON.stringify(list) == JSON.stringify(filter_list) ? refreshListView(filter_list, "filter-template","filtered"): refreshListView(friends_list, "friend-template","allfriends");            
    } 
}


