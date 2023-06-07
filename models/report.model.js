const DB = require('../utils/db');

class Report{

    type;
    locationName;
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



    static async ShowUserReports(userId) {
        
        return await new DB().ShowUserReports('Reports',userId);
    }

    static async InsertNewReport(type,locationName,details,image,address) {
        console.log('3 :>> ');
        this.type = type;
        this.locationName = locationName;
        this.details = details;
        this.image = image;
        this.address = address;
        return await new DB().InsertNewReport('Reports',{...this});
    }
}


module.exports = Report;

    