interface AnimateOptions {
	duration: number;
	timing(timeFraction: number): number;
	draw(progress: number): void;
}

export function animate(options: AnimateOptions) {
	const start = performance.now();

	requestAnimationFrame(function animate(time: number) {
		// timeFraction от 0 до 1
		let timeFraction = (time - start) / options.duration;
		if (timeFraction > 1) timeFraction = 1;

		// текущее состояние анимации
		const progress = options.timing(timeFraction);

		options.draw(progress);

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}
	});
}

export const timing = makeEaseOut(circle);

function makeEaseOut(timing: (fraction: number) => number) {
	return function (timeFraction: number) {
		return 1 - timing(1 - timeFraction);
	};
}

function circle(timeFraction: number) {
	return 1 - Math.sin(Math.acos(timeFraction));
}
