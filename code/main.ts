import { CardRows } from "./CardRows";

window.addEventListener("load", main, false);

function main() {
    let tbody: HTMLElement = document.getElementById("cardtbody");
    let cards: [{ [key: string]: string }] = require("json-loader!../data/cards.json");
    let rows = new CardRows(tbody, cards);

    rows.makeRows();
}