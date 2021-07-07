// console.log('content script ran');

const page = {
  uri: window.location.href,
  hostname: window.location.hostname,
  pathname: window.location.pathname,
  search: window.location.search,
  title: document.title,
}
const likeIcon = '<i class="fa fa-thumbs-up"></i>';
const dislikeIcon = '<i class="fa fa-thumbs-down"></i>';
const favIcon = '<i class="fa fa-heart"></i>';
const pawIcon = '<i class="fa fa-paw"></i>';


function handleStatusClick(buttonId, textId, statusKey, statusVal) {
  // console.log('content statusClick', buttonId, textId, statusKey, statusVal);
  let $button = $(buttonId);
  let $text = $(textId);
  chrome.runtime.sendMessage({
    type: "statusClick", data: {
      statusKey,
      statusVal,
      ...page
    }
  }, function (resp) {
    if (!resp.user || !resp.response.id) {
      $('#yeti-banner').append("Yeti logged out");
      $('#yeti-banner').addClass("yeti-banner-logout");
    } else {
      $button.removeClass();
      $button.addClass(statusVal ? "yeti-btn-clicked" : "yeti-btn");
      $text.text(parseInt($button.text()) + (statusVal ? 1 : -1));
    }

  });
}

// init
chrome.runtime.sendMessage({ type: "onContentInit", data: page },
  function (response) {
    $('#yeti-banner').empty();
    appendText();
    // console.log(response);

    if (!response.user) {
      $('#yeti-banner').append("Yeti logged out");
      $('#yeti-banner').addClass("yeti-banner-logout");
    } else {
      function insertButton(buttonId, textId, icon, statusKey) {
        let $button = $("<button>",
          {
            id: buttonId,
            class: response.resp.user[statusKey] ? "yeti-btn-clicked" : "yeti-btn",
          });
        $button.click(
          () => {
            handleStatusClick(
              `#${buttonId}`,
              `#${textId}`,
              statusKey,
              $button.attr('class') === 'yeti-btn');
          }
        );
        $button.append(
          `${icon}<span id="${textId}">${response.resp.team[statusKey]}</span>`
        );
        $('#yeti-banner').append($button);
      }

      insertButton('yeti-like-button', 'yeti-like-count', likeIcon, 'isLike');
      insertButton('yeti-dislike-button', 'yeti-dislike-count', dislikeIcon, 'isDislike');
      insertButton('yeti-favourite-button', 'yeti-favourite-count', favIcon, 'isFavourite');

      var $pawButton = $("<button>",
        {
          id: "yeti-paw-button",
          class: "yeti-btn"
        });
      $pawButton.click();
      $pawButton.append(`<i class="fa fa-paw"></i>${response.resp.team.visit}`)
      $('#yeti-banner').append($pawButton);

    }

  })



function appendText() {
  let htmlString = `
      <div id="yeti">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
        .yeti-btn {
          background-color: DodgerBlue;
          border: none;
          color: white;
          padding: 8px 6px;
          font-size: 14px;
          cursor: pointer;
          width: 60px;
          border-radius: 15px;
          top: 50%;
        }
        .yeti-btn-clicked {
          background-color: RoyalBlue;
          border: none;
          color: white;
          padding: 8px 6px;
          font-size: 14px;
          cursor: pointer;
          width: 60px;
          border-radius: 15px;
          top: 50%;
        }
        .yeti-btn:hover {
          background-color: RoyalBlue;
        }
        .yeti-btn-clicked:hover {
          background-color: DodgerBlue;
        }
        .yeti-recommend {
          background-color: gray;
          font-size: 14px;
          padding: 8px 6px;
          text-color: white;
        }
        .yeti-banner {
          all: initial; 
          position:fixed; 
          bottom: 0%; 
          right:0;
          z-index: 10000;
        }
        .yeti-banner-logout {
          background-color: DodgerBlue;
          border: none;
          color: white;
        }
        .yeti-title {
          color: white;
        }
        .yeti-text {
          color: white;
        }
        </style>
        <div id="yeti-banner" class="yeti-banner">
         </div>
        
      </div>
      `
  let banner = $.parseHTML(htmlString);
  $('body').append(banner);
  
}
