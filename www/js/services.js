angular.module('app.services', [])

.factory('Register', function($http){

    return {
        register: function (name, phone) {
            return $http({
                method: 'POST',
                url: 'http://fhnw.temper.li/user/add',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    phone: phone,
                    name: name
                }
            });
        }
    }
})

.factory('Schulden', function ($http, $rootScope, $stateParams) {

    return {
        getAllTo: function (id) {
            return $http.get('http://fhnw.temper.li/get-debts-to', { params: { id:id } })
        },
        pay: function (id) {
            return $http({
                method: 'POST',
                url: 'http://fhnw.temper.li/debt/pay',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    id: id
                }
            });
        }
    };
})

.factory('Guthaben', function ($http) {

    return {
        getAllFrom: function (id) {
            return $http.get('http://fhnw.temper.li/get-debts-from', { params: { id:id } })
        },
        addDebt: function (from, to, val) {
            return $http({
                method: 'POST',
                url: 'http://fhnw.temper.li/debt/add-phone',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    fromx: from,
                    tox: to,
                    valuex: val
                }
            });
        }
    };
})

.service('localStorageService', [function() {
    return {
        set: function (key, value) {
            window.localStorage.setItem(key, value);
        },
        get: function (key) {
            return window.localStorage.getItem(key);
        }
    };
}]);

