import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import ProfilePage from '../pages/profile-page';
import EditProfilePage from '../pages/edit-profile-page';
import Utils from '../Utils/utils';

const accountData = require('../fixtures/account/account.json');

describe('update the user in the Profile page succcessfully', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const editProfilePage = new EditProfilePage();

  before(() => {
    homePage.visit("/");
  
    loginPage.login(accountData.email, accountData.password);
  })
  it('passes', () => {
    homePage.viewUserProfile();
    
    profilePage.goToEditProfile();

    var username = Utils.generateUsername("quynh");
    editProfilePage.updateUsername(username);

    profilePage.visit(`/@${username}`);

    profilePage.isFullNameCorrect(accountData.fullName);
  })

  after(()=>{
    
  })
})