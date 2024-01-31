import Mentor from "../models/mentorModel.js";
import Student from "../models/studentModel.js";

const assignStudentToMentor = async (req, res) => {
  try {
    const { studentName, mentorName } = req.params;
    console.log(
      `Attempting to assign student '${studentName}' to mentor '${mentorName}'`
    );

    // Find the mentor by name
    const mentor = await Mentor.findOne({ name: mentorName });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Find the student by name
    const student = await Student.findOne({ name: studentName });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the mentor and student documents as needed
    mentor.students.push(student._id);
    student.mentor = mentor._id;

    // Save the changes
    await mentor.save();
    await student.save();

    res
      .status(200)
      .json({ message: "Student assigned to mentor successfully" });
  } catch (error) {
    console.error("Error assigning student to mentor by name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changeMentorForStudent = async (req, res) => {
  try {
    const { studentName, newMentorName } = req.params;

    //Finding the Student by Name
    const student = await Student.findOne({ name: studentName });
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Finding the new mentor by name
    const newMentor = await Mentor.findOne({ name: newMentorName });
    if (!newMentor) {
      return res.status(404).json({ error: "New mentor not found." });
    }

    if (student.mentor) {
      // If the student already has a mentor, remove the student from the old mentor's list
      const oldMentor = await Mentor.findByIdAndUpdate(
        student.mentor,
        { $pull: { students: student._id } },
        { new: true }
      );
    }
    student.mentor = newMentor._id;
    await student.save();
    // Add the student to the new mentor's list
    const updatedMentor = await Mentor.findByIdAndUpdate(
      newMentor._id,
      { $addToSet: { students: student._id } },
      { new: true }
    );
    res.json({
      message: "Mentor changed successfully",
      student,
      newMentor: updatedMentor,
    });
  } catch (error) {
    console.error("Error assigning/changing student to mentor ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 
//Fetching student details by using Mentor name
const getMentorStudents = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId).populate("students");
    res.json(mentor.students);
  } catch (error) {
    console.error("Error fetching students by mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Showing Previous Mentor details 

const getPreviousMentor = async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const student = await Student.findById(studentId).populate("mentor");
      res.json(student.mentor);
    } catch (error) {
        console.error("Error fetching previous mentor:", error);
        res.status(500).json({ error: "Internal server error" });
    }
  };

export default {
  assignStudentToMentor,
  changeMentorForStudent,
  getMentorStudents,
  getPreviousMentor
};