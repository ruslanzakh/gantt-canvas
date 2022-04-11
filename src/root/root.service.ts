import { ObjectList } from '../utils/interfaces';
import { RootModule } from './root.module';

export class RootService {

    root: RootModule;
    convertColorDiv: HTMLDivElement | null = null;
    colorsCache: ObjectList<string> = {};

    constructor(root: RootModule) {
        this.root = root;
    }

    clearColorsCache = () => {
        this.colorsCache = {};
    }

    convertOptionalColor = (color?: string) => {
        if(color) return this.convertColor(color);
        return undefined;
    }

    convertColor = (color: string, defaultColor?: string) => {
		if(!color.includes('var')) return color;
        if(this.colorsCache[color]) return this.colorsCache[color];
		if(!this.convertColorDiv) {
			this.convertColorDiv = document.createElement('div');
			this.root.root.appendChild(this.convertColorDiv);
		}
		
		this.convertColorDiv.style.color = color;
		const newColor = window
			.getComputedStyle(this.convertColorDiv, null)
			.getPropertyValue("color");
        if(!newColor && defaultColor) return defaultColor;
		return newColor;
	}
    
    unmountConvertColorDiv = () => {
        if(!this.convertColorDiv) return;
        this.root.root.removeChild(this.convertColorDiv);
        this.convertColorDiv = null;
    }
}