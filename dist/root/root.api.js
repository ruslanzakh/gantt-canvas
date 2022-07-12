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
        this.monthNames = __assign(__assign({}, config_1.MONTH_NAMES), ((_l = props.monthNames) !== null && _l !== void 0 ? _l : {}));
        this.weekdayNames = __assign(__assign({}, config_1.WEEKDAY_NAMES), ((_m = props.weekdayNames) !== null && _m !== void 0 ? _m : {}));
        this.lang = (_o = props.lang) !== null && _o !== void 0 ? _o : 'ru';
        this._background = (_p = props.background) !== null && _p !== void 0 ? _p : config_1.COLORS.WHITE;
        this.scale = (_q = props.scale) !== null && _q !== void 0 ? _q : 1;
        this.allowMobileTaskMove = (_r = props.allowMobileTaskMove) !== null && _r !== void 0 ? _r : false;
        this.allowMobileTaskResize = (_s = props.allowMobileTaskResize) !== null && _s !== void 0 ? _s : false;
        this.monthHeight = (_t = props.monthHeight) !== null && _t !== void 0 ? _t : 55;
        this.renderMonthBottomLine = (_u = props.renderMonthBottomLine) !== null && _u !== void 0 ? _u : true;
        this.renderMonthLeftLine = (_v = props.renderMonthLeftLine) !== null && _v !== void 0 ? _v : true;
        this._monthLineColor = (_w = props.monthLineColor) !== null && _w !== void 0 ? _w : config_1.COLORS.L_GREY;
        this.monthTitleFont = (_x = props.monthTitleFont) !== null && _x !== void 0 ? _x : '600 20px Arial';
        this._monthTitleColor = (_y = props.monthTitleColor) !== null && _y !== void 0 ? _y : config_1.COLORS.BLACK;
        this.monthTitleShowYear = (_z = props.monthTitleShowYear) !== null && _z !== void 0 ? _z : true;
        this._dayHeight = props.dayHeight
            ? props.dayHeight
            : props.showDayWeekday
                ? 48
                : 28;
        this.renderDayStartMonthLine = (_0 = props.renderDayStartMonthLine) !== null && _0 !== void 0 ? _0 : true;
        this._dayStartMonthLine = (_1 = props.dayStartMonthLine) !== null && _1 !== void 0 ? _1 : config_1.COLORS.L_GREY;
        this._dayBottomLineColor = (_2 = props.dayBottomLineColor) !== null && _2 !== void 0 ? _2 : config_1.COLORS.L_GREY;
        this._dayTodayBackground = (_3 = props.dayTodayBackground) !== null && _3 !== void 0 ? _3 : config_1.COLORS.L_BLUE;
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
        this._dayColor = (_9 = props.dayColor) !== null && _9 !== void 0 ? _9 : config_1.COLORS.BLACK;
        this.weekdayFontSize = (_10 = props.weekdayFontSize) !== null && _10 !== void 0 ? _10 : 14;
        this.weekdayFontLineHeight =
            (_11 = props.weekdayFontLineHeight) !== null && _11 !== void 0 ? _11 : this.weekdayFontSize;
        this.weekdayFontWeight = (_12 = props.weekdayFontWeight) !== null && _12 !== void 0 ? _12 : 500;
        this.weekdayFontFamily = (_13 = props.weekdayFontFamily) !== null && _13 !== void 0 ? _13 : 'Arial';
        this._weekdayColor = (_14 = props.weekdayColor) !== null && _14 !== void 0 ? _14 : config_1.COLORS.BLACK;
        this._weekdayWeekendColor = props.weekdayWeekendColor;
        this._dayColWidth = (_15 = props.dayColWidth) !== null && _15 !== void 0 ? _15 : 40;
        this._weekViewColWidth = (_16 = props.weekViewColWidth) !== null && _16 !== void 0 ? _16 : 120;
        this._monthViewColWidth = (_17 = props.monthViewColWidth) !== null && _17 !== void 0 ? _17 : 180;
        this._rowHeight = (_18 = props.rowHeight) !== null && _18 !== void 0 ? _18 : 40;
        this._colLineColor = (_19 = props.colLineColor) !== null && _19 !== void 0 ? _19 : config_1.COLORS.L_GREY;
        this._colStartMonthLineColor = props.colStartMonthLineColor;
        this._rowLineColor = (_20 = props.rowLineColor) !== null && _20 !== void 0 ? _20 : config_1.COLORS.L_GREY;
        this._rowEvenBackground = (_21 = props.rowEvenBackground) !== null && _21 !== void 0 ? _21 : config_1.COLORS.WHITE;
        this._rowOddBackground = (_22 = props.rowOddBackground) !== null && _22 !== void 0 ? _22 : config_1.COLORS.WHITE;
        this._taskDefaultBackground =
            (_23 = props.taskDefaultBackground) !== null && _23 !== void 0 ? _23 : config_1.COLORS.VIOLET;
        this._taskDefaultHoverBackground =
            (_24 = props.taskDefaultHoverBackground) !== null && _24 !== void 0 ? _24 : config_1.COLORS.D_VIOLET;
        this._taskDefaultStrokeColor = props.taskDefaultStrokeColor;
        this._taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
        this._taskDefaultColor = (_25 = props.taskDefaultColor) !== null && _25 !== void 0 ? _25 : config_1.COLORS.WHITE;
        this._taskDefaultHoverColor =
            (_26 = props.taskDefaultHoverColor) !== null && _26 !== void 0 ? _26 : config_1.COLORS.WHITE;
        this._taskDefaultOutlineColor =
            (_27 = props.taskDefaultOutlineColor) !== null && _27 !== void 0 ? _27 : config_1.COLORS.BLACK;
        this._taskDefaultSubtitleColor =
            (_28 = props.taskDefaultSubtitleColor) !== null && _28 !== void 0 ? _28 : config_1.COLORS.WHITE;
        this._taskDefaultSubtitleOutlineColor =
            (_29 = props.taskDefaultSubtitleOutlineColor) !== null && _29 !== void 0 ? _29 : config_1.COLORS.BLACK;
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
            (_41 = props.taskRenderResizeControlsColor) !== null && _41 !== void 0 ? _41 : config_1.COLORS.WHITE;
        this.taskRenderResizeControlsRadius =
            (_42 = props.taskRenderResizeControlsRadius) !== null && _42 !== void 0 ? _42 : 2;
        this.taskRenderDepControl = (_43 = props.taskRenderDepControl) !== null && _43 !== void 0 ? _43 : true;
        this._taskRenderDepRadius = (_44 = props.taskRenderDepRadius) !== null && _44 !== void 0 ? _44 : 7;
        this._taskRenderDepOffsetX = (_45 = props.taskRenderDepOffsetX) !== null && _45 !== void 0 ? _45 : 7;
        this._taskRenderDepLineWidth = (_46 = props.taskRenderDepLineWidth) !== null && _46 !== void 0 ? _46 : 1;
        this._taskRenderDepLineColor =
            (_47 = props.taskRenderDepLineColor) !== null && _47 !== void 0 ? _47 : config_1.COLORS.BLACK;
        this._taskRenderDepBackground =
            (_48 = props.taskRenderDepBackground) !== null && _48 !== void 0 ? _48 : config_1.COLORS.WHITE;
        this._arrowColor = (_49 = props.arrowColor) !== null && _49 !== void 0 ? _49 : config_1.COLORS.BLUE;
        this._arrowWidth = (_50 = props.arrowWidth) !== null && _50 !== void 0 ? _50 : 1;
        this._arrowActiveColor = (_51 = props.arrowActiveColor) !== null && _51 !== void 0 ? _51 : config_1.COLORS.D_BLUE;
        this._arrowHoverColor = (_52 = props.arrowHoverColor) !== null && _52 !== void 0 ? _52 : config_1.COLORS.D_VIOLET;
        this._arrowHoverWidth = (_53 = props.arrowHoverWidth) !== null && _53 !== void 0 ? _53 : 2;
        this._arrowHoverHeadWidth = (_54 = props.arrowHoverHeadWidth) !== null && _54 !== void 0 ? _54 : 2;
        this._arrowRadius = (_55 = props.arrowRadius) !== null && _55 !== void 0 ? _55 : 2;
        this.scrollbarXHeight = (_56 = props.scrollbarXHeight) !== null && _56 !== void 0 ? _56 : 12;
        this._scrollbarXBackground =
            (_57 = props.scrollbarXBackground) !== null && _57 !== void 0 ? _57 : config_1.COLORS.L_GREY;
        this._scrollbarXLineBackground =
            (_58 = props.scrollbarXLineBackground) !== null && _58 !== void 0 ? _58 : config_1.COLORS.GREY;
        this.scrollbarXLineRadius = (_59 = props.scrollbarXLineRadius) !== null && _59 !== void 0 ? _59 : 6;
        this.scrollbarYWidth = (_60 = props.scrollbarYWidth) !== null && _60 !== void 0 ? _60 : 12;
        this._scrollbarYBackground =
            (_61 = props.scrollbarYBackground) !== null && _61 !== void 0 ? _61 : config_1.COLORS.L_GREY;
        this._scrollbarYLineBackground =
            (_62 = props.scrollbarYLineBackground) !== null && _62 !== void 0 ? _62 : config_1.COLORS.GREY;
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
            return this.root.service.convertColor(this._background, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "monthLineColor", {
        get: function () {
            return this.root.service.convertColor(this._monthLineColor, config_1.COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "monthTitleColor", {
        get: function () {
            return this.root.service.convertColor(this._monthTitleColor, config_1.COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayStartMonthLine", {
        get: function () {
            return this.root.service.convertColor(this._dayStartMonthLine, config_1.COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayBottomLineColor", {
        get: function () {
            return this.root.service.convertColor(this._dayBottomLineColor, config_1.COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "dayTodayBackground", {
        get: function () {
            return this.root.service.convertColor(this._dayTodayBackground, config_1.COLORS.L_BLUE);
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
            return this.root.service.convertColor(this._dayColor, config_1.COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "weekdayColor", {
        get: function () {
            return this.root.service.convertColor(this._weekdayColor, config_1.COLORS.BLACK);
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
            return this.root.service.convertColor(this._colLineColor, config_1.COLORS.L_GREY);
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
            return this.root.service.convertColor(this._rowLineColor, config_1.COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "rowEvenBackground", {
        get: function () {
            return this.root.service.convertColor(this._rowEvenBackground, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "rowOddBackground", {
        get: function () {
            return this.root.service.convertColor(this._rowOddBackground, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultBackground", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultBackground, config_1.COLORS.VIOLET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultHoverBackground", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultHoverBackground, config_1.COLORS.D_VIOLET);
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
            return this.root.service.convertColor(this._taskDefaultColor, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultHoverColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultHoverColor, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultOutlineColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultOutlineColor, config_1.COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultSubtitleColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultSubtitleColor, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskDefaultSubtitleOutlineColor", {
        get: function () {
            return this.root.service.convertColor(this._taskDefaultSubtitleOutlineColor, config_1.COLORS.BLACK);
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
            return this.root.service.convertColor(this._taskRenderResizeControlsColor, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderDepLineColor", {
        get: function () {
            return this.root.service.convertColor(this._taskRenderDepLineColor, config_1.COLORS.BLACK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "taskRenderDepBackground", {
        get: function () {
            return this.root.service.convertColor(this._taskRenderDepBackground, config_1.COLORS.WHITE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowColor", {
        get: function () {
            return this.root.service.convertColor(this._arrowColor, config_1.COLORS.BLUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowActiveColor", {
        get: function () {
            return this.root.service.convertColor(this._arrowActiveColor, config_1.COLORS.D_BLUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "arrowHoverColor", {
        get: function () {
            return this.root.service.convertColor(this._arrowHoverColor, config_1.COLORS.D_VIOLET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarXBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarXBackground, config_1.COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarXLineBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarXLineBackground, config_1.COLORS.GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarYBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarYBackground, config_1.COLORS.L_GREY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootApi.prototype, "scrollbarYLineBackground", {
        get: function () {
            return this.root.service.convertColor(this._scrollbarYLineBackground, config_1.COLORS.GREY);
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
        animate_1.animate({
            duration: 300,
            timing: animate_1.timing,
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
exports.RootApi = RootApi;
