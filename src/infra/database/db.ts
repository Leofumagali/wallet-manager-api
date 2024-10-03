import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const mongodb_uri = process.env.MONGODB_URI ?? "";

  try {
    await mongoose.connect(mongodb_uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};