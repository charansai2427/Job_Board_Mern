require('dotenv').config()
const Express = require("express");
const cors = require("cors");
const Auth = require("./middleware/Auth");

const app = Express();
const companyRouter = require('./routes/companyRouter');
const jobRouter = require("./routes/jobRouter");
const searchRouter = require("./routes/searchRouter");

app.use(cors());
app.use(Auth)

app.use(Express.json());
app.use(Express.urlencoded({ extended: true}));

app.use("/company",companyRouter);
app.use("/jobs",jobRouter);
app.use("/search",searchRouter)

app.listen(4003,() => console.log("server is running at 4003"));