var app = angular.module('u4goodApp', ['ngRoute', 'firebase']);

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
	})
	.when('/how', {
		templateUrl: 'partials/how.html',
		controller: 'howCtrl'
	})
	.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'homeCtrl'
	})
	.when('/logout', {
		templateUrl: 'partials/home.html',
		controller: 'logoutCtrl'
	});

	// $locationProvider.hashPrefix('!');
	// $locationProvider.html5Mode(true);
}]);

app.controller('mainCtrl', function ($scope) {
	var ref = new Firebase("https://u4good.firebaseio.com");

	// Check if the user is logged in
	if (ref.getAuth()) {
		console.log("we are in");
		$scope.loggedIn = true;
	} else {
		ref.onAuth(function (authData) {
			console.log("logged in", authData);
			if (authData) {
				$scope.loggedIn = true;
				$scope.$apply();
			} else {
				$scope.loggedIn = false;
			}
		});
	}

	$scope.SignUp = function () {
		// If the user is not logged in
		if ($scope.loggedIn) return;

		// Open facebook login popup
		ref.authWithOAuthPopup("facebook");
	};

	$scope.LogOut = function () {
		ref.unauth();
		
		$scope.loggedIn = false;
	}
});


app.controller('menuCtrl', function ($scope) {});
app.controller('homeCtrl', function ($scope) {});
app.controller('logoutCtrl', function ($scope) {});

app.controller('signUpCtrl', function ($scope) {
	console.log("how controller run");
});

app.controller('howCtrl', function ($scope) {
	console.log("how controller run");
});

app.controller('newGoalCtrl', function ($scope) {
	var ref = new Firebase("https://u4good.firebaseio.com/goals/ktsakas");

	$scope.createGoal = function () {
		ref.push($scope.goalForm, function () {
			$scope.success = true;
			$scope.$apply();
		});
	};
});

app.controller('goalsCtrl', function ($scope, $firebaseObject) {
	var ref = new Firebase("https://u4good.firebaseio.com/goals/ktsakas");
	$scope.goals = $firebaseObject(ref);
	console.log($scope.goals);
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