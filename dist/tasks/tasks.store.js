"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksStore = void 0;
var TasksStore = /** @class */ (function () {
    function TasksStore(root) {
        this.modifiedTasks = {};
        this.tasks = [];
        this.tasksList = {};
        this.hoverId = null;
        this.hoverResize = null;
        this.hoverDrag = null;
        this.hoverConnectionTask = null;
        this.addDepOffsetX = null;
        this.addDepOffsetY = null;
        this.root = root;
    }
    TasksStore.prototype.fillTasks = function () {
        var _this = this;
        this.tasks = this.root.api.tasks.map(function (task) {
            if (_this.modifiedTasks[task.id])
                return _this.modifiedTasks[task.id];
            return task;
        });
        this.tasksList = {};
        this.tasks.forEach(function (task) {
            _this.tasksList[task.id] = task;
        });
    };
    TasksStore.prototype.clearModTasks = function () {
        this.modifiedTasks = {};
    };
    TasksStore.prototype.saveModTasks = function () {
        this.root.api.updateTasks(this.tasks);
        this.clearModTasks();
    };
    TasksStore.prototype.addModTask = function (task) {
        this.modifiedTasks[task.id] = task;
        this.fillTasks();
    };
    TasksStore.prototype.setHoverId = function (id, resize, hoverDrag) {
        if (id === this.hoverId && resize === this.hoverResize && hoverDrag === this.hoverDrag)
            return;
        if (!this.root.api.isLoading) {
            if (id)
                this.root.view.setCursor(resize ? 'col-resize' : hoverDrag ? 'grab' : 'pointer');
            else
                this.root.view.setCursor('auto');
        }
        this.hoverResize = resize;
        this.hoverDrag = hoverDrag;
        if (id !== this.hoverId) {
            this.hoverId = id;
            this.root.render();
        }
    };
    TasksStore.prototype.setHoverConnectionTask = function (id) {
        this.hoverConnectionTask = id;
    };
    TasksStore.prototype.updateDepOffsets = function (offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = this.addDepOffsetX; }
        if (offsetY === void 0) { offsetY = this.addDepOffsetY; }
        this.addDepOffsetX = offsetX;
        this.addDepOffsetY = offsetY;
    };
    return TasksStore;
}());
exports.TasksStore = TasksStore;
