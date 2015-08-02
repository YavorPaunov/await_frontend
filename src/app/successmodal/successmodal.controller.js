(function() {
    'use strict';

    angular
        .module('await')
        .controller('SuccessModalController', SuccessModalController)


    function SuccessModalController($scope, $modalInstance, secret, url) {
        $scope.secret = secret;
        $scope.url = url;
        console.log('s', secret);
        console.log('u', url);

        $scope.ok = function() {
            $modalInstance.close();
        };
    }

})();
