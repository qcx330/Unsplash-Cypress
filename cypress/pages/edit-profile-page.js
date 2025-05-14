import Element from "../core/element";
import BasePage from "./base-page";

class EditProfilePage extends BasePage{
    _txtUsername = new Element("//label[.='Username']/following-sibling::input");
    _btnUpdate = new Element("input[value='Update account']");

    updateUsername(value){
        this._txtUsername.clear();
        this._txtUsername.type(value);
        this._btnUpdate.click();
    }
}

export default EditProfilePage;