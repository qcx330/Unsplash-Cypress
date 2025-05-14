import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import PhotoPage from '../pages/photo-page';
import ProfilePage from '../pages/profile-page';

const accountData = require('../fixtures/account/account.json');

describe('follow a photoghrapher successfully', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const photoPage = new PhotoPage();
  const profilePage = new ProfilePage();

  before(() => {
    homePage.visit("/");

    loginPage.login(accountData.email, accountData.password);
  })
  it('passes', () => {
      homePage.clickImage(1);

      photoPage.goToPhotographerProfile();
      
      profilePage.followUser();

      profilePage.isFollowed().should('be.true')
  })

  after(()=>{
    profilePage.unfollowUser();
  })
})