"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
var base_1 = require("../utils/base");
var RootController = /** @class */ (function () {
    function RootController(root) {
        this.events = {};
        this.touchOffsetX = null;
        this.touchOffsetY = null;
        this.previousTouchOffsetX = null;
        this.previousTouchOffsetY = null;
        this.root = root;
        this.handleMouseMove = base_1.debounce(this.handleMouseMove.bind(this), 32);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = base_1.debounce(this.handleTouchMove.bind(this), 32);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.attachEvents();
    }
    RootController.prototype.attachEvents = function () {
        var _this = this;
        var _a;
        this.root.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.root.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.root.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.root.canvas.addEventListener('click', this.handleClick);
        this.root.canvas.addEventListener('wheel', this.handleScroll);
        this.root.canvas.addEventListener('touchstart', this.handleTouchStart);
        this.root.canvas.addEventListener('touchmove', this.handleTouchMove);
        this.root.canvas.addEventListener('touchend', this.handleTouchEnd);
        if ((_a = document === null || document === void 0 ? void 0 : document.fonts) === null || _a === void 0 ? void 0 : _a.ready)
            document.fonts.ready.then(function () { return _this.root.render(); });
    };
    RootController.prototype.destroyEvents = function () {
        this.root.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.root.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.root.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.root.canvas.removeEventListener('click', this.handleClick);
        this.root.canvas.removeEventListener('wheel', this.handleScroll);
        this.root.canvas.removeEventListener('touchstart', this.handleTouchStart);
        this.root.canvas.removeEventListener('touchmove', this.handleTouchMove);
        this.root.canvas.removeEventListener('touchend', this.handleTouchEnd);
    };
    RootController.prototype.on = function (event, callback) {
        var _this = this;
        if (!this.events[event])
            this.events[event] = [];
        this.events[event].push(callback);
        return function () {
            _this.events[event] = _this.events[event].filter(function (cb) { return cb !== callback; });
        };
    };
    RootController.prototype.handleMouseMove = function (event) {
        if (!this.events.mousemove)
            return;
        this.events.mousemove.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
    };
    RootController.prototype.handleMouseDown = function (event) {
        if (!this.events.mousedown)
            return;
        this.events.mousedown.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
    };
    RootController.prototype.handleMouseUp = function (event) {
        if (!this.events.mouseup)
            return;
        this.events.mouseup.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
    };
    RootController.prototype.handleClick = function (event) {
        if (!this.events.click)
            return;
        this.events.click.forEach(function (cb) { return cb(event); });
    };
    RootController.prototype.handleScroll = function (event) {
        event.preventDefault();
        if (event.shiftKey || event.deltaX !== 0) {
            var offsetX = this.root.view.offsetX;
            if (event.shiftKey)
                offsetX += event.deltaY;
            else
                offsetX += event.deltaX;
            if (offsetX < 0)
                offsetX = 0;
            this.root.view.handleSetOffsetX(offsetX);
        }
        else {
            var offsetY = this.root.view.offsetY + event.deltaY;
            var maxHeight = this.root.grid.service.getLeftAvailableHeight();
            if (offsetY < 0)
                offsetY = 0;
            else if (offsetY > maxHeight)
                offsetY = maxHeight;
            this.root.view.handleSetOffsetY(offsetY);
        }
    };
    RootController.prototype.handleTouchStart = function (event) {
        var _a, _b, _c;
        event.preventDefault();
        (_a = this.events.touchstart) === null || _a === void 0 ? void 0 : _a.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
        var offsetX = (_b = event.touches[0]) === null || _b === void 0 ? void 0 : _b.screenX;
        var offsetY = (_c = event.touches[0]) === null || _c === void 0 ? void 0 : _c.screenY;
        if (offsetX)
            this.touchOffsetX = offsetX;
        if (offsetY)
            this.touchOffsetY = offsetY;
    };
    RootController.prototype.handleTouchMove = function (event) {
        var _a, _b, _c;
        event.preventDefault();
        (_a = this.events.touchmove) === null || _a === void 0 ? void 0 : _a.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
        if (this.root.tasks.controller.mouseDownOffsetX)
            return;
        var offsetX = (_b = event.changedTouches[0]) === null || _b === void 0 ? void 0 : _b.screenX;
        var offsetY = (_c = event.changedTouches[0]) === null || _c === void 0 ? void 0 : _c.screenY;
        if (offsetX &&
            this.touchOffsetX !== null &&
            offsetX !== this.touchOffsetX) {
            var diff = this.touchOffsetX - offsetX;
            var offset = this.root.view.offsetX + diff;
            this.root.view.handleSetOffsetX(offset);
            this.previousTouchOffsetX = this.touchOffsetX;
            this.touchOffsetX = offsetX;
        }
        if (offsetY &&
            this.touchOffsetY !== null &&
            offsetY !== this.touchOffsetY) {
            var diff = this.touchOffsetY - offsetY;
            var offset = this.root.view.offsetY + diff;
            var maxHeight = this.root.grid.service.getLeftAvailableHeight();
            if (offset > maxHeight)
                offset = maxHeight;
            this.root.view.handleSetOffsetY(offset);
            this.previousTouchOffsetY = this.touchOffsetY;
            this.touchOffsetY = offsetY;
        }
    };
    RootController.prototype.handleTouchEnd = function (event) {
        if (this.events.touchend &&
            !this.previousTouchOffsetX &&
            !this.previousTouchOffsetY) {
            this.events.touchend.every(function (cb) {
                // @ts-ignore
                if (event._stopPropagation)
                    return false;
                cb(event);
                return true;
            });
        }
        if (this.previousTouchOffsetX && this.touchOffsetX) {
            var diff = this.previousTouchOffsetX - this.touchOffsetX;
            if (diff > 30 || diff < -30) {
                diff *= 7;
                this.root.view.handleSetOffsetX(this.root.view.offsetX + diff, true, true, 500);
            }
        }
        if (this.previousTouchOffsetY && this.touchOffsetY) {
            var diff = this.previousTouchOffsetY - this.touchOffsetY;
            if (diff > 30 || diff < -30) {
                diff *= 7;
                var offset = this.root.view.offsetY + diff;
                var maxHeight = this.root.grid.service.getLeftAvailableHeight();
                if (offset > maxHeight)
                    offset = maxHeight;
                this.root.view.handleSetOffsetY(offset, true, true, 500);
            }
        }
        event.preventDefault();
        this.touchOffsetX = null;
        this.touchOffsetY = null;
        this.previousTouchOffsetX = null;
        this.previousTouchOffsetY = null;
    };
    RootController.prototype.stopPropagation = function (event) {
        // @ts-ignore
        event._stopPropagation = true;
    };
    return RootController;
}());
exports.RootController = RootController;
