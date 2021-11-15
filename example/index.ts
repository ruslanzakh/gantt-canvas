import Gantt from '../src';

const tasks = [
	{
		id: 'task1',
		title: 'Very Very long Task 1',
		start_date_ts: 1632670084597,
		end_date_ts: 1632680084597,
		all_day: true,
		next_ids: ['task2', 'task3'],
		background: 'orange',
		backgroundHover: 'blue',
		color: 'black',
		colorHover: 'green',
		noEditable: true,
	},
	{
		id: 'task2',
		title: 'Task 2',
		start_date_ts: 1632904121049,
		end_date_ts: 1633163321049,
		next_ids: ['task3'],
		background: 'pink',
		noEditable: true,
	},
	{
		id: 'task3',
		title: 'Task 3',
		start_date_ts: 1633004121049,
		end_date_ts: 1633763321049,
		next_ids: [],
		background: 'red',
		color: 'green',
		noEditable: true,
	},
	{
		id: 'task4',
		title: 'Task 4',
		all_day: true,
		start_date_ts: 1632670084597,
		end_date_ts: 1633163321049,
		next_ids: []
	},
	{
		id: 'task5',
		title: 'Task 5',
		start_date_ts: 1633163321049,
		end_date_ts: 1633163321049,
		all_day: true,
		next_ids: ['task4']
	},
	{
		id: 'task6',
		title: 'Task 6',
		start_date_ts: 1633163321049,
		end_date_ts: 1633163321049,
		next_ids: [],
		stroke: 'orange',
		strokeHover: 'blue',
		underline: true,
		outlineColor: 'red',
	},
	{
		id: 'task7',
		title: 'Task 7',
		start_date_ts: 1635228023007,
		end_date_ts: 1635231623007,
		next_ids: [],
		// stroke: 'orange',
		// strokeHover: 'blue',
		// underline: true,
		// outlineColor: 'red',
	},
]

// 1577912400000
// 1609448400000
// 1640984400000
// 1704056400000
// 1735592400000
const getStartDateTs = (min = 1609448400000, max = 1640984400000) => {
	const diff = max - min;
	const random = Math.floor(Math.random() * diff);
	return min + random;
}
const getNextIds = (tasks, end_date_ts: number) => {
	let count = Math.floor(Math.random() * 3);
	const data = [];
	if(count === 0) return data;
	const filteredTasks = tasks.filter(task => task.end_date_ts >= end_date_ts);
	if(filteredTasks.length === 0) return data;
	do {
		const randomIndex =  Math.floor(Math.random() * (filteredTasks.length - 1));
		data.push(filteredTasks[randomIndex].id);
		count--;
	} while(count > 0);
	return data;
}

function getTasks() {
	const tasks = [];
	for(let i = 0; i <= 100; i++ ){
		const start_date_ts = getStartDateTs();
		const end_date_ts = start_date_ts + (Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000)

		const task = {
			id: `task_${i}`,
			title: `Task ${i}`,
			start_date_ts,
			end_date_ts,
			all_day: Math.random() >= 0.5,
			next_ids: getNextIds(tasks, end_date_ts)
		}
		tasks.push(task)
	}
	return tasks;
}
const gantt = new Gantt('#app', {
	tasks: tasks,
	// tasks: getTasks().sort((a, b) => a.start_date_ts - b.start_date_ts),
	// tasks: getTasks(),
	handleChange: async (tasks) => {
		console.log(tasks);
	},
	handleTaskClick: async (task) => {
		console.log('handleTaskClick', task);
	},
	viewMode: 'hour',
	// showTime: true,
	// renderAllTasksFromStart: false,
	dayWeekendBackground: '#fbf5ff',
	// lang: 'es',
	monthTitleFont: '400 20px Roboto',
	monthNames: {
		es: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		],
	}
});

const scrollToday = document.getElementById('scroll-today');
if(scrollToday) {
	scrollToday.addEventListener('click', function() {
		gantt.scrollToToday(true);
	})
}
const scrollTask = document.getElementById('scroll-task');
if(scrollTask) {
	scrollTask.addEventListener('click', function() {
		gantt.scrollToTask('task_100');
	})
}
const viewDay = document.getElementById('view-day');
if(viewDay) {
	viewDay.addEventListener('click', function() {
		gantt.updateViewMode('day');
	})
}
const viewHalfDay = document.getElementById('view-half-day');
if(viewHalfDay) {
	viewHalfDay.addEventListener('click', function() {
		gantt.updateViewMode('half-day');
	})
}
const viewQuarterDay = document.getElementById('view-quarter-day');
if(viewQuarterDay) {
	viewQuarterDay.addEventListener('click', function() {
		gantt.updateViewMode('quarter-day');
	})
}
const ThreeHoursDay = document.getElementById('view-three-hours');
if(ThreeHoursDay) {
	ThreeHoursDay.addEventListener('click', function() {
		gantt.updateViewMode('three-hours');
	})
}
const Hour = document.getElementById('view-hour');
if(Hour) {
	Hour.addEventListener('click', function() {
		gantt.updateViewMode('hour');
	})
}
const viewWeek = document.getElementById('view-week');
if(viewWeek) {
	viewWeek.addEventListener('click', function() {
		gantt.updateViewMode('week');
	})
}
const viewMonth = document.getElementById('view-month');
if(viewMonth) {
	viewMonth.addEventListener('click', function() {
		gantt.updateViewMode('month');
	})
}
let isLoading = false;
const progressToggle = document.getElementById('progress-toggle');
if(progressToggle) {
	progressToggle.addEventListener('click', function() {
		isLoading = !isLoading;
		gantt.updateIsLoading(isLoading);
	})
}

const progressToggleTimeout = document.getElementById('progress-toggle-timeout');
if(progressToggleTimeout) {
	progressToggleTimeout.addEventListener('click', function() {
		setTimeout(() => {
			isLoading = !isLoading;
			gantt.updateIsLoading(isLoading);
		}, 5000);
	})
}