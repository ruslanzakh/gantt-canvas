# Gantt-Canvas
## Fast, well-customized, and high-performance plugin for building Gantt diagrams.

## Features
- Support moving and resizing tasks
- Build connections between tasks easy
- High performance - render above 10000 tasks
- Customizable behavior
- Without any dependencies
- Full typescript support

## Installation

```js
npm i gantt-canvas
```

## Usage

```js
const tasks = [
	{
		id: 'task1',
		title: 'Install plugin',
		start_date_ts: 1627670084597,
		end_date_ts: 1627680084597,
		all_day: true,
		next_ids: ['task2'],
	},
	{
		id: 'task2',
		title: 'Have a fun',
		start_date_ts: 1627904121049,
		end_date_ts: 1628163321049,
		next_ids: ['task3', 'task4'],
	},
	...
];

const gantt = new Gantt('#gantt-root', {
	tasks,
	handleChange: (tasks) => console.log(tasks),
	handleTaskClick: (task) => console.log(task),
	lang: 'en',
});
```

## Available  methods
```js
const gantt = new Gantt('#gantt-root', { tasks });

gantt.updateTasks(tasks);
gantt.scrollToToday();
gantt.scrollToTask(id); // string
gantt.updateViewMode(mode); // 'quarter-day', 'half-day', 'day', 'week' or 'month
gantt.updateIsLoading(mode); // boolean
gantt.destroy();
```

## Full options list
Gantt-canvas was made to be different. It has a lot of options to look as you want and to behave as you need. So below you will see the long list of different options. You don't have to use it all, but you can do it.

#### Required
Plugin has only one required option - array of tasks.
```js
    interface RootApiProps {
        tasks: ITasks[];
        ...
    };
    
    interface ITask {
        id: string;
    	title: string;
    	start_date_ts: number;
    	all_day?: boolean;
    	end_date_ts: number;
    	next_ids: string[];
    	background?: string;
    	backgroundHover?: string;
    	color?: string;
    	colorHover?: string;
    	stroke?: string;
    	strokeHover?: string;
    	underline?: boolean;
    	outlineColor?: string;
    }
```

#### Behavior
```js
    interface RootApiProps {
        ...
        moveDependedOnResizeRight?: boolean;  // default true
    	moveDependedOnResizeLeft?: boolean;  // false
    	moveDependedOnMove?: boolean;  // true
    	showTime?: boolean; // false 
    	startFromToday?: boolean; // true
    	renderAllTasksFromStart?: boolean; // true
    };
```
If ``(showTime === false || task.all_day === true)`` Task fills a space of a whole day. And users can change only the date - without changing the time. On the other hand, Task begins from a position equal to its date and time. And users can change time.

#### Common Grid
```js
    interface RootApiProps {
        ...
        viewMode?: ViewMode; // 'quarter-day', 'half-day', 'day' | 'week' | 'month'. Default day
    	isLoading?: boolean; // false
    	monthNames?: ObjectList<string[]>; // for ru and en
    	lang?: string; // ru
    };
```
#### Month view
```js
    interface RootApiProps {
        ...
        showMonthMiddle?: boolean; // default false
    	monthHeight?: number;
    	renderMonthBottomLine?: boolean; // true
    	renderMonthLeftLine?: boolean; // true
    	monthLineColor?: string;
    	monthTitleFont?: string;
    	monthTitleColor?: string;
    	monthTitleShowYear?: boolean; // true
    };
```
#### Col and Row views
```js
    interface RootApiProps {
        ...
        dayHeight?: number;
    	renderDayStartMonthLine?: boolean;
    	dayStartMonthLine?: string;
    	dayBottomLineColor?: string;
    	dayColor?: string;
    	dayFont?: string;
    	dayTodayBackground?: string;
    	dayColWidth?: number;
    	monthViewColWidth?: number;
    	rowHeight?: number;
    	colLineColor?: string;
    	colStartMonthLineColor?: string;
    	rowLineColor?: string;
    	rowEvenBackground?: string;
    	rowOddBackground?: string;
    };
```
#### Task view
```js
    interface RootApiProps {
        ...
        taskDefaultBackground?: string;
    	taskDefaultHoverBackground?: string;
    	taskDefaultStrokeColor?: string;
    	taskDefaultHoverStrokeColor?: string;
    	taskDefaultColor?: string;
    	taskDefaultHoverColor?: string;
    	taskDefaultOutlineColor?: string;
    	taskHeight?: number;
    	taskFont?: string;
    	taskPadding?: number;
    	taskRadius?: number;
    	taskErrorStrokeColor?: string;
    	minTaskWidth?: number;
    
    	taskRenderResizeControls?: boolean;
    	taskRenderResizeControlsWidth?: number;
    	taskRenderResizeControlsColor?: string;
    	taskRenderResizeControlsRadius?: number;
    
    	taskRenderDepControl?: boolean;
    	taskRenderDepRadius?: number;
    	taskRenderDepLineColor?: string;
    	taskRenderDepBackground?: string;
    	taskRenderDepOffsetX?: number;
    
    	arrowColor?: string;
    	arrowActiveColor?: string;
    	arrowRadius?: number;
    };
```
#### Scrollbar views
```js
    interface RootApiProps {
        ...
        scrollbarXHeight?: number;
    	scrollbarXBackground?: string;
    	scrollbarXLineBackground?: string;
    	scrollbarXLineRadius?: number;
    
    	scrollbarYWidth?: number;
    	scrollbarYBackground?: string;
    	scrollbarYLineBackground?: string;
    	scrollbarYLineRadius?: number;
    };
```
If you want to contribute:

1. Clone this repo.
2. `cd` into project directory
3. `npm i`
4. `npm run dev`

License: MIT

------------------