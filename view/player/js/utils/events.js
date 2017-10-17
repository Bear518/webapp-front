define([], function() {
    var touchEvents = {
        DRAG: 'drag',
        DRAG_START: 'dragStart',
        DRAG_END: 'dragEnd',
        CLICK: 'click',
        DOUBLE_CLICK: 'doubleClick',
        TAP: 'tap',
        DOUBLE_TAP: 'doubleTap',
        OVER: 'over',
        MOVE: 'move',
        OUT: 'out'
    };

    var events = {

    };

    events.touchEvents = touchEvents;

    return events;
});
