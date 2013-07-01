
angular.module('tbz').
controller('CardsCtrl', function ($scope, CardService) {

    // 0 = Only show attributes
    // 1 = Show trained skills
    // 2 = Show all skills
    $scope.skillDisplayMode = 1;

    // Bind CardsContrl cards to service cards
    $scope.cards = CardService.cards;

    $scope.toggleSkillDisplayMode = function () {
        $scope.skillDisplayMode = ($scope.skillDisplayMode + 1) % 3;
    };

    $scope.shouldDisplaySkill = function (skill) {
        if ($scope.skillDisplayMode === 0)
            return false;

        if ($scope.skillDisplayMode === 1)
            return Math.max(skill.value, skill.min_value) > 0;

        if ($scope.skillDisplayMode === 2)
            return true;
    };

    $scope.getDice = function (skill) {
        var value;

        if (typeof(skill) !== "number")
            value = Math.max(skill.value, skill.min_value);
        else
            value = skill;

        if (value > 0)
            return "j" + value.toString();
    };

    $scope.getKeys = function (obj) {
        return Object.keys(obj);
    };

});