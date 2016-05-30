angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('Schulden', function ($http, $rootScope, $stateParams) {

    return {
        getAllTo: function (id) {
            return $http.get('http://fhnw.temper.li/get-debts-to', { params: { id:id } })
        },
        pay: function (id) {
            return $http.post('http://fhnw.temper.li/debt/pay', { params: {id:id}})
        }
    };
})

.service('BlankService', [function(){

}]);

