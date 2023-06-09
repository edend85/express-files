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
        let user = await new DB().FindbyEmail('Users',query);
        //console.log('reportArr :>> ', user.reports);
        return await new DB().ShowUserReports('Users',user);
    }
    // Work !
    static async InsertNewReport(date,type,location,address,place,details,image,reporter,email)
    {
        this.date = date;
        this.type = type;
        this.location = location;
        this.address = address;
        this.place = place;
        this.details = details;
        this.image = image;
        this.reporter = reporter;
        let query = {"email":{$eq:email}}
        let user = await new DB().FindbyEmail('Users',query);
        console.log('pass user :>> ',user);
        return await new DB().InsertNewReport('Reports',{...this},user);
        
    }
}


module.exports = Report;

    