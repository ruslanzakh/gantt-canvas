// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/grid/entities/column.entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnEntity = void 0;

var ColumnEntity = function () {
  function ColumnEntity(root) {
    this.root = root;
  }

  ColumnEntity.prototype.renderDay = function (_a, _b) {
    var x = _a.x,
        title = _a.title,
        isStartMonth = _a.isStartMonth;
    var monthHeight = _b.monthHeight,
        width = _b.width,
        dayHeight = _b.dayHeight;
    var ctx = this.root.ctx;
    ctx.beginPath();
    ctx.strokeStyle = this.root.api.dayBottomLineColor;
    ctx.moveTo(x, monthHeight + dayHeight);
    ctx.lineTo(x + width, monthHeight + dayHeight);
    ctx.stroke();

    if (isStartMonth && this.root.api.renderDayStartMonthLine) {
      ctx.beginPath();
      ctx.strokeStyle = this.root.api.dayStartMonthLine;
      ctx.moveTo(x, monthHeight);
      ctx.lineTo(x, monthHeight + dayHeight);
      ctx.stroke();
    }

    ctx.font = this.root.api.dayFont;
    ctx.fillStyle = this.root.api.dayColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, x + width / 2, monthHeight + dayHeight / 2);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  };

  ColumnEntity.prototype.renderCol = function (_a, _b) {
    var x = _a.x,
        today = _a.today;
    var monthHeight = _b.monthHeight;
    var ctx = this.root.ctx;
    ctx.beginPath();
    ctx.strokeStyle = this.root.api.colLineColor;
    ctx.moveTo(x, monthHeight);
    ctx.lineTo(x, this.root.canvas.height);
    ctx.stroke();

    if (today) {
      ctx.fillStyle = this.root.api.dayTodayBackground;
      ctx.fillRect(x, monthHeight, this.root.grid.view.colWidth, this.root.canvas.height);
      ctx.fill();
    }
  };

  return ColumnEntity;
}();

exports.ColumnEntity = ColumnEntity;
},{}],"../src/utils/string.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = void 0;

var capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.capitalize = capitalize;
},{}],"../src/grid/entities/month.entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthEntity = void 0;

var string_1 = require("../../utils/string");

var MonthEntity = function () {
  function MonthEntity(root) {
    this.root = root;
  }

  MonthEntity.prototype.renderItem = function (_a, height) {
    var x = _a.x,
        xx = _a.xx,
        title = _a.title,
        middle = _a.middle;
    var ctx = this.root.ctx;
    ctx.beginPath();
    ctx.strokeStyle = this.root.api.monthLineColor;

    if (this.root.api.renderMonthLeftLine) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    if (this.root.api.renderMonthBottomLine) {
      ctx.moveTo(x, height);
      ctx.lineTo(xx, height);
    }

    ctx.stroke();

    if (this.root.api.showMonthMiddle) {
      var width = xx - x;
      if (width < 200) return;
      middle = (xx + x) / 2;
    }

    if (middle) {
      ctx.font = this.root.api.monthTitleFont;
      ctx.fillStyle = this.root.api.monthTitleColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(string_1.capitalize(title), middle, height / 2);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    }
  };

  return MonthEntity;
}();

exports.MonthEntity = MonthEntity;
},{"../../utils/string":"../src/utils/string.ts"}],"../src/grid/entities/row.entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowEntity = void 0;

var RowEntity = function () {
  function RowEntity(root) {
    this.root = root;
  }

  RowEntity.prototype.renderItem = function (_a, rowHeight) {
    var y = _a.y,
        odd = _a.odd;
    var ctx = this.root.ctx;
    ctx.beginPath();
    ctx.rect(0, y, this.root.canvas.width, rowHeight);
    ctx.fillStyle = odd ? this.root.api.rowOddBackground : this.root.api.rowEvenBackground;
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = this.root.api.rowLineColor;
    ctx.moveTo(0, y + rowHeight);
    ctx.lineTo(this.root.canvas.width, y + rowHeight);
    ctx.stroke();
  };

  return RowEntity;
}();

exports.RowEntity = RowEntity;
},{}],"../src/grid/grid.view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridView = void 0;

var column_entity_1 = require("./entities/column.entity");

var month_entity_1 = require("./entities/month.entity");

var row_entity_1 = require("./entities/row.entity");

var MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

var GridView = function () {
  function GridView(root, module) {
    this.columns = [];
    this.rows = [];
    this.months = [];
    this.firstTsOnScreen = 0;
    this.root = root;
    this.module = module;
    this.columnEntity = new column_entity_1.ColumnEntity(root);
    this.monthEntity = new month_entity_1.MonthEntity(root);
    this.rowEntity = new row_entity_1.RowEntity(root);
  }

  Object.defineProperty(GridView.prototype, "colWidth", {
    get: function get() {
      return this.root.api.dayColWidth * this.root.view.scaleX;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "colsOnScreen", {
    get: function get() {
      return this.root.canvas.width / this.colWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "colTs", {
    get: function get() {
      return 24 * 60 * 60 * 1000;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "tsHasOneX", {
    get: function get() {
      return this.colTs / this.colWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "rowHeight", {
    get: function get() {
      return this.root.api.rowHeight * this.root.view.scaleY;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "monthHeight", {
    get: function get() {
      return this.root.api.monthHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "dayHeight", {
    get: function get() {
      return this.root.api.dayHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "headerHeight", {
    get: function get() {
      return this.monthHeight + this.dayHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GridView.prototype, "rowsOffsetY", {
    get: function get() {
      return this.monthHeight + this.dayHeight;
    },
    enumerable: false,
    configurable: true
  });

  GridView.prototype.fillColumns = function () {
    var offsetX = this.root.view.offsetX;
    var width = this.root.canvas.width;
    var length = this.module.store.dates.length;
    var data = [];

    for (var i = 0; i < length; i++) {
      var el = this.module.store.dates[i];
      var x = i * this.colWidth - offsetX;
      if (x < -this.colWidth) continue;
      if (x > width) break;
      data.push({
        ts: el.ts,
        x: x,
        title: el.title,
        month: el.month,
        year: el.year,
        isStartMonth: el.isStartMonth,
        isMiddleMonth: el.isMiddleMonth,
        today: el.today
      });
    }

    this.columns = data;
  };

  GridView.prototype.fillMonths = function () {
    var _this = this;

    var data = this.columns.reduce(function (prev, _a) {
      var month = _a.month,
          x = _a.x,
          year = _a.year,
          isMiddleMonth = _a.isMiddleMonth;
      var xx = x + _this.colWidth;
      var label = month + '.' + year;

      if (!prev[label]) {
        prev[label] = {
          title: _this.getMonthTitle(month, year),
          x: x,
          xx: xx
        };
        return prev;
      }

      if (prev[label].x > x) prev[label].x = x;
      if (prev[label].xx < xx) prev[label].xx = xx;
      if (isMiddleMonth) prev[label].middle = x + _this.colWidth / 2;
      return prev;
    }, {});
    this.months = Object.values(data);
  };

  GridView.prototype.getMonthTitle = function (month, year) {
    if (this.root.api.monthTitleShowYear) {
      return MONTHS[month] + ' ' + year;
    }

    return MONTHS[month];
  };

  GridView.prototype.fillRows = function () {
    var odd = true;
    var height = this.root.canvas.height;
    var data = [];
    var length = this.root.api.tasks.length;
    var headerOffset = this.rowsOffsetY + this.rowHeight;
    var offsetY = headerOffset - this.root.view.offsetY - this.rowHeight;
    var minY = this.rowsOffsetY - this.rowHeight;
    var i = Math.floor((-offsetY + minY) / this.rowHeight);
    var y = 0;

    do {
      y = i * this.rowHeight + offsetY;
      i++;
      odd = i % 2 === 1;
      if (y > height) break;
      if (y < minY) continue;
      data.push({
        y: y,
        odd: odd
      });
    } while (y <= height);

    this.rows = data;
  };

  GridView.prototype.updateStore = function () {
    this.fillColumns();
    this.fillRows();
    this.fillMonths();
    this.firstTsOnScreen = this.module.service.getTsByX(0);
  };

  GridView.prototype.renderGrid = function () {
    var _this = this;

    this.updateStore();
    this.rows.forEach(function (x) {
      return _this.rowEntity.renderItem(x, _this.rowHeight);
    });
    var colCommon = this.getColumnCommonData();
    this.columns.forEach(function (x) {
      return _this.columnEntity.renderCol(x, colCommon);
    });
  };

  GridView.prototype.renderHeader = function () {
    var _this = this;

    var width = this.root.canvas.width;
    this.root.ctx.fillStyle = '#ffffff';
    this.root.ctx.rect(0, 0, width, this.rowsOffsetY);
    this.root.ctx.fill();
    var colCommon = this.getColumnCommonData();
    this.columns.forEach(function (x) {
      return _this.columnEntity.renderDay(x, colCommon);
    });
    this.months.forEach(function (x) {
      return _this.monthEntity.renderItem(x, _this.monthHeight);
    });
  };

  GridView.prototype.getColumnCommonData = function () {
    return {
      monthHeight: this.monthHeight,
      width: this.colWidth,
      dayHeight: this.dayHeight
    };
  };

  return GridView;
}();

exports.GridView = GridView;
},{"./entities/column.entity":"../src/grid/entities/column.entity.ts","./entities/month.entity":"../src/grid/entities/month.entity.ts","./entities/row.entity":"../src/grid/entities/row.entity.ts"}],"../src/utils/date.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDaysInMonth = exports.getDateWithSet = exports.setDate = exports.getDate = void 0;

var getDate = function getDate(ts, end) {
  if (end === void 0) {
    end = false;
  }

  var date = ts ? new Date(ts) : new Date();
  if (end) date.setHours(23, 59, 59);else date.setHours(0, 0, 0, 0);
  return date;
};

exports.getDate = getDate;

var setDate = function setDate(date, diff) {
  date.setDate(date.getDate() + diff);
};

exports.setDate = setDate;

var getDateWithSet = function getDateWithSet(ts, diff) {
  if (diff === void 0) {
    diff = 0;
  }

  var date = exports.getDate(ts);
  if (diff !== 0) exports.setDate(date, diff);
  return date;
};

exports.getDateWithSet = getDateWithSet;

var getDaysInMonth = function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
};

exports.getDaysInMonth = getDaysInMonth;
},{}],"../src/grid/grid.store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridStore = void 0;

var date_1 = require("../utils/date");

var GridStore = function () {
  function GridStore(root, module) {
    this.dates = [];
    this.root = root;
    this.module = module;
  }

  GridStore.prototype.initialData = function () {
    if (this.root.api.renderAllTasksFromStart) {
      var _a = this.root.tasks.service.getFirstAndLastDeadline(),
          start_date_ts = _a[0],
          end_date_ts = _a[1];

      var date = date_1.getDate(start_date_ts);

      do {
        date_1.setDate(date, 1);
        this.add(date);
      } while (date.getTime() <= end_date_ts);
    }

    this.addDatesBefore(this.root.view.offsetX);
    this.addDatesAfter(this.root.view.offsetX);
  };

  GridStore.prototype.fillDataBefore = function (ts) {
    var date = date_1.getDate(this.dates[0].ts);

    if (date.getTime() > ts) {
      do {
        date_1.setDate(date, -1);
        this.add(date, true);
      } while (date.getTime() > ts);
    }
  };

  GridStore.prototype.add = function (date, unshift) {
    if (unshift === void 0) {
      unshift = false;
    }

    var day = date.getDate();
    var middleDayInMonth = Math.floor(date_1.getDaysInMonth(date.getMonth() + 1, date.getFullYear()) / 2);
    var todayTs = date_1.getDate().getTime();
    var today = todayTs === date_1.getDate(date.getTime()).getTime();
    var elem = {
      ts: date.getTime(),
      title: date.getDate().toString(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isStartMonth: day === 1,
      isMiddleMonth: day === middleDayInMonth,
      today: today
    };
    if (unshift) this.dates.unshift(elem);else this.dates.push(elem);
  };

  GridStore.prototype.addDatesBefore = function (offsetX) {
    var _a;

    if (offsetX > this.root.canvas.width) return;
    var data = this.dates;
    var _b = this.module.view,
        colsOnScreen = _b.colsOnScreen,
        colWidth = _b.colWidth;
    var length = -offsetX / colWidth;
    var date = date_1.getDate((_a = data[0]) === null || _a === void 0 ? void 0 : _a.ts);
    date_1.setDate(date, -1);
    this.add(date, true);

    for (var i = 0; i < length + colsOnScreen; i++) {
      offsetX += colWidth;
      date_1.setDate(date, -1);
      this.add(date, true);
    }

    this.root.view.offsetX = offsetX;
  };

  GridStore.prototype.addDatesAfter = function (offsetX) {
    var data = this.dates;
    var fullDataWidth = this.module.service.getFullAvailableWidth();
    var _a = this.module.view,
        colsOnScreen = _a.colsOnScreen,
        colWidth = _a.colWidth;
    var width = fullDataWidth - this.root.canvas.width - colWidth;
    if (offsetX < width) return;
    var length = (offsetX - width) / colWidth;
    var date = date_1.getDate(data[data.length - 1].ts);

    for (var i = 0; i < length + colsOnScreen; i++) {
      date_1.setDate(date, 1);
      this.add(date);
    }
  };

  return GridStore;
}();

exports.GridStore = GridStore;
},{"../utils/date":"../src/utils/date.ts"}],"../src/grid/grid.service.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridService = void 0;

var date_1 = require("../utils/date");

var GridService = function () {
  function GridService(root, module) {
    this.root = root;
    this.module = module;
  }

  GridService.prototype.showCurrentDay = function () {
    var columnLength = this.module.view.colsOnScreen / 3;
    var date = date_1.getDate();
    date_1.setDate(date, -columnLength);
    var dateTs = date.getTime();
    var index = this.module.store.dates.map(function (_a) {
      var ts = _a.ts;
      return ts;
    }).indexOf(dateTs);
    var offsetX = index * this.module.view.colWidth;

    if (offsetX < 0) {
      var diff = dateTs - this.module.store.dates[0].ts;

      if (diff > 0) {
        offsetX = diff / this.module.view.tsHasOneX;
      } else {
        this.module.store.fillDataBefore(dateTs);
        offsetX = 0;
      }
    }

    this.root.view.handleSetOffsetX(offsetX, false);
  };

  GridService.prototype.getPosXByTs = function (ts) {
    var firstTs = this.module.view.firstTsOnScreen;
    var diff = ts - firstTs;
    return diff / this.module.view.tsHasOneX;
  };

  GridService.prototype.getPosXByFullDayTs = function (ts, end) {
    if (end === void 0) {
      end = false;
    }

    var date = date_1.getDate(ts, end);
    return this.getPosXByTs(date.getTime());
  };

  GridService.prototype.getTsByX = function (x) {
    var colWidth = this.module.view.colWidth;
    var col = this.module.view.columns.find(function (el) {
      return el.x <= x && el.x + colWidth > x;
    });
    if (!col) return 0;
    var ts = col.ts + (x - col.x) * this.module.view.tsHasOneX;
    return ts;
  };

  GridService.prototype.getTsByOffsetDiff = function (x) {
    var columns = this.module.view.columns;
    if (!columns.length) return 0;
    var colHasTs = columns[1].ts - columns[0].ts;
    var colWidth = this.module.view.colWidth;
    var relativeOffset = x / colWidth;
    return colHasTs * relativeOffset;
  };

  GridService.prototype.getFullAvailableWidth = function () {
    var canvas = this.root.canvas;
    var colWidth = this.module.view.colWidth;
    var fullWidth = colWidth * this.module.store.dates.length;
    if (fullWidth < canvas.width) fullWidth = canvas.width;
    return fullWidth;
  };

  GridService.prototype.getViewHeight = function () {
    return this.root.canvas.height - this.root.grid.view.headerHeight - this.root.view.scrollbarY.bottomOffset;
  };

  GridService.prototype.getFullAvailableHeight = function () {
    var fullHeight = this.module.view.rowHeight * this.root.api.tasks.length;
    var viewHeight = this.getViewHeight();
    if (fullHeight < viewHeight) fullHeight = viewHeight;
    return fullHeight;
  };

  GridService.prototype.getLeftAvailableHeight = function () {
    return this.root.grid.service.getFullAvailableHeight() - this.getViewHeight();
  };

  GridService.prototype.validateOffsetX = function () {
    var offsetX = this.root.view.offsetX;

    if (offsetX < this.root.canvas.width) {
      this.module.store.addDatesBefore(offsetX);
    } else if (offsetX > this.getFullAvailableWidth() - this.root.canvas.width) {
      this.module.store.addDatesAfter(offsetX);
    }
  };

  return GridService;
}();

exports.GridService = GridService;
},{"../utils/date":"../src/utils/date.ts"}],"../src/grid/grid.module.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridModule = void 0;

var grid_view_1 = require("./grid.view");

var grid_store_1 = require("./grid.store");

var grid_service_1 = require("./grid.service");

var GridModule = function () {
  function GridModule(root) {
    this.root = root;
    this.store = new grid_store_1.GridStore(root, this);
    this.view = new grid_view_1.GridView(root, this);
    this.service = new grid_service_1.GridService(root, this);
  }

  GridModule.prototype.init = function () {
    this.store.initialData();
    if (this.root.api.startFromToday) this.service.showCurrentDay();
  };

  return GridModule;
}();

exports.GridModule = GridModule;
},{"./grid.view":"../src/grid/grid.view.ts","./grid.store":"../src/grid/grid.store.ts","./grid.service":"../src/grid/grid.service.ts"}],"../src/tasks/tasks.store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TasksStore = void 0;

var TasksStore = function () {
  function TasksStore(root) {
    this.modifiedTasks = {};
    this.hoverId = null;
    this.hoverResize = null;
    this.hoverConnectionTask = null;
    this.addDepOffsetX = null;
    this.addDepOffsetY = null;
    this.root = root;
  }

  Object.defineProperty(TasksStore.prototype, "tasks", {
    get: function get() {
      var _this = this;

      return this.root.api.tasks.map(function (task) {
        if (_this.modifiedTasks[task.id]) return _this.modifiedTasks[task.id];
        return task;
      });
    },
    enumerable: false,
    configurable: true
  });

  TasksStore.prototype.clearModTasks = function () {
    this.modifiedTasks = {};
  };

  TasksStore.prototype.saveModTasks = function () {
    this.root.api.updateTasks(this.tasks);
    this.clearModTasks();
  };

  TasksStore.prototype.addModTask = function (task) {
    this.modifiedTasks[task.id] = task;
  };

  TasksStore.prototype.setHoverId = function (id, resize) {
    if (id === this.hoverId && resize === this.hoverResize) return;
    if (id) this.root.view.setCursor(resize ? 'col-resize' : 'pointer');else this.root.view.setCursor('auto');
    this.hoverResize = resize;

    if (id !== this.hoverId) {
      this.hoverId = id;
      this.root.render();
    }
  };

  TasksStore.prototype.setHoverConnectionTask = function (id) {
    this.hoverConnectionTask = id;
  };

  TasksStore.prototype.updateDepOffsets = function (offsetX, offsetY) {
    this.addDepOffsetX = offsetX;
    this.addDepOffsetY = offsetY;
  };

  return TasksStore;
}();

exports.TasksStore = TasksStore;
},{}],"../src/utils/canvas.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventTouchOffsets = exports.roundRect = void 0;

var roundRect = function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof radius === 'number') {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius
    };
  } else if (_typeof(radius) === 'object' && Array.isArray(radius)) {
    radius = {
      tl: radius[0],
      tr: radius[1],
      br: radius[2],
      bl: radius[3]
    };
  }

  if (fill) ctx.fillStyle = fill;
  if (stroke) ctx.strokeStyle = stroke;
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();

  if (fill) {
    ctx.fill();
  }

  if (stroke) {
    ctx.stroke();
  } // hack because without this hack sometimes doesn't fill rect
  // don't understand why - magic


  ctx.beginPath();
  ctx.closePath();
};

exports.roundRect = roundRect;

var getEventTouchOffsets = function getEventTouchOffsets(event, canvas) {
  var _a, _b, _c, _d;

  var rect = canvas.getBoundingClientRect();
  var x = (_b = (_a = event.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.clientX) !== null && _b !== void 0 ? _b : 0;
  var y = (_d = (_c = event.changedTouches[0]) === null || _c === void 0 ? void 0 : _c.clientY) !== null && _d !== void 0 ? _d : 0;
  var x_rel = x - rect.left;
  var y_rel = y - rect.top;
  var offsetX = Math.round(x_rel * canvas.width / rect.width);
  var offsetY = Math.round(y_rel * canvas.height / rect.height);
  return {
    offsetX: offsetX,
    offsetY: offsetY
  };
};

exports.getEventTouchOffsets = getEventTouchOffsets;
},{}],"../src/tasks/entities/task.entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskEntity = void 0;

var canvas_1 = require("../../utils/canvas");

var TaskEntity = function () {
  function TaskEntity(root) {
    this.root = root;
  }

  TaskEntity.prototype.isHover = function (event, task) {
    var x = task.x,
        y = task.y,
        w = task.w;
    var h = this.root.grid.view.rowHeight;
    var offsetX = event.offsetX,
        offsetY = event.offsetY;
    var resize = null;
    var depFrom = null;
    var xx = this.getTaskXX(x, w);
    var yy = y + h;
    var hover = x < offsetX && offsetX < xx && y < offsetY && offsetY < yy;
    if (!hover) return {
      hover: hover,
      resize: resize,
      depFrom: depFrom
    };
    if (this.root.api.taskRenderDepControl && xx - this.root.api.taskRenderDepRadius - this.getDepOffsetX() < offsetX) depFrom = true;else resize = this.isControlsHover(event, task);
    return {
      hover: hover,
      resize: resize,
      depFrom: depFrom
    };
  };

  TaskEntity.prototype.renderItem = function (task) {
    var x = task.x,
        y = task.y,
        w = task.w,
        hover = task.hover;
    if (x >= this.root.canvas.width || w === 0) return;
    var ctx = this.root.ctx;
    ctx.beginPath();
    var top = this.getTaskTop(y);
    var fillStyle = this.getTaskFillStyle(task);
    canvas_1.roundRect(ctx, x, top, w, this.root.api.taskHeight, this.root.api.taskRadius, fillStyle);
    this.renderTaskText(task, top);

    if (hover) {
      this.renderResizeControls(task, top);
      this.renderRightDep(x + w, top + this.root.api.taskHeight / 2);
    }
  };

  TaskEntity.prototype.renderRightDep = function (x, y) {
    if (!this.root.api.taskRenderDepControl) return;
    var ctx = this.root.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.root.api.taskRenderDepBackground;
    ctx.arc(x + this.getDepOffsetX(), y, this.root.api.taskRenderDepRadius, 0, Math.PI * 2);
    ctx.strokeStyle = this.root.api.taskRenderDepLineColor;
    ctx.stroke();
    ctx.fill();
  };

  TaskEntity.prototype.renderArrow = function (id, source) {
    var h = this.root.grid.view.rowHeight;
    var task = this.root.tasks.service.getRenderedViewTaskById(id) || this.root.tasks.service.getViewTaskById(id);
    if (!task) return;
    var x = source.x + source.w;
    var y = source.y + h / 2; // if((task.x <= 0 || task.x >= this.root.canvas.width) &&
    // 	(x <= 0 || x >= this.root.canvas.width)) return;

    var targetY = task.y + h / 2;
    var ctx = this.root.ctx;
    ctx.strokeStyle = this.root.api.arrowColor;
    ctx.fillStyle = this.root.api.arrowColor;
    var r = this.root.api.arrowRadius;
    var startOffsetX = this.getDepOffsetX() || 10;

    if (task.x > x) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + startOffsetX - r, y);
      ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, targetY < y ? y - r : y + r);
      ctx.lineTo(x + startOffsetX, targetY > y ? targetY - r : targetY + r);
      ctx.quadraticCurveTo(x + startOffsetX, targetY, x + startOffsetX + r, targetY);
      ctx.lineTo(task.x, targetY);
      ctx.stroke();
      this.renderArrowHead(x + startOffsetX, targetY, task.x, targetY);
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + startOffsetX - r, y);
      ctx.quadraticCurveTo(x + startOffsetX, y, x + startOffsetX, y + r);
      ctx.lineTo(x + startOffsetX, y + h / 2 - r);
      ctx.quadraticCurveTo(x + startOffsetX, y + h / 2, x + startOffsetX - r, y + h / 2);
      ctx.lineTo(task.x - 20 + r, y + h / 2);
      ctx.quadraticCurveTo(task.x - 20, y + h / 2, task.x - 20, targetY > y ? y + h / 2 + r : y + h / 2 - r);
      ctx.lineTo(task.x - 20, targetY);
      ctx.lineTo(task.x, targetY);
      ctx.stroke();
      this.renderArrowHead(task.x - 20, targetY, task.x, targetY);
    }
  };

  TaskEntity.prototype.renderArrowFrom = function (id, x, y) {
    var task = this.root.tasks.service.getRenderedViewTaskById(id) || this.root.tasks.service.getViewTaskById(id);
    if (!task) return;
    var h = this.root.grid.view.rowHeight;
    var sourceY = task.y + h / 2;
    var sourceX = task.x + task.w;
    var ctx = this.root.ctx;
    ctx.strokeStyle = this.root.api.arrowActiveColor;
    ctx.fillStyle = this.root.api.arrowActiveColor;
    var startOffsetX = this.getDepOffsetX();

    if (task.x + task.w + this.root.api.taskRenderDepRadius > x) {
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY);
      ctx.lineTo(sourceX + startOffsetX, sourceY);
      ctx.lineTo(sourceX + startOffsetX, y + h / 2);
      ctx.lineTo(x - 20, y + h / 2);
      ctx.lineTo(x - 20, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      this.renderArrowHead(x - 20, y, x, y);
    } else {
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY);
      ctx.lineTo(sourceX + startOffsetX, sourceY);
      ctx.lineTo(sourceX + startOffsetX, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      this.renderArrowHead(x - 20, y, x, y);
    }
  };

  TaskEntity.prototype.renderArrowHead = function (fromx, fromy, tox, toy) {
    var ctx = this.root.ctx; //variables to be used when creating the arrow

    var headlen = 10;
    var angle = Math.atan2(toy - fromy, tox - fromx); //starting a new path from the head of the arrow to one of the sides of
    //the point

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7)); //path from the side point of the arrow, to the other side point

    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7)); //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point

    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7)); //draws the paths created above

    ctx.stroke();
    ctx.fill();
  };

  TaskEntity.prototype.renderTaskText = function (task, top) {
    var x = task.x,
        w = task.w,
        title = task.title;
    var ctx = this.root.ctx;
    ctx.font = this.root.api.taskFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (ctx.measureText(title).width < w - this.root.api.taskPadding * 2) {
      ctx.fillStyle = this.getTaskColor(task);
      ctx.textAlign = 'center';
      ctx.fillText(title, x + w / 2, top + this.root.api.taskHeight / 2);
    } else {
      ctx.fillStyle = this.root.api.taskDefaultOutlineColor;
      ctx.textAlign = 'left';
      var offsetX = this.getDepOffsetX();
      ctx.fillText(title, x + w + offsetX + this.root.api.taskRenderDepRadius * 2, top + this.root.api.taskHeight / 2);
    }
  };

  TaskEntity.prototype.renderResizeControls = function (task, top) {
    if (!this.root.api.taskRenderResizeControls) return;
    var x = task.x,
        w = task.w;
    var ctx = this.root.ctx;
    var leftX = x + this.root.api.taskPadding;
    top += this.root.api.taskPadding;
    var width = this.root.api.taskRenderResizeControlsWidth;
    var height = this.root.api.taskHeight - this.root.api.taskPadding * 2;
    var rightX = x + w - width - this.root.api.taskPadding;
    canvas_1.roundRect(ctx, leftX, top, width, height, this.root.api.taskRenderResizeControlsRadius, this.root.api.taskRenderResizeControlsColor);
    canvas_1.roundRect(ctx, rightX, top, width, height, this.root.api.taskRenderResizeControlsRadius, this.root.api.taskRenderResizeControlsColor);
  };

  TaskEntity.prototype.isControlsHover = function (event, task) {
    if (this.root.api.taskRenderResizeControls) {
      return this.isRenderedControlsHover(event, task);
    }

    var offsetX = event.offsetX;
    var x = task.x,
        w = task.w;
    var resizeWidth = w * 0.2;
    if (resizeWidth > 30) resizeWidth = 30;
    var leftResizeX = x + resizeWidth;
    var rightResizeX = x + w - resizeWidth;
    if (leftResizeX > offsetX) return 'left';else if (rightResizeX < offsetX) return 'right';
    return null;
  };

  TaskEntity.prototype.isRenderedControlsHover = function (event, task) {
    var offsetX = event.offsetX,
        offsetY = event.offsetY;
    var x = task.x,
        y = task.y,
        w = task.w;
    var top = this.getTaskTop(y);
    var startY = top + this.root.api.taskPadding;
    var endY = startY + this.root.api.taskHeight - this.root.api.taskPadding * 2;
    if (offsetY < startY || offsetY > endY) return null;
    var width = this.root.api.taskRenderResizeControlsWidth;
    var leftStartX = x + this.root.api.taskPadding;
    var leftEndX = leftStartX + width;
    if (offsetX > leftStartX && offsetX < leftEndX) return 'left';
    var rightStartX = x + w - width - this.root.api.taskPadding;
    var rightEndX = rightStartX + width;
    if (offsetX > rightStartX && offsetX < rightEndX) return 'right';
    return null;
  };

  TaskEntity.prototype.getTaskTop = function (y) {
    var h = this.root.grid.view.rowHeight;
    return (h - this.root.api.taskHeight) / 2 + y;
  };

  TaskEntity.prototype.getTaskXX = function (x, w) {
    var xx = x + w;
    if (this.root.api.taskRenderDepControl) xx += this.getDepOffsetX() + this.root.api.taskRenderDepRadius;
    return xx;
  };

  TaskEntity.prototype.getDepOffsetX = function () {
    if (!this.root.api.taskRenderDepControl) return 0;
    return this.root.api.taskRenderDepRadius + this.root.api.taskRenderDepOffsetX;
  };

  TaskEntity.prototype.getTaskFillStyle = function (task) {
    var hover = task.hover,
        hoverConnection = task.hoverConnection,
        background = task.background,
        backgroundHover = task.backgroundHover;

    if (hover || hoverConnection) {
      return backgroundHover !== null && backgroundHover !== void 0 ? backgroundHover : this.root.api.taskDefaultHoverBackground;
    }

    return background !== null && background !== void 0 ? background : this.root.api.taskDefaultBackground;
  };

  TaskEntity.prototype.getTaskColor = function (task) {
    var hover = task.hover,
        hoverConnection = task.hoverConnection,
        color = task.color,
        colorHover = task.colorHover;

    if (hover || hoverConnection) {
      return colorHover !== null && colorHover !== void 0 ? colorHover : this.root.api.taskDefaultHoverColor;
    }

    return color !== null && color !== void 0 ? color : this.root.api.taskDefaultColor;
  };

  return TaskEntity;
}();

exports.TaskEntity = TaskEntity;
},{"../../utils/canvas":"../src/utils/canvas.ts"}],"../src/tasks/tasks.view.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TasksView = void 0;

var task_entity_1 = require("./entities/task.entity");

var TasksView = function () {
  function TasksView(root, module) {
    this.tasksForArrows = [];
    this.tasks = [];
    this.root = root;
    this.module = module;
    this.taskEntity = new task_entity_1.TaskEntity(root);
  }

  TasksView.prototype.fillTasks = function () {
    var _this = this;

    var _a = this.root.grid.view,
        rowHeight = _a.rowHeight,
        rowsOffsetY = _a.rowsOffsetY;
    var _b = this.module.store,
        hoverId = _b.hoverId,
        hoverConnectionTask = _b.hoverConnectionTask,
        tasks = _b.tasks;
    var offsetY = rowsOffsetY - this.root.view.offsetY;
    var data = {};
    tasks.forEach(function (task, index) {
      var _a = _this.module.service.getTaskPos(task),
          x = _a.x,
          xx = _a.xx;

      var w = xx - x;
      var y = rowHeight * index + offsetY;
      data[task.id] = __assign(__assign({}, task), {
        hover: hoverId === task.id,
        hoverConnection: hoverConnectionTask === task.id,
        y: y,
        x: x,
        w: w
      });
    });
    this.tasksForArrows = Object.values(data).filter(function (task) {
      if (task.y + rowHeight >= rowsOffsetY && task.y <= _this.root.canvas.height) return true;
      return task.next_ids.some(function (id) {
        var target = data[id];
        if (!target) return false;
        if (task.y < rowsOffsetY && target.y < rowsOffsetY) return false;
        if (task.y > _this.root.canvas.height && target.y > _this.root.canvas.height) return false;
        if (task.x < 0 && target.x < 0) return false;
        if (task.x + task.w > _this.root.canvas.width && target.x + task.w > _this.root.canvas.width) return false;
        return true;
      });
    });
    this.tasks = this.tasksForArrows.filter(function (task) {
      return task.y + rowHeight >= rowsOffsetY && task.y <= _this.root.canvas.height;
    });
  };

  TasksView.prototype.render = function () {
    this.fillTasks();
    this.renderArrows();
    this.renderArrowFrom();
    this.renderTasks();
  };

  TasksView.prototype.renderArrows = function () {
    var _this = this;

    this.tasksForArrows.forEach(function (el) {
      el.next_ids.forEach(function (id) {
        return _this.taskEntity.renderArrow(id, el);
      });
    });
  };

  TasksView.prototype.renderArrowFrom = function () {
    if (this.module.store.hoverId && this.module.controller.addDepMode) {
      this.taskEntity.renderArrowFrom(this.module.store.hoverId, this.module.store.addDepOffsetX || 0, this.module.store.addDepOffsetY || 0);
    }
  };

  TasksView.prototype.renderTasks = function () {
    var _this = this;

    this.tasks.forEach(function (x) {
      return _this.taskEntity.renderItem(x);
    });
  };

  return TasksView;
}();

exports.TasksView = TasksView;
},{"./entities/task.entity":"../src/tasks/entities/task.entity.ts"}],"../src/tasks/tasks.controller.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TasksController = void 0;

var canvas_1 = require("../utils/canvas");

var TasksController = function () {
  function TasksController(root, module) {
    this.moveMode = false;
    this.addDepMode = false;
    this.resizeMoveMode = null;
    this.mouseDownOffsetX = null;
    this.root = root;
    this.module = module;
    this.handleResizeMouseUp = this.handleResizeMouseUp.bind(this);
    this.handleTaskMoveMouseUp = this.handleTaskMoveMouseUp.bind(this);
    this.handleAddDepMouseUp = this.handleAddDepMouseUp.bind(this);
  }

  TasksController.prototype.attachEvents = function () {
    this.destroyMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
    this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
    this.destroyTouchEnd = this.root.controller.on('touchend', this.handleTouchEnd.bind(this));
  };

  TasksController.prototype.destroyEvents = function () {
    this.destroyMouseDown && this.destroyMouseDown();
    this.destroyMouseMove && this.destroyMouseMove();
    this.destroyTouchEnd && this.destroyTouchEnd();
  };

  TasksController.prototype.handleTouchEnd = function (event) {
    var _a, _b;

    var offsetX = (_a = event.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.screenX;
    var offsetY = (_b = event.changedTouches[0]) === null || _b === void 0 ? void 0 : _b.screenY;
    if (offsetX !== this.root.controller.touchOffsetX || offsetY !== this.root.controller.touchOffsetY) return;
    var eventOffsets = canvas_1.getEventTouchOffsets(event, this.root.canvas);
    this.module.service.handleTouchTask(eventOffsets);
  };

  TasksController.prototype.handleMouseDown = function (event) {
    var _a = this.module.service.getHoverId(event),
        hoverId = _a.hoverId,
        resize = _a.resize,
        depFromId = _a.depFromId;

    if (!hoverId) return;
    this.mouseDownOffsetX = event.offsetX;

    if (depFromId) {
      this.addDepMode = true;
      this.destroyAddDepMove = this.root.controller.on('mousemove', this.handleAddDepMouseMove.bind(this));
      document.addEventListener('mouseup', this.handleAddDepMouseUp);
    } else if (resize) {
      this.resizeMoveMode = resize;
      this.destroyResizeMouseMove = this.root.controller.on('mousemove', this.handleResizeTaskMouseMove.bind(this));
      document.addEventListener('mouseup', this.handleResizeMouseUp);
    } else {
      this.destroyTaskMove = this.root.controller.on('mousemove', this.handleTaskMove.bind(this));
      document.addEventListener('mouseup', this.handleTaskMoveMouseUp);
    }
  };

  TasksController.prototype.handleMouseMove = function (event) {
    if (this.resizeMoveMode) return;

    if (this.mouseDownOffsetX) {
      var hoverId_1 = this.module.service.getHoverId(event).hoverId;
      return this.module.store.setHoverConnectionTask(hoverId_1);
    }

    var _a = this.module.service.getHoverId(event),
        hoverId = _a.hoverId,
        resize = _a.resize;

    this.module.store.setHoverId(hoverId, resize);
  };
  /** Start Resize Task */


  TasksController.prototype.handleResizeTaskMouseMove = function (event) {
    this.module.service.handleResizeTaskMouseMove(event);
  };

  TasksController.prototype.handleResizeMouseUp = function () {
    this.module.service.handleResizeTaskMouseUp();
    this.resizeMoveMode = null;
    this.mouseDownOffsetX = null;
    this.destroyResizeMouseMove && this.destroyResizeMouseMove();
    document.removeEventListener('mouseup', this.handleResizeMouseUp);
  };
  /** End Resize Task */

  /** Start Add Dependencies */


  TasksController.prototype.handleAddDepMouseMove = function (event) {
    this.module.service.handleAddDepMouseMove(event);
  };

  TasksController.prototype.handleAddDepMouseUp = function (event) {
    this.mouseDownOffsetX = null;
    this.addDepMode = false;
    this.module.service.handleAddDepMouseUp(event);
    this.destroyAddDepMove && this.destroyAddDepMove();
    document.removeEventListener('mouseup', this.handleAddDepMouseUp);
  };
  /** End Add Dependencies */

  /** Start Move Task */


  TasksController.prototype.handleTaskMove = function (event) {
    this.module.service.handleMoveTaskMouseMove(event);
  };

  TasksController.prototype.handleTaskMoveMouseUp = function (event) {
    if (this.mouseDownOffsetX === event.offsetX) this.module.service.handleClickTask(event);
    this.module.service.handleMoveTaskMouseUp();
    this.destroyTaskMove && this.destroyTaskMove();
    console.log(event.offsetX, this.mouseDownOffsetX);
    this.mouseDownOffsetX = null;
    this.module.store.setHoverConnectionTask(null);
    document.removeEventListener('mouseup', this.handleTaskMoveMouseUp);
  };

  return TasksController;
}();

exports.TasksController = TasksController;
},{"../utils/canvas":"../src/utils/canvas.ts"}],"../src/tasks/tasks.service.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TasksService = void 0;

var TasksService = function () {
  function TasksService(root, module) {
    this.intervalChangeOffset = null;
    this.root = root;
    this.module = module;
  }
  /** Start getters */


  TasksService.prototype.getRootStoreTaskById = function (id) {
    if (!id) return null;
    var task = this.root.api.tasks.find(function (task) {
      return task.id === id;
    });
    return task || null;
  };

  TasksService.prototype.getModuleStoreTaskById = function (id) {
    var task = this.module.store.tasks.find(function (task) {
      return task.id === id;
    });
    return task || null;
  };

  TasksService.prototype.getRenderedViewTaskById = function (id) {
    var task = this.module.view.tasks.find(function (task) {
      return task.id === id;
    });
    return task || null;
  };

  TasksService.prototype.getViewTaskById = function (id) {
    var _a = this.root.grid.view,
        rowHeight = _a.rowHeight,
        rowsOffsetY = _a.rowsOffsetY;
    var hoverId = this.module.store.hoverId;
    var task = this.getModuleStoreTaskById(id);
    if (!task) return null;
    var index = this.module.store.tasks.indexOf(task);

    var _b = this.getTaskPos(task),
        x = _b.x,
        xx = _b.xx;

    var w = xx - x;
    var offsetY = rowsOffsetY - this.root.view.offsetY;
    var y = rowHeight * index + offsetY;
    return __assign(__assign({}, task), {
      hover: hoverId === task.id,
      y: y,
      x: x,
      w: w
    });
  };

  TasksService.prototype.getStoreDependedTasksById = function (id, tasks) {
    var _this = this;

    if (tasks === void 0) {
      tasks = [];
    }

    var task = this.getRootStoreTaskById(id);
    if (!task) return tasks;
    tasks.push(task);
    task.next_ids.forEach(function (id) {
      if (tasks.find(function (task) {
        return task.id === id;
      })) return;
      tasks = _this.getStoreDependedTasksById(id, tasks);
    });
    return tasks;
  };

  TasksService.prototype.getHoveredTask = function () {
    return this.getRootStoreTaskById(this.module.store.hoverId);
  };

  TasksService.prototype.getTaskPos = function (task) {
    var x = task.all_day ? this.root.grid.service.getPosXByFullDayTs(task.start_date_ts) : this.root.grid.service.getPosXByTs(task.start_date_ts);
    var xx = task.all_day ? this.root.grid.service.getPosXByFullDayTs(task.end_date_ts, true) : this.root.grid.service.getPosXByTs(task.end_date_ts);
    if (xx === x) xx += this.root.api.minTaskWidth;
    return {
      x: x,
      xx: xx
    };
  };

  TasksService.prototype.getFirstTaskByDeadline = function () {
    var task = this.root.api.tasks.reduce(function (prev, item) {
      if (!prev) return item;
      if (prev.start_date_ts > item.start_date_ts) return item;
      return prev;
    }, this.root.api.tasks[0]);
    return task;
  };

  TasksService.prototype.getLastTaskByDeadline = function () {
    var task = this.root.api.tasks.reduce(function (prev, item) {
      if (!prev) return item;
      if (prev.end_date_ts < item.end_date_ts) return item;
      return prev;
    }, this.root.api.tasks[0]);
    return task;
  };

  TasksService.prototype.getFirstDeadline = function () {
    var _a;

    var firstTask = this.getFirstTaskByDeadline();
    return (_a = firstTask === null || firstTask === void 0 ? void 0 : firstTask.start_date_ts) !== null && _a !== void 0 ? _a : 0;
  };

  TasksService.prototype.getLastDeadline = function () {
    var _a;

    var lastTask = this.getLastTaskByDeadline();
    return (_a = lastTask === null || lastTask === void 0 ? void 0 : lastTask.end_date_ts) !== null && _a !== void 0 ? _a : 0;
  };

  TasksService.prototype.getFirstAndLastDeadline = function () {
    var start_date_ts = this.getFirstDeadline();
    var end_date_ts = this.getLastDeadline();
    return [start_date_ts, end_date_ts];
  };
  /** End getters */

  /** Start commons */


  TasksService.prototype.getHoverId = function (event) {
    var hoverId = null;
    var resize = null;
    var depFromId = null;
    var _a = this.module.view,
        tasks = _a.tasks,
        taskEntity = _a.taskEntity;

    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
      var item = tasks_1[_i];
      var data = taskEntity.isHover(event, item);
      if (data.depFrom) depFromId = item.id;
      if (data.resize) resize = data.resize;

      if (data.hover) {
        hoverId = item.id;
        break;
      }
    }

    return {
      hoverId: hoverId,
      resize: resize,
      depFromId: depFromId
    };
  };

  TasksService.prototype.scrollX = function (event) {
    var _this = this;

    var offsetX = event.offsetX;
    var width = this.root.canvas.width;
    var colWidth = this.root.grid.view.colWidth;
    var pos = offsetX / width;
    var changeOffsetValue = 0;

    if (pos > 0.9) {
      changeOffsetValue = colWidth;
    } else if (pos < 0.1) changeOffsetValue = -colWidth;

    if (changeOffsetValue !== 0 && !this.intervalChangeOffset) {
      this.intervalChangeOffset = setInterval(function () {
        _this.module.controller.mouseDownOffsetX = (_this.module.controller.mouseDownOffsetX || 0) - changeOffsetValue;
        if (_this.module.controller.addDepMode) _this.updateDepOffsets(event);else if (_this.module.controller.resizeMoveMode) _this.resizeTaskByResizeMode(offsetX);else _this.moveTask(event.offsetX);

        _this.root.view.handleChangeOffsetX(changeOffsetValue);
      }, 150);
    } else if (changeOffsetValue === 0) {
      this.clearScrollInterval();
    }
  };

  TasksService.prototype.clearScrollInterval = function () {
    if (this.intervalChangeOffset) {
      clearInterval(this.intervalChangeOffset);
      this.intervalChangeOffset = null;
    }
  };

  TasksService.prototype.getDiff = function (offsetX, all_day) {
    if (all_day === void 0) {
      all_day = false;
    }

    var offsetDiff = offsetX - (this.module.controller.mouseDownOffsetX || 0);
    var diff = this.root.grid.service.getTsByOffsetDiff(offsetDiff);

    if (all_day || this.root.api.saveTime) {
      var colTs = this.root.grid.view.colTs;
      var dayDiff = (diff - diff % colTs) / colTs;
      diff = colTs * dayDiff;
    }

    return diff;
  };
  /** End commons */


  TasksService.prototype.handleClickTask = function (event) {
    if (!this.root.api.handleTaskClick) return;
    var hoverId = this.getHoverId(event).hoverId;
    if (!hoverId) return;
    var hoveredTask = this.getRootStoreTaskById(hoverId);
    if (!hoveredTask) return;
    this.root.api.handleTaskClick(hoveredTask);
  };

  TasksService.prototype.handleTouchTask = function (event) {
    if (!this.root.api.handleTaskClick) return;
    var hoverId = this.module.service.getHoverId(event).hoverId;
    if (!hoverId) return;
    var hoveredTask = this.getRootStoreTaskById(hoverId);
    if (!hoveredTask) return;
    this.root.api.handleTaskClick(hoveredTask);
  };
  /** Start Add Dependencies */


  TasksService.prototype.handleAddDepMouseMove = function (event) {
    if (this.intervalChangeOffset) return this.scrollX(event);
    this.updateDepOffsets(event);
    this.scrollX(event);
    this.root.render();
  };

  TasksService.prototype.handleAddDepMouseUp = function (event) {
    var hoverId = this.getHoverId(event).hoverId;

    if (hoverId && this.module.store.hoverId && hoverId !== this.module.store.hoverId) {
      var hoveredTask = this.getRootStoreTaskById(hoverId);
      var currentTask = this.getRootStoreTaskById(this.module.store.hoverId);

      if (hoveredTask && currentTask && !currentTask.next_ids.includes(hoverId)) {
        var task = __assign(__assign({}, currentTask), {
          next_ids: __spreadArray(__spreadArray([], currentTask.next_ids), [hoverId])
        });

        this.module.store.addModTask(task);
        this.module.store.saveModTasks();
        this.root.api.handleChange && this.root.api.handleChange([task]);
      }
    }

    this.clearScrollInterval();
    this.module.store.updateDepOffsets(null, null);
    this.module.store.setHoverConnectionTask(null);
    if (hoverId && hoverId === this.module.store.hoverId) this.root.render();
  };

  TasksService.prototype.updateDepOffsets = function (event) {
    this.module.store.updateDepOffsets(event.offsetX, event.offsetY);
  };
  /** End Add Dependencies */

  /** Start Resize Task */


  TasksService.prototype.handleResizeTaskMouseMove = function (event) {
    if (this.intervalChangeOffset) return this.scrollX(event);
    this.resizeTaskByResizeMode(event.offsetX);
    this.scrollX(event);
    this.root.render();
  };

  TasksService.prototype.resizeTaskByResizeMode = function (offsetX) {
    var resizeMoveMode = this.module.controller.resizeMoveMode;
    var task = this.getHoveredTask();
    if (!task) return;
    var diff = this.getDiff(offsetX, task.all_day);
    if (diff === 0) return;

    if (resizeMoveMode === 'right') {
      this.resizeTaskRightSide(task, diff);
    } else if (resizeMoveMode === 'left') {
      this.resizeTaskLeftSide(task, diff);
    }
  };

  TasksService.prototype.resizeTaskRightSide = function (task, diff) {
    if (this.root.api.moveDependedOnResizeRight) this.saveResizeDependedTasksRightSide(task, diff);else this.saveResizeCurrentTaskRight(task, diff);
  };

  TasksService.prototype.resizeTaskLeftSide = function (task, diff) {
    if (this.root.api.moveDependedOnResizeLeft) this.saveResizeDependedTasksLeftSide(task, diff);else this.saveResizeCurrentTaskLeft(task, diff);
  };

  TasksService.prototype.saveResizeDependedTasksRightSide = function (task, diff) {
    var _this = this;

    var tasks = this.getStoreDependedTasksById(task.id);
    tasks.forEach(function (el) {
      if (el.id === task.id) _this.saveResizeCurrentTaskRight(el, diff);else _this.saveMoveTask(el, diff);
    });
  };

  TasksService.prototype.saveResizeCurrentTaskRight = function (task, diff) {
    var newTask = __assign(__assign({}, task), {
      end_date_ts: task.end_date_ts + diff
    });

    if (newTask.start_date_ts > newTask.end_date_ts) newTask.start_date_ts = newTask.end_date_ts;
    this.module.store.addModTask(newTask);
  };

  TasksService.prototype.saveResizeDependedTasksLeftSide = function (task, diff) {
    var _this = this;

    var tasks = this.getStoreDependedTasksById(task.id);
    tasks.forEach(function (el) {
      if (el.id === task.id) _this.saveResizeCurrentTaskLeft(el, diff);else _this.saveMoveTask(el, diff);
    });
  };

  TasksService.prototype.saveResizeCurrentTaskLeft = function (task, diff) {
    var newTask = __assign(__assign({}, task), {
      start_date_ts: task.start_date_ts + diff
    });

    if (newTask.start_date_ts > newTask.end_date_ts) newTask.end_date_ts = newTask.start_date_ts;
    this.module.store.addModTask(newTask);
  };

  TasksService.prototype.handleResizeTaskMouseUp = function () {
    var tasks = Object.values(this.module.store.modifiedTasks);
    this.root.api.handleChange && this.root.api.handleChange(tasks);
    this.clearScrollInterval();
    this.module.store.saveModTasks();
  };
  /** End Resize Task */

  /** Start Move Task */


  TasksService.prototype.handleMoveTaskMouseMove = function (event) {
    if (this.intervalChangeOffset) return this.scrollX(event);
    this.moveTask(event.offsetX);
    this.scrollX(event);
    this.root.render();
  };

  TasksService.prototype.moveTask = function (offsetX) {
    var task = this.getHoveredTask();
    if (!task || !this.module.controller.mouseDownOffsetX) return;
    var diff = this.getDiff(offsetX, task.all_day);
    if (diff === 0) return;

    if (this.root.api.moveDependedOnMove) {
      this.moveDependedTasks(task, diff);
    } else {
      this.saveMoveTask(task, diff);
    }
  };

  TasksService.prototype.moveDependedTasks = function (task, diff) {
    var _this = this;

    var tasks = this.getStoreDependedTasksById(task.id);
    tasks.forEach(function (el) {
      return _this.saveMoveTask(el, diff);
    });
  };

  TasksService.prototype.saveMoveTask = function (task, diff) {
    var newTask = __assign(__assign({}, task), {
      start_date_ts: task.start_date_ts + diff,
      end_date_ts: task.end_date_ts + diff
    });

    this.module.store.addModTask(newTask);
  };

  TasksService.prototype.handleMoveTaskMouseUp = function () {
    var tasks = Object.values(this.module.store.modifiedTasks);
    this.root.api.handleChange && this.root.api.handleChange(tasks);
    this.clearScrollInterval();
    this.module.store.saveModTasks();
  };

  return TasksService;
}();

exports.TasksService = TasksService;
},{}],"../src/tasks/tasks.module.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TasksModule = void 0;

var tasks_store_1 = require("./tasks.store");

var tasks_view_1 = require("./tasks.view");

var tasks_controller_1 = require("./tasks.controller");

var tasks_service_1 = require("./tasks.service");

var TasksModule = function () {
  function TasksModule(root) {
    this.root = root;
    this.store = new tasks_store_1.TasksStore(root);
    this.service = new tasks_service_1.TasksService(root, this);
    this.view = new tasks_view_1.TasksView(root, this);
    this.controller = new tasks_controller_1.TasksController(root, this);
  }

  TasksModule.prototype.init = function () {
    this.controller.attachEvents();
  };

  return TasksModule;
}();

exports.TasksModule = TasksModule;
},{"./tasks.store":"../src/tasks/tasks.store.ts","./tasks.view":"../src/tasks/tasks.view.ts","./tasks.controller":"../src/tasks/tasks.controller.ts","./tasks.service":"../src/tasks/tasks.service.ts"}],"../src/root/root.api.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootApi = void 0;

var RootApi = function () {
  function RootApi(root, props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32;

    this.root = root;
    this.tasks = props.tasks;
    this.moveDependedOnResizeRight = (_a = props.moveDependedOnResizeRight) !== null && _a !== void 0 ? _a : true;
    this.moveDependedOnResizeLeft = (_b = props.moveDependedOnResizeLeft) !== null && _b !== void 0 ? _b : false;
    this.moveDependedOnMove = (_c = props.moveDependedOnMove) !== null && _c !== void 0 ? _c : true;
    this.saveTime = (_d = props.saveTime) !== null && _d !== void 0 ? _d : true;
    this.startFromToday = (_e = props.startFromToday) !== null && _e !== void 0 ? _e : true;
    this.renderAllTasksFromStart = (_f = props.renderAllTasksFromStart) !== null && _f !== void 0 ? _f : true;
    this.showMonthMiddle = (_g = props.showMonthMiddle) !== null && _g !== void 0 ? _g : false;
    this.monthHeight = (_h = props.monthHeight) !== null && _h !== void 0 ? _h : 55;
    this.renderMonthBottomLine = (_j = props.renderMonthBottomLine) !== null && _j !== void 0 ? _j : false;
    this.renderMonthLeftLine = (_k = props.renderMonthLeftLine) !== null && _k !== void 0 ? _k : false;
    this.monthLineColor = (_l = props.monthLineColor) !== null && _l !== void 0 ? _l : '#EAEAEA';
    this.monthTitleFont = (_m = props.monthTitleFont) !== null && _m !== void 0 ? _m : '600 20px Arial';
    this.monthTitleColor = (_o = props.monthTitleColor) !== null && _o !== void 0 ? _o : '#222';
    this.monthTitleShowYear = (_p = props.monthTitleShowYear) !== null && _p !== void 0 ? _p : true;
    this.dayHeight = (_q = props.dayHeight) !== null && _q !== void 0 ? _q : 28;
    this.renderDayStartMonthLine = (_r = props.renderDayStartMonthLine) !== null && _r !== void 0 ? _r : false;
    this.dayStartMonthLine = (_s = props.dayStartMonthLine) !== null && _s !== void 0 ? _s : '#EAEAEA';
    this.dayBottomLineColor = (_t = props.dayBottomLineColor) !== null && _t !== void 0 ? _t : '#EAEAEA';
    this.dayTodayBackground = (_u = props.dayTodayBackground) !== null && _u !== void 0 ? _u : 'rgba(255,165,0,0.2)';
    this.dayFont = (_v = props.dayFont) !== null && _v !== void 0 ? _v : '500 14px Arial';
    this.dayColor = (_w = props.dayColor) !== null && _w !== void 0 ? _w : '#222';
    this.dayColWidth = (_x = props.dayColWidth) !== null && _x !== void 0 ? _x : 38;
    this.rowHeight = (_y = props.rowHeight) !== null && _y !== void 0 ? _y : 36;
    this.colLineColor = (_z = props.colLineColor) !== null && _z !== void 0 ? _z : '#EAEAEA';
    this.rowLineColor = (_0 = props.rowLineColor) !== null && _0 !== void 0 ? _0 : '#EAEAEA';
    this.rowEvenBackground = (_1 = props.rowEvenBackground) !== null && _1 !== void 0 ? _1 : '#fff';
    this.rowOddBackground = (_2 = props.rowOddBackground) !== null && _2 !== void 0 ? _2 : '#fff';
    this.taskDefaultBackground = (_3 = props.taskDefaultBackground) !== null && _3 !== void 0 ? _3 : '#F0F0F0';
    this.taskDefaultHoverBackground = (_4 = props.taskDefaultHoverBackground) !== null && _4 !== void 0 ? _4 : '#333333';
    this.taskDefaultColor = (_5 = props.taskDefaultColor) !== null && _5 !== void 0 ? _5 : '#222';
    this.taskDefaultHoverColor = (_6 = props.taskDefaultHoverColor) !== null && _6 !== void 0 ? _6 : '#fff';
    this.taskDefaultOutlineColor = (_7 = props.taskDefaultOutlineColor) !== null && _7 !== void 0 ? _7 : '#222';
    this.taskHeight = (_8 = props.taskHeight) !== null && _8 !== void 0 ? _8 : 30;
    this.taskPadding = (_9 = props.taskPadding) !== null && _9 !== void 0 ? _9 : 5;
    this.taskRadius = (_10 = props.taskRadius) !== null && _10 !== void 0 ? _10 : 4;
    this.taskFont = (_11 = props.taskFont) !== null && _11 !== void 0 ? _11 : "14px serif";
    this.minTaskWidth = (_12 = props.minTaskWidth) !== null && _12 !== void 0 ? _12 : 25;
    this.taskRenderResizeControls = (_13 = props.taskRenderResizeControls) !== null && _13 !== void 0 ? _13 : true;
    this.taskRenderResizeControlsWidth = (_14 = props.taskRenderResizeControlsWidth) !== null && _14 !== void 0 ? _14 : 6;
    this.taskRenderResizeControlsColor = (_15 = props.taskRenderResizeControlsColor) !== null && _15 !== void 0 ? _15 : '#fff';
    this.taskRenderResizeControlsRadius = (_16 = props.taskRenderResizeControlsRadius) !== null && _16 !== void 0 ? _16 : 4;
    this.taskRenderDepControl = (_17 = props.taskRenderDepControl) !== null && _17 !== void 0 ? _17 : true;
    this.taskRenderDepRadius = (_18 = props.taskRenderDepRadius) !== null && _18 !== void 0 ? _18 : 7;
    this.taskRenderDepOffsetX = (_19 = props.taskRenderDepOffsetX) !== null && _19 !== void 0 ? _19 : 7;
    this.taskRenderDepLineColor = (_20 = props.taskRenderDepLineColor) !== null && _20 !== void 0 ? _20 : '#222';
    this.taskRenderDepBackground = (_21 = props.taskRenderDepBackground) !== null && _21 !== void 0 ? _21 : '#fff';
    this.arrowColor = (_22 = props.arrowColor) !== null && _22 !== void 0 ? _22 : "#555";
    this.arrowActiveColor = (_23 = props.arrowActiveColor) !== null && _23 !== void 0 ? _23 : "#88BECF";
    this.arrowRadius = (_24 = props.arrowRadius) !== null && _24 !== void 0 ? _24 : 4;
    this.scrollbarXHeight = (_25 = props.scrollbarXHeight) !== null && _25 !== void 0 ? _25 : 12;
    this.scrollbarXBackground = (_26 = props.scrollbarXBackground) !== null && _26 !== void 0 ? _26 : '#eee';
    this.scrollbarXLineBackground = (_27 = props.scrollbarXLineBackground) !== null && _27 !== void 0 ? _27 : '#ccc';
    this.scrollbarXLineRadius = (_28 = props.scrollbarXLineRadius) !== null && _28 !== void 0 ? _28 : 6;
    this.scrollbarYWidth = (_29 = props.scrollbarYWidth) !== null && _29 !== void 0 ? _29 : 12;
    this.scrollbarYBackground = (_30 = props.scrollbarYBackground) !== null && _30 !== void 0 ? _30 : '#eee';
    this.scrollbarYLineBackground = (_31 = props.scrollbarYLineBackground) !== null && _31 !== void 0 ? _31 : '#ccc';
    this.scrollbarYLineRadius = (_32 = props.scrollbarYLineRadius) !== null && _32 !== void 0 ? _32 : 6;
    this.handleChange = props.handleChange;
    this.handleTaskClick = props.handleTaskClick;
  }

  RootApi.prototype.updateTasks = function (tasks) {
    this.tasks = tasks;
  };

  return RootApi;
}();

exports.RootApi = RootApi;
},{}],"../src/root/entities/scrollbar-x.entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollbarXEntity = void 0;

var canvas_1 = require("../../utils/canvas");

var ScrollbarXEntity = function () {
  function ScrollbarXEntity(root) {
    this.mouseDownOffset = null;
    this.isHover = false;
    this.root = root;
    this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
    this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
  }

  Object.defineProperty(ScrollbarXEntity.prototype, "height", {
    get: function get() {
      return this.root.api.scrollbarXHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ScrollbarXEntity.prototype, "top", {
    get: function get() {
      return this.root.canvas.height - this.height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ScrollbarXEntity.prototype, "backgroundLineWidth", {
    get: function get() {
      return this.root.canvas.width;
    },
    enumerable: false,
    configurable: true
  });

  ScrollbarXEntity.prototype.destroyEvents = function () {
    this.destroyHandleMouseDown();
    this.destroyMouseMove();
  };

  ScrollbarXEntity.prototype.isLineClick = function (event) {
    var offsetX = event.offsetX,
        offsetY = event.offsetY;

    var _a = this.getLineXAndWidth(),
        x = _a.x,
        width = _a.width;

    if (offsetX < x || offsetX > x + width) return false;
    if (offsetY < this.top) return false;
    return true;
  };

  ScrollbarXEntity.prototype.isBackgroundClick = function (event) {
    var offsetY = event.offsetY,
        offsetX = event.offsetX;
    return offsetY >= this.top && offsetX < this.backgroundLineWidth;
  };

  ScrollbarXEntity.prototype.handleMouseDown = function (event) {
    var isLineClick = this.isLineClick(event);
    var isBackgroundClick = this.isBackgroundClick(event);
    if (isLineClick) this.handleLinkMouseDown(event);else if (isBackgroundClick) this.handleBackgroundMouseDown(event);
    if (isLineClick || isBackgroundClick) this.root.controller.stopPropagation(event);
  };

  ScrollbarXEntity.prototype.handleLinkMouseDown = function (event) {
    this.mouseDownOffset = event.screenX;
    document.addEventListener('mousemove', this.handleMoveScrollbar);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  ScrollbarXEntity.prototype.handleBackgroundMouseDown = function (event) {
    var scaledOffset = this.getScaledOffset(event.offsetX);
    this.root.view.handleSetOffsetX(scaledOffset, true, true);
  };

  ScrollbarXEntity.prototype.getScaledOffset = function (offsetX) {
    var fullWidth = this.root.grid.service.getFullAvailableWidth();
    var scale = fullWidth / this.backgroundLineWidth;
    return scale * offsetX;
  };

  ScrollbarXEntity.prototype.handleMouseUp = function () {
    this.mouseDownOffset = null;
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMoveScrollbar);
  };

  ScrollbarXEntity.prototype.handleMouseMove = function (event) {};

  ScrollbarXEntity.prototype.handleMoveScrollbar = function (event) {
    if (this.mouseDownOffset !== null) {
      var diff = event.screenX - this.mouseDownOffset;
      var offset = this.root.view.offsetX + this.getScaledOffset(diff);
      this.root.view.handleSetOffsetX(offset);
      this.mouseDownOffset = event.screenX;
    }
  };

  ScrollbarXEntity.prototype.renderBackground = function () {
    var ctx = this.root.ctx;
    ctx.fillStyle = this.root.api.scrollbarXBackground;
    ctx.fillRect(0, this.top, this.backgroundLineWidth, this.height);
  };

  ScrollbarXEntity.prototype.renderLine = function () {
    var ctx = this.root.ctx;

    var _a = this.getLineXAndWidth(),
        x = _a.x,
        width = _a.width;

    ctx.fillStyle = this.root.api.scrollbarXLineBackground;
    canvas_1.roundRect(ctx, x, this.top, width, this.height, this.root.api.scrollbarXLineRadius, this.root.api.scrollbarXLineBackground);
  };

  ScrollbarXEntity.prototype.getLineXAndWidth = function () {
    var fullWidth = this.root.grid.service.getFullAvailableWidth();
    var x = this.root.view.offsetX / fullWidth * this.backgroundLineWidth;
    var width = this.backgroundLineWidth / fullWidth * this.backgroundLineWidth;
    return {
      x: x,
      width: width
    };
  };

  ScrollbarXEntity.prototype.render = function () {
    this.renderBackground();
    this.renderLine();
  };

  return ScrollbarXEntity;
}();

exports.ScrollbarXEntity = ScrollbarXEntity;
},{"../../utils/canvas":"../src/utils/canvas.ts"}],"../src/root/entities/scrollbar-y.entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollbarYEntity = void 0;

var canvas_1 = require("../../utils/canvas");

var ScrollbarYEntity = function () {
  function ScrollbarYEntity(root) {
    this.mouseDownOffset = null;
    this.bottomOffset = 12;
    this.width = 12;
    this.isHover = false;
    this.root = root;
    this.destroyHandleMouseDown = this.root.controller.on('mousedown', this.handleMouseDown.bind(this));
    this.destroyMouseMove = this.root.controller.on('mousemove', this.handleMouseMove.bind(this));
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMoveScrollbar = this.handleMoveScrollbar.bind(this);
  }

  Object.defineProperty(ScrollbarYEntity.prototype, "left", {
    get: function get() {
      return this.root.canvas.width - this.width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ScrollbarYEntity.prototype, "top", {
    get: function get() {
      return this.root.grid.view.headerHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ScrollbarYEntity.prototype, "backgroundLineHeight", {
    get: function get() {
      return this.root.canvas.height - this.bottomOffset - this.top;
    },
    enumerable: false,
    configurable: true
  });

  ScrollbarYEntity.prototype.destroyEvents = function () {
    this.destroyHandleMouseDown();
    this.destroyMouseMove();
  };

  ScrollbarYEntity.prototype.isLineClick = function (event) {
    if (!this.needRender()) return false;
    var offsetX = event.offsetX,
        offsetY = event.offsetY;

    var _a = this.getLineYAndHeight(),
        y = _a.y,
        height = _a.height;

    if (offsetX < this.left) return false;
    if (offsetY < y + this.top || offsetY > y + this.top + height) return false;
    return true;
  };

  ScrollbarYEntity.prototype.isBackgroundClick = function (event) {
    if (!this.needRender()) return false;
    var offsetX = event.offsetX,
        offsetY = event.offsetY;
    return offsetX >= this.left && offsetY > this.top && offsetY < this.root.canvas.height - this.bottomOffset;
  };

  ScrollbarYEntity.prototype.handleMouseDown = function (event) {
    var isLineClick = this.isLineClick(event);
    var isBackgroundClick = this.isBackgroundClick(event);
    if (isLineClick) this.handleLinkMouseDown(event);else if (isBackgroundClick) this.handleBackgroundMouseDown(event);
    if (isLineClick || isBackgroundClick) this.root.controller.stopPropagation(event);
  };

  ScrollbarYEntity.prototype.handleLinkMouseDown = function (event) {
    this.mouseDownOffset = event.screenY;
    document.addEventListener('mousemove', this.handleMoveScrollbar);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  ScrollbarYEntity.prototype.handleMouseUp = function () {
    this.mouseDownOffset = null;
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMoveScrollbar);
  };

  ScrollbarYEntity.prototype.handleBackgroundMouseDown = function (event) {
    var scaledOffset = this.getScaledOffset(event.offsetY);
    this.root.view.handleSetOffsetY(scaledOffset, true, true);
  };

  ScrollbarYEntity.prototype.getScaledOffset = function (offsetY) {
    var fullHeight = this.root.grid.service.getLeftAvailableHeight();
    offsetY = offsetY - this.top;
    var scale = fullHeight / this.backgroundLineHeight;
    return scale * offsetY;
  };

  ScrollbarYEntity.prototype.handleMouseMove = function (event) {
    var isLineClick = this.isLineClick(event);
    var isBackgroundClick = this.isBackgroundClick(event);
    if (isLineClick) this.root.view.setCursor('grab');else if (isBackgroundClick) this.root.view.setCursor('pointer');

    if (isLineClick || isBackgroundClick) {
      this.root.controller.stopPropagation(event);
      this.isHover = true;
    } else if (this.isHover) {
      this.isHover = false;
      this.root.view.setCursor('auto');
    }
  };

  ScrollbarYEntity.prototype.handleMoveScrollbar = function (event) {
    if (this.mouseDownOffset !== null) {
      var diff = event.screenY - this.mouseDownOffset;
      var offset = this.root.view.offsetY + this.getScaledOffset(this.top + diff);
      var fullHeight = this.root.grid.service.getLeftAvailableHeight();
      if (offset > fullHeight) offset = fullHeight;
      this.root.view.handleSetOffsetY(offset);
      this.mouseDownOffset = event.screenY;
    }
  };

  ScrollbarYEntity.prototype.needRender = function () {
    return this.root.grid.service.getLeftAvailableHeight() > 0;
  };

  ScrollbarYEntity.prototype.renderBackground = function () {
    if (!this.needRender()) return;
    var ctx = this.root.ctx;
    ctx.fillStyle = '#eee';
    ctx.fillRect(this.left, this.top, this.width, this.backgroundLineHeight);
  };

  ScrollbarYEntity.prototype.renderLine = function () {
    if (!this.needRender()) return;
    var ctx = this.root.ctx;

    var _a = this.getLineYAndHeight(),
        y = _a.y,
        height = _a.height;

    canvas_1.roundRect(ctx, this.left, y + this.top, this.width, height, this.root.api.scrollbarYLineRadius, this.root.api.scrollbarYLineBackground);
    this.root.ctx.fillStyle = this.root.api.scrollbarYLineBackground;
  };

  ScrollbarYEntity.prototype.getLineYAndHeight = function () {
    var fullHeight = this.root.grid.service.getFullAvailableHeight();
    var y = this.root.view.offsetY / fullHeight * this.backgroundLineHeight;
    var height = this.backgroundLineHeight / fullHeight * this.backgroundLineHeight;
    return {
      y: y,
      height: height
    };
  };

  ScrollbarYEntity.prototype.render = function () {
    this.renderBackground();
    this.renderLine();
  };

  return ScrollbarYEntity;
}();

exports.ScrollbarYEntity = ScrollbarYEntity;
},{"../../utils/canvas":"../src/utils/canvas.ts"}],"../src/utils/animate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timing = exports.animate = void 0;

function animate(options) {
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1; // текущее состояние анимации

    var progress = options.timing(timeFraction);
    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

exports.animate = animate;
exports.timing = makeEaseOut(circle);

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

function circle(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}
},{}],"../src/root/root.view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootView = void 0;

var scrollbar_x_entity_1 = require("./entities/scrollbar-x.entity");

var scrollbar_y_entity_1 = require("./entities/scrollbar-y.entity");

var animate_1 = require("../utils/animate");

var RootView = function () {
  function RootView(root) {
    this.offsetX = 0;
    this.offsetY = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.root = root;
    this.updateCanvasSizeAndRender = this.updateCanvasSizeAndRender.bind(this);
    this.updateCanvasSize();
    this.attachEvents();
    this.scrollbarX = new scrollbar_x_entity_1.ScrollbarXEntity(root);
    this.scrollbarY = new scrollbar_y_entity_1.ScrollbarYEntity(root);
  }

  RootView.prototype.destroy = function () {
    this.destroyEvents();
  };

  RootView.prototype.render = function () {
    var _a = this.root.canvas,
        width = _a.width,
        height = _a.height;
    this.root.ctx.clearRect(0, 0, width, height);
    this.root.ctx.fillStyle = '#ffffff';
    this.root.ctx.rect(0, 0, width, height);
    this.root.ctx.fill();
    this.root.grid.view.renderGrid();
    this.root.tasks.view.render();
    this.scrollbarX.render();
    this.scrollbarY.render();
    this.root.grid.view.renderHeader();
  };

  RootView.prototype.attachEvents = function () {
    window.addEventListener('resize', this.updateCanvasSizeAndRender.bind(this));
  };

  RootView.prototype.destroyEvents = function () {
    window.removeEventListener('resize', this.updateCanvasSizeAndRender.bind(this));
  };

  RootView.prototype.updateCanvasSizeAndRender = function () {
    this.updateCanvasSize();
    this.root.render();
  };

  RootView.prototype.updateCanvasSize = function () {
    this.root.canvas.width = this.root.root.offsetWidth;
    this.root.canvas.height = this.root.root.offsetHeight;
  };

  RootView.prototype.handleChangeOffsetX = function (difference, needRender) {
    if (difference === void 0) {
      difference = 10;
    }

    if (needRender === void 0) {
      needRender = true;
    }

    this.offsetX += difference;
    if (this.offsetX < 0) this.offsetX = 0;
    this.root.grid.service.validateOffsetX();
    if (needRender) this.render();
  };

  RootView.prototype.handleSetOffsetX = function (offsetX, needRender, needAnimate) {
    var _this = this;

    if (offsetX === void 0) {
      offsetX = 0;
    }

    if (needRender === void 0) {
      needRender = true;
    }

    if (needAnimate === void 0) {
      needAnimate = false;
    }

    if (needAnimate) {
      var initialOffset_1 = this.offsetX;
      var diff_1 = offsetX - initialOffset_1;
      var positiveDiff = diff_1 > 0 ? diff_1 : diff_1 * -1;
      var duration = positiveDiff / this.root.grid.service.getFullAvailableWidth() * 1500;
      animate_1.animate({
        duration: duration,
        timing: animate_1.timing,
        draw: function draw(progress) {
          _this.offsetX = initialOffset_1 + diff_1 * progress;
          if (_this.offsetX < 0) _this.offsetX = 0;
          if (progress === 1 || diff_1 > 0) _this.root.grid.service.validateOffsetX();

          _this.render();
        }
      });
    } else {
      this.offsetX = offsetX;
      if (this.offsetX < 0) this.offsetX = 0;
      this.root.grid.service.validateOffsetX();
      if (needRender) this.render();
    }
  };

  RootView.prototype.handleSetOffsetY = function (offsetY, needRender, needAnimate) {
    var _this = this;

    if (offsetY === void 0) {
      offsetY = 0;
    }

    if (needRender === void 0) {
      needRender = true;
    }

    if (needAnimate === void 0) {
      needAnimate = false;
    }

    if (needAnimate) {
      var initialOffset_2 = this.offsetY;
      var diff_2 = offsetY - initialOffset_2;
      var positiveDiff = diff_2 > 0 ? diff_2 : diff_2 * -1;
      var duration = positiveDiff / this.root.grid.service.getFullAvailableHeight() * 1500;
      animate_1.animate({
        duration: duration,
        timing: animate_1.timing,
        draw: function draw(progress) {
          _this.offsetY = initialOffset_2 + diff_2 * progress;
          if (_this.offsetY < 0) _this.offsetY = 0;

          _this.render();
        }
      });
    } else {
      this.offsetY = offsetY;
      if (this.offsetY < 0) this.offsetY = 0;
      if (needRender) this.render();
    }
  };

  RootView.prototype.setCursor = function (cursor) {
    this.root.root.style.cursor = cursor;
  };

  return RootView;
}();

exports.RootView = RootView;
},{"./entities/scrollbar-x.entity":"../src/root/entities/scrollbar-x.entity.ts","./entities/scrollbar-y.entity":"../src/root/entities/scrollbar-y.entity.ts","../utils/animate":"../src/utils/animate.ts"}],"../src/utils/base.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = void 0;

function debounce(f, ms) {
  var isCooldown = false;
  return function () {
    if (isCooldown) return; // @ts-ignore

    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(function () {
      return isCooldown = false;
    }, ms);
  };
}

exports.debounce = debounce;
},{}],"../src/root/root.controller.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootController = void 0;

var base_1 = require("../utils/base");

var RootController = function () {
  function RootController(root) {
    this.events = {};
    this.touchOffsetX = null;
    this.touchOffsetY = null;
    this.root = root;
    this.attachEvents();
  }

  RootController.prototype.attachEvents = function () {
    this.handleMouseMove = base_1.debounce(this.handleMouseMove.bind(this), 32);
    this.handleTouchMove = base_1.debounce(this.handleTouchMove.bind(this), 32);
    this.root.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.root.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.root.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.root.canvas.addEventListener('click', this.handleClick.bind(this));
    this.root.canvas.addEventListener('wheel', this.handleScroll.bind(this));
    this.root.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.root.canvas.addEventListener('touchmove', this.handleTouchMove);
    this.root.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
  };

  RootController.prototype.destroyEvents = function () {
    this.root.canvas.removeEventListener('mousemove', this.handleMouseMove);
  };

  RootController.prototype.on = function (event, callback) {
    var _this = this;

    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return function () {
      _this.events[event] = _this.events[event].filter(function (cb) {
        return cb !== callback;
      });
    };
  };

  RootController.prototype.handleMouseMove = function (event) {
    if (!this.events.mousemove) return;
    this.events.mousemove.every(function (cb) {
      // @ts-ignore
      if (event._stopPropagation) return false;
      cb(event);
      return true;
    });
  };

  RootController.prototype.handleMouseDown = function (event) {
    if (!this.events.mousedown) return;
    this.events.mousedown.every(function (cb) {
      // @ts-ignore
      if (event._stopPropagation) return false;
      cb(event);
      return true;
    });
  };

  RootController.prototype.handleMouseUp = function (event) {
    if (!this.events.mouseup) return;
    this.events.mouseup.every(function (cb) {
      // @ts-ignore
      if (event._stopPropagation) return false;
      cb(event);
      return true;
    });
  };

  RootController.prototype.handleClick = function (event) {
    if (!this.events.click) return;
    this.events.click.forEach(function (cb) {
      return cb(event);
    });
  };

  RootController.prototype.handleScroll = function (event) {
    if (event.shiftKey) {
      var offsetX = this.root.view.offsetX + event.deltaY;
      if (offsetX < 0) offsetX = 0;
      this.root.view.handleSetOffsetX(offsetX);
    } else {
      var offsetY = this.root.view.offsetY + event.deltaY;
      var maxHeight = this.root.grid.service.getLeftAvailableHeight();
      if (offsetY < 0) offsetY = 0;else if (offsetY > maxHeight) offsetY = maxHeight;
      this.root.view.handleSetOffsetY(offsetY);
    }
  };

  RootController.prototype.handleTouchStart = function (event) {
    var _a, _b;

    event.preventDefault();
    var offsetX = (_a = event.touches[0]) === null || _a === void 0 ? void 0 : _a.screenX;
    var offsetY = (_b = event.touches[0]) === null || _b === void 0 ? void 0 : _b.screenY;
    if (offsetX) this.touchOffsetX = offsetX;
    if (offsetY) this.touchOffsetY = offsetY;
  };

  RootController.prototype.handleTouchMove = function (event) {
    var _a, _b;

    event.preventDefault();
    var offsetX = (_a = event.changedTouches[0]) === null || _a === void 0 ? void 0 : _a.screenX;
    var offsetY = (_b = event.changedTouches[0]) === null || _b === void 0 ? void 0 : _b.screenY;

    if (offsetX && this.touchOffsetX !== null) {
      var diff = this.touchOffsetX - offsetX;
      var offset = this.root.view.offsetX + diff;
      this.root.view.handleSetOffsetX(offset);
      this.touchOffsetX = offsetX;
    }

    if (offsetY && this.touchOffsetY !== null) {
      var diff = this.touchOffsetY - offsetY;
      var offset = this.root.view.offsetY + diff;
      this.root.view.handleSetOffsetY(offset);
      this.touchOffsetY = offsetY;
    }
  };

  RootController.prototype.handleTouchEnd = function (event) {
    if (!this.events.touchend) return;
    this.events.touchend.every(function (cb) {
      // @ts-ignore
      if (event._stopPropagation) return false;
      cb(event);
      return true;
    });
    event.preventDefault();
    this.touchOffsetX = null;
    this.touchOffsetY = null;
  };

  RootController.prototype.stopPropagation = function (event) {
    // @ts-ignore
    event._stopPropagation = true;
  };

  return RootController;
}();

exports.RootController = RootController;
},{"../utils/base":"../src/utils/base.ts"}],"../src/root/root.module.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootModule = exports.RootApiProps = void 0;

var grid_module_1 = require("../grid/grid.module");

var tasks_module_1 = require("../tasks/tasks.module");

var root_api_1 = require("./root.api");

var root_view_1 = require("./root.view");

var root_controller_1 = require("./root.controller");

var root_api_2 = require("./root.api");

Object.defineProperty(exports, "RootApiProps", {
  enumerable: true,
  get: function get() {
    return root_api_2.RootApiProps;
  }
});

var RootModule = function () {
  function RootModule(el, props) {
    var elem = document.querySelector(el);
    if (!elem) throw new Error('Root element doesn\'t found');
    this.root = elem;
    this.canvas = document.createElement('canvas');
    this.root.append(this.canvas);
    var ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context doesn\'t gotten');
    this.ctx = ctx;
    this.api = new root_api_1.RootApi(this, props);
    this.controller = new root_controller_1.RootController(this);
    this.view = new root_view_1.RootView(this);
    this.grid = new grid_module_1.GridModule(this);
    this.tasks = new tasks_module_1.TasksModule(this);
    this.init();
  }

  RootModule.prototype.init = function () {
    this.grid.init();
    this.tasks.init();
    this.render();
  };

  RootModule.prototype.render = function () {
    this.view.render();
  };

  return RootModule;
}();

exports.RootModule = RootModule;
},{"../grid/grid.module":"../src/grid/grid.module.ts","../tasks/tasks.module":"../src/tasks/tasks.module.ts","./root.api":"../src/root/root.api.ts","./root.view":"../src/root/root.view.ts","./root.controller":"../src/root/root.controller.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var root_module_1 = require("./root/root.module");

var Gantt = function () {
  function Gantt(el, props) {
    this.root = new root_module_1.RootModule(el, props);
  }

  return Gantt;
}();

exports.default = Gantt;
},{"./root/root.module":"../src/root/root.module.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var src_1 = __importDefault(require("../src"));

var tasks = [{
  id: 'task1',
  title: 'Very Very long Task 1',
  start_date_ts: 1627670084597,
  end_date_ts: 1627680084597,
  all_day: true,
  next_ids: ['task2', 'task3'],
  background: 'orange',
  backgroundHover: 'blue',
  color: 'black',
  colorHover: 'green'
}, {
  id: 'task2',
  title: 'Task 2',
  start_date_ts: 1627904121049,
  end_date_ts: 1628163321049,
  next_ids: ['task3'],
  background: 'pink'
}, {
  id: 'task3',
  title: 'Task 3',
  start_date_ts: 1628004121049,
  end_date_ts: 1628763321049,
  next_ids: [],
  background: 'red',
  color: 'green'
}, {
  id: 'task4',
  title: 'Task 4',
  all_day: true,
  start_date_ts: 1627670084597,
  end_date_ts: 1628163321049,
  next_ids: []
}, {
  id: 'task5',
  title: 'Task 5',
  start_date_ts: 1628163321049,
  end_date_ts: 1628163321049,
  all_day: true,
  next_ids: ['task4']
}, {
  id: 'task6',
  title: 'Task 6',
  start_date_ts: 1628163321049,
  end_date_ts: 1628163321049,
  next_ids: []
}]; // 1577912400000
// 1609448400000
// 1640984400000
// 1704056400000
// 1735592400000

var getStartDateTs = function getStartDateTs(min, max) {
  if (min === void 0) {
    min = 1609448400000;
  }

  if (max === void 0) {
    max = 1640984400000;
  }

  var diff = max - min;
  var random = Math.floor(Math.random() * diff);
  return min + random;
};

var getNextIds = function getNextIds(tasks, end_date_ts) {
  var count = Math.floor(Math.random() * 3);
  var data = [];
  if (count === 0) return data;
  var filteredTasks = tasks.filter(function (task) {
    return task.end_date_ts >= end_date_ts;
  });
  if (filteredTasks.length === 0) return data;

  do {
    var randomIndex = Math.floor(Math.random() * (filteredTasks.length - 1));
    data.push(filteredTasks[randomIndex].id);
    count--;
  } while (count > 0);

  return data;
};

function getTasks() {
  var tasks = [];

  for (var i = 0; i <= 50; i++) {
    var start_date_ts = getStartDateTs();
    var end_date_ts = start_date_ts + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000;
    var task = {
      id: "task_" + i,
      title: "Task " + i,
      start_date_ts: start_date_ts,
      end_date_ts: end_date_ts,
      all_day: Math.random() >= 0.5,
      next_ids: getNextIds(tasks, end_date_ts)
    };
    tasks.push(task);
  }

  return tasks;
}

new src_1.default('#app', {
  tasks: tasks,
  // tasks: getTasks().sort((a, b) => a.start_date_ts - b.start_date_ts),
  // tasks: getTasks(),
  handleChange: function handleChange(tasks) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        console.log(tasks);
        return [2
        /*return*/
        ];
      });
    });
  },
  handleTaskClick: function handleTaskClick(task) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        console.log('handleTaskClick', task);
        return [2
        /*return*/
        ];
      });
    });
  }
});
},{"../src":"../src/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64714" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/example.77de5100.js.map