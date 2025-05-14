import Element from "../core/element";
import BasePage from "./base-page";
import Utils from "../Utils/utils"

class HomePage extends BasePage {

    _btnLikeImage(position) {
        return new Element(`figure[data-masonryposition='${position}'] button[title='Like this image']`);
    }

    _img(position) {
        return new Element(`figure[data-masonryposition='${position}']`);
    }

    _altImage(position) {
        return new Element(`figure[data-masonryposition='${position}'] img[alt]`).getAttribute("alt");
    }

    _imgFreePhotos = new Element("//a[@title='Download this image']//ancestor::figure")

    _imgFreePhoto(randomNumber) {
        return new Element(`(//a[@title='Download this image']//ancestor::figure)[${randomNumber}]`)
    }

    likeRandomPhotos(count) {
        const likedPhotos = [];
        const usedPositions = [];
        for (let i = 0; i < count; i++) {
            let position;
            do {
                position = Utils.getRandomInt(1, 20);
            } while (usedPositions.includes(position));

            usedPositions.push(position);
            this._img(position.toString()).hover();
            this._btnLikeImage(position.toString()).forceClick();
            this._altImage(position.toString()).then((altText)=>{
                if (altText) {
                    likedPhotos.push(altText);
                }
            });
        }
        return likedPhotos;
    }

    clickImage(position) {
        this._img(position).click();
    }

    openRandomFreePhoto() {
        this._imgFreePhotos.getElementCount().then((count) => {
            const randomNumber = Utils.getRandomNumber(0, count - 1);
            this._imgFreePhoto(randomNumber).scrollIntoView();
            this._imgFreePhoto(randomNumber).click();
            // this._imgFreePhotos.eq(randomNumber).click();
        });
    }
}

export default HomePage;