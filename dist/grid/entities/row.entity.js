"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowEntity = void 0;
var RowEntity = /** @class */ (function () {
    function RowEntity(root) {
        this.root = root;
    }
    RowEntity.prototype.renderItem = function (_a, rowHeight) {
        var y = _a.y, odd = _a.odd;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.rect(0, y, this.root.canvas.width, rowHeight);
        ctx.fillStyle = odd ? this.root.api.rowOddBackground : this.root.api.rowEvenBackground;
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = this.root.api.rowLineColor;
        ctx.moveTo(0, y + rowHeight);
        ctx.lineTo(this.root.canvas.width, y + rowHeight);
        ctx.stroke();
    };
    return RowEntity;
}());
exports.RowEntity = RowEntity;
