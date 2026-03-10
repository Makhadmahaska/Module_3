import express from "express";
import cors from "cors";
import helmet from "helmet";
import { auth } from "./middleware/auth";
import { requireRole } from "./middleware/requireRole";
import { Role } from "@prisma/client";
import adminRoutes from "./routes/admin.routes";
import studentRoutes from "./routes/student.routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/admin", auth, requireRole(Role.ADMIN), adminRoutes);
app.use("/student", auth, requireRole(Role.STUDENT), studentRoutes);

app.use(errorHandler);
