"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollbarEntity = void 0;
var ScrollbarEntity = /** @class */ (function () {
    function ScrollbarEntity(root, _a) {
        var x = _a.x, y = _a.y;
        this.width = 20;
        this.height = 20;
        this.between = 5;
        this.isHover = false;
        this.root = root;
        this.x = x;
        this.y = y;
        this.destroyHandleClick = this.root.controller.on('click', this.handleClick.bind(this));
        this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
    }
    ScrollbarEntity.prototype.destroyEvents = function () {
        this.destroyHandleClick();
        this.destroyMouseMove();
    };
    ScrollbarEntity.prototype.isMinusClick = function (event) {
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var x = this.x;
        var y = this.y;
        var xx = x + this.width;
        var yy = y + this.height;
        return x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
    };
    ScrollbarEntity.prototype.isPlusClick = function (event) {
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var x = this.x + this.width + this.between;
        var y = this.y;
        var xx = x + this.width;
        var yy = y + this.height;
        return x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
    };
    ScrollbarEntity.prototype.handleClick = function (event) {
        if (this.isMinusClick(event))
            this.handleMinusClick();
        else if (this.isPlusClick(event))
            this.handlePlusClick();
    };
    ScrollbarEntity.prototype.handleMouseMove = function (event) {
        if (this.isMinusClick(event) || this.isPlusClick(event)) {
            this.root.controller.stopPropagation(event);
            this.root.view.setCursor('pointer');
            this.isHover = true;
        }
        else if (this.isHover) {
            this.isHover = false;
            this.root.view.setCursor('auto');
        }
    };
    ScrollbarEntity.prototype.handleMinusClick = function () {
        this.root.view.handleChangeOffsetX(-40);
    };
    ScrollbarEntity.prototype.handlePlusClick = function () {
        this.root.view.handleChangeOffsetX(40);
    };
    ScrollbarEntity.prototype.renderPlus = function () {
        var ctx = this.root.ctx;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        var x = this.x + this.width + this.between;
        ctx.rect(x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.font = "20px serif";
        ctx.fillStyle = "#000";
        ctx.fillText(">", x + 3, this.y + this.height - 3);
    };
    ScrollbarEntity.prototype.renderMinus = function () {
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.font = "20px serif";
        ctx.fillText("<", this.x + 3, this.y + this.height - 3);
    };
    ScrollbarEntity.prototype.render = function () {
        this.renderPlus();
        this.renderMinus();
    };
    return ScrollbarEntity;
}());
exports.ScrollbarEntity = ScrollbarEntity;
