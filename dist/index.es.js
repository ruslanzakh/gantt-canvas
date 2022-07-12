
  /**
   * @license
   * author: Ruslan Zakharov
   * ganttCanvas.js v0.2.6
   * Released under the MIT license.
   */

var ColumnEntity = /** @class */ (function () {
    function ColumnEntity(root) {
        this.root = root;
    }
    ColumnEntity.prototype.renderDay = function (column, common) {
        this.renderDayBackground(column, common);
        this.renderDayBottomLine(column, common);
        this.renderDayStartMonthLine(column, common);
        this.renderDayText(column, common);
    };
    ColumnEntity.prototype.renderDayBackground = function (_a, _b) {
        var x = _a.x, today = _a.today, weekend = _a.weekend;
        var monthHeight = _b.monthHeight, dayHeight = _b.dayHeight;
        var ctx = this.root.ctx;
        var fillStyle = this.root.api.dayHeaderBackground;
        if (today && this.root.api.dayHeaderTodayBackground) {
            fillStyle = this.root.api.dayHeaderTodayBackground;
        }
        else if (weekend && this.root.api.dayHeaderWeekendBackground) {
            fillStyle = this.root.api.dayHeaderWeekendBackground;
        }
        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(x, monthHeight, this.root.grid.view.colWidth, dayHeight);
        }
    };
    ColumnEntity.prototype.renderDayBottomLine = function (_a, _b) {
        var x = _a.x;
        var monthHeight = _b.monthHeight, width = _b.width, dayHeight = _b.dayHeight;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.strokeStyle = this.root.api.dayBottomLineColor;
        ctx.moveTo(x, monthHeight + dayHeight);
        ctx.lineTo(x + width, monthHeight + dayHeight);
        ctx.stroke();
    };
    ColumnEntity.prototype.renderDayStartMonthLine = function (_a, _b) {
        var x = _a.x, isStartMonth = _a.isStartMonth;
        var monthHeight = _b.monthHeight, dayHeight = _b.dayHeight;
        var ctx = this.root.ctx;
        if (isStartMonth && this.root.api.renderDayStartMonthLine) {
            ctx.beginPath();
            ctx.strokeStyle = this.root.api.dayStartMonthLine;
            ctx.moveTo(x, monthHeight);
            ctx.lineTo(x, monthHeight + dayHeight);
            ctx.stroke();
        }
    };
    ColumnEntity.prototype.renderDayText = function (_a, _b) {
        var x = _a.x, title = _a.title, weekend = _a.weekend, month = _a.month, hour = _a.hour, weekdayTitle = _a.weekdayTitle;
        var monthHeight = _b.monthHeight, width = _b.width, dayHeight = _b.dayHeight;
        var ctx = this.root.ctx;
        ctx.font = this.root.api.dayFont;
        ctx.textAlign = 'center';
        if (weekend && this.root.api.dayWeekendColor)
            ctx.fillStyle = this.root.api.dayWeekendColor;
        else
            ctx.fillStyle = this.root.api.dayColor;
        if (this.root.api.viewMode === 'month')
            title = this.root.grid.view.getMonthTitle(month);
        else if (['half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1)
            title = hour.toString();
        if (weekdayTitle) {
            var pad = dayHeight / 6;
            ctx.textBaseline = 'top';
            ctx.fillText(title, x + width / 2, monthHeight + pad);
            ctx.font = this.root.api.weekdayFont;
            if (weekend && this.root.api.weekdayWeekendColor)
                ctx.fillStyle = this.root.api.weekdayWeekendColor;
            else
                ctx.fillStyle = this.root.api.weekdayColor;
            ctx.textBaseline = 'bottom';
            ctx.fillText(weekdayTitle, x + width / 2, monthHeight + dayHeight - pad);
        }
        else {
            ctx.textBaseline = 'middle';
            ctx.fillText(title, x + width / 2, monthHeight + dayHeight / 2);
        }
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };
    ColumnEntity.prototype.renderCol = function (_a, _b) {
        var x = _a.x, today = _a.today, weekend = _a.weekend, isStartMonth = _a.isStartMonth;
        var monthHeight = _b.monthHeight, dayHeight = _b.dayHeight;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.strokeStyle = this.root.api.colLineColor;
        if (isStartMonth && this.root.api.colStartMonthLineColor) {
            ctx.strokeStyle = this.root.api.colStartMonthLineColor;
        }
        ctx.moveTo(x, monthHeight);
        ctx.lineTo(x, this.root.view.canvasHeight);
        ctx.stroke();
        if (today) {
            ctx.fillStyle = this.root.api.dayTodayBackground;
            ctx.fillRect(x, monthHeight + dayHeight, this.root.grid.view.colWidth, this.root.view.canvasHeight);
        }
        else if (weekend && this.root.api.dayWeekendBackground) {
            ctx.fillStyle = this.root.api.dayWeekendBackground;
            ctx.fillRect(x, monthHeight + dayHeight, this.root.grid.view.colWidth, this.root.view.canvasHeight);
        }
    };
    return ColumnEntity;
}());

var MonthEntity = /** @class */ (function () {
    function MonthEntity(root) {
        this.root = root;
    }
    MonthEntity.prototype.renderItem = function (_a, height) {
        var x = _a.x, xx = _a.xx, title = _a.title, middle = _a.middle, startMonthX = _a.startMonthX;
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
        if (this.root.api.showMonthMiddle ||
            [
                'week',
                'month',
                'half-day',
                'quarter-day',
                'three-hours',
                'hour',
            ].indexOf(this.root.api.viewMode) !== -1) {
            var width = xx - x;
            if (width >= ctx.measureText(title).width * 1.5)
                middle = (xx + x) / 2;
        }
        if (this.root.api.showMonthFromStartOnDayView &&
            this.root.api.viewMode === 'day') {
            if (!startMonthX && startMonthX !== 0)
                return;
            ctx.font = this.root.api.monthTitleFont;
            ctx.fillStyle = this.root.api.monthTitleColor;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(title, startMonthX, height / 2);
            ctx.textBaseline = 'alphabetic';
        }
        else if (middle) {
            ctx.font = this.root.api.monthTitleFont;
            ctx.fillStyle = this.root.api.monthTitleColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(title, middle, height / 2);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
        }
    };
    return MonthEntity;
}());

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

var GridView = /** @class */ (function () {
    function GridView(root, module) {
        this.columns = [];
        this.rows = [];
        this.months = [];
        this.firstTsOnScreen = 0;
        this.dayTs = 24 * 60 * 60 * 1000;
        this.halfDayTs = 12 * 60 * 60 * 1000;
        this.quarterDayTs = 6 * 60 * 60 * 1000;
        this.threeHoursTs = 3 * 60 * 60 * 1000;
        this.hourTs = 60 * 60 * 1000;
        this.root = root;
        this.module = module;
        this.columnEntity = new ColumnEntity(root);
        this.monthEntity = new MonthEntity(root);
        this.rowEntity = new RowEntity(root);
    }
    Object.defineProperty(GridView.prototype, "colWidth", {
        get: function () {
            if (['day', 'half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1)
                return this.root.api.dayColWidth;
            if (this.root.api.viewMode === 'week')
                return this.root.api.weekViewColWidth;
            return this.root.api.monthViewColWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "colsOnScreen", {
        get: function () {
            return this.root.view.canvasWidth / this.colWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "colTs", {
        get: function () {
            if (this.root.api.viewMode === 'day')
                return this.dayTs;
            if (this.root.api.viewMode === 'half-day')
                return this.halfDayTs;
            if (this.root.api.viewMode === 'quarter-day')
                return this.quarterDayTs;
            if (this.root.api.viewMode === 'three-hours')
                return this.threeHoursTs;
            if (this.root.api.viewMode === 'hour')
                return this.hourTs;
            else if (this.root.api.viewMode === 'week')
                return this.weekTs;
            return this.monthTs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "weekTs", {
        get: function () {
            return this.dayTs * 7;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "monthTs", {
        get: function () {
            return this.dayTs * 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "tsHasOneX", {
        get: function () {
            return this.colTs / this.colWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "rowHeight", {
        get: function () {
            return this.root.api.rowHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "monthHeight", {
        get: function () {
            return this.root.api.monthHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "dayHeight", {
        get: function () {
            return this.root.api.dayHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "headerHeight", {
        get: function () {
            return this.monthHeight + this.dayHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "rowsOffsetY", {
        get: function () {
            return this.monthHeight + this.dayHeight;
        },
        enumerable: false,
        configurable: true
    });
    GridView.prototype.fillColumns = function () {
        var offsetX = this.root.view.offsetX;
        var width = this.root.view.canvasWidth;
        var length = this.module.store.dates.length;
        var data = [];
        for (var i = 0; i < length; i++) {
            var el = this.module.store.dates[i];
            var x = i * this.colWidth - offsetX;
            if (x < -this.colWidth * 10)
                continue;
            if (x > width + this.colWidth)
                break;
            data.push({
                ts: el.ts,
                x: x,
                title: el.title,
                month: el.month,
                hour: el.hour,
                year: el.year,
                isStartMonth: el.isStartMonth,
                isMiddleDayMonth: el.isMiddleDayMonth,
                today: el.today,
                weekend: el.weekend,
                weekday: el.weekday,
                weekdayTitle: this.getWeekDayTitle(el.weekday),
            });
        }
        this.columns = data;
    };
    GridView.prototype.fillMonths = function () {
        var _this = this;
        var isMonthView = this.root.api.viewMode === 'month';
        var isPartDayView = ['half-day', 'quarter-day'].indexOf(this.root.api.viewMode) !== -1;
        var isHourView = ['three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1;
        var data = this.columns.reduce(function (prev, _a) {
            var month = _a.month, x = _a.x, year = _a.year, isMiddleDayMonth = _a.isMiddleDayMonth, taskTitle = _a.title, isStartMonth = _a.isStartMonth;
            var xx = x + _this.colWidth;
            var label = month + '.' + year;
            if (isMonthView)
                label = year;
            else if (isPartDayView || isHourView)
                label = taskTitle + '.' + month;
            var title = _this.getMonthTitle(month, year);
            if (isMonthView)
                title = year.toString();
            else if (isPartDayView)
                title = taskTitle + '.' + _this.getMonthNumber(month);
            else if (isHourView)
                title = taskTitle + ' ' + _this.getMonthTitle(month);
            if (!prev[label]) {
                prev[label] = {
                    title: title,
                    x: x,
                    xx: xx,
                };
                if (isStartMonth)
                    prev[label].startMonthX = x;
                return prev;
            }
            if (prev[label].x > x)
                prev[label].x = x;
            if (prev[label].xx < xx)
                prev[label].xx = xx;
            if (isMiddleDayMonth)
                prev[label].middle = x + _this.colWidth / 2;
            return prev;
        }, {});
        this.months = Object.values(data);
    };
    GridView.prototype.getMonthTitle = function (month, year) {
        var _a;
        var months = (_a = this.root.api.monthNames[this.root.api.lang]) !== null && _a !== void 0 ? _a : this.root.api.monthNames['ru'];
        if (this.root.api.monthTitleShowYear && year) {
            return months[month] + ' ' + year;
        }
        return months[month];
    };
    GridView.prototype.getWeekDayTitle = function (weekday) {
        var _a;
        if (!this.root.api.showDayWeekday || this.root.api.viewMode !== 'day')
            return '';
        var weekdays = (_a = this.root.api.weekdayNames[this.root.api.lang]) !== null && _a !== void 0 ? _a : this.root.api.weekdayNames['ru'];
        return weekdays[weekday];
    };
    GridView.prototype.getMonthNumber = function (month) {
        month++;
        if (month < 10)
            return '0' + month;
        return month.toString();
    };
    GridView.prototype.fillRows = function () {
        var odd = true;
        var height = this.root.view.canvasHeight;
        var data = [];
        var headerOffset = this.rowsOffsetY + this.rowHeight;
        var offsetY = headerOffset - this.root.view.offsetY - this.rowHeight;
        var minY = this.rowsOffsetY - this.rowHeight;
        var i = Math.floor((-offsetY + minY) / this.rowHeight);
        var y = 0;
        do {
            y = i * this.rowHeight + offsetY;
            i++;
            odd = i % 2 === 1;
            if (y > height)
                break;
            if (y < minY)
                continue;
            data.push({ y: y, odd: odd });
        } while (y <= height);
        this.rows = data;
    };
    GridView.prototype.updateStore = function () {
        this.fillColumns();
        this.fillRows();
        this.fillMonths();
        this.firstTsOnScreen = this.module.service.getFirstTsOnScreen();
    };
    GridView.prototype.renderGrid = function () {
        var _this = this;
        this.updateStore();
        this.rows.forEach(function (x) { return _this.rowEntity.renderItem(x, _this.rowHeight); });
        var colCommon = this.getColumnCommonData();
        this.columns.forEach(function (x) { return _this.columnEntity.renderCol(x, colCommon); });
    };
    GridView.prototype.renderHeader = function () {
        var _this = this;
        var width = this.root.view.canvasWidth;
        this.root.ctx.fillStyle = this.root.api.background;
        this.root.ctx.rect(0, 0, width, this.rowsOffsetY);
        this.root.ctx.fill();
        var colCommon = this.getColumnCommonData();
        this.columns.forEach(function (x) { return _this.columnEntity.renderDay(x, colCommon); });
        this.months.forEach(function (x) {
            return _this.monthEntity.renderItem(x, _this.monthHeight);
        });
    };
    GridView.prototype.getColumnCommonData = function () {
        return {
            monthHeight: this.monthHeight,
            width: this.colWidth,
            dayHeight: this.dayHeight,
        };
    };
    return GridView;
}());

var setHours = {
    day: function (date, end) {
        if (end === void 0) { end = false; }
        if (end)
            date.setHours(23, 59, 59);
        else
            date.setHours(0, 0, 0, 0);
    },
    halfDay: function (date, end) {
        if (end === void 0) { end = false; }
        if (date.getHours() >= 12) {
            if (end)
                date.setHours(23, 59, 59);
            else
                date.setHours(12, 0, 0, 0);
        }
        else {
            if (end)
                date.setHours(11, 59, 59);
            else
                date.setHours(0, 0, 0, 0);
        }
    },
    quarterDay: function (date, end) {
        if (end === void 0) { end = false; }
        var hours = date.getHours();
        if (hours >= 18) {
            if (end)
                date.setHours(23, 59, 59);
            else
                date.setHours(18, 0, 0, 0);
        }
        else if (hours >= 12) {
            if (end)
                date.setHours(17, 59, 59);
            else
                date.setHours(12, 0, 0, 0);
        }
        else if (hours >= 6) {
            if (end)
                date.setHours(11, 59, 59);
            else
                date.setHours(6, 0, 0, 0);
        }
        else {
            if (end)
                date.setHours(5, 59, 59);
            else
                date.setHours(0, 0, 0, 0);
        }
    },
    threeHours: function (date, end) {
        if (end === void 0) { end = false; }
        var hours = date.getHours();
        if (hours >= 21) {
            if (end)
                date.setHours(23, 59, 59);
            else
                date.setHours(21, 0, 0, 0);
        }
        else if (hours >= 18) {
            if (end)
                date.setHours(20, 59, 59);
            else
                date.setHours(18, 0, 0, 0);
        }
        else if (hours >= 15) {
            if (end)
                date.setHours(17, 59, 59);
            else
                date.setHours(15, 0, 0, 0);
        }
        else if (hours >= 12) {
            if (end)
                date.setHours(14, 59, 59);
            else
                date.setHours(12, 0, 0, 0);
        }
        else if (hours >= 9) {
            if (end)
                date.setHours(11, 59, 59);
            else
                date.setHours(9, 0, 0, 0);
        }
        else if (hours >= 6) {
            if (end)
                date.setHours(8, 59, 59);
            else
                date.setHours(6, 0, 0, 0);
        }
        else if (hours >= 3) {
            if (end)
                date.setHours(5, 59, 59);
            else
                date.setHours(3, 0, 0, 0);
        }
        else {
            if (end)
                date.setHours(2, 59, 59);
            else
                date.setHours(0, 0, 0, 0);
        }
    },
    hour: function (date, end) {
        if (end === void 0) { end = false; }
        var hours = date.getHours();
        if (end)
            date.setHours(hours, 59, 59);
        else
            date.setHours(hours, 0, 0, 0);
    },
};
var getDate = function (ts, end, dayType) {
    if (end === void 0) { end = false; }
    if (dayType === void 0) { dayType = 'day'; }
    var date = ts ? new Date(ts) : new Date();
    if (dayType)
        setHours[dayType](date, end);
    return date;
};
var setDate = function (date, diff) {
    date.setDate(date.getDate() + diff);
};
var setDateTs = function (date, diff) {
    return new Date(date.getTime() + diff);
};
var getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};

var GridStore = /** @class */ (function () {
    function GridStore(root, module) {
        this.dates = [];
        this.todayTs = 0;
        this.root = root;
        this.module = module;
    }
    GridStore.prototype.initialData = function () {
        this.todayTs = getDate().getTime();
        if (this.root.api.renderAllTasksFromStart) {
            var _a = this.root.tasks.service.getFirstAndLastDeadline(), start_date_ts = _a[0], end_date_ts = _a[1];
            start_date_ts = this.getStartDayByViewMode(start_date_ts);
            var date = getDate(start_date_ts);
            this.add(date);
            do {
                date = setDateTs(date, this.getOffset(date));
                this.add(date);
            } while (date.getTime() <= end_date_ts);
        }
        this.addDatesBefore(this.root.view.offsetX);
        this.addDatesAfter(this.root.view.offsetX);
    };
    GridStore.prototype.fillDataBefore = function (ts) {
        var date = getDate(this.dates[0].ts);
        if (date.getTime() > ts) {
            do {
                date = setDateTs(date, -this.getOffset(date, true));
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
        var today = false;
        var weekday = date.getDay();
        if (this.root.api.viewMode === 'day') {
            var middleDayInMonth = Math.floor(getDaysInMonth(date.getMonth() + 1, date.getFullYear()) / 2);
            isMiddleDayMonth = day === middleDayInMonth;
        }
        if (['day', 'half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(this.root.api.viewMode) !== -1) {
            isStartMonth = day === 1 && date.getHours() === 0;
            weekend = [0, 6].includes(weekday);
            today = this.todayTs === getDate(date.getTime()).getTime();
        }
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
        var ts = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.ts;
        if (!ts) {
            ts = this.getStartDayByViewMode(getDate().getTime());
        }
        var date = getDate(ts, false, null);
        for (var i = 0; i < length + colsOnScreen; i++) {
            offsetX += colWidth;
            date = setDateTs(date, -this.getOffset(date, true));
            this.add(date, true);
        }
        this.root.view.offsetX = offsetX;
    };
    GridStore.prototype.addDatesAfter = function (offsetX) {
        var _a;
        var data = this.dates;
        var fullDataWidth = this.module.service.getFullAvailableWidth();
        var _b = this.module.view, colsOnScreen = _b.colsOnScreen, colWidth = _b.colWidth;
        var width = fullDataWidth - this.root.view.canvasWidth - colWidth;
        if (offsetX < width)
            return;
        var length = (offsetX - width) / colWidth;
        var ts = (_a = data[data.length - 1]) === null || _a === void 0 ? void 0 : _a.ts;
        if (!ts) {
            ts = this.getStartDayByViewMode(getDate().getTime());
        }
        var date = getDate(ts, false, null);
        for (var i = 0; i < length + colsOnScreen; i++) {
            date = setDateTs(date, this.getOffset(date));
            this.add(date);
        }
    };
    GridStore.prototype.getStartDayByViewMode = function (start_date_ts) {
        var viewMode = this.root.api.viewMode;
        if (['day', 'half-day', 'quarter-day', 'three-hours', 'hour'].indexOf(viewMode) !== -1)
            return start_date_ts;
        var date = getDate(start_date_ts);
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
        date = setDateTs(date, -offset);
        return date.getTime();
    };
    GridStore.prototype.getOffset = function (date, minus) {
        if (minus === void 0) { minus = false; }
        if (this.root.api.viewMode === 'month') {
            if (minus)
                return (getDaysInMonth(date.getMonth(), date.getFullYear()) *
                    this.module.view.dayTs);
            return (getDaysInMonth(date.getMonth() + 1, date.getFullYear()) *
                this.module.view.dayTs);
        }
        return this.module.view.colTs;
    };
    return GridStore;
}());

var GridService = /** @class */ (function () {
    function GridService(root, module) {
        this.root = root;
        this.module = module;
    }
    GridService.prototype.showDay = function (ts, needRender, needAnimate, toCenter) {
        if (toCenter === void 0) { toCenter = true; }
        var date = getDate(ts);
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
            setDate(date, -columnLength);
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
        var date = getDate(ts, end, dayType);
        return this.getPosXByTs(date.getTime());
    };
    GridService.prototype.getFirstTsOnScreen = function () {
        var colWidth = this.module.view.colWidth;
        var col = this.module.view.columns.find(function (el) { return el.x <= 0 && el.x + colWidth > 0; });
        if (!col)
            return 0;
        var ts = col.ts + -col.x * this.module.view.tsHasOneX;
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
        return (this.root.view.canvasHeight -
            this.root.grid.view.headerHeight -
            this.root.view.scrollbarY.bottomOffset);
    };
    GridService.prototype.getFullAvailableHeight = function () {
        var fullHeight = this.module.view.rowHeight * this.root.api.tasks.length;
        var viewHeight = this.getViewHeight();
        if (fullHeight < viewHeight)
            fullHeight = viewHeight;
        return fullHeight;
    };
    GridService.prototype.getLeftAvailableHeight = function () {
        return (this.root.grid.service.getFullAvailableHeight() -
            this.getViewHeight());
    };
    GridService.prototype.validateOffsetX = function () {
        var offsetX = this.root.view.offsetX;
        if (offsetX < this.root.view.canvasWidth) {
            this.module.store.addDatesBefore(offsetX);
        }
        else if (offsetX >
            this.getFullAvailableWidth() - this.root.view.canvasWidth) {
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

var GridModule = /** @class */ (function () {
    function GridModule(root) {
        this.root = root;
        this.store = new GridStore(root, this);
        this.view = new GridView(root, this);
        this.service = new GridService(root, this);
    }
    GridModule.prototype.init = function () {
        this.store.dates = [];
        this.store.initialData();
        if (this.root.api.startFromToday)
            this.service.showDay();
    };
    return GridModule;
}());

var TasksStore = /** @class */ (function () {
    function TasksStore(root) {
        this.modifiedTasks = {};
        this.tasks = [];
        this.tasksList = {};
        this.hoverId = null;
        this.hoverResize = null;
        this.hoverDrag = null;
        this.hoverConnectionTask = null;
        this.addDepOffsetX = null;
        this.addDepOffsetY = null;
        this.root = root;
    }
    TasksStore.prototype.fillTasks = function () {
        var _this = this;
        this.tasks = this.root.api.tasks.map(function (task) {
            if (_this.modifiedTasks[task.id])
                return _this.modifiedTasks[task.id];
            return task;
        });
        this.tasksList = {};
        this.tasks.forEach(function (task) {
            _this.tasksList[task.id] = task;
        });
    };
    TasksStore.prototype.clearModTasks = function () {
        this.modifiedTasks = {};
    };
    TasksStore.prototype.saveModTasks = function () {
        this.root.api.updateTasks(this.tasks);
        this.clearModTasks();
    };
    TasksStore.prototype.addModTask = function (task) {
        this.modifiedTasks[task.id] = task;
        this.fillTasks();
    };
    TasksStore.prototype.setHoverId = function (id, resize, hoverDrag) {
        if (id === this.hoverId &&
            resize === this.hoverResize &&
            hoverDrag === this.hoverDrag)
            return;
        if (!this.root.api.isLoading) {
            if (id)
                this.root.view.setCursor(resize ? 'col-resize' : hoverDrag ? 'grab' : 'pointer');
            else
                this.root.view.setCursor('auto');
        }
        this.hoverResize = resize;
        this.hoverDrag = hoverDrag;
        if (id !== this.hoverId) {
            this.hoverId = id;
            this.root.render();
        }
    };
    TasksStore.prototype.setHoverConnectionTask = function (id) {
        this.hoverConnectionTask = id;
    };
    TasksStore.prototype.updateDepOffsets = function (offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = this.addDepOffsetX; }
        if (offsetY === void 0) { offsetY = this.addDepOffsetY; }
        this.addDepOffsetX = offsetX;
        this.addDepOffsetY = offsetY;
    };
    return TasksStore;
}());

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

var roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    else if (typeof radius === 'object' && Array.isArray(radius)) {
        radius = { tl: radius[0], tr: radius[1], br: radius[2], bl: radius[3] };
    }
    if (fill)
        ctx.fillStyle = fill;
    if (stroke)
        ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
    // hack because without this hack sometimes doesn't fill rect
    // don't understand why - magic
    ctx.beginPath();
    ctx.closePath();
};
var getEventTouchOffsets = function (event, canvas, ctx) {
    var _a, _b, _c, _d;
    var rect = canvas.getBoundingClientRect();
    var x = (_b = (_a = event.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.clientX) !== null && _b !== void 0 ? _b : 0;
    var y = (_d = (_c = event.changedTouches[0]) === null || _c === void 0 ? void 0 : _c.clientY) !== null && _d !== void 0 ? _d : 0;
    var x_rel = x - rect.left;
    var y_rel = y - rect.top;
    var ratio = getPixelRatio(ctx);
    var offsetX = Math.round((x_rel * canvas.width) / ratio / rect.width);
    var offsetY = Math.round((y_rel * canvas.height) / ratio / rect.height);
    return { offsetX: offsetX, offsetY: offsetY };
};
var renderUnderline = function (ctx, text, x, y) {
    var metrics = measureText(ctx, text);
    var fontSize = Math.floor(metrics.actualHeight * 1.4); // 140% the height
    switch (ctx.textAlign) {
        case 'center':
            x -= metrics.width / 2;
            break;
        case 'right':
            x -= metrics.width;
            break;
    }
    switch (ctx.textBaseline) {
        case 'top':
            y += fontSize;
            break;
        case 'middle':
            y += fontSize / 2;
            break;
    }
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = Math.ceil(fontSize * 0.04);
    ctx.moveTo(x, y);
    ctx.lineTo(x + metrics.width, y);
    ctx.stroke();
    ctx.restore();
};
var measureText = function (ctx, text) {
    var metrics = ctx.measureText(text);
    return {
        width: Math.floor(metrics.width),
        height: Math.floor(
        // @ts-ignore
        metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent),
        actualHeight: Math.floor(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent),
    };
};
function getPixelRatio(context) {
    // assume the device pixel ratio is 1 if the browser doesn't specify it
    var devicePixelRatio = window.devicePixelRatio || 1;
    // determine the 'backing store ratio' of the canvas context
    var backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
    // determine the actual ratio we want to draw at
    var ratio = devicePixelRatio / backingStoreRatio;
    return ratio;
}
function scaleCanvas(canvas, context, width, height) {
    var ratio = getPixelRatio(context);
    if (ratio !== 1) {
        // set the 'real' canvas size to the higher width/height
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        // ...then scale it back down with CSS
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }
    else {
        // this is a normal 1:1 device; just scale it simply
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = '';
        canvas.style.height = '';
    }
    // scale the drawing context so everything will work at the higher ratio
    context.scale(ratio, ratio);
}

var TaskEntity = /** @class */ (function () {
    function TaskEntity(root) {
        this.root = root;
    }
    TaskEntity.prototype.isHover = function (event, task) {
        var x = task.x;
        var y = task.y, w = task.w, noEditable = task.noEditable;
        var h = this.root.grid.view.rowHeight;
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var resize = null;
        var depFrom = null;
        var xx = this.getTaskXX(x, w);
        var yy = y + h;
        if (this.needControlOutsideTask(task)) {
            x -=
                this.root.api.taskPadding +
                    this.root.api.taskRenderResizeControlsWidth;
            xx +=
                this.root.api.taskRenderResizeControlsWidth +
                    this.root.api.taskPadding;
        }
        var hover = x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
        if (!hover)
            return { hover: hover, resize: resize, depFrom: depFrom };
        if (!noEditable) {
            if (this.root.api.taskRenderDepControl &&
                xx - this.root.api.taskRenderDepRadius - this.getDepOffsetX() <
                    offsetX)
                depFrom = true;
            else
                resize = this.isControlsHover(event, task);
        }
        return { hover: hover, resize: resize, depFrom: depFrom };
    };
    TaskEntity.prototype.renderItem = function (task, isTouchAction) {
        if (isTouchAction === void 0) { isTouchAction = false; }
        var x = task.x, y = task.y, w = task.w, hover = task.hover, noEditable = task.noEditable;
        if (x >= this.root.view.canvasWidth || w === 0)
            return;
        var ctx = this.root.ctx;
        ctx.beginPath();
        var top = this.getTaskTop(y);
        var fillStyle = this.getTaskFillStyle(task);
        var strokeStyle = this.getTaskStrokeStyle(task);
        roundRect(ctx, x, top, w, this.root.api.taskHeight, this.root.api.taskRadius, fillStyle, strokeStyle);
        this.renderTaskText(task, top);
        if (hover && !noEditable) {
            if (!isTouchAction || this.root.api.allowMobileTaskResize)
                this.renderResizeControls(task, top);
            if (!isTouchAction)
                this.renderRightDep(x + w, top + this.root.api.taskHeight / 2);
        }
    };
    TaskEntity.prototype.renderRightDep = function (x, y) {
        if (!this.root.api.taskRenderDepControl)
            return;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.root.api.taskRenderDepBackground;
        ctx.arc(x + this.getDepOffsetX(), y, this.root.api.taskRenderDepRadius, 0, Math.PI * 2);
        ctx.strokeStyle = this.root.api.taskRenderDepLineColor;
        ctx.lineWidth = this.root.api.taskRenderDepLineWidth;
        ctx.stroke();
        ctx.fill();
        ctx.lineWidth = 1;
    };
    TaskEntity.prototype.renderArrow = function (id, source) {
        var h = this.root.grid.view.rowHeight;
        var task = this.root.tasks.service.getRenderedViewTaskById(id) ||
            this.root.tasks.service.getViewTaskById(id);
        if (!task)
            return;
        var x = source.x + source.w;
        var y = source.y + h / 2;
        var isHover = task.hover || source.hover;
        // clear previous lines due to making a new line clear
        if (isHover)
            this.renderArrowLine(x, y, task, isHover, true);
        this.renderArrowLine(x, y, task, isHover, false);
    };
    TaskEntity.prototype.renderArrowLine = function (x, y, task, isHover, isClear) {
        var ctx = this.root.ctx;
        var r = this.root.api.arrowRadius;
        var h = this.root.grid.view.rowHeight;
        var startOffsetX = this.getDepOffsetX() || 10;
        var targetY = task.y + h / 2;
        ctx.strokeStyle = this.root.api.arrowColor;
        ctx.fillStyle = this.root.api.arrowColor;
        var oldLineWidth = ctx.lineWidth;
        ctx.lineWidth = this.root.api.arrowWidth;
        if (isClear) {
            ctx.strokeStyle = '#fff';
            ctx.fillStyle = '#fff';
        }
        else if (isHover) {
            ctx.strokeStyle = this.root.api.arrowHoverColor;
            ctx.fillStyle = this.root.api.arrowHoverColor;
            ctx.lineWidth = this.root.api.arrowHoverWidth;
        }
        if (task.x >= x + startOffsetX * 2) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + startOffsetX - r, y);
            ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, targetY < y ? y - r : y + r);
            ctx.lineTo(x + startOffsetX, targetY > y ? targetY - r : targetY + r);
            ctx.quadraticCurveTo(x + startOffsetX, targetY, x + startOffsetX + r, targetY);
            ctx.lineTo(task.x - ctx.lineWidth, targetY);
            ctx.stroke();
            this.renderArrowHead(x + startOffsetX, targetY, task.x, targetY, isHover);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + startOffsetX - r, y);
            ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, y + r);
            ctx.lineTo(x + startOffsetX, y + h / 2 - r);
            ctx.quadraticCurveTo(x + startOffsetX, y + h / 2, x + startOffsetX - r, y + h / 2);
            ctx.lineTo(task.x - 20 + r, y + h / 2);
            ctx.quadraticCurveTo(task.x - 20, y + h / 2, task.x - 20, targetY > y ? y + h / 2 + r : y + h / 2 - r);
            ctx.lineTo(task.x - 20, targetY);
            ctx.lineTo(task.x - ctx.lineWidth, targetY);
            ctx.stroke();
            this.renderArrowHead(task.x - 20, targetY, task.x, targetY, isHover);
        }
        ctx.lineWidth = oldLineWidth;
    };
    TaskEntity.prototype.renderArrowConnection = function (id, x, y) {
        var task = this.root.tasks.service.getRenderedViewTaskById(id) ||
            this.root.tasks.service.getViewTaskById(id);
        if (!task)
            return;
        var h = this.root.grid.view.rowHeight;
        var sourceY = task.y + h / 2;
        var sourceX = task.x + task.w;
        var ctx = this.root.ctx;
        ctx.strokeStyle = this.root.api.arrowActiveColor;
        ctx.fillStyle = this.root.api.arrowActiveColor;
        var startOffsetX = this.getDepOffsetX();
        if (task.x + task.w + this.root.api.taskRenderDepRadius > x) {
            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, y + h / 2);
            ctx.lineTo(x - 20, y + h / 2);
            ctx.lineTo(x - 20, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            this.renderArrowHead(x - 20, y, x, y);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            this.renderArrowHead(x - 20, y, x, y);
        }
    };
    TaskEntity.prototype.renderArrowHead = function (fromx, fromy, tox, toy, hover) {
        if (hover === void 0) { hover = false; }
        var ctx = this.root.ctx;
        var oldLineWidth = ctx.lineWidth;
        if (hover) {
            ctx.lineWidth = this.root.api.arrowHoverHeadWidth;
            tox -= this.root.api.arrowHoverHeadWidth;
        }
        else {
            ctx.lineWidth = this.root.api.arrowWidth;
            tox -= this.root.api.arrowWidth;
        }
        //variables to be used when creating the arrow
        var headlen = 10 * this.root.api.scale;
        var angle = Math.atan2(toy - fromy, tox - fromx);
        //starting a new path from the head of the arrow to one of the sides of
        //the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
        //draws the paths created above
        ctx.stroke();
        ctx.fill();
        ctx.lineWidth = oldLineWidth;
    };
    TaskEntity.prototype.renderTaskText = function (task, top) {
        var _a, _b;
        var x = task.x, w = task.w, title = task.title, subtitle = task.subtitle, hover = task.hover, colorSubtitle = task.colorSubtitle;
        var convertColor = this.root.service.convertColor;
        var ctx = this.root.ctx;
        var _c = this.root.api, taskFont = _c.taskFont, taskPadding = _c.taskPadding, taskRenderResizeControls = _c.taskRenderResizeControls, taskRenderResizeControlsWidth = _c.taskRenderResizeControlsWidth, taskHeight = _c.taskHeight, taskDefaultOutlineColor = _c.taskDefaultOutlineColor, taskDefaultSubtitleColor = _c.taskDefaultSubtitleColor, taskDefaultSubtitleOutlineColor = _c.taskDefaultSubtitleOutlineColor, taskRenderDepRadius = _c.taskRenderDepRadius, taskSubtitleOffset = _c.taskSubtitleOffset;
        ctx.font = taskFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var maxWidth = w - taskPadding * 2;
        if (taskRenderResizeControls)
            maxWidth -= taskRenderResizeControlsWidth * 2 + taskPadding * 2;
        var titleWidth = ctx.measureText(title).width;
        var subtitleWidth = subtitle
            ? ctx.measureText(subtitle).width + taskSubtitleOffset
            : 0;
        if (titleWidth + subtitleWidth < maxWidth) {
            ctx.fillStyle = this.getTitleColor(task);
            ctx.textAlign = 'left';
            var titleX = x + taskPadding * 2 + taskRenderResizeControlsWidth;
            ctx.fillText(title, titleX, top + taskHeight / 2);
            if (task.underline)
                renderUnderline(ctx, title, titleX, top + taskHeight / 4);
            if (subtitle && hover) {
                ctx.fillStyle = convertColor(colorSubtitle !== null && colorSubtitle !== void 0 ? colorSubtitle : taskDefaultSubtitleColor);
                ctx.fillText(subtitle, titleX + titleWidth + taskSubtitleOffset, top + taskHeight / 2);
                if (task.underline)
                    renderUnderline(ctx, subtitle, titleX + titleWidth + taskSubtitleOffset, top + taskHeight / 4);
            }
        }
        else {
            ctx.fillStyle = convertColor((_a = task.outlineColor) !== null && _a !== void 0 ? _a : taskDefaultOutlineColor);
            ctx.textAlign = 'left';
            var offsetX = this.getDepOffsetX();
            var titleX = x + w + offsetX + taskRenderDepRadius * 2;
            ctx.fillText(title, titleX, top + taskHeight / 2);
            if (task.underline)
                renderUnderline(ctx, title, titleX, top + taskHeight / 4);
            if (subtitle && hover) {
                ctx.fillStyle = convertColor((_b = task.outlineSubtitleColor) !== null && _b !== void 0 ? _b : taskDefaultSubtitleOutlineColor);
                ctx.fillText(subtitle, titleX + titleWidth + taskSubtitleOffset, top + taskHeight / 2);
                if (task.underline)
                    renderUnderline(ctx, subtitle, titleX + titleWidth + taskSubtitleOffset, top + taskHeight / 4);
            }
        }
    };
    TaskEntity.prototype.renderResizeControls = function (task, top) {
        if (!this.root.api.taskRenderResizeControls ||
            this.needControlOutsideTask(task))
            return;
        var x = task.x, w = task.w;
        var ctx = this.root.ctx;
        var leftX = x + this.root.api.taskPadding;
        top += this.root.api.taskPadding;
        var width = this.root.api.taskRenderResizeControlsWidth;
        var height = this.root.api.taskHeight - this.root.api.taskPadding * 2;
        var rightX = x + w - width - this.root.api.taskPadding;
        var color = this.root.api.taskRenderResizeControlsColor;
        roundRect(ctx, leftX, top, width, height, this.root.api.taskRenderResizeControlsRadius, color);
        roundRect(ctx, rightX, top, width, height, this.root.api.taskRenderResizeControlsRadius, color);
    };
    TaskEntity.prototype.isControlsHover = function (event, task) {
        if (this.root.api.taskRenderResizeControls &&
            !this.needControlOutsideTask(task)) {
            return this.isRenderedControlsHover(event, task);
        }
        var offsetX = event.offsetX;
        var x = task.x, w = task.w;
        var resizeWidth = w * 0.2;
        if (resizeWidth > 30)
            resizeWidth = 30;
        var leftResizeX = x + resizeWidth;
        var rightResizeX = x + w - resizeWidth;
        if (leftResizeX > offsetX)
            return 'left';
        else if (rightResizeX < offsetX)
            return 'right';
        return null;
    };
    TaskEntity.prototype.isRenderedControlsHover = function (event, task) {
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var x = task.x, y = task.y, w = task.w;
        var top = this.getTaskTop(y);
        var startY = top + this.root.api.taskPadding;
        var endY = startY + this.root.api.taskHeight - this.root.api.taskPadding * 2;
        if (offsetY < startY || offsetY > endY)
            return null;
        var width = this.root.api.taskRenderResizeControlsWidth;
        var leftStartX = x + this.root.api.taskPadding;
        var leftEndX = leftStartX + width;
        if (offsetX > leftStartX && offsetX < leftEndX)
            return 'left';
        var rightStartX = x + w - width - this.root.api.taskPadding;
        var rightEndX = rightStartX + width;
        if (offsetX > rightStartX && offsetX < rightEndX)
            return 'right';
        return null;
    };
    TaskEntity.prototype.getTaskTop = function (y) {
        var h = this.root.grid.view.rowHeight;
        return (h - this.root.api.taskHeight) / 2 + y;
    };
    TaskEntity.prototype.getTaskXX = function (x, w) {
        var xx = x + w;
        if (this.root.api.taskRenderDepControl)
            xx += this.getDepOffsetX() + this.root.api.taskRenderDepRadius;
        return xx;
    };
    TaskEntity.prototype.getDepOffsetX = function () {
        if (!this.root.api.taskRenderDepControl)
            return 0;
        return (this.root.api.taskRenderDepRadius +
            this.root.api.taskRenderDepOffsetX);
    };
    TaskEntity.prototype.getTaskFillStyle = function (task) {
        var hover = task.hover, hoverConnection = task.hoverConnection, background = task.background, backgroundHover = task.backgroundHover;
        var convertColor = this.root.service.convertColor;
        if (hover || hoverConnection) {
            return convertColor(backgroundHover !== null && backgroundHover !== void 0 ? backgroundHover : this.root.api.taskDefaultHoverBackground);
        }
        return convertColor(background !== null && background !== void 0 ? background : this.root.api.taskDefaultBackground);
    };
    TaskEntity.prototype.getTaskStrokeStyle = function (task) {
        var hover = task.hover, hoverConnection = task.hoverConnection, error = task.error, stroke = task.stroke, strokeHover = task.strokeHover;
        var _a = this.root.api, taskErrorStrokeColor = _a.taskErrorStrokeColor, taskDefaultStrokeColor = _a.taskDefaultStrokeColor, taskDefaultHoverStrokeColor = _a.taskDefaultHoverStrokeColor;
        var convertOptionalColor = this.root.service.convertOptionalColor;
        if (error && taskErrorStrokeColor)
            return taskErrorStrokeColor;
        if (hover || hoverConnection) {
            return convertOptionalColor(strokeHover !== null && strokeHover !== void 0 ? strokeHover : taskDefaultHoverStrokeColor);
        }
        return convertOptionalColor(stroke !== null && stroke !== void 0 ? stroke : taskDefaultStrokeColor);
    };
    TaskEntity.prototype.getTitleColor = function (task) {
        var hover = task.hover, hoverConnection = task.hoverConnection, color = task.color, colorHover = task.colorHover;
        var convertColor = this.root.service.convertColor;
        if (hover || hoverConnection) {
            return convertColor(colorHover !== null && colorHover !== void 0 ? colorHover : this.root.api.taskDefaultHoverColor);
        }
        return convertColor(color !== null && color !== void 0 ? color : this.root.api.taskDefaultColor);
    };
    TaskEntity.prototype.needControlOutsideTask = function (task) {
        return ((this.root.api.taskRenderResizeControlsWidth +
            this.root.api.taskPadding) *
            2 >
            task.w);
    };
    return TaskEntity;
}());

var TasksView = /** @class */ (function () {
    function TasksView(root, module) {
        this.tasksForArrows = [];
        this.tasks = [];
        this.root = root;
        this.module = module;
        this.taskEntity = new TaskEntity(root);
    }
    TasksView.prototype.fillTasks = function () {
        var _this = this;
        var _a = this.root.grid.view, rowHeight = _a.rowHeight, rowsOffsetY = _a.rowsOffsetY;
        var _b = this.module.store, hoverId = _b.hoverId, hoverConnectionTask = _b.hoverConnectionTask, tasks = _b.tasks;
        var offsetY = rowsOffsetY - this.root.view.offsetY;
        var data = {};
        var dayType = this.root.grid.service.getDayType();
        tasks.forEach(function (task, index) {
            var _a = _this.module.service.getTaskPos(task, dayType), x = _a.x, xx = _a.xx, error = _a.error;
            var w = xx - x;
            if (w < _this.root.api.minTaskWidth)
                w = _this.root.api.minTaskWidth;
            var y = rowHeight * index + offsetY;
            data[task.id] = _assign(_assign({}, task), { hover: hoverId === task.id, hoverConnection: hoverConnectionTask === task.id, y: y, x: x, w: w, error: error });
        });
        this.tasksForArrows = Object.values(data).filter(function (task) {
            if (task.y + rowHeight >= rowsOffsetY &&
                task.y <= _this.root.view.canvasHeight &&
                task.x + task.w >= 0 &&
                task.x <= _this.root.view.canvasWidth)
                return true;
            return task.next_ids.some(function (id) {
                var target = data[id];
                if (!target)
                    return false;
                if (task.y < rowsOffsetY && target.y < rowsOffsetY)
                    return false;
                if (task.y > _this.root.view.canvasHeight &&
                    target.y > _this.root.view.canvasHeight)
                    return false;
                if (task.x + task.w < 0 && target.x + target.w < 0)
                    return false;
                if (task.x > _this.root.view.canvasWidth &&
                    target.x > _this.root.view.canvasWidth)
                    return false;
                return true;
            });
        });
        this.tasks = this.tasksForArrows.filter(function (task) {
            return task.y + rowHeight >= rowsOffsetY &&
                task.y <= _this.root.view.canvasHeight;
        });
    };
    TasksView.prototype.render = function () {
        this.module.store.fillTasks();
        this.fillTasks();
        this.renderArrows();
        this.renderArrowConnection();
        this.renderTasks();
    };
    TasksView.prototype.renderArrows = function () {
        var _this = this;
        var hoverTask = this.tasksForArrows.find(function (el) { return el.hover; });
        this.tasksForArrows.forEach(function (el) {
            el.next_ids.forEach(function (id) {
                return (!hoverTask || hoverTask.id !== id) &&
                    _this.taskEntity.renderArrow(id, el);
            });
        });
        if (hoverTask) {
            this.tasksForArrows.forEach(function (el) {
                el.next_ids.forEach(function (id) {
                    return hoverTask.id === id &&
                        _this.taskEntity.renderArrow(id, el);
                });
            });
            hoverTask.next_ids.forEach(function (id) {
                return _this.taskEntity.renderArrow(id, hoverTask);
            });
        }
    };
    TasksView.prototype.renderArrowConnection = function () {
        if (this.module.store.hoverId && this.module.controller.addDepMode) {
            this.taskEntity.renderArrowConnection(this.module.store.hoverId, this.module.store.addDepOffsetX || 0, this.module.store.addDepOffsetY || 0);
        }
    };
    TasksView.prototype.renderTasks = function () {
        var _this = this;
        this.tasks.forEach(function (x) {
            return _this.taskEntity.renderItem(x, _this.module.controller.isTouchAction);
        });
    };
    return TasksView;
}());

var TasksController = /** @class */ (function () {
    function TasksController(root, module) {
        var _this = this;
        this.addDepMode = false;
        this.resizeMoveMode = null;
        this.mouseDownOffsetX = null;
        this.moveOffsetX = 0;
        this.initialMouseDownOffsetX = null;
        this.isTouchAction = false;
        this.handleTouchStart = function (event) {
            var eventOffsets = getEventTouchOffsets(event, _this.root.canvas, _this.root.ctx);
            if (_this.root.api.isLoading)
                return;
            var _a = _this.module.service.getHoverId(eventOffsets), hoverId = _a.hoverId, resize = _a.resize, depFromId = _a.depFromId;
            if (!hoverId)
                return;
            _this.initialMouseDownOffsetX = eventOffsets.offsetX;
            if (_this.module.service.isNoEditableTask(hoverId)) {
                return document.addEventListener('touchend', _this.handleNoEditableTaskMouseUp);
            }
            if ((resize && _this.root.api.allowMobileTaskResize) ||
                _this.root.api.allowMobileTaskMove) {
                _this.mouseDownOffsetX = eventOffsets.offsetX;
                _this.isTouchAction = true;
                _this.module.store.setHoverId(hoverId, resize, depFromId);
            }
            if (resize && _this.root.api.allowMobileTaskResize) {
                _this.resizeMoveMode = resize;
                _this.destroyResizeMove = _this.root.controller.on('touchmove', _this.handleResizeTaskTouchMove.bind(_this));
                document.addEventListener('touchend', _this.handleResizeTouchEnd);
            }
            else if (_this.root.api.allowMobileTaskMove) {
                _this.destroyTaskMove = _this.root.controller.on('touchmove', _this.handleTaskTouchMove.bind(_this));
                document.addEventListener('touchend', _this.handleTaskMoveTouchEnd);
            }
        };
        this.root = root;
        this.module = module;
        this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
        this.handleResizeTouchEnd = this.handleResizeTouchEnd.bind(this);
        this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
        this.handleTaskMoveTouchEnd = this.handleTaskMoveTouchEnd.bind(this);
        this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
        this.handleNoEditableTaskMouseUp =
            this.handleNoEditableTaskMouseUp.bind(this);
    }
    TasksController.prototype.attachEvents = function () {
        this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
        if (this.root.api.allowMobileTaskMove ||
            this.root.api.allowMobileTaskResize) {
            this.root.controller.on('touchstart', this.handleTouchStart.bind(this));
        }
        this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
        this.root.controller.on('mouseup', this.handleMouseUp.bind(this));
        this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
    };
    TasksController.prototype.destroyEvents = function () {
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
        document.removeEventListener('mouseup', this.handleAddDepMouseUp);
        document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
        document.removeEventListener('mouseup', this.handleNoEditableTaskMouseUp);
    };
    TasksController.prototype.handleTouchEnd = function (event) {
        var eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        if (this.initialMouseDownOffsetX === eventOffsets.offsetX ||
            this.root.api.isLoading)
            this.module.service.handleClickTask(eventOffsets);
    };
    TasksController.prototype.handleMouseDown = function (event) {
        if (this.root.api.isLoading)
            return;
        var _a = this.module.service.getHoverId(event), hoverId = _a.hoverId, resize = _a.resize, depFromId = _a.depFromId;
        if (!hoverId)
            return;
        this.initialMouseDownOffsetX = event.offsetX;
        this.mouseDownOffsetX = event.offsetX;
        if (this.module.service.isNoEditableTask(hoverId)) {
            document.addEventListener('mouseup', this.handleNoEditableTaskMouseUp);
        }
        else if (depFromId) {
            this.addDepMode = true;
            this.destroyAddDepMove = this.root.controller.on('mousemove', this.handleAddDepMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleAddDepMouseUp);
        }
        else if (resize) {
            this.resizeMoveMode = resize;
            this.destroyResizeMove = this.root.controller.on('mousemove', this.handleResizeTaskMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleResizeMouseUp);
        }
        else {
            this.destroyTaskMove = this.root.controller.on('mousemove', this.handleTaskMove.bind(this));
            document.addEventListener('mouseup', this.handleTaskMoveMouseUp);
        }
    };
    TasksController.prototype.handleMouseMove = function (event) {
        if (this.resizeMoveMode)
            return;
        if (this.mouseDownOffsetX && !this.root.api.isLoading) {
            var hoverId = this.module.service.getHoverId(event).hoverId;
            return this.module.store.setHoverConnectionTask(hoverId);
        }
        this.updateHoverId(event);
    };
    TasksController.prototype.updateHoverId = function (event) {
        var _a = this.module.service.getHoverId(event), hoverId = _a.hoverId, resize = _a.resize, depFromId = _a.depFromId;
        this.module.store.setHoverId(hoverId, resize, depFromId);
    };
    /** Start Resize Task */
    TasksController.prototype.handleResizeTaskMouseMove = function (event) {
        if (this.shouldSkipMove(event.offsetX))
            return;
        this.moveOffsetX = event.offsetX;
        this.module.service.handleResizeTaskMouseMove(event);
    };
    TasksController.prototype.handleResizeTaskTouchMove = function (event) {
        var eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        if (this.shouldSkipMove(eventOffsets.offsetX, 35))
            return;
        this.moveOffsetX = eventOffsets.offsetX;
        this.module.service.handleResizeTaskMouseMove(eventOffsets);
    };
    TasksController.prototype.handleResizeMouseUp = function (event) {
        this.handleResizeEnd();
        this.updateHoverId(event);
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
    };
    TasksController.prototype.handleResizeTouchEnd = function () {
        this.handleResizeEnd();
        this.module.store.setHoverId(null, null, null);
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
    };
    TasksController.prototype.handleResizeEnd = function () {
        this.module.service.handleResizeTaskMouseUp();
        this.resizeMoveMode = null;
        this.mouseDownOffsetX = null;
        this.initialMouseDownOffsetX = null;
        this.isTouchAction = false;
        this.destroyResizeMove && this.destroyResizeMove();
    };
    /** End Resize Task */
    /** Start Add Dependencies */
    TasksController.prototype.handleAddDepMouseMove = function (event) {
        this.module.service.handleAddDepMouseMove(event);
    };
    TasksController.prototype.handleAddDepMouseUp = function (event) {
        this.mouseDownOffsetX = null;
        this.initialMouseDownOffsetX = null;
        this.addDepMode = false;
        this.isTouchAction = false;
        this.module.service.handleAddDepMouseUp(event);
        this.destroyAddDepMove && this.destroyAddDepMove();
        this.updateHoverId(event);
        document.removeEventListener('mouseup', this.handleAddDepMouseUp);
    };
    /** End Add Dependencies */
    /** Start Move Task */
    TasksController.prototype.handleTaskMove = function (event) {
        if (this.shouldSkipMove(event.offsetX))
            return;
        this.moveOffsetX = event.offsetX;
        this.module.service.handleMoveTaskMouseMove(event);
    };
    TasksController.prototype.handleTaskTouchMove = function (event) {
        var eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        if (this.shouldSkipMove(eventOffsets.offsetX, 35))
            return;
        this.moveOffsetX = eventOffsets.offsetX;
        this.module.service.handleMoveTaskMouseMove(eventOffsets);
    };
    // this method helps to prevent small, random mouse and touch moves
    TasksController.prototype.shouldSkipMove = function (offsetX, gap) {
        if (gap === void 0) { gap = 5; }
        return (offsetX > this.moveOffsetX - gap && offsetX < this.moveOffsetX + gap);
    };
    TasksController.prototype.handleTaskMoveMouseUp = function (event) {
        this.handleTaskMoveEnd();
        this.updateHoverId(event);
        document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
    };
    TasksController.prototype.handleTaskMoveTouchEnd = function () {
        this.handleTaskMoveEnd();
        this.module.store.setHoverId(null, null, null);
        document.removeEventListener('touchend', this.handleTaskMoveTouchEnd);
    };
    TasksController.prototype.handleTaskMoveEnd = function () {
        this.module.service.handleMoveTaskMouseUp();
        this.destroyTaskMove && this.destroyTaskMove();
        this.mouseDownOffsetX = null;
        this.initialMouseDownOffsetX = null;
        this.isTouchAction = false;
        this.module.store.setHoverConnectionTask(null);
    };
    /** End Move Task */
    TasksController.prototype.handleNoEditableTaskMouseUp = function () {
        this.mouseDownOffsetX = null;
        this.module.store.setHoverConnectionTask(null);
    };
    TasksController.prototype.handleMouseUp = function (event) {
        if (this.initialMouseDownOffsetX === event.offsetX ||
            this.root.api.isLoading)
            this.module.service.handleClickTask(event);
    };
    return TasksController;
}());

var TasksService = /** @class */ (function () {
    function TasksService(root, module) {
        this.intervalChangeOffset = null;
        this.scrollXOffset = null;
        this.root = root;
        this.module = module;
    }
    /** Start getters */
    TasksService.prototype.getRootStoreTaskById = function (id) {
        if (!id)
            return null;
        var task = this.root.api.tasks.find(function (task) { return task.id === id; });
        return task || null;
    };
    TasksService.prototype.getModuleStoreTaskById = function (id) {
        var task = this.module.store.tasksList[id];
        return task || null;
    };
    TasksService.prototype.getRenderedViewTaskById = function (id) {
        var task = this.module.view.tasks.find(function (task) { return task.id === id; });
        return task || null;
    };
    TasksService.prototype.getViewTaskById = function (id) {
        var _a = this.root.grid.view, rowHeight = _a.rowHeight, rowsOffsetY = _a.rowsOffsetY;
        var hoverId = this.module.store.hoverId;
        var dayType = this.root.grid.service.getDayType();
        var task = this.getModuleStoreTaskById(id);
        if (!task)
            return null;
        var index = this.module.store.tasks.indexOf(task);
        var _b = this.getTaskPos(task, dayType), x = _b.x, xx = _b.xx, error = _b.error;
        var w = xx - x;
        var offsetY = rowsOffsetY - this.root.view.offsetY;
        var y = rowHeight * index + offsetY;
        return _assign(_assign({}, task), { hover: hoverId === task.id, hoverConnection: this.module.store.hoverConnectionTask === id, y: y, x: x, w: w, error: error });
    };
    TasksService.prototype.getStoreDependedTasksById = function (id, tasks) {
        var _this = this;
        if (tasks === void 0) { tasks = []; }
        var task = this.getRootStoreTaskById(id);
        if (!task)
            return tasks;
        tasks.push(task);
        task.next_ids.forEach(function (id) {
            if (tasks.find(function (task) { return task.id === id; }))
                return;
            tasks = _this.getStoreDependedTasksById(id, tasks);
        });
        return tasks;
    };
    TasksService.prototype.getHoveredTask = function () {
        return this.getRootStoreTaskById(this.module.store.hoverId);
    };
    TasksService.prototype.getTaskPos = function (task, dayType) {
        if (dayType === void 0) { dayType = 'day'; }
        var fullDay = task.all_day || !this.root.api.showTime;
        var x = fullDay
            ? this.root.grid.service.getPosXByFullDayTs(task.start_date_ts, false, dayType)
            : this.root.grid.service.getPosXByTs(task.start_date_ts);
        var xx = fullDay
            ? this.root.grid.service.getPosXByFullDayTs(task.end_date_ts, true, dayType)
            : this.root.grid.service.getPosXByTs(task.end_date_ts);
        var error = false;
        var minTaskWidth = this.root.api.minTaskWidth;
        if (xx < x)
            error = true;
        if (minTaskWidth && xx - minTaskWidth < x)
            xx = x + minTaskWidth;
        return { x: x, xx: xx, error: error };
    };
    TasksService.prototype.getFirstTaskByDeadline = function () {
        var task = this.root.api.tasks.reduce(function (prev, item) {
            if (!prev)
                return item;
            if (prev.start_date_ts > item.start_date_ts)
                return item;
            return prev;
        }, this.root.api.tasks[0]);
        return task;
    };
    TasksService.prototype.getLastTaskByDeadline = function () {
        var task = this.root.api.tasks.reduce(function (prev, item) {
            if (!prev)
                return item;
            if (prev.end_date_ts < item.end_date_ts)
                return item;
            return prev;
        }, this.root.api.tasks[0]);
        return task;
    };
    TasksService.prototype.getFirstDeadline = function () {
        var _a;
        var firstTask = this.getFirstTaskByDeadline();
        return (_a = firstTask === null || firstTask === void 0 ? void 0 : firstTask.start_date_ts) !== null && _a !== void 0 ? _a : 0;
    };
    TasksService.prototype.getLastDeadline = function () {
        var _a;
        var lastTask = this.getLastTaskByDeadline();
        return (_a = lastTask === null || lastTask === void 0 ? void 0 : lastTask.end_date_ts) !== null && _a !== void 0 ? _a : 0;
    };
    TasksService.prototype.getFirstAndLastDeadline = function () {
        var start_date_ts = this.getFirstDeadline();
        var end_date_ts = this.getLastDeadline();
        return [start_date_ts, end_date_ts];
    };
    TasksService.prototype.isNoEditableTask = function (id) {
        var task = this.getRootStoreTaskById(id);
        return task ? task.noEditable : false;
    };
    /** End getters */
    /** Start commons */
    TasksService.prototype.getHoverId = function (event) {
        var hoverId = null;
        var resize = null;
        var depFromId = null;
        var _a = this.module.view, tasks = _a.tasks, taskEntity = _a.taskEntity;
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var item = tasks_1[_i];
            var data = taskEntity.isHover(event, item);
            if (data.depFrom)
                depFromId = item.id;
            if (data.resize)
                resize = data.resize;
            if (data.hover) {
                hoverId = item.id;
                break;
            }
        }
        return { hoverId: hoverId, resize: resize, depFromId: depFromId };
    };
    TasksService.prototype.scrollX = function (event) {
        var _this = this;
        var offsetX = event.offsetX;
        var width = this.root.view.canvasWidth;
        var colWidth = this.root.grid.view.colWidth;
        var pos = offsetX / width;
        var changeOffsetValue = 0;
        if (pos > 0.9 && this.scrollXOffset && offsetX > this.scrollXOffset) {
            changeOffsetValue = colWidth;
        }
        else if (pos < 0.1 &&
            this.scrollXOffset &&
            offsetX < this.scrollXOffset)
            changeOffsetValue = -colWidth;
        this.scrollXOffset = offsetX;
        var tick = this.root.api.viewMode === 'month' ? 132 : 66;
        if (changeOffsetValue !== 0 && !this.intervalChangeOffset) {
            this.intervalChangeOffset = setInterval(function () {
                _this.module.controller.mouseDownOffsetX =
                    (_this.module.controller.mouseDownOffsetX || 0) -
                        changeOffsetValue;
                if (_this.module.controller.addDepMode)
                    _this.updateDepOffsets(offsetX);
                else if (_this.module.controller.resizeMoveMode)
                    _this.resizeTaskByResizeMode(offsetX);
                else
                    _this.moveTask(offsetX);
                _this.root.view.handleChangeOffsetX(changeOffsetValue);
            }, tick);
        }
        else if (changeOffsetValue === 0) {
            this.clearScrollInterval();
        }
    };
    TasksService.prototype.clearScrollInterval = function () {
        if (this.intervalChangeOffset) {
            clearInterval(this.intervalChangeOffset);
            this.intervalChangeOffset = null;
        }
    };
    TasksService.prototype.getDiff = function (offsetX, all_day) {
        if (all_day === void 0) { all_day = false; }
        var offsetDiff = offsetX - (this.module.controller.mouseDownOffsetX || 0);
        var diff = this.root.grid.service.getTsByOffsetDiff(offsetDiff);
        if (all_day || !this.root.api.showTime) {
            var colTs = this.getColTsForDiff(all_day);
            var dayDiff = (diff - (diff % colTs)) / colTs;
            diff = colTs * dayDiff;
        }
        return diff;
    };
    TasksService.prototype.getColTsForDiff = function (all_day) {
        if (all_day === void 0) { all_day = false; }
        if (!all_day && !this.root.api.showTime) {
            if (this.root.api.viewMode === 'half-day')
                return this.root.grid.view.halfDayTs;
            else if (this.root.api.viewMode === 'quarter-day')
                return this.root.grid.view.quarterDayTs;
            else if (this.root.api.viewMode === 'three-hours')
                return this.root.grid.view.threeHoursTs;
            else if (this.root.api.viewMode === 'hour')
                return this.root.grid.view.hourTs;
        }
        return this.root.grid.view.dayTs;
    };
    /** End commons */
    TasksService.prototype.handleClickTask = function (event) {
        if (!this.root.api.handleTaskClick)
            return;
        var _a = this.getHoverId(event), hoverId = _a.hoverId, depFromId = _a.depFromId;
        if (!hoverId || depFromId)
            return;
        var hoveredTask = this.getRootStoreTaskById(hoverId);
        if (!hoveredTask)
            return;
        this.root.api.handleTaskClick(hoveredTask);
    };
    TasksService.prototype.scrollToTask = function (id) {
        this.scrollToTaskX(id);
        this.scrollToTaskY(id);
    };
    TasksService.prototype.scrollToTaskX = function (id) {
        var task = this.getRootStoreTaskById(id);
        if (!task)
            return;
        this.root.grid.service.showDay(task.start_date_ts, true, true);
    };
    TasksService.prototype.scrollToTaskY = function (id) {
        var viewTask = this.getViewTaskById(id);
        if (!viewTask)
            return;
        var offsetY = this.root.view.offsetY - this.root.grid.view.rowsOffsetY;
        var maxHeight = this.root.grid.service.getLeftAvailableHeight();
        var y = viewTask.y + offsetY;
        if (y > maxHeight)
            y = maxHeight;
        this.root.view.handleSetOffsetY(y, true, true);
    };
    /** Start Add Dependencies */
    TasksService.prototype.handleAddDepMouseMove = function (event) {
        if (this.intervalChangeOffset) {
            this.updateDepOffsets(undefined, event.offsetY);
            return this.scrollX(event);
        }
        this.updateDepOffsets(event.offsetX, event.offsetY);
        this.scrollX(event);
        this.root.render();
    };
    TasksService.prototype.handleAddDepMouseUp = function (event) {
        var hoverId = this.getHoverId(event).hoverId;
        if (hoverId &&
            this.module.store.hoverId &&
            hoverId !== this.module.store.hoverId) {
            var hoveredTask = this.getRootStoreTaskById(hoverId);
            var currentTask = this.getRootStoreTaskById(this.module.store.hoverId);
            if (hoveredTask &&
                currentTask &&
                !currentTask.next_ids.includes(hoverId)) {
                var task = _assign(_assign({}, currentTask), { next_ids: __spreadArray(__spreadArray([], currentTask.next_ids), [hoverId]) });
                this.module.store.addModTask(task);
                this.module.store.saveModTasks();
                this.root.api.handleChange &&
                    this.root.api.handleChange([task]);
            }
        }
        this.clearScrollInterval();
        this.module.store.updateDepOffsets(null, null);
        this.module.store.setHoverConnectionTask(null);
        if (hoverId && hoverId === this.module.store.hoverId)
            this.root.render();
    };
    TasksService.prototype.updateDepOffsets = function (offsetX, offsetY) {
        this.module.store.updateDepOffsets(offsetX, offsetY);
    };
    /** End Add Dependencies */
    /** Start Resize Task */
    TasksService.prototype.handleResizeTaskMouseMove = function (event) {
        if (this.intervalChangeOffset)
            return this.scrollX(event);
        this.resizeTaskByResizeMode(event.offsetX);
        this.scrollX(event);
        this.root.render();
    };
    TasksService.prototype.resizeTaskByResizeMode = function (offsetX) {
        var resizeMoveMode = this.module.controller.resizeMoveMode;
        var task = this.getHoveredTask();
        if (!task)
            return;
        var diff = this.getDiff(offsetX, task.all_day);
        if (resizeMoveMode === 'right') {
            this.resizeTaskRightSide(task, diff);
        }
        else if (resizeMoveMode === 'left') {
            this.resizeTaskLeftSide(task, diff);
        }
    };
    TasksService.prototype.resizeTaskRightSide = function (task, diff) {
        if (this.root.api.moveDependedOnResizeRight)
            this.saveResizeDependedTasksRightSide(task, diff);
        else
            this.saveResizeCurrentTaskRight(task, diff);
    };
    TasksService.prototype.resizeTaskLeftSide = function (task, diff) {
        if (this.root.api.moveDependedOnResizeLeft)
            this.saveResizeDependedTasksLeftSide(task, diff);
        else
            this.saveResizeCurrentTaskLeft(task, diff);
    };
    TasksService.prototype.saveResizeDependedTasksRightSide = function (task, diff) {
        var _this = this;
        var tasks = this.getStoreDependedTasksById(task.id);
        tasks.forEach(function (el) {
            if (el.id === task.id)
                _this.saveResizeCurrentTaskRight(el, diff);
            else
                _this.saveMoveTask(el, diff);
        });
    };
    TasksService.prototype.saveResizeCurrentTaskRight = function (task, diff) {
        var newTask = _assign(_assign({}, task), { end_date_ts: task.end_date_ts + diff });
        if (newTask.start_date_ts > newTask.end_date_ts) {
            if (!task.all_day)
                newTask.start_date_ts = newTask.end_date_ts;
            else {
                var days = Math.floor((newTask.start_date_ts - newTask.end_date_ts) /
                    this.root.grid.view.dayTs) + 1;
                var start = new Date(newTask.start_date_ts);
                start.setDate(start.getDate() - days);
                newTask.start_date_ts = start.getTime();
            }
        }
        this.module.store.addModTask(newTask);
    };
    TasksService.prototype.saveResizeDependedTasksLeftSide = function (task, diff) {
        var _this = this;
        var tasks = this.getStoreDependedTasksById(task.id);
        tasks.forEach(function (el) {
            if (el.id === task.id)
                _this.saveResizeCurrentTaskLeft(el, diff);
            else
                _this.saveMoveTask(el, diff);
        });
    };
    TasksService.prototype.saveResizeCurrentTaskLeft = function (task, diff) {
        var newTask = _assign(_assign({}, task), { start_date_ts: task.start_date_ts + diff });
        if (newTask.start_date_ts > newTask.end_date_ts) {
            if (!task.all_day)
                newTask.end_date_ts = newTask.start_date_ts;
            else {
                var days = Math.floor((newTask.start_date_ts - newTask.end_date_ts) /
                    this.root.grid.view.dayTs) + 1;
                var end = new Date(newTask.end_date_ts);
                end.setDate(end.getDate() + days);
                newTask.end_date_ts = end.getTime();
            }
        }
        this.module.store.addModTask(newTask);
    };
    TasksService.prototype.handleResizeTaskMouseUp = function () {
        var tasks = Object.values(this.module.store.modifiedTasks);
        this.root.api.handleChange && this.root.api.handleChange(tasks);
        this.clearScrollInterval();
        this.module.store.saveModTasks();
    };
    /** End Resize Task */
    /** Start Move Task */
    TasksService.prototype.handleMoveTaskMouseMove = function (event) {
        if (this.intervalChangeOffset)
            return this.scrollX(event);
        this.moveTask(event.offsetX);
        this.scrollX(event);
        this.root.render();
    };
    TasksService.prototype.moveTask = function (offsetX) {
        var task = this.getHoveredTask();
        if (!task || !this.module.controller.mouseDownOffsetX)
            return;
        var diff = this.getDiff(offsetX, task.all_day);
        if (this.root.api.moveDependedOnMove) {
            this.moveDependedTasks(task, diff);
        }
        else {
            this.saveMoveTask(task, diff);
        }
    };
    TasksService.prototype.moveDependedTasks = function (task, diff) {
        var _this = this;
        var tasks = this.getStoreDependedTasksById(task.id);
        tasks.forEach(function (el) { return _this.saveMoveTask(el, diff); });
    };
    TasksService.prototype.saveMoveTask = function (task, diff) {
        if (task.noEditable)
            return;
        var newTask = _assign(_assign({}, task), { start_date_ts: task.start_date_ts + diff, end_date_ts: task.end_date_ts + diff });
        this.module.store.addModTask(newTask);
    };
    TasksService.prototype.handleMoveTaskMouseUp = function () {
        var tasks = Object.values(this.module.store.modifiedTasks);
        this.root.api.handleChange && this.root.api.handleChange(tasks);
        this.clearScrollInterval();
        this.module.store.saveModTasks();
    };
    return TasksService;
}());

var TasksModule = /** @class */ (function () {
    function TasksModule(root) {
        this.root = root;
        this.store = new TasksStore(root);
        this.service = new TasksService(root, this);
        this.view = new TasksView(root, this);
        this.controller = new TasksController(root, this);
    }
    TasksModule.prototype.init = function () {
        this.controller.attachEvents();
    };
    TasksModule.prototype.destroy = function () {
        this.controller.destroyEvents();
    };
    return TasksModule;
}());

var RootService = /** @class */ (function () {
    function RootService(root) {
        var _this = this;
        this.convertColorDiv = null;
        this.colorsCache = {};
        this.clearColorsCache = function () {
            _this.colorsCache = {};
        };
        this.convertOptionalColor = function (color) {
            if (color)
                return _this.convertColor(color);
            return undefined;
        };
        this.convertColor = function (color, defaultColor) {
            if (!color.includes('var'))
                return color;
            if (_this.colorsCache[color])
                return _this.colorsCache[color];
            if (!_this.convertColorDiv) {
                _this.convertColorDiv = document.createElement('div');
                _this.root.root.appendChild(_this.convertColorDiv);
            }
            _this.convertColorDiv.style.color = color;
            var newColor = window
                .getComputedStyle(_this.convertColorDiv, null)
                .getPropertyValue('color');
            if (!newColor && defaultColor)
                return defaultColor;
            return newColor;
        };
        this.unmountConvertColorDiv = function () {
            if (!_this.convertColorDiv)
                return;
            _this.root.root.removeChild(_this.convertColorDiv);
            _this.convertColorDiv = null;
        };
        this.root = root;
    }
    return RootService;
}());

var COLORS = {
    WHITE: '#fff',
    BLACK: '#222',
    L_GREY: '#EAEAEA',
    GREY: '#ccc',
    L_BLUE: '#f8fdff',
    BLUE: '#283593',
    D_BLUE: '#001064',
    VIOLET: '#ae52d4',
    D_VIOLET: '#7b1fa2',
};
var MONTH_NAMES = {
    ru: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    en: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
};
var WEEKDAY_NAMES = {
    ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    en: ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'],
};

function animate(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1)
            timeFraction = 1;
        // текущее состояние анимации
        var progress = options.timing(timeFraction);
        options.draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}
var timing = makeEaseOut(circle);
function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    };
}
function circle(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
}

var RootApi = /** @class */ (function () {
    function RootApi(root, props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63;
        this.root = root;
        this.tasks = props.tasks;
        this.moveDependedOnResizeRight =
            (_a = props.moveDependedOnResizeRight) !== null && _a !== void 0 ? _a : true;
        this.moveDependedOnResizeLeft = (_b = props.moveDependedOnResizeLeft) !== null && _b !== void 0 ? _b : false;
        this.moveDependedOnMove = (_c = props.moveDependedOnMove) !== null && _c !== void 0 ? _c : true;
        this.showTime = (_d = props.showTime) !== null && _d !== void 0 ? _d : false;
        this.startFromToday = (_e = props.startFromToday) !== null && _e !== void 0 ? _e : true;
        this.renderAllTasksFromStart = (_f = props.renderAllTasksFromStart) !== null && _f !== void 0 ? _f : true;
        this.showMonthMiddle = (_g = props.showMonthMiddle) !== null && _g !== void 0 ? _g : false;
        this.showMonthFromStartOnDayView =
            (_h = props.showMonthFromStartOnDayView) !== null && _h !== void 0 ? _h : false;
        this.viewMode = (_j = props.viewMode) !== null && _j !== void 0 ? _j : 'day';
        this.isLoading = (_k = props.isLoading) !== null && _k !== void 0 ? _k : false;
        this.monthNames = _assign(_assign({}, MONTH_NAMES), ((_l = props.monthNames) !== null && _l !== void 0 ? _l : {}));
        this.weekdayNames = _assign(_assign({}, WEEKDAY_NAMES), ((_m = props.weekdayNames) !== null && _m !== void 0 ? _m : {}));
        this.lang = (_o = props.lang) !== null && _o !== void 0 ? _o : 'ru';
        this._background = (_p = props.background) !== null && _p !== void 0 ? _p : COLORS.WHITE;
        this.scale = (_q = props.scale) !== null && _q !== void 0 ? _q : 1;
        this.allowMobileTaskMove = (_r = props.allowMobileTaskMove) !== null && _r !== void 0 ? _r : false;
        this.allowMobileTaskResize = (_s = props.allowMobileTaskResize) !== null && _s !== void 0 ? _s : false;
        this.monthHeight = (_t = props.monthHeight) !== null && _t !== void 0 ? _t : 55;
        this.renderMonthBottomLine = (_u = props.renderMonthBottomLine) !== null && _u !== void 0 ? _u : true;
        this.renderMonthLeftLine = (_v = props.renderMonthLeftLine) !== null && _v !== void 0 ? _v : true;
        this._monthLineColor = (_w = props.monthLineColor) !== null && _w !== void 0 ? _w : COLORS.L_GREY;
        this.monthTitleFont = (_x = props.monthTitleFont) !== null && _x !== void 0 ? _x : '600 20px Arial';
        this._monthTitleColor = (_y = props.monthTitleColor) !== null && _y !== void 0 ? _y : COLORS.BLACK;
        this.monthTitleShowYear = (_z = props.monthTitleShowYear) !== null && _z !== void 0 ? _z : true;
        this._dayHeight = props.dayHeight
            ? props.dayHeight
            : props.showDayWeekday
                ? 48
                : 28;
        this.renderDayStartMonthLine = (_0 = props.renderDayStartMonthLine) !== null && _0 !== void 0 ? _0 : true;
        this._dayStartMonthLine = (_1 = props.dayStartMonthLine) !== null && _1 !== void 0 ? _1 : COLORS.L_GREY;
        this._dayBottomLineColor = (_2 = props.dayBottomLineColor) !== null && _2 !== void 0 ? _2 : COLORS.L_GREY;
        this._dayTodayBackground = (_3 = props.dayTodayBackground) !== null && _3 !== void 0 ? _3 : COLORS.L_BLUE;
        this._dayHeaderBackground = props.dayHeaderBackground;
        this._dayHeaderTodayBackground = props.dayHeaderTodayBackground;
        this._dayHeaderWeekendBackground = props.dayHeaderWeekendBackground;
        this._dayWeekendBackground = props.dayWeekendBackground;
        this._dayWeekendColor = props.dayWeekendColor;
        this.showDayWeekday = (_4 = props.showDayWeekday) !== null && _4 !== void 0 ? _4 : false;
        this.dayFontSize = (_5 = props.dayFontSize) !== null && _5 !== void 0 ? _5 : 14;
        this.dayFontLineHeight = (_6 = props.dayFontLineHeight) !== null && _6 !== void 0 ? _6 : this.dayFontSize;
        this.dayFontWeight = (_7 = props.dayFontWeight) !== null && _7 !== void 0 ? _7 : 500;
        this.dayFontFamily = (_8 = props.dayFontFamily) !== null && _8 !== void 0 ? _8 : 'Arial';
        this._dayColor = (_9 = props.dayColor) !== null && _9 !== void 0 ? _9 : COLORS.BLACK;
        this.weekdayFontSize = (_10 = props.weekdayFontSize) !== null && _10 !== void 0 ? _10 : 14;
        this.weekdayFontLineHeight =
            (_11 = props.weekdayFontLineHeight) !== null && _11 !== void 0 ? _11 : this.weekdayFontSize;
        this.weekdayFontWeight = (_12 = props.weekdayFontWeight) !== null && _12 !== void 0 ? _12 : 500;
        this.weekdayFontFamily = (_13 = props.weekdayFontFamily) !== null && _13 !== void 0 ? _13 : 'Arial';
        this._weekdayColor = (_14 = props.weekdayColor) !== null && _14 !== void 0 ? _14 : COLORS.BLACK;
        this._weekdayWeekendColor = props.weekdayWeekendColor;
        this._dayColWidth = (_15 = props.dayColWidth) !== null && _15 !== void 0 ? _15 : 40;
        this._weekViewColWidth = (_16 = props.weekViewColWidth) !== null && _16 !== void 0 ? _16 : 120;
        this._monthViewColWidth = (_17 = props.monthViewColWidth) !== null && _17 !== void 0 ? _17 : 180;
        this._rowHeight = (_18 = props.rowHeight) !== null && _18 !== void 0 ? _18 : 40;
        this._colLineColor = (_19 = props.colLineColor) !== null && _19 !== void 0 ? _19 : COLORS.L_GREY;
        this._colStartMonthLineColor = props.colStartMonthLineColor;
        this._rowLineColor = (_20 = props.rowLineColor) !== null && _20 !== void 0 ? _20 : COLORS.L_GREY;
        this._rowEvenBackground = (_21 = props.rowEvenBackground) !== null && _21 !== void 0 ? _21 : COLORS.WHITE;
        this._rowOddBackground = (_22 = props.rowOddBackground) !== null && _22 !== void 0 ? _22 : COLORS.WHITE;
        this._taskDefaultBackground =
            (_23 = props.taskDefaultBackground) !== null && _23 !== void 0 ? _23 : COLORS.VIOLET;
        this._taskDefaultHoverBackground =
            (_24 = props.taskDefaultHoverBackground) !== null && _24 !== void 0 ? _24 : COLORS.D_VIOLET;
        this._taskDefaultStrokeColor = props.taskDefaultStrokeColor;
        this._taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
        this._taskDefaultColor = (_25 = props.taskDefaultColor) !== null && _25 !== void 0 ? _25 : COLORS.WHITE;
        this._taskDefaultHoverColor =
            (_26 = props.taskDefaultHoverColor) !== null && _26 !== void 0 ? _26 : COLORS.WHITE;
        this._taskDefaultOutlineColor =
            (_27 = props.taskDefaultOutlineColor) !== null && _27 !== void 0 ? _27 : COLORS.BLACK;
        this._taskDefaultSubtitleColor =
            (_28 = props.taskDefaultSubtitleColor) !== null && _28 !== void 0 ? _28 : COLORS.WHITE;
        this._taskDefaultSubtitleOutlineColor =
            (_29 = props.taskDefaultSubtitleOutlineColor) !== null && _29 !== void 0 ? _29 : COLORS.BLACK;
        this._taskSubtitleOffset = (_30 = props.taskSubtitleOffset) !== null && _30 !== void 0 ? _30 : 10;
        this._taskHeight = (_31 = props.taskHeight) !== null && _31 !== void 0 ? _31 : 34;
        this._taskPadding = (_32 = props.taskPadding) !== null && _32 !== void 0 ? _32 : 5;
        this._taskRadius = (_33 = props.taskRadius) !== null && _33 !== void 0 ? _33 : 2;
        this.taskFontSize = (_34 = props.taskFontSize) !== null && _34 !== void 0 ? _34 : 16;
        this.taskFontLineHeight = (_35 = props.taskFontLineHeight) !== null && _35 !== void 0 ? _35 : this.taskFontSize;
        this.taskFontWeight = (_36 = props.taskFontWeight) !== null && _36 !== void 0 ? _36 : 400;
        this.taskFontFamily = (_37 = props.taskFontFamily) !== null && _37 !== void 0 ? _37 : 'serif';
        this._taskErrorStrokeColor = props.taskErrorStrokeColor;
        this._minTaskWidth = (_38 = props.minTaskWidth) !== null && _38 !== void 0 ? _38 : 10;
        this.taskRenderResizeControls = (_39 = props.taskRenderResizeControls) !== null && _39 !== void 0 ? _39 : true;
        this._taskRenderResizeControlsWidth =
            (_40 = props.taskRenderResizeControlsWidth) !== null && _40 !== void 0 ? _40 : 6;
        this._taskRenderResizeControlsColor =
            (_41 = props.taskRenderResizeControlsColor) !== null && _41 !== void 0 ? _41 : COLORS.WHITE;
        this.taskRenderResizeControlsRadius =
            (_42 = props.taskRenderResizeControlsRadius) !== null && _42 !== void 0 ? _42 : 2;
        this.taskRenderDepControl = (_43 = props.taskRenderDepControl) !== null && _43 !== void 0 ? _43 : true;
        this._taskRenderDepRadius = (_44 = props.taskRenderDepRadius) !== null && _44 !== void 0 ? _44 : 7;
        this._taskRenderDepOffsetX = (_45 = props.taskRenderDepOffsetX) !== null && _45 !== void 0 ? _45 : 7;
        this._taskRenderDepLineWidth = (_46 = props.taskRenderDepLineWidth) !== null && _46 !== void 0 ? _46 : 1;
        this._taskRenderDepLineColor =
            (_47 = props.taskRenderDepLineColor) !== null && _47 !== void 0 ? _47 : COLORS.BLACK;
        this._taskRenderDepBackground =
            (_48 = props.taskRenderDepBackground) !== null && _48 !== void 0 ? _48 : COLORS.WHITE;
        this._arrowColor = (_49 = props.arrowColor) !== null && _49 !== void 0 ? _49 : COLORS.BLUE;
        this._arrowWidth = (_50 = props.arrowWidth) !== null && _50 !== void 0 ? _50 : 1;
        this._arrowActiveColor = (_51 = props.arrowActiveColor) !== null && _51 !== void 0 ? _51 : COLORS.D_BLUE;
        this._arrowHoverColor = (_52 = props.arrowHoverColor) !== null && _52 !== void 0 ? _52 : COLORS.D_VIOLET;
        this._arrowHoverWidth = (_53 = props.arrowHoverWidth) !== null && _53 !== void 0 ? _53 : 2;
        this._arrowHoverHeadWidth = (_54 = props.arrowHoverHeadWidth) !== null && _54 !== void 0 ? _54 : 2;
        this._arrowRadius = (_55 = props.arrowRadius) !== null && _55 !== void 0 ? _55 : 2;
        this.scrollbarXHeight = (_56 = props.scrollbarXHeight) !== null && _56 !== void 0 ? _56 : 12;
        this._scrollbarXBackground =
            (_57 = props.scrollbarXBackground) !== null && _57 !== void 0 ? _57 : COLORS.L_GREY;
        this._scrollbarXLineBackground =
            (_58 = props.scrollbarXLineBackground) !== null && _58 !== void 0 ? _58 : COLORS.GREY;
        this.scrollbarXLineRadius = (_59 = props.scrollbarXLineRadius) !== null && _59 !== void 0 ? _59 : 6;
        this.scrollbarYWidth = (_60 = props.scrollbarYWidth) !== null && _60 !== void 0 ? _60 : 12;
        this._scrollbarYBackground =
            (_61 = props.scrollbarYBackground) !== null && _61 !== void 0 ? _61 : COLORS.L_GREY;
        this._scrollbarYLineBackground =
            (_62 = props.scrollbarYLineBackground) !== null && _62 !== void 0 ? _62 : COLORS.GREY;
        this.scrollbarYLineRadius = (_63 = props.scrollbarYLineRadius) !== null && _63 !== void 0 ? _63 : 6;
        this.handleChange = props.handleChange;
        this.handleTaskClick = props.handleTaskClick;
    }
    Object.defineProperty(RootApi.prototype, "dayHeight", {
        /**
         * Start Scale
         */
        get: function () {
            return this._dayHeight * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskSubtitleOffset", {
        get: function () {
            return this._taskSubtitleOffset * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskHeight", {
        get: function () {
            return this._taskHeight * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskPadding", {
        get: function () {
            return this._taskPadding * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRadius", {
        get: function () {
            return this._taskRadius * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "minTaskWidth", {
        get: function () {
            return this._minTaskWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderResizeControlsWidth", {
        get: function () {
            return this._taskRenderResizeControlsWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderDepOffsetX", {
        get: function () {
            return this._taskRenderDepOffsetX * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderDepLineWidth", {
        get: function () {
            return this._taskRenderDepLineWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowWidth", {
        get: function () {
            return this._arrowWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowHoverWidth", {
        get: function () {
            return this._arrowHoverWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowHoverHeadWidth", {
        get: function () {
            return this._arrowHoverHeadWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowRadius", {
        get: function () {
            return this._arrowRadius * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayColWidth", {
        get: function () {
            return this._dayColWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "weekViewColWidth", {
        get: function () {
            return this._weekViewColWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "monthViewColWidth", {
        get: function () {
            return this._monthViewColWidth * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "rowHeight", {
        get: function () {
            return this._rowHeight * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderDepRadius", {
        get: function () {
            return this._taskRenderDepRadius * this.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayFont", {
        get: function () {
            var size = this.dayFontSize * this.scale;
            var lineHeight = this.dayFontLineHeight * this.scale;
            return this.dayFontWeight + " " + size + "px/" + lineHeight + "px " + this.dayFontFamily;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "weekdayFont", {
        get: function () {
            var size = this.weekdayFontSize * this.scale;
            var lineHeight = this.weekdayFontLineHeight * this.scale;
            return this.weekdayFontWeight + " " + size + "px/" + lineHeight + "px " + this.weekdayFontFamily;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskFont", {
        get: function () {
            var size = this.taskFontSize * this.scale;
            var lineHeight = this.taskFontLineHeight * this.scale;
            return this.taskFontWeight + " " + size + "px/" + lineHeight + "px " + this.taskFontFamily;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "background", {
        /**
         * End Scale
         */
        /**
         * Start Colors
         */
        get: function () {
            return this.root.service.convertColor(this._background, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "monthLineColor", {
        get: function () {
            return this.root.service.convertColor(this._monthLineColor, COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "monthTitleColor", {
        get: function () {
            return this.root.service.convertColor(this._monthTitleColor, COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayStartMonthLine", {
        get: function () {
            return this.root.service.convertColor(this._dayStartMonthLine, COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayBottomLineColor", {
        get: function () {
            return this.root.service.convertColor(this._dayBottomLineColor, COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayTodayBackground", {
        get: function () {
            return this.root.service.convertColor(this._dayTodayBackground, COLORS.L_BLUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayHeaderBackground", {
        get: function () {
            return this.root.service.convertOptionalColor(this._dayHeaderBackground);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayHeaderTodayBackground", {
        get: function () {
            return this.root.service.convertOptionalColor(this._dayHeaderTodayBackground);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayHeaderWeekendBackground", {
        get: function () {
            return this.root.service.convertOptionalColor(this._dayHeaderWeekendBackground);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayWeekendBackground", {
        get: function () {
            return this.root.service.convertOptionalColor(this._dayWeekendBackground);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayWeekendColor", {
        get: function () {
            return this.root.service.convertOptionalColor(this._dayWeekendColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayColor", {
        get: function () {
            return this.root.service.convertColor(this._dayColor, COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "weekdayColor", {
        get: function () {
            return this.root.service.convertColor(this._weekdayColor, COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "weekdayWeekendColor", {
        get: function () {
            return this.root.service.convertOptionalColor(this._weekdayWeekendColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "colLineColor", {
        get: function () {
            return this.root.service.convertColor(this._colLineColor, COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "colStartMonthLineColor", {
        get: function () {
            return this.root.service.convertOptionalColor(this._colStartMonthLineColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "rowLineColor", {
        get: function () {
            return this.root.service.convertColor(this._rowLineColor, COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "rowEvenBackground", {
        get: function () {
            return this.root.service.convertColor(this._rowEvenBackground, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "rowOddBackground", {
        get: function () {
            return this.root.service.convertColor(this._rowOddBackground, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultBackground", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultBackground, COLORS.VIOLET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultHoverBackground", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultHoverBackground, COLORS.D_VIOLET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultStrokeColor", {
        get: function () {
            return this.root.service.convertOptionalColor(this._taskDefaultStrokeColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultHoverStrokeColor", {
        get: function () {
            return this.root.service.convertOptionalColor(this._taskDefaultHoverStrokeColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultColor, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultHoverColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultHoverColor, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultOutlineColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultOutlineColor, COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultSubtitleColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultSubtitleColor, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultSubtitleOutlineColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultSubtitleOutlineColor, COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskErrorStrokeColor", {
        get: function () {
            return this.root.service.convertOptionalColor(this._taskErrorStrokeColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderResizeControlsColor", {
        get: function () {
            return this.root.service.convertColor(this._taskRenderResizeControlsColor, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderDepLineColor", {
        get: function () {
            return this.root.service.convertColor(this._taskRenderDepLineColor, COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderDepBackground", {
        get: function () {
            return this.root.service.convertColor(this._taskRenderDepBackground, COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowColor", {
        get: function () {
            return this.root.service.convertColor(this._arrowColor, COLORS.BLUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowActiveColor", {
        get: function () {
            return this.root.service.convertColor(this._arrowActiveColor, COLORS.D_BLUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowHoverColor", {
        get: function () {
            return this.root.service.convertColor(this._arrowHoverColor, COLORS.D_VIOLET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarXBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarXBackground, COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarXLineBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarXLineBackground, COLORS.GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarYBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarYBackground, COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarYLineBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarYLineBackground, COLORS.GREY);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * End Colors
     */
    RootApi.prototype.updateTasks = function (tasks) {
        this.tasks = tasks;
        this.root.render();
    };
    RootApi.prototype.scrollToToday = function (scrollTop) {
        this.root.grid.service.showDay(undefined, true, true);
        if (scrollTop)
            this.root.view.handleSetOffsetY(0, true, true);
    };
    RootApi.prototype.scrollToTask = function (id) {
        this.root.tasks.service.scrollToTask(id);
    };
    RootApi.prototype.updateViewMode = function (mode) {
        var firstTsOnScreen = this.root.grid.view.firstTsOnScreen;
        this.viewMode = mode;
        this.root.grid.init();
        this.root.grid.service.showDay(firstTsOnScreen, true, false, false);
    };
    RootApi.prototype.updateIsLoading = function (isLoading) {
        this.isLoading = isLoading;
        if (isLoading)
            this.root.view.setCursor('progress');
        else if (this.root.tasks.store.hoverResize)
            this.root.view.setCursor('col-resize');
        else if (this.root.tasks.store.hoverId)
            this.root.view.setCursor('pointer');
        else
            this.root.view.setCursor('auto');
    };
    RootApi.prototype.updateScale = function (scale) {
        var _this = this;
        var initialScale = this.scale;
        var diff = scale - initialScale;
        var firstTsOnScreen = this.root.grid.view.firstTsOnScreen;
        animate({
            duration: 300,
            timing: timing,
            draw: function (progress) {
                _this.scale = initialScale + diff * progress;
                _this.root.grid.init();
                _this.root.grid.service.showDay(firstTsOnScreen, true, false, false);
                if (scale < initialScale) {
                    var height = _this.root.view.offsetY * scale;
                    var maxHeight = _this.root.grid.service.getLeftAvailableHeight();
                    if (height > maxHeight)
                        height = maxHeight;
                    _this.root.view.handleSetOffsetY(height);
                }
            },
        });
    };
    RootApi.prototype.updateColors = function () {
        this.root.service.clearColorsCache();
        this.root.render();
    };
    return RootApi;
}());

var ScrollbarXEntity = /** @class */ (function () {
    function ScrollbarXEntity(root) {
        this.mouseDownOffset = null;
        this.isHover = false;
        this.minLineWidth = 20;
        this.root = root;
        this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
        this.destroyHandleTouchEnd = this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
        this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
    }
    Object.defineProperty(ScrollbarXEntity.prototype, "height", {
        get: function () {
            return this.root.api.scrollbarXHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarXEntity.prototype, "top", {
        get: function () {
            return this.root.view.canvasHeight - this.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarXEntity.prototype, "backgroundLineWidth", {
        get: function () {
            return this.root.view.canvasWidth;
        },
        enumerable: false,
        configurable: true
    });
    ScrollbarXEntity.prototype.destroyEvents = function () {
        this.destroyHandleMouseDown();
        this.destroyMouseMove();
        this.destroyHandleTouchEnd();
    };
    ScrollbarXEntity.prototype.isLineClick = function (event) {
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var _a = this.getLineXAndWidth(), x = _a.x, width = _a.width;
        if (offsetX < x || offsetX > x + width)
            return false;
        if (offsetY < this.top)
            return false;
        return true;
    };
    ScrollbarXEntity.prototype.isBackgroundClick = function (event) {
        var offsetY = event.offsetY, offsetX = event.offsetX;
        return offsetY >= this.top && offsetX < this.backgroundLineWidth;
    };
    ScrollbarXEntity.prototype.handleMouseDown = function (event) {
        var isLineClick = this.isLineClick(event);
        var isBackgroundClick = this.isBackgroundClick(event);
        if (isLineClick)
            this.handleLinkMouseDown(event);
        else if (isBackgroundClick)
            this.handleBackgroundMouseDown(event);
        if (isLineClick || isBackgroundClick)
            this.root.controller.stopPropagation(event);
    };
    ScrollbarXEntity.prototype.handleTouchEnd = function (event) {
        var eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        var isBackgroundClick = this.isBackgroundClick(eventOffsets);
        if (!isBackgroundClick)
            return;
        this.handleBackgroundMouseDown(eventOffsets);
        this.root.controller.stopPropagation(event);
    };
    ScrollbarXEntity.prototype.handleLinkMouseDown = function (event) {
        this.mouseDownOffset = event.screenX;
        document.addEventListener('mousemove', this.handleMoveScrollbar);
        document.addEventListener('mouseup', this.handleMouseUp);
    };
    ScrollbarXEntity.prototype.handleBackgroundMouseDown = function (event) {
        var scaledOffset = this.getScaledOffset(event.offsetX);
        this.root.view.handleSetOffsetX(scaledOffset, true, true);
    };
    ScrollbarXEntity.prototype.getScaledOffset = function (offsetX) {
        var fullWidth = this.root.grid.service.getFullAvailableWidth();
        var scale = fullWidth / this.backgroundLineWidth;
        return scale * offsetX;
    };
    ScrollbarXEntity.prototype.handleMouseUp = function () {
        this.mouseDownOffset = null;
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMoveScrollbar);
    };
    ScrollbarXEntity.prototype.handleMouseMove = function (event) {
        var isLineClick = this.isLineClick(event);
        var isBackgroundClick = this.isBackgroundClick(event);
        if (isLineClick)
            this.root.view.setCursor('grab');
        else if (isBackgroundClick)
            this.root.view.setCursor('pointer');
        if (isLineClick || isBackgroundClick) {
            this.root.controller.stopPropagation(event);
            this.isHover = true;
        }
        else if (this.isHover) {
            this.isHover = false;
            this.root.view.setCursor('auto');
        }
    };
    ScrollbarXEntity.prototype.handleMoveScrollbar = function (event) {
        if (this.mouseDownOffset !== null) {
            var diff = event.screenX - this.mouseDownOffset;
            var offset = this.root.view.offsetX + this.getScaledOffset(diff);
            this.root.view.handleSetOffsetX(offset);
            this.mouseDownOffset = event.screenX;
        }
    };
    ScrollbarXEntity.prototype.renderBackground = function () {
        var ctx = this.root.ctx;
        ctx.fillStyle = this.root.api.scrollbarXBackground;
        ctx.fillRect(0, this.top, this.backgroundLineWidth, this.height);
    };
    ScrollbarXEntity.prototype.renderLine = function () {
        var ctx = this.root.ctx;
        var _a = this.getLineXAndWidth(), x = _a.x, width = _a.width;
        ctx.fillStyle = this.root.api.scrollbarXLineBackground;
        roundRect(ctx, x, this.top, width, this.height, this.root.api.scrollbarXLineRadius, this.root.api.scrollbarXLineBackground);
    };
    ScrollbarXEntity.prototype.getLineXAndWidth = function () {
        var fullWidth = this.root.grid.service.getFullAvailableWidth();
        var x = (this.root.view.offsetX / fullWidth) * this.backgroundLineWidth;
        var width = (this.backgroundLineWidth / fullWidth) * this.backgroundLineWidth;
        if (width < this.minLineWidth) {
            width = this.minLineWidth;
            if (x + width > this.root.view.canvasWidth - this.minLineWidth) {
                x = this.root.view.canvasWidth - width - this.minLineWidth;
            }
        }
        return { x: x, width: width };
    };
    ScrollbarXEntity.prototype.render = function () {
        this.renderBackground();
        this.renderLine();
    };
    return ScrollbarXEntity;
}());

var ScrollbarYEntity = /** @class */ (function () {
    function ScrollbarYEntity(root) {
        this.mouseDownOffset = null;
        this.bottomOffset = 12;
        this.minLineHeight = 20;
        this.isHover = false;
        this.root = root;
        this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
        this.destroyHandleTouchEnd = this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
        this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
    }
    Object.defineProperty(ScrollbarYEntity.prototype, "left", {
        get: function () {
            return this.root.view.canvasWidth - this.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarYEntity.prototype, "top", {
        get: function () {
            return this.root.grid.view.headerHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarYEntity.prototype, "backgroundLineHeight", {
        get: function () {
            return this.root.view.canvasHeight - this.bottomOffset - this.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollbarYEntity.prototype, "width", {
        get: function () {
            return this.root.api.scrollbarYWidth;
        },
        enumerable: false,
        configurable: true
    });
    ScrollbarYEntity.prototype.destroyEvents = function () {
        this.destroyHandleMouseDown();
        this.destroyMouseMove();
        this.destroyHandleTouchEnd();
    };
    ScrollbarYEntity.prototype.isLineClick = function (event) {
        if (!this.needRender())
            return false;
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var _a = this.getLineYAndHeight(), y = _a.y, height = _a.height;
        if (offsetX < this.left)
            return false;
        if (offsetY < y + this.top || offsetY > y + this.top + height)
            return false;
        return true;
    };
    ScrollbarYEntity.prototype.isBackgroundClick = function (event) {
        if (!this.needRender())
            return false;
        var offsetX = event.offsetX, offsetY = event.offsetY;
        return (offsetX >= this.left &&
            offsetY > this.top &&
            offsetY < this.root.view.canvasHeight - this.bottomOffset);
    };
    ScrollbarYEntity.prototype.handleMouseDown = function (event) {
        var isLineClick = this.isLineClick(event);
        var isBackgroundClick = this.isBackgroundClick(event);
        if (isLineClick)
            this.handleLinkMouseDown(event);
        else if (isBackgroundClick)
            this.handleBackgroundMouseDown(event);
        if (isLineClick || isBackgroundClick)
            this.root.controller.stopPropagation(event);
    };
    ScrollbarYEntity.prototype.handleTouchEnd = function (event) {
        var eventOffsets = getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        var isBackgroundClick = this.isBackgroundClick(eventOffsets);
        if (!isBackgroundClick)
            return;
        this.handleBackgroundMouseDown(eventOffsets);
        this.root.controller.stopPropagation(event);
    };
    ScrollbarYEntity.prototype.handleLinkMouseDown = function (event) {
        this.mouseDownOffset = event.screenY;
        document.addEventListener('mousemove', this.handleMoveScrollbar);
        document.addEventListener('mouseup', this.handleMouseUp);
    };
    ScrollbarYEntity.prototype.handleMouseUp = function () {
        this.mouseDownOffset = null;
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMoveScrollbar);
    };
    ScrollbarYEntity.prototype.handleBackgroundMouseDown = function (event) {
        var scaledOffset = this.getScaledOffset(event.offsetY);
        this.root.view.handleSetOffsetY(scaledOffset, true, true);
    };
    ScrollbarYEntity.prototype.getScaledOffset = function (offsetY) {
        var fullHeight = this.root.grid.service.getLeftAvailableHeight();
        offsetY = offsetY - this.top;
        var scale = fullHeight / this.backgroundLineHeight;
        return scale * offsetY;
    };
    ScrollbarYEntity.prototype.handleMouseMove = function (event) {
        var isLineClick = this.isLineClick(event);
        var isBackgroundClick = this.isBackgroundClick(event);
        if (isLineClick)
            this.root.view.setCursor('grab');
        else if (isBackgroundClick)
            this.root.view.setCursor('pointer');
        if (isLineClick || isBackgroundClick) {
            this.root.controller.stopPropagation(event);
            this.isHover = true;
        }
        else if (this.isHover) {
            this.isHover = false;
            this.root.view.setCursor('auto');
        }
    };
    ScrollbarYEntity.prototype.handleMoveScrollbar = function (event) {
        if (this.mouseDownOffset !== null) {
            var diff = event.screenY - this.mouseDownOffset;
            var offset = this.root.view.offsetY + this.getScaledOffset(this.top + diff);
            var fullHeight = this.root.grid.service.getLeftAvailableHeight();
            if (offset > fullHeight)
                offset = fullHeight;
            this.root.view.handleSetOffsetY(offset);
            this.mouseDownOffset = event.screenY;
        }
    };
    ScrollbarYEntity.prototype.needRender = function () {
        return this.root.grid.service.getLeftAvailableHeight() > 0;
    };
    ScrollbarYEntity.prototype.renderBackground = function () {
        if (!this.needRender())
            return;
        var ctx = this.root.ctx;
        ctx.fillStyle = this.root.api.scrollbarYBackground;
        ctx.fillRect(this.left, this.top, this.width, this.backgroundLineHeight);
    };
    ScrollbarYEntity.prototype.renderLine = function () {
        if (!this.needRender())
            return;
        var ctx = this.root.ctx;
        var _a = this.getLineYAndHeight(), y = _a.y, height = _a.height;
        roundRect(ctx, this.left, y + this.top, this.width, height, this.root.api.scrollbarYLineRadius, this.root.api.scrollbarYLineBackground);
        this.root.ctx.fillStyle = this.root.api.scrollbarYLineBackground;
    };
    ScrollbarYEntity.prototype.getLineYAndHeight = function () {
        var fullHeight = this.root.grid.service.getFullAvailableHeight();
        var y = (this.root.view.offsetY / fullHeight) * this.backgroundLineHeight;
        var height = (this.backgroundLineHeight / fullHeight) *
            this.backgroundLineHeight;
        if (height < this.minLineHeight)
            height = this.minLineHeight;
        return { y: y, height: height };
    };
    ScrollbarYEntity.prototype.render = function () {
        this.renderBackground();
        this.renderLine();
    };
    return ScrollbarYEntity;
}());

var RootView = /** @class */ (function () {
    function RootView(root) {
        this.offsetX = 0;
        this.offsetY = 0;
        this.pixelRatio = 1;
        this.canvasWidth = 1;
        this.canvasHeight = 1;
        this.root = root;
        this.updateCanvasSizeAndRender =
            this.updateCanvasSizeAndRender.bind(this);
        this.updateCanvasSize();
        this.attachEvents();
        this.scrollbarX = new ScrollbarXEntity(root);
        this.scrollbarY = new ScrollbarYEntity(root);
        this.pixelRatio = getPixelRatio(root.ctx);
        this.canvasWidth = this.root.canvas.width / this.pixelRatio;
        this.canvasHeight = this.root.canvas.height / this.pixelRatio;
    }
    RootView.prototype.render = function () {
        this.pixelRatio = getPixelRatio(this.root.ctx);
        this.canvasWidth = this.root.canvas.width / this.pixelRatio;
        this.canvasHeight = this.root.canvas.height / this.pixelRatio;
        this.root.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.root.ctx.fillStyle = this.root.api.background;
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
        scaleCanvas(this.root.canvas, this.root.ctx, this.root.root.offsetWidth, this.root.root.offsetHeight);
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
                duration =
                    (positiveDiff /
                        this.root.grid.service.getFullAvailableWidth()) *
                        1500;
            if (diff_1 === 0)
                return;
            animate({
                duration: duration,
                timing: timing,
                draw: function (progress) {
                    _this.offsetX = initialOffset_1 + diff_1 * progress;
                    if (_this.offsetX < 0)
                        _this.offsetX = 0;
                    if (progress === 1 || diff_1 > 0)
                        _this.root.grid.service.validateOffsetX();
                    _this.render();
                },
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
                duration =
                    (positiveDiff /
                        this.root.grid.service.getFullAvailableHeight()) *
                        1500;
            if (diff_2 === 0)
                return;
            animate({
                duration: duration,
                timing: timing,
                draw: function (progress) {
                    _this.offsetY = initialOffset_2 + diff_2 * progress;
                    if (_this.offsetY < 0)
                        _this.offsetY = 0;
                    _this.render();
                },
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

function debounce(f, ms) {
    var isCooldown = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isCooldown)
            return;
        // @ts-ignore
        f.apply(this, args);
        isCooldown = true;
        setTimeout(function () { return (isCooldown = false); }, ms);
    };
}

var RootController = /** @class */ (function () {
    function RootController(root) {
        this.events = {};
        this.touchOffsetX = null;
        this.touchOffsetY = null;
        this.previousTouchOffsetX = null;
        this.previousTouchOffsetY = null;
        this.root = root;
        this.handleMouseMove = debounce(this.handleMouseMove.bind(this), 32);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = debounce(this.handleTouchMove.bind(this), 32);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.attachEvents();
    }
    RootController.prototype.attachEvents = function () {
        var _this = this;
        var _a;
        this.root.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.root.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.root.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.root.canvas.addEventListener('click', this.handleClick);
        this.root.canvas.addEventListener('wheel', this.handleScroll);
        this.root.canvas.addEventListener('touchstart', this.handleTouchStart);
        this.root.canvas.addEventListener('touchmove', this.handleTouchMove);
        this.root.canvas.addEventListener('touchend', this.handleTouchEnd);
        if ((_a = document === null || document === void 0 ? void 0 : document.fonts) === null || _a === void 0 ? void 0 : _a.ready)
            document.fonts.ready.then(function () { return _this.root.render(); });
    };
    RootController.prototype.destroyEvents = function () {
        this.root.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.root.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.root.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.root.canvas.removeEventListener('click', this.handleClick);
        this.root.canvas.removeEventListener('wheel', this.handleScroll);
        this.root.canvas.removeEventListener('touchstart', this.handleTouchStart);
        this.root.canvas.removeEventListener('touchmove', this.handleTouchMove);
        this.root.canvas.removeEventListener('touchend', this.handleTouchEnd);
    };
    RootController.prototype.on = function (event, callback) {
        var _this = this;
        if (!this.events[event])
            this.events[event] = [];
        this.events[event].push(callback);
        return function () {
            _this.events[event] = _this.events[event].filter(function (cb) { return cb !== callback; });
        };
    };
    RootController.prototype.handleMouseMove = function (event) {
        if (!this.events.mousemove)
            return;
        this.events.mousemove.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
    };
    RootController.prototype.handleMouseDown = function (event) {
        if (!this.events.mousedown)
            return;
        this.events.mousedown.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
    };
    RootController.prototype.handleMouseUp = function (event) {
        if (!this.events.mouseup)
            return;
        this.events.mouseup.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
    };
    RootController.prototype.handleClick = function (event) {
        if (!this.events.click)
            return;
        this.events.click.forEach(function (cb) { return cb(event); });
    };
    RootController.prototype.handleScroll = function (event) {
        event.preventDefault();
        if (event.shiftKey || event.deltaX !== 0) {
            var offsetX = this.root.view.offsetX;
            if (event.shiftKey)
                offsetX += event.deltaY;
            else
                offsetX += event.deltaX;
            if (offsetX < 0)
                offsetX = 0;
            this.root.view.handleSetOffsetX(offsetX);
        }
        else {
            var offsetY = this.root.view.offsetY + event.deltaY;
            var maxHeight = this.root.grid.service.getLeftAvailableHeight();
            if (offsetY < 0)
                offsetY = 0;
            else if (offsetY > maxHeight)
                offsetY = maxHeight;
            this.root.view.handleSetOffsetY(offsetY);
        }
    };
    RootController.prototype.handleTouchStart = function (event) {
        var _a, _b, _c;
        event.preventDefault();
        (_a = this.events.touchstart) === null || _a === void 0 ? void 0 : _a.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
        var offsetX = (_b = event.touches[0]) === null || _b === void 0 ? void 0 : _b.screenX;
        var offsetY = (_c = event.touches[0]) === null || _c === void 0 ? void 0 : _c.screenY;
        if (offsetX)
            this.touchOffsetX = offsetX;
        if (offsetY)
            this.touchOffsetY = offsetY;
    };
    RootController.prototype.handleTouchMove = function (event) {
        var _a, _b, _c;
        event.preventDefault();
        (_a = this.events.touchmove) === null || _a === void 0 ? void 0 : _a.every(function (cb) {
            // @ts-ignore
            if (event._stopPropagation)
                return false;
            cb(event);
            return true;
        });
        if (this.root.tasks.controller.mouseDownOffsetX)
            return;
        var offsetX = (_b = event.changedTouches[0]) === null || _b === void 0 ? void 0 : _b.screenX;
        var offsetY = (_c = event.changedTouches[0]) === null || _c === void 0 ? void 0 : _c.screenY;
        if (offsetX &&
            this.touchOffsetX !== null &&
            offsetX !== this.touchOffsetX) {
            var diff = this.touchOffsetX - offsetX;
            var offset = this.root.view.offsetX + diff;
            this.root.view.handleSetOffsetX(offset);
            this.previousTouchOffsetX = this.touchOffsetX;
            this.touchOffsetX = offsetX;
        }
        if (offsetY &&
            this.touchOffsetY !== null &&
            offsetY !== this.touchOffsetY) {
            var diff = this.touchOffsetY - offsetY;
            var offset = this.root.view.offsetY + diff;
            var maxHeight = this.root.grid.service.getLeftAvailableHeight();
            if (offset > maxHeight)
                offset = maxHeight;
            this.root.view.handleSetOffsetY(offset);
            this.previousTouchOffsetY = this.touchOffsetY;
            this.touchOffsetY = offsetY;
        }
    };
    RootController.prototype.handleTouchEnd = function (event) {
        if (this.events.touchend &&
            !this.previousTouchOffsetX &&
            !this.previousTouchOffsetY) {
            this.events.touchend.every(function (cb) {
                // @ts-ignore
                if (event._stopPropagation)
                    return false;
                cb(event);
                return true;
            });
        }
        if (this.previousTouchOffsetX && this.touchOffsetX) {
            var diff = this.previousTouchOffsetX - this.touchOffsetX;
            if (diff > 30 || diff < -30) {
                diff *= 7;
                this.root.view.handleSetOffsetX(this.root.view.offsetX + diff, true, true, 500);
            }
        }
        if (this.previousTouchOffsetY && this.touchOffsetY) {
            var diff = this.previousTouchOffsetY - this.touchOffsetY;
            if (diff > 30 || diff < -30) {
                diff *= 7;
                var offset = this.root.view.offsetY + diff;
                var maxHeight = this.root.grid.service.getLeftAvailableHeight();
                if (offset > maxHeight)
                    offset = maxHeight;
                this.root.view.handleSetOffsetY(offset, true, true, 500);
            }
        }
        event.preventDefault();
        this.touchOffsetX = null;
        this.touchOffsetY = null;
        this.previousTouchOffsetX = null;
        this.previousTouchOffsetY = null;
    };
    RootController.prototype.stopPropagation = function (event) {
        // @ts-ignore
        event._stopPropagation = true;
    };
    return RootController;
}());

var RootModule = /** @class */ (function () {
    function RootModule(el, props) {
        var elem = document.querySelector(el);
        if (!elem)
            throw new Error("Root element doesn't found");
        this.root = elem;
        this.canvas = document.createElement('canvas');
        this.root.append(this.canvas);
        var ctx = this.canvas.getContext('2d');
        if (!ctx)
            throw new Error("Canvas context doesn't gotten");
        scaleCanvas(this.canvas, ctx, this.root.offsetWidth, this.root.offsetHeight);
        this.ctx = ctx;
        this.service = new RootService(this);
        this.api = new RootApi(this, props);
        this.controller = new RootController(this);
        this.view = new RootView(this);
        this.grid = new GridModule(this);
        this.tasks = new TasksModule(this);
        this.init();
    }
    RootModule.prototype.init = function () {
        this.grid.init();
        this.tasks.init();
        this.render();
        if (this.api.isLoading)
            this.view.setCursor('progress');
    };
    RootModule.prototype.destroy = function () {
        this.controller.destroyEvents();
        this.view.destroyEvents();
        this.tasks.destroy();
        this.service.unmountConvertColorDiv();
    };
    RootModule.prototype.render = function () {
        this.view.render();
    };
    return RootModule;
}());

var Gantt = /** @class */ (function () {
    function Gantt(el, props) {
        this.root = new RootModule(el, props);
    }
    Gantt.prototype.updateTasks = function (tasks) {
        this.root.api.updateTasks(tasks);
    };
    Gantt.prototype.scrollToToday = function (scrollTop) {
        this.root.api.scrollToToday(scrollTop);
    };
    Gantt.prototype.scrollToTask = function (id) {
        this.root.api.scrollToTask(id);
    };
    Gantt.prototype.updateViewMode = function (mode) {
        this.root.api.updateViewMode(mode);
    };
    Gantt.prototype.updateIsLoading = function (isLoading) {
        this.root.api.updateIsLoading(isLoading);
    };
    Gantt.prototype.updateScale = function (scale) {
        this.root.api.updateScale(scale);
    };
    Gantt.prototype.updateColors = function () {
        this.root.api.updateColors();
    };
    Gantt.prototype.destroy = function () {
        this.root.destroy();
    };
    return Gantt;
}());

export { Gantt as default };
