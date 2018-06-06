
window.onload = function() {
  console.log("window loaded");
var friends_elems = document.getElementsByClassName("friend");
console.log("friends_elems: " + friends_elems.length);

for(var i=0; i< friends_elems.length; i++) {
  
  friends_elems[i].addEventListener('ondragstart', dragstart, false);
  console.log(friends_elems[i].id + " added event listener");
  friends_elems[i].addEventListener('onmousedown', function() {

  var coords = getCoords(e.target);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

  e.target.style.position = 'absolute';
  document.body.appendChild(e.target);
  moveAt(e);

  e.target.style.zIndex = 1000; // над другими элементами


  function moveAt(e) {
    e.target.style.left = e.pageX - shiftX + 'px';
    e.target.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  e.target.onmouseup = function() {
    document.onmousemove = null;
    e.target.onmouseup = null;
  };

  }, false);
}
};


function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function dragstart () {
  return false;
}

