import mongoose from "mongoose";
import app from "./app.js";

// const  DB_HOST = "mongodb+srv://Nik:A3XVivc4ClFzxv9w@cluster0.jdstiqu.mongodb.net/E-Pharmacy?retryWrites=true&w=majority&appName=Cluster0";
const { DB_HOST, PORT } = process.env;
// mongodb+srv://Nik:A3XVivc4ClFzxv9w@cluster0.jdstiqu.mongodb.net/E-Pharmacy?retryWrites=true&w=majority&appName=Cluster0
 console.log(DB_HOST)
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server runing on ${PORT} PORT`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

