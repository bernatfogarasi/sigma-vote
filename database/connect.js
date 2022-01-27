import mongoose from "mongoose";

const connection = {};

const connect = async () => {
  if (connection.connected) return;

  const database = await mongoose.connect(
    process.env.DATABASE_MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  connection.connected = database.connections?.[0]?.readyState;

  console.log("Database connection:", Boolean(connection.connected));
};

export default connect;
