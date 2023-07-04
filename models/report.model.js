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

    static async ShowUserReports(email) {
        let query = {"email":{$eq:email}}
        let user = await new DB().FindbyEmail('Users',query)
        return await new DB().ShowUserReports('Reports',user);
    }
    // Work !
    static async InsertNewReport(report,email){
        this.date = report.date;
        this.type = report.type;
        this.location = report.location;
        this.address = report.address;
        this.place = report.place;
        this.details = report.details;
        this.image = report.image;
        this.reporter = report.reporter;
        let query = {"email":{$eq:email}}
        let user = await new DB().FindbyEmail('Users',query);
        console.log('pass user :>> ',user);
        return await new DB().InsertNewReport('Reports',{...this},user);
        
    }
}


module.exports = Report;

    