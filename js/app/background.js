console.log('background script ran');
let dev = true;
let domain = dev ? "http://localhost:8000/" : 'https://yeti-backend-v5omsitsja-uc.a.run.app/';

let recommendations = [

];
let payload;

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    switch (message.type) {
      case 'onPopupInit':
        console.log('background onPopupInit');
        sendResponse(getStorageItem('user'));
        return true;
        break;
      case 'onProjectInit':
        console.log('backgrounnd onProjectInit');
        ajaxCall("GET", "project/recent", {}, getStorageItem('user').token, function (resp) {
          if (resp.status === 401) {
            sendResponse(resp.status);
          } else {
            setStorageItem('projects', resp);
            payload = {
              user: getStorageItem('user'),
              projects: getStorageItem('projects')
            };
            if (resp.length > 0) {
              payload.selectedProject = resp[0];
              setStorageItem('project', resp[0]);
            }
            sendResponse(payload);
          }
        })
        return true;
        break;
      case "onContentInit":
        console.log('background onContentInit');
        sendResponse(getStorageItem('user'));
        return true;
        break;
      case "login":
        console.log('background login', message.data);
        let userLoginCreds = message.data;
        userLoginCreds.username = message.data.email.split('@')[0];
        ajaxCall("POST", "user/login", userLoginCreds, '', function (response) {
          console.log('response from server is: ', response);
          setStorageItem('user', response);
          sendResponse(response);
        })
        return true;
        break;
      case "logout":
        console.log('background logout');
        setStorageItem('user', null);
        sendResponse(null);
        return true;
        break;
      case "signup":
        console.log('background signup', message.data);
        let userCreds = message.data;
        userCreds.username = message.data.email.split('@')[0];
        ajaxCall("POST", "user/signup", userCreds, '', function (response) {
          console.log('response from server is: ', response);
          sendResponse(response);
        })
        return true;
        break;
      case "selectProject":
        console.log('background selectProject', message.data.title);
        setStorageItem('project', message.data);
        sendResponse({
          user: getStorageItem('user'),
          project: getStorageItem('project')
        });
        return true;
        break;
      
      case "onProjectContentInit":
        console.log('background onProjectContentInit', message.data);
        ajaxCall("GET",
          `content/project_id/${message.data.projectId}`,
          {}, getStorageItem('user').token, function (resp) {
            if (resp.status === 401) {
              sendResponse(resp.status);
            } else {
              console.log("XXX", resp);
              setStorageItem('projectContents', resp);
              let payload = {
                user: getStorageItem('user'),
                projectContents: getStorageItem('projectContents')
              };
              sendResponse(payload);
            }
          });
        return true;
        break;
      case "backToProject":
        console.log('background backToProject');
        setStorageItem('projectContents', []);
        payload = {
          user: getStorageItem('user'),
        };
        sendResponse(payload);
        return true;
        break;

      // case 'initiateHistoryScraping':
      //     console.log('message: ',message);
      //     chrome.tabs.create({url: 'https://www.amazon.com/gp/css/order-history?ahf=on'});
      //     return true;
      //     break;
      // case 'purchaseYears':
      //   console.log('purchaseYears event was hit in background');
      //   let purchaseYears = [];
      //   for (let i = 0; i < message.data.length; i++) { 
      //     let value = message.data[i];
      //     if(value.includes('-')&&!value.includes('months')){
      //        purchaseYears.unshift(value.split('-')[1]);
      //     }
      //   }
      //   setStorageItem(message.type, purchaseYears);
      //   sendResponse('all good');
      //   return true;
      //   break;
      // case 'ordersPageDetails':
      //   let paginationDetails = message.data.paginationDetails;
      //   if (paginationDetails === undefined || paginationDetails.length == 0) {
      //       page_number = 1; 
      //       multi_page = false;
      //   } else {
      //     multi_page = 1;
      //   }

      //   message.data._id = getStorageItem('user').user._id;
      //   message.data.multi_page = multi_page;
      //   message.data.total_pages = paginationDetails.length == 0 ? 1 : paginationDetails.length; 
      //   setStorageItem(message.type, message.data);
      //   ajaxCall('POST', 'product/products-from-history', message.data, getStorageItem('user') ? getStorageItem('user').token : '', function(response){
      //     let nextWhat = '';
      //     let year = 0;
      //     let startIndex = 0;
      //     let purchaseYears = getStorageItem('purchaseYears');

      //     console.log('response from /product/products-from-history',response);
      //     if(response.multiPageYear=="false"){
      //       // ie to begin with, there was only one page for the year
      //       // find index of the year which was just scraped
      //       let index = purchaseYears.indexOf(response.purchaseYear.toString());

      //       //navigate to the next year in the purchaseYears Array
      //       nextWhat = 'nextYear';
      //       year = purchaseYears[index + 1];
      //     } else {
      //       //multi-page year
      //       //step 1: check whether you just scraped the final page

      //       if(response.yearlyPageNumber == response.totalPagesOfYear){
      //         // find index of the year which was just scraped
      //         let index = purchaseYears.indexOf(response.purchaseYear.toString());
      //         //navigate to the next year in the purchaseYears Array
      //         nextWhat = 'nextYear';
      //         year = purchaseYears[index + 1];
      //       } else {
      //       // you are on a year page with more than one page in it 
      //       //& you need to navigate to the next page of the given year
      //         startIndex = response.yearlyPageNumber*10;
      //         nextWhat = 'nextPage';
      //         year = response.purchaseYear;
      //       }
      //     }
      //     sendResponse({nextWhat: nextWhat, year:year, startIndex:startIndex});
      //   });
      //   return true;
      //   break;
      // case 'initiateSearchScraping':
      //   console.log('message: ',message);
      //   chrome.tabs.create({url: message.search_url + '&asf=on'});  
      //   return true;
      //   break;
      // case 'initiateSearchKeywordsScraping':
      //   console.log('message: ',message);
      //   let search_keywords = message.search_keywords.split(',');
      //   setStorageItem('search_keywords',search_keywords);
      //   var search_url = 'https://www.amazon.com/s?k='+ search_keywords[0];
      //   chrome.tabs.create({url: search_url + '&asf=on'});  
      //   return true;
      //   break;
      // case 'searchPageData':
      //   console.log('data in searchPageData case: ', message);
      //   setStorageItem('searchPageDetails', {searchKeyword: message.data.searchKeyword, totalSearchPages: message.data.totalSearchPages, searchPageNumber: parseInt(message.data.searchPageNumber) } ); 
      //   setStorageItem(message.type, message.data);
      //   message.data._id = getStorageItem('user').user._id;
      //   ajaxCall('POST', 'product/products-from-search', message.data, getStorageItem('user') ? getStorageItem('user').token : '', function(response){
      //       console.log('response from server for /extension/products-from-search post request:', response);
      //       let nextWhat = '';
      //       let searchKeyword = '';
      //       let nextPageNumber = 1;

      //       if(response.error){
      //         nextWhat = 'nextPage';
      //         //need to pull up keyword from localStorage
      //         let searchPageDetails = getStorageItem('searchPageDetails')
      //         nextPageNumber = searchPageDetails.searchPageNumber+1;
      //         searchKeyword = searchPageDetails.searchKeyword;
      //       } else if(response.searchPageNumber < response.totalSearchPages){
      //         nextWhat = 'nextPage';
      //         nextPageNumber = response.searchPageNumber+1;
      //         searchKeyword = response.searchKeyword; 
      //       } else if(response.searchPageNumber == 75 || response.nextWhat == 'nextKeyword'){
      //         nextWhat = 'nextKeyword';
      //         let search_keywords = getStorageItem('search_keywords');
      //         let index = search_keywords.indexOf(response.searchKeyword.toString());
      //         console.log('index of keyword: ', index);
      //         console.log('search_keywords: ', search_keywords);

      //         //navigate to the next keywords in the purchaseYears Array
      //         searchKeyword = search_keywords[index + 1];
      //       } else {
      //         nextWhat = 'nextKeyword';
      //         let search_keywords = getStorageItem('search_keywords');
      //         let index = search_keywords.indexOf(response.searchKeyword.toString());
      //         console.log('index of keyword: ', index);
      //         console.log('search_keywords: ', search_keywords);

      //         //navigate to the next keywords in the purchaseYears Array
      //         searchKeyword = search_keywords[index + 1];
      //       }
      //       sendResponse({nextWhat: nextWhat, nextPageNumber: nextPageNumber, searchKeyword: searchKeyword });                
      //   });
      //   return true;
      //   break;
      default:
        console.log('couldnt find matching case');
    }
  });


function ajaxCall(type, path, data, token, callback) {
  const PREFIX = `${type} ${path}`;
  $.ajax({
    url: domain + path,
    type: type,
    data: data,
    headers: {
      token: token
    },
    success: function (response) {
      console.log(`${PREFIX}: `, response)
      callback(response);
    },
    error: function (response) {
      console.log(`${PREFIX}: `, response)
      callback(response);
    }
  });
}

function setStorageItem(varName, data) {
  console.log('SET STORAGE: ', varName, data);
  if (varName != 'searchPageData') {
    window.localStorage.setItem(varName, JSON.stringify(data));
  }
}

function getStorageItem(varName) {
  const resp = JSON.parse(localStorage.getItem(varName));
  console.log(`GET STORAGE Key ${varName}`, resp);
  return resp;
}