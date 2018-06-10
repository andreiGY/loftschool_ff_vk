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
        // если в хранлище уже существует  сохраненный список всех друзей, то повторно его не загружаем из VK
        let sfr = readStorage("allfriends");
        if(sfr == null) 
        {
            console.log("список друзей отсутствует в localstorage");
            await auth();
            const rawfriends = await callAPI('friends.get', { fields: 'nickname, photo_50, first_name, last_name', count: 10 });
            const friends = rawfriends.items;
            friends_list = friends;
            updateStorage(friends_list, "allfriends");
        } else {
            console.log("список друзей найден в localstorage");
            friends_list = sfr;
        }
        refreshListView(friends_list, "friend-template","allfriends");
    } catch (e) {
        console.error(e);
    }
})();

/*отобразить список отфильтрвоанных друзей из localstorage*/
refreshListView(filter_list, "filter-template","filtered", filtered_friends);