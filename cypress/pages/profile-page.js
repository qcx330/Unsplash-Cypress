import BasePage from "./base-page";
import Element from "../core/element";

class ProfilePage extends BasePage {
    _btnMoreActions = new Element("//div[@data-testid='users-route']//button[@title='More Actions']");
    _btnFollow = new Element("button[role='menuitem']")
    _btnEditProfile = new Element("//a[contains(text(),'Edit profile')]");

    _crdCollection(collectionName){
        return new Element(`//div[@data-testid='users-collections-route']//div[text()='${collectionName}']`);
    }

    _tab(tabName){
        return new Element(`//a[contains(text(), '${tabName}')]`)
    }

    _lblFullName(fullname){
        return new Element(`//div[contains(text(), '${fullname}')]`);
    }

    clickMoreActionButton() {
        this._btnMoreActions.scrollIntoView();
        this._btnMoreActions.getAttribute("aria-expanded").then((state) => {
            if (state == "false") {
                this._btnMoreActions.forceClick();
            }
        });

    }

    followUser() {
        this.clickMoreActionButton();
        this._btnFollow.forceClick();
    }

    isFollowed() {
        this.reload();
        this.clickMoreActionButton();
        return this._btnFollow.getText().then((text) => text.includes("Unfollow"));
    }

    unfollowUser() {
        this.clickMoreActionButton();
        this.isFollowed().then((followed) => {
            if (followed) {
                this._btnFollow.click();
            }
        });
    }

    goToEditProfile() {
        this._btnEditProfile.click();
    }

    isFullNameCorrect(fullname) {
        return (this._lblFullName(fullname).isVisible())
    }

    isPhotoLiked(likedPhotos) {
        this._tab('Likes').click();

        return cy.wrap(null).then(() => {
            let allVisible = true;
            return Cypress.Promise.all(
                likedPhotos.map(altText => {
                    return cy.get(`img[alt="${altText}"]`).should('be.visible')
                        .then(() => true);
                        // .catch(() => {
                        //     allVisible = false;
                        //     return false;
                        // });
                })
            ).then(() => allVisible);
        });
    }

    openCollentionTab(){
        this._tab('Collections').click();        
    }

    openCollectionWithName(name){
        this.openCollentionTab();
        
        this._crdCollection(name).click();
    }
}

export default ProfilePage