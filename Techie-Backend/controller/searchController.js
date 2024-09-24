const mongodb =  require('mongodb');
const {jobs} = require("../mongoConfig");
const Search = async(req)=>{


    const{search} = req.query;
    console.log(search);
    return jobs.find({
        $text:{$search : search}
    }).toArray()
}   

module.exports={
    Search
}