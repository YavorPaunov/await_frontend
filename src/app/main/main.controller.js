(function() {
    'use strict';

    angular
        .module('await')
        .controller('MainController', ['$scope', '$window', '$http', '$timeout',
            '$location', '$modal', '$routeParams', 'geocoder', 'apiConfig', MainController
        ]);

    /** @ngInject */
    function MainController($scope, $window, $http, $timeout, $location,
        $modal, $routeParams, geocoder, apiConfig) {
        var self = this;

        $scope.themes = [
            'simple', 'trip'
        ];

        $scope.countdown = {
            textBefore: "",
            textAfter: "",
            time: moment().format('LLL'),
            theme: $scope.themes[0],
        };

        /*
        *   Style here so it is easier to add customizability later
        */
        $scope.style = {
            "font-size": "80px",
            "color": "#323949",
            "background-color": "#ebd2b2",
            "font-family": "'Dancing Script', cursive"
        };

        var setCompleteText = function() {
            if (!self.relativeTime) {
                return "";
            };
            console.log("rel time", self.relativeTime);

            var wordList = [self.relativeTime];
            if ('ago' != self.relativeTime.slice(-3)) {
                wordList.unshift($scope.countdown.textBefore);
                wordList.push($scope.countdown.textAfter);
            }

            $scope.completeText = wordList.join(" ")
            console.log('new text', $scope.completeText);
        };


        $scope.$watch('[countdown.textBefore, countdown.textAfter]', function(newValue) {
            setCompleteText();
        });

        $scope.$watch('countdown.time', function(newValue) {
            var diff = moment(newValue).diff(moment());

            var url = apiConfig.url + "/convert?millis=" + diff;
            $http.get(url).success(function(value) {
                self.relativeTime = value;
                if (diff < 0) {
                    self.relativeTime += ' ago';
                }
                setCompleteText();
            });
        });

        $scope.create = function() {
            var url = apiConfig.url + "/counter"
            var data = {
                text_before: $scope.countdown.textBefore,
                text_after: $scope.countdown.textAfter,
                time: $scope.countdown.time,
                theme: $scope.countdown.theme,
            };

            if ($scope.countdown.theme == 'trip') {
                if (!$scope.countdown.cityOrigin || !$scope.countdown.cityDestination) {
                    return;
                }
                data['city_origin'] = $scope.countdown.cityOrigin.formatted_address;
                data['city_destination'] = $scope.countdown.cityDestination.formatted_address;
            }

            var options = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post(url, JSON.stringify(data), options).success(function(response) {
                console.log('posted', response);
                var data = response.data;
                $location.path("/" + data.url);
                $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/successmodal/successmodal.html',
                    controller: 'SuccessModalController',
                    size: 'sm',
                    resolve: {
                        secret: function() {
                            return data.secret;
                        },
                        url: function() {
                            return $location.absUrl();
                        }
                    }
                });
            });
        }

        var counterUrl = $routeParams.counterUrl;
        console.log(counterUrl)
        if (counterUrl) {
            var url = apiConfig.url + "/counter?url=" + counterUrl;

            $http.get(url).success(function(response) {
                var data = response.data[0];
                console.log(data);
                $scope.countdown.theme = data.theme;
                $scope.countdown.textBefore = data.text_before;
                $scope.countdown.textAfter = data.text_after;
                $scope.countdown.time = moment(data.time);
                if (data['theme'] == 'trip') {

                    // Geocode origin
                    geocoder.geocode({
                        'address': data.city_origin
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            $scope.countdown.cityOrigin = results[0];
                        } else {
                            console.log('Geocode error: ' + status);
                        }
                    });

                    // Geocode destination
                    geocoder.geocode({
                        'address': data.city_destination
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            $scope.countdown.cityDestination = results[0];
                        } else {
                            console.log('Geocode error: ' + status);
                        }
                    });
                }

                
            });
        }

    }

})();
