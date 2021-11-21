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
var RootApi = /** @class */ (function () {
    function RootApi(root, props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38;
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
        this.monthHeight = (_m = props.monthHeight) !== null && _m !== void 0 ? _m : 55;
        this.renderMonthBottomLine = (_o = props.renderMonthBottomLine) !== null && _o !== void 0 ? _o : true;
        this.renderMonthLeftLine = (_p = props.renderMonthLeftLine) !== null && _p !== void 0 ? _p : true;
        this.monthLineColor = (_q = props.monthLineColor) !== null && _q !== void 0 ? _q : config_1.COLORS.L_GREY;
        this.monthTitleFont = (_r = props.monthTitleFont) !== null && _r !== void 0 ? _r : '600 20px Arial';
        this.monthTitleColor = (_s = props.monthTitleColor) !== null && _s !== void 0 ? _s : config_1.COLORS.BLACK;
        this.monthTitleShowYear = (_t = props.monthTitleShowYear) !== null && _t !== void 0 ? _t : true;
        this.dayHeight = (_u = props.dayHeight) !== null && _u !== void 0 ? _u : 28;
        this.renderDayStartMonthLine = (_v = props.renderDayStartMonthLine) !== null && _v !== void 0 ? _v : true;
        this.dayStartMonthLine = (_w = props.dayStartMonthLine) !== null && _w !== void 0 ? _w : config_1.COLORS.L_GREY;
        this.dayBottomLineColor = (_x = props.dayBottomLineColor) !== null && _x !== void 0 ? _x : config_1.COLORS.L_GREY;
        this.dayTodayBackground = (_y = props.dayTodayBackground) !== null && _y !== void 0 ? _y : config_1.COLORS.L_BLUE;
        this.dayWeekendBackground = props.dayWeekendBackground;
        this.dayWeekendColor = props.dayWeekendColor;
        this.dayFont = (_z = props.dayFont) !== null && _z !== void 0 ? _z : '500 14px Arial';
        this.dayColor = (_0 = props.dayColor) !== null && _0 !== void 0 ? _0 : config_1.COLORS.BLACK;
        this.dayColWidth = (_1 = props.dayColWidth) !== null && _1 !== void 0 ? _1 : 40;
        this.weekViewColWidth = (_2 = props.weekViewColWidth) !== null && _2 !== void 0 ? _2 : 120;
        this.monthViewColWidth = (_3 = props.monthViewColWidth) !== null && _3 !== void 0 ? _3 : 180;
        this.rowHeight = (_4 = props.rowHeight) !== null && _4 !== void 0 ? _4 : 40;
        this.colLineColor = (_5 = props.colLineColor) !== null && _5 !== void 0 ? _5 : config_1.COLORS.L_GREY;
        this.colStartMonthLineColor = props.colStartMonthLineColor;
        this.rowLineColor = (_6 = props.rowLineColor) !== null && _6 !== void 0 ? _6 : config_1.COLORS.L_GREY;
        this.rowEvenBackground = (_7 = props.rowEvenBackground) !== null && _7 !== void 0 ? _7 : config_1.COLORS.WHITE;
        this.rowOddBackground = (_8 = props.rowOddBackground) !== null && _8 !== void 0 ? _8 : config_1.COLORS.WHITE;
        this.taskDefaultBackground = (_9 = props.taskDefaultBackground) !== null && _9 !== void 0 ? _9 : config_1.COLORS.VIOLET;
        this.taskDefaultHoverBackground = (_10 = props.taskDefaultHoverBackground) !== null && _10 !== void 0 ? _10 : config_1.COLORS.D_VIOLET;
        this.taskDefaultStrokeColor = props.taskDefaultStrokeColor;
        this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
        this.taskDefaultColor = (_11 = props.taskDefaultColor) !== null && _11 !== void 0 ? _11 : config_1.COLORS.WHITE;
        this.taskDefaultHoverColor = (_12 = props.taskDefaultHoverColor) !== null && _12 !== void 0 ? _12 : config_1.COLORS.WHITE;
        this.taskDefaultOutlineColor = (_13 = props.taskDefaultOutlineColor) !== null && _13 !== void 0 ? _13 : config_1.COLORS.BLACK;
        this.taskHeight = (_14 = props.taskHeight) !== null && _14 !== void 0 ? _14 : 34;
        this.taskPadding = (_15 = props.taskPadding) !== null && _15 !== void 0 ? _15 : 5;
        this.taskRadius = (_16 = props.taskRadius) !== null && _16 !== void 0 ? _16 : 2;
        this.taskFont = (_17 = props.taskFont) !== null && _17 !== void 0 ? _17 : "16px serif";
        this.taskErrorStrokeColor = props.taskErrorStrokeColor;
        this.minTaskWidth = (_18 = props.minTaskWidth) !== null && _18 !== void 0 ? _18 : 10;
        this.taskRenderResizeControls = (_19 = props.taskRenderResizeControls) !== null && _19 !== void 0 ? _19 : true;
        this.taskRenderResizeControlsWidth = (_20 = props.taskRenderResizeControlsWidth) !== null && _20 !== void 0 ? _20 : 6;
        this.taskRenderResizeControlsColor = (_21 = props.taskRenderResizeControlsColor) !== null && _21 !== void 0 ? _21 : config_1.COLORS.WHITE;
        this.taskRenderResizeControlsRadius = (_22 = props.taskRenderResizeControlsRadius) !== null && _22 !== void 0 ? _22 : 2;
        this.taskRenderDepControl = (_23 = props.taskRenderDepControl) !== null && _23 !== void 0 ? _23 : true;
        this.taskRenderDepRadius = (_24 = props.taskRenderDepRadius) !== null && _24 !== void 0 ? _24 : 7;
        this.taskRenderDepOffsetX = (_25 = props.taskRenderDepOffsetX) !== null && _25 !== void 0 ? _25 : 7;
        this.taskRenderDepLineColor = (_26 = props.taskRenderDepLineColor) !== null && _26 !== void 0 ? _26 : config_1.COLORS.BLACK;
        this.taskRenderDepBackground = (_27 = props.taskRenderDepBackground) !== null && _27 !== void 0 ? _27 : config_1.COLORS.WHITE;
        this.arrowColor = (_28 = props.arrowColor) !== null && _28 !== void 0 ? _28 : config_1.COLORS.BLUE;
        this.arrowActiveColor = (_29 = props.arrowActiveColor) !== null && _29 !== void 0 ? _29 : config_1.COLORS.D_BLUE;
        this.arrowRadius = (_30 = props.arrowRadius) !== null && _30 !== void 0 ? _30 : 2;
        this.scrollbarXHeight = (_31 = props.scrollbarXHeight) !== null && _31 !== void 0 ? _31 : 12;
        this.scrollbarXBackground = (_32 = props.scrollbarXBackground) !== null && _32 !== void 0 ? _32 : config_1.COLORS.L_GREY;
        this.scrollbarXLineBackground = (_33 = props.scrollbarXLineBackground) !== null && _33 !== void 0 ? _33 : config_1.COLORS.GREY;
        this.scrollbarXLineRadius = (_34 = props.scrollbarXLineRadius) !== null && _34 !== void 0 ? _34 : 6;
        this.scrollbarYWidth = (_35 = props.scrollbarYWidth) !== null && _35 !== void 0 ? _35 : 12;
        this.scrollbarYBackground = (_36 = props.scrollbarYBackground) !== null && _36 !== void 0 ? _36 : config_1.COLORS.L_GREY;
        this.scrollbarYLineBackground = (_37 = props.scrollbarYLineBackground) !== null && _37 !== void 0 ? _37 : config_1.COLORS.GREY;
        this.scrollbarYLineRadius = (_38 = props.scrollbarYLineRadius) !== null && _38 !== void 0 ? _38 : 6;
        this.handleChange = props.handleChange;
        this.handleTaskClick = props.handleTaskClick;
    }
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
    return RootApi;
}());
exports.RootApi = RootApi;
