
angular.module('tbz').
directive('tbzCard', function ($compile, $http, $templateCache) {

    var getTemplate = function(contentType) {
        var templateLoader,
            baseUrl = '/views/';

        var templateUrl = baseUrl + contentType + '.html';
        templateLoader = $http.get(templateUrl, {cache: $templateCache});

        return templateLoader;
    };

    var linker = function(scope, element, attrs) {
        var loader = getTemplate(scope.card.type);

        var promise = loader.success(function(html) {
            element.html(html);
        }).then(function (response) {
            element.replaceWith($compile(element.html())(scope));
        });
    };

    var cardDirective = {
        restrict: 'E',
        //scope: { card: '=' },
        link: linker
    };

    return cardDirective;
});