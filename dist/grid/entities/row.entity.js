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
        ctx.rect(0, y, this.root.view.canvasWidth, rowHeight);
        ctx.fillStyle = odd
            ? this.root.api.rowOddBackground
            : this.root.api.rowEvenBackground;
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = this.root.api.rowLineColor;
        ctx.moveTo(0, y + rowHeight);
        ctx.lineTo(this.root.view.canvasWidth, y + rowHeight);
        ctx.stroke();
    };
    return RowEntity;
}());
exports.RowEntity = RowEntity;
