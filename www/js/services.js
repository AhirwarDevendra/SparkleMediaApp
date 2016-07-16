angular.module('sparkle.services', [])

.service('EventService',['$http','$log',function($http,$log)
{
      return {
        all: function() {
          // Return promise (async callback)
          return $http.get("http://dreamwood.in/getDataFromServer.php?getType=GetEventList");
            
        }  
      };
   
     
     
}])

.service('EventVideoService',['$http','$log',function($http,$log)
{
      return {
        all: function($EventID) {
          // Return promise (async callback)
          return $http.get("http://dreamwood.in/getDataFromServer.php?getType=GetVideos&eventID="+$EventID);
            
        }
        
      };
   
     
     
}])

.service('EventImageService',['$http','$log',function($http,$log)
{
    
    var images = [
        {
            id:0,
            src:"http://dreamwood.in/images/team/shaikh.jpg"
        },
        {
            id:1,
            src:"http://dreamwood.in/images/team/Devendra.jpg"
        },
        {
            id:2,
            src:"http://dreamwood.in/images/team/Swapnil.jpg"
        },
        {
            id:3,
            src:"http://dreamwood.in/images/team/Atin.jpg"
        },
        {
            id:4,
            src:"http://dreamwood.in/images/team/arun.jpg"
        },
        {
            id:5,
            src:"http://dreamwood.in/images/team/dix.jpg"
        },
        {
            id:6,
            src:"http://dreamwood.in/images/team/priti.jpg"
        }
       
    ];
    /*for(var i = 0; i < 100; i++) 
    {
        images.push({id: i, src: "http://placehold.it/50x50"});
    }
    
    */
    
    return {
    all: function() {
      return images;
    },
    get: function(eventId) {
      for (var i = 0; i < images.length; i++) {
        if (images[i].id === parseInt(eventId)) {
          return images[i];
        }
      }
      return null;
    }
  };
      /*return {
        all: function($EventID) {
          // Return promise (async callback)
          return $http.get("http://dreamwood.in/getDataFromServer.php?getType=GetImages&eventID="+$EventID);
            
        }  
      };
   */
     
     
}])
