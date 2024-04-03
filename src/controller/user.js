import { v4 as uuidv4 } from 'uuid';
import UserModel from "../models/user.js";

const ADD_USER = async (req, res) => {
  try {
    const user = new UserModel({
      userId: uuidv4(),
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userCartProducts_ids: []
    });

    const response = await user.save();

    return res
      .status(201)
      .json({ status: "User was added", response: response });
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


export { ADD_USER, GET_USERS_BY_ID };
