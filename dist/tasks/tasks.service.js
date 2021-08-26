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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
var TasksService = /** @class */ (function () {
    function TasksService(root, module) {
        this.intervalChangeOffset = null;
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
        var task = this.module.store.tasks.find(function (task) { return task.id === id; });
        return task || null;
    };
    TasksService.prototype.getRenderedViewTaskById = function (id) {
        var task = this.module.view.tasks.find(function (task) { return task.id === id; });
        return task || null;
    };
    TasksService.prototype.getViewTaskById = function (id) {
        var _a = this.root.grid.view, rowHeight = _a.rowHeight, rowsOffsetY = _a.rowsOffsetY;
        var hoverId = this.module.store.hoverId;
        var task = this.getModuleStoreTaskById(id);
        if (!task)
            return null;
        var index = this.module.store.tasks.indexOf(task);
        var _b = this.getTaskPos(task), x = _b.x, xx = _b.xx, error = _b.error;
        var w = xx - x;
        var offsetY = rowsOffsetY - this.root.view.offsetY;
        var y = (rowHeight * index) + offsetY;
        return __assign(__assign({}, task), { hover: hoverId === task.id, y: y, x: x, w: w, error: error });
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
    TasksService.prototype.getTaskPos = function (task) {
        var x = task.all_day
            ? this.root.grid.service.getPosXByFullDayTs(task.start_date_ts)
            : this.root.grid.service.getPosXByTs(task.start_date_ts);
        var xx = task.all_day
            ? this.root.grid.service.getPosXByFullDayTs(task.end_date_ts, true)
            : this.root.grid.service.getPosXByTs(task.end_date_ts);
        var error = false;
        if (xx < x) {
            xx = x;
            error = true;
        }
        if (xx === x)
            xx += this.root.api.minTaskWidth;
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
        var width = this.root.canvas.width;
        var colWidth = this.root.grid.view.colWidth;
        var pos = offsetX / width;
        var changeOffsetValue = 0;
        if (pos > 0.9) {
            changeOffsetValue = colWidth;
        }
        else if (pos < 0.1)
            changeOffsetValue = -colWidth;
        if (changeOffsetValue !== 0 && !this.intervalChangeOffset) {
            this.intervalChangeOffset = setInterval(function () {
                _this.module.controller.mouseDownOffsetX = (_this.module.controller.mouseDownOffsetX || 0) - changeOffsetValue;
                if (_this.module.controller.addDepMode)
                    _this.updateDepOffsets(event);
                else if (_this.module.controller.resizeMoveMode)
                    _this.resizeTaskByResizeMode(offsetX);
                else
                    _this.moveTask(event.offsetX);
                _this.root.view.handleChangeOffsetX(changeOffsetValue);
            }, 150);
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
        if (all_day || this.root.api.saveTime) {
            var colTs = this.root.grid.view.colTs;
            var dayDiff = (diff - diff % colTs) / colTs;
            diff = colTs * dayDiff;
        }
        return diff;
    };
    /** End commons */
    TasksService.prototype.handleClickTask = function (event) {
        if (!this.root.api.handleTaskClick)
            return;
        var hoverId = this.getHoverId(event).hoverId;
        if (!hoverId)
            return;
        var hoveredTask = this.getRootStoreTaskById(hoverId);
        if (!hoveredTask)
            return;
        this.root.api.handleTaskClick(hoveredTask);
    };
    TasksService.prototype.handleTouchTask = function (event) {
        if (!this.root.api.handleTaskClick)
            return;
        var hoverId = this.module.service.getHoverId(event).hoverId;
        if (!hoverId)
            return;
        var hoveredTask = this.getRootStoreTaskById(hoverId);
        if (!hoveredTask)
            return;
        this.root.api.handleTaskClick(hoveredTask);
    };
    TasksService.prototype.scrollToTask = function (id) {
        var task = this.getRootStoreTaskById(id);
        if (!task)
            return;
        this.root.grid.service.showDay(task.start_date_ts);
    };
    /** Start Add Dependencies */
    TasksService.prototype.handleAddDepMouseMove = function (event) {
        if (this.intervalChangeOffset)
            return this.scrollX(event);
        this.updateDepOffsets(event);
        this.scrollX(event);
        this.root.render();
    };
    TasksService.prototype.handleAddDepMouseUp = function (event) {
        var hoverId = this.getHoverId(event).hoverId;
        if (hoverId && this.module.store.hoverId && hoverId !== this.module.store.hoverId) {
            var hoveredTask = this.getRootStoreTaskById(hoverId);
            var currentTask = this.getRootStoreTaskById(this.module.store.hoverId);
            if (hoveredTask && currentTask && !currentTask.next_ids.includes(hoverId)) {
                var task = __assign(__assign({}, currentTask), { next_ids: __spreadArray(__spreadArray([], currentTask.next_ids), [hoverId]) });
                this.module.store.addModTask(task);
                this.module.store.saveModTasks();
                this.root.api.handleChange && this.root.api.handleChange([task]);
            }
        }
        this.clearScrollInterval();
        this.module.store.updateDepOffsets(null, null);
        this.module.store.setHoverConnectionTask(null);
        if (hoverId && hoverId === this.module.store.hoverId)
            this.root.render();
    };
    TasksService.prototype.updateDepOffsets = function (event) {
        this.module.store.updateDepOffsets(event.offsetX, event.offsetY);
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
        if (diff === 0)
            return;
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
        var newTask = __assign(__assign({}, task), { end_date_ts: task.end_date_ts + diff });
        if (newTask.start_date_ts > newTask.end_date_ts)
            newTask.start_date_ts = newTask.end_date_ts;
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
        var newTask = __assign(__assign({}, task), { start_date_ts: task.start_date_ts + diff });
        if (newTask.start_date_ts > newTask.end_date_ts)
            newTask.end_date_ts = newTask.start_date_ts;
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
        if (diff === 0)
            return;
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
        var newTask = __assign(__assign({}, task), { start_date_ts: task.start_date_ts + diff, end_date_ts: task.end_date_ts + diff });
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
exports.TasksService = TasksService;
