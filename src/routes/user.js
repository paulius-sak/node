import express from "express";
import {
  ADD_USER,
  GET_USERS_BY_ID,
} from "../controller/user.js";

const router = express.Router();

router.post("/users", ADD_USER);
router.get("/users/:id", GET_USERS_BY_ID);

export default router;