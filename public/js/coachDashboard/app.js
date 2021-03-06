angular.module('coachDashBoard',['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
.controller('MainCtrl', function ($scope,$uibModal, $log, $document,$http) {
  var $ctrl = this;

  /*placeholder value used in smart-table because users are loaded asynchorously*/
  $scope.users_placeholder = [];

  $ctrl.animationsEnabled = true;

  $ctrl.openModal = function (parentSelector) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'passwordModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      appendTo: parentElem
    });

    console.log("modal loaded");
  };

  $http.get( "/get_users").then(function(response) {
         $scope.users = response.data;
         console.log($scope.users);
    });

  $http.get( "/get_responses").then(function(response) {
         $scope.results = response.data;
         console.log($scope.results);
    }); 
})
.controller('ModalInstanceCtrl', function ($scope,$uibModalInstance) {
  $scope.coachPassword ="Ctrib3";
  $scope.wrongPassword = false;

  var $ctrl = this;


  $ctrl.cancel = function () {
    $uibModalInstance.dismiss();
  };

  $ctrl.checkPassword = function (password) {
    if (password == $scope.coachPassword) {
      $scope.wrongPassword = false;
      $uibModalInstance.dismiss();
    }
    else{
      $scope.wrongPassword = true;
    }
  };
})
.directive('navigation', function(){
		return {
			restrict: 'E',
			templateUrl: 'navigation.html',
			controller: function () {
					this.tab = 0;	/* initially set tab to 1*/
					this.selectTab = function (setTab) { /* Set tab to whatever tab user clicks*/
						this.tab = setTab;
						console.log(this.tab);
					};
					this.isSelected = function (checkTab) {/* Check which tab is selected to trigger show of selected tab */
						return this.tab === checkTab;

					};
				},
			controllerAs: 'menu'
		};
	})
;
