var app = angular.module('u4goodApp', ['firebase']);

app.controller('mainCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
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
}]);