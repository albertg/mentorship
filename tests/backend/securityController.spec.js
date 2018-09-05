var expect = require('chai').expect;
var SecurityController = require('../../backend/features/security/securityController');
var db = require('../../backend/database/models/index');

describe('Testing the signin mechanism', () => {
    it('should authenticate an existing user and return relevant details', (done) => {
        var sc = new SecurityController(db);
        var user = {
            email:'albert.george@happiestminds.com',
            pwd:''
        };
        sc.authenticate(user).then(response => {
            expect(response.payload.email.toLowerCase()).to.equal(user.email);
            done();
        });
    });
});