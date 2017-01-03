export class CardRows {
    private tbody_: HTMLElement;
    private cards_: [{[key: string]: string}];
    constructor(tbody: HTMLElement, cards: [{[key: string]: string}]) {
        this.tbody_ = tbody;
        this.cards_ = cards;
    }
    makeRows(): void {
        let i : number;
        for(i = 0; i < this.cards_.length; i++) {
            let tr = this.makeRow_(this.cards_[i]);
            this.tbody_.appendChild(tr);
        }
        console.log(this.cards_);
    }

    makeRow_(card : {[key: string]: string}): Node {
        let tr = document.createElement("tr");
        let td_file = document.createElement("td");
        let td_name = document.createElement("td");
        td_file.innerText = card["filename"];
        td_name.innerText = this.analyCardName(card["filename"]);
        tr.appendChild(td_file);
        tr.appendChild(td_name);
        return tr;
    }

    analyCardName(filename: string): string {
        // MYTODO 画像解析して名前を取得
        return filename;
    }
}