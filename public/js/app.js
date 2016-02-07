var app = angular.module('u4goodApp', ['ngRoute', 'firebase']);

/*app.controller('menuController', ['$scope', 'menuItems', '$location', function($scope, menuItems, $location) {
	$scope.menuItems = menuItems;

	$scope.isSelected = function(menuItem) {
		return menuItem.path === $location.path();
	};

	$scope.click = function(menuItem) {
		$location.path(menuItem.path);
	};
}]);*/

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/goals.html',
		controller: 'goalsCtrl'
	})
	.when('/newGoal', {
		templateUrl: 'partials/new_goal.html',
		controller: 'newGoalCtrl'
	})
	.when('/goals', {
		templateUrl: 'partials/goals.html',
		controller: 'goalsCtrl'
	});
	
	// $locationProvider.hashPrefix('!');
	// $locationProvider.html5Mode(true);
}]);

app.controller('mainCtrl', function ($scope) {
	var ref = new Firebase("https://u4good.firebaseio.com");

	// Check if the user is logged in
	if (ref.getAuth()) {
		$scope.loggedIn = true;
	}

	$scope.SignUp = function () {
		// If the user is not logged in
		if ($scope.loggedIn) return;

		// Open facebook login popup
		ref.authWithOAuthPopup("facebook", function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
				$scope.loggedIn = false;
			} else {
				console.log("Authenticated successfully with payload:", authData);
				$scope.loggedIn = true;
				$scope.$apply();
			}
		});
	};
});

app.controller('menuCtrl', function ($scope) {});

app.controller('signUpCtrl', function ($scope) {
	console.log("how controller run");
});

app.controller('howCtrl', function ($scope) {
	console.log("how controller run");
});

app.controller('newGoalCtrl', function ($scope) {
	console.log("new goal run");
});

app.controller('goalsCtrl', function ($scope) {
	$scope.goals = [
		{'goal': 'Lose Weight',
		'money': '50$',
		'time': 2,
		'organization': 'Unicef'},
		{'goal': 'Win the lottery',
		'money': '10$',
		'time': 1,
		'organization': 'Gamblers Association'},
		{'goal': 'Go to the moon',
		'money': '2$',
		'time': 2,
		'organization': 'NASA'}
	];
});

/*app.controller('mainCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
	// console.log('hello world');
	// $scope.foo = 'bar';
	// $scope.goo = 'zerp';

	var ref = new Firebase("https://u4good.firebaseio.com");
	// download the data into a local object
	$scope.data = $firebaseObject(ref);
	// putting a console.log here won't work, see below

	$scope.data.$loaded()
		.then(function() {
			console.log($scope.data);
		})
		.catch(function(err) {
			console.error(err);
		});


	ref.on('value', function(snapshot) {
		// This isn't going to show up in the DOM immediately, because
		// Angular does not know we have changed this in memory.
		// $scope.data = snapshot.val();


		$scope.data = snapshot.val();

		// console.log('foo', snapshot.val());

		// $scope.data = {
		// 	goal: $scope.data.goal_id
		// };
		// 
		
		// console.log('foo');

		// ref.set({
		// 	goal_id: $scope.data.goal || $scope.data.goal_id
		// });


		// if ($scope.data.goal) {
		// 	$scope.data = {
		// 		goal_id: $scope.data.goal
		// 	};
		// 	ref.set($scope.data);
		// }




		$scope.$digest();
	});

}]);

app.controller('nestedCtrl', ['$scope', function($scope) {
	// console.log('hello inner world');
	// $scope.foo = 'derp';
}]);*/