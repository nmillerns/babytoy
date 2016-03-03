MIDDLE_ROW_LOOKUP = {'CapsLock': 2, 'KeyA': 0, 'KeyS': 1, 'KeyD': 2, 'KeyF': 3, 'KeyG':4, 'KeyH':5, 'KeyJ':6, 'KeyK':7, 'KeyL':8, 'Semicolon':9, 'Quote':10, 'Enter':11};
var app = angular.module('babyToyApp', []);
app.controller('BabyToyController', function($scope, $location)
{
	viewmodel = this;
	viewmodel.name = $location.search().name;
	viewmodel.backgroundIndex = 0;
	viewmodel.boldTitle = false;
	viewmodel.letter = 'A';

	viewmodel.key_handler = function(event) {
		var name = event.code;
		console.log(name);
		if (name == 'Space') {
			viewmodel.boldTitle = !viewmodel.boldTitle;
			$scope.$apply();
		}
		console.log(name.slice(0, 3));
		if (name.length == 4
			&& name.slice(0, 3) == 'Key'
			&& 'A' <= name[3] && name[3] <= 'Z') {
			viewmodel.letter = name[3]
			$scope.$apply();
		}
		if (name in MIDDLE_ROW_LOOKUP) {
			viewmodel.backgroundIndex = MIDDLE_ROW_LOOKUP[name];
			$scope.$apply();
		}
		if (name == 'Comma') {
			viewmodel.backgroundIndex--;
			$scope.$apply();
		}
		if (name == 'Period') {
			viewmodel.backgroundIndex++;
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
			return 'font-weight: bold;';
		} else {
			return 'font-weight: normal;';
		}
	};
});


app.filter('IndexedColor', function()
{
	COLORS = ['#77ff88',  '#ffff00', '#ff7788', '#7788ff', '#ffffff',];
	return function (input) {
		return COLORS[input % (COLORS.length)];
	};
});


