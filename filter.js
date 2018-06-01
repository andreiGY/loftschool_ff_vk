
var filter;
/* читает localstorage для извлечения фильтра друзей */
function readStorage() {
    let storage = window.localStorage();
    let filtered = storage.getItem("filtered_friends");

    return JSON.parse(filtered);
}

/* обновляет localstorage измененным фильтром */
function updateStorage(filtered_friends) {
    let storage = window.localStorage();
    storage.setItem("filtered_friends", filtered_friends);
    return;
}

