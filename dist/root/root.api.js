"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootApi = void 0;
var config_1 = require("../utils/config");
var animate_1 = require("../utils/animate");
var RootApi = /** @class */ (function () {
    function RootApi(root, props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32;
        this.root = root;
        this.tasks = props.tasks;
        this.moveDependedOnResizeRight = (_a = props.moveDependedOnResizeRight) !== null && _a !== void 0 ? _a : true;
        this.moveDependedOnResizeLeft = (_b = props.moveDependedOnResizeLeft) !== null && _b !== void 0 ? _b : false;
        this.moveDependedOnMove = (_c = props.moveDependedOnMove) !== null && _c !== void 0 ? _c : true;
        this.showTime = (_d = props.showTime) !== null && _d !== void 0 ? _d : false;
        this.startFromToday = (_e = props.startFromToday) !== null && _e !== void 0 ? _e : true;
        this.renderAllTasksFromStart = (_f = props.renderAllTasksFromStart) !== null && _f !== void 0 ? _f : true;
        this.showMonthMiddle = (_g = props.showMonthMiddle) !== null && _g !== void 0 ? _g : false;
        this.showMonthFromStartOnDayView = (_h = props.showMonthFromStartOnDayView) !== null && _h !== void 0 ? _h : false;
        this.viewMode = (_j = props.viewMode) !== null && _j !== void 0 ? _j : 'day';
        this.isLoading = (_k = props.isLoading) !== null && _k !== void 0 ? _k : false;
        this.monthNames = __assign(__assign({}, config_1.MONTH_NAMES), (_l = props.monthNames) !== null && _l !== void 0 ? _l : {});
        this.weekdayNames = __assign(__assign({}, config_1.WEEKDAY_NAMES), (_m = props.weekdayNames) !== null && _m !== void 0 ? _m : {});
        this.lang = (_o = props.lang) !== null && _o !== void 0 ? _o : 'ru';
        this.scale = (_p = props.scale) !== null && _p !== void 0 ? _p : 1;
        this.monthHeight = (_q = props.monthHeight) !== null && _q !== void 0 ? _q : 55;
        this.renderMonthBottomLine = (_r = props.renderMonthBottomLine) !== null && _r !== void 0 ? _r : true;
        this.renderMonthLeftLine = (_s = props.renderMonthLeftLine) !== null && _s !== void 0 ? _s : true;
        this.monthLineColor = props.monthLineColor
            ? this.root.service.convertColor(props.monthLineColor) : config_1.COLORS.L_GREY;
        this.monthTitleFont = (_t = props.monthTitleFont) !== null && _t !== void 0 ? _t : '600 20px Arial';
        this.monthTitleColor = props.monthTitleColor
            ? this.root.service.convertColor(props.monthTitleColor) : config_1.COLORS.BLACK;
        this.monthTitleShowYear = (_u = props.monthTitleShowYear) !== null && _u !== void 0 ? _u : true;
        this._dayHeight = props.dayHeight ? props.dayHeight : props.showDayWeekday ? 48 : 28;
        this.renderDayStartMonthLine = (_v = props.renderDayStartMonthLine) !== null && _v !== void 0 ? _v : true;
        this.dayStartMonthLine = props.dayStartMonthLine
            ? this.root.service.convertColor(props.dayStartMonthLine) : config_1.COLORS.L_GREY;
        this.dayBottomLineColor = props.dayBottomLineColor
            ? this.root.service.convertColor(props.dayBottomLineColor) : config_1.COLORS.L_GREY;
        this.dayTodayBackground = props.dayTodayBackground
            ? this.root.service.convertColor(props.dayTodayBackground) : config_1.COLORS.L_BLUE;
        this.dayHeaderBackground = props.dayHeaderBackground
            ? this.root.service.convertColor(props.dayHeaderBackground) : undefined;
        this.dayHeaderTodayBackground = props.dayHeaderTodayBackground
            ? this.root.service.convertColor(props.dayHeaderTodayBackground) : undefined;
        this.dayHeaderWeekendBackground = props.dayHeaderWeekendBackground
            ? this.root.service.convertColor(props.dayHeaderWeekendBackground) : undefined;
        this.dayWeekendBackground = props.dayWeekendBackground
            ? this.root.service.convertColor(props.dayWeekendBackground) : undefined;
        this.dayWeekendColor = props.dayWeekendColor
            ? this.root.service.convertColor(props.dayWeekendColor) : undefined;
        this.showDayWeekday = (_w = props.showDayWeekday) !== null && _w !== void 0 ? _w : false;
        this.dayFontSize = (_x = props.dayFontSize) !== null && _x !== void 0 ? _x : 14;
        this.dayFontLineHeight = (_y = props.dayFontLineHeight) !== null && _y !== void 0 ? _y : this.dayFontSize;
        this.dayFontWeight = (_z = props.dayFontWeight) !== null && _z !== void 0 ? _z : 500;
        this.dayFontFamily = (_0 = props.dayFontFamily) !== null && _0 !== void 0 ? _0 : 'Arial';
        this.dayColor = props.dayColor
            ? this.root.service.convertColor(props.dayColor) : config_1.COLORS.BLACK;
        this.weekdayFontSize = (_1 = props.weekdayFontSize) !== null && _1 !== void 0 ? _1 : 14;
        this.weekdayFontLineHeight = (_2 = props.weekdayFontLineHeight) !== null && _2 !== void 0 ? _2 : this.weekdayFontSize;
        this.weekdayFontWeight = (_3 = props.weekdayFontWeight) !== null && _3 !== void 0 ? _3 : 500;
        this.weekdayFontFamily = (_4 = props.weekdayFontFamily) !== null && _4 !== void 0 ? _4 : 'Arial';
        this.weekdayColor = props.weekdayColor
            ? this.root.service.convertColor(props.weekdayColor) : config_1.COLORS.BLACK;
        this.weekdayWeekendColor = props.weekdayWeekendColor
            ? this.root.service.convertColor(props.weekdayWeekendColor) : undefined;
        this._dayColWidth = (_5 = props.dayColWidth) !== null && _5 !== void 0 ? _5 : 40;
        this._weekViewColWidth = (_6 = props.weekViewColWidth) !== null && _6 !== void 0 ? _6 : 120;
        this._monthViewColWidth = (_7 = props.monthViewColWidth) !== null && _7 !== void 0 ? _7 : 180;
        this._rowHeight = (_8 = props.rowHeight) !== null && _8 !== void 0 ? _8 : 40;
        this.colLineColor = props.colLineColor
            ? this.root.service.convertColor(props.colLineColor) : config_1.COLORS.L_GREY;
        this.colStartMonthLineColor = props.colStartMonthLineColor
            ? this.root.service.convertColor(props.colStartMonthLineColor) : undefined;
        this.rowLineColor = props.rowLineColor
            ? this.root.service.convertColor(props.rowLineColor) : config_1.COLORS.L_GREY;
        this.rowEvenBackground = props.rowEvenBackground
            ? this.root.service.convertColor(props.rowEvenBackground) : config_1.COLORS.WHITE;
        this.rowOddBackground = props.rowOddBackground
            ? this.root.service.convertColor(props.rowOddBackground) : config_1.COLORS.WHITE;
        this.taskDefaultBackground = props.taskDefaultBackground
            ? this.root.service.convertColor(props.taskDefaultBackground) : config_1.COLORS.VIOLET;
        this.taskDefaultHoverBackground = props.taskDefaultHoverBackground
            ? this.root.service.convertColor(props.taskDefaultHoverBackground) : config_1.COLORS.D_VIOLET;
        this.taskDefaultStrokeColor = props.taskDefaultStrokeColor
            ? this.root.service.convertColor(props.taskDefaultStrokeColor) : undefined;
        this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor
            ? this.root.service.convertColor(props.taskDefaultHoverStrokeColor) : undefined;
        this.taskDefaultColor = props.taskDefaultColor
            ? this.root.service.convertColor(props.taskDefaultColor) : config_1.COLORS.WHITE;
        this.taskDefaultHoverColor = props.taskDefaultHoverColor
            ? this.root.service.convertColor(props.taskDefaultHoverColor) : config_1.COLORS.WHITE;
        this.taskDefaultOutlineColor = props.taskDefaultOutlineColor
            ? this.root.service.convertColor(props.taskDefaultOutlineColor) : config_1.COLORS.BLACK;
        this.taskDefaultSubtitleColor = props.taskDefaultSubtitleColor
            ? this.root.service.convertColor(props.taskDefaultSubtitleColor) : config_1.COLORS.WHITE;
        this.taskDefaultSubtitleOutlineColor = props.taskDefaultSubtitleOutlineColor
            ? this.root.service.convertColor(props.taskDefaultSubtitleOutlineColor) : config_1.COLORS.BLACK;
        this._taskSubtitleOffset = (_9 = props.taskSubtitleOffset) !== null && _9 !== void 0 ? _9 : 10;
        this._taskHeight = (_10 = props.taskHeight) !== null && _10 !== void 0 ? _10 : 34;
        this._taskPadding = (_11 = props.taskPadding) !== null && _11 !== void 0 ? _11 : 5;
        this._taskRadius = (_12 = props.taskRadius) !== null && _12 !== void 0 ? _12 : 2;
        this.taskFontSize = (_13 = props.taskFontSize) !== null && _13 !== void 0 ? _13 : 16;
        this.taskFontLineHeight = (_14 = props.taskFontLineHeight) !== null && _14 !== void 0 ? _14 : this.taskFontSize;
        this.taskFontWeight = (_15 = props.taskFontWeight) !== null && _15 !== void 0 ? _15 : 400;
        this.taskFontFamily = (_16 = props.taskFontFamily) !== null && _16 !== void 0 ? _16 : "serif";
        this.taskErrorStrokeColor = props.taskErrorStrokeColor
            ? this.root.service.convertColor(props.taskErrorStrokeColor) : undefined;
        this._minTaskWidth = (_17 = props.minTaskWidth) !== null && _17 !== void 0 ? _17 : 10;
        this.taskRenderResizeControls = (_18 = props.taskRenderResizeControls) !== null && _18 !== void 0 ? _18 : true;
        this._taskRenderResizeControlsWidth = (_19 = props.taskRenderResizeControlsWidth) !== null && _19 !== void 0 ? _19 : 6;
        this.taskRenderResizeControlsColor = props.taskRenderResizeControlsColor
            ? this.root.service.convertColor(props.taskRenderResizeControlsColor) : config_1.COLORS.WHITE;
        this.taskRenderResizeControlsRadius = (_20 = props.taskRenderResizeControlsRadius) !== null && _20 !== void 0 ? _20 : 2;
        this.taskRenderDepControl = (_21 = props.taskRenderDepControl) !== null && _21 !== void 0 ? _21 : true;
        this._taskRenderDepRadius = (_22 = props.taskRenderDepRadius) !== null && _22 !== void 0 ? _22 : 7;
        this._taskRenderDepOffsetX = (_23 = props.taskRenderDepOffsetX) !== null && _23 !== void 0 ? _23 : 7;
        this._taskRenderDepLineWidth = (_24 = props.taskRenderDepLineWidth) !== null && _24 !== void 0 ? _24 : 1;
        this.taskRenderDepLineColor = props.taskRenderDepLineColor
            ? this.root.service.convertColor(props.taskRenderDepLineColor) : config_1.COLORS.BLACK;
        this.taskRenderDepBackground = props.taskRenderDepBackground
            ? this.root.service.convertColor(props.taskRenderDepBackground) : config_1.COLORS.WHITE;
        this.arrowColor = props.arrowColor
            ? this.root.service.convertColor(props.arrowColor) : config_1.COLORS.BLUE;
        this._arrowWidth = (_25 = props.arrowWidth) !== null && _25 !== void 0 ? _25 : 1;
        this.arrowActiveColor = props.arrowActiveColor
            ? this.root.service.convertColor(props.arrowActiveColor) : config_1.COLORS.D_BLUE;
        this.arrowHoverColor = props.arrowHoverColor
            ? this.root.service.convertColor(props.arrowHoverColor) : config_1.COLORS.D_VIOLET;
        this._arrowHoverWidth = (_26 = props.arrowHoverWidth) !== null && _26 !== void 0 ? _26 : 2;
        this._arrowHoverHeadWidth = (_27 = props.arrowHoverHeadWidth) !== null && _27 !== void 0 ? _27 : 2;
        this._arrowRadius = (_28 = props.arrowRadius) !== null && _28 !== void 0 ? _28 : 2;
        this.scrollbarXHeight = (_29 = props.scrollbarXHeight) !== null && _29 !== void 0 ? _29 : 12;
        this.scrollbarXBackground = props.scrollbarXBackground
            ? this.root.service.convertColor(props.scrollbarXBackground) : config_1.COLORS.L_GREY;
        this.scrollbarXLineBackground = props.scrollbarXLineBackground
            ? this.root.service.convertColor(props.scrollbarXLineBackground) : config_1.COLORS.GREY;
        this.scrollbarXLineRadius = (_30 = props.scrollbarXLineRadius) !== null && _30 !== void 0 ? _30 : 6;
        this.scrollbarYWidth = (_31 = props.scrollbarYWidth) !== null && _31 !== void 0 ? _31 : 12;
        this.scrollbarYBackground = props.scrollbarYBackground
            ? this.root.service.convertColor(props.scrollbarYBackground) : config_1.COLORS.L_GREY;
        this.scrollbarYLineBackground = props.scrollbarYLineBackground
            ? this.root.service.convertColor(props.scrollbarYLineBackground) : config_1.COLORS.GREY;
        this.scrollbarYLineRadius = (_32 = props.scrollbarYLineRadius) !== null && _32 !== void 0 ? _32 : 6;
        this.handleChange = props.handleChange;
        this.handleTaskClick = props.handleTaskClick;
        this.root.service.unmountConvertColorDiv();
    }
    Object.defineProperty(RootApi.prototype, "dayHeight", {
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
        animate_1.animate({
            duration: 300,
            timing: animate_1.timing,
            draw: function (progress) {
                _this.scale = initialScale + (diff * progress);
                _this.root.grid.init();
                _this.root.grid.service.showDay(firstTsOnScreen, true, false, false);
                if (scale < initialScale) {
                    var height = _this.root.view.offsetY * scale;
                    var maxHeight = _this.root.grid.service.getLeftAvailableHeight();
                    if (height > maxHeight)
                        height = maxHeight;
                    _this.root.view.handleSetOffsetY(height);
                }
            }
        });
    };
    return RootApi;
}());
exports.RootApi = RootApi;
