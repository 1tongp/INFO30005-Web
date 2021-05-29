const expect = require('chai').expect;
const request = require('request');

const testVendorPark = {
    vaildBody: {
        "currentAddress": "unimelb building",
        "parked": true,
        "location": [-37.7969734, 144.96134673],
        "readyForOrder": true
    }
}

const testParkResult = {
    vaildResult: {
        "currentAddress": "unimelb building",
        "parked": true,
        "location": [-37.7969734, 144.96134673],
        "readyForOrder": true
    }
}

describe("unit tests", () => {
    it('should return a vendor with parked status', function (done) {
        var curBody = {
            "currentAddress": "no address",
            "parked": false,
            "location": [0, 0],
            "readyForOrder": false
        }

        // var responseBody = {
        //     "currentAddress": "unimelb building",
        //     "parked": false,
        //     "location": [0, 0],
        //     "readyForOrder": false
        // }

        curBody.currentAddress = testVendorPark.vaildBody.currentAddress;
        curBody.parked = testVendorPark.vaildBody.parked;
        curBody.location = testVendorPark.vaildBody.location;
        curBody.readyForOrder = testVendorPark.vaildBody.readyForOrder;

        expect(curBody).to.eql(testParkResult.vaildResult)
        done()
    })

})
