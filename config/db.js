import mongoose from "mongoose";

export const connectToDb = async (cb) => {
  try {
    // Log MongoDB connection string (for debugging only — remove in production)
    console.log("MongoDB URI:", process.env.MONGO_URI);

    /*
      mongoose.connect() returns a Promise.
      Using 'await' ensures:
      - The function pauses until the database connection is established.
      - If connection fails, control moves to the catch block.
    */
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB successfully");

    /*
      Execute callback function
      This typically starts the Express server
      Example:
      connectToDb(() => {
        app.listen(PORT)
      });
    */
    cb();
  } catch (error) {
    /*
      Error Handling:
      If connection fails:
      - Log the error
      - Prevent server from starting
    */
    console.error("Error connecting to MongoDB:", error.message);
  }
};