require('dotenv').config()
const Express = require("express");
const cors = require("cors");
const Auth = require("./middleware/Auth");
const userRouter = require('./routes/userRouter');
const app = Express();

app.use(cors());
app.use(Auth)
app.use(Express.json());
app.use(Express.urlencoded({ extended: true}));

app.use("/users",userRouter);

app.listen(4001,() => console.log("server is running at 4001"));