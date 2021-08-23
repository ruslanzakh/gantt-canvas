"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridService = void 0;
var date_1 = require("../utils/date");
var GridService = /** @class */ (function () {
    function GridService(root, module) {
        this.root = root;
        this.module = module;
    }
    GridService.prototype.showCurrentDay = function () {
        var columnLength = this.module.view.colsOnScreen / 3;
        var date = date_1.getDate();
        date_1.setDate(date, -columnLength);
        var dateTs = date.getTime();
        var index = this.module.store.dates
            .map((function (_a) {
            var ts = _a.ts;
            return ts;
        }))
            .indexOf(dateTs);
        var offsetX = index * this.module.view.colWidth;
        if (offsetX < 0) {
            var diff = dateTs - this.module.store.dates[0].ts;
            if (diff > 0) {
                offsetX = diff / this.module.view.tsHasOneX;
            }
            else {
                this.module.store.fillDataBefore(dateTs);
                offsetX = 0;
            }
        }
        this.root.view.handleSetOffsetX(offsetX, false);
    };
    GridService.prototype.getPosXByTs = function (ts) {
        var firstTs = this.module.view.firstTsOnScreen;
        var diff = ts - firstTs;
        return diff / this.module.view.tsHasOneX;
    };
    GridService.prototype.getPosXByFullDayTs = function (ts, end) {
        if (end === void 0) { end = false; }
        var date = date_1.getDate(ts, end);
        return this.getPosXByTs(date.getTime());
    };
    GridService.prototype.getTsByX = function (x) {
        var colWidth = this.module.view.colWidth;
        var col = this.module.view.columns
            .find(function (el) { return el.x <= x && el.x + colWidth > x; });
        if (!col)
            return 0;
        var ts = col.ts + ((x - col.x) * this.module.view.tsHasOneX);
        return ts;
    };
    GridService.prototype.getTsByOffsetDiff = function (x) {
        var columns = this.module.view.columns;
        if (!columns.length)
            return 0;
        var colHasTs = columns[1].ts - columns[0].ts;
        var colWidth = this.module.view.colWidth;
        var relativeOffset = x / colWidth;
        return colHasTs * relativeOffset;
    };
    GridService.prototype.getFullAvailableWidth = function () {
        var canvas = this.root.canvas;
        var colWidth = this.module.view.colWidth;
        var fullWidth = colWidth * this.module.store.dates.length;
        if (fullWidth < canvas.width)
            fullWidth = canvas.width;
        return fullWidth;
    };
    GridService.prototype.getViewHeight = function () {
        return this.root.canvas.height - this.root.grid.view.headerHeight - this.root.view.scrollbarY.bottomOffset;
    };
    GridService.prototype.getFullAvailableHeight = function () {
        var fullHeight = this.module.view.rowHeight * this.root.api.tasks.length;
        var viewHeight = this.getViewHeight();
        if (fullHeight < viewHeight)
            fullHeight = viewHeight;
        return fullHeight;
    };
    GridService.prototype.getLeftAvailableHeight = function () {
        return this.root.grid.service.getFullAvailableHeight() - this.getViewHeight();
    };
    GridService.prototype.validateOffsetX = function () {
        var offsetX = this.root.view.offsetX;
        if (offsetX < this.root.canvas.width) {
            this.module.store.addDatesBefore(offsetX);
        }
        else if (offsetX > this.getFullAvailableWidth() - this.root.canvas.width) {
            this.module.store.addDatesAfter(offsetX);
        }
    };
    return GridService;
}());
exports.GridService = GridService;
