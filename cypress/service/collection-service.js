import Request from "../core/request";
const apiUrl = Cypress.env("apiUrl");
const accountData = require('../fixtures/account/account.json');

class CollectionService {
    authHeaders = { Authorization: `Bearer ${accountData.token}` };

    create(collectionData) {
        return Request.post(`${apiUrl}/collections`, 
            collectionData, 
            this.authHeaders).then((response) => {
            if (response.status === 201) {
                return response.body.id;
            } else {
                throw new Error('Failed to create collection: ', response.status, response.statusText);
            }
        })
    }

    addPhoto(collectionId, photoId) {
        return Request.post(`${apiUrl}/collections/${collectionId}/add`, 
            {
            photo_id: photoId
            }, 
            this.authHeaders).then((response) => {
            if (response.status === 201) {
                return response.body;
            } else {
                throw new Error('Failed to add to collection: ', response.status, response.statusText);
            }
        })
    }

    delete(id){
        return Request.delete(`${apiUrl}/collections/${id}`, 
            this.authHeaders).then((response) => {
            if (response.status === 204) {
                return response.body;
            } else {
                throw new Error('Failed to add to collection: ', response.status, response.statusText);
            }
        })
    }
}

export default CollectionService;