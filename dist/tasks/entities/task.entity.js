"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
var canvas_1 = require("../../utils/canvas");
var TaskEntity = /** @class */ (function () {
    function TaskEntity(root) {
        this.root = root;
    }
    TaskEntity.prototype.isHover = function (event, task) {
        var x = task.x, y = task.y, w = task.w, noEditable = task.noEditable;
        var h = this.root.grid.view.rowHeight;
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var resize = null;
        var depFrom = null;
        var xx = this.getTaskXX(x, w);
        var yy = y + h;
        var hover = x < offsetX
            && offsetX < xx
            && y < offsetY
            && offsetY < yy;
        if (!hover)
            return { hover: hover, resize: resize, depFrom: depFrom };
        if (!noEditable) {
            if (this.root.api.taskRenderDepControl && (xx - this.root.api.taskRenderDepRadius - this.getDepOffsetX() < offsetX))
                depFrom = true;
            else
                resize = this.isControlsHover(event, task);
        }
        return { hover: hover, resize: resize, depFrom: depFrom };
    };
    TaskEntity.prototype.renderItem = function (task) {
        var x = task.x, y = task.y, w = task.w, hover = task.hover, noEditable = task.noEditable;
        if (x >= this.root.canvas.width || w === 0)
            return;
        var ctx = this.root.ctx;
        ctx.beginPath();
        var top = this.getTaskTop(y);
        var fillStyle = this.getTaskFillStyle(task);
        var strokeStyle = this.getTaskStrokeStyle(task);
        canvas_1.roundRect(ctx, x, top, w, this.root.api.taskHeight, this.root.api.taskRadius, fillStyle, strokeStyle);
        this.renderTaskText(task, top);
        if (hover && !noEditable) {
            this.renderResizeControls(task, top);
            this.renderRightDep(x + w, top + (this.root.api.taskHeight / 2));
        }
    };
    TaskEntity.prototype.renderRightDep = function (x, y) {
        if (!this.root.api.taskRenderDepControl)
            return;
        var ctx = this.root.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.root.api.taskRenderDepBackground;
        ctx.arc(x + this.getDepOffsetX(), y, this.root.api.taskRenderDepRadius, 0, Math.PI * 2);
        ctx.strokeStyle = this.root.api.taskRenderDepLineColor;
        ctx.stroke();
        ctx.fill();
    };
    TaskEntity.prototype.renderArrow = function (id, source) {
        var h = this.root.grid.view.rowHeight;
        var task = this.root.tasks.service.getRenderedViewTaskById(id) || this.root.tasks.service.getViewTaskById(id);
        if (!task)
            return;
        var x = source.x + source.w;
        var y = source.y + (h / 2);
        var targetY = task.y + (h / 2);
        var ctx = this.root.ctx;
        ctx.strokeStyle = this.root.api.arrowColor;
        ctx.fillStyle = this.root.api.arrowColor;
        var r = this.root.api.arrowRadius;
        var startOffsetX = this.getDepOffsetX() || 10;
        if (task.x >= x + 1) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + startOffsetX - r, y);
            ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, targetY < y ? y - r : y + r);
            ctx.lineTo(x + startOffsetX, targetY > y ? targetY - r : targetY + r);
            ctx.quadraticCurveTo(x + startOffsetX, targetY, x + startOffsetX + r, targetY);
            ctx.lineTo(task.x, targetY);
            ctx.stroke();
            this.renderArrowHead(x + startOffsetX, targetY, task.x, targetY);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + startOffsetX - r, y);
            ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, y + r);
            ctx.lineTo(x + startOffsetX, y + (h / 2) - r);
            ctx.quadraticCurveTo(x + startOffsetX, y + (h / 2), x + startOffsetX - r, y + (h / 2));
            ctx.lineTo(task.x - 20 + r, y + (h / 2));
            ctx.quadraticCurveTo(task.x - 20, y + (h / 2), task.x - 20, targetY > y ? y + (h / 2) + r : y + (h / 2) - r);
            ctx.lineTo(task.x - 20, targetY);
            ctx.lineTo(task.x, targetY);
            ctx.stroke();
            this.renderArrowHead(task.x - 20, targetY, task.x, targetY);
        }
    };
    TaskEntity.prototype.renderArrowFrom = function (id, x, y) {
        var task = this.root.tasks.service.getRenderedViewTaskById(id) || this.root.tasks.service.getViewTaskById(id);
        if (!task)
            return;
        var h = this.root.grid.view.rowHeight;
        var sourceY = task.y + (h / 2);
        var sourceX = task.x + task.w;
        var ctx = this.root.ctx;
        ctx.strokeStyle = this.root.api.arrowActiveColor;
        ctx.fillStyle = this.root.api.arrowActiveColor;
        var startOffsetX = this.getDepOffsetX();
        if (task.x + task.w + this.root.api.taskRenderDepRadius > x) {
            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, y + (h / 2));
            ctx.lineTo(x - 20, y + (h / 2));
            ctx.lineTo(x - 20, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            this.renderArrowHead(x - 20, y, x, y);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, sourceY);
            ctx.lineTo(sourceX + startOffsetX, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            this.renderArrowHead(x - 20, y, x, y);
        }
    };
    TaskEntity.prototype.renderArrowHead = function (fromx, fromy, tox, toy) {
        var ctx = this.root.ctx;
        //variables to be used when creating the arrow
        var headlen = 10;
        var angle = Math.atan2(toy - fromy, tox - fromx);
        //starting a new path from the head of the arrow to one of the sides of
        //the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
        //draws the paths created above
        ctx.stroke();
        ctx.fill();
    };
    TaskEntity.prototype.renderTaskText = function (task, top) {
        var _a;
        var x = task.x, w = task.w, title = task.title;
        var ctx = this.root.ctx;
        var _b = this.root.api, taskFont = _b.taskFont, taskPadding = _b.taskPadding, taskRenderResizeControls = _b.taskRenderResizeControls, taskRenderResizeControlsWidth = _b.taskRenderResizeControlsWidth, taskHeight = _b.taskHeight, taskDefaultOutlineColor = _b.taskDefaultOutlineColor, taskRenderDepRadius = _b.taskRenderDepRadius;
        ctx.font = taskFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var maxWidth = w - (taskPadding * 2);
        if (taskRenderResizeControls)
            maxWidth -= (taskRenderResizeControlsWidth * 2) + (taskPadding * 2);
        if (ctx.measureText(title).width < maxWidth) {
            ctx.fillStyle = this.getTaskColor(task);
            ctx.textAlign = 'center';
            ctx.fillText(title, x + (w / 2), top + (taskHeight / 2));
            if (task.underline)
                canvas_1.renderUnderline(ctx, title, x + (w / 2), top + (taskHeight / 4));
        }
        else {
            ctx.fillStyle = (_a = task.outlineColor) !== null && _a !== void 0 ? _a : taskDefaultOutlineColor;
            ctx.textAlign = 'left';
            var offsetX = this.getDepOffsetX();
            ctx.fillText(title, x + w + offsetX + (taskRenderDepRadius * 2), top + (taskHeight / 2));
            if (task.underline)
                canvas_1.renderUnderline(ctx, title, x + w + offsetX + (taskRenderDepRadius * 2), top + (taskHeight / 4));
        }
    };
    TaskEntity.prototype.renderResizeControls = function (task, top) {
        if (!this.root.api.taskRenderResizeControls)
            return;
        var x = task.x, w = task.w;
        var ctx = this.root.ctx;
        var leftX = x + this.root.api.taskPadding;
        top += this.root.api.taskPadding;
        var width = this.root.api.taskRenderResizeControlsWidth;
        var height = this.root.api.taskHeight - (this.root.api.taskPadding * 2);
        var rightX = x + w - width - this.root.api.taskPadding;
        canvas_1.roundRect(ctx, leftX, top, width, height, this.root.api.taskRenderResizeControlsRadius, this.root.api.taskRenderResizeControlsColor);
        canvas_1.roundRect(ctx, rightX, top, width, height, this.root.api.taskRenderResizeControlsRadius, this.root.api.taskRenderResizeControlsColor);
    };
    TaskEntity.prototype.isControlsHover = function (event, task) {
        if (this.root.api.taskRenderResizeControls) {
            return this.isRenderedControlsHover(event, task);
        }
        var offsetX = event.offsetX;
        var x = task.x, w = task.w;
        var resizeWidth = (w * 0.2);
        if (resizeWidth > 30)
            resizeWidth = 30;
        var leftResizeX = x + resizeWidth;
        var rightResizeX = x + w - resizeWidth;
        if (leftResizeX > offsetX)
            return 'left';
        else if (rightResizeX < offsetX)
            return 'right';
        return null;
    };
    TaskEntity.prototype.isRenderedControlsHover = function (event, task) {
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var x = task.x, y = task.y, w = task.w;
        var top = this.getTaskTop(y);
        var startY = top + this.root.api.taskPadding;
        var endY = startY + this.root.api.taskHeight - (this.root.api.taskPadding * 2);
        if (offsetY < startY || offsetY > endY)
            return null;
        var width = this.root.api.taskRenderResizeControlsWidth;
        var leftStartX = x + this.root.api.taskPadding;
        var leftEndX = leftStartX + width;
        if (offsetX > leftStartX && offsetX < leftEndX)
            return 'left';
        var rightStartX = x + w - width - this.root.api.taskPadding;
        var rightEndX = rightStartX + width;
        if (offsetX > rightStartX && offsetX < rightEndX)
            return 'right';
        return null;
    };
    TaskEntity.prototype.getTaskTop = function (y) {
        var h = this.root.grid.view.rowHeight;
        return ((h - this.root.api.taskHeight) / 2) + y;
    };
    TaskEntity.prototype.getTaskXX = function (x, w) {
        var xx = x + w;
        if (this.root.api.taskRenderDepControl)
            xx += this.getDepOffsetX() + this.root.api.taskRenderDepRadius;
        return xx;
    };
    TaskEntity.prototype.getDepOffsetX = function () {
        if (!this.root.api.taskRenderDepControl)
            return 0;
        return this.root.api.taskRenderDepRadius + this.root.api.taskRenderDepOffsetX;
    };
    TaskEntity.prototype.getTaskFillStyle = function (task) {
        var hover = task.hover, hoverConnection = task.hoverConnection, background = task.background, backgroundHover = task.backgroundHover;
        if (hover || hoverConnection) {
            return backgroundHover !== null && backgroundHover !== void 0 ? backgroundHover : this.root.api.taskDefaultHoverBackground;
        }
        return background !== null && background !== void 0 ? background : this.root.api.taskDefaultBackground;
    };
    TaskEntity.prototype.getTaskStrokeStyle = function (task) {
        var hover = task.hover, hoverConnection = task.hoverConnection, error = task.error, stroke = task.stroke, strokeHover = task.strokeHover;
        var _a = this.root.api, taskErrorStrokeColor = _a.taskErrorStrokeColor, taskDefaultStrokeColor = _a.taskDefaultStrokeColor, taskDefaultHoverStrokeColor = _a.taskDefaultHoverStrokeColor;
        if (error && taskErrorStrokeColor)
            return taskErrorStrokeColor;
        if (hover || hoverConnection) {
            return strokeHover !== null && strokeHover !== void 0 ? strokeHover : taskDefaultHoverStrokeColor;
        }
        return stroke !== null && stroke !== void 0 ? stroke : taskDefaultStrokeColor;
    };
    TaskEntity.prototype.getTaskColor = function (task) {
        var hover = task.hover, hoverConnection = task.hoverConnection, color = task.color, colorHover = task.colorHover;
        if (hover || hoverConnection) {
            return colorHover !== null && colorHover !== void 0 ? colorHover : this.root.api.taskDefaultHoverColor;
        }
        return color !== null && color !== void 0 ? color : this.root.api.taskDefaultColor;
    };
    return TaskEntity;
}());
exports.TaskEntity = TaskEntity;
