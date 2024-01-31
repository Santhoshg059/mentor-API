import express from "express";
import commonController from "../controllers/commonController.js";
const router = express.Router();

router.put(
  "/assign-mentor/:studentName/:mentorName",
  commonController.assignStudentToMentor
);
router.put(
  "/change-mentor/:studentName/:newMentorName",
  commonController.changeMentorForStudent
);
router.get("/mentor-students/:mentorId", commonController.getMentorStudents);

router.get("/previous-mentor/:studentId", commonController.getPreviousMentor);

export default router;