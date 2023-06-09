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
    async FindbyEmail(collection,query={},project={}){
        try{
            await this.client.connect();
            console.log('inside function FindbyEmail :>> ',collection,query);
            return await this.client.db(this.db_name).collection(collection).findOne(query,project);
        }catch(error){
            console.log('error :>> ', error);
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
    async FindAllUserReports(collection,user){
        try {
            await this.client.connect();
            let query = {_id: new ObjectId(user._id)}
            let reports =  await this.client.db(this.db_name).collection(collection).find(query, {reports:1}).toArray();
            console.log('reports :>> ', reports);
            return reports
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }

    }
    async ShowUserReports(collection, user) {
        try {
            console.log('Show User Reports :>> ',user);
            await this.client.connect();
         const aggregationQuery = [
                {
                  $match: {
                    userId: new ObjectId(user._id)
                  }
                },
                {
                  $lookup: {
                    from: 'reports',
                    localField: 'reports',
                    foreignField: '_id',
                    as: 'userReports'
                  }
                }
              ];
            let userReports = await this.client.db(this.db_name).collection(collection).aggregate(aggregationQuery).toArray();
            console.log('userReports:', userReports);
            return userReports;
        } catch (error) {
            throw error;
        }
        finally {
            await this.client.close();
        }
    }
    //working
    async InsertNewReport(collection, doc,user) {
        try {
            await this.client.connect();
            let report = await this.client.db(this.db_name).collection(collection).insertOne(doc);
            console.log('report :>> ', report);
            return await this.client.db(this.db_name).collection('Users').updateOne({_id:{$eq:new ObjectId(user._id)}},{$push:{reports:report.insertedId}})
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