function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    var friend_record = {
        id: ev.target.dataset.id,
        list: ev.target.dataset.list
    };
    console.log(ev.target.dataset.list);
    ev.dataTransfer.setData("text", JSON.stringify(friend_record));
}

function drop(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    console.log(data.list + " -  " + ev.target.dataset.list);
    if(data.list == ev.target.dataset.list) return;
    moveFriend(data.list, ev.target.dataset.list, data.id);
}