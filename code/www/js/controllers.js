angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function ($scope, $timeout, User, Recommendations) {
    Recommendations.getNewSongs()
        .then(
            function () {
                $scope.currentSong = Recommendations.queue[0];
                Recommendations.playCurrentSong();
            });

    $scope.sendFeedback = function (bool) {

        if (bool) User.addSongToFavorites($scope.currentSong);
        $scope.currentSong.rated = bool;
        $scope.currentSong.hide = true;

        Recommendations.nextSong();

        $timeout(function () {
            $scope.currentSong = Recommendations.queue[0];
        }, 250);

        Recommendations.playCurrentSong();

    };



    $scope.nextAlbumImg = function () {
        if (Recommendations.queue.length > 1) {
            return Recommendations.queue[1].image_large;
        }

        return '';
    }

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function ($scope, User) {

    // get the list of our favorites from the user service
    $scope.favorites = User.favorites;

    // get the list of our favorites from the user service
    $scope.removeSong = function (song, index) {
        User.removeSongFromFavorites(song, index);
    }

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function ($scope, Recommendations) {
    $scope.enteringFavorites = function () {
        Recommendations.haltAudio();
    }

});