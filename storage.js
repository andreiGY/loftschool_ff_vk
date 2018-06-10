/* работа с хранилищем -  localstorage */

const filtered_friends = "filtered_friends"; // фильтр друзей
const allfriends = "allfriends"; // все друзья


/**
 * @description читает localstorage для извлечения фильтра друзей
 * @param {наименование хранилища} storageName 
 */
function readStorage(storageName) {
    let storage = localStorage.getItem(storageName);
    console.log(JSON.parse(storage));
    return JSON.parse(storage);
}


/**
 * @description обновляет localstorage измененным фильтром
 * @param {данные для сохранения в localstorage} data 
 * @param {наименование хранилища} storageName 
 */
function updateStorage(data, storageName) {
    localStorage.setItem(storageName, JSON.stringify(data));
    console.log(JSON.stringify(data));
}