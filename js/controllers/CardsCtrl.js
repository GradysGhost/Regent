
angular.module('tbz').
controller('CardsCtrl', function ($scope, CardService, DataService) {

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

    $scope.createCharacter = function (character) {
        DataService.addCharacter(character);
    };


    /*** Character Sheet ***/

    $scope.getTotalFateCost = function (card) {
        return (
            card.fates
                .map(function(fate) { return [0, 0, 0, 10, 30, 70][fate.cost]; })
                .reduce(function(a, b) { return a + b; })
        );
    };

    $scope.calcWounds = function (card) {
        var needUpdate = (card.wounds.light.length === 0 || card.wounds.light.length != card.getMaxLightWounds());

        if (!needUpdate)
            return;

        var i;
        card.wounds.light = new Array($scope.getMaxLightWounds(card));
        card.wounds.heavy = new Array($scope.getMaxHeavyWounds(card));
        card.wounds.critical = new Array($scope.getMaxCriticalWounds(card));
        card.wounds.dead = [0];

        for (i = 0; i < card.wounds.light.length; i++)
            card.wounds.light[i] = 0;

        for (i = 0; i < card.wounds.heavy.length; i++)
            card.wounds.heavy[i] = 0;

        for (i = 0; i < card.wounds.critical.length; i++)
            card.wounds.critical[i] = 0;

        return '';
    };

    $scope.getMaxLightWounds = function (card) {
        return card.attributes[0].value;
    };

    $scope.getMaxHeavyWounds = function (card) {
        return Math.ceil(card.attributes[0].value / 2);
    };

    $scope.getMaxCriticalWounds = function (card) {
        return Math.ceil(card.attributes[0].value / 4);
    };

    $scope.hasCriticalWound = function (card) {
        return (
            card.wounds.critical
                .reduce(function(a, b) { return a + b; }) > 0
        );
    };

    $scope.markWound = function(card, type) {
        card.wounds[type].some(function (item, index) {
            var done = (item === 0);

            if (done)
                this[index] = 1;

            return done;
        },
        card.wounds[type]);
    };

    $scope.getVitality = function (card) {
        return card.attributes[0].value + card.attributes[4].value;
    };

    $scope.getSoul = function (card) {
        return (card.attributes[3].value + card.attributes[4].value) * 2;
    };

});