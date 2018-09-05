class LocationController{
    constructor(database){
        this.db = database;
    }

    addLocationIfNotFound(locationName){
        return new Promise(resolve => {
            this.db.Location.find({
                where: {
                    name: locationName
                }
            }).then(found => {
                if(!found){
                    this.db.Location.create({
                        name: locationName
                    }).then(newLocation => {
                        resolve(newLocation);
                    });
                }else{
                    resolve(found);
                }
            })
        });
    }
}

module.exports = LocationController;
