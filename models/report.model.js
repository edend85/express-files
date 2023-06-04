const DB = require('../utils/db');

class Report{

    type;
    details;
    image;
    address;

    constructor(type,details,image,address){

        this.type = type;
        this.details = details;
        this.image = image;
        this.address = [{street:address.street,streetNum:address.number, city:address.city}];   
    }

    // Work !
    static async ShowAllReports() {
        return await new DB().ShowAllReports('Reports');
    }


    // Work !
    static async ShowReportByCity(city) {
        let query = { "address.city": city }
        console.log(city)
        return await new DB().ShowReportByCity('Reports', query);
    }



    static async ShowUserReports() {
        return await new DB().ShowUserReports('Reports');
    }
    static async InsertNewReport(doc) {
        return await new DB().InsertNewReport('reports',doc);
    }
}


module.exports = Report;

    