"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysInMonth = exports.getDateWithSet = exports.setDate = exports.getDate = void 0;
var getDate = function (ts, end) {
    if (end === void 0) { end = false; }
    var date = ts ? new Date(ts) : new Date();
    if (end)
        date.setHours(23, 59, 59);
    else
        date.setHours(0, 0, 0, 0);
    return date;
};
exports.getDate = getDate;
var setDate = function (date, diff) {
    date.setDate(date.getDate() + diff);
};
exports.setDate = setDate;
var getDateWithSet = function (ts, diff) {
    if (diff === void 0) { diff = 0; }
    var date = exports.getDate(ts);
    if (diff !== 0)
        exports.setDate(date, diff);
    return date;
};
exports.getDateWithSet = getDateWithSet;
var getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};
exports.getDaysInMonth = getDaysInMonth;
