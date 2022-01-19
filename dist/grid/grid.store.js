"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridStore = void 0;
var date_1 = require("../utils/date");
var GridStore = /** @class */ (function () {
    function GridStore(root, module) {
        this.dates = [];
        this.root = root;
        this.module = module;
    }
    GridStore.prototype.initialData = function () {
        if (this.root.api.renderAllTasksFromStart) {
            var _a = this.root.tasks.service.getFirstAndLastDeadline(), start_date_ts = _a[0], end_date_ts = _a[1];
            start_date_ts = this.getStartDayByViewMode(start_date_ts);
            var date = date_1.getDate(start_date_ts);
            this.add(date);
            do {
                date = date_1.setDateTs(date, this.getOffset(date));
                this.add(date);
            } while (date.getTime() <= end_date_ts);
        }
        this.addDatesBefore(this.root.view.offsetX);
        this.addDatesAfter(this.root.view.offsetX);
    };
    GridStore.prototype.fillDataBefore = function (ts) {
        var date = date_1.getDate(this.dates[0].ts);
        if (date.getTime() > ts) {
            do {
                date = date_1.setDateTs(date, -this.getOffset(date, true));
                this.add(date, true);
            } while (date.getTime() > ts);
        }
    };
    GridStore.prototype.add = function (date, unshift) {
        if (unshift === void 0) { unshift = false; }
        var day = date.getDate();
        var isMiddleDayMonth = false;
        var isStartMonth = false;
        var weekend = false;
        var weekday = date.getDay();
        if (this.root.api.viewMode === 'day') {
            var middleDayInMonth = Math.floor(date_1.getDaysInMonth(date.getMonth() + 1, date.getFullYear()) / 2);
            isMiddleDayMonth = day === middleDayInMonth;
        }
        if (['day', 'half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1) {
            isStartMonth = day === 1 && date.getHours() === 0;
            weekend = [0, 6].includes(weekday);
        }
        var todayTs = date_1.getDate().getTime();
        var today = todayTs === date_1.getDate(date.getTime()).getTime();
        var elem = {
            ts: date.getTime(),
            title: date.getDate().toString(),
            month: date.getMonth(),
            year: date.getFullYear(),
            hour: date.getHours(),
            isStartMonth: isStartMonth,
            weekend: weekend,
            weekday: weekday,
            isMiddleDayMonth: isMiddleDayMonth,
            today: today,
        };
        if (unshift)
            this.dates.unshift(elem);
        else
            this.dates.push(elem);
    };
    GridStore.prototype.addDatesBefore = function (offsetX) {
        var _a;
        if (offsetX > this.root.view.canvasWidth)
            return;
        var data = this.dates;
        var _b = this.module.view, colsOnScreen = _b.colsOnScreen, colWidth = _b.colWidth;
        var length = -offsetX / colWidth;
        var date = date_1.getDate((_a = data[0]) === null || _a === void 0 ? void 0 : _a.ts, false, null);
        for (var i = 0; i < length + colsOnScreen; i++) {
            offsetX += colWidth;
            date = date_1.setDateTs(date, -this.getOffset(date, true));
            this.add(date, true);
        }
        this.root.view.offsetX = offsetX;
    };
    GridStore.prototype.addDatesAfter = function (offsetX) {
        var data = this.dates;
        var fullDataWidth = this.module.service.getFullAvailableWidth();
        var _a = this.module.view, colsOnScreen = _a.colsOnScreen, colWidth = _a.colWidth;
        var width = fullDataWidth - this.root.view.canvasWidth - colWidth;
        if (offsetX < width)
            return;
        var length = ((offsetX - width) / colWidth);
        var date = date_1.getDate(data[data.length - 1].ts, false, null);
        for (var i = 0; i < length + colsOnScreen; i++) {
            date = date_1.setDateTs(date, this.getOffset(date));
            this.add(date);
        }
    };
    GridStore.prototype.getStartDayByViewMode = function (start_date_ts) {
        var viewMode = this.root.api.viewMode;
        if (['day', 'half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(viewMode) !== -1)
            return start_date_ts;
        var date = date_1.getDate(start_date_ts);
        var targetDay = 1; // monday or first day of month
        var day = date.getDay();
        if (day === 0)
            day = 7;
        if (viewMode === 'month') {
            day = date.getDate();
        }
        if (day === targetDay)
            return start_date_ts;
        var offset = (day - targetDay) * this.module.view.dayTs;
        date = date_1.setDateTs(date, -offset);
        return date.getTime();
    };
    GridStore.prototype.getOffset = function (date, minus) {
        if (minus === void 0) { minus = false; }
        if (this.root.api.viewMode === 'month') {
            if (minus)
                return date_1.getDaysInMonth(date.getMonth(), date.getFullYear()) * this.module.view.dayTs;
            return date_1.getDaysInMonth(date.getMonth() + 1, date.getFullYear()) * this.module.view.dayTs;
        }
        return this.module.view.colTs;
    };
    return GridStore;
}());
exports.GridStore = GridStore;
