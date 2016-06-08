angular.module('app.controllers', [])

.controller('schuldenCtrl', function($scope, $ionicModal, Schulden, Guthaben, Register, localStorageService) {

    // first: get userId
    var id = getUserId(localStorageService, Register, $ionicModal, $scope);


    Schulden.getAllTo(id).success(function (response) {
        console.log(response);
        $scope.schuldens = response.data;
    });

    $scope.pay = function(schulden) {
        console.log('Pay schulden: ' + schulden.id);
        Schulden.pay(schulden.id).success(function (response) {
            console.log(response);
            $scope.schuldens.splice($scope.schuldens.indexOf(schulden), 1);
        });
    };

    $scope.refreshSchulden = function () {
        console.log('refresh Schulden!');
        Guthaben.getAllFrom(id).success(function (response) {
            console.log(response);
            $scope.guthabens = response.data;
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.addSchulden = function() {
        $ionicModal.fromTemplateUrl('templates/schulden-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.addGuthaben = function(guthaben) {
            var phone = getUserPhone(localStorageService);
            Guthaben.addDebt(guthaben.phone, phone, guthaben.value).success(function (response) {
                console.log(response);
                Schulden.getAllTo(id).success(function (response) {
                    console.log(response);
                    $scope.schuldens = response.data;
                });
                $scope.modal.hide();
            });
        };
    };
})
   
.controller('statistikenCtrl', function($scope) {

})
      
.controller('guthabenCtrl', function($scope, $ionicModal, Guthaben, Register, localStorageService) {

    // first: get userId
    var id = getUserId(localStorageService, Register, $ionicModal, $scope);
    $scope.guthabens = [];


    Guthaben.getAllFrom(id).success(function (response) {
        $scope.guthabens = response.data;
    });

    $scope.refreshGuthaben = function () {
        console.log('refresh Guthaben!');
        Guthaben.getAllFrom(id).success(function (response) {
            console.log(response);
            $scope.guthabens = response.data;
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.addGuthaben = function() {
        $ionicModal.fromTemplateUrl('templates/guthaben-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.addGuthabenFinal = function(guthaben) {
            var phone = getUserPhone(localStorageService);
            console.log(phone);
            console.log(guthaben.phone);
            Guthaben.addDebt(phone, guthaben.phone, guthaben.value).success(function (response) {
                console.log(response);
                Guthaben.getAllFrom(id).success(function (response) {
                    $scope.guthabens = response.data;
                });
                $scope.modal.hide();
            });
        };
    };
});

function getUserId(localStorageService, Register, $ionicModal, $scope) {
    var userKey = 'user-id';
    var phoneKey = 'user-phone';
    
    if (localStorageService.get(userKey) === null) {

        $ionicModal.fromTemplateUrl('templates/register-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            console.log($scope.modal);
            $scope.modal.show();
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        
        $scope.registerUser = function(user) {
            
            Register.register(user.name, user.phone).success(function (response) {
                localStorageService.set(userKey, response.data.id);
                localStorageService.set(phoneKey, response.data.phone);
            });

            $scope.modal.hide();
        };
    }

    return localStorageService.get(userKey);
}

function getUserPhone(localStorageService) {
    var phoneKey = 'user-phone';
    return localStorageService.get(phoneKey);
}