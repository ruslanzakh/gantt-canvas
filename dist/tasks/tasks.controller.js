"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
var canvas_1 = require("../utils/canvas");
var TasksController = /** @class */ (function () {
    function TasksController(root, module) {
        this.moveMode = false;
        this.addDepMode = false;
        this.resizeMoveMode = null;
        this.mouseDownOffsetX = null;
        this.root = root;
        this.module = module;
        this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
        this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
        this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
    }
    TasksController.prototype.attachEvents = function () {
        this.destroyMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
        this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
        this.destroyMouseUp = this.root.controller.on('mouseup', this.handleMouseUp.bind(this));
        this.destroyTouchEnd = this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
    };
    TasksController.prototype.destroyEvents = function () {
        this.destroyMouseDown && this.destroyMouseDown();
        this.destroyMouseMove && this.destroyMouseMove();
        this.destroyMouseUp && this.destroyMouseUp();
        this.destroyTouchEnd && this.destroyTouchEnd();
    };
    TasksController.prototype.handleTouchEnd = function (event) {
        var eventOffsets = canvas_1.getEventTouchOffsets(event, this.root.canvas);
        this.module.service.handleClickTask(eventOffsets);
    };
    TasksController.prototype.handleMouseDown = function (event) {
        if (this.root.api.isLoading)
            return;
        var _a = this.module.service.getHoverId(event), hoverId = _a.hoverId, resize = _a.resize, depFromId = _a.depFromId;
        if (!hoverId)
            return;
        this.mouseDownOffsetX = event.offsetX;
        if (depFromId) {
            this.addDepMode = true;
            this.destroyAddDepMove = this.root.controller.on('mousemove', this.handleAddDepMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleAddDepMouseUp);
        }
        else if (resize) {
            this.resizeMoveMode = resize;
            this.destroyResizeMouseMove = this.root.controller.on('mousemove', this.handleResizeTaskMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleResizeMouseUp);
        }
        else {
            this.destroyTaskMove = this.root.controller.on('mousemove', this.handleTaskMove.bind(this));
            document.addEventListener('mouseup', this.handleTaskMoveMouseUp);
        }
    };
    TasksController.prototype.handleMouseMove = function (event) {
        if (this.resizeMoveMode || this.root.api.isLoading)
            return;
        if (this.mouseDownOffsetX) {
            var hoverId_1 = this.module.service.getHoverId(event).hoverId;
            return this.module.store.setHoverConnectionTask(hoverId_1);
        }
        var _a = this.module.service.getHoverId(event), hoverId = _a.hoverId, resize = _a.resize;
        this.module.store.setHoverId(hoverId, resize);
    };
    /** Start Resize Task */
    TasksController.prototype.handleResizeTaskMouseMove = function (event) {
        this.module.service.handleResizeTaskMouseMove(event);
    };
    TasksController.prototype.handleResizeMouseUp = function () {
        this.module.service.handleResizeTaskMouseUp();
        this.resizeMoveMode = null;
        this.mouseDownOffsetX = null;
        this.destroyResizeMouseMove && this.destroyResizeMouseMove();
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
    };
    /** End Resize Task */
    /** Start Add Dependencies */
    TasksController.prototype.handleAddDepMouseMove = function (event) {
        this.module.service.handleAddDepMouseMove(event);
    };
    TasksController.prototype.handleAddDepMouseUp = function (event) {
        this.mouseDownOffsetX = null;
        this.addDepMode = false;
        this.module.service.handleAddDepMouseUp(event);
        this.destroyAddDepMove && this.destroyAddDepMove();
        document.removeEventListener('mouseup', this.handleAddDepMouseUp);
    };
    /** End Add Dependencies */
    /** Start Move Task */
    TasksController.prototype.handleTaskMove = function (event) {
        this.module.service.handleMoveTaskMouseMove(event);
    };
    TasksController.prototype.handleTaskMoveMouseUp = function (event) {
        this.module.service.handleMoveTaskMouseUp();
        this.destroyTaskMove && this.destroyTaskMove();
        this.mouseDownOffsetX = null;
        this.module.store.setHoverConnectionTask(null);
        document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
    };
    /** End Move Task */
    TasksController.prototype.handleMouseUp = function (event) {
        if (this.mouseDownOffsetX === event.offsetX || this.root.api.isLoading)
            this.module.service.handleClickTask(event);
    };
    return TasksController;
}());
exports.TasksController = TasksController;
