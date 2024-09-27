import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  return res.json({ data: { message: "Hi! from /api" } });
});

export const api = router;
