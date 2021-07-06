console.log('popup.js loaded');


let yetiHunt = angular.module("yeti-hunt", ['ui.router']);

yetiHunt.config(function ($stateProvider, $urlRouterProvider) {

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
        .state('projectContent', {
            url: '/projectContent/{projectId}',
            templateUrl: '../views/projectContent.html'
        })

    $urlRouterProvider.otherwise('login')
})

yetiHunt.controller("PopupCtrl", ['$scope', '$state', function ($scope, $state) {
    console.log('PopupCtrl Initialized');

    $scope.onPopupInit = function () {
        console.log('popup onPopupInit');
        chrome.runtime.sendMessage({ type: "onPopupInit" },
            function (response) {
                console.log('this is the response from the background page for onPopupInit message', response);
                if (!!response && !!response.user) {
                    $scope.name = response.user.name;
                    $state.go('project');
                }
            }
        );
    };

    $scope.onPopupInit();

    $scope.login = function (formData) {
        console.log('popup login: ', formData);
        chrome.runtime.sendMessage({ type: "login", data: formData },
            function (response) {
                console.log('response from the background is: ', response);
                if (response.user) {
                    $scope.name = response.user.username;
                    $state.go('project');
                }
            }
        )
    }

    $scope.signup = function (formData) {
        console.log('popup signup: ', formData);
        chrome.runtime.sendMessage({ type: "signup", data: formData },
            function (response) {
                console.log('response from the background is: ', response);
                if (response.token) {
                    $state.go('login');
                }
            }
        )
    }

    $scope.logout = function () {
        console.log('popup logout handle');
        chrome.runtime.sendMessage({ type: 'logout' },
            function (response) {
                console.log('project::::', response);
                $state.go('login');
            })
    }

}]);


yetiHunt.controller("ProjectCtrl", ['$scope', '$state', function ($scope, $state) {
    console.log('ProjectCtrl Initialized');
    $scope.projects = [
        {
            "projectId": "ppp0",
            "projectName": "Loading project...",
            "teamId": "ttt0",
            "teamName": "Please wait...",
            "lastVisitAt": "2021-06-23T09:34:58.022Z",
            "lastVisitAtText": "...",
            "checked": true,
        },
    ];
    $scope.$parent.selectedProject = $scope.projects.filter(p => p.checked)[0].title;

    $scope.onProjectInit = function () {
        console.log('popup onProjectInit');
        chrome.runtime.sendMessage({ type: "onProjectInit" },
            function (response) {
                if (!!response && !!response.user) {
                    $scope.name = response.user.username;
                    if (response.projects.length > 0) {
                        $scope.projects = response.projects;
                        $scope.project = response.selectedProject;
                    }
                    $state.go("project"); // self loop to attach username again
                } else {
                    $state.go("login");
                }
            }
        );
    };
    $scope.onProjectInit();

    $scope.samplef = function (item) {
        console.log("sample: ", item);
    };

    $scope.handleProjectClick = function (project) {
        console.log('popup handleProjectClick');
        chrome.runtime.sendMessage({ type: "selectProject", data: project },
            function (response) {
                if (!!response && !!response.user && !!response.project) {
                    $scope.project = response.project;
                    console.log("set project to ", $scope.project.title);
                    $state.go("project"); // self loop to attach username again
                }
            }
        );
    };

}])

yetiHunt.controller("ProjectContentCtrl", ['$scope', '$state', '$stateParams',
    function pcControl($scope, $state, $stateParams) {
        console.log('ProjectContentCtrl Initialized: ', $stateParams.projectId);
        let defaultProjectContents = [
            {
                contentId: "ccc0",
                contentTitle: "Loading content...",
                contentUrl: "www.google.com/search?q=yetihunt",
                contentHost: "please wait...",
                lastVisitAt: null,
                lastVisitAtText: "...",
                isLike: 0,
                isDislike: 0,
                isFavourite: 0,
            }
        ];

        $scope.onProjectContentInit = function () {
            console.log('popup onProjectContentInit');
            chrome.runtime.sendMessage({
                type: "onProjectContentInit",
                data: { projectId: $stateParams.projectId }
            },
                function (response) {
                    console.log("popup response back from background", response)
                    if (!!response && !!response.user && !!response.projectContents) {
                        $scope.name = response.user.username;
                        console.log("YYY", response);
                        if (response.projectContents.length > 0) {
                            $scope.projectContents = response.projectContents;
                        } else {
                            $scope.projectContents = defaultProjectContents;
                        }
                        $state.go("projectContent"); // self loop to attach project content again
                    } else {
                        $state.go("login");
                    }
                }
            );
        };
        $scope.onProjectContentInit();

        $scope.backToProject = function () {
            console.log('popup backToProject');
            chrome.runtime.sendMessage(
                { type: "backToProject" },
                function (response) {
                    if (!!response && !!response.user) {
                        $scope.name = response.user.username;
                        $scope.projectContents = defaultProjectContents;
                        $state.go("project"); // self loop to attach username again
                    } else {
                        $state.go("login");
                    }
                });
        }

    }]);

// yetiHunt.controller('ExampleController', ['$scope', function($scope) {
//     $scope.projects = projects;
//     $scope.handleRadioClick = function (project) {
//         console.log("XXX", project.title);
//         projects.forEach(function(p){
//             console.log(p.id, p.selected);
//         })
//     };
//   }]);

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