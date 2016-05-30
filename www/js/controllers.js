angular.module('app.controllers', [])
  
.controller('schuldenCtrl', function($scope, Schulden) {
    Schulden.getAllTo(1).success(function (response) {
        console.log(response);
        // $scope.chats = response;
    })
})
   
.controller('statistikenCtrl', function($scope) {

})
      
.controller('guthabenCtrl', function($scope, Guthaben) {
    $scope.addGuthaben = function() {
        var from = 1;
        var to = 2;
        var value = 20.4;
        
        Guthaben.addDebt(from, to, value).success(function (response) {
            console.log(response);
        });
    }
})
 