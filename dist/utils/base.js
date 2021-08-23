"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
function debounce(f, ms) {
    var isCooldown = false;
    return function () {
        if (isCooldown)
            return;
        // @ts-ignore
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(function () { return isCooldown = false; }, ms);
    };
}
exports.debounce = debounce;
