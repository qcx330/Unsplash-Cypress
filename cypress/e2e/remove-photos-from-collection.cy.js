import CollectionService from '../service/collection-service';
import PhotoService from '../service/photo-service';
import LoginPage from '../pages/login-page';
import ProfilePage from '../pages/profile-page';
import CollectionPage from '../pages/collection-page';

const collectionData = require('../fixtures/collection/collection.json');
const accountData = require('../fixtures/account/account.json');

describe('remove photo from collection successfully', () => {
  const collectionService = new CollectionService();
  const photoService = new PhotoService();
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const collectionPage = new CollectionPage();
  var collectionId

  before(() => {

    collectionService.create(collectionData).then((Id) => {
      collectionId = Id
      photoService.getRandom(2).then((photoIds) => {
        photoIds.forEach((photo) => {
          collectionService.addPhoto(collectionId, photo);
        })
      })
    })
  })
  it('passes', () => {
    loginPage.visit("/");

    loginPage.login(accountData.email, accountData.password);

    profilePage.viewUserProfile();

    profilePage.openCollectionWithName(collectionData.title);

    collectionPage.getCurrentNumberOfPhotos().should("eq", 2);

    collectionPage.removePhotoFromCollection(collectionData.title,1).then((altImage) => {
      collectionPage.goToCollectionbyId(collectionId)

      collectionPage.getCurrentNumberOfPhotos().should('eq', 1)

      collectionPage.isPhotoNotExist(altImage);
    });
  })

  after(() => {
    collectionService.delete(collectionId);
  })
})