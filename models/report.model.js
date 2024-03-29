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
    userId;
    

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
        return await new DB().ShowUserReports('Reports',user);
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
        this.reporter = "Anonymous"
        if(email){
            let query = {"email":{$eq:email}}
            let user = await new DB().FindbyEmail('Users',query);
            console.log('pass user :>> ',user);
            this.reporter = user.firstName +" "+ user.lastName;
            this.userId = user._id;
            return await new DB().InsertNewReport('Reports',{...this},user);
        }
        else{
            return await new DB().InsertNewReport('Reports',{...this});

        }
        
    }
    static async deleteReport(id){
        console.log('2 :>> ', id);
        return await new DB().deleteReport('Reports',id);
    }
}


module.exports = Report;

    