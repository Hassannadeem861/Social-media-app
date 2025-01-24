import Chat from "../models/chat-model.js";
import { uploadFileOnCloudinary, deleteImg } from "../../cloudinary.js";
import fs from "fs"; // To remove local temp file


const createMessage = async (req, res) => {
  try {

    const { to_id, messageText } = req.body

    if (!to_id || !messageText) {
      return res
        .status(201)
        .send(`Required parameter missing,
           example body: 
           {
            to_id: "dsdsdsdsdsdsdsdsdsdddsd",
            textMessage: "some text"
          }`
        );
    }

    const insertMessage = await Chat.create({

      //  mari ida
      fromName: req.user.username,
      fromEmail: req.user.fromEmail,
      from_id: req.user.from_id,

      //  dosra user ki id
      to_id: req.user.to_id,
    })
    console.log("insertMessage :", insertMessage);

    return res
      .status(201)
      .json({ message: "Message send successfully", insertMessage });


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
