function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    var friend_record = {
        id: ev.target.id,
        list: ev.target.parentNode.parentNode.id
    };
    console.log(friend_record.id + " - " + friend_record.list);
    ev.dataTransfer.setData("text", JSON.stringify(friend_record));
}

function drop(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text"));
    if(data.list == ev.target.parentNode.parentNode.id) return;
    if(data.list == "allfriends") {
        add2filter(ev, data.id)
    } else { // "filtered"
        removeFromFilter(ev, data.id)
    }
    //ev.target.appendChild(document.getElementById(data.id));
}