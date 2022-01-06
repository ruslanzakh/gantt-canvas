import { RootModule } from '../../root/root.module';
import { roundRect, renderUnderline } from '../../utils/canvas';
import { EventOffsets } from '../../utils/interfaces';
export interface TaskRender {
	id: string;
	x: number;
	y: number;
	w: number;
	error?: boolean
	hover: boolean
	hoverConnection: boolean
	title: string;
	next_ids: string[];
	background?: string;
	color?: string;
	backgroundHover?: string;
	colorHover?: string;
	stroke?: string;
	strokeHover?: string;
	underline?: boolean;
	outlineColor?: string;
	noEditable?: boolean;
	subtitle?: string;
	colorSubtitle?: string;
	outlineSubtitleColor?: string;
}

export class TaskEntity {
	root: RootModule;

	constructor(root: RootModule) {
		this.root = root;
	}

	isHover(event: EventOffsets, task: TaskRender) {
		let { x, y, w, noEditable } = task;
		const h = this.root.grid.view.rowHeight;
		const { offsetX, offsetY } = event;
		let resize = null;
		let depFrom = null;
		let xx = this.getTaskXX(x, w);
		const yy = y + h;
		if(this.needControlOutsideTask(task)) {
			x -= (this.root.api.taskPadding + this.root.api.taskRenderResizeControlsWidth);
			xx += (this.root.api.taskRenderResizeControlsWidth + this.root.api.taskPadding);
		}
		const hover = x < offsetX 
			&& offsetX < xx
			&& y < offsetY
			&& offsetY < yy;
		if(!hover) return { hover, resize, depFrom };
		if(!noEditable) {
			if(this.root.api.taskRenderDepControl && (xx - this.root.api.taskRenderDepRadius - this.getDepOffsetX() < offsetX)) depFrom = true;
			else resize = this.isControlsHover(event, task);
		}
		
		return { hover, resize, depFrom };
	}

	renderItem(task: TaskRender) {
		const { x, y, w, hover, noEditable } = task;
		if(x >= this.root.view.canvasWidth || w === 0) return;
		const ctx = this.root.ctx;
		ctx.beginPath();
		const top =this.getTaskTop(y);
		const fillStyle = this.getTaskFillStyle(task);
		const strokeStyle = this.getTaskStrokeStyle(task);
		roundRect(ctx, x, top, w, this.root.api.taskHeight, this.root.api.taskRadius, fillStyle, strokeStyle);
		this.renderTaskText(task, top);
		if(hover && !noEditable) {
			this.renderResizeControls(task, top);
			this.renderRightDep(x + w, top + (this.root.api.taskHeight / 2));
		}
	}

	renderRightDep(x: number, y: number) {
		if(!this.root.api.taskRenderDepControl) return;
		const ctx = this.root.ctx;
		ctx.beginPath();
		
		ctx.fillStyle = this.root.api.taskRenderDepBackground;
		ctx.arc(x + this.getDepOffsetX(), y, this.root.api.taskRenderDepRadius, 0, Math.PI * 2);
		ctx.strokeStyle = this.root.api.taskRenderDepLineColor;
		ctx.stroke();
		ctx.fill();
	}

	renderArrow(id: string, source: TaskRender) {
		const h = this.root.grid.view.rowHeight;
		const task = this.root.tasks.service.getRenderedViewTaskById(id) ||  this.root.tasks.service.getViewTaskById(id);
		if(!task) return;
		let x = source.x + source.w;
		let y = source.y + (h / 2);
		const isHover = task.hover || source.hover;
		// clear previous lines due to making a new line clear
		if(isHover) this.renderArrowLine(x, y, task, isHover, true);
		this.renderArrowLine(x, y, task, isHover, false);
	}

	renderArrowLine(
		x: number,
		y: number,
		task: TaskRender,
		isHover: boolean,
		isClear: boolean,
	) {
		const ctx = this.root.ctx;
		const r = this.root.api.arrowRadius;
		const h = this.root.grid.view.rowHeight;
		const startOffsetX = this.getDepOffsetX() || 10;
		const targetY = task.y + (h / 2);
		ctx.strokeStyle =  this.root.api.arrowColor;
		ctx.fillStyle =  this.root.api.arrowColor;
		const oldLineWidth = ctx.lineWidth;
		ctx.lineWidth = this.root.api.arrowWidth;
		if(isClear) {
			ctx.strokeStyle = '#fff';
			ctx.fillStyle = '#fff';
		} else if(isHover) {
			ctx.strokeStyle = this.root.api.arrowHoverColor;
			ctx.fillStyle = this.root.api.arrowHoverColor;
			ctx.lineWidth = this.root.api.arrowHoverWidth;
		}
		if(task.x >= x + (startOffsetX * 2)) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + startOffsetX - r, y);
			ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, targetY < y ? y - r : y + r);
			ctx.lineTo(x + startOffsetX, targetY > y ? targetY - r : targetY + r);
			ctx.quadraticCurveTo(x + startOffsetX, targetY, x + startOffsetX + r, targetY);
			ctx.lineTo(task.x - ctx.lineWidth, targetY);
			ctx.stroke();
			this.renderArrowHead(x + startOffsetX,  targetY, task.x, targetY, isHover)
		} else {
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
			this.renderArrowHead(task.x - 20,  targetY, task.x, targetY, isHover)
		}
		ctx.lineWidth = oldLineWidth;
	}

	renderArrowConnection(id: string, x: number, y: number) {
		const task = this.root.tasks.service.getRenderedViewTaskById(id) ||  this.root.tasks.service.getViewTaskById(id);
		
		if(!task) return;
		const h = this.root.grid.view.rowHeight;
		let sourceY = task.y + (h / 2);
		const sourceX = task.x + task.w;
		const ctx = this.root.ctx;
		ctx.strokeStyle = this.root.api.arrowActiveColor;
		ctx.fillStyle = this.root.api.arrowActiveColor;
		const startOffsetX = this.getDepOffsetX();
		if(task.x + task.w + this.root.api.taskRenderDepRadius > x) {
			ctx.beginPath();
			ctx.moveTo(sourceX, sourceY);
			ctx.lineTo(sourceX + startOffsetX, sourceY);
			ctx.lineTo(sourceX + startOffsetX, y + (h / 2));
			ctx.lineTo(x - 20, y + (h / 2));
			ctx.lineTo(x - 20, y);
			ctx.lineTo(x, y);
			ctx.stroke();
			this.renderArrowHead(x - 20, y, x, y);
		} else {
			ctx.beginPath();
			ctx.moveTo(sourceX, sourceY);
			ctx.lineTo(sourceX + startOffsetX, sourceY);
			ctx.lineTo(sourceX + startOffsetX, y);
			ctx.lineTo(x, y);
			ctx.stroke();
			this.renderArrowHead(x - 20,  y, x, y);
		}
	}
	
	renderArrowHead(fromx: number, fromy: number, tox: number, toy: number, hover = false){
		const ctx = this.root.ctx;
		const oldLineWidth = ctx.lineWidth;
		if(hover) {
			ctx.lineWidth = this.root.api.arrowHoverHeadWidth;
			tox -= this.root.api.arrowHoverHeadWidth;
		} else {
			ctx.lineWidth = this.root.api.arrowWidth;
			tox -= this.root.api.arrowWidth;
		}
		//variables to be used when creating the arrow
		var headlen = 10 * this.root.api.scale;
		var angle = Math.atan2(toy-fromy,tox-fromx);

		//starting a new path from the head of the arrow to one of the sides of
		//the point
		ctx.beginPath();
		ctx.moveTo(tox, toy);
		ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
				   toy-headlen*Math.sin(angle-Math.PI/7));
	 
		//path from the side point of the arrow, to the other side point
		ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
				   toy-headlen*Math.sin(angle+Math.PI/7));
	 
		//path from the side point back to the tip of the arrow, and then
		//again to the opposite side point
		ctx.lineTo(tox, toy);
		ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
				   toy-headlen*Math.sin(angle-Math.PI/7));
	 
		//draws the paths created above
		ctx.stroke();
		ctx.fill();
		ctx.lineWidth = oldLineWidth;
	}


	renderTaskText(task: TaskRender, top: number) {
		const { x, w, title, subtitle, hover, colorSubtitle } = task;
		const ctx = this.root.ctx;
		const {
			taskFont,
			taskPadding,
			taskRenderResizeControls,
			taskRenderResizeControlsWidth,
			taskHeight,
			taskDefaultOutlineColor,
			taskDefaultSubtitleColor,
			taskDefaultSubtitleOutlineColor,
			taskRenderDepRadius,
			taskSubtitleOffset,
		} = this.root.api;
		ctx.font = taskFont;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		
		let maxWidth = w - (taskPadding * 2);
		if(taskRenderResizeControls) maxWidth -= (taskRenderResizeControlsWidth * 2) + (taskPadding * 2);
		const titleWidth = ctx.measureText(title).width;
		const subtitleWidth = subtitle ? ctx.measureText(subtitle).width + taskSubtitleOffset : 0;
		if(titleWidth + subtitleWidth < maxWidth) {
			ctx.fillStyle = this.getTitleColor(task);
			ctx.textAlign = 'left';
			const titleX = x + (taskPadding * 2) + taskRenderResizeControlsWidth;
			ctx.fillText(title, titleX, top + (taskHeight / 2));
			if(task.underline)
				renderUnderline(ctx, title, titleX, top + (taskHeight / 4));
				
			if(subtitle && hover) {
				ctx.fillStyle = colorSubtitle ?? taskDefaultSubtitleColor;
				ctx.fillText(subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 2) )
				if(task.underline)
					renderUnderline(ctx, subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 4));
			}
		} else {
			ctx.fillStyle = task.outlineColor ?? taskDefaultOutlineColor;
			ctx.textAlign = 'left';
			const offsetX = this.getDepOffsetX();
			const titleX = x + w + offsetX + (taskRenderDepRadius * 2);
			ctx.fillText(title, titleX, top + (taskHeight / 2));
			if(task.underline)
				renderUnderline(ctx, title, titleX, top + (taskHeight / 4));
				if(subtitle && hover) {
					ctx.fillStyle = task.outlineSubtitleColor ?? taskDefaultSubtitleOutlineColor;
					ctx.fillText(subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 2) )
					if(task.underline)
						renderUnderline(ctx, subtitle, titleX + titleWidth + taskSubtitleOffset, top + (taskHeight / 4));
				}
		}
	}

	renderResizeControls(task: TaskRender, top: number) {
		if(!this.root.api.taskRenderResizeControls || this.needControlOutsideTask(task)) return;
		const { x, w } = task;
		const ctx = this.root.ctx;
		const leftX = x + this.root.api.taskPadding
		top += this.root.api.taskPadding;
		const width = this.root.api.taskRenderResizeControlsWidth;
		const height = this.root.api.taskHeight - (this.root.api.taskPadding * 2);
		const rightX = x + w - width - this.root.api.taskPadding;
		const color = this.root.api.taskRenderResizeControlsColor;
		roundRect(ctx, leftX, top, width, height, this.root.api.taskRenderResizeControlsRadius, color);
		roundRect(ctx, rightX, top, width, height, this.root.api.taskRenderResizeControlsRadius, color);
	}

	isControlsHover(event: EventOffsets, task: TaskRender): string | null {
		if(this.root.api.taskRenderResizeControls && !this.needControlOutsideTask(task)) {
			return this.isRenderedControlsHover(event, task);
		}

		const { offsetX } = event;
		const { x, w } = task;
		let resizeWidth = (w * 0.2);
		if(resizeWidth > 30) resizeWidth = 30;
		const leftResizeX = x + resizeWidth;
		const rightResizeX = x + w - resizeWidth;
		if(leftResizeX > offsetX) return 'left';
		else if(rightResizeX < offsetX) return 'right';
		return null;
	}

	isRenderedControlsHover(event: EventOffsets, task: TaskRender): string | null {
		const { offsetX, offsetY } = event;
		const { x, y, w } = task;

		const top = this.getTaskTop(y);
		const startY = top + this.root.api.taskPadding;
		const endY = startY + this.root.api.taskHeight - (this.root.api.taskPadding * 2);
		if(offsetY < startY || offsetY > endY) return null;
		
		const width = this.root.api.taskRenderResizeControlsWidth;
		const leftStartX = x + this.root.api.taskPadding;
		const leftEndX = leftStartX + width;
		if(offsetX > leftStartX && offsetX < leftEndX) return 'left';
		const rightStartX = x + w - width - this.root.api.taskPadding;
		const rightEndX = rightStartX + width;
		if(offsetX > rightStartX && offsetX < rightEndX) return 'right';
		return null;
	}

	getTaskTop(y: number) {
		const h = this.root.grid.view.rowHeight;
		return ((h - this.root.api.taskHeight) / 2) + y;
	}

	getTaskXX(x: number, w: number) {
		let xx = x + w;
		if(this.root.api.taskRenderDepControl)
			xx += this.getDepOffsetX() + this.root.api.taskRenderDepRadius;
		return xx;
	}

	getDepOffsetX() {
		if(!this.root.api.taskRenderDepControl) return 0;
		return this.root.api.taskRenderDepRadius + this.root.api.taskRenderDepOffsetX;
	}

	getTaskFillStyle(task: TaskRender): string {
		const { hover, hoverConnection, background, backgroundHover } = task;
		if(hover || hoverConnection) {
			return backgroundHover ?? this.root.api.taskDefaultHoverBackground;
		}
		return background ?? this.root.api.taskDefaultBackground;
	}

	getTaskStrokeStyle(task: TaskRender): string | undefined {
		const { hover, hoverConnection, error, stroke, strokeHover } = task;
		const { taskErrorStrokeColor, taskDefaultStrokeColor, taskDefaultHoverStrokeColor } = this.root.api;
		if(error && taskErrorStrokeColor) return taskErrorStrokeColor;
		if(hover || hoverConnection) {
			return strokeHover ?? taskDefaultHoverStrokeColor;
		}
		return stroke ?? taskDefaultStrokeColor;
	}

	getTitleColor(task: TaskRender): string {
		const {hover, hoverConnection, color, colorHover} = task;
		if(hover || hoverConnection) {
			return colorHover ?? this.root.api.taskDefaultHoverColor;
		}
		return color ?? this.root.api.taskDefaultColor;
	}

	needControlOutsideTask(task: TaskRender) {
		return (this.root.api.taskRenderResizeControlsWidth + this.root.api.taskPadding) * 2 > task.w;
	}
}