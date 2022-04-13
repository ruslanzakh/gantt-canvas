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
exports.TasksView = void 0;
var task_entity_1 = require("./entities/task.entity");
var TasksView = /** @class */ (function () {
    function TasksView(root, module) {
        this.tasksForArrows = [];
        this.tasks = [];
        this.root = root;
        this.module = module;
        this.taskEntity = new task_entity_1.TaskEntity(root);
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
            var y = (rowHeight * index) + offsetY;
            data[task.id] = __assign(__assign({}, task), { hover: hoverId === task.id, hoverConnection: hoverConnectionTask === task.id, y: y, x: x, w: w, error: error });
        });
        this.tasksForArrows = Object.values(data).filter(function (task) {
            if ((task.y + rowHeight) >= rowsOffsetY
                && task.y <= _this.root.view.canvasHeight
                && (task.x + task.w) >= 0
                && task.x <= _this.root.view.canvasWidth)
                return true;
            return task.next_ids.some(function (id) {
                var target = data[id];
                if (!target)
                    return false;
                if (task.y < rowsOffsetY && target.y < rowsOffsetY)
                    return false;
                if (task.y > _this.root.view.canvasHeight && target.y > _this.root.view.canvasHeight)
                    return false;
                if (task.x + task.w < 0 && target.x + target.w < 0)
                    return false;
                if (task.x > _this.root.view.canvasWidth && target.x > _this.root.view.canvasWidth)
                    return false;
                return true;
            });
        });
        this.tasks = this.tasksForArrows.filter(function (task) { return (task.y + rowHeight) >= rowsOffsetY
            && task.y <= _this.root.view.canvasHeight; });
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
            el.next_ids.forEach(function (id) { return (!hoverTask || hoverTask.id !== id) && _this.taskEntity.renderArrow(id, el); });
        });
        if (hoverTask) {
            this.tasksForArrows
                .forEach(function (el) {
                el.next_ids.forEach(function (id) { return hoverTask.id === id && _this.taskEntity.renderArrow(id, el); });
            });
            hoverTask.next_ids.forEach(function (id) { return _this.taskEntity.renderArrow(id, hoverTask); });
        }
    };
    TasksView.prototype.renderArrowConnection = function () {
        if (this.module.store.hoverId && this.module.controller.addDepMode) {
            this.taskEntity.renderArrowConnection(this.module.store.hoverId, this.module.store.addDepOffsetX || 0, this.module.store.addDepOffsetY || 0);
        }
    };
    TasksView.prototype.renderTasks = function () {
        var _this = this;
        this.tasks.forEach(function (x) { return _this.taskEntity.renderItem(x, _this.module.controller.isTouchAction); });
    };
    return TasksView;
}());
exports.TasksView = TasksView;
