(function() {
    'use strict';

    angular
        .module('await')
        .directive('countdownPreview', countdownPreview);

    /** @ngInject */
    function countdownPreview($window, $timeout) {
        var directive = {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/components/countdownPreview/countdownPreview.html',

            link: function(scope, element) {
                function computeStyle() {
                    scope.getStyle = function() {
                        var parent = element.parent()[0];
                        return {
                            position: 'fixed',
                            'z-index': 99,
                            'text-align': 'center',
                            'vertical-align': 'middle',
                            left: parent.offsetLeft + 'px',
                            top: (parent.offsetTop + $window.innerHeight / 2 - element[0].clientHeight / 2) + 'px',
                            width: parent.clientWidth + 'px'
                        }
                    };
                }
                
                computeStyle();

                angular.element($window).bind('resize', function() {
                    $timeout(computeStyle, 300);
                });
            }
        };

        return directive;
    }

})();
