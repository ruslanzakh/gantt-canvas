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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52;
        this.root = root;
        this.tasks = props.tasks;
        this.moveDependedOnResizeRight = (_a = props.moveDependedOnResizeRight) !== null && _a !== void 0 ? _a : true;
        this.moveDependedOnResizeLeft = (_b = props.moveDependedOnResizeLeft) !== null && _b !== void 0 ? _b : false;
        this.moveDependedOnMove = (_c = props.moveDependedOnMove) !== null && _c !== void 0 ? _c : true;
        this.showTime = (_d = props.showTime) !== null && _d !== void 0 ? _d : false;
        this.startFromToday = (_e = props.startFromToday) !== null && _e !== void 0 ? _e : true;
        this.renderAllTasksFromStart = (_f = props.renderAllTasksFromStart) !== null && _f !== void 0 ? _f : true;
        this.showMonthMiddle = (_g = props.showMonthMiddle) !== null && _g !== void 0 ? _g : false;
        this.viewMode = (_h = props.viewMode) !== null && _h !== void 0 ? _h : 'day';
        this.isLoading = (_j = props.isLoading) !== null && _j !== void 0 ? _j : false;
        this.monthNames = __assign(__assign({}, config_1.MONTH_NAMES), (_k = props.monthNames) !== null && _k !== void 0 ? _k : {});
        this.lang = (_l = props.lang) !== null && _l !== void 0 ? _l : 'ru';
        this.scale = (_m = props.scale) !== null && _m !== void 0 ? _m : 1;
        this.monthHeight = (_o = props.monthHeight) !== null && _o !== void 0 ? _o : 55;
        this.renderMonthBottomLine = (_p = props.renderMonthBottomLine) !== null && _p !== void 0 ? _p : true;
        this.renderMonthLeftLine = (_q = props.renderMonthLeftLine) !== null && _q !== void 0 ? _q : true;
        this.monthLineColor = (_r = props.monthLineColor) !== null && _r !== void 0 ? _r : config_1.COLORS.L_GREY;
        this.monthTitleFont = (_s = props.monthTitleFont) !== null && _s !== void 0 ? _s : '600 20px Arial';
        this.monthTitleColor = (_t = props.monthTitleColor) !== null && _t !== void 0 ? _t : config_1.COLORS.BLACK;
        this.monthTitleShowYear = (_u = props.monthTitleShowYear) !== null && _u !== void 0 ? _u : true;
        this._dayHeight = (_v = props.dayHeight) !== null && _v !== void 0 ? _v : 28;
        this.renderDayStartMonthLine = (_w = props.renderDayStartMonthLine) !== null && _w !== void 0 ? _w : true;
        this.dayStartMonthLine = (_x = props.dayStartMonthLine) !== null && _x !== void 0 ? _x : config_1.COLORS.L_GREY;
        this.dayBottomLineColor = (_y = props.dayBottomLineColor) !== null && _y !== void 0 ? _y : config_1.COLORS.L_GREY;
        this.dayTodayBackground = (_z = props.dayTodayBackground) !== null && _z !== void 0 ? _z : config_1.COLORS.L_BLUE;
        this.dayWeekendBackground = props.dayWeekendBackground;
        this.dayWeekendColor = props.dayWeekendColor;
        this.dayFontSize = (_0 = props.dayFontSize) !== null && _0 !== void 0 ? _0 : 14;
        this.dayFontLineHeight = (_1 = props.dayFontLineHeight) !== null && _1 !== void 0 ? _1 : this.dayFontSize;
        this.dayFontWeight = (_2 = props.dayFontWeight) !== null && _2 !== void 0 ? _2 : 500;
        this.dayFontFamily = (_3 = props.dayFontFamily) !== null && _3 !== void 0 ? _3 : 'Arial';
        this.dayColor = (_4 = props.dayColor) !== null && _4 !== void 0 ? _4 : config_1.COLORS.BLACK;
        this._dayColWidth = (_5 = props.dayColWidth) !== null && _5 !== void 0 ? _5 : 40;
        this._weekViewColWidth = (_6 = props.weekViewColWidth) !== null && _6 !== void 0 ? _6 : 120;
        this._monthViewColWidth = (_7 = props.monthViewColWidth) !== null && _7 !== void 0 ? _7 : 180;
        this._rowHeight = (_8 = props.rowHeight) !== null && _8 !== void 0 ? _8 : 40;
        this.colLineColor = (_9 = props.colLineColor) !== null && _9 !== void 0 ? _9 : config_1.COLORS.L_GREY;
        this.colStartMonthLineColor = props.colStartMonthLineColor;
        this.rowLineColor = (_10 = props.rowLineColor) !== null && _10 !== void 0 ? _10 : config_1.COLORS.L_GREY;
        this.rowEvenBackground = (_11 = props.rowEvenBackground) !== null && _11 !== void 0 ? _11 : config_1.COLORS.WHITE;
        this.rowOddBackground = (_12 = props.rowOddBackground) !== null && _12 !== void 0 ? _12 : config_1.COLORS.WHITE;
        this.taskDefaultBackground = (_13 = props.taskDefaultBackground) !== null && _13 !== void 0 ? _13 : config_1.COLORS.VIOLET;
        this.taskDefaultHoverBackground = (_14 = props.taskDefaultHoverBackground) !== null && _14 !== void 0 ? _14 : config_1.COLORS.D_VIOLET;
        this.taskDefaultStrokeColor = props.taskDefaultStrokeColor;
        this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
        this.taskDefaultColor = (_15 = props.taskDefaultColor) !== null && _15 !== void 0 ? _15 : config_1.COLORS.WHITE;
        this.taskDefaultHoverColor = (_16 = props.taskDefaultHoverColor) !== null && _16 !== void 0 ? _16 : config_1.COLORS.WHITE;
        this.taskDefaultOutlineColor = (_17 = props.taskDefaultOutlineColor) !== null && _17 !== void 0 ? _17 : config_1.COLORS.BLACK;
        this.taskDefaultSubtitleColor = (_18 = props.taskDefaultSubtitleColor) !== null && _18 !== void 0 ? _18 : config_1.COLORS.WHITE;
        this.taskDefaultSubtitleOutlineColor = (_19 = props.taskDefaultSubtitleOutlineColor) !== null && _19 !== void 0 ? _19 : config_1.COLORS.BLACK;
        this._taskSubtitleOffset = (_20 = props.taskSubtitleOffset) !== null && _20 !== void 0 ? _20 : 10;
        this._taskHeight = (_21 = props.taskHeight) !== null && _21 !== void 0 ? _21 : 34;
        this._taskPadding = (_22 = props.taskPadding) !== null && _22 !== void 0 ? _22 : 5;
        this._taskRadius = (_23 = props.taskRadius) !== null && _23 !== void 0 ? _23 : 2;
        this.taskFontSize = (_24 = props.taskFontSize) !== null && _24 !== void 0 ? _24 : 16;
        this.taskFontLineHeight = (_25 = props.taskFontLineHeight) !== null && _25 !== void 0 ? _25 : this.taskFontSize;
        this.taskFontWeight = (_26 = props.taskFontWeight) !== null && _26 !== void 0 ? _26 : 400;
        this.taskFontFamily = (_27 = props.taskFontFamily) !== null && _27 !== void 0 ? _27 : "serif";
        this.taskErrorStrokeColor = props.taskErrorStrokeColor;
        this._minTaskWidth = (_28 = props.minTaskWidth) !== null && _28 !== void 0 ? _28 : 10;
        this.taskRenderResizeControls = (_29 = props.taskRenderResizeControls) !== null && _29 !== void 0 ? _29 : true;
        this._taskRenderResizeControlsWidth = (_30 = props.taskRenderResizeControlsWidth) !== null && _30 !== void 0 ? _30 : 6;
        this.taskRenderResizeControlsColor = (_31 = props.taskRenderResizeControlsColor) !== null && _31 !== void 0 ? _31 : config_1.COLORS.WHITE;
        this.taskRenderResizeControlsRadius = (_32 = props.taskRenderResizeControlsRadius) !== null && _32 !== void 0 ? _32 : 2;
        this.taskRenderDepControl = (_33 = props.taskRenderDepControl) !== null && _33 !== void 0 ? _33 : true;
        this._taskRenderDepRadius = (_34 = props.taskRenderDepRadius) !== null && _34 !== void 0 ? _34 : 7;
        this._taskRenderDepOffsetX = (_35 = props.taskRenderDepOffsetX) !== null && _35 !== void 0 ? _35 : 7;
        this.taskRenderDepLineColor = (_36 = props.taskRenderDepLineColor) !== null && _36 !== void 0 ? _36 : config_1.COLORS.BLACK;
        this.taskRenderDepBackground = (_37 = props.taskRenderDepBackground) !== null && _37 !== void 0 ? _37 : config_1.COLORS.WHITE;
        this.arrowColor = (_38 = props.arrowColor) !== null && _38 !== void 0 ? _38 : config_1.COLORS.BLUE;
        this._arrowWidth = (_39 = props.arrowWidth) !== null && _39 !== void 0 ? _39 : 1;
        this.arrowActiveColor = (_40 = props.arrowActiveColor) !== null && _40 !== void 0 ? _40 : config_1.COLORS.D_BLUE;
        this.arrowHoverColor = (_41 = props.arrowHoverColor) !== null && _41 !== void 0 ? _41 : config_1.COLORS.D_VIOLET;
        this._arrowHoverWidth = (_42 = props.arrowHoverWidth) !== null && _42 !== void 0 ? _42 : 2;
        this._arrowHoverHeadWidth = (_43 = props.arrowHoverHeadWidth) !== null && _43 !== void 0 ? _43 : 2;
        this._arrowRadius = (_44 = props.arrowRadius) !== null && _44 !== void 0 ? _44 : 2;
        this.scrollbarXHeight = (_45 = props.scrollbarXHeight) !== null && _45 !== void 0 ? _45 : 12;
        this.scrollbarXBackground = (_46 = props.scrollbarXBackground) !== null && _46 !== void 0 ? _46 : config_1.COLORS.L_GREY;
        this.scrollbarXLineBackground = (_47 = props.scrollbarXLineBackground) !== null && _47 !== void 0 ? _47 : config_1.COLORS.GREY;
        this.scrollbarXLineRadius = (_48 = props.scrollbarXLineRadius) !== null && _48 !== void 0 ? _48 : 6;
        this.scrollbarYWidth = (_49 = props.scrollbarYWidth) !== null && _49 !== void 0 ? _49 : 12;
        this.scrollbarYBackground = (_50 = props.scrollbarYBackground) !== null && _50 !== void 0 ? _50 : config_1.COLORS.L_GREY;
        this.scrollbarYLineBackground = (_51 = props.scrollbarYLineBackground) !== null && _51 !== void 0 ? _51 : config_1.COLORS.GREY;
        this.scrollbarYLineRadius = (_52 = props.scrollbarYLineRadius) !== null && _52 !== void 0 ? _52 : 6;
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
                var height = _this.root.view.offsetY * scale;
                var maxHeight = _this.root.grid.service.getLeftAvailableHeight();
                if (height > maxHeight)
                    height = maxHeight;
                _this.root.view.handleSetOffsetY(height);
            }
        });
    };
    return RootApi;
}());
exports.RootApi = RootApi;
