
const express = require("express");
const cors = require("cors");
// const port = 5500;
const PORT = process.env.PORT || 5500;

const app = express();
app.use(cors());

//db connection
const dbconnection = require("./db/dbconfig");



//user routes middleware file import
const userRoutes = require("./routes/userRoute");

//question routes middleware file import
const questionRoutes = require("./routes/questionRoute");

//answer routes middleware file import
const answerRoutes = require("./routes/answerRoute");

//like unlike coment middleware file import
const likeUnlikeComentRoutes = require("./routes/likeUnlikeComentRoute");




//json middleware to extract json data
app.use(express.json());



//user routes middleware
app.use("/api/users", userRoutes);

//question routes middleware
app.use("/api/questions",  questionRoutes);

//answer routes middleware
app.use("/api",  answerRoutes);

//likeunlikeComent middleware
app.use("/api/answers", likeUnlikeComentRoutes);


app.get("/test", (req, res) => {
  res.send("backend Server is running");
});

async function start() {
  try {
    const result = await dbconnection.execute("select 1 ");
    console.log("database connection established", result);
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    })
    
  } catch (error) {
    console.log(error.message);
  }
}
start();
