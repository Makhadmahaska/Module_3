import { Router } from "express";
import { getGradesForStudent } from "../services/grade.service";

const router = Router();

router.get("/me/grades", async (req, res) => {
  if (!req.user?.studentId) return res.status(403).json({ message: "No student profile" });
  const grades = await getGradesForStudent(req.user.studentId);
  res.json(grades);
});

export default router;
