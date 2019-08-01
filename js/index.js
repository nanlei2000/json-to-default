"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function getDefault(value) {
    if (value === null) {
        return null;
    }
    if (typeof value === 'string') {
        return '';
    }
    if (typeof value === 'number') {
        return 0;
    }
    if (typeof value === 'boolean') {
        return false;
    }
    return '错误';
}
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function jsonToDefault(json) {
    function loop(json) {
        if (Array.isArray(json)) {
            if (json.length) {
                return [loop(json[0])];
            }
            else {
                return [];
            }
        }
        if (isPlainObject(json)) {
            return Object.keys(json).reduce(function (prev, key) {
                var _a;
                return __assign({}, prev, (_a = {}, _a[key] = loop(json[key]), _a));
            }, {});
        }
        return getDefault(json);
    }
    return JSON.stringify(loop(json), null, 2);
}
document.getElementById('src').addEventListener('input', function (e) {
    var value = (e.target.value + '').trim();
    if (!value) {
        document.getElementById('output').value = '';
        return;
    }
    try {
        document.getElementById('output').value = jsonToDefault(JSON.parse(value));
    }
    catch (error) {
        document.getElementById('output').value = error;
    }
});
