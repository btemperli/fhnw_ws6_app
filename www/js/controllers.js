angular.module('app.controllers', [])

.controller('schuldenCtrl', function($scope, Schulden, localStorageService) {

    // first: get userId
    var id = getUserId(localStorageService);

    Schulden.getAllTo(id).success(function (response) {
        console.log(response);
        // $scope.chats = response;
    });

    // $scope.addSchulden = function () {
    //
    // };
})
   
.controller('statistikenCtrl', function($scope) {

})
      
.controller('guthabenCtrl', function($scope, Guthaben, Register, localStorageService) {

    // first: get userId
    var id = getUserId(localStorageService, Register);
    $scope.guthabens = [];


    Guthaben.getAllFrom(id).success(function (response) {
        console.log(response);
        $scope.guthabens = response.data;
    });

    $scope.addGuthaben = function() {
        var from = 2;
        var value = 20.4;
        
        Guthaben.addDebt(from, id, value).success(function (response) {
            console.log(response);
        });
    };
});

function getUserId(localStorageService, Register) {
    var key = 'user-id';

    console.log('get user id.');
    if (localStorageService.get(key) === null) {
        
        Register.register('tester', '0791112233').success(function (response) {
            console.log(response);

            localStorageService.set(key, response.data.id);
        });
    }

    return localStorageService.get(key);
}