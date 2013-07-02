
angular.module('tbz').
factory('CardService', ['DataService', function (DataService) {
    return {
        cards: [],
        addCard: function (card) {
            var service = this;

            switch (card.type) {
            case "editor":
                DataService.getTemplate(
                    { q: { name: card.data } },
                    function (response) {
                        card.data = JSON.stringify(response.data, undefined, 2);
                        service.cards.push(card);
                    }
                );
                break;
            case "sheet":
                service.cards.push(card);
            }
        }
    };
}]);