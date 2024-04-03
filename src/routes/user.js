import express from "express";
import {
  ADD_USER,
  GET_USERS,
} from "../controller/user.js";

const router = express.Router();

router.post("/users", ADD_USER);


router.get("/users", GET_USERS);

export default router;