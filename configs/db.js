import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/readyForInterviewDB";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected ...`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
