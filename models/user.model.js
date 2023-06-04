const DB = require('../utils/db');

class User {
    userId;
    firstName;
    lastName;
    role;
    email;
    password;
    address;

    constructor(userId,firstName,lastName,role,email,password, address) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.password = password;
        this.address = [{city:address[0],street:address[1],streetNum:address[2]}];   
    }

    // Work !
    static async FindAllUsers() {
        return await new DB().FindAll('Users');
    }

    // Work !
    static async FindAllRegulators() {
        let query = {"role":{$eq: "Regulator"}}
        return await new DB().FindAll('Users', query);
    }

    // Work !
    static async FindAllReasercher() {
        let query = {"role":{$eq: "Reasercher"}}
        return await new DB().FindAll('Users', query);
    }






    

    static async FindOneUser(e,p){
        let query = {$and:[{"email":{$eq:e},"password":{$eq:p}}]};
        return await new DB().FindOneUser('users',query);
    }
    static async UpdateUser(e,p){
        let query = {$and:[{"email":{$eq:e},"password":{$eq:p}}]};
        return await new DB().UpdateUser('users',query);
    }
    static async InsertUser(doc){
        return await new DB().InsertUser('users',doc);
    }
    static async RemovetUser(id){
        let query = {"id":{$eq:id}}
        return await new DB().RemovetUser('users',query);
    }
    
}
module.exports = User;