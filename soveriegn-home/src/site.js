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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Michael_jpg_1 = __importDefault(require("./Michael.jpg"));
require("./site.css");
var react_router_dom_1 = require("react-router-dom");
var site = function () {
    document.body.style.backgroundColor = "#CAFBFC";
    //TODO
    //document.textAlign = "center";
    return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsxs("div", __assign({ id: "text-box", className: "title" }, { children: ["Hello ", jsx_runtime_1.jsx("br", {}, void 0), " My name is Michael Christopher Scantlebury"] }), void 0), jsx_runtime_1.jsx("img", { src: Michael_jpg_1.default, className: "michael", style: { alignSelf: "center" } }, void 0), jsx_runtime_1.jsx("div", __assign({ id: "text-box", className: "intro" }, { children: "To learn more about me (that is if you want to, not to trying to pear pressure you or anything...). Please check out the links below" }), void 0), jsx_runtime_1.jsx(react_router_dom_1.Link, __assign({ to: "/gamer", className: "gameLink" }, { children: "My Gamer Tag" }), void 0)] }, void 0));
};
exports.default = site;
