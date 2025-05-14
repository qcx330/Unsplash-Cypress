import BasePage from "./base-page";
import Element from "../core/element";

class CollectionPage extends BasePage {
    _lblNumberOfImages = new Element("//span[contains(text(),'image')]");

    _btnAddImageToCollection = new Element('//header//button[contains(@title,"Add this image to a collection")]')

    _btnSelectCollection(collectionTitle) {
        return new Element(`//span[text()='${collectionTitle}']//ancestor::button`)
    }

    _svgPlusSign(collectionTitle){
        return new Element(`//span[text()='${collectionTitle}']//ancestor::h4//preceding-sibling::div//*[text()='A plus sign']`)
    }

    _altImage(position) {
        return new Element(`figure[data-masonryposition='${position}'] img[alt]`).getAttribute("alt");
    }

    getCurrentNumberOfPhotos() {
        return this._lblNumberOfImages.getText().then((text) => {
            return parseInt(text.match(/\d+/)[0], 10);
        });
    }

    _imgPhoto(position) { 
        return new Element(`//figure[@data-masonryposition='${position}']//img[@alt and not(contains(@alt,'Go to') or contains(@alt,'Avatar'))]`); 
    }

    getImageByAlt(alt) {
        return new Element(`img[alt="${alt}"]`);
    }

    removePhotoFromCollection(collectionName, position) {
        var altImage = this._altImage(position);
        this._imgPhoto(position).click();
        this._btnAddImageToCollection.click();
        this._btnSelectCollection(collectionName).click();
        this._svgPlusSign(collectionName).waitForElementToExist();
        return altImage;
    }

    isPhotoNotExist(alt) {
        return this.getImageByAlt(alt).isNotExist();
    }

    goToCollectionbyId(id) {
        this.visit(`/collections/${id}`);
    }
}

export default CollectionPage