import { RootModule } from '../root/root.module';
import { TasksModule } from './tasks.module';

export class TasksController {
	root: RootModule;
	module: TasksModule;

	constructor(root: RootModule, module: TasksModule) {
		this.root = root;
		this.module = module;
	}


}