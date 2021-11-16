"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridService = void 0;
var date_1 = require("../utils/date");
var GridService = /** @class */ (function () {
    function GridService(root, module) {
        this.root = root;
        this.module = module;
    }
    GridService.prototype.showDay = function (ts, needRender, needAnimate, toCenter) {
        if (toCenter === void 0) { toCenter = true; }
        var date = date_1.getDate(ts);
        if (toCenter) {
            var columnLength = this.module.view.colsOnScreen / 3;
            if (this.root.api.viewMode === 'week')
                columnLength *= 7;
            else if (this.root.api.viewMode === 'month')
                columnLength *= 30;
            else if (this.root.api.viewMode === 'half-day')
                columnLength /= 2;
            else if (this.root.api.viewMode === 'quarter-day')
                columnLength /= 4;
            else if (this.root.api.viewMode === 'three-hours')
                columnLength = 0;
            else if (this.root.api.viewMode === 'hour')
                columnLength = 0;
            date_1.setDate(date, -columnLength);
        }
        var dateTs = date.getTime();
        this.showDayByTs(dateTs, needRender, needAnimate);
    };
    GridService.prototype.showDayByTs = function (dateTs, needRender, needAnimate) {
        var offsetX = 0;
        var diff = dateTs - this.module.store.dates[0].ts;
        if (diff > 0) {
            offsetX = diff / this.module.view.tsHasOneX;
        }
        else {
            this.module.store.fillDataBefore(dateTs);
        }
        this.root.view.handleSetOffsetX(offsetX, needRender, needAnimate);
    };
    GridService.prototype.getPosXByTs = function (ts) {
        if (this.root.api.viewMode === 'month')
            return this.getPosXForMonthView(ts);
        return this.getPosXByTsAndTsHasOneX(ts);
    };
    GridService.prototype.getPosXByTsAndTsHasOneX = function (ts) {
        var firstTs = this.module.view.firstTsOnScreen;
        var diff = ts - firstTs;
        return diff / this.module.view.tsHasOneX;
    };
    GridService.prototype.getPosXForMonthView = function (ts) {
        var end = this.module.view.columns.find(function (col) { return col.ts > ts; });
        if (end) {
            var indexOfEnd = this.module.view.columns.indexOf(end);
            var start = this.module.view.columns[indexOfEnd - 1];
            if (start) {
                var diff = ((ts - start.ts) / (end.ts - start.ts)) * (end.x - start.x);
                return start.x + diff;
            }
        }
        return this.getPosXByTsAndTsHasOneX(ts);
    };
    GridService.prototype.getPosXByFullDayTs = function (ts, end, dayType) {
        if (end === void 0) { end = false; }
        if (dayType === void 0) { dayType = 'day'; }
        var date = date_1.getDate(ts, end, dayType);
        return this.getPosXByTs(date.getTime());
    };
    GridService.prototype.getFirstTsOnScreen = function () {
        var colWidth = this.module.view.colWidth;
        var col = this.module.view.columns
            .find(function (el) { return el.x <= 0 && el.x + colWidth > 0; });
        if (!col)
            return 0;
        var ts = col.ts + ((-col.x) * this.module.view.tsHasOneX);
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
        var maxWidth = this.root.view.canvasWidth;
        var colWidth = this.module.view.colWidth;
        var fullWidth = colWidth * this.module.store.dates.length;
        if (fullWidth < maxWidth)
            fullWidth = maxWidth;
        return fullWidth;
    };
    GridService.prototype.getViewHeight = function () {
        return this.root.view.canvasHeight - this.root.grid.view.headerHeight - this.root.view.scrollbarY.bottomOffset;
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
        if (offsetX < this.root.view.canvasWidth) {
            this.module.store.addDatesBefore(offsetX);
        }
        else if (offsetX > this.getFullAvailableWidth() - this.root.view.canvasWidth) {
            this.module.store.addDatesAfter(offsetX);
        }
    };
    GridService.prototype.getDayType = function () {
        if (this.root.api.viewMode === 'half-day')
            return 'halfDay';
        if (this.root.api.viewMode === 'quarter-day')
            return 'quarterDay';
        if (this.root.api.viewMode === 'three-hours')
            return 'threeHours';
        if (this.root.api.viewMode === 'hour')
            return 'hour';
        return 'day';
    };
    return GridService;
}());
exports.GridService = GridService;
