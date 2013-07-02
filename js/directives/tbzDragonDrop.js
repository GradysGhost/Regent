
angular.module('tbz').
directive('tbzDragonDrop', function () {
    var mouseDown = function (evt, el) {
        el.addClass('dragging');

        var parent = el.parent()[0];
        el.data('parent', parent);

        el.data('pos', { x: evt.screenX, y: evt.screenY });
        el.data('org', { x: parent.offsetLeft - 215, y: parent.offsetTop - 15 });

        el.bind('mousemove', function (evt) { mouseMove(evt, el); });
        el.bind('mouseup', function (evt) { mouseUp(evt, el); });

        evt.preventDefault();
    };

    var mouseMove = function (evt, el) {
        if (el.hasClass('dragging')) {
            var off = {
                x: evt.screenX - el.data('pos').x,
                y: evt.screenY - el.data('pos').y
            };

            el.data('parent').style.left = (el.data('org').x + off.x).toString() + 'px';
            el.data('parent').style.top = (el.data('org').y + off.y).toString() + 'px';

            evt.preventDefault();
        }
    };

    var mouseUp = function (evt, el) {
        el.removeClass('dragging');
        el.unbind('mousemove');
        el.unbind('mouseup');
        evt.preventDefault();
    };

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('mousedown', function (evt) {
                mouseDown(evt, element);
            });
        }
    };
});
