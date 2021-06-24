console.log('popup.js loaded');



let yetiHunt = angular.module("yeti-hunt", ['ui.router']);

yetiHunt.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '../views/home.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: '../views/login.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '../views/signup.html'
		})
		.state('project', {
			url: '/project',
			templateUrl: '../views/project.html'
		})
		// .state('search-options', {
		// 	url: '/search-options',
		// 	templateUrl: '../views/search-options.html'
		// })
		

	$urlRouterProvider.otherwise('login')
})

yetiHunt.controller("PopupCtrl", ['$scope', '$state', function($scope, $state){
	console.log('PopupCtrl Initialized');

	$scope.onPopupInit = function() {
        console.log('ran $scope.onPopupInit function');
        chrome.runtime.sendMessage({type:"onPopupInit"}, 
            function(response){
                console.log('this is the response from the background page for onPopupInit message', response);
                if(!!response && !!response.user){
                    $scope.name = response.user.name;
                    $state.go('project');
                }       
            }
        );
    };

    $scope.onPopupInit();

	$scope.login = function(formData){
		console.log('formData from Login: ', formData);
		chrome.runtime.sendMessage({type: "login", data: formData},
			function(response){
				console.log('response from the background is: ', response);
				if(response.user){
					$scope.name = response.user.username; 
					$state.go('project');	
				}
			} 
		)
	}

	$scope.signup = function(formData){
		console.log('formData from Signup: ', formData);
		chrome.runtime.sendMessage({type: "signup", data: formData},
			function(response){
				console.log('response from the background is: ', response);
				if(response.token){
					$state.go('login');
				}
			} 
		)
	}

    $scope.logout = function(){
        console.log('logout on popup pressed');
        chrome.runtime.sendMessage({type: 'logout'}, 
            function(response){
                console.log('project::::', response);
                $state.go('login');
            })
    }

}]);


let projects = [ 
    {
        "title": "Intermediate Business Mindset",
        "team_title": "Kelompok Belajar",
        "description": "This is a private group for people who wants to learn more about business mindset",
        "updatedAt": "2021-06-23T09:34:58.022Z",
        "createdAt": "2021-06-23T09:34:58.022Z",
        "owner": "purna0@purna0.com",
        "selected": true,
        "topTeammates": ["purna0"]
    },
    {
        "title": "Advanced Business Mindset",
        "team_title": "Kelompok Belajar",
        "description": "This is a private group for people who wants to learn more about business mindset",
        "updatedAt": "2021-06-23T09:34:58.022Z",
        "createdAt": "2021-06-23T09:34:58.022Z",
        "owner": "purna0@purna0.com",
        "selected": false,
        "topTeammates": ["purna0"]
    },
    {
        "title": "Beginner Business Mindset",
        "team_title": "Kelompok Belajar",
        "description": "This is a private group for people who wants to learn more about business mindset",
        "updatedAt": "2021-06-23T09:34:58.022Z",
        "createdAt": "2021-06-23T09:34:58.022Z",
        "owner": "purna0@purna0.com",
        "selected": false,
        "topTeammates": ["purna0"]
    }
]

yetiHunt.controller("ProjectCtrl", ['$scope', '$state', function($scope, $state){
    console.log('ProjectCtrl Initialized');
    
    $scope.onProjectInit = function() {
        console.log('ran $scope.onProjectInit function');
        chrome.runtime.sendMessage({type:"onProjectInit"}, 
            function(response){
                if(!!response && !!response.user){
                    $scope.name = response.user.username;
                    $state.go("project"); // self loop to attach username again
                }       
            }
        );
    };
    $scope.onProjectInit();

    $scope.samplef = function() {};



}]);

// yetiHunt.controller("ScraperCtrl", ['$scope', '$state', function($scope, $state){
// 	console.log('ScraperCtrl Initialized');

// 	 //scrape purchase history result
//     $scope.fetchMyHistory = function(user){
//         chrome.runtime.sendMessage({type:"initiateHistoryScraping", user: user }, 
//             function(response){
//                 console.log('this is the response from the content page for initiateHistoryScraping Event',response);
//                 if(response.error){
//                     let theErrorMessage = response.data.responseJSON.error;
//                     console.log('theErrorMessage:',theErrorMessage);
//                     $scope.errorMessage = theErrorMessage;
//                     $scope.error = true;  
//                 }
//             }
//         ); 
//     }

//     $scope.showSearchOptions = function(){
//     	$state.go('search-options');
//     }

//      //scrape search results
//     $scope.initiateSearchScraping = function(){
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             console.log('tabs', tabs);
//             chrome.runtime.sendMessage({type:"initiateSearchScraping", tabs: tabs, search_url: tabs[0].url }, 
//                 function(response){
//                     console.log('this is the response from the content page for the initiateSearchScraping Event',response); 
//                     if(response.error){
//                         let theErrorMessage = response.data.responseJSON.error;
//                         console.log('theErrorMessage:',theErrorMessage);
//                         $scope.errorMessage = theErrorMessage;
//                         $scope.error = true;  
//                     } else {
//                          $state.go('home.dance-time');
//                     }
//                 }
//             ); 
//         });  
//     }

//     $scope.initiateSearchKeywordsScraping = function(search_keywords){
//         console.log('search_keywords: ',search_keywords)
//         chrome.runtime.sendMessage({type:"initiateSearchKeywordsScraping", search_keywords: search_keywords }, 
//             function(response){
//                 console.log('this is the response from the content page for the initiateSearchKeywordsScraping Event',response); 
//                 if(response.error){
//                     let theErrorMessage = response.data.responseJSON.error;
//                     console.log('theErrorMessage:',theErrorMessage);
//                     $scope.errorMessage = theErrorMessage;
//                     $scope.error = true;  
//                 } else {
//                      $state.go('home.dance-time');
//                 }
//             }
//         );   
//     }

// }]);