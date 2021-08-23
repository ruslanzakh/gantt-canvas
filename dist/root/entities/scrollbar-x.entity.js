"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollbarXEntity = void 0;
var canvas_1 = require("../../utils/canvas");
var ScrollbarXEntity = /** @class */ (function () {
    function ScrollbarXEntity(root) {
        this.mouseDownOffset = null;
        this.isHover = false;
        this.root = root;
        this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
        this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
    }
    Object.defineProperty(ScrollbarXEntity.prototype, "height", {
        get: function () {
            return this.root.api.scrollbarXHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarXEntity.prototype, "top", {
        get: function () {
            return this.root.canvas.height - this.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarXEntity.prototype, "backgroundLineWidth", {
        get: function () {
            return this.root.canvas.width;
        },
        enumerable: false,
        configurable: true
    });
    ScrollbarXEntity.prototype.destroyEvents = function () {
        this.destroyHandleMouseDown();
        this.destroyMouseMove();
    };
    ScrollbarXEntity.prototype.isLineClick = function (event) {
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var _a = this.getLineXAndWidth(), x = _a.x, width = _a.width;
        if (offsetX < x || offsetX > x + width)
            return false;
        if (offsetY < this.top)
            return false;
        return true;
    };
    ScrollbarXEntity.prototype.isBackgroundClick = function (event) {
        var offsetY = event.offsetY, offsetX = event.offsetX;
        return offsetY >= this.top && offsetX < this.backgroundLineWidth;
    };
    ScrollbarXEntity.prototype.handleMouseDown = function (event) {
        var isLineClick = this.isLineClick(event);
        var isBackgroundClick = this.isBackgroundClick(event);
        if (isLineClick)
            this.handleLinkMouseDown(event);
        else if (isBackgroundClick)
            this.handleBackgroundMouseDown(event);
        if (isLineClick || isBackgroundClick)
            this.root.controller.stopPropagation(event);
    };
    ScrollbarXEntity.prototype.handleLinkMouseDown = function (event) {
        this.mouseDownOffset = event.screenX;
        document.addEventListener('mousemove', this.handleMoveScrollbar);
        document.addEventListener('mouseup', this.handleMouseUp);
    };
    ScrollbarXEntity.prototype.handleBackgroundMouseDown = function (event) {
        var scaledOffset = this.getScaledOffset(event.offsetX);
        this.root.view.handleSetOffsetX(scaledOffset, true, true);
    };
    ScrollbarXEntity.prototype.getScaledOffset = function (offsetX) {
        var fullWidth = this.root.grid.service.getFullAvailableWidth();
        var scale = fullWidth / this.backgroundLineWidth;
        return scale * offsetX;
    };
    ScrollbarXEntity.prototype.handleMouseUp = function () {
        this.mouseDownOffset = null;
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMoveScrollbar);
    };
    ScrollbarXEntity.prototype.handleMouseMove = function (event) {
    };
    ScrollbarXEntity.prototype.handleMoveScrollbar = function (event) {
        if (this.mouseDownOffset !== null) {
            var diff = event.screenX - this.mouseDownOffset;
            var offset = this.root.view.offsetX + this.getScaledOffset(diff);
            this.root.view.handleSetOffsetX(offset);
            this.mouseDownOffset = event.screenX;
        }
    };
    ScrollbarXEntity.prototype.renderBackground = function () {
        var ctx = this.root.ctx;
        ctx.fillStyle = this.root.api.scrollbarXBackground;
        ctx.fillRect(0, this.top, this.backgroundLineWidth, this.height);
    };
    ScrollbarXEntity.prototype.renderLine = function () {
        var ctx = this.root.ctx;
        var _a = this.getLineXAndWidth(), x = _a.x, width = _a.width;
        ctx.fillStyle = this.root.api.scrollbarXLineBackground;
        canvas_1.roundRect(ctx, x, this.top, width, this.height, this.root.api.scrollbarXLineRadius, this.root.api.scrollbarXLineBackground);
    };
    ScrollbarXEntity.prototype.getLineXAndWidth = function () {
        var fullWidth = this.root.grid.service.getFullAvailableWidth();
        var x = (this.root.view.offsetX / fullWidth) * this.backgroundLineWidth;
        var width = (this.backgroundLineWidth / fullWidth) * this.backgroundLineWidth;
        return { x: x, width: width };
    };
    ScrollbarXEntity.prototype.render = function () {
        this.renderBackground();
        this.renderLine();
    };
    return ScrollbarXEntity;
}());
exports.ScrollbarXEntity = ScrollbarXEntity;
