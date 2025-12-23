const express = require("express");
const cors = require("cors");
const port = 5500

const app = express();
app.use(cors());


//user routes middleware file import
const userRoutes = require("./routes/userRoute")

//user routes middleware 
app.use("/api/users", userRoutes);


//question routes middleware 



//answer routes middleware 




app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at ${port}`);
  }
});
