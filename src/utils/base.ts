export function debounce<T>(f: (arg: T) => void, ms: number) {
	let isCooldown = false;
	return function () {
		if (isCooldown) return;
		// @ts-ignore
		f.apply(this, arguments);
		isCooldown = true;
		setTimeout(() => (isCooldown = false), ms);
	};
}
