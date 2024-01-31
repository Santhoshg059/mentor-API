import mongoose from "mongoose";
const connect = async () =>{
    const DB_URL = process.env.DB_URL;
    const DB_NAME = process.env.DB_NAME; 

    try {
        mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log(`Database connection successful`)
    }
    catch(error){
        console.log("Failed to connect Database")
    }
}
export default connect