import mongoose from "mongoose";

const dbConnection = async () => {
  if (mongoose.connection.readyState > 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongodb is now connected");
  } catch (error) {
    console.log(error.message, "Mongodb is not connected");
  }
};

export default dbConnection;
