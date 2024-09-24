const { genSalt , hash, compare} = require("bcrypt");
const { users} =  require("../mongoConfig");
const CryptoJS = require("crypto-js");
const mongodb =  require('mongodb');


const Register = async(req) => {
    const userData = await users.find(
        {
            email : req.body.email
        }
    ).toArray()
    if(userData.length){
        throw new Error("Email already registered");
    }
    const salt = await genSalt();
    const hashedPass =  await hash(req.body.password, salt);
    const data = await users.insertOne(
        {
            ...req.body,
            password : hashedPass,
            savedjobs:[],
            companyfollowing:[]
        }
    )
   
    return data;
}

const Login = async(req) => {
   const { email, password}  = req.body;
   const userData = await users.find({email}).toArray();
   console.log(userData)
   if(!userData.length) throw new Error("EMail not registered");
   const {password : hashedPass, _id, access} = userData[0];
   const checkPass = await compare( password, hashedPass);
   if(!checkPass) throw new Error("Wrong Credentials");
   const token = CryptoJS.AES.encrypt(
        JSON.stringify({
            email,
            userId : _id,
            access,
            
        }),
        process.env.CRYPTO_SECRET
     ).toString();
     return{
        userId : _id,
        email,
        token,
        access
     }
}

const loggedInUser = async(req) => {
    const userId = new mongodb.ObjectId(req.userId);
    return users.findOne(userId)
}

const getUser = async(req) => {
    const userId = new mongodb.ObjectId(req.params.userId);
    return users.findOne({ _id : userId })
}

const getAll = async(req) => {
    return users.find({}).toArray()
}

const updateUser = async(req) => {
    const userId = new mongodb.ObjectId(req.params.userId);
    return users.findOneAndUpdate({ _id : userId}, {$set:{...req.body}}, {new : true})
}
const deleteUser = async(req) => {
    const userId = new mongodb.ObjectId(req.params.userId)
    return users.findOneAndDelete({_id: userId})
}

module.exports = {
    Register,
    Login,
    loggedInUser,
    getUser,
    getAll,
    updateUser,
    deleteUser
}