const DB = require('../utils/db');

class Info{

    title;
    content;
    infoFor;

    constructor(title,content, infoFor){
        this.title = title;
        this.content = content;
        this.infoFor = infoFor;
    }

    static async ShowAllQuerys() {
        return await new DB().ShowAllQuerys('Information');
    }
    static async AddQuery(title,content,infoFor) {
        this.title = title
        this.content = content
        this.infoFor = infoFor;
        return await new DB().AddQuery('Information',{...this});
    }
    //aggrgtion
    static async UpdateQuery(id,des) {
        this.id = id;
        this.content = des;
        let query = {"infoId":{$eq:id}}
        let desUpdate = (content,{$set:des});
        return await new DB().UpdateQuery('Information',query,desUpdate);
    }
}
module.exports = Info;