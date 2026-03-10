import { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err?.name === "ZodError") {
    return res.status(400).json({ message: "Validation error", issues: err.issues });
  }
  if (err?.message?.includes("not found")) return res.status(404).json({ message: err.message });
  if (err?.message?.includes("Grade must")) return res.status(400).json({ message: err.message });
  return res.status(500).json({ message: "Internal server error" });
}
