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
                },
                include:[{
                    model: this.db.Practice,
                    as: 'Practices'
                }]
            }).then(buList => {
                var listOfBu = [];
                buList.forEach(bu => {
                    var buInfo = {
                        id: bu.id,
                        name: bu.name,
                        practices: bu.Practices.length
                    };
                    listOfBu.push(buInfo);
                });
                resolve(listOfBu);
            });
        });
    }
}

module.exports = BusinessUnitController;
