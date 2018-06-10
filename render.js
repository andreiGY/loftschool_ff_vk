
/**
 * @description обновляет представление списка
 * @param {массив всех друзей или отфильтрвоанных друзей} listName 
 * @param {имя шаблона} templateName 
 * @param {имя родительского узла} parentNode 
 * @param {имя хранилища} storageName 
 */
function refreshListView(listName, templateName, parentNode, storageName) {
    if(storageName !== undefined) listName = readStorage(storageName);
    const rtemplate = document.querySelector("#" + templateName).textContent;
    const rrender = Handlebars.compile(rtemplate);
    const rhtml = rrender(listName);
    const rfriends = document.querySelector("#" + parentNode);
    rfriends.innerHTML = rhtml;
    console.log(JSON.stringify(rfriends));
}

/**
 * @description обновляеет предствления всех списков
 */
function refreshAllListView() {
    refreshListView(friends_list, "friend-template","allfriends");
    refreshListView(filter_list, "filter-template","filtered"); 
}