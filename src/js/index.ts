import Gantt from './lib';

const tasks = [
	{
		id: 'task1',
		title: 'Task 1',
		start_date_ts: 1627670084597,
		end_date_ts: 1627680084597,
		next_ids: []
	}
]
new Gantt('#app', {tasks})