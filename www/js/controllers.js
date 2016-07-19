angular.module('sparkle.controllers', [])



.controller('welcomeCtrl', ['$scope','$state',function($scope, $state) {
    console.log('screen called');
    setTimeout(function()
                {
                    $state.go('app.home')
                },1800);
}])


/*
    Main Controller
*/
.controller('SparkleCtrl', ['$scope','$state','$ionicHistory','$ionicSideMenuDelegate','$ionicActionSheet', function($scope,$state,$ionicHistory,$ionicSideMenuDelegate,$ionicActionSheet) {   
    
    /*
        Maintaining Preview Views Histories
    */
    $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableAnimate: true,
         expire: 300
    });
    
    
  
    /*
        Menu Events
        Passing State and Sending Go command on to routeConfig 
        
    */
    $scope.events = function(){
        $state.go('app.home');
        console.log('Events');
    };
    $scope.about = function(){
        $state.go('app.search');
        console.log('About Us');
        
    };
    $scope.feedback = function(){
        $state.go('app.feedback');
        console.log('Feedback Form');
    };
    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        console.log('Event Form');
    };
    $scope.share = function(){
        //$state.go('app.search');
        console.log('Share App');
        $ionicActionSheet.show({
      titleText: 'Share App With Friends',
      buttons: [
        { text: '<i class="icon ion-social-whatsapp"></i> Whatsapp' },
        { text: '<i class="icon ion-social-googleplus"></i> Gmail' },
        { text: '<i class="icon ion-email"></i> Message' },
        { text: '<i class="icon ion-social-facebook"></i> Facebook' },
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
    };
    
    $scope.splash =function()
    {
        console.log("Splash");
        $state.go('app.splashscreen');
    }
    
}])

.controller('HomeCtrl',['$scope','$location', '$anchorScroll','$timeout','$http','EventService','$ionicLoading','$state','$ionicHistory','$rootScope', '$cordovaNetwork',function($scope,$location, $anchorScroll,$timeout,$http,EventService,$ionicLoading,$state,$ionicHistory,$rootScope, $cordovaNetwork){
    
    
    
    //console.log(onlineState);
    
    /*if(window.Connection)
    {
        if(navigator.connection.type == Connection.NONE)
            {
                console.log("Not COnnected");
            }
        else{
            console.log("Connected");
        }
    }
    
    /*
        Move to requestEvent State On CLick of Compose Icon
    */
    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        console.log('Event Form');
    };
    
    /*
        Ionic Loader 
        It Loads Until EventService Return Result
    */
    $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Loading Awesomeness',
        showBackdrop: true
    });
    
    
    console.log("In Home");
    
    /*
        Fetching Data From EventServie and Store Data in $scope.event variable 
        and also Hide Ionic Loading
    */
    EventService.all().then(function(result){
        $scope.events = result.data;
        console.log($scope.events);
        $ionicLoading.hide();
    });
    
    

}])

.controller('EventCtrl',['$scope','$location', '$anchorScroll','$timeout','$ionicModal','$ionicPlatform','$ionicHistory','$http','$stateParams','EventVideoService','EventImageService','$ionicLoading','$state',function($scope,$location, $anchorScroll,$timeout,$ionicModal,$ionicPlatform,$ionicHistory,$http,$stateParams,EventVideoService,EventImageService,$ionicLoading,$state){
    
    /*
        Move to requestEvent State On CLick of Compose Icon
    */
     $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        
    };
    /*
        Run Spinner Until Server Return Result From Server
    */
    $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Loading Your Videos',
        showBackdrop: true
    });

    //Define ng-show variable value to show and Hide Error Message
    $scope.NoDataFoundVideo = false;
    $scope.NoDataFoundImage = false;
    
    //To Getting EventID from stateParams Variable
    var EventID = $stateParams.eventId;
    
    //Get All Videos From DB
    EventVideoService.all(EventID).then(function(result){
        $scope.videos = result.data;
        
        console.log($scope.videos);
        //To Check Result is there Or Not 
        if($scope.videos.length < 1)
        {
            $scope.NoDataFoundVideo = true;
            $ionicLoading.hide();

        }
        else
        {
            $ionicLoading.hide();
        }
    
    });
    
    
    $scope.images = EventImageService.all();
    
    if($scope.images.length < 1)
    {
        $scope.NoDataFoundImage = true;
        //$ionicLoading.hide();

    }
    
    /*
        Popup a Modal to Show Image and Video on Transparent 
    */
    $scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up',
            hardwareBackButtonClose: true
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
        $scope.$on('modal.hidden', function() {
            $scope.clipSrc = "";
            console.log("model hidden");
        });
  // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        $scope.clipSrc = "";
          console.log("model removed");
      });
	}
 
	// Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.modal.remove();
        
        if($scope.clipSrc)
            {
                $scope.clipSrc = "";
            }
	};
    
    // Show Individual Image On CLick of ig
    $scope.showImages = function(id)
    {
        $scope.OpenImage = EventImageService.get(id).src;
        $scope.showModal('templates/image-popover.html');
    }
    
    
    $scope.showVideo = function(id) 
    {
        // Setting Defult Values for the Src and Desc of Video 
        $scope.clipSrc = "https://www.youtube.com/embed/LHaGDT6Pdbk";

        $scope.clipDes = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";


        //console.log(id);
        // Show Only Video Which is CLicked
        for(var i=0; i<$scope.videos.length; i++)
        {
            if($scope.videos[i].id == id)
                {
                    console.log("found");
                    $scope.clipSrc = $scope.videos[i].link;
                    $scope.clipDes = $scope.videos[i].description;
                    break;

                }
        }


        // Open Model with Specified Template
        $scope.showModal('templates/video-popover.html');
    }
    
    

  
}])

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SearchCtrl', ['$scope','$stateParams',function($scope, $stateParams) {
    console.log('search called');
}])

.controller('FeedbackCtrl', ['$scope','$state','$ionicLoading','$ionicPopup','$http',function($scope,$state,$ionicLoading,$ionicPopup,$http) {
    
    $scope.ShowError = false;
    
    /*
        Move to requestEvent State On CLick of Compose Icon
    */
    $scope.requestEvent = function(){
        $state.go('app.requestEvent');
        console.log('Event Form');
    };
    
    
    console.log('feedback called');
    
    $scope.feedback = {
        "VisitorName":"",
        "VisitorEmail":"",
        "VisitorMobile":"",
        "VisitorLocation":"",
        "VisitorDesc":""
    }
    
    $scope.addfeedback = function()
    {
        if($scope.feedback.VisitorName == "" || $scope.feedback.VisitorEmail == "" || $scope.feedback.VisitorMobile == "")
        {
            $scope.ShowError = true;
        }
        else
        {
            $scope.ShowError = false;
            console.log($scope.feedback.VisitorName+" "+$scope.feedback.VisitorEmail+" "+$scope.feedback.VisitorMobile+" "+$scope.feedback.VisitorLocation+" "+$scope.feedback.VisitorDesc);
            
            
            $ionicLoading.show(
                { template: 'Getting Your Request .... ', duration: 2000}
            );
    
            $.ajax({
                
                data:
                {
                    feedbackName:$scope.feedback.VisitorName,
                    feedbackEmail:$scope.feedback.VisitorEmail,
                    feedbackMobile:$scope.feedback.VisitorMobile,
                    feedbackMessage:$scope.feedback.VisitorDesc,
                    feedbackLocation:$scope.feedback.VisitorLocation,
                    AMDflag:"0"
                },
                url:'http://dreamwood.in/SparkleMedia/php/set/setFeedback.php',
                method:'POST',
                success:function(data)
                {
                    $ionicPopup.alert({
                      title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
                      content: 'Thank You For Your Valuable Feedback!!!'
                    }).then(function(res) {
                      console.log('Thanks');
                    console.log(data);
                        
                        $state.go('app.home');
                    });
                },
                error:function(errr){
                  $ionicPopup.alert({
                      title: 'Sorry !!!',
                      content: 'Your internet connectivity is lost. Try to connect again.'
                    }).then(function(res) {
                      console.log('Try');
                    });
                } 
                });
            
                $ionicLoading.hide();   
        }
    }
    
}])

.controller('RequestEventCtrl', ['$scope','$ionicLoading','$ionicPopup','EventService',function($scope,$ionicLoading,$ionicPopup,EventService) {
    
    $scope.ShowError = false;
    console.log('Request Event called');
    
    /*
        Run Spinner Until Service Return Result From Server
    */    
    $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Wait a Movement',
        showBackdrop: true
    }); 
    
    /*
        Service To Get Data From Server
    */
    EventService.all().then(function(result){
        $scope.events = result.data;
        console.log($scope.events);
        $ionicLoading.hide();
    });
    
    $scope.requestInput = 
        {
        "eventRequestName":"",
        "eventRequestEmail":"",
        "eventRequestMobile":"",
        "eventRequestEvent":"",
        "eventRequestMessage":"",
        "eventRequestLocation":""
    }
    
    $scope.addData = function()
    {
        console.log("Inside Add Data");
        //nsole.log($scope.requestInput.name);
        
        if($scope.requestInput.eventRequestName == "" || $scope.requestInput.eventRequestEmail == "" ||$scope.requestInput.eventRequestMobile == "" || $scope.requestInput.eventRequestEvent == "")
        {
           $scope.ShowError = true;
        }
        else
        {
            console.log($scope.requestInput.eventRequestName+$scope.requestInput.eventRequestMobile+$scope.requestInput.eventRequestEmail);
            $scope.ShowError = false;   
            $ionicLoading.show({
        template: '<img src="img/sparkleLoad.gif"><br>Wait a Movement',
        showBackdrop: true
    }); 
    
            $.ajax({
                
                data:
                {
                    requesterName:$scope.requestInput.eventRequestName,
                    requesterEmail:$scope.requestInput.eventRequestEmail,
                    requesterMobile:$scope.requestInput.eventRequestMobile,
                    requesterMessage:$scope.requestInput.eventRequestMessage,
                    requesterLocation:$scope.requestInput.eventRequestLocation,
                    requestEvent:$scope.requestInput.eventRequestEvent,
                    AMDflag:"1"
                },
                url:'http://dreamwood.in/SparkleMedia/php/set/setRequestEvent.php',
                method:'POST',
                success:function(data)
                {
                    $ionicPopup.alert({
                      title: 'Thanks&nbsp;<span class="ion-ios-checkmark" style="color:green"></span>',
                      content: 'Submitted Your Request Sparkle Media Team Will Be In Touch With You Very Soon!!!'
                    }).then(function(res) {
                      console.log('Thanks');
                        console.log(data);
                        $state.go('app.home');
                    });
                },
                error:function(errr){
                  $ionicPopup.alert({
                      title: 'Sorry !!!',
                      content: 'Your internet connectivity is lost. Try to connect again.'
                    }).then(function(res) {
                      console.log('Try');
                    });
                } 
                });
            
                $ionicLoading.hide();   
        }

    }
    
}])
