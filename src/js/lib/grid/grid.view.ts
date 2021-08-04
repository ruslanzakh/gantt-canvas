import { RootModule } from '../root/root.module';
import { GridModule } from './grid.module';
import { ColumnEntity } from './entities/column.entity';

export class GridView {
	root: RootModule;
	module: GridModule;
	columnEntity: ColumnEntity;

	constructor(root: RootModule, module: GridModule) {
		this.root = root;
		this.module = module;
		this.columnEntity = new ColumnEntity(root);
	}

	get colWidth() {
		return 40 * this.root.view.scaleX;
	}

	get data() {
		const offsetX = this.root.view.offsetX;
		const width = this.root.canvas.width;
		const length = this.module.store.data.length;
		const data = [];
		for(let i = 0; i < length; i++) {
			const el = this.module.store.data[i];
			const x = (i * this.colWidth) - offsetX;
			if(x > width) break;
			if(x < -this.colWidth) continue;
			data.push({
				x,
				ts: el.ts,
				title: el.title,
			});
		}
		return data;
	}

	render() {
		this.data.forEach((x) => {
			this.columnEntity.renderItem(x);
		});
	}

}