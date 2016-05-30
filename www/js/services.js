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

.factory('Guthaben', function ($http) {

    return {
        addDebt: function (from, to, val) {
            console.log('send');
            console.log(from);
            console.log(to);
            console.log(val);
            return $http.post('http://fhnw.temper.li/debt/add', { params: { fromx:from, tox:to, valuex:val } })
        }
        // pay: function (id) {
        //     return $http.post('http://fhnw.temper.li/debt/pay', { params: {id:id}})
        // }
    };
})

.service('BlankService', [function(){

}]);

