// this is to establish a connection between MongoDB(mongoose) and Node JS
// to start connection in mongodb - sudo service mongod start



import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // terminate the process
  }
};

export default connectDB;

// mongoose
//   .connect(
//     "mongodb+srv://madhu:M2005v@backend-db.86convx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend-db"
//   )
//   .then(() => {
//     console.log("Connected!");

//     app.listen(3000, () => {
//       console.log("Server is running on port 3000");
//     });
//   })
//   .catch(() => console.log("Error");
