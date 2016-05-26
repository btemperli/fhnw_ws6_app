angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.schulden', {
    url: '/page2',
    views: {
      'tab5': {
        templateUrl: 'templates/schulden.html',
        controller: 'schuldenCtrl'
      }
    }
  })

  .state('tabsController.statistiken', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/statistiken.html',
        controller: 'statistikenCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.guthaben', {
    url: '/page4',
    views: {
      'tab1': {
        templateUrl: 'templates/guthaben.html',
        controller: 'guthabenCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page2')

  

});