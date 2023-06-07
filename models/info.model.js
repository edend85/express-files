const DB = require('../utils/db');

class Info{

    title;
    description;
    constructor(title,description){
        this.title = title;
        this.description = description;
    }

    static async ShowAllQuerys() {
        return await new DB().ShowAllQuerys('Information');
    }
    static async AddQuery(title,description) {
        this.title = title
        this.description = description
        return await new DB().AddQuery('Information',{...this});
    }
    static async UpdateQuery(id,des) {
        let query = {"infoId":{$eq:id}}
        let desUpdate = ({description},{$set:des});
        return await new DB().UpdateQuery('Information',query,desUpdate);
    }
}
module.exports = Info;