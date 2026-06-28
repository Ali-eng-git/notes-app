const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticateToken.js");
const {
  createUser,
  login,
  addNote,
  editNote,
  getNotes,
  deleteNote,
  updateIsPinned,
  getUser,
  searchNotes
} = require("../contoller/userController.js");

router.post("/create-account", createUser);

router.post("/login", login);

router.post("/add-note", authenticateToken, addNote);

router.put("/edit-note/:noteId", authenticateToken, editNote);

router.get("/get-all-notes", authenticateToken, getNotes);

router.delete("/delete-note/:noteId", authenticateToken, deleteNote);

router.put("/update-note-pinned/:noteId", authenticateToken, updateIsPinned);

router.get("/get-user", authenticateToken, getUser);

router.post('/search-note',authenticateToken, searchNotes)

module.exports = router;
