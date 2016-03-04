MIDDLE_ROW_LOOKUP = {'CapsLock': 2, 'KeyA': 0, 'KeyS': 1, 'KeyD': 2, 'KeyF': 3, 'KeyG':4, 'KeyH':5, 'KeyJ':6, 'KeyK':7, 'KeyL':8, 'Semicolon':9, 'Quote':10, 'Enter':11};
var app = angular.module('babyToyApp', []);
app.controller('BabyToyController', function($scope, $location)
{
	viewmodel = this;
	viewmodel.name = $location.search().name;
	viewmodel.backgroundIndex = 0;
	viewmodel.boldTitle = false;
	viewmodel.letter = '';
	viewmodel.number = null;

	viewmodel.key_handler = function(event) {
		var name = event.code;
		console.log(name);
		if (name != 'F11') {
			event.preventDefault();
		}
		if (name == 'Space') {
			viewmodel.boldTitle = !viewmodel.boldTitle;
		}
		if (name.length == 4
			&& name.slice(0, 3) == 'Key'
			&& 'A' <= name[3] && name[3] <= 'Z') {
			viewmodel.letter = name[3];
			viewmodel.number = null;
		}
		if (name.length == 6
			&& name.slice(0, 5) == 'Digit'
			&& '0' <= name[5] && name[5] <= '9') {
			viewmodel.number = name[5];
			viewmodel.letter = '';
		}
		if (name in MIDDLE_ROW_LOOKUP) {
			viewmodel.backgroundIndex = MIDDLE_ROW_LOOKUP[name];
		}
		if (name == 'Comma') {
			viewmodel.backgroundIndex--;
		}
		if (name == 'Period') {
			viewmodel.backgroundIndex++;
		}
		if (name == 'Minus') {
			if (viewmodel.number == null || viewmodel.number == 0) {
				viewmodel.number = 0;
			} else {
				viewmodel.number--;
			}
			viewmodel.letter = '';
		}
		if (name == 'Equal') {
			if (viewmodel.number == null) {
				viewmodel.number = 0;
			} else {
				viewmodel.number++;
			}
			viewmodel.letter = '';
		}
		$scope.$apply();
		document.getElementById("body").focus();
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


app.filter('DotsNumber', function()
{
	return function (input) {
		dots = '';
		for (i = 0; i < input; ++i) {
			dots += '.'
		}
		return dots;
	};
});

app.filter('WholeNumber', function()
{
	return function (input) {
		if (input != null) {
			return input;
		} else {
			return '';
		}
	};
});

