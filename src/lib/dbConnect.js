import mongoose from "mongoose";


const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already Connected to database");
    return;
  }
  const MONGO_URI = process.env.MONGODB_URI;
  console.log(MONGO_URI);
  


  if (!MONGO_URI) {
    throw new Error("❌ MONGODB_URI is not defined in .env.local");
  }

  console.log("Everything fine");
  
  try {
    
    const db = await mongoose.connect(process.env.MONGODB_URI || " ", {});


    connection.isConnected = db.connection.readyState;


    console.log("DB connected Successfully");
  } catch (error) {
    console.log("DB connection failed", error);

    process.exit(1);
  }
}

export default dbConnect;