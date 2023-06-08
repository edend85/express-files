const DB = require('../utils/db');
const bcrypt = require('bcrypt');

class User {
    userId;
    firstName;
    lastName;
    email;
    password;
    phone;
    address;
    role;
    smoke;
    img;
    isActive;

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




    static async FindUserbyId(id){
        return await new DB().FindUserbyId('users',id);
    }

    static async FindUser(e,p){
        let query = {$and:[{"email":{$eq:e},"password":{$eq:p}}]};
        return await new DB().FindOneUser('users',query);
    }
    static async UpdateUser(e,p){
        let query = {$and:[{"email":{$eq:e},"password":{$eq:p}}]};
        return await new DB().UpdateUser('users',query);
    }
    static async InsertUser(firstName,lastName,email,password,phone,address,role,smoke,img,isActive){
       this.firstName = firstName;
       this.lastName = lastName;
       this.email = email;
       this.password = await bcrypt.hash(password,10);
       this.phone = phone;
       this.address = address;
       this.role = role;
       this.smoke = smoke;
       this.img = img;
       this.isActive = isActive;
       
        return await new DB().InsertUser('Users',{...this});
    }


    static async InsertRole(firstName,lastName,email,password,phone,role,img,isActive){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = await bcrypt.hash(password,10);
        this.phone = phone;
        this.role = role;
        this.img = img;
        this.isActive = isActive;
        
         return await new DB().InsertUser('Users',{...this});
     }
    static async DisableUser(id){
        let query = {"id":{$eq:id}}
        return await new DB().DisableUser('Users',query);
    }
    
}
module.exports = User;