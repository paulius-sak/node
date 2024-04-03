import UserModel from "../models/user.js";

const ADD_USER = async (req, res) => {
  try {
    const user = new UserModel({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
    });
    user.id = user._id.toString();

    const response = await user.save();

    return res
      .status(201)
      .json({ status: "User was added", response: response });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_USERS = async (req, res) => {
  try {
    const users = await UserModel.aggregate([
      {
        $lookup: {
          from: "carts",
          localField: "userCartProducts_ids",
          foreignField: "id",
          as: "userFlightCart",
        },
      },
    ]).exec();

    return res.json({ users: users });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};



export { ADD_USER, GET_USERS };
