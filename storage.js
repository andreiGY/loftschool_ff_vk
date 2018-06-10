/*
filtered_friends -  фильтр друзей
allfriends - все друзья
*/

/* читает localstorage для извлечения фильтра друзей */
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