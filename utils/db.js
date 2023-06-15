const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: './utils/.env' });


class DB {
    db_uri;
    db_name;
    client;


    constructor() {
        this.db_uri = process.env.DB_URI;
        this.db_name = process.env.DB_NAME;
        this.client = new MongoClient(this.db_uri, { useUnifiedTopology: true });
        this.connect();
      }
    

      // to check if we connected to DB - Only for Dev
      async connect() {
        try {
          await this.client.connect();
          console.log('Connected to the database');
        } catch (error) {
          console.error('Failed to connect to the database:', error);
        }
      }



      async FindAll(collection, query = {}, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }



    //user actions
    async FindUserbyId(collection, id) {
        try {
            await this.client.connect();
            let userId = await new ObjectId(id);
            let query = await {_id:{$eq:userId}}
            return await this.client.db(this.db_name).collection(collection).findOne(query);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async FindbyEmail(collection,query={},project={}){
        try{
            await this.client.connect();
            console.log('1 :>> ');
            return await this.client.db(this.db_name).collection(collection).findOne(query,project);
        }catch(error){
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async Login(collection, query={},project={}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find({},{});
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async UpdateUser(collection, query) {
        try {
            await this.client.connect();
            let doc = FindOneUser('Users', query)
            return await this.client.db(this.db_name).collection(collection).UpdateOne(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async InsertUser(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).insertOne(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async DisableUser(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).UpdateUser(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

    //reports actions

    // Work
    async ShowAllReports(collection, query = {}, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

    // Work
    async ShowReportByCity(collection, query, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async ShowUserReports(collection, id) {
        try {
            await this.client.connect();
            let query = await{_id: new ObjectId(id)}
            let project = await {reports:1}
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async InsertNewReport(collection, doc) {
        try {
            await this.client.connect();
            //let id = new ObjectId(userId);
            return await this.client.db(this.db_name).collection(collection).insertOne(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    //info actions
    async ShowAllQuerys(collection, query = {}, project = {}) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).find(query, project).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async AddQuery(collection, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).insertOne(doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    async UpdateQuery(collection, query, doc) {
        try {
            await this.client.connect();
            return await this.client.db(this.db_name).collection(collection).updateOne(query, doc);
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }

}
module.exports = DB;