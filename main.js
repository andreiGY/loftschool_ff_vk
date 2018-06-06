// 1) регистрация приложения -> получение api id
// 2) авторизоваться на сайте
//   - открыть окно с запросом прав
//   - разрешить выполнять действия от нашего имени

VK.init({
    apiId: 6494187
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.78';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}

(async () => {
    try {
        await auth();
        const rawfriends = await callAPI('friends.get', { fields: 'nickname, photo_50, first_name, last_name', count: 10 });
        const friends = rawfriends.items;
        friends_list = friends;
        updateStorage(friends_list, "allfriends");
        refreshListView(friends_list, "friend-template","allfriends");

    } catch (e) {
        console.error(e);
    }
})();

/*загрузка уже хранящегося фильтра друзей*/
function showFilter(fromStorage) {
    if(fromStorage) {
        let result = readStorage("filter_list");
        if(result !== null) filter_list = result;    
    }
    console.log("filter_list contents - " + JSON.stringify(filter_list));
    refreshListView(filter_list, "filter-template","filtered"); 
}

/*обновления списков*/
function refreshListView(listName, templateName, parentNode, storageName) {
    if(storageName !== undefined) listName = readStorage(storageName);
    const rtemplate = document.querySelector("#" + templateName).textContent;
    const rrender = Handlebars.compile(rtemplate);
    const rhtml = rrender(listName);
    const rfriends = document.querySelector("#" + parentNode);
    rfriends.innerHTML = rhtml;
    console.log(JSON.stringify(rfriends));
}

showFilter(true);