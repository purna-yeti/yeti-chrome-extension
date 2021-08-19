console.log('content script ran');

const page = {
  uri: window.location.href,
  hostname: window.location.hostname,
  pathname: window.location.pathname,
  search: window.location.search,
  title: document.title,
  hash: window.location.hash,
}

appendText();
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
        <img id="yeti-widget-icon" src="static/yeti_icon.png" alt="yeti">
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

<link rel="stylesheet" href="content_style.css">

<script src="content_script.js"> </script>
  `
  let banner = $.parseHTML(htmlString);
  console.log("XXXXX");
  $('body').append(banner);

}
