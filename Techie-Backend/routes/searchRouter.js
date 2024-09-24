const{Router} = require("express");
const {Search} = require("../controller/searchController")
const searchRouter=Router()
 searchRouter.get("/search", async(req,res)=>{
    try{
        const data = await Search(req);
        res.send(data);
    } catch (error) {
        res.send({
            err : error.message
        })
    }
 })

 module.exports = searchRouter