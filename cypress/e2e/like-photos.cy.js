import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import ProfilePage from '../pages/profile-page';
import UserService from '../service/user-service';
import PhotoService from '../service/photo-service';

const accountData = require('../fixtures/account/account.json');

describe('Like photos successfully', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const userService = new UserService();
  const photoService = new PhotoService();

  before(() => {
    homePage.visit("/");
  
    loginPage.login(accountData.email, accountData.password);
  })
  it('passes', () => {
    const likedPhotos = homePage.likeRandomPhotos(3);

    homePage.viewUserProfile();

    profilePage.isPhotoLiked(likedPhotos).should('be.true');
  })

  after(()=>{
    userService.getLikedPhotos().then((photoIDs) =>{
      if (Array.isArray(photoIDs)) {
        photoIDs.forEach((id) => {
          photoService.unlike(id);
        });
      } else {
        cy.log("photoIDs is not an array:", photoIDs);
      }
    });
  })
})