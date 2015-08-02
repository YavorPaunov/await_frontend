(function() {
    'use strict';

    angular
        .module('await')
        .directive('datetimepicker', datetimepicker);

    /** @ngInject */
    function datetimepicker() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                var dp = element.datetimepicker({
                    format: 'LLL',
                }).on('dp.change', function(e) {
                    ngModelCtrl.$setViewValue(e.date);
                });
            }
        }
    }

})();
