var friends_list;

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
     //   const [me] = await callAPI('friends.get', { name_case: 'gen' });
     //   const headerInfo = document.querySelector('#headerInfo');

     //   headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`;

        const friends = await callAPI('friends.get', { fields: 'nickname, photo_50, first_name, last_name', count: 10 });
        const template = document.querySelector('#friend-template').textContent;
        const render = Handlebars.compile(template);
        const html = render(friends);
        const allfriends = document.querySelector('#allfriends');

        allfriends.innerHTML = html;
        console.log(JSON.stringify(friends));
        friends_list = friends;
    } catch (e) {
        console.error(e);
    }
})();
