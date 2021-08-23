"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnEntity = void 0;
var ColumnEntity = /** @class */ (function () {
    function ColumnEntity(root) {
        this.root = root;
    }
    ColumnEntity.prototype.renderDay = function (_a, _b) {
        var x = _a.x, title = _a.title, isStartMonth = _a.isStartMonth;
        var monthHeight = _b.monthHeight, width = _b.width, dayHeight = _b.dayHeight;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.strokeStyle = this.root.api.dayBottomLineColor;
        ctx.moveTo(x, monthHeight + dayHeight);
        ctx.lineTo(x + width, monthHeight + dayHeight);
        ctx.stroke();
        if (isStartMonth && this.root.api.renderDayStartMonthLine) {
            ctx.beginPath();
            ctx.strokeStyle = this.root.api.dayStartMonthLine;
            ctx.moveTo(x, monthHeight);
            ctx.lineTo(x, monthHeight + dayHeight);
            ctx.stroke();
        }
        ctx.font = this.root.api.dayFont;
        ctx.fillStyle = this.root.api.dayColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(title, x + (width / 2), monthHeight + (dayHeight / 2));
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };
    ColumnEntity.prototype.renderCol = function (_a, _b) {
        var x = _a.x, today = _a.today;
        var monthHeight = _b.monthHeight;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.strokeStyle = this.root.api.colLineColor;
        ctx.moveTo(x, monthHeight);
        ctx.lineTo(x, this.root.canvas.height);
        ctx.stroke();
        if (today) {
            ctx.fillStyle = this.root.api.dayTodayBackground;
            ctx.fillRect(x, monthHeight, this.root.grid.view.colWidth, this.root.canvas.height);
            ctx.fill();
        }
    };
    return ColumnEntity;
}());
exports.ColumnEntity = ColumnEntity;