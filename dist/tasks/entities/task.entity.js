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
        if (this.needControlOutsideTask(task)) {
            x -= (this.root.api.taskPadding + this.root.api.taskRenderResizeControlsWidth);
            xx += (this.root.api.taskRenderResizeControlsWidth + this.root.api.taskPadding);
        }
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
        if (x >= this.root.view.canvasWidth || w === 0)
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
        var oldLineWidth = ctx.lineWidth;
        if (task.hover || source.hover) {
            ctx.strokeStyle = this.root.api.arrowHoverColor;
            ctx.fillStyle = this.root.api.arrowHoverColor;
            ctx.lineWidth = this.root.api.arrowHoverWidth;
        }
        var r = this.root.api.arrowRadius;
        var startOffsetX = this.getDepOffsetX() || 10;
        if (task.x >= x + (startOffsetX * 2)) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + startOffsetX - r, y);
            ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, targetY < y ? y - r : y + r);
            ctx.lineTo(x + startOffsetX, targetY > y ? targetY - r : targetY + r);
            ctx.quadraticCurveTo(x + startOffsetX, targetY, x + startOffsetX + r, targetY);
            ctx.lineTo(task.x - ctx.lineWidth, targetY);
            ctx.stroke();
            this.renderArrowHead(x + startOffsetX, targetY, task.x, targetY, task.hover || source.hover);
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
            ctx.lineTo(task.x - ctx.lineWidth, targetY);
            ctx.stroke();
            this.renderArrowHead(task.x - 20, targetY, task.x, targetY, task.hover || source.hover);
        }
        ctx.lineWidth = oldLineWidth;
    };
    TaskEntity.prototype.renderArrowConnection = function (id, x, y) {
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
    TaskEntity.prototype.renderArrowHead = function (fromx, fromy, tox, toy, hover) {
        if (hover === void 0) { hover = false; }
        var ctx = this.root.ctx;
        var oldLineWidth = ctx.lineWidth;
        if (hover) {
            ctx.lineWidth = this.root.api.arrowHoverHeadWidth;
            tox -= this.root.api.arrowHoverHeadWidth;
        }
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
        ctx.lineWidth = oldLineWidth;
    };
    TaskEntity.prototype.renderTaskText = function (task, top) {
        var _a, _b;
        var x = task.x, w = task.w, title = task.title, subtitle = task.subtitle, hover = task.hover, colorSubtitle = task.colorSubtitle;
        var ctx = this.root.ctx;
        var _c = this.root.api, taskFont = _c.taskFont, taskPadding = _c.taskPadding, taskRenderResizeControls = _c.taskRenderResizeControls, taskRenderResizeControlsWidth = _c.taskRenderResizeControlsWidth, taskHeight = _c.taskHeight, taskDefaultOutlineColor = _c.taskDefaultOutlineColor, taskDefaultSubtitleColor = _c.taskDefaultSubtitleColor, taskDefaultSubtitleOutlineColor = _c.taskDefaultSubtitleOutlineColor, taskRenderDepRadius = _c.taskRenderDepRadius, taskSubtitleOffset = _c.taskSubtitleOffset;
        ctx.font = taskFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var maxWidth = w - (taskPadding * 2);
        if (taskRenderResizeControls)
            maxWidth -= (taskRenderResizeControlsWidth * 2) + (taskPadding * 2);
        var titleWidth = ctx.measureText(title).width;
        var subtitleWidth = subtitle ? ctx.measureText(subtitle).width + taskSubtitleOffset : 0;
        if (titleWidth + subtitleWidth < maxWidth) {
            ctx.fillStyle = this.getTitleColor(task);
            ctx.textAlign = 'left';
            var titleX = x + (taskPadding * 2) + taskRenderResizeControlsWidth;
            ctx.fillText(title, titleX, top + (taskHeight / 2));
            if (task.underline)
                canvas_1.renderUnderline(ctx, title, titleX, top + (taskHeight / 4));
            if (subtitle && hover) {
                ctx.fillStyle = colorSubtitle !== null && colorSubtitle !== void 0 ? colorSubtitle : taskDefaultSubtitleColor;
                ctx.fillText(subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 2));
                if (task.underline)
                    canvas_1.renderUnderline(ctx, subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 4));
            }
        }
        else {
            ctx.fillStyle = (_a = task.outlineColor) !== null && _a !== void 0 ? _a : taskDefaultOutlineColor;
            ctx.textAlign = 'left';
            var offsetX = this.getDepOffsetX();
            var titleX = x + w + offsetX + (taskRenderDepRadius * 2);
            ctx.fillText(title, titleX, top + (taskHeight / 2));
            if (task.underline)
                canvas_1.renderUnderline(ctx, title, titleX, top + (taskHeight / 4));
            if (subtitle && hover) {
                ctx.fillStyle = (_b = task.outlineSubtitleColor) !== null && _b !== void 0 ? _b : taskDefaultSubtitleOutlineColor;
                ctx.fillText(subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 2));
                if (task.underline)
                    canvas_1.renderUnderline(ctx, subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 4));
            }
        }
    };
    TaskEntity.prototype.renderResizeControls = function (task, top) {
        if (!this.root.api.taskRenderResizeControls || this.needControlOutsideTask(task))
            return;
        var x = task.x, w = task.w;
        var ctx = this.root.ctx;
        var leftX = x + this.root.api.taskPadding;
        top += this.root.api.taskPadding;
        var width = this.root.api.taskRenderResizeControlsWidth;
        var height = this.root.api.taskHeight - (this.root.api.taskPadding * 2);
        var rightX = x + w - width - this.root.api.taskPadding;
        var color = this.root.api.taskRenderResizeControlsColor;
        canvas_1.roundRect(ctx, leftX, top, width, height, this.root.api.taskRenderResizeControlsRadius, color);
        canvas_1.roundRect(ctx, rightX, top, width, height, this.root.api.taskRenderResizeControlsRadius, color);
    };
    TaskEntity.prototype.isControlsHover = function (event, task) {
        if (this.root.api.taskRenderResizeControls && !this.needControlOutsideTask(task)) {
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
    TaskEntity.prototype.getTitleColor = function (task) {
        var hover = task.hover, hoverConnection = task.hoverConnection, color = task.color, colorHover = task.colorHover;
        if (hover || hoverConnection) {
            return colorHover !== null && colorHover !== void 0 ? colorHover : this.root.api.taskDefaultHoverColor;
        }
        return color !== null && color !== void 0 ? color : this.root.api.taskDefaultColor;
    };
    TaskEntity.prototype.needControlOutsideTask = function (task) {
        return (this.root.api.taskRenderResizeControlsWidth + this.root.api.taskPadding) * 2 > task.w;
    };
    return TaskEntity;
}());
exports.TaskEntity = TaskEntity;
