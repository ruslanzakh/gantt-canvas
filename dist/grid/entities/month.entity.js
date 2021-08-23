"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthEntity = void 0;
var string_1 = require("../../utils/string");
var MonthEntity = /** @class */ (function () {
    function MonthEntity(root) {
        this.root = root;
    }
    MonthEntity.prototype.renderItem = function (_a, height) {
        var x = _a.x, xx = _a.xx, title = _a.title, middle = _a.middle;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.strokeStyle = this.root.api.monthLineColor;
        if (this.root.api.renderMonthLeftLine) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        if (this.root.api.renderMonthBottomLine) {
            ctx.moveTo(x, height);
            ctx.lineTo(xx, height);
        }
        ctx.stroke();
        if (this.root.api.showMonthMiddle) {
            var width = xx - x;
            if (width < 200)
                return;
            middle = (xx + x) / 2;
        }
        if (middle) {
            ctx.font = this.root.api.monthTitleFont;
            ctx.fillStyle = this.root.api.monthTitleColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(string_1.capitalize(title), middle, height / 2);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
        }
    };
    return MonthEntity;
}());
exports.MonthEntity = MonthEntity;