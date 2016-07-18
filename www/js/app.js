// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('sparkle', ['ionic','ngCordova', 'sparkle.controllers','sparkle.services'])

.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      
    $ionicPlatform.registerBackButtonAction(function() {
        if ($state.current.name == "app.home") {
            $ionicPopup.alert({
                title: 'Done',
                content: 'Thanks for sharing your comments!!!'
              });
            //navigator.app.exitApp();
        }
    }, 100);
     
  });
})

/*
    Routes 
*/
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$sceDelegateProvider) {
    
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

    
  $stateProvider

    .state('page0',{
    url:'/page0',
    templateUrl:'templates/splash.html',
    controller:'welcomeCtrl'
  })
 
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'SparkleCtrl'
    })

  .state('no-network',{
    url:'/no-network',
    templateUrl:'templates/no-internet.html',
    controller:'NoInternetCtrl'
  })
    .state('app.feedback', {
      url: "/feedback",
      views: {
        'menuContent' :{
          templateUrl: "templates/feedback.html",
          controller: 'FeedbackCtrl'
        }
      }
    })
  
    .state('app.requestEvent', {
      url: "/requestEvent",
      views: {
        'menuContent' :{
          templateUrl: "templates/event-request.html",
          controller: 'RequestEventCtrl'
        }
      }
    })

  
    .state('app.event', {
      url: "/event/:eventId",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
          controller: 'EventCtrl'
        }
      }
    })
  
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })

    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/page0');
    
    //Defining Title of App Center
    $ionicConfigProvider.navBar.alignTitle('center');
});

