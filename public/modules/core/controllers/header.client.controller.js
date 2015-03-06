'use strict';

angular.module('core').controller('HeaderController', ['$scope','$mdDialog','Authentication', 'Menus',
	function($scope,$mdDialog, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.import_favorites = function() {
			
			alert("import")
			
		};

		  $scope.show_import_favorites = function(ev) {
		    $mdDialog.show({
		      controller: 'FavoritesController',
		      templateUrl: '/modules/items/views/import-favorites.client.view.html',
		      targetEvent: ev,
		    })
  		};

  		$scope.show_edit_favorites = function(ev) {
		    $mdDialog.show({
		      controller: 'FavoritesController',
		      templateUrl: '/modules/items/views/edit-favorites.client.view.html',
		      targetEvent: ev,
		    })
  		};

		$scope.edit_favorites = function() {
			
			alert("edit")
			
		};

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);