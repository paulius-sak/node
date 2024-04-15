import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_IN = async (req, res) => {
  try {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)


    const user = new UserModel({
      userId: uuidv4(),
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      password: hash,
      userCartProducts_ids: []
    });

    const response = await user.save();

    return res
      .status(201)
      .json({ status: "User sign-in successful", response: response });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_USERS_BY_ID = async (req, res) => {
    try {
      const user = await UserModel.aggregate([
        {
          $match: {
            userId: req.params.id 
          }
        },
        {
          $lookup: {
            from: "carts",
            localField: "userEmail",
            foreignField: "userEmail",
            as: "userCarts"
          }
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            userName: 1,
            userEmail: 1,
            userCartProducts_ids: "$userCarts.userCartProducts_ids"
          }
        },
      ]).exec();
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json({ user: user });
    } catch (err) {
      console.log("Handled error: ", err);
      return res.status(500).json({ message: "Error occurred" });
    }
  };


  const LOG_IN = async (req, res) => {
    try {
      const user = await UserModel.findOne({userEmail: req.body.userEmail})

      if(!user) {
        return res.status(500).json({message: "User data is bad"})
      }

      const isPasswordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if(!isPasswordMatch) {
        return res.status(501).json({message: "User data is bad"})
      }

      const jwt_token = jwt.sign(
        {email: user.userEmail, user_id: user.userId},
        process.env.JWT_SECRET,
        {expiresIn: "20h"}
      )
      
  
      return res
        .status(201)
        .json({ jwt: jwt_token, message: "User log-in successful"});
    } catch (err) {
      console.log("handled error: ", err);
      return res.status(500).json({ message: "error happened" });
    }
  };

export { SIGN_IN, GET_USERS_BY_ID, LOG_IN };
