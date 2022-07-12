export function debounce<T>(f: (arg: T) => void, ms: number) {
	let isCooldown = false;
	return function (...args: any[]) {
		if (isCooldown) return;
		// @ts-ignore
		f.apply(this, args);
		isCooldown = true;
		setTimeout(() => (isCooldown = false), ms);
	};
}
