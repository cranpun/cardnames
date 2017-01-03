/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var CardRows_1 = __webpack_require__(2);
	window.addEventListener("load", main, false);
	function main() {
	    var tbody = document.getElementById("cardtbody");
	    var cards = __webpack_require__(3);
	    var rows = new CardRows_1.CardRows(tbody, cards);
	    rows.makeRows();
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var CardRows = (function () {
	    function CardRows(tbody, cards) {
	        this.tbody_ = tbody;
	        this.cards_ = cards;
	    }
	    CardRows.prototype.makeRows = function () {
	        var i;
	        for (i = 0; i < this.cards_.length; i++) {
	            var tr = this.makeRow_(this.cards_[i]);
	            this.tbody_.appendChild(tr);
	        }
	        console.log(this.cards_);
	    };
	    CardRows.prototype.makeRow_ = function (card) {
	        var tr = document.createElement("tr");
	        var td_file = document.createElement("td");
	        var td_name = document.createElement("td");
	        td_file.innerText = card["filename"];
	        td_name.innerText = this.analyCardName(card["filename"]);
	        tr.appendChild(td_file);
	        tr.appendChild(td_name);
	        return tr;
	    };
	    CardRows.prototype.analyCardName = function (filename) {
	        // MYTODO 画像解析して名前を取得
	        return filename;
	    };
	    return CardRows;
	}());
	exports.CardRows = CardRows;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [
		{
			"filename": "IMG_0004.PNG"
		},
		{
			"filename": "IMG_0005.PNG"
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=cardnames.js.map