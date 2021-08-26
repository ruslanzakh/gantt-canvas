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
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else if(typeof radius === 'object' && Array.isArray(radius)) {
		radius = {tl: radius[0], tr: radius[1], br: radius[2], bl: radius[3]};
	}

	if(fill) ctx.fillStyle = fill;
	if(stroke) ctx.strokeStyle = stroke;
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
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
}


export const getEventTouchOffsets = (event: TouchEvent, canvas: HTMLCanvasElement) => {
	const rect = canvas.getBoundingClientRect();
	const x = event.changedTouches[0]?.clientX ?? 0;
	const y = event.changedTouches[0]?.clientY ?? 0;

	const x_rel = x - rect.left;
	const y_rel = y - rect.top;
	const offsetX = Math.round((x_rel * canvas.width) / rect.width);
	const offsetY = Math.round((y_rel * canvas.height) / rect.height);
	return { offsetX, offsetY };
}


export const renderUnderline = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number) => {
	let metrics = measureText(ctx, text);
	console.log(metrics);
	
	let fontSize = Math.floor(metrics.actualHeight * 1.4); // 140% the height 
	switch (ctx.textAlign) {
		case "center" : x -= (metrics.width / 2) ; break
		case "right"  : x -= metrics.width       ; break
	}
	switch (ctx.textBaseline) {
		case "top"    : y += (fontSize)     ; break
		case "middle" : y += (fontSize / 2) ; break
	}
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = ctx.fillStyle;
	ctx.lineWidth = Math.ceil(fontSize * 0.08);
	ctx.moveTo(x, y);
	ctx.lineTo(x + metrics.width, y);
	ctx.stroke();
	ctx.restore();
}


export const measureText = (ctx: CanvasRenderingContext2D, text: string) => {
	let metrics = ctx.measureText(text)
	return {
		width: Math.floor(metrics.width),
		// @ts-ignore
		height: Math.floor(metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent),
		actualHeight: Math.floor(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent)
	}
}