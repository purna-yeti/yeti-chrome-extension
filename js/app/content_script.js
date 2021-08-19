console.log('content_script.js loaded');


angular.module("app", []).controller("HelloWorldCtrl", function($scope) {  
    console.log("XXXXXXXXXXXXX");
    $scope.message="Hello World"; 
  } )