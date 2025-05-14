import Element from "../core/element";

class BasePage{
    
    _btnUserPersonalMenu = new Element("button[title='Your personal menu button']");
    _btnViewProfile = new Element("//a[text()='View profile']//parent::li");
    _btnAccountSettings = new Element("//a[text()='Account settings']//parent::li");

    visit(path) {
        cy.visit(path);
    }

    reload(){
        cy.reload();
    }

    viewUserProfile() {
        this._btnUserPersonalMenu.click();
        this._btnViewProfile.click();
    }

    isUserProfileVisible() {
        return this._btnUserPersonalMenu.isVisible();
    }
}

export default BasePage;