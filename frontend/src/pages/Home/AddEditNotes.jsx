import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

export default function AddEditNotes({ noteData, type,showToastMessage, getAllNotes, onClose }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || "");

  const [error, setError] = useState(null);
  //add new note api call
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        tags,
        content,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };
  //edit a note api call
  const editNote = async () => {
    const noteId = noteData._id   
    try {
      const response = await axiosInstance.put('/edit-note/' + noteId,{
        title,
        content,
        tags
      })

      if(response.data && response.data.note){
        showToastMessage("Note updated successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if( error.response &&
        error.response.data &&
        error.response.data.message
      ){
        setError(error.response.data.message);
      }
    }
   };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please eneter valid content");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          placeholder="Go To Gym At 5"
          className="text-2xl text-slate-950 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          rows={10}
          type="text"
          placeholder="Content"
          className="text-sm text-slate-950 outline-none bg-slate-50 rounded"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>

      <div className="mt-5">
        <label className="input-label">Tages</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-xs text-red-600 pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  );
}
