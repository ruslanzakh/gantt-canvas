"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksStore = void 0;
var TasksStore = /** @class */ (function () {
    function TasksStore(root) {
        this.modifiedTasks = {};
        this.hoverId = null;
        this.hoverResize = null;
        this.hoverConnectionTask = null;
        this.addDepOffsetX = null;
        this.addDepOffsetY = null;
        this.root = root;
    }
    Object.defineProperty(TasksStore.prototype, "tasks", {
        get: function () {
            var _this = this;
            return this.root.api.tasks.map(function (task) {
                if (_this.modifiedTasks[task.id])
                    return _this.modifiedTasks[task.id];
                return task;
            });
        },
        enumerable: false,
        configurable: true
    });
    TasksStore.prototype.clearModTasks = function () {
        this.modifiedTasks = {};
    };
    TasksStore.prototype.saveModTasks = function () {
        this.root.api.updateTasks(this.tasks);
        this.clearModTasks();
    };
    TasksStore.prototype.addModTask = function (task) {
        this.modifiedTasks[task.id] = task;
    };
    TasksStore.prototype.setHoverId = function (id, resize) {
        if (id === this.hoverId && resize === this.hoverResize)
            return;
        if (id)
            this.root.view.setCursor(resize ? 'col-resize' : 'pointer');
        else
            this.root.view.setCursor('auto');
        this.hoverResize = resize;
        if (id !== this.hoverId) {
            this.hoverId = id;
            this.root.render();
        }
    };
    TasksStore.prototype.setHoverConnectionTask = function (id) {
        this.hoverConnectionTask = id;
    };
    TasksStore.prototype.updateDepOffsets = function (offsetX, offsetY) {
        this.addDepOffsetX = offsetX;
        this.addDepOffsetY = offsetY;
    };
    return TasksStore;
}());
exports.TasksStore = TasksStore;
