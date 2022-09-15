import mongoose from "mongoose";
import configuration from "../configuration";



export default mongoose.connect(
  configuration.dbURL,
  { keepAlive: true },
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Database Connected");
  }
);
