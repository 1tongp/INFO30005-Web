const expect = require('chai').expect;
const request = require('request');
const app = require('../server');

const baseUrl = "http://localhost:5000/vendor"

const testVendorPark = {
    vaildBody: {
        "currentAddress": "unimelb building",
        "parked": true,
        "location": [-37.7969734, 144.96134673],
        "readyForOrder": true
    }
}

const testVendorId = "609f25c28092ed15b442d844"

describe("vendor integration tests", () => {
    it('should be able to set parking status of vendor', function(done) {
        request.post(
            {
                headers: { 'content-type': 'application/json' },
                url: baseUrl + '/park/' + testVendorId,
                body: testVendorPark.vaildBody,
                json: true,
            },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.updateVendor.readyForOrder).to.equal(true);
                if (error) done (error);
                else done();
            }
        );
    })
})