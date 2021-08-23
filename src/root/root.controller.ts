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
		this.handleTouchMove = debounce(this.handleTouchMove.bind(this), 32);
		this.root.canvas.addEventListener('mousemove', this.handleMouseMove);
		this.root.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
		this.root.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
		this.root.canvas.addEventListener('click', this.handleClick.bind(this));
		this.root.canvas.addEventListener('wheel', this.handleScroll.bind(this));
		this.root.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
		this.root.canvas.addEventListener('touchmove', this.handleTouchMove);
		this.root.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
	}

	destroyEvents() {
		this.root.canvas.removeEventListener('mousemove', this.handleMouseMove);
	}

	on<T extends Event>(event: string, callback: (event: T) => void) {
		if(!this.events[event]) this.events[event] = [];
		this.events[event].push(callback);
		
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
			const maxHeight = this.root.grid.service.getLeftAvailableHeight();
			if(offsetY < 0) offsetY = 0;
			else if(offsetY > maxHeight) offsetY = maxHeight; 
			this.root.view.handleSetOffsetY(offsetY);
		}
	}

	handleTouchStart(event: TouchEvent) {
		event.preventDefault();
		const offsetX = event.touches[0]?.screenX;
		const offsetY = event.touches[0]?.screenY;
		if(offsetX) this.touchOffsetX = offsetX;
		if(offsetY) this.touchOffsetY = offsetY;
		
	}


	handleTouchMove(event: TouchEvent) {
		event.preventDefault();
		const offsetX = event.changedTouches[0]?.screenX;
		const offsetY = event.changedTouches[0]?.screenY;
		if(offsetX && this.touchOffsetX !== null) {
			const diff = this.touchOffsetX - offsetX;
			let offset = this.root.view.offsetX + diff;
			this.root.view.handleSetOffsetX(offset);
			this.touchOffsetX = offsetX;
		}
		if(offsetY && this.touchOffsetY !== null) {
			const diff = this.touchOffsetY - offsetY;
			let offset = this.root.view.offsetY + diff;
			this.root.view.handleSetOffsetY(offset);
			this.touchOffsetY = offsetY;
		}
		
	}


	handleTouchEnd(event: TouchEvent) {

		if(!this.events.touchend) return;
		this.events.touchend.every(cb => {
			// @ts-ignore
			if(event._stopPropagation) return false;
			cb(event);
			return true;
		});

		event.preventDefault();
		this.touchOffsetX = null;
		this.touchOffsetY = null;
	}

	
	stopPropagation(event: MouseEvent) {
		// @ts-ignore
		event._stopPropagation = true;
	}

}