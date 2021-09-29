"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleCanvas = exports.measureText = exports.renderUnderline = exports.getEventTouchOffsets = exports.roundRect = void 0;
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
var renderUnderline = function (ctx, text, x, y) {
    var metrics = exports.measureText(ctx, text);
    var fontSize = Math.floor(metrics.actualHeight * 1.4); // 140% the height 
    switch (ctx.textAlign) {
        case "center":
            x -= (metrics.width / 2);
            break;
        case "right":
            x -= metrics.width;
            break;
    }
    switch (ctx.textBaseline) {
        case "top":
            y += (fontSize);
            break;
        case "middle":
            y += (fontSize / 2);
            break;
    }
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = Math.ceil(fontSize * 0.04);
    ctx.moveTo(x, y);
    ctx.lineTo(x + metrics.width, y);
    ctx.stroke();
    ctx.restore();
};
exports.renderUnderline = renderUnderline;
var measureText = function (ctx, text) {
    var metrics = ctx.measureText(text);
    return {
        width: Math.floor(metrics.width),
        // @ts-ignore
        height: Math.floor(metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent),
        actualHeight: Math.floor(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent)
    };
};
exports.measureText = measureText;
function scaleCanvas(canvas, context, width, height) {
    // assume the device pixel ratio is 1 if the browser doesn't specify it
    var devicePixelRatio = window.devicePixelRatio || 1;
    // determine the 'backing store ratio' of the canvas context
    var backingStoreRatio = (context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1);
    // determine the actual ratio we want to draw at
    var ratio = devicePixelRatio / backingStoreRatio;
    if (devicePixelRatio !== backingStoreRatio) {
        // set the 'real' canvas size to the higher width/height
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        // ...then scale it back down with CSS
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }
    else {
        // this is a normal 1:1 device; just scale it simply
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = '';
        canvas.style.height = '';
    }
    // scale the drawing context so everything will work at the higher ratio
    context.scale(ratio, ratio);
}
exports.scaleCanvas = scaleCanvas;
