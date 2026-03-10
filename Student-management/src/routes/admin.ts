import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { upsertGrade } from "../services/grade.service";

const router = Router();

router.post("/students", async (req, res) => {
  const body = z.object({
    userId: z.string(),
    fullName: z.string().min(2),
    email: z.string().email()
  }).parse(req.body);

  const student = await prisma.student.create({ data: body });
  res.status(201).json(student);
});

router.patch("/students/:id", async (req, res) => {
  const body = z.object({
    fullName: z.string().min(2).optional(),
    email: z.string().email().optional()
  }).parse(req.body);

  const updated = await prisma.student.update({
    where: { id: req.params.id },
    data: body
  });
  res.json(updated);
});

router.post("/subjects", async (req, res) => {
  const body = z.object({ name: z.string().min(2) }).parse(req.body);
  const subject = await prisma.subject.create({ data: body });
  res.status(201).json(subject);
});

router.put("/grades", async (req, res) => {
  const body = z.object({
    studentId: z.string(),
    subjectId: z.string(),
    value: z.number().int()
  }).parse(req.body);

  const grade = await upsertGrade(body.studentId, body.subjectId, body.value);
  res.status(201).json(grade);
});

export default router;
