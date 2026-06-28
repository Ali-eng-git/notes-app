const User = require("../models/userModel.js");
const Note = require("../models/noteModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Please enter data" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await user.save();
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    return res.json({
      error: false,
      messsage: "User created successfully",
      accessToken,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: true, message: `Internal server error` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(401)
        .json({ error: true, message: "Please enter valid credentials" });

    const isUser = await User.findOne({ email: email });
    if (!isUser)
      return res
        .status(401)
        .json({ error: true, message: "User does not exists" });

    const checkPassword = await bcrypt.compare(password, isUser.password);
    if (!checkPassword)
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { _id: isUser._id, email: isUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    return res.json({
      error: false,
      user: { id: isUser._id, email: isUser.email, fullName: isUser.fullName },
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: true, message: `Internal server error` });
  }
};

const addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title || !content)
    return res
      .status(400)
      .json({ error: true, message: "Please enter valid data" });

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res
      .status(200)
      .json({ error: false, note, message: "Note added successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const editNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title && !content)
    return res
      .status(400)
      .json({ error: true, message: "No changes Provided" });
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note)
      return res.status(404).json({ error: true, message: "No note found!" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const getNotes = async (req, res) => {
  const user = req.user;
  try {
    const notes = await Note.find({
      userId: user._id,
    }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      message: "All notes retrieved successfully",
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const user = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    await Note.findByIdAndDelete(noteId);

    return res.json({
      error: false,
      message: "Note deleted successfuly",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const updateIsPinned = async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;
  const user  = req.user;

  try {
    const note =await Note.findOne({ _id: noteId, userId: user._id });

    if (!note)
      return res.status(404).json({ error: true, message: "Note not found" });

    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id });

    if (!user) return res.sendStatus(401);

    return res.json({
      error: false,
      message: "User found",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        createdOn: user.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const searchNotes = async(req,res)=>{
   const user = req.user;
   const {query} = req.body;
   console.log(query)
   if(!query){
    return res.status(400).json({
      error:true,
      message:"Search query is required"
    });
   };

   try {

    const matchingNotes = await Note.find({
      userId:user._id,
      $or:[
        {title: {$regex: new RegExp(query,"i")}},
        {content:{$regex: new RegExp(query,"i")}},
      ],
    });

    return res.json({
      error:false,
      notes:matchingNotes,
      message:"Notes matching the search query retrieved successfully"
    })
    
   } catch (error) {
    console.log(error);
    return res.json({
      error:true,
      message:`An error occured ${error.message}`
    })
   }
}

module.exports = {
  createUser,
  login,
  addNote,
  editNote,
  getNotes,
  deleteNote,
  updateIsPinned,
  getUser,
  searchNotes
};
