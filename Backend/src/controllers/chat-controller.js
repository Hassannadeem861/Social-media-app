import Chat from "../models/chat-model.js";
import { uploadFileOnCloudinary, deleteImg } from "../../cloudinary.js";
import fs from "fs"; // To remove local temp file


const createMessage = async (req, res) => {
  try {

    const insertMessage = await Chat.create({

    })
    console.log("insertMessage :", insertMessage);

    return res
      .status(201)
      .json({ message: "Registration successfully", insertMessage });


  } catch (error) {
    console.log("CREATE MESSAGE ERROR: ", error.message);
    return res
      .status(400)
      .json({ message: "CREATE MESSAGE ERROR", error: error.message });
  }
}

const getMessages = (req, res) => {
  try {

  } catch (error) {
    console.log("GET MESSAGES ERROR: ", error.message);
    return res
      .status(400)
      .json({ message: "GET MESSAGES", error: error.message });
  }
}


export {
  createMessage,
  getMessages
};
