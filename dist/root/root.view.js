"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootView = void 0;
var scrollbar_x_entity_1 = require("./entities/scrollbar-x.entity");
var scrollbar_y_entity_1 = require("./entities/scrollbar-y.entity");
var animate_1 = require("../utils/animate");
var canvas_1 = require("../utils/canvas");
var RootView = /** @class */ (function () {
    function RootView(root) {
        this.offsetX = 0;
        this.offsetY = 0;
        this.pixelRatio = 1;
        this.canvasWidth = 1;
        this.canvasHeight = 1;
        this.root = root;
        this.updateCanvasSizeAndRender = this.updateCanvasSizeAndRender.bind(this);
        this.updateCanvasSize();
        this.attachEvents();
        this.scrollbarX = new scrollbar_x_entity_1.ScrollbarXEntity(root);
        this.scrollbarY = new scrollbar_y_entity_1.ScrollbarYEntity(root);
        this.pixelRatio = canvas_1.getPixelRatio(root.ctx);
        this.canvasWidth = this.root.canvas.width / this.pixelRatio;
        this.canvasHeight = this.root.canvas.height / this.pixelRatio;
    }
    RootView.prototype.render = function () {
        this.pixelRatio = canvas_1.getPixelRatio(this.root.ctx);
        this.canvasWidth = this.root.canvas.width / this.pixelRatio;
        this.canvasHeight = this.root.canvas.height / this.pixelRatio;
        this.root.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.root.ctx.fillStyle = '#ffffff';
        this.root.ctx.rect(0, 0, this.root.view.canvasWidth, this.root.view.canvasHeight);
        this.root.ctx.fill();
        this.root.grid.view.renderGrid();
        this.root.tasks.view.render();
        this.scrollbarX.render();
        this.scrollbarY.render();
        this.root.grid.view.renderHeader();
    };
    RootView.prototype.attachEvents = function () {
        window.addEventListener('resize', this.updateCanvasSizeAndRender);
    };
    RootView.prototype.destroyEvents = function () {
        window.removeEventListener('resize', this.updateCanvasSizeAndRender);
    };
    RootView.prototype.updateCanvasSizeAndRender = function () {
        this.updateCanvasSize();
        this.root.render();
    };
    RootView.prototype.updateCanvasSize = function () {
        canvas_1.scaleCanvas(this.root.canvas, this.root.ctx, this.root.root.offsetWidth, this.root.root.offsetHeight);
    };
    RootView.prototype.handleChangeOffsetX = function (difference, needRender) {
        if (difference === void 0) { difference = 10; }
        if (needRender === void 0) { needRender = true; }
        this.offsetX += difference;
        if (this.offsetX < 0)
            this.offsetX = 0;
        this.root.grid.service.validateOffsetX();
        if (needRender)
            this.render();
    };
    RootView.prototype.handleSetOffsetX = function (offsetX, needRender, needAnimate, duration) {
        var _this = this;
        if (offsetX === void 0) { offsetX = 0; }
        if (needRender === void 0) { needRender = true; }
        if (needAnimate === void 0) { needAnimate = false; }
        if (needAnimate) {
            var initialOffset_1 = this.offsetX;
            var diff_1 = offsetX - initialOffset_1;
            var positiveDiff = diff_1 > 0 ? diff_1 : diff_1 * -1;
            if (!duration)
                duration = (positiveDiff / this.root.grid.service.getFullAvailableWidth()) * 1500;
            if (diff_1 === 0)
                return;
            animate_1.animate({
                duration: duration,
                timing: animate_1.timing,
                draw: function (progress) {
                    _this.offsetX = initialOffset_1 + (diff_1 * progress);
                    if (_this.offsetX < 0)
                        _this.offsetX = 0;
                    if (progress === 1 || diff_1 > 0)
                        _this.root.grid.service.validateOffsetX();
                    _this.render();
                }
            });
        }
        else {
            this.offsetX = offsetX;
            if (this.offsetX < 0)
                this.offsetX = 0;
            this.root.grid.service.validateOffsetX();
            if (needRender)
                this.render();
        }
    };
    RootView.prototype.handleSetOffsetY = function (offsetY, needRender, needAnimate, duration) {
        var _this = this;
        if (offsetY === void 0) { offsetY = 0; }
        if (needRender === void 0) { needRender = true; }
        if (needAnimate === void 0) { needAnimate = false; }
        if (needAnimate) {
            var initialOffset_2 = this.offsetY;
            var diff_2 = offsetY - initialOffset_2;
            var positiveDiff = diff_2 > 0 ? diff_2 : diff_2 * -1;
            if (!duration)
                duration = (positiveDiff / this.root.grid.service.getFullAvailableHeight()) * 1500;
            if (diff_2 === 0)
                return;
            animate_1.animate({
                duration: duration,
                timing: animate_1.timing,
                draw: function (progress) {
                    _this.offsetY = initialOffset_2 + (diff_2 * progress);
                    if (_this.offsetY < 0)
                        _this.offsetY = 0;
                    _this.render();
                }
            });
        }
        else {
            this.offsetY = offsetY;
            if (this.offsetY < 0)
                this.offsetY = 0;
            if (needRender)
                this.render();
        }
    };
    RootView.prototype.setCursor = function (cursor) {
        if (cursor === 'auto' && this.root.api.isLoading)
            cursor = 'progress';
        this.root.root.style.cursor = cursor;
    };
    return RootView;
}());
exports.RootView = RootView;
