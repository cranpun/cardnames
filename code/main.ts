import { CardRows } from "./CardRows";

window.addEventListener("load", main, false);

function main() {
    //let cards :[{ [key: string]: string }] = [{"filename": "hoge.jpg"}, {"filename": "hogehoge"}];
    let cards: [{ [key: string]: string }] = require("../data/cards.json");
    let tbody: HTMLElement = document.getElementById("cardtbody");
    let rows = new CardRows(tbody, cards);

    rows.makeRows();
}