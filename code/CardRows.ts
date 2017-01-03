import * as Tesseract from "tesseract.js";

export class CardRows {
    private tbody_: HTMLElement;
    private cards_: [{ [key: string]: string }];
    constructor(tbody: HTMLElement, cards: [{ [key: string]: string }]) {
        this.tbody_ = tbody;
        this.cards_ = cards;
    }
    makeRows(): void {
        let i: number;
        for (i = 0; i < this.cards_.length; i++) {
            let tr = this.makeRow_(this.cards_[i]);
            this.tbody_.appendChild(tr);
        }
    }

    makeRow_(card: { [key: string]: string }): Node {
        let tr = document.createElement("tr");
        let td_file = document.createElement("td");
        let td_name = document.createElement("td");
        td_file.innerText = this.makeCardNo_(card["filename"]);
        let nameid = this.analyCardName(card["filename"]);
        td_name.id = nameid;
        td_name.innerText = "分析中...";
        tr.appendChild(td_file);
        tr.appendChild(td_name);
        return tr;
    }

    makeCardNo_(filename: string): string {
        return filename.replace("c", "").replace(".jpg", "");
    }

    analyCardName(filename: string): string {
        let id = filename.replace(".", "_");

        // MYTODO 画像解析して名前を取得
        let tes = Tesseract.recognize("./data/" + filename,
            {
                lang: "jpn",
                "tessedit_pageseg_mode": 4
            })
            // .progress(function (p) {
            //     console.log(p);
            // })
            .then(function (res) {
                let td_name = document.getElementById(id);
                // カード名はだいたい最後から2番目
                let name = "";
                for (let i = 0; i < res.lines.length; i++) {
                    if (res.lines[i].confidence > 70) {
                        if (res.lines[i].baseline.y1 == 931) {
                            //console.log(res.lines[i]);
                            //name += "(" + res.lines[i].confidence + ")";
                            name += res.lines[i].text;
                        }
                    }
                }
                td_name.innerText = name;
                //console.log(res);
            })
            ;

        return id;
    }
}