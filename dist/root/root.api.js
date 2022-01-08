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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53;
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
        this.lang = (_m = props.lang) !== null && _m !== void 0 ? _m : 'ru';
        this.scale = (_o = props.scale) !== null && _o !== void 0 ? _o : 1;
        this.monthHeight = (_p = props.monthHeight) !== null && _p !== void 0 ? _p : 55;
        this.renderMonthBottomLine = (_q = props.renderMonthBottomLine) !== null && _q !== void 0 ? _q : true;
        this.renderMonthLeftLine = (_r = props.renderMonthLeftLine) !== null && _r !== void 0 ? _r : true;
        this.monthLineColor = (_s = props.monthLineColor) !== null && _s !== void 0 ? _s : config_1.COLORS.L_GREY;
        this.monthTitleFont = (_t = props.monthTitleFont) !== null && _t !== void 0 ? _t : '600 20px Arial';
        this.monthTitleColor = (_u = props.monthTitleColor) !== null && _u !== void 0 ? _u : config_1.COLORS.BLACK;
        this.monthTitleShowYear = (_v = props.monthTitleShowYear) !== null && _v !== void 0 ? _v : true;
        this._dayHeight = (_w = props.dayHeight) !== null && _w !== void 0 ? _w : 28;
        this.renderDayStartMonthLine = (_x = props.renderDayStartMonthLine) !== null && _x !== void 0 ? _x : true;
        this.dayStartMonthLine = (_y = props.dayStartMonthLine) !== null && _y !== void 0 ? _y : config_1.COLORS.L_GREY;
        this.dayBottomLineColor = (_z = props.dayBottomLineColor) !== null && _z !== void 0 ? _z : config_1.COLORS.L_GREY;
        this.dayTodayBackground = (_0 = props.dayTodayBackground) !== null && _0 !== void 0 ? _0 : config_1.COLORS.L_BLUE;
        this.dayWeekendBackground = props.dayWeekendBackground;
        this.dayWeekendColor = props.dayWeekendColor;
        this.dayFontSize = (_1 = props.dayFontSize) !== null && _1 !== void 0 ? _1 : 14;
        this.dayFontLineHeight = (_2 = props.dayFontLineHeight) !== null && _2 !== void 0 ? _2 : this.dayFontSize;
        this.dayFontWeight = (_3 = props.dayFontWeight) !== null && _3 !== void 0 ? _3 : 500;
        this.dayFontFamily = (_4 = props.dayFontFamily) !== null && _4 !== void 0 ? _4 : 'Arial';
        this.dayColor = (_5 = props.dayColor) !== null && _5 !== void 0 ? _5 : config_1.COLORS.BLACK;
        this._dayColWidth = (_6 = props.dayColWidth) !== null && _6 !== void 0 ? _6 : 40;
        this._weekViewColWidth = (_7 = props.weekViewColWidth) !== null && _7 !== void 0 ? _7 : 120;
        this._monthViewColWidth = (_8 = props.monthViewColWidth) !== null && _8 !== void 0 ? _8 : 180;
        this._rowHeight = (_9 = props.rowHeight) !== null && _9 !== void 0 ? _9 : 40;
        this.colLineColor = (_10 = props.colLineColor) !== null && _10 !== void 0 ? _10 : config_1.COLORS.L_GREY;
        this.colStartMonthLineColor = props.colStartMonthLineColor;
        this.rowLineColor = (_11 = props.rowLineColor) !== null && _11 !== void 0 ? _11 : config_1.COLORS.L_GREY;
        this.rowEvenBackground = (_12 = props.rowEvenBackground) !== null && _12 !== void 0 ? _12 : config_1.COLORS.WHITE;
        this.rowOddBackground = (_13 = props.rowOddBackground) !== null && _13 !== void 0 ? _13 : config_1.COLORS.WHITE;
        this.taskDefaultBackground = (_14 = props.taskDefaultBackground) !== null && _14 !== void 0 ? _14 : config_1.COLORS.VIOLET;
        this.taskDefaultHoverBackground = (_15 = props.taskDefaultHoverBackground) !== null && _15 !== void 0 ? _15 : config_1.COLORS.D_VIOLET;
        this.taskDefaultStrokeColor = props.taskDefaultStrokeColor;
        this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
        this.taskDefaultColor = (_16 = props.taskDefaultColor) !== null && _16 !== void 0 ? _16 : config_1.COLORS.WHITE;
        this.taskDefaultHoverColor = (_17 = props.taskDefaultHoverColor) !== null && _17 !== void 0 ? _17 : config_1.COLORS.WHITE;
        this.taskDefaultOutlineColor = (_18 = props.taskDefaultOutlineColor) !== null && _18 !== void 0 ? _18 : config_1.COLORS.BLACK;
        this.taskDefaultSubtitleColor = (_19 = props.taskDefaultSubtitleColor) !== null && _19 !== void 0 ? _19 : config_1.COLORS.WHITE;
        this.taskDefaultSubtitleOutlineColor = (_20 = props.taskDefaultSubtitleOutlineColor) !== null && _20 !== void 0 ? _20 : config_1.COLORS.BLACK;
        this._taskSubtitleOffset = (_21 = props.taskSubtitleOffset) !== null && _21 !== void 0 ? _21 : 10;
        this._taskHeight = (_22 = props.taskHeight) !== null && _22 !== void 0 ? _22 : 34;
        this._taskPadding = (_23 = props.taskPadding) !== null && _23 !== void 0 ? _23 : 5;
        this._taskRadius = (_24 = props.taskRadius) !== null && _24 !== void 0 ? _24 : 2;
        this.taskFontSize = (_25 = props.taskFontSize) !== null && _25 !== void 0 ? _25 : 16;
        this.taskFontLineHeight = (_26 = props.taskFontLineHeight) !== null && _26 !== void 0 ? _26 : this.taskFontSize;
        this.taskFontWeight = (_27 = props.taskFontWeight) !== null && _27 !== void 0 ? _27 : 400;
        this.taskFontFamily = (_28 = props.taskFontFamily) !== null && _28 !== void 0 ? _28 : "serif";
        this.taskErrorStrokeColor = props.taskErrorStrokeColor;
        this._minTaskWidth = (_29 = props.minTaskWidth) !== null && _29 !== void 0 ? _29 : 10;
        this.taskRenderResizeControls = (_30 = props.taskRenderResizeControls) !== null && _30 !== void 0 ? _30 : true;
        this._taskRenderResizeControlsWidth = (_31 = props.taskRenderResizeControlsWidth) !== null && _31 !== void 0 ? _31 : 6;
        this.taskRenderResizeControlsColor = (_32 = props.taskRenderResizeControlsColor) !== null && _32 !== void 0 ? _32 : config_1.COLORS.WHITE;
        this.taskRenderResizeControlsRadius = (_33 = props.taskRenderResizeControlsRadius) !== null && _33 !== void 0 ? _33 : 2;
        this.taskRenderDepControl = (_34 = props.taskRenderDepControl) !== null && _34 !== void 0 ? _34 : true;
        this._taskRenderDepRadius = (_35 = props.taskRenderDepRadius) !== null && _35 !== void 0 ? _35 : 7;
        this._taskRenderDepOffsetX = (_36 = props.taskRenderDepOffsetX) !== null && _36 !== void 0 ? _36 : 7;
        this.taskRenderDepLineColor = (_37 = props.taskRenderDepLineColor) !== null && _37 !== void 0 ? _37 : config_1.COLORS.BLACK;
        this.taskRenderDepBackground = (_38 = props.taskRenderDepBackground) !== null && _38 !== void 0 ? _38 : config_1.COLORS.WHITE;
        this.arrowColor = (_39 = props.arrowColor) !== null && _39 !== void 0 ? _39 : config_1.COLORS.BLUE;
        this._arrowWidth = (_40 = props.arrowWidth) !== null && _40 !== void 0 ? _40 : 1;
        this.arrowActiveColor = (_41 = props.arrowActiveColor) !== null && _41 !== void 0 ? _41 : config_1.COLORS.D_BLUE;
        this.arrowHoverColor = (_42 = props.arrowHoverColor) !== null && _42 !== void 0 ? _42 : config_1.COLORS.D_VIOLET;
        this._arrowHoverWidth = (_43 = props.arrowHoverWidth) !== null && _43 !== void 0 ? _43 : 2;
        this._arrowHoverHeadWidth = (_44 = props.arrowHoverHeadWidth) !== null && _44 !== void 0 ? _44 : 2;
        this._arrowRadius = (_45 = props.arrowRadius) !== null && _45 !== void 0 ? _45 : 2;
        this.scrollbarXHeight = (_46 = props.scrollbarXHeight) !== null && _46 !== void 0 ? _46 : 12;
        this.scrollbarXBackground = (_47 = props.scrollbarXBackground) !== null && _47 !== void 0 ? _47 : config_1.COLORS.L_GREY;
        this.scrollbarXLineBackground = (_48 = props.scrollbarXLineBackground) !== null && _48 !== void 0 ? _48 : config_1.COLORS.GREY;
        this.scrollbarXLineRadius = (_49 = props.scrollbarXLineRadius) !== null && _49 !== void 0 ? _49 : 6;
        this.scrollbarYWidth = (_50 = props.scrollbarYWidth) !== null && _50 !== void 0 ? _50 : 12;
        this.scrollbarYBackground = (_51 = props.scrollbarYBackground) !== null && _51 !== void 0 ? _51 : config_1.COLORS.L_GREY;
        this.scrollbarYLineBackground = (_52 = props.scrollbarYLineBackground) !== null && _52 !== void 0 ? _52 : config_1.COLORS.GREY;
        this.scrollbarYLineRadius = (_53 = props.scrollbarYLineRadius) !== null && _53 !== void 0 ? _53 : 6;
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
