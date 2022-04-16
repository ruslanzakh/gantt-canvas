"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
var canvas_1 = require("../utils/canvas");
var TasksController = /** @class */ (function () {
    function TasksController(root, module) {
        var _this = this;
        this.addDepMode = false;
        this.resizeMoveMode = null;
        this.mouseDownOffsetX = null;
        this.moveOffsetX = 0;
        this.initialMouseDownOffsetX = null;
        this.isTouchAction = false;
        this.handleTouchStart = function (event) {
            var eventOffsets = canvas_1.getEventTouchOffsets(event, _this.root.canvas, _this.root.ctx);
            if (_this.root.api.isLoading)
                return;
            var _a = _this.module.service.getHoverId(eventOffsets), hoverId = _a.hoverId, resize = _a.resize, depFromId = _a.depFromId;
            if (!hoverId)
                return;
            _this.initialMouseDownOffsetX = eventOffsets.offsetX;
            if (_this.module.service.isNoEditableTask(hoverId)) {
                return document.addEventListener('touchend', _this.handleNoEditableTaskMouseUp);
            }
            if ((resize && _this.root.api.allowMobileTaskResize)
                || _this.root.api.allowMobileTaskMove) {
                _this.mouseDownOffsetX = eventOffsets.offsetX;
                _this.isTouchAction = true;
                _this.module.store.setHoverId(hoverId, resize, depFromId);
            }
            if (resize && _this.root.api.allowMobileTaskResize) {
                _this.resizeMoveMode = resize;
                _this.destroyResizeMove = _this.root.controller.on('touchmove', _this.handleResizeTaskTouchMove.bind(_this));
                document.addEventListener('touchend', _this.handleResizeTouchEnd);
            }
            else if (_this.root.api.allowMobileTaskMove) {
                _this.destroyTaskMove = _this.root.controller.on('touchmove', _this.handleTaskTouchMove.bind(_this));
                document.addEventListener('touchend', _this.handleTaskMoveTouchEnd);
            }
        };
        this.root = root;
        this.module = module;
        this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
        this.handleResizeTouchEnd = this.handleResizeTouchEnd.bind(this);
        this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
        this.handleTaskMoveTouchEnd = this.handleTaskMoveTouchEnd.bind(this);
        this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
        this.handleNoEditableTaskMouseUp = this.handleNoEditableTaskMouseUp.bind(this);
    }
    TasksController.prototype.attachEvents = function () {
        this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
        if (this.root.api.allowMobileTaskMove || this.root.api.allowMobileTaskResize) {
            this.root.controller.on('touchstart', this.handleTouchStart.bind(this));
        }
        this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
        this.root.controller.on('mouseup', this.handleMouseUp.bind(this));
        this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
    };
    TasksController.prototype.destroyEvents = function () {
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
        document.removeEventListener('mouseup', this.handleAddDepMouseUp);
        document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
        document.removeEventListener('mouseup', this.handleNoEditableTaskMouseUp);
    };
    TasksController.prototype.handleTouchEnd = function (event) {
        var eventOffsets = canvas_1.getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        if (this.initialMouseDownOffsetX === eventOffsets.offsetX || this.root.api.isLoading)
            this.module.service.handleClickTask(eventOffsets);
    };
    TasksController.prototype.handleMouseDown = function (event) {
        if (this.root.api.isLoading)
            return;
        var _a = this.module.service.getHoverId(event), hoverId = _a.hoverId, resize = _a.resize, depFromId = _a.depFromId;
        if (!hoverId)
            return;
        this.initialMouseDownOffsetX = event.offsetX;
        this.mouseDownOffsetX = event.offsetX;
        if (this.module.service.isNoEditableTask(hoverId)) {
            document.addEventListener('mouseup', this.handleNoEditableTaskMouseUp);
        }
        else if (depFromId) {
            this.addDepMode = true;
            this.destroyAddDepMove = this.root.controller.on('mousemove', this.handleAddDepMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleAddDepMouseUp);
        }
        else if (resize) {
            this.resizeMoveMode = resize;
            this.destroyResizeMove = this.root.controller.on('mousemove', this.handleResizeTaskMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleResizeMouseUp);
        }
        else {
            this.destroyTaskMove = this.root.controller.on('mousemove', this.handleTaskMove.bind(this));
            document.addEventListener('mouseup', this.handleTaskMoveMouseUp);
        }
    };
    TasksController.prototype.handleMouseMove = function (event) {
        if (this.resizeMoveMode)
            return;
        if (this.mouseDownOffsetX && !this.root.api.isLoading) {
            var hoverId = this.module.service.getHoverId(event).hoverId;
            return this.module.store.setHoverConnectionTask(hoverId);
        }
        this.updateHoverId(event);
    };
    TasksController.prototype.updateHoverId = function (event) {
        var _a = this.module.service.getHoverId(event), hoverId = _a.hoverId, resize = _a.resize, depFromId = _a.depFromId;
        this.module.store.setHoverId(hoverId, resize, depFromId);
    };
    /** Start Resize Task */
    TasksController.prototype.handleResizeTaskMouseMove = function (event) {
        if (this.shouldSkipMove(event.offsetX))
            return;
        this.moveOffsetX = event.offsetX;
        this.module.service.handleResizeTaskMouseMove(event);
    };
    TasksController.prototype.handleResizeTaskTouchMove = function (event) {
        var eventOffsets = canvas_1.getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        if (this.shouldSkipMove(eventOffsets.offsetX, 35))
            return;
        this.moveOffsetX = eventOffsets.offsetX;
        this.module.service.handleResizeTaskMouseMove(eventOffsets);
    };
    TasksController.prototype.handleResizeMouseUp = function (event) {
        this.handleResizeEnd();
        this.updateHoverId(event);
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
    };
    TasksController.prototype.handleResizeTouchEnd = function () {
        this.handleResizeEnd();
        this.module.store.setHoverId(null, null, null);
        document.removeEventListener('mouseup', this.handleResizeMouseUp);
    };
    TasksController.prototype.handleResizeEnd = function () {
        this.module.service.handleResizeTaskMouseUp();
        this.resizeMoveMode = null;
        this.mouseDownOffsetX = null;
        this.initialMouseDownOffsetX = null;
        this.isTouchAction = false;
        this.destroyResizeMove && this.destroyResizeMove();
    };
    /** End Resize Task */
    /** Start Add Dependencies */
    TasksController.prototype.handleAddDepMouseMove = function (event) {
        this.module.service.handleAddDepMouseMove(event);
    };
    TasksController.prototype.handleAddDepMouseUp = function (event) {
        this.mouseDownOffsetX = null;
        this.initialMouseDownOffsetX = null;
        this.addDepMode = false;
        this.isTouchAction = false;
        this.module.service.handleAddDepMouseUp(event);
        this.destroyAddDepMove && this.destroyAddDepMove();
        this.updateHoverId(event);
        document.removeEventListener('mouseup', this.handleAddDepMouseUp);
    };
    /** End Add Dependencies */
    /** Start Move Task */
    TasksController.prototype.handleTaskMove = function (event) {
        if (this.shouldSkipMove(event.offsetX))
            return;
        this.moveOffsetX = event.offsetX;
        this.module.service.handleMoveTaskMouseMove(event);
    };
    TasksController.prototype.handleTaskTouchMove = function (event) {
        var eventOffsets = canvas_1.getEventTouchOffsets(event, this.root.canvas, this.root.ctx);
        if (this.shouldSkipMove(eventOffsets.offsetX, 35))
            return;
        this.moveOffsetX = eventOffsets.offsetX;
        this.module.service.handleMoveTaskMouseMove(eventOffsets);
    };
    // this method helps to prevent small, random mouse and touch moves
    TasksController.prototype.shouldSkipMove = function (offsetX, gap) {
        if (gap === void 0) { gap = 5; }
        return offsetX > this.moveOffsetX - gap && offsetX < this.moveOffsetX + gap;
    };
    TasksController.prototype.handleTaskMoveMouseUp = function (event) {
        this.handleTaskMoveEnd();
        this.updateHoverId(event);
        document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
    };
    TasksController.prototype.handleTaskMoveTouchEnd = function () {
        this.handleTaskMoveEnd();
        this.module.store.setHoverId(null, null, null);
        document.removeEventListener('touchend', this.handleTaskMoveTouchEnd);
    };
    TasksController.prototype.handleTaskMoveEnd = function () {
        this.module.service.handleMoveTaskMouseUp();
        this.destroyTaskMove && this.destroyTaskMove();
        this.mouseDownOffsetX = null;
        this.initialMouseDownOffsetX = null;
        this.isTouchAction = false;
        this.module.store.setHoverConnectionTask(null);
    };
    /** End Move Task */
    TasksController.prototype.handleNoEditableTaskMouseUp = function () {
        this.mouseDownOffsetX = null;
        this.module.store.setHoverConnectionTask(null);
    };
    TasksController.prototype.handleMouseUp = function (event) {
        if (this.initialMouseDownOffsetX === event.offsetX || this.root.api.isLoading)
            this.module.service.handleClickTask(event);
    };
    return TasksController;
}());
exports.TasksController = TasksController;
