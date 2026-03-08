const mongoose=require("mongoose");
const uri ="mongodb+srv://bharti:bharti@123@cluster0.emwwwak.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const connectDB=async()=>{
try{
  await mongoose.connect(uri).then((res)=>{
    console.log("Connected To Database");
  })
  console.log("Connected to MongoDB");
}
catch(err){
  console.error("Error connecting to MongoDB:", err);
}
}

