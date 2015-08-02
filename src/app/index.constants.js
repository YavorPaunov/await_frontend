/* global moment:false */
(function() {
    'use strict';

    angular
        .module('await')
        .constant('moment', moment)
        .constant('apiConfig', {
            url: 'http://api.localhost:5000'
        })
        .constant('mapStyles', [{
            "featureType": "all",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{   
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{
                "color": "#a2a999"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "lightness": 30
            }, {
                "saturation": 30
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ebd2b2"
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "lightness": -20
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#7a9189"
            }, {
                "invert_lightness": true
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "on"
            }]
        }])

})();
