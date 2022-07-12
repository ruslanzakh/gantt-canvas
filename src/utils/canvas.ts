export interface RoundRectRadius {
	tl: number;
	tr: number;
	br: number;
	bl: number;
}
export const roundRect = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number | number[] | RoundRectRadius,
	fill?: string,
	stroke?: string
) => {
	if (typeof radius === 'number') {
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
	} else if (typeof radius === 'object' && Array.isArray(radius)) {
		radius = { tl: radius[0], tr: radius[1], br: radius[2], bl: radius[3] };
	}

	if (fill) ctx.fillStyle = fill;
	if (stroke) ctx.strokeStyle = stroke;
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(
		x + width,
		y + height,
		x + width - radius.br,
		y + height
	);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
	// hack because without this hack sometimes doesn't fill rect
	// don't understand why - magic
	ctx.beginPath();
	ctx.closePath();
};

export const getEventTouchOffsets = (
	event: TouchEvent,
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext
) => {
	const rect = canvas.getBoundingClientRect();
	const x = event.changedTouches[0]?.clientX ?? 0;
	const y = event.changedTouches[0]?.clientY ?? 0;

	const x_rel = x - rect.left;
	const y_rel = y - rect.top;
	const ratio = getPixelRatio(ctx);
	const offsetX = Math.round((x_rel * canvas.width) / ratio / rect.width);
	const offsetY = Math.round((y_rel * canvas.height) / ratio / rect.height);
	return { offsetX, offsetY };
};

export const renderUnderline = (
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number
) => {
	const metrics = measureText(ctx, text);

	const fontSize = Math.floor(metrics.actualHeight * 1.4); // 140% the height
	switch (ctx.textAlign) {
		case 'center':
			x -= metrics.width / 2;
			break;
		case 'right':
			x -= metrics.width;
			break;
	}
	switch (ctx.textBaseline) {
		case 'top':
			y += fontSize;
			break;
		case 'middle':
			y += fontSize / 2;
			break;
	}
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = ctx.fillStyle;
	ctx.lineWidth = Math.ceil(fontSize * 0.04);
	ctx.moveTo(x, y);
	ctx.lineTo(x + metrics.width, y);
	ctx.stroke();
	ctx.restore();
};

export const measureText = (ctx: CanvasRenderingContext2D, text: string) => {
	const metrics = ctx.measureText(text);
	return {
		width: Math.floor(metrics.width),
		height: Math.floor(
			// @ts-ignore
			metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
		),
		actualHeight: Math.floor(
			metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
		),
	};
};

interface CanvasRenderingContext extends CanvasRenderingContext2D {
	webkitBackingStorePixelRatio?: number;
	mozBackingStorePixelRatio?: number;
	msBackingStorePixelRatio?: number;
	oBackingStorePixelRatio?: number;
	backingStorePixelRatio?: number;
}

export function getPixelRatio(context: CanvasRenderingContext) {
	// assume the device pixel ratio is 1 if the browser doesn't specify it
	const devicePixelRatio = window.devicePixelRatio || 1;

	// determine the 'backing store ratio' of the canvas context
	const backingStoreRatio =
		context.webkitBackingStorePixelRatio ||
		context.mozBackingStorePixelRatio ||
		context.msBackingStorePixelRatio ||
		context.oBackingStorePixelRatio ||
		context.backingStorePixelRatio ||
		1;

	// determine the actual ratio we want to draw at
	const ratio = devicePixelRatio / backingStoreRatio;
	return ratio;
}

export function scaleCanvas(
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext,
	width: number,
	height: number
) {
	const ratio = getPixelRatio(context);
	if (ratio !== 1) {
		// set the 'real' canvas size to the higher width/height
		canvas.width = width * ratio;
		canvas.height = height * ratio;

		// ...then scale it back down with CSS
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
	} else {
		// this is a normal 1:1 device; just scale it simply
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = '';
		canvas.style.height = '';
	}

	// scale the drawing context so everything will work at the higher ratio
	context.scale(ratio, ratio);
}
