const DB = require('../utils/db');
const { ObjectId } = require('mongodb');


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
    static async UpdateQuery(id, title, content, infoFor) {
        const query = { _id: new ObjectId(id) }; 
        const docUpdate = {
            $set: {
                title: title,
                content: content,
                infoFor: infoFor
            }
        };

        console.log("Query:", query);
        console.log("Update:", docUpdate);

        return await new DB().UpdateQuery('Information', query, docUpdate);
    }

    static async deleteInfo(id){
        return await new DB().deleteInfo('Information',id);
    }
}
module.exports = Info;