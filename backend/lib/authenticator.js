var AD = require('activedirectory');

var config = {
    url: 'ldap://happiestminds.com',
    baseDN: 'DC=happiestminds,DC=com',
    username: 'albert.george@happiestminds.com',
    password: ''
};

class Authenticator{
    constructor(){
        this.config = config;
        this.ad = new AD(this.config);
    }

    authenticate(username, password){
        return new Promise((resolve, reject) => {
            this.ad.authenticate(username, password, (err, isAuthenticated) => {
                if(err){
                    reject(err);
                }
                if(isAuthenticated){
                    this.ad.findUser(null,username,false,(err, user) => {
                        if(err){
                            reject(err);
                        }
                        if(user){
                            resolve({
                                firstName: user. givenName,
                                lastName: user.sn,
                                email: user.mail,
                                isAuthenticated: isAuthenticated
                            });
                        }
                    });
                }else{
                    reject({"status":"failed"});
                }
            });
        });
    }
}

module.exports = Authenticator;