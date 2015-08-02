(function() {
    'use strict';

    angular
        .module('await')
        .config(route);

    /** @ngInject */
    function route($routeProvider) {
        $routeProvider.when("/:counterUrl?", {
            templateUrl: "app/counter/counter.html",
            controller: 'MainController'
        });
    }

})();
