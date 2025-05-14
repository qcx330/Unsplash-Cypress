import Request from "../core/request";
const accountData = require('../fixtures/account/account.json');
const apiUrl = Cypress.env("apiUrl");

class PhotoService{
    authHeaders = { Authorization: `Bearer ${accountData.token}` };

    unlike(id){
        return Request.delete(`${apiUrl}/photos/${id}/like`, this.authHeaders).then((response)=>{
            if (response.status === 200) {
                cy.log("Photo unliked successfully");
            } else {
                cy.log('Failed to unlike photo:', response.status, response.statusText);
                throw new Error('Failed to unlike photo');
            }
        })
    }

    getRandom(count){
        return Request.get(`${apiUrl}/photos/random?count=${count}`, this.authHeaders).then((response)=>{
            if (response.status === 200) {
                return Cypress._.map(response.body, 'id');
            } else {
                throw new Error('Failed to unlike photo: ', response.status, response.statusText);
            }
        })
    }
}

export default PhotoService;