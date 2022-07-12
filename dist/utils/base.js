"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
function debounce(f, ms) {
    var isCooldown = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isCooldown)
            return;
        // @ts-ignore
        f.apply(this, args);
        isCooldown = true;
        setTimeout(function () { return (isCooldown = false); }, ms);
    };
}
exports.debounce = debounce;
