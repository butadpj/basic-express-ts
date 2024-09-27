import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("<h1>Hello world</h1>");
});

export const hello = router;
