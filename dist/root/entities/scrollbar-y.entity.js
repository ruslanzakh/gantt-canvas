"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollbarYEntity = void 0;
var canvas_1 = require("../../utils/canvas");
var ScrollbarYEntity = /** @class */ (function () {
    function ScrollbarYEntity(root) {
        this.mouseDownOffset = null;
        this.bottomOffset = 12;
        this.minLineHeight = 20;
        this.isHover = false;
        this.root = root;
        this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
        this.destroyHandleTouchEnd = this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
        this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
    }
    Object.defineProperty(ScrollbarYEntity.prototype, "left", {
        get: function () {
            return this.root.view.canvasWidth - this.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarYEntity.prototype, "top", {
        get: function () {
            return this.root.grid.view.headerHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarYEntity.prototype, "backgroundLineHeight", {
        get: function () {
            return this.root.view.canvasHeight - this.bottomOffset - this.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarYEntity.prototype, "width", {
        get: function () {
            return this.root.api.scrollbarYWidth;
        },
        enumerable: false,
        configurable: true
    });
    ScrollbarYEntity.prototype.destroyEvents = function () {
        this.destroyHandleMouseDown();
        this.destroyMouseMove();
        this.destroyHandleTouchEnd();
    };
    ScrollbarYEntity.prototype.isLineClick = function (event) {
        if (!this.needRender())
            return false;
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var _a = this.getLineYAndHeight(), y = _a.y, height = _a.height;
        if (offsetX < this.left)
            return false;
        if (offsetY < y + this.top || offsetY > y + this.top + height)
            return false;
        return true;
    };
    ScrollbarYEntity.prototype.isBackgroundClick = function (event) {
        if (!this.needRender())
            return false;
        var offsetX = event.offsetX, offsetY = event.offsetY;
        return (offsetX >= this.left &&
            offsetY > this.top &&
            offsetY < this.root.view.canvasHeight - this.bottomOffset);
    };
    ScrollbarYEntity.prototype.handleMouseDown = function (event) {
        var isLineClick = this.isLineClick(event);
        var isBackgroundClick = this.isBackgroundClick(event);
        if (isLineClick)
            this.handleLinkMouseDown(event);
        else if (isBackgroundClick)
            this.handleBackgroundMouseDown(event);
        if (isLineClick || isBackgroundClick)
            this.root.controller.stopPropagation(event);
    };
    ScrollbarYEntity.prototype.handleTouchEnd = function (event) {
        var eventOffsets = canvas_1.getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        var isBackgroundClick = this.isBackgroundClick(eventOffsets);
        if (!isBackgroundClick)
            return;
        this.handleBackgroundMouseDown(eventOffsets);
        this.root.controller.stopPropagation(event);
    };
    ScrollbarYEntity.prototype.handleLinkMouseDown = function (event) {
        this.mouseDownOffset = event.screenY;
        document.addEventListener('mousemove', this.handleMoveScrollbar);
        document.addEventListener('mouseup', this.handleMouseUp);
    };
    ScrollbarYEntity.prototype.handleMouseUp = function () {
        this.mouseDownOffset = null;
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMoveScrollbar);
    };
    ScrollbarYEntity.prototype.handleBackgroundMouseDown = function (event) {
        var scaledOffset = this.getScaledOffset(event.offsetY);
        this.root.view.handleSetOffsetY(scaledOffset, true, true);
    };
    ScrollbarYEntity.prototype.getScaledOffset = function (offsetY) {
        var fullHeight = this.root.grid.service.getLeftAvailableHeight();
        offsetY = offsetY - this.top;
        var scale = fullHeight / this.backgroundLineHeight;
        return scale * offsetY;
    };
    ScrollbarYEntity.prototype.handleMouseMove = function (event) {
        var isLineClick = this.isLineClick(event);
        var isBackgroundClick = this.isBackgroundClick(event);
        if (isLineClick)
            this.root.view.setCursor('grab');
        else if (isBackgroundClick)
            this.root.view.setCursor('pointer');
        if (isLineClick || isBackgroundClick) {
            this.root.controller.stopPropagation(event);
            this.isHover = true;
        }
        else if (this.isHover) {
            this.isHover = false;
            this.root.view.setCursor('auto');
        }
    };
    ScrollbarYEntity.prototype.handleMoveScrollbar = function (event) {
        if (this.mouseDownOffset !== null) {
            var diff = event.screenY - this.mouseDownOffset;
            var offset = this.root.view.offsetY + this.getScaledOffset(this.top + diff);
            var fullHeight = this.root.grid.service.getLeftAvailableHeight();
            if (offset > fullHeight)
                offset = fullHeight;
            this.root.view.handleSetOffsetY(offset);
            this.mouseDownOffset = event.screenY;
        }
    };
    ScrollbarYEntity.prototype.needRender = function () {
        return this.root.grid.service.getLeftAvailableHeight() > 0;
    };
    ScrollbarYEntity.prototype.renderBackground = function () {
        if (!this.needRender())
            return;
        var ctx = this.root.ctx;
        ctx.fillStyle = this.root.api.scrollbarYBackground;
        ctx.fillRect(this.left, this.top, this.width, this.backgroundLineHeight);
    };
    ScrollbarYEntity.prototype.renderLine = function () {
        if (!this.needRender())
            return;
        var ctx = this.root.ctx;
        var _a = this.getLineYAndHeight(), y = _a.y, height = _a.height;
        canvas_1.roundRect(ctx, this.left, y + this.top, this.width, height, this.root.api.scrollbarYLineRadius, this.root.api.scrollbarYLineBackground);
        this.root.ctx.fillStyle = this.root.api.scrollbarYLineBackground;
    };
    ScrollbarYEntity.prototype.getLineYAndHeight = function () {
        var fullHeight = this.root.grid.service.getFullAvailableHeight();
        var y = (this.root.view.offsetY / fullHeight) * this.backgroundLineHeight;
        var height = (this.backgroundLineHeight / fullHeight) *
            this.backgroundLineHeight;
        if (height < this.minLineHeight)
            height = this.minLineHeight;
        return { y: y, height: height };
    };
    ScrollbarYEntity.prototype.render = function () {
        this.renderBackground();
        this.renderLine();
    };
    return ScrollbarYEntity;
}());
exports.ScrollbarYEntity = ScrollbarYEntity;
