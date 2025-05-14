class Request {
    static post(endpoint, body, headers = {}) {
        return cy.request({
            method: 'POST',
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body
        });
    }
    static get(endpoint, headers = {}) {
        return cy.request({
            method: 'GET',
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
    }
    static put(endpoint, body, headers = {}) {
        return cy.request({
            method: 'PUT',
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body
        });
    }

    static delete(endpoint, headers = {}) {
        return cy.request({
            method: 'DELETE',
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
    }
}

export default Request;