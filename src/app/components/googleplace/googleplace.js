(function() {
    'use strict';

    angular
        .module('await')
        .directive('googleplace', googleplace);
    
    /* Stolen from: https://gist.github.com/VictorBjelkholm/6687484 */

    /** @ngInject */
    function googleplace() {
        var directive = {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs, model) {
                
                var options = {
                    types: ['(cities)'],
                    componentRestrictions: {}
                };

                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    console.log(scope.gPlace.getPlace().formatted_address);
                    scope.$apply(function() {
                        model.$setViewValue(scope.gPlace.getPlace());
                    });
                });
            }
        };

        return directive;
    }

})();
