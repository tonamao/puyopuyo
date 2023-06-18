class PuyoImage {

    // static puyoImages;
    // static batankyuImage;
    // static gameOverFrame;

    static initialize() {
        this.puyoImages = [];
        for(let i = 0; i < 5; i++) {
            const image = document.getElementById(`puyo_${i + 1}`);
            image.removeAttribute('id');
            image.width = Config.puyoImgWidth;
            image.height = Config.puyoImgHeight;
            image.style.position = 'absolute';
            this.puyoImages[i] = image;
        }
        if (Config.enableOjamaPuyo) {
            const ojamaImage = document.getElementById('ojama_puyo');
            ojamaImage.removeAttribute('id');
            ojamaImage.width = Config.puyoImgWidth;
            ojamaImage.height = Config.puyoImgHeight;
            ojamaImage.style.position = 'absolute';
            let index = this.puyoImages.length;
            this.puyoImages[Config.ojamaPuyoIndex] = ojamaImage;
        }
        this.batankyuImage = document.getElementById('batankyu');
        this.batankyuImage.width = Config.puyoImgWidth * 6;
        this.batankyuImage.style.position = 'absolute';
    }

    static getPuyo(index) {
        let puyoIdx = index - 1;
        // おじゃまぷよ有りの場合
        if (Config.enableOjamaPuyo) {
            if (index == Config.ojamaPuyoIndex) {
                puyoIdx = Config.ojamaPuyoIndex;
            }
        }
        const image = this.puyoImages[puyoIdx].cloneNode(true);
        return image;
    }

    static prepareBatankyu(frame) {
        this.gameOverFrame = frame;
        Stage.stageElement.appendChild(this.batankyuImage);
        this.batankyuImage.style.top = -this.batankyuImage.height + 'px';
    }

    static batankyu(frame) {
        const ratio = (frame - this.gameOverFrame) / Config.gameOverFrame;
        const x = Math.cos(Math.PI / 2 + ratio * Math.PI * 2 * 10) * Config.puyoImgWidth;
        const y = Math.cos(Math.PI + ratio * Math.PI * 2) * Config.puyoImgHeight * Config.stageRows / 4 + Config.puyoImgHeight * Config.stageRows / 2;
        this.batankyuImage.style.left = x + 'px';
        this.batankyuImage.style.top = y + 'px';
    }
}
