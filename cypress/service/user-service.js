import Request from "../core/request";
const accountData = require('../fixtures/account/account.json');
const apiUrl = Cypress.env("apiUrl");

class UserService {
    authHeaders = { Authorization: `Bearer ${accountData.token}` };

    getUsername() {
        Request.get(`${apiUrl}/me`, this.authHeaders).then((response) => {
            if (response.status === 200);
                return response.body.username;
        });
    }

    getLikedPhotos() {
        return cy.wrap(null).then(() => {
            return this.getUsername();
        }).then((username) => {
            return Request.get(`${Cypress.env("apiUrl")}/users/${username}/likes`, this.authHeaders);
        }).then((response) => {
            if (response.status === 200) {
                return Cypress._.map(response.body, 'id');
            } else {
                throw new Error(`Failed to fetch user data: ${response.status} - ${response.statusText}`);
            }
        });

    }
}

export default UserService;