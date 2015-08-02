(function() {
    'use strict';

    angular
        .module('await')
        .directive('fullheight', fullheight);

    function fullheight($window, $timeout) {
        var directive = {
            restrict: 'A',
            link: function(scope, elem) {
                
                function resize() {
                    elem.css('height', $window.innerHeight + 'px');
                };

                resize();

                angular.element($window).bind('resize', function() {
                    resize();
                });
            }

        }
        return directive;
    }

})();
