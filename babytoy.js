var app = angular.module('babyToyApp', []);
app.controller('BabyToyController', function($scope, $location)
{
	viewmodel = this;
	viewmodel.name = $location.search().name;
	viewmodel.background = "#77ff88";
	viewmodel.boldTitle = true;

	viewmodel.key_handler = function(event) {
		var name = event.code;
		console.log(name);
		if (name == 'Space') {
			viewmodel.boldTitle = !viewmodel.boldTitle;
			$scope.$apply();
		}			
		event.stopPropagation();
	};

	var $doc = angular.element(document);

	$doc.on('keydown', viewmodel.key_handler);

	$scope.$on('$destroy',function() {
	  $doc.off('keydown', viewmodel.key_handler);
	})


});

app.filter('BinaryBold', function()
{
	return function (input) {
		if (input) {
			return "font-weight: bold;";
		} else {
			return "font-weight: normal;";
		}
	};
});


