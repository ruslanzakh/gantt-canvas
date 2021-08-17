import { RootModule } from '../../root/root.module';


export interface TaskRender {
	id: string;
	x: number;
	y: number;
	w: number
	hover: boolean
	title: string;
	next_ids: string[];
}

export class TaskEntity {
	root: RootModule;
	fillColor = 'blue';
	hoverFillColor = 'red';

	depRadius = 8;

	constructor(root: RootModule) {
		this.root = root;
	}

	isHover(event: MouseEvent, {x, y, w}: TaskRender, h: number) {
		const { offsetX, offsetY } = event;
		let resize = null;
		let depFrom = null;
		const xx = x + w + this.depRadius;
		const yy = y + h;
		const hover = x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
		if(!hover) return { hover, resize, depFrom };
		let resizeWidth = (w * 0.2);
		if(resizeWidth > 30) resizeWidth = 30;
		const leftResizeX = x + resizeWidth;
		const rightResizeX = x + w - resizeWidth;
		if(xx - this.depRadius < offsetX) depFrom = true;
		else if(leftResizeX > offsetX) resize = 'left';
		else if(rightResizeX < offsetX) resize = 'right';
		return { hover, resize, depFrom };
	}

	renderItem({x, y, w, title, hover}: TaskRender, h: number) {
		if(x >= this.root.canvas.width || w === 0) return;
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.rect(x, y + 5, w, h - 10);
		ctx.fillStyle = hover ? this.hoverFillColor : this.fillColor;
		ctx.stroke();
		ctx.fill();
		ctx.font = "14px serif";
		ctx.fillStyle = '#fff';
  		ctx.fillText(title, x + 5, y + 20);
		if(hover) this.renderRightDep(x + w, y + 15)
	}

	renderRightDep(x: number, y: number) {
		const ctx = this.root.ctx;
		ctx.beginPath();
		ctx.arc(x, y, this.depRadius, Math.PI * 1.5,  Math.PI * 2.5);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.fill();
	}

	renderArrow(id: string, x: number, y: number, h: number) {
		const task = this.root.tasks.service.getRenderedViewTaskById(id) ||  this.root.tasks.service.getViewTaskById(id);
		if(!task) return;
		// if((task.x <= 0 || task.x >= this.root.canvas.width) &&
		// 	(x <= 0 || x >= this.root.canvas.width)) return;

		const targetY = task.y + (h / 2);
		const ctx = this.root.ctx;
		ctx.strokeStyle = '#2acc69';
		ctx.fillStyle = '#2acc69';
		
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
	renderArrowFrom(id: string, x: number, y: number, h: number) {
		const task = this.root.tasks.service.getRenderedViewTaskById(id) ||  this.root.tasks.service.getViewTaskById(id);
		
		if(!task) return;

		let sourceY = task.y + (h / 2);
		const sourceX = task.x + task.w;
		const ctx = this.root.ctx;
		ctx.strokeStyle = 'orange';
		ctx.fillStyle = 'orange';

		if(task.x + task.w + this.depRadius > x) {
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