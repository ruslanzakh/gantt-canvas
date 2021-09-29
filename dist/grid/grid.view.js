"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridView = void 0;
var column_entity_1 = require("./entities/column.entity");
var month_entity_1 = require("./entities/month.entity");
var row_entity_1 = require("./entities/row.entity");
var GridView = /** @class */ (function () {
    function GridView(root, module) {
        this.columns = [];
        this.rows = [];
        this.months = [];
        this.firstTsOnScreen = 0;
        this.root = root;
        this.module = module;
        this.columnEntity = new column_entity_1.ColumnEntity(root);
        this.monthEntity = new month_entity_1.MonthEntity(root);
        this.rowEntity = new row_entity_1.RowEntity(root);
    }
    Object.defineProperty(GridView.prototype, "colWidth", {
        get: function () {
            if (this.root.api.viewMode === 'day')
                return this.root.api.dayColWidth * this.root.view.scaleX;
            return this.root.api.monthViewColWidth * this.root.view.scaleX;
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
            return this.weekTs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "dayTs", {
        get: function () {
            return 24 * 60 * 60 * 1000;
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
    Object.defineProperty(GridView.prototype, "tsHasOneX", {
        get: function () {
            return this.colTs / this.colWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "rowHeight", {
        get: function () {
            return this.root.api.rowHeight * this.root.view.scaleY;
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
            var x = (i * this.colWidth) - offsetX;
            if (x < -this.colWidth)
                continue;
            if (x > width)
                break;
            data.push({
                ts: el.ts,
                x: x,
                title: el.title,
                month: el.month,
                year: el.year,
                isStartMonth: el.isStartMonth,
                isMiddleDayMonth: el.isMiddleDayMonth,
                today: el.today,
            });
        }
        this.columns = data;
    };
    GridView.prototype.fillMonths = function () {
        var _this = this;
        var data = this.columns.reduce(function (prev, _a) {
            var month = _a.month, x = _a.x, year = _a.year, isMiddleDayMonth = _a.isMiddleDayMonth;
            var xx = x + _this.colWidth;
            var label = month + '.' + year;
            if (!prev[label]) {
                prev[label] = {
                    title: _this.getMonthTitle(month, year),
                    x: x,
                    xx: xx,
                };
                return prev;
            }
            if (prev[label].x > x)
                prev[label].x = x;
            if (prev[label].xx < xx)
                prev[label].xx = xx;
            if (isMiddleDayMonth)
                prev[label].middle = x + (_this.colWidth / 2);
            return prev;
        }, {});
        this.months = Object.values(data);
    };
    GridView.prototype.getMonthTitle = function (month, year) {
        var _a;
        var months = (_a = this.root.api.monthNames[this.root.api.lang]) !== null && _a !== void 0 ? _a : this.root.api.monthNames['ru'];
        if (this.root.api.monthTitleShowYear) {
            return months[month] + ' ' + year;
        }
        return months[month];
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
            y = (i * this.rowHeight) + offsetY;
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
        this.root.ctx.fillStyle = '#ffffff';
        this.root.ctx.rect(0, 0, width, this.rowsOffsetY);
        this.root.ctx.fill();
        var colCommon = this.getColumnCommonData();
        this.columns.forEach(function (x) { return _this.columnEntity.renderDay(x, colCommon); });
        this.months.forEach(function (x) { return _this.monthEntity.renderItem(x, _this.monthHeight); });
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
exports.GridView = GridView;
