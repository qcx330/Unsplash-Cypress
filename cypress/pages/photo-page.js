import BasePage from "./base-page";
import Element from "../core/element";

class PhotoPage extends BasePage {
    _imgAvatarHeader = new Element("//header//img[contains(@alt,'Go to')]");
    _btnDownload = new Element("//button[@aria-label='Choose your download size']/preceding-sibling::a");

    goToPhotographerProfile() {
        this._imgAvatarHeader.click();
    }

    downloadPhoto() {
        this._btnDownload.click();
    }

    getPhotoIdFromUrl() {
        cy.url().then((currentUrl) => {
            return currentUrl.slice(-11);
        });
    }

    getAuthorName() {
        return this._imgAvatarHeader.getAttribute('alt').then((text) => text.match(/Go to (.+?)'s profile/)[1]);
    }
}

export default PhotoPage