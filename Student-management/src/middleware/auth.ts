import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { prisma } from "../prisma";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = header.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      include: { student: true }
    });

    if (!dbUser) return res.status(401).json({ message: "User not registered" });

    req.user = {
      userId: dbUser.id,
      role: dbUser.role,
      studentId: dbUser.student?.id
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
