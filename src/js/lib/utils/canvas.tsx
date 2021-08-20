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