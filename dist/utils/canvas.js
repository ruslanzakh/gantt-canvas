"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventTouchOffsets = exports.roundRect = void 0;
var roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    else if (typeof radius === 'object' && Array.isArray(radius)) {
        radius = { tl: radius[0], tr: radius[1], br: radius[2], bl: radius[3] };
    }
    if (fill)
        ctx.fillStyle = fill;
    if (stroke)
        ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
    // hack because without this hack sometimes doesn't fill rect
    // don't understand why - magic
    ctx.beginPath();
    ctx.closePath();
};
exports.roundRect = roundRect;
var getEventTouchOffsets = function (event, canvas) {
    var _a, _b, _c, _d;
    var rect = canvas.getBoundingClientRect();
    var x = (_b = (_a = event.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.clientX) !== null && _b !== void 0 ? _b : 0;
    var y = (_d = (_c = event.changedTouches[0]) === null || _c === void 0 ? void 0 : _c.clientY) !== null && _d !== void 0 ? _d : 0;
    var x_rel = x - rect.left;
    var y_rel = y - rect.top;
    var offsetX = Math.round((x_rel * canvas.width) / rect.width);
    var offsetY = Math.round((y_rel * canvas.height) / rect.height);
    return { offsetX: offsetX, offsetY: offsetY };
};
exports.getEventTouchOffsets = getEventTouchOffsets;
