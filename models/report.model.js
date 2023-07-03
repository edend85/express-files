const DB = require('../utils/db');

class Report{

    date;
    type;
    location;
    address;
    place;
    details;
    image;
    reporter;
    

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

    /*static async InsertNewReport(date,type,location,address,place,details,image,reporter) {
        this.date = date;
        this.type = type;
        this.location = location;
        this.address = address;
        this.place = place;
        this.details = details;
        this.image = image;
        this.reporter = reporter;
        return await new DB().InsertNewReport('Reports',{...this});
    }*/
    static async InsertNewReport(report,q){
        this.date = report.date;
        this.type = report.type;
        this.location = report.location;
        this.address = report.address;
        this.place = report.place;
        this.details = report.details;
        this.image = report.image;
        this.reporter = report.reporter;
        return await new DB().InsertNewReport('Reports',{...this},q);
    }
}


module.exports = Report;

    