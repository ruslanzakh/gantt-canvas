import { RootModule } from '../root.module';


export class ScrollbarXEntity {
	root: RootModule;
	destroyHandleMouseDown: Function;
	destroyMouseMove: Function;
	
	height = 12;

	constructor(root: RootModule) {
		this.root = root;
		this.attachEvents();
	}

	get top() {
		return this.root.canvas.height - this.height;
	}

	attachEvents() {
		this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
		this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
	}

	destroyEvents() {
		this.destroyHandleMouseDown();
		this.destroyMouseMove();
	}

	isLineClick(event: MouseEvent) {
		const { offsetX, offsetY } = event;
		const { x, width } = this.getLineXAndWidth();
		if(offsetX < x || offsetX > x + width) return false;
		if(offsetY < this.top) return false;
		return true;
	}

	isBackgroundClick(event: MouseEvent) {
		const { offsetY } = event;
		return offsetY >= this.top;
	}

	handleMouseDown(event: MouseEvent) {
		const isLineClick = this.isLineClick(event);
		const isBackgroundClick = this.isBackgroundClick(event);
		if(isLineClick) this.handleLinkMouseDown(event);
		else if(isBackgroundClick) this.handleBackgroundMouseDown(event);

		if(isLineClick || isBackgroundClick) this.root.controller.stopPropagation(event);
	}

	handleLinkMouseDown(event: MouseEvent) {

	}

	handleBackgroundMouseDown(event: MouseEvent) {
		const canvas = this.root.canvas;
		const { offsetX } = event;
		const fullWidth = this.root.grid.service.getFullAvailableWidth();
		const scale = fullWidth / canvas.width;
		const scaledOffset = scale * offsetX;
		
		this.root.view.handleSetOffsetX(scaledOffset);
	}



	handleMouseMove(event: MouseEvent) {

	}

	renderBackground() {
		const ctx = this.root.ctx;
		const canvas = this.root.canvas;
		ctx.fillStyle = '#eee';
		ctx.fillRect(0, this.top, canvas.width, canvas.height);
	}

	renderLine() {
		const ctx = this.root.ctx;
		const canvas = this.root.canvas;
		ctx.fillStyle = 'red';
		const { x, width } = this.getLineXAndWidth();
		ctx.fillRect(x, this.top, width, canvas.height);
	}

	getLineXAndWidth() {
		const canvas = this.root.canvas;
		const fullWidth= this.root.grid.service.getFullAvailableWidth();
		const x = (this.root.view.offsetX / fullWidth) * canvas.width;
		const width = (canvas.width / fullWidth) * canvas.width;
		
		return { x, width };
	}

	render() {
		this.renderBackground();
		this.renderLine()
	}
}