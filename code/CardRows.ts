import * as Tesseract from "tesseract.js";
import * as path from "path";

export class CardRows {
    private tbody_: HTMLElement;
    private cards_: [{ [key: string]: string }];
    private 

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

    analyRows(): void {
        let i: number;
        for (i = 0; i < this.cards_.length; i++) {
            this.analyCardName(this.cards_[i]["filename"]);
        }
    }

    makeRow_(card: { [key: string]: string }): Node {
        console.log("s : " + card["filename"]);
        let tr = document.createElement("tr");
        let td_file = document.createElement("td");
        let td_name = document.createElement("td");
        let td_img = document.createElement("td");
        td_file.innerHTML = this.makeCardNo_(card["filename"]);
        td_img.innerHTML = this.makeCardImg_(card["filename"]);
        let nameid = this.getId_(card["filename"]);
        td_name.id = nameid;
        td_name.innerText = "ready...";
        tr.appendChild(td_img);
        tr.appendChild(td_file);
        tr.appendChild(td_name);
        return tr;
    }

    makeImgPath_(filename: string) {
        //return "./data/" + filename;
        return "./_cards/" + filename;
        //return path.resolve(__dirname, '_cards', filename);
        //return "./_cards_sub/" + filename;
    }

    makeCardNo_(filename: string): string {
        let name = filename.replace("c", "").replace(".jpg", "");
        let path = this.makeImgPath_(filename);
        let id = "img_" + this.getId_(filename);
        let ret = "<a target='_blank' href='" + path + "'>";
        ret += name;
        ret += "</a>";
        return ret;
    }

    makeCardImg_(filename: string): string {
        let path = this.makeImgPath_(filename);
        let id = "img_" + this.getId_(filename);
        let ret = "<img src='" + path + "' id='" + id + "'>";
        return ret;
    }
    
    getId_(filename: string) : string {
        return filename.replace(".", "_");
    }

    analyCardName(filename: string): string {
        let id = this.getId_(filename);
        //let path = this.makeImgPath_(filename);
        let path : HTMLImageElement = <HTMLImageElement>document.getElementById("img_" + id);
        
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