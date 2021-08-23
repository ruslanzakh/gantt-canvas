"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
var base_1 = require("../utils/base");
var RootController = /** @class */ (function () {
    function RootController(root) {
        this.events = {};
        this.touchOffsetX = null;
        this.touchOffsetY = null;
        this.root = root;
        this.attachEvents();
    }
    RootController.prototype.attachEvents = function () {
        this.handleMouseMove = base_1.debounce(this.handleMouseMove.bind(this), 32);
        this.handleTouchMove = base_1.debounce(this.handleTouchMove.bind(this), 32);
        this.root.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.root.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.root.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.root.canvas.addEventListener('click', this.handleClick.bind(this));
        this.root.canvas.addEventListener('wheel', this.handleScroll.bind(this));
        this.root.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.root.canvas.addEventListener('touchmove', this.handleTouchMove);
        this.root.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    };
    RootController.prototype.destroyEvents = function () {
        this.root.canvas.removeEventListener('mousemove', this.handleMouseMove);
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
        if (event.shiftKey) {
            var offsetX = this.root.view.offsetX + event.deltaY;
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
        var _a, _b;
        event.preventDefault();
        var offsetX = (_a = event.touches[0]) === null || _a === void 0 ? void 0 : _a.screenX;
        var offsetY = (_b = event.touches[0]) === null || _b === void 0 ? void 0 : _b.screenY;
        if (offsetX)
            this.touchOffsetX = offsetX;
        if (offsetY)
            this.touchOffsetY = offsetY;
    };
    RootController.prototype.handleTouchMove = function (event) {
        var _a, _b;
        event.preventDefault();
        var offsetX = (_a = event.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.screenX;
        var offsetY = (_b = event.changedTouches[0]) === null || _b === void 0 ? void 0 : _b.screenY;
        if (offsetX && this.touchOffsetX !== null) {
            var diff = this.touchOffsetX - offsetX;
            var offset = this.root.view.offsetX + diff;
            this.root.view.handleSetOffsetX(offset);
            this.touchOffsetX = offsetX;
        }
        if (offsetY && this.touchOffsetY !== null) {
            var diff = this.touchOffsetY - offsetY;
            var offset = this.root.view.offsetY + diff;
            this.root.view.handleSetOffsetY(offset);
            this.touchOffsetY = offsetY;
        }
    };
    RootController.prototype.handleTouchEnd = function (event) {
        if (!this.events.touchend)
            return;
        this.events.touchend.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
        event.preventDefault();
        this.touchOffsetX = null;
        this.touchOffsetY = null;
    };
    RootController.prototype.stopPropagation = function (event) {
        // @ts-ignore
        event._stopPropagation = true;
    };
    return RootController;
}());
exports.RootController = RootController;
