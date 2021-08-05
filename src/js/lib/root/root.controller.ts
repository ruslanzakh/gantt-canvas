import { RootModule } from './root.module';
import { debounce } from '../utils/base';

interface EventsList {
	[index: string]: Function[];
}

export class RootController {
	root: RootModule;
	events: EventsList = {};
	constructor(root: RootModule) {
		this.root = root;
		this.attachEvents();
		this.on('mousemove', this.handleMouseMoveTest.bind(this))
	}

	attachEvents() {
		this.handleMouseMove = debounce(this.handleMouseMove.bind(this), 32);
		this.root.canvas.addEventListener('mousemove', this.handleMouseMove)
		this.root.canvas.addEventListener('click', this.handleClick.bind(this))
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


	handleClick(event: MouseEvent) {
		if(!this.events.click) return;
		this.events.click.forEach(cb => cb(event));
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