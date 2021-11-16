"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysInMonth = exports.getDateWithSet = exports.setDateTs = exports.setDate = exports.getDate = void 0;
var setHours = {
    day: function (date, end) {
        if (end === void 0) { end = false; }
        if (end)
            date.setHours(23, 59, 59);
        else
            date.setHours(0, 0, 0, 0);
    },
    halfDay: function (date, end) {
        if (end === void 0) { end = false; }
        if (date.getHours() >= 12) {
            if (end)
                date.setHours(23, 59, 59);
            else
                date.setHours(12, 0, 0, 0);
        }
        else {
            if (end)
                date.setHours(11, 59, 59);
            else
                date.setHours(0, 0, 0, 0);
        }
    },
    quarterDay: function (date, end) {
        if (end === void 0) { end = false; }
        var hours = date.getHours();
        if (hours >= 18) {
            if (end)
                date.setHours(23, 59, 59);
            else
                date.setHours(18, 0, 0, 0);
        }
        else if (hours >= 12) {
            if (end)
                date.setHours(17, 59, 59);
            else
                date.setHours(12, 0, 0, 0);
        }
        else if (hours >= 6) {
            if (end)
                date.setHours(11, 59, 59);
            else
                date.setHours(6, 0, 0, 0);
        }
        else {
            if (end)
                date.setHours(5, 59, 59);
            else
                date.setHours(0, 0, 0, 0);
        }
    },
    threeHours: function (date, end) {
        if (end === void 0) { end = false; }
        var hours = date.getHours();
        if (hours >= 21) {
            if (end)
                date.setHours(23, 59, 59);
            else
                date.setHours(21, 0, 0, 0);
        }
        else if (hours >= 18) {
            if (end)
                date.setHours(20, 59, 59);
            else
                date.setHours(18, 0, 0, 0);
        }
        else if (hours >= 15) {
            if (end)
                date.setHours(17, 59, 59);
            else
                date.setHours(15, 0, 0, 0);
        }
        else if (hours >= 12) {
            if (end)
                date.setHours(14, 59, 59);
            else
                date.setHours(12, 0, 0, 0);
        }
        else if (hours >= 9) {
            if (end)
                date.setHours(11, 59, 59);
            else
                date.setHours(9, 0, 0, 0);
        }
        else if (hours >= 6) {
            if (end)
                date.setHours(8, 59, 59);
            else
                date.setHours(6, 0, 0, 0);
        }
        else if (hours >= 3) {
            if (end)
                date.setHours(5, 59, 59);
            else
                date.setHours(3, 0, 0, 0);
        }
        else {
            if (end)
                date.setHours(2, 59, 59);
            else
                date.setHours(0, 0, 0, 0);
        }
    },
    hour: function (date, end) {
        if (end === void 0) { end = false; }
        var hours = date.getHours();
        if (end)
            date.setHours(hours, 59, 59);
        else
            date.setHours(hours, 0, 0, 0);
    },
};
var getDate = function (ts, end, dayType) {
    if (end === void 0) { end = false; }
    if (dayType === void 0) { dayType = 'day'; }
    var date = ts ? new Date(ts) : new Date();
    if (dayType)
        setHours[dayType](date, end);
    return date;
};
exports.getDate = getDate;
var setDate = function (date, diff) {
    date.setDate(date.getDate() + diff);
};
exports.setDate = setDate;
var setDateTs = function (date, diff) {
    return new Date(date.getTime() + diff);
};
exports.setDateTs = setDateTs;
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
