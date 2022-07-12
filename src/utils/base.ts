export function debounce<T>(f: (arg: T) => void, ms: number) {
	let isCooldown = false;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function (...args: any[]) {
		if (isCooldown) return;
		// @ts-ignore
		f.apply(this, args);
		isCooldown = true;
		setTimeout(() => (isCooldown = false), ms);
	};
}
