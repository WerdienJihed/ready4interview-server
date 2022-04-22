import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/readyForInterviewDB"
    );
    console.log(`MongoDB Connected ...`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;