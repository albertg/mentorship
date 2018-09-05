var expect = require('chai').expect;
var Authenticator = require('../../backend/lib/authenticator');

describe("Testing authentication mechanism", () =>{
    it('should authenticate and fetch authenticated user details', (done) => {
        var ad = new Authenticator();
        var options = {
            username: 'albert.george@happiestminds.com',
            password: '',
            expect:{
                firstName:'albert',
                lastName:'george',
                email:'albert.george@happiestminds.com'
            }
        };
        ad.authenticate(options.username,options.password).then(response => {
            expect(response.firstName.toLowerCase()).to.equal(options.expect.firstName);
            expect(response.lastName.toLowerCase()).to.equal(options.expect.lastName);
            expect(response.email.toLowerCase()).to.equal(options.expect.email);
            expect(response.isAuthenticated).to.equal(true);
            done();
        }).catch(err => {
            var e = err;
        })
    });
});