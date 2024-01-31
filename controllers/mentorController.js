import Mentor from "../models/mentorModel.js";

const createMentor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const existingMentor = await Mentor.findOne({ name });
    if (existingMentor) {
      return res.status(400).json({ error: "Mentor Name exists already" });
    }
    const mentor = await Mentor.create(req.body);
    res.status(200).json({ message: "Mentor Created successfully", mentor });
  } catch (error) {
    console.error("Error creating mentor:", error);
    console.log({ error: "Failed to create Mentor!! Try Again " });
  }
};

const getAllMentors = async(req,res)=>{
    try{
const allMentors = await Mentor.find();
res.json(allMentors)
    }
    catch(error){
        console.error("Error fetching all mentor:", error);
        console.log({ error: "Failed to fetch all Mentors!! Try Again " });
    }
}
export default {
  createMentor,
  getAllMentors
};