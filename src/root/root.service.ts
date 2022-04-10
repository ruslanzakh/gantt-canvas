import { RootModule } from './root.module';

export class RootService {

    root: RootModule;
    convertColorDiv: HTMLDivElement | null = null;

    constructor(root: RootModule) {
        this.root = root;
    }

    convertColor(color: string) {
		if(!color.includes('var')) return color;
		if(!this.convertColorDiv) {
			this.convertColorDiv = document.createElement('div');
			this.root.root.appendChild(this.convertColorDiv);
		}
		
		this.convertColorDiv.style.color = color;
		const newColor = window
			.getComputedStyle(this.convertColorDiv, null)
			.getPropertyValue("color");
		return newColor;
	}
    
    unmountConvertColorDiv() {
        if(!this.convertColorDiv) return;
        this.root.root.removeChild(this.convertColorDiv);
        this.convertColorDiv = null;
    }
}