// ==UserScript==
// @name         纽约时报查看更多
// @namespace    https://github.com/gui-ying233/MoreFreeNYT
// @version      1.0.0
// @description  去除纽约时报的订阅提示并显示更多内容（不一定能完全显示）
// @author       鬼影233
// @license      MIT
// @match        https://*.nytimes.com/*
// @exclude      https://*.nytimes.com/
// @icon         https://www.nytimes.com/favicon.ico
// @supportURL   https://github.com/gui-ying233/MoreFreeNYT/issues
// @run-at       document-start
// ==/UserScript==

(() => {
	"use strict";
	if (document.location.pathname === "/") return;
	const originalRemoveChild = Element.prototype.removeChild;
	Element.prototype.removeChild = function (...args) {
		if (
			args[0]?.classList?.contains("StoryBodyCompanionColumn") ||
			(args[0]?.tagName === "P" &&
				args[0].parentElement?.parentElement?.classList.contains(
					"StoryBodyCompanionColumn"
				))
		)
			return args[0];
		return originalRemoveChild.apply(this, args);
	};
	document.head.appendChild(
		Object.assign(document.createElement("style"), {
			textContent: "#gateway-content,div[id^='lire-ui']{display:none;}",
		})
	);
	document.addEventListener(
		"DOMContentLoaded",
		() => {
			document.documentElement.replaceWith(
				document.documentElement.cloneNode(true)
			);
		},
		{ once: true, passive: true }
	);
})();