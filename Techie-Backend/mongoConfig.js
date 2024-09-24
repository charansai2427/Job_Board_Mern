const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb+srv://Charan_sai:darling_242726@cluster0.tr74xjt.mongodb.net/Techiepanda`,
 { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 36000000000 },
  { keepAlive: 1 }
);

const db = client.db();



const users =  db.collection("users");
const jobs = db.collection("jobs");
const company = db.collection("company");

const search = db.collection("search");

jobs.createIndex(
  {
    title:'text',
    company_name:'text'
  }, {
    name:"searchIndexTitle"
  }
)

company.createIndex(
  {
    company_name:'text',
    location:'text'
  }, 
    {
          name:"searchIndexCompany"
        
  }
)

module.exports = {users, jobs,company,search}