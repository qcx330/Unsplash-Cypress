import Element from "../core/element";
import BasePage from "./base-page";
const pathConstants = require('../fixtures/path-constant.json');

class LoginPage extends BasePage{
    _txtEmail = new Element("input[name='email']");
    _txtPassword = new Element("input[name='password']");
    _btnLogin = new Element("button[value='Login']");
    
    enterEmail(email){
        this._txtEmail.type(email);
    }

    enterPassword(password){
        this._txtPassword.type(password);
    }

    clickLogin(){
        this._btnLogin.click();
    }


    login(email, password){
        this.visit(pathConstants.loginPath)
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLogin();
    }
}

export default LoginPage;