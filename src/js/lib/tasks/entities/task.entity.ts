import { RootModule } from '../../root/root.module';

export interface TaskRender {
	id: string;
	x: number;
	y: number;
	w: number;
	hover: boolean
	hoverConnection: boolean
	title: string;
	next_ids: string[];
}

export class TaskEntity {
	root: RootModule;

	constructor(root: RootModule) {
		this.root = root;
	}

	isHover(event: MouseEvent, {x, y, w}: TaskRender) {
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
		let resizeWidth = (w * 0.2);
		if(resizeWidth > 30) resizeWidth = 30;
		const leftResizeX = x + resizeWidth;
		const rightResizeX = x + w - resizeWidth;
		if(xx - this.root.api.depRadius < offsetX) depFrom = true;
		else if(leftResizeX > offsetX) resize = 'left';
		else if(rightResizeX < offsetX) resize = 'right';
		return { hover, resize, depFrom };
	}

	renderItem({x, y, w, title, hover, hoverConnection}: TaskRender) {
		const h = this.root.grid.view.rowHeight;
		if(x >= this.root.canvas.width || w === 0) return;
		const ctx = this.root.ctx;
		ctx.beginPath();
		const top = ((h - this.root.api.taskHeight) / 2) + y;
		ctx.rect(x, top, w, this.root.api.taskHeight);
		ctx.fillStyle = (hover || hoverConnection) 
			? this.root.api.taskDefaultHoverBackground
			: this.root.api.taskDefaultBackground;
	
		ctx.fill();
		
		ctx.font = this.root.api.taskFont;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		console.log(ctx.measureText(title));
		
		if(ctx.measureText(title).width < (w - (this.root.api.taskPadding * 2))) {
			ctx.fillStyle = (hover || hoverConnection) 
				? this.root.api.taskDefaultHoverColor
				: this.root.api.taskDefaultColor;
			ctx.textAlign = 'center';
			ctx.fillText(title, x + (w / 2), top + (this.root.api.taskHeight / 2));
		} else {
			ctx.fillStyle = this.root.api.taskDefaultOutlineColor;
			ctx.textAlign = 'left';
			ctx.fillText(title, x + w + (this.root.api.depRadius * 2), top + (this.root.api.taskHeight / 2));
		}
		if(hover) this.renderRightDep(x + w, top + (this.root.api.taskHeight / 2))
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
		
		if(task.x > x) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + 10, y);
			ctx.lineTo(x + 10, targetY);
			ctx.lineTo(task.x, targetY);
			ctx.stroke();
			this.renderArrowHead(x + 10,  targetY, task.x, targetY)
		} else {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + 10, y);
			ctx.lineTo(x + 10, y + (h / 2));
			ctx.lineTo(task.x - 20, y + (h / 2));
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
}