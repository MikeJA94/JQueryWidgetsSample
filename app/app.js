var myApp = angular.module('MyApp', ["ngRoute"]);

myApp.controller('MainCtrl', function ($scope, $http) {
    
});


// RouteProvider
myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/WidgetView1/:param', {
          templateUrl: 'templates/WidgetView1.html',
          controller: 'WidgetView1Controller'
      }).
        when('/WidgetView2/:param', {
            templateUrl: 'templates/WidgetView2.html',
            controller: 'WidgetView2Controller'
        }).
      otherwise({
          redirectTo: '/'
      });
}]);

/* Display the custom JQuery Info Popup widget */
myApp.controller('WidgetView1Controller', function ($scope, $routeParams) {

    var Help = $('#HelpTip1');
    Help.Ex_HelpTip({
        Title: 'Interesting Facts',
        Content: '<div><img src="widgets/eagle.png" style="width:64px;"/> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <a href="http://google.com">Visit our site</a> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex </div>',
        Anchor: $('#Anchor1'),
        Location: 'Bottom',
        OpenDirection: 'right',
        SmallSize: false, 
        HelpWindowIcon: 'helpreminder.png'
    });
    Help.show();
});


/* Display the custom JQuery Sticky Note widget */
myApp.controller('WidgetView2Controller', function ($scope, $routeParams) {
    var stickNotes = $('#myNotes');
    stickNotes.Ex_StickyNote({
        Title: 'My Notes',
        Content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium \n\r\n Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.  ",
        TimeStamp: ""
    });

    // show hide notes
    $scope.showNotes = function () {
        stickNotes.data('Ex_StickyNote').Show(!stickNotes.is(':visible'));
    };

    var stickAction = $('#myAction');
    stickAction.Ex_StickyNote({
        Title: 'Action Items',
        Content: "Vivamus mauris nibh, accumsan at efficitur a, dignissim eget sem. Nulla ante sem, gravida nec scelerisque at, laoreet ac ipsum. Sed accumsan tortor vitae ante iaculis, a scelerisque velit vehicula. Sed tempor velit est, ut ultrices ante egestas sit amet. Maecenas venenatis, augue ac faucibus maximus, enim lacus faucibus lacus, ut convallis orci massa id erat",
        TimeStamp: ""
    });

    // show hide notes
    $scope.showAction = function () {
        stickAction.data('Ex_StickyNote').Show(!stickAction.is(':visible'));
    };
});


