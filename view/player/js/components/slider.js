define([
    'utils/underscore',
    'utils/backbone.events',
    'text!../templates/volume_slider.html',
    'utils/helpers',
    'utils/ui',
    'utils/extendable'
], function(_,Events,SliderTemplate, utils,UI,Extendable) {

    var Slider = Extendable.extend({
        constructor : function(el,className,orientation) {
            this.className = className + '';
            this.orientation = orientation;

            this.dragStartListener = this.dragStart.bind(this);
            this.dragMoveListener = this.dragMove.bind(this);
            this.dragEndListener = this.dragEnd.bind(this);

            this.tapListener = this.tap.bind(this);

            this.setup(el);
        },
        setup : function(el) {
            this.el = el;

            this.elementRail = this.el.getElementsByClassName('jx-slider-container')[0];
            this.elementProgress = this.el.getElementsByClassName('jx-progress')[0];
            this.elementThumb = this.el.getElementsByClassName('jx-knob')[0];
            this.elementTitle=this.el.getElementsByClassName('title')[0];
            this.userInteract = new UI(this.element(), {preventScrolling : true});

            this.userInteract.on('dragStart', this.dragStartListener);
            this.userInteract.on('drag', this.dragMoveListener);
            this.userInteract.on('dragEnd', this.dragEndListener);

            this.userInteract.on('tap click', this.tapListener);
        },
        dragStart : function() {
            this.trigger('dragStart');
            this.railBounds = utils.bounds(this.elementRail);
        },
        dragEnd : function(evt) {
            this.dragMove(evt);
            this.trigger('dragEnd');
        },
        dragMove : function(evt) {
            var dimension,
                bounds = this.railBounds = (this.railBounds) ? this.railBounds : utils.bounds(this.elementRail),
                percentage;

            if (this.orientation === 'horizontal'){
                dimension = evt.pageX;
                if (dimension < bounds.left) {
                    percentage = 0;
                } else if (dimension > bounds.right) {
                    percentage = 100;
                } else {
                    percentage = utils.between((dimension-bounds.left)/bounds.width, 0, 1) * 100;
                }
            } else {
                dimension = evt.pageY;
                if (dimension >= bounds.bottom) {
                    percentage = 0;
                } else if (dimension <= bounds.top) {
                    percentage = 100;
                } else {
                    percentage = utils.between((bounds.height-(dimension-bounds.top))/bounds.height, 0, 1) * 100;
                }
            }

            var updatedPercent = this.limit(percentage);
            this.render(updatedPercent);
            this.update(updatedPercent);


            return false;
        },
        tap : function(evt){
            this.railBounds = utils.bounds(this.elementRail);
            this.dragMove(evt);
        },

        limit : function(percentage) {
            // modules that extend Slider can set limits on the percentage (TimeSlider)
            return percentage;
        },
        update : function(percentage) {
            this.trigger('update', { percentage : percentage });
        },
        render : function(percentage) {
            percentage = Math.max(0, Math.min(percentage, 100));

            if(this.orientation === 'horizontal'){
                this.elementThumb.style.left = percentage + '%';
                this.elementProgress.style.width = percentage + '%';
            } else {
                this.elementThumb.style.bottom = percentage + '%';
                this.elementProgress.style.height = percentage + '%';
            }
        },
        updateBuffer : function(percentage) {
            this.elementBuffer.style.width = percentage + '%';
        },

        element : function() {
            return this.el;
        }
    });
    // _.extend(Slider, Events);

    return Slider;
});