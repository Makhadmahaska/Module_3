import { prisma } from "../prisma";

export async function upsertGrade(studentId: string, subjectId: string, value: number) {
  if (value < 0 || value > 100) throw new Error("Grade must be between 0 and 100");

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) throw new Error("Student not found");

  const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
  if (!subject) throw new Error("Subject not found");

  return prisma.grade.upsert({
    where: { studentId_subjectId: { studentId, subjectId } },
    update: { value },
    create: { studentId, subjectId, value }
  });
}

export async function getGradesForStudent(studentId: string) {
  return prisma.grade.findMany({
    where: { studentId },
    include: { subject: true }
  });
}
