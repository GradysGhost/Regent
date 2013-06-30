
angular.module('tbz').directive('tbzLoadImage', function ($parse) {
  return function (scope, element, attrs) {
    var img = $parse(attrs.tbzLoadImage)(scope);
    element.css("background-image", img);
  };
});