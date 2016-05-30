angular.module('app.controllers', [])
  
.controller('schuldenCtrl', function($scope, Schulden) {
    Schulden.getAllTo(1).success(function (response) {
        console.log(response);
        // $scope.chats = response;
    })
})
   
.controller('statistikenCtrl', function($scope) {

})
      
.controller('guthabenCtrl', function($scope) {

})
 