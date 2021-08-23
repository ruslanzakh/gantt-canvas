import { RootModule } from '../../root/root.module';
import { roundRect } from '../../utils/canvas';
export interface TaskRender {
	id: string;
	x: number;
	y: number;
	w: number;
	hover: boolean
	hoverConnection: boolean
	title: string;
	next_ids: string[];
	background?: string;
	color?: string;
	backgroundHover?: string;
	colorHover?: string;
}

export class TaskEntity {
	root: RootModule;

	constructor(root: RootModule) {
		this.root = root;
	}

	isHover(event: MouseEvent, task: TaskRender) {
		const { x, y, w } = task;
		const h = this.root.grid.view.rowHeight;
		const { offsetX, offsetY } = event;
		let resize = null;
		let depFrom = null;
		const xx = x + w + this.root.api.depRadius;
		const yy = y + h;
		const hover = x < offsetX 
			&& offsetX < xx
			&& y < offsetY
			&& offsetY < yy;
		if(!hover) return { hover, resize, depFrom };

		if(xx - this.root.api.depRadius < offsetX) depFrom = true;
		else resize = this.isControlsHover(event, task);
		console.log(resize);
		
		return { hover, resize, depFrom };
	}

	renderItem(task: TaskRender) {
		const { x, y, w, hover } = task;
		if(x >= this.root.canvas.width || w === 0) return;
		const ctx = this.root.ctx;
		ctx.beginPath();
		const top =this.getTaskTop(y);
		const fillStyle = this.getTaskFillStyle(task);
	
		roundRect(ctx, x, top, w, this.root.api.taskHeight, this.root.api.taskRadius, fillStyle);
		this.renderTaskText(task, top);
		if(hover) {
			this.renderResizeControls(task, top);
			this.renderRightDep(x + w, top + (this.root.api.taskHeight / 2));
		}
	}

	renderRightDep(x: number, y: number) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		
		ctx.fillStyle = this.root.api.depBackground;
		ctx.arc(x, y, this.root.api.depRadius, Math.PI * 1.5,  Math.PI * 2.5);
		ctx.strokeStyle = this.root.api.depLineColor;
		ctx.stroke();
		ctx.fill();
	}

	renderArrow(id: string, source: TaskRender) {
		const h = this.root.grid.view.rowHeight;
		const task = this.root.tasks.service.getRenderedViewTaskById(id) ||  this.root.tasks.service.getViewTaskById(id);
		if(!task) return;
		let x = source.x + source.w;
		let y = source.y + (h / 2);
		// if((task.x <= 0 || task.x >= this.root.canvas.width) &&
		// 	(x <= 0 || x >= this.root.canvas.width)) return;

		const targetY = task.y + (h / 2);
		const ctx = this.root.ctx;
		ctx.strokeStyle =  this.root.api.arrowColor;
		ctx.fillStyle =  this.root.api.arrowColor;
		const r = this.root.api.arrowRadius;
		if(task.x > x) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + 10 - r, y);
			ctx.quadraticCurveTo(x + 10, y, x + 10, targetY < y ? y - r : y + r);
			ctx.lineTo(x + 10, targetY > y ? targetY - r : targetY + r);
			ctx.quadraticCurveTo(x + 10, targetY, x + 10 + r, targetY);
			ctx.lineTo(task.x, targetY);
			ctx.stroke();
			this.renderArrowHead(x + 10,  targetY, task.x, targetY)
		} else {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + 10 - r, y);
			ctx.quadraticCurveTo(x + 10, y, x + 10, y + r);
			ctx.lineTo(x + 10, y + (h / 2) - r);
			ctx.quadraticCurveTo(x + 10, y + (h / 2), x + 10 - r, y + (h / 2));
			ctx.lineTo(task.x - 20 + r, y + (h / 2));
			ctx.quadraticCurveTo(task.x - 20, y + (h / 2), task.x - 20, targetY > y ? y + (h / 2) + r : y + (h / 2) - r);
			ctx.lineTo(task.x - 20, targetY);
			ctx.lineTo(task.x, targetY);
			ctx.stroke();
			this.renderArrowHead(task.x - 20,  targetY, task.x, targetY)

		}
	}

	renderArrowFrom(id: string, x: number, y: number) {
		const task = this.root.tasks.service.getRenderedViewTaskById(id) ||  this.root.tasks.service.getViewTaskById(id);
		
		if(!task) return;
		const h = this.root.grid.view.rowHeight;
		let sourceY = task.y + (h / 2);
		const sourceX = task.x + task.w;
		const ctx = this.root.ctx;
		ctx.strokeStyle = this.root.api.arrowActiveColor;
		ctx.fillStyle = this.root.api.arrowActiveColor;

		if(task.x + task.w + this.root.api.depRadius > x) {
			ctx.beginPath();
			ctx.moveTo(sourceX, sourceY);
			ctx.lineTo(sourceX + 10, sourceY);
			ctx.lineTo(sourceX + 10, y + (h / 2));
			ctx.lineTo(x - 20, y + (h / 2));
			ctx.lineTo(x - 20, y);
			ctx.lineTo(x, y);
			ctx.stroke();
			this.renderArrowHead(x - 20, y, x, y);
		} else {
			ctx.beginPath();
			ctx.moveTo(sourceX, sourceY);
			ctx.lineTo(sourceX + 10, sourceY);
			ctx.lineTo(sourceX + 10, y);
			ctx.lineTo(x, y);
			ctx.stroke();
			this.renderArrowHead(x - 20,  y, x, y);

		}
	}
	
	renderArrowHead(fromx, fromy, tox, toy){
		const ctx = this.root.ctx;
		//variables to be used when creating the arrow
		var headlen = 10;
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
	}


	renderTaskText(task: TaskRender, top: number) {
		const { x, w, title } = task;
		const ctx = this.root.ctx;
		ctx.font = this.root.api.taskFont;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		
		if(ctx.measureText(title).width < (w - (this.root.api.taskPadding * 2))) {
			ctx.fillStyle = this.getTaskColor(task);
			ctx.textAlign = 'center';
			ctx.fillText(title, x + (w / 2), top + (this.root.api.taskHeight / 2));
		} else {
			ctx.fillStyle = this.root.api.taskDefaultOutlineColor;
			ctx.textAlign = 'left';
			ctx.fillText(title, x + w + (this.root.api.depRadius * 2), top + (this.root.api.taskHeight / 2));
		}
	}

	renderResizeControls(task: TaskRender, top: number) {
		if(!this.root.api.taskRenderResizeControls) return;
		const { x, w } = task;
		const ctx = this.root.ctx;
		const leftX = x + this.root.api.taskPadding
		top += this.root.api.taskPadding;
		const width = this.root.api.taskRenderResizeControlsWidth;
		const height = this.root.api.taskHeight - (this.root.api.taskPadding * 2);
		const rightX = x + w - width - this.root.api.taskPadding;
		roundRect(ctx, leftX, top, width, height, this.root.api.taskRenderResizeControlsRadius, this.root.api.taskRenderResizeControlsColor);
		roundRect(ctx, rightX, top, width, height, this.root.api.taskRenderResizeControlsRadius, this.root.api.taskRenderResizeControlsColor);
	}

	isControlsHover(event: MouseEvent, task: TaskRender): string | null {
		if(this.root.api.taskRenderResizeControls) {
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

	isRenderedControlsHover(event: MouseEvent, task: TaskRender): string | null {
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

	getTaskFillStyle(task: TaskRender): string {
		const { hover, hoverConnection, background, backgroundHover } = task;
		if(hover || hoverConnection) {
			return backgroundHover ?? this.root.api.taskDefaultHoverBackground;
		}
		return background ?? this.root.api.taskDefaultBackground;
	}

	getTaskColor(task: TaskRender): string {
		const {hover, hoverConnection, color, colorHover} = task;
		if(hover || hoverConnection) {
			return colorHover ?? this.root.api.taskDefaultHoverColor;
		}
		return color ?? this.root.api.taskDefaultColor;
	}
}