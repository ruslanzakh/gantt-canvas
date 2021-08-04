

export function debounce(f: Function, ms: number) {
	let isCooldown = false;
	return function() {
	  if (isCooldown) return;
	  f.apply(this, arguments);
	  isCooldown = true;
	  setTimeout(() => isCooldown = false, ms);
	};
}