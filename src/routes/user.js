import express from "express";
import {
  SIGN_IN,
  GET_USERS_BY_ID,
  LOG_IN
} from "../controller/user.js";

const router = express.Router();

router.post("/users", SIGN_IN);
router.post("/users/login", LOG_IN);
router.get("/users/:id", GET_USERS_BY_ID);

export default router;