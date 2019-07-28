angular.module('your_app_name.controllers', ['ionic','ion-fab-button'])

// APP - RIGHT MENU
.controller('AppCtrl', function($scope, $ionicActionSheet, $ionicModal, $state, AuthService) {

  $scope.$on('$ionicView.enter', function(){
    // Refresh user data & avatar
    $scope.user = AuthService.getUser();
  });
      $ionicModal.fromTemplateUrl('views/common/credits.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.credits_modal = modal;
  });
      $scope.showCredits = function() {
    $scope.credits_modal.show();
  };
})


  .controller('LogonCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function () {
      // contact our login service with the data from the username and password fields
      LoginService.loginUser($scope.data.username, $scope.data.password).then(function (data) {
        // if it is a success, go to the Report screen
        $state.go('report');
      }, function (data) {
        // if there is an error pop it up onscreen
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
  })
  .controller('ReportCtrl', function ($scope, $ionicLoading, $ionicPopup, WordpressService) {
    $scope.data = {};
    $scope.report = "";
    $scope.createReport = function () {
      // show a saving... message while we contact the service
      $ionicLoading.show({
        template: 'Saving...'
      });
      // pass through the values from the score and report fields to the service
      WordpressService.createReport($scope.data.score, $scope.data.report).then(success, failure);
    }

    var success = function () {
      $ionicLoading.hide();
      $scope.data = {};
      var alertPopup = $ionicPopup.alert({
        title: 'Saved!',
        template: 'Your report has been created'
      });
    }

    var failure = function (err) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: err.message
      });
    }

  })

.controller('FormCtrl', function($rootScope, $scope, $ionicActionSheet, $q, $http, $ionicModal, $state,  WORDPRESS_API_URL, AuthService) {

     $scope.postRequest = function() {
  $scope.user = AuthService.getUser();
    console.log($scope.user);    
    
         
// the important bit, contact the end point and ask for a token
 $http.post('http://localhost/wp-json/jwt-auth/v1/token', data).error(function (error) {
 failure(error);
 }).success(function (data) {
 // you are now logged in, save to session storage, the auth interceptor will pick up
 // and add to each request
 $window.sessionStorage.token = data.token;
 success(data);
 });
         
         
    var data = {
 title: 'Title',
 excerpt: 'Excerpt',
 content: 'Content',
 status: 'publish'
 };
 // the important bit, make a request to the server to create a new post
 // The Authentication header will be added to the request automatically by our Interceptor service
 $http.post('http://localhost/wp-json/wp/v2/posts', data).error(function (error) {
 console.log(error);
 }).success(function (data) {
 console.log(data);
 });
         }; 
    
    /*
    jQuery.ajax({
   url: 'http://127.0.0.1/wp-json/wp/v2/posts',
   method: 'POST',
   crossDomain: true,
   beforeSend: function ( xhr ) {
       xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'adam:123456' ) );
   },
      data: {
        title: 'newestpost',
        content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/aPvWQGF32Us" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          status: 'publish'
      },
        
   success: function( data, txtStatus, xhr ) {
       console.log( data );
       console.log( xhr.status );
   }
});
*/
 /*   
  $scope.user = AuthService.getUser();
    console.log($scope.user);
    */
    
    
    
    /*
          $scope.master = {};

      $scope.update = function(user) {
        $scope.master = angular.copy(user);

    console.log($scope.master);
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};          
           jQuery.ajax({
   url: 'http://127.0.0.1/wp-json/wp/v2/posts',
   method: 'POST',
   crossDomain: true,
   beforeSend: function ( xhr ) {
       xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'adam:123456' ) );
   },
      data: {
        title: user.title,
        content: user.content,
          status: 'publish'
      },
        
   success: function( data, txtStatus, xhr ) {
       console.log( data );
       console.log( xhr.status );
   }
});
          
          
                    
          localStorage.setItem('newPost', JSON.stringify($scope.master));
          console.log($scope.master);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
    
    */
     /*
 $scope.postRequest = function() {
    
     jQuery.ajax({
   url: 'http://127.0.0.1/wp-json/wp/v2/posts',
   method: 'POST',
   crossDomain: true,
   beforeSend: function ( xhr ) {
       xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'adam:123456' ) );
   },
      data: {
        title: 'newestpost',
        content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/aPvWQGF32Us" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          status: 'publish'
      },
        
   success: function( data, txtStatus, xhr ) {
       console.log( data );
       console.log( xhr.status );
       location.reload();
   }
}); */
     
     
     /*
          $scope.master = {};

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
          
          $scope.user();
          console.log($scope.user);
          
           jQuery.ajax({
   url: 'http://127.0.0.1/wp-json/wp/v2/posts',
   method: 'POST',
   crossDomain: true,
   beforeSend: function ( xhr ) {
       xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'adam:123456' ) );
   },
      data: {
        title: user.title,
        content: user.content,
          status: 'publish'
      },
        
   success: function( data, txtStatus, xhr ) {
       console.log( data );
       console.log( xhr.status );
   }
});
          
          
          
          
          
          
          localStorage.setItem('newPost', JSON.stringify($scope.master));
          console.log($scope.master);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
     
    };
    */
    
    
    /*
      $scope.postRequest = function() {
          var data = ""
          console.log(data);
    $http.post("http://127.0.0.1/wp-json/wp/v2/posts", data).then(
      function successCallback(response) {
        console.log("Successfully POST-ed data");
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  };*/
    
  
          $scope.getRequest = function() {
              $http.get( 'http://127.0.0.1/wp-json/wp/v2/operatives'
     ) 
    .success(function(data) {
 
                     console.log(data);
    
    })
    .error(function(data) {
     
    });
              /*
    console.log("I've been pressed!");
    $http.get("http://localhost/api/get_recent_posts").then(
      function successCallback(response) {
        $scope.response = response;
      },
      function errorCallback(response) {
        console.log("Unable to perform get request");
      }
    );*/
  };
      $scope.master = {};

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
          localStorage.setItem('newPost', JSON.stringify($scope.master));
          console.log($scope.master);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
})
    .controller('FormController', ['$scope', function($scope, $http) {
        
          $scope.getRequest = function() {
              
              
     $http.jsonp('http://127.0.0.1/api/' +
      'get_recent_posts/' +
      '?page='+ page +
      '&insecure=cool' +
      '&callback=JSON_CALLBACK') 
    .success(function(data) {
      deferred.resolve(data);
                     console.log(data);
    
    })
    .error(function(data) {
      deferred.reject(data);
    });
 
              
              
              /*
    console.log("I've been pressed!");
    $http.get("http://127.0.0.1/api/get_recent_posts").then(
      function successCallback(response) {
        $scope.response = response;
      },
      function errorCallback(response) {
        console.log("Unable to perform get request");
      }
    );*/
  };
      $scope.master = {};

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
          localStorage.setItem('newPost', JSON.stringify($scope.master));
          console.log($scope.master);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
    }])

// CATEGORIES MENU
.controller('PushMenuCtrl', function($scope, Categories) {

  var getItems = function(parents, categories){

    if(parents.length > 0){

      _.each(parents, function(parent){
        parent.name = parent.title;
        parent.link = parent.slug;

        var items = _.filter(categories, function(category){ return category.parent===parent.id; });

        if(items.length > 0){
          parent.menu = {
            title: parent.title,
            id: parent.id,
            items:items
          };
          getItems(parent.menu.items, categories);
        }
      });
    }
    return parents;
  };

  Categories.getCategories()
  .then(function(data){
    var sorted_categories = _.sortBy(data.categories, function(category){ return category.title; });
    var parents = _.filter(sorted_categories, function(category){ return category.parent===0; });
    var result = getItems(parents, sorted_categories);

    $scope.menu = {
      title: 'All Categories',
      id: '0',
      items: result
    };
  });
})


// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService) {

  $scope.bookmarks = BookMarkService.getBookmarks();

  // When a new post is bookmarked, we should update bookmarks list
  $rootScope.$on("new-bookmark", function(event, post_id){
    $scope.bookmarks = BookMarkService.getBookmarks();
  });

  $scope.remove = function(bookmarkId) {
    BookMarkService.remove(bookmarkId);
    $scope.bookmarks = BookMarkService.getBookmarks();
  };
})


// CONTACT
.controller('ContactCtrl', function($scope) {

  //map
  $scope.position = {
    lat: 43.07493,
    lng: -89.381388
  };

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });
})

// SETTINGS
.controller('SettingCtrl', function($scope, $ionicActionSheet, $ionicModal, $state, AuthService) {
  $scope.notifications = true;
  $scope.sendLocation = false;

  $ionicModal.fromTemplateUrl('views/common/terms.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_modal = modal;
  });

  $ionicModal.fromTemplateUrl('views/common/faqs.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.faqs_modal = modal;
  });

  $ionicModal.fromTemplateUrl('views/common/credits.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.credits_modal = modal;
  });

  $scope.showTerms = function() {
    $scope.terms_modal.show();
  };

  $scope.showFAQS = function() {
    $scope.faqs_modal.show();
  };

  $scope.showCredits = function() {
    $scope.credits_modal.show();
  };

  // Triggered on a the logOut button click
  $scope.showLogOutMenu = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      //Here you can add some more buttons
      // buttons: [
      // { text: '<b>Share</b> This' },
      // { text: 'Move' }
      // ],
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        //Called when one of the non-destructive buttons is clicked,
        //with the index of the button that was clicked and the button object.
        //Return true to close the action sheet, or false to keep it opened.
        return true;
      },
      destructiveButtonClicked: function(){
        //Called when the destructive button is clicked.
        //Return true to close the action sheet, or false to keep it opened.
        AuthService.logOut();
        $state.go('login');
      }
    });
  };
})

//EMAIL SENDER
.controller('EmailSenderCtrl', function($scope, $cordovaEmailComposer) {

  $scope.sendFeedback = function(){
    cordova.plugins.email.isAvailable(
      function (isAvailable) {
        // alert('Service is not available') unless isAvailable;
        cordova.plugins.email.open({
          to:      'john@doe.com',
          cc:      'jane@doe.com',
          subject: 'Feedback',
          body:    'This app is awesome'
        });
      }
    );
  };

  $scope.sendContactMail = function(){
    //Plugin documentation here: http://ngcordova.com/docs/plugins/emailComposer/

    $cordovaEmailComposer.isAvailable().then(function() {
      // is available
        $cordovaEmailComposer.open({
          to: 'john@doe.com',
          cc: 'sally@doe.com',
          subject: 'Contact from ionWordpress',
          body: 'How are you? Nice greetings from Uruguay'
        })
        .then(null, function () {
          // user cancelled email
        });
    }, function () {
      // not available
    });
  };

})


// RATE THIS APP
.controller('RateAppCtrl', function($scope) {

  $scope.rateApp = function(){
    if(ionic.Platform.isIOS()){
      AppRate.preferences.storeAppURL.ios = '<my_app_id>';
      AppRate.promptForRating(true);
    }else if(ionic.Platform.isAndroid()){
      AppRate.preferences.storeAppURL.android = 'market://details?id=<package_name>';
      AppRate.promptForRating(true);
    }
  };
})


//ADMOB
.controller('AdmobCtrl', function($scope, $ionicActionSheet, AdMob) {

  $scope.manageAdMob = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      //Here you can add some more buttons
      buttons: [
      { text: 'Show AdMob Banner' },
      { text: 'Show AdMob Interstitial' }
      ],
      destructiveText: 'Remove Ads',
      titleText: 'Choose the ad to show',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      destructiveButtonClicked: function() {
        console.log("removing ads");
        AdMob.removeAds();
        return true;
      },
      buttonClicked: function(index, button) {
        if(button.text == 'Show AdMob Banner')
        {
          console.log("show AdMob banner");
          AdMob.showBanner();
        }
        if(button.text == 'Show AdMob Interstitial')
        {
          console.log("show AdMob interstitial");
          AdMob.showInterstitial();
        }
        return true;
      }
    });
  };
})


//IAD
.controller('iAdCtrl', function($scope, $ionicActionSheet, iAd) {

  $scope.manageiAd = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      //Here you can add some more buttons
      buttons: [
      { text: 'Show iAd Banner' },
      { text: 'Show iAd Interstitial' }
      ],
      destructiveText: 'Remove Ads',
      titleText: 'Choose the ad to show - Interstitial only works in iPad',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      destructiveButtonClicked: function() {
        console.log("removing ads");
        iAd.removeAds();
        return true;
      },
      buttonClicked: function(index, button) {
        if(button.text == 'Show iAd Banner')
        {
          console.log("show iAd banner");
          iAd.showBanner();
        }
        if(button.text == 'Show iAd Interstitial')
        {
          console.log("show iAd interstitial");
          iAd.showInterstitial();
        }
        return true;
      }
    });
  };
})


// WALKTHROUGH
.controller('WalkthroughCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  $scope.$on('$ionicView.enter', function(){
    //this is to fix ng-repeat slider width:0px;
    $ionicSlideBoxDelegate.$getByHandle('walkthrough-slider').update();
  });
})

//LOGIN
.controller('LoginCtrl', function($scope, $state, $ionicLoading, AuthService) {
  $scope.user = {};

  $scope.doLogin = function(){

    $ionicLoading.show({
      template: 'Logging in...'
    });

    var user = {
      userName: $scope.user.userName,
      password: $scope.user.password
    };

    AuthService.doLogin(user)
    .then(function(user){
      //success
      $state.go('app.home');

      $ionicLoading.hide();
    },function(err){
      //err
      $scope.error = err;
      $ionicLoading.hide();
    });
  };
})


// FORGOT PASSWORD
.controller('ForgotPasswordCtrl', function($scope, $state, $ionicLoading, AuthService) {
  $scope.user = {};

  $scope.recoverPassword = function(){

    $ionicLoading.show({
      template: 'Recovering password...'
    });

    AuthService.doForgotPassword($scope.user.userName)
    .then(function(data){
      if(data.status == "error"){
        $scope.error = data.error;
      }else{
        $scope.message ="Link for password reset has been emailed to you. Please check your email.";
      }
      $ionicLoading.hide();
    });
  };
})


// REGISTER
.controller('RegisterCtrl', function($scope, $state, $ionicLoading, AuthService) {
  $scope.user = {};

  $scope.doRegister = function(){

    $ionicLoading.show({
      template: 'Registering user...'
    });

    var user = {
      userName: $scope.user.userName,
      password: $scope.user.password,
      email: $scope.user.email,
      displayName: $scope.user.displayName
    };

    AuthService.doRegister(user)
    .then(function(user){
      //success
      $state.go('app.home');
      $ionicLoading.hide();
    },function(err){
      //err
      $scope.error = err;
      $ionicLoading.hide();
    });
  };
})

// HOME - GET RECENT POSTS
.controller('HomeCtrl', function($scope, $rootScope, $state, $ionicLoading, $ionicModal, PostService) {
      $ionicModal.fromTemplateUrl('views/common/credits.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.credits_modal = modal;
  });
    
    
  $scope.showCredits = function() {
    $scope.credits_modal.show();
  };
    
  $scope.posts = [];
  $scope.page = 1;
  $scope.totalPages = 1;

  $scope.doRefresh = function() {
    $ionicLoading.show({
      template: 'Loading posts...'
    });

    //Always bring me the latest posts => page=1
    PostService.getRecentPosts(1)
    .then(function(data){

      $scope.totalPages = data.pages;
      $scope.posts = PostService.shortenPosts(data.posts);

      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadMoreData = function(){
    $scope.page += 1;

    PostService.getRecentPosts($scope.page)
    .then(function(data){
      //We will update this value in every request because new posts can be created
      $scope.totalPages = data.pages;
      var new_posts = PostService.shortenPosts(data.posts);
      $scope.posts = $scope.posts.concat(new_posts);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.moreDataCanBeLoaded = function(){
    return $scope.totalPages > $scope.page;
  };

  $scope.sharePost = function(link){
    PostService.sharePost(link);
  };

  $scope.bookmarkPost = function(post){
    $ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
    PostService.bookmarkPost(post);
  };

  $scope.doRefresh();

})


// POST
.controller('PostCtrl', function($scope, post_data, $ionicLoading, PostService, AuthService, $ionicScrollDelegate) {
  $scope.post = post_data.post;
  $scope.comments = _.map(post_data.post.comments, function(comment){
    if(comment.author){
      PostService.getUserGravatar(comment.author.id)
      .then(function(avatar){
        comment.user_gravatar = avatar;
      });
      return comment;
    }else{
      return comment;
    }
  });
  $ionicLoading.hide();

  $scope.sharePost = function(link){
    window.plugins.socialsharing.share('Check this post here: ', null, null, link);
  };

  $scope.addComment = function(){

    $ionicLoading.show({
      template: 'Submiting comment...'
    });

    PostService.submitComment($scope.post.id, $scope.new_comment)
    .then(function(data){
      if(data.status=="ok"){
        var user = AuthService.getUser();

        var comment = {
          author: {name: user.data.username},
          content:$scope.new_comment,
          date: Date.now(),
          user_gravatar : user.avatar,
          id: data.comment_id
        };
        $scope.comments.push(comment);
        $scope.new_comment = "";
        $scope.new_comment_id = data.comment_id;
        $ionicLoading.hide();
        // Scroll to new post
        $ionicScrollDelegate.scrollBottom(true);
      }
    });
  };
})


// CATEGORY
.controller('PostCategoryCtrl', function($scope, $rootScope, $state, $ionicLoading, $stateParams, PostService) {

  $scope.category = {};
  $scope.category.id = $stateParams.categoryId;
  $scope.category.title = $stateParams.categoryTitle;

  $scope.posts = [];
  $scope.page = 1;
  $scope.totalPages = 1;

  $scope.doRefresh = function() {
    $ionicLoading.show({
      template: 'Loading posts...'
    });

    PostService.getPostsFromCategory($scope.category.id, 1)
    .then(function(data){
      $scope.totalPages = data.pages;
      $scope.posts = PostService.shortenPosts(data.posts);

      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadMoreData = function(){
    $scope.page += 1;

    PostService.getPostsFromCategory($scope.category.id, $scope.page)
    .then(function(data){
      //We will update this value in every request because new posts can be created
      $scope.totalPages = data.pages;
      var new_posts = PostService.shortenPosts(data.posts);
      $scope.posts = $scope.posts.concat(new_posts);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.moreDataCanBeLoaded = function(){
    return $scope.totalPages > $scope.page;
  };

  $scope.sharePost = function(link){
    PostService.sharePost(link);
  };

  $scope.bookmarkPost = function(post){
    $ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
    PostService.bookmarkPost(post);
  };

  $scope.doRefresh();
})


// WP PAGE
.controller('PageCtrl', function($scope, page_data) {
  $scope.page = page_data.page;
})
//////////////////////////////////////////////////////////////////////// Sir's Code



// SETTINGS
.controller('ModalCtrl', function($scope, $ionicActionSheet, $ionicModal, $state, AuthService) {


  $scope.showCredits = function() {
    $scope.credits_modal.show();
  };

})


// HOME - GET RECENT POSTS
.controller('QuestionsCtrl', function($scope, $rootScope, $state, $ionicLoading, QuestionsService) {
  $scope.posts = [];
  $scope.page = 1;
  $scope.totalPages = 1;

  $scope.doRefresh = function() {
    $ionicLoading.show({
      template: 'Loading posts...'
    });

    //Always bring me the latest posts => page=1
    QuestionsService.getRecentPosts(1)
    .then(function(data){

      $scope.totalPages = data.pages;
      $scope.posts = QuestionsService.shortenPosts(data.posts);

      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadMoreData = function(){
    $scope.page += 1;

    QuestionsService.getRecentPosts($scope.page)
    .then(function(data){
      //We will update this value in every request because new posts can be created
      $scope.totalPages = data.pages;
      var new_posts = QuestionsService.shortenPosts(data.posts);
      $scope.posts = $scope.posts.concat(new_posts);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.moreDataCanBeLoaded = function(){
    return $scope.totalPages > $scope.page;
  };

  $scope.sharePost = function(link){
    QuestionsService.sharePost(link);
  };

  $scope.bookmarkPost = function(post){
    $ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
    QuestionsService.bookmarkPost(post);
  };

  $scope.doRefresh();

})


// POST
.controller('QuestionCtrl', function($scope, post_data, $ionicLoading, QuestionsService, AuthService, $ionicScrollDelegate) {
  $scope.post = post_data.post;
  $scope.comments = _.map(post_data.post.comments, function(comment){
    if(comment.author){
      QuestionsService.getUserGravatar(comment.author.id)
      .then(function(avatar){
        comment.user_gravatar = avatar;
      });
      return comment;
    }else{
      return comment;
    }
  });
  $ionicLoading.hide();

  $scope.sharePost = function(link){
    window.plugins.socialsharing.share('Check this post here: ', null, null, link);
  };

  $scope.addComment = function(){

    $ionicLoading.show({
      template: 'Submiting comment...'
    });

    QuestionsService.submitComment($scope.post.id, $scope.new_comment)
    .then(function(data){
      if(data.status=="ok"){
        var user = AuthService.getUser();

        var comment = {
          author: {name: user.data.username},
          content:$scope.new_comment,
          date: Date.now(),
          user_gravatar : user.avatar,
          id: data.comment_id
        };
        $scope.comments.push(comment);
        $scope.new_comment = "";
        $scope.new_comment_id = data.comment_id;
        $ionicLoading.hide();
        // Scroll to new post
        $ionicScrollDelegate.scrollBottom(true);
      }
    });
  };
})
.controller('CommentsCtrl', function($scope, $state, $http, AuthService) {

    $scope.posts = [];
    
        
    
            //$http.get("http://192.168.0.7/wp-json/wp/v2/product?per_page=100")
        //$http.get("http://192.168.0.7/wp-json/wp/v2/comments")
        //$http.get("http://192.168.0.7/wp-json/wp/v2/comments/2?_embed")
   //$http.get("http://192.168.0.7/wp-json/wp/v2/posts?categories=42")
    //$http.get("http://192.168.0.7/wp-json/wp/v2/categories")
    //$http.get("http://192.168.0.7/wp-json/wp/v2/comments?post=175") 
    //$http.get("http://192.168.0.7/wp-json/wp/v2/categories?post=175") 
        
    
            //$http.get("http://192.168.0.7/wp-json/wp/v2/product?per_page=100")
        //$http.get("http://192.168.0.7home/wp-json/wp/v2/comments")
        //$http.get("http://192.168.0.7/wp-json/wp/v2/comments/2?_embed")
   //$http.get("http://192.168.0.7/wp-json/wp/v2/posts?categories=42")
    //$http.get("http://192.168.0.7/wp-json/wp/v2/categories")
    //$http.get("http://192.168.0.7/wp-json/wp/v2/comments?post=175") 
    //$http.get("http://192.168.0.7/wp-json/wp/v2/categories?post=175") 
   // $http.get("http://192.168.0.7/wp-json/wp/v2/operatives?_embed") 
    // $http.get("http://192.168.0.7/api/buddypressread/friends_get_friends/?username=Sir%20Austin") 
    // $http.get("http://192.168.0.7/wp-json/wp/v2/product/11563") 
   // $http.get("http://192.168.0.7/wp-json/wp/v2/operatives?_embed")     
    $http.get("http://127.0.0.1/wp-json/wp/v2/comments?_embed") 
    
      
    
            .success(function(data) {
            
            console.log(data);
 console.log($scope.user);
                $scope.posts = data;
        
        console.log($scope.posts);
              
            })
            .error(function(data) {
                console.log("ERROR: " + data);
            });
})







.controller('OperativesCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope, $log ) {
    
    
  //var postsApi = $rootScope.url + 'posts?categories=18';
//var postsApi = $rootScope.url + 'product?filter[taxonomy]=product_cat&filter[term]=boxes';
 var postsApi = 'http://127.0.0.1/wp-json/wp/v2/operatives';
     //var postsApi = 'http://127.0.0.1/wp-json/wp/v2/categories?slug=questions';
  $scope.moreItems = false;

  $scope.loadPosts = function() {

    // Get all of our posts
    DataLoader.get( postsApi ).then(function(response) {

      $scope.posts = response.data;
console.log($scope.posts);
      $scope.moreItems = true;

      $log.log(postsApi, response.data);

    }, function(response) {
      $log.log(postsApi, response.data);
    });

  };

  // Load posts on page load
  $scope.loadPosts();

  paged = 2;

  // Load more (infinite scroll)
  $scope.loadMore = function() {

    if( !$scope.moreItems ) {
      return;
    }

    var pg = paged++;

    $log.log('loadMore ' + pg );

    $timeout(function() {

      DataLoader.get( postsApi + '?page=' + pg ).then(function(response) {

        angular.forEach( response.data, function( value, key ) {
          $scope.posts.push(value);
        });

        if( response.data.length <= 0 ) {
          $scope.moreItems = false;
        }
      }, function(response) {
        $scope.moreItems = false;
        $log.error(response);
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.$broadcast('scroll.resize');

    }, 1000);

  };

  $scope.moreDataExists = function() {
    return $scope.moreItems;
  };

  // Pull to refresh
  $scope.doRefresh = function() {
  
    $timeout( function() {

      $scope.loadPosts();

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
    
})
 

.controller('OperativeCtrl', function($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce, CacheFactory, $log, Bookmark, $timeout ) {

  if ( ! CacheFactory.get('postCache') ) {
    CacheFactory.createCache('postCache');
  }

  var postCache = CacheFactory.get( 'postCache' );

  $scope.itemID = $stateParams.postId;

  var singlePostApi = 'http://127.0.0.1/wp-json/wp/v2/operative/' + $scope.itemID;

  $scope.loadPost = function() {

    // Fetch remote post

    $ionicLoading.show({
      noBackdrop: true
    });

    DataLoader.get( singlePostApi ).then(function(response) {
 
      $scope.post = response.data;

      $log.debug($scope.post);

      // Don't strip post html
      $scope.content = $sce.trustAsHtml(response.data.content.rendered);

      // $scope.comments = $scope.post._embedded['replies'][0];

      // add post to our cache
      postCache.put( response.data.id, response.data );

      $ionicLoading.hide();
    }, function(response) {
      $log.error('error', response);
      $ionicLoading.hide();
    });
 
  };

  if( !postCache.get( $scope.itemID ) ) {

    // Item is not in cache, go get it
    $scope.loadPost();

  } else {
    // Item exists, use cached item
    $scope.post = postCache.get( $scope.itemID );
    $scope.content = $scope.post.content.rendered ;
    // $scope.comments = $scope.post._embedded['replies'][0];
  }

  // Bookmarking
  $scope.bookmarked = Bookmark.check( $scope.itemID );

  $scope.bookmarkItem = function( id ) {
    
    if( $scope.bookmarked ) {
      Bookmark.remove( id );
      $scope.bookmarked = false;
    } else {
      Bookmark.set( id );
      $scope.bookmarked = true;
    }
  };

  // Pull to refresh
  $scope.doRefresh = function() {
  
    $timeout( function() {

      $scope.loadPost();

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };

})

































/*   Dummy Code
.controller('OperativesCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope, $log ) {
    
    
  //var postsApi = $rootScope.url + 'posts?categories=18';
//var postsApi = $rootScope.url + 'product?filter[taxonomy]=product_cat&filter[term]=boxes';
 var postsApi = $rootScope.url + 'operatives';
  $scope.moreItems = false;

  $scope.loadPosts = function() {

    // Get all of our posts
    DataLoader.get( postsApi ).then(function(response) {

      $scope.posts = response.data;
console.log($scope.posts);
      $scope.moreItems = true;

      $log.log(postsApi, response.data);

    }, function(response) {
      $log.log(postsApi, response.data);
    });

  };

  // Load posts on page load
  $scope.loadPosts();

  paged = 2;

  // Load more (infinite scroll)
  $scope.loadMore = function() {

    if( !$scope.moreItems ) {
      return;
    }

    var pg = paged++;

    $log.log('loadMore ' + pg );

    $timeout(function() {

      DataLoader.get( postsApi + '?page=' + pg ).then(function(response) {

        angular.forEach( response.data, function( value, key ) {
          $scope.posts.push(value);
        });

        if( response.data.length <= 0 ) {
          $scope.moreItems = false;
        }
      }, function(response) {
        $scope.moreItems = false;
        $log.error(response);
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.$broadcast('scroll.resize');

    }, 1000);

  };

  $scope.moreDataExists = function() {
    return $scope.moreItems;
  };

  // Pull to refresh
  $scope.doRefresh = function() {
  
    $timeout( function() {

      $scope.loadPosts();

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
    
})
 

.controller('OperativeCtrl', function($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce, CacheFactory, $log, Bookmark, $timeout ) {

  if ( ! CacheFactory.get('postCache') ) {
    CacheFactory.createCache('postCache');
  }

  var postCache = CacheFactory.get( 'postCache' );

  $scope.itemID = $stateParams.postId;

  var singlePostApi = $rootScope.url + 'questions/' + $scope.itemID;

  $scope.loadPost = function() {

    // Fetch remote post

    $ionicLoading.show({
      noBackdrop: true
    });

    DataLoader.get( singlePostApi ).then(function(response) {
 
      $scope.post = response.data;

      $log.debug($scope.post);

      // Don't strip post html
      $scope.content = $sce.trustAsHtml(response.data.content.rendered);

      // $scope.comments = $scope.post._embedded['replies'][0];

      // add post to our cache
      postCache.put( response.data.id, response.data );

      $ionicLoading.hide();
    }, function(response) {
      $log.error('error', response);
      $ionicLoading.hide();
    });
 
  };

  if( !postCache.get( $scope.itemID ) ) {

    // Item is not in cache, go get it
    $scope.loadPost();

  } else {
    // Item exists, use cached item
    $scope.post = postCache.get( $scope.itemID );
    $scope.content = $scope.post.content.rendered ;
    // $scope.comments = $scope.post._embedded['replies'][0];
  }

  // Bookmarking
  $scope.bookmarked = Bookmark.check( $scope.itemID );

  $scope.bookmarkItem = function( id ) {
    
    if( $scope.bookmarked ) {
      Bookmark.remove( id );
      $scope.bookmarked = false;
    } else {
      Bookmark.set( id );
      $scope.bookmarked = true;
    }
  };

  // Pull to refresh
  $scope.doRefresh = function() {
  
    $timeout( function() {

      $scope.loadPost();

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };

})
*/
;
