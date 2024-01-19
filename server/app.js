const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const router = require("./router/router.js")
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors())
const PORT = process.env.PORT;
app.use(express.json({limit: "5000mb", extended: true, parameterLimit:50000}));
app.use(express.urlencoded({limit: "50000mb", extended: true, parameterLimit:50000}));

app.use(morgan("tiny"));
app.use("/api/", router);

app.listen(PORT,()=>{console.log(`Server listeing to post ${PORT}`)})