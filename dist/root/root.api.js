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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60;
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
        this.monthLineColor = (_t = props.monthLineColor) !== null && _t !== void 0 ? _t : config_1.COLORS.L_GREY;
        this.monthTitleFont = (_u = props.monthTitleFont) !== null && _u !== void 0 ? _u : '600 20px Arial';
        this.monthTitleColor = (_v = props.monthTitleColor) !== null && _v !== void 0 ? _v : config_1.COLORS.BLACK;
        this.monthTitleShowYear = (_w = props.monthTitleShowYear) !== null && _w !== void 0 ? _w : true;
        this._dayHeight = ((_x = props.dayHeight) !== null && _x !== void 0 ? _x : props.showDayWeekday) ? 48 : 28;
        this.renderDayStartMonthLine = (_y = props.renderDayStartMonthLine) !== null && _y !== void 0 ? _y : true;
        this.dayStartMonthLine = (_z = props.dayStartMonthLine) !== null && _z !== void 0 ? _z : config_1.COLORS.L_GREY;
        this.dayBottomLineColor = (_0 = props.dayBottomLineColor) !== null && _0 !== void 0 ? _0 : config_1.COLORS.L_GREY;
        this.dayTodayBackground = (_1 = props.dayTodayBackground) !== null && _1 !== void 0 ? _1 : config_1.COLORS.L_BLUE;
        this.dayWeekendBackground = props.dayWeekendBackground;
        this.dayWeekendColor = props.dayWeekendColor;
        this.showDayWeekday = (_2 = props.showDayWeekday) !== null && _2 !== void 0 ? _2 : false;
        this.dayFontSize = (_3 = props.dayFontSize) !== null && _3 !== void 0 ? _3 : 14;
        this.dayFontLineHeight = (_4 = props.dayFontLineHeight) !== null && _4 !== void 0 ? _4 : this.dayFontSize;
        this.dayFontWeight = (_5 = props.dayFontWeight) !== null && _5 !== void 0 ? _5 : 500;
        this.dayFontFamily = (_6 = props.dayFontFamily) !== null && _6 !== void 0 ? _6 : 'Arial';
        this.dayColor = (_7 = props.dayColor) !== null && _7 !== void 0 ? _7 : config_1.COLORS.BLACK;
        this.weekdayFontSize = (_8 = props.weekdayFontSize) !== null && _8 !== void 0 ? _8 : 14;
        this.weekdayFontLineHeight = (_9 = props.weekdayFontLineHeight) !== null && _9 !== void 0 ? _9 : this.weekdayFontSize;
        this.weekdayFontWeight = (_10 = props.weekdayFontWeight) !== null && _10 !== void 0 ? _10 : 500;
        this.weekdayFontFamily = (_11 = props.weekdayFontFamily) !== null && _11 !== void 0 ? _11 : 'Arial';
        this.weekdayColor = (_12 = props.weekdayColor) !== null && _12 !== void 0 ? _12 : config_1.COLORS.BLACK;
        this.weekdayWeekendColor = props.weekdayWeekendColor;
        this._dayColWidth = (_13 = props.dayColWidth) !== null && _13 !== void 0 ? _13 : 40;
        this._weekViewColWidth = (_14 = props.weekViewColWidth) !== null && _14 !== void 0 ? _14 : 120;
        this._monthViewColWidth = (_15 = props.monthViewColWidth) !== null && _15 !== void 0 ? _15 : 180;
        this._rowHeight = (_16 = props.rowHeight) !== null && _16 !== void 0 ? _16 : 40;
        this.colLineColor = (_17 = props.colLineColor) !== null && _17 !== void 0 ? _17 : config_1.COLORS.L_GREY;
        this.colStartMonthLineColor = props.colStartMonthLineColor;
        this.rowLineColor = (_18 = props.rowLineColor) !== null && _18 !== void 0 ? _18 : config_1.COLORS.L_GREY;
        this.rowEvenBackground = (_19 = props.rowEvenBackground) !== null && _19 !== void 0 ? _19 : config_1.COLORS.WHITE;
        this.rowOddBackground = (_20 = props.rowOddBackground) !== null && _20 !== void 0 ? _20 : config_1.COLORS.WHITE;
        this.taskDefaultBackground = (_21 = props.taskDefaultBackground) !== null && _21 !== void 0 ? _21 : config_1.COLORS.VIOLET;
        this.taskDefaultHoverBackground = (_22 = props.taskDefaultHoverBackground) !== null && _22 !== void 0 ? _22 : config_1.COLORS.D_VIOLET;
        this.taskDefaultStrokeColor = props.taskDefaultStrokeColor;
        this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
        this.taskDefaultColor = (_23 = props.taskDefaultColor) !== null && _23 !== void 0 ? _23 : config_1.COLORS.WHITE;
        this.taskDefaultHoverColor = (_24 = props.taskDefaultHoverColor) !== null && _24 !== void 0 ? _24 : config_1.COLORS.WHITE;
        this.taskDefaultOutlineColor = (_25 = props.taskDefaultOutlineColor) !== null && _25 !== void 0 ? _25 : config_1.COLORS.BLACK;
        this.taskDefaultSubtitleColor = (_26 = props.taskDefaultSubtitleColor) !== null && _26 !== void 0 ? _26 : config_1.COLORS.WHITE;
        this.taskDefaultSubtitleOutlineColor = (_27 = props.taskDefaultSubtitleOutlineColor) !== null && _27 !== void 0 ? _27 : config_1.COLORS.BLACK;
        this._taskSubtitleOffset = (_28 = props.taskSubtitleOffset) !== null && _28 !== void 0 ? _28 : 10;
        this._taskHeight = (_29 = props.taskHeight) !== null && _29 !== void 0 ? _29 : 34;
        this._taskPadding = (_30 = props.taskPadding) !== null && _30 !== void 0 ? _30 : 5;
        this._taskRadius = (_31 = props.taskRadius) !== null && _31 !== void 0 ? _31 : 2;
        this.taskFontSize = (_32 = props.taskFontSize) !== null && _32 !== void 0 ? _32 : 16;
        this.taskFontLineHeight = (_33 = props.taskFontLineHeight) !== null && _33 !== void 0 ? _33 : this.taskFontSize;
        this.taskFontWeight = (_34 = props.taskFontWeight) !== null && _34 !== void 0 ? _34 : 400;
        this.taskFontFamily = (_35 = props.taskFontFamily) !== null && _35 !== void 0 ? _35 : "serif";
        this.taskErrorStrokeColor = props.taskErrorStrokeColor;
        this._minTaskWidth = (_36 = props.minTaskWidth) !== null && _36 !== void 0 ? _36 : 10;
        this.taskRenderResizeControls = (_37 = props.taskRenderResizeControls) !== null && _37 !== void 0 ? _37 : true;
        this._taskRenderResizeControlsWidth = (_38 = props.taskRenderResizeControlsWidth) !== null && _38 !== void 0 ? _38 : 6;
        this.taskRenderResizeControlsColor = (_39 = props.taskRenderResizeControlsColor) !== null && _39 !== void 0 ? _39 : config_1.COLORS.WHITE;
        this.taskRenderResizeControlsRadius = (_40 = props.taskRenderResizeControlsRadius) !== null && _40 !== void 0 ? _40 : 2;
        this.taskRenderDepControl = (_41 = props.taskRenderDepControl) !== null && _41 !== void 0 ? _41 : true;
        this._taskRenderDepRadius = (_42 = props.taskRenderDepRadius) !== null && _42 !== void 0 ? _42 : 7;
        this._taskRenderDepOffsetX = (_43 = props.taskRenderDepOffsetX) !== null && _43 !== void 0 ? _43 : 7;
        this.taskRenderDepLineColor = (_44 = props.taskRenderDepLineColor) !== null && _44 !== void 0 ? _44 : config_1.COLORS.BLACK;
        this.taskRenderDepBackground = (_45 = props.taskRenderDepBackground) !== null && _45 !== void 0 ? _45 : config_1.COLORS.WHITE;
        this.arrowColor = (_46 = props.arrowColor) !== null && _46 !== void 0 ? _46 : config_1.COLORS.BLUE;
        this._arrowWidth = (_47 = props.arrowWidth) !== null && _47 !== void 0 ? _47 : 1;
        this.arrowActiveColor = (_48 = props.arrowActiveColor) !== null && _48 !== void 0 ? _48 : config_1.COLORS.D_BLUE;
        this.arrowHoverColor = (_49 = props.arrowHoverColor) !== null && _49 !== void 0 ? _49 : config_1.COLORS.D_VIOLET;
        this._arrowHoverWidth = (_50 = props.arrowHoverWidth) !== null && _50 !== void 0 ? _50 : 2;
        this._arrowHoverHeadWidth = (_51 = props.arrowHoverHeadWidth) !== null && _51 !== void 0 ? _51 : 2;
        this._arrowRadius = (_52 = props.arrowRadius) !== null && _52 !== void 0 ? _52 : 2;
        this.scrollbarXHeight = (_53 = props.scrollbarXHeight) !== null && _53 !== void 0 ? _53 : 12;
        this.scrollbarXBackground = (_54 = props.scrollbarXBackground) !== null && _54 !== void 0 ? _54 : config_1.COLORS.L_GREY;
        this.scrollbarXLineBackground = (_55 = props.scrollbarXLineBackground) !== null && _55 !== void 0 ? _55 : config_1.COLORS.GREY;
        this.scrollbarXLineRadius = (_56 = props.scrollbarXLineRadius) !== null && _56 !== void 0 ? _56 : 6;
        this.scrollbarYWidth = (_57 = props.scrollbarYWidth) !== null && _57 !== void 0 ? _57 : 12;
        this.scrollbarYBackground = (_58 = props.scrollbarYBackground) !== null && _58 !== void 0 ? _58 : config_1.COLORS.L_GREY;
        this.scrollbarYLineBackground = (_59 = props.scrollbarYLineBackground) !== null && _59 !== void 0 ? _59 : config_1.COLORS.GREY;
        this.scrollbarYLineRadius = (_60 = props.scrollbarYLineRadius) !== null && _60 !== void 0 ? _60 : 6;
        this.handleChange = props.handleChange;
        this.handleTaskClick = props.handleTaskClick;
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
