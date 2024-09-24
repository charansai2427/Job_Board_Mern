require('dotenv').config()
const Express = require("express");
const cors = require("cors");
const Auth = require("./middleware/Auth");

const companyRouter = require('./routes/companyRouter');
const app = Express();

app.use(cors());
app.use(Auth)
app.use(Express.json());
app.use(Express.urlencoded({ extended: true}));

app.use("/company",companyRouter);
app.listen(4002,() => console.log("server is running at 4002"));