import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import PhotoPage from '../pages/photo-page';

const accountData = require('../fixtures/account/account.json');

describe('Download photo successfully', () => {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    const photoPage = new PhotoPage();

    before(() => {

    })
    it('passes', () => {

        var fileName

        loginPage.visit("/");

        loginPage.login(accountData.email, accountData.password);

        homePage.openRandomFreePhoto();

        cy.wrap(null).then(() => {
            return photoPage.getPhotoIdFromUrl();
        }).then((id) => {
            return photoPage.getAuthorName().then((name) => {
                const authorName = name.toLowerCase().replace(/[^\w]+/g, "-");
                cy.log(authorName);
                const photoId = id;
                cy.log(photoId);
                fileName = `${authorName}-${photoId}-unsplash.jpg`;
            });
        }).then(() => {
            photoPage.downloadPhoto();
            cy.readFile(`cypress/downloads/${fileName}`).should("exist");
        });
    })

    after(() => {
        cy.task("clearDownloads");
    })
})