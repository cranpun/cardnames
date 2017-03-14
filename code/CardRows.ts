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
        console.log("s : " + card["filename"]);
        let tr = document.createElement("tr");
        let td_file = document.createElement("td");
        let td_name = document.createElement("td");
        td_file.innerHTML = this.makeCardNo_(card["filename"]);
        let nameid = this.analyCardName(card["filename"]);
        td_name.id = nameid;
        td_name.innerText = "分析中...";
        tr.appendChild(td_file);
        tr.appendChild(td_name);
        return tr;
    }

    makeImgPath_(filename: string) {
        //return "./data/" + filename;
        return "./_cards/" + filename;
        //return "./_cards_sub/" + filename;
    }

    makeCardNo_(filename: string): string {
        let name = filename.replace("c", "").replace(".jpg", "");
        let path = this.makeImgPath_(filename);
        return "<a target='_blank' href='" + path + "'>" + name + "</a>";
    }

    analyCardName(filename: string): string {
        let id = filename.replace(".", "_");
        let path = this.makeImgPath_(filename);
        let tes = Tesseract.recognize(path,
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
                    if (res.lines[i].confidence > 60) {
                        let y1 = res.lines[i].baseline.y1;
                        if (1800 <= y1 && y1 <= 1900) {
                            //console.log(res.lines[i]);
                            //name += "(" + res.lines[i].confidence + ")";
                            name += "[[[" + res.lines[i].confidence + "]]]:" + res.lines[i].text;
                        }
                    }
                }
                td_name.innerText = name.replace(/\r?\n/g,"");
                console.log(res);
                console.log("e : " + name);
            })
            ;

        return id;
    }
}