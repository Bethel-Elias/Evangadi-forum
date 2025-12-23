const express = require("express");
const cors = require("cors");
const port = 6000;

const app = express();
app.use(cors());

//db connection
const dbconnection = require("./db/dbconfig");

//user routes middleware file import
const userRoutes = require("./routes/userRoute");

//user routes middleware
app.use("/api/users", userRoutes);

//question routes middleware

//answer routes middleware

async function start() {
  try {
    const result = await dbconnection.execute("select 'test' ")
    // console.log(result)
    await app.listen(port)
    console.log("database connection established");
    console.log(`server is running at ${port}`);
  } catch (error) {
    console.log(error.message)
  }
}
start();

