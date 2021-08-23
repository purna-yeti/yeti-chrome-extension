const widget = document.getElementById("yeti-widget");
const nav = document.getElementById("yeti-widget-nav");
const contentSm = document.getElementById("yeti-widget-content-sm");
const contentLgNav = document.getElementById("yeti-widget-content-lg-nav");
const closeContentLgIcon = document.getElementById("yeti-widget-content-lg-close");
const contentLg = document.getElementById("yeti-widget-content-lg");
const visitExpand = document.getElementById("yeti-widget-visit-expand");
const favouriteExpand = document.getElementById("yeti-widget-favourite-expand");
const visitButton = document.getElementById("yeti-visit-btn");
const favouriteButton = document.getElementById("yeti-favourite-btn");
const favouriteIcon= document.getElementById("yeti-btn-sm-icon-favourite")
const visitIcon= document.getElementById("yeti-btn-sm-icon-visit")
const likeButton = document.getElementById("yeti-like-btn");
const dislikeButton = document.getElementById("yeti-dislike-btn");
const likeIcon = document.getElementById("yeti-btn-sm-icon-like");
const dislikeIcon = document.getElementById("yeti-btn-sm-icon-dislike");
const likeClick = document.getElementById("yeti-btn-sm-like-clicked");
const dislikeClick = document.getElementById("yeti-btn-sm-dislike-clicked");
const likeText = document.getElementById("yeti-btn-sm-text-like");
const dislikeText = document.getElementById("yeti-btn-sm-text-dislike");

// widget.style.position = 'absolute';

enableDragElement();
closeContentLgIcon.addEventListener('click', closeContent);
visitButton.addEventListener('click', openContent);
favouriteButton.addEventListener('click', openContent );
likeButton.addEventListener('click', toggleLike);
dislikeButton.addEventListener('click', toggleLike);

function toggleLike(e) {
  var click = e.target.id.includes("dislike")? dislikeClick: likeClick;
  var text = e.target.id.includes("dislike")? dislikeText: likeText;

  if (click.textContent === '') {
    click.textContent = '✔';
    text.textContent = parseInt(text.textContent) + 1;
  } else {
    click.textContent = '';
    text.textContent = parseInt(text.textContent) - 1;
  }
}

function openContent(e) {
  var {top, left, width} = widget.getBoundingClientRect();
  
  contentLg.classList.remove("yeti-remove");

  if (e.target.id.includes("favourite")) {
    favouriteExpand.classList.remove("yeti-remove");
    favouriteButton.classList.add("yeti-btn-open");
    visitExpand.classList.add("yeti-remove");
    visitButton.classList.remove("yeti-btn-open");
  } else if (e.target.id.includes("visit")) {
    favouriteExpand.classList.add("yeti-remove");
    favouriteButton.classList.remove("yeti-btn-open");
    visitExpand.classList.remove("yeti-remove");
    visitButton.classList.add("yeti-btn-open");
  }

  if (width < contentLg.getBoundingClientRect().width) {
    widget.style.left = `${left - contentLg.getBoundingClientRect().width}px`;
  }

}

function closeContent() {
  var {top, left} = contentSm.getBoundingClientRect();

  contentLg.classList.add("yeti-remove");
  favouriteButton.classList.remove("yeti-btn-open");
  visitButton.classList.remove("yeti-btn-open");

  widget.style.left = `${left + contentLg.getBoundingClientRect().width}px`

}

function enableDragElement() {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  console.log({widget});
  widget.onmousedown = dragMouseDown;
  closeContentLgIcon.onmousedown = null;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    // console.log({pos3, pos4});
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    widget.style.top = (widget.offsetTop - pos2) + "px";
    widget.style.left = (widget.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}