"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootApi = void 0;
var RootApi = /** @class */ (function () {
    function RootApi(root, props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35;
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
        this.monthHeight = (_k = props.monthHeight) !== null && _k !== void 0 ? _k : 55;
        this.renderMonthBottomLine = (_l = props.renderMonthBottomLine) !== null && _l !== void 0 ? _l : true;
        this.renderMonthLeftLine = (_m = props.renderMonthLeftLine) !== null && _m !== void 0 ? _m : true;
        this.monthLineColor = (_o = props.monthLineColor) !== null && _o !== void 0 ? _o : '#EAEAEA';
        this.monthTitleFont = (_p = props.monthTitleFont) !== null && _p !== void 0 ? _p : '600 20px Arial';
        this.monthTitleColor = (_q = props.monthTitleColor) !== null && _q !== void 0 ? _q : '#222';
        this.monthTitleShowYear = (_r = props.monthTitleShowYear) !== null && _r !== void 0 ? _r : true;
        this.dayHeight = (_s = props.dayHeight) !== null && _s !== void 0 ? _s : 28;
        this.renderDayStartMonthLine = (_t = props.renderDayStartMonthLine) !== null && _t !== void 0 ? _t : true;
        this.dayStartMonthLine = (_u = props.dayStartMonthLine) !== null && _u !== void 0 ? _u : '#EAEAEA';
        this.dayBottomLineColor = (_v = props.dayBottomLineColor) !== null && _v !== void 0 ? _v : '#EAEAEA';
        this.dayTodayBackground = (_w = props.dayTodayBackground) !== null && _w !== void 0 ? _w : '#f8fdff';
        this.dayFont = (_x = props.dayFont) !== null && _x !== void 0 ? _x : '500 14px Arial';
        this.dayColor = (_y = props.dayColor) !== null && _y !== void 0 ? _y : '#222';
        this.dayColWidth = (_z = props.dayColWidth) !== null && _z !== void 0 ? _z : 40;
        this.monthViewColWidth = (_0 = props.monthViewColWidth) !== null && _0 !== void 0 ? _0 : 120;
        this.rowHeight = (_1 = props.rowHeight) !== null && _1 !== void 0 ? _1 : 40;
        this.colLineColor = (_2 = props.colLineColor) !== null && _2 !== void 0 ? _2 : '#ebebeb';
        this.colStartMonthLineColor = props.colStartMonthLineColor;
        this.rowLineColor = (_3 = props.rowLineColor) !== null && _3 !== void 0 ? _3 : '#ebebeb';
        this.rowEvenBackground = (_4 = props.rowEvenBackground) !== null && _4 !== void 0 ? _4 : '#fff';
        this.rowOddBackground = (_5 = props.rowOddBackground) !== null && _5 !== void 0 ? _5 : '#fff';
        this.taskDefaultBackground = (_6 = props.taskDefaultBackground) !== null && _6 !== void 0 ? _6 : '#ae52d4';
        this.taskDefaultHoverBackground = (_7 = props.taskDefaultHoverBackground) !== null && _7 !== void 0 ? _7 : '#7b1fa2';
        this.taskDefaultStrokeColor = props.taskDefaultStrokeColor;
        this.taskDefaultHoverStrokeColor = props.taskDefaultHoverStrokeColor;
        this.taskDefaultColor = (_8 = props.taskDefaultColor) !== null && _8 !== void 0 ? _8 : '#fff';
        this.taskDefaultHoverColor = (_9 = props.taskDefaultHoverColor) !== null && _9 !== void 0 ? _9 : '#fff';
        this.taskDefaultOutlineColor = (_10 = props.taskDefaultOutlineColor) !== null && _10 !== void 0 ? _10 : '#222';
        this.taskHeight = (_11 = props.taskHeight) !== null && _11 !== void 0 ? _11 : 34;
        this.taskPadding = (_12 = props.taskPadding) !== null && _12 !== void 0 ? _12 : 5;
        this.taskRadius = (_13 = props.taskRadius) !== null && _13 !== void 0 ? _13 : 2;
        this.taskFont = (_14 = props.taskFont) !== null && _14 !== void 0 ? _14 : "16px serif";
        this.taskErrorStrokeColor = props.taskErrorStrokeColor;
        this.minTaskWidth = (_15 = props.minTaskWidth) !== null && _15 !== void 0 ? _15 : 25;
        this.taskRenderResizeControls = (_16 = props.taskRenderResizeControls) !== null && _16 !== void 0 ? _16 : true;
        this.taskRenderResizeControlsWidth = (_17 = props.taskRenderResizeControlsWidth) !== null && _17 !== void 0 ? _17 : 6;
        this.taskRenderResizeControlsColor = (_18 = props.taskRenderResizeControlsColor) !== null && _18 !== void 0 ? _18 : '#fff';
        this.taskRenderResizeControlsRadius = (_19 = props.taskRenderResizeControlsRadius) !== null && _19 !== void 0 ? _19 : 2;
        this.taskRenderDepControl = (_20 = props.taskRenderDepControl) !== null && _20 !== void 0 ? _20 : true;
        this.taskRenderDepRadius = (_21 = props.taskRenderDepRadius) !== null && _21 !== void 0 ? _21 : 7;
        this.taskRenderDepOffsetX = (_22 = props.taskRenderDepOffsetX) !== null && _22 !== void 0 ? _22 : 7;
        this.taskRenderDepLineColor = (_23 = props.taskRenderDepLineColor) !== null && _23 !== void 0 ? _23 : '#222';
        this.taskRenderDepBackground = (_24 = props.taskRenderDepBackground) !== null && _24 !== void 0 ? _24 : '#fff';
        this.arrowColor = (_25 = props.arrowColor) !== null && _25 !== void 0 ? _25 : "#283593";
        this.arrowActiveColor = (_26 = props.arrowActiveColor) !== null && _26 !== void 0 ? _26 : "#001064";
        this.arrowRadius = (_27 = props.arrowRadius) !== null && _27 !== void 0 ? _27 : 2;
        this.scrollbarXHeight = (_28 = props.scrollbarXHeight) !== null && _28 !== void 0 ? _28 : 12;
        this.scrollbarXBackground = (_29 = props.scrollbarXBackground) !== null && _29 !== void 0 ? _29 : '#eee';
        this.scrollbarXLineBackground = (_30 = props.scrollbarXLineBackground) !== null && _30 !== void 0 ? _30 : '#ccc';
        this.scrollbarXLineRadius = (_31 = props.scrollbarXLineRadius) !== null && _31 !== void 0 ? _31 : 6;
        this.scrollbarYWidth = (_32 = props.scrollbarYWidth) !== null && _32 !== void 0 ? _32 : 12;
        this.scrollbarYBackground = (_33 = props.scrollbarYBackground) !== null && _33 !== void 0 ? _33 : '#eee';
        this.scrollbarYLineBackground = (_34 = props.scrollbarYLineBackground) !== null && _34 !== void 0 ? _34 : '#ccc';
        this.scrollbarYLineRadius = (_35 = props.scrollbarYLineRadius) !== null && _35 !== void 0 ? _35 : 6;
        this.handleChange = props.handleChange;
        this.handleTaskClick = props.handleTaskClick;
    }
    RootApi.prototype.updateTasks = function (tasks) {
        this.tasks = tasks;
        this.root.render();
    };
    RootApi.prototype.scrollToToday = function () {
        this.root.grid.service.showDay(undefined, true, true);
    };
    RootApi.prototype.scrollToTask = function (id) {
        this.root.tasks.service.scrollToTask(id);
    };
    RootApi.prototype.updateViewMode = function (mode) {
        this.viewMode = mode;
        this.root.grid.init();
        this.root.render();
    };
    RootApi.prototype.updateIsLoading = function (isLoading) {
        this.isLoading = isLoading;
        if (isLoading)
            this.root.view.setCursor('progress');
        else
            this.root.view.setCursor('auto');
    };
    return RootApi;
}());
exports.RootApi = RootApi;
