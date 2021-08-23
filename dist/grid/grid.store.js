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
            var date = date_1.getDate(start_date_ts);
            do {
                date_1.setDate(date, 1);
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
                date_1.setDate(date, -1);
                this.add(date, true);
            } while (date.getTime() > ts);
        }
    };
    GridStore.prototype.add = function (date, unshift) {
        if (unshift === void 0) { unshift = false; }
        var day = date.getDate();
        var middleDayInMonth = Math.floor(date_1.getDaysInMonth(date.getMonth() + 1, date.getFullYear()) / 2);
        var todayTs = date_1.getDate().getTime();
        var today = todayTs === date_1.getDate(date.getTime()).getTime();
        var elem = {
            ts: date.getTime(),
            title: date.getDate().toString(),
            month: date.getMonth(),
            year: date.getFullYear(),
            isStartMonth: day === 1,
            isMiddleMonth: day === middleDayInMonth,
            today: today,
        };
        if (unshift)
            this.dates.unshift(elem);
        else
            this.dates.push(elem);
    };
    GridStore.prototype.addDatesBefore = function (offsetX) {
        var _a;
        if (offsetX > this.root.canvas.width)
            return;
        var data = this.dates;
        var _b = this.module.view, colsOnScreen = _b.colsOnScreen, colWidth = _b.colWidth;
        var length = -offsetX / colWidth;
        var date = date_1.getDate((_a = data[0]) === null || _a === void 0 ? void 0 : _a.ts);
        date_1.setDate(date, -1);
        this.add(date, true);
        for (var i = 0; i < length + colsOnScreen; i++) {
            offsetX += colWidth;
            date_1.setDate(date, -1);
            this.add(date, true);
        }
        this.root.view.offsetX = offsetX;
    };
    GridStore.prototype.addDatesAfter = function (offsetX) {
        var data = this.dates;
        var fullDataWidth = this.module.service.getFullAvailableWidth();
        var _a = this.module.view, colsOnScreen = _a.colsOnScreen, colWidth = _a.colWidth;
        var width = fullDataWidth - this.root.canvas.width - colWidth;
        if (offsetX < width)
            return;
        var length = ((offsetX - width) / colWidth);
        var date = date_1.getDate(data[data.length - 1].ts);
        for (var i = 0; i < length + colsOnScreen; i++) {
            date_1.setDate(date, 1);
            this.add(date);
        }
    };
    return GridStore;
}());
exports.GridStore = GridStore;
