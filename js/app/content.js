console.log('content script ran');

const page = {
  uri: window.location.href,
  hostname: window.location.hostname,
  pathname: window.location.pathname,
  search: window.location.search,
  title: document.title,
  hash: window.location.hash,
}

// const likeIcon = '<i class="fa fa-thumbs-up"></i>';
// const dislikeIcon = '<i class="fa fa-thumbs-down"></i>';
// const favIcon = '<i class="fa fa-heart"></i>';
// const pawIcon = '<i class="fa fa-paw"></i>';


// let s = document.createElement('script');
// s.type = 'text/javascript';
// s.src = chrome.extension.getURL('angular.elements.bundle.js');
// s.onload = function() {
//     this.parentNode.removeChild(this);
// };
// try {
//     (document.head || document.documentElement).appendChild(s);
// } catch (e) {
//     console.log(e);
// }

// function handleStatusClick(buttonId, textId, statusKey, statusVal) {
//   // console.log('content statusClick', buttonId, textId, statusKey, statusVal);
//   let $button = $(buttonId);
//   let $text = $(textId);
//   chrome.runtime.sendMessage({
//     type: "statusClick", data: {
//       statusKey,
//       statusVal,
//       ...page
//     }
//   }, function (resp) {
//     if (!resp.user || !resp.response.id) {
//       $('#yeti-banner').append("Yeti logged out");
//       $('#yeti-banner').addClass("yeti-banner-logout");
//     } else {
//       $button.removeClass();
//       $button.addClass(statusVal ? "yeti-btn-clicked" : "yeti-btn");
//       $text.text(parseInt($button.text()) + (statusVal ? 1 : -1));
//     }

//   });
// }

// init
chrome.runtime.sendMessage({ type: "onContentInit", data: page },
  function (response) {
     $('#yeti-banner').empty();
    appendText();
    // console.log(response);

    // if (!response.user || response.resp.status == 401) {
    //   $('#yeti-banner').append("Yeti logged out");
    //   $('#yeti-banner').addClass("yeti-banner-logout");
    // } else {
    //   function insertButton(buttonId, textId, icon, statusKey) {
    //     let $button = $("<button>",
    //       {
    //         id: buttonId,
    //         class: response.resp.user[statusKey] ? "yeti-btn-clicked" : "yeti-btn",
    //       });
    //     $button.click(
    //       () => {
    //         handleStatusClick(
    //           `#${buttonId}`,
    //           `#${textId}`,
    //           statusKey,
    //           $button.attr('class') === 'yeti-btn');
    //       }
    //     );
    //     $button.append(
    //       `${icon}<span id="${textId}">${response.resp.team[statusKey]}</span>`
    //     );
    //     $('#yeti-banner').append($button);
    //   }

    //   insertButton('yeti-like-button', 'yeti-like-count', likeIcon, 'isLike');
    //   insertButton('yeti-dislike-button', 'yeti-dislike-count', dislikeIcon, 'isDislike');
    //   insertButton('yeti-favourite-button', 'yeti-favourite-count', favIcon, 'isFavourite');

    //   var $pawButton = $("<button>",
    //     {
    //       id: "yeti-paw-button",
    //       class: "yeti-btn"
    //     });
    //   $pawButton.click();
    //   $pawButton.append(`<i class="fa fa-paw"></i>${response.resp.team.visit}`)
    //   $('#yeti-banner').append($pawButton);

    // }

  })



function appendText() {
  console.log("YYYYYY");
  let htmlString = `
  <div id="yeti-container">

  <div id="yeti-widget">
    <!-- Include a nav DIV with the same name as the draggable DIV, followed by "nav" -->

    <div id="yeti-widget-content-lg" class="yeti-remove">
      <div id="yeti-widget-content-lg-nav">
        <div id="yeti-widget-content-lg-close">⤬</div>
        <div id="yeti-widget-content-lg-title">Project Prealpha0</div>
      </div>

      <div id="yeti-widget-content-lg-content">
        <div id="yeti-widget-visit-expand">
          
          Stat
        
        </div>
        <div id="yeti-widget-favourite-expand">
          
          Yeti
        
        </div>
      </div>
    </div>
    
    <div id="yeti-widget-content-sm">
      <div id="yeti-widget-nav">
        <img id="yeti-widget-icon" src="https://raw.githubusercontent.com/purna-yeti/yeti-chrome-extension/main/js/app/static/yeti_icon.png" alt="yeti">
      </div>

      <div class="yeti-btn-sm" id="yeti-like-btn" data-clicked="true">
        <span id="yeti-btn-sm-icon-like">👍<span id="yeti-btn-sm-like-clicked"></span></span>
        <span id="yeti-btn-sm-text-like" class="yeti-btn-sm-text">10</span>
      </div>
      <div class="yeti-btn-sm" id="yeti-dislike-btn">
        <span id="yeti-btn-sm-icon-dislike">👎<span id="yeti-btn-sm-dislike-clicked"></span></span>
        <span id="yeti-btn-sm-text-dislike" class="yeti-btn-sm-text">75</span>
      </div>
      <div class="yeti-btn-sm yeti-btn-sm-expand" id="yeti-favourite-btn">
        <span class="yeti-btn-sm-expand-icon" id="yeti-btn-sm-icon-favourite">❤</span>
        <span class="yeti-btn-sm-text" id="yeti-btn-sm-text-favourite">998</span>
      </div>
      <div class="yeti-btn-sm yeti-btn-sm-expand" id="yeti-visit-btn">
        <span class="yeti-btn-sm-expand-icon" id="yeti-btn-sm-icon-visit">👣</span>
        <span class="yeti-btn-sm-text" id="yeti-btn-sm-text-visit">>1k</span>
      </div>
      
    </div>
    

  </div>


  </div>
  

  </div>

</div>


<style>
#yeti-container {
  margin: 0;
  font-size: 1rem;
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-end;
}

#yeti-widget {
  position: absolute;
  z-index: 9;
  /* background-color: #f1f1f1; */
  /* border: 1px solid #d3d3d3; */
  display: flex;
  height: 250px;
  
  /* text-align: center; */
}

#yeti-widget-content-lg {
  background-color: #eeeeee;
  border-radius: 5%;
  border: 1px solid #d3d3d3;
  margin-right: 2px;
  width: 300px;
  height: 400px;
}

#yeti-widget-content-lg-nav {
  background-color: #2196F3;
  /* border: 1px solid black; */
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 37px;
  border-radius: 5%;
}

#yeti-widget-content-lg-nav:active {
  cursor: grabbing;
}

#yeti-widget-content-lg-close {
  /* background-color: #2196F3; */
  border: 1px solid #f3f3f3;
  cursor:pointer;
  margin: 5px;
  color: white;
}
#yeti-widget-content-lg-title {
  /* border: 1px solid black; */
  font-size: 20px;
  color: white;
}

#yeti-widget-content-lg-content {
  /* overflow: scroll; */
  /* border: 1px solid black; */
  height: 363px;
}

.yeti-widget-content-open {
  height: 360px;
  overflow: scroll;
}

#yeti-widget-nav {
  /* padding: 10px; */
  /* cursor: grabbing;
  cursor: -moz-grab; */
  cursor: -webkit-grab;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
  /* width: 4.5rem; */
  height: 37px;
  border-radius: 10%;
  text-align: center;
}

#yeti-widget-nav:active {
  cursor: grabbing;
}

#yeti-widget-content-sm {
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  width: 4rem;
  /* height: 12rem; */
  align-content: center;
  justify-content: space-between;
  background-color:#eeeeee;
  border: 1px solid #d3d3d3;
  border-radius: 3%;
  /* margin: 30px; */
}

.yeti-btn-sm {
  display: flex;
  /* flex: 1 1 1; */
  /* flex-basis: 2rem; */
  cursor:pointer;
  margin: 5px;
  /* border-radius: 10%; */
  /* border: 1px solid red; */
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: #dddddd;
  border: none;
  border-radius: 5%;
  box-shadow: 2px 5px #999;
}
.yeti-btn-sm:hover {
  background-color: #bbbbbb;
}
.yeti-btn-sm:active {
  background-color: #bbbbbb;
  box-shadow: 0 1px #666;
  transform: translateY(4px);
}
.yeti-btn-open {
  background-color: #bbbbbb;
  box-shadow: 0 1px #666 !important;
}
.yeti-btn-clicked {
  background-color: #bbbbbb;
}

#yeti-btn-sm-icon-like {
  font-size: 1rem;
  text-align: right;
  /* flex: 1; */
  /* border: 1px solid black; */
}
#yeti-btn-sm-icon-dislike {
  font-size: 1rem;
  text-align: right;
  flex: 1;
  /* border: 1px solid black; */
}



.yeti-btn-sm-expand {
  transition: all 0.1s;
  box-shadow: 1px 3px;
  border: none;
}
.yeti-btn-sm-expand .yeti-btn-sm-expand-icon {
  cursor: pointer;
  display: inline-block;
  position: relative;
  /* transition: 0.5s; */
}
.yeti-btn-sm-expand .yeti-btn-sm-expand-icon:after {
  content: '\\00ab';
  position: absolute;
  opacity: 0;
  top: 0;
  right: 30px;
  /* transition: 0.5s; */
}
.yeti-btn-sm-expand:hover .yeti-btn-sm-expand-icon {
  padding-left: 15px;
}
.yeti-btn-sm-expand:hover .yeti-btn-sm-expand-icon:after {
  opacity: 1;
  right: 25px;
  /* border: 1px solid black; */
}



#yeti-btn-sm-icon-favourite {
  font-size: 1.1rem;
  text-align: right;
  flex: 1;
  /* border: 1px solid black; */
}

#yeti-btn-sm-icon-visit {
  font-size: 1rem;
  /* text-align: right; */
  flex: 1;
  /* border: 1px solid black; */
}
.yeti-btn-sm-text {
  font-size: 0.9rem;
  flex: 1;
  text-align: left;
  
  /* border: 1px solid black; */
}

#yeti-widget-icon {
  width: 35px;
  color: white;
}

.yeti-remove {
  display: none;
  visibility: hidden;

  /* transition:  0.5s; */
}
</style>
<script> 
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
    widget.style.left = left - contentLg.getBoundingClientRect().width + 'px';
  }

}

function closeContent() {
  var {top, left} = contentSm.getBoundingClientRect();

  contentLg.classList.add("yeti-remove");
  favouriteButton.classList.remove("yeti-btn-open");
  visitButton.classList.remove("yeti-btn-open");

  widget.style.left = left + contentLg.getBoundingClientRect().width} + 'px';

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
</script>
  `
  let banner = $.parseHTML(htmlString);
  console.log("XXXXX");
  $('body').append(banner);

}
