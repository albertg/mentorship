const getYear = () => {
    "use strict";
    this.monthCriteria = [0,1,2];
    var currentDate = new Date(Date.now());
    if(this.monthCriteria.indexOf(currentDate.getMonth()) >= 0){
        return currentDate.getMonth() - 1;
    }
    return currentDate.getFullYear();
};

module.exports = {
    getYear: getYear
};
