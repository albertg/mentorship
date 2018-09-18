class BusinessUnitController{
    constructor(database){
        this.db = database;
    }

    addBUIfNotFound(buName){
        return new Promise((resolve) => {
            this.db.BusinessUnit.find({
                where:{
                    name: buName
                }
            }).then(found => {
                if(!found){
                    this.db.BusinessUnit.create({
                        name: buName
                    }).then(newBu => {
                        resolve(newBu);
                    });
                }else{
                    resolve(found);
                }
            });
        });        
    }

    getAllBusinessUnits(){
        return new Promise((resolve) => {
            this.db.BusinessUnit.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }).then(buList => {
                resolve(buList);
            });
        });
    }
}

module.exports = BusinessUnitController;
