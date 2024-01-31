import Student from '../models/studentModel.js'

const createStudent = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }
      const existingStudent = await Student.findOne({ name });
      if (existingStudent) {
        return res.status(400).json({ error: "Student Name exists already" });
      }
      const student = await Student.create(req.body);
      res.status(200).json({ message: "Student Created successfully", student});
    } catch (error) {
      console.error("Error creating student:", error);
      console.log({ error: "Failed to create Student!! Try Again " });
    }
  };
  
  const getAllStudents = async(req,res)=>{
    try{
const allStudents = await Student.find();
res.json(allStudents)
    }
    catch(error){
        console.error("Error fetching all students:", error);
        console.log({ error: "Failed to fetch all students!! Try Again " });
    }
}

  export default{
    createStudent, 
    getAllStudents
  }