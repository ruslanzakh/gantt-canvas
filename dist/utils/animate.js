"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timing = exports.animate = void 0;
function animate(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1)
            timeFraction = 1;
        // текущее состояние анимации
        var progress = options.timing(timeFraction);
        options.draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}
exports.animate = animate;
exports.timing = makeEaseOut(circle);
function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    };
}
function circle(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
}
