(function() {
    'use strict';

    angular
        .module('await')
        .directive('tripmap', tripmap);

    /** @ngInject */
    function tripmap($window, $timeout, mapStyles, uiGmapGoogleMapApi, uiGmapIsReady) {
        var directive = {
            // restrict: 'E',
            templateUrl: 'app/components/tripmap/tripmap.html',
            scope: {
                origin: '=',
                destination: '=',
                ngShow: '='
            },

            link: function(scope, element) {
                /*
                 *   Initial values for the map
                 */

                scope.map = {
                    center: {
                        latitude: 0.1,
                        longitude: 0.1
                    },
                    zoom: 3,
                    options: {
                        disableDefaultUI: true,
                        draggable: false,
                        scrollwheel: false,
                        disableDoubleClickZoom: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: mapStyles
                    }
                };
                var polylines = [];

                /*
                 *   Get the google map instance object when it is loaded
                 */
                var mapInstance;
                uiGmapIsReady.promise().then(function(instances) {
                    instances.forEach(function(inst) {
                        mapInstance = inst.map;
                        google.maps.event.trigger(mapInstance, 'resize');
                        console.log("MAP LOADED");
                        console.log(scope.origin, scope.destination)
                        onLocationsChange(scope.origin, scope.destination);
                    });
                });

                /*
                 *   Ensure the map is taking the full height of the window
                 */
                var resizeMap = function() {
                    var element = angular.element(
                        document.getElementsByClassName('angular-google-map-container')
                    );
                    element.css('height', $window.innerHeight + 'px');

                    onLocationsChange(scope.origin, scope.destination);
                };

                resizeMap();

                angular.element($window).bind('resize', resizeMap);

                /*
                 *   Redraw map and set the correct center when it is shown
                 *   
                 *   Necessary because the center value seems to be misread 
                 *   when the map is hidden
                 */
                scope.$watch('ngShow', function(newValue) {
                    if (newValue) {
                        $timeout(function() {
                            if (mapInstance) {
                                google.maps.event.trigger(mapInstance, 'resize');
                            }
                            scope.map.center = {
                                latitude: 0,
                                longitude: 0
                            };
                        }, 300);
                    }
                });


                /*
                 *   When the origin or destination changes draw a new line
                 *   and change the bounds of the map
                 */
                scope.$watch('origin', function(newValue) {
                    onLocationsChange(scope.origin, scope.destination);
                });

                scope.$watch('destination', function(newValue) {
                    onLocationsChange(scope.origin, scope.destination);
                });

                function onLocationsChange(origin, destination) {
                    console.log('changed', origin, destination);
                    removePolylines();
                    if (origin && destination && typeof origin != 'string' && typeof destination != 'string') {
                        console.log('zooming in!');
                        $timeout(function(){
                            removePolylines();
                            fitPoints(mapInstance, [
                                origin.geometry.location,
                                destination.geometry.location
                            ]);
                            addPolyline(mapInstance,
                                origin.geometry.location,
                                destination.geometry.location);
                            mapInstance.setZoom(mapInstance.getZoom() - 1);                            
                        }, 1000);
                    }
                }

                /*
                 *   Polylines addition and removal
                 */
                function addPolyline(map, originPoint, destPoint) {
                    var originLatLng = new google.maps.LatLng(originPoint.lat(), originPoint.lng());
                    var destLatLng = new google.maps.LatLng(destPoint.lat(), destPoint.lng());
                    var pathEndSymbol = {
                        path: 'm 4.24813,9.94788 l 5.69817,-5.69824 l 6.05328,6.05311 l 6.05315,' +
                            '-6.05311l5.6985,5.69824l-6.0534,6.05324l6.0534,6.05325 l -5.6985,' +
                            '5.69843l-6.05315,-6.05326 l -6.05328,6.05326 l -5.69817,' +
                            '-5.69843l6.05318,-6.05325 l -6.05318,-6.05324 Z',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: '#A87C53',
                        fillColor: '#A87C53',
                        fillOpacity: 1,
                        anchor: new google.maps.Point(16, 16),
                        scale: 1
                    };

                    var lineSymbol = {
                        path: 'M -2,5 2,5 2,-5 -2,-5 Z',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: '#A87C53',
                        fillColor: '#A87C53',
                        fillOpacity: 1
                    };

                    var travelPathCoordinates = [originLatLng, destLatLng];
                    var travelPath = new google.maps.Polyline({
                        path: travelPathCoordinates,
                        clickable: false,
                        // strokeColor: '#eb6d00',
                        strokeOpacity: 0,
                        strokeWeight: 1,
                        icons: [{
                            icon: lineSymbol,
                            repeat: '35px',
                            offset: '0'
                        }, {
                            icon: pathEndSymbol,
                            offset: "0%"
                        }, {
                            icon: pathEndSymbol,
                            offset: "100%"
                        }],
                    });

                    travelPath.setMap(map);
                    polylines.push(travelPath);
                }

                function removePolylines() {
                    while (polylines.length > 0) {
                        polylines.pop().setMap(null);
                    }
                }

                function fitPoints(map, coordPoints) {
                    var bounds = new google.maps.LatLngBounds();

                    for (var i = 0; i < coordPoints.length; i++) {
                        var point = coordPoints[i];
                        var latlng = new google.maps.LatLng(point.lat(), point.lng());
                        bounds.extend(latlng);
                    }

                    map.fitBounds(bounds);
                }

            }
        }

        return directive;
    }

})();
