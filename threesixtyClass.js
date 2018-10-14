 module.exports = ThreeSixty = (function (window) {
    'use strict';

    return function (container, options) {
        var self = this;
        var index = 0;

        var loopTimeoutId = null;
        var looping = false;
        var dragOrigin = false;
        var dragOrigin2 = false;
        var loop = function (reversed) {
            reversed ? self.prev() : self.next();

            loopTimeoutId = window.setTimeout(function () {
                loop(reversed);
            }, options.speed);
        };

        options.width = options.width || 300;
        options.height = options.height || 300;
        options.count = options.count || 0;
        options.perRow = options.perRow || 0;
        options.speed = options.speed || 100;
        options.dragTolerance = options.dragTolerance || 10;
        options.swipeTolerance = options.dragTolerance || 10;
        options.draggable = options.draggable || true;
        options.swipeable = options.draggable || true;
        options.keys = options.keys || true;
        options.prev = options.prev || false;
        options.next = options.next || false;

        options.up = options.up || false;
        options.down = options.down || false;


        options.inverted = options.inverted || false;

        container.style.width = options.width + 'px';
        container.style.height = options.height + 'px';
        container.style.backgroundImage = 'url("' + options.image + '")';
        container.style.backgroundPosition = '0 0';

        if (options.draggable) {
            container.addEventListener('mousedown', function (e) {
                dragOrigin = e.pageX;
                dragOrigin2 = e.pageY;
            });

            document.addEventListener('mouseup', function () {
                dragOrigin = false;
                dragOrigin2 = false;
            });

            document.addEventListener('mousemove', function (e) {
                if (dragOrigin && Math.abs(dragOrigin - e.pageX) > options.dragTolerance) {
                    self.stop();
                    options.count = 8;
                    options.perRow = 8;
                    dragOrigin > e.pageX ? self.prev() : self.next();
                    dragOrigin = e.pageX;
                }
                else if (dragOrigin2 && Math.abs(dragOrigin2 - e.pageY) > options.dragTolerance) {
                     self.stop();
                     options.count = 24;
                     options.perRow = 8;
                    dragOrigin2 > e.pageY ? self.up() : self.down();
                    dragOrigin2 = e.pageY;
                }
            });
        }

        if (options.swipeable) {
            container.addEventListener('touchstart', function (e) {
                dragOrigin = e.touches[0].clientX;
                dragOrigin2 = e.touches[0].clientY;
            });

            container.addEventListener('touchend', function () {
                dragOrigin = false;
                dragOrigin2 = false;
            });

            document.addEventListener('touchmove', function (e) {
                if (dragOrigin && Math.abs(dragOrigin - e.touches[0].clientX) > options.swipeTolerance) {
                    self.stop();
                    dragOrigin > e.touches[0].clientX ? self.prev() : self.next();
                    dragOrigin = e.touches[0].clientX;
                } else if (dragOrigin2 && Math.abs(dragOrigin2 - e.touches[0].clientY) > options.swipeTolerance) {
                    self.stop();
                    dragOrigin2 > e.touches[0].clientY ? self.up() : self.down();
                    dragOrigin2 = e.touches[0].clientY;
                }
            });
        }

        if (options.keys) {
            document.addEventListener('keydown', function (e) {
                if ([37, 39].includes(e.keyCode)) {
                    self.play(37 === e.keyCode);
                }
            });

            document.addEventListener('keyup', function (e) {
                if ([37, 39].includes(e.keyCode)) {
                    self.stop();
                }
            });
        }

        if (options.prev) {
            options.prev.addEventListener('mousedown', function (e) {
                e.preventDefault();
                self.play(true);
            });

            options.prev.addEventListener('mouseup', function (e) {
                e.preventDefault();
                self.stop();
            });

            options.prev.addEventListener('touchstart', function (e) {
                e.preventDefault();
                self.prev();
            });
        }

        if (options.next) {
            options.next.addEventListener('mousedown', function (e) {
                e.preventDefault();
                self.play();
            });

            options.next.addEventListener('mouseup', function (e) {
                e.preventDefault();
                self.stop();
            });

            options.next.addEventListener('touchstart', function (e) {
                e.preventDefault();
                self.next();
            });
        }

        self.next = function () {
            let calIndex = 0;
            console.log('index at first: ', index);
            if (index >= 8) {
                options.count = 24;
            } else {
                options.count = 8;
            }
            if (index >= 0 && index <= 7) {
                if (index + 1 > 7) calIndex = 0;
                else calIndex = index + 1;
            }
            else if (index >= 8 && index <= 15) {
                if (index + 1 > 15) calIndex = 8;
                else calIndex = index + 1;
            }
            else if (index >= 16 && index <= 23) {
                if (index + 1 > 23) calIndex = 16
                else calIndex = index + 1;
            }
            console.log('calindex: ', calIndex);
            self.goTo(calIndex);
            self.update();
        };

        self.prev = function () {
            console.log('index: ', index - 1);
            let calIndex = 0;
            if (index >= 8) {
                options.count = 24;
            } else {
                options.count = 8;
            }
            if (index >= 0 && index <= 7) {
                if (index - 1 < 0) calIndex = 7;
                else calIndex = index - 1;
            } else if (index >= 8 && index <= 15) {
                if (index - 1 < 8) calIndex = 15;
                else calIndex = index - 1;
            } else if (index >= 16 && index <= 23) {
                if (index - 1 < 16) calIndex = 23;
                else calIndex = index - 1;
            }
            self.goTo(calIndex);
            self.update();
        };

        self.goTo = function (newIndex, xmove) {
            // console.log('newIndex: ', newIndex);
            // console.log('options.count: ', options.count - 1);

            newIndex = newIndex > options.count - 1 ? 0 : newIndex;
            index = newIndex < 0 ? options.count - 1 : newIndex;

            self.update(xmove);
        };

        self.update = function (xmove) {
            if(!xmove) {
                container.style.backgroundPositionX = -(index % options.perRow) * options.width + 'px';
                // container.style.backgroundPositionY = container.style.backgroundPositionY;
            }
            container.style.backgroundPositionY = -Math.floor(index / options.perRow) * options.height + 'px';
            // console.log('yContainer: ', container.style.backgroundPositionY);
        };

        self.play = function (reversed) {
            if (looping) {
                return;
            }

            loop(reversed);
            looping = true;
        };

        self.stop = function () {
            if (!looping) {
                return;
            }

            window.clearTimeout(loopTimeoutId);
            looping = false;
        };

        //================== FOR Y AXIS ======================
            self.up = function () {
                options.count = 24;
                options.perRow = 8;
                let calIndex = index;
                if (index >= 8 && index <= 23) {
                    calIndex = index - 8;
                }
                console.log('index: ', calIndex);
                self.goTo(calIndex, 1);
                self.update(1);
            };

            self.down = function () {
                let calIndex = index;
                options.count = 24;
                options.perRow = 8;

                if(index >= 0 && index <= 15) {
                    calIndex = index + 8;
                }
                console.log('index: ', calIndex);
                self.goTo(calIndex, 1);
                self.update(1);
            };

        //================== END =============================
    };
} (window));