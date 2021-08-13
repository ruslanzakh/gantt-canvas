import { RootModule } from './root.module';
import { debounce } from '../utils/base';

interface EventsList {
	[index: string]: Function[];
}

export class RootController {
	root: RootModule;
	events: EventsList = {};

	touchOffsetX: number | null = null;
	touchOffsetY: number | null = null;

	constructor(root: RootModule) {
		this.root = root;
		this.attachEvents();
	}

	attachEvents() {
		this.handleMouseMove = debounce(this.handleMouseMove.bind(this), 32);
		this.root.canvas.addEventListener('mousemove', this.handleMouseMove);
		this.root.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
		this.root.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
		this.root.canvas.addEventListener('click', this.handleClick.bind(this));
		this.root.canvas.addEventListener('wheel', this.handleScroll.bind(this));
		this.root.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
		this.root.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
		this.root.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
	}

	destroyEvents() {
		this.root.canvas.removeEventListener('mousemove', this.handleMouseMove);
	}

	on(event: string, callback) {
		if(!this.events[event]) this.events[event] = [];
		this.events[event].push(callback);
		console.log(this.events);
		
		return () => {
			this.events[event] = this.events[event].filter(cb => cb !== callback);
		}
	}

	handleMouseMove(event: MouseEvent) {
		if(!this.events.mousemove) return;
		this.events.mousemove.every(cb => {
			// @ts-ignore
			if(event._stopPropagation) return false;
			cb(event);
			return true;
		});
	}

	handleMouseDown(event: MouseEvent) {
		if(!this.events.mousedown) return;
		this.events.mousedown.every(cb => {
			// @ts-ignore
			if(event._stopPropagation) return false;
			cb(event);
			return true;
		});
	}

	handleMouseUp(event: MouseEvent) {
		if(!this.events.mouseup) return;
		this.events.mouseup.every(cb => {
			// @ts-ignore
			if(event._stopPropagation) return false;
			cb(event);
			return true;
		});
	}


	handleClick(event: MouseEvent) {
		if(!this.events.click) return;
		this.events.click.forEach(cb => cb(event));
	}

	handleScroll(event: WheelEvent) {
		if(event.shiftKey) {
			let offsetX = this.root.view.offsetX + event.deltaY;
			if(offsetX < 0) offsetX = 0;
			this.root.view.handleSetOffsetX(offsetX);
		} else {
			let offsetY = this.root.view.offsetY + event.deltaY;
			const maxHeight = this.root.grid.service.getFullAvailableGridHeight();
			if(offsetY < 0) offsetY = 0;
			else if(offsetY > maxHeight) offsetY = maxHeight; 
			this.root.view.handleSetOffsetY(offsetY);
		}
	}

	handleTouchStart(event: TouchEvent) {
		const offsetX = event.touches[0]?.screenX;
		const offsetY = event.touches[0]?.screenY;
		if(offsetX) this.touchOffsetX = offsetX;
		if(offsetY) this.touchOffsetY = offsetY;
		
	}


	handleTouchMove(event: TouchEvent) {
		const offsetX = event.changedTouches[0]?.screenX;
		const offsetY = event.changedTouches[0]?.screenY;
		if(offsetX && this.touchOffsetX !== null) {
			const diff = this.touchOffsetX - offsetX;
			let offset = this.root.view.offsetX + this.root.view.scrollbarX.getScaledOffset(diff / 10);
			this.root.view.handleSetOffsetX(offset);
			this.touchOffsetX = offsetX;
		}
		if(offsetY && this.touchOffsetY !== null) {
			const diff = this.touchOffsetY - offsetY;
			let offset = this.root.view.offsetY + this.root.view.scrollbarY.getScaledOffset(this.root.view.scrollbarY.top + diff / 10);
			this.root.view.handleSetOffsetY(offset);
			this.touchOffsetY = offsetY;
		}
		
	}


	handleTouchEnd() {
		this.touchOffsetX = null;
		this.touchOffsetY = null;
	}

	
	stopPropagation(event: MouseEvent) {
		// @ts-ignore
		event._stopPropagation = true;
	}

	handleMouseMoveTest(event: MouseEvent) {
		const { offsetX, offsetY } = event;
		this.root.data.forEach((el) => {
			if(el.type === 'Circle') {
				const r = el.data.r;
				const x = el.data.x - r;
				const xx = el.data.x + r;
				const y = el.data.y - r;
				const yy = el.data.y + r;
				const hover = x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
				if(el.data.hover != hover) {
					el.data.hover = hover;
					this.root.render();
				}
			} else if(el.type === 'Square') {
				const xx = el.data.x + el.data.w;
				const yy = el.data.y + el.data.h;
				const hover = el.data.x < offsetX && offsetX < xx && el.data.y < offsetY && offsetY < yy;
				if(el.data.hover != hover) {
					el.data.hover = hover;
					this.root.render();
				}
			}
		})
	}

}