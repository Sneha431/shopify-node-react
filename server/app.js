const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const router = require("./router/router.js")
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors())
const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/", router);

app.listen(PORT,()=>{console.log(`Server listeing to post ${PORT}`)})