import { CardRows } from "./CardRows";

window.addEventListener("load", main, false);

let rows: CardRows;
let bt_start: HTMLElement;

function main() {
    bt_start = document.getElementById("bt_start");
	bt_start.addEventListener("click", startAnaly, false);

    //let cards :[{ [key: string]: string }] = [{"filename": "hoge.jpg"}, {"filename": "hogehoge"}];
    let cards: [{ [key: string]: string }] = require("../data/cards.json");
    let tbody: HTMLElement = document.getElementById("cardtbody");
    rows = new CardRows(tbody, cards);

    rows.makeRows();
}

function startAnaly() {
    bt_start.innerText = "分析中...";
    rows.analyRows();
}